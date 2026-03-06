'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone } from 'lucide-react';
import { BOOKING_URL } from '@/data/siteData';
import styles from './CTACinematicV2.module.css';

gsap.registerPlugin(ScrollTrigger);

const PHONE_NUMBER = 'tel:010-2981-9989';

export default function CTACinematicV2() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Play video when section is in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(section);

    const ctx = gsap.context(() => {
      const titleWords = section.querySelectorAll(`.${styles.titleWord}`);
      const buttons = section.querySelectorAll(`.${styles.ctaBtn}`);

      ScrollTrigger.matchMedia({
        '(min-width: 768px)': () => {
          // Title words stagger — dramatic reveal
          gsap.set(titleWords, { opacity: 0, y: 50 });
          gsap.to(titleWords, {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 65%', toggleActions: 'play none none none' },
          });

          // Buttons stagger
          gsap.set(buttons, { opacity: 0, y: 20 });
          gsap.to(buttons, {
            opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: section, start: 'top 60%', toggleActions: 'play none none none' },
          });
        },

        '(max-width: 767px)': () => {
          gsap.set(titleWords, { opacity: 1, y: 0 });
          gsap.set(buttons, { opacity: 1, y: 0 });
        },
      });
    }, section);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  const titleText = '당신의 건강 여정,\n아우름 웰니스와 시작하세요';

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Background Video */}
      <div className={styles.bgWrap}>
        <video
          ref={videoRef}
          className={styles.bgVideo}
          src="/videos/cta-healing.mp4"
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className={styles.overlay} />
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h2 className={styles.title}>
          {titleText.split('\n').map((line, li) => (
            <span key={li} className={styles.titleLine}>
              {line.split(/\s+/).map((word, wi) => (
                <span key={`${li}-${wi}`} className={styles.titleWord}>
                  {word}
                </span>
              ))}
            </span>
          ))}
        </h2>

        <div className={styles.ctaGrid}>
          <a
            href={PHONE_NUMBER}
            className={`${styles.ctaBtn} ${styles.phoneBtn}`}
          >
            <Phone size={20} />
            <span>010-2981-9989</span>
          </a>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.ctaBtn} ${styles.bookingBtn}`}
          >
            예약하기
          </a>
          <a
            href="/proposal"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.ctaBtn} ${styles.proposalBtn}`}
          >
            제안서 보기
          </a>
        </div>
      </div>
    </section>
  );
}
