import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
  {
    question: 'What materials are used in Clasp bags?',
    answer:
      'Every Clasp bag is crafted from full-grain leather and finished with gold-tone hardware. The interiors are lined with silk for a refined touch.',
  },
  {
    question: 'How should I care for my leather bag?',
    answer:
      'Keep your bag away from prolonged sunlight and moisture. Wipe gently with a soft, dry cloth. For deeper cleaning, use a leather conditioner suited for full-grain leather. Avoid harsh chemicals or abrasive materials.',
  },
  {
    question: 'What sizes are available?',
    answer:
      'Our Drop 1 collection features one signature silhouette available in multiple colourways. Detailed dimensions are listed on each product page.',
  },
  {
    question: 'How do I know which colour to choose?',
    answer:
      "Each product page includes high-resolution imagery from multiple angles. If you need help deciding, feel free to reach out via our Contact page \u2014 we're happy to assist.",
  },
  {
    question: 'Can I see the bag in person before purchasing?',
    answer:
      "You're welcome to visit our atelier in Gurugram by appointment. Please contact us to schedule a viewing.",
  },
  {
    question: 'Are the colours accurate to the product photos?',
    answer:
      'We photograph every bag under studio lighting to represent colours as accurately as possible. Slight variations may occur due to screen settings.',
  },
  {
    question: 'How do I store my bag when not in use?',
    answer:
      'Store your bag in the dust bag provided, stuffed lightly with tissue paper to maintain its shape. Keep it in a cool, dry place away from direct sunlight.',
  },
  {
    question: 'Is the hardware tarnish-resistant?',
    answer:
      'Our gold-tone hardware is designed to be durable and tarnish-resistant under normal use. Avoid contact with perfumes, lotions, and water to preserve its finish.',
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-16 px-6 sm:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
          >
            <p className="text-gold uppercase tracking-[0.3em] text-xs mb-6">
              Product & Care
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-foreground mb-6">
              FAQ
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Everything you need to know about our craftsmanship, materials, and care.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-gold/10"
                >
                  <AccordionTrigger className="text-foreground text-left font-serif text-base sm:text-lg hover:no-underline hover:text-gold transition-colors py-5">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
