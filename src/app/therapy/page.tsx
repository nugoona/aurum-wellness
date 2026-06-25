import Hero from '@/components/sections/Hero';
import FilmSection from '@/components/sections/FilmSection';
import FacilityGallery from '@/components/sections/FacilityGallery';
import ProgramGrid from '@/components/sections/ProgramGrid';
import Reviews from '@/components/sections/Reviews';
import TeamSection from '@/components/sections/TeamSection';
import DirectionsSection from '@/components/sections/DirectionsSection';
import FAQ from '@/components/sections/FAQ';
import CTABanner from '@/components/sections/CTABanner';
import {
  PROGRAM_CATEGORIES,
  FACILITY_IMAGES,
  TEAM_CEO,
  TEAM_THERAPISTS,
  TEAM_GROUP_PHOTO,
  FAQ_DATA,
} from '@/data/therapyData';
import { REVIEW_DATA, REVIEW_CATEGORIES } from '@/data/reviewData';

export const metadata = {
  title: { absolute: '부평 마사지 · 웰니스 테라피 | 아우르메 테라피' },
  description:
    '인천 부평 웰니스 테라피 — 아로마 스웨디시, 건식 스포츠 테라피, 경락 윤곽 관리, 딸고(THALGO) 인증 트리트먼트. 부평구 부평문화로, 9년 4,000회 현장 경력의 전문 테라피스트.',
  keywords:
    '부평 마사지, 인천 부평 마사지, 부평 테라피, 부평 스웨디시, 부평 스포츠마사지, 부평 경락, 인천 마사지, 아우르메 테라피',
  alternates: { canonical: 'https://www.aurumwellness.co.kr/therapy' },
  openGraph: {
    title: '부평 마사지 · 웰니스 테라피 | 아우르메 테라피',
    description:
      '인천 부평 웰니스 테라피. 아로마 스웨디시, 스포츠 테라피, 딸고 인증 트리트먼트.',
    url: 'https://www.aurumwellness.co.kr/therapy',
    type: 'website',
  },
};

// 매장 검색용 소비자 엔티티 — 루트의 ProfessionalService(B2B)와 분리
const therapyJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HealthAndBeautyBusiness',
  name: '아우르메 테라피',
  alternateName: 'AURUME THERAPY',
  description:
    '인천 부평 웰니스 테라피 — 아로마 스웨디시, 건식 스포츠 테라피, 경락 윤곽 관리, 딸고(THALGO) 인증 트리트먼트.',
  url: 'https://www.aurumwellness.co.kr/therapy',
  telephone: '+82-10-2981-9989',
  image: 'https://www.aurumwellness.co.kr/og-image.png',
  priceRange: '₩₩',
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
  areaServed: ['인천광역시 부평구', '인천광역시', '부천시'],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '10:00',
      closes: '21:00',
    },
  ],
  sameAs: [
    'https://map.naver.com/p/entry/place/1058592122',
    'https://blog.naver.com/victsoon',
    'https://www.instagram.com/victsoon',
  ],
  // 아우르메 테라피(모회사)가 B2B 브랜드 아우름웰니스를 산하에 둠
  subOrganization: {
    '@type': 'Organization',
    name: '아우름웰니스',
    url: 'https://www.aurumwellness.co.kr',
  },
};

export default function TherapyPage() {
  return (
    <>
      {/* JSON-LD structured data — static trusted content only */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(therapyJsonLd) }}
      />
      <Hero
        image="/images/hero/vis.jpg"
        label="AURUME THERAPY"
        title={'전문성과 품격을\n동시에 갖춘 테라피'}
        subtitle="단순히 근육을 푸는 마사지가 아닌, 몸의 구조를 이해하고 설계하는 웰니스 뷰티 테라피"
        fullHeight
      />
      <FilmSection
        label="AURUME THERAPY"
        heading="아우르메 테라피 소개"
        subtitle="몸의 구조를 이해하고 설계하는 부평 웰니스 테라피 — 영상으로 만나보세요"
        youtubeId="zIKkbQxxyZk"
        poster="https://i.ytimg.com/vi/zIKkbQxxyZk/maxresdefault.jpg"
      />
      <ProgramGrid categories={PROGRAM_CATEGORIES} />
      <Reviews reviews={REVIEW_DATA} categories={REVIEW_CATEGORIES} />
      <TeamSection ceo={TEAM_CEO} therapists={TEAM_THERAPISTS} groupPhoto={TEAM_GROUP_PHOTO} />
      <FacilityGallery staff={FACILITY_IMAGES.staff} store={FACILITY_IMAGES.store} />
      <DirectionsSection />
      <FAQ items={FAQ_DATA} />
      <CTABanner
        title={'당신만의 맞춤 테라피를\n경험하세요'}
        subtitle="전문 테라피스트가 당신의 지친 몸과 마음을 치유합니다"
        image="/images/therapy/sub0101_bg1.jpg"
      />
    </>
  );
}
