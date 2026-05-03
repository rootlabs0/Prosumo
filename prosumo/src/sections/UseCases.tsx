import { motion } from 'framer-motion'
import './UseCases.css'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.08 },
  }),
}

const PERSONAS = [
  {
    pill: 'For executives',
    headline: 'Prove ROI to the board.',
    bullets: [
      'Cost reduction reports with verified savings',
      'Quarterly executive summary export',
      'Per-site ROI dashboard with payback timeline',
    ],
  },
  {
    pill: 'For engineers',
    headline: 'Integrate in days, not quarters.',
    bullets: [
      'REST API, webhooks, and typed SDKs',
      'Modbus RTU / TCP and BACnet adapters',
      'Webhook events for every state change',
    ],
  },
  {
    pill: 'For operators',
    headline: 'Run the day from one screen.',
    bullets: [
      'Live energy dashboard with device status',
      'Alert routing with on-call schedules',
      'One-click manual override for any asset',
    ],
  },
]

export default function UseCases() {
  return (
    <section className="usecases section section-surface" id="use-cases">
      <div className="container">
        <motion.div
          className="usecases__header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <span className="section-label">Use Cases</span>
          <h2 className="h2">The right view for every stakeholder.</h2>
        </motion.div>

        <div className="usecases__grid">
          {PERSONAS.map((p, i) => (
            <motion.article
              key={p.pill}
              className="card usecases__card"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
            >
              <span className="tag tag-orange">{p.pill}</span>
              <h3 className="usecases__title">{p.headline}</h3>
              <ul className="usecases__list">
                {p.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <a href="#book-demo" className="arrow-link arrow-link-dark">
                Learn more <span aria-hidden>→</span>
              </a>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="usecases__cta"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <a href="#book-demo" className="btn btn-primary">
            Book a Demo <span aria-hidden>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
