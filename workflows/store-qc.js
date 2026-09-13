/* ============================================================
   VSN ERP — Store → QC → Inventory → Fulfilment Workflow
   ============================================================
   Test Case: Exercises verification, decision, exception,
   loop, approval, and completion node types.
   ============================================================ */

window.STORE_QC_WORKFLOW = {
  id: 'store-qc',
  title: 'Goods Received → QC → Inventory → Fulfilment',
  subtitle: 'Inbound material verification and downstream readiness',
  description: 'How material moves from physical receipt through verification, QC, inventory, and fulfilment readiness.',

  departments: [
    { id: 'logistics', name: 'Logistics', color: '#F59E0B' },
    { id: 'store',     name: 'Store',     color: '#14B8A6' },
    { id: 'purchase',  name: 'Purchase',  color: '#8B5CF6' },
    { id: 'management', name: 'Management', color: '#4338CA' }
  ],

  phases: [
    { id: 'receive',      title: 'Receive',      subtitle: 'Physical receipt',     startNode: 'goods-arrive',   endNode: 'grn' },
    { id: 'verify',       title: 'Verify',        subtitle: 'Physical & QC',        startNode: 'physical-verify', endNode: 'qc-assessment' },
    { id: 'disposition',  title: 'Disposition',   subtitle: 'Accept / Hold / Reject', startNode: 'qc-disposition', endNode: 'hold-release' },
    { id: 'fulfil',       title: 'Fulfil',        subtitle: 'Delivery',             startNode: 'fulfilment',     endNode: 'complete' }
  ],

  nodes: [
    // ─── 0: Goods Arrive ───
    {
      id: 'goods-arrive',
      type: 'process',
      owner: { department: 'logistics', role: 'Logistics Coordinator' },
      title: 'Goods Arrive at Store',
      description: 'Material arrives from vendor via logistics. Shipment checked against PO and delivery documents.',
      inputs: ['Physical shipment', 'Delivery challan', 'PO reference'],
      outputs: ['Goods in receiving bay'],
      events: [
        { text: 'Shipment received at store dock', type: 'info' }
      ],
      visual: { svgIds: ['n-goods'] }
    },

    // ─── 1: Physical Verification ───
    {
      id: 'physical-verify',
      type: 'verification',
      owner: { department: 'store', role: 'Store Executive' },
      title: 'Physical Verification',
      description: 'Physical inspection of incoming material against GRN and PO specifications.',
      checks: [
        'Quantity match against GRN',
        'MPN verification',
        'Batch / Lot code',
        'Physical condition',
        'Date code validity',
        'Seal / packaging integrity'
      ],
      outcomes: [
        { id: 'pass', label: 'Pass', next: 'grn' },
        { id: 'mismatch', label: 'Mismatch', next: 'qty-dispute' },
        { id: 'damaged', label: 'Damaged', next: 'damage-report' }
      ],
      selected: 'pass',
      inputs: ['Goods in receiving bay', 'PO specifications'],
      outputs: ['Verification result'],
      events: [
        { text: 'Physical verification started', type: 'info' },
        { text: 'All 6 checks passed', type: 'success' }
      ],
      visual: { svgIds: ['n-verify'] }
    },

    // ─── 2: GRN Created ───
    {
      id: 'grn',
      type: 'handoff',
      from: { department: 'logistics', role: 'Logistics Coordinator' },
      to: { department: 'store', role: 'Store Executive' },
      title: 'GRN Created',
      description: 'Goods Receipt Note generated. Material officially tagged as "Received" in ERP.',
      payload: ['GRN number', 'Quantity confirmed', 'Condition notes', 'PO reference'],
      trigger: 'Physical verification passes.',
      inputs: ['Verification pass result'],
      outputs: ['GRN created in ERP', 'Material tagged as received'],
      events: [
        { text: 'GRN-2026-331 created', type: 'success' }
      ],
      visual: { svgIds: ['n-grn'] }
    },

    // ─── 3: QC Assessment (DECISION) ───
    {
      id: 'qc-assessment',
      type: 'decision',
      owner: { department: 'store', role: 'Store Executive' },
      title: 'QC Assessment',
      description: 'Quality check determines material disposition based on inspection results.',
      question: 'What is the QC result?',
      options: [
        {
          id: 'accepted',
          label: 'Accepted',
          consequence: 'Usable inventory — available for fulfilment',
          next: 'inventory-update'
        },
        {
          id: 'hold',
          label: 'Hold',
          consequence: 'Restricted — under further inspection, not available',
          next: 'hold-material'
        },
        {
          id: 'rejected',
          label: 'Rejected / Damaged',
          consequence: 'Purchase exception loop — re-source required',
          next: 'qc-rejection'
        }
      ],
      selected: 'accepted',
      reason: 'Material matches MPN, qty, and date code → ACCEPTED.',
      inputs: ['GRN', 'Physical material'],
      outputs: ['QC disposition decision'],
      references: [
        { source: 'Store.md', label: 'QC Protocol', status: 'confirmed' },
        { source: 'Store.md', label: 'Acceptance Criteria', status: 'confirmed' }
      ],
      events: [
        { text: 'QC assessment started', type: 'info' },
        { text: 'Decision: ACCEPTED — all criteria met', type: 'decision' }
      ],
      visual: { svgIds: ['n-qc'] }
    },

    // ─── 4: Inventory Update ───
    {
      id: 'inventory-update',
      type: 'process',
      owner: { department: 'store', role: 'Store Executive' },
      title: 'Inventory Updated',
      description: 'Accepted stock becomes usable inventory. Available for allocation against customer orders.',
      inputs: ['Accepted material', 'QC pass certificate'],
      outputs: ['Inventory updated in ERP', 'Stock available for allocation'],
      references: [
        { source: 'Store.md', label: 'Inventory Update Rules', status: 'confirmed' }
      ],
      events: [
        { text: 'Inventory updated: +1000 pcs usable', type: 'success' },
        { text: 'Stock available for allocation', type: 'info' }
      ],
      visual: { svgIds: ['n-inventory'] }
    },

    // ─── 5: Hold Material (EXCEPTION) ───
    {
      id: 'hold-material',
      type: 'exception',
      owner: { department: 'store', role: 'Store Executive' },
      title: 'Material on Hold',
      description: 'Restricted inventory — not available for fulfilment. Under further inspection.',
      trigger: 'QC hold — material requires additional testing',
      impact: 'Order fulfilment delayed until QC clears material',
      severity: 'medium',
      actions: [
        'Additional QC tests scheduled',
        'Customer notified of potential delay',
        'Alternative stock sourced if critical'
      ],
      resolution: 'Additional tests confirm material meets specifications.',
      resumeAt: 'hold-release',
      escalationTo: 'management',
      inputs: ['Hold decision from QC'],
      outputs: ['Material restricted', 'Hold inspection scheduled'],
      events: [
        { text: 'Material placed on HOLD', type: 'warning' },
        { text: 'Additional QC tests scheduled', type: 'info' }
      ],
      visual: { svgIds: ['n-hold'] }
    },

    // ─── 6: QC Rejection (EXCEPTION) ───
    {
      id: 'qc-rejection',
      type: 'exception',
      owner: { department: 'store', role: 'Store Executive' },
      title: 'QC Rejection',
      description: 'Material fails inspection. Purchase exception loop triggered for re-sourcing.',
      trigger: 'QC rejection — material does not meet specifications',
      impact: 'Vendor must re-supply or provide replacement',
      severity: 'high',
      actions: [
        'Purchase notified of rejection',
        'Vendor contacted with rejection details',
        'Re-sourcing initiated if vendor cannot replace',
        'Customer commitment reassessed'
      ],
      resolution: 'Replacement vendor confirmed with equivalent stock.',
      resumeAt: 'vendor-sourcing',
      escalationTo: 'management',
      inputs: ['Rejection decision from QC'],
      outputs: ['Exception logged', 'Purchase notified', 'Recovery initiated'],
      events: [
        { text: 'QC REJECTED — material fails inspection', type: 'error' },
        { text: 'Purchase exception loop initiated', type: 'error' },
        { text: 'Recovery action: Reopening sourcing', type: 'warning' }
      ],
      visual: { svgIds: ['n-reject'] }
    },

    // ─── 7: Hold Release (DECISION) ───
    {
      id: 'hold-release',
      type: 'decision',
      owner: { department: 'store', role: 'Store Executive' },
      title: 'Hold Resolution',
      description: 'Additional inspection determines if material can be released to inventory.',
      question: 'Hold resolved?',
      options: [
        {
          id: 'release',
          label: 'Release to inventory',
          consequence: 'Material cleared — usable stock',
          next: 'inventory-update'
        },
        {
          id: 'reject-hold',
          label: 'Reject after inspection',
          consequence: 'Material fails — purchase exception',
          next: 'qc-rejection'
        }
      ],
      selected: 'release',
      reason: 'Additional tests confirm material meets specifications.',
      inputs: ['Hold inspection results'],
      outputs: ['Final disposition decision'],
      events: [
        { text: 'Hold inspection completed', type: 'info' },
        { text: 'Decision: RELEASE — material cleared', type: 'decision' }
      ],
      visual: { svgIds: ['n-hold-resolve'] }
    },

    // ─── 8: Fulfilment ───
    {
      id: 'fulfilment',
      type: 'process',
      owner: { department: 'logistics', role: 'Logistics Coordinator' },
      title: 'Order Fulfilment',
      description: 'Store picks and packs order. Outbound logistics arranges delivery to customer.',
      inputs: ['Inventory available', 'Customer order'],
      outputs: ['Order picked and packed', 'Dispatch prepared'],
      events: [
        { text: 'Order picked and packed', type: 'info' },
        { text: 'Outbound dispatch prepared', type: 'info' }
      ],
      visual: { svgIds: ['n-fulfil'] }
    },

    // ─── 9: Complete ───
    {
      id: 'complete',
      type: 'completion',
      title: 'Transaction Complete',
      summary: 'Goods received → QC accepted → inventory updated → order fulfilled. All exceptions resolved.',
      metrics: {
        'Cycle time': '2 days',
        'QC result': 'Accepted',
        'Inventory': '+1000 pcs',
        'On-time': 'Yes',
        'Exceptions': '0'
      },
      events: [
        { text: 'TRANSACTION COMPLETE', type: 'success' }
      ],
      visual: { svgIds: ['n-complete'] }
    }
  ],

  edges: [
    { id: 'e1',  from: 'goods-arrive',    to: 'physical-verify', type: 'normal' },
    { id: 'e2',  from: 'physical-verify',  to: 'grn',            type: 'normal' },
    { id: 'e3',  from: 'grn',             to: 'qc-assessment',   type: 'normal' },
    { id: 'e4a', from: 'qc-assessment',    to: 'inventory-update', type: 'normal' },
    { id: 'e4b', from: 'qc-assessment',    to: 'hold-material',   type: 'exception' },
    { id: 'e4c', from: 'qc-assessment',    to: 'qc-rejection',    type: 'exception' },
    { id: 'e5',  from: 'hold-material',    to: 'hold-release',    type: 'normal' },
    { id: 'e6a', from: 'hold-release',     to: 'inventory-update', type: 'normal' },
    { id: 'e6b', from: 'hold-release',     to: 'qc-rejection',    type: 'exception' },
    { id: 'e7',  from: 'inventory-update', to: 'fulfilment',      type: 'normal' },
    { id: 'e8',  from: 'fulfilment',       to: 'complete',        type: 'normal' },
    // Recovery loop (rejection returns to sourcing in purchase workflow)
    { id: 'e9',  from: 'qc-rejection',     to: 'goods-arrive',    type: 'loop' }
  ],

  start: 'goods-arrive',
  completion: ['complete']
};

// Register the workflow
WorkflowEngine.register(window.STORE_QC_WORKFLOW);
