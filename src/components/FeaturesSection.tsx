import { motion } from 'framer-motion';
import { FullPageSection } from './FullPageScroll';
import purseGoldOpen from '@/assets/purse-gold-open.png';

const features = [
  {
    title: "Premium Leather",
    description: "Crafted from the finest Indian leather."
  },
  {
    title: "Gold Hardware",
    description: "Signature brass accents that elevate."
  },
  {
    title: "Hidden Strength",
    description: "A concealed element of confidence."
  },
  {
    title: "Made in India",
    description: "Handcrafted with intention and care."
  }
];

const FeaturesSection = () => {
  return (
    <FullPageSection id="craft" className="bg-section-4 pt-20">
      <div className="flex-1 flex items-center justify-center px-6 sm:px-12">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Product Image */}
            <motion.div 
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: false }}
            >
              <div className="aspect-square bg-muted/5 flex items-center justify-center">
                <motion.img 
                  src={purseGoldOpen}
                  alt="Clasp purse interior view"
                  className="w-full h-full object-contain p-8"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </motion.div>

            {/* Right: Features */}
            <div className="order-1 lg:order-2">
              <motion.div 
                className="mb-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: false }}
              >
                <p className="text-accent uppercase tracking-[0.3em] text-xs mb-4">
                  The Craft
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl text-foreground">
                  Intentional Design
                </h2>
              </motion.div>

              {/* Features List */}
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    className="border-l-2 border-accent/20 pl-6 hover:border-accent transition-colors duration-500"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.8, 
                      ease: [0.22, 1, 0.36, 1], 
                      delay: 0.2 + index * 0.1 
                    }}
                    viewport={{ once: false }}
                  >
                    <h3 className="text-foreground text-sm uppercase tracking-[0.15em] mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </FullPageSection>
  );
};

export default FeaturesSection;
