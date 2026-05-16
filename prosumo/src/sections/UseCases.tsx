import './UseCases.css'
import { useLang } from '../context/LangContext'
import { translations } from '../i18n/translations'

export default function CTA() {
  const { lang } = useLang()
  const T = translations.cta

  return (
    <section id="cta" className="section cta">
      <div className="container cta__inner">
        <h2 className="h-section cta__title reveal">
          {T.heading1[lang]}
          <br />
          {T.heading2[lang]}
        </h2>
        <p className="body-muted cta__sub reveal">{T.sub[lang]}</p>
        <div className="cta__buttons reveal">
          <a href="mailto:hello@prosumo.cz" className="btn btn--solid">{T.btn1[lang]}</a>
          <a href="#" className="btn btn--ghost">{T.btn2[lang]}</a>
        </div>
      </div>
    </section>
  )
}
