import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import purseViewsImage from '@/assets/purse-views.png';
import { FullPageSection } from './FullPageScroll';

const HeroSection = () => {
  return (
    <FullPageSection className="bg-section-1 pt-16">
      <div className="flex-1 flex items-center justify-center px-6 sm:px-12">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              viewport={{ once: false }}
              className="text-center lg:text-left"
            >
              <motion.p 
                className="text-accent uppercase tracking-[0.3em] text-xs mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: false }}
              >
                The Signature Collection
              </motion.p>
              
              <motion.h1 
                className="font-serif text-4xl sm:text-5xl md:text-6xl text-foreground mb-4 leading-[1.1]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                viewport={{ once: false }}
              >
                Carry Your
                <span className="block text-accent mt-2">Fearlessness</span>
              </motion.h1>
              
              <motion.p 
                className="text-muted-foreground text-lg max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                viewport={{ once: false }}
              >
                A luxurious statement piece for the bold woman.
                <span className="text-foreground"> Elegance meets purpose.</span>
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
                viewport={{ once: false }}
              >
                <Link 
                  to="/product"
                  className="px-8 py-4 bg-accent text-accent-foreground text-xs uppercase tracking-[0.2em] hover:bg-accent/90 transition-all duration-500"
                >
                  Discover
                </Link>
                <button 
                  onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 border border-foreground/20 text-foreground text-xs uppercase tracking-[0.2em] hover:border-accent hover:text-accent transition-all duration-500"
                >
                  Our Story
                </button>
              </motion.div>
            </motion.div>
            
            {/* Right: Product Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              viewport={{ once: false }}
              className="relative flex items-center justify-center"
            >
              <img 
                src={purseViewsImage} 
                alt="Clasp luxury purse collection" 
                className="w-full h-auto max-w-sm lg:max-w-md"
              />
              <motion.div 
                className="absolute inset-0 bg-accent/5 blur-3xl -z-10 scale-110"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
                viewport={{ once: false }}
              />
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="pb-6 flex justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        viewport={{ once: false }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-foreground/40 to-transparent"
        />
      </motion.div>
    </FullPageSection>
  );
};

export default HeroSection;
