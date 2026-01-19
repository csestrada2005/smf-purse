import { motion } from 'framer-motion';
import EmailSignup from './EmailSignup';
import { FullPageSection } from './FullPageScroll';

const ContactSection = () => {
  return (
    <FullPageSection id="contact" className="bg-section-5">
      <div className="flex-1 flex items-center justify-center px-6 sm:px-12">
        <motion.div 
          className="max-w-lg mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: false }}
        >
          <motion.p 
            className="text-gold uppercase tracking-[0.3em] text-xs mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: false }}
          >
            Be First
          </motion.p>
          <motion.h2 
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            viewport={{ once: false }}
          >
            Join the Waitlist
          </motion.h2>
          <motion.p 
            className="text-cream/70 text-base sm:text-lg mb-10 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: false }}
          >
            Be the first to own this statement piece.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
            viewport={{ once: false }}
          >
            <EmailSignup />
          </motion.div>
        </motion.div>
      </div>
    </FullPageSection>
  );
};

export default ContactSection;
