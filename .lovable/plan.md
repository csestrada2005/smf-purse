

## Problem Analysis

There are two competing mechanisms that conflict:

1. **FullPageContainer** blocks `wheel` and `touchmove` events on the snap container when locked
2. **MobileCardSection** detects scroll intent on `wheel` (works) and `touchstart/touchend` (problematic)

**The core bug on touch devices**: When locked, the container blocks ALL `touchmove` events. The MobileCardSection only detects the boundary on `touchend`. By the time it calls `unlock()`, the touch gesture is already over — the snap container never received the `touchmove` events needed to initiate a scroll. The user must perform a second swipe to actually advance.

**What the GitHub fix likely did right**: Made the container blocking solid so sections couldn't be skipped.

**What it broke**: After unlocking, there's no mechanism to actually trigger the scroll to the next section.

## Solution

After calling `unlock()` at a boundary, **programmatically scroll** the container to the next or previous snap section. This ensures the transition happens immediately, even though the current touch gesture was consumed by the lock.

### Changes

**`src/components/MobileCardSection.tsx`**:
- When the sequence completes (card 1 + scroll down, or card 0 + scroll up), after calling `unlock()`, immediately call `containerRef.current.scrollBy({ top: ±window.innerHeight, behavior: 'smooth' })` to advance the snap container to the next/previous section
- This applies to both `handleWheel` and `handleTouchEnd` boundary cases
- Keep the `completedRef` guard and all existing swap logic intact

**`src/components/FullPageScroll.tsx`**:
- No changes needed — the container-level blocking is correct and should stay as-is

### Why This Works

- The lock stays active for the entire card sequence (card 0 → card 1), preventing skip
- At the boundary, `unlock()` removes the block and `scrollBy` immediately triggers the snap transition
- On re-entry via IntersectionObserver, `completedRef` resets and `lock()` re-engages
- Works for both wheel (desktop) and touch (mobile) because it doesn't rely on the native gesture propagating

