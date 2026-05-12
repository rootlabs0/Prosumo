# Prompt: Replace the Bento Grid Services Section with a GSAP Horizontal Scroll Layout

## What you want to do

Replace the current **Services section** (`src/sections/Services.tsx` + `Services.css`) — which uses the `MagicBento` component to display 8 service cards in a 4-column dark bento grid — with a **GSAP-powered horizontal scroll section** on a white background. The section should feel like a curated gallery of scattered black rectangular/square placeholders (which will later be replaced by real visuals). The existing "What We Offer" header text, tagline, and CTA buttons should be preserved but repositioned within the new layout.

---

## Technical Foundation

- **Stack**: React + TypeScript, GSAP (`gsap` already in `package.json`), `gsap/ScrollTrigger`
- **Background**: White (`#ffffff`)
- **Remove**: The `MagicBento` component and its import from `Services.tsx`
- **Keep**: The 8 service data entries (titles, descriptions, labels) — they're currently in `MagicBento.tsx` as `cardData`. Extract them into `Services.tsx` directly.

The 8 services are:

```ts
const SERVICES = [
  { id: '01', label: 'Solar Forecasting',   title: 'PV Production Forecasting',    desc: 'Accurate models based on meteorological data predict photovoltaic output up to tens of hours ahead.' },
  { id: '02', label: 'PV Diagnostics',      title: 'PV Operations Diagnostics',    desc: 'Detects deviations in AC/DC output for early fault detection at string or inverter level.' },
  { id: '03', label: 'SPOT Optimization',   title: 'SPOT Market Optimization',     desc: 'Algorithms schedule device operation according to the SPOT market price curve.' },
  { id: '04', label: 'Balance Forecasting', title: 'Balance Point Forecasting',    desc: 'A 24-hour ahead consumption and supply model helps reduce imbalance costs.' },
  { id: '05', label: 'Energy Efficiency',   title: 'Energy Efficiency Audit',      desc: 'Dynamic management of consumption, generation, and storage minimizes forecast deviation.' },
  { id: '06', label: 'Flex Forecasting',    title: 'Flexibility Forecasting',      desc: 'Calculates available regulatory energy volume that can be offered to aggregators.' },
  { id: '07', label: 'Flex Valuation',      title: 'Flexibility Valuation',        desc: 'Economic assessment of regulatory energy provision for real-time decision-making.' },
  { id: '08', label: 'Group Sharing',       title: 'Sharing Group Optimization',   desc: 'Manages energy community consumption and generation to maximise self-consumption.' },
]
```

---

## Section Structure

```
<section id="services"> ← tall enough for GSAP scroll distance (height: 500vh on desktop)
  <div class="services__sticky"> ← position: sticky, top: 0, height: 100vh, overflow: hidden
    <div class="services__strip"> ← position: absolute, width: ~4000px, height: 100%, GSAP moves this left
      <h2 class="services__heading">OUR SOLUTION</h2>  ← parallax at ~30% strip speed
      <!-- 8 scattered .svc-block items, absolutely positioned -->
    </div>
  </div>
</section>
```

---

## Item Layout (Scattered, Asymmetric)

Position each block absolutely within the 4000px strip. Use **mostly small squares/rectangles** (90–160px) with only 2–3 large ones (240–360px). All blocks are solid black (`#111`). **No border-radius anywhere.** Example layout:

```ts
type Block = {
  id: string; label: string; title: string; desc: string;
  x: number; y: string; w: number; h: number;
  textSide: 'left' | 'right' | 'bottom' | 'top';
}

const BLOCKS: Block[] = [
  { id:'01', ...SERVICES[0], x: 1060, y: '44%', w: 120, h: 120, textSide: 'right'  },
  { id:'02', ...SERVICES[1], x: 1260, y: '26%', w: 280, h: 340, textSide: 'right'  }, // BIG
  { id:'03', ...SERVICES[2], x: 1680, y: '56%', w: 140, h: 100, textSide: 'bottom' },
  { id:'04', ...SERVICES[3], x: 1900, y: '30%', w: 100, h: 140, textSide: 'right'  },
  { id:'05', ...SERVICES[4], x: 2120, y: '50%', w: 260, h: 300, textSide: 'left'   }, // BIG
  { id:'06', ...SERVICES[5], x: 2480, y: '24%', w: 110, h: 110, textSide: 'right'  },
  { id:'07', ...SERVICES[6], x: 2700, y: '57%', w: 130, h: 90,  textSide: 'left'   },
  { id:'08', ...SERVICES[7], x: 2920, y: '27%', w: 320, h: 220, textSide: 'bottom' }, // BIG
]
```

---

## Each Block's HTML Structure

```tsx
<div
  className={`svc-block svc-block--${block.textSide}`}
  style={{ left: block.x, top: block.y, width: block.w, height: block.h }}
>
  <div className="svc-block__rect" /> {/* solid black square, no border-radius */}
  <div className="svc-block__info">   {/* hidden, revealed on hover */}
    <span className="svc-block__num">{block.id}</span>
    <h3 className="svc-block__title">{block.label}</h3>
    <p className="svc-block__desc">{block.desc}</p>
  </div>
</div>
```

---

## GSAP Setup

```ts
gsap.registerPlugin(ScrollTrigger)

const STRIP_WIDTH = 4000

useLayoutEffect(() => {
  if (isMobile) return
  const distance = STRIP_WIDTH - window.innerWidth

  // Pin sticky + drive strip horizontally
  gsap.to(stripRef.current, {
    x: () => -(STRIP_WIDTH - window.innerWidth),
    ease: 'none',
    scrollTrigger: {
      trigger: sectionRef.current,
      start: 'top top',
      end: () => `+=${distance}`,
      pin: stickyRef.current,
      scrub: 0.8,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  })

  // Heading parallax — moves at ~30% of strip speed (mostly stays pinned)
  gsap.to(headingRef.current, {
    x: () => -(STRIP_WIDTH - window.innerWidth) * 0.3,
    ease: 'none',
    scrollTrigger: {
      trigger: sectionRef.current,
      start: 'top top',
      end: () => `+=${distance}`,
      scrub: 0.8,
      invalidateOnRefresh: true,
    },
  })

  // Sequential fade-in for all blocks when section enters viewport
  gsap.from('.svc-block', {
    opacity: 0,
    y: 40,
    duration: 0.7,
    stagger: 0.07,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: sectionRef.current,
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    },
  })
}, [isMobile])
```

---

## Hover Interaction (CSS)

Each `.svc-block__info` starts `opacity: 0` and transitions to `opacity: 1` on `.svc-block:hover`. Position using the `textSide` variant classes:

```css
.svc-block { position: absolute; }

.svc-block__rect {
  width: 100%;
  height: 100%;
  background: #111;
  display: block;
  transition: transform 0.4s ease;
}
.svc-block:hover .svc-block__rect { transform: scale(1.02); }

.svc-block__info {
  position: absolute;
  opacity: 0;
  width: 200px;
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.svc-block:hover .svc-block__info { opacity: 1; }

/* Side variants */
.svc-block--right  .svc-block__info { left: calc(100% + 18px); top: 50%; transform: translateY(-50%) translateX(-6px); }
.svc-block--right:hover .svc-block__info { transform: translateY(-50%) translateX(0); }

.svc-block--left   .svc-block__info { right: calc(100% + 18px); top: 50%; transform: translateY(-50%) translateX(6px); text-align: right; }
.svc-block--left:hover .svc-block__info { transform: translateY(-50%) translateX(0); }

.svc-block--bottom .svc-block__info { top: calc(100% + 14px); left: 0; transform: translateY(-6px); }
.svc-block--bottom:hover .svc-block__info { transform: translateY(0); }

.svc-block--top    .svc-block__info { bottom: calc(100% + 14px); left: 0; transform: translateY(6px); }
.svc-block--top:hover .svc-block__info { transform: translateY(0); }

/* Label styles */
.svc-block__num   { display: block; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.16em; color: #f5a30f; margin-bottom: 6px; }
.svc-block__title { margin: 0 0 6px; font-size: 1.05rem; font-weight: 700; color: #1f1f1f; }
.svc-block__desc  { margin: 0; font-size: 0.82rem; line-height: 1.4; color: #555; }
```

---

## Heading Style

```css
.services__heading {
  position: absolute;
  top: 12vh;
  left: 6vw;
  font-size: clamp(5rem, 12vw, 11rem);
  font-weight: 900;
  line-height: 0.92;
  letter-spacing: -0.04em;
  color: #f5a30f;
  text-transform: uppercase;
  pointer-events: none;
  white-space: nowrap;
  will-change: transform;
  z-index: 2;
}
```

---

## Mobile Fallback (≤900px)

Skip GSAP entirely. Render the heading statically and items in a native horizontal swipe row with scroll-snap:

```tsx
if (isMobile) {
  return (
    <section id="services" className="services services--mobile">
      <h2 className="services__heading services__heading--mobile">OUR<br />SOLUTION</h2>
      <div className="services__mobile-scroll">
        {BLOCKS.map(block => (
          <div key={block.id} className="svc-block-mobile">
            <div className="svc-block-mobile__rect" />
            <div className="svc-block-mobile__info">
              <span className="svc-block__num">{block.id}</span>
              <h3 className="svc-block__title">{block.label}</h3>
              <p className="svc-block__desc">{block.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
```

```css
.services--mobile { padding: 80px 20px 100px; background: #fff; }

.services__heading--mobile {
  position: static;
  font-size: clamp(3rem, 14vw, 5rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.03em;
  color: #f5a30f;
  text-transform: uppercase;
  margin: 0 0 48px;
}

.services__mobile-scroll {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding-bottom: 24px;
}
.services__mobile-scroll::-webkit-scrollbar { display: none; }

.svc-block-mobile {
  flex: 0 0 72vw;
  max-width: 300px;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.svc-block-mobile__rect { width: 100%; height: 220px; background: #111; }
```

---

## Key Constraints

- **No `border-radius` anywhere** — all blocks are sharp rectangles
- Section background is **white** (`#ffffff`), not `var(--bg)`
- Do **not** import or use `MagicBento` or `framer-motion` in this section
- The `section` element keeps `id="services"` so the nav anchor link still works
- Register ScrollTrigger at the top of the file: `gsap.registerPlugin(ScrollTrigger)`
- Use `useLayoutEffect` (not `useEffect`) for GSAP to avoid flash of unstyled content
- Clean up with `ctx.revert()` in the return of `useLayoutEffect`
- Blocks must not touch the very top of the visible area — minimum `y` value should be `20%`
