# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Static marketing site for **Grid Soluções Web** (estratégia, sites & SDRs digitais para WhatsApp): institutional site, campaign landing pages, sales funnels, and thank-you pages. Content is in **Brazilian Portuguese** — keep all copy, comments, and class names consistent with the existing pt-BR style.

There is **no build system, no package manager, and no test suite**. The site is hand-written HTML/CSS/JS served as static files. Edit files directly; there is nothing to compile.

## Workflow

- **Local preview:** open the target `index.html` in a browser, or serve the repo root with any static server (e.g. `python -m http.server`) so relative paths and `vercel.json` rewrites resolve correctly.
- **Deploy:** automatic on push to `main` via Vercel's GitHub integration. There is no manual deploy step — `git push` is the deploy.
- Repo: https://github.com/gridsolucoesweb/grid

## Architecture

Each page lives in its own folder as `index.html` and pulls in three shared stylesheets plus one shared script. The whole design system lives in `shared/`:

- `shared/css/tokens.css` — single source of truth for the design system: CSS custom properties for the color palette (terracota/champagne/cream/teal), typography (Playfair Display / DM Sans / Cormorant Garamond, loaded via Google Fonts `@import`), spacing, radii, shadows, transitions, z-index, container. **Change a token here and it propagates everywhere.** Don't hard-code colors/spacing in page HTML — use the `var(--token)` variables.
- `shared/css/reset.css` — base reset.
- `shared/css/components.css` — reusable component styles (`nav`, buttons, sections, forms, footer, float, animation classes). New pages should reuse these classes rather than inventing per-page styles.
- `shared/js/utils.js` — loaded on every page. **Behavior is wired by convention, not by per-page code:**
  - Elements with class `.fade-up` / `.fade-in` get a `.visible` class added when scrolled into view (IntersectionObserver). Add these classes to animate on scroll.
  - The `<nav>` element gets a scroll-triggered background/shadow automatically.
  - `a[href^="#"]` anchors smooth-scroll to their target.
  - `input[type="tel"]` inputs are auto-formatted as Brazilian phone numbers.
  - `handleSubmit(e)` is the form handler — currently a **client-side stub** that validates nome/whatsapp/email and shows a success state. The actual webhook/API integration is deferred ("Fase 2"); don't assume forms submit anywhere.

### Relative-path convention (important)

Pages link shared assets with relative paths, and the depth depends on folder nesting:

- Top-level page folder (e.g. `site-institucional/`): use `../shared/...`
- Nested page folder (e.g. `funis/dara-estetica/`, `landing-pages/dara-clinicas/`): use `../../shared/...`

Getting the `../` depth wrong is the most common breakage. The root `index.html` is just a meta-refresh redirect to `/site-institucional/` and uses inline styles only.

### Adding a new page

1. Create a folder, add `index.html`.
2. Link the three shared stylesheets and `utils.js` with the correct relative depth (see above).
3. Build the page from existing `components.css` classes and `tokens.css` variables.
4. `git add` / `commit` / `push` — deploy is automatic.

## Routing & headers (vercel.json)

`vercel.json` controls production routing: `/` redirects to `/site-institucional/`, `cleanUrls` and `trailingSlash` are on, `/assets/*` is cached immutably for 1 year, `/shared/*` for 1 day, and security headers (`X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`) apply site-wide. When linking between pages, account for `trailingSlash: true`.

## `/checkout/` — Fase 2

Reserved for a future Stripe integration (one-time setup fee + recurring subscription). Not yet implemented.
