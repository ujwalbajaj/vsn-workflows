/* ============================================================
   VSN ERP — AUTO-02: SLA & Escalation Automation
   ============================================================
   How the ERP monitors SLAs and triggers escalations.
   Exercises: exceptions, automation, decisions.
   ============================================================ */

window.AUTO_02_WORKFLOW = {
  id: 'auto-02',
  title: 'SLA & Escalation Automation',
  subtitle: 'How the ERP monitors SLAs and triggers escalations',
  description: 'From SLA monitoring through breach detection, escalation, and resolution.',

  departments: [
    { id: 'erp',       name: 'ERP System',  color: '#6366F1' },
    { id: 'management', name: 'Management', color: '#4338CA' }
  ],

  phases: [
    { id: 'monitoring', title: 'Monitoring', subtitle: 'SLA tracked',         startNode: 'sla-monitoring',   endNode: 'sla-breach-detected' },
    { id: 'escalation', title: 'Escalation', subtitle: 'Escalation triggered', startNode: 'escalation-triggered', endNode: 'escalation-resolved' },
    { id: 'resolution', title: 'Resolution', subtitle: 'SLA restored',        startNode: 'resolution-plan',  endNode: 'sla-restored' }
  ],

  nodes: [
    {
      id: 'sla-monitoring',
      type: 'automation',
      owner: 'ERP',
      trigger: 'Continuous monitoring',
      action: 'Track SLA compliance for all active tasks',
      sla: 'Real-time',
      event: 'SLA monitoring active',
      inputs: ['Active tasks', 'SLA definitions'],
      outputs: ['SLA status'],
      events: [
        { text: 'SLA monitoring active: 12 tasks', type: 'automation' },
        { text: 'Checking deadlines...', type: 'info' }
      ],
      visual: { svgIds: ['n-sla-monitoring'] }
    },

    {
      id: 'sla-breach-detected',
      type: 'exception',
      owner: { department: 'erp', role: 'ERP System' },
      title: 'SLA Breach Detected',
      description: 'Task approaching or exceeding SLA deadline.',
      trigger: 'Task deadline within 24 hours or exceeded',
      impact: 'Customer satisfaction at risk',
      severity: 'high',
      actions: ['Log breach', 'Calculate breach severity', 'Prepare escalation'],
      resolution: 'Escalation initiated',
      resumeAt: null,
      escalationTo: 'management',
      inputs: ['SLA status'],
      outputs: ['Breach alert'],
      events: [
        { text: 'SLA BREACH DETECTED', type: 'error' },
        { text: 'Task T-2026-003: 4 hours remaining', type: 'warning' },
        { text: 'Severity: HIGH', type: 'error' }
      ],
      visual: { svgIds: ['n-sla-breach'] }
    },

    {
      id: 'escalation-triggered',
      type: 'automation',
      owner: 'ERP',
      trigger: 'SLA breach detected',
      action: 'Auto-escalate to management',
      sla: 'Immediate',
      event: 'Escalation ESC-2026-001 created',
      inputs: ['Breach alert'],
      outputs: ['Escalation record'],
      events: [
        { text: 'AUTO: Escalation ESC-2026-001 created', type: 'automation' },
        { text: 'Notification sent to Management', type: 'automation' },
        { text: 'SLA clock paused', type: 'info' }
      ],
      visual: { svgIds: ['n-escalation-triggered'] }
    },

    {
      id: 'resolution-plan',
      type: 'process',
      owner: { department: 'management', role: 'Management' },
      title: 'Resolution Plan',
      description: 'Management creates plan to resolve SLA breach.',
      inputs: ['Escalation details', 'Task status'],
      outputs: ['Resolution plan'],
      events: [
        { text: 'Management reviewing escalation', type: 'info' },
        { text: 'Resolution plan created', type: 'info' },
        { text: 'Actions: Reassign + expedite', type: 'info' }
      ],
      visual: { svgIds: ['n-resolution-plan'] }
    },

    {
      id: 'sla-restored',
      type: 'completion',
      title: 'SLA Restored',
      summary: 'SLA breach resolved, task back on track.',
      metrics: {
        'Breach Duration': '2 hours',
        'Escalation Level': 'Management',
        'Resolution': 'Reassigned + expedited',
        'SLA Status': 'Restored'
      },
      events: [
        { text: 'SLA RESTORED', type: 'success' },
        { text: 'Task back on track', type: 'success' }
      ],
      visual: { svgIds: ['n-sla-restored'] }
    }
  ],

  edges: [
    { id: 'e1', from: 'sla-monitoring',       to: 'sla-breach-detected',   type: 'normal' },
    { id: 'e2', from: 'sla-breach-detected',  to: 'escalation-triggered',  type: 'automation' },
    { id: 'e3', from: 'escalation-triggered',  to: 'resolution-plan',       type: 'normal' },
    { id: 'e4', from: 'resolution-plan',       to: 'sla-restored',          type: 'normal' }
  ],

  start: 'sla-monitoring',
  completion: ['sla-restored']
};

WorkflowEngine.register(window.AUTO_02_WORKFLOW);
