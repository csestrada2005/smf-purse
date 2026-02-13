import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { storefrontApiRequest, STOREFRONT_QUERY, ShopifyProduct } from '@/lib/shopify';

import blackBack from '@/assets/black-purse-back.png';
import whiteBack from '@/assets/white-purse-back.png';
import blackSide from '@/assets/black-purse-side.png';
import whiteSide from '@/assets/white-purse-side.png';
import blackFront from '@/assets/black-purse-front.png';
import whiteFront from '@/assets/white-purse-front.png';

const extraImagesMap: Record<string, { front: string; side: string; back: string }> = {
  'White': { front: whiteFront, side: whiteSide, back: whiteBack },
  'Black': { front: blackFront, side: blackSide, back: blackBack },
};

const Shop = () => {
  const [shopifyProduct, setShopifyProduct] = useState<ShopifyProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: 10 });
        const product = data?.data?.products?.edges?.[0];
        if (product) {
          setShopifyProduct(product);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, []);

  const variants = useMemo(() => {
    return shopifyProduct?.node?.variants?.edges?.map(e => e.node) || [];
  }, [shopifyProduct]);

  const images = useMemo(() => {
    return shopifyProduct?.node?.images?.edges?.map(e => e.node) || [];
  }, [shopifyProduct]);

  // Order: White first, Black second, then the rest
  const orderedVariants = useMemo(() => {
    const priorityOrder = ['White', 'Black'];
    const sorted = [...variants].sort((a, b) => {
      const aName = a.selectedOptions?.[0]?.value || a.title;
      const bName = b.selectedOptions?.[0]?.value || b.title;
      const aIndex = priorityOrder.indexOf(aName);
      const bIndex = priorityOrder.indexOf(bName);
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return 0;
    });
    return sorted.map(variant => {
      const originalIndex = variants.indexOf(variant);
      return { variant, image: images[originalIndex] || images[0] };
    });
  }, [variants, images]);

  const topRow = orderedVariants.slice(0, 2);
  const bottomRow = orderedVariants.slice(2);

  const productTitle = shopifyProduct?.node?.title || 'Drop 1';

  const formatPrice = (amount: string, currencyCode: string) => {
    const num = parseFloat(amount);
    const symbol = currencyCode === 'INR' ? '₹' : currencyCode + ' ';
    return `${symbol}${num.toLocaleString('en-IN')}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-16">
        {/* Header */}
        <div className="px-6 sm:px-12 lg:px-20 mb-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <p className="text-muted-foreground text-sm">
              <span className="font-semibold text-foreground">{orderedVariants.length}</span> Products
            </p>
            <p className="text-gold uppercase tracking-[0.3em] text-xs">Shop All</p>
          </div>
        </div>

        {/* Product Grid */}
        <div className="px-6 sm:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-square bg-muted rounded-sm mb-3" />
                    <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : (
              <>
                {/* Top Row — 2 featured variants */}
                <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  {topRow.map(({ variant, image }, index) => (
                    <VariantCard
                      key={variant.id}
                      variant={variant}
                      image={image}
                      productTitle={productTitle}
                      formatPrice={formatPrice}
                      index={index}
                      extraImages={extraImagesMap[variant.selectedOptions?.[0]?.value || variant.title]}
                    />
                  ))}
                </div>

                {/* Bottom Row — remaining variants */}
                {bottomRow.length > 0 && (
                  <div className={`grid gap-4 sm:gap-6 ${
                    bottomRow.length === 3 ? 'grid-cols-2 lg:grid-cols-3' : 
                    bottomRow.length === 2 ? 'grid-cols-2' : 'grid-cols-1 max-w-md'
                  }`}>
                    {bottomRow.map(({ variant, image }, index) => (
                      <VariantCard
                        key={variant.id}
                        variant={variant}
                        image={image}
                        productTitle={productTitle}
                        formatPrice={formatPrice}
                        index={index + 2}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

interface VariantCardProps {
  variant: {
    id: string;
    title: string;
    price: { amount: string; currencyCode: string };
    availableForSale: boolean;
    selectedOptions: Array<{ name: string; value: string }>;
  };
  image: { url: string; altText: string | null } | undefined;
  productTitle: string;
  formatPrice: (amount: string, currencyCode: string) => string;
  index: number;
  extraImages?: { front: string; side: string; back: string };
}

const VariantCard = ({ variant, image, productTitle, formatPrice, index, extraImages }: VariantCardProps) => {
  const colorName = variant.selectedOptions?.[0]?.value || variant.title;
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Tighter breakpoints so transitions happen faster
  const imageIndex = useTransform(scrollYProgress, [0.1, 0.25, 0.26, 0.4, 0.41, 0.55], [0, 0, 1, 1, 2, 2]);

  useMotionValueEvent(imageIndex, "change", (v) => {
    if (extraImages) setActiveIndex(Math.round(v));
  });

  const allImages = extraImages
    ? [extraImages.front, extraImages.side, extraImages.back]
    : null;

  const labels = ['Front', 'Side', 'Back'];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to="/product" className="group block">
        {/* Image */}
        <div className="aspect-square bg-section-2 overflow-hidden mb-3 sm:mb-4 relative">
          {allImages ? (
            <>
              {allImages.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${colorName} — ${labels[i]}`}
                  className="absolute inset-0 w-full h-full object-contain p-6 sm:p-10 transition-opacity duration-500"
                  style={{ opacity: activeIndex === i ? 1 : 0 }}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              ))}
              {/* Dot indicators */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {labels.map((_, i) => (
                  <span
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                      activeIndex === i ? 'bg-foreground' : 'bg-foreground/25'
                    }`}
                  />
                ))}
              </div>
            </>
          ) : image ? (
            <motion.img
              src={image.url}
              alt={image.altText || `${productTitle} — ${colorName}`}
              className="w-full h-full object-contain p-6 sm:p-10"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
              No image
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-1">
          <h3 className="text-foreground text-sm sm:text-base font-medium leading-tight">
            {colorName}
          </h3>
          <p className="text-muted-foreground text-sm">
            {formatPrice(variant.price.amount, variant.price.currencyCode)}
          </p>
          {!variant.availableForSale && (
            <p className="text-destructive text-xs uppercase tracking-wider">Sold Out</p>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default Shop;
