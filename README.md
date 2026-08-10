# ray-shen.me

Personal portfolio site — Astro static build with a boids murmuration canvas.

## Stack

- **Astro** (static output) — zero JS for content, island for the canvas
- **Vanilla TypeScript canvas island** — CPU boids simulation, chevron bird glyphs
- **Self-hosted fonts** — Fraunces (display), Source Serif 4 (body), IBM Plex Mono (labels)
- **No framework components, no CDN dependencies**

## Local development

```sh
npm install
npm run dev        # dev server at http://localhost:4321
```

The dev server includes a parameter panel (bottom-right) for tuning the flock in real time.

## Build

```sh
npm run build      # outputs static site to ./dist/
npm run preview    # serve ./dist/ locally to verify before deploy
```

The build output in `./dist/` is fully static and host-agnostic. Hand it to any static host.

## Project structure

```
src/
  layouts/
    Base.astro          # HTML shell, meta, global CSS import
  components/
    FlockCanvas.astro   # Boids canvas island (client-side only)
    DevPanel.astro      # Dev-only parameter panel (stripped from prod)
  pages/
    index.astro         # Single-page layout + all content
  styles/
    tokens.css          # Design tokens (palette, type scale, spacing)
    global.css          # Reset, base styles, grain overlay, reveal animation
public/
  fonts/                # Self-hosted woff2 files
```

## Deploy

Build outputs a static `./dist/` directory. Point your deploy step at it.
`astro.config.mjs` sets `site: "https://ray-shen.me"` — no `base` path needed for a root deploy.

## Customisation notes

- **Content** — edit the `experience` and `projects` arrays at the top of `src/pages/index.astro`
- **Flock tuning** — constants at the top of `FlockCanvas.astro` (`BOID_COUNT`, `MAX_SPEED`, etc.)
- **Palette / tokens** — `src/styles/tokens.css`
- **Fonts** — swap woff2 files in `public/fonts/` and update `@font-face` declarations in `tokens.css`
