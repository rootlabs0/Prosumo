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
            Energy that<br />
            works for <span className="hero__accent">you</span>
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
              See how it works
            </a>
          </motion.div>
        </div>

        <div className="hero__visual">
          <DashboardMockup />
        </div>
      </div>
    </section>
  )
}
