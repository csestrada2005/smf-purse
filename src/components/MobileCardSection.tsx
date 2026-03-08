import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useScrollLock } from './FullPageScroll';

interface CardData {
  image: string;
  label: string;
  link: string;
  alt?: string;
}

interface MobileCardSectionProps {
  cards: [CardData, CardData];
}

const MobileCardSection = ({ cards }: MobileCardSectionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasAppeared, setHasAppeared] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const touchStartY = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { lockScroll, unlockScroll } = useScrollLock();
  const isLockedRef = useRef(false);

  // Observe when section is in view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting && entry.intersectionRatio > 0.8;
        setIsInView(inView);
      },
      { threshold: 0.8 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Lock scroll when section enters view (card 0 is showing), unlock when leaving
  useEffect(() => {
    if (isInView && activeIndex === 0) {
      lockScroll();
      isLockedRef.current = true;
    }
    if (!isInView) {
      if (isLockedRef.current) {
        unlockScroll();
        isLockedRef.current = false;
      }
      setActiveIndex(0);
      setHasAppeared(false);
    }
  }, [isInView]);

  // Handle wheel and touch to swap cards and control lock
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !isInView) return;

    const handleWheel = (e: WheelEvent) => {
      if (activeIndex === 0 && e.deltaY > 0) {
        // Show second card, keep locked
        e.preventDefault();
        setActiveIndex(1);
      } else if (activeIndex === 1 && e.deltaY < 0) {
        // Go back to first card, re-lock
        e.preventDefault();
        setActiveIndex(0);
        lockScroll();
        isLockedRef.current = true;
      } else if (activeIndex === 1 && e.deltaY > 0) {
        // Unlock and let user scroll to next section
        unlockScroll();
        isLockedRef.current = false;
      } else if (activeIndex === 0 && e.deltaY < 0) {
        // Unlock and let user scroll to previous section
        unlockScroll();
        isLockedRef.current = false;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      const threshold = 40;

      if (activeIndex === 0 && deltaY > threshold) {
        // Show second card
        setActiveIndex(1);
      } else if (activeIndex === 1 && deltaY < -threshold) {
        // Go back to first card
        setActiveIndex(0);
        lockScroll();
        isLockedRef.current = true;
      } else if (activeIndex === 1 && deltaY > threshold) {
        // Unlock to scroll to next section
        unlockScroll();
        isLockedRef.current = false;
      } else if (activeIndex === 0 && deltaY < -threshold) {
        // Unlock to scroll to previous section
        unlockScroll();
        isLockedRef.current = false;
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isInView, activeIndex, lockScroll, unlockScroll]);

  const card = cards[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="h-screen w-full snap-start snap-always flex flex-col overflow-hidden relative bg-background"
    >
      <div className="flex-1 flex items-center justify-center px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: hasAppeared ? 0 : 1 }}
          viewport={{ once: false, amount: 0.5 }}
          onAnimationComplete={() => setHasAppeared(true)}
          className="w-full max-w-sm"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to={card.link} className="group block">
                <div className="overflow-hidden mb-5">
                  <motion.img
                    src={card.image}
                    alt={card.alt || card.label}
                    className="w-full h-auto object-cover"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
                <p className="text-accent text-xs uppercase tracking-[0.25em] text-center group-hover:text-foreground transition-colors duration-300">
                  {card.label}
                </p>
              </Link>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default MobileCardSection;
