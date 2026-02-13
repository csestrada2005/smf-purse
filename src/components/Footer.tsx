import { motion } from 'framer-motion';
import Logo from './Logo';
import { Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FullPageSection } from './FullPageScroll';

const Footer = () => {
  return (
    <FullPageSection className="bg-section-6 pt-16 sm:pt-20">
      <div className="flex-1 flex items-center justify-center px-6 sm:px-12">
        <div className="max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 items-start text-left">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
              className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left"
            >
              <Link to="/" className="flex items-center gap-2 mb-4">
                <Logo size="sm" />
                <span className="font-brand text-xl tracking-wide text-foreground lowercase">
                  <span className="text-2xl">C</span>lasp
                </span>
              </Link>
              <p className="text-muted-foreground text-base leading-relaxed">
                Empowering women with luxury that speaks volumes.
              </p>
            </motion.div>

            {/* Explore Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: false }}
              className="flex flex-col items-start"
            >
              <h4 className="text-foreground text-sm uppercase tracking-[0.2em] mb-4 sm:mb-5">Explore</h4>
              <div className="space-y-3">
                <Link to="/shop" className="block text-muted-foreground text-base hover:text-gold transition-colors duration-300">
                  Collection
                </Link>
                <Link to="/about" className="block text-muted-foreground text-base hover:text-gold transition-colors duration-300">
                  About Us
                </Link>
                <Link to="/contact" className="block text-muted-foreground text-base hover:text-gold transition-colors duration-300">
                  Contact
                </Link>
              </div>
            </motion.div>

            {/* Policies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              viewport={{ once: false }}
              className="flex flex-col items-start"
            >
              <h4 className="text-foreground text-sm uppercase tracking-[0.2em] mb-4 sm:mb-5">Policies</h4>
              <div className="space-y-3">
                <Link to="/shipping" className="block text-muted-foreground text-base hover:text-gold transition-colors duration-300">
                  Returns & Shipping
                </Link>
                <Link to="/privacy" className="block text-muted-foreground text-base hover:text-gold transition-colors duration-300">
                  Privacy Policy
                </Link>
              </div>
            </motion.div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: false }}
              className="col-span-2 md:col-span-1 flex flex-col items-center md:items-end"
            >
              <h4 className="text-foreground text-sm uppercase tracking-[0.2em] mb-4 sm:mb-5">Connect</h4>
              <div className="flex gap-4">
                <a 
                  href="#" 
                  className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="mailto:hello@clasp.in" 
                  className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-colors duration-300"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="mt-10 sm:mt-14 pt-6 border-t border-gold/10 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: false }}
          >
            <p className="text-muted-foreground/60 text-sm uppercase tracking-widest">
              © 2026 Clasp • Made in India with ♥
            </p>
          </motion.div>
        </div>
      </div>
    </FullPageSection>
  );
};

export default Footer;