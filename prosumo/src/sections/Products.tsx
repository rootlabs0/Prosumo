import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './Products.css'

gsap.registerPlugin(ScrollTrigger)

const products = [
  {
    number: '01',
    title: 'Predikce výroby',
    desc: 'Přesné předpovědi výroby solární energie na základě pokročilých meteorologických modelů a strojového učení.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="20" cy="20" r="7" stroke="currentColor" strokeWidth="2.2" />
        <line x1="20" y1="2" x2="20" y2="7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="20" y1="33" x2="20" y2="38" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="2" y1="20" x2="7" y2="20" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="33" y1="20" x2="38" y2="20" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="6.34" y1="6.34" x2="9.88" y2="9.88" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="30.12" y1="30.12" x2="33.66" y2="33.66" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="33.66" y1="6.34" x2="30.12" y2="9.88" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="9.88" y1="30.12" x2="6.34" y2="33.66" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Optimalizace SPOT trhu',
    desc: 'Automatizované obchodování na SPOT trhu elektřiny pro maximalizaci výnosů vašich energetických aktiv.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <polyline points="4,30 12,18 20,24 28,10 36,16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="28,10 36,10 36,18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Predikce flexibility',
    desc: 'Identifikace a kvantifikace flexibilního potenciálu vašich zařízení pro účast na trhu s flexibilitou.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="4" y="24" width="6" height="12" rx="1.5" stroke="currentColor" strokeWidth="2.2" />
        <rect x="13" y="16" width="6" height="20" rx="1.5" stroke="currentColor" strokeWidth="2.2" />
        <rect x="22" y="8" width="6" height="28" rx="1.5" stroke="currentColor" strokeWidth="2.2" />
        <rect x="31" y="4" width="6" height="32" rx="1.5" stroke="currentColor" strokeWidth="2.2" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Diagnostika FV systémů',
    desc: 'Komplexní monitoring a diagnostika fotovoltaických instalací pro včasné odhalení závad a optimalizaci výkonu.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="18" cy="18" r="11" stroke="currentColor" strokeWidth="2.2" />
        <line x1="26.5" y1="26.5" x2="36" y2="36" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="18" y1="12" x2="18" y2="18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="18" cy="22" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
]

export default function Products() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.products__card', {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: '.products__grid',
          start: 'top 78%',
        },
      })
      gsap.from('.products__heading', {
        y: 32,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.products__heading',
          start: 'top 82%',
        },
      })
      gsap.from('.products__sub', {
        y: 20,
        opacity: 0,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.products__sub',
          start: 'top 84%',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section section--light products">
      <div className="container">
        <p className="eyebrow products__eyebrow">Co děláme</p>
        <h2 className="h-section products__heading">
          Naše <span className="products__accent">produkty</span>
        </h2>
        <p className="body-muted products__sub">
          Prosumo přináší sadu datových produktů pro moderní energetiku — od predikce výroby až po optimalizaci obchodování.
        </p>

        <div className="products__grid">
          {products.map((p) => (
            <article key={p.number} className="products__card">
              <div className="products__card-top">
                <span className="products__number">{p.number}</span>
                <div className="products__icon">{p.icon}</div>
              </div>
              <h3 className="products__title">{p.title}</h3>
              <p className="products__desc">{p.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
