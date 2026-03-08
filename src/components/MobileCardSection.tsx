import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface MobileCardSectionProps {
  image: string;
  label: string;
  link: string;
  alt?: string;
}

const MobileCardSection = ({ image, label, link, alt }: MobileCardSectionProps) => {
  return (
    <section className="h-screen w-full snap-start snap-always flex flex-col overflow-hidden relative bg-background">
      <div className="flex-1 flex items-center justify-center px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          viewport={{ once: false, amount: 0.5 }}
          className="w-full max-w-sm"
        >
          <Link to={link} className="group block">
            <div className="overflow-hidden mb-5">
              <img
                src={image}
                alt={alt || label}
                className="w-full h-auto object-cover"
              />
            </div>
            <p className="text-accent text-xs uppercase tracking-[0.25em] text-center group-hover:text-foreground transition-colors duration-300">
              {label}
            </p>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default MobileCardSection;
