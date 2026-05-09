import './Services.css'
import { motion } from 'framer-motion'

/* ─── SVG Icons ─── */

function SunForecastIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      {/* sun disc */}
      <circle cx="16" cy="20" r="5" stroke="#fff" strokeWidth="1.2" />
      {/* 8 rays */}
      <line x1="16" y1="12" x2="16" y2="10" stroke="#fff" strokeWidth="1.2" />
      <line x1="20.8" y1="15.2" x2="22.2" y2="13.8" stroke="#fff" strokeWidth="1.2" />
      <line x1="23" y1="20" x2="25" y2="20" stroke="#fff" strokeWidth="1.2" />
      <line x1="20.8" y1="24.8" x2="22.2" y2="26.2" stroke="#fff" strokeWidth="1.2" />
      <line x1="16" y1="27" x2="16" y2="29" stroke="#fff" strokeWidth="1.2" />
      <line x1="11.2" y1="24.8" x2="9.8" y2="26.2" stroke="#fff" strokeWidth="1.2" />
      <line x1="9" y1="20" x2="7" y2="20" stroke="#fff" strokeWidth="1.2" />
      <line x1="11.2" y1="15.2" x2="9.8" y2="13.8" stroke="#fff" strokeWidth="1.2" />
      {/* upward arrow above sun */}
      <line x1="16" y1="8" x2="16" y2="3" stroke="#fff" strokeWidth="1.2" />
      <polyline points="13.5,5.5 16,3 18.5,5.5" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  )
}

function WaveformIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      {/* baseline */}
      <line x1="2" y1="20" x2="30" y2="20" stroke="#fff" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.3" />
      {/* waveform path */}
      <polyline
        points="2,20 5,20 7,14 9,20 12,20 14,18 16,20 18,10 20,20 23,20 25,22 27,20 30,20"
        fill="none"
        stroke="#fff"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* anomaly marker at the spike */}
      <circle cx="18" cy="10" r="2.5" stroke="#fff" strokeWidth="1.2" fill="none" />
      <line x1="18" y1="6" x2="18" y2="4" stroke="#fff" strokeWidth="1" />
    </svg>
  )
}

function BarChartIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      {/* baseline */}
      <line x1="3" y1="27" x2="29" y2="27" stroke="#fff" strokeWidth="1" />
      {/* 5 bars */}
      <rect x="4" y="19" width="4" height="8" stroke="#fff" strokeWidth="1.2" fill="none" opacity="0.45" />
      <rect x="10" y="13" width="4" height="14" stroke="#fff" strokeWidth="1.2" fill="none" opacity="0.45" />
      {/* peak bars — slightly brighter */}
      <rect x="16" y="7" width="4" height="20" stroke="#fff" strokeWidth="1.2" fill="rgba(255,255,255,0.1)" />
      <rect x="22" y="10" width="4" height="17" stroke="#fff" strokeWidth="1.2" fill="rgba(255,255,255,0.1)" />
      {/* small tick on tallest bar */}
      <line x1="14" y1="7" x2="22" y2="7" stroke="#fff" strokeWidth="0.8" strokeDasharray="1.5 1.5" opacity="0.5" />
    </svg>
  )
}

function ScaleIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      {/* vertical post */}
      <line x1="16" y1="6" x2="16" y2="28" stroke="#fff" strokeWidth="1.2" />
      {/* horizontal beam */}
      <line x1="6" y1="10" x2="26" y2="10" stroke="#fff" strokeWidth="1.2" />
      {/* pivot */}
      <circle cx="16" cy="10" r="1.5" fill="#fff" />
      {/* left pan string + pan */}
      <line x1="8" y1="10" x2="8" y2="17" stroke="#fff" strokeWidth="1" />
      <path d="M5,17 Q8,19 11,17" fill="none" stroke="#fff" strokeWidth="1.2" />
      {/* right pan string + pan */}
      <line x1="24" y1="10" x2="24" y2="20" stroke="#fff" strokeWidth="1" />
      <path d="M21,20 Q24,22 27,20" fill="none" stroke="#fff" strokeWidth="1.2" />
      {/* 24H label */}
      <text x="16" y="31" textAnchor="middle" fontSize="5.5" fill="white" fontFamily="system-ui, sans-serif" fontWeight="600" letterSpacing="0.5">24H</text>
    </svg>
  )
}

function LightningIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="12" stroke="#fff" strokeWidth="1.2" />
      {/* lightning bolt */}
      <polyline
        points="18,6 12,16 17,16 14,26"
        fill="none"
        stroke="#fff"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function GaugeIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      {/* arc — 210° sweep (from 210° to 330° by the top) */}
      <path
        d="M5,23 A12,12 0 1,1 27,23"
        fill="none"
        stroke="#fff"
        strokeWidth="1.2"
        opacity="0.35"
      />
      {/* filled portion ~60% */}
      <path
        d="M5,23 A12,12 0 0,1 20.4,8.6"
        fill="none"
        stroke="#fff"
        strokeWidth="1.2"
      />
      {/* needle */}
      <line x1="16" y1="16" x2="22" y2="10" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="16" cy="16" r="1.5" fill="#fff" />
      {/* tick marks */}
      <line x1="5" y1="23" x2="7" y2="21.6" stroke="#fff" strokeWidth="0.8" />
      <line x1="16" y1="4" x2="16" y2="6" stroke="#fff" strokeWidth="0.8" />
      <line x1="27" y1="23" x2="25" y2="21.6" stroke="#fff" strokeWidth="0.8" />
    </svg>
  )
}

function EuroIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      {/* brackets */}
      <path d="M10,6 L7,6 L7,26 L10,26" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M22,6 L25,6 L25,26 L22,26" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
      {/* euro sign */}
      <path d="M19,10 A5,5 0 1,0 19,22" fill="none" stroke="#fff" strokeWidth="1.2" />
      <line x1="11" y1="15" x2="18" y2="15" stroke="#fff" strokeWidth="1.2" />
      <line x1="11" y1="17.5" x2="17" y2="17.5" stroke="#fff" strokeWidth="1.2" />
      {/* up arrow */}
      <line x1="16" y1="2" x2="16" y2="5" stroke="#fff" strokeWidth="1" />
      <polyline points="14.5,3.5 16,2 17.5,3.5" fill="none" stroke="#fff" strokeWidth="1" strokeLinejoin="round" />
      {/* down arrow */}
      <line x1="16" y1="27" x2="16" y2="30" stroke="#fff" strokeWidth="1" />
      <polyline points="14.5,28.5 16,30 17.5,28.5" fill="none" stroke="#fff" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  )
}

function NodesIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      {/* three circles at triangle vertices */}
      <circle cx="16" cy="5" r="3" stroke="#fff" strokeWidth="1.2" fill="none" />
      <circle cx="5" cy="25" r="3" stroke="#fff" strokeWidth="1.2" fill="none" />
      <circle cx="27" cy="25" r="3" stroke="#fff" strokeWidth="1.2" fill="none" />
      {/* edges */}
      <line x1="13.4" y1="7.6" x2="7.4" y2="22.4" stroke="#fff" strokeWidth="1" />
      <line x1="18.6" y1="7.6" x2="24.6" y2="22.4" stroke="#fff" strokeWidth="1" />
      <line x1="8" y1="25" x2="24" y2="25" stroke="#fff" strokeWidth="1" />
    </svg>
  )
}

/* ─── Data ─── */

interface Service {
  id: string
  name: string
  description: string
  Icon: () => JSX.Element
}

const SERVICES: Service[] = [
  {
    id: 'pv-forecast',
    name: 'PV Production Forecasting',
    description:
      'Accurate models based on meteorological data and local sensors predict photovoltaic output up to tens of hours ahead.',
    Icon: SunForecastIcon,
  },
  {
    id: 'pv-diagnostics',
    name: 'PV Operations Diagnostics',
    description:
      'Analysis of AC and DC power outputs detects deviations and enables early fault detection at the string or inverter level.',
    Icon: WaveformIcon,
  },
  {
    id: 'spot-optimization',
    name: 'SPOT Market Optimization',
    description:
      'Algorithms schedule device operation according to the SPOT market price curve to achieve the best economic outcomes.',
    Icon: BarChartIcon,
  },
  {
    id: 'balance-forecast',
    name: 'Balance Point Forecasting',
    description:
      'A 24-hour ahead model of electricity consumption and supply at the consumption point helps reduce imbalance costs.',
    Icon: ScaleIcon,
  },
  {
    id: 'efficiency-audit',
    name: 'Energy Efficiency Audit',
    description:
      'Dynamic management of consumption, generation, and storage minimizes deviation from the forecasted balance.',
    Icon: LightningIcon,
  },
  {
    id: 'flex-forecast',
    name: 'Flexibility Forecasting',
    description:
      'Calculation of available regulatory energy volume that can be offered to aggregators, generating additional revenue.',
    Icon: GaugeIcon,
  },
  {
    id: 'flex-valuation',
    name: 'Flexibility Valuation',
    description:
      'Economic assessment of the impact of providing regulatory energy, enabling correct real-time decision-making.',
    Icon: EuroIcon,
  },
  {
    id: 'sharing-group',
    name: 'Sharing Group Optimization',
    description:
      'Management of consumption and generation within an energy community to maximize self-consumption and economic benefit for members.',
    Icon: NodesIcon,
  },
]

/* ─── Card variants for Framer Motion ─── */

const lineVariants = {
  rest: { scaleX: 0 },
  hover: { scaleX: 1, transition: { duration: 0.3, ease: 'easeOut' } },
}

/* ─── Component ─── */

export default function Services() {
  return (
    <section id="services" className="section services">
      <div className="container">

        {/* Section header */}
        <header className="services__header">
          <p className="eyebrow reveal">What We Offer</p>
          <h2 className="services__headline reveal">
            <span className="services__headline--light">Eight ways</span>
            <br />
            <span className="services__headline--bold">to master your energy.</span>
          </h2>
          <p className="services__sub reveal">
            From solar forecasting to flexibility markets — every capability Prosumo delivers, in one platform.
          </p>
        </header>

        {/* 4×2 services grid */}
        <div className="services__grid reveal">
          {SERVICES.map(({ id, name, description, Icon }) => (
            <motion.article
              key={id}
              className="svc-card"
              initial="rest"
              whileHover="hover"
            >
              {/* Amber top-line — Framer Motion scaleX */}
              <motion.div className="svc-card__line" variants={lineVariants} />

              <div className="svc-card__icon">
                <Icon />
              </div>

              <p className="svc-card__name">{name}</p>

              <p className="svc-card__desc">{description}</p>
            </motion.article>
          ))}
        </div>

        {/* Footer tagline + CTAs */}
        <p className="services__tagline">Smart for renewable energy. Smart for your wallet.</p>
        <div className="services__cta">
          <a href="#contact" className="services__btn services__btn--solid">Request Demo</a>
          <a href="#contact" className="services__btn services__btn--ghost">Contact Us</a>
        </div>

      </div>
    </section>
  )
}
