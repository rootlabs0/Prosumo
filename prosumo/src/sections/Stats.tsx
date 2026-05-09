import { useEffect, useRef } from 'react'
import './Stats.css'

// Approximate European industrial electricity price index, 2015–2024 (2015 = 100)
const dataPoints: { year: number; value: number }[] = [
  { year: 2015, value: 100 },
  { year: 2016, value: 96 },
  { year: 2017, value: 102 },
  { year: 2018, value: 110 },
  { year: 2019, value: 112 },
  { year: 2020, value: 104 },
  { year: 2021, value: 168 },
  { year: 2022, value: 358 },
  { year: 2023, value: 286 },
  { year: 2024, value: 244 },
]

const stats = [
  { value: '312%', label: 'Energy price increase since 2021' },
  { value: '23%', label: 'Avg. share of OPEX from energy in manufacturing' },
  { value: '€180B', label: 'Annual industrial energy waste in Europe' },
  { value: '67%', label: 'Of companies have no real-time visibility' },
]

export default function ProblemFraming() {
  const pathRef = useRef<SVGPathElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const path = pathRef.current
    const sec = sectionRef.current
    if (!path || !sec) return
    const len = path.getTotalLength()
    path.style.strokeDasharray = `${len}`
    path.style.strokeDashoffset = `${len}`

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            path.style.transition = 'stroke-dashoffset 1.8s cubic-bezier(0.16,1,0.3,1)'
            path.style.strokeDashoffset = '0'
            io.disconnect()
          }
        })
      },
      { threshold: 0.35 },
    )
    io.observe(sec)
    return () => io.disconnect()
  }, [])

  // Build SVG path
  const W = 640
  const H = 320
  const padL = 48
  const padR = 16
  const padT = 24
  const padB = 36
  const minY = 0
  const maxY = 380
  const xs = (i: number) => padL + (i / (dataPoints.length - 1)) * (W - padL - padR)
  const ys = (v: number) =>
    padT + (1 - (v - minY) / (maxY - minY)) * (H - padT - padB)
  const d = dataPoints
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xs(i).toFixed(2)} ${ys(p.value).toFixed(2)}`)
    .join(' ')

  return (
    <section className="section problem" ref={sectionRef} id="problem">
      <div className="container">
        <div className="problem__head reveal">
          <p className="eyebrow">The Energy Cost Crisis</p>
          <h2 className="h-section">
            European industry is bleeding money on energy.
          </h2>
          <p className="body-muted problem__sub">
            Since 2021, grid prices have moved with unprecedented volatility.
            Operators without real-time visibility have absorbed the full
            shock and most still are.
          </p>
        </div>

        <div className="problem__chart reveal">
          <svg viewBox={`0 0 ${W} ${H}`} className="chart" role="img" aria-label="European industrial electricity price index, 2015 to 2024">
            {/* gridlines */}
            {[0, 100, 200, 300].map(v => (
              <g key={v}>
                <line
                  x1={padL}
                  x2={W - padR}
                  y1={ys(v)}
                  y2={ys(v)}
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="1"
                />
                <text
                  x={padL - 10}
                  y={ys(v) + 4}
                  fontSize="10"
                  fill="rgba(255,255,255,0.4)"
                  textAnchor="end"
                  fontFamily="Outfit"
                  letterSpacing="0.08em"
                >
                  {v}
                </text>
              </g>
            ))}

            {/* x labels */}
            {dataPoints.map((p, i) =>
              i % 2 === 0 || i === dataPoints.length - 1 ? (
                <text
                  key={p.year}
                  x={xs(i)}
                  y={H - 12}
                  fontSize="10"
                  fill="rgba(255,255,255,0.4)"
                  textAnchor="middle"
                  fontFamily="Outfit"
                  letterSpacing="0.08em"
                >
                  {p.year}
                </text>
              ) : null,
            )}

            {/* line */}
            <path
              ref={pathRef}
              d={d}
              fill="none"
              stroke="#f5a30f"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* peak marker */}
            <circle
              cx={xs(7)}
              cy={ys(dataPoints[7].value)}
              r="4"
              fill="#f5a30f"
            />
            <text
              x={xs(7)}
              y={ys(dataPoints[7].value) - 14}
              fontSize="10"
              fontWeight="600"
              fill="#f5a30f"
              textAnchor="middle"
              fontFamily="Outfit"
              letterSpacing="0.08em"
            >
              +258%
            </text>
          </svg>
        </div>

        <div className="problem__stats reveal" role="list">
          {stats.map(s => (
            <div className="stat" role="listitem" key={s.label}>
              <div className="stat__value">{s.value}</div>
              <div className="stat__label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
