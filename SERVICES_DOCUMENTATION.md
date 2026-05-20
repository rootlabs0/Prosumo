# Services Section Documentation

## Initial Prompt & Context

**You are working on a horizontal-scrolling services showcase component for the Prosumo energy optimization platform.** This component displays 8 different energy management services (solar forecasting, PV diagnostics, SPOT market optimization, balance forecasting, energy efficiency, flexibility forecasting, flexibility valuation, and sharing group optimization) in an interactive, horizontally-scrolling layout.

The component uses **GSAP (GreenSock Animation Platform)** with ScrollTrigger to create a sophisticated horizontal scroll effect where users scroll vertically but the cards animate horizontally. Each service is represented as a block card with animated text reveals, hover effects, and context-specific layouts.

---

## Files Overview

### 1. **Services.tsx** - React Component
The main component that orchestrates the services display with animation logic.

### 2. **Services.css** - Styling & Animations
All styling, layout, and keyframe animations for the services section.

---

## Data Structure

### Service Object
```typescript
type Service = {
  id: string          // "01", "02", etc.
  label: string       // Short service category
  title: string       // Full service title
  desc: string        // Full description text
}
```

### Block Object (Extended Service)
```typescript
type Block = Service & {
  x: number                              // Horizontal position in px (460-2840)
  y: string                              // Vertical position as percentage (e.g., "64%")
  w: number                              // Width of card in px
  h: number                              // Height of card in px
  textSide: 'left' | 'right' | 'bottom' | 'top'  // Where text appears
  lines: string[]                        // Array of text lines; *word* highlights in orange
  mode: 'wipe' | 'desc'                 // Animation mode (wipe=heading only, desc=heading+body)
  textSize?: 'sm' | 'md' | 'lg'         // Heading size variant
  textAlign?: 'left' | 'right' | 'center'  // Text alignment (default: 'left')
  bodyText?: string                      // Description text shown on hover/scroll
}
```

### The 8 Services
```
01. Solar Forecasting       → PV Production Forecasting
02. PV Diagnostics         → PV Operations Diagnostics
03. SPOT Optimization      → SPOT Market Optimization
04. Balance Forecasting    → Balance Point Forecasting
05. Energy Efficiency      → Energy Efficiency Audit
06. Flex Forecasting       → Flexibility Forecasting
07. Flex Valuation         → Flexibility Valuation
08. Group Sharing          → Sharing Group Optimization
```

---

## Services.tsx Component Breakdown

### Key Elements

#### 1. **Plugin Registration**
```typescript
gsap.registerPlugin(ScrollTrigger)
```
Registers GSAP's ScrollTrigger plugin for scroll-based animations.

#### 2. **Block Configuration**
- **STRIP_WIDTH = 3800px** — Total width of the horizontal scrolling container
- Each of 8 blocks has specific x/y positioning, dimensions, text placement, and animation settings

#### 3. **renderLine() Function**
```typescript
function renderLine(line: string) {
  const parts = line.split(/\*([^*]+)\*/)
  return parts.map((part, i) =>
    i % 2 === 1 ? <em key={i} className="svc-hl">{part}</em> : part
  )
}
```
- Converts markdown-style `*word*` syntax into orange `<em>` tags
- Used to highlight keywords in service titles

#### 4. **Mobile Detection**
```typescript
const [isMobile, setIsMobile] = useState<boolean>(
  () => typeof window !== 'undefined' && window.innerWidth <= 900,
)
```
- Detects if viewport is ≤ 900px
- On mobile, horizontal scroll is disabled (different layout handled)

#### 5. **GSAP Animation Context (useLayoutEffect)**

**Three synchronized animations:**

a) **Main Strip Scroll** — Horizontal scroll of card containers
   - Triggered by section scroll
   - Distance: `STRIP_WIDTH - window.innerWidth`
   - Scrub: 0.8 (smooth, delayed sync to scroll)
   - Pin: Sticky container stays fixed during scroll

b) **Heading Parallax** — Title scrolls at 30% speed of cards
   - Slower parallax effect for visual depth

c) **Block Entrance Animation** — Fade-in and slide-up on initial view
   - Only first 2 blocks get `is-visible` class initially
   - Others managed by individual ScrollTriggers per card
   - Stagger: 0.07s between each block

#### 6. **Per-Block ScrollTriggers**
Each card gets its own ScrollTrigger for:
- Line-by-line text reveal (wipe animation)
- Body text reveal
- Timing of animations (staggered entry)

#### 7. **Cleanup**
- ScrollTrigger context reverted on unmount
- Event listeners removed

### JSX Structure
```jsx
<section ref={sectionRef} className="services">
  <div ref={stickyRef} className="services__sticky">
    <h2 ref={headingRef} className="services__heading">
      Services
    </h2>
    <div ref={stripRef} className="services__strip">
      {BLOCKS.map(block => (
        <Block key={block.id} {...block} />
      ))}
    </div>
  </div>
</section>
```

---

## Services.css Breakdown

### 1. **Container Layout**
```css
.services {
  background: #ffffff;
  overflow: hidden;
}

.services__sticky {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.services__strip {
  position: absolute;
  will-change: transform;  /* GPU acceleration for smooth scroll */
}
```

### 2. **Heading Styling**
```css
.services__heading {
  font-size: clamp(3rem, 8vw, 6.5rem);
  font-weight: 900;
  color: #f5a30f;  /* Yellow/orange accent — NEEDS UPDATE TO #ff5522 */
  text-transform: uppercase;
  white-space: nowrap;
  will-change: transform;
}
```

### 3. **Block Cards**
```css
.svc-block {
  position: absolute;
}

.svc-block__rect {
  background: #111;  /* Dark card background */
}

.svc-block:hover .svc-block__rect {
  transform: scale(1.02);  /* Subtle zoom on hover */
}
```

### 4. **Info Positioning (4 Variants)**
```css
.svc-block--right .svc-block__info {
  left: calc(100% + 18px);      /* Right side of card */
  top: 50%;
  transform: translateY(-50%);
}

/* Similar for --left, --bottom, --top */
```

### 5. **Text Styling Variants**
- **sm**: `font-size: 0.95rem`, font-weight 700
- **md**: `font-size: 1.15rem`, font-weight 800
- **lg**: `font-size: 1.5rem`, font-weight 900, `white-space: normal`
- **wipe mode**: Override with larger sizes (1.25rem, font-weight 900)

### 6. **Orange Highlight**
```css
.svc-hl {
  color: #f5a30f;  /* NEEDS UPDATE TO #ff5522 */
}
```

### 7. **Line Reveal Animation**
```css
.svc-block__line::after {
  content: '';
  background: #f5a30f;  /* Orange wipe bar */
  transform: translateX(-102%);
}

@keyframes svc-highlight-wipe {
  0%   { transform: translateX(-102%); }
  100% { transform: translateX(102%);  }
}
```
- Creates a colored "wipe" effect across text
- Triggered in sequence: line 1 at 0s, line 2 at 0.35s, line 3 at 0.7s

### 8. **Body Text (Description)**
```css
.svc-block__body {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.svc-block:hover .svc-block__body {
  opacity: 1;  /* Show on hover */
}

.svc-block.is-visible .svc-block__body {
  opacity: 1;
  transition: opacity 0.4s ease 1.2s;  /* Delay after wipe */
}
```

---

## Animation Flow

### User Scrolls Down Vertically

1. **Section enters viewport**
   - ScrollTrigger activates for section
   - Pin the sticky container (section stays fixed)

2. **Cards enter from left** (horizontal scroll begins)
   - Strip moves: `x = -(STRIP_WIDTH - window.innerWidth)`
   - Heading parallaxes at 30% of strip speed
   - Takes place over a distance of ~3000-3500px vertical scroll

3. **Per-Block Text Animation** (as cards come into horizontal view)
   - Block gets `is-visible` class
   - Line 1 wipe: 0s
   - Line 2 wipe: 0.35s delay
   - Line 3 wipe: 0.7s delay
   - Body text fades in at 1.2s delay

4. **Hover Interaction**
   - Card scales +2%
   - Body text becomes visible (if not already)

### Mobile (≤ 900px)
- Animations disabled
- Section likely renders in vertical scroll layout (details in Block component)

---

## Current Styling Issues to Update

### Color Scheme Update Needed
The component currently uses `#f5a30f` (yellow/gold) for:
- Main heading color (`.services__heading`)
- Orange highlights in text (`.svc-hl`)
- Wipe animation background (`.svc-block__line::after`)

**Should be updated to `#ff5522` (orange-red)** to match the new brand color defined in `global.css`.

**Locations to change in Services.css:**
1. Line ~30: `.services__heading` color
2. Line ~146: `.svc-hl` color
3. Line ~175: `.svc-block__line::after` background

---

## Key Performance Considerations

1. **GPU Acceleration** — `will-change: transform` on strip and heading
2. **Scrub Smoothing** — `scrub: 0.8` delays animation sync for smooth scroll feel
3. **Stagger Effects** — `stagger: 0.07` spreads block animations to avoid overwhelming repaints
4. **Mobile Check** — Entire animation context skipped on mobile for better performance

---

## Summary

The Services component is a sophisticated showcase that combines:
- **Horizontal scroll** triggered by vertical scroll
- **Parallax effects** for visual depth
- **Staggered animations** for text reveals with orange wipe effects
- **Responsive design** with mobile fallback
- **White background** with dark cards and orange accents (needs color update to #ff5522)

The component prioritizes visual polish, performance, and interactivity while maintaining accessibility and responsive behavior across screen sizes.
