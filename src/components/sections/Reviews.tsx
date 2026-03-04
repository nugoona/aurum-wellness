'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import styles from './Reviews.module.css';
import type { ReviewData } from '@/data/reviewData';

function MobileReviewCard({ review }: { review: ReviewData }) {
  const [expanded, setExpanded] = useState(false);
  const [replyOpen, setReplyOpen] = useState(false);
  const needsTruncate = review.body.length > 80;

  return (
    <div className={styles.mobileCard}>
      <div className={styles.mobileCardTop}>
        {review.media.length > 0 && (
          <div
            className={styles.mobileThumb}
            style={{ backgroundImage: `url(${review.media[0]})` }}
          />
        )}
        <div className={styles.mobileCardInfo}>
          <div className={styles.authorRow}>
            <span className={styles.nickname}>{review.nickname}</span>
            {review.visitCount > 1 && (
              <span className={styles.visitBadge}>{review.visitCount}회</span>
            )}
            <span className={styles.date}>{review.visited}</span>
          </div>
          {review.votedKeywords.length > 0 && (
            <div className={styles.tags}>
              {review.votedKeywords.slice(0, 2).map((kw, idx) => (
                <span key={idx} className={styles.tag}>{kw}</span>
              ))}
            </div>
          )}
        </div>
      </div>
      <p className={styles.mobileText}>
        {needsTruncate && !expanded ? (
          <>
            {review.body.slice(0, 80)}...
            <button className={styles.moreBtn} onClick={() => setExpanded(true)}>더보기</button>
          </>
        ) : (
          <>
            {review.body}
            {needsTruncate && (
              <button className={styles.moreBtn} onClick={() => { setExpanded(false); setReplyOpen(false); }}>접기</button>
            )}
          </>
        )}
      </p>
      {review.reply && (
        replyOpen ? (
          <div className={styles.reply}>
            <div className={styles.replyHeader}>
              <span className={styles.replyArrow}>↳</span>
              <strong>아우르메 테라피</strong>
              <button className={styles.replyFold} onClick={() => setReplyOpen(false)}>접기</button>
            </div>
            <p className={styles.replyText}>{review.reply}</p>
          </div>
        ) : (
          <button className={styles.replyToggle} onClick={() => setReplyOpen(true)}>
            아우르메 테라피 답변 보기 ▾
          </button>
        )
      )}
    </div>
  );
}

interface ReviewsProps {
  reviews: ReviewData[];
  categories: string[];
}

const THUMBNAIL_MAP: Record<string, string> = {
  '부분 집중 케어': '/images/reviews/thumb_18.jpg',
  '아로마 스웨디시': '/images/reviews/thumb_17.jpg',
  '건식 스포츠 마사지': '/images/reviews/thumb_19.jpg',
  '경락 윤곽 관리': '/images/reviews/thumb_15.jpg',
  '피부 관리': '/images/reviews/thumb_14.jpg',
  '스톤 테라피': '/images/reviews/thumb_13.jpg',
  '딸고 케어': '/images/reviews/thumb_12.jpg',
  '산전 산후 케어': '/images/reviews/thumb_11.jpg',
};

const ITEMS_PER_PAGE = 3;

export default function Reviews({ reviews, categories }: ReviewsProps) {
  const [selected, setSelected] = useState<string | null>('아로마 스웨디시');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const listRef = useRef<HTMLDivElement>(null);
  const userClicked = useRef(false);

  const catCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const r of reviews) {
      counts[r.category] = (counts[r.category] || 0) + 1;
    }
    return counts;
  }, [reviews]);

  const filtered = useMemo(() => {
    if (!selected) return [];
    return reviews.filter((r) => r.category === selected);
  }, [selected, reviews]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleThumbClick = (cat: string) => {
    userClicked.current = true;
    if (selected === cat) {
      setSelected(null);
    } else {
      setSelected(cat);
      setVisibleCount(ITEMS_PER_PAGE);
    }
  };

  useEffect(() => {
    if (!userClicked.current) return;
    userClicked.current = false;
    if (selected && listRef.current) {
      setTimeout(() => {
        listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [selected]);

  return (
    <section className="section section--alt">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-header__label">REVIEWS</span>
            <h2 className="section-header__title">고객님들의 생생한 후기</h2>
            <p className="section-header__sub">네이버 예약 리뷰 {reviews.length}건</p>
          </div>
        </ScrollReveal>
      </div>

      {/* 8 Thumbnail Grid */}
      <div className="container">
        <div className={styles.thumbGrid}>
            {categories.map((cat, i) => (
              <ScrollReveal key={cat} delay={i * 0.05}>
                <div
                  className={`${styles.thumbCard} ${selected === cat ? styles.thumbActive : ''}`}
                  onClick={() => handleThumbClick(cat)}
                >
                  <div
                    className={styles.thumbImg}
                    style={{ backgroundImage: `url(${THUMBNAIL_MAP[cat]})` }}
                  />
                  <div className={styles.thumbOverlay} />
                  <div className={styles.thumbDecor}>
                    <span className={styles.thumbQuote}>&ldquo;</span>
                    <span className={styles.thumbLabel}>Review</span>
                    <span className={styles.thumbLine} />
                  </div>
                  <div className={styles.thumbInfo}>
                    <span className={styles.thumbName}>{cat}</span>
                    <span className={styles.thumbCount}>({catCounts[cat] || 0})</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
        </div>
        {selected && (
          <div className={styles.reviewSection} ref={listRef}>
            {/* Desktop: header + button tabs */}
            <div className={styles.reviewHeader}>
              <h3 className={styles.reviewTitle}>{selected}</h3>
              <span className={styles.reviewCount}>{filtered.length}건의 리뷰</span>
            </div>
            <div className={styles.categoryTabs}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`${styles.categoryTab} ${selected === cat ? styles.categoryTabActive : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(cat);
                    setVisibleCount(ITEMS_PER_PAGE);
                  }}
                >
                  {cat} ({catCounts[cat] || 0})
                </button>
              ))}
            </div>

            {/* Mobile: dropdown select + hero image + header */}
            <div className={styles.categorySelect}>
              <label className={styles.categorySelectLabel}>프로그램별 리뷰 보기</label>
              <div className={styles.selectWrap}>
                <select
                  value={selected || ''}
                  onChange={(e) => {
                    setSelected(e.target.value);
                    setVisibleCount(ITEMS_PER_PAGE);
                  }}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat} ({catCounts[cat] || 0})
                    </option>
                  ))}
                </select>
              </div>
              {selected && THUMBNAIL_MAP[selected] && (
                <div className={styles.mobileHeroWrap}>
                  <div
                    className={styles.mobileHeroImage}
                    style={{ backgroundImage: `url(${THUMBNAIL_MAP[selected]})` }}
                  />
                  <div className={styles.mobileHeroOverlay} />
                  <div className={styles.mobileHeroDecor}>
                    <span className={styles.thumbQuote}>&ldquo;</span>
                    <span className={styles.thumbLabel}>Review</span>
                    <span className={styles.thumbLine} />
                  </div>
                  <div className={styles.mobileHeroInfo}>
                    <span className={styles.thumbName}>{selected}</span>
                    <span className={styles.thumbCount}>({catCounts[selected] || 0})</span>
                  </div>
                </div>
              )}
              <div className={styles.mobileReviewHeader}>
                <h3 className={styles.reviewTitle}>{selected}</h3>
                <span className={styles.reviewCount}>{filtered.length}건의 리뷰</span>
              </div>
            </div>

            {/* Desktop: full review cards */}
            <div className={styles.reviewList}>
              {visible.map((review) => {
                return (
                  <div
                    key={review.id}
                    className={`${styles.card} ${styles.cardExpanded}`}
                  >
                    {/* Photos */}
                    {review.media.length > 0 && (
                      <div className={styles.photos}>
                        {review.media.slice(0, 4).map((url, idx) => (
                          <div
                            key={idx}
                            className={styles.photo}
                            style={{ backgroundImage: `url(${url})` }}
                          />
                        ))}
                      </div>
                    )}

                    <div className={styles.body}>
                      {/* Author row */}
                      <div className={styles.authorRow}>
                        <span className={styles.nickname}>{review.nickname}</span>
                        {review.visitCount > 1 && (
                          <span className={styles.visitBadge}>{review.visitCount}회 방문</span>
                        )}
                        <span className={styles.date}>{review.visited}</span>
                      </div>

                      {/* Review text */}
                      <p className={styles.text}>{review.body}</p>

                      {/* Keyword tags */}
                      {review.votedKeywords.length > 0 && (
                        <div className={styles.tags}>
                          {review.votedKeywords.map((kw, idx) => (
                            <span key={idx} className={styles.tag}>{kw}</span>
                          ))}
                        </div>
                      )}

                      {/* Business reply */}
                      {review.reply && (
                        <div className={styles.reply}>
                          <div className={styles.replyHeader}>
                            <span className={styles.replyArrow}>↳</span>
                            <strong>아우르메 테라피</strong>
                          </div>
                          <p className={styles.replyText}>{review.reply}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile: compact review cards */}
            <div className={styles.mobileReviewList}>
              {visible.map((review) => (
                <MobileReviewCard key={review.id} review={review} />
              ))}
            </div>

            <div className={styles.loadMore}>
              {hasMore && (
                <button
                  className={styles.loadMoreBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
                  }}
                >
                  더보기 ({filtered.length - visibleCount}건 남음)
                </button>
              )}
              {visibleCount > ITEMS_PER_PAGE && (
                <button
                  className={styles.loadMoreBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    setVisibleCount(ITEMS_PER_PAGE);
                    setTimeout(() => {
                      listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 50);
                  }}
                >
                  접기
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
