'use client';

import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './CinematicHeroV2.module.css';

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const VIDEOS = ['/videos/hero/hero1.mp4', '/videos/hero/hero2.mp4', '/videos/hero/hero3.mp4'];
const DURATIONS = [4, 4, 7];

const LINES = [
  '건강한 몸과 마음은',
  '과학과 정성이 만날 때',
  '시작됩니다',
];

export default function CinematicHeroV2() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([null, null, null]);
  const [phase, setPhase] = useState(0);
  const phaseRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const isDesktopRef = useRef(false);
  const isPinnedRef = useRef(false);
  const programmaticScrollRef = useRef(false);

  useEffect(() => { phaseRef.current = phase; }, [phase]);

  // --- Pure functions (no deps, use refs only) ---

  const clearAllTimers = useCallback(() => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
    if (idleTimerRef.current) { clearTimeout(idleTimerRef.current); idleTimerRef.current = null; }
  }, []);

  const switchVideo = useCallback((from: number, to: number) => {
    const fromVideo = videoRefs.current[from];
    const toVideo = videoRefs.current[to];
    if (toVideo) { toVideo.currentTime = 0; toVideo.play().catch(() => {}); }
    if (fromVideo) fromVideo.style.opacity = '0';
    if (toVideo) toVideo.style.opacity = '1';
    // Preload next video so mobile doesn't stall on transition
    const nextVideo = videoRefs.current[(to + 1) % 3];
    if (nextVideo) { nextVideo.load(); }
  }, []);

  const scrollToPhase = useCallback((targetPhase: number) => {
    const st = stRef.current;
    if (!st || !isDesktopRef.current || !isPinnedRef.current) return;
    const range = st.end - st.start;
    const targetScroll = st.start + range * (targetPhase / 3);
    programmaticScrollRef.current = true;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    setTimeout(() => { programmaticScrollRef.current = false; }, 1200);
  }, []);

  // Store advancePhase / startAutoTimer in refs so ScrollTrigger callbacks can access latest versions
  const advancePhaseRef = useRef<() => void>(() => {});
  const startAutoTimerRef = useRef<() => void>(() => {});

  const advancePhase = useCallback(() => {
    if (!isPinnedRef.current) return;
    const current = phaseRef.current;
    const next = (current + 1) % 3;
    switchVideo(current, next);
    setPhase(next);
    scrollToPhase(next);
    timerRef.current = setTimeout(() => advancePhaseRef.current(), DURATIONS[next] * 1000);
  }, [scrollToPhase, switchVideo]);

  const startAutoTimer = useCallback(() => {
    if (!isPinnedRef.current) return;
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
    const current = phaseRef.current;
    timerRef.current = setTimeout(() => advancePhaseRef.current(), DURATIONS[current] * 1000);
  }, []);

  // Keep refs in sync
  useEffect(() => { advancePhaseRef.current = advancePhase; }, [advancePhase]);
  useEffect(() => { startAutoTimerRef.current = startAutoTimer; }, [startAutoTimer]);

  // Pause on user scroll within hero, resume after 3s idle
  const handleUserScroll = useCallback(() => {
    if (!isDesktopRef.current) return; // Mobile: never pause, just play through
    if (programmaticScrollRef.current || !isPinnedRef.current) return;
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
    if (idleTimerRef.current) { clearTimeout(idleTimerRef.current); idleTimerRef.current = null; }
    idleTimerRef.current = setTimeout(() => {
      if (isPinnedRef.current) startAutoTimerRef.current();
    }, 3000);
  }, []);

  // Initialize videos — start first video + auto-advance timer
  useEffect(() => {
    const v0 = videoRefs.current[0];
    if (v0) v0.play().catch(() => {});
    // Preload video 2 so first transition is smooth on mobile
    const v1 = videoRefs.current[1];
    if (v1) v1.load();
    // Always start timer on mount (hero is visible at page load)
    isPinnedRef.current = true;
    startAutoTimerRef.current();
    return () => clearAllTimers();
  }, [clearAllTimers]);

  // Resume video when hero comes back into view (mobile + desktop scroll-back)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const current = phaseRef.current;
          const video = videoRefs.current[current];
          if (video) video.play().catch(() => {});
          if (!isDesktopRef.current) {
            isPinnedRef.current = true;
            startAutoTimerRef.current();
          }
        } else if (!isDesktopRef.current) {
          isPinnedRef.current = false;
          clearAllTimers();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [clearAllTimers]);

  // Wheel/touch detection on hero section only
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    section.addEventListener('wheel', handleUserScroll, { passive: true });
    section.addEventListener('touchmove', handleUserScroll, { passive: true });
    return () => {
      section.removeEventListener('wheel', handleUserScroll);
      section.removeEventListener('touchmove', handleUserScroll);
    };
  }, [handleUserScroll]);

  // GSAP ScrollTrigger pin (desktop only) — deps: [switchVideo] only (stable)
  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        '(min-width: 768px)': () => {
          isDesktopRef.current = true;

          const st = ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: '+=50%',
            pin: true,
            pinSpacing: true,
            onEnter: () => {
              isPinnedRef.current = true;
              document.documentElement.setAttribute('data-hero-pinned', '');
              startAutoTimerRef.current();
            },
            onLeave: () => {
              isPinnedRef.current = false;
              document.documentElement.removeAttribute('data-hero-pinned');
              clearAllTimers();
            },
            onEnterBack: () => {
              isPinnedRef.current = true;
              document.documentElement.setAttribute('data-hero-pinned', '');
              startAutoTimerRef.current();
            },
            onLeaveBack: () => {
              isPinnedRef.current = false;
              document.documentElement.removeAttribute('data-hero-pinned');
              clearAllTimers();
            },
            onUpdate: (self) => {
              if (programmaticScrollRef.current) return;
              const progress = self.progress;
              let scrollPhase = 0;
              if (progress >= 0.66) scrollPhase = 2;
              else if (progress >= 0.33) scrollPhase = 1;
              if (scrollPhase !== phaseRef.current) {
                switchVideo(phaseRef.current, scrollPhase);
                setPhase(scrollPhase);
              }
            },
          });

          stRef.current = st;
        },
        '(max-width: 767px)': () => {
          isDesktopRef.current = false;
          stRef.current = null;
        },
      });
    }, section);

    return () => ctx.revert();
  }, [switchVideo]);

  return (
    <section ref={sectionRef} className={styles.hero}>
      <div className={styles.videoWrap}>
        {VIDEOS.map((src, i) => (
          <video
            key={src}
            ref={(el) => { videoRefs.current[i] = el; }}
            className={styles.video}
            src={src}
            muted
            playsInline
            preload="auto"
            poster={i === 0 ? '/videos/hero/hero1-poster.jpg' : undefined}
            style={{ opacity: i === 0 ? 1 : 0 }}
          />
        ))}
        <div className={styles.overlay} />
      </div>

      <div className={styles.textWrap}>
        <div className={styles.dots}>
          {[0, 1, 2].map((i) => (
            <span key={i} className={`${styles.dot} ${i === phase ? styles.dotActive : ''}`} />
          ))}
        </div>

        {LINES.map((line, i) => (
          <span
            key={i}
            className={`${styles.line} ${i === phase ? styles.highlight : ''}`}
          >
            {line}
          </span>
        ))}
      </div>
    </section>
  );
}
