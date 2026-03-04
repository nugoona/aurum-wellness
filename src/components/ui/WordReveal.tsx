'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface WordRevealProps {
  text: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  /** Stagger delay between words (seconds) */
  stagger?: number;
  /** Use scrub (scroll-linked) or trigger-based */
  scrub?: boolean | number;
  /** Start position for ScrollTrigger */
  start?: string;
  /** For scrub mode: opacity range [dim, full] */
  dimOpacity?: number;
}

export default function WordReveal({
  text,
  tag: Tag = 'h2',
  className = '',
  stagger = 0.08,
  scrub = false,
  start = 'top 80%',
  dimOpacity = 0.15,
}: WordRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll<HTMLSpanElement>('.wr-word');
    if (words.length === 0) return;

    const ctx = gsap.context(() => {
      if (scrub) {
        // Scrub mode: words go from dim to full opacity as you scroll
        gsap.set(words, { opacity: dimOpacity });
        gsap.to(words, {
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: el,
            start,
            end: 'bottom 60%',
            scrub: typeof scrub === 'number' ? scrub : 0.5,
          },
        });
      } else {
        // Trigger mode: words fade up on enter
        gsap.set(words, { opacity: 0, y: 20 });
        gsap.to(words, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: 'play none none none',
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [text, stagger, scrub, start, dimOpacity]);

  // Split text into words, preserving line breaks
  const lines = text.split('\n');
  const content = lines.map((line, li) => (
    <span key={li} style={{ display: 'block' }}>
      {line.split(/\s+/).filter(Boolean).map((word, wi) => (
        <span
          key={`${li}-${wi}`}
          className="wr-word"
          style={{ display: 'inline-block', marginRight: '0.3em' }}
        >
          {word}
        </span>
      ))}
    </span>
  ));

  return (
    <Tag ref={containerRef as React.RefObject<HTMLHeadingElement>} className={className}>
      {content}
    </Tag>
  );
}
