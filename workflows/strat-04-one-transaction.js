/* ============================================================
   VSN ERP — STRAT-04: One Transaction → One Timeline
   ============================================================
   How the ERP connects one customer transaction across all departments.
   Exercises: end-to-end summary.
   ============================================================ */

window.STRAT_04_WORKFLOW = {
  id: 'strat-04',
  title: 'One Transaction → One Timeline',
  subtitle: 'How the ERP connects one customer transaction across all departments into a single timeline',
  description: 'End-to-end view showing how one transaction flows through all departments.',

  departments: [
    { id: 'customer',  name: 'Customer',  color: '#667085' },
    { id: 'sales',     name: 'Sales',     color: '#3B82F6' },
    { id: 'purchase',  name: 'Purchase',  color: '#8B5CF6' },
    { id: 'store',     name: 'Store',     color: '#14B8A6' },
    { id: 'finance',   name: 'Finance',   color: '#10B981' },
    { id: 'logistics', name: 'Logistics', color: '#F59E0B' }
  ],

  phases: [
    { id: 'timeline', title: 'Timeline', subtitle: 'One transaction, all departments', startNode: 't-01-inquiry', endNode: 't-10-complete' }
  ],

  nodes: [
    {
      id: 't-01-inquiry',
      type: 'process',
      owner: { department: 'customer', role: 'Customer' },
      title: 'T1: Customer Inquiry',
      description: 'Customer submits inquiry through portal.',
      inputs: ['Product requirement'],
      outputs: ['Inquiry logged'],
      events: [
        { text: 'T1: Customer inquiry received', type: 'info' },
        { text: 'ERP: Auto-logged, auto-acknowledged', type: 'automation' }
      ],
      visual: { svgIds: ['n-t-01'] }
    },

    {
      id: 't-02-quotation',
      type: 'process',
      owner: { department: 'sales', role: 'Sales Executive' },
      title: 'T2: Quotation',
      description: 'Sales prepares and sends quotation.',
      inputs: ['Inquiry', 'Pricing'],
      outputs: ['Quotation'],
      events: [
        { text: 'T2: Quotation QT-001 prepared', type: 'info' },
        { text: 'ERP: Auto-task for Purchase', type: 'automation' }
      ],
      visual: { svgIds: ['n-t-02'] }
    },

    {
      id: 't-03-order',
      type: 'milestone',
      owner: { department: 'sales', role: 'Sales Executive' },
      title: 'T3: Order Confirmed',
      description: 'Customer places order.',
      inputs: ['Customer PO'],
      outputs: ['Sales order'],
      events: [
        { text: 'T3: Order SO-001 confirmed', type: 'milestone' },
        { text: 'ERP: All departments notified', type: 'automation' }
      ],
      visual: { svgIds: ['n-t-03'] }
    },

    {
      id: 't-04-po',
      type: 'process',
      owner: { department: 'purchase', role: 'Purchase Executive' },
      title: 'T4: PO Created',
      description: 'Purchase creates PO to vendor.',
      inputs: ['Sales order', 'Vendor selection'],
      outputs: ['PO'],
      events: [
        { text: 'T4: PO-001 created', type: 'info' },
        { text: 'ERP: Auto-sent to Finance', type: 'automation' }
      ],
      visual: { svgIds: ['n-t-04'] }
    },

    {
      id: 't-05-goods',
      type: 'process',
      owner: { department: 'store', role: 'Store Executive' },
      title: 'T5: Goods Received',
      description: 'Goods received and quality checked.',
      inputs: ['Shipment'],
      outputs: ['GRN'],
      events: [
        { text: 'T5: GRN-001 created', type: 'info' },
        { text: 'ERP: Inventory updated auto', type: 'automation' }
      ],
      visual: { svgIds: ['n-t-05'] }
    },

    {
      id: 't-06-finance',
      type: 'process',
      owner: { department: 'finance', role: 'Finance Manager' },
      title: 'T6: Payment Processed',
      description: 'Invoice verified and payment made.',
      inputs: ['Invoice', 'GRN', 'PO'],
      outputs: ['Payment'],
      events: [
        { text: 'T6: Three-way match passed', type: 'success' },
        { text: 'ERP: Payment auto-processed', type: 'automation' }
      ],
      visual: { svgIds: ['n-t-06'] }
    },

    {
      id: 't-07-shipment',
      type: 'process',
      owner: { department: 'logistics', role: 'Logistics Coordinator' },
      title: 'T7: Shipment Prepared',
      description: 'Goods picked, packed, and labeled.',
      inputs: ['Inventory'],
      outputs: ['Shipment'],
      events: [
        { text: 'T7: Shipment SH-001 prepared', type: 'info' },
        { text: 'ERP: Auto-tracking started', type: 'automation' }
      ],
      visual: { svgIds: ['n-t-07'] }
    },

    {
      id: 't-08-delivery',
      type: 'process',
      owner: { department: 'logistics', role: 'Logistics Coordinator' },
      title: 'T8: Delivery',
      description: 'Goods delivered to customer.',
      inputs: ['Shipment'],
      outputs: ['POD'],
      events: [
        { text: 'T8: Delivery confirmed', type: 'success' },
        { text: 'ERP: Customer notified auto', type: 'automation' }
      ],
      visual: { svgIds: ['n-t-08'] }
    },

    {
      id: 't-09-reconciliation',
      type: 'process',
      owner: { department: 'finance', role: 'Finance Manager' },
      title: 'T9: Reconciliation',
      description: 'Transaction reconciled in ERP.',
      inputs: ['All documents'],
      outputs: ['Reconciled record'],
      events: [
        { text: 'T9: Transaction reconciled', type: 'success' },
        { text: 'ERP: Audit trail complete', type: 'automation' }
      ],
      visual: { svgIds: ['n-t-09'] }
    },

    {
      id: 't-10-complete',
      type: 'completion',
      title: 'T10: Transaction Complete',
      summary: 'One customer transaction connected across all 6 departments.',
      metrics: {
        'Total Time': '10 days',
        'Departments': '6',
        'Handoffs': '5 auto-routed',
        'Visibility': '100% real-time',
        'Paper Work': 'Zero'
      },
      events: [
        { text: 'TRANSACTION COMPLETE', type: 'success' },
        { text: 'One transaction, one timeline, all connected', type: 'success' }
      ],
      visual: { svgIds: ['n-t-10'] }
    }
  ],

  edges: [
    { id: 'e1', from: 't-01-inquiry',       to: 't-02-quotation',      type: 'normal' },
    { id: 'e2', from: 't-02-quotation',      to: 't-03-order',          type: 'normal' },
    { id: 'e3', from: 't-03-order',          to: 't-04-po',             type: 'normal' },
    { id: 'e4', from: 't-04-po',             to: 't-05-goods',          type: 'normal' },
    { id: 'e5', from: 't-05-goods',          to: 't-06-finance',        type: 'normal' },
    { id: 'e6', from: 't-06-finance',        to: 't-07-shipment',       type: 'normal' },
    { id: 'e7', from: 't-07-shipment',       to: 't-08-delivery',       type: 'normal' },
    { id: 'e8', from: 't-08-delivery',       to: 't-09-reconciliation', type: 'normal' },
    { id: 'e9', from: 't-09-reconciliation', to: 't-10-complete',       type: 'normal' }
  ],

  start: 't-01-inquiry',
  completion: ['t-10-complete']
};

WorkflowEngine.register(window.STRAT_04_WORKFLOW);
