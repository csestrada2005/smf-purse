import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import heroEditorial from '@/assets/hero-editorial-new.jpg';
import claspLogo from '@/assets/clasp-logo.png';
import claspLogoWebp from '@/assets/clasp-logo.webp';

const HeroSection = () => {
  return (
    <section className="h-screen w-full flex flex-col overflow-hidden relative bg-noir">
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={heroEditorial}
          alt="High-fashion editorial – woman with Clasp handbag"
          className="absolute inset-0 w-full h-full object-cover object-[45%_top] sm:object-contain sm:object-center"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-transparent to-transparent" />
      </div>

      <motion.div 
        className="absolute top-24 sm:top-28 left-0 right-0 flex justify-center z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
      >
        <picture>
          <source srcSet={claspLogoWebp} type="image/webp" />
          <img
            src={claspLogo}
            alt="Clasp"
            className="h-20 sm:h-28 md:h-36 lg:h-44 w-auto"
            width={281}
            height={215}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </picture>
      </motion.div>

      <motion.div 
        className="absolute bottom-16 sm:bottom-20 left-0 right-0 text-center z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-white/40 mx-auto" strokeWidth={1} />
        </motion.div>
        <p className="font-editorial text-white uppercase tracking-[0.4em] sm:tracking-[0.5em] text-xs sm:text-sm mt-3">
          Pure Class
        </p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
