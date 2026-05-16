/* ============================================
   PRESS — 언론 보도 (수동 관리)
   ============================================
   썸네일은 각 기사 페이지에서 추출한 대표 이미지.
   featured: true 인 항목이 섹션 최상단에 크게 표시됨.
*/

export interface PressArticle {
  id: string;
  outlet: string;        // 매체명 (한글)
  outletEn?: string;     // 매체명 영문 표기 (typography accent용)
  headline: string;      // 기사 헤드라인
  url: string;           // 기사 원문 URL (네이버 me 단축 OK)
  date: string;          // 게재일 YYYY-MM-DD or YYYY-MM
  thumbnail: string;     // 썸네일 경로 (/press/...)
  featured?: boolean;    // 메인 강조 (1개만)
}

export const PRESS_ARTICLES: PressArticle[] = [
  {
    id: 'besttimes-2025',
    outlet: '베스트타임즈',
    outletEn: 'BESTTIMES',
    headline:
      '아우르메테라피 뷰티앤스파 인천부평점, 2025 부평구 우수 뷰티·바디케어로 선정',
    url: 'https://www.besttimes.co.kr/5770',
    date: '2026-01-12',
    thumbnail: '/press/besttimes.jpg',
    featured: true,
  },
  {
    id: 'edaily-photo',
    outlet: '이데일리',
    outletEn: 'EDAILY',
    headline: '[포토] 대림바스, 힐링 클래스',
    url: 'https://n.news.naver.com/article/018/0004505254?sid=101',
    date: '2019-10-31',
    thumbnail: '/press/edaily.jpg',
  },
  {
    id: 'ikld-class',
    outlet: '국토일보',
    outletEn: 'IKLD',
    headline: '대림 디움 X 해피바스, 연말 핸드 마사지 클래스 실시',
    url: 'http://www.ikld.kr/news/articleView.html?idxno=211644',
    date: '2019-12',
    thumbnail: '/press/ikld.jpg',
  },
];

/** YYYY-MM-DD or YYYY-MM → "2026.01.12" or "2026.01" */
export function formatPressDate(d: string): string {
  const parts = d.split('-');
  if (parts.length === 3) return `${parts[0]}.${parts[1]}.${parts[2]}`;
  if (parts.length === 2) return `${parts[0]}.${parts[1]}`;
  return d;
}
