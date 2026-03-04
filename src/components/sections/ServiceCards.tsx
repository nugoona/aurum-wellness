import Link from 'next/link';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { SERVICES } from '@/data/siteData';
import styles from './ServiceCards.module.css';

export default function ServiceCards() {
  return (
    <section className="section section--alt">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-header__label">OUR SERVICES</span>
            <h2 className="section-header__title">아우르메의 서비스</h2>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {SERVICES.map((svc, i) => (
            <ScrollReveal key={svc.id} delay={i * 0.1}>
              <Link href={svc.href} className={styles.card}>
                <div className={styles.imageWrap}>
                  <div
                    className={styles.image}
                    style={{ backgroundImage: `url(${svc.image})` }}
                  />
                </div>
                <div className={styles.text}>
                  <span className={styles.label}>{svc.label}</span>
                  <h3 className={styles.title}>{svc.title}</h3>
                  <p className={styles.desc}>{svc.description}</p>
                  <span className={styles.link}>자세히 보기 &rarr;</span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
