'use client';

import { useState, useEffect } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { FEATURED_CORPORATE, FEATURED_VIP, type FeaturedEvent } from '@/data/b2bPortfolioData';
import styles from './FeaturedEvents.module.css';

const CORP_PER_PAGE_DESKTOP = 10;
const VIP_PER_PAGE_DESKTOP = 8;
const MOBILE_PER_PAGE = 9; // 3×3

function EventCard({ event, size = 'normal' }: { event: FeaturedEvent; size?: 'large' | 'normal' }) {
  return (
    <div className={`${styles.card} ${size === 'large' ? styles.cardLarge : ''}`}>
      <div className={styles.cardImage} style={{ backgroundImage: `url(${event.image})` }} />
      <div className={styles.cardOverlay} />
      <div className={styles.cardInfo}>
        <span className={styles.cardYear}>{event.year}</span>
        <span className={styles.cardClient}>{event.client}</span>
        <span className={styles.cardDesc}>{event.desc}</span>
      </div>
    </div>
  );
}

function PageNav({
  page, total, onPrev, onNext,
}: { page: number; total: number; onPrev: () => void; onNext: () => void }) {
  if (total <= 1) return null;
  return (
    <div className={styles.pageNav}>
      <button className={styles.arrow} onClick={onPrev} disabled={page === 0} aria-label="이전">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      <span className={styles.pageInfo}>{page + 1}<span className={styles.pageSep}>/</span>{total}</span>
      <button className={styles.arrow} onClick={onNext} disabled={page === total - 1} aria-label="다음">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    </div>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 767);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

export default function FeaturedEvents() {
  const isMobile = useIsMobile();
  const [corpPage, setCorpPage] = useState(0);
  const [vipPage, setVipPage] = useState(0);

  const corpPerPage = isMobile ? MOBILE_PER_PAGE : CORP_PER_PAGE_DESKTOP;
  const vipPerPage = isMobile ? MOBILE_PER_PAGE : VIP_PER_PAGE_DESKTOP;

  const corpPages = Math.ceil(FEATURED_CORPORATE.length / corpPerPage);
  const vipPages = Math.ceil(FEATURED_VIP.length / vipPerPage);

  // Reset page if it exceeds new total when switching breakpoints
  useEffect(() => {
    if (corpPage >= corpPages) setCorpPage(Math.max(0, corpPages - 1));
  }, [corpPage, corpPages]);
  useEffect(() => {
    if (vipPage >= vipPages) setVipPage(Math.max(0, vipPages - 1));
  }, [vipPage, vipPages]);

  const corpSlice = FEATURED_CORPORATE.slice(corpPage * corpPerPage, (corpPage + 1) * corpPerPage);
  const vipSlice = FEATURED_VIP.slice(vipPage * vipPerPage, (vipPage + 1) * vipPerPage);

  return (
    <section className="section section--alt">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-header__label">FEATURED EVENTS</span>
            <h2 className="section-header__title">주요 행사</h2>
          </div>
        </ScrollReveal>

        {/* Corporate */}
        <div className={styles.categoryHeader}>
          <div className={styles.categoryLabel}>Corporate Welfare</div>
          <PageNav
            page={corpPage}
            total={corpPages}
            onPrev={() => setCorpPage(p => p - 1)}
            onNext={() => setCorpPage(p => p + 1)}
          />
        </div>
        <div className={styles.bentoGrid} key={`corp-${corpPage}`}>
          {corpSlice.map((event, i) => (
            <EventCard key={`${event.client}-${event.year}`} event={event} size={!isMobile && i < 2 ? 'large' : 'normal'} />
          ))}
        </div>

        {/* VIP */}
        <div className={styles.categoryHeader} style={{ marginTop: '48px' }}>
          <div className={styles.categoryLabel}>Brand &amp; VIP Event</div>
          <PageNav
            page={vipPage}
            total={vipPages}
            onPrev={() => setVipPage(p => p - 1)}
            onNext={() => setVipPage(p => p + 1)}
          />
        </div>
        <div className={styles.vipStrip} key={`vip-${vipPage}`}>
          {vipSlice.map((event) => (
            <EventCard key={`${event.client}-${event.year}`} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
