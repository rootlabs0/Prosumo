import './UseCases.css'

export default function CTA() {
  return (
    <section id="cta" className="section cta">
      <div className="container cta__inner">
        <h2 className="h-section cta__title reveal">
          Your energy systems know more
          <br />
          than you think.
        </h2>
        <p className="body-muted cta__sub reveal">
          Prosumo unlocks that intelligence. Book a 30-minute session with our
          team we'll map a deployment plan for your infrastructure.
        </p>
        <div className="cta__buttons reveal">
          <a href="mailto:hello@prosumo.cz" className="btn btn--solid">Request Demo</a>
          <a href="#" className="btn btn--ghost">Download Datasheet</a>
        </div>
        <p className="cta__fineprint reveal">No commitment. No vendor lock-in.</p>
      </div>
    </section>
  )
}
