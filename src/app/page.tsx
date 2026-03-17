import ClassPromoPopup from '@/components/ui/ClassPromoPopup';
import CinematicHeroV2 from '@/components/sections/CinematicHeroV2';
import FounderStoryV2 from '@/components/sections/FounderStoryV2';
import ThreePathwaysV2 from '@/components/sections/ThreePathwaysV2';
import TrustEvidenceV2 from '@/components/sections/TrustEvidenceV2';
import SocialProofV2 from '@/components/sections/SocialProofV2';
import CTACinematicV2 from '@/components/sections/CTACinematicV2';

export default function HomePage() {
  return (
    <>
      <ClassPromoPopup />
      <CinematicHeroV2 />
      <ThreePathwaysV2 />
      <FounderStoryV2 />
      <TrustEvidenceV2 />
      <SocialProofV2 />
      <CTACinematicV2 />
    </>
  );
}
