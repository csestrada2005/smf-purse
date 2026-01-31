import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ChevronLeft, ChevronRight, Minus, Plus, Check, Loader2 } from 'lucide-react';
import purseGoldFront from '@/assets/purse-gold-front.png';
import purseGoldSide from '@/assets/purse-gold-side.png';
import purseGoldOpen from '@/assets/purse-gold-open.png';
import purseSilhouette from '@/assets/purse-silhouette.jpeg';
import { useCartStore } from '@/stores/cartStore';
import { storefrontApiRequest, STOREFRONT_QUERY, ShopifyProduct } from '@/lib/shopify';

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
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [shopifyProduct, setShopifyProduct] = useState<ShopifyProduct | null>(null);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  
  const { addItem, isLoading, getCheckoutUrl } = useCartStore();

  // Fetch the product from Shopify
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: 1 });
        const product = data?.data?.products?.edges?.[0];
        if (product) {
          setShopifyProduct(product);
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setIsLoadingProduct(false);
      }
    };
    fetchProduct();
  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const getSelectedVariant = () => {
    return shopifyProduct?.node?.variants?.edges?.[0]?.node;
  };

  const handleAddToCart = async () => {
    if (!shopifyProduct) {
      toast.error("Product not available");
      return;
    }

    const variant = getSelectedVariant();
    if (!variant) {
      toast.error("No variant available");
      return;
    }

    await addItem({
      product: shopifyProduct,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: quantity,
      selectedOptions: variant.selectedOptions || []
    });

    toast.success("Added to Cart", {
      description: `${quantity} × ${shopifyProduct.node.title} has been added to your cart.`,
    });
  };

  const handleBuyNow = async () => {
    if (!shopifyProduct) {
      toast.error("Product not available");
      return;
    }

    const variant = getSelectedVariant();
    if (!variant) {
      toast.error("No variant available");
      return;
    }

    // Add item to cart first
    await addItem({
      product: shopifyProduct,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: quantity,
      selectedOptions: variant.selectedOptions || []
    });

    // Then redirect to checkout
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
    } else {
      toast.error("Could not create checkout. Please try again.");
    }
  };

  // Get price from Shopify or fallback
  const getDisplayPrice = () => {
    const variant = getSelectedVariant();
    if (variant?.price) {
      const amount = parseFloat(variant.price.amount);
      const currency = variant.price.currencyCode === 'INR' ? '₹' : variant.price.currencyCode;
      return `${currency}${amount.toLocaleString('en-IN')}`;
    }
    return '₹45,000';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          {/* COD Banner */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-gold/10 border border-gold/20 rounded-lg p-4 text-center"
          >
            <p className="text-gold font-medium text-base sm:text-lg">
              ✦ Cash on Delivery (COD) Available ✦
            </p>
            <p className="text-cream/70 text-sm mt-1">
              Pay securely when your order arrives at your doorstep
            </p>
          </motion.div>

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <nav className="text-base text-cream/60">
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
              <p className="text-gold uppercase tracking-[0.3em] text-sm mb-4">The Signature Collection</p>
              
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mb-4">
                {shopifyProduct?.node?.title || 'The Signature'}
              </h1>
              
              <p className="text-cream/70 text-lg sm:text-xl mb-6 leading-relaxed">
                A statement of elegance and independence. Handcrafted from premium Indian leather 
                with signature gold hardware and a concealed safety accent—for the woman who 
                refuses to ask for permission to feel safe.
              </p>

              {/* Price */}
              <div className="mb-8">
                {isLoadingProduct ? (
                  <div className="h-9 w-32 bg-section-2 animate-pulse rounded" />
                ) : (
                  <p className="text-3xl sm:text-4xl font-serif text-gold">{getDisplayPrice()}</p>
                )}
                <p className="text-cream/50 text-base mt-1">Inclusive of all taxes</p>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-foreground text-base uppercase tracking-widest mb-4">What's Included</h3>
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-cream/80 text-base">
                      <Check className="w-5 h-5 text-gold flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <h3 className="text-foreground text-base uppercase tracking-widest mb-4">Quantity</h3>
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
                  disabled={isLoading || isLoadingProduct || !shopifyProduct}
                  className="w-full h-14 bg-gold text-noir hover:bg-gold-light text-base font-medium tracking-widest uppercase"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Buy Now'}
                </Button>
                <Button
                  onClick={handleAddToCart}
                  disabled={isLoading || isLoadingProduct || !shopifyProduct}
                  variant="outline"
                  className="w-full h-14 border-gold/30 text-foreground hover:bg-gold/10 text-base tracking-widest uppercase"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Add to Cart'}
                </Button>
              </div>

              {/* Shipping Info */}
              <div className="border-t border-gold/10 pt-6 space-y-3">
                <div className="flex items-center gap-3 text-base text-cream/70">
                  <span className="text-gold">✦</span>
                  <span>Cash on Delivery available</span>
                </div>
                <div className="flex items-center gap-3 text-base text-cream/70">
                  <span className="text-gold">✦</span>
                  <span>Free shipping across India</span>
                </div>
                <div className="flex items-center gap-3 text-base text-cream/70">
                  <span className="text-gold">✦</span>
                  <span>15-day return policy</span>
                </div>
                <div className="flex items-center gap-3 text-base text-cream/70">
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
