'use client';

import { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowRight } from 'lucide-react';
import type { ClassCourse } from '@/data/classData';
import styles from './ClassPromoPopup.module.css';

const STORAGE_KEY = 'classPromoPopupDismissed';

interface Props {
  courses: ClassCourse[];
}

function getActiveCourses(courses: ClassCourse[]): ClassCourse[] {
  const now = Date.now();
  return courses.filter(c => new Date(`${c.promoEnd}T23:59:59`).getTime() > now);
}

export default function ClassPromoPopup({ courses }: Props) {
  const [visible, setVisible] = useState(false);
  const activeCourses = useMemo(() => getActiveCourses(courses), [courses]);

  useEffect(() => {
    if (activeCourses.length === 0) return;

    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) {
      const dismissedDate = new Date(dismissed);
      const today = new Date();
      if (dismissedDate.toDateString() === today.toDateString()) return;
    }

    setVisible(true);
  }, [activeCourses.length]);

  const close = () => setVisible(false);

  const dismissToday = () => {
    localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    setVisible(false);
  };

  if (!visible || activeCourses.length === 0) return null;

  const isDual = activeCourses.length > 1;
  const headerLabel = isDual
    ? `Aurum Academy — ${activeCourses.length}개 정규 코스 모집중`
    : 'Aurum Academy — 정규 과정 모집';

  return createPortal(
    <div className={styles.overlay} onClick={close}>
      <div
        className={`${styles.modal} ${isDual ? styles.modalDual : ''}`}
        onClick={e => e.stopPropagation()}
      >
        <button className={styles.closeBtn} onClick={close} aria-label="닫기">
          <X size={16} />
        </button>

        <div className={styles.header}>
          <span className={styles.hook}>{headerLabel}</span>
          <h2 className={styles.heading}>
            여름 정규 과정<br />함께 모집합니다
          </h2>
          <p className={styles.subheading}>관심 있는 과정을 선택해 자세히 살펴보세요</p>
        </div>

        <div className={styles.cardList}>
          {activeCourses.map(course => {
            const firstImage = course.coverImage ?? course.curriculum[0]?.image;
            return (
              <a
                key={course.id}
                href={`/class#recruitment-${course.linkId ?? course.id}`}
                className={styles.courseCard}
                onClick={close}
              >
                {firstImage && (
                  <div
                    className={styles.cardImage}
                    style={{ backgroundImage: `url(${firstImage})` }}
                  />
                )}
                <div className={styles.cardBody}>
                  <span className={styles.cardLevel}>{course.level}</span>
                  <h3 className={styles.cardTitle}>{course.titleKo}</h3>
                  <div className={styles.cardMeta}>
                    <span>{course.schedule.period}</span>
                    <span className={styles.dot}>·</span>
                    <span>{course.schedule.dayOfWeek}</span>
                  </div>
                </div>
                <ArrowRight size={18} className={styles.cardArrow} />
              </a>
            );
          })}
        </div>

        <label className={styles.dismiss}>
          <input type="checkbox" onChange={dismissToday} />
          오늘 하루 안 보기
        </label>
      </div>
    </div>,
    document.body
  );
}
