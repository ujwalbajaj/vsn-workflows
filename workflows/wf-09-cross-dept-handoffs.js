/* ============================================================
   VSN ERP — WF-09: Cross-Department Handoffs
   ============================================================
   How work flows between departments with acknowledgments.
   Exercises: multiple handoffs, acknowledgments, automation.
   ============================================================ */

window.WF_09_WORKFLOW = {
  id: 'wf-09',
  title: 'Cross-Department Handoffs',
  subtitle: 'How work flows between departments with acknowledgments',
  description: 'From department task initiation through handoff, acknowledgment, processing, and next handoff.',

  departments: [
    { id: 'sales',      name: 'Sales',      color: '#3B82F6' },
    { id: 'purchase',   name: 'Purchase',   color: '#8B5CF6' },
    { id: 'store',      name: 'Store',      color: '#14B8A6' },
    { id: 'finance',    name: 'Finance',    color: '#10B981' },
    { id: 'logistics',  name: 'Logistics',  color: '#F59E0B' }
  ],

  phases: [
    { id: 'initiation',  title: 'Initiation',  subtitle: 'Task created',            startNode: 'task-created',     endNode: 'handoff-1-complete' },
    { id: 'processing',  title: 'Processing',  subtitle: 'Work performed',           startNode: 'purchase-processing', endNode: 'handoff-2-complete' },
    { id: 'verification', title: 'Verification', subtitle: 'Quality checked',        startNode: 'store-verification', endNode: 'handoff-3-complete' },
    { id: 'completion',  title: 'Completion',  subtitle: 'Task finished',            startNode: 'finance-processing', endNode: 'task-completed' }
  ],

  nodes: [
    // ─── 0: Task Created ───
    {
      id: 'task-created',
      type: 'process',
      owner: { department: 'sales', role: 'Sales Executive' },
      title: 'Task Created',
      description: 'New task initiated by Sales department.',
      inputs: ['Customer order', 'Requirements'],
      outputs: ['Task record'],
      events: [
        { text: 'Task T-2026-001 created by Sales', type: 'info' },
        { text: 'Priority: Normal', type: 'info' },
        { text: 'Assigned to Purchase department', type: 'handoff' }
      ],
      visual: { svgIds: ['n-task-created'] }
    },

    // ─── 1: Handoff 1: Sales → Purchase ───
    {
      id: 'handoff-1',
      type: 'handoff',
      from: { department: 'sales', role: 'Sales Executive' },
      to: { department: 'purchase', role: 'Purchase Executive' },
      title: 'Handoff: Sales → Purchase',
      description: 'Sales transfers task to Purchase for vendor sourcing.',
      payload: ['Task details', 'Product specifications', 'Quantity', 'Delivery requirements'],
      trigger: 'Sales task creation.',
      inputs: ['Task record'],
      outputs: ['Task transferred to Purchase'],
      events: [
        { text: 'Handoff initiated: Sales → Purchase', type: 'handoff' },
        { text: 'Payload: Task details + specifications', type: 'info' },
        { text: 'Awaiting Purchase acknowledgment...', type: 'info' }
      ],
      visual: { svgIds: ['n-handoff-1'] }
    },

    // ─── 2: Handoff 1 Complete (Acknowledgment) ───
    {
      id: 'handoff-1-complete',
      type: 'milestone',
      owner: { department: 'purchase', role: 'Purchase Executive' },
      title: 'Handoff 1 Acknowledged',
      description: 'Purchase acknowledges receipt and begins processing.',
      inputs: ['Acknowledgment'],
      outputs: ['Purchase working on task'],
      events: [
        { text: 'Purchase acknowledged receipt', type: 'success' },
        { text: 'Task assigned to Purchase Executive', type: 'info' },
        { text: 'Processing started', type: 'info' }
      ],
      visual: { svgIds: ['n-handoff-1-ack'] }
    },

    // ─── 3: Purchase Processing ───
    {
      id: 'purchase-processing',
      type: 'process',
      owner: { department: 'purchase', role: 'Purchase Executive' },
      title: 'Purchase Processing',
      description: 'Purchase performs vendor sourcing, PO creation, and procurement.',
      inputs: ['Task details', 'Vendor database'],
      outputs: ['Procurement completed'],
      events: [
        { text: 'Vendor sourcing started', type: 'info' },
        { text: 'RFQ sent to 3 vendors', type: 'info' },
        { text: 'Vendor selected, PO created', type: 'success' },
        { text: 'Procurement processing complete', type: 'success' }
      ],
      visual: { svgIds: ['n-purchase-processing'] }
    },

    // ─── 4: Handoff 2: Purchase → Store ───
    {
      id: 'handoff-2',
      type: 'handoff',
      from: { department: 'purchase', role: 'Purchase Executive' },
      to: { department: 'store', role: 'Store Executive' },
      title: 'Handoff: Purchase → Store',
      description: 'Purchase transfers task to Store for goods receipt and verification.',
      payload: ['PO details', 'Expected delivery', 'Inspection requirements'],
      trigger: 'Purchase processing complete.',
      inputs: ['Procurement result'],
      outputs: ['Task transferred to Store'],
      events: [
        { text: 'Handoff initiated: Purchase → Store', type: 'handoff' },
        { text: 'Payload: PO details + inspection requirements', type: 'info' },
        { text: 'Awaiting Store acknowledgment...', type: 'info' }
      ],
      visual: { svgIds: ['n-handoff-2'] }
    },

    // ─── 5: Handoff 2 Complete (Acknowledgment) ───
    {
      id: 'handoff-2-complete',
      type: 'milestone',
      owner: { department: 'store', role: 'Store Executive' },
      title: 'Handoff 2 Acknowledged',
      description: 'Store acknowledges receipt and begins goods verification.',
      inputs: ['Acknowledgment'],
      outputs: ['Store working on task'],
      events: [
        { text: 'Store acknowledged receipt', type: 'success' },
        { text: 'Task assigned to Store Executive', type: 'info' },
        { text: 'Goods verification started', type: 'info' }
      ],
      visual: { svgIds: ['n-handoff-2-ack'] }
    },

    // ─── 6: Store Verification ───
    {
      id: 'store-verification',
      type: 'process',
      owner: { department: 'store', role: 'Store Executive' },
      title: 'Store Verification',
      description: 'Store receives goods, performs quality check, and updates inventory.',
      inputs: ['Goods received', 'PO specifications'],
      outputs: ['Goods verified', 'Inventory updated'],
      events: [
        { text: 'Goods received from vendor', type: 'info' },
        { text: 'Quality inspection started', type: 'info' },
        { text: 'Quality check passed', type: 'success' },
        { text: 'Inventory updated: +100 units', type: 'success' }
      ],
      visual: { svgIds: ['n-store-verification'] }
    },

    // ─── 7: Handoff 3: Store → Finance ───
    {
      id: 'handoff-3',
      type: 'handoff',
      from: { department: 'store', role: 'Store Executive' },
      to: { department: 'finance', role: 'Finance Manager' },
      title: 'Handoff: Store → Finance',
      description: 'Store transfers task to Finance for invoice processing and payment.',
      payload: ['Goods receipt note', 'PO reference', 'Invoice details'],
      trigger: 'Store verification complete.',
      inputs: ['Verification result'],
      outputs: ['Task transferred to Finance'],
      events: [
        { text: 'Handoff initiated: Store → Finance', type: 'handoff' },
        { text: 'Payload: GRN + invoice details', type: 'info' },
        { text: 'Awaiting Finance acknowledgment...', type: 'info' }
      ],
      visual: { svgIds: ['n-handoff-3'] }
    },

    // ─── 8: Handoff 3 Complete (Acknowledgment) ───
    {
      id: 'handoff-3-complete',
      type: 'milestone',
      owner: { department: 'finance', role: 'Finance Manager' },
      title: 'Handoff 3 Acknowledged',
      description: 'Finance acknowledges receipt and begins invoice processing.',
      inputs: ['Acknowledgment'],
      outputs: ['Finance working on task'],
      events: [
        { text: 'Finance acknowledged receipt', type: 'success' },
        { text: 'Task assigned to Finance Manager', type: 'info' },
        { text: 'Invoice processing started', type: 'info' }
      ],
      visual: { svgIds: ['n-handoff-3-ack'] }
    },

    // ─── 9: Finance Processing ───
    {
      id: 'finance-processing',
      type: 'process',
      owner: { department: 'finance', role: 'Finance Manager' },
      title: 'Finance Processing',
      description: 'Finance processes invoice, verifies against PO, and initiates payment.',
      inputs: ['Invoice', 'PO reference', 'GRN'],
      outputs: ['Payment processed'],
      events: [
        { text: 'Invoice INV-2026-001 received', type: 'info' },
        { text: 'Matching against PO and GRN...', type: 'info' },
        { text: 'Three-way match passed', type: 'success' },
        { text: 'Payment of $25,000 initiated', type: 'success' }
      ],
      visual: { svgIds: ['n-finance-processing'] }
    },

    // ─── 10: Task Completed ───
    {
      id: 'task-completed',
      type: 'completion',
      title: 'Task Completed',
      summary: 'Task flowed through 5 departments with 3 handoffs and acknowledgments.',
      metrics: {
        'Total Handoffs': '3',
        'Acknowledgments': '3',
        'Departments Involved': '5',
        'Total Processing Time': '7 days',
        'Handoff Success Rate': '100%'
      },
      events: [
        { text: 'TASK COMPLETED', type: 'success' },
        { text: 'All handoffs acknowledged', type: 'success' },
        { text: 'Payment processed', type: 'success' }
      ],
      visual: { svgIds: ['n-task-completed'] }
    }
  ],

  edges: [
    { id: 'e1',  from: 'task-created',         to: 'handoff-1',              type: 'normal' },
    { id: 'e2',  from: 'handoff-1',             to: 'handoff-1-complete',     type: 'handoff' },
    { id: 'e3',  from: 'handoff-1-complete',    to: 'purchase-processing',    type: 'normal' },
    { id: 'e4',  from: 'purchase-processing',   to: 'handoff-2',              type: 'handoff' },
    { id: 'e5',  from: 'handoff-2',             to: 'handoff-2-complete',     type: 'handoff' },
    { id: 'e6',  from: 'handoff-2-complete',    to: 'store-verification',     type: 'normal' },
    { id: 'e7',  from: 'store-verification',    to: 'handoff-3',              type: 'handoff' },
    { id: 'e8',  from: 'handoff-3',             to: 'handoff-3-complete',     type: 'handoff' },
    { id: 'e9',  from: 'handoff-3-complete',    to: 'finance-processing',     type: 'normal' },
    { id: 'e10', from: 'finance-processing',    to: 'task-completed',         type: 'normal' }
  ],

  start: 'task-created',
  completion: ['task-completed']
};

WorkflowEngine.register(window.WF_09_WORKFLOW);
