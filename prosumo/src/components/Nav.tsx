import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import './Nav.css'
import { useLang } from '../context/LangContext'
import { translations } from '../i18n/translations'
import logoBlack from '../../images/prosumo-black.webp'
import logoWhite from '../../images/prosumo-white.webp'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [dark, setDark] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const { lang, toggleLang } = useLang()
  const T = translations.nav

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      
      // Determine which section is currently in view
      const heroEl = document.getElementById('top')
      const industriesEl = document.getElementById('industries')
      const ctaEl = document.getElementById('cta')
      
      let isDarkSection = false
      
      // Hero is dark
      if (heroEl) {
        const heroEnd = heroEl.offsetTop + heroEl.offsetHeight
        if (y < heroEnd) {
          isDarkSection = true
        }
      }

      // Check if Industries section is in view
      if (industriesEl && !isDarkSection) {
        const industriesStart = industriesEl.offsetTop
        const industriesEnd = industriesStart + industriesEl.offsetHeight
        if (y >= industriesStart - 80 && y < industriesEnd) {
          isDarkSection = true
        }
      }
      
      // Check if CTA section is in view
      if (ctaEl && !isDarkSection) {
        const ctaStart = ctaEl.offsetTop
        if (y >= ctaStart - 80) {
          isDarkSection = true
        }
      }
      
      setDark(isDarkSection)
    }
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

  // Close mobile menu on scroll
  useEffect(() => {
    if (!menuOpen) return
    const close = () => setMenuOpen(false)
    window.addEventListener('scroll', close, { once: true, passive: true })
    return () => window.removeEventListener('scroll', close)
  }, [menuOpen])

  return (
    <header ref={headerRef} className={`nav${scrolled ? ' is-scrolled' : ''}${dark ? ' is-dark' : ''}${menuOpen ? ' menu-open' : ''}`}>
      <div className="nav__inner container">
        <a href="#top" className="nav__brand">
          <img src={dark ? logoWhite : logoBlack} alt="Prosumo" className="nav__logo" />
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
          {lang === 'cs' ? 'EN' : 'CZ'}
        </button>
        <a href="#cta" className="btn btn--solid nav__cta">{T.cta[lang]}</a>

        {/* Hamburger — mobile only */}
        <button
          className={`nav__hamburger${menuOpen ? ' is-open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="nav-mobile-menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div id="nav-mobile-menu" className="nav__mobile-menu">
          <nav className="nav__mobile-links">
            {T.links[lang].map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
            ))}
          </nav>
          <div className="nav__mobile-bottom">
            <button className="nav__lang-toggle" onClick={() => { toggleLang(); setMenuOpen(false) }} aria-label="Switch language">
              {lang === 'cs' ? 'EN' : 'CZ'}
            </button>
            <a href="#cta" className="btn btn--solid nav__mobile-cta" onClick={() => setMenuOpen(false)}>{T.cta[lang]}</a>
          </div>
        </div>
      )}
    </header>
  )
}
