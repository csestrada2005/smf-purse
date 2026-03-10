import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface MobileCardProps {
  image: string;
  label: string;
  link: string;
  alt: string;
}

const ease = [0.22, 1, 0.36, 1];

const MobileCard = ({ image, label, link, alt }: MobileCardProps) => {
  return (
    <section className="h-screen w-full relative flex flex-col overflow-hidden bg-background">
      <div className="flex-1 flex items-center justify-center px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease }}
          className="w-full max-w-sm md:max-w-md lg:max-w-xl"
        >
          <Link to={link} className="group block">
            <motion.div
              className="overflow-hidden mb-5"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease, delay: 0.1 }}
            >
              <img
                src={image}
                alt={alt}
                className="w-full h-auto object-cover"
                loading="eager"
                decoding="async"
              />
            </motion.div>
            <motion.p
              className="text-accent text-xs uppercase tracking-[0.25em] text-center group-hover:text-foreground transition-colors duration-300"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease, delay: 0.2 }}
            >
              {label}
            </motion.p>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default MobileCard;
