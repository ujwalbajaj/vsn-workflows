/* ============================================================
   VSN ERP — WF-04: PO → Finance
   ============================================================
   How purchase orders are processed through finance.
   Exercises: decisions, approvals, automation, parallel branches.
   ============================================================ */

window.WF_04_WORKFLOW = {
  id: 'wf-04',
  title: 'PO → Finance',
  subtitle: 'How purchase orders are processed through finance',
  description: 'From PO receipt through budget check, approval, payment processing, and reconciliation.',

  departments: [
    { id: 'purchase', name: 'Purchase', color: '#8B5CF6' },
    { id: 'finance',  name: 'Finance',  color: '#10B981' },
    { id: 'management', name: 'Management', color: '#4338CA' }
  ],

  phases: [
    { id: 'receipt',   title: 'Receipt',   subtitle: 'PO received by Finance',    startNode: 'po-received',      endNode: 'budget-check' },
    { id: 'approval',  title: 'Approval',  subtitle: 'PO approved',               startNode: 'approval-decision', endNode: 'po-approved' },
    { id: 'payment',   title: 'Payment',   subtitle: 'Payment processed',         startNode: 'payment-processing', endNode: 'payment-complete' },
    { id: 'reconciliation', title: 'Reconciliation', subtitle: 'Accounts reconciled', startNode: 'three-way-match', endNode: 'reconciled' }
  ],

  nodes: [
    {
      id: 'po-received',
      type: 'process',
      owner: { department: 'finance', role: 'Accounts Payable' },
      title: 'PO Received by Finance',
      description: 'Purchase order received from Purchase department for processing.',
      inputs: ['Approved PO', 'Vendor details', 'Budget allocation'],
      outputs: ['PO in finance queue'],
      events: [
        { text: 'PO-2026-001 received by Finance', type: 'info' },
        { text: 'PO value: $25,000', type: 'info' },
        { text: 'Budget allocation verified', type: 'success' }
      ],
      visual: { svgIds: ['n-po-received'] }
    },

    {
      id: 'budget-check',
      type: 'decision',
      owner: { department: 'finance', role: 'Finance Manager' },
      title: 'Budget Check',
      description: 'Verify PO amount is within budget allocation.',
      question: 'Is PO within budget allocation?',
      options: [
        { id: 'within', label: 'Yes — within budget', consequence: 'Proceed to approval', next: 'approval-decision' },
        { id: 'exceeds', label: 'No — exceeds budget', consequence: 'Requires management approval', next: 'mgmt-approval' }
      ],
      selected: 'within',
      reason: 'PO amount $25,000 within $30,000 allocation.',
      inputs: ['PO details', 'Budget data'],
      outputs: ['Budget decision'],
      events: [
        { text: 'Checking budget allocation...', type: 'info' },
        { text: 'Budget: $30,000, PO: $25,000', type: 'info' },
        { text: 'Decision: Within budget — proceed', type: 'decision' }
      ],
      visual: { svgIds: ['n-budget-check'] }
    },

    {
      id: 'mgmt-approval',
      type: 'approval',
      owner: { department: 'management', role: 'Management' },
      title: 'Management Approval',
      description: 'Management approves PO that exceeds budget allocation.',
      requester: 'finance',
      approver: 'management',
      condition: 'PO amount exceeds budget allocation',
      outcomes: [
        { id: 'approved', label: 'Approved', next: 'approval-decision' },
        { id: 'rejected', label: 'Rejected', next: 'po-received' }
      ],
      selected: 'approved',
      inputs: ['Over-budget PO'],
      outputs: ['Management decision'],
      events: [
        { text: 'Management reviewing over-budget PO', type: 'info' },
        { text: 'APPROVED: Exception authorized', type: 'success' }
      ],
      references: [
        { source: 'Finance.md', label: 'Budget Exceptions', status: 'tbd', note: 'TBD — CLIENT VALIDATION REQUIRED' }
      ],
      visual: { svgIds: ['n-mgmt-approval'] }
    },

    {
      id: 'approval-decision',
      type: 'decision',
      owner: { department: 'finance', role: 'Finance Manager' },
      title: 'Approval Decision',
      description: 'Finance manager reviews and approves PO.',
      question: 'Approve PO for payment?',
      options: [
        { id: 'approve', label: 'Approve', consequence: 'Proceed to payment', next: 'payment-processing' },
        { id: 'hold', label: 'Hold', consequence: 'Pending further review', next: 'po-received' }
      ],
      selected: 'approve',
      reason: 'All checks passed, PO approved.',
      inputs: ['PO + budget check'],
      outputs: ['Approval decision'],
      events: [
        { text: 'Finance manager reviewing PO', type: 'info' },
        { text: 'APPROVED for payment processing', type: 'success' }
      ],
      visual: { svgIds: ['n-approval-decision'] }
    },

    {
      id: 'payment-processing',
      type: 'process',
      owner: { department: 'finance', role: 'Accounts Payable' },
      title: 'Payment Processing',
      description: 'Process payment to vendor per PO terms.',
      inputs: ['Approved PO', 'Payment terms'],
      outputs: ['Payment initiated'],
      events: [
        { text: 'Payment processing started', type: 'info' },
        { text: 'Payment method: Bank transfer', type: 'info' },
        { text: 'Payment of $25,000 initiated', type: 'success' }
      ],
      visual: { svgIds: ['n-payment-processing'] }
    },

    {
      id: 'payment-complete',
      type: 'milestone',
      owner: { department: 'finance', role: 'Accounts Payable' },
      title: 'Payment Complete',
      description: 'Payment successfully processed to vendor.',
      inputs: ['Payment confirmation'],
      outputs: ['Payment record'],
      events: [
        { text: 'Payment of $25,000 completed', type: 'milestone' },
        { text: 'Payment reference: PAY-2026-001', type: 'info' }
      ],
      visual: { svgIds: ['n-payment-complete'] }
    },

    {
      id: 'three-way-match',
      type: 'verification',
      owner: { department: 'finance', role: 'Accounts Payable' },
      title: 'Three-Way Match',
      description: 'Match PO, GRN, and Invoice for reconciliation.',
      checks: ['PO matches Invoice', 'GRN matches Invoice', 'Quantities match', 'Amounts match'],
      outcomes: [
        { id: 'match', label: 'Match', next: 'reconciled' },
        { id: 'mismatch', label: 'Mismatch', next: 'exception-handling' }
      ],
      selected: 'match',
      inputs: ['PO', 'GRN', 'Invoice'],
      outputs: ['Match result'],
      events: [
        { text: 'Three-way match initiated', type: 'info' },
        { text: 'PO vs Invoice: MATCHED', type: 'success' },
        { text: 'GRN vs Invoice: MATCHED', type: 'success' },
        { text: 'Three-way match PASSED', type: 'success' }
      ],
      visual: { svgIds: ['n-three-way-match'] }
    },

    {
      id: 'exception-handling',
      type: 'exception',
      owner: { department: 'finance', role: 'Finance Manager' },
      title: 'Exception Handling',
      description: 'Handle mismatch between PO, GRN, and Invoice.',
      trigger: 'Three-way match failed',
      impact: 'Payment hold until resolved',
      severity: 'medium',
      actions: ['Investigate discrepancy', 'Contact vendor', 'Resolve difference'],
      resolution: 'Discrepancy resolved, payment released',
      resumeAt: 'three-way-match',
      escalationTo: 'management',
      inputs: ['Mismatch details'],
      outputs: ['Exception resolved'],
      events: [
        { text: 'EXCEPTION: Three-way match failed', type: 'error' },
        { text: 'Investigating discrepancy...', type: 'warning' }
      ],
      visual: { svgIds: ['n-exception-handling'] }
    },

    {
      id: 'reconciled',
      type: 'completion',
      title: 'PO Reconciled',
      summary: 'PO processed, payment made, and accounts reconciled.',
      metrics: {
        'PO to Payment': '3 days',
        'Three-Way Match': 'Passed',
        'Payment Status': 'Complete',
        'Reconciliation': 'Done'
      },
      events: [
        { text: 'PO RECONCILED', type: 'success' },
        { text: 'All accounts balanced', type: 'success' }
      ],
      visual: { svgIds: ['n-reconciled'] }
    }
  ],

  edges: [
    { id: 'e1',  from: 'po-received',         to: 'budget-check',         type: 'normal' },
    { id: 'e2a', from: 'budget-check',         to: 'approval-decision',    type: 'normal' },
    { id: 'e2b', from: 'budget-check',         to: 'mgmt-approval',        type: 'exception' },
    { id: 'e3',  from: 'mgmt-approval',        to: 'approval-decision',    type: 'normal' },
    { id: 'e4',  from: 'approval-decision',    to: 'payment-processing',   type: 'normal' },
    { id: 'e5',  from: 'payment-processing',   to: 'payment-complete',     type: 'normal' },
    { id: 'e6',  from: 'payment-complete',     to: 'three-way-match',      type: 'normal' },
    { id: 'e7a', from: 'three-way-match',      to: 'reconciled',           type: 'normal' },
    { id: 'e7b', from: 'three-way-match',      to: 'exception-handling',   type: 'exception' },
    { id: 'e8',  from: 'exception-handling',   to: 'three-way-match',      type: 'loop' }
  ],

  start: 'po-received',
  completion: ['reconciled']
};

WorkflowEngine.register(window.WF_04_WORKFLOW);
