import './Capabilities.css'
import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'

/* ─── SVG colour tokens ─────────────────────────────────────────── */
const DARK  = '#2a2a2a'
const FAINT = 'rgba(42,42,42,0.16)'
const GHOST = 'rgba(42,42,42,0.08)'
const AMBER = '#f5a30f'

/* ══════════════════════════════════════════════════════════════════
   INLINE SVG ILLUSTRATIONS
══════════════════════════════════════════════════════════════════ */

/* Panel 0 — Solar PV string-level forecast */
function SolarSVG() {
  const CX = 50
  const CW = 460
  const CY = 18
  const CH = 115
  const NOW_X = CX + CW * 0.52

  return (
    <svg viewBox="0 0 560 218" role="img" aria-label="Solar PV string-level forecast diagram">

      {/* ── CHART AXES ── */}
      <line x1={CX} y1={CY} x2={CX} y2={CY + CH} stroke={FAINT} strokeWidth="1" />
      <line x1={CX} y1={CY + CH} x2={CX + CW} y2={CY + CH} stroke={FAINT} strokeWidth="1" />

      {/* y-axis label */}
      <text
        x="14" y={CY + CH / 2}
        fontSize="8" fill="#9ca3af" letterSpacing="0.12em"
        fontFamily="'Courier New', monospace" textAnchor="middle"
        transform={`rotate(-90 14 ${CY + CH / 2})`}
      >OUTPUT kWh</text>

      {/* Gridlines */}
      {[CY + 30, CY + 60, CY + 90].map(y => (
        <line key={y} x1={CX} y1={y} x2={CX + CW} y2={y}
          stroke={GHOST} strokeWidth="0.8" strokeDasharray="3 6" />
      ))}

      {/* NOW divider */}
      <line x1={NOW_X} y1={CY} x2={NOW_X} y2={CY + CH + 6}
        stroke="rgba(42,42,42,0.22)" strokeWidth="1" strokeDasharray="4 4" />
      <text x={NOW_X + 5} y={CY + CH + 4} fontSize="8" fill="#9ca3af"
        letterSpacing="0.14em" fontFamily="'Courier New', monospace">NOW</text>

      {/* Actual output (solid dark line) */}
      <path
        d={`M${CX},${CY+CH} L${CX+60},${CY+98} L${CX+110},${CY+72} L${CX+170},${CY+48} L${CX+220},${CY+36} L${NOW_X},${CY+40}`}
        stroke={DARK} strokeWidth="2" fill="none"
        strokeLinecap="round" strokeLinejoin="round"
      />

      {/* Forecast confidence band */}
      <path
        d={`M${NOW_X},${CY+40} L${NOW_X+60},${CY+28} L${NOW_X+120},${CY+20} L${NOW_X+180},${CY+22} L${NOW_X+220},${CY+16}
            L${NOW_X+220},${CY+34} L${NOW_X+180},${CY+38} L${NOW_X+120},${CY+36} L${NOW_X+60},${CY+46} L${NOW_X},${CY+40}`}
        fill={`${AMBER}12`} stroke="none"
      />

      {/* Forecast dashed amber line */}
      <path
        d={`M${NOW_X},${CY+40} L${NOW_X+60},${CY+28} L${NOW_X+120},${CY+20} L${NOW_X+180},${CY+22} L${NOW_X+220},${CY+16}`}
        stroke={AMBER} strokeWidth="2" fill="none"
        strokeDasharray="7 4" strokeLinecap="round" strokeLinejoin="round"
      />

      {/* ── SOLAR PANELS ROW ── */}
      {([76, 156, 236, 316, 396, 476] as number[]).map((cx, idx) => {
        const pw = 58; const ph = 25; const tilt = 9
        const x0 = cx - pw / 2; const y0 = 152
        const isFault = idx === 2
        return (
          <g key={cx}>
            <line x1={cx} y1={y0 + ph + tilt} x2={cx} y2={y0 + ph + tilt + 13}
              stroke={FAINT} strokeWidth="1.5" />
            <polygon
              points={`${x0},${y0+tilt} ${x0+pw},${y0} ${x0+pw},${y0+ph} ${x0},${y0+ph+tilt}`}
              fill="rgba(42,42,42,0.04)"
              stroke={isFault ? AMBER : DARK}
              strokeWidth={isFault ? 1.5 : 0.9}
            />
            <line x1={x0+pw*0.34} y1={y0+tilt*0.67} x2={x0+pw*0.34} y2={y0+ph+tilt*0.34}
              stroke={GHOST} strokeWidth="0.6" />
            <line x1={x0+pw*0.67} y1={y0+tilt*0.33} x2={x0+pw*0.67} y2={y0+ph+tilt*0.67}
              stroke={GHOST} strokeWidth="0.6" />
            <line x1={x0} y1={y0+ph/2+tilt*0.5} x2={x0+pw} y2={y0+ph/2}
              stroke={GHOST} strokeWidth="0.6" />
          </g>
        )
      })}

      {/* String fault marker on panel idx=2 */}
      <circle cx="236" cy="166" r="9" fill="none" stroke={AMBER} strokeWidth="1.5" />
      <circle cx="236" cy="166" r="2.5" fill={AMBER} />
      <line x1="244" y1="160" x2="260" y2="150" stroke={AMBER} strokeWidth="0.9" />
      <text x="263" y="150" fontSize="8" fill={AMBER} letterSpacing="0.1em"
        fontFamily="'Courier New', monospace">STRING FAULT</text>

      {/* Ground line */}
      <line x1="36" y1="213" x2="524" y2="213" stroke={GHOST} strokeWidth="1" />
    </svg>
  )
}

/* Panel 2 — SPOT price chart + device schedule */
function ScheduleSVG() {
  const prices = [28,26,24,22,21,24,34,58,74,68,55,48,44,42,46,54,66,82,76,58,44,36,31,27]
  const maxP   = 82
  const PEAK   = new Set([7, 8, 17, 18])
  const BAR_W  = 17
  const GAP    = 2
  const CX     = 42
  const CY     = 18
  const CH     = 100
  const step   = BAR_W + GAP

  return (
    <svg viewBox="0 0 560 218" role="img" aria-label="Energy optimization schedule diagram">

      {/* ── SPOT PRICE BAR CHART ── */}
      <line x1={CX} y1={CY} x2={CX} y2={CY + CH} stroke={FAINT} strokeWidth="1" />
      <line x1={CX} y1={CY + CH} x2={CX + 24 * step} y2={CY + CH} stroke={FAINT} strokeWidth="1" />

      <text x="14" y={CY + CH / 2} fontSize="8" fill="#9ca3af" letterSpacing="0.1em"
        fontFamily="'Courier New', monospace" textAnchor="middle"
        transform={`rotate(-90 14 ${CY + CH / 2})`}>€/MWh</text>

      <text x={CX + 4} y={CY - 5} fontSize="8" fill="#9ca3af" letterSpacing="0.14em"
        fontFamily="'Courier New', monospace">SPOT PRICE / 24H</text>

      {prices.map((p, i) => {
        const bh = (p / maxP) * CH
        const bx = CX + i * step
        const by = CY + CH - bh
        const isPeak = PEAK.has(i)
        return (
          <rect key={i} x={bx} y={by} width={BAR_W} height={bh}
            fill={isPeak ? `${AMBER}30` : 'rgba(42,42,42,0.09)'}
            stroke={isPeak ? `${AMBER}aa` : FAINT}
            strokeWidth="0.7"
          />
        )
      })}

      <text
        x={CX + 17 * step + BAR_W / 2}
        y={CY - 5}
        fontSize="8" fill={AMBER} letterSpacing="0.12em"
        fontFamily="'Courier New', monospace" textAnchor="middle"
      >PEAK</text>

      {/* ── DEVICE SCHEDULE TIMELINE ── */}
      <text x={CX} y="140" fontSize="8" fill="#9ca3af" letterSpacing="0.14em"
        fontFamily="'Courier New', monospace">DEVICE SCHEDULE</text>

      <line x1={CX} y1="155" x2={CX + 24 * step} y2="155" stroke={FAINT} strokeWidth="1" />

      {['00:00', '06:00', '12:00', '18:00', '24:00'].map((t, i) => (
        <text key={t} x={CX + i * 6 * step} y="166"
          fontSize="8" fill="#9ca3af" letterSpacing="0.04em"
          fontFamily="'Courier New', monospace" textAnchor="middle">{t}</text>
      ))}

      <rect x={CX} y="171" width={7 * step - GAP} height="22"
        fill="rgba(42,42,42,0.1)" stroke={DARK} strokeWidth="0.8" rx="1" />
      <rect x={CX + 9 * step} y="171" width={8 * step - GAP} height="22"
        fill="rgba(42,42,42,0.1)" stroke={DARK} strokeWidth="0.8" rx="1" />
      <rect x={CX + 19 * step} y="171" width={5 * step - GAP} height="22"
        fill="rgba(42,42,42,0.1)" stroke={DARK} strokeWidth="0.8" rx="1" />

      {([7, 17] as number[]).map(h => (
        <line key={h} x1={CX + h * step} y1={CY} x2={CX + h * step} y2="205"
          stroke={AMBER} strokeWidth="1" strokeDasharray="4 3" opacity="0.55" />
      ))}
      <text x={CX + 12 * step} y="212" fontSize="8" fill={AMBER} letterSpacing="0.12em"
        fontFamily="'Courier New', monospace" textAnchor="middle">AVOID PEAK</text>
    </svg>
  )
}

/* Panel 3 — Flexibility topology */
function FlexSVG() {
  const LOADS = [
    { label: 'HVAC',       kw: '12 kW', y: 60 },
    { label: 'EV CHARGER', kw: '22 kW', y: 105 },
    { label: 'PROD. LINE', kw: '45 kW', y: 150 },
  ]

  return (
    <svg viewBox="0 0 560 218" role="img" aria-label="Flexibility aggregation topology">

      <text x="70"  y="18" fontSize="8" fill="#9ca3af" letterSpacing="0.16em"
        fontFamily="'Courier New', monospace" textAnchor="middle">SITE LOADS</text>
      <text x="292" y="18" fontSize="8" fill="#9ca3af" letterSpacing="0.16em"
        fontFamily="'Courier New', monospace" textAnchor="middle">AGGREGATOR</text>
      <text x="486" y="18" fontSize="8" fill="#9ca3af" letterSpacing="0.16em"
        fontFamily="'Courier New', monospace" textAnchor="middle">GRID / MARKET</text>

      {LOADS.map(({ label, kw, y }) => (
        <g key={label}>
          <rect x="20" y={y} width="96" height="36" rx="2"
            fill={GHOST} stroke={DARK} strokeWidth="0.9" />
          <text x="68" y={y + 14} fontSize="8" fill={DARK} letterSpacing="0.08em"
            fontFamily="'Courier New', monospace" textAnchor="middle">{label}</text>
          <text x="68" y={y + 27} fontSize="9.5" fill={AMBER} fontWeight="700"
            fontFamily="'Courier New', monospace" textAnchor="middle">{kw}</text>
        </g>
      ))}

      {LOADS.map(({ y }) => (
        <line key={y} x1="116" y1={y + 18} x2="218" y2="113"
          stroke={FAINT} strokeWidth="1" />
      ))}

      <circle cx="250" cy="113" r="38"
        fill="rgba(42,42,42,0.03)" stroke={DARK} strokeWidth="1.2" />
      <text x="250" y="109" fontSize="8" fill="#9ca3af" letterSpacing="0.1em"
        fontFamily="'Courier New', monospace" textAnchor="middle">FLEX VOL.</text>
      <text x="250" y="124" fontSize="13" fill={AMBER} fontWeight="800"
        fontFamily="'Courier New', monospace" textAnchor="middle">79 kW</text>

      <line x1="288" y1="113" x2="310" y2="113" stroke={AMBER} strokeWidth="1.5" />
      <path d="M306 110 L312 113 L306 116" fill={AMBER} />

      <rect x="312" y="90" width="108" height="46" rx="2"
        fill={`${AMBER}08`} stroke={AMBER} strokeWidth="1.2" />
      <text x="366" y="109" fontSize="8" fill={DARK} letterSpacing="0.1em"
        fontFamily="'Courier New', monospace" textAnchor="middle">AGGREGATOR</text>
      <text x="366" y="124" fontSize="8" fill="#9ca3af" letterSpacing="0.06em"
        fontFamily="'Courier New', monospace" textAnchor="middle">DISPATCH SIGNAL</text>

      <line x1="420" y1="113" x2="444" y2="113" stroke={DARK} strokeWidth="1.5" />
      <path d="M440 110 L446 113 L440 116" fill={DARK} />

      <rect x="446" y="90" width="90" height="46" rx="2"
        fill={GHOST} stroke={DARK} strokeWidth="0.9" />
      <text x="491" y="109" fontSize="8" fill={DARK} letterSpacing="0.06em"
        fontFamily="'Courier New', monospace" textAnchor="middle">BALANCING</text>
      <text x="491" y="122" fontSize="8" fill={DARK} letterSpacing="0.06em"
        fontFamily="'Courier New', monospace" textAnchor="middle">MARKET</text>

      <path d="M444 126 L420 136" stroke={AMBER} strokeWidth="1" strokeDasharray="3 3" />
      <path d="M424 133 L420 137 L416 132" fill="none" stroke={AMBER} strokeWidth="1" />

      <text x="292" y="185" fontSize="8" fill={AMBER} letterSpacing="0.12em"
        fontFamily="'Courier New', monospace" textAnchor="middle">↑ NEW REVENUE STREAM</text>
    </svg>
  )
}

/* ══════════════════════════════════════════════════════════════════
   CARD DATA
══════════════════════════════════════════════════════════════════ */

interface CardData {
  label: string
  headline: string
  body: string
  Illustration: () => JSX.Element
}

const CARDS: CardData[] = [
  {
    label: 'SOLAR PREDICTION',
    headline: 'String-level PV forecasting.',
    body: 'We supplement meteorological models with precision local sensor data for more accurate solar production forecasts. By comparing models against actual output in real time, we isolate faults down to the string level.',
    Illustration: SolarSVG,
  },
  {
    label: 'ENERGY OPTIMIZATION',
    headline: 'Automated operational scheduling.',
    body: 'We generate device-level operating schedules driven by PV forecasts, consumption profiles, SPOT prices, and aggregator dispatch signals — including multi-site energy community configurations.',
    Illustration: ScheduleSVG,
  },
  {
    label: 'FLEXIBILITY',
    headline: 'Turn spare capacity into revenue.',
    body: 'We calculate the volume of available regulatory energy at each consumption point, value it, and connect you directly with aggregators and traders — creating a new income stream from assets you already own.',
    Illustration: FlexSVG,
  },
]

/* ══════════════════════════════════════════════════════════════════
   MOBILE DETECTION HOOK
══════════════════════════════════════════════════════════════════ */

function useIsMobile(): boolean {
  const [mobile, setMobile] = useState<boolean>(
    () => typeof window !== 'undefined' && window.innerWidth <= 768
  )
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const handle = (e: MediaQueryListEvent) => setMobile(e.matches)
    mq.addEventListener('change', handle)
    return () => mq.removeEventListener('change', handle)
  }, [])
  return mobile
}

/* ══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════════ */

export default function Capabilities() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activePanel, setActivePanel] = useState(0)
  const isMobile = useIsMobile()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  /*
   * Strip layout: Panels 0–2 (80vw × 3) = 240vw total.
   * End x = -(240 − 100) = -140vw → Panel 2 fully visible at scroll end.
   */
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', '-140vw'])

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if      (latest < 0.33) setActivePanel(0)
    else if (latest < 0.66) setActivePanel(1)
    else                    setActivePanel(2)
  })

  return (
    <section
      id="capabilities"
      className="caps"
      ref={containerRef}
      style={isMobile ? undefined : { height: '400vh' }}
    >
      <div className="caps__sticky">

        <motion.div
          className="caps__strip"
          style={isMobile ? undefined : { x }}
        >

          {/* ── Panels 0–2: Solution cards ── */}
          {CARDS.map((card) => (
            <div key={card.label} className="caps__panel caps__panel--card">
              <article className="cap-card">
                <div className="cap-card__art">
                  <card.Illustration />
                </div>
                <div className="cap-card__content">
                  <p className="cap-card__label">{card.label}</p>
                  <h3 className="cap-card__title">{card.headline}</h3>
                  <p className="cap-card__body">{card.body}</p>
                  <a href="#contact" className="cap-card__link">Learn more →</a>
                </div>
              </article>
            </div>
          ))}

        </motion.div>

        {/* Panel counter */}
        <div className="caps__counter" aria-live="polite" aria-atomic="true">
          <span key={activePanel} className="caps__counter-num">
            {String(activePanel + 1).padStart(2, '0')}
          </span>
          <span className="caps__counter-sep">&thinsp;/&thinsp;03</span>
        </div>

      </div>
    </section>
  )
}
