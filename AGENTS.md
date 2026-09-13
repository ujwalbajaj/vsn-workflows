# AGENTS.md — VSN ERP Visual Workflow System

> **Purpose:** This file provides complete context for AI agents and human contributors working on the VSN ERP Visual Workflow System. Read this file before making any changes.

---

## Table of Contents

- [Project Context](#project-context)
- [Architecture Overview](#architecture-overview)
- [Workflow Engine](#workflow-engine)
- [Workflow Data Format](#workflow-data-format)
- [SVG Diagram Conventions](#svg-diagram-conventions)
- [CSS Architecture](#css-architecture)
- [Business Rules](#business-rules)
- [Department Color System](#department-color-system)
- [Node Types Reference](#node-types-reference)
- [File Naming Conventions](#file-naming-conventions)
- [How to Add a New Workflow](#how-to-add-a-new-workflow)
- [How to Modify Existing Workflows](#how-to-modify-existing-workflows)
- [How to Modify SVG Diagrams](#how-to-modify-svg-diagrams)
- [How to Modify CSS](#how-to-modify-css)
- [How to Modify the Engine](#how-to-modify-the-engine)
- [Testing Checklist](#testing-checklist)
- [Common Pitfalls](#common-pitfalls)
- [Complete Workflow Catalog](#complete-workflow-catalog)
- [Dependency Map](#dependency-map)

---

## Project Context

**Client:** VSN — a manufacturing and distribution company operating across multiple departments.

**Goal:** Create a visual, interactive presentation of all VSN ERP business workflows for stakeholder communication. This is a **business presentation tool**, not a technical ERP implementation guide.

**Technology:**
- HTML5 + CSS3 + Inline SVG + Vanilla JavaScript
- No frameworks (React, Vue, Angular, Svelte — none)
- No build tools (webpack, Vite, esbuild — none)
- No package managers (npm, yarn, pnpm — none)
- No Node.js required
- No server required — static files opened directly in browser
- Google Fonts CDN for Inter font (400, 500, 600, 700 weights)

**Audience:** VSN stakeholders, department heads, ERP implementation team, future developers.

**Design Philosophy:**
1. Show the business first, show the ERP second
2. Business language, not ERP jargon
3. Light enterprise theme — professional but not clinical
4. Every unknown is marked TBD — never invent business rules

---

## Architecture Overview

```
index.html                          Single-page app shell (~3,500 lines)
                                    - 22 <section> elements (one per workflow)
                                    - Sidebar navigation with collapsible groups
                                    - Inline SVGs hand-crafted per workflow
                                    - Script tags for workflow data files

css/
  variables.css                     Design tokens — ALL visual values defined here (92 lines)
                                    Colors, spacing, typography, transitions, node dimensions

  base.css                          CSS reset, Google Fonts import, typography scale
                                    Sets box-sizing, font-family, heading sizes

  layout.css                        Sidebar (260px fixed), main content area, responsive
                                    Sidebar collapsible groups, mobile breakpoints

  components.css                    Buttons, badges, grids, swatch components
                                    .btn, .btn-group, .badge, .grid

  diagram.css                       SVG node styles, interaction states, view modes
                                    .node, .node-bg, .node-title, .connector
                                    .selected, .active, .completed states
                                    .handoff-view, .automation-view, .exception-view

  animations.css                    Keyframes, transitions, prefers-reduced-motion
                                    Subtle entrance animations, focus indicators

  workflow.css                      Workflow engine styles (400+ lines)
                                    Walkthrough controls, detail panel, event trace
                                    Phase progress bar, journey bar
                                    Node states: [data-state="upcoming"], [data-state="active"], [data-state="completed"]

js/
  app.js                            Navigation, section switching, localStorage
                                    showSection(id) — toggles sections, calls WorkflowEngine.activate()
                                    Collapsible sidebar groups
                                    localStorage for sidebar state persistence

  diagram-interactions.js           Node selection, department highlighting, view toggles
                                    selectNode(id) — highlights node, shows detail
                                    highlightDept(deptId) — dims other departments
                                    setViewMode(mode) — switches SVG layer visibility

  svg-utils.js                      SVG element creation, node finding, state helpers
                                    createSvgElement(tag, attrs)
                                    findNode(id) — finds [data-id="id"] in SVG
                                    setNodeState(id, state) — sets data-state attribute

  engine-core.js                    Engine state manager, event bus, validation, timeline
                                    WorkflowEngine.register(data) — registers a workflow
                                    WorkflowEngine.activate(id) — connects to section
                                    WorkflowEngine.advanceTo(index) — steps through workflow
                                    WorkflowEngine.reset() — returns to start
                                    Event bus: on(), emit()
                                    Validation: validates workflow data structure
                                    Timeline: manages play/pause/speed

  engine-renderers.js               SVG renderer with type-based registry pattern
                                    Renderer registry: registerRenderer(type, renderFn)
                                    Built-in renderers: process, decision, handoff, exception, automation, completion
                                    renderNodes(workflow, state) — applies states to SVG
                                    renderConnectors(workflow, state) — applies states to edges
                                    Tags SVG elements with data-workflow-node="true" class="wf-node"

  engine-ui.js                      Controls, bounded event trace, phase progress, keyboard
                                    Creates Play/Step/Back/Restart/Speed buttons
                                    Event trace: bounded to 200 entries, auto-scroll
                                    Phase progress: shows which phase is active
                                    Keyboard: Space (play), ← → (step), Escape (deselect), R (restart)

workflows/                          22 workflow data files
  overview.js                       Executive Overview (10 nodes)
  store-qc.js                       Store QC workflow (10 nodes)
  wf-01-customer-order.js           Customer → Order (16 nodes)
  wf-02-sourcing-procurement.js     Sourcing → Procurement (13 nodes)
  wf-03-order-po.js                 Order → PO (6 nodes)
  wf-04-po-finance.js               PO → Finance (9 nodes)
  wf-05-po-goods-received.js        PO → Goods Received (7 nodes)
  wf-06-inventory-warehouse.js      Inventory & Warehouse (8 nodes)
  wf-07-shipment-delivery.js        Shipment → Delivery (7 nodes)
  wf-08-exception-recovery.js       Exception & Recovery (13 nodes)
  wf-09-cross-dept-handoffs.js      Cross-Dept Handoffs (11 nodes)
  wf-10-management-tower.js         Management Control Tower (10 nodes)
  auto-01-task-handoff.js           Task & Handoff Automation (6 nodes)
  auto-02-sla-escalation.js         SLA & Escalation (5 nodes)
  auto-03-eta-updates.js            ETA Updates (7 nodes)
  auto-04-exception-routing.js      Exception Routing (6 nodes)
  auto-05-document-compliance.js    Document Compliance (6 nodes)
  auto-06-management-alerts.js      Management Alerts (6 nodes)
  strat-01-current-to-erp.js        Current → ERP (8 nodes)
  strat-02-bottlenecks.js           Bottlenecks (7 nodes)
  strat-03-manual-to-automated.js   Manual → Automated (11 nodes)
  strat-04-one-transaction.js       One Transaction (10 nodes)
```

---

## Workflow Engine

The engine is split into 3 files for separation of concerns:

### engine-core.js — State & Logic

**Responsibilities:**
- Workflow registration and lookup
- State management (current index, states array)
- Event bus (pub/sub pattern)
- Validation of workflow data
- Timeline controller (play, pause, advance, seek)
- Activation (connecting engine to a DOM section)

**Key API:**
```js
WorkflowEngine.register(workflowData)     // Register a workflow
WorkflowEngine.activate(workflowId)       // Connect to section, attach DOM
WorkflowEngine.advanceTo(index)           // Move to step index
WorkflowEngine.reset()                    // Return to step 0
WorkflowEngine.destroy()                  // Disconnect, clean up
```

**Events emitted:**
- `advance` — When step changes (payload: { index, node, state })
- `reset` — When workflow resets
- `activate` — When workflow connects to section
- `deactivate` — When workflow disconnects

### engine-renderers.js — SVG Rendering

**Responsibilities:**
- Renderer registry (type → renderFn mapping)
- SVG state application (upcoming/active/completed)
- Connector state application
- Department highlighting

**Registry pattern:**
```js
WorkflowEngine.registerRenderer(type, renderFn)
// Example: WorkflowEngine.registerRenderer('mytype', (node, state, svg) => { ... })
```

**Built-in types:** process, decision, handoff, exception, automation, completion

**How it finds SVG elements:**
- Nodes: `[data-id="node-id"]` — must exist in SVG
- Connectors: `[data-edge="edge-id"]` — must exist in SVG
- The engine does NOT create SVG — it only modifies existing SVG

### engine-ui.js — UI Controls

**Responsibilities:**
- Creates walkthrough control buttons (Play/Step/Back/Restart/Speed)
- Manages event trace panel (bounded to 200 entries)
- Updates phase progress bar
- Handles keyboard shortcuts
- Updates step info panel

**Controls created:**
- Play/Pause button (toggles)
- Step Forward button
- Step Back button
- Restart button
- Speed selector (0.5x, 1x, 2x, 4x)

---

## Workflow Data Format

Every workflow file exports a JS object with this structure:

```js
window.WF_XX_WORKFLOW = {
  // ---- Identity ----
  id: 'wf-xx',                    // Unique ID, must match section data-workflow
  title: 'Workflow Title',        // Displayed in section header
  subtitle: 'Brief description',  // Displayed below title
  description: 'Longer description of what this workflow covers.',

  // ---- Actors ----
  departments: [
    {
      id: 'dept-name',            // Used in node.owner.department
      name: 'Department Name',    // Displayed label
      color: '#HEXCOLOR'          // Department accent color
    }
  ],

  // ---- Phases ----
  phases: [
    {
      id: 'phase-id',             // Unique phase identifier
      title: 'Phase Title',       // Displayed in journey bar
      subtitle: 'Description',    // Displayed below phase title
      startNode: 'node-id',       // First node in this phase
      endNode: 'node-id'          // Last node in this phase
    }
  ],

  // ---- Nodes ----
  nodes: [
    {
      id: 'node-id',              // MUST match data-id in SVG
      type: 'process',            // See Node Types Reference below
      owner: {
        department: 'dept-name',  // Must match a departments[].id
        role: 'Job Title'         // Displayed in detail panel
      },
      title: 'Node Title',        // Displayed on SVG node
      description: 'What happens', // Displayed in detail panel
      inputs: ['Input 1'],        // Displayed in detail panel
      outputs: ['Output 1'],      // Displayed in detail panel
      events: [
        { text: 'What happened', type: 'info' },
        { text: 'Result', type: 'success' }
      ],
      visual: {
        svgIds: ['svg-element-id']  // Must match data-id in SVG
      }
    }
  ],

  // ---- Edges ----
  edges: [
    {
      id: 'e1',                   // Must match data-edge in SVG connector
      from: 'source-node-id',     // Must match a nodes[].id
      to: 'target-node-id',       // Must match a nodes[].id
      type: 'normal'              // normal|handoff|exception|automation|loop
    }
  ],

  // ---- Lifecycle ----
  start: 'first-node-id',        // First node in workflow
  completion: ['last-node-id']   // Terminal node(s)
};

WorkflowEngine.register(window.WF_XX_WORKFLOW);
```

### Node Type Reference

| Type | Shape | Visual | Use Case |
|------|-------|--------|----------|
| `process` | Rectangle with left accent bar | Solid border, dept-colored accent | Standard business steps |
| `decision` | Diamond (polygon) | Two outgoing edges (YES/NO) | Branching points |
| `handoff` | Rectangle with purple accent | Purple left bar | Department transfers |
| `exception` | Rectangle with red border | Red border, dashed or solid | Errors, rejections, holds |
| `automation` | Rectangle with dashed purple border | Dashed purple border | System-triggered tasks |
| `completion` | Rectangle with green fill | Green background | End of workflow |
| `milestone` | Rectangle with green fill | Green background, smaller | Key achievements (not end) |
| `parallel` | Rectangle with split border | Visual indicator of fork/join | Parallel branches |
| `loop` | Rectangle with circular arrow | Visual indicator of rework | Rework/retry loops |
| `verification` | Rectangle with checkmark | Visual indicator of check | Quality checks |
| `approval` | Rectangle with lock icon | Visual indicator of approval gate | Approval steps |
| `external` | Rectangle with cloud icon | Visual indicator of external system | External integrations |

### Edge Types

| Type | Style | Use Case |
|------|-------|----------|
| `normal` | Solid 2px `#667085` | Standard flow |
| `handoff` | Solid with handoff dot | Department lane crossing |
| `exception` | Dashed 6px/4px `#EF4444` | Error paths |
| `automation` | Dashed 4px/4px `#6366F1` | System-triggered |
| `loop` | Curved with arrow | Rework back to previous step |

---

## SVG Diagram Conventions

### ViewBox

All SVGs use `viewBox="0 0 1000 580"` for consistent sizing.

### Layer Order

SVG elements are organized in named `<g>` groups (bottom to top):

```html
<g class="layer-departments">    <!-- Background lane rectangles -->
<g class="layer-connectors">     <!-- All connector paths -->
<g class="layer-process">        <!-- All node groups -->
<g class="layer-handoffs">       <!-- Handoff indicators -->
<g class="layer-automation">     <!-- Automation nodes -->
<g class="layer-exceptions">     <!-- Exception nodes -->
<g class="layer-labels">         <!-- Text labels -->
```

### Node HTML Structure

Every node MUST have a `data-id` attribute matching the workflow data:

```html
<g class="node process-node" data-id="unique-node-id">
  <rect class="node-bg" x="60" y="30" width="180" height="50" rx="6"/>
  <rect class="node-accent" x="60" y="30" width="4" height="50" rx="2" fill="#COLOR"/>
  <text class="node-title" x="76" y="52" font-size="12" font-weight="600">Title</text>
  <text class="node-desc" x="76" y="67" font-size="10" fill="#98A2B3">Description</text>
</g>
```

### Connector Structure

Connectors MUST have a `data-edge` attribute matching the workflow data:

```html
<path class="connector" data-edge="e1" d="m 150 80 l 0 20" marker-end="url(#arrow-default)"/>
```

Arrow marker definitions:

```html
<defs>
  <marker id="arrow-default" viewBox="0 0 10 10" refX="9" refY="5"
          markerWidth="8" markerHeight="8" orient="auto-start-reverse">
    <path d="M 0 0 L 10 5 L 0 10 z" fill="#667085"/>
  </marker>
  <marker id="arrow-exception" viewBox="0 0 10 10" refX="9" refY="5"
          markerWidth="8" markerHeight="8" orient="auto-start-reverse">
    <path d="M 0 0 L 10 5 L 0 10 z" fill="#EF4444"/>
  </marker>
  <marker id="arrow-automation" viewBox="0 0 10 10" refX="9" refY="5"
          markerWidth="8" markerHeight="8" orient="auto-start-reverse">
    <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366F1"/>
  </marker>
</defs>
```

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
| Completion node | 180px | 50px | 6px |

### Node Positioning Rules

- **Staircase layout** for sequential flows: nodes staggered left-to-right (x=60, 260, 460, 660, 860)
- **Vertical layout** for same-department flows
- **Horizontal swimlanes** for multi-department visibility
- **Minimum 20px gap** between nodes
- **Minimum 30px vertical gap** for readable connectors
- **Diamond sizing:** 80×50 for tight layouts (>8 nodes), 100×60 for simpler diagrams
- **Department lanes:** Full-width rectangles with opacity=0.3 and fill=dept-color

### Department Lanes

```html
<g class="layer-departments">
  <rect class="dept-lane" x="0" y="0" width="1000" height="150" opacity="0.3" fill="#3B82F6"/>
  <text x="16" y="80" font-size="11" fill="#3B82F6" font-weight="600">SALES</text>

  <rect class="dept-lane" x="0" y="150" width="1000" height="150" opacity="0.3" fill="#8B5CF6"/>
  <text x="16" y="230" font-size="11" fill="#8B5CF6" font-weight="600">PURCHASE</text>
</g>
```

### SVG Readability Rules

1. **No overlapping nodes** — Run visual check after any SVG change
2. **No floating connectors** — Every connector must connect two nodes
3. **Staircase for complex workflows** — 5+ nodes should use staircase layout
4. **Diamonds inline with 25px gap** — Decision diamonds sit between their branches
5. **ViewBox 0 0 1000 580** — Consistent across all workflows
6. **Connectors use vertical + right-angle bends** — For staircase, handoff dots at department lane crossings

---

## CSS Architecture

### Design Token System (variables.css)

**All visual values MUST use tokens from variables.css.** No hardcoded colors, spacing, or typography.

```css
:root {
  /* Page surfaces */
  --bg-page: #F8F9FB;
  --bg-surface: #FFFFFF;
  --bg-surface-alt: #F1F3F7;

  /* Borders */
  --border: #D0D5DD;
  --border-light: #E4E7EC;

  /* Text hierarchy */
  --text-primary: #1A1D29;
  --text-secondary: #5F6B7A;
  --text-muted: #98A2B3;

  /* Department colors */
  --dept-customer: #667085;
  --dept-sales: #3B82F6;
  --dept-purchase: #8B5CF6;
  --dept-finance: #10B981;
  --dept-logistics: #F59E0B;
  --dept-store: #14B8A6;
  --dept-management: #4338CA;

  /* Semantic colors */
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: #3B82F6;

  /* Automation treatment */
  --auto-bg: #EEF2FF;
  --auto-border: #A5B4FC;
  --auto-accent: #6366F1;

  /* Exception treatment */
  --exception-bg: #FEF2F2;
  --exception-border: #FECACA;
  --exception-accent: #EF4444;

  /* Management treatment */
  --mgmt-bg: #EEF2FF;
  --mgmt-border: #C7D2FE;
  --mgmt-accent: #4338CA;

  /* Layout */
  --sidebar-width: 260px;
  --header-height: 64px;

  /* SVG node dimensions */
  --node-width: 180px;
  --node-height: 60px;
  --node-radius: 6px;
  --node-border: 1.5px;
  --connector-width: 2px;
  --connector-color: #667085;
  --connector-light: #98A2B3;

  /* Spacing (4px increments) */
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-5: 20px;
  --spacing-6: 24px;
  --spacing-8: 32px;
  --spacing-10: 40px;
  --spacing-12: 48px;
  --spacing-16: 64px;

  /* Typography */
  --font-family: 'Inter', system-ui, -apple-system, sans-serif;
  --text-xs: 11px;
  --text-sm: 12px;
  --text-base: 14px;
  --text-lg: 16px;
  --text-xl: 18px;
  --text-2xl: 20px;
  --text-3xl: 28px;
  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
}
```

### CSS Specificity Rules

1. **workflow.css** uses `data-state` and `data-type` attributes for specificity
2. **diagram.css** uses class-based selectors for SVG node styles
3. **No `!important`** in diagram.css — workflow.css must be able to override
4. **Engine states:** `[data-state="upcoming"]`, `[data-state="active"]`, `[data-state="completed"]` take precedence via attribute selectors

### CSS File Load Order

```html
<link rel="stylesheet" href="css/variables.css">   <!-- 1. Tokens -->
<link rel="stylesheet" href="css/base.css">         <!-- 2. Reset -->
<link rel="stylesheet" href="css/layout.css">       <!-- 3. Layout -->
<link rel="stylesheet" href="css/components.css">   <!-- 4. Components -->
<link rel="stylesheet" href="css/diagram.css">      <!-- 5. SVG styles -->
<link rel="stylesheet" href="css/animations.css">   <!-- 6. Animations -->
<link rel="stylesheet" href="css/workflow.css">     <!-- 7. Engine styles (LAST) -->
```

**Important:** `workflow.css` loads LAST so it can override diagram.css when needed.

---

## Business Rules

These rules are NON-NEGOTIABLE. Never violate them.

### 1. Department Ownership

Every diagram must show department ownership clearly. Every node must have an `owner` with a `department` that matches one of the workflow's `departments[]`.

### 2. PO → Finance + Logistics Parallel

When a PO reaches Goods Received, Finance and Logistics work in parallel. This is always a fork/join pattern, never sequential.

### 3. Exception Resolution

Every exception path must resolve. No dead ends. Every exception has:
- A trigger (what went wrong)
- Actions (what was done)
- A resolution (how it was fixed)
- A resume point (where the process continues)

### 4. Decision Outcomes

Every decision node must have all outcomes labeled. Typically YES/NO, Pass/Fail, or specific business outcomes.

### 5. Business Language

Never use generic ERP terminology. Use business language:
- "Create Purchase Order" not "Create Document Type PO"
- "Send to Finance" not "Trigger Workflow WS-003"
- "Customer Calls" not "Inbound Communication Event"

### 6. TBD Handling

Unknown business rules must be marked: **"TBD — CLIENT VALIDATION REQUIRED"**

Never invent:
- Approval thresholds (e.g., "over $5,000 needs approval")
- SLAs (e.g., "must respond within 24 hours")
- Specific business rules that weren't provided

Reference source documents where possible.

### 7. Management Positioning

Management sits ABOVE the operational flow in the SVG, never inline with operational steps. Escalation goes UP to management, resolution comes DOWN.

### 8. Negotiation Loops

Negotiation must show the possibility of going back and forth (loop pattern). It's not a one-way gate.

### 9. Handoff Indicators

Every department handoff must be visually distinct with a handoff dot at the department lane boundary.

### 10. Automation Distinction

Automation nodes must be visually distinct from human process nodes (dashed purple border, purple accent).

---

## Department Color System

| Department | CSS Variable | Hex | Role |
|-----------|-------------|-----|------|
| Customer | `--dept-customer` | `#667085` | Inquiries, reviews, delivery acceptance |
| Sales | `--dept-sales` | `#3B82F6` | Quotations, order confirmation |
| Purchase | `--dept-purchase` | `#8B5CF6` | Vendor sourcing, PO creation |
| Finance | `--dept-finance` | `#10B981` | Payment, budget checks, reconciliation |
| Logistics | `--dept-logistics` | `#F59E0B` | Shipping, tracking, delivery |
| Store | `--dept-store` | `#14B8A6` | Warehouse, QC, inventory |
| Management | `--dept-management` | `#4338CA` | Approvals, escalations, oversight |

---

## Node Types Reference

### process

Standard business step. Rectangle with left accent bar colored by department.

```html
<g class="node process-node" data-id="create-quotation">
  <rect class="node-bg" x="60" y="30" width="180" height="50" rx="6"/>
  <rect class="node-accent" x="60" y="30" width="4" height="50" rx="2" fill="#3B82F6"/>
  <text class="node-title" x="76" y="52" font-size="12" font-weight="600">Create Quotation</text>
  <text class="node-desc" x="76" y="67" font-size="10" fill="#98A2B3">Sales prepares pricing</text>
</g>
```

### decision

Branching point. Diamond shape with YES/NO or Pass/Fail labels.

```html
<g class="node decision-node" data-id="quotation-approved">
  <polygon class="node-bg" points="150,10 230,50 150,90 70,50" fill="white" stroke="#D0D5DD" stroke-width="1.5"/>
  <text class="node-title" x="110" y="47" font-size="11" font-weight="600">Approved?</text>
  <text class="node-title" x="110" y="60" font-size="10" fill="#98A2B3">by Management</text>
</g>
```

### handoff

Department transfer. Rectangle with purple accent bar.

```html
<g class="node handoff-node" data-id="handoff-to-purchase">
  <rect class="node-bg" x="60" y="30" width="180" height="50" rx="6"/>
  <rect class="node-accent" x="60" y="30" width="4" height="50" rx="2" fill="#8B5CF6"/>
  <text class="node-title" x="76" y="52" font-size="12" font-weight="600">Handoff to Purchase</text>
</g>
```

### exception

Error or rejection. Red border, exception background.

```html
<g class="node exception-node" data-id="quotation-rejected">
  <rect class="node-bg" x="60" y="30" width="180" height="50" rx="6" fill="#FEF2F2" stroke="#FECACA" stroke-width="1.5"/>
  <rect class="node-accent" x="60" y="30" width="4" height="50" rx="2" fill="#EF4444"/>
  <text class="node-title" x="76" y="52" font-size="12" font-weight="600">Quotation Rejected</text>
</g>
```

### automation

System-triggered task. Dashed purple border.

```html
<g class="node automation-node" data-id="auto-notify">
  <rect class="node-bg" x="60" y="30" width="180" height="40" rx="6" fill="#EEF2FF" stroke="#A5B4FC" stroke-width="1.5" stroke-dasharray="4 4"/>
  <rect class="node-accent" x="60" y="30" width="4" height="40" rx="2" fill="#6366F1"/>
  <text class="node-title" x="76" y="52" font-size="12" font-weight="600">Auto-Notify Customer</text>
</g>
```

### completion

End of workflow. Green background.

```html
<g class="node completion-node" data-id="order-complete">
  <rect class="node-bg" x="60" y="30" width="180" height="50" rx="6" fill="#10B981"/>
  <text class="node-title" x="76" y="52" font-size="12" font-weight="600" fill="white">Order Complete</text>
</g>
```

---

## File Naming Conventions

### Workflow Data Files

| Pattern | Example | Use Case |
|---------|---------|----------|
| `overview.js` | Executive Overview | Top-level summary |
| `store-qc.js` | Store QC | Special workflows |
| `wf-XX-name.js` | `wf-01-customer-order.js` | Core business workflows |
| `auto-XX-name.js` | `auto-01-task-handoff.js` | Automation workflows |
| `strat-XX-name.js` | `strat-01-current-to-erp.js` | Strategic summaries |

### Section IDs in HTML

| Pattern | Example | Data Attribute |
|---------|---------|---------------|
| `wf-XX` | `wf-01` | `data-workflow="wf-01"` |
| `auto-XX` | `auto-01` | `data-workflow="auto-01"` |
| `strat-XX` | `strat-01` | `data-workflow="strat-01"` |
| `overview` | `overview` | `data-workflow="overview"` |

### Script Tag Order

Script tags in index.html must load in this order:

```html
<!-- Utilities first -->
<script src="js/svg-utils.js"></script>
<script src="js/diagram-interactions.js"></script>
<script src="js/app.js"></script>

<!-- Engine (must be before workflow data) -->
<script src="js/engine-core.js"></script>
<script src="js/engine-renderers.js"></script>
<script src="js/engine-ui.js"></script>

<!-- Workflow data files (order doesn't matter) -->
<script src="workflows/overview.js"></script>
<script src="workflows/store-qc.js"></script>
<script src="workflows/wf-01-customer-order.js"></script>
<!-- ... all other workflow files ... -->
```

---

## How to Add a New Workflow

### Step 1: Create the Data File

Create `workflows/XX-name.js` using an existing file as a template.

### Step 2: Add the SVG to index.html

Inside the section's `.page-canvas` div. Use hand-crafted SVG with:
- Correct viewBox (0 0 1000 580)
- Layer groups in correct order
- `data-id` on every node matching workflow data
- `data-edge` on every connector matching workflow data
- Arrow markers in `<defs>`

### Step 3: Add Section HTML

```html
<section id="wf-xx" class="page-section" data-workflow="wf-xx">
  <div class="page-header">...</div>
  <div class="journey-bar" id="journeyBar-wfxx"></div>
  <div class="page-canvas">...</div>
  <div class="walkthrough-controls" id="walkthroughControls-wfxx"></div>
  <div class="page-detail" id="detail-wf-xx">
    <div class="detail-layout">
      <div class="step-info" id="stepInfo-wfxx"></div>
      <div class="mini-trace" id="miniTrace-wfxx">
        <div class="trace-header">EVENT TRACE <span class="trace-count" id="traceCount-wfxx">0</span></div>
        <div class="trace-events" id="traceEvents-wfxx"></div>
      </div>
    </div>
  </div>
</section>
```

### Step 4: Add the Script Tag

Before closing `</body>`:
```html
<script src="workflows/XX-name.js"></script>
```

### Step 5: Add to Sidebar Navigation

```html
<a href="#" class="sidebar-link" data-target="wf-xx">Workflow Title</a>
```

### Step 6: Verify

1. Open index.html in browser
2. Click workflow in sidebar
3. Press Play — walkthrough should animate through all nodes
4. Click nodes to select — detail panel shows info
5. Check all 4 view modes
6. Check keyboard shortcuts

---

## How to Modify Existing Workflows

### Adding a Node

1. Add node to `workflows/XX-name.js` nodes array
2. Add corresponding SVG element to index.html with matching `data-id`
3. Add connector from previous node to new node
4. Update `completion[]` if the new node is the terminal node
5. Test walkthrough

### Removing a Node

1. Remove from workflow data nodes array
2. Remove from SVG
3. Remove all connectors referencing this node (edges array)
4. Update `completion[]` if this was the terminal node
5. Test walkthrough

### Changing Node Order

1. Reorder in workflow data nodes array
2. Update edge `from`/`to` references
3. Update phase `startNode`/`endNode` if affected
4. Reorder in SVG (visual position)
5. Test walkthrough

### Adding a Department

1. Add to `departments[]` in workflow data
2. Add department lane to SVG
3. Assign nodes to new department via `owner.department`
4. Add handoff dots at lane boundaries
5. Test department highlighting

---

## How to Modify SVG Diagrams

### Moving a Node

1. Update `x`, `y` coordinates on the node's `<rect>` and `<text>` elements
2. Update all connector `d` paths that reference this node
3. Check for overlaps with other nodes
4. Check connector routing (right-angle bends)

### Changing Node Size

1. Update `width`, `height` on the node's `<rect>` elements
2. Update connector endpoints
3. Update `node-accent` height to match
4. Update text positions if needed

### Adding a Connector

1. Add edge to workflow data edges array
2. Add `<path>` to SVG with matching `data-edge`
3. Set correct `d` path (right-angle bends, not diagonal)
4. Set correct `marker-end` (arrow-default, arrow-exception, arrow-automation)
5. Test walkthrough

### Removing a Connector

1. Remove from workflow data edges array
2. Remove `<path>` from SVG
3. Test walkthrough

---

## How to Modify CSS

### Adding a New Token

1. Add to `css/variables.css` in the appropriate section
2. Use `--token-name` naming convention
3. Add comment explaining the token's purpose

### Changing Node Appearance

1. Edit `css/diagram.css` for base styles
2. Edit `css/workflow.css` for state-based styles
3. Use `data-state` and `data-type` attribute selectors in workflow.css
4. Never use `!important`

### Adding a New State

1. Add attribute selector in `css/workflow.css`: `[data-state="new-state"]`
2. Document the state in this file

---

## How to Modify the Engine

### Adding a New Node Type

1. Add renderer in `js/engine-renderers.js`:
```js
WorkflowEngine.registerRenderer('mytype', (node, state, svg) => {
  // Find SVG element
  // Apply state styles
  // Handle transitions
});
```

2. Add CSS for new type in `css/workflow.css` and `css/diagram.css`
3. Document in this file

### Modifying Event Behavior

1. Edit `js/engine-core.js` for event emission
2. Edit `js/engine-ui.js` for event handling
3. Test all workflows after changes

### Modifying Timeline

1. Edit `js/engine-core.js` for timing logic
2. Edit `js/engine-ui.js` for speed controls
3. Test play/pause/step/reset

---

## Testing Checklist

Before committing any changes:

- [ ] Open index.html in browser
- [ ] Click through all 22 workflows in sidebar
- [ ] Press Play on each workflow — walkthrough should complete
- [ ] Click nodes to select — detail panel shows info
- [ ] Press Escape to deselect
- [ ] Check all 4 view modes (Business, Handoffs, Automation, Exceptions)
- [ ] Check keyboard shortcuts (Space, ←, →, Escape)
- [ ] Verify no CSS/JS errors in browser console
- [ ] Verify no overlapping SVG nodes
- [ ] Verify no floating connectors
- [ ] Verify all connectors have arrow markers
- [ ] Verify handoff dots at department boundaries
- [ ] Verify department highlighting works
- [ ] Verify event trace logs events
- [ ] Verify phase progress bar updates
- [ ] Test on Chrome, Firefox, Edge (if possible)

---

## Common Pitfalls

### 1. Missing data-id on SVG Node

**Symptom:** Node never highlights during walkthrough, console error "Node not found"

**Fix:** Add `data-id="node-id"` to the `<g>` element wrapping the node

### 2. Wrong data-id Match

**Symptom:** Node highlights but with wrong state, or console error

**Fix:** Ensure `data-id` in SVG exactly matches `id` in workflow data nodes array

### 3. Missing connector data-edge

**Symptom:** Connector doesn't animate during walkthrough

**Fix:** Add `data-edge="e1"` to the connector `<path>` matching the edge id

### 4. CSS Specificity Conflict

**Symptom:** Node state styles don't apply correctly

**Fix:** Check that workflow.css loads after diagram.css. Use attribute selectors `[data-state="active"]` for specificity. Never use `!important`.

### 5. Overlapping Nodes

**Symptom:** Nodes cover each other, unreadable diagram

**Fix:** Increase spacing, use staircase layout, check viewBox dimensions

### 6. Floating Connectors

**Symptom:** Connector paths don't connect to any node

**Fix:** Verify connector `d` path endpoints match node positions. Use right-angle bends.

### 7. Missing Script Tag

**Symptom:** Workflow data undefined, console error "WF_XX_WORKFLOW is not defined"

**Fix:** Add `<script src="workflows/XX-name.js"></script>` before closing `</body>`

### 8. Wrong Section data-workflow

**Symptom:** Play button doesn't work, engine can't find section

**Fix:** Ensure `<section>` tag has `data-workflow="wf-xx"` matching the workflow id

### 9. Missing Event Array

**Symptom:** Event trace shows no events for a node

**Fix:** Add `events: [...]` array to the node in workflow data (3-5 events per node)

### 10. No completion[] Entry

**Symptom:** Workflow never shows as "complete"

**Fix:** Ensure `completion[]` array contains the terminal node id(s)

---

## Complete Workflow Catalog

### Core Workflows

| File | ID | Title | Nodes | Edges | Departments | Phases | Node Types |
|------|----|-------|------:|------:|-------------|--------|------------|
| overview.js | overview | Executive Overview | 10 | 9 | Customer, Sales, Purchase, Finance, Logistics, Store | 5 | process, handoff, milestone, parallel, verification, completion |
| store-qc.js | store-qc | Goods Received → QC → Inventory → Fulfilment | 10 | 12 | Logistics, Store, Purchase, Management | 4 | process, verification, handoff, decision, exception, completion |
| wf-01-customer-order.js | wf-01 | Customer Requirement → Order | 16 | 19 | Customer, Sales, Purchase, Management | 5 | process, verification, handoff, exception, milestone, decision, approval, loop, automation, completion |
| wf-02-sourcing-procurement.js | wf-02 | Sourcing → Procurement | 13 | 12 | Purchase, Finance, Management | 5 | process, milestone, decision, loop, approval, handoff, completion |
| wf-03-order-po.js | wf-03 | Order → PO | 6 | 5 | Sales, Purchase, Finance | 3 | process, verification, milestone, approval, completion |
| wf-04-po-finance.js | wf-04 | PO → Finance | 9 | 9 | Purchase, Finance, Management | 4 | process, decision, approval, milestone, verification, exception, completion |
| wf-05-po-goods-received.js | wf-05 | PO → Goods Received | 7 | 7 | Purchase, Logistics, Store | 3 | handoff, milestone, process, verification, exception, completion |
| wf-06-inventory-warehouse.js | wf-06 | Inventory & Warehouse | 8 | 8 | Store, Logistics, Finance | 3 | milestone, verification, exception, process, automation, handoff, completion |
| wf-07-shipment-delivery.js | wf-07 | Shipment → Customer Delivery | 7 | 7 | Logistics, Store, Customer | 3 | process, milestone, decision, handoff, completion |
| wf-08-exception-recovery.js | wf-08 | Exception & Recovery | 13 | 15 | Store, Purchase, Management, Logistics | 4 | process, decision, handoff, exception, completion |
| wf-09-cross-dept-handoffs.js | wf-09 | Cross-Department Handoffs | 11 | 10 | Sales, Purchase, Store, Finance, Logistics | 4 | process, handoff, milestone, completion |
| wf-10-management-tower.js | wf-10 | Management Control Tower | 10 | 10 | Management, Sales, Purchase, Finance | 4 | process, decision, handoff, verification, completion |

### Automation Workflows

| File | ID | Title | Nodes | Edges | Departments | Phases | Node Types |
|------|----|-------|------:|------:|-------------|--------|------------|
| auto-01-task-handoff.js | auto-01 | Task & Handoff Automation | 6 | 5 | ERP, Sales, Purchase | 3 | automation, process, milestone |
| auto-02-sla-escalation.js | auto-02 | SLA & Escalation Automation | 5 | 4 | ERP, Management | 3 | automation, exception, process, completion |
| auto-03-eta-updates.js | auto-03 | ETA Updates Automation | 7 | 7 | ERP, Logistics, Customer | 3 | automation, milestone, decision, handoff, process, completion |
| auto-04-exception-routing.js | auto-04 | Exception Routing Automation | 6 | 5 | ERP, Store, Purchase, Management | 3 | automation, milestone, process, completion |
| auto-05-document-compliance.js | auto-05 | Document Compliance | 6 | 6 | ERP, Management | 3 | process, verification, exception, milestone, approval, completion |
| auto-06-management-alerts.js | auto-06 | Management Alerts Automation | 6 | 5 | ERP, Management | 3 | automation, handoff, milestone, completion |

### Strategic Summaries

| File | ID | Title | Nodes | Edges | Departments | Phases | Node Types |
|------|----|-------|------:|------:|-------------|--------|------------|
| strat-01-current-to-erp.js | strat-01 | Current Process → ERP-Connected Process | 8 | 6 | Current (red), Future (green) | 2 | process, automation, completion |
| strat-02-bottlenecks.js | strat-02 | Bottleneck & Waiting-Point Map | 7 | 6 | Sales, Purchase, Store, Finance, Management | 2 | exception, automation, completion |
| strat-03-manual-to-automated.js | strat-03 | Manual Work → Automated Work | 11 | 6 | Manual (red), Automated (green), Hybrid (amber) | 2 | process, automation, completion |
| strat-04-one-transaction.js | strat-04 | One Transaction → One Timeline | 10 | 9 | Customer, Sales, Purchase, Store, Finance, Logistics | 1 | process, milestone, completion |

---

## Dependency Map

```
index.html
├── css/variables.css       (loaded first)
├── css/base.css            (loaded second)
├── css/layout.css          (loaded third)
├── css/components.css      (loaded fourth)
├── css/diagram.css         (loaded fifth)
├── css/animations.css      (loaded sixth)
├── css/workflow.css        (loaded last — overrides diagram.css)
│
├── js/svg-utils.js         (loaded first — no dependencies)
├── js/dagram-interactions.js (loaded second — depends on svg-utils)
├── js/app.js               (loaded third — depends on engine-core)
├── js/engine-core.js       (loaded fourth — no dependencies)
├── js/engine-renderers.js  (loaded fifth — depends on engine-core)
├── js/engine-ui.js         (loaded sixth — depends on engine-core, engine-renderers)
│
└── workflows/*.js          (loaded after engine — depend on engine-core)
    └── Each calls WorkflowEngine.register() on load
```

---

## Version History

- **v1.0** — Initial creation with 22 workflows, 188 nodes
- **v1.1** — SVG readability rewrite (wf-01, wf-02, wf-04, wf-08, wf-10, overview, strat-04)
- **v1.2** — wf-06 Inventory & Warehouse created from scratch
- **v1.3** — CSS specificity fix (removed !important from diagram.css)
- **v1.4** — README.md and AGENTS.md created

---

## Contributing

1. Create a feature branch: `git checkout -b feature/workflow-name`
2. Add workflow data file in `workflows/`
3. Add SVG diagram to `index.html`
4. Test walkthrough animation in browser
5. Verify no CSS/JS errors in browser console
6. Verify all 22 workflows still work (no regressions)
7. Submit pull request with description of changes

---

## License

Proprietary — VSN ERP Project. Internal use only.
