'use client';

import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import type { ClassReview } from '@/data/classData';
import styles from './ClassReviews.module.css';

const INITIAL_MOBILE = 2;
const LOAD_MORE = 2;
const DESKTOP_BP = 768;

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const frac = rating - full; // 0 ~ 0.9

  return (
    <div className={styles.stars}>
      {Array.from({ length: 5 }, (_, i) => {
        if (i < full) {
          // fully filled star
          return <Star key={i} size={16} fill="var(--gold)" stroke="var(--gold)" />;
        }
        if (i === full && frac > 0) {
          // partially filled star — clip the gold overlay
          const pct = Math.round(frac * 100);
          return (
            <span key={i} className={styles.starPartial}>
              <Star size={16} fill="none" stroke="var(--gray-300)" />
              <span
                className={styles.starClip}
                style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
              >
                <Star size={16} fill="var(--gold)" stroke="var(--gold)" />
              </span>
            </span>
          );
        }
        // empty star
        return <Star key={i} size={16} fill="none" stroke="var(--gray-300)" />;
      })}
    </div>
  );
}

export default function ClassReviews({ reviews }: { reviews: ClassReview[] }) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [mobileCount, setMobileCount] = useState(INITIAL_MOBILE);

  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${DESKTOP_BP}px)`);
    const handle = (e: MediaQueryListEvent | MediaQueryList) => setIsDesktop(e.matches);
    handle(mql);
    mql.addEventListener('change', handle);
    return () => mql.removeEventListener('change', handle);
  }, []);

  const visibleReviews = isDesktop ? reviews : reviews.slice(0, mobileCount);
  const hasMore = !isDesktop && mobileCount < reviews.length;
  const isExpanded = !isDesktop && mobileCount > INITIAL_MOBILE;

  return (
    <section className="section section--alt">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-header__label">REVIEWS</span>
            <h2 className="section-header__title">교육 후기</h2>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {visibleReviews.map((review, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div className={styles.card}>
                <StarRating rating={review.rating} />
                <p className={styles.text}>&ldquo;{review.text}&rdquo;</p>
                <div className={styles.meta}>
                  <span className={styles.name}>
                    {review.name} ({review.age})
                  </span>
                  <span className={styles.className}>{review.className}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* 더보기 / 접기 — mobile only */}
        {!isDesktop && (hasMore || isExpanded) && (
          <div className={styles.loadMore}>
            {hasMore && (
              <button
                className={styles.loadMoreBtn}
                onClick={() => setMobileCount((c) => c + LOAD_MORE)}
              >
                더보기 ({reviews.length - mobileCount}건 남음)
              </button>
            )}
            {isExpanded && (
              <button
                className={styles.loadMoreBtn}
                onClick={() => setMobileCount(INITIAL_MOBILE)}
              >
                접기
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
