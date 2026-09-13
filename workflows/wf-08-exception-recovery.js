/* ============================================================
   VSN ERP — WF-08: Exception & Recovery
   ============================================================
   How exceptions are detected, escalated, and resolved.
   Exercises: exceptions, recovery paths, escalation, decisions.
   ============================================================ */

window.WF_08_WORKFLOW = {
  id: 'wf-08',
  title: 'Exception & Recovery',
  subtitle: 'How exceptions are detected, escalated, and resolved',
  description: 'From exception detection through root cause analysis, escalation, resolution, and process recovery.',

  departments: [
    { id: 'store',      name: 'Store',      color: '#14B8A6' },
    { id: 'purchase',   name: 'Purchase',   color: '#8B5CF6' },
    { id: 'management', name: 'Management', color: '#4338CA' },
    { id: 'logistics',  name: 'Logistics',  color: '#F59E0B' }
  ],

  phases: [
    { id: 'detection',    title: 'Detection',    subtitle: 'Exception identified',     startNode: 'exception-trigger',  endNode: 'root-cause-analysis' },
    { id: 'escalation',   title: 'Escalation',   subtitle: 'Decision on resolution',  startNode: 'escalation-decision', endNode: 'escalated-to-mgmt' },
    { id: 'resolution',   title: 'Resolution',   subtitle: 'Fix implemented',         startNode: 'resolution-plan',    endNode: 'resolution-applied' },
    { id: 'recovery',     title: 'Recovery',     subtitle: 'Process restored',        startNode: 'process-recovery',   endNode: 'exception-closed' }
  ],

  nodes: [
    // ─── 0: Exception Trigger ───
    {
      id: 'exception-trigger',
      type: 'process',
      owner: { department: 'store', role: 'Store Executive' },
      title: 'Exception Trigger',
      description: 'Exception detected in goods receipt, inventory, or delivery process.',
      inputs: ['Goods received', 'Expected quantity', 'Quality check results'],
      outputs: ['Exception record'],
      events: [
        { text: 'EXCEPTION DETECTED: Quantity mismatch', type: 'error' },
        { text: 'Expected: 100 units, Received: 95 units', type: 'error' },
        { text: 'Exception logged in system', type: 'info' },
        { text: 'Immediate notification sent to Purchase', type: 'handoff' }
      ],
      references: [
        { source: 'Store.md', label: 'Exception Rules', status: 'confirmed' }
      ],
      visual: { svgIds: ['n-exception-trigger'] }
    },

    // ─── 1: Exception Classification ───
    {
      id: 'exception-classification',
      type: 'decision',
      owner: { department: 'store', role: 'Store Executive' },
      title: 'Exception Classification',
      description: 'Classify exception type and severity.',
      question: 'What type of exception is this?',
      options: [
        { id: 'quantity', label: 'Quantity Mismatch', consequence: 'Standard resolution — goods adjustment', next: 'root-cause-analysis' },
        { id: 'quality', label: 'Quality Failure', consequence: 'Quality team review required', next: 'quality-review' },
        { id: 'damage', label: 'Damage During Transit', consequence: 'Logistics escalation needed', next: 'logistics-escalation' }
      ],
      selected: 'quantity',
      reason: 'Quantity mismatch — standard resolution path.',
      inputs: ['Exception record'],
      outputs: ['Classification result'],
      events: [
        { text: 'Exception classified: Quantity Mismatch', type: 'info' },
        { text: 'Severity: Medium', type: 'warning' },
        { text: 'Resolution path: Standard', type: 'info' }
      ],
      visual: { svgIds: ['n-exception-classification'] }
    },

    // ─── 2: Quality Review ───
    {
      id: 'quality-review',
      type: 'process',
      owner: { department: 'store', role: 'Quality Inspector' },
      title: 'Quality Review',
      description: 'Quality team inspects goods and determines if items can be used.',
      inputs: ['Failed goods', 'Quality standards'],
      outputs: ['Quality decision'],
      events: [
        { text: 'Quality inspection started', type: 'info' },
        { text: 'Inspecting 5 units for defects', type: 'info' },
        { text: 'Defect rate: 2% — within acceptable range', type: 'success' },
        { text: 'Decision: Accept with adjustment', type: 'decision' }
      ],
      references: [
        { source: 'Quality.md', label: 'Acceptance Criteria', status: 'tbd', note: 'TBD — CLIENT VALIDATION REQUIRED' }
      ],
      visual: { svgIds: ['n-quality-review'] }
    },

    // ─── 3: Logistics Escalation ───
    {
      id: 'logistics-escalation',
      type: 'process',
      owner: { department: 'logistics', role: 'Logistics Manager' },
      title: 'Logistics Escalation',
      description: 'Logistics team investigates transit damage and files carrier claim.',
      inputs: ['Damage evidence', 'Carrier details'],
      outputs: ['Carrier claim', 'Damage report'],
      events: [
        { text: 'Logistics investigating transit damage', type: 'info' },
        { text: 'Photos of damaged goods documented', type: 'info' },
        { text: 'Carrier claim filed: CLM-2026-001', type: 'warning' },
        { text: 'Replacement goods requested', type: 'info' }
      ],
      visual: { svgIds: ['n-logistics-escalation'] }
    },

    // ─── 4: Root Cause Analysis ───
    {
      id: 'root-cause-analysis',
      type: 'process',
      owner: { department: 'purchase', role: 'Purchase Executive' },
      title: 'Root Cause Analysis',
      description: 'Investigate why the exception occurred.',
      inputs: ['Exception record', 'Vendor history', 'Previous exceptions'],
      outputs: ['Root cause identified'],
      events: [
        { text: 'Analyzing root cause...', type: 'info' },
        { text: 'Checking vendor history: 2 prior mismatches', type: 'info' },
        { text: 'Root cause: Vendor packaging discrepancy', type: 'success' },
        { text: 'Recommended action: Vendor notification + adjustment', type: 'info' }
      ],
      references: [
        { source: 'Purchase.md', label: 'RCA Guidelines', status: 'tbd', note: 'TBD — CLIENT VALIDATION REQUIRED' }
      ],
      visual: { svgIds: ['n-root-cause'] }
    },

    // ─── 5: Escalation Decision ───
    {
      id: 'escalation-decision',
      type: 'decision',
      owner: { department: 'management', role: 'Management' },
      title: 'Escalation Decision',
      description: 'Determine if exception needs management escalation.',
      question: 'Does this exception exceed standard resolution authority?',
      options: [
        { id: 'standard', label: 'No — standard resolution', consequence: 'Resolve at team level', next: 'resolution-plan' },
        { id: 'escalate', label: 'Yes — needs escalation', consequence: 'Escalate to management', next: 'escalated-to-mgmt' }
      ],
      selected: 'standard',
      reason: 'Quantity mismatch within standard authority.',
      inputs: ['Root cause analysis', 'Exception severity'],
      outputs: ['Escalation decision'],
      events: [
        { text: 'Evaluating escalation need...', type: 'info' },
        { text: 'Decision: Standard resolution sufficient', type: 'decision' }
      ],
      references: [
        { source: 'MGMT.md', label: 'Escalation Thresholds', status: 'tbd', note: 'TBD — CLIENT VALIDATION REQUIRED' }
      ],
      visual: { svgIds: ['n-escalation-decision'] }
    },

    // ─── 6: Escalated to Management ───
    {
      id: 'escalated-to-mgmt',
      type: 'handoff',
      from: { department: 'purchase', role: 'Purchase Executive' },
      to: { department: 'management', role: 'Management' },
      title: 'Escalated to Management',
      description: 'Exception escalated for management review and decision.',
      payload: ['Exception details', 'Root cause analysis', 'Recommended resolution', 'Impact assessment'],
      trigger: 'Exception exceeds standard resolution authority.',
      inputs: ['Escalation request'],
      outputs: ['Management review'],
      events: [
        { text: 'Exception escalated to Management', type: 'handoff' },
        { text: 'Management reviewing exception', type: 'info' },
        { text: 'Management decision required', type: 'warning' }
      ],
      visual: { svgIds: ['n-escalated'] }
    },

    // ─── 7: Management Decision ───
    {
      id: 'management-decision',
      type: 'decision',
      owner: { department: 'management', role: 'Management' },
      title: 'Management Decision',
      description: 'Management decides on resolution approach.',
      question: 'How should this exception be resolved?',
      options: [
        { id: 'adjust', label: 'Accept with adjustment', consequence: 'Adjust inventory records', next: 'resolution-plan' },
        { id: 'reject', label: 'Reject goods', consequence: 'Return to vendor', next: 'return-to-vendor' },
        { id: 'penalize', label: 'Penalize vendor', consequence: 'Apply penalty clause', next: 'resolution-plan' }
      ],
      selected: 'adjust',
      reason: 'Defect rate within acceptable range — accept with adjustment.',
      inputs: ['Escalation package'],
      outputs: ['Management decision'],
      events: [
        { text: 'Management reviewing exception', type: 'info' },
        { text: 'Decision: Accept with inventory adjustment', type: 'decision' },
        { text: 'Penalty clause considered but not applied', type: 'info' }
      ],
      visual: { svgIds: ['n-mgmt-decision'] }
    },

    // ─── 8: Return to Vendor ───
    {
      id: 'return-to-vendor',
      type: 'exception',
      owner: { department: 'logistics', role: 'Logistics Coordinator' },
      title: 'Return to Vendor',
      description: 'Goods returned to vendor for replacement or credit.',
      trigger: 'Management decided to reject goods',
      impact: 'Goods returned, replacement or credit requested',
      severity: 'high',
      actions: [
        'Prepare return documentation',
        'Arrange carrier pickup',
        'Issue credit note request',
        'Update inventory records'
      ],
      resolution: 'Goods returned, awaiting replacement/credit',
      resumeAt: 'goods-receipt-check',
      escalationTo: 'management',
      inputs: ['Rejected goods', 'Return authorization'],
      outputs: ['Return initiated'],
      events: [
        { text: 'Return to vendor initiated', type: 'warning' },
        { text: 'Return authorization RA-2026-001 issued', type: 'info' },
        { text: 'Carrier pickup scheduled', type: 'info' }
      ],
      visual: { svgIds: ['n-return-vendor'] }
    },

    // ─── 9: Resolution Plan ───
    {
      id: 'resolution-plan',
      type: 'process',
      owner: { department: 'purchase', role: 'Purchase Executive' },
      title: 'Resolution Plan',
      description: 'Create detailed resolution plan with actions and timeline.',
      inputs: ['Root cause', 'Escalation decision'],
      outputs: ['Resolution plan'],
      events: [
        { text: 'Resolution plan created', type: 'info' },
        { text: 'Actions: 1) Adjust inventory 2) Notify vendor 3) Update records', type: 'info' },
        { text: 'Timeline: Complete within 24 hours', type: 'info' }
      ],
      visual: { svgIds: ['n-resolution-plan'] }
    },

    // ─── 10: Resolution Applied ───
    {
      id: 'resolution-applied',
      type: 'process',
      owner: { department: 'store', role: 'Store Executive' },
      title: 'Resolution Applied',
      description: 'Execute resolution actions: adjust inventory, notify vendor, update records.',
      inputs: ['Resolution plan'],
      outputs: ['Resolution executed'],
      events: [
        { text: 'Executing resolution plan...', type: 'info' },
        { text: 'Inventory adjusted: -5 units', type: 'success' },
        { text: 'Vendor notified of discrepancy', type: 'handoff' },
        { text: 'ERP records updated', type: 'success' }
      ],
      visual: { svgIds: ['n-resolution-applied'] }
    },

    // ─── 11: Process Recovery ───
    {
      id: 'process-recovery',
      type: 'process',
      owner: { department: 'purchase', role: 'Purchase Executive' },
      title: 'Process Recovery',
      description: 'Restore normal process flow after exception resolution.',
      inputs: ['Resolution executed'],
      outputs: ['Process restored'],
      events: [
        { text: 'Process recovery initiated', type: 'info' },
        { text: 'Normal workflow restored', type: 'success' },
        { text: 'All parties notified of resolution', type: 'info' }
      ],
      visual: { svgIds: ['n-process-recovery'] }
    },

    // ─── 12: Exception Closed ───
    {
      id: 'exception-closed',
      type: 'completion',
      title: 'Exception Closed',
      summary: 'Exception resolved, process recovered, and lessons learned documented.',
      metrics: {
        'Detection to Resolution': '2 days',
        'Escalation Required': 'No',
        'Vendor Notification': 'Yes',
        'Inventory Impact': '-5 units adjusted',
        'Process Recovery': 'Complete'
      },
      events: [
        { text: 'EXCEPTION CLOSED', type: 'success' },
        { text: 'Lessons learned documented', type: 'info' },
        { text: 'Vendor performance score updated', type: 'info' }
      ],
      visual: { svgIds: ['n-exception-closed'] }
    }
  ],

  edges: [
    { id: 'e1',  from: 'exception-trigger',       to: 'exception-classification', type: 'normal' },
    { id: 'e2a', from: 'exception-classification', to: 'root-cause-analysis',     type: 'normal' },
    { id: 'e2b', from: 'exception-classification', to: 'quality-review',          type: 'normal' },
    { id: 'e2c', from: 'exception-classification', to: 'logistics-escalation',    type: 'exception' },
    { id: 'e3a', from: 'quality-review',           to: 'root-cause-analysis',     type: 'normal' },
    { id: 'e3b', from: 'logistics-escalation',     to: 'root-cause-analysis',     type: 'normal' },
    { id: 'e4',  from: 'root-cause-analysis',      to: 'escalation-decision',     type: 'normal' },
    { id: 'e5a', from: 'escalation-decision',      to: 'resolution-plan',         type: 'normal' },
    { id: 'e5b', from: 'escalation-decision',      to: 'escalated-to-mgmt',       type: 'handoff' },
    { id: 'e6',  from: 'escalated-to-mgmt',        to: 'management-decision',     type: 'normal' },
    { id: 'e7a', from: 'management-decision',      to: 'resolution-plan',         type: 'normal' },
    { id: 'e7b', from: 'management-decision',      to: 'return-to-vendor',        type: 'exception' },
    { id: 'e8',  from: 'return-to-vendor',         to: 'process-recovery',        type: 'exception' },
    { id: 'e9',  from: 'resolution-plan',          to: 'resolution-applied',      type: 'normal' },
    { id: 'e10', from: 'resolution-applied',       to: 'process-recovery',        type: 'normal' },
    { id: 'e11', from: 'process-recovery',         to: 'exception-closed',        type: 'normal' }
  ],

  start: 'exception-trigger',
  completion: ['exception-closed']
};

WorkflowEngine.register(window.WF_08_WORKFLOW);
