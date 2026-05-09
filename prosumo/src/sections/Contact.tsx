import './Contact.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="footer__wordmark">PROSUMO</div>
          <p className="footer__tagline">
            AI-driven energy intelligence for industrial operators.
          </p>
          <p className="footer__addr">
            Prosumo s.r.o. · Prague, Czech Republic ·
            <a href="mailto:hello@prosumo.cz"> hello@prosumo.cz</a>
          </p>
        </div>

        <nav className="footer__cols" aria-label="Footer">
          <div>
            <p className="eyebrow">Platform</p>
            <a href="#capabilities">Predict</a>
            <a href="#capabilities">Diagnose</a>
            <a href="#capabilities">Flex</a>
            <a href="#industries">Industries</a>
          </div>
          <div>
            <p className="eyebrow">Company</p>
            <a href="#cta">About</a>
            <a href="#results">Case studies</a>
            <a href="#cta">Careers</a>
            <a href="#cta">Press</a>
          </div>
          <div>
            <p className="eyebrow">Contact</p>
            <a href="mailto:hello@prosumo.cz">hello@prosumo.cz</a>
            <a href="#cta">Request demo</a>
            <a href="#cta">Partner program</a>
            <a href="#cta">Support</a>
          </div>
        </nav>
      </div>

      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} Prosumo s.r.o. All rights reserved.</span>
        <span className="footer__certs">ISO 27001 · EN 50160 · CE Certified</span>
      </div>
    </footer>
  )
}
