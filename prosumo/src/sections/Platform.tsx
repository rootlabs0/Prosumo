import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import EnergyFlowDiagram from '../components/EnergyFlowDiagram'
import '../components/EnergyFlowDiagram.css'
import './Platform.css'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
}

type TabKey = 'prediction' | 'optimization' | 'flexibility' | 'control'

const TABS: { key: TabKey; label: string; title: string; desc: string }[] = [
  {
    key: 'prediction',
    label: 'Prediction Engine',
    title: 'Forecasts grounded in real load data.',
    desc: 'Hybrid time-series and ML models generate hourly demand, generation, and grid-state forecasts — calibrated continuously against your live sensor stream.',
  },
  {
    key: 'optimization',
    label: 'Optimization Loop',
    title: 'Multi-objective dispatch, every cycle.',
    desc: 'A solver balances cost, emissions, comfort, and battery health to produce setpoints for every asset — recomputed in seconds as conditions change.',
  },
  {
    key: 'flexibility',
    label: 'Flexibility & Trading',
    title: 'Turn flexibility into revenue.',
    desc: 'Aggregate available flexibility across sites and offer it to balancing markets and aggregators through standard OpenADR and REST integrations.',
  },
  {
    key: 'control',
    label: 'Control & Override',
    title: 'Operators stay in command.',
    desc: 'Every recommendation is auditable and overridable. Role-based controls, signed audit logs, and one-click manual takeover for any asset.',
  },
]

function TabIllustration({ tab }: { tab: TabKey }) {
  if (tab === 'prediction') {
    return (
      <svg viewBox="0 0 240 120" className="tabpane__svg" aria-hidden>
        {[20, 50, 80].map((y) => (
          <line key={y} x1="0" x2="240" y1={y} y2={y} stroke="var(--color-border)" />
        ))}
        <path d="M0,90 Q60,40 120,60 T240,30" fill="none" stroke="var(--color-accent)" strokeWidth="2" />
        <path d="M0,100 Q60,60 120,72 T240,48" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeDasharray="4 4" />
      </svg>
    )
  }
  if (tab === 'optimization') {
    return (
      <svg viewBox="0 0 240 120" className="tabpane__svg" aria-hidden>
        {[
          [30, 90, 36],
          [80, 90, 60],
          [130, 90, 24],
          [180, 90, 72],
        ].map(([x, y, h], i) => (
          <rect key={i} x={x as number - 12} y={(y as number) - (h as number)} width="24" height={h as number} rx="3" fill={i === 1 ? 'var(--color-accent)' : 'var(--color-text-muted)'} opacity={i === 1 ? 1 : 0.4} />
        ))}
        <line x1="0" y1="92" x2="240" y2="92" stroke="var(--color-border)" />
      </svg>
    )
  }
  if (tab === 'flexibility') {
    return (
      <svg viewBox="0 0 240 120" className="tabpane__svg" aria-hidden>
        <rect x="20" y="40" width="60" height="40" rx="4" fill="none" stroke="var(--color-text-muted)" />
        <rect x="160" y="40" width="60" height="40" rx="4" fill="none" stroke="var(--color-accent)" />
        <line x1="80" y1="60" x2="160" y2="60" stroke="var(--color-accent)" strokeWidth="2" />
        <circle cx="120" cy="60" r="6" fill="var(--color-accent)" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 240 120" className="tabpane__svg" aria-hidden>
      <circle cx="120" cy="68" r="40" fill="none" stroke="var(--color-border)" strokeWidth="6" />
      <path d="M120 68 m-40 0 a40 40 0 0 1 70 -28" fill="none" stroke="var(--color-accent)" strokeWidth="6" strokeLinecap="round" />
      <circle cx="120" cy="68" r="4" fill="var(--color-text-primary)" />
      <line x1="120" y1="68" x2="148" y2="48" stroke="var(--color-text-primary)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export default function Platform() {
  const [tab, setTab] = useState<TabKey>('prediction')
  const active = TABS.find((t) => t.key === tab)!

  return (
    <section className="platform section section-surface" id="platform">
      <div className="container">
        <motion.div
          className="platform__header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <span className="section-label">Platform</span>
          <h2 className="h2">From raw sensor data to decisive action — automatically.</h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <EnergyFlowDiagram />
        </motion.div>

        <motion.div
          className="platform__tabs"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <div className="platform__tablist" role="tablist" aria-label="Platform features">
            {TABS.map((t) => (
              <button
                key={t.key}
                role="tab"
                aria-selected={tab === t.key}
                className={`platform__tab ${tab === t.key ? 'platform__tab--active' : ''}`}
                onClick={() => setTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="platform__pane">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.key}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="tabpane"
              >
                <h3 className="tabpane__title">{active.title}</h3>
                <p className="tabpane__desc">{active.desc}</p>
                <div className="tabpane__illu">
                  <TabIllustration tab={active.key} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
