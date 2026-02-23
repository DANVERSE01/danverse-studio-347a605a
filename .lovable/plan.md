

# Location Removal + Brand Info Update + Netlify Deployment Files

## What's Changing

### 1. Remove ALL Location References
Every mention of Cairo, Egypt, MENA, Middle East, GMT+2 gets removed or replaced with location-neutral text.

**Files affected:**

- **`src/pages/Index.tsx`** -- Remove "Cairo" from title/meta, update canonical to `https://danverse.ai`, fix OG description
- **`src/components/sections/Hero/index.tsx`** (line 80) -- Change `Creative Studio / Cairo` to just `Creative Studio`
- **`src/components/layout/Footer.tsx`** -- Remove "Cairo, Egypt" line, remove "GMT+2" line, remove "Cairo" from bottom bar
- **`src/components/sections/Journal/index.tsx`** (line 14) -- Replace article title "Cairo Is the New Berlin" with a non-location title (e.g. "The Rise of the Digital-First Studio") and update excerpt to remove Middle East reference
- **`src/components/ui/WorkModal.tsx`** -- Replace "MENA" with "global" or "regional" in case study descriptions, remove "Middle East" reference

### 2. Update Contact Info & Social Links

**Footer (`src/components/layout/Footer.tsx`):**
- Email: `hello@danverse.studio` becomes `danverseai@gmail.com`
- Social links: Replace `['LI', 'IG', 'BE', 'GH']` with actual links:
  - **IG** -> `https://instagram.com/muhammedd_adel`
  - **WA** -> `https://wa.me/201207346648`
- Remove the dummy LI, BE, GH links that go nowhere

**Domain updates across all files:**
- `danverse.studio` becomes `danverse.ai` everywhere

### 3. Update SEO & Meta

**`index.html`:**
- Remove `@Lovable` twitter site
- Update OG image URL (remove lovable placeholder)
- Update domain references to `danverse.ai`

**`src/pages/Index.tsx`:**
- Canonical URL: `https://danverse.ai`
- Title: Remove "Cairo"
- Meta descriptions: Remove all location references

### 4. Netlify Deployment Files

Create the standard Netlify config files for SPA deployment:

**`public/_redirects`:**
```text
/*    /index.html   200
```
This ensures all routes are handled by the SPA router (no 404s on refresh).

**`netlify.toml`:**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

**`public/robots.txt`** -- Update sitemap URL to `https://danverse.ai/sitemap.xml`

## Files Modified (Total: ~9 files)

1. `src/pages/Index.tsx` -- SEO meta, canonical URL, remove Cairo
2. `src/components/sections/Hero/index.tsx` -- Remove "Cairo" from tagline
3. `src/components/layout/Footer.tsx` -- Contact info, social links, remove location
4. `src/components/sections/Journal/index.tsx` -- Replace Cairo article
5. `src/components/ui/WorkModal.tsx` -- Replace MENA/Middle East references
6. `index.html` -- Domain, OG tags, remove Lovable twitter
7. `public/robots.txt` -- Add sitemap URL
8. `public/_redirects` -- NEW: Netlify SPA redirect
9. `netlify.toml` -- NEW: Netlify build config + headers
