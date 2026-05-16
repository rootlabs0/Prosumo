import './Services.css'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../context/LangContext'
import { translations } from '../i18n/translations'

gsap.registerPlugin(ScrollTrigger)

/* ──────────────────────────────────────────────────────────────────
   SERVICES DATA (extracted from former MagicBento cardData)
─────────────────────────────────────────────────────────────────── */

type Service = {
  id: string
  label: string
  title: string
  desc: string
}

const SERVICES: Service[] = [
  { id: '01', label: 'Solar Forecasting',   title: 'PV Production Forecasting',  desc: 'Accurate models based on meteorological data predict photovoltaic output up to tens of hours ahead.' },
  { id: '02', label: 'PV Diagnostics',      title: 'PV Operations Diagnostics',  desc: 'Detects deviations in AC/DC output for early fault detection at string or inverter level.' },
  { id: '03', label: 'SPOT Optimization',   title: 'SPOT Market Optimization',   desc: 'Algorithms schedule device operation according to the SPOT market price curve.' },
  { id: '04', label: 'Balance Forecasting', title: 'Balance Point Forecasting',  desc: 'A 24-hour ahead consumption and supply model helps reduce imbalance costs.' },
  { id: '05', label: 'Energy Efficiency',   title: 'Energy Efficiency Audit',    desc: 'Dynamic management of consumption, generation, and storage minimizes forecast deviation.' },
  { id: '06', label: 'Flex Forecasting',    title: 'Flexibility Forecasting',    desc: 'Calculates available regulatory energy volume that can be offered to aggregators.' },
  { id: '07', label: 'Flex Valuation',      title: 'Flexibility Valuation',      desc: 'Economic assessment of regulatory energy provision for real-time decision-making.' },
  { id: '08', label: 'Group Sharing',       title: 'Sharing Group Optimization', desc: 'Manages energy community consumption and generation to maximise self-consumption.' },
]

type Block = Service & {
  x: number
  y: string
  w: number
  h: number
  textSide: 'left' | 'right' | 'bottom' | 'top'
  lines: string[]         // each line for the wipe effect; wrap a word in *asterisks* to highlight it orange
  mode: 'wipe' | 'desc'  // 'wipe' = big heading only, 'desc' = wipe title + body text
  textSize?: 'sm' | 'md' | 'lg'  // controls heading size, default 'md'
  textAlign?: 'left' | 'right' | 'center'  // text alignment, default 'left'
  bodyText?: string
}

const BLOCKS: Block[] = [
  { ...SERVICES[0], x: 460,  y: '64%', w: 120, h: 120, textSide: 'right',  mode: 'desc', textSize: 'sm',
    lines: ['Solar', 'Forecasting'],
    bodyText: 'Predict PV output up to 48 hours ahead using high-resolution meteorological models.' },
  { ...SERVICES[1], x: 860,  y: '26%', w: 280, h: 340, textSide: 'right',  mode: 'wipe', textSize: 'lg',
    lines: ['*Detect faults*', 'before they', 'cost you.'],
    bodyText: 'Detects deviations in AC/DC output for early fault detection at string or inverter level.' },
  { ...SERVICES[2], x: 1380, y: '56%', w: 140, h: 100, textSide: 'bottom', mode: 'desc', textSize: 'sm',
    lines: ['SPOT Market', 'Optimization'],
    bodyText: 'Schedule device operation automatically around the cheapest hours of the day.' },
  { ...SERVICES[3], x: 1640, y: '30%', w: 100, h: 140, textSide: 'right',  mode: 'wipe', textSize: 'md',
    lines: ['*Balance* your', 'grid 24 hours', 'ahead.'],
    bodyText: 'A 24-hour ahead consumption and supply model helps reduce imbalance costs.' },
  { ...SERVICES[4], x: 1900, y: '50%', w: 260, h: 300, textSide: 'right',   mode: 'wipe', textSize: 'lg', textAlign: 'left',
    lines: ['*Maximise* every', 'kilowatt your', 'assets produce.'],
    bodyText: 'Dynamic management of consumption, generation, and storage minimizes forecast deviation.' },
  { ...SERVICES[5], x: 2320, y: '24%', w: 110, h: 110, textSide: 'right',  mode: 'desc', textSize: 'sm', 
    lines: ['Flexibility', 'Forecasting'],
    bodyText: 'Calculates available regulatory energy volume that can be offered to aggregators.' },
  { ...SERVICES[6], x: 2720, y: '57%', w: 90, h: 130,  textSide: 'left',   mode: 'desc', textSize: 'sm', textAlign: 'right',
    lines: ['Flexibility', 'Valuation'],
    bodyText: 'Economic assessment of regulatory energy provision for real-time decision-making.' },
  { ...SERVICES[7], x: 2840, y: '27%', w: 320, h: 220, textSide: 'right', mode: 'wipe', textSize: 'lg',
    lines: ['*Share energy*', 'smarter across', 'your community.'],
    bodyText: 'Manages energy community consumption and generation to maximise self-consumption.' },
]

const STRIP_WIDTH = 3800

// Render a line string, turning *word* into an orange <em>
function renderLine(line: string) {
  const parts = line.split(/\*([^*]+)\*/)
  return parts.map((part, i) =>
    i % 2 === 1 ? <em key={i} className="svc-hl">{part}</em> : part
  )
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const stickyRef  = useRef<HTMLDivElement>(null)
  const stripRef   = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const { lang } = useLang()
  const T = translations.services

  const [isMobile, setIsMobile] = useState<boolean>(
    () => typeof window !== 'undefined' && window.innerWidth <= 900,
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)')
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useLayoutEffect(() => {
    if (isMobile) return
    const section = sectionRef.current
    const sticky  = stickyRef.current
    const strip   = stripRef.current
    const heading = headingRef.current
    if (!section || !sticky || !strip || !heading) return

    const ctx = gsap.context(() => {
      const distance = STRIP_WIDTH - window.innerWidth

      const mainTween = gsap.to(strip, {
        x: () => -(STRIP_WIDTH - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance}`,
          pin: sticky,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      gsap.to(heading, {
        x: () => -(STRIP_WIDTH - window.innerWidth) * 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance}`,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      })

      gsap.from('.svc-block', {
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
          onEnter: () => {
            // Only add is-visible to first 2 blocks; others managed by individual ScrollTriggers
            Array.from(strip.querySelectorAll<HTMLElement>('.svc-block')).slice(0, 2).forEach(el => el.classList.add('is-visible'))
          },
          onLeaveBack: () => {
            Array.from(strip.querySelectorAll<HTMLElement>('.svc-block')).slice(0, 2).forEach(el => el.classList.remove('is-visible'))
          },
        },
      })

      // Trigger wipe per-block as each scrolls into horizontal view (blocks 3+)
      Array.from(strip.querySelectorAll<HTMLElement>('.svc-block')).slice(2).forEach(el => {
        ScrollTrigger.create({
          trigger: el,
          containerAnimation: mainTween,
          start: 'left 85%',
          toggleActions: 'play none none reverse',
          onEnter: () => el.classList.add('is-visible'),
          onLeaveBack: () => el.classList.remove('is-visible'),
        })
      })
    }, section)

    return () => ctx.revert()
  }, [isMobile])

  /* ── Mobile: native horizontal swipe ── */
  if (isMobile) {
    return (
      <section id="services" className="services services--mobile">
        <h2 className="services__heading services__heading--mobile">
          {T.heading[lang][0]}<br />{T.heading[lang][1]}<br />{T.heading[lang][2]}
        </h2>
        <div className="services__mobile-scroll">
          {BLOCKS.map((block, i) => {
            const bt = T.blocks[i]
            const lines = bt ? bt.lines[lang] : block.lines
            const bodyText = bt ? bt.bodyText[lang] : block.bodyText
            return (
              <div key={block.id} className="svc-block-mobile is-visible">
                <div className="svc-block-mobile__rect" />
                <div className="svc-block-mobile__info" style={{ textAlign: block.textAlign ?? 'left' }}>
                  <div className="svc-block__lines">
                    {lines.map((line, li) => (
                      <div key={li} className={`svc-block__line svc-block__line--${li + 1}`}>
                        <span>{renderLine(line)}</span>
                      </div>
                    ))}
                  </div>
                  {bodyText && (
                    <p className="svc-block__body">{bodyText}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} id="services" className="services">
      <div ref={stickyRef} className="services__sticky">
        <div ref={stripRef} className="services__strip" style={{ width: STRIP_WIDTH }}>
          <h2 ref={headingRef} className="services__heading">
            {T.heading[lang][0]}<br />{T.heading[lang][1]}<br />{T.heading[lang][2]}
          </h2>

          {BLOCKS.map((block, i) => {
            const bt = T.blocks[i]
            const lines = bt ? bt.lines[lang] : block.lines
            const bodyText = bt ? bt.bodyText[lang] : block.bodyText
            return (
              <div
                key={block.id}
                className={`svc-block svc-block--${block.textSide}`}
                style={{ left: block.x, top: block.y, width: block.w, height: block.h }}
              >
                <div className="svc-block__rect" />
                <div className={`svc-block__info svc-block__info--${block.mode} svc-block__info--${block.textSize ?? 'md'}`} style={{ textAlign: block.textAlign ?? 'left' }}>
                  <div className="svc-block__lines" style={block.id === '07' ? { marginLeft: '150px' } : undefined}>
                    {lines.map((line, li) => (
                      <div key={li} className={`svc-block__line svc-block__line--${li + 1}`}>
                        <span>{renderLine(line)}</span>
                      </div>
                    ))}
                  </div>
                  {bodyText && (
                    <p className="svc-block__body">{bodyText}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
