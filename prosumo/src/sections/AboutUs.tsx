import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import './AboutUs.css'

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

// 3-row pixel patterns. 1 = orange pixel present, 0 = absent (gap).
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

// Stable per-pixel distortion offsets (deterministic, not random)
const DISTORT_DX = [ 1,-1, 2,-1, 1,-2, 1,-1, 2,-1, 1,-2, 1,-1, 2,-1, 1,-2, 1,-1, 2,-1]
const DISTORT_DY = [ 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]

const CELL_H = 20
const HOVER_RADIUS_CELLS = 2.2

function TeamCard({ member, idx }: { member: (typeof team)[0]; idx: number }) {
  const pattern = PIXEL_PATTERNS[idx % PIXEL_PATTERNS.length]
  const cols = pattern[0].length
  const cellPct = 100 / cols
  const photoRef = useRef<HTMLDivElement>(null)
  const pixelRefs = useRef<(HTMLSpanElement | null)[]>([])
  const distortedSet = useRef<Set<number>>(new Set())

  // Build flat list of active pixels with stable distort offsets
  const pixels = [] as { r: number; c: number; dx: number; dy: number }[]
  pattern.forEach((row, r) =>
    row.forEach((on, c) => {
      if (on) {
        const i = pixels.length
        pixels.push({ r, c, dx: DISTORT_DX[i % DISTORT_DX.length], dy: DISTORT_DY[i % DISTORT_DY.length] })
      }
    })
  )

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const photo = photoRef.current
    if (!photo) return
    const rect = photo.getBoundingClientRect()
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top
    const cellW = rect.width / cols
    const threshold = cellW * HOVER_RADIUS_CELLS

    pixels.forEach((px, i) => {
      const el = pixelRefs.current[i]
      if (!el) return
      const cx = (px.c + 0.5) * cellW
      const cy = (px.r + 0.5) * CELL_H
      const near = Math.hypot(mx - cx, my - cy) < threshold
      const was = distortedSet.current.has(i)
      if (near && !was) {
        const nc = Math.max(0, Math.min(cols - 1, px.c + px.dx))
        const nr = Math.max(0, px.r + px.dy)
        el.style.left = `${nc * cellPct}%`
        el.style.top  = `${nr * CELL_H}px`
        distortedSet.current.add(i)
      } else if (!near && was) {
        el.style.left = `${px.c * cellPct}%`
        el.style.top  = `${px.r * CELL_H}px`
        distortedSet.current.delete(i)
      }
    })
  }

  const handleMouseLeave = () => {
    pixels.forEach((px, i) => {
      const el = pixelRefs.current[i]
      if (!el) return
      el.style.left = `${px.c * cellPct}%`
      el.style.top  = `${px.r * CELL_H}px`
    })
    distortedSet.current.clear()
  }

  return (
    <article className="tc-card">
      <div className="tc-card__bg" aria-hidden="true" />
      <div
        className="tc-card__photo"
        ref={photoRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="tc-card__pixels" aria-hidden="true">
          {pixels.map(({ r, c }, i) => (
            <span
              key={`${r}-${c}`}
              className="tc-card__pixel"
              ref={el => { pixelRefs.current[i] = el }}
              style={{
                left: `${c * cellPct}%`,
                width: `${cellPct}%`,
                top: `${r * CELL_H}px`,
                height: `${CELL_H}px`,
              }}
            />
          ))}
        </div>
        <svg viewBox="0 0 100 130" className="tc-card__avatar" aria-hidden="true">
          <circle cx="50" cy="48" r="22" fill="#d0d0d0" />
          <path d="M14 130 C14 92 34 78 50 78 S86 92 86 130 Z" fill="#d0d0d0" />
        </svg>
      </div>
      <div className="tc-card__info">
        <p className="tc-card__name">{member.name}</p>
        <p className="tc-card__role">{member.role}</p>
      </div>
    </article>
  )
}

const stats: {
  target: number
  suffix: string
  label: string
  format?: (n: number) => string
}[] = [
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

function StatBox({
  target,
  suffix,
  label,
  format,
  started,
}: {
  target: number
  suffix: string
  label: string
  format?: (n: number) => string
  started: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!started) return
    const duration = 1500
    let startTime: number | null = null
    let rafId = 0
    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) rafId = requestAnimationFrame(step)
    }
    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [started, target])

  const display = format ? format(count) : String(count)

  return (
    <div className="zz-stat">
      <p className="zz-stat__number">{display}{suffix}</p>
      <p className="zz-stat__label">{label}</p>
    </div>
  )
}

function CircuitSVG() {
  return (
    <svg
      className="zz-circuit"
      viewBox="0 0 400 200"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="PROSUMO Platform diagram"
    >
      {Array.from({ length: 16 }, (_, i) => (
        <line key={`v${i}`} x1={i * 28} y1={0} x2={i * 28} y2={200}
          stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <line key={`h${i}`} x1={0} y1={i * 28} x2={400} y2={i * 28}
          stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}
      <path d="M84 56 L168 56 L168 140 L252 140 L252 56 L336 56"
        stroke="#F5A30F" strokeOpacity="0.25" strokeWidth="1" fill="none" />
      <path d="M168 56 L168 28" stroke="#F5A30F" strokeOpacity="0.25" strokeWidth="1" fill="none" />
      <path d="M252 140 L252 172" stroke="#F5A30F" strokeOpacity="0.25" strokeWidth="1" fill="none" />
      <path d="M0 100 Q50 78 100 100 Q150 122 200 100 Q250 78 300 100 Q350 122 400 100"
        stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" fill="none" />
      <circle cx={84} cy={56} r={4} fill="#F5A30F" fillOpacity="0.7" />
      <circle cx={168} cy={56} r={4} fill="#F5A30F" fillOpacity="0.7" />
      <circle cx={252} cy={56} r={4} fill="#F5A30F" fillOpacity="0.7" />
      <circle cx={336} cy={56} r={3} fill="#F5A30F" fillOpacity="0.5" />
      <circle cx={252} cy={140} r={3} fill="#F5A30F" fillOpacity="0.5" />
      <text x={14} y={188} fontSize={8} fontFamily="Outfit, sans-serif" fontWeight={600}
        fill="rgba(255,255,255,0.2)" letterSpacing="0.14em"
        style={{ textTransform: 'uppercase' }}>
        PROSUMO PLATFORM
      </text>
    </svg>
  )
}

function useFadeIn(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, visible }
}

export default function AboutUs() {
  const block1 = useFadeIn()
  const block3 = useFadeIn()
  const block4 = useFadeIn()

  return (
    <section id="about-us" className="about-us">

      {/* Container 1 — Identity */}
      <div className="container">
        <div className="zz-stack">
          <div ref={block1.ref}>
            <motion.div
              className="zz-block zz-block--center"
              initial={{ opacity: 0, y: 30 }}
              animate={block1.visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <p className="zz-label">OUR STORY</p>
              <h2 className="zz-headline">
                Our <motion.span
                  className="zz-headline__accent"
                  initial={{ color: '#1a1a1a' }}
                  animate={block1.visible ? { color: '#f5a30f' } : { color: '#1a1a1a' }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                >MISSION</motion.span> is<br />
                Intelligent Energy Control.
              </h2>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Full-width scroll reveal body text */}
      <div className="about-us__reveal">
        <ScrollReveal
          baseOpacity={0.05}
          enableBlur={true}
          baseRotation={2}
          blurStrength={8}
          containerClassName="about-us__reveal-heading"
          wordAnimationEnd="bottom center"
        >
          We develop advanced algorithms for energy flow management and operations diagnostics, integrated directly into EMS systems from third-party manufacturers. These systems connect to the PROSUMO cloud platform, delivering advanced forecasting, optimization, flexibility, and operational control — built on deep expertise in energy, artificial intelligence, and cybersecurity.
        </ScrollReveal>
      </div>

      {/* Container 4 — Team cards */}
      <div className="container">
        <div className="zz-stack">
          <div ref={block4.ref}>
            <motion.div
              className="zz-block zz-block--center zz-block--no-bg"
              initial={{ opacity: 0, y: 30 }}
              animate={block4.visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            >
              <div className="zz-team">
                {team.map((member, idx) => (
                  <TeamCard key={member.name} member={member} idx={idx} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Container 3 — Stats (below cards) */}
      <div className="container">
        <div className="zz-stack">
          <div ref={block3.ref}>
            <motion.div
              className="zz-block zz-block--center zz-block--stats"
              initial={{ opacity: 0, y: 30 }}
              animate={block3.visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            >
              <div className="zz-stats">
                {stats.map(s => (
                  <StatBox
                    key={s.label}
                    target={s.target}
                    suffix={s.suffix}
                    label={s.label}
                    format={s.format}
                    started={block3.visible}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  )
}
