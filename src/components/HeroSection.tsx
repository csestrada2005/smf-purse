import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import purseViewsImage from '@/assets/purse-views.png';
import { FullPageSection } from './FullPageScroll';

const HeroSection = () => {
  return (
    <FullPageSection className="bg-section-1 pt-20">
      <div className="flex-1 flex items-center justify-center px-6 sm:px-12">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
              viewport={{ once: false }}
              className="text-center lg:text-left order-2 lg:order-1"
            >
              <p className="text-accent uppercase tracking-[0.3em] text-xs mb-4">
                The Signature Collection
              </p>
              
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground mb-4 leading-[1.1]">
                Carry Your
                <span className="block text-accent mt-2">Fearlessness</span>
              </h1>
              
              <p className="text-muted-foreground text-lg sm:text-xl max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed">
                A luxurious statement piece for the bold woman.
                <span className="text-foreground"> Elegance meets purpose.</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  to="/product"
                  className="px-8 py-4 bg-accent text-accent-foreground text-xs uppercase tracking-[0.2em] hover:bg-accent/90 transition-colors duration-300"
                >
                  Discover
                </Link>
                <button 
                  onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 border border-foreground/20 text-foreground text-xs uppercase tracking-[0.2em] hover:border-accent hover:text-accent transition-colors duration-300"
                >
                  Our Story
                </button>
              </div>
            </motion.div>
            
            {/* Right: Product Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 80 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
              viewport={{ once: false }}
              className="relative order-1 lg:order-2"
            >
              <img 
                src={purseViewsImage} 
                alt="Clasp luxury purse collection" 
                className="w-full h-auto max-w-md mx-auto"
              />
              <div className="absolute inset-0 bg-accent/5 blur-3xl -z-10 scale-110" />
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="pb-8 flex justify-center"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-px h-10 bg-gradient-to-b from-foreground/50 to-transparent" />
      </motion.div>
    </FullPageSection>
  );
};

export default HeroSection;
