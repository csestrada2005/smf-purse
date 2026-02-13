import { motion } from 'framer-motion';
import { FullPageSection } from './FullPageScroll';

const StorySection = () => {
  return (
    <FullPageSection id="story" className="bg-section-3">
      <div className="flex-1 flex items-center justify-center px-6 sm:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            className="w-12 h-px bg-accent mx-auto mb-10 sm:mb-14 origin-center"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: false }}
          />

          <motion.h2
            className="font-editorial text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.15] mb-8 sm:mb-12 uppercase tracking-[0.06em]"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            viewport={{ once: false }}
          >
            Unapologetic
            <motion.span 
              className="text-accent block mt-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              viewport={{ once: false }}
            >
              Power.
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto tracking-wide"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: false }}
          >
            Designed for the woman who commands the room.{' '}
            <span className="text-foreground">
              Every detail exists with intention—strength woven into beauty, confidence made tangible.
            </span>
          </motion.p>

          <motion.div 
            className="w-12 h-px bg-accent mx-auto mt-10 sm:mt-14 origin-center"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
            viewport={{ once: false }}
          />
        </div>
      </div>
    </FullPageSection>
  );
};

export default StorySection;
