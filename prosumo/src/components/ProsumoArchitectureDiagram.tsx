import { useRef, useEffect } from 'react'
import './ProsumoArchitectureDiagram.css'

const col1Devices = ['Elektroměr', 'PV invertor', 'BESS', 'EV charger', 'Heat pump', 'Solární radiace']
const col2Devices = ['Elektroměr', 'PV invertor']
const col3Devices = ['Elektroměr', 'BESS']
const col4Devices = ['Heat pump']

const controllerCols = [
  { label: 'Odběrné místo 2', controller: 'RTU', devices: col2Devices },
  { label: 'Odběrné místo 3', controller: 'EMS', devices: col3Devices },
  { label: 'Odběrné místo 4', controller: 'MaR', devices: col4Devices },
]

export default function ProsumoArchitectureDiagram() {
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
          <div className="pdiag__cloud-sub">Predikce &nbsp;·&nbsp; Diagnostika &nbsp;·&nbsp; Optimalizace &nbsp;·&nbsp; Subagregace</div>
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
          <div className="pdiag__col-label">Odběrné místo 1</div>
          <div className="pdiag__node pdiag__node--energo">
            <span className="pdiag__node-title">EnergoStation<br />EMS</span>
            <span className="pdiag__node-note">RTU gateway integrováno</span>
          </div>
          <div className="pdiag__vline" />
          <div className="pdiag__devices">
            {col1Devices.map(d => (
              <div key={d} className="pdiag__device">{d}</div>
            ))}
          </div>
          <div className="pdiag__col-footer">Gateway součástí EMS</div>
        </div>

        {/* Columns 2–4 */}
        {controllerCols.map(({ label, controller, devices }, i) => (
          <div key={label} className="pdiag__col" style={{ '--col-index': i + 1 } as React.CSSProperties}>
            <div className="pdiag__col-label">{label}</div>
            <div className="pdiag__node pdiag__node--prosumo">
              <span className="pdiag__node-title">ProsumoBox<br />Gateway</span>
            </div>
            <div className="pdiag__modbus-row">
              <span>Modbus</span>
              <span className="pdiag__modbus-sep">|</span>
              <span>TCP</span>
            </div>
            <div className="pdiag__node pdiag__node--controller">
              <span className="pdiag__node-title">{controller}</span>
              <span className="pdiag__node-note">řídí zařízení</span>
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
        <div className="pdiag__legend-title">Legenda</div>
        <div className="pdiag__legend-item">
          <span className="pdiag__dot pdiag__dot--orange" />
          <span>PROSUMO.cloud — cloudové služby (predikce, optimalizace, diagnostika)</span>
        </div>
        <div className="pdiag__legend-item">
          <span className="pdiag__dot pdiag__dot--salmon" />
          <span>EnergoStation EMS — obsahuje gateway i RTU/MaR, přímé napojení na cloud</span>
        </div>
        <div className="pdiag__legend-item">
          <span className="pdiag__dot pdiag__dot--black" />
          <span>ProsumoBox — MQTT/Modbus TCP gateway pro připojení běžných RTU / EMS / MaR</span>
        </div>
        <div className="pdiag__legend-item">
          <span className="pdiag__dot pdiag__dot--dark" />
          <div className="pdiag__legend-item-body">
            <span>RTU / EMS / MaR — přímé řízení zařízení (PROSUMO toto neprovádí)</span>
            <span className="pdiag__legend-protocol">MQTT / HTTPS</span>
          </div>
        </div>
        <div className="pdiag__legend-item">
          <span className="pdiag__dot pdiag__dot--light" />
          <div className="pdiag__legend-item-body">
            <span>Zařízení — elektroměr, PV invertor, BESS, EV charger, heat pump, senzory</span>
            <span className="pdiag__legend-protocol">Modbus TCP / lokální sběrnice</span>
          </div>
        </div>
      </div>
    </div>
  )
}
