<!-- refreshed: 2026-05-05 -->
# Architecture

**Analysis Date:** 2026-05-05

## System Overview

```text
┌─────────────────────────────────────────────────────────────┐
│                    Browser (SPA)                             │
│  `prosumo/index.html` → `prosumo/src/main.tsx`              │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   App Shell                                  │
│  `prosumo/src/App.tsx`                                       │
│  - Initializes Lenis smooth-scroll                          │
│  - Renders Nav + ordered page sections                       │
└────────┬──────────┬────────────┬──────────────┬─────────────┘
         │          │            │              │
         ▼          ▼            ▼              ▼
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐
│  Nav     │  │ Sections │  │Components│  │     Hooks        │
│`Nav.tsx` │  │`sections/│  │`compon-  │  │`hooks/           │
│          │  │  *.tsx`  │  │ents/*.tx`│  │  useCountUp.ts`  │
└──────────┘  └──────────┘  └──────────┘  └──────────────────┘
         │          │            │
         ▼          ▼            ▼
┌─────────────────────────────────────────────────────────────┐
│           Scoped CSS (co-located per component)              │
│  `[ComponentName].css` alongside each `.tsx`                │
│  Global tokens: `prosumo/src/styles/global.css`             │
└─────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| `main.tsx` | React root mount, global CSS import | `prosumo/src/main.tsx` |
| `App` | Lenis scroll init, section composition | `prosumo/src/App.tsx` |
| `Nav` | Sticky header, hide-on-scroll, mobile drawer | `prosumo/src/components/Nav.tsx` |
| `Hero` | Above-fold headline, CTA buttons, dashboard visual | `prosumo/src/sections/Hero.tsx` |
| `TrustBar` (exported as `Stats`) | Animated metric counters | `prosumo/src/sections/Stats.tsx` |
| `Products` (exported as `Capabilities`) | Software vs hardware product cards | `prosumo/src/sections/Capabilities.tsx` |
| `Platform` | Tabbed platform feature explorer + flow diagram | `prosumo/src/sections/Platform.tsx` |
| `Hardware` (exported as `About`) | Hardware product card grid | `prosumo/src/sections/About.tsx` |
| `UseCases` | Persona-based use-case cards | `prosumo/src/sections/UseCases.tsx` |
| `CtaFooter` (exported as `Contact`) | CTA banner + site footer | `prosumo/src/sections/Contact.tsx` |
| `DashboardMockup` | Animated fake energy dashboard in hero | `prosumo/src/components/DashboardMockup.tsx` |
| `EnergyFlowDiagram` | 3-step flow illustration (Collect→Predict→Optimize) | `prosumo/src/components/EnergyFlowDiagram.tsx` |
| `HardwareIcon` | SVG icon switcher for hardware kinds | `prosumo/src/components/HardwareIcon.tsx` |
| `useCountUp` | IntersectionObserver-driven animated number counter | `prosumo/src/hooks/useCountUp.ts` |

## Pattern Overview

**Overall:** Single-page marketing site — static single-page React app with no routing, no backend, no state management library.

**Key Characteristics:**
- Single scrollable page; all navigation uses anchor (`#`) links
- All content is hardcoded as constants inside each section file (no data fetching)
- Animation is split: Framer Motion for enter/exit transitions; GSAP available but not actively used; Lenis for smooth scroll
- No shared state between sections — each section is fully self-contained
- CSS is co-located: each component/section has its own `.css` file imported directly in the `.tsx`

## Layers

**Entry:**
- Purpose: Bootstrap React into the DOM
- Location: `prosumo/src/main.tsx`
- Contains: `ReactDOM.createRoot`, global CSS import
- Depends on: `App.tsx`, `styles/global.css`
- Used by: `prosumo/index.html` via `<script type="module" src="/src/main.tsx">`

**App Shell:**
- Purpose: Top-level composition and scroll setup
- Location: `prosumo/src/App.tsx`
- Contains: Lenis smooth-scroll initialization in `useEffect`, ordered section render
- Depends on: All section components, Nav
- Used by: `main.tsx`

**Sections:**
- Purpose: Full-width page sections rendered in document order
- Location: `prosumo/src/sections/`
- Contains: Page content, local animation variants, hardcoded data arrays
- Depends on: Shared components, hooks, framer-motion
- Used by: `App.tsx`

**Components:**
- Purpose: Reusable UI pieces embedded inside sections
- Location: `prosumo/src/components/`
- Contains: Nav, DashboardMockup, EnergyFlowDiagram, HardwareIcon
- Depends on: framer-motion, hooks, co-located CSS
- Used by: sections and App.tsx

**Hooks:**
- Purpose: Encapsulated browser API logic
- Location: `prosumo/src/hooks/`
- Contains: `useCountUp.ts` — IntersectionObserver + rAF animated counter
- Depends on: React primitives only
- Used by: `Stats.tsx`

**Styles:**
- Purpose: Design token definitions and global resets
- Location: `prosumo/src/styles/global.css`
- Contains: CSS custom properties (colors, typography, spacing, easing), utility classes (`.container`, `.section`, `.btn`, `.card`, `.tag`, `.arrow-link`)
- Depends on: Google Fonts (Inter, IBM Plex Mono) loaded in `index.html`
- Used by: imported once in `main.tsx`; scoped overrides in co-located `.css` files

## Data Flow

### Page Render Path

1. Browser loads `prosumo/index.html` (`prosumo/index.html`)
2. Vite serves `prosumo/src/main.tsx` as ES module entry
3. `main.tsx` mounts `<App />` into `#root` (`prosumo/src/main.tsx:6`)
4. `App` useEffect starts Lenis rAF loop, renders Nav + sections in DOM order (`prosumo/src/App.tsx:13-25`)
5. Framer Motion `whileInView` triggers animate sections as user scrolls

### Animated Counter Flow

1. `TrustBar` renders `<Metric>` with a target number (`prosumo/src/sections/Stats.tsx:41`)
2. `Metric` calls `useCountUp(value)` which returns `[displayValue, ref]` (`prosumo/src/hooks/useCountUp.ts:3`)
3. `useCountUp` attaches an `IntersectionObserver` to the span ref
4. On intersection, rAF loop eases from 0 to `target` over `duration` ms
5. Formatted number renders inside `<span ref={ref}>`

**State Management:**
- Local `useState` only, scoped to individual components (Nav scroll state, Platform tab selection)
- No global store, no context, no prop drilling across sections

## Key Abstractions

**`fadeUp` animation variant:**
- Purpose: Standardized enter animation — opacity 0→1, y 24→0
- Examples: defined inline in every section file and in `DashboardMockup.tsx`
- Pattern: `framer-motion` `variants` object, `custom` prop for staggered delay via `i * 0.08`

**`useCountUp` hook:**
- Purpose: Trigger a number animation when element enters viewport
- Examples: `prosumo/src/hooks/useCountUp.ts`
- Pattern: Returns `[value, ref]` tuple; consumer attaches `ref` to a `<span>`

**Global CSS utility classes:**
- Purpose: Shared layout and typography without a CSS framework
- Examples: `.container`, `.section`, `.h1`, `.h2`, `.btn`, `.btn-primary`, `.card`, `.tag`, `.mono`
- Pattern: Defined in `prosumo/src/styles/global.css`, used via `className` in JSX

## Entry Points

**HTML Shell:**
- Location: `prosumo/index.html`
- Triggers: Browser request; Vite dev server or static file serve
- Responsibilities: `<meta>` tags, Google Fonts `<link>`, mounts `#root` div, loads `main.tsx`

**React Root:**
- Location: `prosumo/src/main.tsx`
- Triggers: `index.html` script tag
- Responsibilities: `ReactDOM.createRoot`, `React.StrictMode` wrapper, global CSS import

**App Component:**
- Location: `prosumo/src/App.tsx`
- Triggers: Rendered by `main.tsx`
- Responsibilities: Lenis lifecycle, section composition order

## Architectural Constraints

- **Threading:** Single-threaded browser event loop; smooth scroll uses `requestAnimationFrame` loop in `App.tsx`
- **Global state:** None — no module-level singletons beyond Lenis instance (scoped inside `useEffect` closure)
- **Routing:** None — all navigation is anchor hash links; no React Router
- **Data fetching:** None — all content is static JS constants in section files
- **Build output:** Vite produces `prosumo/dist/` (static HTML + hashed JS/CSS bundles)
- **No SSR:** Client-side only render; `index.html` has empty `#root` until JS executes

## Anti-Patterns

### File/export name mismatch

**What happens:** Several files have names that differ from their exported component names — `Stats.tsx` exports `TrustBar`, `Capabilities.tsx` exports `Products`, `About.tsx` exports `Hardware`, `Contact.tsx` exports `CtaFooter`.

**Why it's wrong:** Creates confusion when navigating code; `App.tsx` imports with aliases (`import TrustBar from './sections/Stats'`) obscuring the relationship.

**Do this instead:** Align file names with default export names: rename `Stats.tsx` → `TrustBar.tsx`, `Capabilities.tsx` → `Products.tsx`, `About.tsx` → `Hardware.tsx`, `Contact.tsx` → `CtaFooter.tsx`.

### Duplicated `fadeUp` variant

**What happens:** The `fadeUp` animation variants object is copy-pasted into every section file and `DashboardMockup.tsx`.

**Why it's wrong:** Any change to the easing or timing must be applied in 8+ places.

**Do this instead:** Extract to `prosumo/src/styles/variants.ts` and import where needed.

## Error Handling

**Strategy:** None — this is a static marketing site with no async operations or user input beyond navigation links.

**Patterns:**
- No error boundaries present
- `Contact.tsx` footer links use `onClick={(e) => e.preventDefault()}` as placeholders for unimplemented routes

## Cross-Cutting Concerns

**Logging:** None
**Validation:** None
**Authentication:** None
**Fonts:** Loaded via Google Fonts CDN in `prosumo/index.html`; fallback stacks defined in `prosumo/src/styles/global.css`

---

*Architecture analysis: 2026-05-05*
