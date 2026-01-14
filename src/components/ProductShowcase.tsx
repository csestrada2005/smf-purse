import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import purseOpenImage from '@/assets/purse-open.png';
import purseViewsImage from '@/assets/purse-views.png';
import { FullPageSection } from './FullPageScroll';

const ProductShowcase = () => {
  return (
    <FullPageSection className="bg-section-2 pt-16">
      <div className="flex-1 flex flex-col justify-center items-center px-6 sm:px-12 py-8">
        <div className="max-w-5xl mx-auto w-full">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
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
          <div className="grid md:grid-cols-2 gap-6 lg:gap-12">
            {/* Product 1 */}
            <motion.div 
              className="group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              viewport={{ once: false }}
            >
              <Link to="/product" className="block text-center">
                <div className="aspect-[4/3] bg-muted/5 flex items-center justify-center p-4 mb-4 overflow-hidden">
                  <motion.img 
                    src={purseViewsImage} 
                    alt="The Signature - Multiple Views" 
                    className="w-full h-full object-contain"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <h3 className="text-foreground text-sm uppercase tracking-[0.2em] mb-1">
                  The Signature
                </h3>
                <p className="text-muted-foreground text-xs uppercase tracking-widest">
                  Explore
                </p>
              </Link>
            </motion.div>

            {/* Product 2 */}
            <motion.div 
              className="group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              viewport={{ once: false }}
            >
              <Link to="/product" className="block text-center">
                <div className="aspect-[4/3] bg-muted/5 flex items-center justify-center p-4 mb-4 overflow-hidden">
                  <motion.img 
                    src={purseOpenImage} 
                    alt="The Signature - Interior" 
                    className="w-full h-full object-contain"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <h3 className="text-foreground text-sm uppercase tracking-[0.2em] mb-1">
                  The Interior
                </h3>
                <p className="text-muted-foreground text-xs uppercase tracking-widest">
                  Discover
                </p>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </FullPageSection>
  );
};

export default ProductShowcase;
