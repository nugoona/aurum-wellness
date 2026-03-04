'use client';

import { usePathname } from 'next/navigation';
import { Calendar, Phone } from 'lucide-react';
import { BOOKING_URL } from '@/data/siteData';
import styles from './MobileBookingBar.module.css';

const PHONE_NUMBER = 'tel:010-2981-9989';

export default function MobileBookingBar() {
  const pathname = usePathname();
  const isTherapy = pathname === '/therapy';

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

  return (
    <a href={PHONE_NUMBER} className={styles.bar}>
      <Phone size={20} />
      <span>전화 문의</span>
    </a>
  );
}
