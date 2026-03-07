import Hero from '@/components/sections/Hero';
import PhotoWall from '@/components/sections/PhotoWall';
import ServiceTracks from '@/components/sections/ServiceTracks';
import ProgramCards from '@/components/sections/ProgramCards';
import FeaturedEvents from '@/components/sections/FeaturedEvents';
import EventHistory from '@/components/sections/EventHistory';
import DarkCTA from '@/components/sections/DarkCTA';
import {
  B2B_TRACKS,
  B2B_PROGRAMS,
  B2B_SERVICES_TITLE,
  CEO_PROFILE,
} from '@/data/b2bData';

export const metadata = {
  title: '아우름웰니스',
  description: '2018년부터 200개 이상의 기업과 함께한 프리미엄 복지 프로그램. 기업 임직원 복지부터 VIP 브랜드 이벤트까지.',
};

export default function B2BPage() {
  return (
    <>
      <Hero
        image="/images/hero/sub_vis02.jpg"
        label="B2B WELLNESS"
        title={'성장하는 기업,\n건강한 조직과 함께합니다'}
        subtitle="2018년부터 200개 이상의 기업과 함께한 프리미엄 복지 프로그램"
        mobileSubtitle={'2018년부터 200개 이상의 기업과 함께한\n프리미엄 복지 프로그램'}
        fullHeight
      />
      <PhotoWall />
      <ServiceTracks tracks={B2B_TRACKS} title={B2B_SERVICES_TITLE} ceo={CEO_PROFILE} />
      <ProgramCards items={B2B_PROGRAMS} />
      <FeaturedEvents />
      <EventHistory />
      <DarkCTA
        title="B2B 프로그램이 궁금하신가요?"
        subtitle="맞춤 상담을 통해 최적의 프로그램을 안내해드립니다"
        phoneLabel="전화 문의하기"
        kakaoLabel="카카오톡 문의"
      />
    </>
  );
}
