import { useEffect } from 'react'
import Lenis from 'lenis'
import Nav from './components/Nav'
import Hero from './sections/Hero'
import TrustBar from './sections/Stats'
import Products from './sections/Capabilities'
import Platform from './sections/Platform'
import Hardware from './sections/About'
import UseCases from './sections/UseCases'
import CtaFooter from './sections/Contact'

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 0.9 })
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
        <TrustBar />
        <Products />
        <Platform />
        <Hardware />
        <UseCases />
        <CtaFooter />
      </main>
    </>
  )
}
