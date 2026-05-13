'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Phone, MessageCircle } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import styles from './ClassRecruitment.module.css';

const OPEN_DATE = new Date('2026-04-17T00:00:00');
const PROMO_END = new Date('2026-05-29T23:59:59');

function getDday() {
  const now = new Date();
  const diff = OPEN_DATE.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

const CURRICULUM = [
  {
    num: '01',
    title: '마사지의 이해',
    desc: '마사지의 역사와 원리, 5단계 기본 원칙 (점·누르기·선·문지르기·반복)을 체계적으로 학습합니다.',
    image: '/images/class-lv1/01_lecture_portrait.webp',
  },
  {
    num: '02',
    title: '기초 표면 해부학',
    desc: '근골격계 구조를 이해하고, 주요 근육과 뼈의 위치를 촉진으로 파악하는 능력을 기릅니다.',
    image: '/images/class-lv1/03_anatomy_portrait.webp',
  },
  {
    num: '03',
    title: '건식 기본 테크닉',
    desc: '부위별 건식 마사지 실습. 목·어깨·등·팔·손 순서로 올바른 자세와 손의 감각을 익힙니다.',
    image: '/images/class-lv1/04_technique_portrait.webp',
  },
];

const TARGETS = [
  { image: '/images/class-lv1/07_need_square.webp', strong: '마사지에 관심 있는 모든 분들', desc: '전공 무관, 누구나 시작 가능' },
  { image: '/images/class-lv1/02_practice_square.webp', strong: '초보자 및 기본기가 필요한 경력자', desc: '스킨케어 및 미용 전문가 포함' },
  { image: '/images/class-lv1/08_fitness_square.webp', strong: '피트니스 · 운동 · 재활 전문가', desc: '물리치료사 등 보건 전문가' },
  { image: '/images/class-lv1/06_graduation_square.webp', strong: '창업 · 이직을 생각하는 분들', desc: '미래의 먹거리를 찾는 모든 분들' },
];

export default function ClassRecruitment() {
  const [dday, setDday] = useState<number | null>(null);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (new Date() > PROMO_END) { setExpired(true); return; }
    setDday(getDday());
    const timer = setInterval(() => setDday(getDday()), 60000);
    return () => clearInterval(timer);
  }, []);

  const ddayLabel = dday !== null
    ? dday > 0 ? `D-${dday}` : dday === 0 ? 'D-DAY' : '진행중'
    : '';

  if (expired) return null;

  return (
    <section className={styles.section} id="recruitment">
      <div className={styles.container}>

        {/* ─── 헤더 ─── */}
        <ScrollReveal>
          <div className={styles.header}>
            <span className={styles.headerLabel}>Now Recruiting</span>
            {ddayLabel && <span className={styles.dday}>{ddayLabel}</span>}
          </div>
          <h2 className={styles.title}>
            기초 건식 근골격케어 입문
            <span className={styles.titleEn}>Therapy Class Lv.1</span>
          </h2>
          <p className={styles.subtitle}>모든 수기 관리의 확실한 출발점</p>
        </ScrollReveal>

        {/* ─── 일정 정보 가로 바 ─── */}
        <ScrollReveal delay={0.1}>
          <div className={styles.infoRow}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>일정</span>
              <span className={styles.infoValue}>2026.4.17 ~ 5.29</span>
            </div>
            <div className={styles.infoDivider} />
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>요일</span>
              <span className={styles.infoValue}>매주 금요일</span>
            </div>
            <div className={styles.infoDivider} />
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>시간</span>
              <span className={styles.infoValue}>10:00 ~ 17:00</span>
            </div>
            <div className={styles.infoDivider} />
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>기간</span>
              <span className={styles.infoValue}>7주 · 21강</span>
            </div>
            <div className={styles.infoDivider} />
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>장소</span>
              <span className={styles.infoValue}>인천 부평구 부평문화로 56, 3층</span>
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
            {CURRICULUM.map((item, i) => (
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
            {TARGETS.map((t, i) => (
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

        {/* ─── 가격 (쿠폰 스타일) ─── */}
        <div className={styles.priceArea}>
          <ScrollReveal>
            <span className={styles.sectionLabel}>Tuition</span>
            <h3 className={styles.priceHeadline}>2인 동반 추가 할인</h3>
            <p className={styles.priceSubheadline}>Buddy Discount</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className={styles.priceCards}>
              <div className={styles.priceCard}>
                <span className={styles.priceCardTag}>1인</span>
                <div className={styles.priceCardLevel}>Lv.1</div>
                <div className={styles.priceCardAmount}>
                  79<span className={styles.priceCardUnit}>만원</span>
                </div>
                <p className={styles.priceCardNote}>카드 결제 시 VAT 별도</p>
              </div>

              <span className={styles.priceArrow}>→</span>

              <div className={`${styles.priceCard} ${styles.priceCardFeatured}`}>
                <span className={styles.priceCardTag}>동반 할인</span>
                <div className={styles.priceCardLevel}>Lv.1</div>
                <div className={`${styles.priceCardAmount} ${styles.priceCardHighlight}`}>
                  70<span className={styles.priceCardUnit}>만원</span>
                </div>
                <span className={styles.priceCardSave}>9만원 할인</span>
              </div>
            </div>
          </ScrollReveal>

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
