'use client';

import { useState, useEffect } from 'react';
import styles from './ClassStickyBar.module.css';

const OPEN_DATE = new Date('2026-04-17T10:00:00');
const PROMO_END = new Date('2026-05-29T23:59:59');

function getTimeLeft() {
  const now = new Date();
  const diff = OPEN_DATE.getTime() - now.getTime();
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function pad(n: number) {
  return n.toString().padStart(2, '0');
}

export default function ClassStickyBar() {
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft>>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (new Date() > PROMO_END) return;
    setMounted(true);
    setTime(getTimeLeft());
    const timer = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  // 개강 후에는 "진행중" 표시
  const isLive = !time;

  return (
    <a href="#recruitment" className={styles.bar}>
      <div className={styles.left}>
        <span className={styles.badge}>{isLive ? '진행중' : '모집중'}</span>
        <span className={styles.title}>Therapy Class Lv.1 · 4월 개강</span>
      </div>
      {!isLive && time ? (
        <div className={styles.countdown}>
          <div className={styles.unit}>
            <span className={styles.num}>{time.days}</span>
            <span className={styles.label}>DAY</span>
          </div>
          <span className={styles.colon}>:</span>
          <div className={styles.unit}>
            <span className={styles.num}>{pad(time.hours)}</span>
            <span className={styles.label}>HR</span>
          </div>
          <span className={styles.colon}>:</span>
          <div className={styles.unit}>
            <span className={styles.num}>{pad(time.minutes)}</span>
            <span className={styles.label}>MIN</span>
          </div>
          <span className={styles.colon}>:</span>
          <div className={styles.unit}>
            <span className={styles.num}>{pad(time.seconds)}</span>
            <span className={styles.label}>SEC</span>
          </div>
        </div>
      ) : (
        <span className={styles.liveText}>수업 진행중</span>
      )}
      <span className={styles.arrow}>↓</span>
    </a>
  );
}
