# Landing Page Audit — Delhi Six Couture
**Date:** 2026-05-11 | **Pages audited:** Homepage, Collection, Contact, Design Details

---

## Overall Health Score

```
Landing Page Health (Homepage — primary ad landing page)

Message Match:    ████████░░  78/100
Page Speed:       █████████░  88/100
Mobile:           ██████░░░░  62/100
Trust Signals:    ██████░░░░  60/100
Form Quality:     ███████░░░  68/100
                            ──────
Overall Score:    ███████░░░  72/100  Grade: C+
```

> The site looks beautiful and loads fast. The gap between a C+ and an A is almost entirely fixable without design changes: tracking, schema markup, tap targets, font sizes, and a phone `tel:` link.

---

## 1. Message Match — 78/100

### What's working
- Hero headline **"Your Story, Our Silhouette"** is emotionally strong and on-brand
- Sub-headline "Heritage meets elegance in every stitch" reinforces the bespoke angle
- Two CTAs above the fold on desktop: **"Explore Our Designs"** and **"Schedule Consultation"** ✅
- Both CTAs visible above fold on mobile too ✅
- Hero image is the actual product (a lehenga) — no stock photo mismatch ✅

### Issues
| Issue | Impact |
|-------|--------|
| No price anchor anywhere on the site — a visitor from a "bridal lehenga ₹2L" ad has no confirmation they're in the right budget range | High |
| "PRICE PER REQUEST" label on collection cards signals premium but may deter mid-budget visitors from ad traffic | Medium |
| No dynamic keyword insertion or audience-specific messaging — a "Zardozi lehenga Delhi" searcher lands on a generic hero | Medium |
| Collection hero text doesn't reinforce an ad campaign keyword — it's purely brand-focused | Low |

### Recommendation
Add a subtle trust line near the hero CTAs: *"Ensembles from ₹1,00,000 · 8–18 week lead time"* — sets expectations and qualifies visitors instantly.

---

## 2. Page Speed — 88/100

### Measurements (localhost dev build — production will be faster with minification)
| Metric | Value | Status |
|--------|-------|--------|
| DOM Content Loaded | 19ms | ✅ Pass |
| Load event | 20ms | ✅ Pass |
| Total resources | 8 | ✅ Excellent |
| Transfer size | ~1KB (cached) | ✅ Pass |
| Horizontal scroll | None | ✅ Pass |

### Issues
| Issue | Impact |
|-------|--------|
| **All images are JPEG/JPG — zero WebP** served. Hero image and product images could be 30–50% smaller in WebP/AVIF | High |
| Images have no explicit `width`/`height` attributes — browser can't reserve space, causing layout shift (CLS) as images load | Medium |
| Google Fonts loaded via `@import` in CSS (render-blocking). Should use `<link rel="preconnect">` + `<link rel="stylesheet">` in `<head>` instead | Medium |
| No `<link rel="preload">` for the hero image in `<head>` (the `loading="eager"` + `fetchPriority="high"` on the `<img>` is good, but a `<link rel="preload">` in `<head>` starts even earlier) | Low |

### Quick wins
```html
<!-- Add to public/index.html <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="image" href="/images/design3/main.jpg">
```

Convert images to WebP using `cwebp` or Netlify's image CDN:
```bash
# One-time conversion
find my-app/public/images -name "*.jpg" -exec cwebp {} -o {}.webp \;
```

---

## 3. Mobile Experience — 62/100

### What's working
- No horizontal scroll ✅
- Hero CTAs stack full-width on mobile ✅
- CTA buttons visible above fold on iPhone 14 (390px) ✅
- Hamburger nav works correctly ✅

### Issues (measured at 390px viewport)

**Tap targets too small** — fails the 48×48px minimum:
| Element | Size | Required |
|---------|------|----------|
| Nav links (Home, Rivayat Collection, Get In Touch) | 43×34px | 48×48px |
| Pagination ← Previous / Next → buttons | 115×40px | ≥48px height |
| Pagination numbered page buttons (1, 2) | 37×36px | 48×48px |
| Carousel prev/next arrows | 32×32px | 48×48px |
| Carousel dot indicators | 12×8px | 48×48px |

**Font sizes too small on mobile** — 14 elements below 16px minimum:
| Element | Size | Location |
|---------|------|----------|
| Hero subheading "Heritage meets elegance…" | 14px | Homepage hero |
| Section description paragraphs | 14px | Multiple sections |
| Journey step descriptions | 11px | Bespoke Journey section |
| Design tags (Peacock, Red Silk…) | 10px | Collection cards |
| Eyebrow labels | 12px | Various |

**Phone number not tappable** — `(+91) 70117 64857` on Contact page is plain text, not a `tel:` link. On mobile this means users cannot tap-to-call.

### Fix for phone number (`App.js` ContactPage)
```jsx
// Replace:
<div className="info-value">(+91) 70117 64857</div>
// With:
<a href="tel:+917011764857" className="info-value" style={{textDecoration:'none'}}>
  (+91) 70117 64857
</a>
```

---

## 4. Trust Signals — 60/100

### What's working
- 3 named testimonials with wedding dates ✅
- 5-star ratings shown ✅
- Founder photo + name + title ✅
- WhatsApp floating button (social proof of accessibility) ✅
- Studio location and hours on contact page ✅
- "24 hours" response promise on contact page ✅

### Missing
| Missing Element | Impact |
|----------------|--------|
| **No analytics/conversion tracking** — no Google Analytics, no Meta Pixel, no GTM. Cannot measure which ads convert, cannot build remarketing audiences | Critical for ads |
| **No Schema markup** — no `LocalBusiness`, `Product`, or `Review` structured data. Google cannot show rich results (star ratings, price, location) in search | High |
| **No `canonical` tag** — duplicate content risk if the site is accessed via multiple URLs | Medium |
| **No SSL badge / trust seal** near the form CTA | Medium |
| **Testimonials have no photos** — named testimonials without faces carry less social proof weight | Medium |
| **No review count** ("3 brides" is low social proof volume vs. "500+ happy brides") | Medium |
| **No Instagram / portfolio link** — for a visual brand this is a major trust gap; brides want to see more work | High |
| Phone number in sidebar is not a `tel:` link | Medium |

---

## 5. Form Quality — 68/100

### Contact page form assessment
| Factor | Status | Score |
|--------|--------|-------|
| Field count (7 fields) | Moderate — above ideal 4-5 for top-of-funnel | ⚠️ |
| Required fields | Only 3 required (name, email, wedding date) — good | ✅ |
| Inline validation | Yes — errors clear on change | ✅ |
| Submit CTA text | "Send Enquiry" — generic, could be stronger | ⚠️ |
| WhatsApp quick escape | "💬 Quick Chat" button — excellent friction reducer | ✅ |
| Progress indicator | None — single step form, not needed | ✅ |
| Pre-fill from URL | No UTM/parameter pre-fill | ❌ |
| Thank-you / confirmation | Shows inline success message ✅ then opens WhatsApp | ✅ |
| Phone as tel link | Missing | ❌ |
| Year options | Only 2026–2031 — misses late 2025 bookings | ⚠️ |

### Form field count context
With 7 fields this sits in "Lower CVR" territory per benchmarks. The wedding month/year counts as 2 fields visually. Recommendation: make Design Interest and Budget optional/collapsed by default (they already are optional — just visually de-emphasise them).

### Submit button improvement
```
Current:   "Send Enquiry"
Better:    "Book My Free Consultation"  or  "Start My Bespoke Journey"
```
Specific CTA copy increases CVR by 10–15%.

---

## 6. Conversion Tracking — CRITICAL GAP

**No tracking whatsoever is installed.** Running paid ads without conversion tracking means:
- No way to know which campaign/keyword drives consultations
- No remarketing audiences (Meta, Google)
- No lookalike audiences
- Google/Meta smart bidding has no signal to optimise toward

### Minimum viable tracking setup

**Step 1 — Google Analytics 4**
```html
<!-- public/index.html <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Step 2 — Track WhatsApp form submission as conversion event**
In `App.js` `ContactPage` `handleSubmit`, after `setSubmitted(true)`:
```js
if (window.gtag) {
  window.gtag('event', 'generate_lead', {
    event_category: 'contact',
    event_label: designType || 'general'
  });
}
```

**Step 3 — UTM parameter preservation**
```js
// Add to App.js top level — reads UTMs on load and stores in sessionStorage
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  ['utm_source','utm_medium','utm_campaign','utm_content','gclid','fbclid'].forEach(k => {
    if (params.get(k)) sessionStorage.setItem(k, params.get(k));
  });
}, []);
```

---

## 7. SEO / Organic Signals

| Check | Status |
|-------|--------|
| `og:title` | ✅ Set |
| `og:description` | ✅ Set |
| `og:image` | ✅ Set (just fixed) |
| `og:url` | ✅ Set (just fixed) |
| `canonical` tag | ❌ Missing |
| Schema: LocalBusiness | ❌ Missing |
| Schema: Product/ItemList | ❌ Missing |
| Schema: Review | ❌ Missing |
| `robots.txt` | ❌ Not checked |
| `sitemap.xml` | ❌ Not present |
| Page titles unique per route | ❌ All pages share same `<title>` |

### Schema markup to add (highest SEO impact)
```json
// Add to public/index.html as <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Delhi Six Couture",
  "description": "Luxury bridal wear and bespoke wedding ensembles from Old Delhi",
  "url": "https://delhisixcouture.netlify.app",
  "telephone": "+917011764857",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Old Delhi Heritage District",
    "addressLocality": "New Delhi",
    "addressCountry": "IN"
  },
  "openingHours": ["Mo-Sa 11:00-20:30"],
  "priceRange": "₹₹₹"
}
```

---

## Prioritised Quick Wins

| Priority | Fix | Est. CVR Impact | Effort |
|----------|-----|-----------------|--------|
| 🔴 1 | **Install GA4 + WhatsApp lead event tracking** | Enables all future optimisation | 1 hr |
| 🔴 2 | **Convert all images to WebP** | –30% load time, better LCP | 2 hrs |
| 🟠 3 | **Fix phone number to `tel:` link** | +5–10% mobile contact rate | 5 min |
| 🟠 4 | **Add Schema LocalBusiness markup** | Rich results in Google | 30 min |
| 🟠 5 | **Add `canonical` tag to `<head>`** | Prevent duplicate content | 5 min |
| 🟠 6 | **Increase mobile font sizes to ≥16px** (journey steps at 11px, tags at 10px) | Readability + mobile CVR | 30 min |
| 🟠 7 | **Increase tap target sizes** (pagination, nav links, carousel arrows) | +5–10% mobile CVR | 30 min |
| 🟡 8 | **Change submit CTA to "Book My Free Consultation"** | +10–15% form CVR | 2 min |
| 🟡 9 | **Add price anchor near hero CTA** ("From ₹1,00,000") | Qualifies traffic, reduces bounce | 10 min |
| 🟡 10 | **Add `<link rel="preconnect">` for Google Fonts** | –200–500ms render time | 5 min |
| 🟡 11 | **Add unique `<title>` per page** (Collection, Contact, Design detail) | SEO click-through rate | 30 min |
| 🟡 12 | **Add Instagram portfolio link** | Trust signal for visual brand | 10 min |

---

## Ad Platform Readiness

| Platform | Readiness | Blocker |
|----------|-----------|---------|
| Google Search Ads | ⚠️ Not ready | No conversion tracking — smart bidding blind |
| Google Display / Remarketing | ❌ Not ready | No GA4 audience data |
| Meta / Instagram Ads | ❌ Not ready | No Meta Pixel |
| WhatsApp Business Ads | ✅ Ready | WhatsApp integration already works well |
| Organic SEO | ⚠️ Partial | Schema, canonical, sitemap missing |

**Bottom line:** Fix tracking first (Priority 1) before spending a single rupee on paid ads. Everything else is iterative improvement on top of a strong visual foundation.
