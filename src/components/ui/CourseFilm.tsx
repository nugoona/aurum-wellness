'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './CourseFilm.module.css';

interface Props {
  youtubeId: string;
  poster: string;
  title: string;
}

function ytCommand(iframe: HTMLIFrameElement | null, func: 'playVideo' | 'pauseVideo') {
  iframe?.contentWindow?.postMessage(
    JSON.stringify({ event: 'command', func, args: '' }),
    '*'
  );
}

export default function CourseFilm({ youtubeId, poster, title }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // 화면에 들어오면 음소거 자동재생, 벗어나면 일시정지
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActivated(true);
          ytCommand(iframeRef.current, 'playVideo');
        } else {
          ytCommand(iframeRef.current, 'pauseVideo');
        }
      },
      { threshold: 0.55 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const src =
    `https://www.youtube.com/embed/${youtubeId}` +
    `?autoplay=1&mute=1&rel=0&enablejsapi=1&playsinline=1&modestbranding=1&vq=hd1080`;

  return (
    <div className={styles.player} ref={wrapRef}>
      {activated ? (
        <iframe
          ref={iframeRef}
          className={styles.media}
          src={src}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className={styles.facade}
          onClick={() => setActivated(true)}
          aria-label={`${title} 영상 재생`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={poster} alt={title} className={styles.media} />
          <span className={styles.playBtn} aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
