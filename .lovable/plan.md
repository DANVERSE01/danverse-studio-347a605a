
# Works Hover Effects + Cinematic Loading Screen

## 1. Works Section -- Crimson Glow Hover Effects

**File: `src/components/sections/Works/index.tsx`**

Currently the work rows have a subtle background tint and floating image on hover. Will intensify with:

### Row Hover Enhancements
- **Crimson glow background**: Increase the hover overlay from `0.02` to `0.06` opacity with a radial gradient glow effect
- **Crimson bottom line**: Already animates `scaleX` -- will add `box-shadow` glow to the accent line (`0 0 12px`)
- **Floating image glow**: Add crimson `box-shadow` around the floating preview image (`0 0 25px hsl(0 85% 55% / 0.3)`)
- **Title text glow**: Add `text-shadow` on the title when hovered (`0 0 20px hsl(0 85% 55% / 0.15)`)
- **Number glow**: Add glow to the index number on hover
- **Row border**: Top border brightens on hover from `white-10` to `white-20`

### Floating Image Enhancements
- Add a crimson border glow around the floating preview image
- Add a subtle crimson gradient overlay instead of just multiply blend

## 2. Loading Screen -- Cinematic Chrome Flash

**File: `src/components/ui/LoadingScreen.tsx`**

Currently it's a simple logo + thin progress bar. Will upgrade to a more cinematic experience:

### Visual Enhancements
- **Crimson progress bar**: Already using `--rose-gold` (which is now crimson) -- will make it thicker (2px instead of 1px) and add a glow effect (`box-shadow: 0 0 15px`)
- **Chrome flash sweep**: Add a bright white/crimson light sweep across the progress bar as it fills
- **Logo glow**: Add a subtle crimson glow behind the logo that pulses during loading
- **Counter styling**: Make the percentage counter larger (`text-xs` instead of `text-[9px]`) with crimson color at full opacity
- **Exit animation**: Add a vertical clip/wipe exit instead of simple fade -- more cinematic
- **Longer duration**: Extend total time slightly (2.5s total instead of 2.2s) for more drama
- **Background particles**: Add 2-3 subtle floating crimson dots in the background for atmosphere
- **Progress bar width**: Increase from `w-40` to `w-56` for more visual impact

### Technical Details
- Progress bar gets `box-shadow: 0 0 15px hsl(0 85% 55% / 0.4), 0 0 30px hsl(0 85% 55% / 0.2)`
- Logo gets animated `filter: drop-shadow(0 0 20px hsl(0 85% 55% / 0.3))` during count phase
- Exit uses `clipPath` animation from `inset(0)` to `inset(50% 0)` for a cinematic horizontal wipe
- Floating dots use simple CSS keyframe float animation

### Files to modify:
1. `src/components/sections/Works/index.tsx` -- hover glow effects
2. `src/components/ui/LoadingScreen.tsx` -- cinematic upgrade
