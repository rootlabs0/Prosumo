import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Hero.css'
import { useLang } from '../context/LangContext'
import { translations } from '../i18n/translations'

export default function Hero() {
  const innerRef = useRef<HTMLDivElement>(null)
  const { lang } = useLang()
  const T = translations.hero

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 })
      tl.from('.hero__headline', { y: 56, opacity: 0, duration: 1.1, ease: 'power3.out' })
        .from('.hero__subline', { y: 32, opacity: 0, duration: 0.9, ease: 'power3.out' }, '-=0.6')
        .from('.hero__cta > *', { y: 20, opacity: 0, duration: 0.65, ease: 'power3.out', stagger: 0.12 }, '-=0.35')
    }, innerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="top" className="hero">
      <div ref={innerRef} className="hero__inner container">
        <div className="hero__text">
          <h1 className="h-display hero__headline">
            Propojujeme<br />
            Svět<br />
            <span className="accent">Energií.</span>
          </h1>

          <p className="hero__subline">{T.subline[lang]}</p>

          <div className="hero__cta">
            <a href="#cta" className="btn btn--solid">{T.cta1[lang]}</a>
            <a href="#capabilities" className="btn btn--ghost">{T.cta2[lang]}</a>
          </div>
        </div>

        {/* Layout placeholder — reserves space for the TravelingCube which is rendered
            as a fixed-position layer in App. The cube visually occupies this slot in
            the hero's right column, then travels into the Platform section on scroll. */}
        <div className="hero__cube-anchor" aria-hidden="true" />
      </div>
    </section>
  )
}
