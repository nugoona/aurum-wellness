'use client';

import { useState } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import styles from './Portfolio.module.css';

interface PortfolioItem {
  client: string;
  year: string;
  category: string;
  image: string;
}

export default function Portfolio({ items }: { items: PortfolioItem[] }) {
  const [filter, setFilter] = useState('전체');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const categories = ['전체', '기업 복지', 'VIP 행사'];
  const filtered = filter === '전체' ? items : items.filter((item) => item.category === filter);

  const openLightbox = (i: number) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);
  const prev = () => setLightbox((c) => (c !== null && c > 0 ? c - 1 : filtered.length - 1));
  const next = () => setLightbox((c) => (c !== null && c < filtered.length - 1 ? c + 1 : 0));

  return (
    <section className="section section--alt">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-header__label">PORTFOLIO</span>
            <h2 className="section-header__title">현장의 기록</h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className={styles.tabs}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.tab} ${filter === cat ? styles.tabActive : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {filtered.map((item, i) => (
            <ScrollReveal key={`${item.client}-${i}`} delay={i * 0.05}>
              <div className={styles.item} onClick={() => openLightbox(i)}>
                <div
                  className={styles.image}
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className={styles.overlay}>
                  <span className={styles.client}>{item.client}</span>
                  <span className={styles.yearCat}>{item.year} · {item.category}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && filtered[lightbox] && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button className={styles.lbClose} onClick={closeLightbox}>&times;</button>
          <button className={styles.lbPrev} onClick={(e) => { e.stopPropagation(); prev(); }}>&lsaquo;</button>
          <div className={styles.lbContent} onClick={(e) => e.stopPropagation()}>
            <img src={filtered[lightbox].image} alt={filtered[lightbox].client} className={styles.lbImage} />
            <div className={styles.lbInfo}>
              <span className={styles.lbClient}>{filtered[lightbox].client}</span>
              <span className={styles.lbMeta}>{filtered[lightbox].year} · {filtered[lightbox].category}</span>
            </div>
          </div>
          <button className={styles.lbNext} onClick={(e) => { e.stopPropagation(); next(); }}>&rsaquo;</button>
        </div>
      )}
    </section>
  );
}
