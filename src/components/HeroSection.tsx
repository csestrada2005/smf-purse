import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import heroBanner from '@/assets/hero-banner.png';
import claspLogo from '@/assets/clasp-logo.png';
import { FullPageSection } from './FullPageScroll';

const HeroSection = () => {
  return (
    <FullPageSection className="bg-background">
      {/* Full-bleed hero container - min-h ensures no collapse during load */}
      <div className="absolute inset-0 overflow-hidden min-h-screen">
        {/* Background color placeholder while image loads */}
        <div className="absolute inset-0 bg-background" />
        
        {/* Hero Image - Full bleed banner */}
        <motion.img 
          src={heroBanner}
          alt="Woman walking through Indian streets with Clasp purse"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        
        {/* Subtle vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-transparent" />
      </div>

      {/* Center CLASP logo */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center z-20"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
      >
        <img 
          src={claspLogo} 
          alt="Clasp" 
          className="h-24 sm:h-32 md:h-40 lg:h-48 w-auto invert"
          loading="eager"
          decoding="async"
        />
      </motion.div>

      {/* Bottom text overlay - YSL style */}
      <motion.div 
        className="absolute bottom-16 sm:bottom-20 left-0 right-0 text-center z-20 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 1 }}
      >
        <p className="text-foreground uppercase tracking-[0.3em] sm:tracking-[0.4em] text-xs sm:text-sm mb-2 font-light">
          Safety First Handbags
        </p>
        <p className="text-foreground uppercase tracking-[0.3em] sm:tracking-[0.4em] text-xs sm:text-sm mb-4 font-light">
          The Signature Collection
        </p>
        <p className="text-foreground/70 uppercase tracking-[0.25em] text-xs sm:text-sm cursor-pointer hover:text-foreground transition-colors duration-500">
          Discover
        </p>
        <motion.div
          className="mt-4"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-foreground/50 mx-auto" strokeWidth={1} />
        </motion.div>
      </motion.div>
    </FullPageSection>
  );
};

export default HeroSection;
