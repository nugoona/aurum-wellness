"""
네이버 플레이스 리뷰 크롤러 (SSR 방식)
- 최신순으로 수집, 기존 reviews_raw.json에 중복 없이 누적
- 이미 수집된 리뷰를 만나면 조기 종료
- 날짜를 YYYY.M.D 형식으로 통일

Usage:
  python scrape_reviews.py           # 새 리뷰만 추가
  python scrape_reviews.py --full    # 전체 재수집
"""
import json
import os
import re
import sys
import time
import hashlib
from datetime import datetime, timezone

import requests

PLACE_ID = "1058592122"
REVIEWS_PATH = os.path.abspath("D:/아우름 웰니스/aurum_reviews/reviews_raw.json")

MOBILE_UA = (
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) "
    "AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
)

HEADERS = {
    "User-Agent": MOBILE_UA,
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
}

EMOJI_PATTERNS = [
    'pstatic.net/static/pup/emoji/',
    'pstatic.net/static/pup/reactiontype/',
]

REQUEST_DELAY = 3  # seconds between requests


def normalize_date(raw: str) -> str:
    """Normalize Naver date strings to YYYY.M.D format.
    Patterns:
      - '2025.12.23'  → already correct
      - '25.12.23.화' → '2025.12.23'  (YY.M.D.요일)
      - '1.15.목'     → '2026.1.15'   (M.D.요일, assumes current year)
    """
    if not raw:
        return raw

    # Already YYYY.M.D format
    if re.match(r'^\d{4}\.\d{1,2}\.\d{1,2}$', raw):
        return raw

    # YY.M.D.요일 format (e.g., '25.12.23.화', '24.11.5.화')
    m = re.match(r'^(\d{2})\.(\d{1,2})\.(\d{1,2})\.\D', raw)
    if m:
        year = 2000 + int(m.group(1))
        return f"{year}.{m.group(2)}.{m.group(3)}"

    # M.D.요일 format (e.g., '1.15.목', '2.22.토')
    m = re.match(r'^(\d{1,2})\.(\d{1,2})\.\D', raw)
    if m:
        year = datetime.now().year
        return f"{year}.{m.group(1)}.{m.group(2)}"

    return raw


def review_fingerprint(body: str, nickname: str, visited: str) -> str:
    """Generate a unique fingerprint for deduplication.
    Normalizes whitespace in body to catch near-duplicates.
    """
    normalized = re.sub(r'\s+', '', body.strip())[:100]
    raw = f"{normalized}|{nickname}|{visited}"
    return hashlib.md5(raw.encode('utf-8')).hexdigest()


def load_existing() -> tuple[dict, set]:
    """Load existing reviews_raw.json and build fingerprint set."""
    if not os.path.exists(REVIEWS_PATH):
        data = {
            "place_id": PLACE_ID,
            "place_name": "아우르메 테라피 뷰티앤스파 마사지 인천부평점",
            "collected_at": None,
            "total_count": 0,
            "with_photos": 0,
            "without_photos": 0,
            "keyword_frequency": {},
            "reviews": [],
        }
        return data, set()

    with open(REVIEWS_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)

    fingerprints = set()
    for r in data['reviews']:
        fp = review_fingerprint(r.get('body', ''), r.get('nickname', ''), r.get('visited', ''))
        fingerprints.add(fp)

    return data, fingerprints


def parse_apollo_state(html: str) -> tuple[list[dict], str | None]:
    """Extract reviews from window.__APOLLO_STATE__ in HTML.
    Returns (reviews, last_cursor).
    """
    match = re.search(r'window\.__APOLLO_STATE__\s*=\s*({.+?});', html, re.DOTALL)
    if not match:
        return [], None

    try:
        apollo = json.loads(match.group(1))
    except json.JSONDecodeError:
        return [], None

    reviews = []
    last_cursor = None

    for key, val in apollo.items():
        if not key.startswith('VisitorReview:'):
            continue
        if not isinstance(val, dict):
            continue

        # -- Cursor (for pagination) --
        cursor = val.get('cursor', '')
        if cursor:
            last_cursor = cursor

        # -- Author (resolve __ref) --
        nickname = ''
        author = val.get('author')
        if isinstance(author, dict):
            if '__ref' in author:
                author_obj = apollo.get(author['__ref'], {})
                nickname = author_obj.get('nickname', '')
            else:
                nickname = author.get('nickname', '')

        # -- Media URLs --
        media = []
        raw_media = val.get('media', [])
        if isinstance(raw_media, list):
            for m in raw_media:
                url = ''
                if isinstance(m, dict):
                    if '__ref' in m:
                        ref_obj = apollo.get(m['__ref'], {})
                        url = ref_obj.get('thumbnail', '') or ref_obj.get('thumbnailUrl', '') or ''
                    else:
                        url = m.get('thumbnail', '') or m.get('thumbnailUrl', '') or ''
                if url:
                    if '?type=' not in url:
                        url += '?type=w1500_60_sharpen'
                    media.append(url)

        # -- Voted keywords --
        voted_keywords = []
        raw_kw = val.get('votedKeywords', [])
        if isinstance(raw_kw, list):
            for kw in raw_kw:
                name = ''
                if isinstance(kw, dict):
                    if '__ref' in kw:
                        ref_obj = apollo.get(kw['__ref'], {})
                        name = ref_obj.get('name', '') or ref_obj.get('displayName', '')
                    else:
                        name = kw.get('name', '') or kw.get('displayName', '')
                if name:
                    voted_keywords.append(name)

        # -- Reply --
        reply = ''
        reply_val = val.get('reply')
        if isinstance(reply_val, dict):
            if '__ref' in reply_val:
                ref_obj = apollo.get(reply_val['__ref'], {})
                reply = ref_obj.get('body', '') or ''
            else:
                reply = reply_val.get('body', '') or ''

        # -- Build review object --
        body = val.get('body', '') or ''
        review = {
            'body': body,
            'rating': val.get('rating'),
            'nickname': nickname,
            'created': normalize_date(val.get('created', '') or ''),
            'visited': normalize_date(val.get('visited', '') or ''),
            'visitCount': val.get('visitCount', 1) or 1,
            'originType': val.get('originType', '') or '',
            'itemName': val.get('itemName', '') or '',
            'media': media,
            'votedKeywords': voted_keywords,
            'reply': reply,
        }
        reviews.append(review)

    return reviews, last_cursor


def fetch_page(sort: str = 'latest', cursor: str = '') -> tuple[list[dict], str | None]:
    """Fetch one page of reviews. Returns (reviews, next_cursor)."""
    url = f"https://m.place.naver.com/place/{PLACE_ID}/review/visitor"
    params = {"reviewSort": sort}
    if cursor:
        params["cursor"] = cursor

    try:
        resp = requests.get(url, headers=HEADERS, params=params, timeout=15)
        resp.encoding = 'utf-8'  # Force UTF-8 (Naver returns ISO-8859-1 header)
        resp.raise_for_status()
    except requests.RequestException as e:
        print(f"  [ERROR] Request failed: {e}")
        return [], None

    reviews, last_cursor = parse_apollo_state(resp.text)
    return reviews, last_cursor


def scrape_new_reviews() -> list[dict]:
    """Scrape reviews newest-first, traverse all pages.
    Stops after 2 consecutive empty pages (no new reviews at all).
    """
    data, existing_fps = load_existing()
    print(f"Existing reviews: {len(data['reviews'])}")

    new_reviews = []
    cursor = ''
    page = 0
    consecutive_empty_pages = 0

    while True:
        page += 1
        label = f"Page {page}"
        if cursor:
            label += f" (cursor={cursor[:30]}...)"
        print(f"\n--- {label} ---")

        reviews, next_cursor = fetch_page(sort='latest', cursor=cursor)

        if not reviews:
            consecutive_empty_pages += 1
            print(f"  No reviews returned ({consecutive_empty_pages} consecutive empty).")
            if consecutive_empty_pages >= 2:
                print("  2 consecutive empty pages — stopping.")
                break
            if not next_cursor:
                print("  No next cursor, last page reached.")
                break
            cursor = next_cursor
            time.sleep(REQUEST_DELAY)
            continue

        consecutive_empty_pages = 0
        page_new = 0
        for r in reviews:
            fp = review_fingerprint(r['body'], r['nickname'], r['visited'])
            if fp not in existing_fps:
                existing_fps.add(fp)
                new_reviews.append(r)
                page_new += 1

        print(f"  Found {len(reviews)} reviews, {page_new} new")

        if not next_cursor:
            print("  No next cursor, last page reached.")
            break

        cursor = next_cursor
        time.sleep(REQUEST_DELAY)

    return new_reviews


def merge_and_save(new_reviews: list[dict]):
    """Merge new reviews into reviews_raw.json."""
    data, _ = load_existing()

    if not new_reviews:
        print("\nNo new reviews to add.")
        return 0

    # Assign IDs continuing from existing max
    max_num = -1
    for r in data['reviews']:
        m = re.match(r'dom_(\d+)', r.get('id', ''))
        if m:
            max_num = max(max_num, int(m.group(1)))

    for i, r in enumerate(new_reviews):
        r['id'] = f"dom_{max_num + 1 + i}"

    # Prepend new reviews (newest first)
    data['reviews'] = new_reviews + data['reviews']
    data['total_count'] = len(data['reviews'])
    data['collected_at'] = datetime.now(timezone.utc).isoformat()

    # Recalculate stats
    with_photos = sum(1 for r in data['reviews']
                      if any(url for url in r.get('media', [])
                             if not any(p in url for p in EMOJI_PATTERNS)))
    data['with_photos'] = with_photos
    data['without_photos'] = data['total_count'] - with_photos

    # Recalculate keyword frequency
    kw_freq = {}
    for r in data['reviews']:
        for kw in r.get('votedKeywords', []):
            kw_freq[kw] = kw_freq.get(kw, 0) + 1
    data['keyword_frequency'] = dict(sorted(kw_freq.items(), key=lambda x: -x[1]))

    # Save
    os.makedirs(os.path.dirname(REVIEWS_PATH), exist_ok=True)
    with open(REVIEWS_PATH, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"\nSaved {len(data['reviews'])} total reviews to {REVIEWS_PATH}")
    print(f"  Added: {len(new_reviews)}, Photos: {with_photos}")
    return len(new_reviews)


def main():
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')

    print("=== Naver Review Scraper ===")
    print(f"Place ID: {PLACE_ID}")
    print(f"Reviews file: {REVIEWS_PATH}")
    print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

    new_reviews = scrape_new_reviews()
    print(f"\n=== Total new reviews: {len(new_reviews)} ===")

    added = merge_and_save(new_reviews)
    return added


if __name__ == '__main__':
    main()
