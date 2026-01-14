import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import purseViewsImage from '@/assets/purse-views.png';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <motion.p 
              className="text-accent uppercase tracking-[0.3em] text-xs mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              The Signature Collection
            </motion.p>
            
            <motion.h1 
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground mb-6 leading-[1.1]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Carry Your
              <span className="block text-accent mt-2">Fearlessness</span>
            </motion.h1>
            
            <motion.p 
              className="text-muted-foreground text-lg sm:text-xl max-w-md mx-auto lg:mx-0 mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              A luxurious statement piece for the bold woman.
              <span className="text-foreground"> Elegance meets purpose.</span>
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link 
                to="/product"
                className="px-8 py-4 bg-accent text-accent-foreground text-xs uppercase tracking-[0.2em] hover:bg-accent/90 transition-colors duration-300"
              >
                Discover
              </Link>
              <Link 
                to="/#story"
                className="px-8 py-4 border border-foreground/20 text-foreground text-xs uppercase tracking-[0.2em] hover:border-accent hover:text-accent transition-colors duration-300"
              >
                Our Story
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Right: Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative">
              <img 
                src={purseViewsImage} 
                alt="Clasp luxury purse collection" 
                className="w-full h-auto max-w-lg mx-auto"
              />
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-accent/5 blur-3xl -z-10 scale-110" />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-foreground/50 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
