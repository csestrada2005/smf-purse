import { motion } from 'framer-motion';
import EmailSignup from './EmailSignup';

const ContactSection = () => {
  return (
    <section id="contact" className="relative py-32 px-6 sm:px-12 border-t border-accent/10">
      <motion.div 
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <p className="text-accent uppercase tracking-[0.3em] text-xs mb-4">
          Be First
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-6">
          Join the Waitlist
        </h2>
        <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
          Be the first to own this statement piece. Enter your email and we'll notify you when we launch.
        </p>
        
        <EmailSignup />
      </motion.div>
    </section>
  );
};

export default ContactSection;
