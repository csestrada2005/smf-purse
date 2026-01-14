import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { Search } from 'lucide-react';

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    label: 'Collection',
    children: [
      { label: 'The Signature', href: '/product' },
      { label: 'Coming Soon', href: '/product' },
    ]
  },
  {
    label: 'Story',
    children: [
      { label: 'Our Philosophy', href: '/#philosophy' },
      { label: 'The Craft', href: '/#craft' },
      { label: 'Made in India', href: '/#mission' },
    ]
  },
];

const rightNavItems: NavItem[] = [
  { label: 'Atelier', href: '/product' },
  { label: 'Contact', href: '/#contact' },
];

const Navigation = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="flex items-center justify-between px-6 sm:px-12 py-4">
        {/* Left Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setActiveMenu(item.label)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className="text-foreground/80 hover:text-foreground text-xs uppercase tracking-[0.2em] transition-colors duration-300 py-2">
                {item.label}
              </button>
            </div>
          ))}
        </div>

        {/* Center Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Logo size="sm" />
          <span className="font-brand text-2xl sm:text-3xl tracking-wide text-foreground lowercase">
            <span className="text-3xl sm:text-4xl">C</span>lasp
          </span>
        </Link>

        {/* Right Nav */}
        <div className="hidden md:flex items-center gap-8">
          {rightNavItems.map((item) => (
            <Link
              key={item.label}
              to={item.href || '/'}
              className="text-foreground/80 hover:text-foreground text-xs uppercase tracking-[0.2em] transition-colors duration-300"
            >
              {item.label}
            </Link>
          ))}
          <button className="text-foreground/80 hover:text-foreground transition-colors duration-300">
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-foreground">
          <div className="space-y-1.5">
            <div className="w-6 h-px bg-foreground" />
            <div className="w-6 h-px bg-foreground" />
          </div>
        </button>
      </nav>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 bg-background/95 backdrop-blur-md border-t border-accent/10 overflow-hidden"
            onMouseEnter={() => setActiveMenu(activeMenu)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="max-w-6xl mx-auto px-6 sm:px-12 py-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {navItems
                  .find((item) => item.label === activeMenu)
                  ?.children?.map((child, index) => (
                    <motion.div
                      key={child.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <Link
                        to={child.href}
                        className="block text-foreground/70 hover:text-foreground text-sm uppercase tracking-widest transition-colors duration-300"
                      >
                        {child.label}
                      </Link>
                    </motion.div>
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navigation;
