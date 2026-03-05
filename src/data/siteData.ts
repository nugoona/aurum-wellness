export function getBookingUrl() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `https://m.booking.naver.com/booking/13/bizes/421955/items/3615202?startDate=${yyyy}-${mm}-${dd}`;
}

export const BOOKING_URL = getBookingUrl();

export const SERVICES = [
  {
    id: 'therapy',
    href: '/therapy',
    label: 'THERAPY',
    title: 'AURUME THERAPY',
    description: '전문성과 품격을 동시에 갖춘 뷰티 & 웰니스 스파. 바디, 페이스, 스페셜 프로그램.',
    image: '/images/hero/main4_1.jpg',
  },
  {
    id: 'b2b',
    href: '/b2b',
    label: 'B2B WELLNESS',
    title: 'B2B 웰니스',
    description: '기업 임직원 복지부터 VIP 브랜드 이벤트까지, 9년간 200개 이상의 기업과 함께.',
    image: '/images/hero/main4_2.jpg',
  },
  {
    id: 'class',
    href: '/class',
    label: 'CLASS',
    title: '클래스/특강',
    description: '15년 현장 경험과 과학적 근거로 완성한, 실전 중심 테라피 교육.',
    image: '/images/hero/main4_3.jpg',
  },
];

export const REVIEWS_HIGHLIGHT = [
  {
    text: '아로마 스웨디시 받았는데 향도 좋고 시원하게 잘 풀어주셔서 정말 개운했어요. 다음에 또 방문할게요!',
    author: '네이버 예약',
    date: '2025.08',
    category: '아로마 스웨디시',
    rating: 5,
  },
  {
    text: '건식 스포츠 마사지 받았는데 확실히 전문적이에요. 어깨랑 허리 쪽 뭉친 부분을 정확하게 짚어주셔서 한결 가벼워졌습니다.',
    author: '네이버 예약',
    date: '2025.07',
    category: '건식 스포츠',
    rating: 5,
  },
  {
    text: '피부 관리 처음 받아봤는데 원장님이 꼼꼼하게 상담해주시고 관리도 섬세하게 해주셔서 만족스러웠어요.',
    author: '네이버 예약',
    date: '2025.09',
    category: '피부 관리',
    rating: 5,
  },
  {
    text: '경락 관리 받았는데 붓기가 쏙 빠져서 놀랐어요! 얼굴 라인이 확실히 달라졌습니다. 강력 추천합니다.',
    author: '네이버 예약',
    date: '2025.06',
    category: '경락 윤곽',
    rating: 5,
  },
];

export const CLIENT_LOGOS = Array.from({ length: 38 }, (_, i) => ({
  src: `/images/logos/main9_${i + 2}.jpg`,
  alt: `파트너 기업 ${i + 1}`,
}));

/* ── Cinematic Hero 슬라이드쇼 ── */
export const HERO_SLIDES = [
  '/images/hero/vis.jpg',
  '/images/hero/sub_vis02.jpg',
  '/images/hero/class_hero.jpg',
  '/images/hero/main1_bg.jpg',
];

/* ── Impact Numbers ── */
export const IMPACT_NUMBERS = [
  { value: 9, suffix: '+', label: '년간의 경력' },
  { value: 144, suffix: '', label: '행사 기록' },
  { value: 30, suffix: '+', label: '파트너 기업' },
];

/* ── Social Proof 리뷰 티커용 확장 리뷰 ── */
export const TICKER_REVIEWS = [
  {
    text: '아로마 스웨디시 받았는데 향도 좋고 시원하게 잘 풀어주셔서 정말 개운했어요.',
    category: '아로마 스웨디시',
    rating: 5,
    author: '네이버 예약',
  },
  {
    text: '산후 골반 통증 심해서 방문했는데 진심 상담 자세하고 반영 너무 잘 해주셨어요. 강추!',
    category: '산전 산후 케어',
    rating: 5,
    author: '네이버 예약',
  },
  {
    text: '건식 스포츠 마사지 확실히 전문적이에요. 어깨랑 허리 쪽 뭉친 부분을 정확하게 짚어주셔서 한결 가벼워졌습니다.',
    category: '건식 스포츠',
    rating: 5,
    author: '네이버 예약',
  },
  {
    text: '피부 관리 처음 받아봤는데 원장님이 꼼꼼하게 상담해주시고 관리도 섬세하게 해주셨어요.',
    category: '피부 관리',
    rating: 5,
    author: '네이버 예약',
  },
  {
    text: '경락 관리 받았는데 붓기가 쏙 빠져서 놀랐어요! 얼굴 라인이 확실히 달라졌습니다.',
    category: '경락 윤곽',
    rating: 5,
    author: '네이버 예약',
  },
  {
    text: '개별룸이라 정말 프라이빗하고 조용하게 힐링할 수 있었어요. 재방문 의사 100%입니다.',
    category: '딸고 케어',
    rating: 5,
    author: '네이버 예약',
  },
  {
    text: '디톡스 시술 받고 나니 독소 배출이 되었는지 아주 개운하고 가려움이 진정되었습니다.',
    category: '딸고 케어',
    rating: 5,
    author: '네이버 예약',
  },
  {
    text: '스톤 테라피 처음이었는데 뜨거운 돌이 근육 깊숙이 풀어주는 느낌이 너무 좋았어요.',
    category: '스톤 테라피',
    rating: 5,
    author: '네이버 예약',
  },
];

/* ── Therapy Experience 시설 이미지 ── */
export const THERAPY_IMAGES = [
  { src: '/images/therapy/space_treatment_room.png', label: 'Treatment Room' },
  { src: '/images/therapy/space_02.jpg', label: 'Therapy Space' },
  { src: '/images/therapy/space_aroma_oils_01.jpg', label: 'Aroma Oils' },
  { src: '/images/therapy/space_01.jpg', label: 'Relaxation' },
  { src: '/images/therapy/space_couple_room.png', label: 'Couple Room' },
  { src: '/images/therapy/space_thalgo_products.png', label: 'Thalgo Products' },
];

/* ── CTA 슬라이드쇼 ── */
export const CTA_SLIDES = [
  '/images/hero/main4_1.jpg',
  '/images/hero/main4_2.jpg',
];
