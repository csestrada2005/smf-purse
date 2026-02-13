import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';

import StorySection from '@/components/StorySection';
import FeaturesSection from '@/components/FeaturesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { FullPageContainer } from '@/components/FullPageScroll';

const Index = () => {
  return (
    <div className="h-screen overflow-hidden bg-background">
      <Navigation />
      <FullPageContainer>
        <HeroSection />
        
        <StorySection />
        <FeaturesSection />
        <ContactSection />
        <Footer />
      </FullPageContainer>
    </div>
  );
};

export default Index;
