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
  const [query, setQuery] = useState('')
  const [notifOpen, setNotifOpen] = useState(false)

  const cycleSeat = () => {
    const roles = Object.keys(VIEW_ROLES)
    const nextIndex = (roles.indexOf(view) + 1) % roles.length
    if (onView) onView(roles[nextIndex])
  }

  const allowedSids = VIEW_SIDS[view] || VIEW_SIDS.mgmt
  const q = query.trim().toLowerCase()

  const NOTIFICATIONS = [
    { title: 'SLA Breach — QC Decision', time: '3 min ago', type: 'b-bad' },
    { title: 'Payment Threshold Ready', time: '21 min ago', type: 'b-warn' },
    { title: '2 Handoffs Completed Today', time: '1 h ago', type: 'b-ok' },
    { title: 'ETA Rewritten for SHIP-334', time: '2 h ago', type: 'b-mut' }
  ]

  return (
    <div className="win">
      <div className="winbar">
        <span className="dot r"></span><span className="dot y"></span><span className="dot g"></span>
        <span className="ut">VSN ERP — Workspace</span>
        <div className="wintools">
          <div className="winsearch">
            <Icon name="search" size={13} />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search workspace (PO, QC, RFQ)..."
              className="winsearch-input"
            />
            {query && <button className="clear-q" onClick={() => setQuery('')}>✕</button>}
          </div>
          <span className="winlic" id="winSeat" title={role.hint} onClick={cycleSeat}>
            <Icon name="users" size={13} />
            {role.label} ▾
          </span>
          <div className="notif-wrap" style={{ position: 'relative' }}>
            <span
              className={'winbell' + (notifOpen ? ' active' : '')}
              title="System Notifications"
              onClick={() => setNotifOpen(!notifOpen)}
            >
              <Icon name="bell" size={13} />
              <i className="dotc pulse"></i>
            </span>
            {notifOpen && (
              <div className="notif-popover">
                <div className="notif-head">
                  <b>Live Alerts Today</b>
                  <button onClick={() => setNotifOpen(false)}>✕</button>
                </div>
                <div className="notif-list">
                  {NOTIFICATIONS.map((n, i) => (
                    <div className="notif-item" key={i} onClick={() => { setSid('alert'); setNotifOpen(false); }}>
                      <Icon name="alert" size={12} />
                      <div className="notif-content">
                        <b>{n.title}</b>
                        <span>{n.time}</span>
                      </div>
                      <span className={'mbadge ' + n.type}>live</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="winbody">
        <div className="sidebar">
          {SID_GROUPS.filter(g =>
            g[1].some(item => allowedSids.includes(item) && (!q || SID_LABEL[item].toLowerCase().includes(q) || item.includes(q)))
          ).map(g => (
            <div key={g[0]}>
              <div className="sidegroup">{g[0]}</div>
              {g[1]
                .filter(item => allowedSids.includes(item) && (!q || SID_LABEL[item].toLowerCase().includes(q) || item.includes(q)))
                .map(item => (
                  <div
                    key={item}
                    className={'sideitem' + (sid === item ? ' on' : '') + (item === 'alert' ? ' alert' : '')}
                    data-sid={item}
                    onClick={() => {
                      setSid(item)
                      setLabel(view === 'emp' && EMP_LBL[item] ? EMP_LBL[item] : metaOf(item).sub)
                    }}
                  >
                    <span className="e_item">{view === 'emp' && EMP_LBL[item] ? EMP_LBL[item] : SID_LABEL[item]}</span>
                    {item === 'alert' ? <span className="adot pulse"></span> : null}
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
          <div id="a4Screen">
            <ScreenMain id={sid} view={view} onOpen={s => { setSid(s); setLabel(metaOf(s).sub) }} onSub={onSub} setLabel={setLabel} />
          </div>
        </div>
      </div>
    </div>
  )
}

function Homes({ setSid }) {
  const openHome = sid => {
    setSid(sid)
    const win = document.querySelector('.win')
    if (win && win.scrollIntoView) {
      win.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
  return (
    <div className="autohomes" id="a4Homes">
      {SOFT_HOMES.map(m => (
        <div key={m.k} className="ahome" data-sid={m.sid} title="Click to open this screen in workspace" onClick={() => openHome(m.sid)}>
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