import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Platform.css'
import { SLIDES } from '../components/TravelingCube'

gsap.registerPlugin(ScrollTrigger)

/**
 * Platform section — provides the pinned scroll runway and side UI for the
 * TravelingCube. The cube itself is rendered as a fixed-position layer in App
 * and visually animates into the centered slot during the hero→platform transition.
 *
 * This section is 400vh tall so the cube has 4 scroll milestones (one per face).
 * The dots are clickable — each scrolls to its corresponding snap point.
 */
export default function Industries({
  current,
  onSelect,
}: {
  current: number
  onSelect: (index: number) => void
}) {
  const labelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = labelRef.current
    if (!el) return
    gsap.fromTo(
      el.children,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true,
        },
      },
    )
  }, [])

  const handleDotClick = (i: number) => {
    onSelect(i)
    const section = document.getElementById('industries')
    if (!section) return
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const viewportHeight = window.innerHeight
    const scrollable = sectionHeight - viewportHeight
    // 4 evenly-spaced snap stops: 0, 1/3, 2/3, 1
    const targetY = sectionTop + (scrollable * i) / 3
    window.scrollTo({ top: targetY, behavior: 'smooth' })
  }

  return (
    <section id="industries" className="cube-section">
      {/* Ghost word sticky layer — z-index 6, between bg overlay (5) and cube (7) */}
      <div className="cube-word-sticky">
        <p key={current} className="cube-bg-word" aria-hidden="true">
          {SLIDES[current].label}
        </p>
      </div>

      <div className="cube-wrapper">
        {/* Left heading column */}
        <div className="cube-label" ref={labelRef}>
          <h2 className="h-section cube-label__title">
            Co<br />
            <span className="cube-label__accent">děláme?</span>
          </h2>
        </div>

        {/* Center anchor — the TravelingCube fixed-layer occupies this visual slot */}
        <div className="platform__cube-anchor" aria-hidden="true" />

        {/* Right-side clickable progress dots */}
        <nav className="cube-nav" aria-label="Slide navigation">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              className={`cube-nav__dot${i === current ? ' is-active' : ''}`}
              aria-label={`Show ${slide.label} (slide ${i + 1} of ${SLIDES.length})`}
              aria-current={i === current ? 'true' : undefined}
              onClick={() => handleDotClick(i)}
            />
          ))}
        </nav>
      </div>
    </section>
  )
}
