import './Platform.css'
import { SLIDES } from '../components/TravelingCube'

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
      <div className="cube-wrapper">
        {/* Left heading + description column */}
        <div className="cube-label">
          <h2 className="h-section cube-label__title">
            Co<br />
            <span className="cube-label__accent">děláme?</span>
          </h2>
          <p className="cube-bg-word">
            PROSUMO s.r.o. vyvíjí pokročilé algoritmy pro optimalizaci energetických toků a agregaci flexibility. Cloudová platforma PROSUMO vytváří zastřešující vrstvu pro EMS, RTU a MaR, kterým poskytujeme přesné predikce a optimalizační podklady, na jejichž základě řídí lokální energetiku. Naše technologie jsou stavěny na kombinaci hlubokých znalostí z oblasti energetiky, umělé inteligence a kybernetické bezpečnosti.
          </p>
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
