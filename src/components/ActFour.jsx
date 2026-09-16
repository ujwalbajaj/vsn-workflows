import { useState } from 'react'
import { ACTINTRO } from '../data/intro.js'
import { SOFT_HOMES } from '../data/act4.js'
import { Icon } from '../lib/icons.jsx'
import ScreenMain, { SCREEN_META } from './screens.jsx'

const SID_GROUPS = [
  ['Overview', ['dash']],
  ['Core work', ['orders', 'rfq', 'tasks', 'docs', 'pay', 'store']],
  ['Automation', ['handoff', 'sla', 'eta', 'exc', 'alert']],
  ['Access', ['access']]
]
const SID_LABEL = {
  dash: 'Dashboard', orders: 'Orders', rfq: 'RFQs & POs', tasks: 'Tasks', docs: 'Documents', pay: 'Payments', store: 'Inventory & QC',
  handoff: 'Task Handoff', sla: 'SLA Escalations', eta: 'ETA Tracker', exc: 'Exception Queue', alert: 'Alerts', access: 'Access & Permissions'
}

export const VIEW_ROLES = {
  mgmt: { label: 'Management', hint: 'control tower — sees every lane, decides only exceptions' },
  dept: { label: 'Department Head', hint: 'their lane plus every handoff that lands in it' },
  emp: { label: 'Employee', hint: 'only the tasks assigned to this person' }
}
export const VIEW_SIDS = {
  mgmt: ['dash', 'orders', 'rfq', 'tasks', 'docs', 'pay', 'store', 'handoff', 'sla', 'eta', 'exc', 'alert', 'access'],
  dept: ['orders', 'rfq', 'tasks', 'docs', 'pay', 'store', 'handoff', 'sla', 'eta', 'exc', 'alert', 'access'],
  emp: ['dash', 'tasks', 'handoff', 'sla', 'eta', 'alert', 'docs', 'access']
}
const EMP_LBL = { sla: 'My SLA clocks', alert: 'My alerts', handoff: 'My handoffs', tasks: 'My tasks', eta: 'My ETA updates', docs: 'My documents', dash: 'My Work' }
const fallbackSid = (view, sid) => (VIEW_SIDS[view] || VIEW_SIDS.mgmt).includes(sid) ? sid : VIEW_SIDS[view][0] || 'dash'
const metaOf = s => SCREEN_META[s] || SCREEN_META.dash

function Win({ sid, setSid, label, setLabel, onSub, view, onView }) {
  const meta = metaOf(sid)
  const role = VIEW_ROLES[view] || VIEW_ROLES.mgmt
  return (
    <div className="win">
      <div className="winbar">
        <span className="dot r"></span><span className="dot y"></span><span className="dot g"></span>
        <span className="ut">VSN ERP — Workspace</span>
        <div className="wintools">
          <div className="winsearch"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>search orders, RFQs, docs…</div>
          <span className="winlic" id="winSeat" title={role.hint}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l9 4.9v10.2L12 22l-9-4.9V6.9z" /></svg>{role.label} ▾</span>
          <span className="winbell"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg><i className="dotc pulse"></i></span>
        </div>
      </div>
      <div className="winbody">
        <div className="sidebar">
          {SID_GROUPS.filter(g => g[1].some(item => (VIEW_SIDS[view] || VIEW_SIDS.mgmt).includes(item))).map(g => (
            <div key={g[0]}>
              <div className="sidegroup">{g[0]}</div>
              {g[1].filter(item => (VIEW_SIDS[view] || VIEW_SIDS.mgmt).includes(item)).map(item => (
                <div key={item} className={'sideitem' + (sid === item ? ' on' : '') + (item === 'alert' ? ' alert' : '')} data-sid={item} onClick={() => { setSid(item); setLabel(view === 'emp' && EMP_LBL[item] ? EMP_LBL[item] : metaOf(item).sub) }}>
                  <span className="e_item">{view === 'emp' && EMP_LBL[item] ? EMP_LBL[item] : SID_LABEL[item]}</span>{item === 'alert' ? <span className="adot pulse"></span> : null}
                </div>
              ))}
            </div>
          ))}
          {!role.hint ? null : <div className="sidenote">{role.hint}</div>}
        </div>
        <div className="ws">
          <div className="toolbar">
            <span className="crumb" id="a4Crumb">Workspace / {SID_LABEL[sid] || sid}</span>
            <span className="scs" id="a4Sub">{label}</span>
            <div className="seatsw" id="seatSw" title="Switch the seat — the workspace and dashboard follow the role">
              {Object.entries(VIEW_ROLES).map(([k, v]) => (
                <button key={k} className={'seatbtn' + (view === k ? ' on' : '')} data-view={k} onClick={() => onView(k)}>{v.label}</button>
              ))}
            </div>
          </div>
          <div id="a4Screen"><ScreenMain id={sid} view={view} onOpen={s => { setSid(s); setLabel(metaOf(s).sub) }} onSub={onSub} setLabel={setLabel} /></div>
        </div>
      </div>
    </div>
  )
}

function Homes({ setSid }) {
  return (
    <div className="autohomes" id="a4Homes">
      {SOFT_HOMES.map(m => (
        <div key={m.k} className="ahome" data-sid={m.sid} title="Click to open this screen" onClick={() => setSid(m.sid)}>
          <div className="ah"><span className="aic" style={{ background: 'var(--erp)' }}><Icon name={m.ic} size={15} /></span>
            <div><b>{m.t}</b><span>{m.wf.toUpperCase()} · maps to Act 03</span></div></div>
          <div className="ad">{m.d}</div>
          <div className="ap"><span className="astat run">● in the offer</span><span className="astat draft">● click to open →</span></div>
        </div>
      ))}
    </div>
  )
}

export default function ActFour({ sub, onSubTab, onOpen, sid, onSid, on, view, onView }) {
  const safeSid = fallbackSid(view, sid)
  const [label, setLabel] = useState(() => metaOf(safeSid).sub)
  const meta = metaOf(safeSid)
  const onViewSeat = v => {
    if (onView) onView(v)
    if (safeSid === 'dash') setLabel(v === 'emp'
      ? 'Employee view — operational workload · my work · assigned records · deadlines · follow-ups'
      : 'Manager view — every lane on one screen. Click into any area.')
  }
  return (
    <div className={'act' + (on ? ' on' : '')} data-slot="4" style={{ display: on ? 'flex' : 'none' }}>
      <div className="scrolly">
        <div className="softhero">
          <span className="k">Act 04 · The Software</span>
          <h1>What the ERP looks like — not just what it does.</h1>
          <div className="sub">Everything lives in <b>one screen module</b>. Sidebar, live order, the six automation homes and the permission map are all inside the same workspace — no department tabs, no role pickers. The honest part stays: <b>who can do what</b>, marks that came straight from your rules.</div>
          <div className="pibadges"><span className="pib">1 screen module</span><span className="pib">6 automation homes embedded</span><span className="pib">all departments on it</span><span className="pib">✓ can · ✕ not allowed · ◆ decides</span></div>
          <div className="ghost"></div>
        </div>

        <div className="sect"><span className="sbar"></span><h2>The screen everyone opens — one module, all departments</h2>
          <div className="ssub">Sidebar, live order, and the automation homes all in one workspace. <b>Switch the seat in the top bar</b> (Management / Department Head / Employee) and click any home to open that screen — the same customer trail you watched in Act 01.</div></div>
        <Win sid={safeSid} setSid={s => { onSid(s); setLabel(metaOf(s).sub) }} label={label} setLabel={setLabel} view={view} onView={onViewSeat} />
        <div className="sect"><span className="sbar"></span><h2>Six automation homes are embedded in that screen</h2>
          <div className="ssub">Each module from the offer gets a living home in the sidebar. <b>Click any home to open its screen</b> — the workspace above switches to it instantly. They map one-to-one to the workflows in Act 03.</div></div>
        <Homes setSid={s => { onSid(s); setLabel(metaOf(s).sub) }} />
      </div>
    </div>
  )
}