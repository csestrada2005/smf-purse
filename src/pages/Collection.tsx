import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import indianHeritage from '@/assets/indian-heritage.png';
import theClass from '@/assets/the-class.png';

const Collection = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="flex flex-col items-center justify-center px-6 sm:px-12 lg:px-20 py-8">
          <div className="max-w-6xl mx-auto w-full">
            {/* Header */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-amber-600 uppercase tracking-[0.3em] text-xs mb-4">Our Collection</p>
              <h1 className="font-serif text-4xl sm:text-5xl text-neutral-900 mb-4">
                The Signature Series
              </h1>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                Each piece tells a story of Indian heritage, meticulous craftsmanship, and the spirit of independence.
              </p>
            </motion.div>

            {/* Products Grid - YSL style */}
            <div className="grid md:grid-cols-2 gap-6 lg:gap-12">
              {/* Product 1 - The Indian Heritage */}
              <motion.div 
                className="group flex flex-col"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                viewport={{ once: false }}
              >
                <Link to="/product" className="flex flex-col h-full">
                  <div className="flex-1 flex items-center justify-center overflow-hidden mb-4" style={{ maxHeight: 'calc(100vh - 300px)' }}>
                    <motion.img 
                      src={indianHeritage}
                      alt="The Indian Heritage - Woman with purse silhouette" 
                      className="max-h-full w-auto object-contain"
                      style={{ maxHeight: '55vh' }}
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                  <div className="text-center py-4">
                    <h3 className="text-neutral-900 text-sm uppercase tracking-[0.2em] mb-2 font-semibold">
                      The Indian Heritage
                    </h3>
                    <p className="text-amber-600 text-xs uppercase tracking-widest hover:text-neutral-900 transition-colors duration-500">
                      Explore
                    </p>
                  </div>
                </Link>
              </motion.div>

              {/* Product 2 - The Class */}
              <motion.div 
                className="group flex flex-col"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                viewport={{ once: false }}
              >
                <Link to="/product" className="flex flex-col h-full">
                  <div className="flex-1 flex items-center justify-center overflow-hidden mb-4" style={{ maxHeight: 'calc(100vh - 300px)' }}>
                    <motion.img 
                      src={theClass}
                      alt="The Class - Woman with purse and bird silhouette" 
                      className="max-h-full w-auto object-contain"
                      style={{ maxHeight: '55vh' }}
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                  <div className="text-center py-4">
                    <h3 className="text-neutral-900 text-sm uppercase tracking-[0.2em] mb-2 font-semibold">
                      The Class
                    </h3>
                    <p className="text-amber-600 text-xs uppercase tracking-widest hover:text-neutral-900 transition-colors duration-500">
                      Discover
                    </p>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Collection;
