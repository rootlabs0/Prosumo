import { useRef, useEffect } from 'react'
import './ProsumoArchitectureDiagram.css'
import { useLang } from '../context/LangContext'
import { translations } from '../i18n/translations'

const col1Devices = ['Elektroměr', 'PV invertor', 'BESS', 'EV charger', 'Heat pump', 'Solární radiace']
const col2Devices = ['Elektroměr', 'PV invertor']
const col3Devices = ['Elektroměr', 'BESS']
const col4Devices = ['Heat pump']

export default function ProsumoArchitectureDiagram() {
  const { lang } = useLang()
  const T = translations.diagram
  
  const controllerCols = [
    { label: T.location2[lang], controller: 'RTU', devices: col2Devices },
    { label: T.location3[lang], controller: 'EMS', devices: col3Devices },
    { label: T.location4[lang], controller: 'MaR', devices: col4Devices },
  ]

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('pdiag--visible')
          io.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div className="pdiag" ref={ref}>
      {/* Cloud box */}
      <div className="pdiag__cloud-wrap">
        <div className="pdiag__cloud">
          <div className="pdiag__cloud-title">PROSUMO.cloud</div>
          <div className="pdiag__cloud-sub">{T.cloudSub[lang]}</div>
        </div>
      </div>

      {/* Vertical stem from cloud down to branch */}
      <div className="pdiag__stem-wrap">
        <div className="pdiag__stem" />
      </div>

      {/* 4 Columns — the ::before draws the horizontal branch line */}
      <div className="pdiag__columns">

        {/* Column 1 — EnergoStation */}
        <div className="pdiag__col" style={{ '--col-index': 0 } as React.CSSProperties}>
          <div className="pdiag__col-label">{T.location1[lang]}</div>
          <div className="pdiag__node pdiag__node--energo">
            <span className="pdiag__node-title">{T.energoTitle[lang]}</span>
            <span className="pdiag__node-note">{T.energoNote[lang]}</span>
          </div>
          <div className="pdiag__vline" />
          <div className="pdiag__devices">
            {col1Devices.map(d => (
              <div key={d} className="pdiag__device">{d}</div>
            ))}
          </div>
          <div className="pdiag__col-footer">{T.gatewayPart[lang]}</div>
        </div>

        {/* Columns 2–4 */}
        {controllerCols.map(({ label, controller, devices }, i) => (
          <div key={label} className="pdiag__col" style={{ '--col-index': i + 1 } as React.CSSProperties}>
            <div className="pdiag__col-label">{label}</div>
            <div className="pdiag__node pdiag__node--prosumo">
              <span className="pdiag__node-title">{T.gatewayTitle[lang]}</span>
            </div>
            <div className="pdiag__modbus-row">
              <span>{T.modbus[lang]}</span>
              <span className="pdiag__modbus-sep">|</span>
              <span>{T.tcp[lang]}</span>
            </div>
            <div className="pdiag__node pdiag__node--controller">
              <span className="pdiag__node-title">{controller}</span>
              <span className="pdiag__node-note">{T.controlsDevices[lang]}</span>
            </div>
            <div className="pdiag__vline" />
            <div className="pdiag__devices">
              {devices.map(d => (
                <div key={d} className="pdiag__device">{d}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="pdiag__legend">
        <div className="pdiag__legend-title">{T.legend[lang]}</div>
        <div className="pdiag__legend-item">
          <span className="pdiag__dot pdiag__dot--orange" />
          <span>{T.legendCloud[lang]}</span>
        </div>
        <div className="pdiag__legend-item">
          <span className="pdiag__dot pdiag__dot--salmon" />
          <span>{T.legendEnergo[lang]}</span>
        </div>
        <div className="pdiag__legend-item">
          <span className="pdiag__dot pdiag__dot--black" />
          <span>{T.legendProsumoBox[lang]}</span>
        </div>
        <div className="pdiag__legend-item">
          <span className="pdiag__dot pdiag__dot--dark" />
          <div className="pdiag__legend-item-body">
            <span>{T.legendController[lang]}</span>
            <span className="pdiag__legend-protocol">{T.legendMQTT[lang]}</span>
          </div>
        </div>
        <div className="pdiag__legend-item">
          <span className="pdiag__dot pdiag__dot--light" />
          <div className="pdiag__legend-item-body">
            <span>{T.legendDevices[lang]}</span>
            <span className="pdiag__legend-protocol">{T.legendModbus[lang]}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
