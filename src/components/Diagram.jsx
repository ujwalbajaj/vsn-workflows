import { useEffect, useRef, useState } from 'react'
import { CATS } from '../data/catalog.js'
import { DIAGRAMS } from '../data/diagrams.js'
import { HX } from '../data/departments.js'

const DEPT_LABEL = { customer: 'Customer', sales: 'Sales', purchase: 'Purchase', finance: 'Finance', logistics: 'Logistics', store: 'Store / QC' }
const DEPT_KEY = { customer: 'cust', sales: 'sales', purchase: 'purchase', finance: 'finance', logistics: 'log', store: 'store' }

export default function Diagram({ wf, onClose }) {
  const [stats, setStats] = useState(null)
  const [meta, setMeta] = useState(null)
  const [mode, setMode] = useState('fit')
  const [zoom, setZoom] = useState(1)
  const [info, setInfo] = useState(null)
  const scrollRef = useRef(null)
  const drag = useRef(null)

  useEffect(() => {
    if (!wf) return
    setMeta(CATS.flatMap(c => c.flows).find(x => x.id === wf) || {})
    setMode('fit')
    setZoom(1)
    setInfo(null)
    setStats(null)

    const timer = setTimeout(() => {
      const body = document.getElementById('diagBody')
      if (body) {
        setStats({
          all: body.querySelectorAll('g.node[data-id]').length,
          dec: body.querySelectorAll('g.node.decision-node[data-id]').length,
          exc: body.querySelectorAll('g.node.exception-node[data-id]').length,
          auto: body.querySelectorAll('g.node.automation-node[data-id]').length,
          hand: body.querySelectorAll('g.node.handoff-node[data-id]').length + body.querySelectorAll('.handoff-dot').length
        })
      }
    }, 50)

    const sc = scrollRef.current
    if (sc) sc.scrollTop = sc.scrollLeft = 0
    return () => clearTimeout(timer)
  }, [wf])

  if (!wf) return null

  const svg = DIAGRAMS[wf] || ''
  const vb = (/viewBox="([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+)"/).exec(svg)
  const vbW = vb ? +vb[3] : 1000
  const width = mode === 'fit' ? '100%' : Math.round(vbW * zoom) + 'px'
  const klass = mode === 'zoom' ? 'diagram-svg wf-zoom' : 'diagram-svg'
  const markup = svg.replace('class="diagram-svg"', `class="${klass}" style="width:${width};height:auto;"`)

  const baseScale = () => (scrollRef.current ? (scrollRef.current.clientWidth - 44) / vbW : 1)

  const setActual = n => {
    const el = scrollRef.current
    if (!el) { setZoom(n); return }
    const scale = n / zoom
    const px = el.scrollLeft + el.clientWidth / 2
    const py = el.scrollTop + el.clientHeight / 2
    setZoom(n)
    requestAnimationFrame(() => { el.scrollLeft = px * scale - el.clientWidth / 2; el.scrollTop = py * scale - el.clientHeight / 2 })
  }

  const onWheel = e => {
    if (mode !== 'zoom') return
    if (e.ctrlKey) e.preventDefault()
    if (!e.ctrlKey && Math.abs(e.deltaY) > 4) {
      const n = Math.min(3, Math.max(0.4, +(zoom * (e.deltaY < 0 ? 1.12 : 0.89)).toFixed(2)))
      const el = scrollRef.current
      const scale = n / zoom
      const px = el.scrollLeft + e.nativeEvent.offsetX + 16
      const py = el.scrollTop + e.nativeEvent.offsetY + 22
      setZoom(n)
      requestAnimationFrame(() => { el.scrollLeft = px * scale - (e.nativeEvent.offsetX + 16); el.scrollTop = py * scale - (e.nativeEvent.offsetY + 22) })
    }
  }

  const onDown = e => {
    drag.current = { x: e.clientX, y: e.clientY, sl: scrollRef.current.scrollLeft, st: scrollRef.current.scrollTop, moved: false }
    scrollRef.current.classList.add('panning')
  }
  const onMove = e => {
    const d = drag.current
    if (!d) return
    const dx = e.clientX - d.x, dy = e.clientY - d.y
    if (Math.abs(dx) + Math.abs(dy) > 4) d.moved = true
    if (d.moved) { scrollRef.current.scrollLeft = d.sl - dx; scrollRef.current.scrollTop = d.st - dy }
  }
  const onUp = e => {
    const d = drag.current
    drag.current = null
    scrollRef.current.classList.remove('panning')
    if (d && !d.moved) {
      const under = document.elementFromPoint(e.clientX, e.clientY)
      const g = under && under.closest ? under.closest('g.node') : null
      if (g) {
        const title = g.querySelector('.node-title')?.textContent
        const desc = g.querySelector('.node-desc')?.textContent
        const dept = g.dataset.dept
        const k = DEPT_KEY[dept]
        setInfo({ x: e.clientX, y: e.clientY, title, desc, dept, col: k ? HX[k]?.col : 'var(--dim)', label: DEPT_LABEL[dept] || dept })
      } else setInfo(null)
    }
  }

  return (
    <div id="diagOverlay" className="on" onClick={e => { if (e.target === e.currentTarget) { setInfo(null); onClose() } }}>
      <div id="diag">
        <div id="diagHead">
          <div id="diagTitleRow"><div id="diagTitle">{meta?.t || ''}</div><div id="diagSub">{meta?.d || ''}</div></div>
          <div id="diagStats">
            {stats && <>
              <span className="dstat">{stats.all} nodes</span>
              {stats.dec ? <span className="dstat dc">{stats.dec} decisions</span> : null}
              {stats.exc ? <span className="dstat">{stats.exc} exceptions</span> : null}
              {stats.auto ? <span className="dstat">{stats.auto} automated</span> : null}
              {stats.hand ? <span className="dstat">{stats.hand} handoffs</span> : null}
            </>}
          </div>
          <div id="diagTools">
            <div className="dzoom" style={mode === 'fit' ? { display: 'none' } : undefined}>
              <button className="dbtn" onClick={() => setActual(Math.round((zoom / 1.2) * 10) / 10)} title="Zoom out">−</button>
              <span className="dzoomv">{Math.round(zoom * 100)}%</span>
              <button className="dbtn" onClick={() => setActual(Math.round((zoom * 1.2) * 10) / 10)} title="Zoom in">+</button>
              <button className="dbtn" onClick={() => { setZoom(baseScale()); setMode('zoom') }} title="Fit to panel">1:1</button>
            </div>
            <button className={'dbtn' + (mode === 'fit' ? ' on' : '')} id="diagFit" onClick={() => { setMode('fit'); setZoom(1) }}>Fit</button>
            <button className={'dbtn' + (mode === 'zoom' ? ' on' : '')} id="diagZoom" onClick={() => { setMode('zoom'); setZoom(baseScale()) }}>Actual</button>
            <button id="diagX" aria-label="Close diagram" onClick={() => { setInfo(null); onClose() }}>✕</button>
          </div>
        </div>
        <div id="diagScroll" ref={scrollRef} className={mode === 'zoom' ? 'actual' : ''}
          onWheel={onWheel} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp}>
          <div id="diagBody" dangerouslySetInnerHTML={{ __html: markup }} />
        </div>
        {info
          ? <div id="diagInfo" style={{ left: Math.min(info.x, window.innerWidth - 250), top: Math.min(info.y, window.innerHeight - 130) }}>
            <span className="di" style={{ background: info.col }}><i>◆</i></span>
            <div><b>{info.title}</b><span className="didept">{info.label}</span><span>{info.desc}</span></div>
          </div>
          : null}
        <div id="diagFoot">{mode === 'zoom' ? 'Drag to pan · wheel to zoom · click a node for detail · ' : 'Click a node for detail · '}<b>Esc</b> closes · colours = departments · labels on arrows = decision outcomes</div>
      </div>
    </div>
  )
}