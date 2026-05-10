import { useEffect, useRef } from 'react'
import './About.css'

const cases = [
  {
    name: 'Manufacturing Plant',
    body: 'Load forecasting and shift scheduling helped reduce peak tariff exposure across a multi-line facility.',
    variant: 'worker',
    className: 'field-card--top',
  },
  {
    name: 'Commercial Portfolio',
    body: 'Automated SPOT-price optimization coordinated HVAC, meters, and building controls across daily operations.',
    variant: 'desk',
    className: 'field-card--right',
  },
  {
    name: 'Energy Retailer',
    body: 'Community sharing and balance forecasting increased self-consumption while improving operational visibility.',
    variant: 'store',
    className: 'field-card--left',
  },
]

const CustomerIllustration = ({ variant }: { variant: string }) => {
  if (variant === 'desk') {
    return (
      <svg viewBox="0 0 150 110" role="img" aria-label="Customer working at a laptop">
        <circle cx="78" cy="34" r="18" fill="#ffb18f" />
        <path d="M57 31c7-19 36-18 40 2-7-5-19-7-40-2Z" fill="#111" />
        <path d="M61 61c9-16 37-16 47 0l9 42H52l9-42Z" fill="#bec5ff" />
        <rect x="18" y="76" width="54" height="29" rx="2" fill="#8c939b" />
        <rect x="12" y="102" width="84" height="5" fill="#6f7780" />
        <path d="M29 18h28a12 12 0 0 1 12 12v12a12 12 0 0 1-12 12H43l-12 10 3-10h-5a12 12 0 0 1-12-12V30a12 12 0 0 1 12-12Z" fill="#fff8e7" />
        <path d="M36 34h18M36 42h10" stroke="#111" strokeWidth="3" strokeLinecap="round" />
      </svg>
    )
  }

  if (variant === 'store') {
    return (
      <svg viewBox="0 0 150 110" role="img" aria-label="Customer in a retail energy site">
        <rect x="0" y="0" width="150" height="110" fill="#dff3ff" />
        <rect x="9" y="30" width="48" height="72" fill="#ffd78b" />
        <rect x="89" y="22" width="51" height="80" fill="#f1f7ff" />
        <path d="M94 34h38M94 51h38M94 68h38M94 85h38" stroke="#b4d5e6" strokeWidth="4" />
        <circle cx="70" cy="41" r="16" fill="#ffb18f" />
        <path d="M53 41c4-21 34-22 38-2-14-5-24-6-38 2Z" fill="#111" />
        <path d="M55 69c11-16 34-16 45 0l8 40H48l7-40Z" fill="#f7d6bd" />
        <path d="M78 66l38-18" stroke="#ffb18f" strokeWidth="9" strokeLinecap="round" />
        <rect x="110" y="38" width="16" height="20" rx="2" fill="#fff" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 150 110" role="img" aria-label="Industrial customer portrait">
      <circle cx="72" cy="33" r="19" fill="#ffb18f" />
      <path d="M51 33c4-24 39-25 44-2-15-8-29-8-44 2Z" fill="#111" />
      <path d="M28 104c6-35 24-51 44-51s38 16 45 51H28Z" fill="#ffdc8a" />
      <rect x="79" y="58" width="19" height="23" rx="4" fill="#fff" />
      <path d="M54 82l42 9" stroke="#ffb18f" strokeWidth="10" strokeLinecap="round" />
      <rect x="67" y="78" width="31" height="19" rx="2" fill="#fff" />
      <path d="M72 84h18M72 90h12" stroke="#8c939b" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export default function Results() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    interface Point { x: number; y: number }
    interface Spark {
      x: number; y: number
      dx: number; dy: number
      speed: number
      trail: Point[]
      maxTrail: number
    }

    const allDirs: Point[] = [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }]
    const cell = () => canvas.width < 980 ? 100 : 136
    const snap = (v: number, c: number) => Math.round(v / c) * c

    const newSpark = (): Spark => {
      const c = cell()
      const cols = Math.ceil(canvas.width / c) + 2
      const rows = Math.ceil(canvas.height / c) + 2
      const d = allDirs[Math.floor(Math.random() * 4)]
      return {
        x: Math.floor(Math.random() * cols) * c,
        y: Math.floor(Math.random() * rows) * c,
        dx: d.x, dy: d.y,
        speed: 1.5 + Math.random() * 2.5,
        trail: [],
        maxTrail: 180 + Math.floor(Math.random() * 120),
      }
    }

    const sparks: Spark[] = Array.from({ length: 6 }, newSpark)

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const c = cell()

      for (let i = 0; i < sparks.length; i++) {
        const s = sparks[i]
        s.x += s.dx * s.speed
        s.y += s.dy * s.speed

        s.trail.push({ x: s.x, y: s.y })
        if (s.trail.length > s.maxTrail) s.trail.shift()

        // Turn at grid intersections
        const sx = snap(s.x, c)
        const sy = snap(s.y, c)
        if (Math.abs(s.x - sx) < 1 && Math.abs(s.y - sy) < 1 && Math.random() < 0.15) {
          const perp = s.dx !== 0
            ? (Math.random() < 0.5 ? { x: 0, y: 1 } : { x: 0, y: -1 })
            : (Math.random() < 0.5 ? { x: 1, y: 0 } : { x: -1, y: 0 })
          s.dx = perp.x; s.dy = perp.y
        }

        if (s.x < -c * 5 || s.x > canvas.width + c * 5 ||
            s.y < -c * 5 || s.y > canvas.height + c * 5) {
          Object.assign(sparks[i], newSpark())
          continue
        }

        // Draw trail
        if (s.trail.length < 2) continue
        for (let j = 1; j < s.trail.length; j++) {
          const t = s.trail[j]
          const p = s.trail[j - 1]
          const prog = j / s.trail.length

          ctx.lineCap = 'round'
          ctx.lineJoin = 'round'

          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(t.x, t.y)
          ctx.strokeStyle = `rgba(245,163,15,${prog})`
          ctx.lineWidth = 1; ctx.stroke()
        }
      }

      raf = requestAnimationFrame(tick)
    }

    tick()
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [])

  return (
    <section id="results" className="section section--light results results--field">
      <div className="results__heading-layer">
        <h2 className="results__title">Prosumo in the field</h2>
      </div>

      <div className="results__fade" aria-hidden="true" />

      <div className="results__grid" aria-label="Prosumo customer outcomes">
        <canvas ref={canvasRef} className="results__electricity" aria-hidden="true" />
        {cases.map(item => (
          <article key={item.name} className={`field-card ${item.className}`}>
            <div className="field-card__media">
              <CustomerIllustration variant={item.variant} />
            </div>
            <div className="field-card__copy">
              <h3>{item.name}</h3>
              <p>{item.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
