

# Hero Grid Glow + Favicon Fix + Site Audit

## 1. Hero Grid -- Aggressive Crimson Glow on Hover

**File: `src/components/sections/Hero/HeroGrid.tsx`**

Currently the hover effect is a subtle `inset box-shadow` with low opacity. Will upgrade to:
- **Crimson border glow**: Strong red `box-shadow` (both inset and outset) on hover
- **Scale boost**: Increase from `scale-110` to `scale-115` for more dramatic zoom
- **Red color overlay**: Add a crimson tint overlay that fades in on hover
- **Brighter image**: Reduce the dark overlay opacity on hover so images pop more
- Add a transition on the gradient overlay so it lightens on hover

```text
Before (hover):
  box-shadow: inset 0 0 30px hsl(0 85% 55% / 0.15)

After (hover):
  box-shadow: inset 0 0 40px hsl(0 85% 55% / 0.3),
              inset 0 0 80px hsl(0 85% 55% / 0.15),
              0 0 30px hsl(0 85% 55% / 0.2)
  + crimson color overlay at 0.08 opacity
  + gradient overlay dims to 0.15 (from 0.45)
```

## 2. Favicon Fix

**File: `index.html`**

The favicon reference is correct (`/favicon.png`), but the old `favicon.ico` still exists. Will:
- Re-copy the uploaded dark DANVERSE logo (`hf_20260223_072920`) to `public/favicon.png`
- Remove the old `favicon.ico` to avoid browser cache confusion
- Add `?v=2` cache-busting param to the favicon link

## 3. Site-wide Color Audit (minor fixes found)

All sections are already using the Obsidian Chrome tokens (`rose-gold`, `platinum`, `pearl`). The CSS variables are correctly mapped to crimson/chrome values. No broken color references found -- the system is consistent.

### Files to modify:
1. `src/components/sections/Hero/HeroGrid.tsx` -- aggressive hover glow
2. `index.html` -- favicon cache bust
3. Copy favicon image to `public/favicon.png`

