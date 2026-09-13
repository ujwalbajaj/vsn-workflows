/* ============================================================
   VSN ERP — WF-05: PO → Goods Received
   ============================================================
   How POs are fulfilled through vendor delivery and goods receipt.
   Exercises: external actors, verification, automation.
   ============================================================ */

window.WF_05_WORKFLOW = {
  id: 'wf-05',
  title: 'PO → Goods Received',
  subtitle: 'How POs are fulfilled through vendor delivery and goods receipt',
  description: 'From PO dispatch to vendor through delivery tracking, goods receipt, and quality inspection.',

  departments: [
    { id: 'purchase', name: 'Purchase', color: '#8B5CF6' },
    { id: 'logistics', name: 'Logistics', color: '#F59E0B' },
    { id: 'store',    name: 'Store',    color: '#14B8A6' }
  ],

  phases: [
    { id: 'dispatch',  title: 'Dispatch',  subtitle: 'PO sent to vendor',     startNode: 'po-dispatched',    endNode: 'vendor-confirmed' },
    { id: 'tracking',  title: 'Tracking',  subtitle: 'Delivery in transit',   startNode: 'in-transit',       endNode: 'goods-received' },
    { id: 'receipt',   title: 'Receipt',   subtitle: 'Goods inspected',       startNode: 'quality-check',    endNode: 'receipt-complete' }
  ],

  nodes: [
    {
      id: 'po-dispatched',
      type: 'handoff',
      from: { department: 'purchase', role: 'Purchase Executive' },
      to: 'external',
      title: 'PO Dispatched to Vendor',
      description: 'Approved PO sent to vendor for fulfillment.',
      payload: ['Approved PO', 'Delivery schedule', 'Specifications'],
      trigger: 'PO approved by Finance.',
      inputs: ['Approved PO'],
      outputs: ['PO sent to vendor'],
      events: [
        { text: 'PO-2026-001 dispatched to Vendor A', type: 'handoff' },
        { text: 'Vendor acknowledgment awaited', type: 'info' }
      ],
      visual: { svgIds: ['n-po-dispatched'] }
    },

    {
      id: 'vendor-confirmed',
      type: 'milestone',
      owner: { department: 'purchase', role: 'Purchase Executive' },
      title: 'Vendor Confirmed',
      description: 'Vendor acknowledges PO and confirms delivery schedule.',
      inputs: ['Vendor acknowledgment'],
      outputs: ['Confirmed delivery schedule'],
      events: [
        { text: 'Vendor A confirmed PO-2026-001', type: 'success' },
        { text: 'Estimated delivery: 15 days', type: 'info' }
      ],
      visual: { svgIds: ['n-vendor-confirmed'] }
    },

    {
      id: 'in-transit',
      type: 'process',
      owner: { department: 'logistics', role: 'Logistics Coordinator' },
      title: 'In Transit',
      description: 'Goods are being transported from vendor to warehouse.',
      inputs: ['Shipment tracking', 'Carrier details'],
      outputs: ['Transit status'],
      events: [
        { text: 'Goods picked up by carrier', type: 'info' },
        { text: 'Tracking: TRK-2026-001', type: 'info' },
        { text: 'ETA: 3 days', type: 'info' }
      ],
      visual: { svgIds: ['n-in-transit'] }
    },

    {
      id: 'goods-received',
      type: 'process',
      owner: { department: 'store', role: 'Store Executive' },
      title: 'Goods Received',
      description: 'Goods physically received at warehouse dock.',
      inputs: ['Shipment', 'Delivery note'],
      outputs: ['Goods receipt record'],
      events: [
        { text: 'Goods received at warehouse dock', type: 'info' },
        { text: 'Delivery note verified', type: 'info' },
        { text: 'Goods receipt note GRN-2026-001 created', type: 'success' }
      ],
      visual: { svgIds: ['n-goods-received'] }
    },

    {
      id: 'quality-check',
      type: 'verification',
      owner: { department: 'store', role: 'Quality Inspector' },
      title: 'Quality Check',
      description: 'Perform quality inspection on received goods.',
      checks: ['Quantity matches PO', 'Visual inspection passed', 'No damage', 'Specs match'],
      outcomes: [
        { id: 'pass', label: 'Pass', next: 'receipt-complete' },
        { id: 'fail', label: 'Fail', next: 'exception-handling' }
      ],
      selected: 'pass',
      inputs: ['Received goods', 'PO specifications'],
      outputs: ['Quality result'],
      events: [
        { text: 'Quality inspection started', type: 'info' },
        { text: 'Quantity check: 100/100', type: 'success' },
        { text: 'Visual inspection: PASSED', type: 'success' },
        { text: 'Quality check PASSED', type: 'success' }
      ],
      references: [
        { source: 'Store.md', label: 'Quality Standards', status: 'tbd', note: 'TBD — CLIENT VALIDATION REQUIRED' }
      ],
      visual: { svgIds: ['n-quality-check'] }
    },

    {
      id: 'exception-handling',
      type: 'exception',
      owner: { department: 'store', role: 'Store Executive' },
      title: 'Exception Handling',
      description: 'Handle quality or quantity exception.',
      trigger: 'Quality check failed',
      impact: 'Goods cannot be added to inventory',
      severity: 'medium',
      actions: ['Document exception', 'Notify Purchase', 'Contact vendor'],
      resolution: 'Exception resolved, goods accepted',
      resumeAt: 'quality-check',
      escalationTo: 'management',
      inputs: ['Failed goods'],
      outputs: ['Exception record'],
      events: [
        { text: 'EXCEPTION: Quality check failed', type: 'error' },
        { text: 'Documenting exception...', type: 'warning' }
      ],
      visual: { svgIds: ['n-exception-handling'] }
    },

    {
      id: 'receipt-complete',
      type: 'completion',
      title: 'Receipt Complete',
      summary: 'Goods received, quality checked, and added to inventory.',
      metrics: {
        'PO to Receipt': '15 days',
        'Quantity Received': '100/100',
        'Quality Status': 'Passed',
        'Inventory Updated': 'Yes'
      },
      events: [
        { text: 'RECEIPT COMPLETE', type: 'success' },
        { text: 'Inventory updated: +100 units', type: 'success' }
      ],
      visual: { svgIds: ['n-receipt-complete'] }
    }
  ],

  edges: [
    { id: 'e1', from: 'po-dispatched',    to: 'vendor-confirmed', type: 'handoff' },
    { id: 'e2', from: 'vendor-confirmed',  to: 'in-transit',      type: 'normal' },
    { id: 'e3', from: 'in-transit',        to: 'goods-received',   type: 'normal' },
    { id: 'e4', from: 'goods-received',    to: 'quality-check',    type: 'normal' },
    { id: 'e5a', from: 'quality-check',    to: 'receipt-complete', type: 'normal' },
    { id: 'e5b', from: 'quality-check',    to: 'exception-handling', type: 'exception' },
    { id: 'e6', from: 'exception-handling', to: 'quality-check',   type: 'loop' }
  ],

  start: 'po-dispatched',
  completion: ['receipt-complete']
};

WorkflowEngine.register(window.WF_05_WORKFLOW);
