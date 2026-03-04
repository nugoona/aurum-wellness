'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { EVENT_HISTORY } from '@/data/b2bPortfolioData';
import { CLIENT_LOGOS } from '@/data/siteData';
import styles from './EventHistory.module.css';

const years = Object.keys(EVENT_HISTORY).sort((a, b) => Number(b) - Number(a));
const CUTOFF_YEAR = 2023;
const LOGO_ROWS = 4;
const LOGO_COLS = 3;
const DESKTOP_BP = 768;

export default function EventHistory() {
  const [showAllYears, setShowAllYears] = useState(false);
  const [showAllLogos, setShowAllLogos] = useState(false);

  // Desktop: show all content (buttons hidden via CSS)
  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${DESKTOP_BP}px)`);
    const handle = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) { setShowAllYears(true); setShowAllLogos(true); }
      else { setShowAllYears(false); setShowAllLogos(false); }
    };
    handle(mql);
    mql.addEventListener('change', handle);
    return () => mql.removeEventListener('change', handle);
  }, []);

  const visibleYears = showAllYears ? years : years.filter(y => Number(y) >= CUTOFF_YEAR);
  const hiddenCount = years.length - visibleYears.length;

  const visibleLogos = showAllLogos ? CLIENT_LOGOS : CLIENT_LOGOS.slice(0, LOGO_ROWS * LOGO_COLS);
  const hiddenLogoCount = CLIENT_LOGOS.length - visibleLogos.length;

  return (
    <div className={styles.splitWrap}>
      <div className={styles.splitInner}>
      {/* Left: HISTORY — dark */}
      <section className={`section ${styles.section}`}>
        <div className={styles.historyInner}>
          <ScrollReveal>
            <div className={styles.columnHeader}>
              <span className={styles.columnLabel}>HISTORY</span>
              <h2 className={styles.columnTitle}>현장의 기록</h2>
            </div>
          </ScrollReveal>
          <div className={styles.timeline}>
            {visibleYears.map((year, yi) => {
              const events = EVENT_HISTORY[year];
              const corpEvents = events.filter(e => e.category === '기업 복지');
              const vipEvents = events.filter(e => e.category === 'VIP 행사');
              return (
                <ScrollReveal key={year} delay={yi * 0.05}>
                  <div className={styles.yearBlock}>
                    <div className={styles.yearCol}>
                      <span className={styles.year}>{year}</span>
                      <span className={styles.eventCount}>{events.length}건</span>
                    </div>
                    <div className={styles.line} />
                    <div className={styles.eventsCol}>
                      {corpEvents.length > 0 && (
                        <div className={styles.eventGroup}>
                          {corpEvents.map((ev, i) => (
                            <span key={i} className={styles.client}>
                              {ev.client}
                            </span>
                          ))}
                        </div>
                      )}
                      {vipEvents.length > 0 && (
                        <div className={styles.eventGroup}>
                          {vipEvents.map((ev, i) => (
                            <span key={i} className={`${styles.client} ${styles.clientVip}`}>
                              {ev.client}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
          {!showAllYears && hiddenCount > 0 && (
            <button
              className={styles.moreBtn}
              onClick={() => setShowAllYears(true)}
            >
              {years[years.length - 1]}~{CUTOFF_YEAR - 1}년 기록 더보기
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          )}
        </div>
      </section>

      {/* Right: PARTNERS — light */}
      <section className={styles.logoSide}>
        <div className={styles.logoSticky}>
          <div className={styles.columnHeader}>
            <span className={styles.columnLabel}>PARTNERS</span>
            <h2 className={styles.partnersTitle}>파트너 기업</h2>
          </div>
          <div className={styles.logoGrid}>
            {visibleLogos.map((logo) => (
              <div key={logo.src} className={styles.logoItem}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={45}
                  className={styles.logoImg}
                />
              </div>
            ))}
          </div>
          {!showAllLogos && hiddenLogoCount > 0 && (
            <button
              className={styles.logoMoreBtn}
              onClick={() => setShowAllLogos(true)}
            >
              +{hiddenLogoCount}개 더보기
            </button>
          )}
        </div>
      </section>
      </div>
    </div>
  );
}
