import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cardDescriptions } from '@/lib/cardDescriptions';

interface MobileCardProps {
  image: string;
  label: string;
  link: string;
  alt: string;
  variant?: 'light' | 'dark';
}

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const MobileCard = ({ image, label, link, alt, variant = 'light' }: MobileCardProps) => {
  const [revealed, setRevealed] = useState(false);
  const isDark = variant === 'dark';
  const info = cardDescriptions[label];

  return (
    <section
      className={`h-screen w-full relative flex flex-col overflow-hidden ${isDark ? 'bg-noir' : 'bg-background'}`}
      onClick={() => { if (revealed) setRevealed(false); }}
    >
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="w-full max-w-sm md:max-w-md lg:max-w-xl relative">
          {/* Image — always mounted, fades in/out */}
          <motion.div
            animate={{ opacity: revealed ? 0 : 1 }}
            transition={{ duration: 0.3, ease }}
            className="cursor-pointer"
            onClick={(e) => { if (!revealed) { e.stopPropagation(); setRevealed(true); } }}
          >
            <div className="overflow-hidden mb-5">
              <img
                src={image}
                alt={alt}
                className="w-full h-auto object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
            <p className={`text-xs uppercase tracking-[0.25em] text-center transition-colors duration-300 ${isDark ? 'text-white/60' : 'text-accent'}`}>
              {label}
            </p>
          </motion.div>

          {/* Text overlay — always mounted, fades in/out */}
          <motion.div
            animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 10 }}
            transition={{ duration: 0.3, ease }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
            style={{ pointerEvents: revealed ? 'auto' : 'none' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className={`font-editorial text-2xl uppercase tracking-[0.06em] mb-6 ${isDark ? 'text-white' : 'text-foreground'}`}>
              {label}
            </h3>
            <p className={`text-sm leading-relaxed max-w-xs mb-8 ${isDark ? 'text-white/70' : 'text-accent'}`}>
              {info?.summary}
            </p>
            <Link
              to={link}
              className={`text-xs uppercase tracking-[0.25em] border px-6 py-3 transition-colors duration-300 ${
                isDark
                  ? 'border-white/40 text-white hover:bg-white hover:text-noir'
                  : 'border-foreground/30 text-foreground hover:bg-foreground hover:text-background'
              }`}
            >
              {info?.cta || label}
            </Link>
            <p className={`text-[10px] uppercase tracking-[0.2em] mt-6 ${isDark ? 'text-white/30' : 'text-accent/50'}`}>
              Tap anywhere to go back
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MobileCard;
