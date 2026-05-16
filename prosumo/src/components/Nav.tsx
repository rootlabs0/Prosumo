import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import './Nav.css'
import { useLang } from '../context/LangContext'
import { translations } from '../i18n/translations'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const { lang, toggleLang } = useLang()
  const T = translations.nav

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, { y: -32, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.3 })
    })
    return () => ctx.revert()
  }, [])

  return (
    <header ref={headerRef} className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav__inner container">
        <a href="#top" className="nav__brand">
          <img src="/images/prosumo-logo.png" alt="Prosumo" className="nav__logo" />
          <span className="nav__brand-name">Prosumo</span>
        </a>
        <nav className="nav__links" aria-label="Primary">
          {T.links[lang].map(l => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>
        <button
          className="nav__lang-toggle"
          onClick={toggleLang}
          aria-label="Switch language"
        >
          <span className={lang === 'cs' ? 'active' : ''}>CZ</span>
          <span className="nav__lang-sep">|</span>
          <span className={lang === 'en' ? 'active' : ''}>EN</span>
        </button>
        <a href="#cta" className="btn btn--solid nav__cta">{T.cta[lang]}</a>
      </div>
    </header>
  )
}
