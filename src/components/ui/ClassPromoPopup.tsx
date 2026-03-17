'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowRight } from 'lucide-react';
import styles from './ClassPromoPopup.module.css';

const STORAGE_KEY = 'classPromoPopupDismissed';
const PROMO_END = new Date('2026-05-29T23:59:59');

export default function ClassPromoPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (new Date() > PROMO_END) return;

    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) {
      const dismissedDate = new Date(dismissed);
      const today = new Date();
      if (dismissedDate.toDateString() === today.toDateString()) return;
    }

    setVisible(true);
  }, []);

  const close = () => setVisible(false);

  const dismissToday = () => {
    localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    setVisible(false);
  };

  if (!visible) return null;

  return createPortal(
    <div className={styles.overlay} onClick={close}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.imageArea}>
          <div
            className={styles.bgImage}
            style={{ backgroundImage: 'url(/images/class-lv1/01_lecture_square.png)' }}
          />
          <button className={styles.closeBtn} onClick={close} aria-label="닫기">
            <X size={16} />
          </button>
        </div>

        <div className={styles.content}>
          <span className={styles.hook}>Aurum Academy — 4월 개강</span>

          <h2 className={styles.title}>
            기초 건식 근골격케어
            <span className={styles.titleEn}>Therapy Class Lv.1</span>
          </h2>

          <p className={styles.subtitle}>
            모든 수기 관리의 확실한 출발점
          </p>

          <div className={styles.infoArea}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>일정</span>
              <span className={styles.infoValue}>
                4.17(금) ~ 5.29
                <span className={styles.inlineBadge}>매주 금요일</span>
                <span className={styles.inlineBadge}>7주</span>
              </span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>시간</span>
              <span className={styles.infoValue}>오전 10시 ~ 오후 5시</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>장소</span>
              <span className={styles.infoValue}>인천 1호선 부평시장역 근처</span>
            </div>
          </div>

          <a href="/class#recruitment" className={styles.cta} onClick={close}>
            자세히 보기 <ArrowRight size={15} />
          </a>
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
