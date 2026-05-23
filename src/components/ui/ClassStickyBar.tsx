'use client';

import { useState, useEffect, useMemo } from 'react';
import type { ClassCourse } from '@/data/classData';
import styles from './ClassStickyBar.module.css';

interface Props {
  courses: ClassCourse[];
}

function getTimeLeft(openDate: Date) {
  const diff = openDate.getTime() - Date.now();
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

/**
 * promoEnd 안 지난 코스 중, openDate가 가장 가까운(또는 이미 시작했으면 가장 최근에 시작한) 코스 선택.
 * Lv.2 종료되면 자동으로 Lv.1로 폴백.
 */
function pickActiveCourse(courses: ClassCourse[]): ClassCourse | null {
  const now = Date.now();
  const active = courses.filter(c => new Date(`${c.promoEnd}T23:59:59`).getTime() > now);
  if (active.length === 0) return null;
  return active.slice().sort((a, b) => {
    const ao = new Date(`${a.openDate}T00:00:00`).getTime();
    const bo = new Date(`${b.openDate}T00:00:00`).getTime();
    const aDist = Math.abs(ao - now);
    const bDist = Math.abs(bo - now);
    return aDist - bDist;
  })[0];
}

export default function ClassStickyBar({ courses }: Props) {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft>>(null);
  const [activeCourse, setActiveCourse] = useState<ClassCourse | null>(null);

  // SSR과 클라이언트의 시간이 다를 수 있으므로 클라이언트에서만 코스 선택
  const candidate = useMemo(() => pickActiveCourse(courses), [courses]);

  useEffect(() => {
    if (!candidate) return;
    setActiveCourse(candidate);
    setMounted(true);
    const openDate = new Date(`${candidate.openDate}T00:00:00`);
    setTime(getTimeLeft(openDate));
    const timer = setInterval(() => setTime(getTimeLeft(openDate)), 1000);
    return () => clearInterval(timer);
  }, [candidate]);

  if (!mounted || !activeCourse) return null;

  const isLive = !time;
  const openDateObj = new Date(`${activeCourse.openDate}T00:00:00`);
  const dayLabels = ['일', '월', '화', '수', '목', '금', '토'];
  const openSubtitle = `${openDateObj.getMonth() + 1}.${openDateObj.getDate()}(${dayLabels[openDateObj.getDay()]}) 오전 10시 개강`;

  return (
    <a href={`#recruitment-${activeCourse.id}`} className={styles.bar}>
      <div className={styles.left}>
        <span className={styles.badge}>{isLive ? '진행중' : '모집중'}</span>
        <div className={styles.titleGroup}>
          <span className={styles.title}>{activeCourse.titleEn}</span>
          <span className={styles.subtitle}>{openSubtitle}</span>
        </div>
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
