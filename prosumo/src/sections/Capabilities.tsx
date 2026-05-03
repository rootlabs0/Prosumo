import { motion } from 'framer-motion'
import './Capabilities.css'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.08 },
  }),
}

function Check({ orange = false }: { orange?: boolean }) {
  return (
    <span className={`check ${orange ? 'check--orange' : 'check--dark'}`} aria-hidden>
      <svg viewBox="0 0 16 16" width="14" height="14">
        <path
          d="M3.5 8.5l3 3 6-6.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

const SAAS_FEATURES = [
  'Demand & generation forecasting',
  'Multi-objective optimization engine',
  'Grid flexibility & demand response',
  'Remote monitoring & override',
]

const HARDWARE_FEATURES = [
  'DIN-rail mounted energy gateway',
  'High-accuracy current & voltage sensors',
  'Secure edge compute with local failover',
  'Plug-and-play EMS integration',
]

export default function Products() {
  return (
    <section className="products section" id="products">
      <div className="container">
        <motion.div
          className="products__header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <span className="section-label">Products</span>
          <h2 className="h2 products__title">Software and hardware. Built to work together.</h2>
          <p className="lead">Choose the deployment that fits your infrastructure — or use both.</p>
        </motion.div>

        <div className="products__grid">
          <motion.article
            className="card products__card"
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
          >
            <span className="tag tag-orange">Cloud Software</span>
            <h3 className="products__card-title">PROSUMO Cloud Platform</h3>
            <p className="products__card-desc">
              AI-powered prediction, optimization, and remote control for your energy assets.
              Connects to any EMS via open APIs. No infrastructure required.
            </p>
            <ul className="products__features">
              {SAAS_FEATURES.map((f) => (
                <li key={f}>
                  <Check orange />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a href="#platform" className="arrow-link arrow-link-orange">
              Explore the platform <span aria-hidden>→</span>
            </a>
          </motion.article>

          <motion.article
            className="card products__card"
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
          >
            <span className="tag tag-gray">Physical Hardware</span>
            <h3 className="products__card-title">PROSUMO Gateway &amp; Sensors</h3>
            <p className="products__card-desc">
              Industrial-grade IoT hardware — energy gateways, current sensors, and control modules
              — designed for direct integration with your existing EMS and the PROSUMO cloud.
            </p>
            <ul className="products__features">
              {HARDWARE_FEATURES.map((f) => (
                <li key={f}>
                  <Check />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a href="#hardware" className="arrow-link arrow-link-dark">
              View hardware specs <span aria-hidden>→</span>
            </a>
          </motion.article>
        </div>
      </div>
    </section>
  )
}
