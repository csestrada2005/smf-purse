import { motion } from 'framer-motion';
import { FullPageSection } from './FullPageScroll';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import productMain from '@/assets/product-main.png';

const features = [
  {
    title: "Full-Grain Leather",
    description: "Sourced from the world's finest tanneries."
  },
  {
    title: "Gold-Tone Hardware",
    description: "Every clasp and chain, built to last."
  },
  {
    title: "Timeless Silhouette",
    description: "A shape that commands attention in any room."
  },
  {
    title: "Artisan Craftsmanship",
    description: "Handcrafted with obsessive attention to detail."
  }
];

const FeaturesSection = () => {
  return (
    <FullPageSection id="craft" className="bg-section-4">
      <div className="flex-1 flex items-center justify-center px-6 sm:px-12">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-24 items-center">
            {/* Left: Product Image */}
            <motion.div 
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: false }}
            >
              <div className="aspect-square flex items-center justify-center max-h-[50vh] lg:max-h-none pl-4 lg:pl-0">
                <motion.img 
                  src={productMain}
                  alt="Clasp purse interior view"
                  className="w-full h-full object-contain p-4 lg:p-8"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </motion.div>

            {/* Right: Features */}
            <div className="order-1 lg:order-2 pt-14 lg:pt-0">
              <motion.div 
                className="mb-6 sm:mb-10 lg:mb-14 text-center lg:text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: false }}
              >
                <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-gold uppercase tracking-[0.04em]">
                  Intentional Design
                </h2>
              </motion.div>

              {/* Desktop: border-left list */}
              <div className="hidden lg:block space-y-10">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    className="border-l border-accent/20 pl-6 hover:border-accent transition-colors duration-300"
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      ease: [0.16, 1, 0.3, 1], 
                      delay: 0.15 + index * 0.08 
                    }}
                    viewport={{ once: false }}
                  >
                    <h3 className="text-foreground text-sm sm:text-base uppercase tracking-[0.2em] mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-base sm:text-lg">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Mobile: Accordion dropdowns */}
              <motion.div
                className="lg:hidden"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                viewport={{ once: false }}
              >
                <Accordion type="multiple" className="w-full">
                  {features.map((feature) => (
                    <AccordionItem key={feature.title} value={feature.title} className="border-foreground/10">
                      <AccordionTrigger className="text-xs uppercase tracking-widest text-foreground hover:no-underline py-3">
                        {feature.title}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </FullPageSection>
  );
};

export default FeaturesSection;
