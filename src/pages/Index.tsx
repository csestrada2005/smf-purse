import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import MobilePreSection from '@/components/MobilePreSection';
import MobileCard from '@/components/MobileCard';
import DropOneSection from '@/components/DropOneSection';
import WhatsClaspSection from '@/components/WhatsClaspSection';
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

        <MobilePreSection title="Drop 1" image={drop1PreImg} id="drop1" />
        {isMobile
          ? [
              <MobileCard key="buy-now" image={drop1White} label="Buy Now" link="/product/Drop1/W" alt="White Clasp purse" />,
              <MobileCard key="discover-versions" image={drop1Black} label="Discover Versions" link="/shop" alt="Black Clasp purse" variant="dark" />,
            ]
          : <DropOneSection />
        }

        <MobilePreSection title="What's Clasp?" image={claspPreImg} id="whats-clasp" />
        {isMobile
          ? [
              <MobileCard key="discover" image={claspBack} label="Discover" link="/about" alt="Clasp editorial" />,
              <MobileCard key="contact-us" image={claspHeels} label="Contact Us" link="/contact" alt="CLASP purse on heels" variant="dark" />,
            ]
          : <WhatsClaspSection />
        }

        <div className="flex flex-col h-full">
          <div className="flex-1">
            <ContactSection />
          </div>
          <Footer />
        </div>
      </FullPageContainer>
    </div>
  );
};

export default Index;
