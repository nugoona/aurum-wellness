'use client';

import { usePathname } from 'next/navigation';
import { Calendar, Phone, FileDown } from 'lucide-react';
import { BOOKING_URL } from '@/data/siteData';
import styles from './MobileBookingBar.module.css';

const PHONE_NUMBER = 'tel:010-2981-9989';

export default function MobileBookingBar() {
  const pathname = usePathname();
  if (pathname === '/proposal') return null;
  const isTherapy = pathname === '/therapy';
  const isB2B = pathname === '/b2b';

  if (isTherapy) {
    return (
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.bar}
      >
        <Calendar size={20} />
        <span>예약하기</span>
      </a>
    );
  }

  if (isB2B) {
    return (
      <a
        href="/proposal"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.bar}
      >
        <span>제안서 보기</span>
      </a>
    );
  }

  return (
    <a
      href="/proposal"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.bar}
    >
      <span>제안서 보기</span>
    </a>
  );
}
