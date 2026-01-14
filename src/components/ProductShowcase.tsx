import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import purseOpenImage from '@/assets/purse-open.png';
import purseViewsImage from '@/assets/purse-views.png';

const ProductShowcase = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative py-32 px-6 sm:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          style={{ opacity }}
        >
          <p className="text-accent uppercase tracking-[0.3em] text-xs mb-4">
            Handcrafted Excellence
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground">
            The Art of Detail
          </h2>
        </motion.div>

        {/* Products Grid - YSL Style */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {/* Product 1 */}
          <motion.div 
            className="group"
            style={{ y: y1 }}
          >
            <Link to="/product" className="block relative overflow-hidden">
              <div className="aspect-[3/4] bg-muted/5 flex items-center justify-center p-8">
                <motion.img 
                  src={purseViewsImage} 
                  alt="The Signature - Multiple Views" 
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-foreground text-sm uppercase tracking-[0.2em] mb-2">
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
            style={{ y: y2 }}
          >
            <Link to="/product" className="block relative overflow-hidden">
              <div className="aspect-[3/4] bg-muted/5 flex items-center justify-center p-8">
                <motion.img 
                  src={purseOpenImage} 
                  alt="The Signature - Interior" 
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-foreground text-sm uppercase tracking-[0.2em] mb-2">
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
    </section>
  );
};

export default ProductShowcase;
