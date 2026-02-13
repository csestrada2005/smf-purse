import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import indianHeritage from '@/assets/indian-heritage.png';
import theClass from '@/assets/the-class.png';
import { FullPageSection } from './FullPageScroll';

const ProductShowcase = () => {
  return (
    <FullPageSection className="bg-section-2">
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-12 lg:px-20 h-full">
        <div className="max-w-6xl mx-auto w-full flex flex-col items-center">
          {/* Banner */}
          <motion.div
            className="text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: false }}
          >
            <p className="text-accent uppercase tracking-[0.3em] sm:tracking-[0.4em] text-xs sm:text-sm mb-2">
              Power Concealed
            </p>
            <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl text-noir uppercase tracking-[0.04em]">
              The Collection
            </h2>
          </motion.div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:gap-16 w-full">
            {/* Product 1 */}
            <motion.div 
              className="group flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              viewport={{ once: false }}
            >
              <Link to="/collection" className="flex flex-col items-center">
                <div className="flex items-center justify-center mb-4 sm:mb-6">
                  <motion.img 
                    src={indianHeritage}
                    alt="The Heritage" 
                    className="w-auto object-contain"
                    style={{ height: 'min(40vh, 280px)' }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-noir text-xs sm:text-base uppercase tracking-[0.15em] sm:tracking-[0.25em] mb-1 sm:mb-2 font-medium">
                    The Heritage
                  </h3>
                  <p className="text-accent text-xs sm:text-sm uppercase tracking-[0.2em] hover:text-noir transition-colors duration-300">
                    Explore
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Product 2 */}
            <motion.div 
              className="group flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
              viewport={{ once: false }}
            >
              <Link to="/collection" className="flex flex-col items-center">
                <div className="flex items-center justify-center mb-4 sm:mb-6">
                  <motion.img 
                    src={theClass}
                    alt="The Class" 
                    className="w-auto object-contain"
                    style={{ height: 'min(40vh, 280px)' }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-noir text-xs sm:text-base uppercase tracking-[0.15em] sm:tracking-[0.25em] mb-1 sm:mb-2 font-medium">
                    The Class
                  </h3>
                  <p className="text-accent text-xs sm:text-sm uppercase tracking-[0.2em] hover:text-noir transition-colors duration-300">
                    Discover
                  </p>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </FullPageSection>
  );
};

export default ProductShowcase;
