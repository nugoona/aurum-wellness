'use client';

import { useEffect, useRef } from 'react';
import { FEATURED_CORPORATE, FEATURED_VIP } from '@/data/b2bPortfolioData';
import styles from './PhotoWall.module.css';

/**
 * PhotoWall — Featured 이미지 124장을 5줄 무한 흘러가는 모자이크로 표시.
 * 각 줄은 다른 방향·속도로 CSS animation.
 * 스크롤 시 보이지 않을 때 pause (Intersection Observer).
 */

const ROWS = 5;

// Combine all featured images
const allImages = [
  ...FEATURED_CORPORATE.map(e => e.image),
  ...FEATURED_VIP.map(e => e.image),
];

function buildRows(): string[][] {
  // Shuffle deterministically using index-based interleave
  const shuffled = [...allImages];
  // Simple interleave: take every 5th item for each row
  const rows: string[][] = [];
  for (let r = 0; r < ROWS; r++) {
    const row: string[] = [];
    for (let i = r; i < shuffled.length; i += ROWS) {
      row.push(shuffled[i]);
    }
    rows.push(row);
  }
  return rows;
}

const imageRows = buildRows();

// 각 줄의 애니메이션 설정
const rowConfigs = [
  { direction: 'left', duration: 80 },
  { direction: 'right', duration: 100 },
  { direction: 'left', duration: 70 },
  { direction: 'right', duration: 90 },
  { direction: 'left', duration: 75 },
];

export default function PhotoWall() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Pause animation when not visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        el.style.setProperty('--play-state', entry.isIntersecting ? 'running' : 'paused');
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      {/* Dark overlay for title */}
      <div className={styles.overlay}>
        <div className={styles.titleBlock}>
          <span className={styles.label}>PORTFOLIO</span>
          <h2 className={styles.title}>500<span className={styles.plus}>+</span></h2>
          <p className={styles.subtitle}>현장의 기록</p>
        </div>
      </div>

      {/* Photo rows */}
      <div className={styles.wall}>
        {imageRows.map((row, ri) => (
          <div
            key={ri}
            className={styles.row}
            style={{
              animationDirection: rowConfigs[ri].direction === 'right' ? 'reverse' : 'normal',
              animationDuration: `${rowConfigs[ri].duration}s`,
            }}
          >
            {/* Duplicate for seamless loop */}
            {[...row, ...row].map((src, ci) => (
              <div key={ci} className={styles.thumb}>
                <img src={src} alt="" loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
