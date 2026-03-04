'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './BrandManifestoV2.module.css';

gsap.registerPlugin(ScrollTrigger);

const MAIN_COPY = '손끝에서 시작되는 치유,\n마음으로 완성되는 경험.';

const BODY_TEXT = `아우르메(Aurum)는 라틴어로 '금'을 뜻합니다.
금처럼 변하지 않는 가치 — 과학적 근거, 정성 어린 손길, 그리고 진심.
15년간 한결같이 지켜온 이 원칙이
5,000명의 개인 고객과 30개 기업의 웰니스를,
그리고 다음 세대 전문가의 성장을 만들어왔습니다.`;

export default function BrandManifestoV2() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const label = section.querySelector(`.${styles.label}`);
      const mainWords = section.querySelectorAll(`.${styles.mainWord}`);
      const decoLine = section.querySelector(`.${styles.decoLine}`);
      const body = section.querySelector(`.${styles.body}`);

      ScrollTrigger.matchMedia({
        '(min-width: 768px)': () => {
          // Label
          if (label) {
            gsap.set(label, { opacity: 0, y: 10 });
            gsap.to(label, {
              opacity: 1, y: 0, duration: 0.6,
              scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none none' },
            });
          }

          // Main copy: word-by-word scrub reveal
          if (mainWords.length) {
            gsap.set(mainWords, { opacity: 0.15 });
            gsap.to(mainWords, {
              opacity: 1,
              stagger: 0.1,
              scrollTrigger: {
                trigger: section,
                start: 'top 60%',
                end: 'center 40%',
                scrub: 0.5,
              },
            });
          }

          // Deco line
          if (decoLine) {
            gsap.set(decoLine, { scaleX: 0 });
            gsap.to(decoLine, {
              scaleX: 1, duration: 0.8,
              scrollTrigger: { trigger: body, start: 'top 80%', toggleActions: 'play none none none' },
            });
          }

          // Body text
          if (body) {
            gsap.set(body, { opacity: 0, y: 30 });
            gsap.to(body, {
              opacity: 1, y: 0, duration: 0.8,
              scrollTrigger: { trigger: body, start: 'top 80%', toggleActions: 'play none none none' },
            });
          }
        },

        '(max-width: 767px)': () => {
          // Mobile: simple visible state
          if (label) gsap.set(label, { opacity: 1, y: 0 });
          gsap.set(mainWords, { opacity: 1 });
          if (decoLine) gsap.set(decoLine, { scaleX: 1 });
          if (body) gsap.set(body, { opacity: 1, y: 0 });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.bgWrap}>
        <Image
          src="/images/hero/main4_3.jpg"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
        <div className={styles.bgOverlay} />
      </div>
      <div className={styles.container}>
        <span className={styles.label}>BRAND PHILOSOPHY</span>

        <h2 className={styles.mainCopy}>
          {MAIN_COPY.split('\n').map((line, li) => (
            <span key={li} className={styles.mainLine}>
              {line.split(/\s+/).filter(Boolean).map((word, wi) => (
                <span key={`${li}-${wi}`} className={styles.mainWord}>
                  {word}
                </span>
              ))}
            </span>
          ))}
        </h2>

        <div className={styles.decoLine} />

        <p className={styles.body}>
          {BODY_TEXT.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < BODY_TEXT.split('\n').length - 1 && <br />}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
