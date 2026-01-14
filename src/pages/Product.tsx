import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import purseViewsImage from '@/assets/purse-views.png';
import purseOpenImage from '@/assets/purse-open.png';

const Product = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <motion.div 
          className="text-center px-6"
          style={{ y, opacity }}
        >
          <motion.p 
            className="text-accent uppercase tracking-[0.3em] text-xs mb-6"
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
            className="text-muted-foreground text-lg max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            A glimpse into the craftsmanship behind your statement piece.
            <span className="text-foreground"> Luxury meets purpose.</span>
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-foreground/50 to-transparent"
          />
        </motion.div>
      </section>

      {/* Product Images */}
      <section className="py-32 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Main Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="bg-muted/5 p-12 flex items-center justify-center">
              <img 
                src={purseViewsImage} 
                alt="Clasp purse - multiple views" 
                className="w-full max-w-4xl h-auto"
              />
            </div>
            <div className="mt-8 text-center">
              <h3 className="font-serif text-xl text-foreground mb-2">Multiple Views</h3>
              <p className="text-muted-foreground text-sm">Every angle designed with intention</p>
            </div>
          </motion.div>

          {/* Interior Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-muted/5 p-12 flex items-center justify-center">
              <img 
                src={purseOpenImage} 
                alt="Clasp purse - interior view" 
                className="w-full max-w-2xl h-auto"
              />
            </div>
            <div className="mt-8 text-center">
              <h3 className="font-serif text-xl text-foreground mb-2">The Interior</h3>
              <p className="text-muted-foreground text-sm">Luxurious purple velvet lining with hidden compartments</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-32 px-6 sm:px-12 border-t border-accent/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-16">
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
                <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-accent text-lg">✦</span>
                </div>
                <h3 className="font-serif text-lg text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Product;
