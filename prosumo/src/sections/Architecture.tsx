import './Architecture.css'
import { useLang } from '../context/LangContext'
import { translations } from '../i18n/translations'

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
          {/* Placeholder for graph/image */}
          <div className="architecture__visual">
            <div className="architecture__placeholder">
              <svg viewBox="0 0 480 320" aria-label="Architecture diagram placeholder" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="478" height="318" rx="3" stroke="rgba(0,0,0,0.12)" strokeWidth="1" strokeDasharray="6 4" />
                <text x="240" y="155" textAnchor="middle" fontSize="13" fill="rgba(0,0,0,0.25)" fontFamily="'Courier New', monospace" letterSpacing="0.12em">DIAGRAM</text>
                <text x="240" y="174" textAnchor="middle" fontSize="13" fill="rgba(0,0,0,0.25)" fontFamily="'Courier New', monospace" letterSpacing="0.12em">PLACEHOLDER</text>
              </svg>
            </div>
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
