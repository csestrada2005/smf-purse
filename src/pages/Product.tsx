import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, ChevronRight, Minus, Plus, Check } from 'lucide-react';
import purseGoldFront from '@/assets/purse-gold-front.png';
import purseGoldSide from '@/assets/purse-gold-side.png';
import purseGoldOpen from '@/assets/purse-gold-open.png';
import purseSilhouette from '@/assets/purse-silhouette.jpeg';

const productImages = [
  { src: purseGoldFront, alt: 'The Signature - Front View' },
  { src: purseGoldSide, alt: 'The Signature - Side View' },
  { src: purseGoldOpen, alt: 'The Signature - Interior View' },
  { src: purseSilhouette, alt: 'The Signature - Lifestyle' },
];

const features = [
  'Premium Indian leather with natural grain',
  'Signature gold-plated brass hardware',
  'Hand-stitched detailing throughout',
  'Concealed metal safety accent',
  'Adjustable shoulder strap included',
  'Dust bag and authentication card',
];

const Product = () => {
  const { toast } = useToast();
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    toast({
      title: "Added to Cart",
      description: `${quantity} × The Signature has been added to your cart.`,
    });
    
    setIsAddingToCart(false);
  };

  const handleBuyNow = async () => {
    setIsAddingToCart(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    toast({
      title: "Proceeding to Checkout",
      description: "Redirecting you to complete your purchase...",
    });
    
    setIsAddingToCart(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <nav className="text-sm text-cream/60">
              <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/" className="hover:text-gold transition-colors">Collection</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">The Signature</span>
            </nav>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Main Image */}
              <div className="relative aspect-square bg-section-2 rounded-lg overflow-hidden mb-4">
                <motion.img
                  key={currentImage}
                  src={productImages[currentImage].src}
                  alt={productImages[currentImage].alt}
                  className="w-full h-full object-contain p-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-gold hover:text-noir transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-gold hover:text-noir transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex gap-3">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`flex-1 aspect-square rounded-md overflow-hidden border-2 transition-colors ${
                      currentImage === index ? 'border-gold' : 'border-transparent hover:border-gold/50'
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-contain bg-section-2 p-2"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col"
            >
              <p className="text-gold uppercase tracking-[0.3em] text-xs mb-4">The Signature Collection</p>
              
              <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-4">
                The Signature
              </h1>
              
              <p className="text-cream/70 text-lg mb-6">
                A statement of elegance and independence. Handcrafted from premium Indian leather 
                with signature gold hardware and a concealed safety accent—for the woman who 
                refuses to ask for permission to feel safe.
              </p>

              {/* Price */}
              <div className="mb-8">
                <p className="text-3xl font-serif text-gold">₹45,000</p>
                <p className="text-cream/50 text-sm mt-1">Inclusive of all taxes</p>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-foreground text-sm uppercase tracking-widest mb-4">What's Included</h3>
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-cream/80">
                      <Check className="w-4 h-4 text-gold flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <h3 className="text-foreground text-sm uppercase tracking-widest mb-4">Quantity</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-foreground hover:bg-gold hover:text-noir hover:border-gold transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-foreground text-lg font-medium w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-foreground hover:bg-gold hover:text-noir hover:border-gold transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 mb-8">
                <Button
                  onClick={handleBuyNow}
                  disabled={isAddingToCart}
                  className="w-full h-14 bg-gold text-noir hover:bg-gold-light text-base font-medium tracking-widest uppercase"
                >
                  {isAddingToCart ? 'Processing...' : 'Buy Now'}
                </Button>
                <Button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  variant="outline"
                  className="w-full h-14 border-gold/30 text-foreground hover:bg-gold/10 text-base tracking-widest uppercase"
                >
                  Add to Cart
                </Button>
              </div>

              {/* Shipping Info */}
              <div className="border-t border-gold/10 pt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-cream/70">
                  <span className="text-gold">✦</span>
                  <span>Free shipping across India</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-cream/70">
                  <span className="text-gold">✦</span>
                  <span>15-day return policy</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-cream/70">
                  <span className="text-gold">✦</span>
                  <span>Handcrafted to order • Ships in 5-7 days</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Product Story Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-24 text-center max-w-3xl mx-auto"
          >
            <p className="text-gold uppercase tracking-[0.3em] text-xs mb-6">The Craft</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-8">
              More Than a Bag
            </h2>
            <p className="text-cream/80 text-lg leading-relaxed mb-8">
              The Signature is our flagship piece—a culmination of Indian craftsmanship and modern design. 
              Each bag is handmade by skilled artisans in Mumbai, taking over 40 hours to complete. 
              The concealed metal accent isn't just a design element; it's a statement that you don't need 
              anyone to feel safe.
            </p>
            <p className="text-cream/60 italic">
              "I don't need anyone to feel safe."
            </p>
          </motion.div>

          {/* Care Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-24 grid md:grid-cols-3 gap-8"
          >
            {[
              {
                title: 'Care',
                description: 'Store in the provided dust bag. Avoid prolonged exposure to direct sunlight and moisture.'
              },
              {
                title: 'Materials',
                description: 'Premium full-grain leather, gold-plated brass hardware, silk lining, concealed alloy accent.'
              },
              {
                title: 'Dimensions',
                description: 'H: 22cm × W: 28cm × D: 12cm. Adjustable strap: 90-120cm.'
              }
            ].map((item, index) => (
              <div key={index} className="text-center p-6 border border-gold/10 rounded-lg">
                <h3 className="font-serif text-lg text-foreground mb-3">{item.title}</h3>
                <p className="text-cream/70 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Product;
