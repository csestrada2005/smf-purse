import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useScrollLock } from '@/components/FullPageScroll';

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
  const isInViewRef = useRef(false);
  const completedRef = useRef(false);
  const { lock, unlock } = useScrollLock();

  const swap = useCallback((newIndex: number) => {
    if (cooldownRef.current) return;
    cooldownRef.current = true;
    // Stay locked — don't unlock after swap. The section remains locked
    // until the user scrolls past the boundary (card 1+down or card 0+up).
    activeRef.current = newIndex;
    setActiveIndex(newIndex);
    setTimeout(() => {
      cooldownRef.current = false;
    }, 700);
  }, []);

  // Listen for wheel/touch on the section to detect intent and trigger swaps
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleWheel = (e: WheelEvent) => {
      if (!isInViewRef.current) return;
      if (completedRef.current) return; // Let events pass through

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
      } else if (activeRef.current === 1 && scrollingDown) {
        // Sequence complete: mark done and unlock
        completedRef.current = true;
        unlock();
      } else if (activeRef.current === 0 && scrollingUp) {
        completedRef.current = true;
        unlock();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isInViewRef.current || cooldownRef.current) return;

      const endY = e.changedTouches[0].clientY;
      const delta = touchStartY.current - endY;
      const threshold = 30;

      if (activeRef.current === 0 && delta > threshold) {
        swap(1);
      } else if (activeRef.current === 1 && delta < -threshold) {
        swap(0);
      } else if (activeRef.current === 1 && delta > threshold) {
        // Sequence complete: unlock for next section
        setTimeout(() => unlock(), 0);
      } else if (activeRef.current === 0 && delta < -threshold) {
        // Sequence complete (reverse): unlock for previous section
        setTimeout(() => unlock(), 0);
      }
    };

    section.addEventListener('wheel', handleWheel, { passive: false });
    section.addEventListener('touchstart', handleTouchStart, { passive: true });
    section.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      section.removeEventListener('wheel', handleWheel);
      section.removeEventListener('touchstart', handleTouchStart);
      section.removeEventListener('touchend', handleTouchEnd);
    };
  }, [swap, lock]);

  // Direction-aware intersection observer
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isInViewRef.current = true;
          // Determine scroll direction based on where the section is entering from
          const sectionTop = entry.boundingClientRect.top;
          const rootTop = entry.rootBounds?.top ?? 0;
          const rootHeight = entry.rootBounds?.height ?? window.innerHeight;
          const rootCenter = rootTop + rootHeight / 2;

          // If section top is above center → entered from top (scrolling down) → show card 0
          // If section top is below center → entered from bottom (scrolling up) → show last card
          if (sectionTop > rootCenter) {
            // Entering from bottom (user scrolling up)
            activeRef.current = cards.length - 1;
            setActiveIndex(cards.length - 1);
          } else {
            // Entering from top (user scrolling down)
            activeRef.current = 0;
            setActiveIndex(0);
          }
          cooldownRef.current = false;
          // Lock immediately and STAY locked until user completes the card sequence
          lock();
        } else {
          isInViewRef.current = false;
          // Don't unlock here — only unlock explicitly when sequence completes
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      unlock();
    };
  }, [cards.length, lock, unlock]);

  const activeCard = cards[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="h-screen w-full snap-start snap-always flex flex-col overflow-hidden relative bg-background"
    >
      {/* Preload all images hidden */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ opacity: 0 }}>
        {cards.map((card, i) => (
          <img key={i} src={card.image} alt="" className="w-0 h-0" />
        ))}
      </div>

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
            <Link to={activeCard.link} className="group block">
              <div className="overflow-hidden mb-5">
                <img
                  src={activeCard.image}
                  alt={activeCard.alt || activeCard.label}
                  className="w-full h-auto object-cover"
                />
              </div>
              <p className="text-accent text-xs uppercase tracking-[0.25em] text-center group-hover:text-foreground transition-colors duration-300">
                {activeCard.label}
              </p>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MobileCardSection;
