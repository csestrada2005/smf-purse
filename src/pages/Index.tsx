import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import MobilePreSection from '@/components/MobilePreSection';
import MobileCard from '@/components/MobileCard';
import { FullPageContainer } from '@/components/FullPageScroll';

import drop1PreImg from '@/assets/drop1-presection.png';
import claspPreImg from '@/assets/clasp-presection.png';
import drop1White from '@/assets/drop1-white.png';
import drop1Black from '@/assets/drop1-black.png';
import claspBack from '@/assets/clasp-back.png';
import claspHeels from '@/assets/clasp-heels.png';

const Index = () => {
  return (
    <div className="h-screen overflow-hidden bg-background">
      <Navigation />
      <FullPageContainer>
        <HeroSection />

        <MobilePreSection title="Drop 1" image={drop1PreImg} id="drop1" />
        <MobileCard image={drop1White} label="Buy Now" link="/product/Drop1/W" alt="White Clasp purse" />
        <MobileCard image={drop1Black} label="Discover Versions" link="/shop" alt="Black Clasp purse" variant="dark" />

        <MobilePreSection title="What's Clasp?" image={claspPreImg} id="whats-clasp" />
        <MobileCard image={claspBack} label="Discover" link="/about" alt="Clasp editorial" />
        <MobileCard image={claspHeels} label="Contact Us" link="/contact" alt="CLASP purse on heels" variant="dark" />

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
