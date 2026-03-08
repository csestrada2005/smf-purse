import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FullPageSection } from './FullPageScroll';

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
  const touchStartY = useRef(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (activeIndex === 0 && e.deltaY > 0) {
      e.stopPropagation();
      setActiveIndex(1);
    } else if (activeIndex === 1 && e.deltaY < 0) {
      e.stopPropagation();
      setActiveIndex(0);
    }
    // If activeIndex === 0 && scrolling up, or activeIndex === 1 && scrolling down, let it propagate to snap container
  }, [activeIndex]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;
    const threshold = 40;

    if (activeIndex === 0 && deltaY > threshold) {
      e.stopPropagation();
      setActiveIndex(1);
    } else if (activeIndex === 1 && deltaY < -threshold) {
      e.stopPropagation();
      setActiveIndex(0);
    }
  }, [activeIndex]);

  const card = cards[activeIndex];

  return (
    <FullPageSection className="bg-background">
      <div
        ref={containerRef}
        className="flex-1 flex items-center justify-center px-8"
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
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

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {cards.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                  i === activeIndex ? 'bg-accent' : 'bg-accent/30'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </FullPageSection>
  );
};

export default MobileCardSection;
