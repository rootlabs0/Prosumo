const STEPS = [
  {
    num: '01',
    title: 'Collect',
    desc: 'Hardware sensors gather real-time energy data',
  },
  {
    num: '02',
    title: 'Predict',
    desc: 'AI models forecast demand, generation, and grid state',
  },
  {
    num: '03',
    title: 'Optimize',
    desc: 'Algorithms dispatch energy assets to minimize cost & waste',
  },
]

function Arrow() {
  return (
    <svg className="flow__arrow" viewBox="0 0 40 12" aria-hidden>
      <line x1="0" y1="6" x2="34" y2="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M30,1 L38,6 L30,11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function EnergyFlowDiagram() {
  return (
    <div className="flow" role="list">
      {STEPS.map((s, i) => (
        <div key={s.num} className="flow__row">
          <div className="flow__step" role="listitem">
            <div className="flow__step-num mono">{s.num}</div>
            <div className="flow__step-title">{s.title}</div>
            <div className="flow__step-desc">{s.desc}</div>
          </div>
          {i < STEPS.length - 1 && <Arrow />}
        </div>
      ))}
    </div>
  )
}
