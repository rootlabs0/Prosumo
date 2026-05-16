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
        .from('.hero__metric', { y: 24, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1 }, '-=0.5')
        .from('.hero__cta > *', { y: 20, opacity: 0, duration: 0.65, ease: 'power3.out', stagger: 0.12 }, '-=0.35')
    }, innerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="top" className="hero">
      <div ref={innerRef} className="hero__inner container">
        <h1 className="h-display hero__headline">
          <span className="thin">{T.headline1[lang]}</span>
          <br />
          <span className="accent">{T.headline2[lang]}</span>
        </h1>

        <p className="hero__subline">{T.subline[lang]}</p>

        <div className="hero__metrics" role="list">
          {T.metrics[lang].map(m => (
            <div key={m.label} className="hero__metric">
              <span className="accent">{m.value}</span> {m.label}
            </div>
          ))}
        </div>

        <div className="hero__cta">
          <a href="#cta" className="btn btn--solid">{T.cta1[lang]}</a>
          <a href="#capabilities" className="btn btn--ghost">{T.cta2[lang]}</a>
        </div>
      </div>
    </section>
  )
}
