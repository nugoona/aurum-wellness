'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Phone, MessageCircle } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import type { ClassCourse } from '@/data/classData';
import styles from './ClassRecruitment.module.css';

interface Props {
  course: ClassCourse;
}

function getDday(openDate: Date) {
  const diff = openDate.getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function ClassRecruitment({ course }: Props) {
  const openDate = new Date(`${course.openDate}T00:00:00`);
  const promoEnd = new Date(`${course.promoEnd}T23:59:59`);

  const [dday, setDday] = useState<number | null>(null);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (new Date() > promoEnd) { setExpired(true); return; }
    setDday(getDday(openDate));
    const timer = setInterval(() => setDday(getDday(openDate)), 60000);
    return () => clearInterval(timer);
  }, [course.openDate, course.promoEnd]);

  const ddayLabel = dday !== null
    ? dday > 0 ? `D-${dday}` : dday === 0 ? 'D-DAY' : '진행중'
    : '';

  if (expired) return null;

  const { schedule, curriculum, targets, pricing } = course;

  return (
    <section className={styles.section} id={`recruitment-${course.id}`}>
      <div className={styles.container}>

        {/* ─── 헤더 ─── */}
        <ScrollReveal>
          <div className={styles.header}>
            <span className={styles.headerLabel}>Now Recruiting</span>
            {ddayLabel && <span className={styles.dday}>{ddayLabel}</span>}
          </div>
          <h2 className={styles.title}>
            {course.titleKo}
            <span className={styles.titleEn}>{course.titleEn}</span>
          </h2>
          <p className={styles.subtitle}>{course.subtitle}</p>
        </ScrollReveal>

        {/* ─── 일정 정보 가로 바 ─── */}
        <ScrollReveal delay={0.1}>
          <div className={styles.infoRow}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>일정</span>
              <span className={styles.infoValue}>{schedule.period}</span>
            </div>
            <div className={styles.infoDivider} />
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>요일</span>
              <span className={styles.infoValue}>{schedule.dayOfWeek}</span>
            </div>
            <div className={styles.infoDivider} />
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>시간</span>
              <span className={styles.infoValue}>{schedule.time}</span>
            </div>
            <div className={styles.infoDivider} />
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>기간</span>
              <span className={styles.infoValue}>{schedule.duration}</span>
            </div>
            <div className={styles.infoDivider} />
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>장소</span>
              <span className={styles.infoValue}>{schedule.location}</span>
            </div>
          </div>
        </ScrollReveal>

        {/* ─── 커리큘럼 ─── */}
        <div className={styles.currSection}>
          <ScrollReveal>
            <span className={styles.sectionLabel}>Curriculum</span>
            <h3 className={styles.sectionTitle}>주요 수업 주제</h3>
          </ScrollReveal>
          <div className={styles.curriculumGrid}>
            {curriculum.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className={styles.currCard}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={300}
                    className={styles.currImage}
                  />
                  <div className={styles.currBody}>
                    <span className={styles.currNum}>{item.num}</span>
                    <h4 className={styles.currTitle}>{item.title}</h4>
                    <p className={styles.currDesc}>{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* ─── 추천 대상 ─── */}
        <div className={styles.targetSection}>
          <ScrollReveal>
            <span className={styles.sectionLabel}>Recommend</span>
            <h3 className={styles.sectionTitle}>이런 분들께 추천드립니다</h3>
          </ScrollReveal>
          <div className={styles.targetGrid}>
            {targets.map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className={styles.targetCard}>
                  <Image
                    src={t.image}
                    alt={t.strong}
                    width={600}
                    height={400}
                    className={styles.targetImage}
                  />
                  <div className={styles.targetBody}>
                    <span className={styles.targetStrong}>{t.strong}</span>
                    <span className={styles.targetDesc}>{t.desc}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* ─── 가격 ─── */}
        <div className={styles.priceArea}>
          {pricing.type === 'buddy' ? (
            <>
              <ScrollReveal>
                <span className={styles.sectionLabel}>Tuition</span>
                <h3 className={styles.priceHeadline}>{pricing.headline}</h3>
                <p className={styles.priceSubheadline}>{pricing.subheadline}</p>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <div className={styles.priceCards}>
                  <div className={styles.priceCard}>
                    <span className={styles.priceCardTag}>{pricing.single.tag}</span>
                    <div className={styles.priceCardLevel}>{pricing.single.level}</div>
                    <div className={styles.priceCardAmount}>
                      {pricing.single.amount}<span className={styles.priceCardUnit}>{pricing.single.unit}</span>
                    </div>
                    {pricing.single.note && (
                      <p className={styles.priceCardNote}>{pricing.single.note}</p>
                    )}
                  </div>

                  <span className={styles.priceArrow}>→</span>

                  <div className={`${styles.priceCard} ${styles.priceCardFeatured}`}>
                    <span className={styles.priceCardTag}>{pricing.buddy.tag}</span>
                    <div className={styles.priceCardLevel}>{pricing.buddy.level}</div>
                    <div className={`${styles.priceCardAmount} ${styles.priceCardHighlight}`}>
                      {pricing.buddy.amount}<span className={styles.priceCardUnit}>{pricing.buddy.unit}</span>
                    </div>
                    <span className={styles.priceCardSave}>{pricing.buddy.saveLabel}</span>
                  </div>
                </div>
              </ScrollReveal>
            </>
          ) : (
            <>
              <ScrollReveal>
                <span className={styles.sectionLabel}>Tuition</span>
                <h3 className={styles.priceHeadline}>수강료 안내</h3>
                <p className={styles.priceSubheadline}>Tuition</p>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <div className={styles.priceCardsSingle}>
                  <div className={`${styles.priceCard} ${styles.priceCardFeatured}`}>
                    {pricing.tag && (
                      <span className={styles.priceCardTag}>{pricing.tag}</span>
                    )}
                    <div className={styles.priceCardLevel}>{pricing.level}</div>
                    <div className={`${styles.priceCardAmount} ${styles.priceCardHighlight}`}>
                      {pricing.amount}<span className={styles.priceCardUnit}>{pricing.unit}</span>
                    </div>
                    {pricing.note && (
                      <p className={styles.priceCardNote}>{pricing.note}</p>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            </>
          )}

          <ScrollReveal delay={0.2}>
            <div className={styles.ctaRow}>
              <a href="tel:010-2981-9989" className={styles.ctaPhone}>
                <Phone size={18} />
                010-2981-9989
              </a>
              <a
                href="https://pf.kakao.com/_AaZxgn"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaKakao}
              >
                <MessageCircle size={18} />
                카카오톡 문의
              </a>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
