

## Fix: Front Image Flashing to Side on Page Load

### Problem
The `useScroll` offset `["start end", "end start"]` means progress is 0 when the card's top reaches the viewport's bottom edge. By the time the card is actually visible on screen (its natural resting position after page load), the scroll progress is already around 0.4-0.5, which maps to the "Side" image. So the front image only flashes briefly before being replaced.

### Solution
Shift the scroll breakpoints so that the **Front** image persists through the card's natural at-rest position in the viewport, and transitions only begin when the user actively scrolls past that point.

### Changes (single file: `src/pages/Shop.tsx`)

**Update the `useTransform` breakpoints on line 179:**

Current:
```
[0, 0.35, 0.36, 0.5, 0.51, 0.65] -> [0, 0, 1, 1, 2, 2]
```

New:
```
[0, 0.55, 0.56, 0.7, 0.71, 0.85] -> [0, 0, 1, 1, 2, 2]
```

This keeps the Front image showing until the card has scrolled well past the center of the viewport (progress ~0.55), meaning:
- **0 to 0.55** = Front (card enters viewport and sits at rest)
- **0.56 to 0.70** = Side (user scrolls down further)
- **0.71 to 0.85** = Back (card nearing the top of viewport)

The transitions still happen at the same speed relative to each other, but are pushed later in the scroll timeline so the front image is the default resting state.

