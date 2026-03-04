import Image from 'next/image';
import ScrollReveal from '@/components/ui/ScrollReveal';
import type { ProgramCategory } from '@/data/therapyData';
import styles from './ProgramGrid.module.css';

interface ProgramGridProps {
  categories: ProgramCategory[];
}

/* ── SVG Vintage Badge (ornament-only) ── */
function VintageBadge({ category, nameKo, nameEn }: { category: string; nameKo: string; nameEn: string }) {
  const gold = '#c8a549';
  const white = '#fff';

  return (
    <svg className={styles.badgeSvg} viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="20" r="1.5" fill={gold} fillOpacity="0.6" />
      <line x1="38" y1="20" x2="88" y2="20" stroke={gold} strokeOpacity="0.5" strokeWidth="0.8" />
      <polygon points="100,16 104,20 100,24 96,20" fill={gold} fillOpacity="0.7" />
      <line x1="112" y1="20" x2="162" y2="20" stroke={gold} strokeOpacity="0.5" strokeWidth="0.8" />
      <circle cx="170" cy="20" r="1.5" fill={gold} fillOpacity="0.6" />

      <text x="100" y="46" textAnchor="middle" fill={gold}
        fontFamily="var(--font-ui)" fontSize="12" fontWeight="600" letterSpacing="4">
        {category.toUpperCase()}
      </text>

      <text x="100" y="80" textAnchor="middle" fill={white}
        fontFamily="var(--font-heading)" fontSize={nameKo.length > 9 ? '15' : nameKo.length > 6 ? '18' : '22'} fontWeight="500">
        {nameKo}
      </text>

      <line x1="40" y1="98" x2="88" y2="98" stroke={white} strokeOpacity="0.4" strokeWidth="0.8" />
      <circle cx="100" cy="98" r="2" fill={gold} fillOpacity="0.7" />
      <line x1="112" y1="98" x2="160" y2="98" stroke={white} strokeOpacity="0.4" strokeWidth="0.8" />

      <text x="100" y="118" textAnchor="middle" fill="rgba(255,255,255,0.8)"
        fontFamily="var(--font-body)" fontSize="11.5" fontWeight="400" letterSpacing="0.5">
        {nameEn}
      </text>

      <circle cx="80" cy="134" r="1" fill={gold} fillOpacity="0.5" />
      <circle cx="100" cy="134" r="1" fill={gold} fillOpacity="0.5" />
      <circle cx="120" cy="134" r="1" fill={gold} fillOpacity="0.5" />
    </svg>
  );
}

/* ── Text Card (shared across all categories) ── */
function TextCard({ cat, className }: { cat: ProgramCategory; className?: string }) {
  return (
    <div className={`${styles.textCard} ${className || ''}`}>
      <span className={styles.textCardLabel}>{cat.labelEn.toUpperCase()}</span>
      <h3 className={styles.textCardTitle}>{cat.labelKo}</h3>
      <div className={styles.textCardDivider} />
      <p className={styles.textCardDesc}>{cat.intro}</p>
    </div>
  );
}

/* ── Image Card ── */
function ImageCard({ cat, prog }: { cat: ProgramCategory; prog: ProgramCategory['programs'][0] }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          className={styles.image}
          src={prog.image}
          alt={prog.nameKo}
          width={600}
          height={750}
          sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
        />
      </div>
      <div className={styles.overlay} />
      <div className={styles.badge}>
        <VintageBadge category={cat.labelEn} nameKo={prog.nameKo} nameEn={prog.nameEn} />
      </div>
      <div className={styles.hoverPanel}>
        <p className={styles.desc}>{prog.desc}</p>
      </div>
    </div>
  );
}

export default function ProgramGrid({ categories }: ProgramGridProps) {
  const bodyCat = categories.find((c) => c.key === 'body');
  const otherCats = categories.filter((c) => c.key !== 'body');

  return (
    <section className={styles.section}>
      <ScrollReveal>
        <div className="section-header">
          <span className="section-header__label">PROGRAMS</span>
          <h2 className="section-header__title">테라피 프로그램</h2>
          <p className="section-header__sub">몸과 마음의 균형을 되찾는 맞춤 케어</p>
        </div>
      </ScrollReveal>

      {/* ── BODY: text left (2-row span) + images right (2+3) ── */}
      {bodyCat && (
        <div className={styles.categorySection}>
          <div className={styles.bodyLayout}>
            <ScrollReveal>
              <TextCard cat={bodyCat} />
            </ScrollReveal>
            <div className={styles.bodyImages}>
              <div className={styles.bodyRow}>
                {bodyCat.programs.slice(0, 2).map((prog, i) => (
                  <ScrollReveal key={i} delay={i * 0.08}>
                    <ImageCard cat={bodyCat} prog={prog} />
                  </ScrollReveal>
                ))}
              </div>
              <div className={styles.bodyRow}>
                {bodyCat.programs.slice(2).map((prog, i) => (
                  <ScrollReveal key={i} delay={(i + 2) * 0.08}>
                    <ImageCard cat={bodyCat} prog={prog} />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── FACE & SPECIAL: flat single-row grid ── */}
      {otherCats.map((cat) => (
        <div key={cat.key} className={styles.categorySection}>
          <div className={styles.flatGrid} data-count={cat.programs.length + 1}>
            <ScrollReveal>
              <TextCard cat={cat} />
            </ScrollReveal>
            {cat.programs.map((prog, i) => (
              <ScrollReveal key={i} delay={(i + 1) * 0.08}>
                <ImageCard cat={cat} prog={prog} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
