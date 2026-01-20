import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import heroBanner from '@/assets/hero-banner.png';
import { FullPageSection } from './FullPageScroll';

const HeroSection = () => {
  return (
    <FullPageSection className="bg-background">
      {/* Full-bleed hero container */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Hero Image - Full bleed banner */}
        <motion.img 
          src={heroBanner}
          alt="Woman walking through Indian streets with Clasp purse"
          className="w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        />
        
        {/* Subtle vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-transparent" />
      </div>

      {/* Center CLASP wordmark */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center z-20"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
      >
        <h1 className="font-brand text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-foreground lowercase tracking-wide">
          <span className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem]">C</span>lasp
        </h1>
      </motion.div>

      {/* Bottom text overlay - YSL style */}
      <motion.div 
        className="absolute bottom-16 left-0 right-0 text-center z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 1 }}
      >
        <p className="text-foreground uppercase tracking-[0.4em] text-[10px] sm:text-xs mb-3 font-light">
          The Signature Collection
        </p>
        <p className="text-foreground/70 uppercase tracking-[0.25em] text-[10px] cursor-pointer hover:text-foreground transition-colors duration-500">
          Discover
        </p>
        <motion.div
          className="mt-4"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-foreground/50 mx-auto" strokeWidth={1} />
        </motion.div>
      </motion.div>
    </FullPageSection>
  );
};

export default HeroSection;
