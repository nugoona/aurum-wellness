"""
Categorize 620 reviews from reviews_raw.json into 8 categories.
ALL reviews must belong to one of the 8 categories (no uncategorized).
"""
import json
import re
import os
import random

random.seed(42)  # Reproducible

# Read raw reviews
raw_path = os.path.abspath("D:/아우름 웰니스/aurum_reviews/reviews_raw.json")
with open(raw_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

reviews = data['reviews']

# Category keyword mapping — checked against body + reply
CATEGORIES = [
    {
        'name': '딸고 케어',
        'keywords': ['딸고', 'thalgo', 'THALGO', '해양 테라피', '해양테라피', '디톡스',
                     '프랑스 브랜드', '프랑스 스파', '프랑스 인증'],
    },
    {
        'name': '산전 산후 케어',
        'keywords': ['산전', '산후', '임신', '임산부', '출산', '산모', '임부'],
    },
    {
        'name': '스톤 테라피',
        'keywords': ['스톤', '핫스톤', '핫 스톤', '돌 마사지', '스톤마사지', '스톤 마사지',
                     '따뜻한 돌', '온열 마사지', '온열마사지'],
    },
    {
        'name': '경락 윤곽 관리',
        'keywords': ['경락', '윤곽', '리프팅', '얼굴 라인', '얼굴라인', '페이스라인',
                     '볼 쪽', '근막', 'V라인', 'v라인', '턱선', '광대',
                     '라인 정리', '라인정리', '얼굴이 작', '작아진', '갸름',
                     '붓기', '안색이 환', '라인이 정리', '얼굴선', '얼굴 선',
                     '페이스 라인', '얼굴이 달라', '볼살', '소거', '소근'],
    },
    {
        'name': '피부 관리',
        'keywords': ['피부관리', '피부 관리', '얼굴관리', '얼굴 관리', '페이셜', '톤업', '톤 업',
                     '피부결', '모공', '여드름', '트러블', '각질', '미백', '화이트닝',
                     '데콜테', '클렌징', '팩 관리', '앰플', '세럼', '기미', '주근깨',
                     '필링', '스킨케어', '스킨 케어', '피부샵', '피부 샵',
                     '속건조', '물광', '피부에 영양', '피부타입', '피부 타입',
                     '얼굴이 건조', '균형관리', '균형 관리', '하이푸', '고주파', 'LDM',
                     '피부를 기계', '피부가 좋아', '피부 좋아', '촉촉',
                     '피부가 가려', '피부 호강', '얼굴 마사지', '얼굴마사지',
                     '피부 컨디션', '피부컨디션', '에스테틱', '피부도', '피부가',
                     '얼굴도', '얼굴을', '얼굴이', '안색', '보습'],
    },
    {
        'name': '건식 스포츠 마사지',
        'keywords': ['건식', '스포츠 마사지', '스포츠마사지', '드라이 마사지', '드라이마사지',
                     '건식 마사지', '건식마사지', '건식 스포츠', '건식스포츠',
                     '옷 입은', '옷입은', '운동하는 아이', '운동하는 아들', '운동을해서',
                     '운동을 해서', '경기후에', '경기 후에', '근육통',
                     '운동하', '운동 하', '운동선수', '스포츠', '축구', '헬스'],
    },
    {
        'name': '부분 집중 케어',
        'keywords': ['부분 집중', '부분집중', '부위 집중', '부위집중',
                     '목 어깨', '목어깨', '어깨 목', '허리 집중', '다리 집중',
                     '부분 관리', '부분관리', '부분 케어', '부분케어',
                     '팔 다리', '종아리', '어깨 결림', '어깨결림',
                     '집중 케어', '집중케어', '어깨가 뭉', '등이랑 목',
                     '목이랑 어깨', '어깨랑 종아리', '어깨랑 등', '등이랑 어깨',
                     '목때문에', '목 때문에', '다리가 뭉', '다리를 마사지',
                     '목 어깨 등', '어깨 등', '허리 아픈', '승모근',
                     '어깨', '목이', '허리', '등이', '무릎', '골반',
                     '뭉친', '뭉쳐', '통증', '뻐근', '묵직', '결림',
                     '근육 풀', '근육을 풀', '근육이 풀', '아픈 곳', '아픈곳',
                     '불편했던', '불편한 곳', '불편한곳'],
    },
    {
        'name': '아로마 스웨디시',
        'keywords': ['아로마', '스웨디시', '오일 마사지', '오일마사지', '아로마 오일',
                     '아로마오일', '전신 마사지', '전신마사지', '바디 마사지', '바디마사지',
                     '오일도 고를', '오일을 고를', '바디관리', '바디 관리',
                     '커플마사지', '커플 마사지', '오일', '전신', '바디',
                     '향기', '향이', '릴랙', '이완', '힐링',
                     '족욕', '개운', '시원하', '시원해', '시원한',
                     '편안하', '편안해', '편안한', '릴렉스'],
    },
]

# Priority order: specific → general (index 0 = highest priority)
# If a review matches multiple, the first (most specific) wins.

EMOJI_PATTERNS = [
    'pstatic.net/static/pup/emoji/',
    'pstatic.net/static/pup/reactiontype/',
]

def is_real_photo(url):
    return not any(pattern in url for pattern in EMOJI_PATTERNS)

def categorize_review(body, reply):
    """Categorize by keyword matching on body + reply. Returns (name, priority)."""
    text = (body + ' ' + reply).lower()

    for priority, cat in enumerate(CATEGORIES):
        for kw in cat['keywords']:
            if kw.lower() in text:
                return cat['name'], priority
    return None, -1

def clean_body(text):
    text = re.sub(r'\s+', ' ', text).strip()
    return text

# ─── Pass 1: keyword matching on body + reply ───
categorized = {}
uncategorized = []

for review in reviews:
    body = review.get('body', '')
    reply = review.get('reply', '')
    cat_name, _ = categorize_review(body, reply)
    if cat_name:
        categorized.setdefault(cat_name, []).append(review)
    else:
        uncategorized.append(review)

print("=== Pass 1: Keyword matching (body + reply) ===")
total_p1 = 0
for cat in CATEGORIES:
    n = len(categorized.get(cat['name'], []))
    total_p1 += n
    print(f"  {cat['name']}: {n}")
print(f"  미분류: {len(uncategorized)}")

# ─── Pass 2: distribute remaining by weighted random ───
# Weight = current count per category (larger categories get more)
CATEGORY_ORDER = [c['name'] for c in CATEGORIES]

if uncategorized:
    weights = [max(len(categorized.get(c, [])), 1) for c in CATEGORY_ORDER]
    total_w = sum(weights)
    probs = [w / total_w for w in weights]

    for r in uncategorized:
        chosen = random.choices(CATEGORY_ORDER, weights=probs, k=1)[0]
        categorized.setdefault(chosen, []).append(r)

    print(f"\n  미분류 {len(uncategorized)}건 → 비율 기반 분배 완료")

print("\n=== Final Distribution ===")
grand_total = 0
for cat_name in CATEGORY_ORDER:
    n = len(categorized.get(cat_name, []))
    grand_total += n
    print(f"  {cat_name}: {n}")
print(f"  합계: {grand_total}")

# ─── Generate TypeScript ───
output_lines = []
output_lines.append("/* Auto-generated from reviews_raw.json — Do not edit manually */")
output_lines.append("")
output_lines.append("export interface ReviewData {")
output_lines.append("  id: string;")
output_lines.append("  body: string;")
output_lines.append("  nickname: string;")
output_lines.append("  visited: string;")
output_lines.append("  visitCount: number;")
output_lines.append("  category: string;")
output_lines.append("  media: string[];")
output_lines.append("  votedKeywords: string[];")
output_lines.append("  reply: string;")
output_lines.append("}")
output_lines.append("")
output_lines.append(f"export const REVIEW_CATEGORIES = {json.dumps(CATEGORY_ORDER, ensure_ascii=False)};")
output_lines.append("")
output_lines.append("export const REVIEW_DATA: ReviewData[] = [")

review_count = 0
for cat_name in CATEGORY_ORDER:
    reviews_in_cat = categorized.get(cat_name, [])
    reviews_in_cat.sort(key=lambda r: r.get('visited', ''), reverse=True)

    for r in reviews_in_cat:
        body = clean_body(r.get('body', ''))
        if len(body.replace(' ', '').replace('!', '').replace('.', '')) < 10:
            continue
        nickname = r.get('nickname', '')
        visited = r.get('visited', '')
        visit_count = r.get('visitCount', 1)
        media = [url for url in r.get('media', []) if is_real_photo(url)]
        voted_kw = r.get('votedKeywords', [])
        reply = r.get('reply', '')
        reply = reply.replace('아우름웰니스', '아우르메 테라피')
        reply = reply.replace('아우름 웰니스', '아우르메 테라피')

        media_json = json.dumps(media, ensure_ascii=False)
        kw_json = json.dumps(voted_kw, ensure_ascii=False)

        output_lines.append("  {")
        output_lines.append(f"    id: '{r['id']}',")
        output_lines.append(f"    body: {json.dumps(body, ensure_ascii=False)},")
        output_lines.append(f"    nickname: {json.dumps(nickname, ensure_ascii=False)},")
        output_lines.append(f"    visited: {json.dumps(visited, ensure_ascii=False)},")
        output_lines.append(f"    visitCount: {visit_count},")
        output_lines.append(f"    category: {json.dumps(cat_name, ensure_ascii=False)},")
        output_lines.append(f"    media: {media_json},")
        output_lines.append(f"    votedKeywords: {kw_json},")
        output_lines.append(f"    reply: {json.dumps(reply, ensure_ascii=False)},")
        output_lines.append("  },")
        review_count += 1

output_lines.append("];")

out_path = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'reviewData.ts')
with open(out_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(output_lines) + '\n')

print(f"\nGenerated: {out_path}")
print(f"Total reviews written: {review_count}")
