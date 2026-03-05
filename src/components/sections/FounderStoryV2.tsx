'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './FounderStoryV2.module.css';

gsap.registerPlugin(ScrollTrigger);

const CREDENTIALS = [
  '한국체육대학교 체육학 석사 (건강교육학)',
  '한국체육대학교 한국응용해부연구소 협력기관',
  'ACSM-Korea PFT 미국스포츠의학회 인증',
  '이화여대병원 카데바 해부 워크샵 Certificate',
  'FISAF KOREA 국제자격증',
  'RTS(재활전문가) LV1,2',
  '국가공인 생활스포츠지도사 2급',
  '인천 유일 딸고(THALGO) 인증점',
];

const BENTO_IMAGES = [
  { src: '/images/founder/study.jpg', alt: '해부학 연구', label: '설계' },
  { src: '/images/founder/teach.jpg', alt: '클래스 교육', label: '교육' },
  { src: '/images/founder/therapy.jpg', alt: '테라피 시술', label: '시술' },
  { src: '/images/founder/consult.jpg', alt: '1:1 상담', label: '상담' },
  { src: '/images/founder/detail.jpg', alt: '전문 도구', label: '디테일' },
  { src: '/images/founder/space.jpg', alt: '테라피룸', label: '공간' },
];

export default function FounderStoryV2() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const label = section.querySelector(`.${styles.label}`);
      const titleWords = section.querySelectorAll(`.${styles.titleWord}`);
      const decoLine = section.querySelector(`.${styles.decoLine}`);
      const quote = section.querySelector(`.${styles.quote}`);
      const quoteAuthor = section.querySelector(`.${styles.quoteAuthor}`);
      const credItems = section.querySelectorAll(`.${styles.credItem}`);
      const bentoItems = section.querySelectorAll(`.${styles.bentoItem}`);

      ScrollTrigger.matchMedia({
        '(min-width: 768px)': () => {
          // Label
          if (label) {
            gsap.set(label, { opacity: 0, y: 10 });
            gsap.to(label, {
              opacity: 1, y: 0, duration: 0.6,
              scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none none' },
            });
          }

          // Title words stagger
          gsap.set(titleWords, { opacity: 0, y: 40 });
          gsap.to(titleWords, {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none none' },
          });

          // Bento images stagger reveal
          gsap.set(bentoItems, { opacity: 0, y: 30, scale: 0.95 });
          gsap.to(bentoItems, {
            opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: section.querySelector(`.${styles.bentoGrid}`), start: 'top 75%', toggleActions: 'play none none none' },
          });

          // Deco line
          if (decoLine) {
            gsap.set(decoLine, { scaleX: 0 });
            gsap.to(decoLine, {
              scaleX: 1, duration: 0.8, ease: 'power2.out',
              scrollTrigger: { trigger: quote, start: 'top 80%', toggleActions: 'play none none none' },
            });
          }

          // Quote
          if (quote) {
            gsap.set(quote, { opacity: 0, y: 20 });
            gsap.to(quote, {
              opacity: 1, y: 0, duration: 0.7,
              scrollTrigger: { trigger: quote, start: 'top 80%', toggleActions: 'play none none none' },
            });
          }

          if (quoteAuthor) {
            gsap.set(quoteAuthor, { opacity: 0 });
            gsap.to(quoteAuthor, {
              opacity: 1, duration: 0.5, delay: 0.3,
              scrollTrigger: { trigger: quote, start: 'top 80%', toggleActions: 'play none none none' },
            });
          }

          // Credentials stagger
          gsap.set(credItems, { opacity: 0, x: -30 });
          gsap.to(credItems, {
            opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: credItems[0], start: 'top 85%', toggleActions: 'play none none none' },
          });
        },

        '(max-width: 767px)': () => {
          if (label) gsap.set(label, { opacity: 1, y: 0 });
          gsap.set(titleWords, { opacity: 1, y: 0 });
          gsap.set(bentoItems, { opacity: 1, y: 0, scale: 1 });
          if (decoLine) gsap.set(decoLine, { scaleX: 1 });
          if (quote) gsap.set(quote, { opacity: 1, y: 0 });
          if (quoteAuthor) gsap.set(quoteAuthor, { opacity: 1 });
          gsap.set(credItems, { opacity: 1, x: 0 });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        {/* Title area */}
        <div className={styles.titleArea}>
          <span className={styles.label}>FOUNDER & LEAD THERAPIST</span>
          <h2 className={styles.title}>
            {['대표', '테라피스트가'].map((w, i) => (
              <span key={i} className={styles.titleWord}>{w}</span>
            ))}
            <br />
            {['직접', '설계하고,'].map((w, i) => (
              <span key={`a${i}`} className={styles.titleWord}>{w}</span>
            ))}
            <br />
            {['직접', '교육하고,'].map((w, i) => (
              <span key={`b${i}`} className={styles.titleWord}>{w}</span>
            ))}
            <br />
            {['직접', '시술합니다'].map((w, i) => (
              <span key={`c${i}`} className={styles.titleWord}>{w}</span>
            ))}
          </h2>
        </div>

        {/* Bento Grid */}
        <div className={styles.bentoGrid}>
          {/* Row 1: 3 landscape images */}
          <div className={`${styles.bentoItem} ${styles.bentoTop1}`}>
            <Image src={BENTO_IMAGES[0].src} alt={BENTO_IMAGES[0].alt} fill sizes="33vw" style={{ objectFit: 'cover' }} />
            <span className={styles.bentoLabel}>{BENTO_IMAGES[0].label}</span>
          </div>
          <div className={`${styles.bentoItem} ${styles.bentoTop2}`}>
            <Image src={BENTO_IMAGES[1].src} alt={BENTO_IMAGES[1].alt} fill sizes="33vw" style={{ objectFit: 'cover' }} />
            <span className={styles.bentoLabel}>{BENTO_IMAGES[1].label}</span>
          </div>
          <div className={`${styles.bentoItem} ${styles.bentoTop3}`}>
            <Image src={BENTO_IMAGES[2].src} alt={BENTO_IMAGES[2].alt} fill sizes="33vw" style={{ objectFit: 'cover' }} />
            <span className={`${styles.bentoLabel} ${styles.bentoLabelDark}`}>{BENTO_IMAGES[2].label}</span>
          </div>

          {/* Row 2: Text + Portrait image */}
          <div className={`${styles.bentoItem} ${styles.bentoText}`}>
            <div className={styles.decoLine} />
            <blockquote className={styles.quote}>
              <span className={styles.quoteLine}>
                <span className={styles.quoteOpen}>&ldquo;</span>
                단순히 근육을 푸는 마사지가 아니라, 몸의 구조를 이해하고 설계하는
              </span>
              <span className={styles.quoteLineIndent}>
                웰니스 뷰티 테라피입니다.<span className={styles.quoteClose}>&rdquo;</span>
              </span>
            </blockquote>
            <p className={styles.quoteAuthor}>
              <svg width="16" height="1" viewBox="0 0 16 1" className={styles.dashSvg}>
                <line x1="0" y1="0.5" x2="16" y2="0.5" stroke="currentColor" strokeWidth="1" />
              </svg>
              김순재, 아우름 웰니스 대표
            </p>
          </div>
          <div className={`${styles.bentoItem} ${styles.bentoConsult}`}>
            <Image src={BENTO_IMAGES[3].src} alt={BENTO_IMAGES[3].alt} fill sizes="33vw" style={{ objectFit: 'cover' }} />
            <span className={styles.bentoLabel}>{BENTO_IMAGES[3].label}</span>
          </div>

          {/* Row 3: Square + Wide */}
          <div className={`${styles.bentoItem} ${styles.bentoDetail}`}>
            <Image src={BENTO_IMAGES[4].src} alt={BENTO_IMAGES[4].alt} fill sizes="25vw" style={{ objectFit: 'cover' }} />
            <span className={`${styles.bentoLabel} ${styles.bentoLabelDark}`}>{BENTO_IMAGES[4].label}</span>
          </div>
          <div className={`${styles.bentoItem} ${styles.bentoSpace}`}>
            <Image src={BENTO_IMAGES[5].src} alt={BENTO_IMAGES[5].alt} fill sizes="66vw" style={{ objectFit: 'cover' }} />
            <span className={styles.bentoLabel}>{BENTO_IMAGES[5].label}</span>
          </div>
        </div>

        {/* Credentials */}
        <div className={styles.credCol}>
          <ul className={styles.credList}>
            {CREDENTIALS.map((item, i) => (
              <li key={i} className={styles.credItem}>
                <span className={styles.credDot} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
