import { motion } from 'framer-motion';
import { FullPageSection } from './FullPageScroll';

const EventSection = () => {
  return (
    <FullPageSection id="event" className="bg-foreground">
      <div className="flex-1 flex items-center justify-center px-6 sm:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            className="text-gold uppercase tracking-[0.4em] text-xs sm:text-sm mb-6"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: false }}
          >
            February 14th
          </motion.p>

          <motion.h2
            className="font-editorial text-3xl sm:text-5xl md:text-6xl text-background uppercase tracking-[0.04em] mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            viewport={{ once: false }}
          >
            Spreading Love
            <br />
            <span className="text-gold">&</span> Class
          </motion.h2>

          <motion.div
            className="w-16 h-px bg-gold mx-auto mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: false }}
          />

          <motion.p
            className="text-background/60 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            viewport={{ once: false }}
          >
            Join us at <span className="text-background font-medium">DLF CyberHub</span> this Valentine's Day.
            Experience the collection in person—because some things are meant to be felt.
          </motion.p>

          <motion.p
            className="text-gold text-xs uppercase tracking-[0.3em]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: false }}
          >
            See you there ✦
          </motion.p>
        </div>
      </div>
    </FullPageSection>
  );
};

export default EventSection;
