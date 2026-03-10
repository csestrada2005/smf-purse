import { motion } from 'framer-motion';
import { FullPageSection } from './FullPageScroll';

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" } as any,
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

interface MobilePreSectionProps {
  title: string;
  image: string;
  id?: string;
}

const MobilePreSection = ({ title, image, id }: MobilePreSectionProps) => {
  return (
    <FullPageSection id={id} className="relative">
      <motion.img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <motion.h2
          className="font-editorial text-4xl sm:text-5xl text-white uppercase tracking-[0.08em] text-center drop-shadow-lg"
          {...reveal}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          {title}
        </motion.h2>
      </div>
    </FullPageSection>
  );
};

export default MobilePreSection;
