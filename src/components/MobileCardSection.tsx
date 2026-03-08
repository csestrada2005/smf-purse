import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

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
  const lockedRef = useRef(false);

  // Observe when section is in view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting && entry.intersectionRatio > 0.8);
      },
      { threshold: 0.8 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Reset index when section leaves view
  useEffect(() => {
    if (!isInView) {
      setActiveIndex(0);
      setHasAppeared(false);
    }
  }, [isInView]);

  // Block parent snap scroll when we need to swap cards
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !isInView) return;

    const parent = el.closest('.snap-y') as HTMLElement | null;
    if (!parent) return;

    const handleWheel = (e: WheelEvent) => {
      // If showing first card and scrolling down → swap to second, block parent
      if (activeIndex === 0 && e.deltaY > 0) {
        e.preventDefault();
        e.stopPropagation();
        setActiveIndex(1);
        return;
      }
      // If showing second card and scrolling up → swap to first, block parent
      if (activeIndex === 1 && e.deltaY < 0) {
        e.preventDefault();
        e.stopPropagation();
        setActiveIndex(0);
        return;
      }
      // Otherwise let parent handle (scroll to next/prev section)
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      lockedRef.current = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const deltaY = touchStartY.current - e.touches[0].clientY;
      const threshold = 10;

      // Determine if we need to intercept
      if (activeIndex === 0 && deltaY > threshold && !lockedRef.current) {
        e.preventDefault();
        lockedRef.current = true;
      } else if (activeIndex === 1 && deltaY < -threshold && !lockedRef.current) {
        e.preventDefault();
        lockedRef.current = true;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      const threshold = 40;

      if (activeIndex === 0 && deltaY > threshold) {
        setActiveIndex(1);
      } else if (activeIndex === 1 && deltaY < -threshold) {
        setActiveIndex(0);
      }
      lockedRef.current = false;
    };

    // Attach to the parent snap container to intercept before it scrolls
    parent.addEventListener('wheel', handleWheel, { passive: false });
    parent.addEventListener('touchstart', handleTouchStart, { passive: true });
    parent.addEventListener('touchmove', handleTouchMove, { passive: false });
    parent.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      parent.removeEventListener('wheel', handleWheel);
      parent.removeEventListener('touchstart', handleTouchStart);
      parent.removeEventListener('touchmove', handleTouchMove);
      parent.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isInView, activeIndex]);

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
