import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.08 },
  }),
}

const STATS = [
  { label: 'Grid Frequency', value: '49.98 Hz' },
  { label: 'Uptime', value: '99.97%' },
  { label: 'Latency', value: '12 ms' },
]

export default function DashboardMockup() {
  return (
    <motion.div
      className="mockup"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
    >
      <div className="mockup__glow" aria-hidden />
      <div className="mockup__card">
        <header className="mockup__header">
          <div className="mockup__dots">
            <span /><span /><span />
          </div>
          <div className="mockup__title mono">PROSUMO / LIVE</div>
        </header>

        <div className="mockup__chart">
          <div className="mockup__chart-meta">
            <span className="mockup__chart-label mono">CONSUMPTION · 24H</span>
            <span className="mockup__chart-value">
              1,284 <span className="mockup__chart-unit mono">kWh</span>
            </span>
          </div>
          <svg viewBox="0 0 480 160" preserveAspectRatio="none" className="mockup__svg" aria-hidden>
            <defs>
              <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E8521A" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#E8521A" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[40, 70, 100, 130].map((y) => (
              <line key={y} x1="0" x2="480" y1={y} y2={y} stroke="rgba(255,255,255,0.06)" />
            ))}
            <path
              d="M0,110 L40,98 L80,104 L120,84 L160,90 L200,68 L240,76 L280,52 L320,60 L360,40 L400,48 L440,30 L480,38"
              fill="none"
              stroke="#E8521A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M0,110 L40,98 L80,104 L120,84 L160,90 L200,68 L240,76 L280,52 L320,60 L360,40 L400,48 L440,30 L480,38 L480,160 L0,160 Z"
              fill="url(#lineFill)"
            />
            <circle cx="440" cy="30" r="4" fill="#E8521A" />
            <circle cx="440" cy="30" r="8" fill="#E8521A" fillOpacity="0.25" />
          </svg>
        </div>

        <div className="mockup__stats">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="mockup__stat"
              custom={i + 1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <div className="mockup__stat-value mono-num">{s.value}</div>
              <div className="mockup__stat-label mono">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
