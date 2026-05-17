import { useEffect, useRef, useState, useCallback } from 'react'
import Lenis from 'lenis'
import { LangProvider } from './context/LangContext'
import Nav from './components/Nav'
import TravelingCube from './components/TravelingCube'
import Hero from './sections/Hero'
import Industries from './sections/Platform'
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

  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({ duration: 0.9, smoothWheel: true })
    lenisRef.current = lenis
    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const scrollTo = useCallback((target: number, opts?: object) => {
    lenisRef.current?.scrollTo(target, opts as Parameters<Lenis['scrollTo']>[1])
  }, [])

  return (
    <LangProvider>
      <Nav />
      <main>
        <Hero />
        <Industries current={current} onSelect={handleCurrentChange} />
        <Architecture />
        <CTA />
      </main>
      <Footer />

      {/* Fixed-position cube that travels from hero-right slot into the
          platform-center slot as the user scrolls. */}
      <TravelingCube current={current} onCurrentChange={handleCurrentChange} scrollTo={scrollTo} />
    </LangProvider>
  )
}
