# Tasks

## Status summary
- Current stack: Vite single-page app in `frontend/` (not Next.js).
- Spec target: Next.js App Router + contentlayer + MDX + SEO/OG pipeline.
- Design direction: finance/quant compact layout (implemented in Vite).

## Task list (from original JSON spec)
- [ ] T01: Scaffold Next.js app + global layout
  - Status: Not started (current site is Vite).
  - Requires: migration decision.
- [ ] T02: Implement content pipeline (contentlayer + MDX)
  - Status: Not started (content is hardcoded in `frontend/src/App.jsx`).
- [ ] T03: SEO infrastructure (sitemap, robots, JSON-LD, RSS, llms.txt)
  - Status: Not started.
- [ ] T04: Resume page + PDF hosting
  - Status: Not started (no Next.js pages yet).
- [ ] T05: OG image pipeline
  - Status: Not started.
- [ ] T06: Analytics and event tracking
  - Status: Not started.

## Current implementation tasks (Vite track)
- [x] Finance/quant compact UI refresh
- [x] Portfolio content aligned to Hans Ho resumes
- [x] Project cards link to GitHub repositories
- [x] Add resume PDF CTA (C++ + AI infra)
- [x] Add baseline SEO metadata + JSON-LD
- [ ] Add Competitive Programming section (if you want more signal)
- [ ] Confirm project repo URLs (deterministic agent framework)

## Decision needed
- Choose one:
  - A) Keep Vite single-page and continue incremental updates here.
  - B) Migrate to Next.js and implement the JSON spec tasks above.

Once you choose A or B, I will update this file with a concrete execution plan and the new status.
