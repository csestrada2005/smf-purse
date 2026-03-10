import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cardDescriptions } from '@/lib/cardDescriptions';
import claspBack from '@/assets/clasp-back.png';
import claspHeels from '@/assets/clasp-heels.png';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface CardProps {
  image: string;
  alt: string;
  label: string;
  link: string;
}

const RevealCard = ({ image, alt, label, link }: CardProps) => {
  const [revealed, setRevealed] = useState(false);
  const info = cardDescriptions[label];

  return (
    <motion.div
      className="flex flex-col min-h-0"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease }}
      viewport={{ once: false }}
    >
      <div
        className="group flex flex-col h-full min-h-0 cursor-pointer"
        onClick={() => { if (revealed) setRevealed(false); else setRevealed(true); }}
      >
        <div className="overflow-hidden mb-3 sm:mb-5 lg:flex-1 lg:min-h-0 relative">
          <AnimatePresence mode="wait">
            {!revealed ? (
              <motion.div
                key="image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full"
              >
                <motion.img
                  src={image}
                  alt={alt}
                  className="w-full h-full object-contain"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.6, ease }}
                />
              </motion.div>
            ) : (
              <motion.div
                key="text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full flex flex-col items-center justify-center text-center px-6"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="font-editorial text-xl uppercase tracking-[0.06em] mb-4 text-white">
                  {label}
                </h3>
                <p className="text-sm leading-relaxed max-w-[220px] mb-6 text-white/70">
                  {info?.summary}
                </p>
                <Link
                  to={link}
                  className="text-xs uppercase tracking-[0.25em] border border-white/40 text-white px-5 py-2.5 hover:bg-white hover:text-noir transition-colors duration-300"
                >
                  {info?.cta || label}
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {!revealed && (
          <p className="text-white/60 text-xs sm:text-sm uppercase tracking-[0.25em] text-center group-hover:text-white transition-colors duration-300 shrink-0">
            {label}
          </p>
        )}
      </div>
    </motion.div>
  );
};

const WhatsClaspSection = () => {
  return (
    <section className="h-screen w-full flex flex-col overflow-hidden bg-noir">
      <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-12 py-20 sm:py-16 h-full overflow-hidden">
        <div className="grid grid-cols-2 gap-8 lg:gap-12 w-full lg:max-w-3xl lg:flex-1 min-h-0 lg:max-h-[65vh]">
          <RevealCard image={claspBack} alt="Clasp Back – editorial polaroid" label="Discover" link="/about" />
          <RevealCard image={claspHeels} alt="CLASP purse balanced on heels" label="Contact Us" link="/contact" />
        </div>
      </div>
    </section>
  );
};

export default WhatsClaspSection;
