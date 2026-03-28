import Hero from '@/components/sections/Hero';
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
  title: '아우르메 테라피',
  description: '전문성과 품격을 동시에 갖춘 뷰티 & 웰니스 테라피. 아로마 스웨디시, 건식 스포츠 테라피, 경락 윤곽 관리, 딸고(THALGO) 인증 트리트먼트.',
};

export default function TherapyPage() {
  return (
    <>
      <Hero
        image="/images/hero/vis.jpg"
        label="AURUME THERAPY"
        title={'전문성과 품격을\n동시에 갖춘 테라피'}
        subtitle="단순히 근육을 푸는 마사지가 아닌, 몸의 구조를 이해하고 설계하는 웰니스 뷰티 테라피"
        fullHeight
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
