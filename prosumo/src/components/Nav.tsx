import { useEffect, useRef, useState } from 'react'
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
const [visible, setVisible] = useState(true)
const [open, setOpen] = useState(false)
const [pulse, setPulse] = useState(false)
const lastScrollY = useRef(0)

useEffect(() => {
  const onScroll = () => {
    const currentY = window.scrollY
    setScrolled(currentY > 8)
    setVisible(currentY < lastScrollY.current || currentY < 50)
    lastScrollY.current = currentY
  }
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
    <motion.header
  className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
  animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -16 }}
  transition={{ duration: 0.3, ease: 'easeInOut' }}
>
      <div className="nav__inner container">
        <a href="#top" className="nav__logo" aria-label="PROSUMO home">
          <svg className="nav__logo-wave" viewBox="0 0 28 18" fill="none" aria-hidden>
            <rect x="0"  y="7"  width="3" height="4"  rx="1.5" fill="currentColor" />
            <rect x="5"  y="4"  width="3" height="10" rx="1.5" fill="currentColor" />
            <rect x="10" y="0"  width="3" height="18" rx="1.5" fill="currentColor" />
            <rect x="15" y="3"  width="3" height="12" rx="1.5" fill="currentColor" />
            <rect x="20" y="6"  width="3" height="6"  rx="1.5" fill="currentColor" />
            <rect x="25" y="8"  width="3" height="3"  rx="1.5" fill="currentColor" />
          </svg>
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
    </motion.header>
  )
}
