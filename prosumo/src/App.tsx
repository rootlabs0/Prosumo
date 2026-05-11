import { useEffect } from 'react'
import Lenis from 'lenis'
import Nav from './components/Nav'
import Hero from './sections/Hero'
import ProblemFraming from './sections/Stats'
import Capabilities from './sections/Capabilities'
import Industries from './sections/Platform'
import Services from './sections/Services'
import Results from './sections/About'
import AboutUs from './sections/AboutUs'
import CTA from './sections/UseCases'
import FAQ from './sections/FAQ'
import Footer from './sections/Contact'
import useReveal from './hooks/useReveal'

export default function App() {
  useReveal()

  useEffect(() => {
    const lenis = new Lenis({ duration: 0.9, smoothWheel: true })
    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProblemFraming />
        <Capabilities />
        <Services />
        <Industries />
        <Results />
        <AboutUs />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
