import { motion } from 'framer-motion'
import HardwareIcon from '../components/HardwareIcon'
import './About.css'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.08 },
  }),
}

type Kind = 'gateway' | 'sensor' | 'control'

const PRODUCTS: {
  kind: Kind
  name: string
  specs: string[]
  tag: string
  tagAvailable: boolean
}[] = [
  {
    kind: 'gateway',
    name: 'EMS Gateway G1',
    specs: [
      'DIN-rail mount',
      '4× RS-485 / Modbus RTU',
      'LTE + Ethernet fallback',
      'Edge compute: ARM Cortex-A7',
      'IP20 rated',
    ],
    tag: 'Available now',
    tagAvailable: true,
  },
  {
    kind: 'sensor',
    name: 'CS-100 Current Sensor',
    specs: [
      '100A split-core CT',
      '±0.5% accuracy class',
      'Plug-in terminal block',
      'Compatible: G1 Gateway',
    ],
    tag: 'Available now',
    tagAvailable: true,
  },
  {
    kind: 'control',
    name: 'CM-4 Control Module',
    specs: [
      '4× relay outputs (16A)',
      '2× analog inputs 0–10V',
      'Modbus RTU slave',
      'Mounts alongside G1',
    ],
    tag: 'Coming Q3 2025',
    tagAvailable: false,
  },
]

export default function Hardware() {
  return (
    <section className="hardware section" id="hardware">
      <div className="container">
        <motion.div
          className="hardware__header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <span className="section-label">Hardware</span>
          <h2 className="h2">Built for the industrial environment.</h2>
          <p className="lead">
            Every PROSUMO hardware component is engineered for reliability, accuracy, and seamless
            cloud connectivity.
          </p>
        </motion.div>

        <div className="hardware__grid">
          {PRODUCTS.map((p, i) => (
            <motion.article
              key={p.name}
              className="card hardware__card"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
            >
              <div className="hardware__icon">
                <HardwareIcon kind={p.kind} />
              </div>
              <h3 className="hardware__name">{p.name}</h3>
              <ul className="hardware__specs mono">
                {p.specs.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <span className={`tag ${p.tagAvailable ? 'tag-orange' : 'tag-gray'}`}>{p.tag}</span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
