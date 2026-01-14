import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const FullPageContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      {children}
    </div>
  );
};

export const FullPageSection = ({ children, className = '', id }: SectionProps) => {
  return (
    <section 
      id={id}
      className={`h-screen w-full snap-start snap-always flex flex-col overflow-hidden ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: false, amount: 0.3 }}
        className="flex-1 flex flex-col"
      >
        {children}
      </motion.div>
    </section>
  );
};
