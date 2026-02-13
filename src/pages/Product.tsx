import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Minus, Plus, Loader2 } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { storefrontApiRequest, STOREFRONT_QUERY, ShopifyProduct } from '@/lib/shopify';

import blackFront from '@/assets/black-purse-front.png';
import blackSide from '@/assets/black-purse-side.png';
import blackBack from '@/assets/black-purse-back.png';
import whiteFront from '@/assets/white-purse-front.png';
import whiteSide from '@/assets/white-purse-side.png';
import whiteBack from '@/assets/white-purse-back.png';

const localImages: Record<string, string[]> = {
  white: [whiteFront, whiteSide, whiteBack],
  black: [blackFront, blackSide, blackBack],
};

const colorMap: Record<string, string> = {
  white: '#FFFFFF',
  beige: '#D4B896',
  pink: '#E8A0BF',
  camouflage: '#6B7B3A',
  black: '#1A1A1A',
};

const Product = () => {
  const { color } = useParams<{ color: string }>();
  const colorKey = (color || 'white').toLowerCase();

  const [quantity, setQuantity] = useState(1);
  const [shopifyProduct, setShopifyProduct] = useState<ShopifyProduct | null>(null);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const { addItem, isLoading, getCheckoutUrl } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: 1 });
        const product = data?.data?.products?.edges?.[0];
        if (product) setShopifyProduct(product);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setIsLoadingProduct(false);
      }
    };
    fetchProduct();
  }, []);

  // Reset image index when color changes
  useEffect(() => {
    setActiveImageIndex(0);
    setQuantity(1);
  }, [colorKey]);

  const variants = useMemo(() => {
    return shopifyProduct?.node?.variants?.edges?.map(e => e.node) || [];
  }, [shopifyProduct]);

  const variantImages = useMemo(() => {
    return shopifyProduct?.node?.images?.edges?.map(e => e.node) || [];
  }, [shopifyProduct]);

  // Find the matching variant for this color
  const selectedVariant = useMemo(() => {
    return variants.find(v => {
      const vColor = (v.selectedOptions?.[0]?.value || v.title).toLowerCase();
      return vColor === colorKey;
    }) || variants[0] || null;
  }, [variants, colorKey]);

  const selectedVariantIndex = useMemo(() => {
    return variants.indexOf(selectedVariant!);
  }, [variants, selectedVariant]);

  // Build image gallery: local images for white/black, single shopify image for others
  const galleryImages = useMemo(() => {
    if (localImages[colorKey]) return localImages[colorKey];
    const shopifyImg = variantImages[selectedVariantIndex] || variantImages[0];
    return shopifyImg ? [shopifyImg.url] : [];
  }, [colorKey, variantImages, selectedVariantIndex]);

  const colorName = selectedVariant?.selectedOptions?.[0]?.value || selectedVariant?.title || color || 'White';

  const getDisplayPrice = () => {
    if (selectedVariant?.price) {
      const amount = parseFloat(selectedVariant.price.amount);
      const currency = selectedVariant.price.currencyCode === 'INR' ? '₹' : selectedVariant.price.currencyCode;
      return `${currency}${amount.toLocaleString('en-IN')}`;
    }
    return '';
  };

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
      quantity,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success("Added to Cart", {
      description: `${quantity} × ${shopifyProduct.node.title} (${selectedVariant.title})`,
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
      quantity,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
    } else {
      toast.error("Could not create checkout. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-16 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 text-sm text-muted-foreground"
          >
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/shop" className="hover:text-gold transition-colors">Shop</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{colorName}</span>
          </motion.nav>

          <div className="grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-16">
            {/* Left: Image Gallery — Versace-style grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {galleryImages.length > 1 ? (
                <div className="grid grid-cols-2 gap-2">
                  {galleryImages.map((src, i) => (
                    <div
                      key={i}
                      className={`bg-section-2 overflow-hidden cursor-pointer ${
                        galleryImages.length === 3 && i === 2 ? 'col-span-2' : ''
                      }`}
                      onClick={() => setActiveImageIndex(i)}
                    >
                      <motion.img
                        src={src}
                        alt={`${colorName} — view ${i + 1}`}
                        className="w-full h-full object-contain p-8 sm:p-12"
                        style={{ aspectRatio: galleryImages.length === 3 && i === 2 ? '2/1' : '1/1' }}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        loading={i === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-section-2 aspect-square overflow-hidden">
                  {galleryImages[0] ? (
                    <img
                      src={galleryImages[0]}
                      alt={colorName}
                      className="w-full h-full object-contain p-8 sm:p-12"
                      loading="eager"
                      decoding="async"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      Loading...
                    </div>
                  )}
                </div>
              )}
            </motion.div>

            {/* Right: Product Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-col"
            >
              <p className="text-gold uppercase tracking-[0.3em] text-xs mb-3">Drop 1</p>

              <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-2">
                {shopifyProduct?.node?.title || 'Drop 1'}
              </h1>

              {/* Price */}
              <div className="mb-6">
                {isLoadingProduct ? (
                  <div className="h-8 w-28 bg-section-2 animate-pulse" />
                ) : (
                  <p className="text-2xl font-serif text-foreground">{getDisplayPrice()}</p>
                )}
                <p className="text-muted-foreground text-xs mt-1">Taxes and duties included</p>
              </div>

              {/* Color selector */}
              {variants.length > 1 && (
                <div className="mb-8">
                  <p className="text-foreground text-xs uppercase tracking-widest mb-3">
                    Color: <span className="text-gold ml-1">{colorName}</span>
                  </p>
                  <div className="flex gap-2.5">
                    {variants.map((variant) => {
                      const vColor = (variant.selectedOptions?.[0]?.value || variant.title).toLowerCase();
                      const bgColor = colorMap[vColor] || '#888';
                      const isActive = vColor === colorKey;
                      return (
                        <Link
                          key={variant.id}
                          to={`/product/${vColor}`}
                          className={`w-8 h-8 rounded-full border-2 transition-all ${
                            isActive ? 'border-foreground scale-110' : 'border-muted hover:border-foreground/50'
                          }`}
                          style={{ backgroundColor: bgColor }}
                          title={variant.selectedOptions?.[0]?.value || variant.title}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 border border-foreground/20 flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-foreground text-sm font-medium w-6 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 border border-foreground/20 flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* CTA */}
              <div className="space-y-3 mb-8">
                <Button
                  onClick={handleBuyNow}
                  disabled={isLoading || isLoadingProduct || !shopifyProduct}
                  className="w-full h-13 bg-foreground text-background hover:bg-foreground/90 text-sm font-medium tracking-widest uppercase"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Buy Now'}
                </Button>
                <Button
                  onClick={handleAddToCart}
                  disabled={isLoading || isLoadingProduct || !shopifyProduct}
                  variant="outline"
                  className="w-full h-13 border-foreground/20 text-foreground hover:bg-foreground/5 text-sm tracking-widest uppercase"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Add to Shopping Bag'}
                </Button>
              </div>

              {/* Minimal details */}
              <div className="border-t border-foreground/10 pt-6 space-y-4 text-sm text-muted-foreground">
                <p>Free shipping across India</p>
                <p>15-day return policy</p>
                <p>Handcrafted to order · Ships in 5–7 days</p>
              </div>

              {!selectedVariant?.availableForSale && selectedVariant && (
                <p className="text-destructive text-xs uppercase tracking-wider mt-4">Currently Sold Out</p>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Product;
