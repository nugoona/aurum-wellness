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
    default: '아우름웰니스 | 기업 출장 웰니스 · 임직원 복지 테라피',
    template: '%s | 아우름웰니스',
  },
  description: '기업 임직원 복지 테라피와 VIP 브랜드 이벤트 케어 전문. SK텔레콤, BMW, LG에너지솔루션 등 200+ 기업 파트너. 9년간 4,000회 이상 현장 출장 경력. 스포츠과학 석사 출신 전문 테라피스트가 설계하는 근골격 케어 프로그램.',
  keywords: '아우름웰니스, 기업 출장 마사지, 임직원 복지, 기업 웰니스, 사내 테라피, 행사 마사지, 출장 테라피, VIP 이벤트 케어, 기업 복지 프로그램, 근골격 케어',
  alternates: {
    canonical: 'https://www.aurumwellness.co.kr',
  },
  openGraph: {
    title: '아우름웰니스 | 기업 출장 웰니스 · 임직원 복지 테라피',
    description: '200+ 기업이 선택한 출장 웰니스 파트너. 임직원 근골격 케어부터 VIP 브랜드 이벤트까지.',
    locale: 'ko_KR',
    type: 'website',
    url: 'https://www.aurumwellness.co.kr',
    images: [
      {
        url: 'https://www.aurumwellness.co.kr/og-image.png',
        width: 1200,
        height: 630,
        alt: '아우름웰니스 - 기업 출장 웰니스 전문',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '아우름웰니스 | 기업 출장 웰니스 · 임직원 복지 테라피',
    description: '200+ 기업이 선택한 출장 웰니스 파트너. 임직원 근골격 케어부터 VIP 브랜드 이벤트까지.',
    images: ['https://www.aurumwellness.co.kr/og-image.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: '아우름웰니스',
  alternateName: 'AURUME WELLNESS',
  description: '기업 임직원 복지 테라피와 VIP 브랜드 이벤트 케어 전문. 9년간 200개 이상 기업에 출장 웰니스 프로그램을 제공하는 B2B 웰니스 파트너.',
  url: 'https://www.aurumwellness.co.kr',
  telephone: '+82-10-2981-9989',
  image: 'https://www.aurumwellness.co.kr/og-image.png',
  logo: 'https://www.aurumwellness.co.kr/images/logo-icon.svg',
  priceRange: '₩₩₩',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '부평문화로 56, 3층',
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
    'https://pf.kakao.com/_AaZxgn',
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
