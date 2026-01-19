import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { FullPageContainer, FullPageSection } from '@/components/FullPageScroll';
import purseSilhouette from '@/assets/purse-silhouette.jpeg';
import purseGoldOpen from '@/assets/purse-gold-open.png';

const features = [
  {
    title: "Premium Leather",
    description: "Crafted from the finest Indian leather with natural grain that tells its own story."
  },
  {
    title: "Gold Hardware",
    description: "Signature gold-plated brass accents that elevate every detail."
  },
  {
    title: "Hidden Strength",
    description: "A concealed metal element—your secret statement of confidence and independence."
  },
  {
    title: "Made in India",
    description: "Handcrafted by skilled artisans with over 40 hours of meticulous work."
  }
];

const Signature = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <FullPageContainer>
        {/* Hero Section - Full Bleed with Silhouette */}
        <FullPageSection className="relative">
          {/* Background Image with Burgundy Overlay */}
          <div className="absolute inset-0">
            <img 
              src={purseSilhouette}
              alt="The Signature silhouette"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-burgundy/70 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-b from-noir/30 via-transparent to-noir/50" />
          </div>
          
          {/* Centered Content */}
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6 relative z-10">
            <motion.p 
              className="text-gold uppercase tracking-[0.4em] text-xs sm:text-sm mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              The Signature
            </motion.p>
            
            <motion.h1 
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              The Design
            </motion.h1>
            
            <motion.p 
              className="text-cream/90 text-base sm:text-lg max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              A glimpse into the craftsmanship behind your statement piece.{' '}
              <span className="text-foreground font-medium">Luxury meets purpose.</span>
            </motion.p>
          </div>
          
          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-gold/50 to-gold" />
          </motion.div>
        </FullPageSection>

        {/* Philosophy Section */}
        <FullPageSection className="bg-section-3">
          <div className="flex-1 flex items-center justify-center px-6 sm:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <motion.p 
                className="text-gold uppercase tracking-[0.3em] text-xs mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: false }}
              >
                Our Philosophy
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                viewport={{ once: false }}
              >
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground leading-relaxed mb-8">
                  In a world that tells women to shrink,
                  <motion.span 
                    className="text-accent block mt-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    viewport={{ once: false }}
                  >
                    we chose to craft boldness.
                  </motion.span>
                </h2>
                
                <motion.p 
                  className="text-cream/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  viewport={{ once: false }}
                >
                  Every clasp, every stitch, every golden accent—designed for women who refuse to ask for permission to feel safe. 
                  <span className="text-foreground"> This is not just a bag. It's a statement of independence.</span>
                </motion.p>
              </motion.div>
              
              <motion.div 
                className="w-16 h-px bg-accent mx-auto mt-10 origin-center"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 1 }}
                viewport={{ once: false }}
              />
            </div>
          </div>
        </FullPageSection>

        {/* Craft Section */}
        <FullPageSection className="bg-section-4">
          <div className="flex-1 flex items-center justify-center px-6 sm:px-12">
            <div className="max-w-6xl mx-auto w-full">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Image */}
                <motion.div 
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: false }}
                  className="order-2 lg:order-1"
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

                {/* Features */}
                <div className="order-1 lg:order-2">
                  <motion.div 
                    className="mb-10"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: false }}
                  >
                    <p className="text-gold uppercase tracking-[0.3em] text-xs mb-4">
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
                        <p className="text-cream/70 text-sm">
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

        {/* Quote Section */}
        <FullPageSection className="bg-section-2">
          <div className="flex-1 flex items-center justify-center px-6 sm:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: false }}
              >
                <p className="font-serif text-2xl sm:text-3xl lg:text-4xl text-foreground leading-relaxed italic mb-8">
                  "I don't need anyone to feel safe."
                </p>
                <p className="text-gold uppercase tracking-[0.3em] text-xs">
                  The Signature Promise
                </p>
              </motion.div>
            </div>
          </div>
        </FullPageSection>

        {/* CTA Section */}
        <FullPageSection className="bg-background">
          <div className="flex-1 flex items-center justify-center px-6 sm:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: false }}
              className="text-center"
            >
              <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-6">
                Own Your Statement
              </h2>
              <p className="text-cream/70 mb-8 max-w-xl mx-auto">
                The Signature is more than an accessory—it's a declaration. 
                Join the women who refuse to shrink.
              </p>
              <Link to="/product">
                <Button className="bg-gold text-noir hover:bg-gold-light px-12 py-6 text-sm tracking-widest uppercase">
                  Shop Now — ₹45,000
                </Button>
              </Link>
            </motion.div>
          </div>
          
          <Footer />
        </FullPageSection>
      </FullPageContainer>
    </div>
  );
};

export default Signature;