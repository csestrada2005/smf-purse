import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cardDescriptions } from '@/lib/cardDescriptions';
import drop1White from '@/assets/drop1-white.png';
import drop1Black from '@/assets/drop1-black.png';

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
        className="group flex flex-col h-full min-h-0 cursor-pointer relative"
        onClick={() => setRevealed(!revealed)}
      >
        <div className="overflow-hidden mb-3 sm:mb-5 lg:flex-1 lg:min-h-0 relative">
          {/* Image — always mounted */}
          <motion.div
            animate={{ opacity: revealed ? 0 : 1 }}
            transition={{ duration: 0.3 }}
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

          {/* Text overlay — always mounted */}
          <motion.div
            animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 10 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
            style={{ pointerEvents: revealed ? 'auto' : 'none' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-editorial text-xl uppercase tracking-[0.06em] mb-4 text-foreground">
              {label}
            </h3>
            <p className="text-sm leading-relaxed max-w-[220px] mb-6 text-accent">
              {info?.summary}
            </p>
            <Link
              to={link}
              className="text-xs uppercase tracking-[0.25em] border border-foreground/30 text-foreground px-5 py-2.5 hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              {info?.cta || label}
            </Link>
          </motion.div>
        </div>
        <motion.p
          animate={{ opacity: revealed ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className="text-accent text-xs sm:text-sm uppercase tracking-[0.25em] text-center group-hover:text-foreground transition-colors duration-300 shrink-0"
        >
          {label}
        </motion.p>
      </div>
    </motion.div>
  );
};

const DropOneSection = () => {
  return (
    <section className="h-screen w-full flex flex-col overflow-hidden bg-background">
      <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-12 py-20 sm:py-16 h-full overflow-hidden">
        <div className="grid grid-cols-2 gap-8 lg:gap-12 w-full lg:max-w-3xl lg:flex-1 min-h-0 lg:max-h-[65vh]">
          <RevealCard image={drop1White} alt="White Clasp purse on velvet chair" label="Buy Now" link="/product/Drop1/W" />
          <RevealCard image={drop1Black} alt="Black Clasp purse on hand" label="Discover Versions" link="/shop" />
        </div>
      </div>
    </section>
  );
};

export default DropOneSection;
