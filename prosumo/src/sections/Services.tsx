import './Services.css'
import MagicBento from '../components/MagicBento'

export default function Services() {
  return (
    <section id="services" className="section services">
      <div className="container">

        <header className="services__header">
          <p className="eyebrow reveal">What We Offer</p>
          <h2 className="services__headline reveal">
            <span className="services__headline--light">Eight ways</span>
            <br />
            <span className="services__headline--bold">to master your energy.</span>
          </h2>
          <p className="services__sub reveal">
            From solar forecasting to flexibility markets every capability Prosumo delivers, in one platform.
          </p>
        </header>

        <div className="reveal">
          <MagicBento
            textAutoHide={false}
            enableStars={false}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={false}
            enableMagnetism={false}
            clickEffect={false}
            spotlightRadius={520}
            particleCount={12}
            glowColor="245, 163, 15"
          />
        </div>

        <p className="services__tagline">Smart for renewable energy. Smart for your wallet.</p>
        <div className="services__cta">
          <a href="#contact" className="services__btn services__btn--solid">Request Demo</a>
          <a href="#contact" className="services__btn services__btn--ghost">Contact Us</a>
        </div>

      </div>
    </section>
  )
}

