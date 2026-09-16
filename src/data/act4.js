export const SOFT_HOMES = [
  { k: 'handoff', sid: 'handoff', ic: 'flow', t: 'Task handoff', d: 'Work moves from one owner to the next with a click — no chasing, no \u201cdid you get it?\u201d', wf: 'auto-01' },
  { k: 'sla', sid: 'sla', ic: 'clock', t: 'SLA escalations', d: 'Every handoff gets a countdown; a delay raises the red flag by itself instead of being forgotten.', wf: 'auto-02' },
  { k: 'eta', sid: 'eta', ic: 'route', t: 'ETA updates', d: 'The customer sees one live ETA that rewrites itself at every step — no spreadsheets.', wf: 'auto-03' },
  { k: 'excp', sid: 'exc', ic: 'alert', t: 'Exception routing', d: 'Anything off-plan reaches the right decision-maker with full context, instead of getting stuck.', wf: 'auto-04' },
  { k: 'docs', sid: 'docs', ic: 'fileCheck', t: 'Document compliance', d: 'Every PDF and POD is tabbed to its order automatically; nothing is \u201clost in a folder\u201d.', wf: 'auto-05' },
  { k: 'mgmt', sid: 'alert', ic: 'gauge', t: 'Management alerts', d: 'Leaders see exceptions and SLA exposure across every lane — on one screen.', wf: 'auto-06' }
]

export const SOFT_DEPS = [
  { k: 'sales', own: 'The customer and the RFQ — from requirement to acknowledgement.', dec: 'Sales decides the price',
    mods: [['Create the RFQ', 'SW-02', 'file'], ['Classify priority', 'SW-03', 'tag'], ['Validate requirement', 'SW-05', 'checkCir']] },
  { k: 'purchase', own: 'Sourcing and the PO — supplier selection through order placement.', dec: 'Purchase decides the quantity to order',
    mods: [['Get quotes', 'SW-06 → PW-01', 'search'], ['Pick the supplier', 'PW-03 · PW-04', 'users'], ['Issue the PO', 'PW-09', 'cart']] },
  { k: 'finance', own: 'Money and documents — invoices, payments, verification.', dec: 'Finance decides payments and verification',
    mods: [['Verify documents', 'FN-01', 'fileCheck'], ['Approve payment', 'PW-20 · PW-21', 'dollar'], ['Invoice follow-up', 'PW-16', 'coins']] },
  { k: 'log', own: 'The movement — shipping, tracking, delivery, the ETA to the customer.', dec: 'Logistics decides route and timing \u2014 never payment',
    mods: [['Choose mode and route', 'LG-01', 'route'], ['Set the ETA', 'LG-02', 'clock'], ['Prepare outbound', 'LG-06 · LG-07', 'truck']] },
  { k: 'store', own: 'Receiving, QC and inventory — goods in, quality, allocation.', dec: 'Store decides the QC outcome and allocation',
    mods: [['Receive and verify goods', 'LG-08 · ST-01', 'pkg'], ['Run the QC', 'ST-04 · ST-05', 'flask'], ['Allocate stock', 'ST-08 · ST-10', 'box']] },
  { k: 'mgmt', own: 'Visibility and approval — sees every lane, signs the exceptions.', dec: 'Management approves exceptions and POs',
    mods: [['Control tower', 'MGMT', 'chart'], ['Exception queue', 'PW-07 · MGMT', 'alert'], ['All orders view', 'BR-012', 'list']] }
]

export const SOFT_ROLES = [
  { t: 'Management', sub: 'control tower', ic: 'chart', col: 'var(--mgmt)', kpis: [['All orders', '6 lanes'], ['Open alerts', 'one queue'], ['SLA exposure', 'live count']],
    line: 'The whole house on one screen. Sees every lane and every handoff; decides only the exceptions raised to it — never files paperwork.',
    mods: ['Dashboard', 'Alerts', 'Escalations'] },
  { t: 'Department Head', sub: 'console', ic: 'users', col: 'var(--erp)', kpis: [['Team workload', 'their lane'], ['SLA clock', 'countdown'], ['Exceptions', 'to approve']],
    line: 'Their department\u2019s lane plus every handoff that lands in it — workload for the team, and the alerts that need this head\u2019s call.',
    mods: ['Dept console', 'Handoff', 'SLA', 'Docs'] },
  { t: 'Employee', sub: 'desk', ic: 'user', col: 'var(--purchase)', kpis: [['My tasks', 'today'], ['My handoffs', 'to give'], ['My ETA', 'to update']],
    line: 'Only the tasks assigned to this person: what to do now, what comes next, and which ETA or document is theirs. Nothing else is visible.',
    mods: ['Task queue', 'ETA update', 'Doc upload'] }
]

export const SOFT_HEAD = ['Sales', 'Purchase', 'Finance', 'Logistics', 'Store / QC', 'Management']
export const SOFT_ROWS = [
  { r: 'Create the RFQ', id: 'SW-02', c: ['D', 'X', 'X', 'X', 'X', 'V'] },
  { r: 'Decide the price', id: 'SW-10', c: ['D', 'X', 'X', 'X', 'X', 'V'] },
  { r: 'Source supplier and get quotes', id: 'PW-01 · PW-03', c: ['X', 'D', 'X', 'X', 'X', 'V'] },
  { r: 'Decide the quantity to order', id: 'PW-02', c: ['X', 'D', 'X', 'X', 'X', 'V'] },
  { r: 'Issue the purchase order', id: 'PW-09', c: ['X', 'D', 'X', 'X', 'X', 'V'] },
  { r: 'Verify invoices and documents', id: 'FN-01', c: ['X', 'X', 'D', 'X', 'X', 'V'] },
  { r: 'Approve and release payment', id: 'PW-20 · PW-21', c: ['X', 'X', 'D', 'X', 'X', 'V'] },
  { r: 'Arrange the movement and route', id: 'LG-01', c: ['X', 'X', 'X', 'D', 'X', 'V'] },
  { r: 'Update the customer ETA', id: 'LG-02', c: ['C', 'X', 'X', 'C', 'X', 'V'] },
  { r: 'Receive and inspect the goods', id: 'LG-08 · ST-01', c: ['X', 'X', 'X', 'C', 'D', 'V'] },
  { r: 'Decide the QC outcome', id: 'ST-04 · ST-05', c: ['X', 'X', 'X', 'X', 'D', 'V'] },
  { r: 'Allocate stock to the order', id: 'ST-08 · ST-10', c: ['X', 'X', 'X', 'X', 'D', 'V'] },
  { r: 'Escalate and approve exceptions', id: 'PW-07 · MGMT', c: ['X', 'X', 'X', 'X', 'X', 'D'] }
]

export const A4_ICON = { sales: 'users', purchase: 'cart', finance: 'dollar', log: 'truck', store: 'pkg', mgmt: 'chart' }
export const QC_NOTE = {
  Accept: 'Accepted lot allocates to the order automatically (ST-08) and moves to inventory.',
  Hold: 'Lot is held — the vendor reply clock starts and the SLA ladder watches it (ST-04).',
  Reject: 'Lot is flagged for return / adjustment — Purchase and Finance are notified automatically.'
}
export const A4_ROLES = [
  { key: 'sales', label: 'Sales', tasks: ['Acknowledge RFQ — SW-04', 'Validate requirement — SW-05', 'Hand to Purchase — SW-06', 'Issue customer quotation — SW-09', 'Negotiation follow-up — SW-10'], lines: [['RFQ-1001', 'Quoted, awaiting decision'], ['RFQ-1002', 'Sourcing in progress']], block: 'Not allowed: vendor selection · procurement approval · payments · GRN / QC.' },
  { key: 'purchase', label: 'Purchase', tasks: ['Assess sourcing need — PW-01/02', 'Vendor enquiry &amp; response — PW-03/04', 'Validate quote — PW-05', 'Cost the PO — PW-09', 'Track PO ack — PW-17', 'Vendor delay follow-up — PW-20/21'], lines: [['PO-2304', 'Awaiting shipment'], ['SRQ-88', 'Sourcing in progress']], block: 'Not allowed: customer quotation · moving shipments · payments · GRN / QC.' },
  { key: 'finance', label: 'Finance', tasks: ['Advance payment — FN-02', 'Credit per cycle — FN-03', 'Invoice / payment processing — FN-04', 'Vendor onboarding verify — FN-15', 'Customer onboarding verify — FN-16'], lines: [['Pay-7781', 'Advance pending release'], ['ONB-512', 'Onboarding verify']], block: 'Not allowed: major payments alone · overriding credit control without approval.' },
  { key: 'log', label: 'Logistics', tasks: ['Movement planning — LG-01', 'Shipment arrangement — LG-02', 'Tracking / AWB — LG-07', 'ETA updates — LG-06', 'Store handoff — LG-08'], lines: [['SHIP-334', 'In transit — ETA live'], ['SHIP-335', 'Outbound — prep']], block: 'Not allowed: vendor commercial terms · freight spend beyond limits.' },
  { key: 'store', label: 'Store / QC', tasks: ['Inbound receiving — ST-01', 'Physical verify — ST-03', 'GRN create — ST-02', 'QC assess — ST-04', 'Allocation ready — ST-10'], lines: [['GRN-201', 'QC pending'], ['GRN-202', 'Accepted → stock']], block: 'Not allowed: procurement approval · QC policy · overriding a reject / hold decision.' }
]