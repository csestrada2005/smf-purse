import { ReactNode, createContext, useContext, useRef, useEffect, useCallback, RefObject } from 'react';

interface ScrollLockContextType {
  lock: () => void;
  unlock: () => void;
  containerRef: RefObject<HTMLDivElement | null>;
}

const ScrollLockContext = createContext<ScrollLockContextType>({
  lock: () => {},
  unlock: () => {},
  containerRef: { current: null },
});

export const useScrollLock = () => useContext(ScrollLockContext);

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const FullPageContainer = ({ children }: { children: ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lockedRef = useRef(false);

  const lock = useCallback(() => {
    lockedRef.current = true;
  }, []);

  const unlock = useCallback(() => {
    lockedRef.current = false;
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (lockedRef.current) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (lockedRef.current) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <ScrollLockContext.Provider value={{ lock, unlock, containerRef }}>
      <div
        ref={containerRef}
        className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth overscroll-none"
      >
        {children}
      </div>
    </ScrollLockContext.Provider>
  );
};

export const FullPageSection = ({ children, className = '', id }: SectionProps) => {
  return (
    <section
      id={id}
      className={`h-screen w-full snap-start snap-always flex flex-col overflow-hidden relative ${className}`}
    >
      <div className="flex-1 flex flex-col relative z-10">
        {children}
      </div>
    </section>
  );
};
