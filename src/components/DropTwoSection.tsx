import { motion } from 'framer-motion';
import drop2Front from '@/assets/drop2-black-front.png';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const DropTwoSection = () => {
  return (
    <section className="h-screen w-full flex flex-col overflow-hidden bg-background">
      <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-12 py-20 sm:py-16 h-full overflow-hidden">
        <div className="flex flex-col items-center w-full lg:max-w-md lg:flex-1 min-h-0 lg:max-h-[65vh]">
          <motion.div
            className="flex flex-col items-center min-h-0 flex-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            viewport={{ once: false }}
          >
            <div className="overflow-hidden mb-3 sm:mb-5 lg:flex-1 lg:min-h-0">
              <motion.img
                src={drop2Front}
                alt="Drop 2 — Black purse front view"
                className="w-full h-full object-contain"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.6, ease }}
              />
            </div>
            <p className="text-accent text-xs sm:text-sm uppercase tracking-[0.25em] text-center">
              Brand New
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DropTwoSection;
