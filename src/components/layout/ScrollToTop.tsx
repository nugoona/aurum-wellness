'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/** 고정 헤더 + (있다면) 클래스 sticky 바 높이만큼 보정 */
function getScrollOffset() {
  const headerVar = getComputedStyle(document.documentElement)
    .getPropertyValue('--header-height')
    .trim();
  const headerH = parseInt(headerVar, 10) || 80;
  const stickyBar = document.querySelector<HTMLElement>('[data-sticky-bar]');
  const stickyH = stickyBar?.offsetHeight ?? 0;
  return headerH + stickyH + 12; // 여백 12px
}

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;

    // 해시 앵커가 없으면 기존대로 최상단으로
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    // 해시가 있으면 해당 섹션 시작 부분으로 (헤더/sticky바 높이 보정)
    const id = decodeURIComponent(hash.slice(1));
    let cancelled = false;

    const scrollToTarget = () => {
      if (cancelled) return;
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - getScrollOffset();
      window.scrollTo({ top: Math.max(top, 0), behavior: 'auto' });
    };

    // 초기 렌더 직후 + 이미지/폰트/sticky바 마운트 이후 레이아웃 시프트 보정
    const raf = requestAnimationFrame(scrollToTarget);
    const t = setTimeout(scrollToTarget, 320);
    window.addEventListener('load', scrollToTarget);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      clearTimeout(t);
      window.removeEventListener('load', scrollToTarget);
    };
  }, [pathname]);

  return null;
}
