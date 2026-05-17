# Technology Stack

**Analysis Date:** 2026-05-05

## Languages

**Primary:**
- TypeScript 5.6.3 - All application source files in `prosumo/src/`
- CSS - Component-scoped stylesheets co-located with components (e.g., `prosumo/src/sections/Hero.css`)

**Secondary:**
- HTML - Single entry point `prosumo/index.html`

## Runtime

**Environment:**
- Node.js v24.12.0 (detected from local environment)

**Package Manager:**
- npm
- Lockfile: `prosumo/package-lock.json` (lockfileVersion 3) - present and committed

## Frameworks

**Core:**
- React 18.3.1 - UI rendering, component model (`prosumo/src/main.tsx`, all `.tsx` files)

**Animation:**
- Framer Motion 11.11.0 - Declarative React animation (`motion.*` components used in Hero, Contact, DashboardMockup, and more)
- GSAP 3.12.5 - Listed as dependency; not observed in current source files (likely reserved for future use or legacy)

**Scroll:**
- Lenis 1.3.23 - Smooth scroll with RAF loop, initialized in `prosumo/src/App.tsx`

**Build/Dev:**
- Vite 5.4.10 - Dev server and production bundler, config at `prosumo/vite.config.ts`
- `@vitejs/plugin-react` 4.3.3 - Vite plugin for React/JSX fast refresh

## Key Dependencies

**Critical:**
- `react` 18.3.1 - Core UI framework
- `react-dom` 18.3.1 - DOM rendering target
- `framer-motion` 11.11.0 - Animation system used throughout every major section
- `lenis` 1.3.23 - Smooth scroll; initialized globally in `App.tsx`, destroyed on unmount

**Infrastructure:**
- `typescript` 5.6.3 - Type checking (dev only, strict mode enabled)
- `@types/react` 18.3.12 - React type definitions
- `@types/react-dom` 18.3.1 - React DOM type definitions

## Configuration

**TypeScript:**
- Config: `prosumo/tsconfig.json`
- Target: ES2020, module: ESNext, moduleResolution: bundler
- JSX: react-jsx (no React import required in components)
- Strict mode: enabled
- `noUnusedLocals` and `noUnusedParameters`: disabled

**Build:**
- `prosumo/vite.config.ts` — minimal config, single plugin: `@vitejs/plugin-react`
- No custom aliases, no proxy config, no environment variable handling configured

**Environment:**
- No `.env` files detected
- No environment variables used in current source code

**Typography (external load):**
- Google Fonts loaded via `<link>` in `prosumo/index.html`:
  - Inter (400, 500, 600, 700)
  - IBM Plex Mono (400, 500)

## Platform Requirements

**Development:**
- Node.js v20+ recommended (v24.12.0 confirmed locally)
- Run: `npm run dev` (starts Vite dev server)
- Build: `npm run build` (runs `tsc -b && vite build`)
- Preview: `npm run preview`

**Production:**
- Static site output — `prosumo/dist/` (Vite SPA build)
- No server-side runtime required; deployable to any static host (Vercel, Netlify, GitHub Pages, etc.)

---

*Stack analysis: 2026-05-05*
