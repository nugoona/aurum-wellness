import ScrollReveal from '@/components/ui/ScrollReveal';
import styles from './ServiceTracks.module.css';

interface Track {
  label: string;
  title: string;
  desc: string;
  tags: string[];
  image: string;
}

interface CeoProfile {
  name: string;
  title: string;
  image: string;
  credentials: string[];
}

export default function ServiceTracks({
  tracks,
  title,
  ceo,
}: {
  tracks: Track[];
  title?: string;
  ceo?: CeoProfile;
}) {
  return (
    <section className="section section--alt">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-header__label">SERVICES</span>
            <h2 className={`section-header__title${title && title.includes('\n') ? ' section-header__title--compact' : ''}`}>
              {title ? title.split('\n').map((line, i) => (
                <span key={i}>{i > 0 && <br />}{line}</span>
              )) : '두 가지 핵심 서비스'}
            </h2>
          </div>
        </ScrollReveal>

        <div className={styles.list}>
          {tracks.map((track, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <div className={`${styles.item} ${i % 2 === 1 ? styles.itemReverse : ''}`}>
                <div className={styles.imageWrap}>
                  <div
                    className={styles.image}
                    style={{ backgroundImage: `url(${track.image})` }}
                  />
                </div>
                <div className={styles.text}>
                  <span className={styles.label}>{track.label}</span>
                  <h3 className={styles.title}>{track.title}</h3>
                  <p className={styles.desc}>
                    {track.desc.split('\n\n').map((para, j) => (
                      <span key={j} className={j > 0 ? styles.descPara : undefined}>
                        {para}
                      </span>
                    ))}
                  </p>
                  <div className={styles.tags}>
                    {track.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {ceo && (
          <ScrollReveal delay={0.2}>
            <div className={styles.ceoStrip}>
              <div className={styles.ceoImageWrap}>
                <img src={ceo.image} alt={ceo.name} className={styles.ceoImage} />
              </div>
              <div className={styles.ceoInfo}>
                <div className={styles.ceoHeader}>
                  <span className={styles.ceoName}>{ceo.name}</span>
                  <span className={styles.ceoTitle}>{ceo.title}</span>
                </div>
                <div className={styles.ceoLabel}>자격 &amp; 면허</div>
                <ul className={styles.credentials}>
                  {ceo.credentials.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
