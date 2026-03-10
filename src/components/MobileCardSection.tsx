import { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
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
  /** Called when the user scrolls past the last card (down) or before the first (up) */
}

const MobileCardSection = ({ cards }: MobileCardSectionProps) => {
  const activeIndexRef = useRef(0);
  const activeIndex = useRef(0);
  const cooldownRef = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { lock, unlock, swiperRef } = useScrollLock();
  const lockedRef = useRef(false);
  const [, forceRender] = React.useState(0);

  // Preload images
  useEffect(() => {
    cards.forEach((card) => {
      const img = new Image();
      img.src = card.image;
    });
  }, [cards]);

  const setCard = useCallback((index: number) => {
    activeIndex.current = index;
    forceRender((n) => n + 1);
  }, []);

  // When this slide becomes active, lock swiper and reset state
  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    const onSlideChange = () => {
      const slideEl = sectionRef.current;
      if (!slideEl) return;
      const swiperSlide = slideEl.closest('.swiper-slide');
      if (!swiperSlide) return;

      const allSlides = Array.from(swiper.slides);
      const slideIndex = allSlides.indexOf(swiperSlide as HTMLElement);

      if (slideIndex === swiper.activeIndex) {
        // This slide is now active — lock swiper, show first card
        lockedRef.current = true;
        activeIndex.current = 0;
        cooldownRef.current = false;
        forceRender((n) => n + 1);
        lock();
      } else {
        lockedRef.current = false;
      }
    };

    swiper.on('slideChangeTransitionEnd', onSlideChange);
    // Check immediately in case we're already on this slide
    onSlideChange();

    return () => {
      swiper.off('slideChangeTransitionEnd', onSlideChange);
    };
  }, [lock, swiperRef]);

  // Handle wheel events while locked
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleWheel = (e: WheelEvent) => {
      if (!lockedRef.current) return;

      e.preventDefault();
      e.stopPropagation();

      if (cooldownRef.current) return;

      const down = e.deltaY > 0;
      const current = activeIndex.current;

      if (down && current < cards.length - 1) {
        cooldownRef.current = true;
        activeIndex.current = current + 1;
        forceRender((n) => n + 1);
        setTimeout(() => { cooldownRef.current = false; }, 700);
      } else if (!down && current > 0) {
        cooldownRef.current = true;
        activeIndex.current = current - 1;
        forceRender((n) => n + 1);
        setTimeout(() => { cooldownRef.current = false; }, 700);
      } else {
        // At boundary — unlock and let swiper handle
        lockedRef.current = false;
        unlock();
      }
    };

    section.addEventListener('wheel', handleWheel, { passive: false });
    return () => section.removeEventListener('wheel', handleWheel);
  }, [cards.length, unlock]);

  // Handle touch events while locked
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (lockedRef.current) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!lockedRef.current || cooldownRef.current) return;

      const endY = e.changedTouches[0].clientY;
      const delta = touchStartY - endY;
      const threshold = 30;
      const current = activeIndex.current;

      if (delta > threshold && current < cards.length - 1) {
        cooldownRef.current = true;
        activeIndex.current = current + 1;
        forceRender((n) => n + 1);
        setTimeout(() => { cooldownRef.current = false; }, 700);
      } else if (delta < -threshold && current > 0) {
        cooldownRef.current = true;
        activeIndex.current = current - 1;
        forceRender((n) => n + 1);
        setTimeout(() => { cooldownRef.current = false; }, 700);
      } else if ((delta > threshold && current === cards.length - 1) || (delta < -threshold && current === 0)) {
        lockedRef.current = false;
        unlock();
      }
    };

    section.addEventListener('touchstart', handleTouchStart, { passive: true });
    section.addEventListener('touchmove', handleTouchMove, { passive: false });
    section.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      section.removeEventListener('touchstart', handleTouchStart);
      section.removeEventListener('touchmove', handleTouchMove);
      section.removeEventListener('touchend', handleTouchEnd);
    };
  }, [cards.length, unlock]);

  const activeCard = cards[activeIndex.current];

  return (
    <section
      ref={sectionRef}
      className="h-screen w-full flex flex-col overflow-hidden relative bg-background"
    >
      <div className="flex-1 flex items-center justify-center px-8">
        <motion.div
          key={activeIndex.current}
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
      </div>
    </section>
  );
};

export default MobileCardSection;
