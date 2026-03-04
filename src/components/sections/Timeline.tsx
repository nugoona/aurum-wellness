import Image from 'next/image';
import ScrollReveal from '@/components/ui/ScrollReveal';
import styles from './Timeline.module.css';

interface TimelineItem {
  company: string;
  desc: string;
}

interface TimelineProps {
  items: TimelineItem[];
  images?: string[];
}

export default function Timeline({ items, images }: TimelineProps) {
  return (
    <section className="section section--alt">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-header__label">EXPERIENCE</span>
            <h2 className="section-header__title">강의 및 특강 경력</h2>
          </div>
        </ScrollReveal>

        <div className={styles.layout}>
          {/* Left: Image Gallery */}
          {images && images.length > 0 && (
            <ScrollReveal>
              <div className={styles.gallery}>
                {images.map((src, i) => (
                  <div key={i} className={styles.galleryItem}>
                    <Image
                      src={src}
                      alt={`강의 현장 ${i + 1}`}
                      width={280}
                      height={200}
                      className={styles.galleryImage}
                    />
                  </div>
                ))}
              </div>
            </ScrollReveal>
          )}

          {/* Right: Timeline */}
          <div className={styles.timelineWrap}>
            <div className={styles.timeline}>
              {items.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className={styles.item}>
                    <div className={styles.dot} />
                    <div className={styles.content}>
                      <h4 className={styles.company}>{item.company}</h4>
                      <p className={styles.desc}>{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* Footer note */}
        <ScrollReveal delay={0.2}>
          <p className={styles.footerNote}>
            <span className={styles.footerLine} />
            상기 내용 외 다양한 강의 진행
            <span className={styles.footerLine} />
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
