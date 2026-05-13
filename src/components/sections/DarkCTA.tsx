'use client';

import { Phone, MessageCircle } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import styles from './DarkCTA.module.css';

interface DarkCTAProps {
  title: string;
  subtitle?: string;
  phoneLabel?: string;
  kakaoLabel?: string;
}

export default function DarkCTA({
  title,
  subtitle,
  phoneLabel = '전화 문의하기',
  kakaoLabel = '카카오톡 문의',
}: DarkCTAProps) {
  return (
    <section className={styles.section}>
      <div className="container">
        <ScrollReveal>
          <h2 className={styles.title}>{title}</h2>
        </ScrollReveal>
        {subtitle && (
          <ScrollReveal delay={0.1}>
            <p className={styles.subtitle}>{subtitle}</p>
          </ScrollReveal>
        )}
        <ScrollReveal delay={0.2}>
          {/* Mobile: phone call + kakao */}
          <div className={`${styles.buttons} ${styles.mobileOnly}`}>
            <a href="tel:010-2981-9989" className="btn btn--primary btn--fullwidth-mobile">
              <Phone size={18} />
              {phoneLabel}
            </a>
            <a
              href="https://pf.kakao.com/_AaZxgn"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--white-outline btn--fullwidth-mobile"
            >
              <MessageCircle size={18} />
              {kakaoLabel}
            </a>
          </div>

          {/* Desktop: phone number + kakao */}
          <div className={`${styles.buttons} ${styles.desktopOnly}`}>
            <a href="tel:010-2981-9989" className={styles.phoneBtn}>
              <Phone size={20} />
              <span>010-2981-9989</span>
            </a>
            <a
              href="https://pf.kakao.com/_AaZxgn"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.kakaoBtn}
            >
              <MessageCircle size={18} />
              {kakaoLabel}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
