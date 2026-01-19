import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import purseGoldFront from '@/assets/purse-gold-front.png';
import purseGoldSide from '@/assets/purse-gold-side.png';
import { FullPageSection } from './FullPageScroll';

const ProductShowcase = () => {
  return (
    <FullPageSection className="bg-section-2">
      <div className="flex-1 flex items-center justify-center px-6 sm:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto w-full">
          {/* Products Grid - YSL style with tall images */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            {/* Product 1 - The Signature */}
            <motion.div 
              className="group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              viewport={{ once: false }}
            >
              <Link to="/product" className="block">
                <div className="aspect-[3/4] bg-muted/5 flex items-center justify-center overflow-hidden mb-6">
                  <motion.img 
                    src={purseGoldFront}
                    alt="The Signature - Front View" 
                    className="w-full h-full object-contain p-8"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-foreground text-sm uppercase tracking-[0.2em] mb-1">
                    The Signature
                  </h3>
                  <p className="text-muted-foreground text-xs uppercase tracking-widest hover:text-foreground transition-colors duration-500">
                    Explore
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Product 2 - The Detail */}
            <motion.div 
              className="group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              viewport={{ once: false }}
            >
              <Link to="/product" className="block">
                <div className="aspect-[3/4] bg-muted/5 flex items-center justify-center overflow-hidden mb-6">
                  <motion.img 
                    src={purseGoldSide}
                    alt="The Signature - Side View" 
                    className="w-full h-full object-contain p-8"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-foreground text-sm uppercase tracking-[0.2em] mb-1">
                    The Detail
                  </h3>
                  <p className="text-muted-foreground text-xs uppercase tracking-widest hover:text-foreground transition-colors duration-500">
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
