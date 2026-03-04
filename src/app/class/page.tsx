import Hero from '@/components/sections/Hero';
import InstructorSection from '@/components/sections/InstructorSection';
import ClassTypes from '@/components/sections/ClassTypes';
import ClassReviews from '@/components/sections/ClassReviews';
import DarkCTA from '@/components/sections/DarkCTA';
import { INSTRUCTOR, TIMELINE, TIMELINE_IMAGES, CLASSES, REVIEWS } from '@/data/classData';

export const metadata = {
  title: '아우름웰니스',
  description: '15년 현장 경험으로 완성한 테라피 교육. 원데이 특강부터 정규 테라피 클래스까지.',
};

export default function ClassPage() {
  return (
    <>
      <Hero
        image="/images/hero/class_hero.jpg"
        label="THERAPY CLASS"
        title={'15년 현장 경험으로\n완성한 테라피 교육'}
        subtitle="과학적 교육으로 산업의 기준을 높이는 기반 사업"
        fullHeight
      />
      <InstructorSection
        name={INSTRUCTOR.name}
        role={INSTRUCTOR.role}
        quote={INSTRUCTOR.quote}
        credentials={INSTRUCTOR.credentials}
        timeline={TIMELINE}
        timelineImages={TIMELINE_IMAGES}
      />
      <ClassTypes classes={CLASSES} />
      <ClassReviews reviews={REVIEWS} />
      <DarkCTA
        title="클래스 수강에 관심이 있으신가요?"
        subtitle="맞춤 상담을 통해 최적의 프로그램을 안내해드립니다"
        phoneLabel="수강 문의하기"
        kakaoLabel="카카오톡 문의"
      />
    </>
  );
}
