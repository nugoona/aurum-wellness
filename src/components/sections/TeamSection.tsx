import Image from 'next/image';
import ScrollReveal from '@/components/ui/ScrollReveal';
import styles from './TeamSection.module.css';
import type { TeamMember } from '@/data/therapyData';

interface TeamSectionProps {
  ceo: TeamMember;
  therapists: TeamMember[];
  groupPhoto: string;
}

export default function TeamSection({ ceo, therapists, groupPhoto }: TeamSectionProps) {
  return (
    <section className={`section section--alt ${styles.teamSection}`}>
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-header__label">OUR TEAM</span>
            <h2 className="section-header__title">전문 테라피스트</h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className={styles.teamGrid}>
            {/* CEO Column: photo + small group photo */}
            <div className={styles.ceoCol}>
              <div className={styles.photoCard}>
                <div className={styles.photoWrap}>
                  <Image
                    src={ceo.image}
                    alt={ceo.name}
                    width={600}
                    height={800}
                    sizes="(max-width: 767px) 100vw, 35vw"
                  />
                </div>
                <div className={styles.overlay}>
                  <h3 className={styles.overlayName}>{ceo.name}</h3>
                  <span className={styles.overlayRole}>{ceo.role}</span>
                </div>
              </div>

              <div className={styles.groupWrap}>
                <Image
                  src={groupPhoto}
                  alt="아우르메 테라피 팀"
                  width={800}
                  height={450}
                  sizes="(max-width: 767px) 100vw, 35vw"
                />
              </div>
            </div>

            {/* 4 Therapists */}
            {therapists.map((member, i) => (
              <div key={i} className={`${styles.therapistCol} ${member.name === '김준경' ? styles.therapistSmaller : ''}`}>
                <div className={styles.photoCard}>
                  <div className={styles.photoWrap}>
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={400}
                      height={600}
                      sizes="(max-width: 767px) 45vw, 16vw"
                    />
                  </div>
                  <div className={styles.overlay}>
                    <h4 className={styles.overlayName}>{member.name}</h4>
                    <span className={styles.overlayRole}>{member.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* CEO Quote below grid */}
        {ceo.quote && (
          <ScrollReveal delay={0.25}>
            <blockquote className={styles.quoteBlock}>
              <p className={styles.quoteText}>
                <svg className={styles.quoteOpen} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.166 11 15c0 1.933-1.567 3.5-3.5 3.5-1.222 0-2.37-.587-2.917-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.69 21 13.166 21 15c0 1.933-1.567 3.5-3.5 3.5-1.222 0-2.37-.587-2.917-1.179z" />
                </svg>
                {ceo.quote?.split('\n').map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
                <svg className={styles.quoteClose} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.417 6.679C20.447 7.773 21 9 21 10.989c0 3.5-2.457 6.637-6.03 8.188l-.893-1.378c3.335-1.804 3.987-4.145 4.247-5.621-.537.278-1.24.375-1.929.311C14.409 12.31 13 10.834 13 9c0-1.933 1.567-3.5 3.5-3.5 1.222 0 2.37.587 2.917 1.179zm-10 0C10.447 7.773 11 9 11 10.989c0 3.5-2.457 6.637-6.03 8.188l-.893-1.378C7.412 16.195 8.064 13.854 8.324 12.378 7.787 12.656 7.084 12.753 6.395 12.689 4.409 12.31 3 10.834 3 9c0-1.933 1.567-3.5 3.5-3.5 1.222 0 2.37.587 2.917 1.179z" />
                </svg>
              </p>
            </blockquote>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
