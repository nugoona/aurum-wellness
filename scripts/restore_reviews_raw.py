"""
reviewData.ts (587건) + reviews_raw.json (5-8 신규 33건) → reviews_raw.json 재구축

배경:
- 5월 초 누군가 reviews_raw.json을 새로 만들면서 누적 587건이 사라지고 33건만 남음
- reviewData.ts에는 587건이 그대로 남아 있어, 여기서 raw 항목을 역구성

전략:
- reviewData.ts에서 587건을 raw 형식으로 변환
- 5-8 raw 33건 중 fingerprint(body+nickname+visited) 동일한 것은 raw 우선 (rating/originType 등 풍부)
- 신규 raw 항목은 그대로 추가
- 결과를 reviews_raw.json으로 저장 (백업 이미 만들어둠)
"""
import json
import os
import re
import hashlib
from datetime import datetime, timezone

REPO_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REVIEW_DATA_TS = os.path.join(REPO_DIR, 'src', 'data', 'reviewData.ts')
RAW_PATH = os.path.abspath("D:/아우름 웰니스/aurum_reviews/reviews_raw.json")


def fingerprint(body, nickname, visited):
    normalized = re.sub(r'\s+', '', body.strip())[:100]
    return hashlib.md5(f"{normalized}|{nickname}|{visited}".encode('utf-8')).hexdigest()


def parse_review_data_ts(path):
    """Parse the TypeScript file by extracting each review object literal."""
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the REVIEW_DATA array body
    m = re.search(r'export const REVIEW_DATA[^=]*=\s*\[(.*)\];', content, re.DOTALL)
    if not m:
        raise RuntimeError("REVIEW_DATA array not found")
    body = m.group(1)

    # Iterate over object literals { ... }, depth-aware
    reviews = []
    i = 0
    n = len(body)
    while i < n:
        if body[i] == '{':
            depth = 0
            start = i
            in_str = False
            esc = False
            while i < n:
                ch = body[i]
                if in_str:
                    if esc:
                        esc = False
                    elif ch == '\\':
                        esc = True
                    elif ch == in_str:
                        in_str = False
                else:
                    if ch in ("'", '"'):
                        in_str = ch
                    elif ch == '{':
                        depth += 1
                    elif ch == '}':
                        depth -= 1
                        if depth == 0:
                            obj_text = body[start:i + 1]
                            reviews.append(parse_object_literal(obj_text))
                            i += 1
                            break
                i += 1
        else:
            i += 1
    return reviews


def parse_object_literal(text):
    """Convert a TS object literal like { id: 'x', body: "..." } into a dict.
    Uses JSON parsing after a few transforms.
    """
    # The TS literal uses single quotes for some strings (id) and double for others (body via json.dumps).
    # Strategy: extract field-by-field with regex to avoid full TS->JSON gymnastics.
    fields = {}

    # id: '...'
    m = re.search(r"\bid:\s*'([^']*)'", text)
    if m:
        fields['id'] = m.group(1)

    # body: "..." (json.dumps output, double quoted, escapes preserved)
    for key in ('body', 'nickname', 'visited', 'category', 'reply'):
        m = re.search(rf'\b{key}:\s*("(?:\\.|[^"\\])*")', text)
        if m:
            fields[key] = json.loads(m.group(1))
        else:
            fields[key] = ''

    # visitCount: number
    m = re.search(r'\bvisitCount:\s*(\d+)', text)
    fields['visitCount'] = int(m.group(1)) if m else 1

    # media: [...]  (array of double-quoted strings)
    m = re.search(r'\bmedia:\s*(\[.*?\])', text, re.DOTALL)
    fields['media'] = json.loads(m.group(1)) if m else []

    # votedKeywords: [...]
    m = re.search(r'\bvotedKeywords:\s*(\[.*?\])', text, re.DOTALL)
    fields['votedKeywords'] = json.loads(m.group(1)) if m else []

    return fields


def to_raw_review(parsed):
    """Convert TS-parsed review to raw json shape (matches scrape_reviews.py output)."""
    return {
        'body': parsed['body'],
        'rating': 5,
        'nickname': parsed['nickname'],
        'created': parsed['visited'],
        'visited': parsed['visited'],
        'visitCount': parsed['visitCount'],
        'originType': '',
        'itemName': '',
        'media': parsed['media'],
        'votedKeywords': parsed['votedKeywords'],
        'reply': parsed['reply'],
        'id': parsed['id'],
    }


def main():
    print(f"Reading reviewData.ts: {REVIEW_DATA_TS}")
    ts_reviews = parse_review_data_ts(REVIEW_DATA_TS)
    print(f"  Parsed {len(ts_reviews)} reviews from TS")

    print(f"Reading reviews_raw.json: {RAW_PATH}")
    with open(RAW_PATH, 'r', encoding='utf-8') as f:
        raw_data = json.load(f)
    raw_reviews = raw_data['reviews']
    print(f"  Found {len(raw_reviews)} reviews in raw json")

    # Build fingerprint maps
    raw_fp = {fingerprint(r['body'], r['nickname'], r['visited']): r for r in raw_reviews}
    print(f"  Raw fingerprints: {len(raw_fp)}")

    # Convert TS reviews to raw shape, dedup against raw json
    merged = []
    seen_fp = set()
    new_from_ts = 0
    overlapped = 0

    for parsed in ts_reviews:
        raw_form = to_raw_review(parsed)
        fp = fingerprint(raw_form['body'], raw_form['nickname'], raw_form['visited'])
        if fp in seen_fp:
            continue
        seen_fp.add(fp)
        if fp in raw_fp:
            # Prefer the raw version (richer fields), but keep TS id for stability
            r = dict(raw_fp[fp])
            r['id'] = raw_form['id']
            merged.append(r)
            overlapped += 1
        else:
            merged.append(raw_form)
            new_from_ts += 1

    # Add raw-only reviews (in raw but not in TS = newly scraped between mid-March and now)
    raw_only = 0
    # Need to assign IDs that don't conflict with TS ids
    max_num = -1
    for r in merged:
        m_id = re.match(r'dom_(\d+)', r.get('id', ''))
        if m_id:
            max_num = max(max_num, int(m_id.group(1)))

    next_id = max_num + 1
    for r in raw_reviews:
        fp = fingerprint(r['body'], r['nickname'], r['visited'])
        if fp in seen_fp:
            continue
        seen_fp.add(fp)
        new_r = dict(r)
        if 'id' not in new_r or not new_r['id']:
            new_r['id'] = f"dom_{next_id}"
            next_id += 1
        merged.append(new_r)
        raw_only += 1

    print(f"\nMerge summary:")
    print(f"  From TS only:    {new_from_ts}")
    print(f"  Overlap (raw):   {overlapped}")
    print(f"  Raw only (new):  {raw_only}")
    print(f"  Total:           {len(merged)}")

    # Sort: latest visited first
    def date_key(r):
        parts = (r.get('visited') or '').split('.')
        try:
            return tuple(int(p) for p in parts[:3])
        except ValueError:
            return (0, 0, 0)

    merged.sort(key=date_key, reverse=True)

    # Recalculate stats
    EMOJI = ['pstatic.net/static/pup/emoji/', 'pstatic.net/static/pup/reactiontype/']
    with_photos = sum(
        1 for r in merged
        if any(url for url in r.get('media', []) if not any(p in url for p in EMOJI))
    )

    kw_freq = {}
    for r in merged:
        for kw in r.get('votedKeywords', []):
            kw_freq[kw] = kw_freq.get(kw, 0) + 1

    out = {
        'place_id': raw_data.get('place_id', '1058592122'),
        'place_name': raw_data.get('place_name', '아우르메 테라피 뷰티앤스파 마사지 인천부평점'),
        'collected_at': datetime.now(timezone.utc).isoformat(),
        'total_count': len(merged),
        'with_photos': with_photos,
        'without_photos': len(merged) - with_photos,
        'keyword_frequency': dict(sorted(kw_freq.items(), key=lambda x: -x[1])),
        'reviews': merged,
    }

    with open(RAW_PATH, 'w', encoding='utf-8') as f:
        json.dump(out, f, ensure_ascii=False, indent=2)

    print(f"\nWrote {len(merged)} reviews to {RAW_PATH}")
    print(f"  With photos:    {with_photos}")
    print(f"  Without photos: {len(merged) - with_photos}")


if __name__ == '__main__':
    main()
