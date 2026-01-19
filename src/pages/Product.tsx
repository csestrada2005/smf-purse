import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { FullPageContainer, FullPageSection } from '@/components/FullPageScroll';
import purseSilhouette from '@/assets/purse-silhouette.jpeg';
import purseGoldSide from '@/assets/purse-gold-side.png';
import purseGoldFront from '@/assets/purse-gold-front.png';
import purseGoldOpen from '@/assets/purse-gold-open.png';

const Product = () => {
  return (
    <div className="h-screen overflow-hidden bg-background">
      <Navigation />
      <FullPageContainer>
        {/* Hero with Silhouette */}
        <FullPageSection className="bg-background">
          <div className="flex-1 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img 
                src={purseSilhouette} 
                alt="Clasp purse silhouette" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-background/40" />
            </div>
            
            <div className="relative z-10 text-center px-6">
              <motion.p 
                className="text-gold uppercase tracking-[0.3em] text-xs mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                The Signature
              </motion.p>
              <motion.h1 
                className="font-serif text-4xl sm:text-5xl md:text-7xl text-foreground mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                The Design
              </motion.h1>
              <motion.p 
                className="text-cream/80 text-lg max-w-xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                A glimpse into the craftsmanship behind your statement piece.
                <span className="text-foreground"> Luxury meets purpose.</span>
              </motion.p>
            </div>

            {/* Scroll indicator */}
            <motion.div 
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-px h-12 bg-gradient-to-b from-gold/50 to-transparent"
              />
            </motion.div>
          </div>
        </FullPageSection>

        {/* Side View */}
        <FullPageSection className="bg-section-2">
          <div className="flex-1 flex items-center justify-center px-6 sm:px-12">
            <div className="max-w-4xl mx-auto w-full">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="bg-muted/5 p-12 flex items-center justify-center mb-8">
                  <img 
                    src={purseGoldSide} 
                    alt="Clasp purse - side view" 
                    className="w-full max-w-lg h-auto"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-serif text-2xl text-foreground mb-2">The Profile</h3>
                  <p className="text-cream/70">Sleek silhouette with signature gold accents</p>
                </div>
              </motion.div>
            </div>
          </div>
        </FullPageSection>

        {/* Two Column Views */}
        <FullPageSection className="bg-section-3">
          <div className="flex-1 flex items-center justify-center px-6 sm:px-12">
            <div className="max-w-6xl mx-auto w-full">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Front View */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-muted/5 p-8 flex items-center justify-center aspect-square mb-6">
                    <img 
                      src={purseGoldFront} 
                      alt="Clasp purse - front view" 
                      className="w-full max-w-xs h-auto"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="font-serif text-xl text-foreground mb-2">The Facade</h3>
                    <p className="text-cream/70 text-sm">Commanding presence, understated elegance</p>
                  </div>
                </motion.div>

                {/* Open View */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-muted/5 p-8 flex items-center justify-center aspect-square mb-6">
                    <img 
                      src={purseGoldOpen} 
                      alt="Clasp purse - interior view" 
                      className="w-full max-w-sm h-auto"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="font-serif text-xl text-foreground mb-2">The Interior</h3>
                    <p className="text-cream/70 text-sm">Thoughtfully designed compartments</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </FullPageSection>

        {/* Features */}
        <FullPageSection className="bg-section-4">
          <div className="flex-1 flex items-center justify-center px-6 sm:px-12">
            <div className="max-w-6xl mx-auto w-full">
              <div className="grid sm:grid-cols-3 gap-12">
                {[
                  {
                    title: "Premium Leather",
                    description: "Crafted from the finest Indian leather with meticulous attention to detail"
                  },
                  {
                    title: "Gold Hardware",
                    description: "Signature brass accents that elevate the design to statement status"
                  },
                  {
                    title: "Hidden Strength",
                    description: "The metal accent that whispers confidence and shouts independence"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
                      <span className="text-gold text-lg">✦</span>
                    </div>
                    <h3 className="font-serif text-lg text-foreground mb-3">{feature.title}</h3>
                    <p className="text-cream/70 text-sm leading-relaxed">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </FullPageSection>

        <Footer />
      </FullPageContainer>
    </div>
  );
};

export default Product;
