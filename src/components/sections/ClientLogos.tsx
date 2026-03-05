import Image from 'next/image';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { CLIENT_LOGOS } from '@/data/siteData';
import styles from './ClientLogos.module.css';

export default function ClientLogos() {
  return (
    <section className={`section section--alt ${styles.section}`}>
      <div className="container">
        <ScrollReveal>
          <p className={styles.text}>9년간 200개 이상의 기업과 함께합니다</p>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <div className={styles.grid}>
            {CLIENT_LOGOS.map((logo) => (
              <div key={logo.src} className={styles.logo}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={160}
                  height={60}
                  className={styles.logoImg}
                />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
