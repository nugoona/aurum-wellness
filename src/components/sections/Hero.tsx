'use client';

import { useEffect, useState } from 'react';
import styles from './Hero.module.css';
import { BOOKING_URL } from '@/data/siteData';

interface HeroProps {
  image: string;
  label: string;
  title: string;
  subtitle?: string;
  mobileSubtitle?: string;
  showBooking?: boolean;
  fullHeight?: boolean;
}

export default function Hero({ image, label, title, subtitle, mobileSubtitle, showBooking, fullHeight }: HeroProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className={`${styles.hero} ${fullHeight ? styles.full : styles.sub}`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className={styles.overlay} />
      <div className={`${styles.content} ${visible ? styles.visible : ''}`}>
        <span className={styles.label}>{label}</span>
        <h1 className={styles.title}>
          {title.split('\n').map((line, i) => (
            <span key={i}>
              {line.split(/(\d+)/).map((part, j) =>
                /^\d+$/.test(part) ? <span key={j} className={styles.titleNum}>{part}</span> : part
              )}
              {i < title.split('\n').length - 1 && <br />}
            </span>
          ))}
        </h1>
        {subtitle && (
          <>
            <p className={`${styles.subtitle} ${mobileSubtitle ? styles.desktopOnly : ''}`}>
              {subtitle.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < subtitle.split('\n').length - 1 && <br />}
                </span>
              ))}
            </p>
            {mobileSubtitle && (
              <p className={`${styles.subtitle} ${styles.mobileOnly}`}>
                {mobileSubtitle.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < mobileSubtitle.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
            )}
          </>
        )}
        {showBooking && (
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn--primary ${styles.cta}`}
          >
            지금 예약하기
          </a>
        )}
      </div>
    </section>
  );
}
