'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SlotMachineDigit from '@/components/ui/SlotMachineDigit';
import { CLIENT_LOGOS } from '@/data/siteData';
import styles from './TrustEvidenceV2.module.css';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 15, suffix: '+', label: '연속 파트너십 연수' },
  { value: 500, suffix: '+', label: '누적 행사 운영' },
  { value: 200, suffix: '+', label: '재계약 기업 수' },
  { value: 5000, suffix: '+', label: '누적 재방문 고객' },
];

export default function TrustEvidenceV2() {
  const sectionRef = useRef<HTMLElement>(null);

  // Title reveal animation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const title = section.querySelector(`.${styles.title}`);
      if (title) {
        gsap.set(title, { opacity: 0, y: 40 });
        gsap.to(title, {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  // Split logos into two rows, duplicate for seamless CSS loop
  const half = Math.ceil(CLIENT_LOGOS.length / 2);
  const row1 = CLIENT_LOGOS.slice(0, half);
  const row2 = CLIENT_LOGOS.slice(half);

  return (
    <>
      {/* Numbers — dark background */}
      <section ref={sectionRef} className={styles.section}>
        <div className={styles.numbersWrap}>
          <h2 className={styles.title}>숫자로 증명하는 여정</h2>
          <div className={styles.statsGrid}>
            {STATS.map((stat, i) => (
              <SlotMachineDigit
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                delay={i * 200}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Logo marquee — white background, CSS infinite animation */}
      <div className={styles.logoSection}>
        <div className={styles.marqueeWrap}>
          {/* Row 1: scrolls left */}
          <div className={styles.marqueeTrack}>
            <div className={`${styles.marqueeInner} ${styles.scrollLeft}`}>
              {[...row1, ...row1].map((logo, i) => (
                <div key={i} className={styles.logoItem}>
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={100}
                    height={50}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: scrolls right */}
          <div className={styles.marqueeTrack}>
            <div className={`${styles.marqueeInner} ${styles.scrollRight}`}>
              {[...row2, ...row2].map((logo, i) => (
                <div key={i} className={styles.logoItem}>
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={100}
                    height={50}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
