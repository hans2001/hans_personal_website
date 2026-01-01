# SEO Improvement Plan

This document outlines a practical SEO roadmap tailored to this codebase. The frontend is a Vite + React single-page app, so the plan balances metadata improvements with crawlability, performance, and content structure.

## Goals
- Improve search engine understanding of the page content and intent.
- Ensure rich previews (Open Graph/Twitter cards).
- Make the site easy to crawl, index, and share.
- Maintain performance and accessibility.

## Phase 1: Quick Wins (1-2 hours)
1) Update baseline metadata in `frontend/index.html`
   - Replace the generic `<title>` with a descriptive title.
   - Add `<meta name="description">` with a concise summary.
   - Add `<meta name="robots">` and `<link rel="canonical">`.
   - Add Open Graph and Twitter card tags.

2) Add site-level structured data
   - Insert JSON-LD in `frontend/index.html` for a Person/Organization and WebSite.
   - Include name, description, url, sameAs links, and jobTitle if applicable.

3) Make core content crawl-friendly
   - Ensure the hero section in `frontend/src/App.jsx` uses a single `<h1>`.
   - Ensure section headings follow a clean h2/h3 hierarchy.
   - Add descriptive `alt` text for images in `frontend/src/App.jsx` or `frontend/src/App.css`.

## Phase 2: Crawlability + Sharing (half day)
4) Create `robots.txt` and `sitemap.xml`
   - Add `frontend/public/robots.txt` with a sitemap reference.
   - Add `frontend/public/sitemap.xml` for the single-page URL.
   - Optional: use a small script or Vite plugin if more routes are added.

5) Add social preview assets
   - Add a custom Open Graph image (1200x630) in `frontend/public/og.png`.
   - Update `<meta property="og:image">` and Twitter image tags.

## Phase 3: SPA SEO Enhancements (1 day)
6) Add dynamic metadata in React (optional but recommended)
   - Use `react-helmet-async` and define per-section metadata.
   - This allows incremental improvements if the site grows to multiple routes.

7) Consider pre-rendering for crawlability
   - Evaluate `vite-plugin-ssr` or `prerender-spa-plugin` if SEO is critical.
   - For a single page, pre-rendering can make metadata more robust for bots.

## Phase 4: Content and Performance (ongoing)
8) Improve keyword coverage and content depth
   - Add a short "About" and "Services" paragraph with relevant terms.
   - Ensure project cards include outcomes and technologies.

9) Performance and Core Web Vitals
   - Optimize large images in `frontend/public/`.
   - Add `loading="lazy"` to non-critical images.
   - Keep CSS animations lightweight and avoid layout shifts.

## Suggested Copy (for metadata)
Title (example):
"Low-Latency Backend & Systems Engineer | [Your Name]"

Description (example):
"I build low-latency systems, market data pipelines, and observability tooling. Portfolio and selected projects."

## Implementation Checklist
- [ ] Update `frontend/index.html` title, description, canonical, OG/Twitter tags.
- [ ] Add JSON-LD schema in `frontend/index.html`.
- [ ] Confirm heading hierarchy in `frontend/src/App.jsx`.
- [ ] Add `frontend/public/robots.txt` and `frontend/public/sitemap.xml`.
- [ ] Add `frontend/public/og.png` and update OG/Twitter image tags.
- [ ] (Optional) Add `react-helmet-async` for dynamic metadata.
- [ ] (Optional) Evaluate pre-rendering if SEO becomes a priority.

## Notes
- For a single-page Vite app, static metadata in `frontend/index.html` is the most reliable.
- If you decide to add routes later, revisit sitemap generation and metadata per route.
