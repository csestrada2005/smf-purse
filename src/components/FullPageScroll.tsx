import { ReactNode, createContext, useContext, useRef, useCallback, Children, RefObject, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Keyboard } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
// @ts-ignore
import 'swiper/css';

interface ScrollLockContextType {
  lock: () => void;
  unlock: () => void;
  swiperRef: RefObject<SwiperType | null>;
  activeIndex: number;
}

const ScrollLockContext = createContext<ScrollLockContextType>({
  lock: () => {},
  unlock: () => {},
  swiperRef: { current: null },
  activeIndex: 0,
});

export const useScrollLock = () => useContext(ScrollLockContext);

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

/** Wrap the entire page (Navigation + FullPageContainer) in this provider */
export const ScrollLockProvider = ({ children }: { children: ReactNode }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

  const contextValue = { lock, unlock, swiperRef, activeIndex, _setActiveIndex: setActiveIndex };

  return (
    <ScrollLockContext.Provider value={contextValue}>
      {children}
    </ScrollLockContext.Provider>
  );
};

export const FullPageContainer = ({ children }: { children: ReactNode }) => {
  const { swiperRef, ...ctx } = useScrollLock();
  // Access the internal setter via the context object
  const setActiveIndex = (ctx as any)._setActiveIndex as ((idx: number) => void) | undefined;

  const slides = Children.toArray(children);

  return (
    <Swiper
      onSwiper={(swiper) => { swiperRef.current = swiper; }}
      onSlideChange={(swiper) => { setActiveIndex?.(swiper.activeIndex); }}
      direction="vertical"
      slidesPerView={1}
      mousewheel={{ forceToAxis: true, sensitivity: 1, thresholdDelta: 30, thresholdTime: 500 }}
      speed={600}
      modules={[Mousewheel, Keyboard]}
      className="h-screen w-full"
      touchRatio={1}
      threshold={10}
      resistance
      resistanceRatio={0}
      preventInteractionOnTransition
      keyboard={{ enabled: true }}
    >
      {slides.map((child, i) => (
        <SwiperSlide key={i} className="!h-screen !overflow-hidden">
          {child}
        </SwiperSlide>
      ))}
    </Swiper>
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
