import { motion } from 'framer-motion';
import { FullPageSection } from './FullPageScroll';

const StorySection = () => {
  return (
    <FullPageSection id="story" className="bg-section-3 pt-16">
      <div className="flex-1 flex items-center justify-center px-6 sm:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p 
            className="text-accent uppercase tracking-[0.3em] text-xs mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: false }}
          >
            Our Philosophy
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            viewport={{ once: false }}
          >
            <div className="relative">
              <motion.div 
                className="absolute -top-8 left-1/2 -translate-x-1/2 text-accent/10 text-7xl font-serif select-none"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                viewport={{ once: false }}
              >
                "
              </motion.div>
              
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-relaxed mb-6">
                In a world that tells women to shrink,
                <motion.span 
                  className="text-accent block mt-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  viewport={{ once: false }}
                >
                  we chose to craft boldness.
                </motion.span>
              </h2>
              
              <motion.p 
                className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                viewport={{ once: false }}
              >
                Every clasp, every stitch, every golden accent—designed for women who refuse to ask for permission to feel safe. 
                <span className="text-foreground"> This is not just a bag. It's a statement of independence.</span>
              </motion.p>
            </div>
          </motion.div>
          
          <motion.div 
            className="w-16 h-px bg-accent mx-auto mt-8 origin-center"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 1 }}
            viewport={{ once: false }}
          />
        </div>
      </div>
    </FullPageSection>
  );
};

export default StorySection;
