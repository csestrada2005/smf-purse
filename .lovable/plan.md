

## Issues Identified

The Shopify query `title:Drop 2` returns **both** Drop 1 and Drop 2 products. The code takes `edges?.[0]` which is Drop 1 (price ₹2,300, variant "White"). This is the root cause of both the wrong title and wrong price.

## Plan

### 1. Copy uploaded images to project assets
- `user-uploads://1000160720-removebg-preview.png` → `src/assets/drop2-front.png` (front view — also used for Drops card)
- `user-uploads://1000160723-removebg-preview.png` → `src/assets/drop2-back.png` (back view)
- `user-uploads://1000160721-removebg-preview.png` → `src/assets/drop2-side.png` (side view)

### 2. Fix Drop2Product.tsx
- **Fix product selection**: Instead of `edges?.[0]`, find the product where `node.title` includes "Drop 2"
- **Replace gallery**: Remove the old `drop2Front` import and Shopify images. Use only the 3 new local images (front, back, side)
- This automatically fixes the title ("Black") and price (₹4,000) since it'll read from the correct Shopify product

### 3. Update Shop.tsx Drop 2 card image
- Replace `drop2Front` import with the new `drop2-front.png` for the product card

