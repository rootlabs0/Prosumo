# Team Profile Cards - About Us Section

This document contains the team profile card data that was extracted from the About Us section. Use this to recreate the team cards with updated member information.

## Team Members Data

```typescript
const team = [
  {
    name: 'Jane Doe',
    role: 'Founder & CEO',
  },
  {
    name: 'John Smith',
    role: 'Chief Technology Officer',
  },
  {
    name: 'Alex Lee',
    role: 'Head of Engineering',
  },
]
```

## Pixel Pattern Distortion (Interactive Hover Effect)

The original team cards featured an interactive pixel art effect that distorted on hover. The patterns were generated using 3-row pixel maps:

```typescript
const PIXEL_PATTERNS: number[][][] = [
  [
    [0,1,1,0,0,0,1,0,0,1,0,0],
    [1,1,0,0,1,1,1,0,0,0,1,0],
    [0,1,0,0,0,1,0,1,0,0,0,1],
  ],
  [
    [1,0,0,0,1,1,0,0,1,1,1,0],
    [0,1,1,0,1,0,0,1,0,1,0,0],
    [1,0,0,1,0,0,1,0,1,0,0,1],
  ],
  [
    [0,1,0,1,1,0,0,0,1,1,0,1],
    [1,1,1,0,0,1,1,0,0,1,1,0],
    [0,0,1,0,1,0,0,1,1,0,1,0],
  ],
]
```

**Constants:**
- `CELL_H = 20` (pixel cell height in px)
- `HOVER_RADIUS_CELLS = 2.2` (hover detection radius)
- Distort offsets for pixel displacement (stable, deterministic)

## Statistics Section

The About Us section also included animated statistics:

```typescript
const stats = [
  { target: 4, suffix: '+', label: 'Years Active' },
  { target: 40, suffix: '+', label: 'Clients Served' },
  {
    target: 2400,
    suffix: '+',
    label: 'Installations',
    format: (n) => n.toLocaleString('en-US'),
  },
  { target: 38, suffix: '%', label: 'Avg. Energy Saved' },
]
```

**Features:**
- Animated counter (1500ms duration) with easing
- Custom number formatting for installations (thousand separators)
- Triggered on scroll into view

## Section Structure

The original About Us section contained:

1. **Hero Block** - "OUR STORY" heading with "MISSION" accent
   - Animated headline with colored accent word
   
2. **Scroll Reveal Text** - Full-width body copy
   - Blur and reveal animation
   - Base opacity: 0.05, blur strength: 8px
   
3. **Team Cards** - Interactive pixel art profile cards
   - 3 team members with pixel art hover effect
   - Smooth animation on scroll into view
   
4. **Statistics** - Animated counter boxes
   - Real-time counter animation
   - Appears below team cards

## Original Mission Statement

> We develop advanced algorithms for energy flow management and operations diagnostics, integrated directly into EMS systems from third-party manufacturers. These systems connect to the PROSUMO cloud platform, delivering advanced forecasting, optimization, flexibility, and operational control — built on deep expertise in energy, artificial intelligence, and cybersecurity.

## Recreation Notes

- Team cards use SVG circles for avatar placeholders (head and shoulders)
- Pixel distortion uses absolute positioning with percentage/pixel math
- All animations use Framer Motion for consistency
- Section uses scroll-based opacity fade-in on entry
- Responsive design adapts stats and card layout for mobile
