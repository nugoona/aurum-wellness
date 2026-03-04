import Image from 'next/image';
import ScrollReveal from '@/components/ui/ScrollReveal';
import styles from './FacilityGallery.module.css';

interface FacilityGalleryProps {
  staff: string;
  store: string[];
}

const CELL_CLASSES = [
  styles.store1,
  styles.store2,
  styles.store3,
  styles.store4,
  styles.store5,
  styles.store6,
];

const STORE_LABELS = [
  '커플 트리트먼트룸',
  '1인 트리트먼트룸',
  '아로마 오일',
  '바디 테라피',
  'AURUME therapy',
  '족욕 스파',
];

export default function FacilityGallery({ staff, store }: FacilityGalleryProps) {
  return (
    <section className="section section--white">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-header__label">OUR SPACE</span>
            <h2 className="section-header__title">아우르메 테라피</h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className={styles.grid}>
            <div className={`${styles.cell} ${styles.staff}`}>
              <Image
                src={staff}
                alt="THALGO 제품"
                width={580}
                height={696}
                sizes="(max-width: 767px) 100vw, 33vw"
              />
              <div className={styles.cellOverlay}>
                <span className={styles.cellLabel}>THALGO 제품</span>
              </div>
            </div>
            {store.map((src, i) => (
              <div key={i} className={`${styles.cell} ${CELL_CLASSES[i]}`}>
                <Image
                  src={src}
                  alt={STORE_LABELS[i]}
                  width={580}
                  height={435}
                  sizes="(max-width: 767px) 50vw, 33vw"
                />
                <div className={styles.cellOverlay}>
                  <span className={styles.cellLabel}>{STORE_LABELS[i]}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
