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

  // Section 06 — 가로 레일 A · 아우르메 테라피 (케어 시연 9편, 9:16 / '오프닝 리추얼'은 STILLNESS 중복이라 제외 2026-07-23)
  // R2 업로드 = 사장님 직접(파일명 = 이 mp4Src 그대로). 포스터 = 로컬 추출(각 영상 40% 프레임).
  therapyReel: [
    { mp4Src: `${MEDIA_CDN}/테라피_등어깨_통합케어.mp4`, poster: '/videos/media/테라피_등어깨_통합케어.jpg', orientation: '9:16' as const, duration: '00:22', titleKo: '등·어깨 통합 케어' },
    { mp4Src: `${MEDIA_CDN}/테라피_등_핫스톤.mp4`, poster: '/videos/media/테라피_등_핫스톤.jpg', orientation: '9:16' as const, duration: '00:28', titleKo: '등 핫스톤 케어' },
    { mp4Src: `${MEDIA_CDN}/테라피_목케어_1.mp4`, poster: '/videos/media/테라피_목케어_1.jpg', orientation: '9:16' as const, duration: '00:46', titleKo: '목 케어 ①' },
    { mp4Src: `${MEDIA_CDN}/테라피_목케어_2.mp4`, poster: '/videos/media/테라피_목케어_2.jpg', orientation: '9:16' as const, duration: '00:30', titleKo: '목 케어 ②' },
    { mp4Src: `${MEDIA_CDN}/테라피_어깨.mp4`, poster: '/videos/media/테라피_어깨.jpg', orientation: '9:16' as const, duration: '00:17', titleKo: '어깨 케어' },
    { mp4Src: `${MEDIA_CDN}/테라피_연인가족_맞춤.mp4`, poster: '/videos/media/테라피_연인가족_맞춤.jpg', orientation: '9:16' as const, duration: '00:20', titleKo: '연인·가족과 즐기는 맞춤 마사지' },
    { mp4Src: `${MEDIA_CDN}/테라피_종아리.mp4`, poster: '/videos/media/테라피_종아리.jpg', orientation: '9:16' as const, duration: '00:27', titleKo: '종아리 케어' },
    { mp4Src: `${MEDIA_CDN}/테라피_하체_핫스톤.mp4`, poster: '/videos/media/테라피_하체_핫스톤.jpg', orientation: '9:16' as const, duration: '00:19', titleKo: '하체 핫스톤 케어' },
    { mp4Src: `${MEDIA_CDN}/테라피_허벅지.mp4`, poster: '/videos/media/테라피_허벅지.jpg', orientation: '9:16' as const, duration: '00:13', titleKo: '허벅지 케어' },
  ],

  // Section 06 — 가로 레일 B · 아우름 아카데미 (셀프 케어 클래스 14편, 9:16)
  academyReel: [
    { mp4Src: `${MEDIA_CDN}/아카데미_01.mp4`, poster: '/videos/media/아카데미_01.jpg', orientation: '9:16' as const, duration: '00:13', titleKo: '한쪽 힘만 빼도 압이 세진다' },
    { mp4Src: `${MEDIA_CDN}/아카데미_02.mp4`, poster: '/videos/media/아카데미_02.jpg', orientation: '9:16' as const, duration: '00:10', titleKo: '손가락 힘으로 누르지 마세요' },
    { mp4Src: `${MEDIA_CDN}/아카데미_03.mp4`, poster: '/videos/media/아카데미_03.jpg', orientation: '9:16' as const, duration: '00:15', titleKo: '흉추와 경추 구별 방법' },
    { mp4Src: `${MEDIA_CDN}/아카데미_04.mp4`, poster: '/videos/media/아카데미_04.jpg', orientation: '9:16' as const, duration: '00:20', titleKo: '촉진은 살짝 잡고 좌우 비교' },
    { mp4Src: `${MEDIA_CDN}/아카데미_05.mp4`, poster: '/videos/media/아카데미_05.jpg', orientation: '9:16' as const, duration: '00:18', titleKo: '목 통증의 핵심, 흉쇄유돌근 찾기' },
    { mp4Src: `${MEDIA_CDN}/아카데미_06.mp4`, poster: '/videos/media/아카데미_06.jpg', orientation: '9:16' as const, duration: '00:23', titleKo: '흉쇄유돌근 푸는 법' },
    { mp4Src: `${MEDIA_CDN}/아카데미_07.mp4`, poster: '/videos/media/아카데미_07.jpg', orientation: '9:16' as const, duration: '00:24', titleKo: '발바닥 아플 때 더 효과를 보려면' },
    { mp4Src: `${MEDIA_CDN}/아카데미_08.mp4`, poster: '/videos/media/아카데미_08.jpg', orientation: '9:16' as const, duration: '00:17', titleKo: '종아리 깊은 근육 푸는 법' },
    { mp4Src: `${MEDIA_CDN}/아카데미_09.mp4`, poster: '/videos/media/아카데미_09.jpg', orientation: '9:16' as const, duration: '00:16', titleKo: '목은 세게 누르면 안 돼요' },
    { mp4Src: `${MEDIA_CDN}/아카데미_10.mp4`, poster: '/videos/media/아카데미_10.jpg', orientation: '9:16' as const, duration: '00:14', titleKo: '뼈를 누르면 아프기만 합니다' },
    { mp4Src: `${MEDIA_CDN}/아카데미_11.mp4`, poster: '/videos/media/아카데미_11.jpg', orientation: '9:16' as const, duration: '00:16', titleKo: '소화에 도움되는 배 마사지' },
    { mp4Src: `${MEDIA_CDN}/아카데미_12.mp4`, poster: '/videos/media/아카데미_12.jpg', orientation: '9:16' as const, duration: '00:14', titleKo: '스트레칭은 최소 15초 이상' },
    { mp4Src: `${MEDIA_CDN}/아카데미_13.mp4`, poster: '/videos/media/아카데미_13.jpg', orientation: '9:16' as const, duration: '00:20', titleKo: '눈이 밝아지는 목 뒤 그 지점' },
    { mp4Src: `${MEDIA_CDN}/아카데미_14.mp4`, poster: '/videos/media/아카데미_14.jpg', orientation: '9:16' as const, duration: '00:16', titleKo: '몸을 안정화시키는 흔들기' },
  ],
};
