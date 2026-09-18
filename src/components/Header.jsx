const ACTS = [
  { a: 1, color: '#3b82f6', label: '01', t: 'The Transaction', small: 'how it runs today' },
  { a: 2, color: '#8b5cf6', label: '02', t: 'The System', small: '22 workflows · 198 nodes' },
  { a: 3, color: '#6366f1', label: '03', t: 'Automation', small: 'the workflows we sell' },
  { a: 4, color: '#0d9488', label: '04', t: 'The Software', small: 'one module · who can do what' }
]

export default function Header({ act, onAct, onLegend, onHelp, onKeys }) {
  return (
    <div className="top">
      <div className="brand">
        <div className="logo">VSN</div>
        <div>
          <div className="t1">VSN ERP — Client Presentation</div>
          <div className="t2">One transaction · One timeline · One promise</div>
        </div>
      </div>
      <div className="acts" id="acts" role="tablist">
        {ACTS.map(x => (
          <button key={x.a} className={'acttab' + (act === x.a ? ' on' : '')} data-a={x.a} onClick={() => onAct(x.a)}>
            <span className="ac" style={{ background: x.color }}>{x.label}</span>
            <span>{x.t}<span className="small">{x.small}</span></span>
          </button>
        ))}
      </div>
      <div className="chips">
        <span className="chip">MPN-24LC256 · 1000 pcs</span>
        <span className="chip">Deadline 12d</span>
      </div>
    </div>
  )
}