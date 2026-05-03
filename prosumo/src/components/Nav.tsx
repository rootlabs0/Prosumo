import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Nav.css'

const LINKS = [
  { label: 'Products', href: '#products' },
  { label: 'Platform', href: '#platform' },
  { label: 'Hardware', href: '#hardware' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Docs', href: '#docs' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const t = window.setTimeout(() => setPulse(true), 3000)
    const off = window.setTimeout(() => setPulse(false), 3000 + 900)
    return () => {
      window.clearTimeout(t)
      window.clearTimeout(off)
    }
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner container">
        <a href="#top" className="nav__logo" aria-label="PROSUMO home">
          PROSUMO<span className="nav__logo-dot">.</span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} className="nav__link">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav__cta">
          <a href="#book-demo" className={`btn btn-primary nav__demo ${pulse ? 'nav__demo--pulse' : ''}`}>
            Book a Demo <span aria-hidden>→</span>
          </a>
        </div>

        <button
          className={`nav__burger ${open ? 'nav__burger--open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav__mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="container nav__mobile-inner">
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="nav__mobile-link"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#book-demo"
                className="btn btn-primary nav__mobile-cta"
                onClick={() => setOpen(false)}
              >
                Book a Demo <span aria-hidden>→</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
