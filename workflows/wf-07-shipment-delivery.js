/* ============================================================
   VSN ERP — WF-07: Shipment → Customer Delivery
   ============================================================
   How shipments are tracked and delivered to customers.
   Exercises: verification, automation, handoffs.
   ============================================================ */

window.WF_07_WORKFLOW = {
  id: 'wf-07',
  title: 'Shipment → Customer Delivery',
  subtitle: 'How shipments are tracked and delivered to customers',
  description: 'From shipment preparation through dispatch, tracking, delivery, and customer confirmation.',

  departments: [
    { id: 'logistics', name: 'Logistics', color: '#F59E0B' },
    { id: 'store',     name: 'Store',     color: '#14B8A6' },
    { id: 'customer',  name: 'Customer',  color: '#667085' }
  ],

  phases: [
    { id: 'preparation', title: 'Preparation', subtitle: 'Shipment prepared',   startNode: 'shipment-prep',     endNode: 'shipment-dispatched' },
    { id: 'tracking',    title: 'Tracking',    subtitle: 'In transit',          startNode: 'in-transit',        endNode: 'delivery-attempted' },
    { id: 'delivery',    title: 'Delivery',    subtitle: 'Delivered to customer', startNode: 'customer-delivery', endNode: 'delivery-complete' }
  ],

  nodes: [
    {
      id: 'shipment-prep',
      type: 'process',
      owner: { department: 'logistics', role: 'Logistics Coordinator' },
      title: 'Shipment Preparation',
      description: 'Prepare shipment: pick, pack, label, and stage for dispatch.',
      inputs: ['Sales order', 'Inventory allocation', 'Shipping labels'],
      outputs: ['Prepared shipment'],
      events: [
        { text: 'Shipment SH-2026-001 prepared', type: 'info' },
        { text: 'Items picked and packed', type: 'info' },
        { text: 'Shipping label generated', type: 'success' }
      ],
      visual: { svgIds: ['n-shipment-prep'] }
    },

    {
      id: 'shipment-dispatched',
      type: 'milestone',
      owner: { department: 'logistics', role: 'Logistics Coordinator' },
      title: 'Shipment Dispatched',
      description: 'Shipment dispatched to carrier for delivery.',
      inputs: ['Prepared shipment'],
      outputs: ['Dispatch confirmation'],
      events: [
        { text: 'Shipment dispatched to carrier', type: 'milestone' },
        { text: 'Tracking: TRK-2026-001', type: 'info' },
        { text: 'ETA: 3 days', type: 'info' }
      ],
      visual: { svgIds: ['n-shipment-dispatched'] }
    },

    {
      id: 'in-transit',
      type: 'process',
      owner: { department: 'logistics', role: 'Logistics Coordinator' },
      title: 'In Transit',
      description: 'Shipment in transit with real-time tracking updates.',
      inputs: ['Carrier tracking', 'Route information'],
      outputs: ['Transit status'],
      events: [
        { text: 'Shipment picked up by carrier', type: 'info' },
        { text: 'Tracking update: In transit', type: 'info' },
        { text: 'ETA confirmed: 3 days', type: 'info' }
      ],
      visual: { svgIds: ['n-in-transit'] }
    },

    {
      id: 'delivery-attempted',
      type: 'decision',
      owner: { department: 'logistics', role: 'Logistics Coordinator' },
      title: 'Delivery Attempted',
      description: 'Carrier attempts delivery to customer.',
      question: 'Was delivery successful?',
      options: [
        { id: 'success', label: 'Yes — delivered', consequence: 'Delivery confirmed', next: 'customer-delivery' },
        { id: 'failed', label: 'No — delivery failed', consequence: 'Reschedule delivery', next: 'reschedule' }
      ],
      selected: 'success',
      reason: 'Customer present, delivery accepted.',
      inputs: ['Delivery attempt'],
      outputs: ['Delivery result'],
      events: [
        { text: 'Delivery attempted at customer location', type: 'info' },
        { text: 'Customer present and accepted delivery', type: 'success' },
        { text: 'Decision: Delivery successful', type: 'decision' }
      ],
      visual: { svgIds: ['n-delivery-attempted'] }
    },

    {
      id: 'reschedule',
      type: 'process',
      owner: { department: 'logistics', role: 'Logistics Coordinator' },
      title: 'Reschedule Delivery',
      description: 'Reschedule delivery for next available time slot.',
      inputs: ['Failed delivery attempt'],
      outputs: ['Rescheduled delivery'],
      events: [
        { text: 'Delivery failed — rescheduling', type: 'warning' },
        { text: 'Next attempt scheduled for tomorrow', type: 'info' }
      ],
      visual: { svgIds: ['n-reschedule'] }
    },

    {
      id: 'customer-delivery',
      type: 'handoff',
      from: { department: 'logistics', role: 'Logistics Coordinator' },
      to: { department: 'customer', role: 'Customer' },
      title: 'Customer Delivery',
      description: 'Goods physically delivered to customer location.',
      payload: ['Shipment', 'Delivery note', 'Goods'],
      trigger: 'Carrier delivery attempt successful.',
      inputs: ['Delivered shipment'],
      outputs: ['Delivery confirmation'],
      events: [
        { text: 'Goods delivered to customer', type: 'handoff' },
        { text: 'Customer signed delivery note', type: 'success' },
        { text: 'Proof of delivery captured', type: 'info' }
      ],
      visual: { svgIds: ['n-customer-delivery'] }
    },

    {
      id: 'delivery-complete',
      type: 'completion',
      title: 'Delivery Complete',
      summary: 'Shipment prepared, dispatched, tracked, and delivered to customer.',
      metrics: {
        'Shipment to Delivery': '3 days',
        'Delivery Attempts': '1',
        'Customer Signed': 'Yes',
        'Tracking Updates': '5'
      },
      events: [
        { text: 'DELIVERY COMPLETE', type: 'success' },
        { text: 'Order fulfilled', type: 'success' }
      ],
      visual: { svgIds: ['n-delivery-complete'] }
    }
  ],

  edges: [
    { id: 'e1', from: 'shipment-prep',        to: 'shipment-dispatched', type: 'normal' },
    { id: 'e2', from: 'shipment-dispatched',   to: 'in-transit',         type: 'normal' },
    { id: 'e3', from: 'in-transit',            to: 'delivery-attempted',  type: 'normal' },
    { id: 'e4a', from: 'delivery-attempted',   to: 'customer-delivery',   type: 'normal' },
    { id: 'e4b', from: 'delivery-attempted',   to: 'reschedule',          type: 'exception' },
    { id: 'e5', from: 'reschedule',            to: 'in-transit',          type: 'loop' },
    { id: 'e6', from: 'customer-delivery',     to: 'delivery-complete',   type: 'normal' }
  ],

  start: 'shipment-prep',
  completion: ['delivery-complete']
};

WorkflowEngine.register(window.WF_07_WORKFLOW);
