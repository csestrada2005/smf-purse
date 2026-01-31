import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import indianHeritage from '@/assets/indian-heritage.png';
import theClass from '@/assets/the-class.png';
import { FullPageSection } from './FullPageScroll';

const ProductShowcase = () => {
  return (
    <FullPageSection className="bg-white">
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-12 lg:px-20 h-full">
        <div className="max-w-6xl mx-auto w-full flex flex-col items-center">
          {/* Safety First Banner */}
          <motion.div
            className="text-center mb-6 sm:mb-10"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            <p className="text-amber-600 uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-base mb-1 sm:mb-2">
              Safety First Handbags
            </p>
            <h2 className="font-serif text-xl sm:text-3xl md:text-4xl text-neutral-900">
              Our Collection
            </h2>
          </motion.div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:gap-16 w-full">
            {/* Product 1 - The Indian Heritage */}
            <motion.div 
              className="group flex flex-col items-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              viewport={{ once: false }}
            >
              <Link to="/collection" className="flex flex-col items-center">
                <div className="flex items-center justify-center mb-4 sm:mb-6">
                  <motion.img 
                    src={indianHeritage}
                    alt="The Indian Heritage - Woman with purse silhouette" 
                    className="w-auto object-contain"
                    style={{ height: 'min(40vh, 280px)' }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-neutral-900 text-xs sm:text-lg uppercase tracking-[0.1em] sm:tracking-[0.2em] mb-1 sm:mb-2 font-semibold">
                    The Indian Heritage
                  </h3>
                  <p className="text-amber-600 text-xs sm:text-sm uppercase tracking-wider sm:tracking-widest hover:text-neutral-900 transition-colors duration-500">
                    Explore
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Product 2 - The Class */}
            <motion.div 
              className="group flex flex-col items-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              viewport={{ once: false }}
            >
              <Link to="/collection" className="flex flex-col items-center">
                <div className="flex items-center justify-center mb-4 sm:mb-6">
                  <motion.img 
                    src={theClass}
                    alt="The Class - Woman with purse and bird silhouette" 
                    className="w-auto object-contain"
                    style={{ height: 'min(40vh, 280px)' }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-neutral-900 text-xs sm:text-lg uppercase tracking-[0.1em] sm:tracking-[0.2em] mb-1 sm:mb-2 font-semibold">
                    The Class
                  </h3>
                  <p className="text-amber-600 text-xs sm:text-sm uppercase tracking-wider sm:tracking-widest hover:text-neutral-900 transition-colors duration-500">
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
