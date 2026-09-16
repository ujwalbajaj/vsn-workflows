import { useEffect, useRef, useState } from 'react'
import { GUIDE } from '../data/intro.js'

export default function Coach({ open, onClose, setAct, setSub }) {
  const [gi, setGi] = useState(0)
  const tipRef = useRef(null)

  useEffect(() => {
    if (!open) return
    setGi(0)
  }, [open])

  useEffect(() => {
    if (!open) return
    const s = GUIDE[gi]
    if (s.act) setAct(s.act)
    if (s.sub) setSub(s.sub)
    const tip = tipRef.current
    if (!tip) return
    tip.querySelector('.ctstep').textContent = 'GUIDE · ' + (gi + 1) + ' / ' + GUIDE.length
    tip.querySelector('.cttitle').textContent = s.title
    tip.querySelector('.cttext').innerHTML = s.text
    const dots = tip.querySelector('.ctdots')
    dots.innerHTML = ''
    GUIDE.forEach((g, n) => { const d = document.createElement('i'); if (n === gi) d.className = 'on'; dots.appendChild(d) })
    const nx = document.getElementById('ctNext'), pv = document.getElementById('ctPrev')
    if (nx) nx.textContent = (gi === GUIDE.length - 1) ? 'Done' : 'Next ›'
    if (pv) pv.style.visibility = (gi === 0) ? 'hidden' : 'visible'
    const el = s.sel ? document.querySelector(s.sel) : null
    const spot = document.getElementById('spot')
    const position = () => {
      const r = el && typeof el.getBoundingClientRect === 'function' ? el.getBoundingClientRect() : null
      const tip2 = tipRef.current
      const W = window.innerWidth || 1100, H = window.innerHeight || 720
      if (r && r.width) {
        if (spot) spot.style.cssText = 'left:' + Math.max(0, r.left - 6) + 'px;top:' + Math.max(0, r.top - 6) + 'px;width:' + (r.width + 12) + 'px;height:' + (r.height + 12) + 'px;display:block;'
        const TW = tip2.offsetWidth || 336, TH = tip2.offsetHeight || 230, GAP = 18
        const x = Math.min(Math.max(12, Math.round(r.left + (r.width - TW) / 2)), W - TW - 12)
        const y = (r.bottom + GAP + TH <= H) ? r.bottom + GAP : Math.max(12, r.top - TH - GAP)
        tip2.style.left = x + 'px'; tip2.style.top = y + 'px'
      } else {
        if (spot) spot.style.display = 'none'
        const TW = tip2.offsetWidth || 336, TH = tip2.offsetHeight || 230
        tip2.style.left = Math.round((W - TW) / 2) + 'px'
        tip2.style.top = Math.max(14, H - TH - 26) + 'px'
      }
    }
    if (el && typeof el.scrollIntoView === 'function') {
      try { el.scrollIntoView({ block: 'center', behavior: 'smooth' }) } catch (e) { }
      setTimeout(position, 260)
    } else position()
  }, [open, gi])

  if (!open) return null
  return (
    <div id="coach" className="on">
      <div id="coachMask" onClick={onClose}></div>
      <div id="spot"></div>
      <div id="coachTip" ref={tipRef}>
        <div className="ctstep">GUIDE</div>
        <div className="cttitle"></div>
        <div className="cttext"></div>
        <div className="ctnav">
          <button className="ctbtn skip" id="ctSkip" onClick={onClose}>Skip</button>
          <div className="ctdots"></div>
          <button className="ctbtn plain" id="ctPrev" style={{ visibility: (gi === 0 ? 'hidden' : 'visible') }} onClick={() => { if (gi > 0) setGi(gi - 1) }}>‹ Prev</button>
          <button className="ctbtn primary" id="ctNext" onClick={() => { if (gi >= GUIDE.length - 1) onClose(); else setGi(gi + 1) }}>{gi === GUIDE.length - 1 ? 'Done' : 'Next ›'}</button>
        </div>
      </div>
    </div>
  )
}