import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import heroBanner from '@/assets/hero-banner.png';
import { FullPageSection } from './FullPageScroll';

const HeroSection = () => {
  return (
    <FullPageSection className="bg-background pt-0">
      {/* Full-bleed hero container */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Hero Image - Full bleed banner */}
        <motion.div 
          className="flex-1 flex items-center justify-center relative"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img 
            src={heroBanner}
            alt="Woman walking through Indian streets with Clasp purse - silhouette"
            className="w-full h-full object-cover absolute inset-0"
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
          
          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </motion.div>

        {/* Bottom text overlay - YSL style */}
        <motion.div 
          className="absolute bottom-12 left-0 right-0 text-center z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
        >
          <p className="text-foreground uppercase tracking-[0.3em] text-xs sm:text-sm mb-2">
            The Signature Collection
          </p>
          <p className="text-muted-foreground uppercase tracking-[0.2em] text-xs cursor-pointer hover:text-foreground transition-colors duration-500">
            Discover
          </p>
          <motion.div
            className="mt-4"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-muted-foreground mx-auto" />
          </motion.div>
        </motion.div>
      </div>
    </FullPageSection>
  );
};

export default HeroSection;
