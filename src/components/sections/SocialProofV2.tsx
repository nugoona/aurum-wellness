'use client';

import { useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SlotMachineDigit from '@/components/ui/SlotMachineDigit';
import { REVIEW_DATA, type ReviewData } from '@/data/reviewData';
import styles from './SocialProofV2.module.css';

gsap.registerPlugin(ScrollTrigger);

const FEATURED_COUNT = 6;
const SCROLL_PER_COL = 8;

function visitedSortKey(d: string): number {
  const p = d.split('.').map((x) => Number(x) || 0);
  return (p[0] || 0) * 10000 + (p[1] || 0) * 100 + (p[2] || 0);
}

function shortDate(d: string): string {
  const p = d.split('.');
  if (p.length < 2) return d;
  const mm = String(p[1] || '').padStart(2, '0');
  return `${p[0]}.${mm}`;
}

/** Round-robin across categories so cards feel varied without randomness. */
function pickDiverse(pool: ReviewData[], n: number): ReviewData[] {
  const buckets = new Map<string, ReviewData[]>();
  for (const r of pool) {
    if (!buckets.has(r.category)) buckets.set(r.category, []);
    buckets.get(r.category)!.push(r);
  }
  const cats = Array.from(buckets.keys());
  const out: ReviewData[] = [];
  let i = 0;
  while (out.length < n && cats.some((c) => buckets.get(c)!.length > 0)) {
    const list = buckets.get(cats[i % cats.length])!;
    if (list.length > 0) out.push(list.shift()!);
    i++;
  }
  return out;
}

const StarIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="var(--gold)" stroke="none">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

function ScrollCard({ review }: { review: ReviewData }) {
  return (
    <div className={styles.scrollCard}>
      <div className={styles.scrollCardTop}>
        <span className={styles.scrollAuthor}>{review.nickname}</span>
        <span className={styles.scrollDate}>{shortDate(review.visited)} 방문</span>
        <div className={styles.scrollStars}>
          {[1, 2, 3, 4, 5].map((j) => <StarIcon key={j} size={10} />)}
        </div>
        <span className={styles.scrollCategory}>{review.category}</span>
      </div>
      <p className={styles.scrollText}>{review.body}</p>
    </div>
  );
}

export default function SocialProofV2() {
  const sectionRef = useRef<HTMLElement>(null);

  const { featured, scrollLeft, scrollRight, total } = useMemo(() => {
    const sorted = [...REVIEW_DATA].sort(
      (a, b) => visitedSortKey(b.visited) - visitedSortKey(a.visited),
    );

    // Featured: photos + reply + meaty body, varied categories
    const featuredPool = sorted.filter(
      (r) => r.media.length > 0 && r.reply && r.body.length >= 80 && r.body.length <= 320,
    );
    const featured = pickDiverse(featuredPool, FEATURED_COUNT);
    const usedIds = new Set(featured.map((r) => r.id));

    // Scroll columns: shorter snippets, varied categories
    const scrollPool = sorted.filter(
      (r) => !usedIds.has(r.id) && r.body.length >= 30 && r.body.length <= 180,
    );
    const scrollPicks = pickDiverse(scrollPool, SCROLL_PER_COL * 2);

    return {
      featured,
      scrollLeft: scrollPicks.slice(0, SCROLL_PER_COL),
      scrollRight: scrollPicks.slice(SCROLL_PER_COL, SCROLL_PER_COL * 2),
      total: REVIEW_DATA.length,
    };
  }, []);

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
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none none' },
        });
      }

      const reviewCards = section.querySelectorAll(`.${styles.reviewCard}`);
      if (reviewCards.length) {
        gsap.set(reviewCards, { opacity: 0, y: 40 });
        gsap.to(reviewCards, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: reviewCards[0], start: 'top 85%', toggleActions: 'play none none none' },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  // Duplicate for seamless vertical loop
  const leftItems = [...scrollLeft, ...scrollLeft];
  const rightItems = [...scrollRight, ...scrollRight];

  return (
    <section ref={sectionRef} className={styles.section} style={{ backgroundColor: '#ffffff' }}>
      <div className={styles.container}>
        <div className={styles.titleArea}>
          <div className={styles.headerTop}>
            <span className={styles.headerLabel}>REAL REVIEWS</span>
          </div>
          <div className={styles.counterRow}>
            <SlotMachineDigit value={total} suffix="" label="" delay={0} />
            <span className={styles.counterSuffix}>건의 진심이 담긴 후기</span>
          </div>
          <div className={styles.ratingRow}>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((i) => <StarIcon key={i} size={16} />)}
            </div>
            <span className={styles.ratingText}>네이버 예약 평균 4.97</span>
          </div>
        </div>
      </div>

      <div className={styles.reviewsLayout}>
        <div className={styles.scrollCol}>
          <div className={`${styles.scrollTrack} ${styles.scrollUp}`}>
            {leftItems.map((r, i) => <ScrollCard key={`${r.id}-${i}`} review={r} />)}
          </div>
        </div>

        <div className={styles.featuredCenter}>
          {featured.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.cardTop}>
                <span className={styles.authorName}>{review.nickname}</span>
                <span className={styles.authorDate}>{shortDate(review.visited)} 방문</span>
                <div className={styles.reviewStars}>
                  {[1, 2, 3, 4, 5].map((j) => <StarIcon key={j} size={13} />)}
                </div>
                <span className={styles.categoryBadge}>{review.category}</span>
              </div>
              <p className={styles.reviewText}>{review.body}</p>
            </div>
          ))}
        </div>

        <div className={styles.scrollCol}>
          <div className={`${styles.scrollTrack} ${styles.scrollDown}`}>
            {rightItems.map((r, i) => <ScrollCard key={`${r.id}-${i}`} review={r} />)}
          </div>
        </div>
      </div>

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
