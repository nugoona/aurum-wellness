/* ============================================
   YOUTUBE — the 手作 채널 (준비중)
   ============================================
   채널 개설 전 placeholder 데이터.
   youtubeId 채워지면 자동으로 click → 영상 재생/이동 가능.
*/

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;       // /youtube/...
  youtubeId?: string;      // 채널 개설 후 채움 (있으면 click 활성화)
  duration?: string;
}

export const YOUTUBE_CHANNEL_NAME = 'the 手作';
export const YOUTUBE_CHANNEL_URL = '#'; // 개설 후 https://www.youtube.com/@... 로 교체

export const YOUTUBE_VIDEOS: YouTubeVideo[] = [
  { id: 'yt-1', title: 'the 手作 #01', thumbnail: '/youtube/youtube-1.jpg' },
  { id: 'yt-2', title: 'the 手作 #02', thumbnail: '/youtube/youtube-2.jpg' },
  { id: 'yt-3', title: 'the 手作 #03', thumbnail: '/youtube/youtube-3.jpg' },
  { id: 'yt-4', title: 'the 手作 #04', thumbnail: '/youtube/youtube-4.jpg' },
];
