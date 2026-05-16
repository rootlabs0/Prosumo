import { useEffect, useState, useCallback } from 'react'
import Lenis from 'lenis'
import { LangProvider } from './context/LangContext'
import Nav from './components/Nav'
import TravelingCube from './components/TravelingCube'
import Hero from './sections/Hero'
import Industries from './sections/Platform'
import VirtualniEnergetik from './sections/VirtualniEnergetik'
import Architecture from './sections/Architecture'
import CTA from './sections/UseCases'
import Footer from './sections/Contact'
import useReveal from './hooks/useReveal'

export default function App() {
  useReveal()

  const [current, setCurrent] = useState(0)
  const handleCurrentChange = useCallback((i: number) => {
    setCurrent(prev => (prev === i ? prev : i))
  }, [])

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
    <LangProvider>
      <Nav />
      <main>
        <Hero />
        <Industries current={current} onSelect={handleCurrentChange} />
        <VirtualniEnergetik />
        <Architecture />
        <CTA />
      </main>
      <Footer />

      {/* Fixed-position cube that travels from hero-right slot into the
          platform-center slot as the user scrolls. */}
      <TravelingCube current={current} onCurrentChange={handleCurrentChange} />
    </LangProvider>
  )
}
