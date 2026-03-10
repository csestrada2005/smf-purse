import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface MobileCardProps {
  image: string;
  label: string;
  link: string;
  alt: string;
}

const MobileCard = ({ image, label, link, alt }: MobileCardProps) => {
  return (
    <section className="h-screen w-full relative flex flex-col overflow-hidden bg-background">
      <div className="flex-1 flex items-center justify-center px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          className="w-full max-w-sm md:max-w-md lg:max-w-xl"
        >
          <Link to={link} className="group block">
            <div className="overflow-hidden mb-5">
              <img
                src={image}
                alt={alt}
                className="w-full h-auto object-cover"
                loading="eager"
                decoding="async"
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

export default MobileCard;
