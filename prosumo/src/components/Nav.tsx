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
  const headerRef = useRef<HTMLElement>(null)
  const { lang, toggleLang } = useLang()
  const T = translations.nav

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      
      // Determine which section is currently in view
      const industriesEl = document.getElementById('industries')
      const ctaEl = document.getElementById('cta')
      
      let isDarkSection = false
      
      // Check if Industries section is in view
      if (industriesEl) {
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

  return (
    <header ref={headerRef} className={`nav${scrolled ? ' is-scrolled' : ''}${dark ? ' is-dark' : ''}`}>
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
          <span className={lang === 'cs' ? 'active' : ''}>CZ</span>
          <span className="nav__lang-sep">|</span>
          <span className={lang === 'en' ? 'active' : ''}>EN</span>
        </button>
        <a href="#cta" className="btn btn--solid nav__cta">{T.cta[lang]}</a>
      </div>
    </header>
  )
}
