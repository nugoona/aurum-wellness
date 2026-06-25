import ScrollReveal from '@/components/ui/ScrollReveal';
import CourseFilm from '@/components/ui/CourseFilm';
import styles from './FilmSection.module.css';

interface Props {
  label?: string;
  heading: string;
  subtitle?: string;
  youtubeId: string;
  poster: string;
}

export default function FilmSection({ label, heading, subtitle, youtubeId, poster }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ScrollReveal>
          {label && <span className={styles.label}>{label}</span>}
          <h2 className={styles.heading}>{heading}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <div className={styles.player}>
            <CourseFilm youtubeId={youtubeId} poster={poster} title={heading} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
