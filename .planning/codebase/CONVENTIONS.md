# Coding Conventions

**Analysis Date:** 2026-05-05

## Naming Patterns

**Files:**
- PascalCase for React component files: `Nav.tsx`, `Hero.tsx`, `DashboardMockup.tsx`
- PascalCase for component CSS files, co-located with their component: `Nav.css`, `Hero.css`
- camelCase for custom hook files: `useCountUp.ts`
- PascalCase for section files: `Capabilities.tsx`, `Platform.tsx`, `UseCases.tsx`, `Contact.tsx`, `About.tsx`
- CSS and TSX files share the same base name

**Components (exported names):**
- Default export name frequently differs from file name — file is the "true" name, the export reflects semantic role:
  - `Stats.tsx` exports `TrustBar`
  - `Capabilities.tsx` exports `Products`
  - `About.tsx` exports `Hardware`
  - `Contact.tsx` exports `CtaFooter`
  - This mismatch is a known inconsistency — see CONCERNS.md
- Internal (non-exported) components use PascalCase: `Metric`, `Check`, `TabIllustration`, `Arrow`

**Constants / Data:**
- SCREAMING_SNAKE_CASE for module-level data arrays: `LINKS`, `TABS`, `STATS`, `SAAS_FEATURES`, `HARDWARE_FEATURES`, `PRODUCTS`, `PERSONAS`, `FOOTER_COLS`, `STEPS`

**Variables and State:**
- camelCase for variables and state: `scrolled`, `visible`, `open`, `pulse`, `lastScrollY`, `rafId`
- Short, descriptive names preferred; single-letter only in `.map()` callbacks (`l`, `p`, `s`, `t`, `i`)

**Types:**
- PascalCase: `TabKey`, `Kind`
- Union string types for discriminated variants: `type TabKey = 'prediction' | 'optimization' | 'flexibility' | 'control'`
- Inline object types on constants preferred over standalone interface declarations

**CSS Classes:**
- BEM-style: `nav`, `nav__inner`, `nav__logo`, `nav__link`, `nav--scrolled`, `nav__burger--open`
- Component root = block: `hero`, `trustbar`, `products`, `platform`, `hardware`, `usecases`, `ctabanner`, `footer`
- Element separator `__`, modifier separator `--`
- Global utility classes: `.container`, `.section`, `.section-surface`, `.h1`, `.h2`, `.lead`, `.mono`, `.mono-num`, `.btn`, `.btn-primary`, `.btn-secondary`, `.tag`, `.tag-orange`, `.tag-gray`, `.card`, `.arrow-link`

## Code Style

**Formatting:**
- No Prettier or ESLint config files detected — formatting is applied manually/by editor
- Single quotes for string literals in TypeScript/TSX
- 2-space indentation (inconsistency in `Nav.tsx`: some blocks use 0-indent for hooks inside component body — mixed indentation present)
- Trailing commas in arrays and object literals
- `as const` used on tuple/array literals where TypeScript would otherwise widen the type

**TypeScript:**
- Strict mode enabled (`"strict": true` in `tsconfig.json`)
- `noUnusedLocals` and `noUnusedParameters` are `false` — unused identifiers are not flagged
- Target: ES2020, module: ESNext, JSX: react-jsx
- Non-null assertion (`!`) used where DOM element is guaranteed: `document.getElementById('root')!`, `TABS.find(...)!`
- Explicit type annotations on function parameters; return types inferred

**Linting:**
- No ESLint, Prettier, or Biome config present
- TypeScript compiler (`tsc`) is the only static analysis tool (`tsc -b` in build script)

## Import Organization

**Order (observed pattern):**
1. React / external library imports (`react`, `framer-motion`, `lenis`, `gsap`)
2. Internal components (`../components/Nav`, `./components/DashboardMockup`)
3. CSS imports (`./*.css`, `../components/*.css`) — always last

**Path Aliases:**
- None configured. All imports use relative paths (`./`, `../`)

**CSS Import Location:**
- Component CSS is imported at the top of the consuming TSX file, after all JS/TS imports
- When a component's CSS is needed by a parent (e.g., `DashboardMockup.css` imported in `Hero.tsx`), the parent handles the import

## Animation Patterns

**Framer Motion:**
- `fadeUp` variant object is re-declared in every file that needs it — no shared animation module
  ```typescript
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.08 },
    }),
  }
  ```
- `custom` prop used for staggered entrance: `custom={0}`, `custom={1}`, `custom={i}`
- Scroll-triggered: `whileInView="visible"` with `viewport={{ once: true, margin: '-80px' }}`
- `AnimatePresence` with `mode="wait"` for tab/modal transitions
- Easing curve `[0.16, 1, 0.3, 1]` (expo-out) is used universally — also defined as CSS var `--ease-out-expo`

## Component Design

**Pattern:**
- Single default export per file (the section or component)
- Small helper components defined in the same file, not exported: `Check`, `Metric`, `TabIllustration`, `Arrow`
- Data arrays declared as module-level constants above the component function
- Props typed inline with `{ prop: Type }` destructuring in the function signature

**Hooks:**
- Custom hooks live in `src/hooks/` and use the `use` prefix: `useCountUp`
- Hooks return tuples with `as const`: `return [value, ref] as const`
- IntersectionObserver cleanup via `return () => observer.disconnect()`
- `requestAnimationFrame` loops stored in a `ref` for cancellation

**State:**
- `useState` for UI state (open/closed, scrolled, tab selection)
- `useRef` for mutable values that don't trigger re-render (last scroll position, animation started flag)
- No external state management library

## Error Handling

**Strategy:** None implemented.
- No try/catch blocks anywhere in the codebase
- No error boundaries
- Application is a static marketing site with no data fetching or user input processing
- Non-null assertion (`!`) is used instead of defensive checks where values are guaranteed by DOM structure

## Logging

- No logging framework
- No `console.log`, `console.warn`, or `console.error` calls in source files
- No TODO or FIXME comments found in source

## Comments

**Usage:**
- `aria-hidden` attribute used on decorative SVG elements and arrow spans for accessibility — no inline code comments
- No JSDoc or TSDoc annotations present
- Code is written to be self-documenting through descriptive constant names

## CSS Design System

**Design tokens defined in** `src/styles/global.css` as CSS custom properties:
- Colors: `--color-bg`, `--color-surface`, `--color-border`, `--color-text-primary`, `--color-text-muted`, `--color-accent`, `--color-accent-hover`, `--color-accent-light`, `--color-dark`
- Typography: `--font-sans` (Inter), `--font-mono` (IBM Plex Mono)
- Shape: `--radius-sm`, `--radius-md`, `--radius-lg`, `--shadow-card`, `--shadow-card-hover`
- Layout: `--max-width: 1200px`, `--section-py: clamp(80px, 10vw, 140px)`
- Easing: `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)`

**Global utility classes** in `src/styles/global.css` (use these, do not redefine):
- Layout: `.container`, `.section`, `.section-surface`
- Typography: `.h1`, `.h2`, `.lead`, `.mono`, `.mono-num`, `.section-label`
- UI: `.btn`, `.btn-primary`, `.btn-secondary`, `.tag`, `.tag-orange`, `.tag-gray`, `.card`, `.arrow-link`, `.arrow-link-orange`, `.arrow-link-dark`

---

*Convention analysis: 2026-05-05*
