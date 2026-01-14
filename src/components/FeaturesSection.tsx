import { motion } from 'framer-motion';
import { FullPageSection } from './FullPageScroll';

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
  return (
    <FullPageSection id="craft" className="bg-section-4 pt-20">
      <div className="flex-1 flex items-center justify-center px-6 sm:px-12">
        <div className="max-w-6xl mx-auto w-full">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
          >
            <p className="text-accent uppercase tracking-[0.3em] text-xs mb-3">
              The Craft
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground">
              Intentional Design
            </h2>
          </motion.div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: false }}
              >
                <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-accent text-xl">✦</span>
                </div>
                <h3 className="font-serif text-lg text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </FullPageSection>
  );
};

export default FeaturesSection;
