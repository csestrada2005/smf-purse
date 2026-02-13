

## Clean Up Hero Section Images

### Problem
Multiple hero images have accumulated in the project (`hero-editorial.png`, `hero-banner.png`, `hero-silhouette.png`) causing confusion. The hero section needs to use only the newly uploaded image.

### Steps

1. **Copy the new image** into `src/assets/hero-editorial.png`, replacing the existing file. This keeps the same filename so the existing import in `HeroSection.tsx` works without changes.

2. **Delete unused hero images** from `src/assets/`:
   - `hero-banner.png` (no longer needed)
   - `hero-silhouette.png` (no longer needed)

3. **Update `HeroSection.tsx`** image styling to properly display the new photo:
   - Keep `object-contain` so the full woman is visible
   - Use `object-center` positioning
   - Keep `bg-noir` background to match the image's dark background seamlessly

### Technical Details
- The new image is horizontal/landscape with a dark background, which will blend naturally with the `bg-noir` background color
- Only `hero-editorial.png` is imported in the hero component, so replacing that single file is sufficient
- The other hero image files (`hero-banner.png`, `hero-silhouette.png`) are not imported anywhere critical and will be removed to avoid future confusion

