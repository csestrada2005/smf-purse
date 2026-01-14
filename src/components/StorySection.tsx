import { motion } from 'framer-motion';
import { FullPageSection } from './FullPageScroll';

const StorySection = () => {
  return (
    <FullPageSection id="story" className="bg-section-3 pt-20">
      <div className="flex-1 flex items-center justify-center px-6 sm:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p 
            className="text-accent uppercase tracking-[0.3em] text-xs mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
          >
            Our Philosophy
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: false }}
          >
            <div className="relative">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-accent/10 text-8xl font-serif select-none">"</div>
              
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground leading-relaxed mb-8">
                In a world that tells women to shrink,
                <span className="text-accent block mt-2">we chose to craft boldness.</span>
              </h2>
              
              <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
                Every clasp, every stitch, every golden accent—designed for women who refuse to ask for permission to feel safe. 
                <span className="text-foreground"> This is not just a bag. It's a statement of independence.</span>
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="w-16 h-px bg-accent mx-auto mt-10"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: false }}
          />
        </div>
      </div>
    </FullPageSection>
  );
};

export default StorySection;
