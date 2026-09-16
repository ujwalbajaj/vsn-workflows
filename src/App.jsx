import { useEffect, useRef, useState } from 'react'
import Header from './components/Header.jsx'
import Cover from './components/Cover.jsx'
import Legend from './components/Legend.jsx'
import Coach from './components/Coach.jsx'
import Keys from './components/Keys.jsx'
import Diagram from './components/Diagram.jsx'
import ActOne from './components/ActOne.jsx'
import ActTwo from './components/ActTwo.jsx'
import ActThree from './components/ActThree.jsx'
import ActFour, { VIEW_SIDS } from './components/ActFour.jsx'
import { ACTINTRO } from './data/intro.js'

const PKEY = 'vsn-pos'
const loadPos = () => { try { return JSON.parse(localStorage.getItem(PKEY)) || {} } catch { return {} } }

export default function App() {
  const init = loadPos()
  const [act, setAct] = useState(init.act || 1)
  const [sub, setSub] = useState(init.sub || 1)
  const [view, setView] = useState(init.view || 'mgmt')
  const [a4sid, setA4sid] = useState(init.a4sid || 'dash')
  const [cover, setCover] = useState(() => localStorage.getItem('vsn-cover') !== '1')
  const [legend, setLegend] = useState(false)
  const [coach, setCoach] = useState(false)
  const [keys, setKeys] = useState(false)
  const [diag, setDiag] = useState(null)
  const act1 = useRef(null)

  useEffect(() => { localStorage.setItem(PKEY, JSON.stringify({ act, sub, view, a4sid })) }, [act, sub, view, a4sid])

  const changedView = v => {
    setView(v)
    if (!(VIEW_SIDS[v] || VIEW_SIDS.mgmt).includes(a4sid)) setA4sid((VIEW_SIDS[v] || VIEW_SIDS.mgmt)[0])
  }

  const closeTop = () => {
    if (diag) setDiag(null)
    else if (legend) setLegend(false)
    else if (keys) setKeys(false)
    else if (coach) setCoach(false)
  }

  useEffect(() => {
    const h = e => {
      if ((e.key === '?' || (e.key === '/' && (e.ctrlKey || e.metaKey))) && ![coach, legend, diag].some(Boolean)) { e.preventDefault(); setKeys(k => !k); return }
      if (e.key === '1') setAct(1)
      else if (e.key === '2') setAct(2)
      else if (e.key === '3') setAct(3)
      else if (e.key === '4') setAct(4)
      else if (e.key === ' ') { e.preventDefault(); if (act1.current) act1.current.togglePlay() }
      else if (e.key === 'ArrowRight') { if (act1.current) act1.current.step() }
      else if (e.key === 'ArrowLeft') { if (act1.current) act1.current.back() }
      else if (e.key === 'Escape') { if (cover) setCover(false); else closeTop() }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  })

  return (
    <>
      <Cover open={cover} onStart={() => { setCover(false); localStorage.setItem('vsn-cover', '1'); setCoach(true) }}
        onSkip={() => { setCover(false); localStorage.setItem('vsn-cover', '1') }} />
      <Legend open={legend} onClose={() => setLegend(false)} />
      <Coach open={coach} onClose={() => setCoach(false)} setAct={setAct} setSub={setSub} />
      <Keys open={keys} onClose={() => setKeys(false)} />
      <Diagram wf={diag} onClose={() => setDiag(null)} />
      <div className="app">
        <Header act={act} onAct={setAct} onLegend={() => setLegend(true)} onHelp={() => setCoach(true)} onKeys={() => setKeys(true)} />
        <div id="acts">
          <ActOne actRef={act1} banner={ACTINTRO[0]} on={act === 1} />
          <ActTwo onOpenDiag={setDiag} on={act === 2} />
          <ActThree on={act === 3} />
          <ActFour sub={sub} onSubTab={setSub} sid={a4sid} onSid={setA4sid} on={act === 4} view={view} onView={changedView} />
        </div>
      </div>
    </>
  )
}