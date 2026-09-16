export const CATS = [
  { key: 'exec', name: 'Executive', color: '#4338ca', icon: 'chart',
    flows: [{ id: 'overview', t: 'Executive Overview', n: 16, depts: ['cust', 'sales', 'purchase', 'finance', 'log', 'store'], ic: 'layers2',
      d: 'End-to-end from customer requirement through fulfilment — the one-slide picture of everything VSN does.' }] },
  { key: 'core', name: 'Core workflows — how the business runs', color: '#0284c7', icon: 'list',
    flows: [
      { id: 'wf-01', t: 'Customer Requirement → Order', n: 16, depts: ['cust', 'sales', 'purchase', 'mgmt'], ic: 'right', d: 'Inquiry, RFQ, validation, sourcing, quotation, negotiation and the order won — 5 phases.' },
      { id: 'wf-02', t: 'Sourcing → Procurement', n: 13, depts: ['purchase', 'finance', 'mgmt'], ic: 'search', d: 'Vendor sourcing, comparison, selection and budget review through procurement decision.' },
      { id: 'wf-03', t: 'Order → PO', n: 6, depts: ['sales', 'purchase', 'finance'], ic: 'cart', d: 'Parts lock, order confirmation and PO creation with verification.' },
      { id: 'wf-04', t: 'PO → Finance', n: 9, depts: ['purchase', 'finance', 'mgmt'], ic: 'dollar', d: 'Payment terms, advances, reconciliation and exceptions — the money side.' },
      { id: 'wf-05', t: 'PO → Goods Received', n: 7, depts: ['purchase', 'log', 'store'], ic: 'pkg', d: 'Handoffs from vendor dispatch through receiving — where the goods cross into VSN.' },
      { id: 'wf-06', t: 'Inventory & Warehouse', n: 8, depts: ['store', 'log', 'finance'], ic: 'box', d: 'GRN, usable stock, allocation, reorder and valuation.' },
      { id: 'wf-07', t: 'Shipment → Customer Delivery', n: 7, depts: ['log', 'store', 'cust'], ic: 'truck', d: 'Dispatch, tracking, delivery decision and proof of delivery.' },
      { id: 'wf-08', t: 'Exception & Recovery', n: 13, depts: ['store', 'purchase', 'mgmt', 'log'], ic: 'repeat', d: 'Every exception: trigger → action → resolution → resume point. No dead ends.' },
      { id: 'wf-09', t: 'Cross-Department Handoffs', n: 11, depts: ['sales', 'purchase', 'store', 'finance', 'log'], ic: 'shuffle', d: 'All the department transfers with handoff dots at lane boundaries.' },
      { id: 'wf-10', t: 'Management Control Tower', n: 10, depts: ['mgmt', 'sales', 'purchase', 'finance'], ic: 'eye', d: 'Management above the flow — dashboards, approvals and escalations.' },
      { id: 'store-qc', t: 'Goods Received → QC → Inventory', n: 10, depts: ['log', 'store', 'purchase', 'mgmt'], ic: 'flask', d: 'Receiving, QC disposition (accepted / hold / rejected), inventory and fulfilment readiness.' }
    ] },
  { key: 'auto', name: 'Automation — the modules we can sell you', color: '#6366f1', icon: 'bolt',
    flows: [
      { id: 'auto-01', t: 'Task & Handoff Automation', n: 6, depts: ['erp', 'sales', 'purchase'], ic: 'flow', d: 'Trigger → task auto-created → auto-assigned → processed → handoff auto-initiated → acknowledged.' },
      { id: 'auto-02', t: 'SLA & Escalation Automation', n: 5, depts: ['erp', 'mgmt'], ic: 'clock', d: 'SLA monitoring → breach detected → escalation → action → restored.' },
      { id: 'auto-03', t: 'ETA Updates Automation', n: 7, depts: ['erp', 'log', 'cust'], ic: 'gauge', d: 'ETA calculated → tracked → auto-updated → customer notified → on-time / delayed → confirmed.' },
      { id: 'auto-04', t: 'Exception Routing Automation', n: 6, depts: ['erp', 'store', 'purchase', 'mgmt'], ic: 'alert', d: 'Exception detected → classified → auto-routed to the right department → resolved → closed.' },
      { id: 'auto-05', t: 'Document Compliance', n: 6, depts: ['erp', 'mgmt'], ic: 'archive', d: 'Document created → validated → approved → archived — with a revision loop on failure.' },
      { id: 'auto-06', t: 'Management Alerts Automation', n: 6, depts: ['erp', 'mgmt'], ic: 'chart', d: 'Data collected → analysed → alerts generated → dashboards fed → responded.' }
    ] },
  { key: 'strat', name: 'Strategic — the transformation view', color: '#0d9488', icon: 'zap',
    flows: [
      { id: 'strat-01', t: 'Current Process → ERP-Connected', n: 8, depts: ['sales', 'purchase', 'store', 'mgmt'], ic: 'route', d: 'How disconnected manual processes become a single connected flow.' },
      { id: 'strat-02', t: 'Bottleneck & Waiting-Point Map', n: 7, depts: ['sales', 'purchase', 'store', 'finance', 'mgmt'], ic: 'pin', d: 'Where time is wasted today — and how the ERP removes the waiting.' },
      { id: 'strat-03', t: 'Manual Work → Automated Work', n: 11, depts: ['erp'], ic: 'shuffle', d: 'What becomes automated, what stays human, and what is hybrid.' },
      { id: 'strat-04', t: 'One Transaction → One Timeline', n: 10, depts: ['cust', 'sales', 'purchase', 'store', 'finance', 'log'], ic: 'flow', d: 'All six departments on a single shared timeline for one transaction.' }
    ] }
]