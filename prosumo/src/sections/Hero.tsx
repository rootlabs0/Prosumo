import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Hero.css'
// @ts-ignore
import heroVideo from '../../video/6280768_Renewable Energy Desk Solar Panel Office_By_Pressmaster_Artlist_HD.mp4'

export default function Hero() {
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 })
      tl.from('.hero__headline', { y: 56, opacity: 0, duration: 1.1, ease: 'power3.out' })
        .from('.hero__subline', { y: 32, opacity: 0, duration: 0.9, ease: 'power3.out' }, '-=0.6')
        .from('.hero__metric', { y: 24, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1 }, '-=0.5')
        .from('.hero__cta > *', { y: 20, opacity: 0, duration: 0.65, ease: 'power3.out', stagger: 0.12 }, '-=0.35')
    }, innerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="top" className="hero">
      <div className="hero__bg" aria-hidden>
        <video
          className="hero__video"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="hero__overlay" />
      </div>

      <div ref={innerRef} className="hero__inner container">
        <h1 className="h-display hero__headline">
          <span className="thin">Harness the power of</span>
          <br />
          <span className="accent">Predictions.</span>
        </h1>

        <p className="hero__subline">
          AI-driven energy optimization for industrial operations. Prosumo
          reduces electricity costs by learning, predicting, and acting —
          automatically.
        </p>

        <div className="hero__metrics" role="list">
          <div className="hero__metric"><span className="accent">38%</span> cost reduction</div>
          <div className="hero__metric"><span className="accent">2,400+</span> deployments</div>
          <div className="hero__metric"><span className="accent">&lt;15 min</span> setup</div>
          <div className="hero__metric"><span className="accent">99.97%</span> uptime</div>
        </div>

        <div className="hero__cta">
          <a href="#cta" className="btn btn--solid">Request Demo</a>
          <a href="#capabilities" className="btn btn--ghost">See How It Works</a>
        </div>
      </div>
    </section>
  )
}
