import { ReactNode, createContext, useContext, useRef, RefObject } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

interface ScrollLockContextType {
  containerRef: RefObject<HTMLDivElement | null>;
  lockScroll: () => void;
  unlockScroll: () => void;
}

const ScrollLockContext = createContext<ScrollLockContextType>({
  containerRef: { current: null },
  lockScroll: () => {},
  unlockScroll: () => {},
});

export const useScrollLock = () => useContext(ScrollLockContext);

export const FullPageContainer = ({ children }: { children: ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const lockScroll = () => {
    const el = containerRef.current;
    if (el) {
      el.style.overflow = 'hidden';
    }
  };

  const unlockScroll = () => {
    const el = containerRef.current;
    if (el) {
      el.style.overflow = '';
    }
  };

  return (
    <ScrollLockContext.Provider value={{ containerRef, lockScroll, unlockScroll }}>
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
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ 
          duration: 1.2, 
          ease: [0.22, 1, 0.36, 1],
        }}
        viewport={{ once: false, amount: 0.3 }}
        className="flex-1 flex flex-col relative z-10"
      >
        {children}
      </motion.div>
    </section>
  );
};
