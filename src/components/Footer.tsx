import Logo from './Logo';
import { Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative py-16 px-4 border-t border-accent/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <Logo size="sm" className="mb-6" />
          
          <p className="text-muted-foreground text-sm max-w-md mb-8">
            Empowering Indian women with luxury that speaks volumes. 
            Made with pride, worn with purpose.
          </p>
          
          <div className="flex gap-6 mb-8">
            <a 
              href="#" 
              className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a 
              href="mailto:hello@example.com" 
              className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors duration-300"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
          
          <p className="text-muted-foreground/60 text-xs uppercase tracking-widest">
            © 2026 • Made in India with ♥
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
