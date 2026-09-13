/* ============================================================
   VSN ERP — WF-06: Inventory & Warehouse
   ============================================================
   How received goods are allocated, tracked, and stored in the
   warehouse management system.
   Exercises: verification, automation, parallel processes.
   ============================================================ */

window.WF_06_WORKFLOW = {
  id: 'wf-06',
  title: 'Inventory & Warehouse',
  subtitle: 'How received goods are allocated, tracked, and stored',
  description: 'From goods receipt confirmation through warehouse allocation, bin assignment, and inventory record creation.',

  departments: [
    { id: 'store',     name: 'Store',     color: '#14B8A6' },
    { id: 'logistics', name: 'Logistics', color: '#F59E0B' },
    { id: 'finance',   name: 'Finance',   color: '#10B981' }
  ],

  phases: [
    { id: 'intake',    title: 'Intake',    subtitle: 'Goods received',       startNode: 'goods-received',      endNode: 'inspection-passed' },
    { id: 'allocate',  title: 'Allocate',  subtitle: 'Warehouse placement',  startNode: 'bin-assignment',       endNode: 'stock-updated' },
    { id: 'record',    title: 'Record',    subtitle: 'Inventory finalized',  startNode: 'inventory-record',     endNode: 'inventory-complete' }
  ],

  nodes: [
    {
      id: 'goods-received',
      type: 'milestone',
      owner: { department: 'store', role: 'Store Executive' },
      title: 'Goods Received',
      description: 'Goods physically received at warehouse dock and verified against GRN.',
      inputs: ['Shipment', 'GRN document', 'PO reference'],
      outputs: ['Receipt confirmation'],
      events: [
        { text: 'Goods received at warehouse dock', type: 'info' },
        { text: 'GRN-2026-001 verified against PO', type: 'success' },
        { text: 'Quantity confirmed: 100 units', type: 'info' }
      ],
      visual: { svgIds: ['n-goods-received'] }
    },

    {
      id: 'inspection-passed',
      type: 'verification',
      owner: { department: 'store', role: 'Quality Inspector' },
      title: 'Inspection Passed',
      description: 'Quality inspection completed — goods meet specifications.',
      checks: ['Quantity matches PO', 'Visual inspection passed', 'No damage', 'Specs match'],
      outcomes: [
        { id: 'pass', label: 'Pass', next: 'bin-assignment' },
        { id: 'fail', label: 'Fail', next: 'exception-hold' }
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
      visual: { svgIds: ['n-inspection-passed'] }
    },

    {
      id: 'exception-hold',
      type: 'exception',
      owner: { department: 'store', role: 'Store Executive' },
      title: 'Exception Hold',
      description: 'Goods placed on hold pending quality resolution.',
      trigger: 'Quality check failed',
      impact: 'Goods cannot enter inventory',
      severity: 'medium',
      actions: ['Quarantine goods', 'Notify Purchase', 'Contact vendor'],
      resolution: 'Exception resolved, goods released to inventory',
      resumeAt: 'inspection-passed',
      escalationTo: 'management',
      inputs: ['Failed goods'],
      outputs: ['Exception record'],
      events: [
        { text: 'EXCEPTION: Quality check failed', type: 'error' },
        { text: 'Goods quarantined in holding area', type: 'warning' }
      ],
      visual: { svgIds: ['n-exception-hold'] }
    },

    {
      id: 'bin-assignment',
      type: 'process',
      owner: { department: 'store', role: 'Warehouse Supervisor' },
      title: 'Bin Assignment',
      description: 'Assign warehouse bin locations for received goods based on storage requirements.',
      inputs: ['Quality-passed goods', 'Storage requirements'],
      outputs: ['Bin locations assigned'],
      events: [
        { text: 'Bin locations determined by size/weight', type: 'info' },
        { text: 'Zone A, Bin 12 assigned', type: 'info' },
        { text: 'Bin assignment recorded', type: 'success' }
      ],
      visual: { svgIds: ['n-bin-assignment'] }
    },

    {
      id: 'stock-updated',
      type: 'automation',
      owner: { department: 'store', role: 'System' },
      title: 'Stock Level Updated',
      description: 'ERP automatically updates stock levels upon bin assignment confirmation.',
      inputs: ['Bin assignment', 'Quantity received'],
      outputs: ['Updated stock levels'],
      events: [
        { text: 'Auto: Stock level +100 units', type: 'info' },
        { text: 'Auto: Min/max thresholds checked', type: 'info' },
        { text: 'Auto: Reorder point NOT triggered', type: 'info' }
      ],
      visual: { svgIds: ['n-stock-updated'] }
    },

    {
      id: 'inventory-record',
      type: 'process',
      owner: { department: 'store', role: 'Inventory Clerk' },
      title: 'Inventory Record Created',
      description: 'Formal inventory record created with full traceability.',
      inputs: ['Bin assignment', 'Stock update', 'GRN reference'],
      outputs: ['Inventory record'],
      events: [
        { text: 'INV-2026-001 created', type: 'success' },
        { text: 'Full traceability linked: PO → GRN → INV', type: 'info' }
      ],
      visual: { svgIds: ['n-inventory-record'] }
    },

    {
      id: 'finance-notified',
      type: 'handoff',
      from: { department: 'store', role: 'System' },
      to: { department: 'finance', role: 'Accounts Payable' },
      title: 'Finance Notified',
      description: 'Finance department notified of goods receipt for payment processing.',
      inputs: ['Inventory record', 'GRN'],
      outputs: ['Payment trigger'],
      events: [
        { text: 'Finance alert sent', type: 'info' },
        { text: 'Payment processing can begin', type: 'success' }
      ],
      visual: { svgIds: ['n-finance-notified'] }
    },

    {
      id: 'inventory-complete',
      type: 'completion',
      title: 'Inventory Complete',
      summary: 'Goods received, inspected, stored, and inventory updated.',
      metrics: {
        'Receipt to Inventory': '2 hours',
        'Units Stored': '100',
        'Bin Location': 'Zone A, Bin 12',
        'Quality Status': 'Passed',
        'Finance Notified': 'Yes'
      },
      events: [
        { text: 'INVENTORY COMPLETE', type: 'success' },
        { text: 'Goods available for issue', type: 'success' }
      ],
      visual: { svgIds: ['n-inventory-complete'] }
    }
  ],

  edges: [
    { id: 'e1', from: 'goods-received',     to: 'inspection-passed',  type: 'normal' },
    { id: 'e2a', from: 'inspection-passed',  to: 'bin-assignment',     type: 'normal' },
    { id: 'e2b', from: 'inspection-passed',  to: 'exception-hold',     type: 'exception' },
    { id: 'e3', from: 'exception-hold',      to: 'inspection-passed',  type: 'loop' },
    { id: 'e4', from: 'bin-assignment',      to: 'stock-updated',      type: 'automation' },
    { id: 'e5', from: 'stock-updated',       to: 'inventory-record',   type: 'normal' },
    { id: 'e6', from: 'inventory-record',    to: 'finance-notified',   type: 'handoff' },
    { id: 'e7', from: 'finance-notified',    to: 'inventory-complete', type: 'normal' }
  ],

  start: 'goods-received',
  completion: ['inventory-complete']
};

WorkflowEngine.register(window.WF_06_WORKFLOW);
