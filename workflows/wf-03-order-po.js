/* ============================================================
   VSN ERP — WF-03: Order → PO
   ============================================================
   How sales orders become purchase orders.
   Exercises: verification, approval, automation.
   ============================================================ */

window.WF_03_WORKFLOW = {
  id: 'wf-03',
  title: 'Order → PO',
  subtitle: 'How sales orders become purchase orders',
  description: 'From sales order receipt through verification, PO creation, and approval.',

  departments: [
    { id: 'sales',    name: 'Sales',    color: '#3B82F6' },
    { id: 'purchase', name: 'Purchase', color: '#8B5CF6' },
    { id: 'finance',  name: 'Finance',  color: '#10B981' }
  ],

  phases: [
    { id: 'receipt',    title: 'Receipt',    subtitle: 'Order received',         startNode: 'order-received',    endNode: 'order-verified' },
    { id: 'preparation', title: 'Preparation', subtitle: 'PO created',           startNode: 'po-preparation',    endNode: 'po-submitted' },
    { id: 'approval',   title: 'Approval',   subtitle: 'PO approved',           startNode: 'po-review',         endNode: 'po-approved' }
  ],

  nodes: [
    {
      id: 'order-received',
      type: 'process',
      owner: { department: 'sales', role: 'Sales Executive' },
      title: 'Sales Order Received',
      description: 'Sales order received from customer with specifications and delivery requirements.',
      inputs: ['Customer PO', 'Product specifications', 'Quantity', 'Delivery date'],
      outputs: ['Sales order record'],
      events: [
        { text: 'Sales order SO-2026-001 received', type: 'info' },
        { text: 'Order details logged in ERP', type: 'info' },
        { text: 'Auto-verification initiated', type: 'automation' }
      ],
      visual: { svgIds: ['n-order-received'] }
    },

    {
      id: 'order-verified',
      type: 'verification',
      owner: { department: 'sales', role: 'Sales Executive' },
      title: 'Order Verification',
      description: 'Verify order completeness and feasibility.',
      checks: ['Product specs complete', 'Quantity valid', 'Delivery date realistic', 'Credit approved'],
      outcomes: [
        { id: 'valid', label: 'Valid', next: 'po-preparation' },
        { id: 'invalid', label: 'Invalid', next: 'order-received' }
      ],
      selected: 'valid',
      inputs: ['Sales order record'],
      outputs: ['Verified order'],
      events: [
        { text: 'Verifying order details...', type: 'info' },
        { text: 'All checks passed', type: 'success' },
        { text: 'Order ready for PO creation', type: 'success' }
      ],
      visual: { svgIds: ['n-order-verified'] }
    },

    {
      id: 'po-preparation',
      type: 'process',
      owner: { department: 'purchase', role: 'Purchase Executive' },
      title: 'PO Preparation',
      description: 'Purchase prepares purchase order based on verified sales order.',
      inputs: ['Verified order', 'Vendor selection', 'Pricing'],
      outputs: ['Draft PO'],
      events: [
        { text: 'PO draft created', type: 'info' },
        { text: 'Vendor: Vendor A selected', type: 'info' },
        { text: 'PO value: $25,000', type: 'info' }
      ],
      visual: { svgIds: ['n-po-preparation'] }
    },

    {
      id: 'po-submitted',
      type: 'milestone',
      owner: { department: 'purchase', role: 'Purchase Executive' },
      title: 'PO Submitted for Review',
      description: 'PO submitted to Finance for budget compliance review.',
      inputs: ['Draft PO'],
      outputs: ['PO under review'],
      events: [
        { text: 'PO-2026-001 submitted for review', type: 'milestone' },
        { text: 'Awaiting Finance approval', type: 'info' }
      ],
      visual: { svgIds: ['n-po-submitted'] }
    },

    {
      id: 'po-review',
      type: 'approval',
      owner: { department: 'finance', role: 'Finance Manager' },
      title: 'PO Review',
      description: 'Finance reviews PO for budget compliance and payment terms.',
      requester: 'purchase',
      approver: 'finance',
      condition: 'PO amount within budget allocation',
      outcomes: [
        { id: 'approved', label: 'Approved', next: 'po-approved' },
        { id: 'revision', label: 'Revision Required', next: 'po-preparation' }
      ],
      selected: 'approved',
      inputs: ['Draft PO', 'Budget check'],
      outputs: ['Approval decision'],
      events: [
        { text: 'Finance reviewing PO-2026-001', type: 'info' },
        { text: 'Budget check: within allocation', type: 'info' },
        { text: 'APPROVED by Finance Manager', type: 'success' }
      ],
      references: [
        { source: 'Finance.md', label: 'Approval Thresholds', status: 'tbd', note: 'TBD — CLIENT VALIDATION REQUIRED' }
      ],
      visual: { svgIds: ['n-po-review'] }
    },

    {
      id: 'po-approved',
      type: 'completion',
      title: 'PO Approved',
      summary: 'Purchase order approved and ready for vendor dispatch.',
      metrics: {
        'Order to PO': '2 days',
        'Approval Time': '4 hours',
        'PO Value': '$25,000',
        'Vendor': 'Vendor A'
      },
      events: [
        { text: 'PO APPROVED', type: 'success' },
        { text: 'Ready for vendor dispatch', type: 'info' }
      ],
      visual: { svgIds: ['n-po-approved'] }
    }
  ],

  edges: [
    { id: 'e1', from: 'order-received',  to: 'order-verified', type: 'normal' },
    { id: 'e2', from: 'order-verified',   to: 'po-preparation', type: 'normal' },
    { id: 'e3', from: 'po-preparation',   to: 'po-submitted',   type: 'normal' },
    { id: 'e4', from: 'po-submitted',     to: 'po-review',      type: 'normal' },
    { id: 'e5', from: 'po-review',        to: 'po-approved',    type: 'normal' }
  ],

  start: 'order-received',
  completion: ['po-approved']
};

WorkflowEngine.register(window.WF_03_WORKFLOW);
