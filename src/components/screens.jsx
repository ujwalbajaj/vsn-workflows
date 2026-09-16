import { useState, useEffect, useRef } from 'react'
import { A4_ROLES, QC_NOTE, A4_ICON, SOFT_HEAD, SOFT_ROWS } from '../data/act4.js'
import { HX } from '../data/departments.js'
import { Icon } from '../lib/icons.jsx'

function Mb({ cls, children }) {
  return <span className={'mbadge ' + cls}>{children}</span>
}
function MbOk({ children }) { return <Mb cls="b-ok">{children}</Mb> }
function MbWarn({ children }) { return <Mb cls="b-warn">{children}</Mb> }
function MbBad({ children }) { return <Mb cls="b-bad">{children}</Mb> }
function MbMut({ children }) { return <Mb cls="b-mut">{children}</Mb> }

function Exprow({ ml, meta, badge, rule, chev = true, detail, open = false, title }) {
  const [isOpen, setIsOpen] = useState(open)
  const click = () => setIsOpen(!isOpen)
  return (
    <>
      <div className={'mrow exprow' + (isOpen ? ' open' : '')} onClick={click} title={title}>
        <span className="ml">{ml}</span>
        {meta ? <span className="mt">{meta}</span> : null}
        {rule ? <span className="rule">{rule}</span> : null}
        {badge}
        {chev ? <span className="chev">→</span> : null}
      </div>
      <div className={'mdetail' + (isOpen ? ' open' : '')}>{detail}</div>
    </>
  )
}

function Dt({ children }) { return <div className="mdetb">{children}</div> }

function Rule({ children }) { return <span className="rule">{children}</span> }

function Ic({ n, sz = 12 }) { return <Icon name={n} size={sz} /> }

const SLA_CLOCKS = [['Supplier quote', 'Purchase', '1 d 02 h', 'on track', 'b-ok'], ['Payment approval', 'Finance', '05 h', 'watching', 'b-warn'], ['QC decision', 'Store', 'OVERDUE 3 h', 'raising alert', 'b-bad'], ['ETA to customer', 'Logistics', '2 d 08 h', 'on track', 'b-ok']]
const EXC_OPEN = [['Vendor delay — PO-2305', 'purchase', 'HIGH', 'b-bad'], ['QC hold — GRN-201', 'store', 'MID', 'b-warn'], ['Credit near limit', 'finance', 'MID', 'b-warn']]
const ALERT_FEED = [['SLA breach — QC decision', '3 min ago', 'HIGH', 'b-bad'], ['Payment above threshold ready', '21 min ago', 'MID', 'b-warn'], ['2 handoffs handed today', '1 h ago', 'info', 'b-mut'], ['ETA rewritten for SHIP-334', '2 h ago', 'info', 'b-mut']]
const ETA_TABLE = [['PO acknowledged', 'PO-2304', 'done'], ['Inbound shipment', 'SHIP-334', 'done'], ['QC + GRN', 'GRN-201', 'next'], ['Dispatch', '—', 'next'], ['Proof of delivery', 'POD', 'next']]
const EMP_WAIT = {
  sales: [['RFQ-1001 — customer replied, quote decision', 'SW-10 · due today'], ['Requirement packet ready to hand to Purchase', 'SW-06 · ready']],
  purchase: [['PO-2304 awaiting vendor acknowledgement', 'PW-17 · due today'], ['PO-2305 — supplier confirmed late, escalate', 'PW-20 · overdue watch']],
  finance: [['PO-2304 — advance funds flagged for today', 'FN-02 · due today'], ['Customer onboarding docs arrived — verify', 'FN-16 · ready']],
  log: [['SHIP-334 — arrival window moved 6 h, update ETA', 'LG-06 · today'], ['QC passed — dispatch queue for the outbound', 'LG-08 · ready']],
  store: [['GRN-201 — lot of PO-2304 awaiting QC assessment', 'ST-04 · due today'], ['Reserved picks for order allocation', 'ST-10 · ready']]
}
const EMP_GIVE = {
  sales: [['Issue customer quotation', 'RFQ-1001', 'SW-09'], ['Hand requirement to Purchase', 'packet ready', 'SW-06']],
  purchase: [['Cost the PO before issue', 'PO-2305', 'PW-09'], ['Vendor delay follow-up call', 'shipment', 'PW-20']],
  finance: [['Release advance to vendor', 'PO-2304', 'FN-02'], ['Verify invoice INV-991', 'finance', 'FN-04']],
  log: [['Update ETA — arrival +6 h', 'SHIP-334', 'LG-06'], ['Dispatch handoff to Store', 'outbound prep', 'LG-08']],
  store: [['Run the QC on inbound lot', 'GRN-201', 'ST-04'], ['Create the GRN', 'inbound lot', 'ST-02']]
}
const EMP_SLA = {
  sales: [['Customer decision on quotation', 'RFQ-1001 · 1 d 02 h', 'watching', 'b-warn'], ['RFQ validation clock', 'RFQ-2026-0087 · done', 'on track', 'b-ok']],
  purchase: [['PO acknowledgement', 'PO-2304 · 04 h', 'watching', 'b-warn'], ['Supplier quote', 'SRQ-88 · 1 d', 'on track', 'b-ok']],
  finance: [['Advance funding window', 'FN-02 · due today', 'watching', 'b-warn'], ['Onboarding verification', 'FN-16 · 2 d', 'on track', 'b-ok']],
  log: [['ETA update window', 'LG-06 · today', 'watching', 'b-warn'], ['Dispatch prep', 'LG-07 · ready', 'on track', 'b-ok']],
  store: [['QC decision clock', 'ST-04 · OVERDUE 3 h', 'raising alert', 'b-bad'], ['Allocation readiness', 'ST-10 · ready', 'on track', 'b-ok']]
}
const EMP_PLAN = {
  sales: [['09:30', 'Validate RFQ-2026-0087 requirement', 'done'], ['10:15', 'Hand to Purchase (SW-06)', 'done'], ['11:45', 'Quote follow-up — RFQ-1001', 'next'], ['16:00', 'Close the quotation file', 'next']],
  purchase: [['09:15', 'Vendor ack chase — PO-2304', 'done'], ['10:30', 'COST the PO-2305', 'next'], ['14:00', 'Supplier delay escalation (PW-20)', 'next']],
  finance: [['09:30', 'Flag advance funds — PO-2304', 'done'], ['10:00', 'Verify INV-991', 'next'], ['13:00', 'Onboarding check — FN-16', 'next']],
  log: [['08:45', 'ETA sweep — SHIP-334', 'done'], ['11:00', 'Rewrite ETA +6 h (LG-06)', 'next'], ['15:30', 'Dispatch prep — SHIP-335', 'next']],
  store: [['09:00', 'Receive inbound lot', 'done'], ['10:20', 'Physical verification — ST-03', 'next'], ['13:30', 'QC assessment — GRN-201', 'next']]
}
const DEPT_ALL = ['sales', 'purchase', 'finance', 'log', 'store']
const DTAG = ({ k }) => <span className="dtag" style={{ background: HX[k] ? HX[k].col : '#888' }} title={HX[k] ? HX[k].label : k}></span>

/* ---------------- dash ---------------- */
const MGMT_KPI = [
  ['Open Parent Transactions', '128', 'up', 'Connected single lifecycle'],
  ['Overdue Tasks', '7', 'down', 'Needs attention'],
  ['Pending Approvals', '4', 'mid', 'Vendor / margin / exception'],
  ['Gross Margin (YTD)', '18.4%', 'up', 'Profitability'],
  ['Avg SLA hit', '82%', 'mid', 'SLA values TBD'],
  ['Active Exceptions', '3', 'down', 'Cross-department']
]
const MGMT_DEPS = [['sales', 'Sales — RFQs & quotes', 'On track', 'b-ok'], ['purchase', 'Purchase — PO & supply', 'Follow-up', 'b-warn'], ['finance', 'Finance — payments / onboarding (FN-15/16)', 'On track', 'b-ok'], ['log', 'Logistics — shipment / ETA', 'ETA watch', 'b-warn'], ['store', 'Store — GRN / QC', 'On track', 'b-ok']]
const MGMT_BLK = [['Vendor delay holding shipment', 'Blocker', 'b-bad'], ['QC hold on inbound lot', 'Pending', 'b-warn'], ['Advance payment awaiting Finance action', 'Parallel', 'b-mut'], ['Alternative-MPN awaiting customer reply', 'Waiting', 'b-mut']]
const MGMT_APP = [['Vendor selection — multi-factor, not cheapest', 'Purchase + Manager', 'b-mut'], ['Margin decision on quotation', 'Sales + Manager', 'b-warn'], ['Short-supply resolution', 'Priority TBD (TBD-10)', 'b-mut'], ['QC reject → vendor adjustment', 'Flow TBD (TBD-11)', 'b-mut']]
const MGMT_WL = [['Sales', 12, '#10b981'], ['Purchase', 9, '#f59e0b'], ['Finance', 6, '#10b981'], ['Logistics', 8, '#f59e0b'], ['Store / QC', 7, '#10b981']]

function ManagerDash({ onOpen }) {
  const [active, setActive] = useState(false)
  const [resolved, setResolved] = useState({})
  useEffect(() => { const t = setTimeout(() => setActive(true), 60); return () => clearTimeout(t) }, [])
  const toScreen = d => d[0] === 'purchase' ? 'exc' : d[0] === 'finance' ? 'pay' : d[0] === 'log' ? 'eta' : d[0] === 'store' ? 'store' : 'rfq'
  return (
    <div className="dashwrap">
      <div className="dashhead"><b>VSN Management — Control Tower</b><span>Business control tower · broader visibility &amp; approval rights than department employees · <span className="tbdbadge">TBD</span> demo values</span></div>
      <div className="kpisix">
        {MGMT_KPI.map(k => (
          <div className="dkpi" key={k[0]}>
            <div className="kl">{k[0]}</div>
            <div className="kv">{k[1]}</div>
            <div className={'kd ' + k[2]}>{k[3]}</div>
          </div>
        ))}
      </div>
      <div className="dashgrid">
        <div className="dashcard">
          <div className="sct">Department status (cross-transaction)</div>
          <div className="dashrows">
            {MGMT_DEPS.map(d => <div className="ddrow" key={d[1]} onClick={() => onOpen(toScreen(d))} title="open its screen">
              <span className="ml"><Ic n={A4_ICON[d[0]]} />{d[1]}</span>
              <span className="mt"><span className={'mbadge ' + d[3]}>{d[2]}</span><span className="chev">→</span></span>
            </div>)}
          </div>
          <div className="muted" style={{ fontSize: 10, marginTop: 9 }}>Representative demo values — connect real data per confirmed workflow.</div>
        </div>
        <div className="dashcard">
          <div className="sct">Cross-functional blockers / bottlenecks (MG-02, MG-07)</div>
          <div className="dashrows">{MGMT_BLK.map(b => <div className="ddrow" key={b[0]}><span className="ml"><Ic n="warn" />{b[0]}</span><span className="mt"><span className={'mbadge ' + b[2]}>{b[1]}</span></span></div>)}</div>
        </div>
        <div className="dashcard">
          <div className="sct">Approvals &amp; exceptions (MG-03, MG-05)</div>
          <div className="dashrows">{MGMT_APP.map(a => <div className="ddrow" key={a[0]}><span className="ml"><Ic n="shieldCheck" />{a[0]}</span><span className="mt"><span className={'mbadge ' + a[2]}>{a[1]}</span></span></div>)}</div>
          <div className="muted" style={{ fontSize: 10, marginTop: 9 }}>Final approval matrix is TBD (TBD-12).</div>
        </div>
        <div className="dashcard">
          <div className="sct">Team workload (MG-02)</div>
          <div className="wbars">
            {MGMT_WL.map(w => <div className="wbar" key={w[0]}><span>{w[0]}</span><div className="bar"><i style={{ width: active ? w[1] * 10 + '%' : '2%', background: w[2], transition: 'width .9s cubic-bezier(.2,.8,.3,1)' }}></i></div><span className="n">{w[1]} tasks</span></div>)}
          </div>
        </div>
      </div>
      <div className="dashgrid">
        <div className="dashcard">
          <div className="sct">SLA clocks — live</div>
          <div className="dashrows">{SLA_CLOCKS.map(x => <div className="ddrow" key={x[0]}><span className="ml"><Ic n="clock" />{x[0]}</span><span className="mt"><span className={'mbadge ' + x[4]}>{x[3]}</span><span className="rule">{x[2]}</span></span></div>)}</div>
          <div className="muted" style={{ fontSize: 10, marginTop: 9 }}>SLA values TBD — the ladder (auto-escalation) is the confirmed part.</div>
        </div>
        <div className="dashcard">
          <div className="sct">Exception queue <span style={{ color: 'var(--erp)', cursor: 'pointer', textTransform: 'none', letterSpacing: 0 }} onClick={() => onOpen('exc')}>open queue →</span></div>
          <div className="dashrows">{EXC_OPEN.map((x, i) => <div className="ddrow" key={x[0]}><span className="ml"><Ic n={A4_ICON[x[1]]} />{x[0]}</span><span className="mt">{resolved[i] ? <button className="abtn ok2" disabled>resolved ✓</button> : <button className="abtn good" onClick={() => setResolved(r => ({ ...r, [i]: true }))}>Resolve</button>}</span></div>)}</div>
        </div>
        <div className="dashcard">
          <div className="sct">Alerts today <span style={{ color: 'var(--erp)', cursor: 'pointer', textTransform: 'none', letterSpacing: 0 }} onClick={() => onOpen('alert')}>all alerts →</span></div>
          <div className="dashrows">{ALERT_FEED.map(x => <div className="ddrow" key={x[0]}><span className="ml"><Ic n="bell" />{x[0]}</span><span className="mt"><span className={'mbadge ' + x[3]}>{x[2]}</span><span className="rule">{x[1]}</span></span></div>)}</div>
        </div>
        <div className="dashcard">
          <div className="sct">Customer ETAs <span style={{ color: 'var(--erp)', cursor: 'pointer', textTransform: 'none', letterSpacing: 0 }} onClick={() => onOpen('eta')}>ETA tracker →</span></div>
          <div className="dashrows">{ETA_TABLE.map(x => <div className="ddrow" key={x[0]}><span className="ml"><Ic n="route" />{x[0]}</span><span className="mt"><span className={'mbadge ' + (x[2] === 'next' ? 'b-mut' : 'b-ok')}>{x[2]}</span><span className="rule">{x[1]}</span></span></div>)}</div>
          <div className="kbox" style={{ marginTop: 8 }}><b>3 d 04 h</b><span>· to customer for RFQ-2026-0087</span></div>
        </div>
      </div>
      <div className="scrnote">Manager view — the control tower exactly as specced in <i>manager-dashboard.html</i>. Click any row to open its screen. Values are demo placeholders.</div>
    </div>
  )
}

function EmpDash() {
  const [handed, setHanded] = useState({})
  const totalWait = DEPT_ALL.reduce((s, k) => s + (EMP_WAIT[k] || []).length, 0)
  const totalGive = DEPT_ALL.reduce((s, k) => s + (EMP_GIVE[k] || []).length, 0)
  const allPlan = DEPT_ALL.flatMap(k => (EMP_PLAN[k] || []).map((p, i) => [k, i, ...p]))
  const allWait = DEPT_ALL.flatMap(k => (EMP_WAIT[k] || []).map((w, i) => [k, i, ...w]))
  const allGive = DEPT_ALL.flatMap((k, ki) => (EMP_GIVE[k] || []).map((g, i) => [k, ki * 100 + i, ...g]))
  const allSla = DEPT_ALL.flatMap(k => (EMP_SLA[k] || []).map((s, i) => [k, i, ...s]))
  const allTasks = DEPT_ALL.flatMap(k => {
    const R = A4_ROLES.find(r => r.key === k); return (R ? R.tasks : []).map((t, i) => [k, i, t])
  })
  const allLines = DEPT_ALL.flatMap(k => {
    const R = A4_ROLES.find(r => r.key === k); return (R ? R.lines : []).map((l, i) => [k, i, ...l])
  })
  return (
    <div className="dashwrap">
      <div className="dashhead"><b>My Work — every department, one screen</b><span>Employee view · every role's workload shown together · no picker</span></div>
      <div className="sumchips">
        <span><b>{DEPT_ALL.length}</b>due today</span><span><b>1</b>overdue</span><span><b>{totalWait}</b>waiting on me</span><span><b>{totalGive}</b>handoffs to give</span><span><b>1</b>ETA to update</span>
      </div>
      <div className="dashgrid">
        <div className="dashcard"><div className="sct">Today's plan — all departments</div>
          <div className="dashrows">{allPlan.map(p => <div className="ddrow" key={p[1] + '-' + p[0]}><span className="ml"><DTAG k={p[0]} /><span className="tm">{p[2]}</span>{p[3]}</span><span className="mt"><span className={'mbadge ' + (p[4] === 'done' ? 'b-ok' : 'b-mut')}>{p[4]}</span></span></div>)}</div>
        </div>
        <div className="dashcard"><div className="sct">Waiting on me — all departments</div>
          <div className="dashrows">{allWait.map(w => <div className="ddrow" key={w[1] + '-' + w[0]}><span className="ml"><DTAG k={w[0]} />{w[2]}<span className="rule">{w[0]}</span></span><span className="mt"><span className="mbadge b-warn">due</span><span className="rule">{w[3]}</span></span></div>)}</div>
        </div>
        <div className="dashcard"><div className="sct">Handoffs to give — all departments</div>
          <div className="dashrows">{allGive.map(g => <div className="ddrow" key={g[1]}><span className="ml"><DTAG k={g[0]} />{g[2]}<span className="rule">{g[4]}</span></span><span className="mt">
            {handed[g[1]] ? <button className="abtn ok2" disabled>handed ✓</button> : <button className="abtn good" onClick={() => setHanded(h => ({ ...h, [g[1]]: true }))}>PASS</button>}<span className="rule">{g[3]}</span></span></div>)}</div>
        </div>
        <div className="dashcard"><div className="sct">SLA clocks — all departments</div>
          <div className="dashrows">{allSla.map(s => <div className="ddrow" key={s[1] + '-' + s[0]}><span className="ml"><DTAG k={s[0]} />{s[2]}</span><span className="mt"><span className={'mbadge ' + s[5]}>{s[4]}</span><span className="rule">{s[3]}</span></span></div>)}</div>
        </div>
        <div className="dashcard"><div className="sct">Assigned tasks — all departments</div>
          <div className="dashrows">{allTasks.map(t => <div className="ddrow" key={t[1] + '-' + t[0]}><span className="ml"><DTAG k={t[0]} /><Ic n="checkCir" />{t[2]}</span><span className="mt"><span className="mbadge b-mut">Assigned</span></span></div>)}</div>
        </div>
        <div className="dashcard"><div className="sct">Pending items — all departments</div>
          <div className="dashrows">{allLines.map(l => <div className="ddrow" key={l[1] + '-' + l[0]}><span className="ml"><DTAG k={l[0]} /><Ic n="file" />{l[2]}</span><span className="mt"><span className="mbadge b-warn">{l[3]}</span></span></div>)}</div>
        </div>
        <div className="dashcard"><div className="sct">Deadlines &amp; follow-ups</div>
          <div className="dashrows">
            <div className="ddrow"><span className="ml">Next due today</span><span className="mt"><span className="mbadge b-warn">Due</span></span></div>
            <div className="ddrow"><span className="ml">Follow-ups pending</span><span className="mt"><span className="mbadge b-mut">2</span></span></div>
          </div>
          <div className="muted" style={{ fontSize: 10, marginTop: 9 }}>Representative demo entries — connect real task data per XF-01/02.</div>
        </div>
        <div className="dashcard"><div className="sct">Who does what — all roles</div>
          {A4_ROLES.map(R => <div key={R.key} style={{ marginBottom: 7 }}><div className="mrow"><span className="ml"><DTAG k={R.key} /><b>{R.label}</b></span></div><div style={{ fontSize: 10, lineHeight: 1.5, color: 'var(--muted)', paddingLeft: 4 }} dangerouslySetInnerHTML={{ __html: R.block }} /></div>)}
        </div>
      </div>
      <div className="scrnote">Employee view — every department's workload on one screen. Manager-only actions are never exposed. <span className="tbdbadge">TBD</span> where demo.</div>
    </div>
  )
}

function Dash({ onOpen, view }) {
  return view === 'emp' ? <EmpDash /> : <ManagerDash onOpen={onOpen} />
}

/* ---------------- orders ---------------- */
function Orders({ onOpen }) {
  const steps = [['RFQ created', 'done'], ['Classified SPOT', 'done'], ['Validated', 'done'], ['Quoted', 'done'], ['PO issued', 'done'], ['Inbound shipment', 'next'], ['QC + GRN', 'next'], ['Dispatch → POD', 'next']]
  return (
    <>
      <div className="obhead"><div><b>RFQ-2026-0087</b><span className="wmeta" style={{ marginLeft: 4, display: 'inline-block' }}>MPN-24LC256 · 1000 pcs · required in 12 days</span></div><span className="mbadge b-warn">live trail · Act 01</span></div>
      <div className="stepline">{steps.map(s => <span className={'stepdot' + (s[1] === 'done' ? ' done' : '')} key={s[0]}>{s[0]}</span>)}</div>
      <div className="sct" style={{ marginTop: 12 }}>Open transactions · <span style={{ cursor: 'pointer', color: 'var(--erp)', textTransform: 'none', letterSpacing: 0 }} onClick={() => onOpen('rfq')}>all RFQs &amp; POs →</span></div>
      <Exprow open ml={<><Ic n="file" />RFQ-2026-0087<span className="mt">MPN-24LC256 · 1000 pcs</span></>} badge={<MbWarn>running · step 11/28</MbWarn>}
        detail={<><Dt>Next action · Sales</Dt>Requirement is validated and quoted. Purchase is negotiating the supplier. The SLA clock on this handoff shows <b>2 d 06 h</b>. Every change rewrites the customer ETA automatically. <span className="tbdbadge">TBD — confirmation pending</span></>} />
      <Exprow ml={<><Ic n="file" />RFQ-1001<span className="mt">quoted — awaiting customer reply</span></>} badge={<MbMut>SW-09 · follow-up</MbMut>}
        detail={<><Dt>Record detail · demo</Dt>Quoted 2 days ago. The quotation is valid for 7 days. The system reminds Sales today to follow up — no sticky notes.</>} />
      <Exprow ml={<><Ic n="cart" />PO-2304<span className="mt">supply — awaiting shipment</span></>} badge={<MbWarn>PW-17 · track</MbWarn>}
        detail={<><Dt>Record detail · demo</Dt>PO acknowledged by vendor. Logistics plans the inbound move as soon as the goods are ready (LG-01).</>} />
      <Exprow ml={<><Ic n="pkg" />GRN-201<span className="mt">QC pending on inbound lot</span></>} badge={<MbWarn>ST-04 · inspect</MbWarn>}
        detail={<><Dt>Record detail · demo</Dt>Goods received, physical verification in progress. Store decides the QC outcome — open the QC screen to play with it.</>} />
      <div className="scrnote">Rows expand on click. Every record traces to a rule ID — nothing invented.</div>
    </>
  )
}

/* ---------------- rfq ---------------- */
function Rfq({ onOpen }) {
  const rfq = [['RFQ-2026-0087', 'Classified SPOT — sourcing started', 'SW-03'], ['RFQ-1001', 'Quoted — awaiting customer', 'SW-09'], ['RFQ-1002', 'Certificate request queued', 'SW-11']]
  const po = [['SRQ-88', 'Vendor enquiry in progress', 'PW-03'], ['PO-2304', 'Issued — awaiting ack', 'PW-17'], ['PO-2305', 'Delivery tracked — supplier delay', 'PW-20']]
  return (
    <>
      <div className="lane2">
        <div className="scard"><div className="sct">Sales — RFQ queue</div>
          {rfq.map(r => <Exprow key={r[0]} ml={<><Ic n="file" />{r[0]}</>} meta={r[1]} rule={<Rule>{r[2]}</Rule>}
            detail={<><Dt>RFQ · demo</Dt>{r[0]} — {r[1]}. Owned by Sales (SW).</>} />)}
        </div>
        <div className="scard"><div className="sct">Purchase — PO queue</div>
          {po.map(r => <Exprow key={r[0]} ml={<><Ic n="cart" />{r[0]}</>} meta={r[1]} rule={<Rule>{r[2]}</Rule>}
            detail={<><Dt>PO · demo</Dt>{r[0]} — {r[1]}. Owned by Purchase (PW).</>} />)}
        </div>
      </div>
      <div className="scrnote">One owner per field — see <span style={{ cursor: 'pointer', color: 'var(--erp)', fontWeight: 800 }} onClick={() => onOpen('access')}>the permission matrix →</span></div>
    </>
  )
}

/* ---------------- tasks ---------------- */
function Tasks() {
  return (
    <>
      <div className="dashgrid">
        {DEPT_ALL.map(k => {
          const R = A4_ROLES.find(r => r.key === k)
          const w = HX[k] || {}
          return (
            <div className="scard" key={k}>
              <div className="sct"><span className="dtag" style={{ background: w.col ? w.col : 'var(--erp)' }}></span>{w.label || k} — tasks</div>
              {(R ? R.tasks : []).map(t => <div className="mrow" key={t}><span className="ml"><Ic n="checkCir" />{t}</span><MbMut>assigned</MbMut></div>)}
              <div className="sct" style={{ marginTop: 9 }}>Pending items</div>
              {(R ? R.lines : []).map(l => <Exprow key={l[0]} ml={<><Ic n="file" />{l[0]}</>} meta={l[1]}
                detail={<><Dt>Record detail · demo</Dt>{l[0]} — {l[1]}. The ERP keeps this row in the department queue until it is resolved; deadlines and follow-ups land here automatically.</>} />)}
              <div className="sct" style={{ marginTop: 9 }}>Role boundary — {w.label || k}</div>
              <div style={{ fontSize: 10.5, lineHeight: 1.6, color: 'var(--muted)' }} dangerouslySetInnerHTML={{ __html: R ? R.block : '' }} />
            </div>
          )
        })}
      </div>
      <div className="scrnote">Every department's tasks and queues on one screen — no picker. Each card carries its department colour; manager-only actions are never exposed.</div>
    </>
  )
}

/* ---------------- docs ---------------- */
function Docs() {
  const d = [['Commercial invoice', 'FN-01', 'verified', 'b-ok'], ['AWB / tracking', 'LG-07', 'verified', 'b-ok'], ['Packing list', 'ST-03', 'awaited', 'b-warn'], ['QC report', 'ST-04', 'pending', 'b-warn'], ['Certificate of origin', 'MGMT', 'requested', 'b-mut']]
  const chk = ['Invoice numbers match PO', 'Bank details are on file', 'POD present for the claim']
  return (
    <div className="lane2">
      <div className="scard"><div className="sct">Compliance for RFQ-2026-0087</div>
        {d.map(x => <div className="mrow" key={x[0]}><span className="ml"><Ic n="fileCheck" />{x[0]}</span><Rule>{x[1]}</Rule><span className={'mbadge ' + x[3]}>{x[2]}</span></div>)}
      </div>
      <div className="scard"><div className="sct">Automatic checks</div>
        {chk.map(c => <div className="mrow" key={c}><span className="ml"><Ic n="shieldCheck" />{c}</span><MbOk>auto ✓</MbOk></div>)}
        <div className="sct" style={{ marginTop: 9 }}>Vault rule</div>
        <div style={{ fontSize: 10.5, lineHeight: 1.6, color: 'var(--muted)' }}>Every document lands in the order file by itself — nothing sits in a folder waiting to be found. <span className="tbdbadge">TBD</span></div>
      </div>
    </div>
  )
}

/* ---------------- pay ---------------- */
function Pay() {
  const p = [['Advance payment — PO-2304', 'FN-02', 'schedule: today', 'b-warn'], ['Invoice verification — INV-991', 'FN-04', 'prepared', 'b-mut'], ['Vendor onboarding docs', 'FN-15', 'verified', 'b-ok'], ['Customer onboarding docs', 'FN-16', 'awaiting reply', 'b-mut']]
  const f = [['Payment approved', 'auto — within limits', 'b-ok'], ['Above threshold', 'escalates to Management', 'b-warn'], ['Credit exposure', 'checked before release', 'b-mut']]
  return (
    <div className="lane2">
      <div className="scard"><div className="sct">Payment & document queue</div>
        {p.map(x => <Exprow key={x[0]} ml={<><Ic n="dollar" />{x[0]}</>} meta={x[2]} rule={<Rule>{x[1]}</Rule>}
          detail={<><Dt>Finance task · demo</Dt>{x[0]} — {x[2]}. The ERP pre-fills every payment task; Finance keeps the decision.</>} />)}
      </div>
      <div className="scard"><div className="sct">Finance guardrails</div>
        {f.map(x => <div className="mrow" key={x[0]}><span className="ml">{x[0]}</span><span className={'mbadge ' + x[2]}>{x[1]}</span></div>)}
        <div className="sct" style={{ marginTop: 9 }}>Before / after</div>
        <div style={{ fontSize: 10.5, lineHeight: 1.6, color: 'var(--muted)' }}>Finance keeps the decision — the ERP pre-fills every payment task and chases the follow-ups on its own.</div>
      </div>
    </div>
  )
}

/* ---------------- store ---------------- */
function Store() {
  const [qc, setQc] = useState('Accept')
  const st = [['GRN-201', 'MPN-24LC256 · lot from PO-2304', 'QC pending', 'b-warn'], ['GRN-202', 'MPN-STM32F103 · accepted', 'in stock', 'b-ok'], ['STK-12', 'Short supply on PO-2305', 'resolve', 'b-bad']]
  return (
    <div className="lane2">
      <div className="scard"><div className="sct">Goods in — receiving</div>
        {st.map(x => <div className="mrow" key={x[0]}><span className="ml"><Ic n="pkg" />{x[0]}</span><span className="mt">{x[1]}</span><span className={'mbadge ' + x[3]}>{x[2]}</span></div>)}
        <div className="sct" style={{ marginTop: 9 }}>Stock position — MPN-24LC256</div>
        <div className="wrow"><span>Available</span><div className="bar"><i style={{ width: '55%', background: 'var(--store)' }}></i></div><span>550 pcs</span></div>
        <div className="wrow"><span>Reserved</span><div className="bar"><i style={{ width: '30%', background: 'var(--erp)' }}></i></div><span>300 pcs</span></div>
        <div className="wrow"><span>In QC</span><div className="bar"><i style={{ width: '15%', background: 'var(--warn)' }}></i></div><span>150 pcs</span></div>
      </div>
      <div className="scard"><div className="sct">QC outcome — Store decides (ST-04)</div>
        <div className="rolepick" style={{ margin: '0 0 6px' }}>{['Accept', 'Hold', 'Reject'].map(q => <button key={q} className={qc === q ? 'on' : ''} onClick={() => setQc(q)}>{q}</button>)}</div>
        <div style={{ fontSize: 10.5, lineHeight: 1.6, color: 'var(--muted)' }}>{QC_NOTE[qc]}</div>
        <div className="sct" style={{ marginTop: 9 }}>What the ERP does next</div>
        <div style={{ fontSize: 10.5, lineHeight: 1.6, color: 'var(--muted)' }}>The outcome is captured once and re-routes the lot automatically — accepted stock allocates, rejected stock returns. <span className="tbdbadge">TBD</span></div>
      </div>
    </div>
  )
}

/* ---------------- handoff ---------------- */
function Handoff() {
  const [done, setDone] = useState({ 'SW-06': true })
  const h = [['Sales → Purchase', 'Requirement handed for sourcing', 'SW-06', 'done'], ['Purchase → Finance', 'PO issued — ready for payment prep', 'PW-09', 'live'], ['Finance → Store', 'Advance cleared — release goods', 'FN-02', 'live'], ['Store → Logistics', 'QC passed — ready to dispatch', 'ST-04', 'wait']]
  return (
    <>
      <div className="scard"><div className="sct">Handoffs on RFQ-2026-0087 · <span>live: 2 · done: 1 · next: 1</span></div>
        {h.map(x => {
          const isDone = x[3] === 'done' || done[x[2]]
          return <div className="mrow" key={x[2]}><span className="ml"><Ic n="flow" />{x[0]}</span><span className="mt">{x[1]}</span><Rule>{x[2]}</Rule>
            {isDone ? <MbOk>handed ✓</MbOk> : <button className="abtn good" onClick={() => setDone(d => ({ ...d, [x[2]]: true }))}>PASS</button>}</div>
        })}
      </div>
      <div className="scrnote">Click <b>PASS</b> to hand the work on — it lands in the next owner’s queue in that instant. Demo.</div>
    </>
  )
}

/* ---------------- sla ---------------- */
function Sla() {
  const s = SLA_CLOCKS
  const ladder = ['warning at 80% → owner notified', 'breach → supervisor + manager alert', 'repeat exposure = management review']
  return (
    <div className="lane2">
      <div className="scard"><div className="sct">SLA clocks — this order</div>
        {s.map(x => <div className="mrow" key={x[0]}><span className="ml"><Ic n="clock" />{x[0]}</span><span className="mt">{x[1]}</span><span className={'mbadge ' + x[4]}>{x[3]}</span><Rule>{x[2]}</Rule></div>)}
      </div>
      <div className="scard"><div className="sct">Escalation ladder</div>
        {ladder.map(x => <div className="mrow" key={x}><span className="ml"><Ic n="alert" />{x}</span><MbMut>auto</MbMut></div>)}
        <div className="sct" style={{ marginTop: 9 }}>What you see</div>
        <div style={{ fontSize: 10.5, lineHeight: 1.6, color: 'var(--muted)' }}>SLA numbers land here as <span className="tbdbadge">TBD</span>. The ladder is the automation part — it never sleeps.</div>
      </div>
    </div>
  )
}

/* ---------------- eta ---------------- */
function Eta() {
  const d = ETA_TABLE
  return (
    <div className="lane2">
      <div className="scard"><div className="sct">Customer-visible ETA · RFQ-2026-0087</div>
        <div className="kbox" style={{ marginBottom: 8 }}><b>3 d 04 h</b><span>next ETA update · LG-06</span></div>
        {d.map(x => <div className="mrow" key={x[0]}><span className="ml"><Ic n="route" />{x[0]}</span><span className="mt">{x[1]}</span><span className={'mbadge ' + (x[3] === 'next' ? 'b-mut' : 'b-ok')}>{x[3]}</span><Rule>{x[2]}</Rule></div>)}
      </div>
      <div className="scard"><div className="sct">What changes the ETA</div>
        {['a step completes early', 'vendor delay is reported', 'a QC hold is raised', 'a handoff goes live'].map(x => <div className="mrow" key={x}><span className="ml"><Ic n="refresh" />{x}</span><MbMut>auto-rewrite</MbMut></div>)}
        <div className="sct" style={{ marginTop: 9 }}>The promise</div>
        <div style={{ fontSize: 10.5, lineHeight: 1.6, color: 'var(--muted)' }}>Customers stop asking “where is my order” — the ETA arrives before the question.</div>
      </div>
    </div>
  )
}

/* ---------------- exc ---------------- */
function Exc() {
  const [resolved, setResolved] = useState({})
  const e = EXC_OPEN
  const rules = ['routed by owner', 'routed by severity', 'escalated by SLA exposure']
  return (
    <div className="lane2">
      <div className="scard"><div className="sct">Open exceptions</div>
        {e.map((x, i) => <div className="mrow" key={x[0]}><span className="ml"><Ic n="warn" />{x[0]}</span><Rule>{x[1]}</Rule><span className={'mbadge ' + x[3]}>{x[2]}</span>
          {resolved[i] ? <button className="abtn ok2" disabled>resolved ✓</button> : <button className="abtn good" onClick={() => setResolved(r => ({ ...r, [i]: true }))}>Resolve</button>}</div>)}
      </div>
      <div className="scard"><div className="sct">Routing rules</div>
        {rules.map(x => <div className="mrow" key={x}><span className="ml"><Ic n="shuffle" />{x}</span><MbMut>auto</MbMut></div>)}
        <div className="sct" style={{ marginTop: 9 }}>Escalation</div>
        <div style={{ fontSize: 10.5, lineHeight: 1.6, color: 'var(--muted)' }}>Unresolved exceptions climb to Management automatically. Approval matrix <span className="tbdbadge">TBD</span>. Click <b>Resolve</b> to clear a row.</div>
      </div>
    </div>
  )
}

/* ---------------- alert ---------------- */
function Alert({ onOpen }) {
  const a = ALERT_FEED
  return (
    <>
      <div className="scard"><div className="sct">Alert feed — today</div>
        {a.map(x => <Exprow key={x[0]} ml={<><Ic n="bell" />{x[0]}</>} meta={x[1]} badge={<span className={'mbadge ' + x[3]}>{x[2]}</span>}
          detail={<><Dt>Alert · demo</Dt>{x[0]} — raised {x[1]}. Clicked from the notification bell in the top bar. The feed is representative: <span className="tbdbadge">TBD</span>.</>} />)}
      </div>
      <div className="scrnote">See <span style={{ cursor: 'pointer', color: 'var(--erp)', fontWeight: 800 }} onClick={() => onOpen('access')}>the permission matrix →</span> for who can act.</div>
    </>
  )
}

/* ---------------- access ---------------- */
const CLSA = { D: 'dec', C: 'can', X: 'no', V: 'view' }
const MKA = { D: '◆', C: '✓', X: '✕' }
function Access() {
  return (
    <>
      <div className="pwrap"><table className="pmatrix"><thead><tr><th style={{ width: 230 }}>Who is allowed to…</th>{SOFT_HEAD.map(h => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>
          {SOFT_ROWS.map(row => (
            <tr key={row.r}><td className="rowh">{row.r}<span>{row.id}</span></td>
              {row.c.map((c, i) => (
                <td className={'pcell ' + CLSA[c]} key={i}>
                  {c === 'V'
                    ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>
                    : MKA[c]}
                  <span className="why">{c === 'V' ? 'view' : c === 'D' ? 'decides' : c === 'C' ? 'can' : SOFT_HEAD[i].split(' ')[0]}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table></div>
      <div className="mlegend"><span><i className="mc dec">◆</i>the owner — their decision</span><span><i className="mc can">✓</i>can do it</span><span><i className="mc no">✕</i>not allowed</span><span><i className="mc view"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg></i>views every lane, acts on exceptions only</span></div>
      <div className="tbdstrip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><path d="M12 9v4M12 17h.01" /></svg><span>Every mark comes from your notes (rule IDs cited) — <b>nothing in this matrix is invented</b>. Where the notes don't settle a permission yet, the cell is marked <span className="tbdbadge">TBD</span>, not guessed.</span></div>
    </>
  )
}
export const SCREEN_META = {
  dash: { t: 'Control tower', sub: 'Manager view — every lane on one screen. Click into any area.' },
  orders: { t: 'Orders', sub: 'RFQ-2026-0087 is the live trail you watched in Act 01. Click a row for detail.' },
  rfq: { t: 'RFQs & POs', sub: 'Two queues — one owner per queue, no double handling.' },
  tasks: { t: 'Tasks — all departments', sub: 'Every department’s tasks and queues on one screen — no picker.' },
  docs: { t: 'Documents', sub: 'One order, one vault — every paper tabbed and on time.' },
  pay: { t: 'Payments', sub: 'Finance decides — the ERP prepares and chases.' },
  store: { t: 'Inventory & QC', sub: 'Store decides the outcome — the system logs it.' },
  handoff: { t: 'Task handoff', sub: 'Work moves with a click — the ERP remembers who has it now.' },
  sla: { t: 'SLA escalations', sub: 'Every handoff has a clock — silence is never mistaken for progress.' },
  eta: { t: 'ETA tracker', sub: 'The customer sees one live ETA — rewritten at every step.' },
exc: { t: 'Exception queue', sub: 'Off-plan work reaches the right owner with context — nothing waits.' },
  alert: { t: 'Management alerts', sub: 'The business taps you on the shoulder — you react, you don’t chase.' },
  access: { t: 'Access & permissions', sub: 'Who can do what — one mark per permission, every one from the notes.' }
}

const COMP = { dash: Dash, orders: Orders, rfq: Rfq, tasks: Tasks, docs: Docs, pay: Pay, store: Store, handoff: Handoff, sla: Sla, eta: Eta, exc: Exc, alert: Alert, access: Access }

export default function Screen({ id, onOpen, onSub, setLabel, view }) {
  const C = COMP[id] || Dash
  return <C onOpen={onOpen} onSub={onSub} setLabel={setLabel} view={view} />
}