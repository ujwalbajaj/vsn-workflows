/* ============================================================
   VSN ERP — AUTO-01: Task & Handoff Automation
   ============================================================
   How tasks are automatically created and handed off.
   Exercises: automation nodes, handoffs.
   ============================================================ */

window.AUTO_01_WORKFLOW = {
  id: 'auto-01',
  title: 'Task & Handoff Automation',
  subtitle: 'How tasks are automatically created and handed off',
  description: 'From trigger event through task creation, assignment, processing, and handoff.',

  departments: [
    { id: 'erp',       name: 'ERP System', color: '#6366F1' },
    { id: 'sales',     name: 'Sales',      color: '#3B82F6' },
    { id: 'purchase',  name: 'Purchase',   color: '#8B5CF6' }
  ],

  phases: [
    { id: 'trigger',   title: 'Trigger',   subtitle: 'Event detected',      startNode: 'trigger-event',   endNode: 'task-created' },
    { id: 'assignment', title: 'Assignment', subtitle: 'Task assigned',     startNode: 'task-assigned',    endNode: 'task-processing' },
    { id: 'handoff',   title: 'Handoff',   subtitle: 'Work transferred',   startNode: 'handoff-initiated', endNode: 'handoff-complete' }
  ],

  nodes: [
    {
      id: 'trigger-event',
      type: 'automation',
      owner: 'ERP',
      trigger: 'Business event detected',
      action: 'Identify need for new task',
      sla: 'Immediate',
      event: 'Trigger event captured',
      inputs: ['Business event'],
      outputs: ['Task trigger'],
      events: [
        { text: 'Trigger event detected: Sales order confirmed', type: 'automation' },
        { text: 'Task creation required', type: 'info' }
      ],
      visual: { svgIds: ['n-trigger-event'] }
    },

    {
      id: 'task-created',
      type: 'automation',
      owner: 'ERP',
      trigger: 'Task trigger received',
      action: 'Auto-create task with details',
      sla: 'Immediate',
      event: 'Task T-2026-001 created',
      inputs: ['Task trigger', 'Transaction data'],
      outputs: ['Created task'],
      events: [
        { text: 'AUTO: Task T-2026-001 created', type: 'automation' },
        { text: 'Priority: Normal', type: 'info' },
        { text: 'Due: 5 business days', type: 'info' }
      ],
      visual: { svgIds: ['n-task-created'] }
    },

    {
      id: 'task-assigned',
      type: 'automation',
      owner: 'ERP',
      trigger: 'Task created',
      action: 'Auto-assign to appropriate department',
      sla: 'Immediate',
      event: 'Task assigned to Purchase',
      inputs: ['Created task', 'Assignment rules'],
      outputs: ['Assigned task'],
      events: [
        { text: 'AUTO: Task assigned to Purchase dept', type: 'automation' },
        { text: 'Assignee: Purchase Executive', type: 'info' },
        { text: 'Notification sent', type: 'automation' }
      ],
      visual: { svgIds: ['n-task-assigned'] }
    },

    {
      id: 'task-processing',
      type: 'process',
      owner: { department: 'purchase', role: 'Purchase Executive' },
      title: 'Task Processing',
      description: 'Assigned person processes the task.',
      inputs: ['Assigned task'],
      outputs: ['Processed task'],
      events: [
        { text: 'Task processing started', type: 'info' },
        { text: 'Processing vendor sourcing', type: 'info' },
        { text: 'Task processing complete', type: 'success' }
      ],
      visual: { svgIds: ['n-task-processing'] }
    },

    {
      id: 'handoff-initiated',
      type: 'automation',
      owner: 'ERP',
      trigger: 'Task processing complete',
      action: 'Auto-initiate handoff to next department',
      sla: 'Immediate',
      event: 'Handoff to Store initiated',
      inputs: ['Processed task'],
      outputs: ['Handoff initiated'],
      events: [
        { text: 'AUTO: Handoff initiated to Store', type: 'automation' },
        { text: 'Payload: Task details + results', type: 'info' },
        { text: 'Awaiting Store acknowledgment...', type: 'info' }
      ],
      visual: { svgIds: ['n-handoff-initiated'] }
    },

    {
      id: 'handoff-complete',
      type: 'milestone',
      owner: { department: 'store', role: 'Store Executive' },
      title: 'Handoff Complete',
      description: 'Next department acknowledges and begins processing.',
      inputs: ['Acknowledgment'],
      outputs: ['Handoff complete'],
      events: [
        { text: 'Store acknowledged receipt', type: 'success' },
        { text: 'Task processing continues', type: 'info' }
      ],
      visual: { svgIds: ['n-handoff-complete'] }
    }
  ],

  edges: [
    { id: 'e1', from: 'trigger-event',    to: 'task-created',      type: 'automation' },
    { id: 'e2', from: 'task-created',      to: 'task-assigned',     type: 'automation' },
    { id: 'e3', from: 'task-assigned',     to: 'task-processing',   type: 'normal' },
    { id: 'e4', from: 'task-processing',   to: 'handoff-initiated', type: 'automation' },
    { id: 'e5', from: 'handoff-initiated', to: 'handoff-complete',  type: 'handoff' }
  ],

  start: 'trigger-event',
  completion: ['handoff-complete']
};

WorkflowEngine.register(window.AUTO_01_WORKFLOW);
