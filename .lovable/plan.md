

## Plan: Replace Hero Section Image

The issue is that the component still references both `hero-editorial.png` and `hero-editorial.webp` via a `<picture>` element. The old WebP file may be cached or taking priority. We need to clean this up.

### Steps

1. **Delete old hero image files**: Remove `src/assets/hero-editorial.png` and `src/assets/hero-editorial.webp` to ensure no stale cached assets remain.

2. **Copy new image**: Copy `user-uploads://Hero-Section-Clasp-2.png` to `src/assets/hero-editorial.png`.

3. **Update `HeroSection.tsx`**:
   - Remove the WebP import (`heroEditorialWebp`)
   - Remove the `<picture>` and `<source>` wrapper — use a plain `<motion.img>` with the PNG import only
   - Keep responsive object positioning: `object-cover object-top` on mobile, `sm:object-center` on desktop (subject is centered in this image so `object-center` works well)

