import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import purseOpenImage from '@/assets/purse-open.png';
import purseViewsImage from '@/assets/purse-views.png';
import { FullPageSection } from './FullPageScroll';

const ProductShowcase = () => {
  return (
    <FullPageSection className="bg-section-2 pt-20">
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12">
        <div className="max-w-7xl mx-auto w-full">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
          >
            <p className="text-accent uppercase tracking-[0.3em] text-xs mb-3">
              Handcrafted Excellence
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground">
              The Art of Detail
            </h2>
          </motion.div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            {/* Product 1 */}
            <motion.div 
              className="group"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: false }}
            >
              <Link to="/product" className="block">
                <div className="aspect-square bg-muted/5 flex items-center justify-center p-6 mb-4">
                  <img 
                    src={purseViewsImage} 
                    alt="The Signature - Multiple Views" 
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-foreground text-sm uppercase tracking-[0.2em] mb-1">
                    The Signature
                  </h3>
                  <p className="text-muted-foreground text-xs uppercase tracking-widest">
                    Explore
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Product 2 */}
            <motion.div 
              className="group"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: false }}
            >
              <Link to="/product" className="block">
                <div className="aspect-square bg-muted/5 flex items-center justify-center p-6 mb-4">
                  <img 
                    src={purseOpenImage} 
                    alt="The Signature - Interior" 
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-foreground text-sm uppercase tracking-[0.2em] mb-1">
                    The Interior
                  </h3>
                  <p className="text-muted-foreground text-xs uppercase tracking-widest">
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
