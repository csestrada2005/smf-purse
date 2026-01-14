import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const StorySection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -80]);

  return (
    <section ref={containerRef} id="story" className="relative py-32 px-6 sm:px-12 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-transparent" />
      
      <motion.div 
        className="relative max-w-4xl mx-auto text-center"
        style={{ opacity, y }}
      >
        <p className="text-accent uppercase tracking-[0.3em] text-xs mb-8">
          Our Philosophy
        </p>
        
        <blockquote className="relative">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-accent/10 text-9xl font-serif select-none">"</div>
          
          <motion.p 
            className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-relaxed mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            In a world that tells women to shrink,
            <span className="text-accent"> we chose to craft boldness.</span>
          </motion.p>
          
          <motion.p 
            className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Every clasp, every stitch, every golden accent—designed for women who refuse to ask for permission to feel safe. 
            <span className="text-foreground"> This is not just a bag. It's a statement of independence.</span>
          </motion.p>
        </blockquote>
        
        <motion.div 
          className="w-16 h-px bg-accent mx-auto mt-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        />
      </motion.div>
    </section>
  );
};

export default StorySection;
