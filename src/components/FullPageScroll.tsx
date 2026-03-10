import { ReactNode, createContext, useContext, useRef, useCallback, Children, RefObject } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
// @ts-ignore
import 'swiper/css';

interface ScrollLockContextType {
  lock: () => void;
  unlock: () => void;
  swiperRef: RefObject<SwiperType | null>;
}

const ScrollLockContext = createContext<ScrollLockContextType>({
  lock: () => {},
  unlock: () => {},
  swiperRef: { current: null },
});

export const useScrollLock = () => useContext(ScrollLockContext);

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const FullPageContainer = ({ children }: { children: ReactNode }) => {
  const swiperRef = useRef<SwiperType | null>(null);

  const lock = useCallback(() => {
    if (swiperRef.current) {
      swiperRef.current.allowSlideNext = false;
      swiperRef.current.allowSlidePrev = false;
      swiperRef.current.allowTouchMove = false;
    }
  }, []);

  const unlock = useCallback(() => {
    if (swiperRef.current) {
      swiperRef.current.allowSlideNext = true;
      swiperRef.current.allowSlidePrev = true;
      swiperRef.current.allowTouchMove = true;
    }
  }, []);

  const slides = Children.toArray(children);

  return (
    <ScrollLockContext.Provider value={{ lock, unlock, swiperRef }}>
      <Swiper
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        direction="vertical"
        slidesPerView={1}
        mousewheel={{ forceToAxis: true, sensitivity: 1 }}
        speed={600}
        modules={[Mousewheel]}
        className="h-screen w-full"
        touchRatio={1}
        threshold={10}
        resistance
        resistanceRatio={0}
      >
        {slides.map((child, i) => (
          <SwiperSlide key={i} className="!h-screen">
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
    </ScrollLockContext.Provider>
  );
};

export const FullPageSection = ({ children, className = '', id }: SectionProps) => {
  return (
    <section
      id={id}
      className={`h-screen w-full flex flex-col overflow-hidden relative ${className}`}
    >
      <div className="flex-1 flex flex-col relative z-10">
        {children}
      </div>
    </section>
  );
};
