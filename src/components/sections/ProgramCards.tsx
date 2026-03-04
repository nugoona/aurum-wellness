import ScrollReveal from '@/components/ui/ScrollReveal';
import styles from './ProgramCards.module.css';

interface ProgramCard {
  title: string;
  desc: string;
  mobileDesc?: string;
  image?: string;
}

export default function ProgramCards({ items }: { items: ProgramCard[] }) {
  return (
    <section className="section section--white">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-header__label">PROGRAM</span>
            <h2 className="section-header__title">맞춤형 케어 프로그램</h2>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.06}>
              <div className={styles.card}>
                {item.image && (
                  <div className={styles.imageWrap}>
                    <div
                      className={styles.image}
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                  </div>
                )}
                <div className={styles.content}>
                  <h3 className={styles.title}>{item.title}</h3>
                  <p className={styles.desc}>{item.desc}</p>
                  {item.mobileDesc && (
                    <p className={styles.mobileDesc}>{item.mobileDesc}</p>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
