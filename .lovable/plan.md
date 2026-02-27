

## Analysis

The root cause is `vite-plugin-image-optimizer` in `vite.config.ts`. It compresses PNGs to **quality 80** during the production build. In development (Lovable preview), images are served uncompressed — hence the correct colors. On the published site, the compressed image has degraded colors (washed out burgundy, altered tones) and potentially slightly different dimensions causing the Clasp logo's position to not align as intended.

## Plan

### 1. Increase PNG quality to prevent color degradation
In `vite.config.ts`, raise the PNG quality from 80 to **100** (lossless) to preserve the original color profile of the hero editorial image. This ensures the published build matches what you see in the preview.

### 2. Remove explicit width/height attributes from hero `<img>`
The hardcoded `width={1824} height={1164}` can cause layout issues on some browsers when combined with `object-cover`. Removing them lets CSS handle sizing entirely, ensuring consistent coverage across preview and production.

### Technical details
- **File**: `vite.config.ts` — change `png.quality` from `80` to `100`
- **File**: `src/components/HeroSection.tsx` — remove `width` and `height` attributes from the hero `<img>` tag

