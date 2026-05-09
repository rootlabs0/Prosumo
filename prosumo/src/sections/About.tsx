import { useEffect, useRef, useState } from 'react'
import './About.css'

const cases = [
  {
    industry: 'AUTOMOTIVE MANUFACTURING',
    headline: '41% electricity cost reduction in Q1.',
    body:
      'A tier-1 component supplier deployed Prosumo across 3 plants in Czechia. Within 90 days, automated load shifting and predictive scheduling cut energy spend by €1.2M annualized — without changing production targets.',
    metrics: ['41% cost reduction', '€1.2M / year', '3 sites'],
  },
  {
    industry: 'DATA CENTER OPERATOR',
    headline: 'PUE down from 1.48 to 1.31 in 4 months.',
    body:
      'A regional colocation operator integrated Prosumo with their BMS. Real-time diagnostics surfaced 14 inefficiencies across cooling and UPS, while predictive control reshaped tariff exposure during Q3 peak windows.',
    metrics: ['PUE 1.31', '17% efficiency gain', '14 anomalies'],
  },
  {
    industry: 'COMMERCIAL REAL ESTATE',
    headline: '€680K saved across 22 buildings, year one.',
    body:
      'A pan-European portfolio operator rolled out Prosumo to 22 commercial assets. Sub-metered visibility and demand response unlocked savings that exceeded the deployment cost within the first quarter.',
    metrics: ['€680K saved', '22 buildings', '< 90 days payback'],
  },
]

export default function Results() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const card = track.children[index] as HTMLElement | undefined
    if (!card) return
    track.scrollTo({ left: card.offsetLeft - 24, behavior: 'smooth' })
  }, [index])

  const go = (dir: number) => {
    setIndex(i => Math.max(0, Math.min(cases.length - 1, i + dir)))
  }

  return (
    <section id="results" className="section section--light results">
      <div className="container">
        <div className="results__head reveal">
          <div>
            <p className="eyebrow results__kicker">In the Field</p>
            <h2 className="h-section results__title">Prosumo in the Field</h2>
          </div>
          <a href="#cta" className="results__library">Full Library →</a>
        </div>

        <div className="results__carousel reveal">
          <button
            className="results__arrow results__arrow--prev"
            onClick={() => go(-1)}
            aria-label="Previous case study"
            disabled={index === 0}
          >
            ‹
          </button>

          <div className="results__track" ref={trackRef}>
            {cases.map((c, i) => (
              <article key={c.headline} className={`case-card ${i === index ? 'is-active' : ''}`}>
                <p className="eyebrow case-card__industry">{c.industry}</p>
                <h3 className="case-card__headline">{c.headline}</h3>
                <p className="case-card__body">{c.body}</p>
                <div className="case-card__metrics">
                  {c.metrics.map(m => (
                    <span key={m} className="case-card__metric">{m}</span>
                  ))}
                </div>
                <a href="#cta" className="case-card__link">Read case study →</a>
              </article>
            ))}
          </div>

          <button
            className="results__arrow results__arrow--next"
            onClick={() => go(1)}
            aria-label="Next case study"
            disabled={index === cases.length - 1}
          >
            ›
          </button>
        </div>

        <div className="results__dots" role="tablist">
          {cases.map((_, i) => (
            <button
              key={i}
              className={`results__dot ${i === index ? 'is-active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to case ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
