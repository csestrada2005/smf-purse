import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const features = [
  {
    title: "Premium Leather",
    description: "Crafted from the finest Indian leather with meticulous attention to every detail."
  },
  {
    title: "Gold Hardware",
    description: "Signature brass accents that elevate the design to statement status."
  },
  {
    title: "Hidden Strength",
    description: "A concealed element that whispers confidence and shouts independence."
  },
  {
    title: "Made in India",
    description: "Handcrafted by artisans who understand the spirit of Indian women."
  }
];

const FeaturesSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} id="craft" className="relative py-32 px-6 sm:px-12">
      <motion.div 
        className="max-w-6xl mx-auto"
        style={{ opacity }}
      >
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-accent uppercase tracking-[0.3em] text-xs mb-4">
            The Craft
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground">
            Intentional Design
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-accent text-lg">✦</span>
              </div>
              <h3 className="font-serif text-lg text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturesSection;
