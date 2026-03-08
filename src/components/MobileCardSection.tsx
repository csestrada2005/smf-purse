import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface CardData {
  image: string;
  label: string;
  link: string;
  alt?: string;
}

interface MobileCardSectionProps {
  cards: CardData[];
}

const MobileCardSection = ({ cards }: MobileCardSectionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeRef = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const cooldownRef = useRef(false);
  const touchStartY = useRef(0);

  const swap = useCallback((newIndex: number) => {
    if (cooldownRef.current) return;
    cooldownRef.current = true;
    activeRef.current = newIndex;
    setActiveIndex(newIndex);
    setTimeout(() => {
      cooldownRef.current = false;
    }, 600);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleWheel = (e: WheelEvent) => {
      if (cooldownRef.current) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      if (activeRef.current === 0 && scrollingDown) {
        e.preventDefault();
        e.stopPropagation();
        swap(1);
      } else if (activeRef.current === 1 && scrollingUp) {
        e.preventDefault();
        e.stopPropagation();
        swap(0);
      }
      // else: let native snap-scroll handle it
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const delta = touchStartY.current - e.touches[0].clientY;
      const swipingDown = delta > 10;
      const swipingUp = delta < -10;

      if (cooldownRef.current) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      if (activeRef.current === 0 && swipingDown) {
        e.preventDefault();
        e.stopPropagation();
      } else if (activeRef.current === 1 && swipingUp) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (cooldownRef.current) return;

      const endY = e.changedTouches[0].clientY;
      const delta = touchStartY.current - endY;
      const threshold = 30;

      if (activeRef.current === 0 && delta > threshold) {
        swap(1);
      } else if (activeRef.current === 1 && delta < -threshold) {
        swap(0);
      }
    };

    section.addEventListener('wheel', handleWheel, { passive: false });
    section.addEventListener('touchstart', handleTouchStart, { passive: true });
    section.addEventListener('touchmove', handleTouchMove, { passive: false });
    section.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      section.removeEventListener('wheel', handleWheel);
      section.removeEventListener('touchstart', handleTouchStart);
      section.removeEventListener('touchmove', handleTouchMove);
      section.removeEventListener('touchend', handleTouchEnd);
    };
  }, [swap]);

  // Reset activeIndex when section scrolls into view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          activeRef.current = 0;
          setActiveIndex(0);
          cooldownRef.current = false;
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const card = cards[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="h-screen w-full snap-start snap-always flex flex-col overflow-hidden relative bg-background"
    >
      <div className="flex-1 flex items-center justify-center px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-sm"
          >
            <Link to={card.link} className="group block">
              <div className="overflow-hidden mb-5">
                <img
                  src={card.image}
                  alt={card.alt || card.label}
                  className="w-full h-auto object-cover"
                />
              </div>
              <p className="text-accent text-xs uppercase tracking-[0.25em] text-center group-hover:text-foreground transition-colors duration-300">
                {card.label}
              </p>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MobileCardSection;
