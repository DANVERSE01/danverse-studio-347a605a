

# DANVERSE — AI-Powered Creative Studio Portfolio

## Vision
An Awwwards-caliber portfolio for "DANVERSE — AI-Powered Creative Studio (Cairo × Global)" built as a React SPA. Every interaction feels intentional and alive. Dark, layered, cinematic.

## Tech Adaptations (Next.js → Vite/React)
- React Router for routing (already installed)
- No SSR/RSC — everything client-rendered with smart code-splitting
- react-helmet-async for SEO meta tags
- Vite dynamic imports replace Next.js dynamic()

## Design System
- Complete CSS custom property system: void/abyss/deep/surface color layers, cyan/magenta/purple accent spectrum, fluid clamp-based typography, 8pt spatial grid
- Fonts: Cabinet Grotesk (display), Satoshi (body), Cairo (Arabic) — loaded via @font-face
- Atmospheric layers: noise grain overlay, scanline CRT effect, vignette
- Glass morphism, gradient borders, glow shadows
- `prefers-reduced-motion` fully respected

## Core Systems

### Custom Cursor (GPU-composited)
- Dot (6px cyan) + ring (44px outline) following mouse via useMotionValue
- Variants: default, hover (expands + "VIEW"), magnetic, video (▶), CTA
- MagneticButton component with physics-based pull toward cursor
- mix-blend-mode: difference for light sections
- Hidden on touch devices

### 3D Hero Scene (React Three Fiber)
- 5000-particle system with custom GLSL shaders (vertex + fragment inline)
- Mouse-reactive displacement, scroll-driven dispersion
- 3 floating orbs (cyan/magenta/purple) with orbital motion + post-processing (Bloom, ChromaticAberration, Noise)
- Camera parallax following mouse, scroll-driven zoom
- CSS blob fallback when WebGL unavailable

### Animation System (Framer Motion)
- Unified motion variants library: fadeUp, heroWord, scaleIn, slideLeft, staggerContainer
- Spring presets: gentle, snappy, bouncy, magnetic, cursor
- LazyMotion with domAnimation for bundle efficiency
- Lenis smooth scroll synced with Framer

### Sound Design (Web Audio API, opt-in)
- Synthesized sounds: hover (sine 800Hz), click (impact sweep), transition (frequency sweep)
- OscillatorNode + GainNode with envelopes — no audio files needed
- localStorage persistence, toggle in navbar

## Page Sections (Single-Page Home)

### 1. Loading Screen
- "DANVERSE" letter-by-letter reveal → gradient line grows → counter 0→100% → screen slides up
- Session storage flag: shows only on first visit

### 2. Hero — "WE ENGINEER CINEMATIC UNIVERSES"
- Full viewport with Three.js particle canvas behind
- Typewriter pre-headline in monospace cyan
- 4-line headline with word-by-word staggered reveal, "CINEMATIC" in gradient text
- Italic gold tagline fades in after 1.4s
- Primary CTA "Enter the Studio" (MagneticButton + NeonBorder) + "Watch Showreel ▶"
- Animated scroll indicator that hides after 200px scroll

### 3. Manifesto — "WE DON'T MAKE ADS. WE BUILD WORLDS."
- 250vh sticky section with per-word scroll-linked opacity reveal
- Words transition from near-invisible (0.06 opacity) to white with text-shadow glow
- Giant "DANVERSE" watermark at 0.3× parallax speed

### 4. The Craft — 7 Service Cards
- Horizontal drag-to-scroll on desktop, vertical stack on mobile
- Cards (380×520px): animated gradient placeholder video area, glassmorphism info panel
- Gradient border appears on hover, service number in cyan
- Services: Cinematic Advertising, AI Brand Systems, 3D & Immersive, Digital Product Design, Motion Systems, UGC Pipelines, AI Content OS

### 5. Selected Works — Portfolio Grid
- Filter system: ALL | ADS | BRANDING | WEB | 3D | AI with AnimatePresence
- True masonry layout with alternating card heights (300/420/340px)
- Hover: dark scrim slides up, project info fades in, scale 1.02, cursor → hover variant
- 12 fully detailed projects with realistic data
- Full-screen WorkModal (Dialog): 2-column layout with challenge/solution/results

### 6. Process — "HOW WE THINK"
- 4 phases, each 100vh with sticky left column
- Phase numbers with stroke → fill clip-path animation on scroll
- Unique CSS animated diagrams per phase (radar, node graph, terminal, trajectory)
- Phases: Diagnose, Architect, Engineer, Launch

### 7. Clients — Infinite Marquee
- Two rows of brand names scrolling in opposite directions at different speeds
- 20+ brand names (Decathlon, Vodafone, Samsung, Netflix, etc.)
- Individual brand highlights to cyan on hover

### 8. Studio — Behind the Curtain
- 3 animated counters: "12+ Creatives · 4 Countries · 0 Templates"
- Philosophy text + photo grid with grayscale→color hover + parallax

### 9. Journal — 3 Featured Articles
- Horizontal cards alternating layout direction
- Hover: image scale + gradient scrim
- Realistic article data with categories and read times

### 10. Final CTA — "START A PROJECT"
- Massive text with magnetic letter repulsion from cursor
- Slowly rotating conic gradient mesh background (CSS @property animated)
- Mouse-reactive radial glow following cursor
- Glass card with contact form (name, email, project type, budget)

## Navigation
- Scroll-triggered navbar: transparent → glass on scroll, hides on fast scroll-down
- Logo with random letter rotation on hover
- Magnetic nav links with active section dot indicator
- Mobile: full-screen sheet with staggered link animation
- Sound toggle + language toggle (EN/AR)

## Footer
- Giant ghosted "DANVERSE" text
- 4-column grid: brand + socials, navigation, services, contact
- Bottom bar with copyright

## RTL/Arabic Support
- Language toggle switches between EN and AR
- dir="rtl" applied, CSS logical properties throughout
- Cairo font loaded conditionally for Arabic
- All UI strings translated, animations direction-aware

## Accessibility (WCAG 2.2 AA)
- Skip links, logical focus order, focus-visible outlines in cyan
- Three.js canvas aria-hidden, reduced motion disables all animations
- Native cursor restored on touch devices and reduced-motion preference

## Performance Strategy
- Three.js scene loaded via lazy import with CSS fallback
- WorkModal, filters, and heavy sections code-split
- frameloop="demand" on Three.js canvas
- All videos lazy-loaded via IntersectionObserver
- Target: smooth 60fps on mid-range devices

