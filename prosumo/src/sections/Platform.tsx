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
  const bgTextRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = labelRef.current
    if (!el) return

    // Fade in when entering view
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

    // Fade out as cube finishes scaling (hero bottom → platform top)
    gsap.to(el, {
      opacity: 0,
      y: -20,
      ease: 'power2.in',
      scrollTrigger: {
        trigger: '#industries',
        start: 'top 60%',
        end: 'top top',
        scrub: 0.6,
      },
    })

    // Fade in the ghost description text AFTER the label has gone
    const bgEl = bgTextRef.current
    if (bgEl) {
      gsap.fromTo(
        bgEl,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#industries',
            // heading is fully gone at 'top top'; fade in over the next 8vh of scroll
            start: 'top top',
            end: () => `top+=${window.innerHeight * 0.08} top`,
            scrub: 0.4,
          },
        },
      )
    }
  }, [])

  const handleDotClick = (i: number) => {
    onSelect(i)
    const section = document.getElementById('industries')
    if (!section) return
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const viewportHeight = window.innerHeight
    const scrollable = sectionHeight - viewportHeight
    // 5 evenly-spaced snap stops: 0, 1/4, 2/4, 3/4, 1
    const targetY = sectionTop + (scrollable * i) / 4
    window.scrollTo({ top: targetY, behavior: 'smooth' })
  }

  return (
    <section id="industries" className="cube-section">
      {/* Ghost text sticky layer — z-index 6, between bg overlay (5) and cube (7) */}
      <div className="cube-word-sticky">
        <p ref={bgTextRef} className="cube-bg-word" aria-hidden="true" style={{ opacity: 0 }}>
          PROSUMO s.r.o. vyvíjí pokročilé algoritmy pro optimalizaci energetických toků a agregaci flexibility. Cloudová platforma PROSUMO vytváří zastřešující vrstvu pro EMS, RTU a MaR, kterým poskytujeme přesné predikce a optimalizační podklady, na jejichž základě řídí lokální energetiku. Naše technologie jsou stavěny na kombinaci hlubokých znalostí z oblasti energetiky, umělé inteligence a kybernetické bezpečnosti.
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
