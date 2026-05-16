import './Architecture.css'
import { useLang } from '../context/LangContext'
import { translations } from '../i18n/translations'
import diagramImg from '../../images/Prosumo_diagram.webp'

export default function Architecture() {
  const { lang } = useLang()
  const T = translations.architecture

  return (
    <section id="architektura" className="section section--light architecture">
      <div className="container">
        <p className="eyebrow architecture__eyebrow">{T.eyebrow[lang]}</p>
        <h2 className="h-section architecture__heading">
          {T.heading1[lang]} <span className="architecture__accent">{T.heading2[lang]}</span>
        </h2>

        <div className="architecture__layout">
          {/* Architecture diagram */}
          <div className="architecture__visual">
            <img src={diagramImg} alt="Prosumo Architecture Diagram" className="architecture__diagram" />
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
