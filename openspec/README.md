# OpenSpec - Hans Ho Personal Site (Finance / Quant Focus)

## Overview
Compact, finance-forward portfolio focused on low-latency backend systems, deterministic execution, and production reliability. The layout is intentionally minimal and dense for quick scanning by quant and infra teams.

## Current status
- Live implementation is a Vite single-page app in `frontend/` with content in `frontend/src/App.jsx`.
- Next.js + contentlayer + MDX pipeline from the original JSON spec is not implemented yet.
- Dynamic portrait is intentionally disabled; static grayscale portrait is used.

## Visual system
- Typography
  - Body: IBM Plex Sans
  - Mono: IBM Plex Mono (used for metrics and tags)
- Color tokens
  - Ink: #0b1220
  - Paper: #f4f6f8
  - Accent (signal): #f97316
  - Accent (link): #2563eb
- Mood
  - Dark header band with restrained typography
  - Light trading-desk style background with subtle grid

## Layout
- Single compact hero with contact links and location/target line
- Short impact stats row
- Condensed card stacks for experience and projects
- Skills and education in small cards
- Dense contact block for quick outreach

## Content notes
- Messaging emphasizes performance, determinism, and reliability.
- Competitive programming mindset is surfaced in the hero focus list.
- Project cards include GitHub links to repositories.
- Dynamic portrait is intentionally avoided for professionalism.

## Future work
- Replace GitHub links if project repo slugs change.
- Add resume PDF CTA when provided.
