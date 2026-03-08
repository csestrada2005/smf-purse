

## Analysis

Even with `quality: 100`, `vite-plugin-image-optimizer` still re-encodes the PNG through its compression pipeline, which can strip color profiles (sRGB/ICC) and subtly alter colors — especially noticeable on mobile screens with different color rendering. The fix is to **exclude the hero image from optimization entirely** so it's served byte-for-byte as the original file.

## Plan

### 1. Exclude hero image from the image optimizer (`vite.config.ts`)
Add an `exclude` option to `ViteImageOptimizer` targeting `hero-editorial.png` so it passes through untouched:

```typescript
ViteImageOptimizer({
  exclude: ['hero-editorial.png'],
  png: { quality: 100 },
  jpeg: { quality: 100 },
  svg: { multipass: true },
})
```

This ensures the hero image retains its exact original color profile on both desktop and mobile browsers.

