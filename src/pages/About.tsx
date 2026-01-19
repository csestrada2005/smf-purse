import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import purseHeels from '@/assets/purse-heels.png';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <main className="pt-24 pb-16 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-gold uppercase tracking-[0.3em] text-xs mb-6">Our Story</p>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-foreground mb-8 leading-tight">
                About Clasp
              </h1>
              <p className="text-cream/80 text-lg leading-relaxed mb-6">
                Clasp was born from a simple belief: that every woman deserves to carry her confidence 
                with elegance and purpose. We craft luxury accessories that are more than fashion—they 
                are statements of independence and self-assurance.
              </p>
              <p className="text-cream/70 leading-relaxed">
                Our designs blend timeless sophistication with modern functionality, creating pieces 
                that empower the woman who carries them. Each clasp, each stitch, each detail is 
                meticulously considered.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center"
            >
              <img 
                src={purseHeels} 
                alt="Clasp luxury accessories" 
                className="w-full max-w-md h-auto"
              />
            </motion.div>
          </div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-gold uppercase tracking-[0.3em] text-xs mb-4">Our Philosophy</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground">Values We Live By</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 mb-24">
            {[
              {
                title: "Craftsmanship",
                description: "Every piece is handcrafted with meticulous attention to detail, using only the finest materials sourced responsibly."
              },
              {
                title: "Empowerment",
                description: "We believe accessories should make you feel powerful. Our designs carry a hidden strength—a statement that whispers independence."
              },
              {
                title: "Made in India",
                description: "Proudly designed and crafted in India, celebrating the rich heritage of Indian leather craftsmanship with a modern vision."
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
                  <span className="text-gold text-2xl">✦</span>
                </div>
                <h3 className="font-serif text-xl text-foreground mb-4">{value.title}</h3>
                <p className="text-cream/70 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Mission Section */}
          <div className="max-w-4xl mx-auto text-center py-16 border-t border-gold/10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="text-gold uppercase tracking-[0.3em] text-xs mb-6">Our Mission</p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-8 leading-tight">
                "To create accessories that don't just complement your style—they amplify your presence."
              </h2>
              <p className="text-cream/80 text-lg leading-relaxed">
                We are committed to sustainable luxury, ethical craftsmanship, and designs that 
                stand the test of time. When you carry a Clasp, you carry a piece of art that 
                tells your story.
              </p>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
