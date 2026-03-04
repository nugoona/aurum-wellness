import ScrollReveal from '@/components/ui/ScrollReveal';
import { BOOKING_URL } from '@/data/siteData';
import styles from './CTABanner.module.css';

interface CTABannerProps {
  title: string;
  subtitle?: string;
  image: string;
  bookingLabel?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTABanner({
  title,
  subtitle,
  image,
  bookingLabel = '지금 예약하기',
  secondaryLabel,
  secondaryHref,
}: CTABannerProps) {
  return (
    <section className={styles.section} style={{ backgroundImage: `url(${image})` }}>
      <div className={styles.overlay} />
      <div className={`container ${styles.content}`}>
        <ScrollReveal>
          <h2 className={styles.title}>
            {title.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i < title.split('\n').length - 1 && <br />}
              </span>
            ))}
          </h2>
        </ScrollReveal>
        {subtitle && (
          <ScrollReveal delay={0.1}>
            <p className={styles.subtitle}>{subtitle}</p>
          </ScrollReveal>
        )}
        <ScrollReveal delay={0.2}>
          <div className={styles.buttons}>
            <a
              href={secondaryHref || BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary btn--fullwidth-mobile"
            >
              {bookingLabel}
            </a>
            {secondaryLabel && secondaryHref && (
              <a
                href={secondaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--white-outline btn--fullwidth-mobile"
              >
                {secondaryLabel}
              </a>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
