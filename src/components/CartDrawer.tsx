import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, Minus, Plus, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

interface CartDrawerProps {
  className?: string;
}

export const CartDrawer = ({ className }: CartDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);

  useEffect(() => {
    if (isOpen) syncCart();
  }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
      setIsOpen(false);
    }
  };

  const scheduleClose = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => setIsOpen(false), 300);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  // Close if mouse moves too far from the card
  useEffect(() => {
    if (!isOpen) return;

    const handleMouseMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();

      const padX = 80;
      const padY = 60;

      if (
        e.clientX < rect.left - padX ||
        e.clientX > rect.right + padX ||
        e.clientY < rect.top - padY ||
        e.clientY > rect.bottom + padY
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [isOpen]);

  const currencySymbol = items[0]?.price.currencyCode === 'INR' ? '₹' : (items[0]?.price.currencyCode || '₹');

  return (
    <div
      className="relative"
      ref={containerRef}
      onMouseEnter={() => { cancelClose(); setIsOpen(true); }}
      onMouseLeave={scheduleClose}
    >
      {/* Trigger icon */}
      <Button variant="ghost" size="icon" className={`relative ${className}`}>
        <ShoppingBag className="h-5 w-5" />
        {totalItems > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-gold text-background">
            {totalItems}
          </Badge>
        )}
      </Button>

      {/* Hover card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-full mt-2 w-80 bg-background border border-foreground/10 shadow-xl z-50"
            style={{ transformOrigin: "top right" }}
          >
            {items.length === 0 ? (
              <div className="p-6 text-center">
                <ShoppingBag className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Your bag is empty</p>
              </div>
            ) : (
              <div className="flex flex-col">
                {/* Items */}
                <div className="max-h-64 overflow-y-auto p-4 space-y-3">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex gap-3">
                      <div className="w-14 h-14 bg-section-2 overflow-hidden flex-shrink-0">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img src={item.product.node.images.edges[0].node.url} alt={item.product.node.title} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">{item.product.node.title}</p>
                        <p className="text-[10px] text-muted-foreground">{item.selectedOptions.map(o => o.value).join(' · ')}</p>
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                              className="w-5 h-5 flex items-center justify-center border border-foreground/15 text-foreground hover:bg-foreground/5 transition-colors"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <span className="text-xs w-5 text-center text-foreground">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                              className="w-5 h-5 flex items-center justify-center border border-foreground/15 text-foreground hover:bg-foreground/5 transition-colors"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-foreground">{currencySymbol}{parseFloat(item.price.amount).toLocaleString('en-IN')}</span>
                            <button onClick={() => removeItem(item.variantId)} className="text-muted-foreground hover:text-foreground transition-colors">
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="border-t border-foreground/10 p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">Total</span>
                    <span className="text-sm font-serif text-foreground">{currencySymbol}{totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <Button
                    onClick={handleCheckout}
                    className="w-full h-10 bg-foreground text-background hover:bg-foreground/90 text-xs tracking-widest uppercase"
                    disabled={items.length === 0 || isLoading || isSyncing}
                  >
                    {isLoading || isSyncing ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Checkout'}
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
