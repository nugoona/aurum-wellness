'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X, Calendar } from 'lucide-react';
import { BOOKING_URL } from '@/data/siteData';
import styles from './Header.module.css';

const NAV_ITEMS = [
  { href: '/', label: '메인' },
  { href: '/b2b', label: 'B2B 웰니스' },
  { href: '/class', label: '클래스/특강' },
  { href: '/therapy', label: 'AURUME THERAPY', enFont: true },
] as const;

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const heroPinned = document.documentElement.hasAttribute('data-hero-pinned');
      setScrolled(!heroPinned && window.scrollY > 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          {/* Mobile hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setMobileOpen(true)}
            aria-label="메뉴 열기"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link href="/" className={styles.logo}>
            {pathname === '/therapy' ? (
              <>
                <Image
                  src="/images/logo-icon.svg"
                  alt=""
                  width={32}
                  height={28}
                  className={styles.logoIcon}
                  priority
                />
                <span className={styles.logoText}>(주)아우름웰니스</span>
                <span className={styles.logoTextTherapy}>AURUME THERAPY</span>
              </>
            ) : (
              <>
                <Image
                  src="/images/logo-icon.svg"
                  alt=""
                  width={32}
                  height={28}
                  className={styles.logoIcon}
                  priority
                />
                <span className={styles.logoText}>(주)아우름웰니스</span>
              </>
            )}
          </Link>

          {/* Desktop nav */}
          <nav className={styles.nav}>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${pathname === item.href ? styles.navActive : ''} ${'enFont' in item ? styles.navEnFont : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Booking button */}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.bookingBtn}
          >
            <Calendar size={16} />
            <span>예약하기</span>
          </a>
        </div>
      </header>

      {/* Mobile overlay — outside header to avoid backdrop-filter containing block */}
      {mobileOpen && (
        <div className={styles.mobileOverlay}>
          <div className={styles.mobileTop}>
            {pathname === '/therapy' ? (
              <span className={styles.mobileLogoEn}>AURUME THERAPY</span>
            ) : (
              <>
                <Image
                  src="/images/logo-icon.svg"
                  alt=""
                  width={28}
                  height={24}
                  className={styles.mobileLogoIcon}
                />
                <span className={styles.mobileLogo}>(주)아우름웰니스</span>
              </>
            )}
            <button
              className={styles.closeBtn}
              onClick={() => setMobileOpen(false)}
              aria-label="메뉴 닫기"
            >
              <X size={24} />
            </button>
          </div>
          <nav className={styles.mobileNav}>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.mobileNavLink} ${pathname === item.href ? styles.mobileNavActive : ''} ${'enFont' in item ? styles.mobileNavEnFont : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className={styles.mobileBottom}>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileBookingBtn}
            >
              <Calendar size={16} />
              지금 예약하기
            </a>
            <div className={styles.mobileContact}>
              <a href="tel:010-2981-9989">010-2981-9989</a>
              <p>인천 부평구 부평대로 71-1, 3층</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
