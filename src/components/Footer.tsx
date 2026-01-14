import { motion } from 'framer-motion';
import Logo from './Logo';
import { Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative py-16 px-6 sm:px-12 border-t border-accent/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Logo size="sm" />
              <span className="font-brand text-xl tracking-wide text-foreground lowercase">
                <span className="text-2xl">C</span>lasp
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Empowering women with luxury that speaks volumes.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h4 className="text-foreground text-xs uppercase tracking-[0.2em] mb-4">Explore</h4>
            <div className="space-y-2">
              <Link to="/product" className="block text-muted-foreground text-sm hover:text-foreground transition-colors">
                Collection
              </Link>
              <Link to="/#story" className="block text-muted-foreground text-sm hover:text-foreground transition-colors">
                Our Story
              </Link>
              <Link to="/#contact" className="block text-muted-foreground text-sm hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-right"
          >
            <h4 className="text-foreground text-xs uppercase tracking-[0.2em] mb-4">Connect</h4>
            <div className="flex gap-4 justify-end">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full border border-accent/20 flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="mailto:hello@clasp.in" 
                className="w-10 h-10 rounded-full border border-accent/20 flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors duration-300"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 pt-8 border-t border-accent/10 text-center">
          <p className="text-muted-foreground/60 text-xs uppercase tracking-widest">
            © 2026 Clasp • Made in India with ♥
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
