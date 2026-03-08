import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import DropOneSection from '@/components/DropOneSection';
import WhatsClaspSection from '@/components/WhatsClaspSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { FullPageContainer } from '@/components/FullPageScroll';

const Index = () => {
  return (
    <div className="h-screen overflow-hidden bg-background">
      <Navigation />
      <FullPageContainer>
        <HeroSection />
        <DropOneSection />
        <WhatsClaspSection />
        <ContactSection />
        <Footer />
      </FullPageContainer>
    </div>
  );
};

export default Index;
