export default function Cover({ open, onStart, onSkip }) {
  if (!open) return null
  return (
    <div id="cover" className="on">
      <div className="coverCard">
        <div className="bm"><span className="cl">VSN</span> VSN ERP — Client Presentation</div>
        <h1>Your business, as one connected transaction.</h1>
        <p className="lead">This page is <b>live</b> — press play and watch an actual RFQ move from customer to proof of delivery. It shows what we've built from your own workflow notes, and the part we can automate for you. Nothing here is invented.</p>
        <div className="covhow">
          <div className="r"><span className="n">1</span><span><b>Watch the trade run.</b> Press <b>Play</b> and one order auto-runs through all 28 steps, RFQ → delivery.</span></div>
          <div className="r"><span className="n">2</span><span><b>Explore the system.</b> Tab <b>02</b> shows every workflow we mapped; tab <b>03</b> shows what we can automate; tab <b>04</b> shows what the software will look like.</span></div>
          <div className="r"><span className="n">3</span><span><b>Understand it in 90 seconds.</b> A short guided tour points at each control as you go.</span></div>
        </div>
        <div className="covstats">
          <span className="s">28 workflow steps</span><span className="s">13 decisions</span><span className="s">22 workflows mapped</span><span className="s">6 automation modules</span><span className="s">4 lenses on the software</span><span className="s">20 exception scenarios</span>
        </div>
        <div className="covbtns">
          <button className="cbtn tour" onClick={onStart}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>
            Start the 90-second guide
          </button>
          <button className="cbtn plain" onClick={onSkip}>Skip — let me explore</button>
        </div>
        <div className="covfoot">Everything traces back to your requirements &amp; notes (rule IDs stay as citations). Anything your team hasn't confirmed yet stays marked <b>TBD — client validation required</b>.</div>
      </div>
    </div>
  )
}