import { useRef, useEffect } from 'react'
import './UseCases.css'
import { useLang } from '../context/LangContext'
import { translations } from '../i18n/translations'

export default function CTA() {
  const { lang } = useLang()
  const T = translations.cta
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 20
      const rotateY = (centerX - x) / 20

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`
      card.classList.add('tilt')
    }

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
      card.classList.remove('tilt')
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <section id="cta" className="section cta">
      <div className="container cta__inner">

        {/* Left: heading + body + buttons */}
        <div className="cta__left">
          <h2 className="h-section cta__title reveal">
            {T.heading1[lang]}
            <br />
            {T.heading2[lang]}
          </h2>
          <p className="body-muted cta__sub reveal">{T.sub[lang]}</p>
        </div>

        {/* Right: contact person card */}
        <div className="cta__contact-card reveal" ref={cardRef}>
          <img src="/images/ZZ.jpg" alt="Zdeněk Zatloukal" className="cta__card-avatar" />
          <div className="cta__card-content">
            <p className="cta__card-kicker">{T.contactCard.kicker[lang]}</p>
            <h3 className="cta__card-name">Zdeněk Zatloukal</h3>
            <p className="cta__card-bio">{T.contactCard.bio[lang]}</p>
            <div className="cta__card-contacts">
              <a href="mailto:zdenek.zatloukal@prosumo.cz" className="cta__contact-pill">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="3" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M1 4.5L7 8.5L13 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                zdenek.zatloukal@prosumo.cz
              </a>
              <a href="tel:+420722774041" className="cta__contact-pill">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3.5 1.5C3.5 1.5 2 3 2 5C2 9 9 12 11 12C12 12 13 10.5 13 10.5L11 8.5C11 8.5 10 9 9.25 8.5C8.5 8 7 6.5 6.5 5.75C6 5 6.5 4 6.5 4L3.5 1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                +420 722 774 041
              </a>
              <a href="#" className="cta__contact-pill" target="_blank" rel="noopener noreferrer">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2"/>
                  <circle cx="3.75" cy="4.25" r="0.65" fill="currentColor"/>
                  <path d="M3.75 6V10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  <path d="M6.5 6.25V10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  <path d="M6.5 8.25C6.5 7.007 7.507 6 8.75 6C9.993 6 11 7.007 11 8.25V10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
