import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const FullPageContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth overscroll-none">
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
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ 
          duration: 1.2, 
          ease: [0.22, 1, 0.36, 1], // Smooth, luxurious ease
        }}
        viewport={{ once: false, amount: 0.3 }}
        className="flex-1 flex flex-col relative z-10"
      >
        {children}
      </motion.div>
    </section>
  );
};
