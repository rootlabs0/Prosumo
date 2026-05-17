import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import type { ServiceSection } from '../sections/ServicesDetail'
import './TravelingCube.css'

gsap.registerPlugin(ScrollTrigger)

const STROKE = 'rgba(255,255,255,0.85)'
const FAINT = 'rgba(255,255,255,0.22)'
const ACCENT = '#ff5522'

function FactorySVG() {
  return (
    <svg viewBox="0 0 360 240" role="img" aria-label="Factory cross-section">
      <line x1="20" y1="200" x2="340" y2="200" stroke={STROKE} strokeWidth="1" />
      <path d="M40 200 L40 130 L120 130 L120 100 L200 100 L200 130 L320 130 L320 200 Z" fill="none" stroke={STROKE} strokeWidth="1" />
      <path d="M40 130 L60 110 L80 130 L100 110 L120 130" fill="none" stroke={STROKE} strokeWidth="1" />
      <path d="M200 130 L220 110 L240 130 L260 110 L280 130 L300 110 L320 130" fill="none" stroke={STROKE} strokeWidth="1" />
      <rect x="140" y="60" width="20" height="40" fill="none" stroke={STROKE} strokeWidth="1" />
      {/* Orange garage door — centre section */}
      <rect x="128" y="148" width="64" height="52" fill="none" stroke={ACCENT} strokeWidth="1.5" />
      <line x1="128" y1="161" x2="192" y2="161" stroke={ACCENT} strokeWidth="0.75" />
      <line x1="128" y1="174" x2="192" y2="174" stroke={ACCENT} strokeWidth="0.75" />
      <line x1="128" y1="187" x2="192" y2="187" stroke={ACCENT} strokeWidth="0.75" />
      {/* Grey windows — left wing */}
      <rect x="52"  y="148" width="20" height="16" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
      <rect x="82"  y="148" width="20" height="16" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
      {/* Grey windows — right wing */}
      <rect x="214" y="148" width="20" height="16" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
      <rect x="248" y="148" width="20" height="16" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
      <rect x="282" y="148" width="20" height="16" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
    </svg>
  )
}

function CRESVG() {
  return (
    <svg viewBox="0 0 360 240" role="img" aria-label="Energy optimisation graph">
      {/* Horizontal grid */}
      <line x1="50" y1="60"  x2="320" y2="60"  stroke={FAINT} strokeWidth="0.75" />
      <line x1="50" y1="100" x2="320" y2="100" stroke={FAINT} strokeWidth="0.75" />
      <line x1="50" y1="140" x2="320" y2="140" stroke={FAINT} strokeWidth="0.75" />
      <line x1="50" y1="180" x2="320" y2="180" stroke={FAINT} strokeWidth="0.75" />
      {/* Axes */}
      <line x1="60" y1="30" x2="60" y2="205" stroke={STROKE} strokeWidth="1" />
      <line x1="55" y1="200" x2="325" y2="200" stroke={STROKE} strokeWidth="1" />
      {/* Consumption curve */}
      <path
        d="M60,170 C90,150 115,158 140,138 C165,118 190,88 220,82 C250,76 280,110 310,98"
        fill="none" stroke={STROKE} strokeWidth="1.5"
      />
      {/* Optimised forecast — dashed accent */}
      <path
        d="M60,170 C92,148 116,152 140,130 C164,108 192,80 220,75 C248,70 282,105 310,92"
        fill="none" stroke="#ff5522" strokeWidth="1" strokeDasharray="5 3"
      />
      {/* Node dots on consumption curve */}
      <circle cx="140" cy="138" r="3.5" fill="none" stroke={STROKE} strokeWidth="1" />
      <circle cx="220" cy="82"  r="3.5" fill="none" stroke={STROKE} strokeWidth="1" />
      <circle cx="310" cy="98"  r="3.5" fill="none" stroke={STROKE} strokeWidth="1" />
    </svg>
  )
}



function FVESolarSVG() {
  const panel = (x: number, y: number, color: string) => (
    <>
      <rect x={x} y={y} width="165" height="270" fill="none" stroke={color} strokeWidth="1.5" />
      <line x1={x+55}  y1={y}    x2={x+55}  y2={y+270} stroke={FAINT} strokeWidth="1" />
      <line x1={x+110} y1={y}    x2={x+110} y2={y+270} stroke={FAINT} strokeWidth="1" />
      <line x1={x}     y1={y+68}  x2={x+165} y2={y+68}  stroke={FAINT} strokeWidth="1" />
      <line x1={x}     y1={y+135} x2={x+165} y2={y+135} stroke={FAINT} strokeWidth="1" />
      <line x1={x}     y1={y+202} x2={x+165} y2={y+202} stroke={FAINT} strokeWidth="1" />
    </>
  )
  return (
    <svg viewBox="0 0 800 600" role="img" aria-label="Solar panels">
      <g transform="rotate(-45 400 300)">
        {/* Row 1 */}
        {panel(110, 60,  STROKE)}
        {panel(295, 60,  ACCENT)}
        {/* Row 2 */}
        {panel(110, 350, STROKE)}
        {panel(295, 350, STROKE)}
        {panel(480, 350, STROKE)}
      </g>
    </svg>
  )
}

function EnergCommunitySVG() {
  return (
    <svg viewBox="0 0 360 240" role="img" aria-label="Energy community buildings">
      <line x1="20" y1="220" x2="340" y2="220" stroke={STROKE} strokeWidth="1" />
      <rect x="120" y="40" width="120" height="180" fill="none" stroke={ACCENT} strokeWidth="1" />
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={i} x1="120" y1={60 + i * 20} x2="240" y2={60 + i * 20} stroke={FAINT} strokeWidth="0.75" />
      ))}
      <rect x="60" y="140" width="60" height="80" fill="none" stroke={STROKE} strokeWidth="1" />
      <line x1="120" y1="140" x2="120" y2="220" stroke={ACCENT} strokeWidth="1" />
      <rect x="240" y="120" width="60" height="100" fill="none" stroke={STROKE} strokeWidth="1" />
      <line x1="240" y1="120" x2="240" y2="220" stroke={ACCENT} strokeWidth="1" />
    </svg>
  )
}

function DataCenterSVG() {
  return (
    <svg viewBox="0 0 360 240" role="img" aria-label="Village silhouette">
      {/* Ground line */}
      <line x1="30" y1="200" x2="330" y2="200" stroke={STROKE} strokeWidth="1.5" strokeLinecap="round" />

      {/* Far-left small house */}
      <rect x="38" y="162" width="44" height="38" fill={STROKE} rx="1" />
      <polygon points="38,162 60,140 82,162" fill={STROKE} />
      {/* door */}
      <rect x="51" y="178" width="18" height="22" fill="#161616" rx="9" />

      {/* Left-mid house */}
      <rect x="90" y="148" width="54" height="52" fill={STROKE} rx="1" />
      <polygon points="90,148 117,122 144,148" fill={STROKE} />
      {/* door */}
      <rect x="104" y="166" width="26" height="34" fill="#161616" rx="13" />

      {/* Centre tall house */}
      <rect x="148" y="110" width="64" height="90" fill={STROKE} rx="1" />
      <polygon points="148,110 180,72 212,110" fill={STROKE} />
      {/* chimney */}
      <rect x="194" y="78" width="10" height="22" fill={STROKE} />
      {/* windows */}
      <rect x="161" y="125" width="16" height="18" fill="#161616" rx="2" />
      <rect x="183" y="125" width="16" height="18" fill="#161616" rx="2" />
      {/* door */}
      <rect x="166" y="162" width="28" height="38" fill="#161616" rx="14" />

      {/* Right-mid house */}
      <rect x="216" y="148" width="54" height="52" fill={STROKE} rx="1" />
      <polygon points="216,148 243,122 270,148" fill={STROKE} />
      {/* door */}
      <rect x="230" y="166" width="26" height="34" fill="#161616" rx="13" />

      {/* Far-right small house */}
      <rect x="278" y="162" width="44" height="38" fill={STROKE} rx="1" />
      <polygon points="278,162 300,140 322,162" fill={STROKE} />
      {/* door */}
      <rect x="291" y="178" width="18" height="22" fill="#161616" rx="9" />
    </svg>
  )
}

const SLIDES = [
  { id: 'manufacturing', number: '01', label: 'Flexibilita', title: 'Poskytování flexibility', description: 'Vypočítáme objem dostupné regulační energie na odběrném místě a provedeme její ocenění. Zároveň propojíme odběrné místo vybavené RTU, EMS nebo MaR s agregátorem/obchodníkem a tím umožníme získat další příjem pro zákazníka.', Svg: FactorySVG },
  { id: 've', number: '', label: '', title: '', description: '', Svg: () => null },
  { id: 'cre', number: '02', label: 'Virtuální Energetik', title: 'Predikce výroby a AI diagnostika', description: 'Meteorologické modely doplňujeme o data z přesných lokálních snímačů a tím získáváme přesnějších předpověď výroby FVE. Porovnáním modelů a skutečné výroby dokážeme diagnostikovat problém až na úrovni stringu.', Svg: FVESolarSVG },
  { id: 'datacenters', number: '03', label: 'Energetické Komunity', title: 'Energetické komunity', description: 'Prosumo cloud poskytuje informace ohledně dostupné energie v energetické komunitě, čímž umožnuje tuto energií v rámci komunity efektivně využít.', Svg: EnergCommunitySVG },
]

export { SLIDES }

/**
 * Traveling cube — single fixed-position cube that animates across hero + platform.
 *
 * Phase 1 (hero in view): cube sits at hero-right anchor, small, idle rotateY spin.
 * Phase 2 (transition): scrub from hero-right → screen-center, scale up, settle rotateY to 0,
 *                       background overlay cross-fades to dark.
 * Phase 3 (platform pinned): rotateY snaps between 4 faces driven by scroll;
 *                            dots are clickable to scroll to each snap point.
 */
const FACE_SECTION: ServiceSection[] = [
  'flexibility',
  'prediction',
  'prediction',
  'community',
]

export default function TravelingCube({
  current,
  onCurrentChange,
  scrollTo,
  onLearnMore,
}: {
  current: number
  onCurrentChange: (i: number) => void
  scrollTo: (target: number, opts?: object) => void
  onLearnMore: (section: ServiceSection) => void
}) {
  const cubeRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const cubeLayerRef = useRef<HTMLDivElement>(null)
  const idleTweenRef = useRef<gsap.core.Tween | null>(null)
  const faceIndexRef = useRef(0)
  const isAnimating3Ref = useRef(false)
  const isActive3Ref = useRef(false)
  const [visible, setVisible] = useState(true)
  const [isLarge, setIsLarge] = useState(false)

  useEffect(() => {
    let touchStartY = 0
    let wheelAccumulator = 0

    const handleWheel = (e: WheelEvent) => {
      if (!isActive3Ref.current) return

      // During animation: swallow the event entirely so neither the page nor
      // the accumulator advances.
      if (isAnimating3Ref.current) {
        e.stopImmediatePropagation()
        e.preventDefault()
        wheelAccumulator = 0
        return
      }

      wheelAccumulator += e.deltaY

      // Still accumulating intent — block the page scroll but don't rotate yet.
      if (Math.abs(wheelAccumulator) < 50) {
        e.stopImmediatePropagation()
        e.preventDefault()
        return
      }

      const dir = wheelAccumulator > 0 ? 1 : -1
      wheelAccumulator = 0
      const newIndex = faceIndexRef.current + dir

      // Scrolling back past face 0 — let Lenis handle the upward exit naturally.
      if (newIndex < 0) return

      // Scrolling past the last face — exit forward with a single smooth scroll.
      if (newIndex > SLIDES.length - 1) {
        e.stopImmediatePropagation()
        e.preventDefault()
        isActive3Ref.current = false
        const platformEl = document.getElementById('industries')
        if (platformEl) {
          const target = platformEl.offsetTop + platformEl.offsetHeight - window.innerHeight + 2
          scrollTo(target, { duration: 0.9 })
        }
        return
      }

      // Inner face rotation: consume the event so the page stays put.
      e.stopImmediatePropagation()
      e.preventDefault()

      const cube = cubeRef.current
      if (!cube) return
      faceIndexRef.current = newIndex
      isAnimating3Ref.current = true
      onCurrentChange(newIndex)
      gsap.to(cube, {
        rotateX: newIndex * 90,
        duration: 0.8,
        ease: 'power2.inOut',
        overwrite: 'auto',
        onComplete: () => { isAnimating3Ref.current = false },
      })
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (!isActive3Ref.current) return
      touchStartY = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isActive3Ref.current || isAnimating3Ref.current) return
      const deltaY = touchStartY - e.changedTouches[0].clientY
      if (Math.abs(deltaY) < 30) return
      const cube = cubeRef.current
      if (!cube) return
      const dir = deltaY > 0 ? 1 : -1
      const newIndex = faceIndexRef.current + dir
      if (newIndex < 0 || newIndex > SLIDES.length - 1) return
      faceIndexRef.current = newIndex
      isAnimating3Ref.current = true
      onCurrentChange(newIndex)
      gsap.to(cube, {
        rotateX: newIndex * 90,
        duration: 0.8,
        ease: 'power2.inOut',
        overwrite: 'auto',
        onComplete: () => { isAnimating3Ref.current = false },
      })
    }

    const ctx = gsap.context(() => {
      const cube = cubeRef.current!
      const wrap = wrapRef.current!
      const bg = bgRef.current!

      // ── Phase 1: idle spin on X axis (vertical barrel roll) ──────
      // Set perspective directly on the cube element so the 3D context
      // is self-contained and unaffected by the parent wrap transform.
      gsap.set(cube, { transformPerspective: 1600, rotateY: 0, rotateZ: 0 })

      idleTweenRef.current = gsap.to(cube, {
        rotateX: '+=360',
        duration: 22,
        ease: 'none',
        repeat: -1,
      })

      // ── Entrance — fade in with the rest of the hero content ─
      // Hero timeline: delay 0.5, last element lands ~1.7s. Cube fades in
      // at 1.6s to land in sync with the hero CTA buttons.
      gsap.fromTo(wrap,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out', delay: 1.6 }
      )

      // ── Visibility — hide only after scrolling past the platform section ──
      const heroEl = document.getElementById('top')
      const platformEl = document.getElementById('industries')
      if (!heroEl || !platformEl) return

      ScrollTrigger.create({
        trigger: platformEl,
        start: 'bottom bottom',
        onLeave: () => setVisible(false),
        onEnterBack: () => setVisible(true),
      })

      // ── Phase 2: transition scrub (hero leaving → platform entering) ──
      // Cube grows from 0.45 → 1 and the dark background overlay fades in.
      // rotateX is interpolated from the idle spin's last angle toward 0 so
      // Phase 3 starts on face 1 without any hard snap / visible jump.
      let capturedRotX = 0
      let isInTransition = false

      const transitionTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroEl,
          start: 'bottom bottom',
          endTrigger: platformEl,
          end: 'top top',
          scrub: 1.2,
          onEnter: () => {
            // Step 1 (zero-duration): capture exact rotateX and pause idle spin
            capturedRotX = gsap.getProperty(cube, 'rotateX') as number
            idleTweenRef.current?.pause()
            isInTransition = true
          },
          onEnterBack: () => {
            // Scrolling back up from platform into Phase 2.
            // Keep capturedRotX from onEnter so the backward scrub is the
            // exact mirror of the forward scrub (no extra 360° spin).
            idleTweenRef.current?.pause()
            isInTransition = true
          },
          onLeaveBack: () => {
            // Scrolled back above hero bottom — resume idle spin.
            // capturedRotX is the angle that was captured going forward, so
            // setting rotateX to it here puts the cube right where the idle
            // tween was paused — play() then resumes without any jump.
            isInTransition = false
            gsap.set(cube, { rotateX: capturedRotX })
            idleTweenRef.current?.play()
          },
          onUpdate(self) {
            if (!isInTransition) return
            // Scrub rotateX from the idle spin's captured angle → 0 in sync with scroll
            gsap.set(cube, { rotateX: capturedRotX * (1 - self.progress) })
          },
        },
      })

      transitionTl
        .fromTo(
          wrap,
          { '--cube-scale': 0.648 },
          { '--cube-scale': 1, ease: 'none' },
          0,
        )
        .fromTo(bg, { opacity: 0 }, { opacity: 1, ease: 'none' }, 0)

      // Mobile: scrub cube from bottom-peek position to centre during Phase 2.
      // scrub:1.2 already provides the "slower than scroll" lag naturally.
      if (window.matchMedia('(max-width: 768px)').matches) {
        const startTyPx = window.innerHeight * 0.5 - 40
        transitionTl.fromTo(
          wrap,
          { '--cube-ty': `${startTyPx}px` },
          { '--cube-ty': '0px', ease: 'none' },
          0,
        )
      }

      // ── Phase 3: state-tracking only — rotation driven by wheel/touch events ──
      ScrollTrigger.create({
        trigger: platformEl,
        start: 'top top',
        end: 'bottom bottom',
        onEnter: () => {
          isInTransition = false
          idleTweenRef.current?.pause()
          gsap.set(cube, { rotateY: 0, rotateZ: 0, rotateX: 0 })
          faceIndexRef.current = 0
          isActive3Ref.current = true
          onCurrentChange(0)
          setIsLarge(true)
        },
        onLeave: () => {
          isActive3Ref.current = false
          setIsLarge(false)
        },
        onEnterBack: () => {
          isActive3Ref.current = true
          setIsLarge(true)
        },
        onLeaveBack: () => {
          isActive3Ref.current = false
          setIsLarge(false)
          gsap.set(cube, { rotateX: 0, rotateY: 0, rotateZ: 0 })
          // Do NOT restart idle here — Phase 2 onEnterBack already paused it and
          // Phase 2 onLeaveBack will restart it cleanly once the scrub completes.
          faceIndexRef.current = 0
          onCurrentChange(0)
        },
      })
    }, stageRef)

    document.addEventListener('wheel', handleWheel, { capture: true, passive: false })
    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      ctx.revert()
      document.removeEventListener('wheel', handleWheel, { capture: true })
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [onCurrentChange, scrollTo])

  // Highlight active face with accent border (CSS toggle)
  useEffect(() => {
    if (!cubeRef.current) return
    const cube = cubeRef.current
    const faces = cube.querySelectorAll<HTMLElement>('.tc-face')

    // Sync cube rotation when current changes externally (e.g., dot click)
    if (isActive3Ref.current && faceIndexRef.current !== current) {
      faceIndexRef.current = current
      isAnimating3Ref.current = true
      gsap.to(cube, {
        rotateX: current * 90,
        duration: 0.8,
        ease: 'power2.inOut',
        overwrite: 'auto',
        onComplete: () => { isAnimating3Ref.current = false },
      })
    }

    faces.forEach((f, i) => f.classList.toggle('is-active', i === current))

    // Animate content of active face
    const activeFace = faces[current]
    if (!activeFace) return
    const art = activeFace.querySelector('.tc-face__art')
    const txt = activeFace.querySelectorAll<HTMLElement>('.tc-face__number, .tc-face__label, .tc-face__title, .tc-face__desc')
    if (art) gsap.fromTo(art, { scale: 0.9, opacity: 0.4 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.4)', overwrite: true })
    if (txt.length) gsap.fromTo(txt, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.06, overwrite: true })

    // Face 2 — animate VE panel elements
    if (current === 1) {
      const veEls = activeFace.querySelectorAll<HTMLElement>('.tc-face__ve-eyebrow, .tc-face__ve-heading, .tc-face__ve-desc, .tc-face__ve-cta, .tc-face__ve-stat')
      gsap.fromTo(veEls, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.08, overwrite: true })
    }
  }, [current])

  return (
    <>
      {/* Dark background overlay — z-index 5, below the ghost word (6) and cube (7) */}
      <div ref={stageRef} className={`tc-stage${!visible ? ' is-hidden' : ''}`} aria-hidden="true">
        <div ref={bgRef} className="tc-stage__bg" />
      </div>

      {/* Cube layer — z-index 7, above the ghost word */}
      <div ref={cubeLayerRef} className={`tc-cube-layer${!visible ? ' is-hidden' : ''}${isLarge ? ' tc-cube-layer--large' : ''}`} aria-hidden="true">
      <div ref={wrapRef} className="tc-stage__wrap">
        {/* Radial glow bloom behind the cube */}
        <div className="tc-stage__glow" />
        <div className="tc-stage__scene">
          <div ref={cubeRef} className="tc-stage__cube">
            {SLIDES.map((slide, i) => (
              <div key={slide.id} className={`tc-face tc-face--${i + 1}`}>
                {i === 1 ? (
                  // Face 2 — Virtuální Energetik
                  <>
                    <div className="tc-face__art">
                      <CRESVG />
                    </div>
                    <div className="tc-face__content">
                      <h3 className="tc-face__title h-card">Virtuální Energetik</h3>
                      <p className="tc-face__desc">Váš expert na energie, který neúnavně kontroluje, že vše ve vaší firmě funguje správně, hospodárně a efektivně. Hlídá spotřebu, smlouvy, investice i provozní rizika — 24 hodin denně, na datech, bez závislosti na jednom člověku.</p>
                      <button className="tc-face__cta" onClick={() => onLearnMore(FACE_SECTION[i])}>Vědět více</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="tc-face__art">
                      <slide.Svg />
                    </div>
                    <div className="tc-face__content">
                      <h3 className="tc-face__title h-card">{slide.title}</h3>
                      <p className="tc-face__desc">{slide.description}</p>
                      <button className="tc-face__cta" onClick={() => onLearnMore(FACE_SECTION[i])}>Vědět více</button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
