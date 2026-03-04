'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import { CLASS_LEVELS } from '@/data/classData';
import styles from './ClassTypes.module.css';

interface ClassItem {
  title: string;
  subtitle: string;
  desc: string;
  mobileDesc?: string;
  image: string;
  features: string[];
  mobileFeatures?: string[];
  featureIcons?: readonly string[];
  showLevelRoadmap?: boolean;
}

export default function ClassTypes({ classes }: { classes: ClassItem[] }) {
  return (
    <section className="section section--white">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-header__label">CLASSES</span>
            <h2 className="section-header__title">클래스 프로그램</h2>
          </div>
        </ScrollReveal>

        {/* 2-column cards */}
        <div className={styles.grid}>
          {classes.map((cls, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <div className={styles.card}>
                <div className={`${styles.heroCard} ${i === 0 ? styles.heroCardA : styles.heroCardB}`}>
                  <div className={styles.heroAccentLine} />
                  <span className={styles.heroLabel}>
                    PROGRAM {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className={styles.heroTitle}>{cls.title}</h3>
                  <span className={styles.heroSub}>{cls.subtitle}</span>
                  <div className={styles.heroCorner}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>

                <div className={styles.body}>
                  {/* Desktop description */}
                  <p className={styles.desc}>{cls.desc}</p>
                  {/* Mobile description */}
                  {cls.mobileDesc && (
                    <p className={styles.descMobile}>{cls.mobileDesc}</p>
                  )}

                  {/* Desktop features */}
                  <ul className={styles.features}>
                    {cls.features.map((f, j) => (
                      <li key={j} className={styles.featureItem}>
                        <span className={styles.bullet} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  {/* Mobile features */}
                  {cls.mobileFeatures && (
                    <ul className={styles.featuresMobile}>
                      {cls.mobileFeatures.map((f, j) => (
                        <li key={j} className={styles.featureItemMobile}>
                          <span className={styles.bullet} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Full-width curriculum roadmap */}
        <ScrollReveal delay={0.3}>
          <div className={styles.roadmap}>
            <div className={styles.roadmapHeader}>
              <span className={styles.roadmapLabel}>CURRICULUM</span>
              <span className={styles.roadmapSub}>정규 클래스 단계별 커리큘럼</span>
            </div>
            <div className={styles.roadmapTrack}>
              <div className={styles.roadmapLine}>
                <div className={styles.roadmapLineFill} />
              </div>
              {CLASS_LEVELS.map((lv, k) => (
                <div
                  key={k}
                  className={`${styles.roadmapStep} ${lv.open ? styles.stepOpen : styles.stepLocked}`}
                >
                  <div className={styles.stepDot}>
                    <span className={styles.stepDotInner} />
                  </div>
                  <span className={styles.stepLevel}>{lv.level}</span>
                  <span className={styles.stepTitle}>{lv.title}</span>
                  <span className={styles.stepDesc}>
                    {lv.desc.includes('\n') ? lv.desc.split('\n').map((line, li) => (
                      <span key={li}>
                        {li > 0 && <br className={styles.desktopBr} />}
                        {li > 0 && <span className={styles.mobileSep}>, </span>}
                        {line}
                      </span>
                    )) : lv.desc}
                  </span>
                  {!lv.open && (
                    <span className={styles.stepBadge}>Coming Soon</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
