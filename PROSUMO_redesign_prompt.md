# META PROMPT — PROSUMO B2B Website Redesign
---

## YOUR ROLE

You are a senior product designer and frontend engineer who has shipped B2B SaaS websites for enterprise clients. Your reference points are **Vercel, Notion, Linear, and Clerk** — sites that are clean, typographically precise, editorially confident, and built to convert a mixed audience of executives, engineers, and operators.

Build a **complete, production-ready React website** for **PROSUMO s.r.o.** — a Czech energy-tech company selling both a **cloud SaaS platform** and **physical hardware** (sensors, controllers, energy gateways) for industrial and commercial energy management.

---

## BRAND & VISUAL SYSTEM

### Color Palette — strict, no exceptions
| Role | Value | Usage |
|------|-------|-------|
| Background | `#FFFFFF` | Page background, card surfaces |
| Text primary | `#0A0A0A` | Headlines, body, labels |
| Text muted | `#6B7280` | Sublines, captions, metadata |
| Accent / CTA | `#E8521A` | All primary buttons, links, highlights, active states |
| Accent light | `#FFF1EC` | Pill backgrounds, tag fills, hover states on cards |
| Border | `#E5E7EB` | Dividers, card outlines, input borders |
| Surface | `#F9F9F9` | Alternating section backgrounds, code blocks |

**Rules:**
- Never use gradients on CTA buttons — flat orange only
- No dark backgrounds anywhere — this is a white-first design
- Orange is used sparingly: CTAs, key numbers, hover underlines, icon accents. It should feel intentional, not loud.
- All section backgrounds alternate between `#FFFFFF` and `#F9F9F9` for rhythm

### Typography
- **Headlines**: `Geist` (via `npm install geist`) or fallback `'Inter'` — weight 600–700, tight tracking (`letter-spacing: -0.02em`)
- **Body**: `Inter` — weight 400, `line-height: 1.7`
- **Mono / labels**: `'Geist Mono'` or `'IBM Plex Mono'` — for product names, hardware specs, version numbers, stat labels
- **Scale**:
  - Hero H1: `clamp(2.75rem, 5vw, 4.5rem)`, weight 700
  - Section H2: `clamp(1.75rem, 3vw, 2.5rem)`, weight 600
  - Card title: `1.125rem`, weight 600
  - Body: `1rem` / `0.9375rem`
  - Label / caption: `0.8125rem`, uppercase, `letter-spacing: 0.08em`, color: muted

### Shape & Space
- Border radius: `8px` for cards, `6px` for buttons, `4px` for tags/pills — consistent, not excessive
- Shadows: `0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)` — subtle, card-lifting only
- Section vertical padding: `clamp(80px, 10vw, 140px)`
- Max content width: `1200px`, centered
- Grid: 12-column, `gap: 24px`

---

## AUDIENCE & CONVERSION STRATEGY

**Three buyer personas — all land on the same page:**
1. **C-level / CFO** → wants ROI proof, credibility, trusted brand signals
2. **CTO / Head of Engineering** → wants integration docs, API, technical depth
3. **Energy / Facility Manager** → wants to understand the hardware, the dashboard, the day-to-day

**Primary CTA everywhere**: `Book a Demo` — orange button, always visible.

**Strategy**: Lead with the outcome (cost savings, control, reliability), then prove it with specifics (hardware specs, platform features, case stats), then make it easy to take action.

---

## SITE STRUCTURE — 8 SECTIONS

### 1. NAVIGATION
```
[PROSUMO logo]          Products    Platform    Hardware    Pricing    Docs        [Book a Demo →]
```
- Logo: wordmark, black, left-aligned. Simple logotype — "PROSUMO" in Geist 600.
- Nav links: `0.9rem`, color muted, hover → black
- CTA button: orange background, white text, `border-radius: 6px`, `padding: 10px 20px`
- Behavior: sticky, white bg, `border-bottom: 1px solid var(--color-border)` on scroll
- Mobile: hamburger menu, full-screen slide-down

---

### 2. HERO

**Layout**: Two-column. Left: text + CTAs. Right: product UI mockup or hardware photograph placeholder.

**Headline** (pick whichever reads better, Opus chooses):
> "Energy management that pays for itself."
> — or —
> "Intelligent control for every kilowatt."

**Subline**:
> "PROSUMO combines AI-powered cloud software with industrial-grade hardware to give energy managers, CTOs, and executives complete visibility and control over their energy infrastructure."

**CTAs** (side by side):
- Primary: `[Book a Demo →]` — orange, filled
- Secondary: `[See How It Works]` — black text, underline on hover, no border/bg

**Social proof bar** below CTAs:
```
Trusted by energy operators across Central Europe
[Logo placeholder] [Logo placeholder] [Logo placeholder] [Logo placeholder]
```
Small gray logos, `opacity: 0.5`, grayscale.

**Right column — Hero visual**:
Build a stylized **dashboard mockup** using HTML/CSS — no real images needed. Show:
- A dark-surfaced card (contrast element) with a live energy chart (SVG line chart, orange line)
- Three stat pills: `49.98 Hz Grid Frequency` · `99.97% Uptime` · `12ms Latency`
- A subtle orange glow behind the card (`box-shadow: 0 0 80px rgba(232, 82, 26, 0.12)`)

This mockup should feel like a real product screenshot — precise, data-forward.

---

### 3. SOCIAL PROOF / TRUST BAR
Full-width, `background: #F9F9F9`, `border-top` and `border-bottom: 1px solid var(--border)`.

Three columns of key metrics:
```
3× average ROI        99.97% uptime SLA        <12ms response latency
across deployments    guaranteed               edge-to-cloud
```
Large orange number/stat, small black label below, small muted caption below that.
No icons — the numbers speak.

---

### 4. PRODUCTS — "Two ways to deploy PROSUMO"

**Section label** (small caps, muted): `PRODUCTS`
**Headline**: `"Software and hardware. Built to work together."`
**Subline**: `"Choose the deployment that fits your infrastructure — or use both."`

Two large feature cards side by side:

#### Card A — SaaS Platform
- Tag pill: `CLOUD SOFTWARE` — orange bg light (`#FFF1EC`), orange text
- Title: `"PROSUMO Cloud Platform"`
- Description: `"AI-powered prediction, optimization, and remote control for your energy assets. Connects to any EMS via open APIs. No infrastructure required."`
- Feature list (4 items, checkmark prefix in orange):
  - Demand & generation forecasting
  - Multi-objective optimization engine
  - Grid flexibility & demand response
  - Remote monitoring & override
- CTA link: `Explore the platform →` (orange text, arrow)

#### Card B — Hardware
- Tag pill: `PHYSICAL HARDWARE` — gray bg (`#F3F4F6`), dark text
- Title: `"PROSUMO Gateway & Sensors"`
- Description: `"Industrial-grade IoT hardware — energy gateways, current sensors, and control modules — designed for direct integration with your existing EMS and the PROSUMO cloud."`
- Feature list (4 items):
  - DIN-rail mounted energy gateway
  - High-accuracy current & voltage sensors
  - Secure edge compute with local failover
  - Plug-and-play EMS integration
- CTA link: `View hardware specs →` (black text, arrow)

Card styling: white bg, `border: 1px solid var(--border)`, `border-radius: 8px`, `padding: 40px`, subtle shadow. Equal height.

---

### 5. PLATFORM DEEP-DIVE

**Section label**: `PLATFORM`
**Headline**: `"From raw sensor data to decisive action — automatically."`

Three-step flow, displayed as a horizontal sequence with connecting arrows:

```
[① COLLECT]          →      [② PREDICT]         →      [③ OPTIMIZE]
Hardware sensors            AI models forecast          Algorithms dispatch
gather real-time            demand, generation,         energy assets to
energy data                 and grid state              minimize cost & waste
```

Below the flow — a larger feature breakdown in a 2-column layout:

Left side: vertical tab navigation with 4 options:
- `Prediction Engine`
- `Optimization Loop`  
- `Flexibility & Trading`
- `Control & Override`

Right side: content pane that updates per tab. Each pane has:
- A headline
- 2–3 sentences of description
- A simple SVG or CSS illustration relevant to that feature (e.g. a graph for prediction, a dial for control)

Make this tabbed section interactive (React `useState`).

---

### 6. HARDWARE SECTION

**Section label**: `HARDWARE`
**Headline**: `"Built for the industrial environment."`
**Subline**: `"Every PROSUMO hardware component is engineered for reliability, accuracy, and seamless cloud connectivity."`

**Layout**: 3-column product card grid

#### Product Card 1 — Energy Gateway
- Icon: SVG router/box shape (draw with CSS or inline SVG)
- Name: `EMS Gateway G1`
- Specs (monospace font, small):
  ```
  DIN-rail mount
  4× RS-485 / Modbus RTU
  LTE + Ethernet fallback
  Edge compute: ARM Cortex-A7
  IP20 rated
  ```
- Tag: `Available now`

#### Product Card 2 — Current Sensor
- Icon: SVG clamp/ring shape
- Name: `CS-100 Current Sensor`
- Specs:
  ```
  100A split-core CT
  ±0.5% accuracy class
  Plug-in terminal block
  Compatible: G1 Gateway
  ```
- Tag: `Available now`

#### Product Card 3 — Control Module
- Icon: SVG relay/switch shape
- Name: `CM-4 Control Module`
- Specs:
  ```
  4× relay outputs (16A)
  2× analog inputs 0–10V
  Modbus RTU slave
  Mounts alongside G1
  ```
- Tag: `Coming Q3 2025`

Card styling: white bg, border, `border-radius: 8px`, `padding: 32px`. Icon area: `48×48px`, orange tint bg (`#FFF1EC`), orange SVG icon.

---

### 7. HOW IT WORKS — FOR EACH PERSONA

**Section label**: `USE CASES`  
**Headline**: `"The right view for every stakeholder."`

Three columns, each for a different persona:

| For executives | For engineers | For operators |
|---|---|---|
| ROI dashboard, cost reduction report, executive summary export | API docs, webhook events, SDK integrations, Modbus config | Live energy dashboard, alert management, device status, override controls |

Each column: persona label (pill), headline, 3-bullet feature list, a link `→ Learn more`.

---

### 8. CTA BANNER + FOOTER

**CTA Banner** — full-width, `background: #0A0A0A` (the only dark section), centered:
- Headline (white): `"Ready to take control of your energy?"`
- Subline (muted white): `"Talk to our team. We'll map out a deployment plan for your infrastructure in 30 minutes."`
- Button: `[Book a Free Demo →]` — orange, white text

**Footer** — white bg, `border-top: 1px solid var(--border)`:
```
PROSUMO s.r.o.               Products          Company          Legal
Prague, Czech Republic        Platform          About            Privacy Policy
                              Hardware          Careers          Terms of Service
hello@prosumo.cz              Pricing           Blog             
                              Docs              Contact          
© 2024 PROSUMO s.r.o. All rights reserved.
```

---

## ANIMATIONS — PURPOSEFUL, NOT DECORATIVE

This is a Notion/Vercel-style site — animations should feel **effortless**, not theatrical. No preloaders, no character scrambles.

Implement using **Framer Motion**:

### 1. Scroll reveals (ALL sections)
```jsx
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
}
// viewport: { once: true, margin: "-80px" }
```

### 2. Hero stat pills — staggered entrance
Animate each stat pill in with a 100ms stagger after page load (use `AnimatePresence` + `delay`).

### 3. Product tabs — smooth content swap
When switching platform tabs, animate content out (`opacity: 0, x: -8`) then in (`opacity: 1, x: 0`). Duration: `200ms`.

### 4. Stats counter
On scroll into view, count up from `0` to the target value over `1.2s` using `requestAnimationFrame`. Use `easeOutExpo` easing.

### 5. CTA button hover
```css
.btn-primary {
  transition: background 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
}
.btn-primary:hover {
  background: #C94415; /* slightly darker orange */
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(232, 82, 26, 0.3);
}
.btn-primary:active {
  transform: translateY(0px);
}
```

### 6. Nav CTA — pulse on first load
After 3 seconds, apply a single subtle pulse animation to the `Book a Demo` nav button to draw attention. One pulse only, never repeats.

---

## TECH STACK

### Setup
```bash
npm create vite@latest prosumo-b2b -- --template react
cd prosumo-b2b
npm install framer-motion lenis geist
```

### Fonts (index.html)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### CSS Variables (globals.css)
```css
:root {
  --color-bg: #FFFFFF;
  --color-surface: #F9F9F9;
  --color-border: #E5E7EB;
  --color-text-primary: #0A0A0A;
  --color-text-muted: #6B7280;
  --color-accent: #E8521A;
  --color-accent-light: #FFF1EC;
  --color-dark: #0A0A0A;

  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --shadow-card: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
  --max-width: 1200px;
  --section-py: clamp(80px, 10vw, 140px);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { background: var(--color-bg); color: var(--color-text-primary); font-family: var(--font-sans); -webkit-font-smoothing: antialiased; }
a { color: inherit; text-decoration: none; }
```

### Project Structure
```
src/
├── components/
│   ├── Nav.jsx
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── TrustBar.jsx
│   │   ├── Products.jsx
│   │   ├── Platform.jsx
│   │   ├── Hardware.jsx
│   │   ├── UseCases.jsx
│   │   └── CtaFooter.jsx
│   ├── DashboardMockup.jsx     # Hero right-column mockup
│   ├── EnergyFlowDiagram.jsx   # Platform section 3-step flow
│   └── HardwareIcon.jsx        # SVG icon component
├── hooks/
│   └── useCountUp.js           # Stats animation
├── styles/
│   └── globals.css
├── App.jsx
└── main.jsx
```

### Lenis Setup (App.jsx)
```jsx
import Lenis from 'lenis'
import { useEffect } from 'react'

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 0.9 })
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])
  // ...
}
```

### useCountUp Hook
```js
import { useEffect, useRef, useState } from 'react'

export function useCountUp(target, duration = 1200) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const start = performance.now()
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 4) // easeOutQuart
        setValue(Math.round(eased * target))
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return [value, ref]
}
```

---

## COPY — USE VERBATIM

All copy below is final. Do not paraphrase or invent new claims.

**Hero headline option A**: `"Energy management that pays for itself."`
**Hero headline option B**: `"Intelligent control for every kilowatt."`
*(Opus: choose whichever fits the layout rhythm better)*

**Hero subline**: `"PROSUMO combines AI-powered cloud software with industrial-grade hardware to give energy managers, CTOs, and executives complete visibility and control over their energy infrastructure."`

**Products section subline**: `"Choose the deployment that fits your infrastructure — or use both."`

**Platform headline**: `"From raw sensor data to decisive action — automatically."`

**Hardware headline**: `"Built for the industrial environment."`

**About / origin paragraph**: `"PROSUMO s.r.o. develops advanced algorithms for energy flow control and operational diagnostics, integrated directly into the EMS solutions of other manufacturers. These systems connect to the PROSUMO Cloud Platform, enabling real-time prediction, optimization, flexibility, and complete operational control. Our technology is built at the intersection of deep energy expertise, artificial intelligence, and cybersecurity."`

**CTA banner headline**: `"Ready to take control of your energy?"`
**CTA banner subline**: `"Talk to our team. We'll map out a deployment plan for your infrastructure in 30 minutes."`

**Footer tagline**: `"Smarter energy, by design."`

---

## QUALITY CHECKLIST — DO NOT SKIP

- [ ] Color palette is strictly white / `#0A0A0A` text / `#E8521A` accent — no other colors introduced
- [ ] Orange used only on: primary buttons, stat numbers, card tag pills, icon bg tints, hover underlines
- [ ] All three buyer personas addressed somewhere in the copy (exec, engineer, operator)
- [ ] `Book a Demo` CTA appears in: nav, hero, use cases section, CTA banner — minimum 4 times
- [ ] Hardware section has real-looking spec sheets in monospace font
- [ ] Platform tabs are interactive (useState) with animated content transitions
- [ ] Stats count up on scroll — use the `useCountUp` hook provided
- [ ] Lenis smooth scroll initialized in App.jsx
- [ ] All scroll animations use `whileInView` with `once: true`
- [ ] Mobile responsive: single column at `<768px`, hamburger nav, full-width buttons
- [ ] Nav CTA pulses once after 3s on first load
- [ ] No gradients anywhere except the subtle orange glow on hero mockup card
- [ ] `font-display: swap` on all font loads
- [ ] All images are replaced with CSS/SVG mockups — no broken `<img>` tags

---

## DELIVERABLE

Produce **complete, runnable React code** for every file in the project structure. No placeholder comments, no `// TODO` — write the full implementation.

Order of output:
1. `globals.css`
2. `App.jsx`
3. `Nav.jsx`
4. `Hero.jsx` + `DashboardMockup.jsx`
5. `TrustBar.jsx`
6. `Products.jsx`
7. `Platform.jsx` + `EnergyFlowDiagram.jsx`
8. `Hardware.jsx` + `HardwareIcon.jsx`
9. `UseCases.jsx`
10. `CtaFooter.jsx`
11. `useCountUp.js`

After all code:
- Exact `npm install` command
- `npm run dev` to start
- Any notes on font loading or browser compatibility

---

*End of meta prompt.*
