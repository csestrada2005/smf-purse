import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { CartDrawer } from './CartDrawer';

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string; category?: string }[];
}

const navItems: NavItem[] = [
  {
    label: 'Collection',
    children: [
      { label: 'View All', href: '/collection', category: 'BROWSE' },
      { label: 'The Signature', href: '/product', category: 'HANDBAGS' },
      { label: 'The Indian Heritage', href: '/product', category: 'HANDBAGS' },
      { label: 'The Class', href: '/product', category: 'HANDBAGS' },
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
      { label: 'Returns & Shipping', href: '/shipping', category: 'CUSTOMER CARE' },
      { label: 'Privacy Policy', href: '/privacy', category: 'LEGAL' },
    ]
  },
];

const Navigation = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isOnLightSection, setIsOnLightSection] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // All pages have dark background except home page section 1 (ProductShowcase)
    // So by default nav should use light text (text-foreground)
    if (location.pathname !== '/') {
      setIsOnLightSection(false); // All inner pages have dark backgrounds
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
  }, [location.pathname]);

  // Reset menu when navigating
  useEffect(() => {
    setActiveMenu(null);
  }, [location.pathname]);

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
    <>
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
              >
                {item.href ? (
                  <Link
                    to={item.href}
                    className={`${activeMenu ? 'text-noir/80 hover:text-noir' : textColorClass} text-xs uppercase tracking-[0.2em] transition-colors duration-300 py-2`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button className={`${activeMenu ? 'text-noir/80 hover:text-noir' : textColorClass} text-xs uppercase tracking-[0.2em] transition-colors duration-300 py-2`}>
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Center Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Logo size="sm" />
            <span className={`font-brand text-2xl sm:text-3xl tracking-wide ${activeMenu ? 'text-noir' : logoTextColorClass} lowercase transition-colors duration-300`}>
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
              >
                {item.href ? (
                  <Link
                    to={item.href}
                    className={`${activeMenu ? 'text-noir/80 hover:text-noir' : textColorClass} text-xs uppercase tracking-[0.2em] transition-colors duration-300 py-2`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button className={`${activeMenu ? 'text-noir/80 hover:text-noir' : textColorClass} text-xs uppercase tracking-[0.2em] transition-colors duration-300 py-2`}>
                    {item.label}
                  </button>
                )}
              </div>
            ))}
            {/* Cart */}
            <CartDrawer className={activeMenu ? 'text-noir' : textColorClass} />
          </div>

          {/* Mobile Menu Button */}
          <button className={`md:hidden ${activeMenu ? 'text-noir' : logoTextColorClass}`}>
            <div className="space-y-1.5">
              <div className={`w-6 h-px ${activeMenu ? 'bg-noir' : mobileMenuColorClass}`} />
              <div className={`w-6 h-px ${activeMenu ? 'bg-noir' : mobileMenuColorClass}`} />
            </div>
          </button>
        </nav>
      </motion.header>

      {/* YSL-Style Full Screen Dropdown Overlay */}
      <AnimatePresence>
        {activeMenu && (
          <>
            {/* Blurred Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-40 bg-white/95 backdrop-blur-md"
              onMouseLeave={() => setActiveMenu(null)}
            >
              {/* Content Container */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="pt-24 px-6 sm:px-12 lg:px-20"
              >
                <div className="max-w-6xl mx-auto">
                  {/* Menu Items in YSL Grid Style */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16">
                    {/* Category Column */}
                    <div>
                      <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.15 }}
                        className="text-noir font-semibold text-sm uppercase tracking-[0.15em] mb-6"
                      >
                        {activeMenu}
                      </motion.h3>
                      <div className="space-y-4">
                        {[...navItems, ...rightNavItems]
                          .find((item) => item.label === activeMenu)
                          ?.children?.map((child, index) => (
                            <motion.div
                              key={child.label}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 + index * 0.05, duration: 0.4 }}
                            >
                              <Link
                                to={child.href}
                                onClick={() => setActiveMenu(null)}
                                className="block text-noir/70 hover:text-noir text-sm uppercase tracking-widest transition-colors duration-300"
                              >
                                {child.label}
                              </Link>
                            </motion.div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
