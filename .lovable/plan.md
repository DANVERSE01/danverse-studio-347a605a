

# Phase 2: Branding Cleanup, Performance, UI Refinement, Contact Icons, Verification

---

## Phase 0 -- Lovable Branding Removal

### Findings from repo-wide search

Lovable references exist in these files only:

| File | Reference | Action |
|------|-----------|--------|
| `README.md` | Multiple mentions of "Lovable" (project links, instructions) | Replace entire content with DANVERSE-branded README |
| `vite.config.ts` (line 4) | `import { componentTagger } from "lovable-tagger"` | Remove import and plugin usage (dev-only tagger, no visual impact) |
| `package.json` (line 85) | `"lovable-tagger": "^1.1.13"` in devDependencies | Remove the dependency |

**NOT in code (platform-injected):** The "Edit in Lovable" badge visible on the live site is injected by the Lovable platform at runtime, not from repository source code. This cannot be removed from the codebase. It can only be toggled off in the Lovable project settings.

### Changes

1. **`README.md`** -- Rewrite with DANVERSE branding (project name, domain `danverse.ai`, no Lovable mentions)
2. **`vite.config.ts`** -- Remove `lovable-tagger` import and `componentTagger()` from plugins array
3. **`package.json`** -- Remove `lovable-tagger` from `devDependencies`

---

## Phase A -- Performance Upgrades (Zero Visual Change)

### 1. Fix `useMousePosition` hook (causes re-renders on every mouse move)

**File: `src/hooks/useMousePosition.ts`**

Current implementation calls `setState` on every `mousemove` event, causing full component re-renders. This is used in `FinalCTA/index.tsx` for a subtle glow effect.

Fix: Replace with `useRef` + `useEffect` that writes directly to a DOM element, OR throttle via `requestAnimationFrame`. Since the consumer (`FinalCTA`) renders a positioned div based on `mouse.x/y`, the cleanest fix is to use `useMotionValue` from framer-motion (already in the project) to avoid React re-renders entirely.

**New approach:**
- Return `{ x: MotionValue, y: MotionValue }` instead of `{ x: number, y: number }`
- Update `FinalCTA/index.tsx` to use `motion.div` with `style={{ left: mouse.x, top: mouse.y }}` (framer-motion handles this without re-renders)

### 2. CustomCursor -- already performant

The cursor already uses `useMotionValue` + `useSpring` (no React state for position). It also checks for touch devices. It already respects `prefers-reduced-motion` via CSS. No changes needed except adding an explicit reduced-motion check to skip rendering.

### 3. Add `loading="lazy"` to below-the-fold images

**File: `src/components/layout/Footer.tsx`** -- Add `loading="lazy"` to footer logo image

### 4. Navbar scroll listener cleanup

**File: `src/components/layout/Navbar.tsx`** -- The `lastScrollY` in state causes re-renders. Convert to `useRef` for the tracking value.

---

## Phase B -- Apple-Like UI Refinement (Controlled)

### 1. Button states (premium feel)

**File: `src/components/ui/MagneticButton.tsx`**
- Add `focus-visible` ring styling (crimson outline for keyboard navigation)
- Already has `whileTap={{ scale: 0.97 }}` which is good

**File: `src/components/sections/FinalCTA/index.tsx`**
- Add `focus-visible` styling to the submit button
- Add a subtle `disabled` state style (opacity + pointer-events) while form is submitting

### 2. Navbar link transitions

**File: `src/components/layout/Navbar.tsx`**
- Add `focus-visible` outline to nav links for keyboard accessibility
- Smooth the hover transition with a slight scale or opacity shift (very subtle, 0.02 opacity change)

### 3. Mobile motion parity

**File: `src/components/layout/CustomCursor.tsx`**
- Add explicit `prefers-reduced-motion` check: if reduced motion is preferred, return `null`

**File: `src/index.css`**
- Already has `@media (prefers-reduced-motion: reduce)` -- verified sufficient

### 4. Form select styling

**File: `src/components/sections/FinalCTA/index.tsx`**
- Add `focus-visible` border change on the select element (consistent with inputs)

---

## Phase C -- Contact Action Icons + Direct Linking

### Footer contact section upgrade

**File: `src/components/layout/Footer.tsx`**

Current contact section uses plain text links. Will add inline SVG icons (no new dependencies, using lightweight custom SVGs matching the project's minimal icon style):

- **Email icon** (envelope) + `mailto:danverseai@gmail.com`
- **Instagram icon** (camera/square) + `https://instagram.com/muhammedd_adel`
- **WhatsApp icon** (phone/chat) + `https://wa.me/201207346648`

Each link will:
- Have an inline SVG icon (12x12, matching existing text size)
- Be wrapped in an `<a>` with correct `href`, `target="_blank"`, `rel="noopener noreferrer"`
- Have `focus-visible` outline for keyboard accessibility
- Keep the existing text labels and layout spacing

Also upgrade the social links in the logo column (currently just "IG" / "WA" text) to include matching icons.

### FinalCTA contact references

No contact links exist in FinalCTA beyond the form itself -- no changes needed there.

---

## Phase D -- Full Functionality Verification

After implementing all changes, verify:

1. **Nav links**: All 5 nav items (`#works`, `#craft`, `#process`, `#studio`, `#journal`) scroll to correct sections
2. **Hero CTAs**: "Explore Work" scrolls to `#works`, "Showreel" scrolls to `#contact`
3. **Footer links**: All navigate links, contact links (email, IG, WA) open correct targets
4. **"Get in touch" CTA** in navbar scrolls to `#contact`
5. **Mobile menu**: Opens/closes, all links work
6. **Contact form**: Validates correctly, shows success state on valid submit
7. **Works section**: Filter buttons work, work items are clickable, modal opens/closes
8. **Loading screen**: Shows on first visit, skips on session reload
9. **404 page**: `/nonexistent` route shows NotFound page
10. **All external links** open in new tab with `rel="noopener noreferrer"`

Any broken items found will be fixed with minimal scoped changes.

---

## Summary of Files to Modify

| File | Phase | Change |
|------|-------|--------|
| `README.md` | 0 | Replace with DANVERSE-branded content |
| `vite.config.ts` | 0 | Remove lovable-tagger |
| `package.json` | 0 | Remove lovable-tagger devDep |
| `src/hooks/useMousePosition.ts` | A | Use MotionValue instead of setState |
| `src/components/sections/FinalCTA/index.tsx` | A+B | MotionValue mouse, focus-visible states |
| `src/components/layout/Navbar.tsx` | A+B | useRef for lastScrollY, focus-visible |
| `src/components/layout/Footer.tsx` | A+C | lazy loading, contact icons |
| `src/components/layout/CustomCursor.tsx` | B | reduced-motion check |
| `src/components/ui/MagneticButton.tsx` | B | focus-visible ring |

