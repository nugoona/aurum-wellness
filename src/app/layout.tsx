import type { Metadata } from 'next';
import { Cormorant_Garamond, Gowun_Batang } from 'next/font/google';
import localFont from 'next/font/local';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileBookingBar from '@/components/layout/MobileBookingBar';
import ScrollToTop from '@/components/layout/ScrollToTop';
import SmoothScrollProvider from '@/providers/SmoothScrollProvider';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

const gowunBatang = Gowun_Batang({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-body',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
});

const pretendard = localFont({
  src: [
    { path: '../fonts/PretendardVariable.woff2', weight: '100 900', style: 'normal' },
  ],
  variable: '--font-ui',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: '아우름웰니스',
    template: '%s',
  },
  description: '전문성과 품격을 동시에 갖춘 뷰티 & 웰니스 스파. 아로마 스웨디시, 건식 스포츠 테라피, 경락 윤곽 관리, 딸고(THALGO) 인증 트리트먼트. 인천 부평.',
  keywords: '아우르메, 웰니스, 스파, 마사지, 인천, 부평, 아로마, 스웨디시, 경락, 딸고',
  openGraph: {
    title: '아우름웰니스 | 프리미엄 뷰티 & 웰니스 스파',
    description: '진정한 휴식을 만나는 곳, 당신만을 위한 맞춤 치유가 시작됩니다.',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${cormorant.variable} ${gowunBatang.variable} ${pretendard.variable}`}>
      <body>
        <SmoothScrollProvider>
          <ScrollToTop />
          <Header />
          <main>{children}</main>
          <Footer />
          <MobileBookingBar />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
