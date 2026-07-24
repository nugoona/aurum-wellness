import ClassPromoPopup from '@/components/ui/ClassPromoPopup';
import CinematicHeroV2 from '@/components/sections/CinematicHeroV2';
import FounderStoryV2 from '@/components/sections/FounderStoryV2';
import ThreePathwaysV2 from '@/components/sections/ThreePathwaysV2';
import TrustEvidenceV2 from '@/components/sections/TrustEvidenceV2';
import SocialProofV2 from '@/components/sections/SocialProofV2';
import CTACinematicV2 from '@/components/sections/CTACinematicV2';
/* Lv.2(목/금요일반)는 데이터 보존 + 노출 중단 — Lv.1 단독 모집 (2026-08-06 개강) */
import { LV1_COURSE } from '@/data/classData';

export default function HomePage() {
  return (
    <>
      <ClassPromoPopup courses={[LV1_COURSE]} />
      <CinematicHeroV2 />
      <ThreePathwaysV2 />
      <FounderStoryV2 />
      <TrustEvidenceV2 />
      <SocialProofV2 />
      <CTACinematicV2 />
    </>
  );
}
