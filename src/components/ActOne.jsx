import { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { STEPS } from '../data/steps.js'
import { HX } from '../data/departments.js'
import { Icon, IC_CHECK } from '../lib/icons.jsx'

function nowStamp() {
  const d = new Date()
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`
}

function DeptWho({ d }) {
  return <span className={'who ' + d.key}>{d.label}</span>
}
function WhoH({ s }) {
  const a = HX[s.h[0]], b = HX[s.h[1]]
  return (<span className="who hd"><b style={{ color: a.col }}>{a.label}</b><i>→</i><b style={{ color: b.col }}>{b.label}</b></span>)
}
function styFor(s) {
  return s.h ? { '--cola': HX[s.h[0]].col, '--colb': HX[s.h[1]].col, '--col': HX[s.h[1]].col } : { '--col': s.d.col }
}

function Decision({ dec, i, bi, picks }) {
  const id = bi === undefined ? `dec-${i}` : `dec-${i}-${bi}`
  const pick = picks[id]
  const choiceCls = pick === undefined ? '' : 'choice'
  const why = pick !== undefined
    ? (<div className="why"><b>Branch taken:</b> {dec.opts[pick]}{dec.o && dec.o[pick] ? ` — ${dec.o[pick]}` : ''}<br /><i style={{ opacity: .85 }} dangerouslySetInnerHTML={{ __html: dec.why }} /></div>)
    : <div className="why" style={{ opacity: 0 }} dangerouslySetInnerHTML={{ __html: dec.why }} />
  return (
    <div className={'dec ' + choiceCls} id={id}>
      <div className="q"><Icon name="warn" size={17} /> {dec.prompt}</div>
      <div className="opt">
        {dec.opts.map((o, j) => {
          const hit = (pick !== undefined && pick === j) ? ' hit' : ''
          const taken = pick === j ? <span className="taken">✓ taken</span> : null
          const out = dec.o && dec.o[j] ? <span className="out">↳ {dec.o[j]}</span> : null
          return (
            <span className={'o' + hit} key={j}>
              <span className="l1"><span className="tick"><Icon name="check" size={12} sw={2.6} /></span><span className="br">{o}</span>{taken}</span>
              {out}
            </span>
          )
        })}
      </div>
      {why}
    </div>
  )
}

function Pars({ s, i, picks }) {
  if (!s.par) return null
  return (
    <div className="spotpar">
      {s.par.map((p, bi) => (
        <div className="pcard" key={bi}>
          <div className="t"><Icon name={p.ic} size={14} /><span className="td">{p.t}</span><DeptWho d={p.d} /><span className="rule">{p.r}</span></div>
          <div className="desc">{p.b}</div>
          {p.dec ? <Decision dec={p.dec} i={i} bi={bi} picks={picks} /> : null}
        </div>
      ))}
    </div>
  )
}

function Row({ s, i, idx, picks, onSelect }) {
  const on = i === idx, done = i < idx
  const cls = ('trow ' + (on ? 'on' : done ? 'done' : 'up') + (s.h ? ' hd' : '') + (s.par ? ' par' : '') + (s.dec ? ' dec' : '')).trim()
  const gl = on ? '' : (s.par ? '∥' : s.dec ? '◆' : s.h ? '⇄' : '')
  const node = done ? IC_CHECK : <Icon name={s.ic} size={14} />
  return (
    <div className={cls} data-i={i} data-id={s.id} style={styFor(s)} onClick={() => onSelect(i)}>
      <div className="rail"><span className="node">{node}</span></div>
      <div className="tcard">
        <div className="row1">
          <span className="tno">{String(i + 1).padStart(2, '0')}</span>
          <span className="title">{s.t}</span>
          {s.h ? <WhoH s={s} /> : <DeptWho d={s.d} />}
          <span className="rule">{s.r}</span><span className="gl">{gl}</span>
        </div>
        {on && (
          <div className="more">
            <div className="desc" dangerouslySetInnerHTML={{ __html: s.b }} />
            {s.dec ? <Decision dec={s.dec} i={i} picks={picks} /> : null}
            {s.e ? (
              <div className="evlist"><div className="evh">IN-CADENCE EVENTS</div>{s.e.map((ev, k) => <div className="evi" key={k}><i>✓</i>{ev}</div>)}</div>
            ) : null}
            <Pars s={s} i={i} picks={picks} />
          </div>
        )}
      </div>
    </div>
  )
}

export default function ActOne({ actRef, banner, on }) {
  const [idx, setIdx] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [picks, setPicks] = useState({})
  const [logs, setLogs] = useState([])
  const [status, setStatus] = useState('Ready — press Play')
  const [statusClass, setStatusClass] = useState('')
  const idxRef = useRef(-1)
  const actRow = useRef(null)

  const addLog = useCallback((ev, cls) => {
    setLogs(p => [{ ev, cls: cls || 'ev', t: nowStamp() }, ...p].slice(0, 200))
  }, [])

  const resolveDecision = useCallback((s, i, bi) => {
    const id = bi === undefined ? `dec-${i}` : `dec-${i}-${bi}`
    if (idxRef.current !== i) {
      if (s.dec) addLog(`Decision on ${s.t}: auto-resolved → ${s.dec.opts[s.dec.pick]}`, 'dec2')
      return
    }
    setPicks(p => ({ ...p, [id]: s.dec.pick }))
    setTimeout(() => { addLog(`DECISION · ${s.dec.prompt} → "${s.dec.opts[s.dec.pick]}"`, 'dec2') }, 300 / speed)
  }, [addLog, speed])

  const finish = useCallback(() => {
    setPlaying(false)
    setStatus('✅ Walkthrough complete — RFQ → POD delivered. (PO-closure semantics remain TBD: TBD-18.)')
    setStatusClass('done')
  }, [])

  const stopPlay = useCallback(() => {
    setPlaying(false)
    setStatus('Paused — press Play or Step')
    setStatusClass('paused')
  }, [])

  const runStep = useCallback(() => {
    if (idxRef.current >= STEPS.length - 1) { stopPlay(); finish(); return }
    idxRef.current++
    setIdx(idxRef.current)
    const s = STEPS[idxRef.current]
    if (s.h) addLog(`HANDOFF · ${HX[s.h[0]].label} → ${HX[s.h[1]].label}`, 'hd')
    if (s.e) s.e.forEach(ev => addLog(ev, 'ev'))
    if (s.dec) { addLog(`DECISION POINT · ${s.dec.prompt}`, 'dec2'); setTimeout(() => resolveDecision(s, idxRef.current), 400 / speed) }
    if (s.par) s.par.forEach((p, bi) => { addLog(p.e, 'par'); if (p.dec) setTimeout(() => resolveDecision(p, idxRef.current, bi), 600 / speed) })
  }, [addLog, finish, resolveDecision, speed, stopPlay])

  const seek = useCallback((i) => {
    const was = playing
    if (was) stopPlay()
    const next = Math.max(0, Math.min(i, STEPS.length - 1))
    idxRef.current = next
    setIdx(next)
    if (next === STEPS.length - 1) finish()
    else if (was) { setPlaying(true); setStatus('Playing — auto-resolving each decision point'); setStatusClass('playing') }
  }, [playing, stopPlay, finish])

  const startPlaying = useCallback(() => {
    if (idxRef.current >= STEPS.length - 1) return
    setPlaying(true)
    setStatus('Playing — auto-resolving each decision point')
    setStatusClass('playing')
    if (idxRef.current < 0) runStep()
  }, [runStep])

  useEffect(() => {
    if (!playing) return
    const t = setTimeout(() => runStep(), 1750 / speed)
    return () => clearTimeout(t)
  }, [playing, speed, idx])

  useImperativeHandle(actRef, () => ({
    togglePlay() {
      if (playing) stopPlay()
      else if (idx >= STEPS.length - 1) {
        idxRef.current = -1
        setIdx(-1)
        setPicks({})
        setLogs([])
        startPlaying()
      } else startPlaying()
    },
    step() { if (playing) stopPlay(); runStep() },
    back() { if (playing) stopPlay(); if (idx > 0) seek(idx - 1) },
    restart() {
      stopPlay()
      idxRef.current = -1
      setIdx(-1)
      setPicks({})
      setLogs([])
      setStatus('Ready — press Play to run the automatic walkthrough')
      setStatusClass('')
    },
    speed(n) { setSpeed(n) }
  }), [playing, idx, stopPlay, runStep, seek, startPlaying])

  useEffect(() => {
    if (actRow.current && actRow.current.scrollIntoView) actRow.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [idx])

  const done = Math.min(idx + 1, STEPS.length)

  return (
    <div className={'act' + (on ? ' on' : '')} id="act-stage" data-slot="1">
      <div className="act-hero act-1">
        <span className="k">Act 01 · The Transaction</span>
        <h1>The Transaction</h1>
        <div className="sub">RFQ → POD — one order traced end-to-end across six departments. Every decision shows <b>all</b> candidate paths · the run highlights the path VSN's rules take.</div>
        <div className="pibadges"><span className="pib">RFQ → POD</span><span className="pib">28 steps</span><span className="pib">6 departments</span><span className="pib">13 decisions</span></div>
      </div>
      <div className="tx-timeline">
        {STEPS.map((s, i) => (
          <span key={s.id} style={{ display: 'contents' }}>
            <span className={'tx-dot' + (i < idx ? ' done' : i === idx ? ' active' : '')} style={i <= idx && s.d ? { background: s.d.col } : {}} title={s.t} />
            {i < STEPS.length - 1 && <span className={'tx-line' + (i < idx ? ' done' : '')} />}
          </span>
        ))}
      </div>
      <div className="lay1">
        <div className="leftc">
          <div className="ctrlbar">
            <button className="btn primary" id="btnPlay" onClick={() => actRef.current.togglePlay()}>
              <svg className="sv" id="playIc" viewBox="0 0 24 24" fill="currentColor">
                {playing ? (
                  <>
                    <rect x="6" y="5" width="4" height="14" rx="1" />
                    <rect x="14" y="5" width="4" height="14" rx="1" />
                  </>
                ) : (
                  <path d="M8 5v14l11-7z" />
                )}
              </svg>
              <span id="playTxt">{playing ? 'Pause' : 'Play'}</span>
            </button>
            <button className="btn sub" id="btnStep" onClick={() => actRef.current.step()}>Step ›</button>
            <button className="btn sub" id="btnBack" onClick={() => actRef.current.back()}>‹ Back</button>
            <button className="btn sub" id="btnRestart" title="Restart walkthrough" onClick={() => actRef.current.restart()}>⟳ Restart</button>
            <div className="spdwrap" id="spdwrap">
              {[1, 2, 4].map(s => <button key={s} className={'spd' + (speed === s ? ' on' : '')} data-s={s} onClick={() => actRef.current.speed(s)}>{s}×</button>)}
            </div>
            <div className="rhs">
              <div id="status" className={statusClass}>{status}</div>
              <div className="pct" id="counter">{done} / {STEPS.length}</div>
              <div className="prog"><i id="progBar" style={{ width: (done / STEPS.length * 100) + '%' }} /></div>
            </div>
          </div>
          <div className="hint" id="hint" style={{ display: idx >= 0 ? 'none' : 'block' }}>Press <b>Play</b> for the automatic walkthrough, <b>Step ›</b> for one-by-one, or click any row in the trail. Decision boxes list <b>all candidate paths</b> with where each leads — the green <b>✓ taken</b> is the branch auto-resolved per VSN's knowledge-base rules. <b>⇄ gradient</b> rows are inter-department handoffs.</div>
          <div className="trail" id="trail">
            {STEPS.map((s, i) => <div key={s.id} ref={i === idx ? actRow : undefined}><Row s={s} i={i} idx={idx} picks={picks} onSelect={(n) => seek(n)} /></div>)}
          </div>
        </div>
        <div className="logc">
          <div className="logh"><div className="dots"><i /><i /><i /></div>LIVE EVENT TRACE<span className="n" id="traceCount">{logs.length} events</span></div>
          <div id="log">
            {logs.map((l, k) => <div className={'li ' + l.cls} key={k}><span className="t">{l.t}</span><span className="ev">{l.ev}</span></div>)}
            {logs.length === 0 ? <div style={{ fontSize: 11, color: 'var(--faint)', padding: 10 }}>No events yet — press <b>Play</b></div> : null}
          </div>
        </div>
      </div>
    </div>
  )
}