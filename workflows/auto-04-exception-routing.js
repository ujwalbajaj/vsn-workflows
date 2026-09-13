/* ============================================================
   VSN ERP — AUTO-04: Exception Routing Automation
   ============================================================
   How exceptions are detected and routed automatically.
   Exercises: exceptions, automation, decisions.
   ============================================================ */

window.AUTO_04_WORKFLOW = {
  id: 'auto-04',
  title: 'Exception Routing Automation',
  subtitle: 'How exceptions are detected and routed automatically',
  description: 'From exception detection through classification, routing, and resolution.',

  departments: [
    { id: 'erp',       name: 'ERP System',  color: '#6366F1' },
    { id: 'store',     name: 'Store',       color: '#14B8A6' },
    { id: 'purchase',  name: 'Purchase',    color: '#8B5CF6' },
    { id: 'management', name: 'Management', color: '#4338CA' }
  ],

  phases: [
    { id: 'detection', title: 'Detection', subtitle: 'Exception detected',   startNode: 'exception-detected', endNode: 'exception-routed' },
    { id: 'routing',   title: 'Routing',   subtitle: 'Routed to owner',      startNode: 'exception-routed',   endNode: 'exception-resolved' },
    { id: 'resolution', title: 'Resolution', subtitle: 'Issue fixed',        startNode: 'exception-resolved', endNode: 'exception-closed' }
  ],

  nodes: [
    {
      id: 'exception-detected',
      type: 'automation',
      owner: 'ERP',
      trigger: 'System event detected',
      action: 'Auto-detect and log exception',
      sla: 'Immediate',
      event: 'Exception EXC-2026-001 created',
      inputs: ['System events', 'Thresholds'],
      outputs: ['Exception record'],
      events: [
        { text: 'AUTO: Exception EXC-2026-001 detected', type: 'automation' },
        { text: 'Type: Quantity mismatch', type: 'error' },
        { text: 'Severity: Medium', type: 'warning' }
      ],
      visual: { svgIds: ['n-exception-detected'] }
    },

    {
      id: 'exception-classified',
      type: 'automation',
      owner: 'ERP',
      trigger: 'Exception created',
      action: 'Auto-classify exception type and severity',
      sla: 'Immediate',
      event: 'Exception classified',
      inputs: ['Exception record'],
      outputs: ['Classification result'],
      events: [
        { text: 'AUTO: Classifying exception...', type: 'automation' },
        { text: 'Type: Quantity Mismatch', type: 'info' },
        { text: 'Severity: Medium', type: 'info' },
        { text: 'Routing: Purchase department', type: 'info' }
      ],
      visual: { svgIds: ['n-exception-classified'] }
    },

    {
      id: 'exception-routed',
      type: 'automation',
      owner: 'ERP',
      trigger: 'Exception classified',
      action: 'Auto-route to appropriate department',
      sla: 'Immediate',
      event: 'Routed to Purchase Executive',
      inputs: ['Classification result'],
      outputs: ['Routing decision'],
      events: [
        { text: 'AUTO: Routing to Purchase dept', type: 'automation' },
        { text: 'Assignee: Purchase Executive', type: 'info' },
        { text: 'Notification sent', type: 'automation' },
        { text: 'SLA: 24 hours', type: 'info' }
      ],
      visual: { svgIds: ['n-exception-routed'] }
    },

    {
      id: 'exception-acknowledged',
      type: 'milestone',
      owner: { department: 'purchase', role: 'Purchase Executive' },
      title: 'Exception Acknowledged',
      description: 'Assigned person acknowledges exception.',
      inputs: ['Acknowledgment'],
      outputs: ['Working on exception'],
      events: [
        { text: 'Purchase Executive acknowledged', type: 'success' },
        { text: 'Working on resolution...', type: 'info' }
      ],
      visual: { svgIds: ['n-exception-acknowledged'] }
    },

    {
      id: 'exception-resolved',
      type: 'process',
      owner: { department: 'purchase', role: 'Purchase Executive' },
      title: 'Exception Resolved',
      description: 'Exception investigated and resolved.',
      inputs: ['Exception details'],
      outputs: ['Resolution record'],
      events: [
        { text: 'Root cause: Vendor packaging discrepancy', type: 'info' },
        { text: 'Resolution: Inventory adjusted', type: 'success' },
        { text: 'Vendor notified', type: 'handoff' }
      ],
      visual: { svgIds: ['n-exception-resolved'] }
    },

    {
      id: 'exception-closed',
      type: 'completion',
      title: 'Exception Closed',
      summary: 'Exception detected, routed, resolved, and closed automatically.',
      metrics: {
        'Detection to Resolution': '4 hours',
        'Routing Time': 'Immediate',
        'Resolution': 'Inventory adjusted',
        'Auto-Routed': 'Yes'
      },
      events: [
        { text: 'EXCEPTION CLOSED', type: 'success' },
        { text: 'Process restored', type: 'success' }
      ],
      visual: { svgIds: ['n-exception-closed'] }
    }
  ],

  edges: [
    { id: 'e1', from: 'exception-detected',   to: 'exception-classified', type: 'automation' },
    { id: 'e2', from: 'exception-classified',  to: 'exception-routed',     type: 'automation' },
    { id: 'e3', from: 'exception-routed',      to: 'exception-acknowledged', type: 'normal' },
    { id: 'e4', from: 'exception-acknowledged', to: 'exception-resolved',   type: 'normal' },
    { id: 'e5', from: 'exception-resolved',    to: 'exception-closed',     type: 'normal' }
  ],

  start: 'exception-detected',
  completion: ['exception-closed']
};

WorkflowEngine.register(window.AUTO_04_WORKFLOW);
