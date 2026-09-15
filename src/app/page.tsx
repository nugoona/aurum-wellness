import CinematicHeroV2 from '@/components/sections/CinematicHeroV2';
import FounderStoryV2 from '@/components/sections/FounderStoryV2';
import ThreePathwaysV2 from '@/components/sections/ThreePathwaysV2';
import TrustEvidenceV2 from '@/components/sections/TrustEvidenceV2';
import SocialProofV2 from '@/components/sections/SocialProofV2';
import CTACinematicV2 from '@/components/sections/CTACinematicV2';
/* 2026-09-15 요청: 홈 모집 팝업만 조기 종료. 강좌 안내와 모집 일정은 유지. */

export default function HomePage() {
  return (
    <>
      <CinematicHeroV2 />
      <ThreePathwaysV2 />
      <FounderStoryV2 />
      <TrustEvidenceV2 />
      <SocialProofV2 />
      <CTACinematicV2 />
    </>
  );
}
