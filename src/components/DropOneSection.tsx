import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FullPageSection } from './FullPageScroll';
import drop1White from '@/assets/drop1-white.png';
import drop1Black from '@/assets/drop1-black.png';

const DropOneSection = () => {
  return (
    <FullPageSection id="drop1" className="bg-section-2">
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8">
        <motion.h2
          className="font-editorial text-3xl sm:text-4xl md:text-5xl text-accent uppercase tracking-[0.06em] mb-8 sm:mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: false }}
        >
          Drop 1
        </motion.h2>

        <div className="grid grid-cols-2 gap-4 sm:gap-8 max-w-4xl w-full">
          {/* White purse → Buy Now */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            viewport={{ once: false }}
          >
            <Link to="/product/Drop1/W" className="group block">
              <div className="overflow-hidden mb-3 sm:mb-5">
                <motion.img
                  src={drop1White}
                  alt="White Clasp purse on velvet chair"
                  className="w-full h-auto object-cover aspect-[3/4]"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <p className="text-accent text-xs sm:text-sm uppercase tracking-[0.25em] text-center group-hover:text-foreground transition-colors duration-300">
                Buy Now
              </p>
            </Link>
          </motion.div>

          {/* Black purse → Discover versions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            viewport={{ once: false }}
          >
            <Link to="/shop" className="group block">
              <div className="overflow-hidden mb-3 sm:mb-5">
                <motion.img
                  src={drop1Black}
                  alt="Black Clasp purse on hand"
                  className="w-full h-auto object-cover aspect-[3/4]"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <p className="text-accent text-xs sm:text-sm uppercase tracking-[0.25em] text-center group-hover:text-foreground transition-colors duration-300">
                Discover Versions
              </p>
            </Link>
          </motion.div>
        </div>
      </div>
    </FullPageSection>
  );
};

export default DropOneSection;
