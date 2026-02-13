import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Minus, Plus, Check, Loader2 } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { storefrontApiRequest, STOREFRONT_QUERY, ShopifyProduct } from '@/lib/shopify';

const features = [
  'Premium vegan leather with natural grain',
  'Signature gold-plated brass hardware',
  'Hand-stitched detailing throughout',
  'Hardened integrated safety features',
  'Adjustable shoulder strap included',
];

const Product = () => {
  const [quantity, setQuantity] = useState(1);
  const [shopifyProduct, setShopifyProduct] = useState<ShopifyProduct | null>(null);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const { addItem, isLoading, getCheckoutUrl } = useCartStore();

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

  const variants = useMemo(() => {
    return shopifyProduct?.node?.variants?.edges?.map(e => e.node) || [];
  }, [shopifyProduct]);

  const selectedVariant = variants[selectedVariantIndex] || null;

  const variantImages = useMemo(() => {
    return shopifyProduct?.node?.images?.edges?.map(e => e.node) || [];
  }, [shopifyProduct]);

  const currentImage = variantImages[selectedVariantIndex] || variantImages[0];

  const handleAddToCart = async () => {
    if (!shopifyProduct || !selectedVariant) {
      toast.error("Product not available");
      return;
    }

    await addItem({
      product: shopifyProduct,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: quantity,
      selectedOptions: selectedVariant.selectedOptions || []
    });

    toast.success("Added to Cart", {
      description: `${quantity} × ${shopifyProduct.node.title} (${selectedVariant.title}) added to your cart.`,
    });
  };

  const handleBuyNow = async () => {
    if (!shopifyProduct || !selectedVariant) {
      toast.error("Product not available");
      return;
    }

    await addItem({
      product: shopifyProduct,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: quantity,
      selectedOptions: selectedVariant.selectedOptions || []
    });

    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
    } else {
      toast.error("Could not create checkout. Please try again.");
    }
  };

  const getDisplayPrice = () => {
    if (selectedVariant?.price) {
      const amount = parseFloat(selectedVariant.price.amount);
      const currency = selectedVariant.price.currencyCode === 'INR' ? '₹' : selectedVariant.price.currencyCode;
      return `${currency}${amount.toLocaleString('en-IN')}`;
    }
    return '₹2,999';
  };

  const colorMap: Record<string, string> = {
    'White': '#FFFFFF',
    'Beige': '#D4B896',
    'Pink': '#E8A0BF',
    'Camouflage': '#6B7B3A',
    'Black': '#1A1A1A',
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
            <p className="text-muted-foreground text-sm mt-1">
              Pay securely when your order arrives at your doorstep
            </p>
          </motion.div>

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <nav className="text-base text-muted-foreground">
              <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/" className="hover:text-gold transition-colors">Collection</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">{shopifyProduct?.node?.title || 'Drop 1'}</span>
            </nav>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative aspect-square bg-section-2 rounded-lg overflow-hidden mb-4">
                {currentImage ? (
                  <motion.img
                    key={selectedVariantIndex}
                    src={currentImage.url}
                    alt={currentImage.altText || `${selectedVariant?.title || 'Product'} variant`}
                    className="w-full h-full object-contain p-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    loading="eager"
                    decoding="async"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    Loading...
                  </div>
                )}
              </div>

              {variantImages.length > 1 && (
                <div className="flex gap-3">
                  {variantImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedVariantIndex(index)}
                      className={`flex-1 aspect-square rounded-md overflow-hidden border-2 transition-colors ${
                        selectedVariantIndex === index ? 'border-gold' : 'border-transparent hover:border-gold/50'
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={image.altText || variants[index]?.title || 'Variant'}
                        className="w-full h-full object-contain bg-section-2 p-2"
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  ))}
                </div>
              )}
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
                {shopifyProduct?.node?.title || 'Drop 1'}
              </h1>

              <p className="text-muted-foreground text-lg sm:text-xl mb-6 leading-relaxed">
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
                <p className="text-muted-foreground text-base mt-1">Inclusive of all taxes</p>
              </div>

              {/* Color Variant Selector */}
              {variants.length > 1 && (
                <div className="mb-8">
                  <h3 className="text-foreground text-base uppercase tracking-widest mb-4">
                    Color — <span className="text-gold">{selectedVariant?.title}</span>
                  </h3>
                  <div className="flex gap-3">
                    {variants.map((variant, index) => {
                      const colorName = variant.selectedOptions?.[0]?.value || variant.title;
                      const bgColor = colorMap[colorName] || '#888888';
                      const isSelected = selectedVariantIndex === index;
                      return (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedVariantIndex(index)}
                          className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                            isSelected
                              ? 'border-gold scale-110'
                              : 'border-gold/20 hover:border-gold/50'
                          }`}
                          style={{ backgroundColor: bgColor }}
                          title={colorName}
                        >
                          {isSelected && (
                            <Check className={`w-4 h-4 ${colorName === 'White' || colorName === 'Beige' ? 'text-noir' : 'text-white'}`} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-foreground text-base uppercase tracking-widest mb-4">What's Included</h3>
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-muted-foreground text-base">
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
                    className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-foreground hover:bg-gold hover:text-background hover:border-gold transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-foreground text-lg font-medium w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-foreground hover:bg-gold hover:text-background hover:border-gold transition-colors"
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
                  className="w-full h-14 bg-gold text-background hover:bg-gold-light text-base font-medium tracking-widest uppercase"
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
                <div className="flex items-center gap-3 text-base text-muted-foreground">
                  <span className="text-gold">✦</span>
                  <span>Cash on Delivery available</span>
                </div>
                <div className="flex items-center gap-3 text-base text-muted-foreground">
                  <span className="text-gold">✦</span>
                  <span>Free shipping across India</span>
                </div>
                <div className="flex items-center gap-3 text-base text-muted-foreground">
                  <span className="text-gold">✦</span>
                  <span>15-day return policy</span>
                </div>
                <div className="flex items-center gap-3 text-base text-muted-foreground">
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
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              The Signature is our flagship piece—a culmination of Indian craftsmanship and modern design.
              Each bag is handmade by skilled artisans in Mumbai, taking over 40 hours to complete.
              The concealed metal accent isn't just a design element; it's a statement that you don't need
              anyone to feel safe.
            </p>
            <p className="text-muted-foreground italic">
              "I don't need anyone to feel safe."
            </p>
          </motion.div>

          {/* Care Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-24 grid md:grid-cols-2 gap-8 max-w-2xl mx-auto"
          >
            {[
              {
                title: 'Care',
                description: 'Store in the provided dust bag. Avoid prolonged exposure to direct sunlight and moisture.'
              },
              {
                title: 'Materials',
                description: 'Premium vegan leather, gold-plated brass hardware, silk lining, hardened safety features.'
              }
            ].map((item, index) => (
              <div key={index} className="text-center p-6 border border-gold/10 rounded-lg">
                <h3 className="font-serif text-lg text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
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
