import './Contact.css'
import { useLang } from '../context/LangContext'
import { translations } from '../i18n/translations'
import logoImg from '../../images/prosumo-white.webp'

export default function Footer() {
  const { lang } = useLang()
  const T = translations.footer

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="footer__logo-section">
            <img src={logoImg} alt="Prosumo" className="footer__logo" />
            <div className="footer__wordmark">PROSUMO s.r.o.</div>
          </div>
          <div className="footer__details">
            <div className="footer__section">
              <p className="footer__label">{T.address[lang]}</p>
              <p className="footer__text">Plynární 1617/10</p>
              <p className="footer__text">170 00 Praha 7</p>
            </div>
            <div className="footer__section">
              <p className="footer__label">{T.phone[lang]}</p>
              <p className="footer__text"><a href="tel:+420417631390">+420 417 631 390</a></p>
            </div>
            <div className="footer__section">
              <p className="footer__label">{T.email[lang]}</p>
              <p className="footer__text"><a href="mailto:prosumo@prosumo.cz">prosumo@prosumo.cz</a></p>
            </div>
            <div className="footer__section">
              <p className="footer__text">IČO: 09608192</p>
              <p className="footer__text">DIČ: CZ09608192</p>
              <p className="footer__text">{T.registerRef[lang]}<br />{T.courtRef[lang]}</p>
            </div>
          </div>
        </div>

        <div className="footer__empty"></div>
      </div>

      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} Prosumo s.r.o. {T.rights[lang]}</span>
      </div>
    </footer>
  )
}
