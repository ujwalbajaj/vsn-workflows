# VSN ERP Visual Workflow System

A comprehensive, static, zero-dependency visual presentation of VSN's ERP business workflows — built with pure HTML5, CSS3, inline SVG, and vanilla JavaScript. No frameworks. No build tools. No npm. No server required.

This system covers **21 workflows** with **188 total process nodes**, spanning the entire VSN business cycle from customer inquiry through order fulfilment, procurement, finance, logistics, exception handling, and strategic transformation planning.

---

## Table of Contents

- [Quick Start](#quick-start)
- [What This System Shows](#what-this-system-shows)
- [Complete Workflow Catalog](#complete-workflow-catalog)
- [Architecture](#architecture)
- [File Structure](#file-structure)
- [Features](#features)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Adding a New Workflow](#adding-a-new-workflow)
- [SVG Diagram Conventions](#svg-diagram-conventions)
- [Design Principles](#design-principles)
- [Department Color System](#department-color-system)
- [CSS Design Token System](#css-design-token-system)
- [Browser Support](#browser-support)

---

## Quick Start

### Option 1: Direct File Open

Double-click `index.html` or open it in your browser:

```
file:///path/to/vsn-workflows/index.html
```

No server, no build step, no dependencies. Everything runs client-side.

### Option 2: Static File Server

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if installed)
npx serve .

# PHP
php -S localhost:8000

# VS Code
Install "Live Server" extension → Right-click index.html → "Open with Live Server"
```

Then open `http://localhost:8000` in your browser.

### What You'll See

1. A sidebar on the left with collapsible workflow groups
2. The Executive Overview displayed by default
3. Click any workflow in the sidebar to navigate to it
4. Press the **Play** button (or **Space**) to start the walkthrough animation

---

## What This System Shows

This is a **visual business presentation** of how VSN operates — not a technical ERP documentation. Every workflow uses business language (not ERP jargon) and shows:

- **Who does what** — Each node shows department ownership and role
- **What happens** — Clear business descriptions of each step
- **What can go wrong** — Exception paths with resolution flows
- **What's automated** — Automation nodes with dashed purple connectors
- **How departments connect** — Handoff indicators at department boundaries
- **What the business rules are** — Decision diamonds with labeled outcomes

### Categories

| Category | Count | Description |
|----------|------:|-------------|
| Executive Overview | 1 | High-level end-to-end business flow showing all departments |
| Core Workflows | 10 | Detailed step-by-step business processes (wf-01 through wf-10) |
| Automation Workflows | 6 | System-triggered automated processes (auto-01 through auto-06) |
| Strategic Summaries | 4 | Transformation vision and bottleneck analysis (strat-01 through strat-04) |
| **Total** | **21** | **188 workflow nodes across all diagrams** |

---

## Complete Workflow Catalog

### Core Workflows (wf-01 through wf-10)

These cover the main business processes from customer inquiry to delivery.

| ID | Title | Nodes | Departments Involved | Start → End |
|----|-------|------:|----------------------|-------------|
| wf-01 | Customer Requirement → Order | 16 | Customer, Sales, Management, Purchase | customer-inquiry → order-complete |
| wf-02 | Sourcing → Procurement | 13 | Purchase, Finance, Management | purchase-req → procurement-complete |
| wf-03 | Order → PO | 6 | Sales, Purchase | order-received → po-approved |
| wf-04 | PO → Finance | 9 | Finance, Purchase, Management | po-received → reconciled |
| wf-05 | PO → Goods Received | 7 | Purchase, Logistics, Store | po-dispatched → receipt-complete |
| wf-06 | Inventory & Warehouse | 8 | Store, Finance | goods-received → inventory-complete |
| wf-07 | Shipment → Customer Delivery | 7 | Logistics, Customer | shipment-prep → delivery-complete |
| wf-08 | Exception & Recovery | 13 | Store, Purchase, Management, Logistics | exception-trigger → exception-closed |
| wf-09 | Cross-Department Handoffs | 11 | Customer, Sales, Purchase, Finance, Logistics, Store | task-created → task-completed |
| wf-10 | Management Control Tower | 10 | Management, Purchase | dashboard-view → control-tower-closed |

### Automation Workflows (auto-01 through auto-06)

These show how the ERP system automatically triggers tasks, notifications, and escalations.

| ID | Title | Nodes | Trigger → Resolution |
|----|-------|------:|----------------------|
| auto-01 | Task & Handoff Automation | 6 | trigger-event → handoff-complete |
| auto-02 | SLA & Escalation Automation | 5 | sla-monitoring → sla-restored |
| auto-03 | ETA Updates Automation | 7 | eta-calculated → eta-complete |
| auto-04 | Exception Routing Automation | 6 | exception-detected → exception-closed |
| auto-05 | Document Compliance | 6 | doc-created → doc-archived |
| auto-06 | Management Alerts Automation | 6 | data-collected → alert-resolved |

### Strategic Summaries (strat-01 through strat-04)

These visualize the transformation from current state to future ERP-connected state.

| ID | Title | Nodes | Vision |
|----|-------|------:|--------|
| strat-01 | Current Process → ERP-Connected Process | 8 | How disconnected manual processes become a single connected flow |
| strat-02 | Bottleneck & Waiting-Point Map | 7 | Where time is wasted and how the ERP eliminates waiting |
| strat-03 | Manual Work → Automated Work | 11 | What manual tasks become automated in the ERP |
| strat-04 | One Transaction → One Timeline | 10 | How 6 departments connect through a single timeline |

### Executive Overview

| ID | Title | Nodes | Description |
|----|-------|------:|-------------|
| overview | Executive Overview | 10 | End-to-end business flow from customer requirement through fulfilment |

---

## Architecture

### Technology Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Markup | HTML5 | Single `index.html` with 22 `<section>` elements |
| Styling | CSS3 | CSS Custom Properties (design tokens), no preprocessors |
| Graphics | Inline SVG | Hand-crafted diagrams, not library-rendered |
| Interactivity | Vanilla JavaScript | No frameworks, no transpilation |
| Fonts | Google Fonts CDN | Inter (400, 500, 600, 700 weights) |
| Serving | Static files | Open `index.html` or any static server |

### How It Works

1. **index.html** is a single-page app shell with 22 `<section>` elements (one per workflow)
2. **Sidebar navigation** shows/hides sections by toggling CSS classes
3. **Each section** contains a page header, journey bar, SVG diagram, walkthrough controls, and detail panel
4. **Workflow data files** (`workflows/*.js`) define the business logic as JavaScript objects
5. **The Workflow Engine** (`js/engine-*.js`) connects data to SVG, animates walkthroughs, and manages state
6. **CSS** provides all visual styling through design tokens — no hardcoded values anywhere

### State Management

The engine uses a simple state model:
- Each workflow node has a state: `upcoming`, `active`, or `completed`
- The `advanceTo(index)` function moves through the workflow step by step
- State changes emit events that update SVG styles, detail panels, and the event trace
- The timeline controller manages play/pause/seek/speed

---

## File Structure

```
vsn-workflows/
├── index.html                          # Single-page app shell (22 sections, ~3,500 lines)
├── README.md                           # This file
│
├── css/                                # Design system & styles (7 files, ~52 KB)
│   ├── variables.css                   # Design tokens: colors, spacing, typography, transitions
│   ├── base.css                        # CSS reset, Google Fonts import, typography scale
│   ├── layout.css                      # Sidebar (260px), main content, responsive breakpoints
│   ├── components.css                  # Buttons, badges, grids, swatch components
│   ├── diagram.css                     # SVG node styles, interaction states, view modes
│   ├── animations.css                  # Keyframes, transitions, prefers-reduced-motion
│   └── workflow.css                    # Workflow engine: states, controls, detail panel, journey bar
│
├── js/                                 # Application logic (6 files, ~63 KB)
│   ├── app.js                          # Navigation, section switching, localStorage persistence
│   ├── diagram-interactions.js         # Node selection, department highlighting, view toggles
│   ├── svg-utils.js                    # SVG element creation, node finding, state helpers
│   ├── engine-core.js                  # Engine: state manager, event bus, validation, timeline
│   ├── engine-renderers.js             # SVG renderer with type-based registry pattern
│   └── engine-ui.js                    # Controls, bounded event trace, phase progress, keyboard
│
└── workflows/                          # Workflow data files (22 files, ~195 KB)
    ├── overview.js                     # Executive Overview (10 nodes)
    ├── store-qc.js                     # Store QC workflow (10 nodes)
    ├── wf-01-customer-order.js         # Customer → Order (16 nodes)
    ├── wf-02-sourcing-procurement.js   # Sourcing → Procurement (13 nodes)
    ├── wf-03-order-po.js               # Order → PO (6 nodes)
    ├── wf-04-po-finance.js             # PO → Finance (9 nodes)
    ├── wf-05-po-goods-received.js      # PO → Goods Received (7 nodes)
    ├── wf-06-inventory-warehouse.js    # Inventory & Warehouse (8 nodes)
    ├── wf-07-shipment-delivery.js      # Shipment → Delivery (7 nodes)
    ├── wf-08-exception-recovery.js     # Exception & Recovery (13 nodes)
    ├── wf-09-cross-dept-handoffs.js    # Cross-Dept Handoffs (11 nodes)
    ├── wf-10-management-tower.js       # Management Control Tower (10 nodes)
    ├── auto-01-task-handoff.js         # Task & Handoff Automation (6 nodes)
    ├── auto-02-sla-escalation.js       # SLA & Escalation (5 nodes)
    ├── auto-03-eta-updates.js          # ETA Updates (7 nodes)
    ├── auto-04-exception-routing.js    # Exception Routing (6 nodes)
    ├── auto-05-document-compliance.js  # Document Compliance (6 nodes)
    ├── auto-06-management-alerts.js    # Management Alerts (6 nodes)
    ├── strat-01-current-to-erp.js      # Current → ERP (8 nodes)
    ├── strat-02-bottlenecks.js         # Bottlenecks (7 nodes)
    ├── strat-03-manual-to-automated.js # Manual → Automated (11 nodes)
    └── strat-04-one-transaction.js     # One Transaction (10 nodes)
```

**Total:** ~367 KB across 35 files (excluding `.git`, `.opencode`)

---

## Features

### Walkthrough Animation

Click **Play** or press **Space** to animate through the workflow step by step. Each step:
1. Highlights the current node in blue
2. Updates the detail panel with node information
3. Logs events to the event trace panel
4. Advances the phase progress bar

**Controls:**
- **Play/Pause** — Start or pause the animation
- **Step Forward** — Advance one step
- **Step Back** — Go back one step
- **Restart** — Return to the beginning
- **Speed** — Adjust animation speed (0.5x, 1x, 2x, 4x)

### Decision Branching

Decision nodes appear as diamonds with labeled outcomes. The walkthrough shows which path is taken based on the workflow data (e.g., "YES" path vs "NO" path, "Pass" vs "Fail").

### Exception Paths

Exception flows are shown with dashed red connectors. The walkthrough highlights:
- When an exception is triggered
- What actions are taken
- How the process recovers (loop back to a previous step)

### Department Highlighting

Click any department label in the sidebar or on the SVG to:
- Highlight all nodes owned by that department
- Dim nodes from other departments to 15% opacity
- Click again or press **Escape** to remove highlighting

### View Modes

Each workflow has 4 view modes (toggle buttons in the page header):

| Mode | What It Shows |
|------|---------------|
| **Business Flow** | All process nodes, decisions, and handoffs (default) |
| **Handoffs** | Department transition indicators at lane boundaries |
| **Automation** | System-triggered tasks with dashed purple connectors |
| **Exceptions** | Error paths, rework loops, and escalation flows |

### Event Trace

The event trace panel (right side) shows a real-time log of workflow events:
- Timestamped entries
- Color-coded by type (info, success, warning, error)
- Bounded to 200 entries (older entries are removed)
- Scrollable for review

### Phase Progress Bar

The journey bar at the top shows which phase of the workflow is currently active:
- Each phase is a segment with title and subtitle
- Active phase is highlighted
- Progress fills as the walkthrough advances

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **Space** | Play / Pause walkthrough |
| **→** (Right Arrow) | Step forward one node |
| **←** (Left Arrow) | Step back one node |
| **Escape** | Deselect current node / Remove department highlighting |
| **R** | Restart walkthrough |

---

## Adding a New Workflow

### Step 1: Create the Data File

Create `workflows/XX-name.js` (use an existing file as a template):

```js
window.WF_XX_WORKFLOW = {
  id: 'wf-xx',
  title: 'Workflow Title',
  subtitle: 'Brief one-line description',
  description: 'Longer description of what this workflow covers.',

  departments: [
    { id: 'dept-name', name: 'Department Name', color: '#HEXCOLOR' }
  ],

  phases: [
    {
      id: 'phase-id',
      title: 'Phase Title',
      subtitle: 'Phase description',
      startNode: 'first-node-in-phase',
      endNode: 'last-node-in-phase'
    }
  ],

  nodes: [
    {
      id: 'node-id',
      type: 'process',  // process|decision|handoff|exception|automation|completion|milestone
      owner: { department: 'dept-name', role: 'Job Title' },
      title: 'Node Title',
      description: 'What happens in this step',
      inputs: ['Input 1', 'Input 2'],
      outputs: ['Output 1'],
      events: [
        { text: 'What happened', type: 'info' },      // info|success|warning|error
        { text: 'Important result', type: 'success' }
      ],
      visual: { svgIds: ['svg-element-id'] }  // Must match data-id in SVG
    }
  ],

  edges: [
    { id: 'e1', from: 'source-node', to: 'target-node', type: 'normal' }
    // type: normal|handoff|exception|automation|loop
  ],

  start: 'first-node-id',
  completion: ['last-node-id']
};

WorkflowEngine.register(window.WF_XX_WORKFLOW);
```

### Step 2: Add the SVG to index.html

Inside the section's `.page-canvas` div, add a hand-crafted SVG:

```html
<svg id="svg-wf-xx" viewBox="0 0 1000 580" class="diagram-svg" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow-wfxx" viewBox="0 0 10 10" refX="9" refY="5"
            markerWidth="8" markerHeight="8" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#667085"/>
    </marker>
  </defs>

  <!-- Department Lanes -->
  <g class="layer-departments">
    <rect class="dept-lane" x="0" y="0" width="1000" height="300" opacity="0.3" fill="#COLOR"/>
    <text x="16" y="154" font-size="11" fill="#COLOR" font-weight="600">DEPT NAME</text>
  </g>

  <!-- Connectors -->
  <g class="layer-connectors">
    <path class="connector" d="m 150 80 l 0 20" marker-end="url(#arrow-wfxx)"/>
  </g>

  <!-- Process Nodes (must have data-id matching node IDs) -->
  <g class="layer-process">
    <g class="node process-node" data-id="node-id">
      <rect class="node-bg" x="60" y="30" width="180" height="50" rx="6"/>
      <rect class="node-accent" x="60" y="30" width="4" height="50" rx="2" fill="#COLOR"/>
      <text class="node-title" x="76" y="52" font-size="12" font-weight="600">Title</text>
      <text class="node-desc" x="76" y="67" font-size="10" fill="#98A2B3">Description</text>
    </g>
  </g>
</svg>
```

### Step 3: Add Section HTML

```html
<section id="wf-xx" class="page-section" data-workflow="wf-xx">
  <div class="page-header">
    <h2>Workflow Title</h2>
    <p>Brief description</p>
    <div class="controls">
      <div class="btn-group" data-view-group="wf-xx">
        <button class="btn active" data-view="business">Business Flow</button>
        <button class="btn" data-view="handoffs">Handoffs</button>
        <button class="btn" data-view="automation">Automation</button>
        <button class="btn" data-view="exceptions">Exceptions</button>
      </div>
    </div>
  </div>

  <div class="journey-bar" id="journeyBar-wfxx"></div>

  <div class="page-canvas">
    <!-- SVG goes here -->
  </div>

  <div class="walkthrough-controls" id="walkthroughControls-wfxx"></div>

  <div class="page-detail" id="detail-wf-xx">
    <div class="detail-layout">
      <div class="step-info" id="stepInfo-wfxx">
        <p class="detail-placeholder">Press Play to begin the walkthrough</p>
      </div>
      <div class="mini-trace" id="miniTrace-wfxx">
        <div class="trace-header">EVENT TRACE <span class="trace-count" id="traceCount-wfxx">0</span></div>
        <div class="trace-events" id="traceEvents-wfxx"></div>
      </div>
    </div>
  </div>
</section>
```

### Step 4: Add the Script Tag

Before the closing `</body>` tag in `index.html`:

```html
<script src="workflows/XX-name.js"></script>
```

### Step 5: Add to Sidebar Navigation

In the sidebar `<nav>` section of `index.html`:

```html
<a href="#" class="sidebar-link" data-target="wf-xx">Workflow Title</a>
```

---

## SVG Diagram Conventions

### ViewBox

All SVGs use `viewBox="0 0 1000 580"` for consistent sizing.

### Layer Order

SVG elements are organized in named `<g>` groups (bottom to top):

1. `layer-departments` — Background lane rectangles and labels
2. `layer-connectors` — All connector paths
3. `layer-process` — All node groups (process, decision, handoff, etc.)
4. `layer-handoffs` — Handoff indicators (visible in handoff view mode)
5. `layer-automation` — Automation nodes (visible in automation view mode)
6. `layer-exceptions` — Exception nodes (visible in exception view mode)
7. `layer-labels` — Text labels for decisions, phases, etc.

### Node Types and Shapes

| Type | Shape | Class | Use Case |
|------|-------|-------|----------|
| Process | Rectangle with left accent bar | `process-node` | Standard business steps |
| Decision | Diamond (polygon) | `decision-node` | Branching points with YES/NO |
| Handoff | Rectangle with purple accent | `handoff-node` | Department-to-department transfers |
| Exception | Rectangle with red border | `exception-node` | Errors, rejections, holds |
| Automation | Rectangle with dashed purple border | `automation-node` | System-triggered tasks |
| Milestone | Rectangle with green fill | `milestone-node` | Key achievements |
| Completion | Rectangle with green fill and bold text | `completion-node` | End of workflow |

### Node HTML Structure

Every node must have a `data-id` attribute matching the workflow data:

```html
<g class="node process-node" data-id="unique-node-id">
  <rect class="node-bg" x="60" y="30" width="180" height="50" rx="6"/>
  <rect class="node-accent" x="60" y="30" width="4" height="50" rx="2" fill="#COLOR"/>
  <text class="node-title" x="76" y="52" font-size="12" font-weight="600">Title</text>
  <text class="node-desc" x="76" y="67" font-size="10" fill="#98A2B3">Description</text>
</g>
```

### Connector Types

| Type | Style | Use Case |
|------|-------|----------|
| Standard | Solid 2px gray (`#667085`) | Normal flow between nodes |
| Exception | Dashed 6px/4px red (`#EF4444`) | Error paths, rework loops |
| Automation | Dashed 4px/4px purple (`#6366F1`) | System-triggered connections |
| Handoff | Solid with handoff dot | Department lane crossings |

### Handoff Dots

Place at department lane boundaries:

```html
<circle class="handoff-dot" cx="X" cy="LANE_BOUNDARY_Y" r="4"/>
```

### Node Dimensions

| Type | Width | Height | Radius |
|------|------:|-------:|-------:|
| Standard node | 180px | 50px | 6px |
| Compact node | 180px | 40px | 4px |
| Diamond | 80-100px | 50-60px | N/A (polygon) |
| Automation node | 180px | 40px | 6px |

### Node Positioning

- Use staircase layout for sequential flows (nodes staggered left-to-right)
- Use vertical layout for same-department flows
- Use horizontal swimlanes for multi-department visibility
- Minimum 20px gap between nodes
- Minimum 30px vertical gap for readable connectors

---

## Design Principles

### Business-First Language

- Never use generic ERP terminology (e.g., "Document Type 3" → "Purchase Order")
- Use plain business language that a non-technical person can understand
- Every node title should be a verb phrase (e.g., "Create Quotation", not "Quotation Creation")

### Department Ownership

- Every node must show which department owns it (via accent bar color)
- Department lanes are clearly labeled and color-coded
- Handoff indicators appear at department boundaries

### Parallel Flows

- **PO → Finance + Logistics must always be parallel** — this is a hard rule
- Use fork/join patterns for parallel branches
- Label parallel branches clearly

### Exception Resolution

- Every exception path must resolve (no dead ends)
- Exception paths are shown with dashed red connectors
- Each exception has: trigger, actions, resolution, resume point

### TBD Handling

- Unknown business rules are marked: **"TBD — CLIENT VALIDATION REQUIRED"**
- Never invent approval thresholds, SLAs, or business rules
- Reference source documents where possible

### Management Positioning

- Management sits above the operational flow (higher in the SVG)
- Management nodes are never inline with operational steps
- Escalation goes UP to management, resolution comes DOWN

---

## Department Color System

| Department | CSS Variable | Hex | Used For |
|-----------|-------------|-----|----------|
| Customer | `--dept-customer` | `#667085` | Customer inquiries, reviews, delivery |
| Sales | `--dept-sales` | `#3B82F6` | Quotations, order confirmation |
| Purchase | `--dept-purchase` | `#8B5CF6` | Vendor sourcing, PO creation |
| Finance | `--dept-finance` | `#10B981` | Payment, budget checks, reconciliation |
| Logistics | `--dept-logistics` | `#F59E0B` | Shipping, tracking, delivery |
| Store | `--dept-store` | `#14B8A6` | Warehouse, QC, inventory |
| Management | `--dept-management` | `#4338CA` | Approvals, escalations, oversight |

### Semantic Colors

| Purpose | CSS Variable | Hex |
|---------|-------------|-----|
| Success | `--color-success` | `#10B981` |
| Warning | `--color-warning` | `#F59E0B` |
| Error | `--color-error` | `#EF4444` |
| Info | `--color-info` | `#3B82F6` |

### Special Treatments

| Treatment | Background | Border | Accent |
|-----------|-----------|--------|--------|
| Automation | `--auto-bg` `#EEF2FF` | `--auto-border` `#A5B4FC` | `--auto-accent` `#6366F1` |
| Exception | `--exception-bg` `#FEF2F2` | `--exception-border` `#FECACA` | `--exception-accent` `#EF4444` |
| Management | `--mgmt-bg` `#EEF2FF` | `--mgmt-border` `#C7D2FE` | `--mgmt-accent` `#4338CA` |

---

## CSS Design Token System

All visual values are centralized in `css/variables.css`. **Never hardcode colors, spacing, or typography values.**

### Surfaces

| Token | Value | Use |
|-------|-------|-----|
| `--bg-page` | `#F8F9FB` | Page background |
| `--bg-surface` | `#FFFFFF` | Card/panel background |
| `--bg-surface-alt` | `#F1F3F7` | Alternating surface |

### Typography

| Token | Value |
|-------|-------|
| `--font-family` | `'Inter', system-ui, -apple-system, sans-serif` |
| `--text-xs` | `11px` |
| `--text-sm` | `12px` |
| `--text-base` | `14px` |
| `--text-lg` | `16px` |
| `--text-xl` | `18px` |
| `--text-2xl` | `20px` |
| `--text-3xl` | `28px` |

### Spacing (4px increments)

| Token | Value |
|-------|-------|
| `--spacing-1` | `4px` |
| `--spacing-2` | `8px` |
| `--spacing-3` | `12px` |
| `--spacing-4` | `16px` |
| `--spacing-5` | `20px` |
| `--spacing-6` | `24px` |
| `--spacing-8` | `32px` |
| `--spacing-10` | `40px` |
| `--spacing-12` | `48px` |
| `--spacing-16` | `64px` |

### Transitions

| Token | Value |
|-------|-------|
| `--transition-fast` | `150ms ease` |
| `--transition-normal` | `250ms ease` |

---

## Browser Support

| Browser | Minimum Version |
|---------|----------------|
| Chrome | 80+ |
| Firefox | 78+ |
| Safari | 14+ |
| Edge | 80+ |

Requires JavaScript enabled. No polyfills needed for modern browsers.

---

## Contributing

1. Create a feature branch: `git checkout -b feature/workflow-name`
2. Add workflow data file in `workflows/`
3. Add SVG diagram to `index.html`
4. Test walkthrough animation in browser
5. Verify no CSS/JS errors in browser console
6. Submit pull request with description of changes

---

## License

Proprietary — VSN ERP Project. Internal use only.
