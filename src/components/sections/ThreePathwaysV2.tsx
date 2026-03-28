'use client';

import { useEffect, useLayoutEffect, useRef, useCallback } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ThreePathwaysV2.module.css';

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/** Play/pause videos based on viewport visibility (staggered to avoid frame drops) */
function useLazyVideos(containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videos = (entry.target as HTMLElement).querySelectorAll('video');
          if (entry.isIntersecting) {
            // Stagger play calls across frames to avoid simultaneous decode
            videos.forEach((v, i) => {
              setTimeout(() => v.play().catch(() => {}), i * 100);
            });
          } else {
            videos.forEach((v) => v.pause());
          }
        });
      },
      { threshold: 0.1 },
    );

    const cards = container.querySelectorAll(`.${styles.pathCard}`);
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [containerRef]);
}

const PATHWAYS = [
  {
    id: 'b2b',
    title: 'B2B 웰니스',
    sub: '성장하는 기업, 건강한 조직과 함께합니다',
    desc: '임직원 근골격 복지부터 VIP 행사 케어까지 맞춤형 웰니스',
    link: '/b2b',
    linkText: '포트폴리오 보기',
    videos: ['/videos/pathways/b2b_1.mp4', '/videos/pathways/b2b_2.mp4', '/videos/pathways/b2b_3.mp4'],
    bgColor: '#f9f7f4',
  },
  {
    id: 'class',
    title: '클래스/특강',
    sub: '15년 현장 경험으로 완성한 테라피 교육',
    desc: '원데이 특강부터 Level 1~5 정규 과정, 소규모 정원제',
    link: '/class',
    linkText: '커리큘럼 보기',
    videos: ['/videos/pathways/class_1.mp4', '/videos/pathways/class_2.mp4', '/videos/pathways/class_3.mp4'],
    dark: true,
    bgColor: '#2c2c2c',
  },
  {
    id: 'therapy',
    title: 'AURUME THERAPY',
    enFont: true,
    sub: '전문성과 품격을 동시에 갖춘 테라피',
    desc: '몸의 구조를 이해하고 설계하는 웰니스 뷰티 테라피',
    link: '/therapy',
    linkText: '프로그램 보기',
    videos: ['/videos/pathways/therapy_1.mp4', '/videos/pathways/therapy_2.mp4', '/videos/pathways/therapy_3.mp4'],
    bgColor: '#f9f7f4',
  },
];

const INTRO_HEADING = '손끝에서 시작되는 치유,\n마음으로 완성되는 경험.';
const INTRO_BODY = '아우름(Aurum)은 라틴어로 \'금\'입니다.\n변치 않는 가치 — 과학, 정성, 그리고 진심.\n\n클래스에서 전문 인력을 양성하고,\n행사에서 브랜드 경험을 확장하며,\n샵에서 깊이 있는 결과를 만듭니다.';

export default function ThreePathwaysV2() {
  const sectionRef = useRef<HTMLElement>(null);
  useLazyVideos(sectionRef);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const introEls = section.querySelectorAll(`.${styles.introReveal}`);
      const cards = section.querySelectorAll(`.${styles.pathCard}`);

      ScrollTrigger.matchMedia({
        '(min-width: 768px)': () => {
          // Intro stagger reveal
          if (introEls.length) {
            gsap.set(introEls, { opacity: 0, y: 20 });
            gsap.to(introEls, {
              opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out',
              scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none none' },
            });
          }

          // Each card reveal on scroll
          cards.forEach((card) => {
            const content = card.querySelector(`.${styles.cardContent}`);
            const videoWrap = card.querySelector(`.${styles.cardVideoGrid}`);

            if (content) {
              gsap.set(content, { opacity: 0, x: -30 });
              gsap.to(content, {
                opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
                scrollTrigger: { trigger: card, start: 'top 75%', toggleActions: 'play none none none' },
              });
            }

            if (videoWrap) {
              gsap.set(videoWrap, { opacity: 0, x: 30 });
              gsap.to(videoWrap, {
                opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
                scrollTrigger: { trigger: card, start: 'top 75%', toggleActions: 'play none none none' },
              });
            }
          });
        },

        '(max-width: 767px)': () => {
          if (introEls.length) gsap.set(introEls, { opacity: 1, y: 0 });
          cards.forEach((card) => {
            const content = card.querySelector(`.${styles.cardContent}`);
            const videoWrap = card.querySelector(`.${styles.cardVideoGrid}`);
            if (content) gsap.set(content, { opacity: 1, x: 0 });
            if (videoWrap) gsap.set(videoWrap, { opacity: 1, x: 0 });
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Intro — Brand Philosophy */}
      <div className={styles.intro}>
        <span className={`${styles.introLabel} ${styles.introReveal}`}>AURUME WELLNESS</span>
        <h2 className={`${styles.introHeading} ${styles.introReveal}`}>
          {INTRO_HEADING.split('\n').map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}
        </h2>
        <div className={`${styles.decoLine} ${styles.introReveal}`} />
        <p className={`${styles.introBody} ${styles.introReveal}`}>
          <span className={styles.introBodyFirst}>{INTRO_BODY.split('\n')[0]}</span>
          <span className={`${styles.introBodyTight} ${styles.introBodyLastBlock}`}>
            {INTRO_BODY.split('\n').slice(1).join('\n')}
          </span>
        </p>
      </div>

      {/* 3 Cards — Left text, Right video */}
      {PATHWAYS.map((p) => (
        <div
          key={p.id}
          className={`${styles.pathCard} ${p.dark ? styles.pathCardDark : ''}`}
          style={{ background: p.bgColor }}
        >
          <div className={styles.cardInner}>
            <div className={styles.cardContent}>
              <h3 className={`${styles.cardTitle} ${'enFont' in p ? styles.cardTitleEn : ''}`}>
                {p.title}
              </h3>
              <p className={styles.cardSub}>{p.sub}</p>
              <p className={styles.cardDesc}>{p.desc}</p>
              <a href={p.link} className={styles.cardLink}>
                {p.linkText}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
            <div className={styles.cardVideoGrid}>
              <div className={`${styles.cardVideoWrap} ${styles.videoWide}`}>
                <video src={p.videos[2]} muted loop playsInline preload="metadata" className={styles.videoEl} />
              </div>
              <div className={styles.cardVideoWrap}>
                <video src={p.videos[0]} muted loop playsInline preload="metadata" className={styles.videoEl} />
              </div>
              <div className={styles.cardVideoWrap}>
                <video src={p.videos[1]} muted loop playsInline preload="metadata" className={styles.videoEl} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
