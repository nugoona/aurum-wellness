'use client';

import { usePathname } from 'next/navigation';
import styles from './Footer.module.css';

const NAVER_MAP_URL = 'https://map.naver.com/p/entry/place/1058592122';

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/victsoon',
    src: '/images/icon-instagram.png',
  },
  {
    label: 'Naver Blog',
    href: 'https://blog.naver.com/victsoon',
    src: '/images/icon-naver-blog.png',
  },
  {
    label: 'KakaoTalk',
    href: 'https://pf.kakao.com/_AaZxgn',
    src: '/images/icon-kakaotalk.png',
  },
];

export default function Footer() {
  const pathname = usePathname();
  const isTherapy = pathname === '/therapy';
  const logoText = isTherapy ? 'AURUME THERAPY' : 'AURUME WELLNESS';

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>{logoText}</span>
          <p className={styles.slogan}>테라피 중심 웰니스의 새로운 기준</p>
        </div>

        <div className={styles.contact}>
          <span className={styles.colLabel}>CONTACT</span>
          <a href="tel:010-2981-9989">010-2981-9989</a>
          <p>인천 부평구 부평문화로 56, 3층</p>
          <p>1호선 부평시장역 3번 출구 20m</p>
          <a
            href={NAVER_MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mapBtn}
          >
            오시는 길
          </a>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <p>
            &copy; {new Date().getFullYear()} (주)아우름웰니스 | 대표 김순재
            <span className={styles.separator}> | </span>
            <br className={styles.mobileBreak} />
            <span className={styles.bizNum}>사업자번호 124-88-02938</span>
          </p>
          <div className={styles.socials}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={s.label}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.src} alt={s.label} className={styles.socialIcon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
