import { useMemo, useState } from 'react'
import { CATS } from '../data/catalog.js'
import { D } from '../data/departments.js'
import { ACTINTRO } from '../data/intro.js'
import { Icon } from '../lib/icons.jsx'

function deptChip(key) {
  const d = D[key.toUpperCase()] || D.ERP
  return <><span className="ddot" style={{ background: d.col }}></span><span className="dname">{d.label}</span></>
}

export default function ActTwo({ onOpenDiag, on }) {
  const [sel, setSel] = useState(null)
  const stats = useMemo(() => {
    let totalNodes = 0, totalFlows = 0
    const deptSet = new Set()
    CATS.forEach(c => c.flows.forEach(f => { totalFlows++; totalNodes += f.n; f.depts.forEach(x => deptSet.add(x)) }))
    return {
      row: [
        [`${totalFlows}`, 'workflows mapped'], [`${totalNodes}`, 'process nodes'],
        [`${deptSet.size}`, 'departments connected'],
        ['13', 'decision points in the RFQ→POD run'], ['6', 'automation modules in the offer']
      ]
    }
  }, [])
  return (
    <div className={'act' + (on ? ' on' : '')} data-slot="2">
      <div className="hero">
        <span className="k">Act 02</span><h1>The System</h1>
        <span className="hsub">Every process we mapped for VSN — click any workflow to expand it.</span>
        <span className="heroline">Colours = departments · dashed purple = automation the ERP runs</span>
      </div>
      <div className="actbanner" id="actBanner2">
        <div className="ab"><b>What this is</b><span>{ACTINTRO[1].what}</span></div>
        <div className="ab"><b>What we did</b><span>{ACTINTRO[1].did}</span></div>
      </div>
      <div className="statrow" id="statrow">
        {stats.row.map(s => <div className="stat" key={s[1]}><b>{s[0]}</b><span>{s[1]}</span></div>)}
      </div>
      <div className="scrolly" id="syslist">
        {CATS.map(c => (
          <div className="cat" key={c.key}>
            <div className="cath"><span className="bar" style={{ background: c.color }}></span><b>{c.name}</b><span>· {c.flows.length} workflows</span></div>
            <div className="wgrid">
              {c.flows.map(f => (
                <div key={f.id} className={'wfcard' + (sel === f.id ? ' sel' : '')} id={'wf-' + f.id} data-f={f.id} style={{ '--cc': c.color }}
                  onClick={() => { setSel(f.id); onOpenDiag(f.id) }}>
                  <div className="wfh"><span className="wfic"><Icon name={f.ic} size={16} /></span>
                    <div><div className="wft">{f.t}</div><div className="wfs">{f.d}</div></div></div>
                  <div className="wfm"><span className="wn">{f.n} nodes</span>{f.depts.map(x => <span key={x} className="dp">{deptChip(x)}</span>)}</div>
                  <div className="wfopen"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7" /><path d="M7 7h10v10" /></svg>Open workflow diagram</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}