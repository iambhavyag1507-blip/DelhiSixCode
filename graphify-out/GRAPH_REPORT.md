# Graph Report - .  (2026-07-21)

## Corpus Check
- Large corpus: 172 files · ~1,400,373 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 340 nodes · 344 edges · 42 communities (30 shown, 12 thin omitted)
- Extraction: 62% EXTRACTED · 38% INFERRED · 0% AMBIGUOUS · INFERRED: 130 edges (avg confidence: 0.88)
- Token cost: 18,500 input · 4,200 output

## Community Hubs (Navigation)
- Ad Campaign Strategy
- React App Components
- Build Config & Dependencies
- Landing Page Fixes & Docs
- Advanced Image Optimization Utils
- React Dependencies
- Accessibility & Docs Suite
- Basic Image Optimization Utils
- Design10 Bridal Collection
- Design1 Bridal Collection
- Design2 Bridal Collection
- Design3 Bridal Collection
- Design4 Bridal Collection
- Design5 Bridal Collection
- Design6 Bridal Collection
- Design7 Bridal Collection
- Design8 Bridal Collection
- Design9 Bridal Collection
- Browser Targets Config
- PWA Manifest
- WebP Conversion Script
- Tailwind Config
- Meta CAPI Serverless Function
- Handwork Craft Photography
- Brand Logo & Icons
- Performance Optimization Roadmap
- Full Image Optimization Shell Scripts
- Image Compression Commands
- Homepage & Schema.org
- Image Optimization Script
- Bhavya Goel Portrait
- Homepage Hero Photography
- Test Setup
- Vercel Deployment Config
- Delhi Six Brand Identity
- Robots.txt
- Quick Reference Fixes
- CRA README

## God Nodes (most connected - your core abstractions)
1. `AD Campaign Plan 30 Days` - 9 edges
2. `Documentation Index — Navigation Index for All Image Optimization Documentation` - 7 edges
3. `scripts` - 6 edges
4. `ImageCacheManager` - 6 edges
5. `E-Commerce Strategic Ad Plan 20K` - 6 edges
6. `Session Context Delhi Six Couture` - 6 edges
7. `Landing Page Fixes Implementation Plan 2026-05-11` - 6 edges
8. `GA4 Meta Pixel Analysis 30 Days` - 5 edges
9. `Delhi Six Couture UI UX Improvements Summary` - 5 edges
10. `src/App.js Main Application File` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Rivayat Stories Campaign Concept` --semantically_similar_to--> `Concept 1 Woven in Old Delhi`  [INFERRED] [semantically similar]
  AD_CAMPAIGN_PLAN_30DAYS.md → campaign-brief.md
- `AD Campaign Plan 30 Days` --references--> `Lead Event Tracking Gap 11 Days`  [EXTRACTED]
  AD_CAMPAIGN_PLAN_30DAYS.md → GA4_META_ANALYSIS_30DAYS.md
- `This Is Your Moment Campaign Concept` --semantically_similar_to--> `Concept 2 This Is Your Moment`  [EXTRACTED] [semantically similar]
  AD_CAMPAIGN_PLAN_30DAYS.md → campaign-brief.md
- `Delhi Six Couture UI UX Improvements Summary` --references--> `Unique Design Descriptions`  [EXTRACTED]
  IMPROVEMENTS_SUMMARY.md → CODE_CHANGES.md
- `Delhi Six Couture UI UX Improvements Summary` --references--> `Pricing and Timeline Transparency`  [EXTRACTED]
  IMPROVEMENTS_SUMMARY.md → CODE_CHANGES.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Delhi Six Couture Tracking Stack** — session_context_ga4_tracking, session_context_meta_pixel, session_context_capi [EXTRACTED 1.00]
- **Integrated Ad Campaign Strategy Documents** — ad_campaign_plan_30days, e_commerce_strategic_plan_20k, meta_vs_google_strategy [EXTRACTED 1.00]
- **Frontend UI UX Code Improvement Documents** — improvements_summary, code_changes, testing_guide [EXTRACTED 1.00]
- **Image Optimization Documentation Suite** — my_app_documentation_index_image_optimization_nav, my_app_implementation_complete_image_opt_summary, my_app_implementation_report_file_manifest, my_app_performance_optimization_complete_guide, my_app_optimization_summary_utilities_examples, my_app_image_optimization_guide_strategies, my_app_readme_optimization_quick_start, my_app_start_here_all_deliverables_summary [INFERRED 0.95]
- **Accessibility Verification and Documentation Suite** — my_app_final_verification_report_qa_deployment, my_app_implementation_complete_v2_accessibility_mobile, my_app_code_changes_before_after_css_html_fixes_doc, my_app_quick_reference_fixes_table [INFERRED 0.95]

## Communities (42 total, 12 thin omitted)

### Community 0 - "Ad Campaign Strategy"
Cohesion: 0.08
Nodes (31): AD Campaign Plan 30 Days, Lead Generation Campaign, Meta Ads Strategy, Rivayat Stories Campaign Concept, This Is Your Moment Campaign Concept, Campaign Brief Delhi Six Couture, Delhi Six Couture Brand DNA Summary, Concept 1 Woven in Old Delhi (+23 more)

### Community 1 - "React App Components"
Cohesion: 0.11
Nodes (16): App(), CollectionPage(), ContactPage(), Layout(), useScrollReveal(), Footer(), Nav(), designDescriptions (+8 more)

### Community 2 - "Build Config & Dependencies"
Cohesion: 0.08
Nodes (25): devDependencies, autoprefixer, sharp, tailwindcss, @testing-library/jest-dom, eslintConfig, extends, jest (+17 more)

### Community 3 - "Landing Page Fixes & Docs"
Cohesion: 0.12
Nodes (23): Code Changes Before & After, Unique Design Descriptions, Form Validation Enhancement, Pricing and Timeline Transparency, Landing Page Fixes Implementation Plan 2026-05-11, WebP Image Conversion Script, Lead Event Tracking Gap 11 Days, Delhi Six Couture UI UX Improvements Summary (+15 more)

### Community 4 - "Advanced Image Optimization Utils"
Cohesion: 0.12
Nodes (4): getOptimalImageVariant(), imageCache, ImageCacheManager, useResponsiveImage()

### Community 5 - "React Dependencies"
Cohesion: 0.13
Nodes (15): dependencies, react-dom, react-router-dom, react-scripts, @testing-library/dom, @testing-library/react, @testing-library/user-event, web-vitals (+7 more)

### Community 6 - "Accessibility & Docs Suite"
Cohesion: 0.15
Nodes (14): Code Changes Before/After — CSS and HTML Fix Examples for 6 Accessibility Changes, Documentation Index — Navigation Index for All Image Optimization Documentation, Final Verification Report — QA Checklist and Deployment Readiness for Accessibility Fixes, Image Optimization Guide — Strategies Reference and API Documentation, Image Optimization Implementation — Lazy Loading, WebP, srcset, fetchPriority, Preloading, Implementation Complete — Full Summary of Image Optimization Implementation, Implementation Complete v2 — Final Status for Accessibility and Mobile UX Implementation, Implementation Report — Image Optimization Implementation Report with File Manifest (+6 more)

### Community 7 - "Basic Image Optimization Utils"
Cohesion: 0.20
Nodes (6): react, imageOptimizationUtils, OptimizedImage(), preloadImage(), preloadImages(), react

### Community 8 - "Design10 Bridal Collection"
Cohesion: 0.20
Nodes (10): Design 10 Main Product Image — Bridal Red Lehenga Choli with Heavy Gold Zari Embroidery (Full Standing Pose), Design 10 Main Product Image WebP — Bridal Red Lehenga Choli (WebP format variant), Design 10 Thumbnail 1 — Bridal Red Lehenga Choli, Model Reclining on Sofa with Candles (Atmospheric Bridal Setting), Design 10 Thumbnail 1 WebP — Bridal Red Lehenga Choli Reclining Pose (WebP format variant), Design 10 Thumbnail 2 — Bridal Red Lehenga Choli, Model Spreading Skirt on Floor (Detailed Embroidery Showcase), Design 10 Thumbnail 2 WebP — Bridal Red Lehenga Choli Skirt Spread Pose (WebP format variant), Design 10 Thumbnail 3 — Bridal Red Lehenga Choli, Close-Up of Blouse and Jewellery (Kundan Polki Nath and Maang Tikka Detail), Design 10 Thumbnail 3 WebP — Bridal Jewellery and Blouse Close-Up (WebP format variant) (+2 more)

### Community 9 - "Design1 Bridal Collection"
Cohesion: 0.20
Nodes (10): Design1 Main — Crimson Bridal Lehenga Choli, Gold Zardozi, Reclining Editorial Pose, Design1 Main (WebP) — Crimson Bridal Lehenga Choli, Gold Zardozi, Reclining Editorial Pose, Design1 Thumbnail1 — Bridal Lehenga Standing Full-Length Front View, Design1 Thumbnail1 (WebP) — Bridal Lehenga Standing Full-Length Front View, Design1 Thumbnail2 — Close-Up Face, Dupatta and Polki Jewellery Detail, Design1 Thumbnail2 (WebP) — Close-Up Face, Dupatta and Polki Jewellery Detail, Design1 Thumbnail3 — Jewellery and Gold Zardozi Embroidery Focus Detail, Design1 Thumbnail3 (WebP) — Jewellery and Gold Zardozi Embroidery Focus Detail (+2 more)

### Community 10 - "Design2 Bridal Collection"
Cohesion: 0.20
Nodes (10): Design2 Main Hero Image — Bridal Lehenga Choli, Rose Gold & Deep Red, Full Coverage Candlelit Editorial Shot, Design2 Main Hero Image (WebP format) — Bridal Lehenga Choli, Rose Gold & Deep Red, Full Coverage Candlelit Editorial Shot, Design2 Thumbnail1 — Bridal Lehenga Choli Front Close-Up, Rose Gold Zardozi Embroidery, V-Neck Blouse, Emerald Choker Necklace, Design2 Thumbnail1 (WebP format) — Bridal Lehenga Choli Front Close-Up, Rose Gold Zardozi Embroidery, V-Neck Blouse, Emerald Choker Necklace, Design2 Thumbnail2 — Bridal Lehenga Choli Side/Back Profile, Full Flared Skirt, Dense Gold Thread & Sequin Embroidery, Design2 Thumbnail2 (WebP format) — Bridal Lehenga Choli Side/Back Profile, Full Flared Skirt, Dense Gold Thread & Sequin Embroidery, Design2 Thumbnail3 — Bridal Lehenga Choli Reclining Pose, Draped Dupatta, Wide Skirt Spread Showing Gold Jaal Pattern, Design2 Thumbnail3 (WebP format) — Bridal Lehenga Choli Reclining Pose, Draped Dupatta, Wide Skirt Spread Showing Gold Jaal Pattern (+2 more)

### Community 11 - "Design3 Bridal Collection"
Cohesion: 0.20
Nodes (10): Design3 Main — Crimson Silk Bridal Lehenga, Gold Zardozi, Reclining Candlelit Hero Shot, Design3 Main (WebP) — Crimson Silk Bridal Lehenga, Gold Zardozi, Reclining Candlelit Hero Shot, Design3 Thumbnail1 — Seated Pose, Full Silhouette Fanned Lehenga Skirt, Design3 Thumbnail1 (WebP) — Seated Pose, Full Silhouette Fanned Lehenga Skirt, Design3 Thumbnail2 — Close-Up Reclining with Dupatta as Veil, Design3 Thumbnail2 (WebP) — Close-Up Reclining with Dupatta as Veil, Design3 Thumbnail3 — Extreme Close-Up, Dupatta Across Face, Gold Zardozi Embroidery Detail, Design3 Thumbnail3 (WebP) — Extreme Close-Up, Dupatta Across Face, Gold Zardozi Embroidery Detail (+2 more)

### Community 12 - "Design4 Bridal Collection"
Cohesion: 0.20
Nodes (10): Design4 Main Hero — Golden Bridal Lehenga Choli (Full Standing Pose), Design4 Main Hero — Golden Bridal Lehenga Choli (WebP format), Design4 Thumbnail 1 — Golden Bridal Lehenga Choli (Reclining Pose, Wide Shot), Design4 Thumbnail 1 — Golden Bridal Lehenga Choli (WebP format), Design4 Thumbnail 2 — Golden Bridal Lehenga Choli (Close-Up Reclining, Embroidery Detail), Design4 Thumbnail 2 — Golden Bridal Lehenga Choli (WebP format), Design4 Thumbnail 3 — Golden Bridal Lehenga Choli (Alternate Close-Up Reclining Pose), Design4 Thumbnail 3 — Golden Bridal Lehenga Choli (WebP format) (+2 more)

### Community 13 - "Design5 Bridal Collection"
Cohesion: 0.20
Nodes (10): Design5 Main — Crimson/Red Velvet Bridal Lehenga, Gold Zari Jaal Embroidery, Reclining Hero Pose, Design5 Main (WebP) — Crimson/Red Velvet Bridal Lehenga, Gold Zari Jaal Embroidery, Reclining Hero Pose, Design5 Thumbnail1 — Full Standing Bridal Pose with Dupatta as Veil, Design5 Thumbnail1 (WebP) — Full Standing Bridal Pose with Dupatta as Veil, Design5 Thumbnail2 — Close-Up Portrait with Dupatta Over Head, Design5 Thumbnail2 (WebP) — Close-Up Portrait with Dupatta Over Head, Design5 Thumbnail3 — Fabric and Embroidery Close-Up with Haath Phool Jewellery, Design5 Thumbnail3 (WebP) — Fabric and Embroidery Close-Up with Haath Phool Jewellery (+2 more)

### Community 14 - "Design6 Bridal Collection"
Cohesion: 0.20
Nodes (10): Design6 Main — Antique Gold/Bronze Bridal Lehenga Choli, Crimson Accents, Reclining Mughal Editorial Hero, Design6 Main (WebP) — Antique Gold/Bronze Bridal Lehenga Choli, Crimson Accents, Reclining Mughal Editorial Hero, Design6 Thumbnail1 — Antique Gold Lehenga with Kundan Polki Bridal Jewellery Detail, Design6 Thumbnail1 (WebP) — Antique Gold Lehenga with Kundan Polki Bridal Jewellery Detail, Design6 Thumbnail2 (WebP) — Dense Zardozi and Sequin Embroidery Full-Length View, Design6 Thumbnail2 — Dense Zardozi and Sequin Embroidery Full-Length View, Design6 Thumbnail3 — Mughal Bridal Chamber Setting, Candlelit Ornate Backdrop, Design6 Thumbnail3 (WebP) — Mughal Bridal Chamber Setting, Candlelit Ornate Backdrop (+2 more)

### Community 15 - "Design7 Bridal Collection"
Cohesion: 0.20
Nodes (10): Design 7 Main Product Image — Bridal Red Lehenga Choli with Gold Zardozi Embroidery (Full Shot), Design 7 Main Product Image — Bridal Red Lehenga Choli with Gold Zardozi Embroidery (Full Shot, WebP format), Design 7 Thumbnail 1 — Bridal Red Lehenga Choli Close-Up on Blouse and Gold Kundan Jewellery, Design 7 Thumbnail 1 — Bridal Red Lehenga Choli Close-Up on Blouse and Gold Kundan Jewellery (WebP format), Design 7 Thumbnail 2 — Bridal Red Lehenga Choli Mid Shot with Dupatta and Embroidered Skirt Detail, Design 7 Thumbnail 2 — Bridal Red Lehenga Choli Mid Shot with Dupatta and Embroidered Skirt Detail (WebP format), Design 7 Thumbnail 3 — Bridal Red Lehenga Choli Full Candlelit Studio Shot with Ornate Setting, Design 7 Thumbnail 3 — Bridal Red Lehenga Choli Full Candlelit Studio Shot with Ornate Setting (WebP format) (+2 more)

### Community 16 - "Design8 Bridal Collection"
Cohesion: 0.20
Nodes (10): Design 8 Main Hero Image — Bridal Lehenga Choli in Deep Burnt Orange and Gold (Reclining Pose), Design 8 Main Hero Image WebP — Bridal Lehenga Choli in Deep Burnt Orange and Gold (Reclining Pose), Design 8 Thumbnail 1 — Bridal Lehenga Choli Upper Body Close-Up with Kundan Jewellery, Design 8 Thumbnail 1 WebP — Bridal Lehenga Choli Upper Body Close-Up with Kundan Jewellery, Design 8 Thumbnail 2 — Full-Length Bridal Lehenga Choli Standing Pose, Design 8 Thumbnail 2 WebP — Full-Length Bridal Lehenga Choli Standing Pose, Design 8 Thumbnail 3 — Close-Up of Lehenga Skirt and Dupatta Embroidery Detail, Design 8 Thumbnail 3 WebP — Close-Up of Lehenga Skirt and Dupatta Embroidery Detail (+2 more)

### Community 17 - "Design9 Bridal Collection"
Cohesion: 0.20
Nodes (10): Design9 Bridal Lehenga — Main Product Shot: Deep Red Silk Lehenga Choli with Dense Gold Zardozi and Gota Patti Embroidery, Design9 Bridal Lehenga — Main Product Shot WebP (format variant of main.jpg), Design9 Bridal Lehenga — Thumbnail 1: Lower Body Skirt Detail, Dense Gold Floral and Paisley Zardozi Embroidery, Design9 Bridal Lehenga — Thumbnail 1 WebP (format variant of thumbnail1.jpg), Design9 Bridal Lehenga — Thumbnail 2: Blouse Close-Up with Gold Zardozi, Resham, Stonework on Red Blouse, Design9 Bridal Lehenga — Thumbnail 2 WebP (format variant of thumbnail2.jpg), Design9 Bridal Lehenga — Thumbnail 3: Full Figure Candlelit Editorial Shot with Dupatta Drape, Design9 Bridal Lehenga — Thumbnail 3 WebP (format variant of thumbnail3.jpg) (+2 more)

### Community 18 - "Browser Targets Config"
Cohesion: 0.22
Nodes (9): browserslist, development, production, >0.2%, last 1 chrome version, last 1 firefox version, last 1 safari version, not dead (+1 more)

### Community 19 - "PWA Manifest"
Cohesion: 0.25
Nodes (7): background_color, display, icons, name, short_name, start_url, theme_color

### Community 20 - "WebP Conversion Script"
Cohesion: 0.40
Nodes (5): fs, IMAGES_DIR, path, sharp, walkDir()

### Community 21 - "Tailwind Config"
Cohesion: 0.33
Nodes (5): devDependencies, autoprefixer, tailwindcss, autoprefixer, tailwindcss

### Community 22 - "Meta CAPI Serverless Function"
Cohesion: 0.50
Nodes (4): crypto, handler(), hashString(), https

### Community 24 - "Handwork Craft Photography"
Cohesion: 0.50
Nodes (4): Handwork1 — Pattern Transfer / Block Print Preparation Step on White Fabric, Artisan Using Scraper Tool, Handwork1 (WebP) — Pattern Transfer / Block Print Preparation Step on White Fabric, Handwork — Chikankari Floral Embroidery on White Textile, Artisan in Process, Handwork (WebP) — Chikankari Floral Embroidery on White Textile, Artisan in Process

### Community 25 - "Brand Logo & Icons"
Cohesion: 0.50
Nodes (4): Delhi Six Brand Logo — Circular Emblem with Stylized Woman Silhouette and Peacock Motif, Minimalist Black and White, React App Default PWA Icon 192px — React Atom Logo (CRA Placeholder, Not Replaced), React App Default PWA Icon 512px — React Atom Logo (CRA Placeholder, Not Replaced), React Default Animated SVG Logo — React Atom in #61DAFB Light Blue (CRA Default Asset)

### Community 26 - "Performance Optimization Roadmap"
Cohesion: 0.67
Nodes (3): Optimization Roadmap — Tiered Further Optimization Opportunities with ROI Estimates, Optimization Tiers — Tier1 Quick Wins (10min), Tier2 Code (45min), Tier3 Advanced (1-2hr), Quick Optimization Guide — Top 3 Optimizations with Bundle Analysis

## Knowledge Gaps
- **134 isolated node(s):** `IMAGE_COMPRESSION_COMMANDS.sh script`, `https`, `crypto`, `optimize-images.sh script`, `name` (+129 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `React Dependencies` to `Build Config & Dependencies`, `Basic Image Optimization Utils`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Why does `react` connect `Basic Image Optimization Utils` to `Advanced Image Optimization Utils`, `React Dependencies`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `useResponsiveImage()` connect `Advanced Image Optimization Utils` to `Basic Image Optimization Utils`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **What connects `IMAGE_COMPRESSION_COMMANDS.sh script`, `https`, `crypto` to the rest of the system?**
  _134 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Ad Campaign Strategy` be split into smaller, more focused modules?**
  _Cohesion score 0.08387096774193549 - nodes in this community are weakly interconnected._
- **Should `React App Components` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Should `Build Config & Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._