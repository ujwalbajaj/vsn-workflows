/* ============================================================
   VSN ERP — STRAT-02: Bottleneck & Waiting-Point Map
   ============================================================
   Where delays and bottlenecks occur in the current process.
   Exercises: process analysis, bottleneck identification.
   ============================================================ */

window.STRAT_02_WORKFLOW = {
  id: 'strat-02',
  title: 'Bottleneck & Waiting-Point Map',
  subtitle: 'Where delays and bottlenecks occur in the current process',
  description: 'Identifying and mapping process bottlenecks for ERP optimization.',

  departments: [
    { id: 'sales',      name: 'Sales',      color: '#3B82F6' },
    { id: 'purchase',   name: 'Purchase',   color: '#8B5CF6' },
    { id: 'store',      name: 'Store',      color: '#14B8A6' },
    { id: 'finance',    name: 'Finance',    color: '#10B981' },
    { id: 'management', name: 'Management', color: '#4338CA' }
  ],

  phases: [
    { id: 'bottlenecks', title: 'Bottlenecks', subtitle: 'Delay points identified', startNode: 'bottleneck-1', endNode: 'bottleneck-5' },
    { id: 'solution',    title: 'Solution',    subtitle: 'ERP resolves each',       startNode: 'solution-1',   endNode: 'solution-complete' }
  ],

  nodes: [
    {
      id: 'bottleneck-1',
      type: 'exception',
      owner: { department: 'sales', role: 'Sales' },
      title: 'Bottleneck: Inquiry Processing',
      description: 'Manual inquiry processing — 2 day delay.',
      trigger: 'No automation for inquiry intake',
      impact: 'Customer waits 2 days for response',
      severity: 'high',
      actions: ['ERP auto-acknowledgment', 'Auto-task creation'],
      resolution: 'Resolved by ERP portal',
      resumeAt: null,
      escalationTo: null,
      inputs: ['Customer inquiry'],
      outputs: ['Delayed response'],
      events: [
        { text: 'BOTTLENECK: 2-day inquiry processing', type: 'error' },
        { text: 'Customer frustrated by delay', type: 'warning' }
      ],
      visual: { svgIds: ['n-bottleneck-1'] }
    },

    {
      id: 'bottleneck-2',
      type: 'exception',
      owner: { department: 'purchase', role: 'Purchase' },
      title: 'Bottleneck: Vendor Selection',
      description: 'Manual vendor search — 3 day delay.',
      trigger: 'No approved vendor database',
      impact: 'PO creation delayed',
      severity: 'high',
      actions: ['ERP vendor database', 'Auto-RFQ generation'],
      resolution: 'Resolved by ERP automation',
      resumeAt: null,
      escalationTo: null,
      inputs: ['Purchase requirement'],
      outputs: ['Delayed PO'],
      events: [
        { text: 'BOTTLENECK: 3-day vendor selection', type: 'error' },
        { text: 'No approved vendor list', type: 'warning' }
      ],
      visual: { svgIds: ['n-bottleneck-2'] }
    },

    {
      id: 'bottleneck-3',
      type: 'exception',
      owner: { department: 'store', role: 'Store' },
      title: 'Bottleneck: Goods Receipt',
      description: 'Manual quality check — 1 day delay.',
      trigger: 'No standardized QC process',
      impact: 'Inventory update delayed',
      severity: 'medium',
      actions: ['ERP QC checklist', 'Auto-inventory update'],
      resolution: 'Resolved by ERP verification',
      resumeAt: null,
      escalationTo: null,
      inputs: ['Goods received'],
      outputs: ['Delayed inventory'],
      events: [
        { text: 'BOTTLENECK: 1-day QC process', type: 'warning' },
        { text: 'No standardized checklist', type: 'warning' }
      ],
      visual: { svgIds: ['n-bottleneck-3'] }
    },

    {
      id: 'bottleneck-4',
      type: 'exception',
      owner: { department: 'finance', role: 'Finance' },
      title: 'Bottleneck: Invoice Processing',
      description: 'Manual three-way match — 2 day delay.',
      trigger: 'Paper-based invoice processing',
      impact: 'Payment delayed',
      severity: 'high',
      actions: ['ERP auto-matching', 'Digital invoices'],
      resolution: 'Resolved by ERP automation',
      resumeAt: null,
      escalationTo: null,
      inputs: ['Invoice'],
      outputs: ['Delayed payment'],
      events: [
        { text: 'BOTTLENECK: 2-day invoice processing', type: 'error' },
        { text: 'Paper-based matching', type: 'warning' }
      ],
      visual: { svgIds: ['n-bottleneck-4'] }
    },

    {
      id: 'bottleneck-5',
      type: 'exception',
      owner: { department: 'management', role: 'Management' },
      title: 'Bottleneck: Visibility Gap',
      description: 'No real-time dashboard — decisions delayed.',
      trigger: 'No integrated reporting',
      impact: 'Management cannot make timely decisions',
      severity: 'high',
      actions: ['ERP real-time dashboard', 'Auto-alerts'],
      resolution: 'Resolved by ERP control tower',
      resumeAt: null,
      escalationTo: null,
      inputs: ['Scattered data'],
      outputs: ['Delayed decisions'],
      events: [
        { text: 'BOTTLENECK: No real-time visibility', type: 'error' },
        { text: 'Management relies on weekly reports', type: 'warning' }
      ],
      visual: { svgIds: ['n-bottleneck-5'] }
    },

    {
      id: 'solution-1',
      type: 'automation',
      owner: 'ERP',
      trigger: 'ERP portal deployed',
      action: 'Auto-acknowledge inquiries',
      sla: 'Immediate',
      event: 'Inquiry processed in minutes',
      inputs: ['Portal inquiry'],
      outputs: ['Instant response'],
      events: [
        { text: 'SOLUTION: Auto-acknowledgment in minutes', type: 'success' }
      ],
      visual: { svgIds: ['n-solution-1'] }
    },

    {
      id: 'solution-complete',
      type: 'completion',
      title: 'All Bottlenecks Resolved',
      summary: 'ERP eliminates all identified bottlenecks.',
      metrics: {
        'Inquiry Processing': '2 days → 5 minutes',
        'Vendor Selection': '3 days → Instant',
        'Goods Receipt': '1 day → 2 hours',
        'Invoice Processing': '2 days → 4 hours',
        'Visibility': 'Weekly → Real-time'
      },
      events: [
        { text: 'ALL BOTTLENECKS RESOLVED', type: 'success' },
        { text: 'Process time reduced by 80%', type: 'success' }
      ],
      visual: { svgIds: ['n-solution-complete'] }
    }
  ],

  edges: [
    { id: 'e1', from: 'bottleneck-1', to: 'bottleneck-2', type: 'exception' },
    { id: 'e2', from: 'bottleneck-2', to: 'bottleneck-3', type: 'exception' },
    { id: 'e3', from: 'bottleneck-3', to: 'bottleneck-4', type: 'exception' },
    { id: 'e4', from: 'bottleneck-4', to: 'bottleneck-5', type: 'exception' },
    { id: 'e5', from: 'bottleneck-5', to: 'solution-1',   type: 'normal' },
    { id: 'e6', from: 'solution-1',   to: 'solution-complete', type: 'normal' }
  ],

  start: 'bottleneck-1',
  completion: ['solution-complete']
};

WorkflowEngine.register(window.STRAT_02_WORKFLOW);
