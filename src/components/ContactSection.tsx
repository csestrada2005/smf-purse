import { motion } from 'framer-motion';
import EmailSignup from './EmailSignup';
import { FullPageSection } from './FullPageScroll';
import heroEditorial from '@/assets/hero-editorial.png';

const ContactSection = () => {
  return (
    <FullPageSection id="contact" className="bg-section-5 relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroEditorial}
          alt=""
          className="w-full h-full object-cover opacity-[0.07]"
        />
      </div>

      <div className="flex-1 flex items-center justify-center px-6 sm:px-12 relative z-10">
        <motion.div
          className="max-w-lg mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: false }}>

          <motion.p
            className="text-accent uppercase tracking-[0.3em] text-sm mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-50px" }}>
            Be First
          </motion.p>
          <motion.h2
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            viewport={{ once: true, margin: "-50px" }}>
            Join the Clasp    
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-base sm:text-lg mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}>
            Be the first to know about new "drops"      
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            viewport={{ once: true, margin: "-50px" }}>
            <EmailSignup />
          </motion.div>
        </motion.div>
      </div>
    </FullPageSection>);
};

export default ContactSection;
