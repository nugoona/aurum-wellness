'use client';

import { useState } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import type { Program } from '@/data/therapyData';
import styles from './Programs.module.css';

interface ProgramsProps {
  categories: Record<string, Program[]>;
}

export default function Programs({ categories }: ProgramsProps) {
  const tabs = Object.keys(categories);
  const [active, setActive] = useState(tabs[0]);

  return (
    <section className="section section--alt">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-header__label">PROGRAMS</span>
            <h2 className="section-header__title">테라피 프로그램</h2>
            <p className="section-header__sub">몸과 마음의 균형을 되찾는 맞춤 케어</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className={styles.tabs}>
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`${styles.tab} ${active === tab ? styles.tabActive : ''}`}
                onClick={() => setActive(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className={styles.list}>
          {categories[active].map((prog, i) => (
            <ScrollReveal key={`${active}-${i}`} delay={i * 0.1}>
              <div className={`${styles.item} ${i % 2 === 1 ? styles.itemReverse : ''}`}>
                <div className={styles.imageWrap}>
                  <div
                    className={styles.image}
                    style={{ backgroundImage: `url(${prog.image})` }}
                  />
                </div>
                <div className={styles.text}>
                  <span className={styles.nameEn}>{prog.nameEn}</span>
                  <h3 className={styles.nameKo}>{prog.nameKo}</h3>
                  <p className={styles.desc}>{prog.desc}</p>
                  {prog.method && (
                    <p className={styles.method}>
                      <strong>진행방법:</strong> {prog.method}
                    </p>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
