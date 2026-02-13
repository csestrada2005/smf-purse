

## Scroll-Driven Image Carousel for White and Black Variants

### Overview
Add a scroll-triggered image carousel to the White and Black product cards on `/shop`. As the user scrolls down the page, the displayed image transitions through three views: **Front → Side → Back**. Scrolling back up reverses the sequence.

### Uploaded Images (to be copied into `src/assets/`)
- `black-purse-back.png` — back of the black purse (image 1)
- `white-purse-back.png` — back of the white purse (image 2)
- `black-purse-side.png` — side of the black purse (image 3)
- `white-purse-side.png` — side of the white purse (image 4)

The **front** images already come from Shopify (the default product images).

### How It Works
1. Each featured card (White, Black) gets a set of 3 images: `[front (from Shopify), side, back]`.
2. Using `useScroll` from Framer Motion, we track how far the card is within the viewport.
3. The scroll progress (0 to 1) maps to image index: 0-0.33 = Front, 0.33-0.66 = Side, 0.66-1.0 = Back.
4. Images crossfade using opacity transitions for a smooth, editorial feel.
5. Small dot indicators below the image show which view is active.

### Technical Details

**Step 1: Copy the 4 uploaded images into `src/assets/`**
- `src/assets/black-purse-back.png`
- `src/assets/white-purse-back.png`
- `src/assets/black-purse-side.png`
- `src/assets/white-purse-side.png`

**Step 2: Create an image map in `Shop.tsx`**

```typescript
import blackBack from '@/assets/black-purse-back.png';
import whiteBack from '@/assets/white-purse-back.png';
import blackSide from '@/assets/black-purse-side.png';
import whiteSide from '@/assets/white-purse-side.png';

const extraImages: Record<string, { side: string; back: string }> = {
  'White': { side: whiteSide, back: whiteBack },
  'Black': { side: blackSide, back: blackBack },
};
```

**Step 3: Update the `VariantCard` component**

- Accept an optional `extraImages` prop (`{ side: string; back: string }`).
- If present, wrap the image area with a `ref` and use Framer Motion's `useScroll` to track the card's vertical position in the viewport.
- Render all 3 images stacked (absolute positioned), crossfading based on scroll progress using `useTransform` to derive the active index.
- Add 3 small dot indicators at the bottom of the image area to show front/side/back state.

```text
Scroll progress mapping:
  0.0 - 0.33  -->  Front (Shopify image)
  0.33 - 0.66 -->  Side
  0.66 - 1.0  -->  Back
```

- Images use `opacity` transitions (1 for active, 0 for inactive) with CSS `transition-opacity duration-500` for smooth crossfade.
- Non-featured variants (Beige, Pink, Camouflage) remain unchanged with a single static image.

**Step 4: No changes needed to other files** — this is entirely contained within `Shop.tsx` and the new image assets.

