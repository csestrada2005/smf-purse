

## What we're doing

The 3rd uploaded image (white purse on burgundy/red velvet chair with checkered marble floor) sets the new brand vibe: **deep burgundy/wine reds, warm creams, rich dark wood tones, and classic black & white marble**. We'll refactor the entire color palette to match this mood and scatter all 3 new images across the site.

## Color Palette Refactor (based on 3rd photo)

Extracting from the velvet chair + marble floor + cream purse:

| Token | Current | New | Source |
|-------|---------|-----|--------|
| `--accent` | Gold `43 55% 45%` | Deep burgundy/wine `348 55% 32%` | Velvet chair |
| `--gold` | `43 55% 45%` | Keep as-is for hardware references | Gold chain on purse |
| `--cream` | `40 20% 92%` | Warmer cream `35 30% 93%` | Cream purse leather |
| `--section-2` | `0 0% 98%` | Warm off-white `30 15% 96%` | Light marble |
| `--section-4` | `0 0% 97%` | Subtle warm `25 10% 95%` | Ambient warmth |
| `--section-6` | `0 0% 98%` | `30 15% 96%` | Consistency |
| `--burgundy` | `348 65% 28%` | `348 55% 32%` | Velvet chair red |
| `--burgundy-deep` | `348 60% 16%` | `348 50% 18%` | Chair shadow |
| `--ring` | Gold | Burgundy to match new accent | |
| `--gradient-gold` | Gold gradient | Burgundy gradient | |

Key shift: **Gold accent → Burgundy/wine accent** throughout. Gold remains only for hardware/metallic references.

## Image Placement

### Image 1 — B&W editorial (woman holding multiple purses)
- **About page**: Replace the current `purse-heels.png` hero image with this one — fits the "Our Story" narrative perfectly.

### Image 2 — Black purse on hand
- **FeaturesSection**: Replace the current `product-main.png` with this image — showcases the product alongside the "Intentional Design" features.

### Image 3 — White purse on velvet chair
- **StorySection**: Add this as a full-bleed background or prominent image behind/beside the "Unapologetic Power" text — this IS the brand vibe.
- **ContactSection**: Use as a subtle background image with overlay.

## Files to modify

1. **`src/index.css`** — Update all CSS custom properties for the new palette (accent, ring, gradient, section backgrounds, burgundy values)
2. **`src/components/StorySection.tsx`** — Add Image 3 (velvet chair) as a visual element alongside the text
3. **`src/components/FeaturesSection.tsx`** — Replace product-main with Image 2 (black purse on hand)
4. **`src/pages/About.tsx`** — Replace purse-heels with Image 1 (B&W editorial)
5. **`src/components/ContactSection.tsx`** — Add Image 3 as background ambiance
6. **`tailwind.config.ts`** — No structural changes needed (tokens come from CSS vars)
7. **`src/components/Footer.tsx`** — Update `text-gold` / `border-gold` references to use new accent
8. **`src/components/Navigation.tsx`** — Update `text-gold` references to `text-accent`
9. **Copy the 3 uploaded images** into `src/assets/`

## Technical notes

- All `text-gold` and `hover:text-gold` class usages across components will be updated to `text-accent` / `hover:text-accent` since accent is now burgundy
- The `--gold` token stays for any explicit metallic/hardware references (e.g., "Gold-Tone Hardware" feature description)
- The shimmer animation gradient updates from gold hues to burgundy hues

