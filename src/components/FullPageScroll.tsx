import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const FullPageContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory overscroll-none scroll-snap-stop">
      {children}
    </div>
  );
};

export const FullPageSection = ({ children, className = '', id }: SectionProps) => {
  return (
    <section 
      id={id}
      className={`h-screen w-full snap-start snap-always flex flex-col overflow-hidden relative ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 1.02 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ 
          duration: 0.4, 
          ease: [0.76, 0, 0.24, 1], // Aggressive ease - fast start, hard stop
        }}
        viewport={{ once: false, amount: 0.5 }}
        className="flex-1 flex flex-col relative z-10"
      >
        {children}
      </motion.div>
      
      {/* Hard edge overlay effect */}
      <motion.div 
        className="absolute inset-0 bg-background pointer-events-none z-20"
        initial={{ scaleY: 1, originY: 0 }}
        whileInView={{ scaleY: 0 }}
        transition={{ 
          duration: 0.3, 
          ease: [0.9, 0, 0.1, 1], // Very aggressive - almost instant
          delay: 0.05
        }}
        viewport={{ once: false, amount: 0.3 }}
      />
    </section>
  );
};
