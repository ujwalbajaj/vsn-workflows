import { useState } from 'react'
import { MODS, PAINS, TODAY_BA, AUTO_BA, CANDID } from '../data/modules.js'
import { Icon } from '../lib/icons.jsx'

export default function ActThree({ on }) {
  const [selMod, setSelMod] = useState(null)
  const [volume, setVolume] = useState(120) // orders per month

  const m = selMod ? MODS.find(x => x.id === selMod) : null

  // Calculate dynamic ROI metrics based on volume
  const hoursSaved = Math.round(volume * 2.2)
  const costSavings = (volume * 38).toLocaleString()
  const errorReduction = Math.min(99, Math.round(volume * 0.15 + 85))

  return (
    <div className={'act' + (on ? ' on' : '')} data-slot="3" style={{ display: on ? 'flex' : 'none' }}>
      <div className="scrolly">
        <div className="pitchhero">
          <div className="k">Act 03 · The offer</div>
          <h1>Your workflows work. They're just running on people — not on a system.</h1>
          <div className="sub">We mapped all 22 of your workflows. Now here's the part we can <b>sell to you</b>: the ERP takes over the repetitive, chase-prone, hand-carried parts — and your team keeps the thinking.</div>
          <div className="pibadges"><span className="pib">⚙ 6 automation modules</span><span className="pib">⇄ handoffs that don't need following-up</span><span className="pib">1 shared timeline for the whole order</span></div>
        </div>

        {/* Interactive ROI Impact Calculator */}
        <div className="roi-calculator">
          <div className="roi-head">
            <div className="sct">Interactive ROI &amp; Value Estimator</div>
            <h2>What VSN Automation Saves Your Team</h2>
            <p>Adjust your monthly order volume to see projected time and cost savings.</p>
          </div>
          <div className="roi-body">
            <div className="roi-control">
              <label>Monthly Order Volume: <b>{volume} orders / month</b></label>
              <input
                type="range"
                min="20"
                max="500"
                step="10"
                value={volume}
                onChange={e => setVolume(Number(e.target.value))}
                className="roi-slider"
              />
              <div className="roi-ticks"><span>20 orders</span><span>250 orders</span><span>500+ orders</span></div>
            </div>
            <div className="roi-cards">
              <div className="roi-card">
                <Icon name="clock" size={20} />
                <div className="roi-val">{hoursSaved} hrs</div>
                <div className="roi-lbl">Manual Chasing Saved / mo</div>
              </div>
              <div className="roi-card">
                <Icon name="dollar" size={20} />
                <div className="roi-val">${costSavings}</div>
                <div className="roi-lbl">Est. Efficiency Gain / mo</div>
              </div>
              <div className="roi-card">
                <Icon name="shieldCheck" size={20} />
                <div className="roi-val">{errorReduction}%</div>
                <div className="roi-lbl">Handoff Error Elimination</div>
              </div>
            </div>
          </div>
        </div>

        <div className="sect"><span className="sbar"></span><h2>Today, someone has to do this by hand</h2>
          <div className="ssub">The pain points are real — you can see them in Act 01 as you watch the transaction run.</div></div>
        <div className="painrow" id="painrow">
          {PAINS.map(p => <div className="pain" key={p.t}><Icon name={p.ic} size={17} /><b>{p.t}</b><span>{p.d}</span></div>)}
        </div>

        <div className="sect"><span className="sbar"></span><h2>What we can automate for you</h2>
          <div className="ssub">Six proven automation modules. Click one to see what it does — and what it takes off your people.</div></div>
        <div className="modrow" id="modrow">
          {MODS.map(x => (
            <div key={x.id} className={'mod' + (selMod === x.id ? ' sel' : '')} id={'mod-' + x.id} data-m={x.id} onClick={() => setSelMod(selMod === x.id ? null : x.id)}>
              <div className="mh"><span className="mic"><Icon name={x.ic} size={17} /></span><div><div className="mtt">{x.t}</div><div className="mts">{x.sub}</div></div></div>
              <div className="mdesc">{x.d}</div>
              <div className="mphases">{x.phases.map(p => <span className="phchip" key={p}>{p}</span>)}</div>
            </div>
          ))}
        </div>
        <div className={'module-detail' + (m ? ' open' : '')} id="modDetail">
          {m && (
            <div className="mwait">
              <div className="mhead"><span className="mic" style={{ background: 'var(--erp)' }}><Icon name={m.ic} size={17} /></span>
                <div><b>{m.t}</b><div style={{ fontSize: 11, color: 'var(--muted)' }}>{m.sub}</div></div></div>
              <div className="mdesc" style={{ fontSize: 12, color: 'var(--muted)', marginTop: 10, lineHeight: 1.6 }}>{m.d}</div>
              <div className="flowline">{m.phases.map((p, i) => <span key={p}>{i > 0 ? <span className="flarrow">→</span> : null}<span className="flstep">{p}</span></span>)}</div>
              <div style={{ marginTop: 12, fontSize: 11.5, background: '#eef2ff', border: '1px solid #c7d2fe', borderRadius: 10, padding: '10px 13px', color: '#3730a3' }}>
                <b>What it takes off your team:</b> {m.repl}</div>
            </div>
          )}
        </div>

        <div className="sect"><span className="sbar"></span><h2>Before vs after</h2>
          <div className="ssub">The same transaction — with and without the automation we're proposing.</div></div>
        <div className="ba">
          <div className="bac today"><div className="bh">✕ Today — manual</div><ul id="baToday">{TODAY_BA.map((x, i) => <li key={i}><span className="x">✕</span>{x}</li>)}</ul></div>
          <div className="bac auto"><div className="bh">✓ With VSN automation</div><ul id="baAuto">{AUTO_BA.map((x, i) => <li key={i}><span className="ck">✓</span>{x}</li>)}</ul></div>
        </div>

        <div className="sect"><span className="sbar"></span><h2>Why buy it</h2></div>
        <div className="candid" id="candid">
          {CANDID.map(c => <div className="candy" key={c.t}><Icon name={c.ic} size={17} /><b>{c.t}</b><span>{c.d}</span></div>)}
        </div>

        <div className="covery">
          <div className="big">One transaction → one timeline — your team does the decisions, the ERP does the chasing.</div>
          <div className="sub">Each automation module maps to a workflow you already saw. Scope, packaging and pricing for the modules are <span className="tbdbadge">TBD — CLIENT VALIDATION REQUIRED</span> — we bring this as an offer, not a fait accompli.</div>
        </div>
      </div>
    </div>
  )
}