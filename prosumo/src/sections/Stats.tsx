import { motion } from 'framer-motion'
import { useCountUp } from '../hooks/useCountUp'
import './Stats.css'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
}

function Metric({
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
  label,
  caption,
}: {
  value: number
  suffix?: string
  prefix?: string
  decimals?: number
  label: string
  caption: string
}) {
  const [n, ref] = useCountUp(value)
  return (
    <div className="trustbar__metric">
      <div className="trustbar__value">
        <span ref={ref} className="mono-num">
          {prefix}
          {n.toFixed(decimals)}
          {suffix}
        </span>
      </div>
      <div className="trustbar__label">{label}</div>
      <div className="trustbar__caption">{caption}</div>
    </div>
  )
}

export default function TrustBar() {
  return (
    <motion.section
      className="trustbar"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeUp}
    >
      <div className="container trustbar__inner">
        <Metric
          value={3}
          suffix="×"
          label="average ROI"
          caption="across deployments"
        />
        <Metric
          value={99.97}
          suffix="%"
          decimals={2}
          label="uptime SLA"
          caption="guaranteed"
        />
        <Metric
          value={12}
          prefix="<"
          suffix=" ms"
          label="response latency"
          caption="edge-to-cloud"
        />
      </div>
    </motion.section>
  )
}
