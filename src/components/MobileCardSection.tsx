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
  const transitioningRef = useRef(false);
  const { lock, unlock, containerRef } = useScrollLock();

  // Preload all images on mount so they are cached and decode immediately
  useEffect(() => {
    cards.forEach((card) => {
      const img = new Image();
      img.src = card.image;
    });
  }, [cards]);

  // Returns true when this section is exactly snapped into the viewport.
  // Uses a synchronous scroll-position check so it never races with async observers.
  const isSnapped = useCallback(() => {
    const container = containerRef.current;
    const section = sectionRef.current;
    if (!container || !section) return false;
    return Math.abs(container.scrollTop - section.offsetTop) < 5;
  }, [containerRef]);

  const scrollToSibling = useCallback((direction: 'next' | 'prev') => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const sibling = direction === 'next'
      ? section.nextElementSibling as HTMLElement
      : section.previousElementSibling as HTMLElement;

    if (sibling) {
      transitioningRef.current = true;
      container.scrollTo({ top: sibling.offsetTop, behavior: 'smooth' });
      setTimeout(() => {
        transitioningRef.current = false;
      }, 800);
    }
  }, [containerRef]);

  const swap = useCallback((newIndex: number) => {
    if (cooldownRef.current) return;
    cooldownRef.current = true;
    activeRef.current = newIndex;
    setActiveIndex(newIndex);
    setTimeout(() => {
      cooldownRef.current = false;
    }, 700);
  }, []);

  // Wheel handler — uses isSnapped() (synchronous) to avoid the race condition
  // that occurs when relying solely on the async IntersectionObserver.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleWheel = (e: WheelEvent) => {
      if (!isSnapped()) {
        // Left the section — reset in-view flag so the next entry re-initialises state
        if (isInViewRef.current) {
          isInViewRef.current = false;
        }
        return;
      }

      // First wheel event after snapping into view — initialise state immediately
      // without waiting for the async IntersectionObserver.
      if (!isInViewRef.current) {
        isInViewRef.current = true;
        completedRef.current = false;
        cooldownRef.current = false;

        // Infer entry direction from the current scroll delta:
        // scrolling down → entered from above → show first card
        // scrolling up   → entered from below → show last card
        if (e.deltaY > 0) {
          activeRef.current = 0;
          setActiveIndex(0);
        } else {
          activeRef.current = cards.length - 1;
          setActiveIndex(cards.length - 1);
        }

        lock();
      }

      e.preventDefault();
      e.stopPropagation();

      if (completedRef.current) return;
      if (cooldownRef.current) return;

      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      if (activeRef.current === 0 && scrollingDown) {
        swap(1);
      } else if (activeRef.current === 1 && scrollingUp) {
        swap(0);
      } else if (activeRef.current === 1 && scrollingDown) {
        completedRef.current = true;
        unlock();
        scrollToSibling('next');
      } else if (activeRef.current === 0 && scrollingUp) {
        completedRef.current = true;
        unlock();
        scrollToSibling('prev');
      }
    };

    section.addEventListener('wheel', handleWheel, { passive: false });
    return () => section.removeEventListener('wheel', handleWheel);
  }, [cards.length, isSnapped, swap, lock, unlock, scrollToSibling]);

  // Touch handlers
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isSnapped() || cooldownRef.current || completedRef.current) return;

      const endY = e.changedTouches[0].clientY;
      const delta = touchStartY.current - endY;
      const threshold = 30;

      if (activeRef.current === 0 && delta > threshold) {
        swap(1);
      } else if (activeRef.current === 1 && delta < -threshold) {
        swap(0);
      } else if (activeRef.current === 1 && delta > threshold) {
        completedRef.current = true;
        unlock();
        scrollToSibling('next');
      } else if (activeRef.current === 0 && delta < -threshold) {
        completedRef.current = true;
        unlock();
        scrollToSibling('prev');
      }
    };

    section.addEventListener('touchstart', handleTouchStart, { passive: true });
    section.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      section.removeEventListener('touchstart', handleTouchStart);
      section.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isSnapped, swap, unlock, scrollToSibling]);

  // IntersectionObserver — used as a complementary mechanism for lock() (which
  // is needed to block touchmove at the container level) and for direction-aware
  // card initialisation on slower devices where wheel events haven't fired yet.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (transitioningRef.current) return;

          isInViewRef.current = true;

          const sectionTop = entry.boundingClientRect.top;
          const rootTop = entry.rootBounds?.top ?? 0;
          const rootHeight = entry.rootBounds?.height ?? window.innerHeight;
          const rootCenter = rootTop + rootHeight / 2;

          if (sectionTop > rootCenter) {
            activeRef.current = cards.length - 1;
            setActiveIndex(cards.length - 1);
          } else {
            activeRef.current = 0;
            setActiveIndex(0);
          }

          cooldownRef.current = false;
          completedRef.current = false;
          lock();
        } else {
          isInViewRef.current = false;
        }
      },
      { threshold: 0.5, root: containerRef.current }
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      unlock();
    };
  }, [cards.length, lock, unlock, containerRef]);

  const activeCard = cards[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="h-screen w-full snap-start snap-always flex flex-col overflow-hidden relative bg-background"
    >
      <div className="flex-1 flex items-center justify-center px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-sm md:max-w-md lg:max-w-xl"
          >
            <Link to={activeCard.link} className="group block">
              <div className="overflow-hidden mb-5">
                <img
                  src={activeCard.image}
                  alt={activeCard.alt || activeCard.label}
                  className="w-full h-auto object-cover"
                  loading="eager"
                  decoding="async"
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
