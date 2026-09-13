/* ============================================================
   VSN ERP — WF-02: Sourcing → Procurement
   ============================================================
   How purchase requirements become vendor orders.
   Exercises: decisions, loops, approvals, multiple handoffs.
   ============================================================ */

window.WF_02_WORKFLOW = {
  id: 'wf-02',
  title: 'Sourcing → Procurement',
  subtitle: 'How purchase requirements become vendor orders',
  description: 'From purchase requirement through vendor selection, negotiation, PO creation, and approval.',

  departments: [
    { id: 'purchase',  name: 'Purchase',  color: '#8B5CF6' },
    { id: 'finance',   name: 'Finance',   color: '#10B981' },
    { id: 'management', name: 'Management', color: '#4338CA' }
  ],

  phases: [
    { id: 'requirement', title: 'Requirement', subtitle: 'Purchase need identified',          startNode: 'purchase-req',       endNode: 'rfq-created' },
    { id: 'sourcing',    title: 'Sourcing',    subtitle: 'Vendor selection',                   startNode: 'vendor-search',      endNode: 'vendor-selected' },
    { id: 'negotiation', title: 'Negotiation', subtitle: 'Terms agreed',                       startNode: 'quote-comparison',   endNode: 'terms-agreed' },
    { id: 'approval',    title: 'Approval',    subtitle: 'PO authorized',                      startNode: 'po-created',         endNode: 'po-approved' },
    { id: 'handoff',     title: 'Handoff',     subtitle: 'Order placed',                       startNode: 'po-sent-vendor',     endNode: 'procurement-complete' }
  ],

  nodes: [
    // ─── 0: Purchase Requirement ───
    {
      id: 'purchase-req',
      type: 'process',
      owner: { department: 'purchase', role: 'Purchase Executive' },
      title: 'Purchase Requirement',
      description: 'Purchase requirement received from Sales order or inventory trigger.',
      inputs: ['Sales order / inventory alert', 'Product specifications', 'Quantity'],
      outputs: ['Purchase requirement record'],
      events: [
        { text: 'Purchase requirement received', type: 'info' },
        { text: 'Requirement logged in procurement system', type: 'info' },
        { text: 'Auto-acknowledgment sent to requesting department', type: 'automation' }
      ],
      references: [
        { source: 'Purchase.md', label: 'Requirement Capture', status: 'confirmed' }
      ],
      visual: { svgIds: ['n-purchase-req'] }
    },

    // ─── 1: Vendor Search ───
    {
      id: 'vendor-search',
      type: 'process',
      owner: { department: 'purchase', role: 'Purchase Executive' },
      title: 'Vendor Search',
      description: 'Search approved vendor database for suitable suppliers.',
      inputs: ['Product specifications', 'Approved vendor list'],
      outputs: ['Shortlisted vendors'],
      events: [
        { text: 'Searching approved vendor database', type: 'info' },
        { text: 'Found 3 potential vendors', type: 'info' },
        { text: 'Vendor capability check completed', type: 'success' }
      ],
      references: [
        { source: 'Purchase.md', label: 'Approved Vendors', status: 'confirmed' }
      ],
      visual: { svgIds: ['n-vendor-search'] }
    },

    // ─── 2: RFQ Created ───
    {
      id: 'rfq-created',
      type: 'milestone',
      owner: { department: 'purchase', role: 'Purchase Executive' },
      title: 'RFQ Created',
      description: 'Request for Quotation created and sent to shortlisted vendors.',
      inputs: ['Shortlisted vendors', 'Purchase requirement'],
      outputs: ['RFQ documents sent to vendors'],
      events: [
        { text: 'RFQ-2026-001 created', type: 'milestone' },
        { text: 'RFQ sent to 3 vendors', type: 'info' },
        { text: 'Response deadline: 5 business days', type: 'info' }
      ],
      visual: { svgIds: ['n-rfq-created'] }
    },

    // ─── 3: Quote Comparison ───
    {
      id: 'quote-comparison',
      type: 'process',
      owner: { department: 'purchase', role: 'Purchase Executive' },
      title: 'Quote Comparison',
      description: 'Compare vendor quotes on price, quality, delivery, and terms.',
      inputs: ['Vendor quotes', 'Comparison criteria'],
      outputs: ['Vendor ranking'],
      events: [
        { text: 'Quotes received from 3 vendors', type: 'info' },
        { text: 'Comparing on price, quality, delivery', type: 'info' },
        { text: 'Vendor ranking completed', type: 'success' }
      ],
      references: [
        { source: 'Purchase.md', label: 'Evaluation Criteria', status: 'tbd', note: 'TBD — CLIENT VALIDATION REQUIRED' }
      ],
      visual: { svgIds: ['n-quote-comparison'] }
    },

    // ─── 4: Vendor Selection (DECISION) ───
    {
      id: 'vendor-selection',
      type: 'decision',
      owner: { department: 'purchase', role: 'Purchase Executive' },
      title: 'Vendor Selection',
      description: 'Select best vendor based on comparison.',
      question: 'Does the top-ranked vendor meet all requirements?',
      options: [
        {
          id: 'select',
          label: 'Yes — proceed with top vendor',
          consequence: 'Negotiate terms with selected vendor',
          next: 'vendor-negotiation'
        },
        {
          id: 'renegotiate',
          label: 'No — renegotiate with multiple vendors',
          consequence: 'Request revised quotes',
          next: 'renegotiation-loop'
        }
      ],
      selected: 'select',
      reason: 'Top vendor meets all criteria at competitive pricing.',
      inputs: ['Vendor ranking'],
      outputs: ['Vendor selection decision'],
      events: [
        { text: 'Vendor evaluation: 3 vendors scored', type: 'info' },
        { text: 'Decision: Proceed with Vendor A', type: 'decision' },
        { text: 'Vendor A: Best price + quality combination', type: 'success' }
      ],
      visual: { svgIds: ['n-vendor-selection'] }
    },

    // ─── 5: Renegotiation Loop ───
    {
      id: 'renegotiation-loop',
      type: 'loop',
      owner: { department: 'purchase', role: 'Purchase Executive' },
      title: 'Renegotiation Loop',
      description: 'Request revised quotes from vendors and re-evaluate.',
      from: 'quote-comparison',
      condition: 'No vendor meets all requirements',
      repeatUntil: 'Acceptable vendor found',
      maxIterations: 2,
      inputs: ['Vendor feedback', 'Revised quotes'],
      outputs: ['Updated vendor ranking'],
      events: [
        { text: 'Renegotiation initiated', type: 'warning' },
        { text: 'Revised quotes requested from 3 vendors', type: 'info' }
      ],
      visual: { svgIds: ['n-renegotiation'] }
    },

    // ─── 6: Vendor Negotiation ───
    {
      id: 'vendor-negotiation',
      type: 'process',
      owner: { department: 'purchase', role: 'Purchase Executive' },
      title: 'Vendor Negotiation',
      description: 'Negotiate pricing, delivery, payment terms with selected vendor.',
      inputs: ['Vendor quote', 'Negotiation strategy'],
      outputs: ['Negotiated terms'],
      events: [
        { text: 'Negotiation started with Vendor A', type: 'info' },
        { text: 'Price negotiation: requested 5% discount', type: 'info' },
        { text: 'Terms agreed: Net 30, 15-day delivery', type: 'success' },
        { text: 'Final price confirmed', type: 'success' }
      ],
      references: [
        { source: 'Purchase.md', label: 'Negotiation Guidelines', status: 'tbd', note: 'TBD — CLIENT VALIDATION REQUIRED' }
      ],
      visual: { svgIds: ['n-vendor-negotiation'] }
    },

    // ─── 7: Terms Agreed ───
    {
      id: 'vendor-terms-agreed',
      type: 'milestone',
      owner: { department: 'purchase', role: 'Purchase Executive' },
      title: 'Terms Agreed',
      description: 'All terms finalized with selected vendor.',
      inputs: ['Negotiated terms'],
      outputs: ['Final vendor terms'],
      events: [
        { text: 'All terms agreed with Vendor A', type: 'milestone' },
        { text: 'Final quotation confirmed', type: 'success' }
      ],
      visual: { svgIds: ['n-vendor-terms'] }
    },

    // ─── 8: PO Creation ───
    {
      id: 'po-created',
      type: 'process',
      owner: { department: 'purchase', role: 'Purchase Executive' },
      title: 'PO Creation',
      description: 'Create Purchase Order in ERP system.',
      inputs: ['Vendor terms', 'Purchase requirement'],
      outputs: ['Draft PO'],
      events: [
        { text: 'PO-2026-001 draft created', type: 'info' },
        { text: 'PO details verified against RFQ', type: 'info' },
        { text: 'PO ready for approval', type: 'success' }
      ],
      references: [
        { source: 'Finance.md', label: 'PO Requirements', status: 'confirmed' }
      ],
      visual: { svgIds: ['n-po-created'] }
    },

    // ─── 9: Finance Review ───
    {
      id: 'finance-review',
      type: 'approval',
      owner: { department: 'finance', role: 'Finance Manager' },
      title: 'Finance Review',
      description: 'Finance reviews PO for budget compliance and payment terms.',
      requester: 'purchase',
      approver: 'finance',
      condition: 'PO amount exceeds threshold',
      outcomes: [
        { id: 'approved', label: 'Approved', next: 'po-approved' },
        { id: 'revision', label: 'Revision Required', next: 'po-created' }
      ],
      selected: 'approved',
      inputs: ['Draft PO', 'Budget check'],
      outputs: ['Finance approval'],
      events: [
        { text: 'Finance reviewing PO-2026-001', type: 'info' },
        { text: 'Budget check: within allocation', type: 'info' },
        { text: 'APPROVED by Finance Manager', type: 'success' }
      ],
      references: [
        { source: 'Finance.md', label: 'Approval Thresholds', status: 'tbd', note: 'TBD — CLIENT VALIDATION REQUIRED' }
      ],
      visual: { svgIds: ['n-finance-review'] }
    },

    // ─── 10: PO Approved ───
    {
      id: 'po-approved',
      type: 'milestone',
      owner: { department: 'management', role: 'Management' },
      title: 'PO Approved',
      description: 'Purchase Order approved and ready for dispatch.',
      inputs: ['Finance-approved PO'],
      outputs: ['Approved PO'],
      events: [
        { text: 'PO-2026-001 APPROVED', type: 'milestone' },
        { text: 'PO ready for dispatch to vendor', type: 'success' }
      ],
      visual: { svgIds: ['n-po-approved'] }
    },

    // ─── 11: PO Sent to Vendor ───
    {
      id: 'po-sent-vendor',
      type: 'handoff',
      from: { department: 'purchase', role: 'Purchase Executive' },
      to: 'external',
      title: 'PO Sent to Vendor',
      description: 'Approved PO dispatched to vendor for fulfillment.',
      payload: ['Approved PO', 'Delivery schedule', 'Payment terms'],
      trigger: 'PO approved by Finance.',
      inputs: ['Approved PO'],
      outputs: ['PO dispatched to vendor'],
      events: [
        { text: 'PO-2026-001 sent to Vendor A', type: 'handoff' },
        { text: 'Vendor acknowledged receipt', type: 'success' },
        { text: 'Expected delivery: 15 days', type: 'info' }
      ],
      visual: { svgIds: ['n-po-sent'] }
    },

    // ─── 12: Procurement Complete ───
    {
      id: 'procurement-complete',
      type: 'completion',
      title: 'Procurement Process Complete',
      summary: 'Vendor selected, PO approved, and order placed. Awaiting goods receipt.',
      metrics: {
        'Requirement to PO': '7 days',
        'Vendors evaluated': '3',
        'Negotiation rounds': '1',
        'PO value': 'TBD'
      },
      events: [
        { text: 'PROCUREMENT PROCESS COMPLETE', type: 'success' },
        { text: 'Awaiting goods receipt from vendor', type: 'info' }
      ],
      visual: { svgIds: ['n-procurement-complete'] }
    }
  ],

  edges: [
    { id: 'e1',  from: 'purchase-req',       to: 'vendor-search',       type: 'normal' },
    { id: 'e2',  from: 'vendor-search',       to: 'rfq-created',         type: 'normal' },
    { id: 'e3',  from: 'rfq-created',         to: 'quote-comparison',    type: 'normal' },
    { id: 'e4',  from: 'quote-comparison',    to: 'vendor-selection',    type: 'normal' },
    { id: 'e5a', from: 'vendor-selection',    to: 'vendor-negotiation',  type: 'normal' },
    { id: 'e5b', from: 'vendor-selection',    to: 'renegotiation-loop',  type: 'exception' },
    { id: 'e6',  from: 'renegotiation-loop',  to: 'quote-comparison',    type: 'loop' },
    { id: 'e7',  from: 'vendor-negotiation',  to: 'vendor-terms-agreed', type: 'normal' },
    { id: 'e8',  from: 'vendor-terms-agreed', to: 'po-created',          type: 'normal' },
    { id: 'e9',  from: 'po-created',          to: 'finance-review',      type: 'normal' },
    { id: 'e10', from: 'finance-review',      to: 'po-approved',         type: 'normal' },
    { id: 'e11', from: 'po-approved',         to: 'po-sent-vendor',      type: 'handoff' },
    { id: 'e12', from: 'po-sent-vendor',      to: 'procurement-complete', type: 'normal' }
  ],

  start: 'purchase-req',
  completion: ['procurement-complete']
};

WorkflowEngine.register(window.WF_02_WORKFLOW);
