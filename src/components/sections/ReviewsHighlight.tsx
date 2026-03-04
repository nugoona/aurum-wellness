'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import { REVIEWS_HIGHLIGHT } from '@/data/siteData';
import styles from './ReviewsHighlight.module.css';

export default function ReviewsHighlight() {
  return (
    <section className="section section--white">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-header__label">REVIEWS</span>
            <h2 className="section-header__title">고객님들의 이야기</h2>
          </div>
        </ScrollReveal>

        <div className={styles.track}>
          {REVIEWS_HIGHLIGHT.map((review, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className={styles.card}>
                <div className={styles.stars}>
                  {'★'.repeat(review.rating)}
                </div>
                <span className={styles.badge}>{review.category}</span>
                <p className={styles.text}>{review.text}</p>
                <div className={styles.meta}>
                  <span>{review.author}</span>
                  <span>{review.date}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
