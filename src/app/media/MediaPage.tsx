'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '@/components/sections/Hero';
import styles from './page.module.css';
import { MEDIA } from '@/data/mediaData';
import {
  LATEST_BLOG_POSTS,
  CATEGORY_COLORS,
  NAVER_BLOG_URL,
  formatEventDate,
} from '@/data/blogPosts';
import { PRESS_ARTICLES, formatPressDate } from '@/data/pressArticles';
import {
  YOUTUBE_VIDEOS,
  YOUTUBE_CHANNEL_NAME,
  YOUTUBE_CHANNEL_URL,
} from '@/data/youtubeVideos';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────
   디자인 노트 — 럭셔리 매거진 페이지
   ─────────────────────────────────────────────────────────────
   · Voices: 비대칭 페어. 작은 9:16 영상 + 옆 텍스트 컬럼.
     짝수번째는 좌우 반전. 한 줄에 한 voice (= 히어로 다음 첫
     화면에 voices 한 페어가 깔끔히 들어옴, 모바일은 2x 그리드).
   · Philosophy: 4-up 유지 + 짝수 카드 살짝 아래로 (매거진 리듬).
     타이틀 앞 짧은 골드 헤어라인.
   · 골드 마름모(GoldMark) — 섹션 헤드 · 보이스 · 블로그
     카테고리 등에서 반복되는 공통 오너먼트.
   · 카드 hover: translateY 리프트 ❌. bottom에서 골드 헤어라인이
     scaleX(0→1) 드러나고 썸네일이 미세하게 줌업.
   · 블로그 좌측 컬러 바 ❌. 카테고리 미니 마름모 + 카테고리 라벨로
     교체. 카드 하단에 "본문 읽기 →" 미세 CTA.
   · Hero · Poster 플레이 버튼: hover 시 동심 골드 링이 확장 페이드.
   · GSAP: 섹션 헤드 fade-up, 마름모 scale-back, 골드 룰 scaleX,
     카드 stagger fade-up.
   ───────────────────────────────────────────────────────────── */

/* ============================================
   모달 플레이어 — 클릭 시 fullscreen native controls
   ============================================ */
interface ActiveVideo {
  src: string;
  poster: string;
  alt: string;
  orientation: '9:16' | '16:9';
}

function VideoModal({
  video,
  onClose,
}: {
  video: ActiveVideo | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!video) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [video, onClose]);

  if (!video) return null;

  return (
    <div
      className={styles.modalBackdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="영상 재생"
    >
      <button
        type="button"
        className={styles.modalClose}
        onClick={onClose}
        aria-label="닫기"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 6 L18 18 M18 6 L6 18" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </button>

      <div
        className={`${styles.modalInner} ${
          video.orientation === '9:16' ? styles.modalPortrait : styles.modalLandscape
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <video
          src={video.src}
          poster={video.poster}
          autoPlay
          controls
          controlsList="nodownload noremoteplayback noplaybackrate"
          disablePictureInPicture
          playsInline
          preload="auto"
          aria-label={video.alt}
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
    </div>
  );
}

/* ============================================
   포스터 카드 — 썸네일 + 가운데 플레이 버튼 (동심 골드 링)
   ============================================ */
function PosterCard({
  src,
  poster,
  alt,
  orientation,
  onPlay,
}: {
  src: string;
  poster: string;
  alt: string;
  orientation: '9:16' | '16:9';
  onPlay: (v: ActiveVideo) => void;
}) {
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      onPlay({ src, poster, alt, orientation });
    },
    [src, poster, alt, orientation, onPlay]
  );

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt={alt}
        loading="eager"
        decoding="async"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
      <button
        type="button"
        aria-label={`${alt} 재생`}
        className={styles.playBtn}
        onClick={handleClick}
      >
        <span className={styles.playBtnCircle}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 5 v14 l13 -7 z" />
          </svg>
        </span>
      </button>
    </>
  );
}

/* ============================================
   작은 헬퍼 — 골드 마름모 오너먼트
   ============================================ */
function GoldMark({ className }: { className?: string }) {
  return (
    <span
      className={`${styles.goldMark}${className ? ' ' + className : ''}`}
      aria-hidden="true"
    />
  );
}

/* ============================================
   에디토리얼 섹션 헤드
   ─ 마름모 + 한글 타이틀 + 한글 보조 + 옵션 액션
   ─ 하단 헤어라인은 회색 1px + 좌측에 짧은 골드 룰 오버레이
   ============================================ */
function SectionHead({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <header className={styles.sectionHead}>
      <div className={styles.sectionHeadMain}>
        <GoldMark />
        <h2 className={styles.sectionTitleKo}>{title}</h2>
        {subtitle && <p className={styles.sectionSubKo}>{subtitle}</p>}
      </div>
      {action && <div className={styles.sectionHeadAction}>{action}</div>}
      <span className={styles.sectionRule} aria-hidden="true" />
    </header>
  );
}

/* ============================================
   PAGE
   ============================================ */
export default function MediaPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState<ActiveVideo | null>(null);

  const openVideo = useCallback((v: ActiveVideo) => setActiveVideo(v), []);
  const closeVideo = useCallback(() => setActiveVideo(null), []);

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      // 섹션 헤드 — fade-up
      gsap.utils
        .toArray<HTMLElement>(`.${styles.sectionHead}, .${styles.stillnessHead}`)
        .forEach((el) => {
          gsap.from(el, {
            y: 20,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          });
        });

      // 골드 마름모 — scale-back
      gsap.utils.toArray<HTMLElement>(`.${styles.goldMark}`).forEach((el) => {
        gsap.from(el, {
          scale: 0,
          rotate: 0,
          duration: 0.7,
          ease: 'back.out(2.2)',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        });
      });

      // 골드 헤어라인 — scaleX 리빌
      gsap.utils.toArray<HTMLElement>(`.${styles.sectionRule}`).forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          duration: 1.1,
          ease: 'power2.out',
          transformOrigin: 'left center',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        });
      });

      // 카드 stagger — fade-up
      gsap.utils
        .toArray<HTMLElement>(
          `.${styles.voiceCard}, .${styles.philoCard}, .${styles.blogCard}, .${styles.pressCard}, .${styles.stillnessStage}`
        )
        .forEach((el, i) => {
          gsap.from(el, {
            y: 28,
            opacity: 0,
            duration: 0.95,
            delay: (i % 4) * 0.07,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          });
        });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      className={styles.page}
      onContextMenu={(e) => {
        const t = e.target as HTMLElement;
        if (t.tagName === 'IMG' || t.tagName === 'VIDEO') e.preventDefault();
      }}
    >
      {/* ============== 01 · HERO — 영상 bg + TV 위 플레이 버튼 ============== */}
      <section className={styles.hero}>
        <video
          className={styles.heroBg}
          src={MEDIA.backgroundVideo}
          poster="/videos/media/미디어_배경_영상.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          controlsList="nodownload noremoteplayback"
          disablePictureInPicture
        />
        <div className={styles.heroOverlay} aria-hidden="true" />

        <div className={styles.heroTopText}>
          <span className={styles.heroLabel}>MEDIA</span>
          <h1 className={styles.heroTitle}>
            영상과 기록으로
            <br />
            만나는 아우르메
          </h1>
        </div>

        <button
          type="button"
          aria-label="브랜드 영상 재생"
          className={styles.heroTvPlayBtn}
          onClick={() =>
            openVideo({
              src: MEDIA.hero.mp4Src!,
              poster: MEDIA.hero.poster,
              alt: MEDIA.hero.titleKo,
              orientation: '16:9',
            })
          }
        >
          <span className={styles.heroTvPlayCircle}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 5 v14 l13 -7 z" />
            </svg>
          </span>
        </button>
      </section>

      {/* ============== 02 · VOICES — 비대칭 페어 ============== */}
      <section className={styles.voices}>
        <div className={styles.sectionContainer}>
          <SectionHead
            title="공간과 사람"
            subtitle="샵 소개 영상과 김준경 실장의 인터뷰"
          />

          <div className={styles.voicesGrid}>
            {MEDIA.voices.map((v, idx) => (
              <article key={idx} className={styles.voiceCard}>
                <div className={styles.voiceVideo}>
                  <PosterCard
                    src={v.mp4Src!}
                    poster={v.poster}
                    alt={v.titleKo}
                    orientation={v.orientation}
                    onPlay={openVideo}
                  />
                </div>
                <div className={styles.voiceText}>
                  <GoldMark className={styles.voiceMark} />
                  <h3 className={styles.voiceTitleKo}>{v.titleKo}</h3>
                  {v.quote && <p className={styles.voiceQuote}>{v.quote}</p>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============== 03 · PHILOSOPHY — 4-up, 미세 스태거 ============== */}
      <section className={styles.philosophy}>
        <div className={styles.sectionContainer}>
          <SectionHead
            title="네 편의 짧은 이야기"
            subtitle="아우르메가 답하는 네 가지 질문"
          />

          <div className={styles.philosophyGrid}>
            {MEDIA.philosophy.map((p, idx) => (
              <article key={idx} className={styles.philoCard}>
                <div className={styles.philoVideo}>
                  <PosterCard
                    src={p.mp4Src!}
                    poster={p.poster}
                    alt={p.titleKo}
                    orientation={p.orientation}
                    onPlay={openVideo}
                  />
                </div>
                <div className={styles.philoText}>
                  <h3 className={styles.philoTitleKo}>{p.titleKo}</h3>
                  {p.quote && <p className={styles.philoQuote}>{p.quote}</p>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============== 04 · STILLNESS — 다크 시네마 슬랩 ============== */}
      <section className={styles.stillness}>
        <div className={styles.stillnessInner}>
          <header className={styles.stillnessHead}>
            <div className={styles.sectionHeadMain}>
              <GoldMark />
              <h2 className={styles.stillnessTitleKo}>아로마 테라피</h2>
            </div>
            <span className={styles.sectionRule} aria-hidden="true" />
          </header>

          <div className={styles.stillnessStage}>
            <PosterCard
              src={MEDIA.stillness.mp4Src!}
              poster={MEDIA.stillness.poster}
              alt={MEDIA.stillness.titleKo}
              orientation={MEDIA.stillness.orientation}
              onPlay={openVideo}
            />
          </div>

          <div className={styles.stillnessCaptionRow}>
            <span className={styles.stillnessCaptionRule} aria-hidden="true" />
            <p className={styles.stillnessPoetic}>
              아로마 오일, 따뜻한 손, 그리고 침묵.
              <br />
              감각이 가라앉는 자리에서 회복이 시작됩니다.
            </p>
          </div>
        </div>
      </section>

      {/* ============== 05 · 아우름 웰니스 현장 ============== */}
      {LATEST_BLOG_POSTS.length > 0 && (
        <section className={styles.blog}>
          <div className={styles.blogInner}>
            <SectionHead
              title="아우름 웰니스 현장"
              subtitle="임직원 복지 · 기업 행사 · 웰니스 프로그램"
              action={
                <a
                  href={NAVER_BLOG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.blogHeadAction}
                >
                  <span>전체 현장 보기</span>
                  <span className={styles.actionArrow} aria-hidden="true">→</span>
                </a>
              }
            />

            <div className={styles.blogGrid}>
              {LATEST_BLOG_POSTS.slice(0, 3).map((post) => {
                const color = CATEGORY_COLORS[post.category];
                const ed = formatEventDate(post.eventDate);
                return (
                  <a
                    key={post.id}
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.blogCard}
                    style={{ ['--cat-color' as string]: color }}
                  >
                    <div className={styles.blogThumb}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        loading="eager"
                        decoding="async"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                    </div>
                    <div className={styles.blogBody}>
                      <div className={styles.blogMeta}>
                        <span className={styles.blogCategory}>
                          <span className={styles.blogCategoryDot} aria-hidden="true" />
                          {post.category}
                        </span>
                        {ed && <span className={styles.blogDate}>{ed}</span>}
                      </div>
                      <h3 className={styles.blogTitle}>{post.title}</h3>
                      <span className={styles.blogReadMore}>
                        <span>본문 읽기</span>
                        <span className={styles.actionArrow} aria-hidden="true">→</span>
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ============== 06 · 아우르메 유튜브 (the 手作) — 준비중 ============== */}
      {YOUTUBE_VIDEOS.length > 0 && (
        <section className={styles.youtube}>
          <div className={styles.youtubeInner}>
            <header className={styles.sectionHead}>
              <div className={styles.sectionHeadMain}>
                <GoldMark />
                <div className={styles.youtubeTitleRow}>
                  <h2 className={styles.sectionTitleKo}>아우르메 유튜브</h2>
                  <span className={styles.youtubeChannelTag}>{YOUTUBE_CHANNEL_NAME}</span>
                  <span className={styles.youtubeStatusBadge}>준비중</span>
                </div>
                <p className={styles.sectionSubKo}>
                  손으로 만드는 케어, 짧은 영상으로 곧 만나보세요
                </p>
              </div>
              <span className={styles.sectionRule} aria-hidden="true" />
            </header>

            <div className={styles.youtubeGrid}>
              {YOUTUBE_VIDEOS.map((v) => (
                <article
                  key={v.id}
                  className={styles.youtubeCard}
                  aria-label={`${v.title} (준비중)`}
                >
                  <div className={styles.youtubeThumb}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={v.thumbnail}
                      alt={v.title}
                      loading="lazy"
                      decoding="async"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                    <div className={styles.youtubeThumbOverlay} aria-hidden="true" />
                    <span className={styles.youtubePlayIcon} aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path d="M7 5 v14 l13 -7 z" />
                      </svg>
                    </span>
                    <span className={styles.youtubeReadyBadge}>준비중</span>
                  </div>
                  <h3 className={styles.youtubeTitleCard}>{v.title}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============== 07 · 언론 보도 ============== */}
      {PRESS_ARTICLES.length > 0 && (() => {
        const featured = PRESS_ARTICLES.find((p) => p.featured);
        const others = PRESS_ARTICLES.filter((p) => p.id !== featured?.id);
        return (
          <section className={styles.press}>
            <div className={styles.pressInner}>
              <SectionHead
                title="언론 속 아우르메"
                subtitle="아우르메 테라피와 아우름 웰니스가 언론에 다뤄진 기록"
              />

              {/* Featured — 가로 split */}
              {featured && (
                <a
                  href={featured.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.pressCard} ${styles.pressFeatured}`}
                >
                  <div className={styles.pressThumb}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={featured.thumbnail}
                      alt={featured.headline}
                      loading="eager"
                      decoding="async"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  </div>
                  <div className={styles.pressBody}>
                    <div className={styles.pressOutletRow}>
                      <span className={styles.pressOutlet}>{featured.outlet}</span>
                      {featured.outletEn && (
                        <span className={styles.pressOutletEn}>{featured.outletEn}</span>
                      )}
                      <span className={styles.pressDate}>{formatPressDate(featured.date)}</span>
                    </div>
                    <h3 className={`${styles.pressHeadline} ${styles.pressHeadlineLarge}`}>
                      {featured.headline}
                    </h3>
                    <span className={styles.pressReadMore}>
                      <span>원문 보기</span>
                      <span className={styles.actionArrow} aria-hidden="true">→</span>
                    </span>
                  </div>
                </a>
              )}

              {/* 보조 카드 그리드 */}
              {others.length > 0 && (
                <div className={styles.pressGrid}>
                  {others.map((p) => (
                    <a
                      key={p.id}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.pressCard}
                    >
                      <div className={styles.pressThumb}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.thumbnail}
                          alt={p.headline}
                          loading="lazy"
                          decoding="async"
                          style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                        />
                      </div>
                      <div className={styles.pressBody}>
                        <div className={styles.pressOutletRow}>
                          <span className={styles.pressOutlet}>{p.outlet}</span>
                          <span className={styles.pressDate}>{formatPressDate(p.date)}</span>
                        </div>
                        <h3 className={styles.pressHeadline}>{p.headline}</h3>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })()}

      {/* ============== 모달 플레이어 ============== */}
      <VideoModal video={activeVideo} onClose={closeVideo} />
    </div>
  );
}
