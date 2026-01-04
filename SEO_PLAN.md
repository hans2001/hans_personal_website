# SEO Improvement Plan

This document outlines a practical SEO roadmap tailored to this codebase. The frontend is a Vite + React single-page app, so the plan balances metadata improvements with crawlability, performance, and content structure.

## Goals
- Improve search engine understanding of the page content and intent.
- Ensure rich previews (Open Graph/Twitter cards).
- Make the site easy to crawl, index, and share.
- Maintain performance and accessibility.

## Phase 1: Quick Wins (1-2 hours)
1) Update baseline metadata in `frontend/index.html` (done)
   - Descriptive `<title>` + `<meta name="description">`.
   - `<meta name="robots">`, `<link rel="canonical">`, and hreflang tags.
   - Open Graph + Twitter card tags (with image dimensions).

2) Add site-level structured data (done)
   - JSON-LD in `frontend/index.html` for Person/Organization + WebSite + WebPage.
   - name, description, url, sameAs links, jobTitle.

3) Make core content crawl-friendly (done)
   - Single `<h1>` in the hero + clean h2/h3 hierarchy.
   - Descriptive alt text on the portrait image.

## Phase 2: Crawlability + Sharing (half day)
4) Create `robots.txt` and `sitemap.xml` (done)
   - `frontend/public/robots.txt` references the sitemap.
   - `frontend/public/sitemap.xml` exists, and `frontend/vite.config.js` emits a build-time sitemap.

5) Add social preview assets (done)
   - `frontend/public/og.jpg` (1200x630).
   - OG/Twitter image tags wired.

## Phase 3: SPA SEO Enhancements (1 day)
6) Add dynamic metadata in React (done)
   - Implemented in `frontend/src/App.jsx` via `setMetaTag` helpers (no library).
   - Per-section titles/descriptions wired to scroll state.

7) Consider pre-rendering for crawlability (not done)
   - Evaluate `vite-plugin-ssr` or `prerender-spa-plugin` if SEO is critical.
   - For a single page, pre-rendering can make metadata more robust for bots.

## Phase 4: Content and Performance (ongoing)
8) Improve keyword coverage and content depth (in progress)
   - "How I work" + "Results" are concise; add 2-3 mini case studies for depth.
   - Keep project cards outcome-first (metrics + stack).

9) Performance and Core Web Vitals (in progress)
   - Review image sizes and formats in `frontend/public/`.
   - Keep animations lightweight; avoid CLS.
   - Consider preconnecting to font/CDN hosts or self-hosting fonts.

## Suggested Copy (for metadata)
Title (example):
"Low-Latency Backend & Systems Engineer | [Your Name]"

Description (example):
"I build low-latency systems, market data pipelines, and observability tooling. Portfolio and selected projects."

## Implementation Checklist
- [x] Update `frontend/index.html` title, description, canonical, OG/Twitter tags.
- [x] Add JSON-LD schema in `frontend/index.html`.
- [x] Confirm heading hierarchy in `frontend/src/App.jsx`.
- [x] Add `frontend/public/robots.txt` and `frontend/public/sitemap.xml` (plus build-time sitemap emit).
- [x] Add `frontend/public/og.jpg` and update OG/Twitter image tags.
- [x] Add dynamic metadata in `frontend/src/App.jsx` (custom helper).
- [x] Align metadata copy with current positioning (no over-claiming of quant roles).
- [ ] Evaluate pre-rendering if SEO becomes a priority.
- [ ] Add 2-3 mini case studies to improve content depth.
- [ ] Confirm images are optimized (size + format) and fonts are preconnected/self-hosted.

## Additional Ideas
- Add a short "Writing" or "Notes" section (1-2 posts) to create indexable long-form content.
- Add `FAQPage` schema for quick recruiter questions (work style, strengths, availability).
- Add `SoftwareSourceCode` schema entries for key GitHub repos.
- Add Bing Webmaster Tools verification and submit the sitemap.
- Create a dedicated Open Graph image per section if you add routes later.

## Notes
- For a single-page Vite app, static metadata in `frontend/index.html` is the most reliable.
- If you decide to add routes later, revisit sitemap generation and metadata per route.
