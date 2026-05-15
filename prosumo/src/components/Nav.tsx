import { useEffect, useState } from 'react'
import './Nav.css'

const links = [
  { label: 'Platform', href: '#capabilities' },
  { label: 'Hardware', href: '#industries' },
  { label: 'About', href: '#cta' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav__inner container">
        <a href="#top" className="nav__brand">
          <img src="/images/prosumo-logo.png" alt="Prosumo" className="nav__logo" />
          <span className="nav__brand-name">Prosumo</span>
        </a>
        <nav className="nav__links" aria-label="Primary">
          {links.map(l => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>
        <a href="#cta" className="btn btn--solid nav__cta">Request Demo</a>
      </div>
    </header>
  )
}
