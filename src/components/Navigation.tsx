import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

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
    ]
  },
  {
    label: 'About',
    href: '/about'
  },
];

const rightNavItems: NavItem[] = [
  { label: 'Contact', href: '/contact' },
  { 
    label: 'Policies',
    children: [
      { label: 'Returns & Shipping', href: '/shipping' },
      { label: 'Privacy Policy', href: '/privacy' },
    ]
  },
];

// Sections with light backgrounds that need dark text
const lightSections = ['product-showcase'];

const Navigation = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isOnLightSection, setIsOnLightSection] = useState(false);
  const location = useLocation();

  // Check if current page has a light background by default
  const isLightPage = ['/privacy', '/shipping'].includes(location.pathname);

  useEffect(() => {
    // Only run scroll detection on pages with mixed backgrounds (home page)
    if (location.pathname !== '/') {
      setIsOnLightSection(isLightPage);
      return;
    }

    const handleScroll = () => {
      const scrollContainer = document.querySelector('.snap-y');
      if (!scrollContainer) return;

      const scrollTop = scrollContainer.scrollTop;
      const viewportHeight = window.innerHeight;
      
      // Determine which section we're on based on scroll position
      const sectionIndex = Math.round(scrollTop / viewportHeight);
      
      // Section 1 (index 1) is the ProductShowcase with white background
      setIsOnLightSection(sectionIndex === 1);
    };

    const scrollContainer = document.querySelector('.snap-y');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [location.pathname, isLightPage]);

  const textColorClass = isOnLightSection 
    ? 'text-noir/80 hover:text-noir' 
    : 'text-foreground/80 hover:text-foreground';
  
  const logoTextColorClass = isOnLightSection 
    ? 'text-noir' 
    : 'text-foreground';

  const mobileMenuColorClass = isOnLightSection
    ? 'bg-noir'
    : 'bg-foreground';

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="flex items-center justify-between px-6 sm:px-12 py-4">
        {/* Left Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children ? setActiveMenu(item.label) : null}
              onMouseLeave={() => setActiveMenu(null)}
            >
              {item.href ? (
                <Link
                  to={item.href}
                  className={`${textColorClass} text-xs uppercase tracking-[0.2em] transition-colors duration-300 py-2`}
                >
                  {item.label}
                </Link>
              ) : (
                <button className={`${textColorClass} text-xs uppercase tracking-[0.2em] transition-colors duration-300 py-2`}>
                  {item.label}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Center Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Logo size="sm" />
          <span className={`font-brand text-2xl sm:text-3xl tracking-wide ${logoTextColorClass} lowercase transition-colors duration-300`}>
            <span className="text-3xl sm:text-4xl">C</span>lasp
          </span>
        </Link>

        {/* Right Nav */}
        <div className="hidden md:flex items-center gap-8">
          {rightNavItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children ? setActiveMenu(item.label) : null}
              onMouseLeave={() => setActiveMenu(null)}
            >
              {item.href ? (
                <Link
                  to={item.href}
                  className={`${textColorClass} text-xs uppercase tracking-[0.2em] transition-colors duration-300 py-2`}
                >
                  {item.label}
                </Link>
              ) : (
                <button className={`${textColorClass} text-xs uppercase tracking-[0.2em] transition-colors duration-300 py-2`}>
                  {item.label}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button className={`md:hidden ${logoTextColorClass}`}>
          <div className="space-y-1.5">
            <div className={`w-6 h-px ${mobileMenuColorClass}`} />
            <div className={`w-6 h-px ${mobileMenuColorClass}`} />
          </div>
        </button>
      </nav>

      {/* Dropdown Menu - Fixed with solid background */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 bg-background border-t border-accent/10 overflow-hidden z-50"
            onMouseEnter={() => setActiveMenu(activeMenu)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="max-w-6xl mx-auto px-6 sm:px-12 py-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[...navItems, ...rightNavItems]
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
