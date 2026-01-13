import HeroSection from '@/components/HeroSection';
import MissionSection from '@/components/MissionSection';
import PhilosophySection from '@/components/PhilosophySection';
import VisionSection from '@/components/VisionSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <MissionSection />
      <PhilosophySection />
      <VisionSection />
      <Footer />
    </div>
  );
};

export default Index;
