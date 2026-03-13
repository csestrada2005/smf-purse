import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { CartDrawer } from './CartDrawer';
import { useScrollLock } from './FullPageScroll';
import { useIsMobile } from '@/hooks/use-mobile';
import claspNavLogo from '@/assets/clasp-nav-logo.png';

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string; category?: string }[];
}

const navItems: NavItem[] = [
  {
    label: 'Collection',
    children: [
      { label: 'Drop 1', href: '/shop', category: 'SHOP' },
    ]
  },
  {
    label: 'About',
    children: [
      { label: 'Our Story', href: '/about', category: 'ABOUT' },
    ]
  },
  { label: 'Event', href: '/event' },
];

const rightNavItems: NavItem[] = [
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const location = useLocation();
  const isMobile = useIsMobile();

  const { swiperRef, activeIndex } = useScrollLock();

  // Mobile slides: 0=Hero, 1=Drop1pre, 2=BuyNow(light), 3=DiscoverVersions(dark), 4=WhatsClasp pre(dark), 5=Discover(light), 6=ContactUs(dark), 7=Footer(light)
  // Desktop slides: 0=Hero, 1=Drop1pre, 2=Drop1Combined(light), 3=WhatsClasp pre(dark), 4=WhatsClaspCombined(dark), 5=Footer(light)
  const mobileDarkSlides = new Set([1, 3, 4, 6]);
  const desktopDarkSlides = new Set([1, 3, 4]);

  const darkSet = isMobile ? mobileDarkSlides : desktopDarkSlides;

  const isHomePage = location.pathname === '/';
  const isDarkSlide = isHomePage ? darkSet.has(activeIndex) : false;
  const isOnHeroSection = isHomePage && activeIndex === 0;

  useEffect(() => {
    setActiveMenu(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const textColorClass = isDarkSlide && !activeMenu
    ? 'text-white/80 hover:text-white' 
    : 'text-foreground/80 hover:text-foreground';
  
  const logoTextColorClass = isDarkSlide && !activeMenu ? 'text-white' : 'text-foreground';

  const mobileMenuColorClass = isDarkSlide && !activeMenu ? 'bg-white' : 'bg-foreground';

  return (
    <>
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          location.pathname === '/' ? '' : 'bg-white'
        }`}
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
                    className={`${activeMenu ? 'text-noir/80 hover:text-noir' : textColorClass} text-sm uppercase tracking-[0.2em] transition-colors duration-300 py-2`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button className={`${activeMenu ? 'text-noir/80 hover:text-noir' : textColorClass} text-sm uppercase tracking-[0.2em] transition-colors duration-300 py-2`}>
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Center Logo */}
          <Link 
            to="/" 
            className={`absolute left-1/2 -translate-x-[60%] transition-opacity duration-500 ${
              isOnHeroSection && location.pathname === '/' && !activeMenu ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <img 
              src={claspNavLogo} 
              alt="Clasp" 
              className={`h-8 sm:h-10 w-auto transition-all duration-300 ${isDarkSlide && !activeMenu ? 'invert' : ''}`}
            />
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
                    className={`${activeMenu ? 'text-noir/80 hover:text-noir' : textColorClass} text-sm uppercase tracking-[0.2em] transition-colors duration-300 py-2`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button className={`${activeMenu ? 'text-noir/80 hover:text-noir' : textColorClass} text-sm uppercase tracking-[0.2em] transition-colors duration-300 py-2`}>
                    {item.label}
                  </button>
                )}
              </div>
            ))}
            <CartDrawer className={activeMenu ? 'text-noir' : textColorClass} />
          </div>

          {/* Mobile Menu Button & Cart */}
          <div className="md:hidden flex items-center justify-between w-full">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className={`${activeMenu ? 'text-noir' : logoTextColorClass} p-2`}
              aria-label="Open menu"
            >
              <div className="space-y-1.5">
                <div className={`w-6 h-0.5 ${activeMenu ? 'bg-noir' : mobileMenuColorClass}`} />
                <div className={`w-6 h-0.5 ${activeMenu ? 'bg-noir' : mobileMenuColorClass}`} />
              </div>
            </button>
            <CartDrawer className={logoTextColorClass} />
          </div>
        </nav>
      </motion.header>

      {/* Desktop Full Screen Dropdown Overlay */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-md hidden md:block"
            onMouseMove={(e) => {
              const screenWidth = window.innerWidth;
              const mouseX = e.clientX;
              const mouseY = e.clientY;
              
              if (mouseY > 300) {
                setActiveMenu(null);
                return;
              }
              
              if (activeMenu === 'Collection' && mouseX > screenWidth * 0.7) {
                setActiveMenu(null);
              }
              
              if (activeMenu === 'Policies' && mouseX < screenWidth * 0.3) {
                setActiveMenu(null);
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="pt-24 px-6 sm:px-12 lg:px-20"
            >
              <div className="max-w-6xl mx-auto">
                <div className={`flex ${activeMenu === 'Policies' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`${activeMenu === 'Policies' ? 'text-right' : 'text-left'}`}>
                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15 }}
                      className="text-noir font-semibold text-base uppercase tracking-[0.15em] mb-6"
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
                              className="block text-noir/70 hover:text-noir text-base uppercase tracking-widest transition-colors duration-300"
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
        )}
      </AnimatePresence>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-background md:hidden"
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-foreground p-2"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="absolute top-6 left-6">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                <img src={claspNavLogo} alt="Clasp" className="h-8 w-auto" />
              </Link>
            </div>

            <div className="flex flex-col items-center justify-center h-full px-8">
              <nav className="space-y-8 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <p className="text-accent uppercase tracking-[0.3em] text-sm mb-4">Collection</p>
                  <div className="space-y-4">
                    {navItems[0].children?.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-foreground text-xl font-serif hover:text-accent transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-accent uppercase tracking-[0.3em] text-sm mb-4">About</p>
                  <div className="space-y-4">
                    <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block text-foreground text-xl font-serif hover:text-accent transition-colors">
                      Our Story
                    </Link>
                    <Link to="/event" onClick={() => setMobileMenuOpen(false)} className="block text-foreground text-xl font-serif hover:text-accent transition-colors">
                      Event
                    </Link>
                    <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block text-foreground text-xl font-serif hover:text-accent transition-colors">
                      Contact
                    </Link>
                    <Link to="/faq" onClick={() => setMobileMenuOpen(false)} className="block text-foreground text-xl font-serif hover:text-accent transition-colors">
                      FAQ
                    </Link>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-accent uppercase tracking-[0.3em] text-sm mb-4">Policies</p>
                  <div className="space-y-4">
                    {rightNavItems[2].children?.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-foreground text-xl font-serif hover:text-accent transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
