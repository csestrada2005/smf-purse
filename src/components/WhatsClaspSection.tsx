import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FullPageSection } from './FullPageScroll';
import claspBack from '@/assets/clasp-back.png';
import claspHeels from '@/assets/clasp-heels.png';

const WhatsClaspSection = () => {
  return (
    <FullPageSection id="whats-clasp" className="bg-section-3">
      <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-12 py-20 sm:py-16 h-full overflow-hidden">
        <motion.h2
          className="font-editorial text-3xl sm:text-4xl md:text-5xl text-accent uppercase tracking-[0.06em] mb-6 sm:mb-10 text-center shrink-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: false }}
        >
          What's Clasp?
        </motion.h2>

        <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:gap-12 w-full flex-1 min-h-0 lg:max-w-3xl lg:max-h-[65vh]">
          <motion.div
            className="flex flex-col min-h-0"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            viewport={{ once: false }}
          >
            <Link to="/about" className="group flex flex-col h-full min-h-0">
              <div className="overflow-hidden mb-3 sm:mb-5 flex-1 min-h-0">
                <motion.img
                  src={claspBack}
                  alt="Clasp Back – editorial polaroid"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <p className="text-accent text-xs sm:text-sm uppercase tracking-[0.25em] text-center group-hover:text-foreground transition-colors duration-300 shrink-0">
                Discover
              </p>
            </Link>
          </motion.div>

          <motion.div
            className="flex flex-col min-h-0"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            viewport={{ once: false }}
          >
            <Link to="/contact" className="group flex flex-col h-full min-h-0">
              <div className="overflow-hidden mb-3 sm:mb-5 flex-1 min-h-0">
                <motion.img
                  src={claspHeels}
                  alt="CLASP purse balanced on heels"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <p className="text-accent text-xs sm:text-sm uppercase tracking-[0.25em] text-center group-hover:text-foreground transition-colors duration-300 shrink-0">
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
