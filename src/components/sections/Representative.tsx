'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import styles from './Representative.module.css';

interface RepresentativeProps {
  label: string;
  name: string;
  role: string;
  quote: string;
  image: string;
  credentials: string[];
}

export default function Representative({ label, name, role, quote, image, credentials }: RepresentativeProps) {
  const [expanded, setExpanded] = useState(false);
  const visibleCount = 4;

  return (
    <section className="section section--white">
      <div className="container">
        <div className={styles.grid}>
          <ScrollReveal>
            <div className={styles.imageWrap}>
              <div
                className={styles.image}
                style={{ backgroundImage: `url(${image})` }}
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className={styles.text}>
              <span className={styles.label}>{label}</span>
              <h2 className={styles.name}>{name}</h2>
              <p className={styles.role}>{role}</p>
              <blockquote className={styles.quote}>{quote}</blockquote>
              <ul className={styles.creds}>
                {credentials.slice(0, expanded ? undefined : visibleCount).map((c, i) => (
                  <li key={i} className={styles.credItem}>{c}</li>
                ))}
              </ul>
              {credentials.length > visibleCount && (
                <button
                  className={styles.expandBtn}
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? '접기' : `자격 사항 더보기 (${credentials.length - visibleCount})`}
                  <ChevronDown
                    size={16}
                    style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}
                  />
                </button>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
