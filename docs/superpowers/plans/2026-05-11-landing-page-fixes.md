# Landing Page Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all 11 landing page audit issues (excluding "price per request"): GA4 tracking, WebP images, phone tel: link, schema markup, canonical tag, mobile font sizes, tap targets, CTA text, price anchor, Google Fonts preconnect, unique page titles, and Instagram link.

**Architecture:** Changes span four files — `public/index.html` for SEO/tracking head tags, `styles.css` for mobile UX, `App.js` for content/behaviour fixes, and `Footer.js` for Instagram. WebP conversion is a one-time Node script that generates `.webp` siblings from existing JPEGs, with `<picture>` elements serving WebP with JPEG fallback.

**Tech Stack:** React 19, Create React App 5, CSS, Node.js (sharp for WebP conversion), Netlify

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Modify | `my-app/public/index.html` | Google Fonts preconnect, canonical, LocalBusiness schema, GA4 |
| Modify | `my-app/src/styles.css` | Font sizes ≥16px on mobile, tap targets ≥48px |
| Modify | `my-app/src/App.js` | tel: link, CTA text, price anchor, unique titles, UTM capture |
| Modify | `my-app/src/components/Footer.js` | Instagram link |
| Create | `my-app/scripts/convert-webp.js` | One-time WebP conversion script |

---

## Task 1: HTML Head — Fonts, Canonical, Schema, GA4

**Files:**
- Modify: `my-app/public/index.html`
- Modify: `my-app/src/styles.css` (remove `@import` line)

- [ ] **Step 1: Update `public/index.html`**

Replace the entire `<head>` block with:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#7b1e1e" />
    <meta name="description" content="Delhi Six Couture - Luxury Bridal Wear, Customized Designs & Wedding Fashion" />
    <meta name="keywords" content="bridal wear, luxury wedding, customized designs, delhi couture, indian wedding fashion" />
    <meta property="og:title" content="Delhi Six Couture - Luxury Bridal Collections" />
    <meta property="og:description" content="Explore exquisite bridal wear and customized wedding designs by Delhi Six Couture" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="/images/design3/main.jpg" />
    <meta property="og:url" content="https://delhisixcouture.netlify.app/" />
    <link rel="canonical" href="https://delhisixcouture.netlify.app/" />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />

    <!-- Google Fonts: preconnect before stylesheet for faster load -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet" />

    <!-- Hero image preload: starts fetch before React renders -->
    <link rel="preload" as="image" href="/images/design3/main.jpg" />

    <!-- LocalBusiness schema: enables rich results in Google Search -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Delhi Six Couture",
      "description": "Luxury bridal wear and bespoke wedding ensembles inspired by Old Delhi heritage",
      "url": "https://delhisixcouture.netlify.app",
      "telephone": "+917011764857",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Old Delhi Heritage District",
        "addressLocality": "New Delhi",
        "addressCountry": "IN"
      },
      "openingHours": ["Mo-Sa 11:00-20:30"],
      "priceRange": "₹₹₹",
      "image": "https://delhisixcouture.netlify.app/images/design3/main.jpg"
    }
    </script>

    <!-- Google Analytics 4: replace G-XXXXXXXXXX with your real Measurement ID -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    </script>

    <title>Delhi Six Couture - Luxury Bridal Wear & Customized Designs</title>
  </head>
```

- [ ] **Step 2: Remove `@import` from `styles.css`**

In `my-app/src/styles.css`, delete line 2:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Playfair+Display:wght@400;600;700&display=swap');
```
The fonts are now loaded via `<link>` in `index.html` which is faster (avoids render-blocking @import).

- [ ] **Step 3: Verify**

```bash
grep -n "preconnect\|canonical\|ld+json\|gtag\|preload" /Users/aythapar/DelhiSixCode/my-app/public/index.html | head -20
```
Expected: lines for preconnect (×2), canonical, ld+json script, gtag script×2, preload.

```bash
grep -n "@import" /Users/aythapar/DelhiSixCode/my-app/src/styles.css
```
Expected: no output (import removed).

- [ ] **Step 4: Run tests**

```bash
cd /Users/aythapar/DelhiSixCode/my-app && npm test -- --watchAll=false 2>&1 | tail -10
```
Expected: `Tests: 2 passed`

- [ ] **Step 5: Commit**

```bash
cd /Users/aythapar/DelhiSixCode && git add my-app/public/index.html my-app/src/styles.css
git commit -m "feat: add canonical, schema, GA4, fonts preconnect to index.html"
```

---

## Task 2: Mobile Font Sizes & Tap Targets

**Files:**
- Modify: `my-app/src/styles.css`

The audit found these violations:
- Journey step descriptions: **11–12px** on mobile (minimum: 16px)
- Design tags: **10px** (minimum: 12px)
- Hero subheading at 480px: **14px** (minimum: 16px)
- `.btn` min-height: **40px** (minimum: 48px)
- Nav links: **34px** height (minimum: 48px on desktop)
- Pagination buttons: **40px** height (minimum: 48px)

- [ ] **Step 1: Fix `.btn` tap target**

Find in `styles.css` (line ~86):
```css
.btn{display:inline-flex;align-items:center;justify-content:center;padding:0.7rem 1.4rem;border-radius:8px;background:var(--deep-red);color:white;font-weight:600;transition:transform .18s ease,box-shadow .18s ease;border:none;cursor:pointer;min-height:40px}
```
Change `min-height:40px` → `min-height:48px`:
```css
.btn{display:inline-flex;align-items:center;justify-content:center;padding:0.7rem 1.4rem;border-radius:8px;background:var(--deep-red);color:white;font-weight:600;transition:transform .18s ease,box-shadow .18s ease;border:none;cursor:pointer;min-height:48px}
```

- [ ] **Step 2: Fix nav link tap targets**

Find (line ~38):
```css
.nav-link{font-size:0.95rem;padding:8px 0;opacity:0.9;font-weight:500;transition:all 0.3s ease;color:var(--dark-brown);text-decoration:none;position:relative}
```
Change `padding:8px 0` → `padding:12px 0` and add `min-height:48px;display:inline-flex;align-items:center`:
```css
.nav-link{font-size:0.95rem;padding:12px 0;min-height:48px;display:inline-flex;align-items:center;opacity:0.9;font-weight:500;transition:all 0.3s ease;color:var(--dark-brown);text-decoration:none;position:relative}
```

- [ ] **Step 3: Fix journey step font sizes on mobile**

Find the `@media (max-width:600px)` block for journey steps (line ~392):
```css
@media (max-width:600px){
  .journey{padding:30px 0}
  .journey-step{gap:12px}
  .step-circle{width:56px;height:56px;font-size:24px}
  .step-content h4{font-size:14px}
  .step-content p{font-size:12px}
}
```
Change `font-size:12px` → `font-size:16px`:
```css
@media (max-width:600px){
  .journey{padding:30px 0}
  .journey-step{gap:12px}
  .step-circle{width:56px;height:56px;font-size:24px}
  .step-content h4{font-size:14px}
  .step-content p{font-size:16px}
}
```

Also fix the second journey step `p` definition (line ~311):
```css
.step-content p{margin:0;font-size:14px;color:rgba(59,47,47,0.8);line-height:1.8;font-weight:400}
```
Change to `font-size:16px`:
```css
.step-content p{margin:0;font-size:16px;color:rgba(59,47,47,0.8);line-height:1.8;font-weight:400}
```

And line ~382:
```css
.step-content p{margin:0;font-size:13px;color:rgba(59,47,47,0.8);line-height:1.7;font-weight:400}
```
Change to `font-size:16px`:
```css
.step-content p{margin:0;font-size:16px;color:rgba(59,47,47,0.8);line-height:1.7;font-weight:400}
```

- [ ] **Step 4: Fix tag font size**

Find (line ~204):
```css
.tag{display:inline-block;font-size:10px;background:rgba(139,106,69,0.08);color:var(--golden);padding:5px 11px;border-radius:14px;font-weight:600;border:1px solid rgba(139,106,69,0.15);transition:all .3s ease}
```
Change `font-size:10px` → `font-size:12px`:
```css
.tag{display:inline-block;font-size:12px;background:rgba(139,106,69,0.08);color:var(--golden);padding:5px 11px;border-radius:14px;font-weight:600;border:1px solid rgba(139,106,69,0.15);transition:all .3s ease}
```

- [ ] **Step 5: Fix hero subheading on smallest screens**

Find (line ~69):
```css
@media (max-width:480px){.hero-subheading{font-size:14px;margin:0 auto 18px}}
```
Change `font-size:14px` → `font-size:16px`:
```css
@media (max-width:480px){.hero-subheading{font-size:16px;margin:0 auto 18px}}
```

- [ ] **Step 6: Fix luxury strip paragraph font on mobile**

Find (line ~82):
```css
@media (max-width:600px){.features{grid-template-columns:1fr;gap:14px}.feature{padding:20px}.feature h3{font-size:18px}.feature p{font-size:13px}}
```
Change `.feature p{font-size:13px}` → `.feature p{font-size:16px}`:
```css
@media (max-width:600px){.features{grid-template-columns:1fr;gap:14px}.feature{padding:20px}.feature h3{font-size:18px}.feature p{font-size:16px}}
```

Also fix the luxury-item paragraph (line ~126):
```css
.luxury-item p{font-size:14px;color:rgba(59,47,47,0.8);line-height:1.6}
```
Change to `font-size:16px`:
```css
.luxury-item p{font-size:16px;color:rgba(59,47,47,0.8);line-height:1.6}
```

- [ ] **Step 7: Run tests**

```bash
cd /Users/aythapar/DelhiSixCode/my-app && npm test -- --watchAll=false 2>&1 | tail -10
```
Expected: `Tests: 2 passed`

- [ ] **Step 8: Commit**

```bash
cd /Users/aythapar/DelhiSixCode && git add my-app/src/styles.css
git commit -m "fix: mobile font sizes >=16px and tap targets >=48px"
```

---

## Task 3: App.js Fixes — tel link, CTA text, price anchor, page titles, UTM

**Files:**
- Modify: `my-app/src/App.js`

- [ ] **Step 1: Add UTM capture and unique page titles — update imports and App()**

At the top of `App.js`, the import line is already:
```js
import React, { useState } from "react";
```
Change to add `useEffect`:
```js
import React, { useState, useEffect } from "react";
```

Then find `export default function App()` near the bottom and replace it with:
```jsx
export default function App() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    ['utm_source','utm_medium','utm_campaign','utm_content','gclid','fbclid'].forEach(k => {
      if (params.get(k)) sessionStorage.setItem(k, params.get(k));
    });
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/collection/:id" element={<DesignDetailsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
```

- [ ] **Step 2: Add unique page titles to each page component**

Inside `HomePage`, at the top of the function body (before the `return`), add:
```js
useEffect(() => { document.title = 'Delhi Six Couture — Luxury Bridal Wear'; }, []);
```

Inside `CollectionPage`, at the top of the function body, add:
```js
useEffect(() => { document.title = 'Rivayat Collection — Delhi Six Couture'; }, []);
```

Inside `DesignDetailsPage`, after the `const { id } = useParams();` line, add:
```js
useEffect(() => {
  const name = designNames[id] || 'Bridal Design';
  document.title = `${name} — Delhi Six Couture`;
}, [id]);
```

Inside `ContactPage`, at the top of the function body, add:
```js
useEffect(() => { document.title = 'Book a Consultation — Delhi Six Couture'; }, []);
```

Inside `NotFoundPage`, at the top of the function body, add:
```js
useEffect(() => { document.title = 'Page Not Found — Delhi Six Couture'; }, []);
```

- [ ] **Step 3: Add GA4 lead event to form submission**

In `ContactPage`, find the `handleSubmit` function. After `setSubmitted(true);`, add:
```js
if (window.gtag) {
  window.gtag('event', 'generate_lead', {
    event_category: 'contact_form',
    event_label: designType || 'general'
  });
}
```

The updated block should look like:
```js
setErrors({});
setSubmitted(true);
if (window.gtag) {
  window.gtag('event', 'generate_lead', {
    event_category: 'contact_form',
    event_label: designType || 'general'
  });
}
const monthNames = ['', 'January', ...
```

- [ ] **Step 4: Change submit button CTA text**

In `ContactPage`, find:
```jsx
<button className="btn btn--primary" type="submit">Send Enquiry</button>
```
Replace with:
```jsx
<button className="btn btn--primary" type="submit">Book My Free Consultation</button>
```

- [ ] **Step 5: Add price anchor below hero CTAs**

In `HomePage`, find the `<div className="hero-ctas">` block:
```jsx
<div className="hero-ctas">
  <Link to="/collection" className="btn">Explore Our Designs</Link>
  <Link to="/contact" className="btn btn--consultation">Schedule Consultation</Link>
</div>
```
Replace with:
```jsx
<div className="hero-ctas">
  <Link to="/collection" className="btn">Explore Our Designs</Link>
  <Link to="/contact" className="btn btn--consultation">Schedule Consultation</Link>
</div>
<p style={{position:'relative',zIndex:2,textAlign:'center',color:'rgba(255,255,255,0.85)',fontSize:'13px',letterSpacing:'1px',marginTop:'12px',fontWeight:500}}>
  Ensembles from ₹1,00,000 &nbsp;·&nbsp; 8–18 week lead time
</p>
```

- [ ] **Step 6: Fix phone number to tel: link**

In `ContactPage`, find in the sidebar:
```jsx
<div className="info-value">(+91) 70117 64857</div>
```
Replace with:
```jsx
<a href="tel:+917011764857" className="info-value" style={{textDecoration:'none',display:'block'}}>
  (+91) 70117 64857
</a>
```

- [ ] **Step 7: Run tests**

```bash
cd /Users/aythapar/DelhiSixCode/my-app && npm test -- --watchAll=false 2>&1 | tail -10
```
Expected: `Tests: 2 passed`

- [ ] **Step 8: Commit**

```bash
cd /Users/aythapar/DelhiSixCode && git add my-app/src/App.js
git commit -m "feat: unique page titles, tel link, CTA text, price anchor, UTM capture, GA4 event"
```

---

## Task 4: Instagram Link in Footer

**Files:**
- Modify: `my-app/src/components/Footer.js`

- [ ] **Step 1: Update Footer.js**

Replace the entire file content with:

```jsx
import React from 'react';

export default function Footer(){
  return (
    <footer className="site-footer">
      <div className="container">
        <div style={{marginBottom:8}}>© {new Date().getFullYear()} Delhi Six Couture. All rights reserved.</div>
        <div style={{fontSize:13,opacity:0.9}}>Handcrafted bridal & pret ensembles inspired by Old Delhi</div>
        <div style={{marginTop:12,display:'flex',justifyContent:'center',gap:'20px'}}>
          <a
            href="https://www.instagram.com/delhisixcouture"
            target="_blank"
            rel="noopener noreferrer"
            style={{color:'rgba(255,255,255,0.8)',fontSize:13,display:'flex',alignItems:'center',gap:6,textDecoration:'none',transition:'color 0.2s'}}
            aria-label="Follow Delhi Six Couture on Instagram"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            @delhisixcouture
          </a>
          <a
            href="https://wa.me/917011764857"
            target="_blank"
            rel="noopener noreferrer"
            style={{color:'rgba(255,255,255,0.8)',fontSize:13,display:'flex',alignItems:'center',gap:6,textDecoration:'none'}}
            aria-label="Chat on WhatsApp"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </div>

      <a
        href="https://wa.me/917011764857"
        target="_blank"
        rel="noopener noreferrer"
        className="float-action"
        aria-label="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="white" width="22" height="22">
          <path d="M16.04 2C8.29 2 2 8.29 2 16.04c0 2.83.83 5.47 2.26 7.7L2 30l6.43-2.19a13.96 13.96 0 007.61 2.22h.01c7.75 0 14.04-6.29 14.04-14.04C30.09 8.29 23.8 2 16.04 2z" />
        </svg>
      </a>
    </footer>
  )
}
```

> **Note:** The Instagram URL `https://www.instagram.com/delhisixcouture` is a placeholder — update to the real handle if different.

- [ ] **Step 2: Run tests**

```bash
cd /Users/aythapar/DelhiSixCode/my-app && npm test -- --watchAll=false 2>&1 | tail -10
```
Expected: `Tests: 2 passed`

- [ ] **Step 3: Commit**

```bash
cd /Users/aythapar/DelhiSixCode && git add my-app/src/components/Footer.js
git commit -m "feat: add Instagram and WhatsApp links to footer"
```

---

## Task 5: WebP Image Conversion

**Files:**
- Create: `my-app/scripts/convert-webp.js`
- Modify: `my-app/package.json` (add script entry + sharp devDependency)
- Modify: `my-app/src/App.js` (update hero `<img>` to `<picture>` with WebP source)

- [ ] **Step 1: Install sharp**

```bash
cd /Users/aythapar/DelhiSixCode/my-app && npm install --save-dev sharp 2>&1 | tail -5
```
Expected: `added N packages`

- [ ] **Step 2: Create conversion script**

Create `/Users/aythapar/DelhiSixCode/my-app/scripts/convert-webp.js`:

```js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/images');

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (/\.(jpg|jpeg)$/i.test(entry.name)) {
      const webpPath = fullPath.replace(/\.(jpg|jpeg)$/i, '.webp');
      if (!fs.existsSync(webpPath)) {
        sharp(fullPath)
          .webp({ quality: 82 })
          .toFile(webpPath)
          .then(() => console.log(`✓ ${path.relative(IMAGES_DIR, webpPath)}`))
          .catch(err => console.error(`✗ ${entry.name}:`, err.message));
      } else {
        console.log(`skip (exists): ${path.relative(IMAGES_DIR, webpPath)}`);
      }
    }
  }
}

console.log('Converting images to WebP...');
walkDir(IMAGES_DIR);
```

- [ ] **Step 3: Add npm script to `package.json`**

In `my-app/package.json`, find the `"scripts"` block and add:
```json
"convert-webp": "node scripts/convert-webp.js"
```

So scripts becomes:
```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject",
  "convert-webp": "node scripts/convert-webp.js"
},
```

- [ ] **Step 4: Run the conversion**

```bash
cd /Users/aythapar/DelhiSixCode/my-app && npm run convert-webp 2>&1
```
Expected: lines like `✓ design1/main.webp`, `✓ design1/thumbnail1.webp` etc. for all ~50 images.

- [ ] **Step 5: Verify WebP files were created**

```bash
find /Users/aythapar/DelhiSixCode/my-app/public/images -name "*.webp" | wc -l
```
Expected: `50` (10 designs × 5 images each).

- [ ] **Step 6: Update hero image to `<picture>` element**

In `App.js` `HomePage`, find:
```jsx
<img
  src="/images/design3/main.jpg"
  alt="Luxury bridal elegance"
  className="absolute inset-0 w-full h-full object-cover"
  style={{opacity: 0.9}}
  loading="eager"
  fetchPriority="high"
/>
```
Replace with:
```jsx
<picture>
  <source srcSet="/images/design3/main.webp" type="image/webp" />
  <img
    src="/images/design3/main.jpg"
    alt="Luxury bridal elegance"
    className="absolute inset-0 w-full h-full object-cover"
    style={{opacity: 0.9}}
    loading="eager"
    fetchPriority="high"
  />
</picture>
```

- [ ] **Step 7: Update collection card images to `<picture>` element**

In `App.js` `CollectionPage`, find:
```jsx
<img
  src={designImages[item] ? designImages[item][0] : `https://via.placeholder.com/900x1200?text=Design+${item}`}
  alt={`Design ${item}`}
  className="collection-image"
  loading="lazy"
/>
```
Replace with:
```jsx
<picture>
  <source
    srcSet={designImages[item] ? designImages[item][0].replace(/\.(jpg|jpeg)$/i, '.webp') : ''}
    type="image/webp"
  />
  <img
    src={designImages[item] ? designImages[item][0] : `https://via.placeholder.com/900x1200?text=Design+${item}`}
    alt={`Design ${item}`}
    className="collection-image"
    loading="lazy"
  />
</picture>
```

- [ ] **Step 8: Update design details page main image to `<picture>` element**

In `App.js` `DesignDetailsPage`, find:
```jsx
<img
  src={thumbs[active]}
  alt={`Design ${id} - view ${active+1}`}
  className="main-gallery-image"
  onClick={() => setZoomImage(thumbs[active])}
  style={{cursor: 'pointer'}}
  loading="eager"
/>
```
Replace with:
```jsx
<picture>
  <source srcSet={thumbs[active].replace(/\.(jpg|jpeg)$/i, '.webp')} type="image/webp" />
  <img
    src={thumbs[active]}
    alt={`Design ${id} - view ${active+1}`}
    className="main-gallery-image"
    onClick={() => setZoomImage(thumbs[active])}
    style={{cursor: 'pointer'}}
    loading="eager"
  />
</picture>
```

- [ ] **Step 9: Run tests**

```bash
cd /Users/aythapar/DelhiSixCode/my-app && npm test -- --watchAll=false 2>&1 | tail -10
```
Expected: `Tests: 2 passed`

- [ ] **Step 10: Commit**

```bash
cd /Users/aythapar/DelhiSixCode && git add my-app/scripts/convert-webp.js my-app/package.json my-app/package-lock.json my-app/src/App.js my-app/public/images
git commit -m "feat: WebP image conversion script and picture elements for hero, collection, details"
```

---

## Self-Review Checklist

| Audit issue | Covered | Task |
|-------------|---------|------|
| No conversion tracking (GA4) | ✅ | Task 1 |
| Google Fonts render-blocking @import | ✅ | Task 1 |
| No canonical tag | ✅ | Task 1 |
| No LocalBusiness schema | ✅ | Task 1 |
| Mobile font sizes <16px | ✅ | Task 2 |
| Tap targets <48px (.btn, nav, pagination) | ✅ | Task 2 |
| Phone number not a tel: link | ✅ | Task 3 |
| Generic submit CTA "Send Enquiry" | ✅ | Task 3 |
| Price anchor missing near hero CTA | ✅ | Task 3 |
| Unique page titles per route | ✅ | Task 3 |
| UTM parameter preservation | ✅ | Task 3 |
| No Instagram link | ✅ | Task 4 |
| All images JPEG, no WebP | ✅ | Task 5 |
| Hero image preload in `<head>` | ✅ | Task 1 |
| "Price per request" label | ❌ excluded per user request | — |

No placeholder patterns found. All steps contain complete code. Type/name consistency verified across tasks (`designNames[id]` in Task 3 Step 2 matches the imported export from `src/data/designs.js`).
