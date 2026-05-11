import './Platform.css'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STROKE = 'rgba(255,255,255,0.85)'
const FAINT = 'rgba(255,255,255,0.22)'

function FactorySVG() {
  return (
    <svg viewBox="0 0 360 240" role="img" aria-label="Factory cross-section">
      {/* ground */}
      <line x1="20" y1="200" x2="340" y2="200" stroke={STROKE} strokeWidth="1" />
      {/* main building */}
      <path d="M40 200 L40 130 L120 130 L120 100 L200 100 L200 130 L320 130 L320 200 Z" fill="none" stroke={STROKE} strokeWidth="1" />
      {/* sawtooth roof */}
      <path d="M40 130 L60 110 L80 130 L100 110 L120 130" fill="none" stroke={STROKE} strokeWidth="1" />
      <path d="M200 130 L220 110 L240 130 L260 110 L280 130 L300 110 L320 130" fill="none" stroke={STROKE} strokeWidth="1" />
      {/* chimney */}
      <rect x="140" y="60" width="20" height="40" fill="none" stroke={STROKE} strokeWidth="1" />
      <line x1="142" y1="58" x2="158" y2="58" stroke={STROKE} strokeWidth="1" />
      {/* doors / windows */}
      <rect x="150" y="160" width="30" height="40" fill="none" stroke={FAINT} strokeWidth="1" />
      <rect x="60" y="150" width="14" height="14" fill="none" stroke={FAINT} strokeWidth="0.75" />
      <rect x="86" y="150" width="14" height="14" fill="none" stroke={FAINT} strokeWidth="0.75" />
      <rect x="220" y="150" width="14" height="14" fill="none" stroke={FAINT} strokeWidth="0.75" />
      <rect x="246" y="150" width="14" height="14" fill="none" stroke={FAINT} strokeWidth="0.75" />
      <rect x="272" y="150" width="14" height="14" fill="none" stroke={FAINT} strokeWidth="0.75" />
      <rect x="298" y="150" width="14" height="14" fill="none" stroke={FAINT} strokeWidth="0.75" />
      {/* production line */}
      <line x1="60" y1="190" x2="300" y2="190" stroke={FAINT} strokeWidth="1" strokeDasharray="2 4" />
      <circle cx="80" cy="190" r="3" fill="none" stroke={STROKE} strokeWidth="1" />
      <circle cx="160" cy="190" r="3" fill="none" stroke={STROKE} strokeWidth="1" />
      <circle cx="240" cy="190" r="3" fill="none" stroke={STROKE} strokeWidth="1" />
    </svg>
  )
}

function CRESVG() {
  return (
    <svg viewBox="0 0 360 240" role="img" aria-label="Office building cross-section">
      <line x1="20" y1="220" x2="340" y2="220" stroke={STROKE} strokeWidth="1" />
      {/* main tower */}
      <rect x="120" y="40" width="120" height="180" fill="none" stroke={STROKE} strokeWidth="1" />
      {/* floors */}
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={i} x1="120" y1={60 + i * 20} x2="240" y2={60 + i * 20} stroke={FAINT} strokeWidth="0.75" />
      ))}
      {/* windows */}
      {Array.from({ length: 8 }).map((_, row) =>
        [0, 1, 2, 3].map(col => (
          <rect
            key={`${row}-${col}`}
            x={132 + col * 26}
            y={66 + row * 20}
            width="18"
            height="10"
            fill="none"
            stroke={FAINT}
            strokeWidth="0.5"
          />
        )),
      )}
      {/* side annex */}
      <rect x="60" y="140" width="60" height="80" fill="none" stroke={STROKE} strokeWidth="1" />
      <rect x="240" y="120" width="60" height="100" fill="none" stroke={STROKE} strokeWidth="1" />
      {/* rooftop unit */}
      <rect x="150" y="28" width="60" height="12" fill="none" stroke={STROKE} strokeWidth="1" />
      <line x1="155" y1="28" x2="155" y2="20" stroke={STROKE} strokeWidth="1" />
      <line x1="205" y1="28" x2="205" y2="20" stroke={STROKE} strokeWidth="1" />
    </svg>
  )
}

function DataCenterSVG() {
  return (
    <svg viewBox="0 0 360 240" role="img" aria-label="Server rack isometric">
      {/* iso floor */}
      <path d="M60 200 L180 240 L300 200 L180 160 Z" fill="none" stroke={FAINT} strokeWidth="1" />
      {/* rack 1 */}
      <g>
        <path d="M110 180 L160 200 L160 110 L110 90 Z" fill="none" stroke={STROKE} strokeWidth="1" />
        <path d="M110 90 L160 110 L210 90 L160 70 Z" fill="none" stroke={STROKE} strokeWidth="1" />
        <path d="M210 90 L210 180 L160 200 L160 110 Z" fill="none" stroke={STROKE} strokeWidth="1" />
        {/* unit slots */}
        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={i}
            x1="160"
            y1={120 + i * 12}
            x2="210"
            y2={100 + i * 12}
            stroke={FAINT}
            strokeWidth="0.75"
          />
        ))}
      </g>
      {/* rack 2 */}
      <g transform="translate(0, 0)">
        <path d="M200 180 L250 200 L250 110 L200 90 Z" fill="none" stroke={FAINT} strokeWidth="0.75" strokeDasharray="2 3" />
      </g>
      {/* power line */}
      <path d="M100 80 L100 60 L260 60 L260 80" fill="none" stroke="#ff5522" strokeWidth="0.75" strokeDasharray="3 3" />
      <circle cx="180" cy="60" r="2.5" fill="#ff5522" />
    </svg>
  )
}

function GridSVG() {
  return (
    <svg viewBox="0 0 360 240" role="img" aria-label="Transmission tower">
      <line x1="20" y1="220" x2="340" y2="220" stroke={STROKE} strokeWidth="1" />
      {/* tower outline */}
      <path d="M180 30 L180 220" stroke={STROKE} strokeWidth="1" />
      <path d="M140 220 L180 50 L220 220" fill="none" stroke={STROKE} strokeWidth="1" />
      <path d="M152 220 L180 80 L208 220" fill="none" stroke={FAINT} strokeWidth="0.75" />
      {/* lattice cross-bracing */}
      {[60, 90, 120, 150, 180, 210].map((y, i) => {
        const halfWidth = ((y - 50) / 170) * 40
        const x1 = 180 - halfWidth
        const x2 = 180 + halfWidth
        return (
          <g key={i}>
            <line x1={x1} y1={y} x2={x2} y2={y} stroke={FAINT} strokeWidth="0.75" />
            {i > 0 && (
              <>
                <line
                  x1={x1}
                  y1={y}
                  x2={180 + ((y - 30 - 30) / 170) * 40}
                  y2={y - 30}
                  stroke={FAINT}
                  strokeWidth="0.5"
                />
              </>
            )}
          </g>
        )
      })}
      {/* arms */}
      <line x1="120" y1="80" x2="240" y2="80" stroke={STROKE} strokeWidth="1" />
      <line x1="110" y1="110" x2="250" y2="110" stroke={STROKE} strokeWidth="1" />
      {/* insulators / wires */}
      {[120, 180, 240].map(x => (
        <g key={x}>
          <line x1={x} y1="80" x2={x} y2="86" stroke={STROKE} strokeWidth="1" />
          <circle cx={x} cy="88" r="1.5" fill={STROKE} />
        </g>
      ))}
      <path d="M40 95 Q120 130 120 88" fill="none" stroke={FAINT} strokeWidth="0.75" />
      <path d="M180 88 Q260 130 320 95" fill="none" stroke={FAINT} strokeWidth="0.75" />
    </svg>
  )
}

/* ─── Card data ─── */

interface SectorItem {
  id: string
  label: string
  title: string
  description: string
  Svg: () => JSX.Element
}

const SECTORS: SectorItem[] = [
  {
    id: 'manufacturing',
    label: 'MANUFACTURING',
    title: 'Powering the production floor.',
    description:
      'Prosumo optimizes energy consumption across production lines, compressors, and HVAC — reducing electricity costs without touching throughput.',
    Svg: FactorySVG,
  },
  {
    id: 'cre',
    label: 'COMMERCIAL REAL ESTATE',
    title: 'Smarter buildings, lower OPEX.',
    description:
      'From office towers to retail complexes, Prosumo schedules building loads around SPOT prices and delivers measurable savings on every energy bill.',
    Svg: CRESVG,
  },
  {
    id: 'datacenters',
    label: 'DATA CENTERS',
    title: 'Ensuring uptime at scale.',
    description:
      'Prosumo unlocks the predictive control required to run hyperscale and colocation facilities at peak efficiency — with full visibility on PUE, load, and tariff exposure.',
    Svg: DataCenterSVG,
  },
  {
    id: 'grid',
    label: 'UTILITIES & GRID',
    title: 'Flexibility for a volatile grid.',
    description:
      'We calculate available flexibility at each consumption point, value it, and connect operators directly with aggregators — turning grid volatility into a revenue opportunity.',
    Svg: GridSVG,
  },
]

export default function Industries() {
  const [active, setActive] = useState<string | null>('datacenters')

  return (
    <section id="industries" className="section industries">
      <div className="container">
        <p className="eyebrow industries__kicker reveal">Built For</p>
        <h2 className="h-display industries__title reveal">
          4 Sectors.
          <br />
          One Platform.
        </h2>

        <div className="industries__grid" onMouseLeave={() => setActive(null)}>
          {SECTORS.map(({ id, label, title, description, Svg }) => {
            const isActive = id === active
            return (
              <motion.article
                key={id}
                layout
                className={`ind-card${isActive ? ' is-active' : ''}`}
                onMouseEnter={() => setActive(id)}
                animate={{
                  flex: isActive ? 3 : 1,
                  borderColor: isActive
                    ? 'rgba(255,255,255,0.28)'
                    : 'rgba(255,255,255,0.08)',
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                style={{ overflow: 'hidden', minWidth: 0 }}
              >
                <p className="eyebrow ind-card__label">{label}</p>

                {/* SVG illustration — always visible */}
                <div className="ind-card__art">
                  <Svg />
                </div>

                {/* Headline — always visible */}
                <h3 className="h-card ind-card__title">{title}</h3>

                {/* Description — fades in only when active */}
                <AnimatePresence>
                  {isActive && (
                    <motion.p
                      className="body-muted ind-card__body"
                      key="desc"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.18 }}
                    >
                      {description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
