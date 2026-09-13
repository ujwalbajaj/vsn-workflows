/* ============================================================
   VSN ERP — STRAT-01: Current Process → ERP-Connected Process
   ============================================================
   How the ERP transforms the current manual process.
   Exercises: before/after comparison, transformation view.
   ============================================================ */

window.STRAT_01_WORKFLOW = {
  id: 'strat-01',
  title: 'Current Process → ERP-Connected Process',
  subtitle: 'How the ERP transforms the current manual process',
  description: 'Before/after comparison showing how ERP connects fragmented processes.',

  departments: [
    { id: 'current',   name: 'Current State',  color: '#EF4444' },
    { id: 'future',    name: 'ERP-Connected',  color: '#10B981' }
  ],

  phases: [
    { id: 'before', title: 'Before', subtitle: 'Current fragmented process', startNode: 'current-start',   endNode: 'current-end' },
    { id: 'after',  title: 'After',  subtitle: 'ERP-connected flow',         startNode: 'future-start',     endNode: 'future-end' }
  ],

  nodes: [
    // ─── Current State (Before) ───
    {
      id: 'current-start',
      type: 'process',
      owner: { department: 'current', role: 'Current State' },
      title: 'Current: Customer Inquiry',
      description: 'Customer inquiry received via email/phone. No central tracking.',
      inputs: ['Email/phone inquiry'],
      outputs: ['Manual record'],
      events: [
        { text: 'CURRENT: Customer inquiry via email', type: 'error' },
        { text: 'No central tracking — Excel spreadsheet', type: 'warning' },
        { text: 'Risk: Inquiry could be lost', type: 'error' }
      ],
      visual: { svgIds: ['n-current-inquiry'] }
    },

    {
      id: 'current-silo-1',
      type: 'process',
      owner: { department: 'current', role: 'Sales (Silo)' },
      title: 'Current: Sales Process',
      description: 'Sales works in isolation. No visibility for other departments.',
      inputs: ['Manual record'],
      outputs: ['Quotation'],
      events: [
        { text: 'CURRENT: Sales creates quotation', type: 'error' },
        { text: 'No visibility for Purchase/Store', type: 'warning' },
        { text: 'Manual data entry — errors possible', type: 'error' }
      ],
      visual: { svgIds: ['n-current-sales'] }
    },

    {
      id: 'current-silo-2',
      type: 'process',
      owner: { department: 'current', role: 'Purchase (Silo)' },
      title: 'Current: Purchase Process',
      description: 'Purchase receives order via email. No link to sales order.',
      inputs: ['Email from Sales'],
      outputs: ['PO created'],
      events: [
        { text: 'CURRENT: Purchase creates PO from email', type: 'error' },
        { text: 'No link to original customer requirement', type: 'warning' },
        { text: 'Manual follow-up required', type: 'error' }
      ],
      visual: { svgIds: ['n-current-purchase'] }
    },

    {
      id: 'current-end',
      type: 'process',
      owner: { department: 'current', role: 'Current State' },
      title: 'Current: Delivery',
      description: 'Delivery tracked manually. Customer calls for updates.',
      inputs: ['Manual tracking'],
      outputs: ['Delivery'],
      events: [
        { text: 'CURRENT: Manual delivery tracking', type: 'error' },
        { text: 'Customer calls for updates', type: 'warning' },
        { text: 'No proactive communication', type: 'error' }
      ],
      visual: { svgIds: ['n-current-delivery'] }
    },

    // ─── Future State (After) ───
    {
      id: 'future-start',
      type: 'process',
      owner: { department: 'future', role: 'ERP-Connected' },
      title: 'ERP: Customer Inquiry',
      description: 'Customer inquiry logged in ERP. Auto-acknowledgment sent.',
      inputs: ['Portal/email inquiry'],
      outputs: ['ERP record'],
      events: [
        { text: 'ERP: Customer inquiry logged centrally', type: 'success' },
        { text: 'Auto-acknowledgment sent', type: 'automation' },
        { text: 'All departments can see inquiry', type: 'success' }
      ],
      visual: { svgIds: ['n-future-inquiry'] }
    },

    {
      id: 'future-connected-1',
      type: 'automation',
      owner: 'ERP',
      trigger: 'Inquiry logged',
      action: 'Auto-create tasks for Sales, Purchase, Store',
      sla: 'Immediate',
      event: 'Tasks auto-created',
      inputs: ['ERP record'],
      outputs: ['Tasks created'],
      events: [
        { text: 'ERP: Auto-create tasks for all departments', type: 'automation' },
        { text: 'Sales: Quotation task', type: 'info' },
        { text: 'Purchase: Sourcing task', type: 'info' }
      ],
      visual: { svgIds: ['n-future-auto'] }
    },

    {
      id: 'future-connected-2',
      type: 'process',
      owner: { department: 'future', role: 'ERP-Connected' },
      title: 'ERP: Connected Flow',
      description: 'All departments work on same transaction. Real-time visibility.',
      inputs: ['Connected tasks'],
      outputs: ['Real-time updates'],
      events: [
        { text: 'ERP: All departments connected', type: 'success' },
        { text: 'Real-time visibility for everyone', type: 'success' },
        { text: 'Automatic handoffs between departments', type: 'automation' }
      ],
      visual: { svgIds: ['n-future-connected'] }
    },

    {
      id: 'future-end',
      type: 'completion',
      title: 'ERP: End-to-End Visibility',
      summary: 'Complete visibility from customer inquiry to delivery.',
      metrics: {
        'Process Time': 'Reduced by 40%',
        'Visibility': '100% real-time',
        'Errors': 'Reduced by 80%',
        'Customer Satisfaction': 'Improved'
      },
      events: [
        { text: 'ERP: END-TO-END VISIBILITY ACHIEVED', type: 'success' },
        { text: 'All processes connected', type: 'success' },
        { text: 'Customer can track status online', type: 'success' }
      ],
      visual: { svgIds: ['n-future-end'] }
    }
  ],

  edges: [
    { id: 'e1', from: 'current-start',      to: 'current-silo-1',     type: 'normal' },
    { id: 'e2', from: 'current-silo-1',      to: 'current-silo-2',     type: 'normal' },
    { id: 'e3', from: 'current-silo-2',      to: 'current-end',        type: 'normal' },
    { id: 'e4', from: 'future-start',        to: 'future-connected-1', type: 'automation' },
    { id: 'e5', from: 'future-connected-1',  to: 'future-connected-2', type: 'normal' },
    { id: 'e6', from: 'future-connected-2',  to: 'future-end',         type: 'normal' }
  ],

  start: 'current-start',
  completion: ['future-end']
};

WorkflowEngine.register(window.STRAT_01_WORKFLOW);
