

# Hero Section — Animated Mosaic Image Grid

## Overview
Replace the current `WebGLFallback` background in the Hero section with a dynamic, animated mosaic/masonry image grid (inspired by the reference images). The grid will use all existing project images (8 main + 16 gallery = 24 images) arranged in an asymmetric, Behance-style layout that continuously animates with smooth, staggered reveal and subtle floating motion.

## Visual Design
- A full-screen mosaic grid behind the Hero text, using varying cell sizes (large, medium, small) in an asymmetric layout
- Each cell has a subtle hover scale effect, rounded corners, and a dark overlay so the text remains readable
- The grid slowly auto-scrolls vertically (infinite marquee style) for a living, breathing feel
- On load, images stagger in with fade + scale animations
- A strong gradient vignette overlay ensures the headline text stays crisp and legible on top

## Architecture

### New Component: `HeroGrid.tsx`
Location: `src/components/sections/Hero/HeroGrid.tsx`

- Imports all 24 project images (8 main + 16 gallery)
- Defines a grid layout using CSS Grid with `grid-template-columns` and `grid-row` spans for the masonry effect
- Wraps the grid in a vertical marquee container that duplicates the grid and uses CSS `@keyframes` for infinite upward scroll
- Each image cell:
  - Fades in with staggered `framer-motion` animation on mount
  - Has a subtle `scale(1.02)` float animation via CSS keyframes
  - Dark overlay at ~40-60% opacity for text readability
  - Rounded corners (`rounded-lg`)

### Modifications to `Hero/index.tsx`
- Replace `<WebGLFallback />` with `<HeroGrid />`
- Keep the existing vignette overlay (enhance it slightly for better text contrast over the grid)

### CSS Additions to `index.css`
- Add `@keyframes hero-grid-scroll` for smooth infinite vertical scroll
- Add `.hero-grid-item` utility for the float/breathe effect on individual cells

## Layout Spec (Desktop)
The grid uses 4 columns with varying row spans to create the asymmetric mosaic:

```text
+--------+------------+--------+
|  tall  |   wide     | small  |
|  img   |   img      +--------+
|        |            | small  |
+--------+-----+------+--------+
| wide         | tall |  med   |
| img          | img  |  img   |
+--------+-----+      +--------+
| small  | med |      | small  |
+--------+-----+------+--------+
```

On mobile: simplified 2-column grid with fewer images displayed.

## Animation Timeline
1. **0s-0.8s**: Grid images stagger in (fade + scale from 0.85 to 1)
2. **Continuous**: Entire grid scrolls upward slowly (60s cycle, infinite, pauses on hover)
3. **Each cell**: Subtle CSS `float` animation with randomized delays for organic movement

## Technical Details

### Files to Create
- `src/components/sections/Hero/HeroGrid.tsx` — The mosaic grid component

### Files to Modify
- `src/components/sections/Hero/index.tsx` — Swap `WebGLFallback` for `HeroGrid`
- `src/index.css` — Add hero grid keyframes and utilities

### Image Usage
All 24 existing images will be used:
- 8 main project images from `src/assets/works/`
- 16 gallery images from `src/assets/works/gallery/`

No new images need to be generated — the existing creative portfolio images are perfect for this mosaic effect.
