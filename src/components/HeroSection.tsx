import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import heroEditorial from '@/assets/hero-editorial.png';
import claspLogo from '@/assets/clasp-logo.png';
import { FullPageSection } from './FullPageScroll';

const HeroSection = () => {
  return (
    <FullPageSection className="bg-noir">
      <div className="absolute inset-0 overflow-hidden min-h-screen">
        <div className="absolute inset-0 bg-noir" />
        
        <motion.img 
          src={heroEditorial}
          alt="High-fashion editorial – woman with Clasp handbag"
          className="absolute inset-0 w-full h-full object-cover object-top lg:object-contain lg:object-center bg-noir"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        
        {/* Subtle bottom gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-transparent to-transparent" />
      </div>

      {/* Center CLASP logo */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
      >
        <img 
          src={claspLogo} 
          alt="Clasp" 
          className="h-20 sm:h-28 md:h-36 lg:h-44 w-auto invert"
          loading="eager"
          decoding="async"
        />
      </motion.div>

      {/* Bottom editorial text */}
      <motion.div 
        className="absolute bottom-16 sm:bottom-20 left-0 right-0 text-center z-20 px-4"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
      >
        <p className="font-editorial text-white uppercase tracking-[0.4em] sm:tracking-[0.5em] text-xs sm:text-sm mb-2">
          Power Concealed
        </p>
        <p className="text-white/60 uppercase tracking-[0.3em] text-[10px] sm:text-xs mb-6">
          The Signature Collection
        </p>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-white/40 mx-auto" strokeWidth={1} />
        </motion.div>
      </motion.div>
    </FullPageSection>
  );
};

export default HeroSection;
