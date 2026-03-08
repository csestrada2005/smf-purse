import { motion } from 'framer-motion';
import { FullPageSection } from './FullPageScroll';
import velvetChair from '@/assets/velvet-chair.png';

const StorySection = () => {
  return (
    <FullPageSection id="story" className="bg-section-3">
      <div className="flex-1 flex items-center justify-center px-6 sm:px-12">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left: Image */}
            <motion.div
              className="order-2 lg:order-1 flex items-center justify-center"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: false }}
            >
              <img
                src={velvetChair}
                alt="Clasp purse on velvet chair"
                className="w-full max-h-[55vh] object-contain"
              />
            </motion.div>

            {/* Right: Text */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <motion.div
                className="w-12 h-px bg-accent mx-auto lg:mx-0 mb-10 sm:mb-14 origin-center"
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
                className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 tracking-wide"
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
                className="w-12 h-px bg-accent mx-auto lg:mx-0 mt-10 sm:mt-14 origin-center"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
                viewport={{ once: false }}
              />
            </div>
          </div>
        </div>
      </div>
    </FullPageSection>
  );
};

export default StorySection;
