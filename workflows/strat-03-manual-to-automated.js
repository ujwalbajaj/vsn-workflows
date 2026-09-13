/* ============================================================
   VSN ERP — STRAT-03: Manual Work → Automated Work
   ============================================================
   Which manual activities the ERP automates.
   Exercises: transformation view.
   ============================================================ */

window.STRAT_03_WORKFLOW = {
  id: 'strat-03',
  title: 'Manual Work → Automated Work',
  subtitle: 'Which manual activities the ERP automates and which remain human-driven',
  description: 'Mapping manual work to automated work for ERP transformation.',

  departments: [
    { id: 'manual',    name: 'Manual',    color: '#EF4444' },
    { id: 'automated', name: 'Automated', color: '#10B981' },
    { id: 'hybrid',    name: 'Hybrid',    color: '#F59E0B' }
  ],

  phases: [
    { id: 'current', title: 'Current', subtitle: 'Manual activities',   startNode: 'manual-1', endNode: 'manual-5' },
    { id: 'future',  title: 'Future',  subtitle: 'Automated activities', startNode: 'auto-1',  endNode: 'transformation-complete' }
  ],

  nodes: [
    {
      id: 'manual-1',
      type: 'process',
      owner: { department: 'manual', role: 'Manual Work' },
      title: 'Manual: Data Entry',
      description: 'Double data entry across departments.',
      inputs: ['Paper/email'],
      outputs: ['Manual records'],
      events: [
        { text: 'MANUAL: Data entered in 3 systems', type: 'error' },
        { text: 'Error rate: 5%', type: 'warning' }
      ],
      visual: { svgIds: ['n-manual-1'] }
    },

    {
      id: 'manual-2',
      type: 'process',
      owner: { department: 'manual', role: 'Manual Work' },
      title: 'Manual: Follow-ups',
      description: 'Email/phone follow-ups for status.',
      inputs: ['Status queries'],
      outputs: ['Manual responses'],
      events: [
        { text: 'MANUAL: 20 emails/day for status', type: 'error' },
        { text: 'Time wasted: 2 hours/day', type: 'warning' }
      ],
      visual: { svgIds: ['n-manual-2'] }
    },

    {
      id: 'manual-3',
      type: 'process',
      owner: { department: 'manual', role: 'Manual Work' },
      title: 'Manual: Approvals',
      description: 'Paper-based approval workflows.',
      inputs: ['Paper documents'],
      outputs: ['Signed approvals'],
      events: [
        { text: 'MANUAL: Approval takes 3 days', type: 'error' },
        { text: 'Documents lost: 10%', type: 'warning' }
      ],
      visual: { svgIds: ['n-manual-3'] }
    },

    {
      id: 'manual-4',
      type: 'process',
      owner: { department: 'manual', role: 'Manual Work' },
      title: 'Manual: Reporting',
      description: 'Weekly Excel reports compiled manually.',
      inputs: ['Scattered data'],
      outputs: ['Weekly report'],
      events: [
        { text: 'MANUAL: 4 hours to compile report', type: 'error' },
        { text: 'Data always outdated', type: 'warning' }
      ],
      visual: { svgIds: ['n-manual-4'] }
    },

    {
      id: 'manual-5',
      type: 'process',
      owner: { department: 'manual', role: 'Manual Work' },
      title: 'Manual: Exception Handling',
      description: 'Exceptions discovered late, resolved slowly.',
      inputs: ['Late detection'],
      outputs: ['Slow resolution'],
      events: [
        { text: 'MANUAL: Exceptions found in weekly review', type: 'error' },
        { text: 'Resolution time: 5 days', type: 'warning' }
      ],
      visual: { svgIds: ['n-manual-5'] }
    },

    {
      id: 'auto-1',
      type: 'automation',
      owner: 'ERP',
      trigger: 'Data entered once',
      action: 'Auto-populate all modules',
      sla: 'Immediate',
      event: 'Single entry, multi-system',
      inputs: ['Single entry'],
      outputs: ['All modules updated'],
      events: [
        { text: 'AUTO: Single entry updates all systems', type: 'automation' },
        { text: 'Error rate: 0.1%', type: 'success' }
      ],
      visual: { svgIds: ['n-auto-1'] }
    },

    {
      id: 'auto-2',
      type: 'automation',
      owner: 'ERP',
      trigger: 'Status change',
      action: 'Auto-notify stakeholders',
      sla: 'Immediate',
      event: 'Real-time notifications',
      inputs: ['Status change'],
      outputs: ['Auto-notifications'],
      events: [
        { text: 'AUTO: Real-time status updates', type: 'automation' },
        { text: 'Zero follow-up emails needed', type: 'success' }
      ],
      visual: { svgIds: ['n-auto-2'] }
    },

    {
      id: 'auto-3',
      type: 'automation',
      owner: 'ERP',
      trigger: 'Approval request',
      action: 'Auto-route for digital approval',
      sla: '4 hours',
      event: 'Digital approvals',
      inputs: ['Approval request'],
      outputs: ['Digital approval'],
      events: [
        { text: 'AUTO: Digital approval in 4 hours', type: 'automation' },
        { text: 'Audit trail maintained', type: 'success' }
      ],
      visual: { svgIds: ['n-auto-3'] }
    },

    {
      id: 'auto-4',
      type: 'automation',
      owner: 'ERP',
      trigger: 'Real-time data',
      action: 'Auto-generate dashboards',
      sla: 'Real-time',
      event: 'Live dashboards',
      inputs: ['All data'],
      outputs: ['Live dashboard'],
      events: [
        { text: 'AUTO: Real-time dashboards', type: 'automation' },
        { text: 'No manual compilation', type: 'success' }
      ],
      visual: { svgIds: ['n-auto-4'] }
    },

    {
      id: 'auto-5',
      type: 'automation',
      owner: 'ERP',
      trigger: 'Exception detected',
      action: 'Auto-route and escalate',
      sla: 'Immediate',
      event: 'Instant exception handling',
      inputs: ['Exception'],
      outputs: ['Auto-routed'],
      events: [
        { text: 'AUTO: Exception routed instantly', type: 'automation' },
        { text: 'Resolution time: 4 hours', type: 'success' }
      ],
      visual: { svgIds: ['n-auto-5'] }
    },

    {
      id: 'transformation-complete',
      type: 'completion',
      title: 'Transformation Complete',
      summary: 'Manual work automated, hybrid work optimized.',
      metrics: {
        'Data Entry': '3 systems → 1 entry',
        'Follow-ups': '20/day → 0',
        'Approvals': '3 days → 4 hours',
        'Reporting': '4 hours → Real-time',
        'Exceptions': '5 days → 4 hours'
      },
      events: [
        { text: 'TRANSFORMATION COMPLETE', type: 'success' },
        { text: '80% of manual work automated', type: 'success' }
      ],
      visual: { svgIds: ['n-transformation-complete'] }
    }
  ],

  edges: [
    { id: 'e1', from: 'manual-1', to: 'auto-1', type: 'normal' },
    { id: 'e2', from: 'manual-2', to: 'auto-2', type: 'normal' },
    { id: 'e3', from: 'manual-3', to: 'auto-3', type: 'normal' },
    { id: 'e4', from: 'manual-4', to: 'auto-4', type: 'normal' },
    { id: 'e5', from: 'manual-5', to: 'auto-5', type: 'normal' },
    { id: 'e6', from: 'auto-5', to: 'transformation-complete', type: 'normal' }
  ],

  start: 'manual-1',
  completion: ['transformation-complete']
};

WorkflowEngine.register(window.STRAT_03_WORKFLOW);
