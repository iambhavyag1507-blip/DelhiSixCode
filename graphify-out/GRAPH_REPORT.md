# Graph Report - my-app/src  (2026-07-21)

## Corpus Check
- Corpus is ~6,263 words - fits in a single context window. You may not need a graph.

## Summary
- 63 nodes · 74 edges · 12 communities (7 shown, 5 thin omitted)
- Extraction: 77% EXTRACTED · 23% INFERRED · 0% AMBIGUOUS · INFERRED: 17 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Advanced Image Optimization
- Page Components
- Basic Image Utilities
- App Entry & Bootstrap
- Design Data Store
- Image Cache Manager
- Collection + Trending
- Layout & Scroll Reveal
- Footer Component
- Test Setup

## God Nodes (most connected - your core abstractions)
1. `ImageCacheManager` - 6 edges
2. `App()` - 3 edges
3. `TRENDING_IDS` - 3 edges
4. `useCAPI()` - 3 edges
5. `useScrollReveal()` - 2 edges
6. `Layout()` - 2 edges
7. `CollectionPage()` - 2 edges
8. `ContactPage()` - 2 edges
9. `Footer()` - 2 edges
10. `Nav()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `CollectionPage()` --references--> `TRENDING_IDS`  [EXTRACTED]
  App.js → data/designs.js
- `ContactPage()` --calls--> `useCAPI()`  [EXTRACTED]
  App.js → hooks/useCAPI.js

## Import Cycles
- None detected.

## Communities (12 total, 5 thin omitted)

### Community 0 - "Advanced Image Optimization"
Cohesion: 0.20
Nodes (3): getOptimalImageVariant(), imageCache, useResponsiveImage()

### Community 1 - "Page Components"
Cohesion: 0.27
Nodes (3): ContactPage(), Nav(), useCAPI()

### Community 2 - "Basic Image Utilities"
Cohesion: 0.25
Nodes (3): imageOptimizationUtils, preloadImage(), preloadImages()

### Community 3 - "App Entry & Bootstrap"
Cohesion: 0.40
Nodes (3): App(), root, reportWebVitals()

### Community 4 - "Design Data Store"
Cohesion: 0.33
Nodes (5): designDescriptions, designDetails, designImages, designNames, designTags

## Knowledge Gaps
- **4 isolated node(s):** `root`, `{ TextEncoder, TextDecoder }`, `imageCache`, `imageOptimizationUtils`
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `root`, `{ TextEncoder, TextDecoder }`, `imageCache` to the rest of the system?**
  _4 weakly-connected nodes found - possible documentation gaps or missing edges._