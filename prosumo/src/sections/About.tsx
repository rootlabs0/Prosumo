import { useEffect, useMemo, useRef } from 'react'
import { motion, useScroll, useMotionValueEvent, useTransform, type MotionValue } from 'framer-motion'
import './About.css'
import Hyperspeed from '../components/Hyperspeed'

// Each slide: [enterStart, enterEnd, exitStart, exitEnd] — all in 0-1 scrollYProgress space
const SLIDES = [
  {
    heading: 'Manufacturing Plant',
    body: 'Load forecasting and shift scheduling helped reduce peak tariff exposure across a multi-line facility.',
    range: [0.13, 0.23, 0.32, 0.42] as const,
    posClass: 'field-text--bl',   // bottom-left
    origin: 'left bottom',
  },
  {
    heading: 'Commercial Portfolio',
    body: 'Automated SPOT-price optimization coordinated HVAC, meters, and building controls across daily operations.',
    range: [0.47, 0.57, 0.65, 0.74] as const,
    posClass: 'field-text--tr',   // right, text left-aligned
    origin: 'right center',
  },
  {
    heading: 'Energy Retailer',
    body: 'Community sharing and balance forecasting increased self-consumption while improving operational visibility.',
    range: [0.77, 0.86, 0.94, 1.0] as const,
    posClass: 'field-text--br',   // bottom-left (same side as first)
    origin: 'left center',
  },
]

function FieldText({
  heading,
  body,
  range,
  posClass,
  origin,
  scrollYProgress,
}: {
  heading: string
  body: string
  range: readonly [number, number, number, number]
  posClass: string
  origin: string
  scrollYProgress: MotionValue<number>
}) {
  const [e0, e1, x0, x1] = range

  // Entry: rise up + fade in from small; Exit: fade out (no scale)
  const opacity = useTransform(scrollYProgress, [e0, e1, x0, x1], [0, 1, 1, 0])
  const scale   = useTransform(scrollYProgress, [e0, e1, x0, x1], [0.6, 1, 1, 1])
  const y       = useTransform(scrollYProgress, [e0, e1, x0, x1], [60, 0, 0, 0])

  return (
    <motion.div
      className={`field-text ${posClass}`}
      style={{ opacity, scale, y, transformOrigin: origin }}
    >
      <h3 className="field-text__heading">{heading}</h3>
      <p  className="field-text__body">{body}</p>
    </motion.div>
  )
}

function SectionTitle({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  // Fades/rises in at start, then zooms in toward camera and vanishes before first slide
  const opacity = useTransform(scrollYProgress, [0, 0.06, 0.10, 0.18], [0, 1, 1, 0])
  const scale   = useTransform(scrollYProgress, [0, 0.06, 0.10, 0.18], [0.85, 1, 1, 1])
  const y       = useTransform(scrollYProgress, [0, 0.06], [32, 0])

  return (
    <motion.h2
      className="field-heading"
      style={{ opacity, scale, y, transformOrigin: 'center center' }}
    >
      Prosumo in the field
    </motion.h2>
  )
}

export default function Results() {
  const wrapperRef       = useRef<HTMLDivElement>(null)
  const hyperspeedAppRef = useRef<{ speedUpTarget: number; fovTarget: number; dispose: () => void } | null>(null)
  const prevProgress     = useRef(0)
  const targetSpeedRef   = useRef(0)
  const currentSpeedRef  = useRef(0)

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const delta = Math.abs(latest - prevProgress.current)
    prevProgress.current = latest
    const speed = Math.min(delta * 80, 3)
    if (speed > targetSpeedRef.current) targetSpeedRef.current = speed
  })

  useEffect(() => {
    let rafId: number
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const loop = () => {
      currentSpeedRef.current = lerp(currentSpeedRef.current, targetSpeedRef.current, 0.1)
      targetSpeedRef.current  = lerp(targetSpeedRef.current, 0, 0.025)
      const app = hyperspeedAppRef.current
      if (app) {
        app.speedUpTarget = currentSpeedRef.current
        app.fovTarget     = currentSpeedRef.current > 0.1 ? 150 : 90
      }
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafId)
  }, [])

  const effectOptions = useMemo(() => ({
    distortion: 'turbulentDistortion',
    length: 400,
    roadWidth: 10,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 20,
    lightPairsPerRoadWay: 40,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth:        [0.12, 0.5]          as [number, number],
    lightStickHeight:       [1.3, 1.7]           as [number, number],
    movingAwaySpeed:        [60, 80]             as [number, number],
    movingCloserSpeed:      [-120, -160]         as [number, number],
    carLightsLength:        [400 * 0.03, 400 * 0.2] as [number, number],
    carLightsRadius:        [0.05, 0.14]         as [number, number],
    carWidthPercentage:     [0.3, 0.5]           as [number, number],
    carShiftX:              [-0.8, 0.8]          as [number, number],
    carFloorSeparation:     [0, 5]               as [number, number],
    colors: {
      roadColor:      0x080808,
      islandColor:    0x0a0a0a,
      background:     0x000000,
      shoulderLines:  0xffffff,
      brokenLines:    0xffffff,
      leftCars:  [0xF5A30F, 0xc47d00, 0xffd166],
      rightCars: [0xffffff, 0xcccccc, 0xF5A30F],
      sticks:    0xF5A30F,
    },
  }), [])

  return (
    <div id="results" ref={wrapperRef} className="field-wrapper">
      <div className="field-sticky">
        <div className="field-hyperspeed" aria-hidden="true">
          <Hyperspeed effectOptions={effectOptions} hyperspeedRef={hyperspeedAppRef} />
        </div>

        <div className="field-overlay" aria-hidden="true" />

        <SectionTitle scrollYProgress={scrollYProgress} />

        {SLIDES.map((s) => (
          <FieldText key={s.heading} {...s} scrollYProgress={scrollYProgress} />
        ))}
      </div>
    </div>
  )
}
