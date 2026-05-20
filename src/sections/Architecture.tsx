import './Architecture.css'
import { useLang } from '../context/LangContext'
import { translations } from '../i18n/translations'
import ProsumoArchitectureDiagram from '../components/ProsumoArchitectureDiagram'

export default function Architecture() {
  const { lang } = useLang()
  const T = translations.architecture

  return (
    <section id="architektura" className="section section--light architecture">
      <div className="container">
        <h2 className="h-section architecture__heading">
          {T.heading1[lang]}
        </h2>

        <div className="architecture__layout">
          {/* Architecture diagram */}
          <div className="architecture__visual">
            <ProsumoArchitectureDiagram />
          </div>

          {/* Description text */}
          <div className="architecture__text">
            <p className="architecture__body">{T.body1[lang]}</p>
            <p className="architecture__body">{T.body2[lang]}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
