/* ============================================================
   VSN ERP — WF-01: Customer Requirement → Order
   ============================================================
   How customer inquiries become confirmed sales orders.
   Exercises: decisions, approvals, loops, handoffs, automation.
   ============================================================ */

window.WF_01_WORKFLOW = {
  id: 'wf-01',
  title: 'Customer Requirement → Order',
  subtitle: 'How customer inquiries become confirmed sales orders',
  description: 'From initial customer inquiry through requirement validation, quotation, negotiation, and final order confirmation.',

  departments: [
    { id: 'customer',  name: 'Customer',  color: '#667085' },
    { id: 'sales',     name: 'Sales',     color: '#3B82F6' },
    { id: 'purchase',  name: 'Purchase',  color: '#8B5CF6' },
    { id: 'management', name: 'Management', color: '#4338CA' }
  ],

  phases: [
    { id: 'inquiry',     title: 'Inquiry',     subtitle: 'Customer submits requirement',    startNode: 'customer-inquiry',     endNode: 'requirement-validated' },
    { id: 'quotation',   title: 'Quotation',   subtitle: 'Sales prepares quote',            startNode: 'quotation-prep',       endNode: 'quote-sent' },
    { id: 'negotiation', title: 'Negotiation', subtitle: 'Terms agreed',                    startNode: 'customer-review',      endNode: 'terms-agreed' },
    { id: 'approval',    title: 'Approval',    subtitle: 'Management authorizes',           startNode: 'margin-check',         endNode: 'order-confirmed' },
    { id: 'handoff',     title: 'Handoff',     subtitle: 'Transfer to Purchase',            startNode: 'order-to-purchase',    endNode: 'order-complete' }
  ],

  nodes: [
    // ─── 0: Customer Inquiry ───
    {
      id: 'customer-inquiry',
      type: 'process',
      owner: { department: 'customer', role: 'Customer' },
      title: 'Customer Inquiry',
      description: 'Customer submits product inquiry with specifications, quantity, and required delivery date.',
      inputs: ['Product specifications', 'Quantity', 'Required delivery date', 'Customer details'],
      outputs: ['Inquiry record'],
      events: [
        { text: 'Customer inquiry received via email/portal', type: 'info' },
        { text: 'Inquiry logged in CRM system', type: 'info' },
        { text: 'Auto-acknowledgment sent to customer', type: 'automation' }
      ],
      references: [
        { source: 'Sales.md', label: 'Inquiry Capture', status: 'confirmed' }
      ],
      visual: { svgIds: ['n-inquiry'] }
    },

    // ─── 1: Requirement Validation ───
    {
      id: 'requirement-validated',
      type: 'verification',
      owner: { department: 'sales', role: 'Sales Executive' },
      title: 'Requirement Validation',
      description: 'Sales validates completeness and feasibility of customer requirement.',
      checks: [
        'Product specifications clear',
        'Quantity meets MOQ',
        'Delivery date realistic',
        'Technical feasibility confirmed',
        'Customer credit status'
      ],
      outcomes: [
        { id: 'valid', label: 'Valid', next: 'quotation-prep' },
        { id: 'incomplete', label: 'Incomplete', next: 'clarification' },
        { id: 'infeasible', label: 'Infeasible', next: 'rejection' }
      ],
      selected: 'valid',
      inputs: ['Inquiry record'],
      outputs: ['Validated requirement'],
      events: [
        { text: 'Requirement validation started', type: 'info' },
        { text: 'Technical specs verified with engineering', type: 'info' },
        { text: 'Customer credit check passed', type: 'success' },
        { text: 'All validation checks passed', type: 'success' }
      ],
      references: [
        { source: 'Sales.md', label: 'Requirement Validation', status: 'confirmed' },
        { source: 'Credit.md', label: 'Credit Check Rules', status: 'tbd', note: 'TBD — CLIENT VALIDATION REQUIRED' }
      ],
      visual: { svgIds: ['n-validation'] }
    },

    // ─── 2: Clarification Request ───
    {
      id: 'clarification',
      type: 'handoff',
      from: { department: 'sales', role: 'Sales Executive' },
      to: { department: 'customer', role: 'Customer' },
      title: 'Clarification Request',
      description: 'Sales requests additional information from customer to complete requirement.',
      payload: ['Clarification questions', 'Missing specifications', 'Alternative suggestions'],
      trigger: 'Requirement validation found incomplete information.',
      inputs: ['Incomplete requirement'],
      outputs: ['Clarification request sent'],
      events: [
        { text: 'Clarification request sent to customer', type: 'handoff' },
        { text: 'Waiting for customer response', type: 'info' }
      ],
      visual: { svgIds: ['n-clarification'] }
    },

    // ─── 3: Rejection ───
    {
      id: 'rejection',
      type: 'exception',
      owner: { department: 'sales', role: 'Sales Executive' },
      title: 'Requirement Rejected',
      description: 'Customer requirement cannot be fulfilled due to technical or commercial constraints.',
      trigger: 'Requirement validation determined infeasibility',
      impact: 'Customer inquiry cannot proceed to quotation',
      severity: 'medium',
      actions: [
        'Inform customer of constraints',
        'Suggest alternative products/specifications',
        'Offer to revisit when conditions change'
      ],
      resolution: 'Customer informed, alternatives provided',
      resumeAt: null,
      escalationTo: 'management',
      inputs: ['Infeasible requirement'],
      outputs: ['Rejection notice', 'Alternative suggestions'],
      events: [
        { text: 'Requirement rejected — infeasible', type: 'error' },
        { text: 'Customer notified with alternatives', type: 'warning' },
        { text: 'Rejection logged in CRM', type: 'info' }
      ],
      visual: { svgIds: ['n-rejection'] }
    },

    // ─── 4: Quotation Preparation ───
    {
      id: 'quotation-prep',
      type: 'process',
      owner: { department: 'sales', role: 'Sales Executive' },
      title: 'Quotation Preparation',
      description: 'Sales prepares detailed quotation including pricing, delivery terms, and payment conditions.',
      inputs: ['Validated requirement', 'Current pricing', 'Delivery availability'],
      outputs: ['Draft quotation'],
      events: [
        { text: 'Pricing retrieved from product catalog', type: 'info' },
        { text: 'Delivery lead time checked with logistics', type: 'info' },
        { text: 'Draft quotation prepared', type: 'success' },
        { text: 'Margin analysis completed', type: 'info' }
      ],
      references: [
        { source: 'Sales.md', label: 'Pricing Rules', status: 'confirmed' },
        { source: 'Sales.md', label: 'Margin Thresholds', status: 'tbd', note: 'TBD — CLIENT VALIDATION REQUIRED' }
      ],
      visual: { svgIds: ['n-quotation'] }
    },

    // ─── 5: Quote Sent to Customer ───
    {
      id: 'quote-sent',
      type: 'milestone',
      owner: { department: 'sales', role: 'Sales Executive' },
      title: 'Quote Sent to Customer',
      description: 'Formal quotation document sent to customer for review.',
      inputs: ['Draft quotation'],
      outputs: ['Quote delivered to customer'],
      events: [
        { text: 'Quotation QT-2026-001 generated', type: 'milestone' },
        { text: 'Quote sent to customer via email', type: 'info' },
        { text: 'Quote validity: 15 days', type: 'info' }
      ],
      visual: { svgIds: ['n-quote-sent'] }
    },

    // ─── 6: Customer Review ───
    {
      id: 'customer-review',
      type: 'process',
      owner: { department: 'customer', role: 'Customer' },
      title: 'Customer Reviews Quote',
      description: 'Customer evaluates the quotation and decides whether to proceed, negotiate, or decline.',
      inputs: ['Quotation document'],
      outputs: ['Customer feedback'],
      events: [
        { text: 'Customer received quotation', type: 'info' },
        { text: 'Customer reviewing pricing and terms', type: 'info' }
      ],
      visual: { svgIds: ['n-customer-review'] }
    },

    // ─── 7: Margin Check (DECISION) ───
    {
      id: 'margin-check',
      type: 'decision',
      owner: { department: 'sales', role: 'Sales Executive' },
      title: 'Margin Check',
      description: 'Evaluate whether the quoted margin meets company thresholds.',
      question: 'Can the margin be maintained at the quoted price?',
      options: [
        {
          id: 'margin-ok',
          label: 'Yes — margin acceptable',
          consequence: 'Proceed with current quotation',
          next: 'terms-negotiation'
        },
        {
          id: 'margin-low',
          label: 'No — margin below threshold',
          consequence: 'Requires management approval or price revision',
          next: 'management-approval'
        }
      ],
      selected: 'margin-ok',
      reason: 'Quoted margin of 18% exceeds minimum threshold of 15%.',
      inputs: ['Draft quotation', 'Margin analysis'],
      outputs: ['Margin decision'],
      events: [
        { text: 'Margin analysis: 18% (threshold: 15%)', type: 'info' },
        { text: 'Decision: margin acceptable — proceed', type: 'decision' }
      ],
      references: [
        { source: 'Sales.md', label: 'Margin Rules', status: 'tbd', note: 'TBD — CLIENT VALIDATION REQUIRED' }
      ],
      visual: { svgIds: ['n-margin-check'] }
    },

    // ─── 8: Management Approval ───
    {
      id: 'management-approval',
      type: 'approval',
      owner: { department: 'management', role: 'Management' },
      title: 'Management Approval',
      description: 'Management reviews and authorizes quotation with reduced margin.',
      requester: 'sales',
      approver: 'management',
      condition: 'Quoted margin below standard threshold (15%)',
      outcomes: [
        { id: 'approved', label: 'Approved', next: 'terms-negotiation' },
        { id: 'rejected', label: 'Rejected', next: 'price-revision' },
        { id: 'revision', label: 'Revision Required', next: 'quotation-prep' }
      ],
      selected: 'approved',
      inputs: ['Reduced margin quotation'],
      outputs: ['Approval decision'],
      events: [
        { text: 'Approval request sent to Management', type: 'info' },
        { text: 'Management reviewing margin exception', type: 'info' },
        { text: 'APPROVED: Margin exception authorized', type: 'success' }
      ],
      references: [
        { source: 'MGMT.md', label: 'Approval Authority', status: 'tbd', note: 'TBD — CLIENT VALIDATION REQUIRED' }
      ],
      visual: { svgIds: ['n-mgmt-approval'] }
    },

    // ─── 9: Price Revision ───
    {
      id: 'price-revision',
      type: 'loop',
      owner: { department: 'sales', role: 'Sales Executive' },
      title: 'Price Revision Loop',
      description: 'Sales revises pricing based on management feedback and resubmits.',
      from: 'quotation-prep',
      condition: 'Management rejected margin exception',
      repeatUntil: 'Acceptable margin achieved',
      maxIterations: 3,
      inputs: ['Management feedback'],
      outputs: ['Revised quotation'],
      events: [
        { text: 'Price revision loop initiated', type: 'warning' },
        { text: 'Iteration 1: Adjusting pricing structure', type: 'info' }
      ],
      visual: { svgIds: ['n-price-revision'] }
    },

    // ─── 10: Terms Negotiation ───
    {
      id: 'terms-negotiation',
      type: 'process',
      owner: { department: 'sales', role: 'Sales Executive' },
      title: 'Terms Negotiation',
      description: 'Sales and customer negotiate final terms including payment, delivery, and warranty.',
      inputs: ['Accepted quotation', 'Customer feedback'],
      outputs: ['Negotiated terms'],
      events: [
        { text: 'Negotiation started with customer', type: 'info' },
        { text: 'Payment terms discussed: 30-day credit', type: 'info' },
        { text: 'Delivery schedule confirmed', type: 'success' },
        { text: 'Warranty terms agreed', type: 'success' }
      ],
      visual: { svgIds: ['n-negotiation'] }
    },

    // ─── 11: Terms Agreed ───
    {
      id: 'terms-agreed',
      type: 'milestone',
      owner: { department: 'sales', role: 'Sales Executive' },
      title: 'Terms Agreed',
      description: 'All commercial terms finalized between VSN and customer.',
      inputs: ['Negotiated terms'],
      outputs: ['Final terms document'],
      events: [
        { text: 'All terms agreed with customer', type: 'milestone' },
        { text: 'Final quotation confirmed', type: 'success' }
      ],
      visual: { svgIds: ['n-terms-agreed'] }
    },

    // ─── 12: Order Confirmation ───
    {
      id: 'order-confirmed',
      type: 'milestone',
      owner: { department: 'sales', role: 'Sales Executive' },
      title: 'Order Confirmed',
      description: 'Customer places formal order. Sales order created in ERP.',
      inputs: ['Final terms', 'Customer PO'],
      outputs: ['Sales order SO-2026-001'],
      events: [
        { text: 'Customer PO received', type: 'info' },
        { text: 'Sales order SO-2026-001 created', type: 'milestone' },
        { text: 'Order confirmed with customer', type: 'success' }
      ],
      visual: { svgIds: ['n-order-confirmed'] }
    },

    // ─── 13: Auto-Create RFQ ───
    {
      id: 'auto-create-rfq',
      type: 'automation',
      owner: 'ERP',
      trigger: 'Sales order confirmed',
      action: 'Automatically create RFQ task for Purchase department',
      sla: 'Immediate',
      event: 'RFQ task created and assigned to Purchase',
      inputs: ['Sales order'],
      outputs: ['RFQ task created'],
      events: [
        { text: 'ERP AUTOMATION: RFQ task created', type: 'automation' },
        { text: 'Task assigned to Purchase Executive', type: 'automation' },
        { text: 'Notification sent to Purchase department', type: 'automation' }
      ],
      visual: { svgIds: ['n-auto-rfq'] }
    },

    // ─── 14: Handoff to Purchase ───
    {
      id: 'order-to-purchase',
      type: 'handoff',
      from: { department: 'sales', role: 'Sales Executive' },
      to: { department: 'purchase', role: 'Purchase Executive' },
      title: 'Order Handoff to Purchase',
      description: 'Sales transfers order details to Purchase for vendor sourcing and procurement.',
      payload: ['Sales order', 'Product specifications', 'Quantity', 'Required delivery', 'Customer terms'],
      trigger: 'Order confirmed and RFQ task created by ERP.',
      inputs: ['Sales order', 'RFQ task'],
      outputs: ['Purchase working on order'],
      events: [
        { text: 'Order details transferred to Purchase', type: 'handoff' },
        { text: 'Purchase acknowledges receipt', type: 'success' },
        { text: 'Vendor sourcing initiated', type: 'info' }
      ],
      visual: { svgIds: ['n-handoff-purchase'] }
    },

    // ─── 15: Order Complete ───
    {
      id: 'order-complete',
      type: 'completion',
      title: 'Order Process Complete',
      summary: 'Customer inquiry processed, quotation agreed, order confirmed, and handed off to Purchase for fulfillment.',
      metrics: {
        'Inquiry to Order': '5 days',
        'Quotation iterations': '1',
        'Approval required': 'No',
        'Customer satisfaction': 'Pending'
      },
      events: [
        { text: 'ORDER PROCESS COMPLETE', type: 'success' },
        { text: 'Order handed to Purchase for fulfillment', type: 'info' }
      ],
      visual: { svgIds: ['n-order-complete'] }
    }
  ],

  edges: [
    { id: 'e1',  from: 'customer-inquiry',    to: 'requirement-validated', type: 'normal' },
    { id: 'e2a', from: 'requirement-validated', to: 'quotation-prep',       type: 'normal' },
    { id: 'e2b', from: 'requirement-validated', to: 'clarification',        type: 'handoff' },
    { id: 'e2c', from: 'requirement-validated', to: 'rejection',            type: 'exception' },
    { id: 'e3',  from: 'clarification',        to: 'customer-inquiry',     type: 'loop' },
    { id: 'e4',  from: 'quotation-prep',       to: 'quote-sent',           type: 'normal' },
    { id: 'e5',  from: 'quote-sent',           to: 'customer-review',      type: 'normal' },
    { id: 'e6',  from: 'customer-review',      to: 'margin-check',         type: 'normal' },
    { id: 'e7a', from: 'margin-check',         to: 'terms-negotiation',    type: 'normal' },
    { id: 'e7b', from: 'margin-check',         to: 'management-approval',  type: 'normal' },
    { id: 'e8',  from: 'management-approval',  to: 'terms-negotiation',    type: 'normal' },
    { id: 'e9',  from: 'management-approval',  to: 'price-revision',       type: 'exception' },
    { id: 'e10', from: 'price-revision',       to: 'quotation-prep',       type: 'loop' },
    { id: 'e11', from: 'terms-negotiation',    to: 'terms-agreed',         type: 'normal' },
    { id: 'e12', from: 'terms-agreed',         to: 'order-confirmed',      type: 'normal' },
    { id: 'e13', from: 'order-confirmed',      to: 'auto-create-rfq',      type: 'automation' },
    { id: 'e14', from: 'auto-create-rfq',      to: 'order-to-purchase',    type: 'handoff' },
    { id: 'e15', from: 'order-to-purchase',    to: 'order-complete',       type: 'normal' }
  ],

  start: 'customer-inquiry',
  completion: ['order-complete']
};

WorkflowEngine.register(window.WF_01_WORKFLOW);
