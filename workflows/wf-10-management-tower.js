/* ============================================================
   VSN ERP — WF-10: Management Control Tower
   ============================================================
   How management monitors, approves, and intervenes in operations.
   Exercises: decisions, approvals, exceptions, monitoring.
   ============================================================ */

window.WF_10_WORKFLOW = {
  id: 'wf-10',
  title: 'Management Control Tower',
  subtitle: 'How management monitors, approves, and intervenes in operations',
  description: 'From operational monitoring through exception detection, approval workflows, and strategic intervention.',

  departments: [
    { id: 'management', name: 'Management', color: '#4338CA' },
    { id: 'sales',      name: 'Sales',      color: '#3B82F6' },
    { id: 'purchase',   name: 'Purchase',   color: '#8B5CF6' },
    { id: 'finance',    name: 'Finance',    color: '#10B981' }
  ],

  phases: [
    { id: 'monitoring',  title: 'Monitoring',  subtitle: 'Real-time visibility',          startNode: 'dashboard-view',     endNode: 'exception-detected' },
    { id: 'analysis',    title: 'Analysis',    subtitle: 'Root cause identified',          startNode: 'exception-analysis', endNode: 'resolution-decided' },
    { id: 'intervention', title: 'Intervention', subtitle: 'Management action taken',       startNode: 'intervention-plan',  endNode: 'intervention-executed' },
    { id: 'closure',     title: 'Closure',     subtitle: 'Issue resolved',                 startNode: 'resolution-verified', endNode: 'control-tower-closed' }
  ],

  nodes: [
    // ─── 0: Dashboard View ───
    {
      id: 'dashboard-view',
      type: 'process',
      owner: { department: 'management', role: 'Management' },
      title: 'Dashboard View',
      description: 'Management views real-time operational dashboard.',
      inputs: ['Real-time KPIs', 'Department metrics', 'Exception alerts'],
      outputs: ['Dashboard overview'],
      events: [
        { text: 'Dashboard loaded: 12 active workflows', type: 'info' },
        { text: 'Overall health: 92% on-track', type: 'info' },
        { text: '2 pending approvals require attention', type: 'warning' }
      ],
      references: [
        { source: 'MGMT.md', label: 'KPI Definitions', status: 'tbd', note: 'TBD — CLIENT VALIDATION REQUIRED' }
      ],
      visual: { svgIds: ['n-dashboard'] }
    },

    // ─── 1: Exception Detected ───
    {
      id: 'exception-detected',
      type: 'process',
      owner: { department: 'management', role: 'Management' },
      title: 'Exception Detected',
      description: 'Dashboard flags an exception requiring management attention.',
      inputs: ['Dashboard alerts', 'Threshold breaches'],
      outputs: ['Exception alert'],
      events: [
        { text: 'EXCEPTION: PO-2026-045 delivery delayed 5 days', type: 'error' },
        { text: 'Impact: Customer order SO-2026-045 at risk', type: 'warning' },
        { text: 'Auto-notification sent to affected departments', type: 'automation' }
      ],
      visual: { svgIds: ['n-exception-detected'] }
    },

    // ─── 2: Exception Analysis ───
    {
      id: 'exception-analysis',
      type: 'process',
      owner: { department: 'management', role: 'Operations Manager' },
      title: 'Exception Analysis',
      description: 'Analyze root cause and impact of the exception.',
      inputs: ['Exception details', 'Department reports'],
      outputs: ['Analysis report'],
      events: [
        { text: 'Analyzing root cause...', type: 'info' },
        { text: 'Vendor delayed shipment due to raw material shortage', type: 'info' },
        { text: 'Impact assessment: 3 downstream orders affected', type: 'warning' }
      ],
      visual: { svgIds: ['n-exception-analysis'] }
    },

    // ─── 3: Resolution Decision ───
    {
      id: 'resolution-decided',
      type: 'decision',
      owner: { department: 'management', role: 'Operations Manager' },
      title: 'Resolution Decision',
      description: 'Decide on the appropriate resolution approach.',
      question: 'How should this exception be resolved?',
      options: [
        { id: 'expedite', label: 'Expedite current order', consequence: 'Push vendor for faster delivery', next: 'intervention-plan' },
        { id: 'alternate', label: 'Source from alternate vendor', consequence: 'Switch to backup supplier', next: 'intervention-plan' },
        { id: 'reschedule', label: 'Reschedule customer delivery', consequence: 'Inform customer of delay', next: 'intervention-plan' }
      ],
      selected: 'expedite',
      reason: 'Vendor can expedite with additional cost — preferred option.',
      inputs: ['Analysis report'],
      outputs: ['Resolution decision'],
      events: [
        { text: 'Evaluating resolution options...', type: 'info' },
        { text: 'Decision: Expedite with current vendor', type: 'decision' },
        { text: 'Additional cost: 8% premium for expedited shipping', type: 'warning' }
      ],
      visual: { svgIds: ['n-resolution-decided'] }
    },

    // ─── 4: Intervention Plan ───
    {
      id: 'intervention-plan',
      type: 'process',
      owner: { department: 'management', role: 'Operations Manager' },
      title: 'Intervention Plan',
      description: 'Create detailed intervention plan with actions and responsibilities.',
      inputs: ['Resolution decision', 'Resource availability'],
      outputs: ['Intervention plan'],
      events: [
        { text: 'Intervention plan created', type: 'info' },
        { text: 'Actions: 1) Contact vendor 2) Arrange expedited shipping', type: 'info' },
        { text: 'Timeline: 48 hours', type: 'info' }
      ],
      visual: { svgIds: ['n-intervention-plan'] }
    },

    // ─── 5: Department Notification ───
    {
      id: 'dept-notification',
      type: 'handoff',
      from: { department: 'management', role: 'Operations Manager' },
      to: { department: 'purchase', role: 'Purchase Executive' },
      title: 'Department Notification',
      description: 'Notify affected departments of intervention plan.',
      payload: ['Intervention plan', 'Updated timeline', 'Action items'],
      trigger: 'Intervention plan approved by management.',
      inputs: ['Intervention plan'],
      outputs: ['Departments notified'],
      events: [
        { text: 'Purchase department notified', type: 'handoff' },
        { text: 'Sales department notified of timeline', type: 'handoff' },
        { text: 'Finance notified of additional cost', type: 'handoff' }
      ],
      visual: { svgIds: ['n-dept-notification'] }
    },

    // ─── 6: Intervention Executed ───
    {
      id: 'intervention-executed',
      type: 'process',
      owner: { department: 'purchase', role: 'Purchase Executive' },
      title: 'Intervention Executed',
      description: 'Execute intervention actions: contact vendor, arrange expedited shipping.',
      inputs: ['Intervention plan'],
      outputs: ['Intervention actions completed'],
      events: [
        { text: 'Vendor contacted: expedited shipping confirmed', type: 'info' },
        { text: 'Expedited delivery: 48 hours', type: 'success' },
        { text: 'Additional cost approved by Finance', type: 'success' },
        { text: 'Customer updated with new ETA', type: 'handoff' }
      ],
      visual: { svgIds: ['n-intervention-executed'] }
    },

    // ─── 7: Resolution Verified ───
    {
      id: 'resolution-verified',
      type: 'verification',
      owner: { department: 'management', role: 'Operations Manager' },
      title: 'Resolution Verified',
      description: 'Verify that the intervention resolved the exception.',
      checks: [
        'Exception root cause addressed',
        'No new exceptions created',
        'Customer impact minimized',
        'Cost within acceptable range',
        'Timeline restored'
      ],
      outcomes: [
        { id: 'verified', label: 'Verified', next: 'control-tower-closed' },
        { id: 'partial', label: 'Partially resolved', next: 'exception-analysis' }
      ],
      selected: 'verified',
      inputs: ['Intervention results'],
      outputs: ['Verification result'],
      events: [
        { text: 'Verifying resolution...', type: 'info' },
        { text: 'Root cause addressed: YES', type: 'success' },
        { text: 'No new exceptions: YES', type: 'success' },
        { text: 'Customer impact: MINIMIZED', type: 'success' },
        { text: 'RESOLUTION VERIFIED', type: 'success' }
      ],
      visual: { svgIds: ['n-resolution-verified'] }
    },

    // ─── 8: Lessons Learned ───
    {
      id: 'lessons-learned',
      type: 'process',
      owner: { department: 'management', role: 'Operations Manager' },
      title: 'Lessons Learned',
      description: 'Document lessons learned and update process improvements.',
      inputs: ['Resolution report', 'Intervention outcomes'],
      outputs: ['Process improvement recommendations'],
      events: [
        { text: 'Documenting lessons learned...', type: 'info' },
        { text: 'Recommendation: Add backup vendor for critical items', type: 'info' },
        { text: 'Recommendation: Increase safety stock for high-risk items', type: 'info' }
      ],
      visual: { svgIds: ['n-lessons-learned'] }
    },

    // ─── 9: Control Tower Closed ───
    {
      id: 'control-tower-closed',
      type: 'completion',
      title: 'Control Tower Closed',
      summary: 'Exception resolved, process improved, and control tower monitoring resumed.',
      metrics: {
        'Detection to Resolution': '48 hours',
        'Intervention Type': 'Vendor expedite',
        'Additional Cost': '8% premium',
        'Customer Impact': 'Minimized',
        'Process Improvement': '3 recommendations'
      },
      events: [
        { text: 'CONTROL TOWER CASE CLOSED', type: 'success' },
        { text: 'Monitoring resumed', type: 'info' },
        { text: 'Process improvements documented', type: 'info' }
      ],
      visual: { svgIds: ['n-control-tower-closed'] }
    }
  ],

  edges: [
    { id: 'e1',  from: 'dashboard-view',       to: 'exception-detected',  type: 'normal' },
    { id: 'e2',  from: 'exception-detected',   to: 'exception-analysis',  type: 'normal' },
    { id: 'e3',  from: 'exception-analysis',   to: 'resolution-decided',  type: 'normal' },
    { id: 'e4',  from: 'resolution-decided',   to: 'intervention-plan',   type: 'normal' },
    { id: 'e5',  from: 'intervention-plan',    to: 'dept-notification',   type: 'handoff' },
    { id: 'e6',  from: 'dept-notification',    to: 'intervention-executed', type: 'normal' },
    { id: 'e7',  from: 'intervention-executed', to: 'resolution-verified', type: 'normal' },
    { id: 'e8a', from: 'resolution-verified',  to: 'control-tower-closed', type: 'normal' },
    { id: 'e8b', from: 'resolution-verified',  to: 'exception-analysis',  type: 'exception' },
    { id: 'e9',  from: 'control-tower-closed', to: 'lessons-learned',     type: 'normal' }
  ],

  start: 'dashboard-view',
  completion: ['control-tower-closed']
};

WorkflowEngine.register(window.WF_10_WORKFLOW);
