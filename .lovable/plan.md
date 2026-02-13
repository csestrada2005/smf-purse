

## Fix: Front Image Flashing to Side on Mobile `/shop` Page

### Problem
The scroll-based image transition on the `/shop` page uses `useScroll` with offset `["start end", "end start"]`, which means scroll progress is already partway through when the card is naturally visible on screen. On mobile, the cards sit higher in the viewport on load, so the scroll progress is around 0.48-0.5 -- right at the transition point -- causing the **side** image to show instead of the **front**.

### Solution
Push the transition breakpoints later in the scroll timeline so the **front** image remains visible through the card's natural resting position on both mobile and desktop.

### Changes (single file: `src/pages/Shop.tsx`)

**Update the `useTransform` breakpoints on line 178:**

Current:
```
[0, 0.48, 0.49, 0.6, 0.61, 0.72] -> [0, 0, 1, 1, 2, 2]
```

New:
```
[0, 0.58, 0.59, 0.7, 0.71, 0.82] -> [0, 0, 1, 1, 2, 2]
```

This shifts all transitions ~0.1 later, meaning:
- **0 to 0.58** -- Front image (covers the card's at-rest position on mobile)
- **0.59 to 0.70** -- Side image (user scrolls further down)
- **0.71 to 0.82** -- Back image (card nearing the top of viewport)

The front image will now persist as the default view when the page loads on mobile, with transitions only beginning when the user actively scrolls past the card.

