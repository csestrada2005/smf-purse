

# Fix: Scroll-Lock Card Sections for Mobile

## Problem
Currently each card is its own snap section (6 total between the two groups), so scrolling past a pre-section skips straight through individual cards. The user wants each card group to be **one static section** that internally swaps between two cards before allowing scroll to continue.

## Approach
Rewrite `MobileCardSection` to accept **two cards** and use scroll-lock logic within a single snap section. The key technical fix from the previous failed attempt: attach `wheel` and `touchmove` listeners with `{ passive: false }` directly on the section DOM element (not via React synthetic events) so `preventDefault()` actually blocks the snap container's scroll.

## Changes

### 1. Rewrite `MobileCardSection.tsx`
- Accept an array of two cards: `cards: { image, label, link, alt }[]`
- Render as a single `snap-start snap-always` section
- Track `activeIndex` (0 or 1) via state + ref
- On section mount, attach native `wheel` and `touchstart/touchend` listeners to the section element with `{ passive: false }`
- **Wheel handler**: If `activeIndex === 0` and scrolling down → `e.preventDefault()`, swap to card 1. If `activeIndex === 1` and scrolling up → `e.preventDefault()`, swap back to card 0. Otherwise let the event through naturally (browser snap takes over)
- **Touch handler**: Same logic using touch delta. Track `touchStartY` on `touchstart`, compute delta on `touchend`
- Add a cooldown (~600ms) after each swap to prevent double-firing
- Use `AnimatePresence` + `motion.div` with fade+slide for card transitions
- Remove dot indicators

### 2. Update `Index.tsx`
Reduce from 6 card sections to 2, each receiving a cards array:

```
<MobilePreSection title="Drop 1" ... />
<MobileCardSection cards={[
  { image: drop1White, label: "Buy Now", link: "/product/Drop1/W" },
  { image: drop1Black, label: "Discover Versions", link: "/shop" }
]} />
<MobilePreSection title="What's Clasp?" ... />
<MobileCardSection cards={[
  { image: claspBack, label: "Discover", link: "/about" },
  { image: claspHeels, label: "Contact Us", link: "/contact" }
]} />
```

### 3. `FullPageScroll.tsx` — no changes needed
The snap container stays as-is. The scroll blocking happens at the section level via native `preventDefault()`.

## Why This Will Work (vs previous attempt)
The previous scroll-lock failed because React synthetic events and/or passive listeners couldn't actually prevent the snap container from scrolling. This time:
- Native `addEventListener` with `{ passive: false }` on the section element
- `e.preventDefault()` + `e.stopPropagation()` on the native event object
- Cooldown timer prevents rapid double-swaps
- Ref-based `activeIndex` tracking avoids stale closure issues

