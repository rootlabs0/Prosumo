import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './TravelingCube.css'

gsap.registerPlugin(ScrollTrigger)

const STROKE = 'rgba(255,255,255,0.85)'
const FAINT = 'rgba(255,255,255,0.22)'

function FactorySVG() {
  return (
    <svg viewBox="0 0 360 240" role="img" aria-label="Factory cross-section">
      <line x1="20" y1="200" x2="340" y2="200" stroke={STROKE} strokeWidth="1" />
      <path d="M40 200 L40 130 L120 130 L120 100 L200 100 L200 130 L320 130 L320 200 Z" fill="none" stroke={STROKE} strokeWidth="1" />
      <path d="M40 130 L60 110 L80 130 L100 110 L120 130" fill="none" stroke={STROKE} strokeWidth="1" />
      <path d="M200 130 L220 110 L240 130 L260 110 L280 130 L300 110 L320 130" fill="none" stroke={STROKE} strokeWidth="1" />
      <rect x="140" y="60" width="20" height="40" fill="none" stroke={STROKE} strokeWidth="1" />
      <circle cx="80" cy="190" r="3" fill="none" stroke={STROKE} strokeWidth="1" />
      <circle cx="160" cy="190" r="3" fill="none" stroke={STROKE} strokeWidth="1" />
      <circle cx="240" cy="190" r="3" fill="none" stroke={STROKE} strokeWidth="1" />
    </svg>
  )
}

function CRESVG() {
  return (
    <svg viewBox="0 0 360 240" role="img" aria-label="Office building cross-section">
      <line x1="20" y1="220" x2="340" y2="220" stroke={STROKE} strokeWidth="1" />
      <rect x="120" y="40" width="120" height="180" fill="none" stroke={STROKE} strokeWidth="1" />
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={i} x1="120" y1={60 + i * 20} x2="240" y2={60 + i * 20} stroke={FAINT} strokeWidth="0.75" />
      ))}
      <rect x="60" y="140" width="60" height="80" fill="none" stroke={STROKE} strokeWidth="1" />
      <rect x="240" y="120" width="60" height="100" fill="none" stroke={STROKE} strokeWidth="1" />
      <rect x="150" y="28" width="60" height="12" fill="none" stroke={STROKE} strokeWidth="1" />
    </svg>
  )
}

function DataCenterSVG() {
  return (
    <svg viewBox="0 0 360 240" role="img" aria-label="Server rack isometric">
      <path d="M60 200 L180 240 L300 200 L180 160 Z" fill="none" stroke={FAINT} strokeWidth="1" />
      <path d="M110 180 L160 200 L160 110 L110 90 Z" fill="none" stroke={STROKE} strokeWidth="1" />
      <path d="M110 90 L160 110 L210 90 L160 70 Z" fill="none" stroke={STROKE} strokeWidth="1" />
      <path d="M210 90 L210 180 L160 200 L160 110 Z" fill="none" stroke={STROKE} strokeWidth="1" />
      <path d="M100 80 L100 60 L260 60 L260 80" fill="none" stroke="#ff5522" strokeWidth="0.75" strokeDasharray="3 3" />
      <circle cx="180" cy="60" r="2.5" fill="#ff5522" />
    </svg>
  )
}

const SLIDES = [
  { id: 'manufacturing', number: '01', label: 'Flexibilita', title: 'Poskytování flexibility', description: 'Prosumo optimalizuje spotřebu energie na výrobních linkách, kompresorech a klimatizaci — snižuje náklady na elektřinu bez dopadu na výrobu.', Svg: FactorySVG },
  { id: 've', number: '', label: '', title: '', description: '', Svg: () => null },
  { id: 'cre', number: '02', label: 'Virtuální Energetik', title: 'Predikce výroby a AI diagnostika', description: 'Od kancelářských věží po obchodní komplexy, Prosumo rozvrhuje zátěže budov dle cen SPOT a přináší měřitelné úspory na každém účtu za energii.', Svg: CRESVG },
  { id: 'datacenters', number: '03', label: 'Energetické Komunity', title: 'Energetické komunity', description: 'Prosumo poskytuje prediktivní řízení potřebné pro provoz hyperscale a kolokačních datových center na maximální efektivitu — s plným přehledem o PUE, zátěži a tarifu.', Svg: DataCenterSVG },
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
export default function TravelingCube({
  current,
  onCurrentChange,
}: {
  current: number
  onCurrentChange: (i: number) => void
}) {
  const cubeRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const cubeLayerRef = useRef<HTMLDivElement>(null)
  const idleTweenRef = useRef<gsap.core.Tween | null>(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
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
            // Scrolling back up from platform into Phase 2 — re-engage rotation
            // so the cube barrel-rolls as it shrinks back toward the hero anchor.
            // capturedRotX is the angle at progress=0 (hero side); set it to a
            // full rotation so the cube spins through 360° during the scrub.
            capturedRotX = 360
            idleTweenRef.current?.pause()
            isInTransition = true
          },
          onLeaveBack: () => {
            // Scrolled back above hero bottom — resume idle spin.
            // rotateX has been scrubbed back toward capturedRotX by the onUpdate,
            // so restore it fully to capturedRotX then let idle continue from there.
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

      // ── Phase 3: pinned platform — X snap for faces 1-4, then Y rotation reveals face 5 ──
      // Timeline: duration 4 units → progress 0–3 = rotateX, progress 3–4 = rotateY.
      // Snap points at [0, 0.25, 0.5, 0.75, 1] map to the 5 faces.
      const phase3Tl = gsap.timeline({
        scrollTrigger: {
          trigger: platformEl,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          snap: {
            snapTo: [0, 0.333, 0.667, 1],
            duration: { min: 0.2, max: 0.5 },
            ease: 'power2.inOut',
          },
          onEnter: () => {
            isInTransition = false
            idleTweenRef.current?.pause()
            gsap.set(cube, { rotateY: 0, rotateZ: 0 })
          },
          onLeaveBack: () => {
            gsap.set(cube, { rotateX: 0, rotateY: 0, rotateZ: 0 })
            idleTweenRef.current?.restart()
            onCurrentChange(0)
          },
          onUpdate(self) {
            const idx = Math.min(3, Math.round(self.progress * 3))
            onCurrentChange(idx)
          },
        },
      })

      phase3Tl
        // X rotation 0 → 270 covers all 4 faces (3 × 90° steps)
        .to(cube, { rotateX: 270, ease: 'none', duration: 3 }, 0)
    }, stageRef)

    return () => ctx.revert()
  }, [onCurrentChange])

  // Highlight active face with accent border (CSS toggle)
  useEffect(() => {
    if (!cubeRef.current) return
    const faces = cubeRef.current.querySelectorAll<HTMLElement>('.tc-face')
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
      <div ref={cubeLayerRef} className={`tc-cube-layer${!visible ? ' is-hidden' : ''}`} aria-hidden="true">
      <div ref={wrapRef} className="tc-stage__wrap">
        {/* Radial glow bloom behind the cube */}
        <div className="tc-stage__glow" />
        <div className="tc-stage__scene">
          <div ref={cubeRef} className="tc-stage__cube">
            {SLIDES.map((slide, i) => (
              <div key={slide.id} className={`tc-face tc-face--${i + 1}`}>
                {i === 1 ? (
                  // Face 2 — orange VirtualniEnergetik panel
                  <div className="tc-face__ve">
                    <div className="tc-face__ve-left">
                      <p className="tc-face__ve-eyebrow">Náš přístup</p>
                      <h3 className="tc-face__ve-heading">Virtuální<br />energetik</h3>
                      <p className="tc-face__ve-desc">
                        Vypočítáváme dostupnou flexibilitu na každém odběrném místě,
                        oceníme ji a propojíme operátory přímo s agregátory —
                        přeměňujeme volatilitu sítě na příležitost k výnosu.
                      </p>
                      <a href="#cta" className="tc-face__ve-cta">Zjistit více →</a>
                    </div>
                    <div className="tc-face__ve-right">
                      <div className="tc-face__ve-stat">
                        <p className="tc-face__ve-stat-value">38%</p>
                        <p className="tc-face__ve-stat-label">průměrná úspora nákladů na elektřinu</p>
                      </div>
                      <div className="tc-face__ve-stat">
                        <p className="tc-face__ve-stat-value">2&thinsp;400+</p>
                        <p className="tc-face__ve-stat-label">nasazených odběrných míst</p>
                      </div>
                      <div className="tc-face__ve-stat">
                        <p className="tc-face__ve-stat-value">&lt;15 min</p>
                        <p className="tc-face__ve-stat-label">od zapojení k první aktivní flexibilitě</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="tc-face__art">
                      <slide.Svg />
                    </div>
                    <div className="tc-face__content">
                      <p className="tc-face__number eyebrow">{slide.number} / 03</p>
                      <p className="tc-face__label eyebrow">{slide.label}</p>
                      <h3 className="tc-face__title h-card">{slide.title}</h3>
                      <p className="tc-face__desc">{slide.description}</p>
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
