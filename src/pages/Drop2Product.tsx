import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { storefrontApiRequest, STOREFRONT_QUERY, ShopifyProduct } from '@/lib/shopify';
import drop2Front from '@/assets/drop2-black-front.png';

const Drop2Product = () => {
  const [quantity, setQuantity] = useState(1);
  const [shopifyProduct, setShopifyProduct] = useState<ShopifyProduct | null>(null);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);

  const { addItem, isLoading, getCheckoutUrl } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: 10, query: 'title:Drop 2' });
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

  const selectedVariant = useMemo(() => {
    return shopifyProduct?.node?.variants?.edges?.[0]?.node || null;
  }, [shopifyProduct]);

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
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/collection" className="hover:text-accent transition-colors">Drops</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Drop 2</span>
          </motion.nav>

          <div className="grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-start">
            {/* Left: Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-section-2 overflow-hidden">
                <motion.img
                  src={drop2Front}
                  alt="Drop 2 — Black"
                  className="w-full h-full object-contain p-8 sm:p-12"
                  style={{ aspectRatio: '1/1' }}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  loading="eager"
                  decoding="async"
                />
              </div>
            </motion.div>

            {/* Right: Product Info — sticky */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-col lg:sticky lg:top-24 lg:self-start"
            >
              <p className="text-accent uppercase tracking-[0.3em] text-xs mb-3">Drop 2</p>

              <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-2">
                {shopifyProduct?.node?.title || 'Drop 2'}
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

              {/* CTA */}
              <div className="mb-8">
                <Button
                  onClick={handleAddToCart}
                  disabled={isLoading || isLoadingProduct || !shopifyProduct}
                  className="w-full h-13 bg-foreground text-background hover:bg-foreground/90 text-sm font-medium tracking-widest uppercase"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Add to Shopping Bag'}
                </Button>
              </div>

              {/* Accordions */}
              <div className="border-t border-foreground/10 pt-2">
                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="details" className="border-foreground/10">
                    <AccordionTrigger className="text-xs uppercase tracking-widest text-foreground hover:no-underline py-4">
                      Product Details
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>Pineapple Leaf Material</li>
                        <li>In-Built Mirror</li>
                        <li>Hard Bottom</li>
                        <li>Gold-Tone Hardware</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="shipping" className="border-foreground/10">
                    <AccordionTrigger className="text-xs uppercase tracking-widest text-foreground hover:no-underline py-4">
                      Packaging, Shipping &amp; Returns
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>Free shipping across India</p>
                        <p>Handcrafted to order · Ships in 5–7 days</p>
                        <p>Returns must be requested within 15 days</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Drop2Product;
