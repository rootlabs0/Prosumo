import { useEffect, useRef, useState } from 'react'
import './Stats.css'

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

export default function ProblemFraming() {
  const pathRef = useRef<SVGPathElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [textVisible, setTextVisible] = useState(false)
  const [graphVisible, setGraphVisible] = useState(false)
  const graphTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const scrollLockTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const sec = sectionRef.current
    if (!sec) return

    const lockScroll = () => {
      document.body.style.overflow = 'hidden'
      if (scrollLockTimer.current) clearTimeout(scrollLockTimer.current)
      scrollLockTimer.current = setTimeout(() => {
        document.body.style.overflow = ''
      }, 3500)
    }

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            lockScroll()
            setTextVisible(true)
            graphTimerRef.current = setTimeout(() => setGraphVisible(true), 2000)
          } else {
            document.body.style.overflow = ''
            if (scrollLockTimer.current) clearTimeout(scrollLockTimer.current)
            setTextVisible(false)
            setGraphVisible(false)
            if (graphTimerRef.current) clearTimeout(graphTimerRef.current)
          }
        })
      },
      { threshold: 0.5 },
    )
    io.observe(sec)
    return () => {
      io.disconnect()
      document.body.style.overflow = ''
      if (graphTimerRef.current) clearTimeout(graphTimerRef.current)
      if (scrollLockTimer.current) clearTimeout(scrollLockTimer.current)
    }
  }, [])

  useEffect(() => {
    const path = pathRef.current
    if (!path) return
    const len = path.getTotalLength()
    path.style.strokeDasharray = `${len}`
    if (graphVisible) {
      path.style.transition = 'stroke-dashoffset 2s cubic-bezier(0.16,1,0.3,1)'
      path.style.strokeDashoffset = '0'
    } else {
      path.style.transition = 'none'
      path.style.strokeDashoffset = `${len}`
    }
  }, [graphVisible])

  const W = 800
  const H = 180
  const padT = 20
  const padB = 20
  const minY = 80
  const maxY = 380
  const xs = (i: number) => (i / (dataPoints.length - 1)) * W
  const ys = (v: number) => padT + (1 - (v - minY) / (maxY - minY)) * (H - padT - padB)
  const d = dataPoints
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xs(i).toFixed(2)} ${ys(p.value).toFixed(2)}`)
    .join(' ')

  return (
    <section className="problem" ref={sectionRef} id="problem">
      <div className="problem__inner">
        <div className={`problem__lines ${textVisible ? 'is-visible' : ''}`}>
          <div className="problem__line problem__line--1">
            <span>European <em>industry</em></span>
          </div>
          <div className="problem__line problem__line--2">
            <span><em>bleeds money</em> on energy.</span>
          </div>
          <div className="problem__line problem__line--3">
            <span>Prices surged <em>258%</em> in three years.</span>
          </div>
          <div className="problem__line problem__line--4">
            <span>Most operators <em>lack real-time</em></span>
          </div>
          <div className="problem__line problem__line--5">
            <span><em>visibility</em> to respond.</span>
          </div>
        </div>

        <div className={`problem__graph ${graphVisible ? 'is-visible' : ''}`}>
          <div className="problem__graph-inner">
            <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="problem__svg" role="img" aria-label="European industrial electricity price index">
              <defs>
                <linearGradient id="line-fade" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="rgba(245,163,15,0.3)" />
                  <stop offset="60%" stopColor="rgba(245,163,15,1)" />
                  <stop offset="100%" stopColor="rgba(245,163,15,0.6)" />
                </linearGradient>
              </defs>
              <path
                ref={pathRef}
                d={d}
                fill="none"
                stroke="url(#line-fade)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Low point: 2016, index 1 */}
              <circle cx={xs(1).toFixed(2)} cy={ys(96).toFixed(2)} r="5" fill="#f5a30f" />
              {/* High point: 2022, index 7 */}
              <circle cx={xs(7).toFixed(2)} cy={ys(358).toFixed(2)} r="5" fill="#f5a30f" />
            </svg>
            {/* Low point label */}
            <div className="problem__tag problem__tag--low" style={{ left: `${(xs(1) / W * 100).toFixed(2)}%`, top: `${(ys(96) / H * 100).toFixed(2)}%` }}>
              <div className="problem__tag-label">
                <strong>2016</strong>
                <span>Placeholder low point</span>
              </div>
            </div>
            {/* High point label */}
            <div className="problem__tag problem__tag--high" style={{ left: `${(xs(7) / W * 100).toFixed(2)}%`, top: `${(ys(358) / H * 100).toFixed(2)}%` }}>
              <div className="problem__tag-label">
                <strong>2022</strong>
                <span>Placeholder high point</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
