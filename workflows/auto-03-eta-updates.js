/* ============================================================
   VSN ERP — AUTO-03: ETA Updates Automation
   ============================================================
   How ETAs are automatically tracked and updated.
   Exercises: automation, decisions.
   ============================================================ */

window.AUTO_03_WORKFLOW = {
  id: 'auto-03',
  title: 'ETA Updates Automation',
  subtitle: 'How ETAs are automatically tracked and updated',
  description: 'From ETA calculation through tracking, updates, and delivery confirmation.',

  departments: [
    { id: 'erp',       name: 'ERP System', color: '#6366F1' },
    { id: 'logistics', name: 'Logistics',  color: '#F59E0B' },
    { id: 'customer',  name: 'Customer',   color: '#667085' }
  ],

  phases: [
    { id: 'calculation', title: 'Calculation', subtitle: 'ETA calculated',    startNode: 'eta-calculated',    endNode: 'eta-updated' },
    { id: 'tracking',    title: 'Tracking',    subtitle: 'Shipment tracked',  startNode: 'shipment-tracking', endNode: 'eta-finalized' },
    { id: 'delivery',    title: 'Delivery',    subtitle: 'Delivered',         startNode: 'delivery-confirmed', endNode: 'eta-complete' }
  ],

  nodes: [
    {
      id: 'eta-calculated',
      type: 'automation',
      owner: 'ERP',
      trigger: 'Shipment created',
      action: 'Auto-calculate initial ETA',
      sla: 'Immediate',
      event: 'ETA calculated: 3 days',
      inputs: ['Shipment details', 'Carrier data', 'Route info'],
      outputs: ['Initial ETA'],
      events: [
        { text: 'AUTO: ETA calculated', type: 'automation' },
        { text: 'Initial ETA: 3 days', type: 'info' },
        { text: 'Customer notification queued', type: 'automation' }
      ],
      visual: { svgIds: ['n-eta-calculated'] }
    },

    {
      id: 'shipment-tracking',
      type: 'automation',
      owner: 'ERP',
      trigger: 'Shipment in transit',
      action: 'Auto-track and update ETA',
      sla: 'Real-time',
      event: 'ETA updated based on tracking',
      inputs: ['Tracking data', 'Carrier updates'],
      outputs: ['Updated ETA'],
      events: [
        { text: 'Tracking update received', type: 'automation' },
        { text: 'ETA updated: 2.5 days', type: 'info' },
        { text: 'Customer notified of update', type: 'automation' }
      ],
      visual: { svgIds: ['n-shipment-tracking'] }
    },

    {
      id: 'eta-updated',
      type: 'milestone',
      owner: { department: 'erp', role: 'ERP System' },
      title: 'ETA Updated',
      description: 'ETA updated with latest tracking information.',
      inputs: ['Updated tracking'],
      outputs: ['Updated ETA'],
      events: [
        { text: 'ETA updated to 2.5 days', type: 'milestone' },
        { text: 'Customer portal updated', type: 'info' }
      ],
      visual: { svgIds: ['n-eta-updated'] }
    },

    {
      id: 'eta-finalized',
      type: 'decision',
      owner: { department: 'logistics', role: 'Logistics Coordinator' },
      title: 'ETA Finalized',
      description: 'Final ETA confirmed before delivery.',
      question: 'Is delivery on schedule?',
      options: [
        { id: 'on-time', label: 'Yes — on schedule', consequence: 'Proceed with delivery', next: 'delivery-confirmed' },
        { id: 'delayed', label: 'No — delayed', consequence: 'Notify customer of delay', next: 'delay-notification' }
      ],
      selected: 'on-time',
      reason: 'Shipment on schedule.',
      inputs: ['Final tracking data'],
      outputs: ['ETA status'],
      events: [
        { text: 'Checking delivery status...', type: 'info' },
        { text: 'Status: ON SCHEDULE', type: 'success' }
      ],
      visual: { svgIds: ['n-eta-finalized'] }
    },

    {
      id: 'delay-notification',
      type: 'handoff',
      from: { department: 'logistics', role: 'Logistics Coordinator' },
      to: { department: 'customer', role: 'Customer' },
      title: 'Delay Notification',
      description: 'Notify customer of delivery delay.',
      payload: ['Updated ETA', 'Delay reason', 'New delivery window'],
      trigger: 'Shipment delayed.',
      inputs: ['Delay details'],
      outputs: ['Customer notified'],
      events: [
        { text: 'Customer notified of delay', type: 'handoff' },
        { text: 'New ETA communicated', type: 'info' }
      ],
      visual: { svgIds: ['n-delay-notification'] }
    },

    {
      id: 'delivery-confirmed',
      type: 'process',
      owner: { department: 'logistics', role: 'Logistics Coordinator' },
      title: 'Delivery Confirmed',
      description: 'Delivery confirmed by carrier/customer.',
      inputs: ['Delivery confirmation'],
      outputs: ['Delivery record'],
      events: [
        { text: 'Delivery confirmed', type: 'success' },
        { text: 'Proof of delivery captured', type: 'info' }
      ],
      visual: { svgIds: ['n-delivery-confirmed'] }
    },

    {
      id: 'eta-complete',
      type: 'completion',
      title: 'ETA Process Complete',
      summary: 'ETA tracked, updated, and delivery confirmed.',
      metrics: {
        'Initial ETA': '3 days',
        'Final ETA': '2.5 days',
        'On-Time Status': 'Yes',
        'Updates Sent': '3'
      },
      events: [
        { text: 'ETA PROCESS COMPLETE', type: 'success' },
        { text: 'Delivery on schedule', type: 'success' }
      ],
      visual: { svgIds: ['n-eta-complete'] }
    }
  ],

  edges: [
    { id: 'e1', from: 'eta-calculated',      to: 'shipment-tracking',  type: 'automation' },
    { id: 'e2', from: 'shipment-tracking',    to: 'eta-updated',        type: 'normal' },
    { id: 'e3', from: 'eta-updated',          to: 'eta-finalized',      type: 'normal' },
    { id: 'e4a', from: 'eta-finalized',       to: 'delivery-confirmed', type: 'normal' },
    { id: 'e4b', from: 'eta-finalized',       to: 'delay-notification', type: 'exception' },
    { id: 'e5', from: 'delay-notification',   to: 'delivery-confirmed', type: 'normal' },
    { id: 'e6', from: 'delivery-confirmed',   to: 'eta-complete',       type: 'normal' }
  ],

  start: 'eta-calculated',
  completion: ['eta-complete']
};

WorkflowEngine.register(window.AUTO_03_WORKFLOW);
