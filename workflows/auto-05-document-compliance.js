/* ============================================================
   VSN ERP — AUTO-05: Document Compliance
   ============================================================
   How documents are validated and compliant at each stage.
   Exercises: decisions, approvals, automation.
   ============================================================ */

window.AUTO_05_WORKFLOW = {
  id: 'auto-05',
  title: 'Document Compliance',
  subtitle: 'How documents are validated and compliant at each stage',
  description: 'From document creation through validation, approval, and archival.',

  departments: [
    { id: 'erp',       name: 'ERP System',  color: '#6366F1' },
    { id: 'management', name: 'Management', color: '#4338CA' }
  ],

  phases: [
    { id: 'creation',    title: 'Creation',    subtitle: 'Document created',     startNode: 'doc-created',      endNode: 'doc-validated' },
    { id: 'validation',  title: 'Validation',  subtitle: 'Rules checked',        startNode: 'compliance-check', endNode: 'doc-approved' },
    { id: 'archival',    title: 'Archival',    subtitle: 'Document archived',    startNode: 'doc-approved',     endNode: 'doc-archived' }
  ],

  nodes: [
    {
      id: 'doc-created',
      type: 'process',
      owner: { department: 'erp', role: 'ERP System' },
      title: 'Document Created',
      description: 'Document created in ERP system (PO, Invoice, GRN, etc.).',
      inputs: ['Transaction data', 'Document template'],
      outputs: ['Draft document'],
      events: [
        { text: 'Document DOC-2026-001 created', type: 'info' },
        { text: 'Type: Purchase Order', type: 'info' },
        { text: 'Auto-validation initiated', type: 'automation' }
      ],
      visual: { svgIds: ['n-doc-created'] }
    },

    {
      id: 'compliance-check',
      type: 'verification',
      owner: { department: 'erp', role: 'ERP System' },
      title: 'Compliance Check',
      description: 'Automated compliance validation against business rules.',
      checks: ['Required fields present', 'Format correct', 'Amounts valid', 'References linked'],
      outcomes: [
        { id: 'pass', label: 'Pass', next: 'doc-validated' },
        { id: 'fail', label: 'Fail', next: 'doc-rejected' }
      ],
      selected: 'pass',
      inputs: ['Draft document'],
      outputs: ['Validation result'],
      events: [
        { text: 'Running compliance rules...', type: 'info' },
        { text: 'Required fields: ALL PRESENT', type: 'success' },
        { text: 'Format check: PASSED', type: 'success' },
        { text: 'COMPLIANCE CHECK PASSED', type: 'success' }
      ],
      references: [
        { source: 'ERP.md', label: 'Compliance Rules', status: 'tbd', note: 'TBD — CLIENT VALIDATION REQUIRED' }
      ],
      visual: { svgIds: ['n-compliance-check'] }
    },

    {
      id: 'doc-rejected',
      type: 'exception',
      owner: { department: 'erp', role: 'ERP System' },
      title: 'Document Rejected',
      description: 'Document failed compliance check.',
      trigger: 'Compliance check failed',
      impact: 'Document cannot proceed',
      severity: 'medium',
      actions: ['Identify failing rules', 'Notify creator', 'Request correction'],
      resolution: 'Document corrected and resubmitted',
      resumeAt: 'doc-created',
      escalationTo: null,
      inputs: ['Failed document'],
      outputs: ['Rejection notice'],
      events: [
        { text: 'COMPLIANCE CHECK FAILED', type: 'error' },
        { text: 'Failing rule: Missing reference', type: 'warning' }
      ],
      visual: { svgIds: ['n-doc-rejected'] }
    },

    {
      id: 'doc-validated',
      type: 'milestone',
      owner: { department: 'erp', role: 'ERP System' },
      title: 'Document Validated',
      description: 'Document passed all compliance checks.',
      inputs: ['Validated document'],
      outputs: ['Valid document'],
      events: [
        { text: 'Document validated successfully', type: 'milestone' },
        { text: 'Ready for approval', type: 'info' }
      ],
      visual: { svgIds: ['n-doc-validated'] }
    },

    {
      id: 'doc-approved',
      type: 'approval',
      owner: { department: 'management', role: 'Management' },
      title: 'Document Approved',
      description: 'Management approves document for processing.',
      requester: 'erp',
      approver: 'management',
      condition: 'Document amount exceeds threshold',
      outcomes: [
        { id: 'approved', label: 'Approved', next: 'doc-archived' },
        { id: 'revision', label: 'Revision Required', next: 'doc-created' }
      ],
      selected: 'approved',
      inputs: ['Valid document'],
      outputs: ['Approved document'],
      events: [
        { text: 'Management reviewing document', type: 'info' },
        { text: 'APPROVED for processing', type: 'success' }
      ],
      references: [
        { source: 'MGMT.md', label: 'Approval Thresholds', status: 'tbd', note: 'TBD — CLIENT VALIDATION REQUIRED' }
      ],
      visual: { svgIds: ['n-doc-approved'] }
    },

    {
      id: 'doc-archived',
      type: 'completion',
      title: 'Document Archived',
      summary: 'Document validated, approved, and archived in ERP.',
      metrics: {
        'Validation Status': 'Passed',
        'Approval Status': 'Approved',
        'Archive Location': 'ERP Document Store',
        'Retention': '7 years'
      },
      events: [
        { text: 'DOCUMENT ARCHIVED', type: 'success' },
        { text: 'Document available for audit', type: 'info' }
      ],
      visual: { svgIds: ['n-doc-archived'] }
    }
  ],

  edges: [
    { id: 'e1', from: 'doc-created',      to: 'compliance-check', type: 'normal' },
    { id: 'e2a', from: 'compliance-check', to: 'doc-validated',    type: 'normal' },
    { id: 'e2b', from: 'compliance-check', to: 'doc-rejected',     type: 'exception' },
    { id: 'e3', from: 'doc-rejected',      to: 'doc-created',      type: 'loop' },
    { id: 'e4', from: 'doc-validated',     to: 'doc-approved',     type: 'normal' },
    { id: 'e5', from: 'doc-approved',      to: 'doc-archived',     type: 'normal' }
  ],

  start: 'doc-created',
  completion: ['doc-archived']
};

WorkflowEngine.register(window.AUTO_05_WORKFLOW);
