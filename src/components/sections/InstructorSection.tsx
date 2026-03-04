import Image from 'next/image';
import ScrollReveal from '@/components/ui/ScrollReveal';
import styles from './InstructorSection.module.css';

interface TimelineItem {
  company: string;
  desc: string;
}

interface InstructorSectionProps {
  name: string;
  role: string;
  quote: string;
  credentials: string[];
  timeline: TimelineItem[];
  timelineImages: string[];
}

export default function InstructorSection({
  name,
  role,
  quote,
  credentials,
  timeline,
  timelineImages,
}: InstructorSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Top: 2-column (Instructor | Experience) */}
        <div className={styles.topRow}>
          {/* Left: Instructor */}
          <ScrollReveal>
            <div className={styles.instructor}>
              <span className={styles.label}>INSTRUCTOR</span>
              <h2 className={styles.name}>{name}</h2>
              <p className={styles.role}>{role}</p>
              <blockquote className={styles.quote}>{quote}</blockquote>
              <ul className={styles.creds}>
                {credentials.map((c, i) => (
                  <li key={i} className={styles.credItem}>{c}</li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Right: Experience */}
          <ScrollReveal delay={0.1}>
            <div className={styles.experience}>
              <span className={styles.label}>EXPERIENCE</span>
              <h3 className={styles.expTitle}>강의 및 특강 경력</h3>
              <div className={styles.timeline}>
                {timeline.map((item, i) => (
                  <div key={i} className={styles.timelineItem}>
                    <div className={styles.dot} />
                    <div className={styles.timelineContent}>
                      <h4 className={styles.company}>{item.company}</h4>
                      <p className={styles.desc}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className={styles.footerNote}>
                <span className={styles.footerLine} />
                상기 내용 외 다양한 강의 진행
                <span className={styles.footerLine} />
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom: Featured + Grid */}
        <ScrollReveal delay={0.15}>
          <div className={styles.gallery}>
            <div className={styles.galleryFeatured}>
              <Image
                src={timelineImages[0]}
                alt="강의 현장 대표"
                width={1200}
                height={900}
                className={styles.galleryImage}
              />
            </div>
            <div className={styles.galleryGrid}>
              {timelineImages.slice(1).map((src, i) => (
                <div key={i} className={styles.galleryItem}>
                  <Image
                    src={src}
                    alt={`강의 현장 ${i + 2}`}
                    width={220}
                    height={150}
                    className={styles.galleryImage}
                  />
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
