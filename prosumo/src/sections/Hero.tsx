import './Hero.css'

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__bg" aria-hidden>
        {/* Circuit-board / grid pattern, very subtle */}
        <svg width="100%" height="100%" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M80 0H0V80" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <circle cx="0" cy="0" r="1.4" fill="rgba(255,255,255,0.06)" />
            </pattern>
            <pattern id="circuit" width="240" height="240" patternUnits="userSpaceOnUse">
              <path
                d="M40 40 L120 40 L120 120 L200 120 M40 200 L80 200 L80 160 L160 160 L160 220 M220 40 L220 100"
                stroke="rgba(245,163,15,0.06)"
                strokeWidth="1"
                fill="none"
              />
              <circle cx="120" cy="40" r="2" fill="rgba(245,163,15,0.18)" />
              <circle cx="160" cy="160" r="2" fill="rgba(255,255,255,0.12)" />
            </pattern>
            <radialGradient id="vignette" cx="50%" cy="40%" r="70%">
              <stop offset="0%" stopColor="rgba(0,0,0,0)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.6)" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="#0f0f0f" />
          <rect width="100%" height="100%" fill="url(#grid)" />
          <rect width="100%" height="100%" fill="url(#circuit)" />
          <rect width="100%" height="100%" fill="url(#vignette)" />
        </svg>
      </div>

      <div className="hero__inner container">
        <h1 className="h-display hero__headline reveal">
          <span className="thin">Harness the power of</span>
          <br />
          <span className="accent">Predictions.</span>
        </h1>

        <p className="body-muted hero__subline reveal">
          AI-driven energy optimization for industrial operations. Prosumo
          reduces electricity costs by learning, predicting, and acting —
          automatically.
        </p>

        <div className="hero__metrics reveal" role="list">
          <div className="hero__metric"><span className="accent">38%</span> cost reduction</div>
          <div className="hero__metric"><span className="accent">2,400+</span> deployments</div>
          <div className="hero__metric"><span className="accent">&lt;15 min</span> setup</div>
          <div className="hero__metric"><span className="accent">99.97%</span> uptime</div>
        </div>

        <div className="hero__cta reveal">
          <a href="#cta" className="btn btn--solid">Request Demo</a>
          <a href="#capabilities" className="btn btn--ghost">See How It Works</a>
        </div>
      </div>
    </section>
  )
}
