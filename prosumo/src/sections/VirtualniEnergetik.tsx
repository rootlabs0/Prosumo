import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './VirtualniEnergetik.css'

gsap.registerPlugin(ScrollTrigger)

export default function VirtualniEnergetik() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      // ── Slide-up transition — starts as cube snaps to face 5 (Y rotation) ──
      // Platform = 400vh, runway = 300vh, face-5 zone = 225vh–300vh in.
      gsap.fromTo(
        el,
        { y: '100vh' },
        {
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '#industries',
            start: () => `top+=${window.innerHeight * 2.25} top`,
            end: () => `top+=${window.innerHeight * 3.0} top`,
            scrub: 0.6,
          },
        },
      )

      // ── Fade + slide up content once fully in view ──
      gsap.fromTo(
        '.ve-section__eyebrow, .ve-section__heading, .ve-section__desc, .ve-section__cta, .ve-stat',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: el,
            start: 'top 60%',
            once: true,
          },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="virtualni-energetik" className="ve-section">
      <div className="ve-section__inner">
        {/* Left — text content */}
        <div className="ve-section__content">
          <p className="ve-section__eyebrow">Náš přístup</p>
          <h2 className="ve-section__heading">
            Virtuální<br />energetik
          </h2>
          <p className="ve-section__desc">
            Vypočítáváme dostupnou flexibilitu na každém odběrném místě,
            oceníme ji a propojíme operátory přímo s agregátory —
            přeměňujeme volatilitu sítě na příležitost k výnosu.
            Bez nutnosti investic, bez rizika výpadků.
          </p>
          <a href="#cta" className="ve-section__cta">
            Zjistit více
            <span className="ve-section__cta-arrow" aria-hidden="true">→</span>
          </a>
        </div>

        {/* Right — key stats */}
        <div className="ve-section__visual">
          <div className="ve-stat">
            <p className="ve-stat__value">38%</p>
            <p className="ve-stat__label">průměrná úspora nákladů na elektřinu u našich klientů</p>
          </div>
          <div className="ve-stat">
            <p className="ve-stat__value">2 400+</p>
            <p className="ve-stat__label">nasazených odběrných míst napříč průmyslem a komerčními budovami</p>
          </div>
          <div className="ve-stat">
            <p className="ve-stat__value">&lt;15 min</p>
            <p className="ve-stat__label">od zapojení k první aktivní flexibilitě</p>
          </div>
        </div>
      </div>
    </section>
  )
}
