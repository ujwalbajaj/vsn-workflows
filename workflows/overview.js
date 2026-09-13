/* ============================================================
   VSN ERP — Overview Workflow (Foundation Demo)
   ============================================================
   Executive Overview: Customer Requirement → Fulfilment
   ============================================================ */

window.OVERVIEW_WORKFLOW = {
  id: 'overview',
  title: 'Executive Overview',
  subtitle: 'How VSN\'s business connects from customer requirement to fulfilment',
  description: 'One transaction, multiple departments, continuous visibility.',

  departments: [
    { id: 'customer',  name: 'Customer',  color: '#667085' },
    { id: 'sales',     name: 'Sales',     color: '#3B82F6' },
    { id: 'purchase',  name: 'Purchase',  color: '#8B5CF6' },
    { id: 'finance',   name: 'Finance',   color: '#10B981' },
    { id: 'logistics', name: 'Logistics', color: '#F59E0B' },
    { id: 'store',     name: 'Store',     color: '#14B8A6' }
  ],

  phases: [
    { id: 'inquiry',   title: 'Inquiry',   subtitle: 'Customer → Sales',    startNode: 'customer-req',    endNode: 'sales-validation' },
    { id: 'sourcing',  title: 'Sourcing',  subtitle: 'Purchase → PO',       startNode: 'handoff-sp',      endNode: 'po-released' },
    { id: 'inbound',   title: 'Inbound',   subtitle: 'Finance ∥ Logistics', startNode: 'po-parallel',     endNode: 'goods-received' },
    { id: 'store-phase', title: 'Store',   subtitle: 'Receive → QC',        startNode: 'store-receive',   endNode: 'qc-assessment' },
    { id: 'delivery',  title: 'Delivery',  subtitle: 'Fulfilment',          startNode: 'fulfilment',      endNode: 'complete' }
  ],

  nodes: [
    // ─── 0: Customer Requirement ───
    {
      id: 'customer-req',
      type: 'process',
      owner: { department: 'customer', role: 'Customer' },
      title: 'Customer Requirement',
      description: 'Customer submits inquiry with product specifications, quantity, and required delivery date.',
      inputs: ['Customer inquiry', 'Product specs', 'Quantity', 'Required date'],
      outputs: ['Requirement specification'],
      events: [
        { text: 'Customer inquiry received', type: 'info' }
      ],
      visual: { svgIds: ['n-customer'] }
    },

    // ─── 1: Sales Reviews ───
    {
      id: 'sales-validation',
      type: 'process',
      owner: { department: 'sales', role: 'Sales Executive' },
      title: 'Sales Reviews',
      description: 'Sales validates requirement, checks product availability, and prepares sourcing request.',
      inputs: ['Requirement specification'],
      outputs: ['Validated RFQ', 'Sourcing request'],
      events: [
        { text: 'RFQ created from customer inquiry', type: 'info' },
        { text: 'Sourcing requirement validated', type: 'success' }
      ],
      visual: { svgIds: ['n-sales'] }
    },

    // ─── 2: Handoff Sales → Purchase ───
    {
      id: 'handoff-sp',
      type: 'handoff',
      from: { department: 'sales', role: 'Sales Executive' },
      to: { department: 'purchase', role: 'Purchase Executive' },
      title: 'Sourcing Requirement Sent to Purchase',
      payload: ['RFQ', 'MPN', 'Make', 'Quantity', 'Required date'],
      trigger: 'Sales completes requirement validation.',
      inputs: ['Validated RFQ'],
      outputs: ['Sourcing task created for Purchase'],
      events: [
        { text: 'Sourcing requirement transferred to Purchase', type: 'handoff' }
      ],
      visual: { svgIds: [] }
    },

    // ─── 3: Purchase Finds Vendor ───
    {
      id: 'vendor-sourcing',
      type: 'process',
      owner: { department: 'purchase', role: 'Purchase Executive' },
      title: 'Purchase Finds Vendor',
      description: 'Purchase evaluates vendor options based on cost, lead time, reliability, and MOQ.',
      inputs: ['Sourcing request', 'Vendor database', 'Market rates'],
      outputs: ['Selected vendor', 'Vendor quote'],
      references: [
        { source: 'Purchase.md', label: 'Vendor Comparison', status: 'confirmed' }
      ],
      events: [
        { text: '3 vendor responses received', type: 'info' },
        { text: 'Vendor comparison completed', type: 'info' }
      ],
      visual: { svgIds: ['n-purchase'] }
    },

    // ─── 4: PO Created ───
    {
      id: 'po-released',
      type: 'milestone',
      owner: { department: 'purchase', role: 'Purchase Executive' },
      title: 'PO Created',
      description: 'Purchase Order officially created and released to vendor. Triggers parallel Finance and Logistics execution.',
      inputs: ['Selected vendor', 'Approved cost'],
      outputs: ['PO released to vendor'],
      events: [
        { text: 'PO-2026-001 released to vendor', type: 'milestone' },
        { text: 'ERP: Parallel handoff created', type: 'automation' }
      ],
      visual: { svgIds: ['n-po'] }
    },

    // ─── 5: PO → Finance + Logistics (PARALLEL) ───
    {
      id: 'po-parallel',
      type: 'parallel',
      title: 'PO Triggers Parallel Execution',
      branches: [
        {
          id: 'finance',
          owner: { department: 'finance', role: 'Finance Executive' },
          title: 'Payment-Term Evaluation',
          steps: [
            {
              id: 'fin-eval',
              type: 'process',
              title: 'Evaluate Payment Terms',
              description: 'Determine advance payment or credit terms based on vendor and PO value.'
            },
            {
              id: 'fin-process',
              type: 'process',
              title: 'Process Payment',
              description: 'Execute payment as per agreed terms.'
            }
          ]
        },
        {
          id: 'logistics',
          owner: { department: 'logistics', role: 'Logistics Coordinator' },
          title: 'Movement Planning',
          steps: [
            {
              id: 'log-plan',
              type: 'process',
              title: 'Plan Inbound Movement',
              description: 'Arrange shipping, customs clearance, and delivery schedule.'
            },
            {
              id: 'log-track',
              type: 'process',
              title: 'Track Shipment',
              description: 'Monitor shipment status and ETA.'
            }
          ]
        }
      ],
      join: 'goods-received',
      inputs: ['PO released'],
      outputs: ['Payment processed', 'Shipment arranged'],
      events: [
        { text: 'Parallel execution started: Finance ∥ Logistics', type: 'parallel' }
      ],
      visual: { svgIds: ['n-finance', 'n-logistics'] }
    },

    // ─── 6: Store Receives ───
    {
      id: 'store-receive',
      type: 'process',
      owner: { department: 'store', role: 'Store Executive' },
      title: 'Store Receives',
      description: 'Physical receipt of material at VSN store. GRN created and material queued for verification.',
      inputs: ['Physical material', 'Delivery documents'],
      outputs: ['GRN created', 'Material in receiving queue'],
      events: [
        { text: 'Material received at store dock', type: 'info' },
        { text: 'GRN-2026-331 created', type: 'success' }
      ],
      visual: { svgIds: ['n-store'] }
    },

    // ─── 7: QC & Inventory ───
    {
      id: 'qc-assessment',
      type: 'verification',
      owner: { department: 'store', role: 'Store Executive' },
      title: 'QC & Inventory',
      description: 'Quality check determines material disposition. Accepted stock becomes usable inventory.',
      checks: [
        'Quantity match',
        'MPN verification',
        'Physical condition',
        'Date code validity',
        'Batch/lot code'
      ],
      outcomes: [
        { id: 'accepted', label: 'Accepted', next: 'inventory-update' },
        { id: 'hold', label: 'Hold', next: 'hold-material' },
        { id: 'rejected', label: 'Rejected', next: 'qc-rejection' }
      ],
      selected: 'accepted',
      inputs: ['GRN', 'Physical material'],
      outputs: ['QC result', 'Inventory updated'],
      references: [
        { source: 'Store.md', label: 'QC Protocol', status: 'confirmed' }
      ],
      events: [
        { text: 'QC assessment started', type: 'info' },
        { text: 'All checks passed → ACCEPTED', type: 'success' }
      ],
      visual: { svgIds: ['n-qc'] }
    },

    // ─── 8: Fulfilment ───
    {
      id: 'fulfilment',
      type: 'process',
      owner: { department: 'logistics', role: 'Logistics Coordinator' },
      title: 'Fulfilment',
      description: 'Order picked, packed, and dispatched to customer. Material moves from inventory to outbound.',
      inputs: ['Accepted inventory', 'Customer order'],
      outputs: ['Dispatch prepared', 'Customer shipment'],
      events: [
        { text: 'Order picked and packed', type: 'info' },
        { text: 'Outbound dispatch prepared', type: 'info' }
      ],
      visual: { svgIds: [] }
    },

    // ─── 9: Complete ───
    {
      id: 'complete',
      type: 'completion',
      title: 'Transaction Complete',
      summary: 'Material received, QC passed, inventory updated, order fulfilled. Customer commitment delivered.',
      metrics: {
        'Cycle time': '8 days',
        'On-time delivery': 'Yes',
        'Exceptions': '0',
        'QC result': 'Accepted'
      },
      events: [
        { text: 'TRANSACTION COMPLETE', type: 'success' }
      ],
      visual: { svgIds: [] }
    }
  ],

  edges: [
    { id: 'e1',  from: 'customer-req',    to: 'sales-validation', type: 'normal' },
    { id: 'e2',  from: 'sales-validation', to: 'handoff-sp',      type: 'handoff' },
    { id: 'e3',  from: 'handoff-sp',       to: 'vendor-sourcing', type: 'normal' },
    { id: 'e4',  from: 'vendor-sourcing',  to: 'po-released',     type: 'normal' },
    { id: 'e5',  from: 'po-released',      to: 'po-parallel',     type: 'parallel' },
    { id: 'e6a', from: 'po-parallel',      to: 'store-receive',   type: 'normal' },
    { id: 'e7',  from: 'store-receive',    to: 'qc-assessment',   type: 'normal' },
    { id: 'e8',  from: 'qc-assessment',    to: 'fulfilment',      type: 'normal' },
    { id: 'e9',  from: 'fulfilment',       to: 'complete',        type: 'normal' }
  ],

  start: 'customer-req',
  completion: ['complete']
};

// Register the workflow
WorkflowEngine.register(window.OVERVIEW_WORKFLOW);
