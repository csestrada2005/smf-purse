import { useState, useRef, useEffect } from 'react';
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
  const activeRef = useRef(0); // mirror of activeIndex for event handlers

  // Keep ref in sync
  useEffect(() => {
    activeRef.current = activeIndex;
  }, [activeIndex]);

  // Observe when section is in view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting && entry.intersectionRatio > 0.8),
      { threshold: 0.8 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Lock on enter, unlock + reset on leave
  useEffect(() => {
    if (isInView) {
      lockScroll();
    } else {
      unlockScroll();
      setActiveIndex(0);
      setHasAppeared(false);
    }
  }, [isInView]);

  // Attach wheel + touch handlers to the section
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !isInView) return;

    const advance = () => {
      if (activeRef.current === 0) {
        setActiveIndex(1);
      } else {
        // Second card visible, scrolling down → unlock to go to next section
        unlockScroll();
      }
    };

    const retreat = () => {
      if (activeRef.current === 1) {
        setActiveIndex(0);
        lockScroll(); // re-lock since we're back on card 0
      } else {
        // First card visible, scrolling up → unlock to go back to pre-section
        unlockScroll();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 5) {
        e.preventDefault();
        advance();
      } else if (e.deltaY < -5) {
        e.preventDefault();
        retreat();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Always prevent default to stop the snap container from scrolling
      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      if (deltaY > 40) {
        advance();
      } else if (deltaY < -40) {
        retreat();
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isInView, lockScroll, unlockScroll]);

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
