'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './SlotMachineDigit.module.css';

interface SlotMachineDigitProps {
  value: number;
  suffix?: string;
  label: string;
  /** Delay before starting animation (ms) */
  delay?: number;
}

export default function SlotMachineDigit({ value, suffix = '', label, delay = 0 }: SlotMachineDigitProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [displayDigits, setDisplayDigits] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Split value into individual digits
  const targetDigits = String(value).split('').map(Number);

  const startAnimation = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    setTimeout(() => {
      setIsVisible(true);
      // Stagger each digit
      targetDigits.forEach((digit, i) => {
        setTimeout(() => {
          setDisplayDigits(prev => {
            const next = [...prev];
            next[i] = digit;
            return next;
          });
        }, i * 150);
      });
    }, delay);
  }, [targetDigits, delay]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [startAnimation]);

  return (
    <div ref={containerRef} className={styles.counter}>
      <div className={styles.digits}>
        {targetDigits.map((target, i) => (
          <div key={i} className={styles.digitSlot}>
            <div
              className={`${styles.digitTrack} ${isVisible && displayDigits[i] !== undefined ? styles.spinning : ''}`}
              style={{
                '--target': target,
                '--spin-delay': `${i * 0.15}s`,
              } as React.CSSProperties}
            >
              {/* Two full rotations (0-9, 0-9) then land on target */}
              {[...Array(20 + target + 1)].map((_, j) => (
                <span key={j} className={styles.digitChar}>
                  {j % 10}
                </span>
              ))}
            </div>
          </div>
        ))}
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </div>
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
}
