export const ACTINTRO = [
  { what: 'One complete trade, run live — an RFQ from your own notes. Press Play and watch it move customer → POD, with every decision shown as it is taken.',
    did: 'We turned the rules you gave us into 28 timed, runnable steps with 13 decision points and live handoffs — all traceable back to your workflow notes (rule IDs stay as citations).' },
  { what: 'Every workflow you asked us to work from, organised — the current state of the business as a connected system, not a pile of files.',
    did: 'We mapped 22 workflow files / 22 workflows · 198 process nodes, grouped exactly like the source repo — executive, core, automation and strategic.' },
  { what: 'The part of the business we can move from people onto the ERP — the repetitive, chase-prone, hand-carried work. Your team keeps the thinking.',
    did: 'We turned your workflow notes into 6 sellable automation modules, each with its phases and its before/after on the same customer trade.' },
  { what: 'What the client will actually sit down with: one screen module that holds the whole ERP — dashboard, lanes, all departments, and the honest permission map.',
    did: 'We built a single screen module from your rule IDs (SW · PW · FN · LG · ST · MGMT): the app shell with six automation homes embedded, every department visible together (no pickers), and a can / cannot / decides matrix — with every screen-level rule left TBD until you confirm it.' }
]

export const GUIDE = [
{ sel: '.acttab[data-a="1"]', act: 1, title: '1 · The Transaction', text: 'Tab <b>01</b> plays the deal itself: an RFQ from a real VSN note — <b>MPN-24LC256 · 1000 pcs</b> — from customer all the way to proof of delivery.', next: 'Show me the controls' },
  { sel: '#btnPlay', act: 1, title: 'Play & Pause', text: "<b>Play</b> runs all 28 steps automatically and resolves each decision using VSN's rules. It becomes <b>Pause</b> while it runs." },
  { sel: '#btnStep', act: 1, title: 'Step', text: 'Prefer to go slowly? <b>Step</b> advances one step at a time — handy when you want to read each handoff or decision.' },
  { sel: '.trow', act: 1, title: 'The 28 steps', text: 'Every row is <b>already filled from your notes</b> — number, owning department (its colour) and the rule ID it came from. The step in progress opens its details below the title.' },
  { sel: '.logc', act: 1, title: 'The live log', text: "Every event this run produces lands here with a timestamp: decisions taken, handoffs, in-cadence events. <b>The whole deal leaves an audit trail</b>." },
  { sel: '.wfcard', act: 2, title: 'Click any workflow', text: 'Click a card and its full workflow diagram opens — the same SVG from your workflows page. Nodes, decisions, exceptions and handoffs, all in one neat view.' },
  { sel: '.acttab[data-a="3"]', act: 3, title: '9 · The offer', text: 'Tab <b>03</b> is what we can sell you: the repetitive, chase-prone work we can move onto the ERP — while your team keeps the decisions.' },
  { sel: '.mod', act: 3, title: 'Six automation modules', text: '<b>Task handoff · SLA escalations · ETA updates · exception routing · document compliance · management alerts.</b> Click any module to expand it.' },
  { sel: '.covery', act: 3, title: 'The one-liner', text: 'One transaction → one timeline. Your team does the decisions; the ERP does the chasing. <b>That is the offer.</b>' },
  { sel: '.acttab[data-a="4"]', act: 4, sub: 1, title: '11 · The Software', text: "Tab <b>04</b> is what the ERP looks like, not just what it does — one screen module holding every department at once, plus the honest <b>who can do what</b>.", next: 'Show me the module' },
  { sel: '#seatSw', act: 4, title: 'One module, all of it', text: 'Everything sits inside the single screen module — no department tabs, no role pickers. Switch the <b>seat</b> here (Management / Department Head / Employee) and the screen re-shapes for it. The permission matrix lives in the workspace sidebar under <b>Access &amp; Permissions</b>.', next: 'Wrap up' },
  { sel: null, title: 'You are set', text: "That's the whole story in about 90 seconds. <b>Go back to tab 01 and press Play</b> — or jump to tab 03 and open a module, then tab 04 to see it on the client's screen. And the page never hides a gap: anything unconfirmed stays <b>TBD</b>.", next: 'Done' }
]