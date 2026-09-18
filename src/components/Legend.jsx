import { D } from '../data/departments.js'

const DEPTS = ['CUST', 'SALES', 'PUR', 'FIN', 'LOG', 'STORE', 'MGMT', 'ERP']

const STYLE_TRAIL = [
  { sw: '#3b82f6', swLabel: '●', b: 'Now running', d: 'The step the order is on — bright ring, details open' },
  { sw: '#9fb3c8', swLabel: '✓', b: 'Done', d: 'Step completed in this run — faded mark' },
  { sw: '#6366f1', swLabel: '◆', b: 'Decision', d: 'A choice the rules make — all candidate paths shown' },
  { sw: '#64748b', swLabel: '∥', b: 'Parallel', d: 'Two lanes run at the same time' },
  { sw: '#4f46e5', swLabel: '⇄', b: 'Handoff', d: 'Work passes between departments' },
  { sw: '#dc2626', swLabel: 'TBD', b: 'Not yet confirmed', d: 'Left open — marked, never invented' }
]
const STYLE_SYS = [
  { sw: '#4338ca', sm: true, b: 'Executive', d: 'The whole business in one screen' },
  { sw: '#0284c7', sm: true, b: 'Core workflows', d: 'How the business actually runs' },
  { sw: '#6366f1', sm: true, b: 'Automation', d: 'Modules we can switch on for you' },
  { sw: '#0d9488', sm: true, b: 'Strategic', d: 'The transformation view' }
]
const STYLE_OFFER = [
  { sw: '#6366f1', swLabel: '⇄', b: 'Automation modules', d: '6 proven modules — click any to open it' },
  { sw: '#4f46e5', swLabel: '✕→✓', b: 'Before vs after', d: 'The same trade, manual vs automated' }
]
const STYLE_SOFT = [
  { sw: '#0f766e', swLabel: '1–4', b: 'Sub-tabs', d: 'The screen · by department · by role · who can do what' },
  { sw: '#16a34a', swLabel: '✓', b: 'Can do', d: 'That role is allowed to perform it' },
  { sw: '#d97706', swLabel: '◆', b: 'Decides', d: 'The owner of the rule — theirs is the final call' },
  { sw: '#c6cfd9', swLabel: '✕', b: 'Not allowed', d: 'Out of that role\'s scope' }
]

function Sw({ sw, label, sm }) {
  return <span className={'sw' + (sm ? ' sm' : '')} style={{ background: sw }}>{label}</span>
}

export default function Legend({ open, onClose }) {
  if (!open) return null
  return (
    <div id="lgOverlay" className="on" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div id="lg" role="dialog" aria-modal="true" aria-label="How to read this page">
        <div className="lgHead">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l9 4.9v10.2L12 22l-9-4.9V6.9z"/><path d="M12 22V12"/><path d="M6.5 8v3"/></svg>
          <h3>How to read this page</h3>
          <button className="x" onClick={onClose} aria-label="Close legend">✕</button>
        </div>
        <div className="lgBody">
          <div className="lgSec"><h4>Departments — every colour has an owner</h4>
            <div className="lggrid">
              {DEPTS.map(k => {
                const d = D[k] || D.ERP
                return <span className="lgi" key={k}><span className="sw" style={{ background: d.col }}>{d.label[0]}</span><span><b>{d.label}</b></span></span>
              })}
            </div>
          </div>
          <div className="lgSec"><h4>On the trail (Act 01)</h4>
            <div className="lggrid">
              {STYLE_TRAIL.map(x => <span className="lgi" key={x.b}><Sw sw={x.sw} label={x.swLabel} /><span><b>{x.b}</b>{x.d}</span></span>)}
            </div>
          </div>
          <div className="lgSec"><h4>In the system (Act 02)</h4>
            <div className="lggrid">
              {STYLE_SYS.map(x => <span className="lgi" key={x.b}><Sw sw={x.sw} sm={x.sm} /><span><b>{x.b}</b>{x.d}</span></span>)}
            </div>
          </div>
          <div className="lgSec"><h4>The offer (Act 03)</h4>
            <div className="lggrid">
              {STYLE_OFFER.map(x => <span className="lgi" key={x.b}><Sw sw={x.sw} label={x.swLabel} /><span><b>{x.b}</b>{x.d}</span></span>)}
            </div>
          </div>
          <div className="lgSec"><h4>The software (Act 04)</h4>
            <div className="lggrid">
              {STYLE_SOFT.map(x => <span className="lgi" key={x.b}><Sw sw={x.sw} label={x.swLabel} /><span><b>{x.b}</b>{x.d}</span></span>)}
            </div>
          </div>
          <div className="lgNote"><b>Honest by construction:</b> this whole page traces back to your own requirements &amp; notes — every step cites its rule ID. Anything your team hasn't confirmed stays <b>TBD — client validation required</b> (we never invent a rule to make the picture prettier).</div>
        </div>
      </div>
    </div>
  )
}