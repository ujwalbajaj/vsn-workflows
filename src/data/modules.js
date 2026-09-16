export const MODS = [
  { id: 'auto-01', t: 'Task & Handoff Automation', sub: 'No more waiting for someone to pick it up', ic: 'flow',
    d: 'The ERP watches business events (order confirmed, PO released, goods received) and, the moment one fires, creates the task, assigns it to the right department, and starts the clock. When a department finishes, the handoff to the next one is initiated automatically with the full context attached.',
    phases: ['Trigger', 'Task created', 'Auto-assigned', 'Processed', 'Handoff', 'Acknowledged'],
    repl: 'Replaces the manual "sales hands the requirement to Purchase" step — nothing is lost in translation, nothing waits for someone to remember.' },
  { id: 'auto-02', t: 'SLA & Escalation Automation', sub: 'Delays surface themselves', ic: 'clock',
    d: 'Every task carries a service level. If it is about to breach, the ERP escalates automatically — first the owner, then the manager — until the work is restored. Nobody has to chase, because the system does the chasing.',
    phases: ['SLA set', 'Monitoring', 'Breach detected', 'Escalation', 'Action', 'Restored'],
    repl: 'Replaces "is it done yet?" follow-ups between departments and the silent delays that currently only appear when someone asks.' },
  { id: 'auto-03', t: 'ETA Updates Automation', sub: 'Customers stop calling to ask where it is', ic: 'gauge',
    d: 'From the moment the PO goes out, an expected-arrival date is calculated from the vendor, the route and the timeline. Tracking updates flow in automatically — vendor → import → final ETA — and the customer is told when anything changes.',
    phases: ['ETA calculated', 'Tracked', 'Auto-updated', 'Customer notified', 'On-time / delayed', 'Delivered'],
    repl: 'Replaces the manual ETA check in Logistics and the customer phone call — the customer is informed before they have to ask.' },
  { id: 'auto-04', t: 'Exception Routing Automation', sub: 'Problems route themselves to the right desk', ic: 'alert',
    d: 'When something goes wrong — QC hold, rejected material, vendor delay — the ERP detects it, classifies it, and routes it to the department that can fix it, with everything they need attached.',
    phases: ['Detected', 'Classified', 'Auto-routed', 'Resolved', 'Closed'],
    repl: "Replaces the fire-fighting: today an exception sits until someone notices; tomorrow it appears on the right person's queue instantly." },
  { id: 'auto-05', t: 'Document Compliance', sub: 'Every paper audit-ready', ic: 'archive',
    d: 'Every RFQ, PO, GRN and acknowledgement is validated against the business rules, approved, and archived with the full transaction attached — with a revision loop if it fails. Nothing is missing when audit or the customer asks.',
    phases: ['Created', 'Validated', 'Approved', 'Archived'],
    repl: 'Replaces hunting for the quotation or the GRN — the ERP holds the complete, unbroken chain.' },
  { id: 'auto-06', t: 'Management Alerts Automation', sub: 'You see the business as it happens', ic: 'chart',
    d: 'Data is collected from every workflow, analysed against the rules, and pushed to dashboards and alerts — open orders, exposures, expiring SLAs, exceptions in flight. Management looks at one place, not five.',
    phases: ['Collected', 'Analysed', 'Alerts', 'Dashboards', 'Responded'],
    repl: "Replaces the status meetings assembled from five departments' spreadsheets." }
]

export const PAINS = [
  { ic: 'phone', t: '2 of 4 vendor responses missing', d: 'Purchase follows up manually on missing replies before sourcing can proceed.' },
  { ic: 'repeat', t: 'The same facts typed at every handoff', d: 'Each department re-keys requirements because there is no shared task context.' },
  { ic: 'clock', t: 'ETAs only move when someone checks', d: 'The customer only learns of a delay by asking — a reactive conversation.' },
  { ic: 'search', t: 'Exceptions sit until noticed', d: 'QC holds and vendor delays wait for a human to spot them and act.' },
  { ic: 'alert', t: 'Management finds out last', d: 'Status is assembled from spreadsheets for meetings instead of flowing live.' },
  { ic: 'archive', t: 'Papers are hunted at audit time', d: 'RFQ, PO, GRN and acknowledgement are scattered; compliance is proved by searching.' }
]

export const TODAY_BA = [
  'Requirement passed by hand between Sales and Purchase (SW-06 → PW-01)',
  'Vendor replies chased by phone / email (PW-03/04)',
  'ETA verified manually; customer changes only heard by asking (LG-06/07)',
  'QC hold spotted hours later; routing decided by memory (ST-04)',
  'Status meetings built from five spreadsheet snapshots',
  'Documents located by searching when the customer or audit asks'
]
export const AUTO_BA = [
  'Handoff auto-created + auto-assigned the moment the requirement is confirmed',
  'Enquiry expiry tracked by SLA — missing replies escalate automatically',
  'ETA recalculated on every tracking event and pushed to the customer',
  'QC outcome triggers the workflow automatically — accepted, held or re-sourced',
  'One shared timeline — every department sees the same transaction live',
  'Every document validated, attached and archived — audit-ready by default'
]

export const CANDID = [
  { ic: 'clock', t: 'Faster orders', d: 'Waiting between departments is eliminated — work moves the moment the previous step completes.' },
  { ic: 'users', t: 'Less chasing', d: 'Handoffs, SLAs and exceptions carry themselves — your people stop being the tracker.' },
  { ic: 'box', t: 'Fewer errors', d: 'Facts travel with the handoff — the requirement is never re-typed or lost in translation.' },
  { ic: 'chart', t: 'Real visibility', d: 'One timeline for management instead of five spreadsheet snapshots.' },
  { ic: 'shieldCheck', t: 'Audit-ready', d: 'A complete, compliant document chain for every transaction.' },
  { ic: 'gauge', t: 'Happy customers', d: 'They hear about ETAs and changes before they have to call.' }
]