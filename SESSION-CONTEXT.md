# Delhi Six Couture — Session Context

**Last updated:** 2026-05-16
**Branch:** `main` (all work merged and deployed)
**Live URL:** https://delhisixcouture.netlify.app

---

## What Has Been Done

### Landing Page Fixes
- Mobile fonts raised to ≥16px, tap targets to ≥48px
- All images converted to WebP with `<picture>` fallback elements
- Hero image preload added
- Google Fonts render-blocking fixed (preconnect)
- Phone number made tappable (tel: link)
- CTA changed to "Book My Free Consultation"

### SEO / Trust
- Canonical tag added
- LocalBusiness JSON-LD schema added
- og:image changed to absolute URL
- Unique page titles per route

### Tracking
- **GA4** (`G-NEEN0P3F47`) — PageView on every route, `generate_lead` on form submit
- **Meta Pixel** (`980512221438613`) — PageView on every SPA route change (via `MetaPixelTracker` component using `useLocation`), `Lead` on form submit
- **CAPI** — Netlify Function at `my-app/netlify/functions/capi.js`, wired to form submit via `useCAPI` hook. Token stored in `netlify.toml` as `META_CAPI_TOKEN`.
- UTM parameter capture to sessionStorage on load

### Social
- Instagram: `@delhisix.couture`
- WhatsApp: `+917011764857` (floating button + footer)

### Infrastructure
- Netlify SPA routing fix (`_redirects` + `netlify.toml`)
- Shared design data extracted to `src/data/designs.js`

### Marketing Assets (not deployed — local files only)
- `brand-profile.json` — brand DNA (colors, fonts, voice, audience)
- `campaign-brief.md` — 3 campaign concepts, 12 ad units, full copy deck

---

## Pending Tasks (in priority order)

1. **Apply `capi-wiring.patch`** — push to GitHub so CAPI Lead event is live
2. **Verify CAPI** — Events Manager → Test Events → submit form → should see `Lead` appear twice (Pixel + CAPI) then deduplicated to 1
3. **Increase budget to ₹40,000+/month** before running ads
4. **Launch Meta campaign** — objective: Leads, start with Concept 2 "This Is Your Moment" from `campaign-brief.md`, target Women 24–38 India, landing page `/contact`
5. **After 7 days of ads** — run `/ads audit` in Claude Code for performance health check
6. **After ads are running** — consider adding `ViewContent` CAPI event on design detail pages

---

## Key Files

| File | Purpose |
|------|---------|
| `my-app/public/index.html` | Meta Pixel base code, GA4, schema, preloads |
| `my-app/src/App.js` | Routes, MetaPixelTracker, UTM capture, GA4 + Pixel + CAPI on form |
| `my-app/src/hooks/useCAPI.js` | CAPI hook — calls Netlify function |
| `my-app/netlify/functions/capi.js` | Server-side CAPI function |
| `my-app/netlify.toml` | Build config, META_CAPI_TOKEN env var, cache headers |
| `my-app/src/data/designs.js` | Single source of truth for all 10 designs |
| `brand-profile.json` | Brand DNA for ad creative generation |
| `campaign-brief.md` | Full ad campaign strategy and copy deck |
| `docs/capi-wiring.patch` | Patch to apply CAPI wiring commit to GitHub |

---

## Key IDs / Credentials

| Item | Value |
|------|-------|
| GA4 Measurement ID | `G-NEEN0P3F47` |
| Meta Pixel ID | `980512221438613` |
| Phone / WhatsApp | `+917011764857` |
| Instagram | `@delhisix.couture` |
