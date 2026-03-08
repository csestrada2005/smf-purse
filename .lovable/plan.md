

# Fix: 3 Issues with Mobile Card Sections

## Problems
1. **Images load slowly** — only the active card's image is rendered; the hidden card's image isn't preloaded
2. **Scrolling up skips cards** — the `IntersectionObserver` resets `activeIndex` to 0 every time the section comes into view, so scrolling up into a card section always shows card 0 instead of card 1 (last card)
3. **Strong scrolls skip sections** — the snap container's `scroll-smooth` + `snap-mandatory` allows momentum to jump past card sections because `preventDefault` on the section only blocks if the event reaches it before the container scrolls

## Fixes

### 1. Preload both images (MobileCardSection.tsx)
- Render **both** card images at all times, but only show the active one
- Use `display: none` / `display: block` or absolute positioning with opacity so both images are decoded and cached by the browser
- Alternative: add hidden `<img>` preload elements for all card images

### 2. Direction-aware reset on intersection (MobileCardSection.tsx)
- Remove the `IntersectionObserver` that always resets to index 0
- Instead, track scroll direction: when the section enters the viewport from **below** (user scrolling up), set `activeIndex` to the **last card** (1). When entering from above (scrolling down), set to 0
- Use `IntersectionObserver`'s `boundingClientRect.top` vs `rootBounds` to determine direction

### 3. Block scroll at the container level (FullPageScroll.tsx + MobileCardSection.tsx)
The current approach only intercepts events on the section element, but the snap container can still receive momentum scroll. Fix:
- Attach `wheel` and `touch` listeners to the **snap container** (not just the section)
- Use a shared ref/context: `MobileCardSection` registers itself as "active and locked" when it's in view and hasn't completed its card sequence
- When the container receives a scroll event and a card section is locked, `preventDefault` on the container itself
- Alternatively: temporarily set `overflow: hidden` on the container while the card section is mid-transition, then restore it after the swap completes

**Chosen approach**: Use a `ScrollLockContext` provided by `FullPageContainer`:
- `FullPageContainer` holds a `lockedRef` and attaches `wheel`/`touch` listeners with `{ passive: false }` to its own div. When `lockedRef.current === true`, it calls `preventDefault()`
- `MobileCardSection` calls `lock()` when it needs to block scrolling (card 0 visible and user scrolls down, or card 1 visible and user scrolls up), performs the swap, then calls `unlock()` after cooldown
- This guarantees no scroll event reaches the snap logic regardless of momentum

## Files to Change

### `src/components/FullPageScroll.tsx`
- Add `ScrollLockContext` with `lock()`, `unlock()`, and a ref to the container div
- Attach native `wheel` and `touchmove` listeners `{ passive: false }` on the container; `preventDefault` when locked

### `src/components/MobileCardSection.tsx`
- Consume `ScrollLockContext` to lock/unlock the container
- Preload both images (render both, toggle visibility with CSS)
- Fix direction detection: use `IntersectionObserver` entry's `boundingClientRect` to determine if entering from top or bottom, set `activeIndex` accordingly
- Remove section-level wheel/touch listeners (container handles blocking now)
- Keep `swap()` with cooldown; lock before swap, unlock after cooldown

### `src/pages/Index.tsx`
- No changes needed

