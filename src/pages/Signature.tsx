import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import purseGoldFront from '@/assets/purse-gold-front.png';
import purseGoldOpen from '@/assets/purse-gold-open.png';
import purseSketches from '@/assets/purse-sketches.jpeg';
import purseViews from '@/assets/purse-views.png';

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
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="px-6 sm:px-12 lg:px-20 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-gold uppercase tracking-[0.3em] text-xs mb-6">
                  The Signature
                </p>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mb-8 leading-tight">
                  The Design
                </h1>
                <p className="text-cream/80 text-lg leading-relaxed mb-8">
                  More than a bag—a manifestation of strength, elegance, and unapologetic independence. 
                  The Signature was born from a simple belief: every woman deserves to feel powerful 
                  without asking permission.
                </p>
                <Link to="/product">
                  <Button className="bg-gold text-noir hover:bg-gold-light px-8 py-6 text-sm tracking-widest uppercase">
                    Shop The Signature
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="aspect-square bg-section-2 rounded-lg overflow-hidden"
              >
                <img 
                  src={purseGoldFront}
                  alt="The Signature handbag"
                  className="w-full h-full object-contain p-12"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="bg-section-3 py-24 px-6 sm:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <motion.p 
              className="text-gold uppercase tracking-[0.3em] text-xs mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Our Philosophy
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground leading-relaxed mb-8">
                In a world that tells women to shrink,
                <span className="text-accent block mt-3">
                  we chose to craft boldness.
                </span>
              </h2>
              
              <p className="text-cream/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                Every clasp, every stitch, every golden accent—designed for women who refuse to ask for permission to feel safe. 
                <span className="text-foreground"> This is not just a bag. It's a statement of independence.</span>
              </p>
            </motion.div>
            
            <motion.div 
              className="w-16 h-px bg-accent mx-auto mt-10 origin-center"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 1 }}
              viewport={{ once: true }}
            />
          </div>
        </section>

        {/* Craft Section */}
        <section className="bg-section-4 py-24 px-6 sm:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Image */}
              <motion.div 
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
              >
                <div className="aspect-square bg-muted/5 flex items-center justify-center rounded-lg overflow-hidden">
                  <img 
                    src={purseGoldOpen}
                    alt="Clasp purse interior view"
                    className="w-full h-full object-contain p-8"
                  />
                </div>
              </motion.div>

              {/* Features */}
              <div>
                <motion.div 
                  className="mb-10"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
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
                      viewport={{ once: true }}
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
        </section>

        {/* Process Section */}
        <section className="py-24 px-6 sm:px-12">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-gold uppercase tracking-[0.3em] text-xs mb-4">
                The Process
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-6">
                From Vision to Reality
              </h2>
              <p className="text-cream/70 max-w-2xl mx-auto">
                Every Signature bag is a journey—40+ hours of meticulous craftsmanship by skilled 
                Indian artisans who pour their expertise into every detail.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                className="aspect-[4/3] bg-section-2 rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <img 
                  src={purseSketches}
                  alt="Design sketches"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                className="aspect-[4/3] bg-section-2 rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <img 
                  src={purseViews}
                  alt="Multiple views of the purse"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="bg-section-2 py-24 px-6 sm:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <p className="font-serif text-2xl sm:text-3xl lg:text-4xl text-foreground leading-relaxed italic mb-8">
                "I don't need anyone to feel safe."
              </p>
              <p className="text-gold uppercase tracking-[0.3em] text-xs">
                The Signature Promise
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 sm:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
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
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Signature;