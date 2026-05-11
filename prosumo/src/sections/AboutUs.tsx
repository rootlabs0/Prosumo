import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import './AboutUs.css'

const team = [
  {
    name: 'Joe Pizzella',
    role: 'Founder | Vision & Experience',
    photo: '/images/joe-pizzella.svg',
    quote:
      'God helps those who help themselves. Energy and persistence conquer all things. Well done is better than well said.',
    attribution: 'Benjamin Franklin',
  },
  {
    name: 'Anton Chalk',
    role: 'Co-Founder | Operations',
    photo: '/images/anton-chalk.svg',
    quote:
      'Everything that is really great and inspiring is created by individuals who can labor in freedom.',
    attribution: 'Albert Einstein',
  },
  {
    name: 'Ross Orr',
    role: 'Co-Founder | Technology',
    photo: '/images/ross-orr.svg',
    quote:
      "Our prime purpose in this life is to help others. And if you can't help them, at least don't hurt them.",
    attribution: 'Dalai Lama',
  },
]

function TeamCard({ member }: { member: (typeof team)[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div className="team-card-wrap">
    <article
      className="team-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="team-card__photo">
        <img src={member.photo} alt={member.name} />
        <motion.div
          className="team-card__overlay"
          initial={{ y: '100%' }}
          animate={{ y: hovered ? '0%' : '100%' }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          aria-hidden="true"
        >
          <motion.p
            className="team-card__quote"
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2, delay: hovered ? 0.15 : 0 }}
          >
            &ldquo;{member.quote}&rdquo;
          </motion.p>
          <motion.p
            className="team-card__attribution"
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2, delay: hovered ? 0.15 : 0 }}
          >
            {member.attribution}
          </motion.p>
        </motion.div>
      </div>
      <div className="team-card__info">
        <p className="team-card__name">{member.name}</p>
        <p className="team-card__role">{member.role}</p>
      </div>
    </article>
    </div>
  )
}

const stats: {
  target: number
  suffix: string
  label: string
  format?: (n: number) => string
}[] = [
  { target: 4, suffix: '+', label: 'Years Active' },
  { target: 40, suffix: '+', label: 'Clients Served' },
  {
    target: 2400,
    suffix: '+',
    label: 'Installations',
    format: (n) => n.toLocaleString('en-US'),
  },
  { target: 38, suffix: '%', label: 'Avg. Energy Saved' },
]

function StatBox({
  target,
  suffix,
  label,
  format,
  started,
}: {
  target: number
  suffix: string
  label: string
  format?: (n: number) => string
  started: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!started) return
    const duration = 1500
    let startTime: number | null = null
    let rafId = 0
    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) rafId = requestAnimationFrame(step)
    }
    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [started, target])

  const display = format ? format(count) : String(count)

  return (
    <div className="zz-stat">
      <p className="zz-stat__number">{display}{suffix}</p>
      <p className="zz-stat__label">{label}</p>
    </div>
  )
}

function CircuitSVG() {
  return (
    <svg
      className="zz-circuit"
      viewBox="0 0 400 200"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="PROSUMO Platform diagram"
    >
      {Array.from({ length: 16 }, (_, i) => (
        <line key={`v${i}`} x1={i * 28} y1={0} x2={i * 28} y2={200}
          stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <line key={`h${i}`} x1={0} y1={i * 28} x2={400} y2={i * 28}
          stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}
      <path d="M84 56 L168 56 L168 140 L252 140 L252 56 L336 56"
        stroke="#F5A30F" strokeOpacity="0.25" strokeWidth="1" fill="none" />
      <path d="M168 56 L168 28" stroke="#F5A30F" strokeOpacity="0.25" strokeWidth="1" fill="none" />
      <path d="M252 140 L252 172" stroke="#F5A30F" strokeOpacity="0.25" strokeWidth="1" fill="none" />
      <path d="M0 100 Q50 78 100 100 Q150 122 200 100 Q250 78 300 100 Q350 122 400 100"
        stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" fill="none" />
      <circle cx={84} cy={56} r={4} fill="#F5A30F" fillOpacity="0.7" />
      <circle cx={168} cy={56} r={4} fill="#F5A30F" fillOpacity="0.7" />
      <circle cx={252} cy={56} r={4} fill="#F5A30F" fillOpacity="0.7" />
      <circle cx={336} cy={56} r={3} fill="#F5A30F" fillOpacity="0.5" />
      <circle cx={252} cy={140} r={3} fill="#F5A30F" fillOpacity="0.5" />
      <text x={14} y={188} fontSize={8} fontFamily="Outfit, sans-serif" fontWeight={600}
        fill="rgba(255,255,255,0.2)" letterSpacing="0.14em"
        style={{ textTransform: 'uppercase' }}>
        PROSUMO PLATFORM
      </text>
    </svg>
  )
}

function useFadeIn(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, visible }
}

export default function AboutUs() {
  const block1 = useFadeIn()
  const block3 = useFadeIn()
  const block4 = useFadeIn()

  return (
    <section id="about-us" className="about-us">

      {/* Container 1 — Identity */}
      <div className="container">
        <div className="zz-stack">
          <div ref={block1.ref}>
            <motion.div
              className="zz-block zz-block--center"
              initial={{ opacity: 0, y: 30 }}
              animate={block1.visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <p className="zz-label">OUR STORY</p>
              <h2 className="zz-headline">
                Our <motion.span
                  className="zz-headline__accent"
                  initial={{ color: '#1a1a1a' }}
                  animate={block1.visible ? { color: '#f5a30f' } : { color: '#1a1a1a' }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                >MISSION</motion.span> is<br />
                Intelligent Energy Control.
              </h2>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Full-width scroll reveal body text */}
      <div className="about-us__reveal">
        <ScrollReveal
          baseOpacity={0.05}
          enableBlur={true}
          baseRotation={2}
          blurStrength={8}
          containerClassName="about-us__reveal-heading"
          wordAnimationEnd="bottom center"
        >
          We develop advanced algorithms for energy flow management and operations diagnostics, integrated directly into EMS systems from third-party manufacturers. These systems connect to the PROSUMO cloud platform, delivering advanced forecasting, optimization, flexibility, and operational control — built on deep expertise in energy, artificial intelligence, and cybersecurity.
        </ScrollReveal>
      </div>

      {/* Container 3 — Stats */}
      <div className="container">
        <div className="zz-stack">
          <div ref={block3.ref}>
            <motion.div
              className="zz-block zz-block--center zz-block--stats"
              initial={{ opacity: 0, y: 30 }}
              animate={block3.visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            >
              <div className="zz-stats">
                {stats.map(s => (
                  <StatBox
                    key={s.label}
                    target={s.target}
                    suffix={s.suffix}
                    label={s.label}
                    format={s.format}
                    started={block3.visible}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Container 4 — Team cards */}
      <div className="container">
        <div className="zz-stack">
          <div ref={block4.ref}>
            <motion.div
              className="zz-block zz-block--center zz-block--no-bg"
              initial={{ opacity: 0, y: 30 }}
              animate={block4.visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            >
              <div className="zz-team">
                {team.map(member => (
                  <TeamCard key={member.name} member={member} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  )
}
