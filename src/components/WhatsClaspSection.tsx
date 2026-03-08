import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FullPageSection } from './FullPageScroll';
import claspBack from '@/assets/clasp-back.png';
import claspHeels from '@/assets/clasp-heels.png';

const WhatsClaspSection = () => {
  return (
    <FullPageSection id="whats-clasp" className="bg-section-3">
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8">
        <motion.h2
          className="font-editorial text-3xl sm:text-4xl md:text-5xl text-accent uppercase tracking-[0.06em] mb-8 sm:mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: false }}
        >
          What's Clasp?
        </motion.h2>

        <div className="grid grid-cols-2 gap-4 sm:gap-8 max-w-4xl w-full">
          {/* Clasp back polaroid → Discover (About) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            viewport={{ once: false }}
          >
            <Link to="/about" className="group block">
              <div className="overflow-hidden mb-3 sm:mb-5">
                <motion.img
                  src={claspBack}
                  alt="Clasp Back – editorial polaroid"
                  className="w-full h-auto object-cover aspect-[3/4]"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <p className="text-accent text-xs sm:text-sm uppercase tracking-[0.25em] text-center group-hover:text-foreground transition-colors duration-300">
                Discover
              </p>
            </Link>
          </motion.div>

          {/* Clasp heels → Contact Us */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            viewport={{ once: false }}
          >
            <Link to="/contact" className="group block">
              <div className="overflow-hidden mb-3 sm:mb-5">
                <motion.img
                  src={claspHeels}
                  alt="CLASP purse balanced on heels"
                  className="w-full h-auto object-cover aspect-[3/4]"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <p className="text-accent text-xs sm:text-sm uppercase tracking-[0.25em] text-center group-hover:text-foreground transition-colors duration-300">
                Contact Us
              </p>
            </Link>
          </motion.div>
        </div>
      </div>
    </FullPageSection>
  );
};

export default WhatsClaspSection;
