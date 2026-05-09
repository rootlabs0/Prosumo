# Codebase Concerns

**Analysis Date:** 2026-05-05

## Tech Debt

**Duplicate `fadeUp` animation variant defined in every component:**
- Issue: Identical `fadeUp` motion variant object is copy-pasted into every section and component file. Any change requires updating 7+ files.
- Files: `src/sections/Hero.tsx`, `src/sections/Stats.tsx`, `src/sections/Capabilities.tsx`, `src/sections/Platform.tsx`, `src/sections/About.tsx`, `src/sections/UseCases.tsx`, `src/sections/Contact.tsx`, `src/components/DashboardMockup.tsx`
- Impact: Inconsistency risk — animation timing/easing can drift across sections if one is updated and others are not.
- Fix approach: Extract to `src/lib/motion.ts` or `src/utils/variants.ts` and import where needed.

**Hardcoded SVG chart path in DashboardMockup:**
- Issue: The energy consumption chart in `src/components/DashboardMockup.tsx` is a static SVG `<path>` with hardcoded coordinate strings. The data points (`M0,110 L40,98 L80,104...`) are fake and cannot be driven by real data without a full rewrite.
- Files: `src/components/DashboardMockup.tsx` (lines 52–63)
- Impact: When real data integration is needed, the entire chart must be replaced rather than updated.
- Fix approach: Replace with a data-driven approach (array of values mapped to SVG points) so the path can accept real or mock data arrays.

**`TabIllustration` uses if/else chain instead of a component map:**
- Issue: `src/sections/Platform.tsx` uses `if (tab === 'prediction') ... if (tab === 'optimization') ...` chain to render SVG illustrations. Adding a new tab requires touching the chain.
- Files: `src/sections/Platform.tsx` (lines 41–86)
- Impact: Brittle — a new tab key added to `TABS` array won't render an illustration without also updating the if/else chain. No TypeScript exhaustiveness check enforces this.
- Fix approach: Use a record/map `const TAB_ILLUSTRATIONS: Record<TabKey, JSX.Element>` for exhaustive mapping.

**Stale date in product availability tag:**
- Issue: `src/sections/About.tsx` shows `tag: 'Coming Q3 2025'` for the CM-4 Control Module. This date is now 3+ quarters in the past.
- Files: `src/sections/About.tsx` (line 57)
- Impact: Credibility risk — visitors see an outdated roadmap date.
- Fix approach: Update to current release timeline or change to "Coming Soon".

**Inconsistent indentation in Nav.tsx:**
- Issue: `src/components/Nav.tsx` mixes indentation levels — the scroll `useEffect` block (lines 20–30) is at the root component level while the surrounding code is indented differently.
- Files: `src/components/Nav.tsx` (lines 15–30)
- Impact: Readability and future merge conflicts.
- Fix approach: Run Prettier to enforce consistent formatting; add a Prettier config file.

**Two animation libraries loaded simultaneously:**
- Issue: Both `framer-motion` (`^11.11.0`) and `gsap` (`^3.12.5`) are declared as production dependencies, but the source code only uses `framer-motion`. GSAP is not imported anywhere in `src/`.
- Files: `prosumo/package.json`
- Impact: GSAP adds ~80KB to the bundle for zero benefit. Increases cold load time.
- Fix approach: Remove `gsap` from `dependencies` in `package.json` and run `npm install` to update the lockfile. If GSAP is planned for future use, move to `devDependencies` with a comment.

## Known Bugs

**Nav visibility bug on programmatic scroll:**
- Symptoms: The nav hide/show logic in `src/components/Nav.tsx` uses `window.scrollY < lastScrollY.current` to decide visibility. If smooth-scroll from Lenis fires while the user's mouse is still, the nav may flicker or hide unexpectedly mid-page because Lenis drives `window.scrollY` on each RAF tick.
- Files: `src/components/Nav.tsx` (lines 21–28), `src/App.tsx` (lines 13–25)
- Trigger: Click a nav anchor link; watch the nav as scroll easing runs.
- Workaround: None currently; nav restores on any upward pixel delta.

## Security Considerations

**No CSP or security headers configuration:**
- Risk: Vite serves no Content-Security-Policy, X-Frame-Options, or X-Content-Type-Options headers in development or production preview.
- Files: `prosumo/vite.config.ts`
- Current mitigation: This is a static marketing site with no user input (except the mailto link), so attack surface is minimal.
- Recommendations: Add a `server.headers` block to `vite.config.ts` and configure production hosting (Netlify/Vercel) to emit security headers.

**Contact form is a `mailto:` link — no input sanitization needed, but no rate limiting either:**
- Risk: `href="mailto:hello@prosumo.cz"` exposes the company email address to scraper harvesting.
- Files: `src/sections/Contact.tsx` (line 41)
- Current mitigation: None.
- Recommendations: Replace with a contact form backed by a serverless function, or obfuscate the mailto address.

## Performance Bottlenecks

**No route splitting or lazy loading:**
- Problem: All sections (Hero, Stats, Capabilities, Platform, About, UseCases, Contact) are eagerly imported and rendered. The entire JS bundle is loaded on first paint.
- Files: `src/App.tsx`
- Cause: Single-page flat structure with no `React.lazy()` or dynamic imports.
- Improvement path: For the current site size (~1100 lines total) this is acceptable, but if more sections or a real dashboard are added, split at route level with `React.lazy`.

**`useCountUp` runs `requestAnimationFrame` loop on mount even when off-screen:**
- Problem: The RAF animation in `src/hooks/useCountUp.ts` starts immediately once `IntersectionObserver` fires, without cancellation if the element leaves the viewport mid-animation.
- Files: `src/hooks/useCountUp.ts` (lines 16–22)
- Cause: RAF `tick` function has no cleanup path — only `observer.disconnect()` on entry, not a RAF `cancelAnimationFrame` on exit.
- Improvement path: Store the `rafId` in a `ref` and cancel it in the `IntersectionObserver` cleanup or a scroll-away handler.

**Web fonts loaded without `font-display: swap`:**
- Problem: `global.css` references `Inter` and `IBM Plex Mono` but there is no `@font-face` declaration with `font-display: swap` visible in the CSS. If these are loaded via Google Fonts in `index.html`, missing `&display=swap` causes layout shift and invisible text during load.
- Files: `src/styles/global.css`, `prosumo/index.html` (not read — check `<link>` tags)
- Improvement path: Verify `index.html` includes `&display=swap` on Google Fonts `<link>`, or self-host fonts with explicit `font-display: swap`.

## Fragile Areas

**Footer nav links are all `href="#"` with `preventDefault`:**
- Files: `src/sections/Contact.tsx` (lines 69–72)
- Why fragile: All footer column links (Platform, Hardware, Pricing, Docs, About, Careers, Blog, Contact, Privacy Policy, Terms of Service) are placeholder `#` anchors that fire `e.preventDefault()`. They appear functional but do nothing.
- Safe modification: Replace each `href="#"` with the actual target URL or internal anchor before launch; do not remove `preventDefault` without a real destination.

**`TABS.find(...)!` non-null assertion in Platform:**
- Files: `src/sections/Platform.tsx` (line 90)
- Why fragile: `const active = TABS.find((t) => t.key === tab)!` uses a non-null assertion. If `tab` state ever gets out of sync with `TABS` keys (e.g., after a refactor that removes a tab), this silently returns `undefined` and crashes at render.
- Safe modification: Replace with `TABS.find(...) ?? TABS[0]` to guarantee a fallback.

**Nav links include `#pricing` and `#docs` anchors that have no matching section IDs on the page:**
- Files: `src/components/Nav.tsx` (lines 6–11)
- Why fragile: Clicking "Pricing" or "Docs" in the nav produces a broken scroll-to anchor. No `id="pricing"` or `id="docs"` section exists anywhere in the codebase.
- Safe modification: Either add the sections, replace with external URLs, or remove these links.

## Missing Critical Features

**No analytics or tracking:**
- Problem: No analytics integration (GA4, Plausible, etc.) exists in the codebase.
- Blocks: Cannot measure conversion rate on "Book a Demo" CTA or understand user journey through sections.

**No error boundary:**
- Problem: No React `ErrorBoundary` wraps any component tree. Any component throw (e.g., the non-null assertion crash in Platform) will white-screen the entire app.
- Files: `src/App.tsx`, `src/main.tsx`
- Risk: A single runtime error kills the whole page with no user-facing fallback.

**No `robots.txt` or `sitemap.xml`:**
- Problem: No SEO-critical files are present in `prosumo/` public directory. Vite won't generate them automatically.
- Blocks: Search engine crawlers have no explicit guidance; sitemap absence slows indexing for a new domain.

## Test Coverage Gaps

**Zero tests exist:**
- What's not tested: The entire codebase has no test files, no test runner config, and no testing dependencies in `package.json`.
- Files: All of `src/`
- Risk: Any refactor (e.g., extracting the shared `fadeUp` variant, fixing the non-null assertion) has no regression safety net.
- Priority: Medium — this is currently a static marketing site, but `useCountUp` hook logic and the Platform tab state are good candidates for unit tests if the codebase grows.

---

*Concerns audit: 2026-05-05*
