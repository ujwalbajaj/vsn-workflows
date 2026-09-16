const KEYS = [
  ['1 · 2 · 3 · 4', 'Switch acts — transaction · system · automation · software'],
  ['Space', 'Play / pause the walkthrough (Act 01)'],
  ['→ · ←', 'Step forward / back through the walkthrough'],
  ['Wheel + Ctrl', 'Zoom a workflow diagram (Actual view)'],
  ['Drag', 'Pan the workflow diagram (Actual view)'],
  ['Click a node', 'See its department, name and step in any diagram'],
  ['Esc', 'Close the top-most overlay'],
  ['? or ⌘/Ctrl + /', 'Toggle this help']
]

export default function Keys({ open, onClose }) {
  if (!open) return null
  return (
    <div id="kOverlay" className="on" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div id="kBox" role="dialog" aria-label="Keyboard shortcuts">
        <div className="kh"><b>Keyboard & mouse</b><button className="x" onClick={onClose} aria-label="Close">✕</button></div>
        <div className="kr">
          {KEYS.map(k => (
            <div className="row" key={k[0]}>
              <kbd>{k[0]}</kbd>
              <span>{k[1]}</span>
            </div>
          ))}
        </div>
        <div className="kn">Press <kbd>? </kbd>anytime to bring this back.</div>
      </div>
    </div>
  )
}