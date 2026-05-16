/* ============================================
   MEDIA — 영상 콘텐츠 데이터
   ============================================
   파일명은 한글로 — 사용자 다운로드 시 의미 있는 이름.
   향후 YouTube 업로드 후 youtubeId 필드로 교체 가능.

   영상 호스팅: Cloudflare R2 (단일 파일 한도 25MB인 Pages 우회)
   추후 커스텀 도메인(media.aurumwellness.co.kr 등) 연결 시 이 한 줄만 교체.
*/

const MEDIA_CDN = 'https://pub-61fcf50edf094214ab1e52d6168a8110.r2.dev';

export interface MediaVideo {
  /** YouTube ID — 업로드 후 채움 */
  youtubeId?: string;
  /** mp4 — public/ 기준 경로 */
  mp4Src?: string;
  /** 포스터 이미지 — 항상 필수 */
  poster: string;
  /** 9:16 (세로) | 16:9 (가로) */
  orientation: '9:16' | '16:9';
  /** 표시 길이 — "00:37" 형식 */
  duration: string;
  /** 한글 제목 (UI 표시) */
  titleKo: string;
  /** 영어 캡션 (옵션) */
  titleEn?: string;
  /** 인용구 (옵션) */
  quote?: string;
}

export const MEDIA = {
  // Hero 자동재생 배경 (음소거 루프)
  backgroundVideo: `${MEDIA_CDN}/미디어_배경_영상.mp4`,

  hero: {
    mp4Src: `${MEDIA_CDN}/아우르메_브랜드_영상.mp4`,
    poster: '/videos/media/아우르메_브랜드_영상.jpg',
    orientation: '16:9' as const,
    duration: '01:17',
    titleKo: '아우르메 — 손과 손, 침묵으로',
    titleEn: 'Aurume Brand Film',
  },

  // Section 02 — 동등 페어 (좌우)
  voices: [
    {
      mp4Src: `${MEDIA_CDN}/아우르메_샵_소개.mp4`,
      poster: '/videos/media/아우르메_샵_소개.jpg',
      orientation: '9:16' as const,
      duration: '00:32',
      titleKo: '샵 소개',
      titleEn: 'A House of Quiet Treatment',
      quote: '고객분들의 컨디션과 상황에 다 맞춰서 가장 필요한 부분을 해결하기 위해 노력합니다.',
    },
    {
      mp4Src: `${MEDIA_CDN}/김준경_실장_인터뷰.mp4`,
      poster: '/videos/media/김준경_실장_인터뷰.jpg',
      orientation: '9:16' as const,
      duration: '00:37',
      titleKo: '김준경 실장 · 서른 해의 손',
      titleEn: 'Thirty Years of Hands',
      quote: '특정 질환을 갖고 계신 분들이 더 많이 오셨으면 좋겠습니다.',
    },
  ],

  // Section 03 — Philosophy 4편
  philosophy: [
    {
      mp4Src: `${MEDIA_CDN}/마사지로_병을_고친다.mp4`,
      poster: '/videos/media/마사지로_병을_고친다.jpg',
      orientation: '9:16' as const,
      duration: '00:14',
      titleKo: '마사지로 병을 고친다?',
      titleEn: 'Not a Hospital',
      quote: '여기가 병원이 아니잖아요. 저희는 근육을 이완시키고 심신을 안정시킴으로써 좋은 효과를 기대할 수 있는 거죠.',
    },
    {
      mp4Src: `${MEDIA_CDN}/아픈_마사지가_좋다고요.mp4`,
      poster: '/videos/media/아픈_마사지가_좋다고요.jpg',
      orientation: '9:16' as const,
      duration: '00:17',
      titleKo: '아픈 마사지가 좋다고요?',
      titleEn: 'On Pressure',
      quote: '내 돈 내고 와서 받는 건데 아프면 싫잖아요. 고객이 갖고 있는 그 정도의 깊이만큼 들어가서 풀어내는 거죠.',
    },
    {
      mp4Src: `${MEDIA_CDN}/함께_즐기는_케어.mp4`,
      poster: '/videos/media/함께_즐기는_케어.jpg',
      orientation: '9:16' as const,
      duration: '00:17',
      titleKo: '함께 즐기는 케어',
      titleEn: 'Together',
      quote: '아파서 오시는 것뿐만 아니라 — 마사지는 즐길 수 있는 거예요. 가족, 연인과 충분히.',
    },
    {
      mp4Src: `${MEDIA_CDN}/인천_유일_딸고_공식.mp4`,
      poster: '/videos/media/인천_유일_딸고_공식.jpg',
      orientation: '9:16' as const,
      duration: '00:16',
      titleKo: '인천 유일 · Thalgo 공식',
      titleEn: 'Thalgo · Since 1965',
      quote: '인천에서는 유일하게 프랑스 Thalgo — 70년 된 스파 브랜드의 정품 공식 인증 파트너십입니다.',
    },
  ],

  // Section 04 — Stillness
  stillness: {
    mp4Src: `${MEDIA_CDN}/아로마_테라피.mp4`,
    poster: '/videos/media/아로마_테라피.jpg',
    orientation: '16:9' as const,
    duration: '03:58',
    titleKo: 'Opening Ritual',
    titleEn: "L'art du toucher",
  },
};
