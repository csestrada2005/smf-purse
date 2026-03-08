import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import DropOneSection from '@/components/DropOneSection';
import WhatsClaspSection from '@/components/WhatsClaspSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import MobilePreSection from '@/components/MobilePreSection';
import MobileCardSection from '@/components/MobileCardSection';
import { FullPageContainer } from '@/components/FullPageScroll';
import { useIsMobile } from '@/hooks/use-mobile';

import drop1PreImg from '@/assets/drop1-presection.png';
import claspPreImg from '@/assets/clasp-presection.png';
import drop1White from '@/assets/drop1-white.png';
import drop1Black from '@/assets/drop1-black.png';
import claspBack from '@/assets/clasp-back.png';
import claspHeels from '@/assets/clasp-heels.png';

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <div className="h-screen overflow-hidden bg-background">
      <Navigation />
      <FullPageContainer>
        <HeroSection />
        {isMobile ? (
          <>
            <MobilePreSection title="Drop 1" image={drop1PreImg} id="drop1" />
            <MobileCardSection image={drop1White} label="Buy Now" link="/product/Drop1/W" alt="White Clasp purse" />
            <MobileCardSection image={drop1Black} label="Discover Versions" link="/shop" alt="Black Clasp purse" />
            <MobilePreSection title="What's Clasp?" image={claspPreImg} id="whats-clasp" />
            <MobileCardSection image={claspBack} label="Discover" link="/about" alt="Clasp editorial" />
            <MobileCardSection image={claspHeels} label="Contact Us" link="/contact" alt="CLASP purse on heels" />
          </>
        ) : (
          <>
            <DropOneSection />
            <WhatsClaspSection />
          </>
        )}
        <ContactSection />
        <Footer />
      </FullPageContainer>
    </div>
  );
};

export default Index;
