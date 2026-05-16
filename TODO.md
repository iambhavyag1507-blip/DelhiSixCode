# Delhi Six Couture — TODO

## 🔴 Before Running Any Paid Ads

### 1. Add Meta Pixel (CRITICAL)
- [ ] Go to **business.facebook.com** → Events Manager → Connect data sources → Web
- [ ] Create pixel named "Delhi Six Couture Pixel"
- [ ] Select "Install code manually" → copy the **Pixel ID** (15–16 digit number)
- [ ] Share Pixel ID with Claude → it will add the code to `my-app/public/index.html` and `src/App.js` automatically
- [ ] Deploy to Netlify and verify in Events Manager (Realtime events should show PageView)

### 2. Deploy the latest code to Netlify
- [ ] Push `feat/landing-page-fixes` branch to GitHub (or merge to main)
- [ ] Netlify will auto-deploy
- [ ] Verify GA4 is working: go to analytics.google.com → Realtime → open live site → should see 1 active user

---

## 🟠 After Pixel is Live (wait 2–4 weeks before running ads)

### 3. Set up Conversions API (CAPI) for Meta
- Without CAPI, Meta loses 30–40% of conversion data (iOS 14.5+)
- Ask Claude to help set this up once Pixel is confirmed working

### 4. Set budget to ₹40,000+/month before launching
- ₹5,000/month is below Meta's minimum viable threshold
- Meta needs 50 conversions/week to exit learning phase
- At ₹5,000, ads will run but performance will be unstable

---

## 🟡 Launch Checklist (When Ready)

### 5. Launch Meta Campaign
- [ ] Upload ad images to Meta Ads Manager
- [ ] Use copy from `campaign-brief.md` → Copy Deck section
- [ ] Set objective: **Leads**
- [ ] Target: Women 24–38, India, interests: bridal wear, Indian weddings, lehenga
- [ ] Start with Concept 2 "This Is Your Moment" (highest emotional resonance)

### 6. After 7 days of data
- [ ] Run `/ads audit` in Claude Code for a full performance health check

---

## ✅ Already Done

- [x] GA4 Measurement ID added (`G-NEEN0P3F47`)
- [x] Landing page mobile UX fixed (fonts ≥16px, tap targets ≥48px)
- [x] WebP images (54 files, 30–50% faster load)
- [x] Phone number as tap-to-call link
- [x] Unique page titles per route
- [x] LocalBusiness schema (rich results in Google)
- [x] Canonical tag
- [x] Google Fonts preconnect
- [x] Instagram link in footer (@delhisix.couture)
- [x] Brand DNA extracted → `brand-profile.json`
- [x] 3 campaign concepts + copy deck → `campaign-brief.md`
- [x] Ad images created
