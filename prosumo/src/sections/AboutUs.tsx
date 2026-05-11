import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
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
  )
}

function TypeWriter() {
  const [displayedText, setDisplayedText] = useState('')
  const [animationStarted, setAnimationStarted] = useState(false)
  const fullText = 'We believe...'
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !animationStarted) {
            setAnimationStarted(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
    }
  }, [animationStarted])

  useEffect(() => {
    if (!animationStarted) return

    let index = 0
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, 60)

    return () => clearInterval(interval)
  }, [animationStarted])

  return <span ref={sectionRef}>{displayedText}</span>
}

export default function AboutUs() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showBody, setShowBody] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setShowBody(true)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current)
    }
  }, [])

  return (
    <section id="about-us" className="about-us" ref={containerRef}>
      <div className="container">
        <div className="about-us__text">
          <h2 className="about-us__headline">
            <div>At Prosumo</div>
            <div>
              <TypeWriter />
            </div>
          </h2>

          <motion.div
            className="about-us__body"
            initial={{ opacity: 0, y: 20 }}
            animate={showBody ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          >
            <p>
              in developing advanced algorithms for energy flow management and
              operations diagnostics, which are integrated into EMS (Energy
              Management Systems) from third-party manufacturers.
            </p>
            <p>
              These systems connect to the PROSUMO cloud platform, which
              provides advanced forecasting, optimization, flexibility, and
              operational control. Our technology is built on a combination of
              deep expertise in energy, artificial intelligence, and
              cybersecurity.
            </p>
          </motion.div>
        </div>

        <div className="about-us__team">
          {team.map(member => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  )
}
