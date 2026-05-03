import { motion } from 'framer-motion'
import DashboardMockup from '../components/DashboardMockup'
import '../components/DashboardMockup.css'
import './Hero.css'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.08 },
  }),
}

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <div className="hero__copy">
          <motion.h1
            className="h1 hero__title"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            Energy management <br />
            that pays for itself.
          </motion.h1>

          <motion.p
            className="lead hero__subline"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            PROSUMO combines AI-powered cloud software with industrial-grade hardware to give energy
            managers, CTOs, and executives complete visibility and control over their energy
            infrastructure.
          </motion.p>

          <motion.div
            className="hero__ctas"
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <a href="#book-demo" className="btn btn-primary">
              Book a Demo <span aria-hidden>→</span>
            </a>
            <a href="#platform" className="btn btn-secondary hero__secondary">
              See How It Works
            </a>
          </motion.div>

          <motion.div
            className="hero__proof"
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <p className="hero__proof-label mono">
              Trusted by energy operators across Central Europe
            </p>
            <div className="hero__proof-logos" aria-hidden>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="hero__proof-logo">
                  <svg viewBox="0 0 100 24" preserveAspectRatio="xMidYMid meet">
                    <rect x="0" y="8" width="14" height="8" rx="2" />
                    <rect x="20" y="6" width="76" height="12" rx="2" opacity="0.6" />
                  </svg>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="hero__visual">
          <DashboardMockup />
        </div>
      </div>
    </section>
  )
}
