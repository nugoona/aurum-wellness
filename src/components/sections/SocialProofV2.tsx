'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SlotMachineDigit from '@/components/ui/SlotMachineDigit';
import styles from './SocialProofV2.module.css';

gsap.registerPlugin(ScrollTrigger);

/* ── Featured reviews (가운데 고정 6개) ── */
const FEATURED_REVIEWS = [
  {
    text: '어깨 쪽이 너무 뭉쳐서 갔는데 원장님이 **딱 짚어서** 풀어주심ㅠㅠ 다른 데랑 확실히 달라요. 끝나고 나니까 어깨가 **내려앉은 느낌**이에요.',
    category: '건식 스포츠',
    author: '윤서*',
    date: '2026.02',
  },
  {
    text: '피부관리 처음이라 긴장했는데 **상담부터 꼼꼼하게** 해주시고 관리하면서 계속 설명해주셔서 편했어요~ 다음날 피부 진짜 **결이 달라져서** 놀람ㅋㅋ',
    category: '피부 관리',
    author: '김하*',
    date: '2026.01',
  },
  {
    text: '딸고 정품 쓰는 곳 찾다가 왔는데 **개별룸**에 분위기도 너무 좋고 진짜 **힐링** 그 자체였어요. 제품도 일일이 보여주시면서 설명해주심!',
    category: '딸고 케어',
    author: '이수*',
    date: '2026.02',
  },
  {
    text: '산후 골반이 너무 틀어져서 여기저기 다녀봤는데 여기가 **제일 효과** 있었어요. 원장님이 체형 잡아주시면서 **집에서 할 스트레칭**도 알려주심 감동ㅠ',
    category: '산전 산후 케어',
    author: '박지*',
    date: '2025.12',
  },
  {
    text: '결혼식 전에 경락 받았는데 **붓기가 확 빠지고** 턱라인이 살아남ㅋㅋ 친구들이 얼굴 작아졌다고 난리. 원장님 손이 **마법의 손**이심.',
    category: '경락 윤곽',
    author: '한소*',
    date: '2026.01',
  },
  {
    text: '직장 스트레스로 잠을 못 잤는데 아로마 스웨디시 받고 그날 밤 **바로 꿀잠** 잤어요ㅋㅋ 향도 은은하고 **압도 딱 좋아서** 계속 다닐 예정입니다~',
    category: '아로마 스웨디시',
    author: '정유*',
    date: '2025.11',
  },
];

/* ── 세로 스크롤 리뷰 (왼쪽열 8개 + 오른쪽열 8개) ── */
const SCROLL_LEFT = [
  { text: '목이랑 어깨가 돌처럼 굳어서 갔는데 한 시간 만에 진짜 풀림ㅋㅋ 원장님이 어디가 문제인지 바로 알려주셔서 신기했어요.', category: '건식 스포츠', author: '송민*', date: '2025.10' },
  { text: '친구 소개로 왔는데 피부 톤이 한 번에 올라왔어요! 관리 후에 화장도 잘 먹고 남편이 뭐 했냐고ㅋㅋ', category: '피부 관리', author: '오다*', date: '2026.01' },
  { text: '출산 후 허리가 너무 아팠는데 3회 받고 거의 정상으로 돌아왔어요. 진짜 여기 아니었으면 어쩔 뻔했나 싶음...', category: '산전 산후 케어', author: '장서*', date: '2025.09' },
  { text: '스톤테라피 처음인데 뜨거운 돌이 근육 깊숙이 파고드는 느낌이 너무 좋았어요. 끝나고 몸이 가벼워서 놀람!', category: '스톤 테라피', author: '최예*', date: '2025.12' },
  { text: '남자친구 생일 선물로 커플룸 예약했는데 둘 다 너무 만족~ 분위기도 좋고 시술도 꼼꼼하고 또 올게요!', category: '아로마 스웨디시', author: '문지*', date: '2026.02' },
  { text: '얼굴이 항상 부어서 고민이었는데 경락 3회 받고 확실히 라인이 잡혔어요. 사진 찍으면 티가 남ㅋㅋ', category: '경락 윤곽', author: '강하*', date: '2025.11' },
  { text: '딸고 디톡스 받았는데 다음날 피부가 맑아지고 가려움이 확 줄었어요. 원장님 설명도 자세하셔서 믿음이 감.', category: '딸고 케어', author: '임소*', date: '2026.03' },
  { text: '회사 앞에 좋은 곳 없나 찾다가 발견! 점심시간에 건식 받는데 오후가 완전 달라져요. 이제 단골임ㅋ', category: '건식 스포츠', author: '유나*', date: '2025.08' },
];

const SCROLL_RIGHT = [
  { text: '인천에서 이 정도 퀄리티 처음이에요. 서울 강남 다니다가 여기 오니까 가격도 합리적이고 실력은 더 좋음!', category: '아로마 스웨디시', author: '배수*', date: '2025.10' },
  { text: '원장님이 해부학 전공이셔서 설명을 진짜 잘 해주세요. 왜 여기가 아픈지, 어떻게 관리해야 하는지 다 알려주심.', category: '건식 스포츠', author: '신지*', date: '2026.02' },
  { text: '예민 피부라 걱정했는데 딸고 제품이 순해서 트러블 없이 깨끗하게 관리됐어요~ 다음에 디톡스도 해보려구요!', category: '딸고 케어', author: '황유*', date: '2025.11' },
  { text: '둘째 출산 후 골반 벌어진 거 여기서 교정받았어요. 바지 사이즈가 줄어서 진짜 감동ㅠㅠ 세 번째도 여기 올 예정.', category: '산전 산후 케어', author: '조은*', date: '2026.01' },
  { text: '몸이 너무 차가운 체질인데 스톤테라피 받으니까 혈액순환 되는 느낌? 손발 저림이 많이 나아졌어요.', category: '스톤 테라피', author: '권미*', date: '2025.09' },
  { text: '결혼 준비하면서 피부관리 받는데 원장님이 피부 타입별로 다르게 해주셔서 좋아요. 식단 조언도 해주심ㅋㅋ', category: '피부 관리', author: '안서*', date: '2026.03' },
  { text: '직장인이라 항상 목이 뻐근한데 여기 한 번 오면 일주일은 버텨요ㅋㅋ 압이 세진 않은데 깊이가 다른 느낌.', category: '건식 스포츠', author: '나윤*', date: '2025.12' },
  { text: '네이버 리뷰 보고 왔는데 리뷰 안 속임ㅋㅋ 경락 받고 다음 날 세수하다가 턱선 보고 놀랐어요. 확실히 다름!', category: '경락 윤곽', author: '홍다*', date: '2026.02' },
];

function renderHighlight(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className={styles.highlight}>{part}</strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

const StarIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="var(--gold)" stroke="none">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

/** Scroll review card (compact) */
function ScrollCard({ review }: { review: typeof SCROLL_LEFT[0] }) {
  return (
    <div className={styles.scrollCard}>
      <div className={styles.scrollCardTop}>
        <span className={styles.scrollAuthor}>{review.author}</span>
        <span className={styles.scrollDate}>{review.date} 방문</span>
        <div className={styles.scrollStars}>
          {[1,2,3,4,5].map(j => <StarIcon key={j} size={10} />)}
        </div>
        <span className={styles.scrollCategory}>{review.category}</span>
      </div>
      <p className={styles.scrollText}>{review.text}</p>
    </div>
  );
}

export default function SocialProofV2() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.to(section, {
        backgroundColor: '#f9f7f4',
        scrollTrigger: { trigger: section, start: 'top 50%', end: 'bottom 50%', scrub: 1 },
      });

      const titleArea = section.querySelector(`.${styles.titleArea}`);
      if (titleArea) {
        gsap.set(titleArea, { opacity: 0, y: 30 });
        gsap.to(titleArea, {
          opacity: 1, y: 0, duration: 0.8,
          scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none none' },
        });
      }

      const reviewCards = section.querySelectorAll(`.${styles.reviewCard}`);
      if (reviewCards.length) {
        gsap.set(reviewCards, { opacity: 0, y: 40 });
        gsap.to(reviewCards, {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: reviewCards[0], start: 'top 85%', toggleActions: 'play none none none' },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  // Duplicate for seamless vertical loop
  const leftItems = [...SCROLL_LEFT, ...SCROLL_LEFT];
  const rightItems = [...SCROLL_RIGHT, ...SCROLL_RIGHT];

  return (
    <section ref={sectionRef} className={styles.section} style={{ backgroundColor: '#ffffff' }}>
      <div className={styles.container}>
        {/* ── Header ── */}
        <div className={styles.titleArea}>
          <div className={styles.headerTop}>
            <span className={styles.headerLabel}>REAL REVIEWS</span>
          </div>
          <div className={styles.counterRow}>
            <SlotMachineDigit value={620} suffix="" label="" delay={0} />
            <span className={styles.counterSuffix}>건의 진심이 담긴 후기</span>
          </div>
          <div className={styles.ratingRow}>
            <div className={styles.stars}>
              {[1,2,3,4,5].map(i => <StarIcon key={i} size={16} />)}
            </div>
            <span className={styles.ratingText}>네이버 예약 평균 4.97</span>
          </div>
        </div>
      </div>

      {/* ── Unified 4-col layout: [scroll] [featured 2x3] [scroll] ── */}
      <div className={styles.reviewsLayout}>
        {/* Left scroll column */}
        <div className={styles.scrollCol}>
          <div className={`${styles.scrollTrack} ${styles.scrollUp}`}>
            {leftItems.map((r, i) => <ScrollCard key={i} review={r} />)}
          </div>
        </div>

        {/* Center: 6 featured cards (2 cols × 3 rows) */}
        <div className={styles.featuredCenter}>
          {FEATURED_REVIEWS.map((review, i) => (
            <div key={i} className={styles.reviewCard}>
              <div className={styles.cardTop}>
                <span className={styles.authorName}>{review.author}</span>
                <span className={styles.authorDate}>{review.date} 방문</span>
                <div className={styles.reviewStars}>
                  {[1,2,3,4,5].map(j => <StarIcon key={j} size={13} />)}
                </div>
                <span className={styles.categoryBadge}>{review.category}</span>
              </div>
              <p className={styles.reviewText}>{renderHighlight(review.text)}</p>
            </div>
          ))}
        </div>

        {/* Right scroll column */}
        <div className={styles.scrollCol}>
          <div className={`${styles.scrollTrack} ${styles.scrollDown}`}>
            {rightItems.map((r, i) => <ScrollCard key={i} review={r} />)}
          </div>
        </div>
      </div>

      {/* ── CTA link (below the lines) ── */}
      <div className={styles.container}>
        <div className={styles.ctaRow}>
          <Link href="/therapy#reviews" className={styles.ctaLink}>
            실제 리뷰 더 보기
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
