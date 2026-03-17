'use client';

import { useState, useEffect } from 'react';
import styles from './ClassStickyBar.module.css';

const OPEN_DATE = new Date('2026-04-17T00:00:00');
const PROMO_END = new Date('2026-05-29T23:59:59');

function getDday() {
  const now = new Date();
  const diff = OPEN_DATE.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function ClassStickyBar() {
  const [dday, setDday] = useState<number | null>(null);

  useEffect(() => {
    if (new Date() > PROMO_END) return;
    setDday(getDday());
    const timer = setInterval(() => setDday(getDday()), 60000);
    return () => clearInterval(timer);
  }, []);

  if (dday === null) return null;

  const label = dday > 0 ? `D-${dday}` : dday === 0 ? 'D-DAY' : '진행중';

  return (
    <a href="#recruitment" className={styles.bar}>
      <span className={styles.badge}>{label}</span>
      <span className={styles.text}>Therapy Class Lv.1 · 4월 개강</span>
      <span className={styles.arrow}>↓</span>
    </a>
  );
}
