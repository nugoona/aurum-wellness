import type { Metadata } from 'next';
import { Cormorant_Garamond, Gowun_Batang } from 'next/font/google';
import localFont from 'next/font/local';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileBookingBar from '@/components/layout/MobileBookingBar';
import ScrollToTop from '@/components/layout/ScrollToTop';
import SmoothScrollProvider from '@/providers/SmoothScrollProvider';
import { REVIEW_DATA } from '@/data/reviewData';
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
  metadataBase: new URL('https://www.aurumwellness.co.kr'),
  verification: {
    google: 'I4CBd6hErR5hdGhIXfmwnbWYREhXF6A04oVFhKGcY7M',
    other: {
      'naver-site-verification': 'd5ce2c7287fb142a9c787c3a469176c783d98719',
    },
  },
  title: {
    default: '아우름웰니스 | 인천 부평 프리미엄 뷰티 & 웰니스 스파',
    template: '%s | 아우름웰니스',
  },
  description: `인천 부평 프리미엄 웰니스 스파. 아로마 스웨디시, 건식 스포츠 테라피, 경락 윤곽 관리, 딸고(THALGO) 인증 트리트먼트. 네이버 예약 평균 4.97점, ${REVIEW_DATA.length}건 리뷰. 부평시장역 3번 출구 20m.`,
  keywords: '아우름웰니스, 인천 스파, 부평 마사지, 아로마 스웨디시, 건식 스포츠 마사지, 경락 윤곽, 딸고 케어, 산전 산후 케어, 웰니스 스파, 인천 부평',
  alternates: {
    canonical: 'https://www.aurumwellness.co.kr',
  },
  openGraph: {
    title: '아우름웰니스 | 프리미엄 뷰티 & 웰니스 스파',
    description: '진정한 휴식을 만나는 곳, 당신만을 위한 맞춤 치유가 시작됩니다.',
    locale: 'ko_KR',
    type: 'website',
    url: 'https://www.aurumwellness.co.kr',
    images: [
      {
        url: 'https://www.aurumwellness.co.kr/og-image.png',
        width: 1200,
        height: 630,
        alt: '아우름웰니스 - 프리미엄 뷰티 & 웰니스 스파',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '아우름웰니스 | 프리미엄 뷰티 & 웰니스 스파',
    description: '진정한 휴식을 만나는 곳, 당신만을 위한 맞춤 치유가 시작됩니다.',
    images: ['https://www.aurumwellness.co.kr/og-image.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HealthAndBeautyBusiness',
  name: '아우름웰니스',
  alternateName: 'AURUME WELLNESS',
  description: '전문성과 품격을 동시에 갖춘 프리미엄 뷰티 & 웰니스 스파. 아로마 스웨디시, 건식 스포츠 테라피, 경락 윤곽 관리, 딸고(THALGO) 인증 트리트먼트.',
  url: 'https://www.aurumwellness.co.kr',
  telephone: '+82-10-2981-9989',
  image: 'https://www.aurumwellness.co.kr/og-image.png',
  logo: 'https://www.aurumwellness.co.kr/images/logo-icon.svg',
  priceRange: '₩₩₩',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '부평대로 71-1, 3층',
    addressLocality: '부평구',
    addressRegion: '인천광역시',
    postalCode: '21389',
    addressCountry: 'KR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 37.4907,
    longitude: 126.7234,
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.97',
    reviewCount: String(REVIEW_DATA.length),
    bestRating: '5',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '10:00',
      closes: '21:00',
    },
  ],
  sameAs: [
    'https://www.instagram.com/victsoon',
    'https://blog.naver.com/victsoon',
    'https://pf.kakao.com/_PtxcxbK',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${cormorant.variable} ${gowunBatang.variable} ${pretendard.variable}`}>
      <body>
        {/* JSON-LD structured data for Google rich results — static trusted content only */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
