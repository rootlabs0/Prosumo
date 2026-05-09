import './Hero.css'
// @ts-ignore
import heroVideo from '../../video/6280768_Renewable Energy Desk Solar Panel Office_By_Pressmaster_Artlist_HD.mp4'

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__bg" aria-hidden>
        <video
          className="hero__video"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="hero__overlay" />
      </div>

      <div className="hero__inner container">
        <h1 className="h-display hero__headline reveal">
          <span className="thin">Harness the power of</span>
          <br />
          <span className="accent">Predictions.</span>
        </h1>

        <p className="hero__subline reveal">
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
