

# Mobile Pre-Section Scroll Experience

## Overview
On mobile only, each product group (Drop 1, What's Clasp?) gets a cinematic scroll sequence: a full-bleed "pre-section" image → white canvas reveal → card 1 → card 2. Desktop remains unchanged.

## Scroll Sequence (mobile)

```text
Hero
  ↓ scroll
[Pre-section: Drop 1] — full-screen image + title overlay
  ↓ scroll
[White canvas] — card "Buy Now" fades in after 1s
  ↓ scroll
[Same white canvas] — "Buy Now" vanishes, "Discover Versions" appears
  ↓ scroll
[Pre-section: What's Clasp?] — full-screen image + title overlay
  ↓ scroll
[White canvas] — card "Discover" fades in after 1s
  ↓ scroll
[Same white canvas] — "Discover" vanishes, "Contact Us" appears
  ↓ scroll
Contact / Footer
```

## Implementation

### 1. Add two new images as assets
Copy uploaded images to `src/assets/`:
- `drop1-presection.png` (black purse flat-lay)
- `clasp-presection.png` (vanity/makeup flat-lay)

### 2. Create `MobilePreSection` component
A reusable full-screen snap section showing a cover image with a centered title overlay. Only rendered on mobile via `useIsMobile()`.

### 3. Create `MobileCardSection` component
A reusable full-screen snap section with a white background. Receives a single card (image, label, link). Uses Framer Motion to fade the card in with a 1-second delay when the section enters the viewport.

### 4. Refactor `Index.tsx` for conditional mobile layout
Use `useIsMobile()` to conditionally render:
- **Desktop**: Current layout unchanged (Hero → DropOneSection → WhatsClaspSection → Contact → Footer)
- **Mobile**: Hero → Drop1 PreSection → BuyNow Card → DiscoverVersions Card → WhatsClaps PreSection → Discover Card → ContactUs Card → Contact → Footer

### 5. Keep existing desktop sections untouched
`DropOneSection` and `WhatsClaspSection` render only on desktop (hidden on mobile via the conditional in Index). Their code stays as-is.

## Technical Details

- All new sections use `FullPageSection` for consistent snap behavior
- The white canvas "covering" effect is achieved naturally by snap-scrolling — the white section snaps over the pre-section image, giving the visual of sliding over it
- Card fade-in uses `motion.div` with `initial={{ opacity: 0, y: 30 }}` and `whileInView` with a 1-second delay
- `useIsMobile()` hook already exists and handles the breakpoint at 768px

