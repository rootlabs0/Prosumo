import { motion } from 'framer-motion'
import './Contact.css'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
}

const FOOTER_COLS = [
  {
    title: 'Products',
    links: ['Platform', 'Hardware', 'Pricing', 'Docs'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Blog', 'Contact'],
  },
  {
    title: 'Legal',
    links: ['Privacy Policy', 'Terms of Service'],
  },
]

export default function CtaFooter() {
  return (
    <>
      <motion.section
        className="ctabanner"
        id="book-demo"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeUp}
      >
        <div className="container ctabanner__inner">
          <h2 className="ctabanner__title">Ready to take control of your energy?</h2>
          <p className="ctabanner__subline">
            Talk to our team. We&rsquo;ll map out a deployment plan for your infrastructure in
            30 minutes.
          </p>
          <a href="mailto:hello@prosumo.cz" className="btn btn-primary ctabanner__btn">
            Book a Free Demo <span aria-hidden>→</span>
          </a>
        </div>
      </motion.section>

      <footer className="footer" id="contact">
        <div className="container footer__inner">
          <div className="footer__brand">
            <a href="#top" className="footer__logo">
              PROSUMO<span className="footer__logo-dot">.</span>
            </a>
            <p className="footer__tagline">Smarter energy, by design.</p>
            <address className="footer__address">
              PROSUMO s.r.o.
              <br />
              Prague, Czech Republic
              <br />
              <a href="mailto:hello@prosumo.cz">hello@prosumo.cz</a>
            </address>
          </div>

          <div className="footer__cols">
            {FOOTER_COLS.map((col) => (
              <div key={col.title} className="footer__col">
                <div className="footer__col-title mono">{col.title}</div>
                <ul>
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="container footer__bottom">
          <span>&copy; {new Date().getFullYear()} PROSUMO s.r.o. All rights reserved.</span>
          <span className="mono footer__bottom-meta">Built in Prague</span>
        </div>
      </footer>
    </>
  )
}
