// Hand-crafted workflow SVG templates extracted verbatim from the original presentation.
// Used by the Act 02 diagram viewer; injected as raw SVG markup.
export const DIAGRAMS = {
  "overview": `<svg id="svg-demo" viewBox="0 0 1000 580" class="diagram-svg" xmlns="http://www.w3.org/2000/svg">

          <!-- Defs: Arrow Markers -->
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,1 L10,5 L0,9 L2,5 z" fill="#667085"/></marker>
            <marker id="arrow-exception" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,1 L10,5 L0,9 L2,5 z" fill="#EF4444"/></marker>
            <marker id="arrow-return" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,1 L10,5 L0,9 L2,5 z" fill="#667085"/></marker>
            <marker id="arrow-auto" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,1 L10,5 L0,9 L2,5 z" fill="#6366F1"/></marker>
          </defs>

          <!-- ==============================
               LAYER: Department Lanes
               ============================== -->
          <g class="layer-departments">
            <!-- Lane backgrounds -->
            <rect class="dept-lane" x="0" y="0" width="1000" height="80" opacity="0.3"/>
            <rect class="dept-lane" x="0" y="80" width="1000" height="80" opacity="0.3"/>
            <rect class="dept-lane" x="0" y="160" width="1000" height="160" opacity="0.3"/>
            <rect class="dept-lane" x="0" y="320" width="1000" height="80" opacity="0.3"/>
            <rect class="dept-lane" x="0" y="400" width="1000" height="160" opacity="0.3"/>

            <!-- Clickable department labels -->
            <g class="dept-label" data-dept="customer" transform="translate(20,30)">
              <rect width="82" height="22" rx="4"/>
              <text x="41" y="13" text-anchor="middle">Customer</text>
            </g>
            <g class="dept-label" data-dept="sales" transform="translate(20,110)">
              <rect width="56" height="22" rx="4"/>
              <text x="28" y="13" text-anchor="middle">Sales</text>
            </g>
            <g class="dept-label" data-dept="purchase" transform="translate(20,190)">
              <rect width="78" height="22" rx="4"/>
              <text x="39" y="13" text-anchor="middle">Purchase</text>
            </g>
            <g class="dept-label" data-dept="finance" transform="translate(20,330)">
              <rect width="64" height="22" rx="4"/>
              <text x="32" y="13" text-anchor="middle">Finance</text>
            </g>
            <g class="dept-label" data-dept="logistics" transform="translate(20,360)">
              <rect width="82" height="22" rx="4"/>
              <text x="41" y="13" text-anchor="middle">Logistics</text>
            </g>
            <g class="dept-label" data-dept="store" transform="translate(20,420)">
              <rect width="52" height="22" rx="4"/>
              <text x="26" y="13" text-anchor="middle">Store</text>
            </g>
          </g>

          <!-- ==============================
               LAYER: Connectors
               ============================== -->
          <g class="layer-connectors">
            <!-- Customer → Sales -->
            <path class="connector" d="m 500 80 l 0 20"/>
            <circle class="handoff-dot" cx="500" cy="90" r="4"/>

            <!-- Sales → Purchase (handoff) -->
            <path class="connector handoff" d="m 500 160 l 0 20"/>
            <circle class="handoff-dot" cx="500" cy="170" r="4"/>

            <!-- Purchase → PO -->
            <path class="connector" d="m 500 240 l 0 20"/>

            <!-- PO → Finance (left branch) -->
            <path class="connector" d="m 410 290 l -120 0 l 0 40"/>

            <!-- PO → Logistics (right branch) -->
            <path class="connector" d="m 590 290 l 120 0 l 0 40"/>

            <!-- Finance → Store (converge) -->
            <path class="connector" d="m 280 390 l 0 20 l 220 0"/>

            <!-- Logistics → Store (converge) -->
            <path class="connector" d="m 630 390 l 0 -20 l -130 0 l 0 40"/>

            <!-- Store → QC -->
            <path class="connector" d="m 500 470 l 0 20"/>

            <!-- Store → Customer (return/fulfilment) -->
            <path class="connector return dashed" d="m 590 440 l 60 0 q 80 0 80 -200 l 0 -150 q 0 -70 -70 -70 l -70 0"/>
          </g>

          <!-- ==============================
               LAYER: Process Nodes
               ============================== -->
          <g class="layer-process">
            <!-- Customer Requirement -->
            <g class="node process-node" data-id="n-customer" data-dept="customer" transform="translate(410,20)">
              <rect class="node-bg" width="180" height="60" rx="6"/>
              <rect class="node-accent" width="4" height="60" rx="2"/>
              <text class="node-title" x="16" y="26">Customer Requirement</text>
              <text class="node-desc" x="16" y="42">Inquiry received</text>
            </g>

            <!-- Sales Reviews -->
            <g class="node process-node" data-id="n-sales" data-dept="sales" transform="translate(410,100)">
              <rect class="node-bg" width="180" height="60" rx="6"/>
              <rect class="node-accent" width="4" height="60" rx="2"/>
              <text class="node-title" x="16" y="26">Sales Reviews</text>
              <text class="node-desc" x="16" y="42">RFQ created, sourcing req.</text>
            </g>

            <!-- Purchase Finds Vendor -->
            <g class="node process-node" data-id="n-purchase" data-dept="purchase" transform="translate(410,180)">
              <rect class="node-bg" width="180" height="60" rx="6"/>
              <rect class="node-accent" width="4" height="60" rx="2"/>
              <text class="node-title" x="16" y="26">Purchase Finds Vendor</text>
              <text class="node-desc" x="16" y="42">Sourcing &amp; costing</text>
            </g>

            <!-- PO Created -->
            <g class="node process-node" data-id="n-po" data-dept="purchase" transform="translate(410,260)">
              <rect class="node-bg" width="180" height="60" rx="6"/>
              <rect class="node-accent" width="4" height="60" rx="2"/>
              <text class="node-title" x="16" y="26">PO Created</text>
              <text class="node-desc" x="16" y="42">Order placed with vendor</text>
            </g>

            <!-- Finance Checks -->
            <g class="node process-node" data-id="n-finance" data-dept="finance" transform="translate(190,330)">
              <rect class="node-bg" width="180" height="60" rx="6"/>
              <rect class="node-accent" width="4" height="60" rx="2"/>
              <text class="node-title" x="16" y="26">Finance Checks</text>
              <text class="node-desc" x="16" y="42">Payment terms &amp; approval</text>
            </g>

            <!-- Logistics Arranges -->
            <g class="node process-node" data-id="n-logistics" data-dept="logistics" transform="translate(630,330)">
              <rect class="node-bg" width="180" height="60" rx="6"/>
              <rect class="node-accent" width="4" height="60" rx="2"/>
              <text class="node-title" x="16" y="26">Logistics Arranges</text>
              <text class="node-desc" x="16" y="42">Shipping &amp; tracking</text>
            </g>

            <!-- Store Receives -->
            <g class="node process-node" data-id="n-store" data-dept="store" transform="translate(410,410)">
              <rect class="node-bg" width="180" height="60" rx="6"/>
              <rect class="node-accent" width="4" height="60" rx="2"/>
              <text class="node-title" x="16" y="26">Store Receives</text>
              <text class="node-desc" x="16" y="42">GRN &amp; physical receipt</text>
            </g>

            <!-- QC & Inventory -->
            <g class="node process-node" data-id="n-qc" data-dept="store" transform="translate(410,490)">
              <rect class="node-bg" width="180" height="60" rx="6"/>
              <rect class="node-accent" width="4" height="60" rx="2"/>
              <text class="node-title" x="16" y="26">QC &amp; Inventory</text>
              <text class="node-desc" x="16" y="42">Quality check &amp; stock</text>
            </g>
          </g>

          <!-- ==============================
               LAYER: Handoffs (viewable in handoff mode)
               ============================== -->
          <g class="layer-handoffs">
            <!-- Handoff indicators at transition points -->
            <g transform="translate(520,130)">
              <rect width="120" height="20" rx="4" fill="#EEF2FF" stroke="#A5B4FC" stroke-width="1"/>
              <text x="60" y="14" text-anchor="middle" font-size="10" font-weight="600" fill="#6366F1">Sales → Purchase</text>
            </g>
            <g transform="translate(260,275)">
              <rect width="120" height="20" rx="4" fill="#EEF2FF" stroke="#A5B4FC" stroke-width="1"/>
              <text x="60" y="14" text-anchor="middle" font-size="10" font-weight="600" fill="#6366F1">PO → Finance</text>
            </g>
            <g transform="translate(630,275)">
              <rect width="130" height="20" rx="4" fill="#EEF2FF" stroke="#A5B4FC" stroke-width="1"/>
              <text x="65" y="14" text-anchor="middle" font-size="10" font-weight="600" fill="#6366F1">PO → Logistics</text>
            </g>
            <g transform="translate(280,395)">
              <rect width="130" height="20" rx="4" fill="#EEF2FF" stroke="#A5B4FC" stroke-width="1"/>
              <text x="65" y="14" text-anchor="middle" font-size="10" font-weight="600" fill="#6366F1">Finance → Store</text>
            </g>
            <g transform="translate(620,395)">
              <rect width="140" height="20" rx="4" fill="#EEF2FF" stroke="#A5B4FC" stroke-width="1"/>
              <text x="70" y="14" text-anchor="middle" font-size="10" font-weight="600" fill="#6366F1">Logistics → Store</text>
            </g>
          </g>

          <!-- ==============================
               LAYER: Automation (hidden by default)
               ============================== -->
          <g class="layer-automation">
            <g class="node automation-node" data-id="auto-rfq" transform="translate(600,105)">
              <rect class="node-bg" width="170" height="36" rx="6"/>
              <rect class="node-accent" width="3" height="36" rx="1.5"/>
              <text class="node-title" x="12" y="22">Auto: Create RFQ Task</text>
            </g>
            <g class="node automation-node" data-id="auto-notify" transform="translate(200,155)">
              <rect class="node-bg" width="170" height="36" rx="6"/>
              <rect class="node-accent" width="3" height="36" rx="1.5"/>
              <text class="node-title" x="12" y="22">Auto: Notify Purchase</text>
            </g>
            <g class="node automation-node" data-id="auto-po-tasks" transform="translate(200,240)">
              <rect class="node-bg" width="170" height="36" rx="6"/>
              <rect class="node-accent" width="3" height="36" rx="1.5"/>
              <text class="node-title" x="12" y="22">Auto: Create PO Tasks</text>
            </g>
            <g class="node automation-node" data-id="auto-finance-alert" transform="translate(200,405)">
              <rect class="node-bg" width="180" height="36" rx="6"/>
              <rect class="node-accent" width="3" height="36" rx="1.5"/>
              <text class="node-title" x="12" y="22">Auto: Send Finance Alert</text>
            </g>
            <g class="node automation-node" data-id="auto-track-eta" transform="translate(630,405)">
              <rect class="node-bg" width="160" height="36" rx="6"/>
              <rect class="node-accent" width="3" height="36" rx="1.5"/>
              <text class="node-title" x="12" y="22">Auto: Track ETA</text>
            </g>
            <g class="node automation-node" data-id="auto-update-inv" transform="translate(600,430)">
              <rect class="node-bg" width="170" height="36" rx="6"/>
              <rect class="node-accent" width="3" height="36" rx="1.5"/>
              <text class="node-title" x="12" y="22">Auto: Update Inventory</text>
            </g>
            <!-- Dashed connectors from automation to main flow -->
            <path class="connector dashed" style="marker-end:url(#arrow-auto)" d="m 600 123 l -10 0" opacity="0.6"/>
            <path class="connector dashed" style="marker-end:url(#arrow-auto)" d="m 370 173 l 30 0 l 0 37" opacity="0.6"/>
            <path class="connector dashed" style="marker-end:url(#arrow-auto)" d="m 370 258 l 30 0 l 0 32" opacity="0.6"/>
            <path class="connector dashed" style="marker-end:url(#arrow-auto)" d="m 370 390 l -160 0 l 0 15" opacity="0.6"/>
            <path class="connector dashed" style="marker-end:url(#arrow-auto)" d="m 810 360 l 0 45" opacity="0.6"/>
            <path class="connector dashed" style="marker-end:url(#arrow-auto)" d="m 600 448 l -10 0" opacity="0.6"/>
          </g>

          <!-- ==============================
               LAYER: Exceptions (hidden by default)
               ============================== -->
          <g class="layer-exceptions">
            <!-- Vendor Delay -->
            <g class="node exception-node" data-id="exc-vendor-delay" transform="translate(130,185)">
              <rect class="node-bg" width="160" height="50" rx="6"/>
              <rect class="node-accent" width="4" height="50" rx="2"/>
              <text class="node-title" x="14" y="22">Vendor Delay</text>
              <text class="node-desc" x="14" y="36">Supply not on time</text>
            </g>
            <path class="connector exception" d="m 410 210 l -120 0"/>

            <!-- QC Rejection -->
            <g class="node exception-node" data-id="exc-qc-reject" transform="translate(130,415)">
              <rect class="node-bg" width="160" height="50" rx="6"/>
              <rect class="node-accent" width="4" height="50" rx="2"/>
              <text class="node-title" x="14" y="22">QC Rejection</text>
              <text class="node-desc" x="14" y="36">Material fails inspection</text>
            </g>
            <path class="connector exception" d="m 410 440 l -120 0"/>

            <!-- Exception resolution paths -->
            <path class="connector exception" d="m 130 210 l -60 0 l 0 -110 l 340 0" style="marker-end:url(#arrow-exception)"/>
            <path class="connector exception" d="m 130 440 l -60 0 l 0 -80 l 120 0" style="marker-end:url(#arrow-exception)"/>
          </g>

          <!-- ==============================
               LAYER: Labels
               ============================== -->
          <g class="layer-labels">
            <!-- Parallel branch label -->
            <g transform="translate(500,300)">
              <text font-size="10" font-weight="600" fill="#98A2B3" text-anchor="middle" letter-spacing="0.05em">PARALLEL</text>
            </g>

            <!-- Return path label -->
            <g transform="translate(940,280)">
              <text font-size="10" font-weight="600" fill="#98A2B3" text-anchor="middle" letter-spacing="0.05em" transform="rotate(90)">FULFILMENT</text>
            </g>
          </g>

        </svg>`,
  "wf-01": `<svg id="svg-wf-01" viewBox="0 0 1000 580" class="diagram-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="arrow-wf01" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,1 L10,5 L0,9 L2,5 z" fill="#667085"/></marker>
            <marker id="arrow-exception-wf01" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,1 L10,5 L0,9 L2,5 z" fill="#EF4444"/></marker>
            <marker id="arrow-auto-wf01" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,1 L10,5 L0,9 L2,5 z" fill="#6366F1"/></marker>
          </defs>

          <!-- Department Lanes -->
          <g class="layer-departments">
            <rect class="dept-lane" x="0" y="0" width="1000" height="80" opacity="0.3" fill="#667085"/>
            <rect class="dept-lane" x="0" y="80" width="1000" height="240" opacity="0.3" fill="#3B82F6"/>
            <rect class="dept-lane" x="0" y="320" width="1000" height="80" opacity="0.3" fill="#4338CA"/>
            <rect class="dept-lane" x="0" y="400" width="1000" height="160" opacity="0.3" fill="#8B5CF6"/>
            <text x="16" y="44" font-size="11" fill="#667085" font-weight="600">CUSTOMER</text>
            <text x="16" y="204" font-size="11" fill="#3B82F6" font-weight="600">SALES</text>
            <text x="16" y="364" font-size="11" fill="#4338CA" font-weight="600">MANAGEMENT</text>
            <text x="16" y="484" font-size="11" fill="#8B5CF6" font-weight="600">PURCHASE</text>
          </g>

          <!-- Connectors -->
          <g class="layer-connectors">
            <!-- customer-inquiry → requirement-validated (diagonal) -->
            <path class="connector" d="m 150 70 l 0 15 l 100 0 l 0 15" marker-end="url(#arrow-wf01)"/>
            <circle class="handoff-dot" cx="150" cy="80" r="4"/>
            <!-- requirement-validated → quotation-prep (diagonal) -->
            <path class="connector" d="m 350 150 l 0 15 l 100 0 l 0 15" marker-end="url(#arrow-wf01)"/>
            <!-- quotation-prep → quote-sent (diagonal) -->
            <path class="connector" d="m 550 200 l 0 15 l 100 0 l 0 15" marker-end="url(#arrow-wf01)"/>
            <!-- quote-sent → customer-review (vertical) -->
            <path class="connector" d="m 750 260 l 0 20" marker-end="url(#arrow-wf01)"/>
            <!-- customer-review → margin-check (diagonal) -->
            <path class="connector" d="m 700 330 l -135 0 l 0 15 l -15 0" marker-end="url(#arrow-wf01)"/>
            <!-- margin-check YES → terms-negotiation (right branch) -->
            <path class="connector" d="m 550 365 l 0 15 l 150 0 l 0 15" marker-end="url(#arrow-wf01)"/>
            <text x="620" y="360" text-anchor="middle" font-size="9" fill="#10B981" font-weight="600">YES</text>
            <!-- margin-check NO → management-approval (left branch) -->
            <path class="connector exception-path" d="m 470 345 l 0 15 l -120 0 l 0 15" marker-end="url(#arrow-exception-wf01)" stroke="#EF4444" stroke-dasharray="6 4" fill="none"/>
            <text x="400" y="355" text-anchor="middle" font-size="9" fill="#EF4444" font-weight="600">NO</text>
            <!-- management-approval → order-confirmed (diagonal) -->
            <path class="connector" d="m 350 410 l 0 15 l 150 0 l 0 15" marker-end="url(#arrow-wf01)"/>
            <!-- management-approval → price-revision (exception) -->
            <path class="connector exception-path" d="m 300 370 l 0 15 l -100 0 l 0 -75" marker-end="url(#arrow-exception-wf01)" stroke="#EF4444" stroke-dasharray="6 4" fill="none"/>
            <text x="200" y="365" text-anchor="middle" font-size="9" fill="#EF4444" font-weight="600">Revision</text>
            <!-- price-revision → requirement-validated (loop back) -->
            <path class="connector exception-path" d="m 260 265 l 0 -70" marker-end="url(#arrow-exception-wf01)" stroke="#EF4444" stroke-dasharray="6 4" fill="none"/>
            <!-- terms-negotiation → terms-agreed (vertical) -->
            <path class="connector" d="m 750 420 l 0 20" marker-end="url(#arrow-wf01)"/>
            <!-- terms-agreed → order-confirmed (diagonal) -->
            <path class="connector" d="m 660 445 l -65 0 l 0 55 l -63 0" marker-end="url(#arrow-wf01)"/>
            <!-- order-confirmed → order-to-purchase (diagonal, crosses Management→Purchase) -->
            <path class="connector handoff" d="m 550 470 l 0 15 l -100 0 l 0 15" marker-end="url(#arrow-wf01)"/>
            <circle class="handoff-dot" cx="550" cy="400" r="4"/>
            <!-- order-confirmed → auto-create-rfq (exception path) -->
            <path class="connector automation-path" d="m 450 470 l -120 0 l 0 -15 l -100 0 l 0 15" marker-end="url(#arrow-auto-wf01)" stroke="#6366F1" stroke-dasharray="4 4" fill="none"/>
            <!-- order-to-purchase → order-complete (vertical) -->
            <path class="connector" d="m 450 520 l 0 15 l 200 0 l 0 15" marker-end="url(#arrow-wf01)"/>
            <!-- clarification → requirement-validated (loop back) -->
            <path class="connector exception-path" d="m 350 220 l 0 -20" marker-end="url(#arrow-exception-wf01)" stroke="#EF4444" stroke-dasharray="6 4" fill="none"/>
            <!-- requirement-validated → clarification (branch) -->
            <path class="connector exception-path" d="m 350 180 l 0 10" marker-end="url(#arrow-exception-wf01)" stroke="#EF4444" stroke-dasharray="6 4" fill="none"/>
            <!-- requirement-validated → rejection (branch) -->
            <path class="connector exception-path" d="m 260 165 l 0 15 l -100 0 l 0 15" marker-end="url(#arrow-exception-wf01)" stroke="#EF4444" stroke-dasharray="6 4" fill="none"/>
          </g>

          <!-- Process Nodes -->
          <g class="layer-process">
            <!-- 0: Customer Inquiry -->
            <g class="node process-node" data-id="customer-inquiry">
              <rect class="node-bg" x="60" y="20" width="180" height="50" rx="6"/>
              <rect class="node-accent" x="60" y="20" width="4" height="50" rx="2" fill="#667085"/>
              <text class="node-title" x="76" y="42" font-size="12" font-weight="600">Customer Inquiry</text>
              <text class="node-desc" x="76" y="57" font-size="10" fill="#98A2B3">Submits product requirement</text>
            </g>

            <!-- 1: Requirement Validation -->
            <g class="node process-node" data-id="requirement-validated">
              <rect class="node-bg" x="260" y="100" width="180" height="50" rx="6"/>
              <rect class="node-accent" x="260" y="100" width="4" height="50" rx="2" fill="#3B82F6"/>
              <text class="node-title" x="276" y="122" font-size="12" font-weight="600">Requirement Validation</text>
              <text class="node-desc" x="276" y="137" font-size="10" fill="#98A2B3">Sales validates completeness</text>
            </g>

            <!-- 2: Clarification Request -->
            <g class="node process-node" data-id="clarification">
              <rect class="node-bg" x="260" y="170" width="180" height="50" rx="6" fill="#FEF2F2" stroke="#EF4444" stroke-width="1"/>
              <rect class="node-accent" x="260" y="170" width="4" height="50" rx="2" fill="#EF4444"/>
              <text class="node-title" x="276" y="192" font-size="12" font-weight="600">Clarification Request</text>
              <text class="node-desc" x="276" y="207" font-size="10" fill="#98A2B3">Missing information sent back</text>
            </g>

            <!-- 3: Rejection -->
            <g class="node exception-node" data-id="rejection">
              <rect class="node-bg" x="60" y="170" width="160" height="50" rx="6" fill="#FEF2F2" stroke="#EF4444" stroke-width="1"/>
              <rect class="node-accent" x="60" y="170" width="4" height="50" rx="2" fill="#EF4444"/>
              <text class="node-title" x="76" y="192" font-size="12" font-weight="600">Requirement Rejected</text>
              <text class="node-desc" x="76" y="207" font-size="10" fill="#98A2B3">Cannot fulfill — alternatives sent</text>
            </g>

            <!-- 4: Quotation Preparation -->
            <g class="node process-node" data-id="quotation-prep">
              <rect class="node-bg" x="460" y="150" width="180" height="50" rx="6"/>
              <rect class="node-accent" x="460" y="150" width="4" height="50" rx="2" fill="#3B82F6"/>
              <text class="node-title" x="476" y="172" font-size="12" font-weight="600">Quotation Preparation</text>
              <text class="node-desc" x="476" y="187" font-size="10" fill="#98A2B3">Pricing, delivery, payment terms</text>
            </g>

            <!-- 5: Quote Sent -->
            <g class="node milestone-node" data-id="quote-sent">
              <rect class="node-bg" x="660" y="200" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1"/>
              <rect class="node-accent" x="660" y="200" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="676" y="222" font-size="12" font-weight="600">Quote Sent to Customer</text>
              <text class="node-desc" x="676" y="237" font-size="10" fill="#98A2B3">Formal quotation delivered</text>
            </g>

            <!-- 6: Customer Review -->
            <g class="node process-node" data-id="customer-review">
              <rect class="node-bg" x="660" y="280" width="180" height="50" rx="6" fill="#F9FAFB" stroke="#667085" stroke-width="1"/>
              <rect class="node-accent" x="660" y="280" width="4" height="50" rx="2" fill="#667085"/>
              <text class="node-title" x="676" y="302" font-size="12" font-weight="600">Customer Reviews Quote</text>
              <text class="node-desc" x="676" y="317" font-size="10" fill="#98A2B3">Evaluates pricing and terms</text>
            </g>

            <!-- 7: Margin Check (Diamond - inline) -->
            <g class="node decision-node" data-id="margin-check">
              <polygon points="510,320 550,345 510,370 470,345" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1.5"/>
              <text x="510" y="343" text-anchor="middle" font-size="10" font-weight="600" fill="#92400E">Margin</text>
              <text x="510" y="355" text-anchor="middle" font-size="9" fill="#92400E">≥ 15%?</text>
            </g>

            <!-- 8: Management Approval -->
            <g class="node process-node" data-id="management-approval">
              <rect class="node-bg" x="200" y="340" width="160" height="50" rx="6" fill="#EEF2FF" stroke="#4338CA" stroke-width="1"/>
              <rect class="node-accent" x="200" y="340" width="4" height="50" rx="2" fill="#4338CA"/>
              <text class="node-title" x="216" y="362" font-size="12" font-weight="600">Management Approval</text>
              <text class="node-desc" x="216" y="377" font-size="10" fill="#98A2B3">Reviews margin exception</text>
            </g>

            <!-- 9: Price Revision -->
            <g class="node process-node" data-id="price-revision">
              <rect class="node-bg" x="140" y="265" width="160" height="50" rx="6" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1"/>
              <rect class="node-accent" x="140" y="265" width="4" height="50" rx="2" fill="#F59E0B"/>
              <text class="node-title" x="156" y="287" font-size="12" font-weight="600">Price Revision</text>
              <text class="node-desc" x="156" y="302" font-size="10" fill="#98A2B3">Adjust pricing, loop back</text>
            </g>

            <!-- 10: Terms Negotiation -->
            <g class="node process-node" data-id="terms-negotiation">
              <rect class="node-bg" x="660" y="340" width="180" height="50" rx="6"/>
              <rect class="node-accent" x="660" y="340" width="4" height="50" rx="2" fill="#3B82F6"/>
              <text class="node-title" x="676" y="362" font-size="12" font-weight="600">Terms Negotiation</text>
              <text class="node-desc" x="676" y="377" font-size="10" fill="#98A2B3">Payment, delivery, warranty</text>
            </g>

            <!-- 11: Terms Agreed -->
            <g class="node milestone-node" data-id="terms-agreed">
              <rect class="node-bg" x="660" y="420" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1"/>
              <rect class="node-accent" x="660" y="420" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="676" y="442" font-size="12" font-weight="600">Terms Agreed</text>
              <text class="node-desc" x="676" y="457" font-size="10" fill="#98A2B3">All terms finalized</text>
            </g>

            <!-- 12: Order Confirmed -->
            <g class="node milestone-node" data-id="order-confirmed">
              <rect class="node-bg" x="400" y="420" width="160" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5"/>
              <rect class="node-accent" x="400" y="420" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="416" y="442" font-size="12" font-weight="700" fill="#065F46">Order Confirmed</text>
              <text class="node-desc" x="416" y="457" font-size="10" fill="#98A2B3">SO-2026-001 created</text>
            </g>

            <!-- 13: Auto-Create RFQ -->
            <g class="node automation-node" data-id="auto-create-rfq">
              <rect class="node-bg" x="140" y="460" width="180" height="40" rx="6" fill="#EEF2FF" stroke="#A5B4FC" stroke-width="1" stroke-dasharray="4 4"/>
              <rect class="node-accent" x="140" y="460" width="3" height="40" rx="1.5" fill="#6366F1"/>
              <text class="node-title" x="155" y="485" font-size="11" font-weight="600" fill="#4338CA">⚡ Auto: Create RFQ Task</text>
            </g>

            <!-- 14: Handoff to Purchase -->
            <g class="node handoff-node" data-id="order-to-purchase">
              <rect class="node-bg" x="350" y="470" width="180" height="50" rx="6" fill="#EEF2FF" stroke="#8B5CF6" stroke-width="1"/>
              <rect class="node-accent" x="350" y="470" width="4" height="50" rx="2" fill="#8B5CF6"/>
              <text class="node-title" x="366" y="492" font-size="12" font-weight="600">Handoff to Purchase</text>
              <text class="node-desc" x="366" y="507" font-size="10" fill="#98A2B3">Sales → Purchase transfer</text>
            </g>

            <!-- 15: Order Complete -->
            <g class="node completion-node" data-id="order-complete">
              <rect class="node-bg" x="600" y="470" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5"/>
              <rect class="node-accent" x="600" y="470" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="616" y="492" font-size="12" font-weight="700" fill="#065F46">Order Complete</text>
              <text class="node-desc" x="616" y="507" font-size="10" fill="#98A2B3">Handed to Purchase</text>
            </g>
          </g>

          <!-- Labels -->
          <g class="layer-labels">
            <text x="860" y="325" text-anchor="middle" font-size="9" fill="#EF4444" font-weight="600">Loop back</text>
          </g>

        </svg>`,
  "wf-02": `<svg id="svg-wf-02" viewBox="0 0 1000 580" class="diagram-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="arrow-wf02" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,1 L10,5 L0,9 L2,5 z" fill="#667085"/></marker>
            <marker id="arrow-exception-wf02" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,1 L10,5 L0,9 L2,5 z" fill="#EF4444"/></marker>
          </defs>

          <!-- Department Lanes -->
          <g class="layer-departments">
            <rect class="dept-lane" x="0" y="0" width="1000" height="420" opacity="0.3" fill="#8B5CF6"/>
            <rect class="dept-lane" x="0" y="420" width="1000" height="80" opacity="0.3" fill="#10B981"/>
            <rect class="dept-lane" x="0" y="500" width="1000" height="80" opacity="0.3" fill="#4338CA"/>
            <text x="16" y="214" font-size="11" fill="#8B5CF6" font-weight="600">PURCHASE</text>
            <text x="16" y="464" font-size="11" fill="#10B981" font-weight="600">FINANCE</text>
            <text x="16" y="544" font-size="11" fill="#4338CA" font-weight="600">MANAGEMENT</text>
          </g>

          <!-- Connectors -->
          <g class="layer-connectors">
            <!-- purchase-req → vendor-search -->
            <path class="connector" d="m 150 80 l 0 10" marker-end="url(#arrow-wf02)"/>
            <!-- vendor-search → rfq-created -->
            <path class="connector" d="m 150 140 l 0 10" marker-end="url(#arrow-wf02)"/>
            <!-- rfq-created → quote-comparison (diagonal) -->
            <path class="connector" d="m 250 175 l 0 15 l 100 0 l 0 15" marker-end="url(#arrow-wf02)"/>
            <!-- quote-comparison → vendor-selection -->
            <path class="connector" d="m 450 205 l 0 15 l 50 0 l 0 15" marker-end="url(#arrow-wf02)"/>
            <!-- vendor-selection YES → vendor-negotiation -->
            <path class="connector" d="m 550 285 l 0 10" marker-end="url(#arrow-wf02)"/>
            <text x="565" y="292" text-anchor="middle" font-size="9" fill="#10B981" font-weight="600">YES</text>
            <!-- vendor-selection → vendor-negotiation (intake) -->
            <!-- vendor-selection NO → renegotiation -->
            <path class="connector exception-path" d="m 600 255 l 50 0" marker-end="url(#arrow-exception-wf02)" stroke="#EF4444" stroke-dasharray="6 4" fill="none"/>
            <text x="620" y="248" text-anchor="middle" font-size="9" fill="#EF4444" font-weight="600">NO</text>
            <!-- renegotiation → quote-comparison (loop back) -->
            <path class="connector exception-path" d="m 560 185 l 0 15 l -200 0" marker-end="url(#arrow-exception-wf02)" stroke="#EF4444" stroke-dasharray="6 4" fill="none"/>
            <!-- vendor-negotiation → terms-agreed (diagonal) -->
            <path class="connector" d="m 460 320 l 0 15 l -100 0 l 0 15" marker-end="url(#arrow-wf02)"/>
            <!-- terms-agreed → po-created -->
            <path class="connector" d="m 340 375 l 0 10" marker-end="url(#arrow-wf02)"/>
            <!-- po-created → finance-review (diagonal) -->
            <path class="connector" d="m 450 375 l 0 15 l 100 0 l 0 15" marker-end="url(#arrow-wf02)"/>
            <!-- finance-review → po-approved (diagonal) -->
            <path class="connector" d="m 460 440 l 0 15 l -120 0 l 0 15" marker-end="url(#arrow-wf02)"/>
            <!-- finance-review loop back -->
            <path class="connector exception-path" d="m 460 415 l 0 -5 l -200 0 l 0 -10" marker-end="url(#arrow-exception-wf02)" stroke="#EF4444" stroke-dasharray="6 4" fill="none"/>
            <!-- po-approved → po-sent-vendor (crosses Finance→Management) -->
            <path class="connector handoff" d="m 420 465 l 40 0 l 0 25" marker-end="url(#arrow-wf02)"/>
            <circle class="handoff-dot" cx="420" cy="500" r="4"/>
            <!-- po-sent-vendor → procurement-complete -->
            <path class="connector" d="m 650 515 l 10 0" marker-end="url(#arrow-wf02)"/>
          </g>

          <!-- Process Nodes -->
          <g class="layer-process">
            <!-- 0: Purchase Requirement -->
            <g class="node process-node" data-id="purchase-req">
              <rect class="node-bg" x="60" y="30" width="180" height="50" rx="6"/>
              <rect class="node-accent" x="60" y="30" width="4" height="50" rx="2" fill="#8B5CF6"/>
              <text class="node-title" x="76" y="52" font-size="12" font-weight="600">Purchase Requirement</text>
              <text class="node-desc" x="76" y="67" font-size="10" fill="#98A2B3">From Sales or inventory</text>
            </g>

            <!-- 1: Vendor Search -->
            <g class="node process-node" data-id="vendor-search">
              <rect class="node-bg" x="60" y="90" width="180" height="50" rx="6"/>
              <rect class="node-accent" x="60" y="90" width="4" height="50" rx="2" fill="#8B5CF6"/>
              <text class="node-title" x="76" y="112" font-size="12" font-weight="600">Vendor Search</text>
              <text class="node-desc" x="76" y="127" font-size="10" fill="#98A2B3">Find approved suppliers</text>
            </g>

            <!-- 2: RFQ Created -->
            <g class="node milestone-node" data-id="rfq-created">
              <rect class="node-bg" x="60" y="150" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1"/>
              <rect class="node-accent" x="60" y="150" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="76" y="172" font-size="12" font-weight="600">RFQ Created</text>
              <text class="node-desc" x="76" y="187" font-size="10" fill="#98A2B3">Sent to 3 vendors</text>
            </g>

            <!-- 3: Quote Comparison -->
            <g class="node process-node" data-id="quote-comparison">
              <rect class="node-bg" x="260" y="180" width="180" height="50" rx="6"/>
              <rect class="node-accent" x="260" y="180" width="4" height="50" rx="2" fill="#8B5CF6"/>
              <text class="node-title" x="276" y="202" font-size="12" font-weight="600">Quote Comparison</text>
              <text class="node-desc" x="276" y="217" font-size="10" fill="#98A2B3">Price, quality, delivery</text>
            </g>

            <!-- 4: Vendor Selection (Diamond) -->
            <g class="node decision-node" data-id="vendor-selection">
              <polygon points="550,225 600,255 550,285 500,255" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1.5"/>
              <text x="550" y="253" text-anchor="middle" font-size="11" font-weight="600" fill="#92400E">Vendor</text>
              <text x="550" y="265" text-anchor="middle" font-size="10" font-weight="600" fill="#92400E">Selected?</text>
            </g>

            <!-- 5: Renegotiation -->
            <g class="node process-node" data-id="renegotiation-loop">
              <rect class="node-bg" x="660" y="170" width="160" height="50" rx="6" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1"/>
              <rect class="node-accent" x="660" y="170" width="4" height="50" rx="2" fill="#F59E0B"/>
              <text class="node-title" x="676" y="192" font-size="12" font-weight="600">Renegotiation</text>
              <text class="node-desc" x="676" y="207" font-size="10" fill="#98A2B3">Request revised quotes</text>
            </g>

            <!-- 6: Vendor Negotiation -->
            <g class="node process-node" data-id="vendor-negotiation">
              <rect class="node-bg" x="460" y="295" width="180" height="50" rx="6"/>
              <rect class="node-accent" x="460" y="295" width="4" height="50" rx="2" fill="#8B5CF6"/>
              <text class="node-title" x="476" y="317" font-size="12" font-weight="600">Vendor Negotiation</text>
              <text class="node-desc" x="476" y="332" font-size="10" fill="#98A2B3">Price, terms, delivery</text>
            </g>

            <!-- 7: Terms Agreed -->
            <g class="node milestone-node" data-id="vendor-terms-agreed">
              <rect class="node-bg" x="260" y="350" width="160" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1"/>
              <rect class="node-accent" x="260" y="350" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="276" y="372" font-size="12" font-weight="600">Terms Agreed</text>
              <text class="node-desc" x="276" y="387" font-size="10" fill="#98A2B3">All terms finalized</text>
            </g>

            <!-- 8: PO Creation -->
            <g class="node process-node" data-id="po-created">
              <rect class="node-bg" x="260" y="420" width="180" height="50" rx="6"/>
              <rect class="node-accent" x="260" y="420" width="4" height="50" rx="2" fill="#8B5CF6"/>
              <text class="node-title" x="276" y="442" font-size="12" font-weight="600">PO Creation</text>
              <text class="node-desc" x="276" y="457" font-size="10" fill="#98A2B3">Draft PO in ERP</text>
            </g>

            <!-- 9: Finance Review -->
            <g class="node process-node" data-id="finance-review">
              <rect class="node-bg" x="460" y="420" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1"/>
              <rect class="node-accent" x="460" y="420" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="476" y="442" font-size="12" font-weight="600">Finance Review</text>
              <text class="node-desc" x="476" y="457" font-size="10" fill="#98A2B3">Budget compliance check</text>
            </g>

            <!-- 10: PO Approved -->
            <g class="node milestone-node" data-id="po-approved">
              <rect class="node-bg" x="260" y="500" width="160" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5"/>
              <rect class="node-accent" x="260" y="500" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="276" y="522" font-size="12" font-weight="700" fill="#065F46">PO Approved</text>
              <text class="node-desc" x="276" y="537" font-size="10" fill="#98A2B3">Ready for dispatch</text>
            </g>

            <!-- 11: PO Sent to Vendor -->
            <g class="node handoff-node" data-id="po-sent-vendor">
              <rect class="node-bg" x="460" y="500" width="180" height="50" rx="6" fill="#EEF2FF" stroke="#8B5CF6" stroke-width="1"/>
              <rect class="node-accent" x="460" y="500" width="4" height="50" rx="2" fill="#8B5CF6"/>
              <text class="node-title" x="476" y="522" font-size="12" font-weight="600">PO Sent to Vendor</text>
              <text class="node-desc" x="476" y="537" font-size="10" fill="#98A2B3">External handoff</text>
            </g>

            <!-- 12: Procurement Complete -->
            <g class="node completion-node" data-id="procurement-complete">
              <rect class="node-bg" x="660" y="500" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5"/>
              <rect class="node-accent" x="660" y="500" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="676" y="522" font-size="12" font-weight="700" fill="#065F46">Procurement Complete</text>
              <text class="node-desc" x="676" y="537" font-size="10" fill="#98A2B3">Awaiting goods receipt</text>
            </g>
          </g>

        </svg>`,
  "wf-03": `<svg id="svg-wf-03" viewBox="0 0 1000 580" class="diagram-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="arrow-wf03" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,1 L10,5 L0,9 L2,5 z" fill="#667085"/></marker>
          </defs>

          <!-- Department Lanes -->
          <g class="layer-departments">
            <rect class="dept-lane" x="0" y="0" width="1000" height="180" opacity="0.3" fill="#3B82F6"/>
            <rect class="dept-lane" x="0" y="180" width="1000" height="180" opacity="0.3" fill="#8B5CF6"/>
            <rect class="dept-lane" x="0" y="360" width="1000" height="180" opacity="0.3" fill="#10B981"/>
            <text x="16" y="94" font-size="11" fill="#3B82F6" font-weight="600">SALES</text>
            <text x="16" y="274" font-size="11" fill="#8B5CF6" font-weight="600">PURCHASE</text>
            <text x="16" y="454" font-size="11" fill="#10B981" font-weight="600">FINANCE</text>
          </g>

          <!-- Connectors -->
          <g class="layer-connectors">
            <path class="connector" d="m 150 80 l 0 50" marker-end="url(#arrow-wf03)"/>
            <path class="connector" d="m 350 130 l 0 70" marker-end="url(#arrow-wf03)"/>
            <path class="connector" d="m 550 230 l 0 30" marker-end="url(#arrow-wf03)"/>
            <path class="connector" d="m 550 260 l 0 50" marker-end="url(#arrow-wf03)"/>
            <path class="connector" d="m 550 310 l 0 60" marker-end="url(#arrow-wf03)"/>
            <!-- Approval loop back -->
            <path class="connector exception-path" d="m 550 370 l -200 0 l 0 -60" marker-end="url(#arrow-wf03)" stroke="#EF4444" stroke-dasharray="6 4" fill="none"/>
          </g>

          <!-- Process Nodes -->
          <g class="layer-process">
            <!-- 0: Order Received -->
            <g class="node process-node" data-id="order-received">
              <rect class="node-bg" x="60" y="50" width="180" height="50" rx="6"/>
              <rect class="node-accent" x="60" y="50" width="4" height="50" rx="2" fill="#3B82F6"/>
              <text class="node-title" x="76" y="72" font-size="12" font-weight="600">Sales Order Received</text>
              <text class="node-desc" x="76" y="87" font-size="10" fill="#98A2B3">Customer order + specs</text>
            </g>

            <!-- 1: Order Verified -->
            <g class="node verification-node" data-id="order-verified">
              <rect class="node-bg" x="260" y="100" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1"/>
              <rect class="node-accent" x="260" y="100" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="276" y="122" font-size="12" font-weight="600">Order Verification</text>
              <text class="node-desc" x="276" y="137" font-size="10" fill="#98A2B3">4 checks passed</text>
            </g>

            <!-- 2: PO Preparation -->
            <g class="node process-node" data-id="po-preparation">
              <rect class="node-bg" x="460" y="200" width="180" height="50" rx="6"/>
              <rect class="node-accent" x="460" y="200" width="4" height="50" rx="2" fill="#8B5CF6"/>
              <text class="node-title" x="476" y="222" font-size="12" font-weight="600">PO Preparation</text>
              <text class="node-desc" x="476" y="237" font-size="10" fill="#98A2B3">Draft PO created</text>
            </g>

            <!-- 3: PO Submitted -->
            <g class="node milestone-node" data-id="po-submitted">
              <rect class="node-bg" x="460" y="250" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1"/>
              <rect class="node-accent" x="460" y="250" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="476" y="272" font-size="12" font-weight="600">PO Submitted for Review</text>
              <text class="node-desc" x="476" y="287" font-size="10" fill="#98A2B3">Awaiting Finance</text>
            </g>

            <!-- 4: PO Review -->
            <g class="node process-node" data-id="po-review">
              <rect class="node-bg" x="460" y="340" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1"/>
              <rect class="node-accent" x="460" y="340" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="476" y="362" font-size="12" font-weight="600">PO Review</text>
              <text class="node-desc" x="476" y="377" font-size="10" fill="#98A2B3">Finance budget check</text>
            </g>

            <!-- 5: PO Approved -->
            <g class="node completion-node" data-id="po-approved">
              <rect class="node-bg" x="460" y="420" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5"/>
              <rect class="node-accent" x="460" y="420" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="476" y="442" font-size="12" font-weight="700" fill="#065F46">PO Approved</text>
              <text class="node-desc" x="476" y="457" font-size="10" fill="#98A2B3">Ready for dispatch</text>
            </g>
          </g>

        </svg>`,
  "wf-04": `<svg id="svg-wf-04" viewBox="0 0 1000 580" class="diagram-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="arrow-wf04" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,1 L10,5 L0,9 L2,5 z" fill="#667085"/></marker>
            <marker id="arrow-exception-wf04" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,1 L10,5 L0,9 L2,5 z" fill="#EF4444"/></marker>
          </defs>

          <!-- Department Lanes -->
          <g class="layer-departments">
            <rect class="dept-lane" x="0" y="0" width="1000" height="300" opacity="0.3" fill="#10B981"/>
            <rect class="dept-lane" x="0" y="300" width="1000" height="80" opacity="0.3" fill="#8B5CF6"/>
            <rect class="dept-lane" x="0" y="380" width="1000" height="180" opacity="0.3" fill="#4338CA"/>
            <text x="16" y="154" font-size="11" fill="#10B981" font-weight="600">FINANCE</text>
            <text x="16" y="344" font-size="11" fill="#8B5CF6" font-weight="600">PURCHASE</text>
            <text x="16" y="474" font-size="11" fill="#4338CA" font-weight="600">MANAGEMENT</text>
          </g>

          <!-- Connectors -->
          <g class="layer-connectors">
            <!-- po-received → budget-check -->
            <path class="connector" d="m 150 80 l 0 20 l 100 0 l 0 20" marker-end="url(#arrow-wf04)"/>
            <!-- budget-check YES → approval-decision -->
            <path class="connector" d="m 350 120 l 0 15 l 200 0 l 0 15" marker-end="url(#arrow-wf04)"/>
            <text x="440" y="110" text-anchor="middle" font-size="9" fill="#10B981" font-weight="600">YES</text>
            <!-- budget-check NO → mgmt-approval (exception) -->
            <path class="connector exception-path" d="m 300 150 l 0 15 l -140 0 l 0 235" marker-end="url(#arrow-exception-wf04)" stroke="#EF4444" stroke-dasharray="6 4" fill="none"/>
            <text x="190" y="165" text-anchor="middle" font-size="9" fill="#EF4444" font-weight="600">NO</text>
            <circle class="handoff-dot" cx="300" cy="300" r="4"/>
            <!-- approval-decision → payment-processing -->
            <path class="connector" d="m 550 170 l 0 30" marker-end="url(#arrow-wf04)"/>
            <!-- payment-processing → payment-complete -->
            <path class="connector" d="m 550 250 l 0 30" marker-end="url(#arrow-wf04)"/>
            <!-- payment-complete → three-way-match (crosses Finance→Purchase) -->
            <path class="connector handoff" d="m 550 330 l 0 20" marker-end="url(#arrow-wf04)"/>
            <circle class="handoff-dot" cx="550" cy="300" r="4"/>
            <!-- three-way-match → exception-handling (exception) -->
            <path class="connector exception-path" d="m 650 345 l 80 0 l 0 15" marker-end="url(#arrow-exception-wf04)" stroke="#EF4444" stroke-dasharray="6 4" fill="none"/>
            <text x="700" y="335" text-anchor="middle" font-size="9" fill="#EF4444" font-weight="600">Mismatch</text>
            <!-- exception-handling → reconciled (loop back) -->
            <path class="connector exception-path" d="m 750 380 l 0 15 l -200 0 l 0 35" marker-end="url(#arrow-exception-wf04)" stroke="#EF4444" stroke-dasharray="6 4" fill="none"/>
            <!-- three-way-match → reconciled -->
            <path class="connector" d="m 550 395 l 0 30" marker-end="url(#arrow-wf04)"/>
          </g>

          <!-- Process Nodes -->
          <g class="layer-process">
            <!-- 0: PO Received -->
            <g class="node process-node" data-id="po-received">
              <rect class="node-bg" x="60" y="30" width="180" height="50" rx="6"/>
              <rect class="node-accent" x="60" y="30" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="76" y="52" font-size="12" font-weight="600">PO Received by Finance</text>
              <text class="node-desc" x="76" y="67" font-size="10" fill="#98A2B3">From Purchase dept</text>
            </g>

            <!-- 1: Budget Check -->
            <g class="node decision-node" data-id="budget-check">
              <polygon points="350,90 400,120 350,150 300,120" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1.5"/>
              <text x="350" y="118" text-anchor="middle" font-size="10" font-weight="600" fill="#92400E">Budget</text>
              <text x="350" y="130" text-anchor="middle" font-size="9" fill="#92400E">OK?</text>
            </g>

            <!-- 2: Approval Decision -->
            <g class="node process-node" data-id="approval-decision">
              <rect class="node-bg" x="460" y="100" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1"/>
              <rect class="node-accent" x="460" y="100" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="476" y="122" font-size="12" font-weight="600">Approval Decision</text>
              <text class="node-desc" x="476" y="137" font-size="10" fill="#98A2B3">Finance manager approves</text>
            </g>

            <!-- 3: Payment Processing -->
            <g class="node process-node" data-id="payment-processing">
              <rect class="node-bg" x="460" y="180" width="180" height="50" rx="6"/>
              <rect class="node-accent" x="460" y="180" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="476" y="202" font-size="12" font-weight="600">Payment Processing</text>
              <text class="node-desc" x="476" y="217" font-size="10" fill="#98A2B3">Bank transfer</text>
            </g>

            <!-- 4: Payment Complete -->
            <g class="node milestone-node" data-id="payment-complete">
              <rect class="node-bg" x="460" y="260" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1"/>
              <rect class="node-accent" x="460" y="260" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="476" y="282" font-size="12" font-weight="600">Payment Complete</text>
              <text class="node-desc" x="476" y="297" font-size="10" fill="#98A2B3">$25,000 transferred</text>
            </g>

            <!-- 5: Three-Way Match -->
            <g class="node verification-node" data-id="three-way-match">
              <rect class="node-bg" x="460" y="320" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1"/>
              <rect class="node-accent" x="460" y="320" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="476" y="342" font-size="12" font-weight="600">Three-Way Match</text>
              <text class="node-desc" x="476" y="357" font-size="10" fill="#98A2B3">PO vs GRN vs Invoice</text>
            </g>

            <!-- 6: Exception Handling -->
            <g class="node exception-node" data-id="exception-handling">
              <rect class="node-bg" x="700" y="340" width="160" height="50" rx="6" fill="#FEF2F2" stroke="#EF4444" stroke-width="1"/>
              <rect class="node-accent" x="700" y="340" width="4" height="50" rx="2" fill="#EF4444"/>
              <text class="node-title" x="716" y="362" font-size="12" font-weight="600">Exception Handling</text>
              <text class="node-desc" x="716" y="377" font-size="10" fill="#98A2B3">Resolve mismatch</text>
            </g>

            <!-- 7: Management Approval -->
            <g class="node process-node" data-id="mgmt-approval">
              <rect class="node-bg" x="160" y="400" width="180" height="50" rx="6" fill="#EEF2FF" stroke="#4338CA" stroke-width="1"/>
              <rect class="node-accent" x="160" y="400" width="4" height="50" rx="2" fill="#4338CA"/>
              <text class="node-title" x="176" y="422" font-size="12" font-weight="600">Management Approval</text>
              <text class="node-desc" x="176" y="437" font-size="10" fill="#98A2B3">Budget exception review</text>
            </g>

            <!-- 8: Reconciled -->
            <g class="node completion-node" data-id="reconciled">
              <rect class="node-bg" x="460" y="420" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5"/>
              <rect class="node-accent" x="460" y="420" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="476" y="442" font-size="12" font-weight="700" fill="#065F46">PO Reconciled</text>
              <text class="node-desc" x="476" y="457" font-size="10" fill="#98A2B3">Accounts balanced</text>
            </g>
          </g>

        </svg>`,
  "wf-05": `<svg id="svg-wf-05" viewBox="0 0 1000 580" class="diagram-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="arrow-wf05" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,1 L10,5 L0,9 L2,5 z" fill="#667085"/></marker>
            <marker id="arrow-exception-wf05" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,1 L10,5 L0,9 L2,5 z" fill="#EF4444"/></marker>
          </defs>

          <!-- Department Lanes -->
          <g class="layer-departments">
            <rect class="dept-lane" x="0" y="0" width="1000" height="120" opacity="0.3" fill="#8B5CF6"/>
            <rect class="dept-lane" x="0" y="120" width="1000" height="120" opacity="0.3" fill="#F59E0B"/>
            <rect class="dept-lane" x="0" y="240" width="1000" height="200" opacity="0.3" fill="#14B8A6"/>
            <rect class="dept-lane" x="0" y="440" width="1000" height="100" opacity="0.3" fill="#98A2B3"/>
            <text x="16" y="64" font-size="11" fill="#8B5CF6" font-weight="600">PURCHASE</text>
            <text x="16" y="184" font-size="11" fill="#F59E0B" font-weight="600">LOGISTICS</text>
            <text x="16" y="344" font-size="11" fill="#14B8A6" font-weight="600">STORE</text>
            <text x="16" y="494" font-size="11" fill="#98A2B3" font-weight="600">VENDOR (External)</text>
          </g>

          <!-- Connectors -->
          <g class="layer-connectors">
            <path class="connector handoff" d="m 150 70 l 0 50" marker-end="url(#arrow-wf05)"/>
            <path class="connector" d="m 350 100 l 0 50" marker-end="url(#arrow-wf05)"/>
            <path class="connector" d="m 550 150 l 0 50" marker-end="url(#arrow-wf05)"/>
            <path class="connector" d="m 550 200 l 0 50" marker-end="url(#arrow-wf05)"/>
            <path class="connector" d="m 550 250 l 0 50" marker-end="url(#arrow-wf05)"/>
            <path class="connector" d="m 550 300 l 0 40" marker-end="url(#arrow-wf05)"/>
            <path class="connector" d="m 550 340 l 0 40" marker-end="url(#arrow-wf05)"/>
            <!-- Exception loop -->
            <path class="connector exception-path" d="m 550 380 l 150 0 l 0 60" marker-end="url(#arrow-exception-wf05)" stroke="#EF4444" stroke-dasharray="6 4" fill="none"/>
            <path class="connector exception-path" d="m 700 440 l -150 0 l 0 -40" marker-end="url(#arrow-exception-wf05)" stroke="#EF4444" stroke-dasharray="6 4" fill="none"/>
          </g>

          <!-- Process Nodes -->
          <g class="layer-process">
            <!-- 0: PO Dispatched -->
            <g class="node handoff-node" data-id="po-dispatched">
              <rect class="node-bg" x="60" y="40" width="180" height="50" rx="6" fill="#EEF2FF" stroke="#8B5CF6" stroke-width="1"/>
              <rect class="node-accent" x="60" y="40" width="4" height="50" rx="2" fill="#8B5CF6"/>
              <text class="node-title" x="76" y="62" font-size="12" font-weight="600">PO Dispatched to Vendor</text>
              <text class="node-desc" x="76" y="77" font-size="10" fill="#98A2B3">External handoff</text>
            </g>

            <!-- 1: Vendor Confirmed -->
            <g class="node milestone-node" data-id="vendor-confirmed">
              <rect class="node-bg" x="260" y="70" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1"/>
              <rect class="node-accent" x="260" y="70" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="276" y="92" font-size="12" font-weight="600">Vendor Confirmed</text>
              <text class="node-desc" x="276" y="107" font-size="10" fill="#98A2B3">Delivery: 15 days</text>
            </g>

            <!-- 2: In Transit -->
            <g class="node process-node" data-id="in-transit">
              <rect class="node-bg" x="460" y="120" width="180" height="50" rx="6"/>
              <rect class="node-accent" x="460" y="120" width="4" height="50" rx="2" fill="#F59E0B"/>
              <text class="node-title" x="476" y="142" font-size="12" font-weight="600">In Transit</text>
              <text class="node-desc" x="476" y="157" font-size="10" fill="#98A2B3">Tracking: TRK-2026-001</text>
            </g>

            <!-- 3: Goods Received -->
            <g class="node process-node" data-id="goods-received">
              <rect class="node-bg" x="460" y="170" width="180" height="50" rx="6"/>
              <rect class="node-accent" x="460" y="170" width="4" height="50" rx="2" fill="#14B8A6"/>
              <text class="node-title" x="476" y="192" font-size="12" font-weight="600">Goods Received</text>
              <text class="node-desc" x="476" y="207" font-size="10" fill="#98A2B3">GRN created</text>
            </g>

            <!-- 4: Quality Check -->
            <g class="node verification-node" data-id="quality-check">
              <rect class="node-bg" x="460" y="250" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1"/>
              <rect class="node-accent" x="460" y="250" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="476" y="272" font-size="12" font-weight="600">Quality Check</text>
              <text class="node-desc" x="476" y="287" font-size="10" fill="#98A2B3">4 checks performed</text>
            </g>

            <!-- 5: Exception Handling -->
            <g class="node exception-node" data-id="exception-handling">
              <rect class="node-bg" x="660" y="380" width="160" height="50" rx="6" fill="#FEF2F2" stroke="#EF4444" stroke-width="1"/>
              <rect class="node-accent" x="660" y="380" width="4" height="50" rx="2" fill="#EF4444"/>
              <text class="node-title" x="676" y="402" font-size="12" font-weight="600">Exception Handling</text>
              <text class="node-desc" x="676" y="417" font-size="10" fill="#98A2B3">Resolve issue</text>
            </g>

            <!-- 6: Receipt Complete -->
            <g class="node completion-node" data-id="receipt-complete">
              <rect class="node-bg" x="460" y="350" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5"/>
              <rect class="node-accent" x="460" y="350" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="476" y="372" font-size="12" font-weight="700" fill="#065F46">Receipt Complete</text>
              <text class="node-desc" x="476" y="387" font-size="10" fill="#98A2B3">Inventory updated</text>
            </g>
          </g>

          <!-- Labels -->
          <g class="layer-labels">
            <text x="600" y="400" text-anchor="middle" font-size="9" fill="#EF4444" font-weight="600">Fail</text>
            <text x="500" y="370" text-anchor="middle" font-size="9" fill="#10B981" font-weight="600">Pass</text>
          </g>

        </svg>`,
  "wf-06": `<svg id="svg-wf-06" viewBox="0 0 1000 580" class="diagram-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="arrow-wf06" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,1 L10,5 L0,9 L2,5 z" fill="#667085"/></marker>
            <marker id="arrow-exception-wf06" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,1 L10,5 L0,9 L2,5 z" fill="#EF4444"/></marker>
            <marker id="arrow-auto-wf06" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,1 L10,5 L0,9 L2,5 z" fill="#6366F1"/></marker>
          </defs>

          <!-- Department Lanes -->
          <g class="layer-departments">
            <rect class="dept-lane" x="0" y="0" width="1000" height="400" opacity="0.3" fill="#14B8A6"/>
            <rect class="dept-lane" x="0" y="400" width="1000" height="180" opacity="0.3" fill="#10B981"/>
            <text x="16" y="204" font-size="11" fill="#14B8A6" font-weight="600">STORE</text>
            <text x="16" y="494" font-size="11" fill="#10B981" font-weight="600">FINANCE</text>
          </g>

          <!-- Connectors -->
          <g class="layer-connectors">
            <!-- goods-received → inspection-passed -->
            <path class="connector" d="m 150 80 l 0 20" marker-end="url(#arrow-wf06)"/>
            <!-- inspection-passed → bin-assignment (pass) -->
            <path class="connector" d="m 350 160 l 0 15 l 100 0 l 0 15" marker-end="url(#arrow-wf06)"/>
            <text x="420" y="168" text-anchor="middle" font-size="9" fill="#10B981" font-weight="600">PASS</text>
            <!-- inspection-passed → exception-hold (fail) -->
            <path class="connector exception-path" d="m 260 145 l 0 15 l -100 0 l 0 15" marker-end="url(#arrow-exception-wf06)" stroke="#EF4444" stroke-dasharray="6 4" fill="none"/>
            <text x="150" y="132" text-anchor="middle" font-size="9" fill="#EF4444" font-weight="600">FAIL</text>
            <!-- exception-hold → inspection-passed (loop back) -->
            <path class="connector exception-path" d="m 150 175 l 0 -20" marker-end="url(#arrow-exception-wf06)" stroke="#EF4444" stroke-dasharray="6 4" fill="none"/>
            <!-- bin-assignment → stock-updated -->
            <path class="connector automation-path" d="m 550 210 l 0 20" marker-end="url(#arrow-auto-wf06)" stroke="#6366F1" stroke-dasharray="4 4" fill="none"/>
            <!-- stock-updated → inventory-record -->
            <path class="connector" d="m 550 280 l 0 20" marker-end="url(#arrow-wf06)"/>
            <!-- inventory-record → finance-notified (crosses Store→Finance) -->
            <path class="connector handoff" d="m 550 350 l 0 20" marker-end="url(#arrow-wf06)"/>
            <circle class="handoff-dot" cx="550" cy="400" r="4"/>
            <!-- finance-notified → inventory-complete -->
            <path class="connector" d="m 550 450 l 0 20" marker-end="url(#arrow-wf06)"/>
          </g>

          <!-- Process Nodes -->
          <g class="layer-process">
            <!-- 0: Goods Received -->
            <g class="node milestone-node" data-id="goods-received">
              <rect class="node-bg" x="60" y="30" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1"/>
              <rect class="node-accent" x="60" y="30" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="76" y="52" font-size="12" font-weight="600">Goods Received</text>
              <text class="node-desc" x="76" y="67" font-size="10" fill="#98A2B3">GRN verified at dock</text>
            </g>

            <!-- 1: Inspection Passed -->
            <g class="node verification-node" data-id="inspection-passed">
              <rect class="node-bg" x="260" y="110" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1"/>
              <rect class="node-accent" x="260" y="110" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="276" y="132" font-size="12" font-weight="600">Inspection Passed</text>
              <text class="node-desc" x="276" y="147" font-size="10" fill="#98A2B3">Quality check completed</text>
            </g>

            <!-- 2: Exception Hold -->
            <g class="node exception-node" data-id="exception-hold">
              <rect class="node-bg" x="60" y="140" width="180" height="50" rx="6" fill="#FEF2F2" stroke="#EF4444" stroke-width="1"/>
              <rect class="node-accent" x="60" y="140" width="4" height="50" rx="2" fill="#EF4444"/>
              <text class="node-title" x="76" y="162" font-size="12" font-weight="600">Exception Hold</text>
              <text class="node-desc" x="76" y="177" font-size="10" fill="#98A2B3">Quarantine pending</text>
            </g>

            <!-- 3: Bin Assignment -->
            <g class="node process-node" data-id="bin-assignment">
              <rect class="node-bg" x="460" y="180" width="180" height="50" rx="6"/>
              <rect class="node-accent" x="460" y="180" width="4" height="50" rx="2" fill="#14B8A6"/>
              <text class="node-title" x="476" y="202" font-size="12" font-weight="600">Bin Assignment</text>
              <text class="node-desc" x="476" y="217" font-size="10" fill="#98A2B3">Zone A, Bin 12</text>
            </g>

            <!-- 4: Stock Level Updated -->
            <g class="node automation-node" data-id="stock-updated">
              <rect class="node-bg" x="460" y="250" width="180" height="40" rx="6" fill="#EEF2FF" stroke="#A5B4FC" stroke-width="1" stroke-dasharray="4 4"/>
              <rect class="node-accent" x="460" y="250" width="3" height="40" rx="1.5" fill="#6366F1"/>
              <text class="node-title" x="475" y="275" font-size="11" font-weight="600" fill="#4338CA">⚡ Auto: Stock Updated</text>
            </g>

            <!-- 5: Inventory Record -->
            <g class="node process-node" data-id="inventory-record">
              <rect class="node-bg" x="460" y="320" width="180" height="50" rx="6"/>
              <rect class="node-accent" x="460" y="320" width="4" height="50" rx="2" fill="#14B8A6"/>
              <text class="node-title" x="476" y="342" font-size="12" font-weight="600">Inventory Record</text>
              <text class="node-desc" x="476" y="357" font-size="10" fill="#98A2B3">INV-2026-001 created</text>
            </g>

            <!-- 6: Finance Notified -->
            <g class="node handoff-node" data-id="finance-notified">
              <rect class="node-bg" x="460" y="420" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1"/>
              <rect class="node-accent" x="460" y="420" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="476" y="442" font-size="12" font-weight="600">Finance Notified</text>
              <text class="node-desc" x="476" y="457" font-size="10" fill="#98A2B3">Payment can begin</text>
            </g>

            <!-- 7: Inventory Complete -->
            <g class="node completion-node" data-id="inventory-complete">
              <rect class="node-bg" x="460" y="490" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5"/>
              <rect class="node-accent" x="460" y="490" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="476" y="512" font-size="12" font-weight="700" fill="#065F46">Inventory Complete</text>
              <text class="node-desc" x="476" y="527" font-size="10" fill="#98A2B3">Goods available for issue</text>
            </g>
          </g>

        </svg>`,
  "wf-07": `<svg id="svg-wf-07" viewBox="0 0 1000 580" class="diagram-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="arrow-wf07" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,1 L10,5 L0,9 L2,5 z" fill="#667085"/></marker>
            <marker id="arrow-exception-wf07" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,1 L10,5 L0,9 L2,5 z" fill="#EF4444"/></marker>
          </defs>

          <!-- Department Lanes -->
          <g class="layer-departments">
            <rect class="dept-lane" x="0" y="0" width="1000" height="300" opacity="0.3" fill="#F59E0B"/>
            <rect class="dept-lane" x="0" y="300" width="1000" height="100" opacity="0.3" fill="#667085"/>
            <text x="16" y="154" font-size="11" fill="#F59E0B" font-weight="600">LOGISTICS</text>
            <text x="16" y="354" font-size="11" fill="#667085" font-weight="600">CUSTOMER</text>
          </g>

          <!-- Connectors -->
          <g class="layer-connectors">
            <path class="connector" d="m 150 70 l 0 60" marker-end="url(#arrow-wf07)"/>
            <path class="connector" d="m 350 130 l 0 60" marker-end="url(#arrow-wf07)"/>
            <path class="connector" d="m 550 190 l 0 40" marker-end="url(#arrow-wf07)"/>
            <path class="connector" d="m 550 230 l 0 40" marker-end="url(#arrow-wf07)"/>
            <path class="connector" d="m 550 270 l 0 50" marker-end="url(#arrow-wf07)"/>
            <path class="connector" d="m 550 320 l 0 30" marker-end="url(#arrow-wf07)"/>
            <path class="connector" d="m 550 350 l 0 30" marker-end="url(#arrow-wf07)"/>
            <!-- Reschedule loop -->
            <path class="connector exception-path" d="m 700 290 l -100 0 l 0 -40" marker-end="url(#arrow-exception-wf07)" stroke="#EF4444" stroke-dasharray="6 4" fill="none"/>
          </g>

          <!-- Process Nodes -->
          <g class="layer-process">
            <!-- 0: Shipment Prep -->
            <g class="node process-node" data-id="shipment-prep">
              <rect class="node-bg" x="60" y="40" width="180" height="50" rx="6"/>
              <rect class="node-accent" x="60" y="40" width="4" height="50" rx="2" fill="#F59E0B"/>
              <text class="node-title" x="76" y="62" font-size="12" font-weight="600">Shipment Preparation</text>
              <text class="node-desc" x="76" y="77" font-size="10" fill="#98A2B3">Pick, pack, label</text>
            </g>

            <!-- 1: Shipment Dispatched -->
            <g class="node milestone-node" data-id="shipment-dispatched">
              <rect class="node-bg" x="260" y="100" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1"/>
              <rect class="node-accent" x="260" y="100" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="276" y="122" font-size="12" font-weight="600">Shipment Dispatched</text>
              <text class="node-desc" x="276" y="137" font-size="10" fill="#98A2B3">Carrier: TRK-2026-001</text>
            </g>

            <!-- 2: In Transit -->
            <g class="node process-node" data-id="in-transit">
              <rect class="node-bg" x="460" y="160" width="180" height="50" rx="6"/>
              <rect class="node-accent" x="460" y="160" width="4" height="50" rx="2" fill="#F59E0B"/>
              <text class="node-title" x="476" y="182" font-size="12" font-weight="600">In Transit</text>
              <text class="node-desc" x="476" y="197" font-size="10" fill="#98A2B3">Real-time tracking</text>
            </g>

            <!-- 3: Delivery Attempted -->
            <g class="node decision-node" data-id="delivery-attempted">
              <polygon points="550,220 600,250 550,280 500,250" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1.5"/>
              <text x="550" y="248" text-anchor="middle" font-size="10" font-weight="600" fill="#92400E">Delivery</text>
              <text x="550" y="260" text-anchor="middle" font-size="9" fill="#92400E">OK?</text>
            </g>

            <!-- 4: Reschedule -->
            <g class="node process-node" data-id="reschedule">
              <rect class="node-bg" x="700" y="250" width="160" height="50" rx="6" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1"/>
              <rect class="node-accent" x="700" y="250" width="4" height="50" rx="2" fill="#F59E0B"/>
              <text class="node-title" x="716" y="272" font-size="12" font-weight="600">Reschedule</text>
              <text class="node-desc" x="716" y="287" font-size="10" fill="#98A2B3">Next time slot</text>
            </g>

            <!-- 5: Customer Delivery -->
            <g class="node handoff-node" data-id="customer-delivery">
              <rect class="node-bg" x="460" y="320" width="180" height="50" rx="6" fill="#F9FAFB" stroke="#667085" stroke-width="1"/>
              <rect class="node-accent" x="460" y="320" width="4" height="50" rx="2" fill="#667085"/>
              <text class="node-title" x="476" y="342" font-size="12" font-weight="600">Customer Delivery</text>
              <text class="node-desc" x="476" y="357" font-size="10" fill="#98A2B3">Signed proof of delivery</text>
            </g>

            <!-- 6: Delivery Complete -->
            <g class="node completion-node" data-id="delivery-complete">
              <rect class="node-bg" x="460" y="380" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5"/>
              <rect class="node-accent" x="460" y="380" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="476" y="402" font-size="12" font-weight="700" fill="#065F46">Delivery Complete</text>
              <text class="node-desc" x="476" y="417" font-size="10" fill="#98A2B3">Order fulfilled</text>
            </g>
          </g>

          <!-- Labels -->
          <g class="layer-labels">
            <text x="500" y="305" text-anchor="middle" font-size="9" fill="#10B981" font-weight="600">YES</text>
            <text x="620" y="245" text-anchor="middle" font-size="9" fill="#EF4444" font-weight="600">NO</text>
          </g>

        </svg>`,
  "wf-08": `<svg id="svg-wf-08" viewBox="0 0 1000 580" class="diagram-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="arrow-wf08" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,1 L10,5 L0,9 L2,5 z" fill="#667085"/></marker>
            <marker id="arrow-exception-wf08" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,1 L10,5 L0,9 L2,5 z" fill="#EF4444"/></marker>
          </defs>

          <!-- Department Lanes -->
          <g class="layer-departments">
            <rect class="dept-lane" x="0" y="0" width="1000" height="160" opacity="0.3" fill="#14B8A6"/>
            <rect class="dept-lane" x="0" y="160" width="1000" height="160" opacity="0.3" fill="#8B5CF6"/>
            <rect class="dept-lane" x="0" y="320" width="1000" height="80" opacity="0.3" fill="#4338CA"/>
            <rect class="dept-lane" x="0" y="400" width="1000" height="160" opacity="0.3" fill="#F59E0B"/>
            <text x="16" y="84" font-size="11" fill="#14B8A6" font-weight="600">STORE</text>
            <text x="16" y="244" font-size="11" fill="#8B5CF6" font-weight="600">PURCHASE</text>
            <text x="16" y="364" font-size="11" fill="#4338CA" font-weight="600">MANAGEMENT</text>
            <text x="16" y="484" font-size="11" fill="#F59E0B" font-weight="600">LOGISTICS</text>
          </g>

          <!-- Connectors -->
          <g class="layer-connectors">
            <!-- exception-trigger → exception-classification -->
            <path class="connector" d="m 150 80 l 0 15" marker-end="url(#arrow-wf08)"/>
            <!-- exception-classification → quality-review (left branch) -->
            <path class="connector exception-path" d="m 150 150 l 0 10" marker-end="url(#arrow-exception-wf08)" stroke="#EF4444" stroke-dasharray="6 4" fill="none"/>
            <text x="110" y="165" text-anchor="middle" font-size="9" fill="#EF4444" font-weight="600">Quality</text>
            <!-- exception-classification → logistics-escalation (right branch) -->
            <path class="connector exception-path" d="m 200 120 l 60 0 l 0 30" marker-end="url(#arrow-exception-wf08)" stroke="#EF4444" stroke-dasharray="6 4" fill="none"/>
            <text x="260" y="115" text-anchor="middle" font-size="9" fill="#F59E0B" font-weight="600">Damage</text>
            <!-- quality-review → root-cause-analysis (diagonal) -->
            <path class="connector" d="m 250 195 l 0 15 l 200 0 l 0 15" marker-end="url(#arrow-wf08)"/>
            <!-- logistics-escalation → root-cause-analysis (diagonal) -->
            <path class="connector" d="m 450 195 l 0 15 l 10 0 l 0 15" marker-end="url(#arrow-wf08)"/>
            <!-- root-cause-analysis → escalation-decision -->
            <path class="connector" d="m 550 280 l 0 10" marker-end="url(#arrow-wf08)"/>
            <!-- escalation-decision YES → escalated-to-mgmt -->
            <path class="connector" d="m 600 320 l 50 0" marker-end="url(#arrow-wf08)"/>
            <text x="630" y="310" text-anchor="middle" font-size="9" fill="#4338CA" font-weight="600">YES</text>
            <!-- escalation-decision NO → resolution-plan -->
            <path class="connector" d="m 500 320 l 0 20" marker-end="url(#arrow-wf08)"/>
            <text x="480" y="340" text-anchor="middle" font-size="9" fill="#10B981" font-weight="600">NO</text>
            <!-- escalated-to-mgmt → management-decision -->
            <path class="connector" d="m 750 340 l 0 10" marker-end="url(#arrow-wf08)"/>
            <!-- management-decision → return-to-vendor -->
            <path class="connector exception-path" d="m 750 410 l 0 20" marker-end="url(#arrow-exception-wf08)" stroke="#EF4444" stroke-dasharray="6 4" fill="none"/>
            <!-- resolution-plan → resolution-applied -->
            <path class="connector" d="m 550 400 l 0 10" marker-end="url(#arrow-wf08)"/>
            <!-- resolution-applied → process-recovery -->
            <path class="connector" d="m 550 450 l 0 10" marker-end="url(#arrow-wf08)"/>
            <!-- process-recovery → exception-closed (diagonal) -->
            <path class="connector" d="m 650 475 l 0 15 l 10 0 l 0 15" marker-end="url(#arrow-wf08)"/>
          </g>

          <!-- Process Nodes -->
          <g class="layer-process">
            <!-- 0: Exception Trigger -->
            <g class="node exception-node" data-id="exception-trigger">
              <rect class="node-bg" x="60" y="30" width="180" height="50" rx="6" fill="#FEF2F2" stroke="#EF4444" stroke-width="1.5"/>
              <rect class="node-accent" x="60" y="30" width="4" height="50" rx="2" fill="#EF4444"/>
              <text class="node-title" x="76" y="52" font-size="12" font-weight="600" fill="#991B1B">Exception Trigger</text>
              <text class="node-desc" x="76" y="67" font-size="10" fill="#98A2B3">Quantity/quality mismatch detected</text>
            </g>

            <!-- 1: Exception Classification -->
            <g class="node decision-node" data-id="exception-classification">
              <polygon points="150,90 200,120 150,150 100,120" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1.5"/>
              <text x="150" y="118" text-anchor="middle" font-size="10" font-weight="600" fill="#92400E">Classify</text>
              <text x="150" y="130" text-anchor="middle" font-size="9" fill="#92400E">Type?</text>
            </g>

            <!-- 2: Quality Review -->
            <g class="node process-node" data-id="quality-review">
              <rect class="node-bg" x="60" y="170" width="180" height="50" rx="6" fill="#FEF2F2" stroke="#EF4444" stroke-width="1"/>
              <rect class="node-accent" x="60" y="170" width="4" height="50" rx="2" fill="#EF4444"/>
              <text class="node-title" x="76" y="192" font-size="12" font-weight="600">Quality Review</text>
              <text class="node-desc" x="76" y="207" font-size="10" fill="#98A2B3">Inspect defective goods</text>
            </g>

            <!-- 3: Logistics Escalation -->
            <g class="node process-node" data-id="logistics-escalation">
              <rect class="node-bg" x="260" y="170" width="180" height="50" rx="6" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1"/>
              <rect class="node-accent" x="260" y="170" width="4" height="50" rx="2" fill="#F59E0B"/>
              <text class="node-title" x="276" y="192" font-size="12" font-weight="600">Logistics Escalation</text>
              <text class="node-desc" x="276" y="207" font-size="10" fill="#98A2B3">Transit damage investigation</text>
            </g>

            <!-- 4: Root Cause Analysis -->
            <g class="node process-node" data-id="root-cause-analysis">
              <rect class="node-bg" x="460" y="230" width="180" height="50" rx="6"/>
              <rect class="node-accent" x="460" y="230" width="4" height="50" rx="2" fill="#8B5CF6"/>
              <text class="node-title" x="476" y="252" font-size="12" font-weight="600">Root Cause Analysis</text>
              <text class="node-desc" x="476" y="267" font-size="10" fill="#98A2B3">Investigate why exception occurred</text>
            </g>

            <!-- 5: Escalation Decision -->
            <g class="node decision-node" data-id="escalation-decision">
              <polygon points="550,290 600,320 550,350 500,320" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1.5"/>
              <text x="550" y="318" text-anchor="middle" font-size="10" font-weight="600" fill="#92400E">Escalate?</text>
              <text x="550" y="330" text-anchor="middle" font-size="9" fill="#92400E">Yes/No</text>
            </g>

            <!-- 6: Escalated to Management -->
            <g class="node handoff-node" data-id="escalated-to-mgmt">
              <rect class="node-bg" x="660" y="290" width="160" height="50" rx="6" fill="#EEF2FF" stroke="#4338CA" stroke-width="1"/>
              <rect class="node-accent" x="660" y="290" width="4" height="50" rx="2" fill="#4338CA"/>
              <text class="node-title" x="676" y="312" font-size="12" font-weight="600">Escalated to Mgmt</text>
              <text class="node-desc" x="676" y="327" font-size="10" fill="#98A2B3">Management review</text>
            </g>

            <!-- 7: Management Decision -->
            <g class="node decision-node" data-id="management-decision">
              <polygon points="750,350 800,380 750,410 700,380" fill="#EEF2FF" stroke="#4338CA" stroke-width="1.5"/>
              <text x="750" y="378" text-anchor="middle" font-size="10" font-weight="600" fill="#4338CA">Decision?</text>
              <text x="750" y="390" text-anchor="middle" font-size="9" fill="#4338CA">Accept/Reject</text>
            </g>

            <!-- 8: Return to Vendor -->
            <g class="node exception-node" data-id="return-to-vendor">
              <rect class="node-bg" x="660" y="430" width="160" height="50" rx="6" fill="#FEF2F2" stroke="#EF4444" stroke-width="1"/>
              <rect class="node-accent" x="660" y="430" width="4" height="50" rx="2" fill="#EF4444"/>
              <text class="node-title" x="676" y="452" font-size="12" font-weight="600">Return to Vendor</text>
              <text class="node-desc" x="676" y="467" font-size="10" fill="#98A2B3">Goods returned</text>
            </g>

            <!-- 9: Resolution Plan -->
            <g class="node process-node" data-id="resolution-plan">
              <rect class="node-bg" x="460" y="350" width="180" height="50" rx="6"/>
              <rect class="node-accent" x="460" y="350" width="4" height="50" rx="2" fill="#8B5CF6"/>
              <text class="node-title" x="476" y="372" font-size="12" font-weight="600">Resolution Plan</text>
              <text class="node-desc" x="476" y="387" font-size="10" fill="#98A2B3">Actions + timeline</text>
            </g>

            <!-- 10: Resolution Applied -->
            <g class="node process-node" data-id="resolution-applied">
              <rect class="node-bg" x="460" y="410" width="180" height="50" rx="6"/>
              <rect class="node-accent" x="460" y="410" width="4" height="50" rx="2" fill="#8B5CF6"/>
              <text class="node-title" x="476" y="432" font-size="12" font-weight="600">Resolution Applied</text>
              <text class="node-desc" x="476" y="447" font-size="10" fill="#98A2B3">Execute fix</text>
            </g>

            <!-- 11: Process Recovery -->
            <g class="node process-node" data-id="process-recovery">
              <rect class="node-bg" x="460" y="460" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1"/>
              <rect class="node-accent" x="460" y="460" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="476" y="482" font-size="12" font-weight="600">Process Recovery</text>
              <text class="node-desc" x="476" y="497" font-size="10" fill="#98A2B3">Restore normal flow</text>
            </g>

            <!-- 12: Exception Closed -->
            <g class="node completion-node" data-id="exception-closed">
              <rect class="node-bg" x="660" y="510" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5"/>
              <rect class="node-accent" x="660" y="510" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="676" y="532" font-size="12" font-weight="700" fill="#065F46">Exception Closed</text>
              <text class="node-desc" x="676" y="547" font-size="10" fill="#98A2B3">Resolved + lessons learned</text>
            </g>
          </g>

        </svg>`,
  "wf-09": `<svg id="svg-wf-09" viewBox="0 0 1000 580" class="diagram-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="arrow-wf09" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,1 L10,5 L0,9 L2,5 z" fill="#667085"/></marker>
          </defs>

          <!-- Department Lanes -->
          <g class="layer-departments">
            <rect class="dept-lane" x="0" y="0" width="1000" height="100" opacity="0.3" fill="#3B82F6"/>
            <rect class="dept-lane" x="0" y="100" width="1000" height="100" opacity="0.3" fill="#8B5CF6"/>
            <rect class="dept-lane" x="0" y="200" width="1000" height="100" opacity="0.3" fill="#14B8A6"/>
            <rect class="dept-lane" x="0" y="300" width="1000" height="100" opacity="0.3" fill="#F59E0B"/>
            <rect class="dept-lane" x="0" y="400" width="1000" height="100" opacity="0.3" fill="#10B981"/>
            <text x="16" y="54" font-size="11" fill="#3B82F6" font-weight="600">SALES</text>
            <text x="16" y="154" font-size="11" fill="#8B5CF6" font-weight="600">PURCHASE</text>
            <text x="16" y="254" font-size="11" fill="#14B8A6" font-weight="600">STORE</text>
            <text x="16" y="354" font-size="11" fill="#F59E0B" font-weight="600">LOGISTICS</text>
            <text x="16" y="454" font-size="11" fill="#10B981" font-weight="600">FINANCE</text>
          </g>

          <!-- Connectors -->
          <g class="layer-connectors">
            <path class="connector handoff" d="m 150 70 l 0 60" marker-end="url(#arrow-wf09)"/>
            <path class="connector handoff" d="m 150 130 l 0 30" marker-end="url(#arrow-wf09)"/>
            <path class="connector handoff" d="m 350 150 l 0 60" marker-end="url(#arrow-wf09)"/>
            <path class="connector handoff" d="m 350 210 l 0 30" marker-end="url(#arrow-wf09)"/>
            <path class="connector handoff" d="m 550 230 l 0 60" marker-end="url(#arrow-wf09)"/>
            <path class="connector handoff" d="m 550 290 l 0 30" marker-end="url(#arrow-wf09)"/>
            <path class="connector handoff" d="m 750 310 l 0 60" marker-end="url(#arrow-wf09)"/>
            <path class="connector handoff" d="m 750 370 l 0 30" marker-end="url(#arrow-wf09)"/>
            <path class="connector handoff" d="m 550 390 l 0 40" marker-end="url(#arrow-wf09)"/>
          </g>

          <!-- Process Nodes -->
          <g class="layer-process">
            <!-- 0: Task Created -->
            <g class="node process-node" data-id="task-created">
              <rect class="node-bg" x="60" y="40" width="180" height="50" rx="6"/>
              <rect class="node-accent" x="60" y="40" width="4" height="50" rx="2" fill="#3B82F6"/>
              <text class="node-title" x="76" y="62" font-size="12" font-weight="600">Task Created</text>
              <text class="node-desc" x="76" y="77" font-size="10" fill="#98A2B3">Sales initiates task</text>
            </g>

            <!-- 1: Handoff 1 -->
            <g class="node handoff-node" data-id="handoff-1">
              <rect class="node-bg" x="60" y="100" width="180" height="50" rx="6" fill="#EEF2FF" stroke="#8B5CF6" stroke-width="1"/>
              <rect class="node-accent" x="60" y="100" width="4" height="50" rx="2" fill="#8B5CF6"/>
              <text class="node-title" x="76" y="122" font-size="12" font-weight="600">Handoff: Sales → Purchase</text>
              <text class="node-desc" x="76" y="137" font-size="10" fill="#98A2B3">Transfer task + specs</text>
            </g>

            <!-- 2: Handoff 1 Acknowledged -->
            <g class="node milestone-node" data-id="handoff-1-complete">
              <rect class="node-bg" x="260" y="120" width="160" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1"/>
              <rect class="node-accent" x="260" y="120" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="276" y="142" font-size="12" font-weight="600">Acknowledged ✓</text>
              <text class="node-desc" x="276" y="157" font-size="10" fill="#98A2B3">Purchase confirms</text>
            </g>

            <!-- 3: Purchase Processing -->
            <g class="node process-node" data-id="purchase-processing">
              <rect class="node-bg" x="260" y="180" width="180" height="50" rx="6"/>
              <rect class="node-accent" x="260" y="180" width="4" height="50" rx="2" fill="#8B5CF6"/>
              <text class="node-title" x="276" y="202" font-size="12" font-weight="600">Purchase Processing</text>
              <text class="node-desc" x="276" y="217" font-size="10" fill="#98A2B3">Vendor sourcing + PO</text>
            </g>

            <!-- 4: Handoff 2 -->
            <g class="node handoff-node" data-id="handoff-2">
              <rect class="node-bg" x="260" y="240" width="180" height="50" rx="6" fill="#EEF2FF" stroke="#14B8A6" stroke-width="1"/>
              <rect class="node-accent" x="260" y="240" width="4" height="50" rx="2" fill="#14B8A6"/>
              <text class="node-title" x="276" y="262" font-size="12" font-weight="600">Handoff: Purchase → Store</text>
              <text class="node-desc" x="276" y="277" font-size="10" fill="#98A2B3">Transfer PO + inspection</text>
            </g>

            <!-- 5: Handoff 2 Acknowledged -->
            <g class="node milestone-node" data-id="handoff-2-complete">
              <rect class="node-bg" x="460" y="260" width="160" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1"/>
              <rect class="node-accent" x="460" y="260" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="476" y="282" font-size="12" font-weight="600">Acknowledged ✓</text>
              <text class="node-desc" x="476" y="297" font-size="10" fill="#98A2B3">Store confirms</text>
            </g>

            <!-- 6: Store Verification -->
            <g class="node process-node" data-id="store-verification">
              <rect class="node-bg" x="460" y="320" width="180" height="50" rx="6"/>
              <rect class="node-accent" x="460" y="320" width="4" height="50" rx="2" fill="#14B8A6"/>
              <text class="node-title" x="476" y="342" font-size="12" font-weight="600">Store Verification</text>
              <text class="node-desc" x="476" y="357" font-size="10" fill="#98A2B3">Quality check + inventory</text>
            </g>

            <!-- 7: Handoff 3 -->
            <g class="node handoff-node" data-id="handoff-3">
              <rect class="node-bg" x="460" y="380" width="180" height="50" rx="6" fill="#EEF2FF" stroke="#10B981" stroke-width="1"/>
              <rect class="node-accent" x="460" y="380" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="476" y="402" font-size="12" font-weight="600">Handoff: Store → Finance</text>
              <text class="node-desc" x="476" y="417" font-size="10" fill="#98A2B3">Transfer GRN + invoice</text>
            </g>

            <!-- 8: Handoff 3 Acknowledged -->
            <g class="node milestone-node" data-id="handoff-3-complete">
              <rect class="node-bg" x="660" y="390" width="160" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1"/>
              <rect class="node-accent" x="660" y="390" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="676" y="412" font-size="12" font-weight="600">Acknowledged ✓</text>
              <text class="node-desc" x="676" y="427" font-size="10" fill="#98A2B3">Finance confirms</text>
            </g>

            <!-- 9: Finance Processing -->
            <g class="node process-node" data-id="finance-processing">
              <rect class="node-bg" x="460" y="430" width="180" height="50" rx="6"/>
              <rect class="node-accent" x="460" y="430" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="476" y="452" font-size="12" font-weight="600">Finance Processing</text>
              <text class="node-desc" x="476" y="467" font-size="10" fill="#98A2B3">Invoice + payment</text>
            </g>

            <!-- 10: Task Completed -->
            <g class="node completion-node" data-id="task-completed">
              <rect class="node-bg" x="660" y="470" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5"/>
              <rect class="node-accent" x="660" y="470" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="676" y="492" font-size="12" font-weight="700" fill="#065F46">Task Completed</text>
              <text class="node-desc" x="676" y="507" font-size="10" fill="#98A2B3">3 handoffs, 5 depts</text>
            </g>
          </g>

          <!-- Handoff Indicators -->
          <g class="layer-handoffs">
            <g transform="translate(260, 100)">
              <rect width="100" height="18" rx="4" fill="#EEF2FF" stroke="#A5B4FC" stroke-width="1"/>
              <text x="50" y="13" text-anchor="middle" font-size="8" font-weight="600" fill="#6366F1">ACK REQUIRED</text>
            </g>
            <g transform="translate(460, 240)">
              <rect width="100" height="18" rx="4" fill="#EEF2FF" stroke="#A5B4FC" stroke-width="1"/>
              <text x="50" y="13" text-anchor="middle" font-size="8" font-weight="600" fill="#6366F1">ACK REQUIRED</text>
            </g>
            <g transform="translate(660, 370)">
              <rect width="100" height="18" rx="4" fill="#EEF2FF" stroke="#A5B4FC" stroke-width="1"/>
              <text x="50" y="13" text-anchor="middle" font-size="8" font-weight="600" fill="#6366F1">ACK REQUIRED</text>
            </g>
          </g>

        </svg>`,
  "wf-10": `<svg id="svg-wf-10" viewBox="0 0 1000 580" class="diagram-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="arrow-wf10" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,1 L10,5 L0,9 L2,5 z" fill="#667085"/></marker>
            <marker id="arrow-exception-wf10" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,1 L10,5 L0,9 L2,5 z" fill="#EF4444"/></marker>
          </defs>

          <!-- Department Lanes -->
          <g class="layer-departments">
            <rect class="dept-lane" x="0" y="0" width="1000" height="400" opacity="0.3" fill="#4338CA"/>
            <rect class="dept-lane" x="0" y="400" width="1000" height="160" opacity="0.3" fill="#8B5CF6"/>
            <text x="16" y="204" font-size="11" fill="#4338CA" font-weight="600">MANAGEMENT</text>
            <text x="16" y="484" font-size="11" fill="#8B5CF6" font-weight="600">PURCHASE</text>
          </g>

          <!-- Connectors -->
          <g class="layer-connectors">
            <!-- dashboard-view → exception-detected (vertical) -->
            <path class="connector" d="m 150 80 l 0 30" marker-end="url(#arrow-wf10)"/>
            <!-- exception-detected → exception-analysis (diagonal) -->
            <path class="connector" d="m 250 145 l 0 15 l 10 0 l 0 15" marker-end="url(#arrow-wf10)"/>
            <!-- exception-analysis → resolution-decided (diagonal) -->
            <path class="connector" d="m 450 205 l 0 15 l 10 0 l 0 15" marker-end="url(#arrow-wf10)"/>
            <!-- resolution-decided → intervention-plan -->
            <path class="connector" d="m 510 250 l 0 20" marker-end="url(#arrow-wf10)"/>
            <!-- intervention-plan → dept-notification (vertical) -->
            <path class="connector" d="m 550 320 l 0 20" marker-end="url(#arrow-wf10)"/>
            <!-- dept-notification → intervention-executed (crosses Management→Purchase) -->
            <path class="connector handoff" d="m 550 390 l 0 30" marker-end="url(#arrow-wf10)"/>
            <circle class="handoff-dot" cx="550" cy="400" r="4"/>
            <!-- intervention-plan → resolution-verified (diagonal back) -->
            <path class="connector" d="m 460 295 l 0 15 l -100 0 l 0 15" marker-end="url(#arrow-wf10)"/>
            <!-- resolution-verified → control-tower-closed (vertical) -->
            <path class="connector" d="m 350 380 l 0 20" marker-end="url(#arrow-wf10)"/>
            <!-- control-tower-closed → lessons-learned (crosses Management→Purchase) -->
            <path class="connector handoff" d="m 350 450 l 0 10" marker-end="url(#arrow-wf10)"/>
            <circle class="handoff-dot" cx="350" cy="400" r="4"/>
            <!-- Loop back for partial resolution -->
            <path class="connector exception-path" d="m 260 330 l 0 -100" marker-end="url(#arrow-exception-wf10)" stroke="#EF4444" stroke-dasharray="6 4" fill="none"/>
          </g>

          <!-- Process Nodes -->
          <g class="layer-process">
            <!-- 0: Dashboard View -->
            <g class="node process-node" data-id="dashboard-view">
              <rect class="node-bg" x="60" y="30" width="180" height="50" rx="6"/>
              <rect class="node-accent" x="60" y="30" width="4" height="50" rx="2" fill="#4338CA"/>
              <text class="node-title" x="76" y="52" font-size="12" font-weight="600">Dashboard View</text>
              <text class="node-desc" x="76" y="67" font-size="10" fill="#98A2B3">Real-time KPIs &amp; alerts</text>
            </g>

            <!-- 1: Exception Detected -->
            <g class="node exception-node" data-id="exception-detected">
              <rect class="node-bg" x="60" y="120" width="180" height="50" rx="6" fill="#FEF2F2" stroke="#EF4444" stroke-width="1.5"/>
              <rect class="node-accent" x="60" y="120" width="4" height="50" rx="2" fill="#EF4444"/>
              <text class="node-title" x="76" y="142" font-size="12" font-weight="600" fill="#991B1B">Exception Detected</text>
              <text class="node-desc" x="76" y="157" font-size="10" fill="#98A2B3">PO delivery delayed</text>
            </g>

            <!-- 2: Exception Analysis -->
            <g class="node process-node" data-id="exception-analysis">
              <rect class="node-bg" x="260" y="180" width="180" height="50" rx="6"/>
              <rect class="node-accent" x="260" y="180" width="4" height="50" rx="2" fill="#4338CA"/>
              <text class="node-title" x="276" y="202" font-size="12" font-weight="600">Exception Analysis</text>
              <text class="node-desc" x="276" y="217" font-size="10" fill="#98A2B3">Root cause investigation</text>
            </g>

            <!-- 3: Resolution Decision -->
            <g class="node decision-node" data-id="resolution-decided">
              <polygon points="510,200 550,220 510,240 470,220" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1.5"/>
              <text x="510" y="218" text-anchor="middle" font-size="10" font-weight="600" fill="#92400E">Resolution</text>
              <text x="510" y="230" text-anchor="middle" font-size="9" fill="#92400E">Approach?</text>
            </g>

            <!-- 4: Intervention Plan -->
            <g class="node process-node" data-id="intervention-plan">
              <rect class="node-bg" x="460" y="270" width="180" height="50" rx="6"/>
              <rect class="node-accent" x="460" y="270" width="4" height="50" rx="2" fill="#4338CA"/>
              <text class="node-title" x="476" y="292" font-size="12" font-weight="600">Intervention Plan</text>
              <text class="node-desc" x="476" y="307" font-size="10" fill="#98A2B3">Actions + timeline</text>
            </g>

            <!-- 5: Department Notification -->
            <g class="node handoff-node" data-id="dept-notification">
              <rect class="node-bg" x="460" y="340" width="180" height="50" rx="6" fill="#EEF2FF" stroke="#8B5CF6" stroke-width="1"/>
              <rect class="node-accent" x="460" y="340" width="4" height="50" rx="2" fill="#8B5CF6"/>
              <text class="node-title" x="476" y="362" font-size="12" font-weight="600">Dept Notification</text>
              <text class="node-desc" x="476" y="377" font-size="10" fill="#98A2B3">Purchase + Sales + Finance</text>
            </g>

            <!-- 6: Resolution Verified -->
            <g class="node verification-node" data-id="resolution-verified">
              <rect class="node-bg" x="260" y="300" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1"/>
              <rect class="node-accent" x="260" y="300" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="276" y="322" font-size="12" font-weight="600">Resolution Verified</text>
              <text class="node-desc" x="276" y="337" font-size="10" fill="#98A2B3">5 checks confirmed</text>
            </g>

            <!-- 7: Intervention Executed -->
            <g class="node process-node" data-id="intervention-executed">
              <rect class="node-bg" x="460" y="420" width="180" height="50" rx="6"/>
              <rect class="node-accent" x="460" y="420" width="4" height="50" rx="2" fill="#8B5CF6"/>
              <text class="node-title" x="476" y="442" font-size="12" font-weight="600">Intervention Executed</text>
              <text class="node-desc" x="476" y="457" font-size="10" fill="#98A2B3">Vendor expedited</text>
            </g>

            <!-- 8: Control Tower Closed -->
            <g class="node completion-node" data-id="control-tower-closed">
              <rect class="node-bg" x="260" y="390" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5"/>
              <rect class="node-accent" x="260" y="390" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="276" y="412" font-size="12" font-weight="700" fill="#065F46">Case Closed</text>
              <text class="node-desc" x="276" y="427" font-size="10" fill="#98A2B3">Monitoring resumed</text>
            </g>

            <!-- 9: Lessons Learned -->
            <g class="node process-node" data-id="lessons-learned">
              <rect class="node-bg" x="260" y="460" width="180" height="50" rx="6"/>
              <rect class="node-accent" x="260" y="460" width="4" height="50" rx="2" fill="#4338CA"/>
              <text class="node-title" x="276" y="482" font-size="12" font-weight="600">Lessons Learned</text>
              <text class="node-desc" x="276" y="497" font-size="10" fill="#98A2B3">Process improvements</text>
            </g>
          </g>

          <!-- Labels -->
          <g class="layer-labels">
            <text x="400" y="240" text-anchor="middle" font-size="9" fill="#4338CA" font-weight="600">3 options</text>
            <text x="210" y="310" text-anchor="middle" font-size="9" fill="#EF4444" font-weight="600">Partial?</text>
          </g>

        </svg>`,
  "store-qc": `<svg id="svg-store-qc" viewBox="0 0 1000 580" class="diagram-svg" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow-store-qc" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,1 L10,5 L0,9 L2,5 z" fill="#667085"/></marker>
    <marker id="arrow-ex-store-qc" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,1 L10,5 L0,9 L2,5 z" fill="#EF4444"/></marker>
  </defs>
  <g class="layer-departments">
    <rect class="dept-lane" x="0" y="0" width="1000" height="150" opacity="0.3" fill="#F59E0B"/>
    <text x="16" y="36" font-size="11" fill="#F59E0B" font-weight="600">LOGISTICS · INBOUND</text>
    <rect class="dept-lane" x="0" y="150" width="1000" height="280" opacity="0.3" fill="#14B8A6"/>
    <text x="16" y="282" font-size="11" fill="#14B8A6" font-weight="600">STORE · QC &amp; INVENTORY</text>
    <rect class="dept-lane" x="0" y="430" width="1000" height="150" opacity="0.3" fill="#F59E0B"/>
    <text x="16" y="497" font-size="11" fill="#F59E0B" font-weight="600">LOGISTICS · OUTBOUND</text>
  </g>
  <g class="layer-connectors">
    <path class="connector" fill="none" d="M150,100 L150,154" marker-end="url(#arrow-store-qc)"/>
    <circle class="handoff-dot" cx="150" cy="124" r="4"/>
    <path class="connector" fill="none" d="M315,185 L334,185" marker-end="url(#arrow-store-qc)"/>
    <path class="connector" fill="none" d="M525,185 L589,185" marker-end="url(#arrow-store-qc)"/>
    <path class="connector" fill="none" d="M710,185 L754,185" marker-end="url(#arrow-store-qc)"/>
    <text x="738" y="164" text-anchor="middle" font-size="9" fill="#10B981" font-weight="600">Accepted</text>
    <path class="connector exception-path" fill="none" d="M650,220 C650,270 315,275 220,282 L220,324" marker-end="url(#arrow-ex-store-qc)"/>
    <text x="350" y="255" text-anchor="middle" font-size="9" fill="#EF4444" font-weight="600">Hold</text>
    <path class="connector exception-path" fill="none" d="M710,185 L710,240 C710,300 830,300 830,324" marker-end="url(#arrow-ex-store-qc)"/>
    <text x="810" y="274" text-anchor="middle" font-size="9" fill="#EF4444" font-weight="600">Rejected / Damaged</text>
    <path class="connector" fill="none" d="M315,345 L349,345" marker-end="url(#arrow-store-qc)"/>
    <path class="connector" fill="none" d="M410,345 L410,326 L945,326 L945,185 L940,185" marker-end="url(#arrow-store-qc)"/>
    <text x="520" y="322" text-anchor="middle" font-size="9" fill="#10B981" font-weight="600">Release to inventory</text>
    <path class="connector exception-path" fill="none" d="M410,355 L754,355" marker-end="url(#arrow-ex-store-qc)"/>
    <text x="640" y="376" text-anchor="middle" font-size="9" fill="#EF4444" font-weight="600">Reject after inspection</text>
    <path class="connector" fill="none" d="M945,185 L942,185 L942,155 L120,155 L120,470 L490,470 Q490,470 490,484" marker-end="url(#arrow-store-qc)"/>
    <circle class="handoff-dot" cx="975" cy="430" r="4"/>
    <path class="connector" fill="none" d="M585,505 L754,505" marker-end="url(#arrow-store-qc)"/>
    <path class="connector exception-path" fill="none" d="M945,355 L945,465 L985,465 Q995,465 995,455 L995,26 Q995,16 985,16 L160,16 Q150,16 150,26 L150,39" marker-end="url(#arrow-ex-store-qc)"/>
    <text x="560" y="34" text-anchor="middle" font-size="9" fill="#EF4444" font-weight="600">Re-source · recovery loop</text>
  </g>
  <g class="layer-process">
    <g class="node process-node" data-id="goods-arrive">
      <rect class="node-bg" x="60" y="45" width="180" height="50" rx="6"/>
      <rect class="node-accent" x="60" y="45" width="4" height="50" rx="2" fill="#F59E0B"/>
      <text class="node-title" x="76" y="67" font-size="12" font-weight="600">Goods Arrive at Store</text>
      <text class="node-desc" x="76" y="82" font-size="10" fill="#98A2B3">Checked vs PO &amp; challan</text>
    </g>
    <g class="node process-node" data-id="physical-verify">
      <rect class="node-bg" x="130" y="160" width="180" height="50" rx="6"/>
      <rect class="node-accent" x="130" y="160" width="4" height="50" rx="2" fill="#14B8A6"/>
      <text class="node-title" x="146" y="182" font-size="12" font-weight="600">Physical Verification</text>
      <text class="node-desc" x="146" y="197" font-size="10" fill="#98A2B3">6 checks vs GRN &amp; PO</text>
    </g>
    <g class="node handoff-node" data-id="grn">
      <rect class="node-bg" x="340" y="160" width="180" height="50" rx="6"/>
      <rect class="node-accent" x="340" y="160" width="4" height="50" rx="2" fill="#8B5CF6"/>
      <text class="node-title" x="356" y="182" font-size="12" font-weight="600">GRN Created</text>
      <text class="node-desc" x="356" y="197" font-size="10" fill="#98A2B3">Tagged as received in ERP</text>
    </g>
    <g class="node decision-node" data-id="qc-assessment">
      <polygon points="650,155 705,185 650,215 595,185" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1.5"/>
      <text x="650" y="179" text-anchor="middle" font-size="10" font-weight="600" fill="#92400E">QC Assessment</text>
      <text x="650" y="192" text-anchor="middle" font-size="8.5" fill="#92400E">Acc · Hold · Reject</text>
    </g>
    <g class="node process-node" data-id="inventory-update">
      <rect class="node-bg" x="760" y="160" width="180" height="50" rx="6"/>
      <rect class="node-accent" x="760" y="160" width="4" height="50" rx="2" fill="#14B8A6"/>
      <text class="node-title" x="776" y="182" font-size="12" font-weight="600">Inventory Updated</text>
      <text class="node-desc" x="776" y="197" font-size="10" fill="#98A2B3">Usable stock, allocated</text>
    </g>
    <g class="node exception-node" data-id="hold-material">
      <rect class="node-bg" x="130" y="330" width="180" height="50" rx="6" fill="#FEF2F2" stroke="#FECACA" stroke-width="1.5"/>
      <rect class="node-accent" x="130" y="330" width="4" height="50" rx="2" fill="#EF4444"/>
      <text class="node-title" x="146" y="352" font-size="12" font-weight="600" fill="#EF4444">Material on Hold</text>
      <text class="node-desc" x="146" y="367" font-size="10" fill="#5F6B7A">Restricted — inspection</text>
    </g>
    <g class="node decision-node" data-id="hold-release">
      <polygon points="380,315 405,345 380,375 355,345" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1.5"/>
      <text x="380" y="338" text-anchor="middle" font-size="10" font-weight="600" fill="#92400E">Hold Resolution</text>
      <text x="380" y="351" text-anchor="middle" font-size="8.5" fill="#92400E">Release / Reject</text>
    </g>
    <g class="node exception-node" data-id="qc-rejection">
      <rect class="node-bg" x="760" y="330" width="180" height="50" rx="6" fill="#FEF2F2" stroke="#FECACA" stroke-width="1.5"/>
      <rect class="node-accent" x="760" y="330" width="4" height="50" rx="2" fill="#EF4444"/>
      <text class="node-title" x="776" y="352" font-size="12" font-weight="600" fill="#EF4444">QC Rejection</text>
      <text class="node-desc" x="776" y="367" font-size="10" fill="#5F6B7A">Vendor re-supply required</text>
    </g>
    <g class="node process-node" data-id="fulfilment">
      <rect class="node-bg" x="400" y="480" width="180" height="50" rx="6"/>
      <rect class="node-accent" x="400" y="480" width="4" height="50" rx="2" fill="#F59E0B"/>
      <text class="node-title" x="416" y="502" font-size="12" font-weight="600">Order Fulfilment</text>
      <text class="node-desc" x="416" y="517" font-size="10" fill="#98A2B3">Pick, pack &amp; dispatch</text>
    </g>
    <g class="node completion-node" data-id="complete">
      <rect class="node-bg" x="760" y="480" width="180" height="50" rx="6" fill="#10B981"/>
      <text class="node-title" x="776" y="502" font-size="12" font-weight="600" fill="#FFFFFF">Transaction Complete</text>
      <text class="node-desc" x="776" y="517" font-size="10" fill="#FFFFFF" opacity="0.9">All exceptions resolved</text>
    </g>
  </g>
</svg>`,
  "auto-01": `<svg id="svg-auto-01" viewBox="0 0 1000 580" class="diagram-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="arrow-auto01" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,1 L10,5 L0,9 L2,5 z" fill="#667085"/></marker>
          </defs>

          <!-- Department Lanes -->
          <g class="layer-departments">
            <rect class="dept-lane" x="0" y="0" width="1000" height="300" opacity="0.3" fill="#6366F1"/>
            <rect class="dept-lane" x="0" y="300" width="1000" height="100" opacity="0.3" fill="#8B5CF6"/>
            <text x="16" y="154" font-size="11" fill="#6366F1" font-weight="600">ERP SYSTEM</text>
            <text x="16" y="354" font-size="11" fill="#8B5CF6" font-weight="600">PURCHASE</text>
          </g>

          <!-- Connectors -->
          <g class="layer-connectors">
            <path class="connector automation-path" d="m 150 70 l 0 60" marker-end="url(#arrow-auto01)" stroke="#6366F1" stroke-dasharray="4 4" fill="none"/>
            <path class="connector automation-path" d="m 350 130 l 0 40" marker-end="url(#arrow-auto01)" stroke="#6366F1" stroke-dasharray="4 4" fill="none"/>
            <path class="connector automation-path" d="m 550 170 l 0 40" marker-end="url(#arrow-auto01)" stroke="#6366F1" stroke-dasharray="4 4" fill="none"/>
            <path class="connector" d="m 550 210 l 0 60" marker-end="url(#arrow-auto01)"/>
            <path class="connector automation-path" d="m 550 270 l 0 40" marker-end="url(#arrow-auto01)" stroke="#6366F1" stroke-dasharray="4 4" fill="none"/>
            <path class="connector handoff" d="m 550 310 l 0 40" marker-end="url(#arrow-auto01)"/>
          </g>

          <!-- Process Nodes -->
          <g class="layer-process">
            <!-- 0: Trigger Event -->
            <g class="node automation-node" data-id="trigger-event">
              <rect class="node-bg" x="60" y="40" width="180" height="50" rx="6" fill="#EEF2FF" stroke="#A5B4FC" stroke-width="1" stroke-dasharray="4 4"/>
              <rect class="node-accent" x="60" y="40" width="3" height="50" rx="1.5" fill="#6366F1"/>
              <text class="node-title" x="75" y="62" font-size="12" font-weight="600" fill="#4338CA">⚡ Trigger Event</text>
              <text class="node-desc" x="75" y="77" font-size="10" fill="#98A2B3">Business event detected</text>
            </g>

            <!-- 1: Task Created -->
            <g class="node automation-node" data-id="task-created">
              <rect class="node-bg" x="260" y="100" width="180" height="50" rx="6" fill="#EEF2FF" stroke="#A5B4FC" stroke-width="1" stroke-dasharray="4 4"/>
              <rect class="node-accent" x="260" y="100" width="3" height="50" rx="1.5" fill="#6366F1"/>
              <text class="node-title" x="275" y="122" font-size="12" font-weight="600" fill="#4338CA">⚡ Task Created</text>
              <text class="node-desc" x="275" y="137" font-size="10" fill="#98A2B3">Auto-generated T-2026-001</text>
            </g>

            <!-- 2: Task Assigned -->
            <g class="node automation-node" data-id="task-assigned">
              <rect class="node-bg" x="460" y="140" width="180" height="50" rx="6" fill="#EEF2FF" stroke="#A5B4FC" stroke-width="1" stroke-dasharray="4 4"/>
              <rect class="node-accent" x="460" y="140" width="3" height="50" rx="1.5" fill="#6366F1"/>
              <text class="node-title" x="475" y="162" font-size="12" font-weight="600" fill="#4338CA">⚡ Task Assigned</text>
              <text class="node-desc" x="475" y="177" font-size="10" fill="#98A2B3">Auto-assigned to Purchase</text>
            </g>

            <!-- 3: Task Processing -->
            <g class="node process-node" data-id="task-processing">
              <rect class="node-bg" x="460" y="200" width="180" height="50" rx="6"/>
              <rect class="node-accent" x="460" y="200" width="4" height="50" rx="2" fill="#8B5CF6"/>
              <text class="node-title" x="476" y="222" font-size="12" font-weight="600">Task Processing</text>
              <text class="node-desc" x="476" y="237" font-size="10" fill="#98A2B3">Purchase works on task</text>
            </g>

            <!-- 4: Handoff Initiated -->
            <g class="node automation-node" data-id="handoff-initiated">
              <rect class="node-bg" x="460" y="270" width="180" height="50" rx="6" fill="#EEF2FF" stroke="#A5B4FC" stroke-width="1" stroke-dasharray="4 4"/>
              <rect class="node-accent" x="460" y="270" width="3" height="50" rx="1.5" fill="#6366F1"/>
              <text class="node-title" x="475" y="292" font-size="12" font-weight="600" fill="#4338CA">⚡ Handoff Initiated</text>
              <text class="node-desc" x="475" y="307" font-size="10" fill="#98A2B3">Auto → Store dept</text>
            </g>

            <!-- 5: Handoff Complete -->
            <g class="node milestone-node" data-id="handoff-complete">
              <rect class="node-bg" x="460" y="330" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1"/>
              <rect class="node-accent" x="460" y="330" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="476" y="352" font-size="12" font-weight="600">Handoff Complete</text>
              <text class="node-desc" x="476" y="367" font-size="10" fill="#98A2B3">Store acknowledged</text>
            </g>
          </g>

        </svg>`,
  "auto-02": `<svg id="svg-auto-02" viewBox="0 0 1000 580" class="diagram-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="arrow-auto02" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,1 L10,5 L0,9 L2,5 z" fill="#667085"/></marker>
            <marker id="arrow-exception-auto02" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,1 L10,5 L0,9 L2,5 z" fill="#EF4444"/></marker>
          </defs>

          <!-- Department Lanes -->
          <g class="layer-departments">
            <rect class="dept-lane" x="0" y="0" width="1000" height="300" opacity="0.3" fill="#6366F1"/>
            <rect class="dept-lane" x="0" y="300" width="1000" height="180" opacity="0.3" fill="#4338CA"/>
            <text x="16" y="154" font-size="11" fill="#6366F1" font-weight="600">ERP SYSTEM</text>
            <text x="16" y="394" font-size="11" fill="#4338CA" font-weight="600">MANAGEMENT</text>
          </g>

          <!-- Connectors -->
          <g class="layer-connectors">
            <path class="connector automation-path" d="m 150 70 l 0 60" marker-end="url(#arrow-auto02)" stroke="#6366F1" stroke-dasharray="4 4" fill="none"/>
            <path class="connector exception-path" d="m 350 130 l 0 40" marker-end="url(#arrow-exception-auto02)" stroke="#EF4444" stroke-dasharray="6 4" fill="none"/>
            <path class="connector automation-path" d="m 550 170 l 0 40" marker-end="url(#arrow-auto02)" stroke="#6366F1" stroke-dasharray="4 4" fill="none"/>
            <path class="connector" d="m 550 210 l 0 60" marker-end="url(#arrow-auto02)"/>
            <path class="connector" d="m 550 270 l 0 60" marker-end="url(#arrow-auto02)"/>
            <path class="connector" d="m 550 330 l 0 40" marker-end="url(#arrow-auto02)"/>
          </g>

          <!-- Process Nodes -->
          <g class="layer-process">
            <!-- 0: SLA Monitoring -->
            <g class="node automation-node" data-id="sla-monitoring">
              <rect class="node-bg" x="60" y="40" width="180" height="50" rx="6" fill="#EEF2FF" stroke="#A5B4FC" stroke-width="1" stroke-dasharray="4 4"/>
              <rect class="node-accent" x="60" y="40" width="3" height="50" rx="1.5" fill="#6366F1"/>
              <text class="node-title" x="75" y="62" font-size="12" font-weight="600" fill="#4338CA">⚡ SLA Monitoring</text>
              <text class="node-desc" x="75" y="77" font-size="10" fill="#98A2B3">Real-time tracking</text>
            </g>

            <!-- 1: SLA Breach Detected -->
            <g class="node exception-node" data-id="sla-breach-detected">
              <rect class="node-bg" x="260" y="100" width="180" height="50" rx="6" fill="#FEF2F2" stroke="#EF4444" stroke-width="1.5"/>
              <rect class="node-accent" x="260" y="100" width="4" height="50" rx="2" fill="#EF4444"/>
              <text class="node-title" x="276" y="122" font-size="12" font-weight="600" fill="#991B1B">SLA Breach Detected</text>
              <text class="node-desc" x="276" y="137" font-size="10" fill="#98A2B3">4 hrs remaining</text>
            </g>

            <!-- 2: Escalation Triggered -->
            <g class="node automation-node" data-id="escalation-triggered">
              <rect class="node-bg" x="460" y="140" width="180" height="50" rx="6" fill="#EEF2FF" stroke="#A5B4FC" stroke-width="1" stroke-dasharray="4 4"/>
              <rect class="node-accent" x="460" y="140" width="3" height="50" rx="1.5" fill="#6366F1"/>
              <text class="node-title" x="475" y="162" font-size="12" font-weight="600" fill="#4338CA">⚡ Escalation Triggered</text>
              <text class="node-desc" x="475" y="177" font-size="10" fill="#98A2B3">Auto-escalate to mgmt</text>
            </g>

            <!-- 3: Resolution Plan -->
            <g class="node process-node" data-id="resolution-plan">
              <rect class="node-bg" x="460" y="250" width="180" height="50" rx="6" fill="#EEF2FF" stroke="#4338CA" stroke-width="1"/>
              <rect class="node-accent" x="460" y="250" width="4" height="50" rx="2" fill="#4338CA"/>
              <text class="node-title" x="476" y="272" font-size="12" font-weight="600">Resolution Plan</text>
              <text class="node-desc" x="476" y="287" font-size="10" fill="#98A2B3">Reassign + expedite</text>
            </g>

            <!-- 4: SLA Restored -->
            <g class="node completion-node" data-id="sla-restored">
              <rect class="node-bg" x="460" y="340" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5"/>
              <rect class="node-accent" x="460" y="340" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="476" y="362" font-size="12" font-weight="700" fill="#065F46">SLA Restored</text>
              <text class="node-desc" x="476" y="377" font-size="10" fill="#98A2B3">Task back on track</text>
            </g>
          </g>

          <!-- Labels -->
          <g class="layer-labels">
            <text x="350" y="155" text-anchor="middle" font-size="9" fill="#EF4444" font-weight="600">BREACH</text>
          </g>

        </svg>`,
  "auto-03": `<svg id="svg-auto-03" viewBox="0 0 1000 580" class="diagram-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="arrow-auto03" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,1 L10,5 L0,9 L2,5 z" fill="#667085"/></marker>
            <marker id="arrow-exception-auto03" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,1 L10,5 L0,9 L2,5 z" fill="#EF4444"/></marker>
          </defs>

          <!-- Department Lanes -->
          <g class="layer-departments">
            <rect class="dept-lane" x="0" y="0" width="1000" height="200" opacity="0.3" fill="#6366F1"/>
            <rect class="dept-lane" x="0" y="200" width="1000" height="100" opacity="0.3" fill="#F59E0B"/>
            <rect class="dept-lane" x="0" y="300" width="1000" height="100" opacity="0.3" fill="#667085"/>
            <text x="16" y="104" font-size="11" fill="#6366F1" font-weight="600">ERP SYSTEM</text>
            <text x="16" y="254" font-size="11" fill="#F59E0B" font-weight="600">LOGISTICS</text>
            <text x="16" y="354" font-size="11" fill="#667085" font-weight="600">CUSTOMER</text>
          </g>

          <!-- Connectors -->
          <g class="layer-connectors">
            <path class="connector automation-path" d="m 150 70 l 0 60" marker-end="url(#arrow-auto03)" stroke="#6366F1" stroke-dasharray="4 4" fill="none"/>
            <path class="connector automation-path" d="m 350 130 l 0 40" marker-end="url(#arrow-auto03)" stroke="#6366F1" stroke-dasharray="4 4" fill="none"/>
            <path class="connector" d="m 550 170 l 0 40" marker-end="url(#arrow-auto03)"/>
            <path class="connector" d="m 550 210 l 0 40" marker-end="url(#arrow-auto03)"/>
            <path class="connector" d="m 550 250 l 0 40" marker-end="url(#arrow-auto03)"/>
            <path class="connector" d="m 550 290 l 0 40" marker-end="url(#arrow-auto03)"/>
            <path class="connector exception-path" d="m 700 310 l 0 40" marker-end="url(#arrow-exception-auto03)" stroke="#EF4444" stroke-dasharray="6 4" fill="none"/>
          </g>

          <!-- Process Nodes -->
          <g class="layer-process">
            <!-- 0: ETA Calculated -->
            <g class="node automation-node" data-id="eta-calculated">
              <rect class="node-bg" x="60" y="40" width="180" height="50" rx="6" fill="#EEF2FF" stroke="#A5B4FC" stroke-width="1" stroke-dasharray="4 4"/>
              <rect class="node-accent" x="60" y="40" width="3" height="50" rx="1.5" fill="#6366F1"/>
              <text class="node-title" x="75" y="62" font-size="12" font-weight="600" fill="#4338CA">⚡ ETA Calculated</text>
              <text class="node-desc" x="75" y="77" font-size="10" fill="#98A2B3">Initial: 3 days</text>
            </g>

            <!-- 1: Shipment Tracking -->
            <g class="node automation-node" data-id="shipment-tracking">
              <rect class="node-bg" x="260" y="100" width="180" height="50" rx="6" fill="#EEF2FF" stroke="#A5B4FC" stroke-width="1" stroke-dasharray="4 4"/>
              <rect class="node-accent" x="260" y="100" width="3" height="50" rx="1.5" fill="#6366F1"/>
              <text class="node-title" x="275" y="122" font-size="12" font-weight="600" fill="#4338CA">⚡ Shipment Tracking</text>
              <text class="node-desc" x="275" y="137" font-size="10" fill="#98A2B3">Real-time updates</text>
            </g>

            <!-- 2: ETA Updated -->
            <g class="node milestone-node" data-id="eta-updated">
              <rect class="node-bg" x="460" y="140" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1"/>
              <rect class="node-accent" x="460" y="140" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="476" y="162" font-size="12" font-weight="600">ETA Updated</text>
              <text class="node-desc" x="476" y="177" font-size="10" fill="#98A2B3">2.5 days now</text>
            </g>

            <!-- 3: ETA Finalized -->
            <g class="node decision-node" data-id="eta-finalized">
              <polygon points="550,210 600,240 550,270 500,240" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1.5"/>
              <text x="550" y="238" text-anchor="middle" font-size="10" font-weight="600" fill="#92400E">On Time?</text>
            </g>

            <!-- 4: Delay Notification -->
            <g class="node handoff-node" data-id="delay-notification">
              <rect class="node-bg" x="660" y="290" width="160" height="50" rx="6" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1"/>
              <rect class="node-accent" x="660" y="290" width="4" height="50" rx="2" fill="#F59E0B"/>
              <text class="node-title" x="676" y="312" font-size="12" font-weight="600">Delay Notification</text>
              <text class="node-desc" x="676" y="327" font-size="10" fill="#98A2B3">Notify customer</text>
            </g>

            <!-- 5: Delivery Confirmed -->
            <g class="node process-node" data-id="delivery-confirmed">
              <rect class="node-bg" x="460" y="310" width="180" height="50" rx="6"/>
              <rect class="node-accent" x="460" y="310" width="4" height="50" rx="2" fill="#667085"/>
              <text class="node-title" x="476" y="332" font-size="12" font-weight="600">Delivery Confirmed</text>
              <text class="node-desc" x="476" y="347" font-size="10" fill="#98A2B3">POD captured</text>
            </g>

            <!-- 6: ETA Complete -->
            <g class="node completion-node" data-id="eta-complete">
              <rect class="node-bg" x="460" y="360" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5"/>
              <rect class="node-accent" x="460" y="360" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="476" y="382" font-size="12" font-weight="700" fill="#065F46">ETA Complete</text>
              <text class="node-desc" x="476" y="397" font-size="10" fill="#98A2B3">On schedule</text>
            </g>
          </g>

          <!-- Labels -->
          <g class="layer-labels">
            <text x="500" y="305" text-anchor="middle" font-size="9" fill="#10B981" font-weight="600">YES</text>
            <text x="620" y="240" text-anchor="middle" font-size="9" fill="#EF4444" font-weight="600">NO</text>
          </g>

        </svg>`,
  "auto-04": `<svg id="svg-auto-04" viewBox="0 0 1000 580" class="diagram-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="arrow-auto04" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,1 L10,5 L0,9 L2,5 z" fill="#667085"/></marker>
          </defs>

          <!-- Department Lanes -->
          <g class="layer-departments">
            <rect class="dept-lane" x="0" y="0" width="1000" height="200" opacity="0.3" fill="#6366F1"/>
            <rect class="dept-lane" x="0" y="200" width="1000" height="200" opacity="0.3" fill="#8B5CF6"/>
            <text x="16" y="104" font-size="11" fill="#6366F1" font-weight="600">ERP SYSTEM</text>
            <text x="16" y="304" font-size="11" fill="#8B5CF6" font-weight="600">PURCHASE</text>
          </g>

          <!-- Connectors -->
          <g class="layer-connectors">
            <path class="connector automation-path" d="m 150 70 l 0 40" marker-end="url(#arrow-auto04)" stroke="#6366F1" stroke-dasharray="4 4" fill="none"/>
            <path class="connector automation-path" d="m 350 110 l 0 40" marker-end="url(#arrow-auto04)" stroke="#6366F1" stroke-dasharray="4 4" fill="none"/>
            <path class="connector automation-path" d="m 550 150 l 0 40" marker-end="url(#arrow-auto04)" stroke="#6366F1" stroke-dasharray="4 4" fill="none"/>
            <path class="connector" d="m 550 190 l 0 60" marker-end="url(#arrow-auto04)"/>
            <path class="connector" d="m 550 250 l 0 40" marker-end="url(#arrow-auto04)"/>
            <path class="connector" d="m 550 290 l 0 40" marker-end="url(#arrow-auto04)"/>
          </g>

          <!-- Process Nodes -->
          <g class="layer-process">
            <!-- 0: Exception Detected -->
            <g class="node automation-node" data-id="exception-detected">
              <rect class="node-bg" x="60" y="40" width="180" height="50" rx="6" fill="#EEF2FF" stroke="#A5B4FC" stroke-width="1" stroke-dasharray="4 4"/>
              <rect class="node-accent" x="60" y="40" width="3" height="50" rx="1.5" fill="#6366F1"/>
              <text class="node-title" x="75" y="62" font-size="12" font-weight="600" fill="#4338CA">⚡ Exception Detected</text>
              <text class="node-desc" x="75" y="77" font-size="10" fill="#98A2B3">Auto-logged EXC-001</text>
            </g>

            <!-- 1: Exception Classified -->
            <g class="node automation-node" data-id="exception-classified">
              <rect class="node-bg" x="260" y="80" width="180" height="50" rx="6" fill="#EEF2FF" stroke="#A5B4FC" stroke-width="1" stroke-dasharray="4 4"/>
              <rect class="node-accent" x="260" y="80" width="3" height="50" rx="1.5" fill="#6366F1"/>
              <text class="node-title" x="275" y="102" font-size="12" font-weight="600" fill="#4338CA">⚡ Classified</text>
              <text class="node-desc" x="275" y="117" font-size="10" fill="#98A2B3">Quantity mismatch</text>
            </g>

            <!-- 2: Exception Routed -->
            <g class="node automation-node" data-id="exception-routed">
              <rect class="node-bg" x="460" y="120" width="180" height="50" rx="6" fill="#EEF2FF" stroke="#A5B4FC" stroke-width="1" stroke-dasharray="4 4"/>
              <rect class="node-accent" x="460" y="120" width="3" height="50" rx="1.5" fill="#6366F1"/>
              <text class="node-title" x="475" y="142" font-size="12" font-weight="600" fill="#4338CA">⚡ Routed</text>
              <text class="node-desc" x="475" y="157" font-size="10" fill="#98A2B3">→ Purchase dept</text>
            </g>

            <!-- 3: Exception Acknowledged -->
            <g class="node milestone-node" data-id="exception-acknowledged">
              <rect class="node-bg" x="460" y="200" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1"/>
              <rect class="node-accent" x="460" y="200" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="476" y="222" font-size="12" font-weight="600">Acknowledged</text>
              <text class="node-desc" x="476" y="237" font-size="10" fill="#98A2B3">Purchase acknowledged</text>
            </g>

            <!-- 4: Exception Resolved -->
            <g class="node process-node" data-id="exception-resolved">
              <rect class="node-bg" x="460" y="260" width="180" height="50" rx="6"/>
              <rect class="node-accent" x="460" y="260" width="4" height="50" rx="2" fill="#8B5CF6"/>
              <text class="node-title" x="476" y="282" font-size="12" font-weight="600">Exception Resolved</text>
              <text class="node-desc" x="476" y="297" font-size="10" fill="#98A2B3">Inventory adjusted</text>
            </g>

            <!-- 5: Exception Closed -->
            <g class="node completion-node" data-id="exception-closed">
              <rect class="node-bg" x="460" y="320" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5"/>
              <rect class="node-accent" x="460" y="320" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="476" y="342" font-size="12" font-weight="700" fill="#065F46">Exception Closed</text>
              <text class="node-desc" x="476" y="357" font-size="10" fill="#98A2B3">Auto-resolved</text>
            </g>
          </g>

        </svg>`,
  "auto-05": `<svg id="svg-auto-05" viewBox="0 0 1000 580" class="diagram-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="arrow-auto05" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,1 L10,5 L0,9 L2,5 z" fill="#667085"/></marker>
            <marker id="arrow-exception-auto05" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,1 L10,5 L0,9 L2,5 z" fill="#EF4444"/></marker>
          </defs>

          <!-- Department Lanes -->
          <g class="layer-departments">
            <rect class="dept-lane" x="0" y="0" width="1000" height="300" opacity="0.3" fill="#6366F1"/>
            <rect class="dept-lane" x="0" y="300" width="1000" height="180" opacity="0.3" fill="#4338CA"/>
            <text x="16" y="154" font-size="11" fill="#6366F1" font-weight="600">ERP SYSTEM</text>
            <text x="16" y="394" font-size="11" fill="#4338CA" font-weight="600">MANAGEMENT</text>
          </g>

          <!-- Connectors -->
          <g class="layer-connectors">
            <path class="connector" d="m 150 70 l 0 60" marker-end="url(#arrow-auto05)"/>
            <path class="connector" d="m 350 130 l 0 40" marker-end="url(#arrow-auto05)"/>
            <path class="connector" d="m 550 170 l 0 40" marker-end="url(#arrow-auto05)"/>
            <path class="connector" d="m 550 210 l 0 40" marker-end="url(#arrow-auto05)"/>
            <path class="connector" d="m 550 250 l 0 60" marker-end="url(#arrow-auto05)"/>
            <path class="connector" d="m 550 310 l 0 40" marker-end="url(#arrow-auto05)"/>
            <path class="connector" d="m 550 350 l 0 30" marker-end="url(#arrow-auto05)"/>
            <!-- Exception loop -->
            <path class="connector exception-path" d="m 350 130 l 0 100 l -200 0 l 0 -40" marker-end="url(#arrow-exception-auto05)" stroke="#EF4444" stroke-dasharray="6 4" fill="none"/>
          </g>

          <!-- Process Nodes -->
          <g class="layer-process">
            <!-- 0: Document Created -->
            <g class="node automation-node" data-id="doc-created">
              <rect class="node-bg" x="60" y="40" width="180" height="50" rx="6" fill="#EEF2FF" stroke="#A5B4FC" stroke-width="1" stroke-dasharray="4 4"/>
              <rect class="node-accent" x="60" y="40" width="3" height="50" rx="1.5" fill="#6366F1"/>
              <text class="node-title" x="75" y="62" font-size="12" font-weight="600" fill="#4338CA">⚡ Document Created</text>
              <text class="node-desc" x="75" y="77" font-size="10" fill="#98A2B3">Auto-generated in ERP</text>
            </g>

            <!-- 1: Compliance Check -->
            <g class="node verification-node" data-id="compliance-check">
              <rect class="node-bg" x="260" y="100" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1"/>
              <rect class="node-accent" x="260" y="100" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="276" y="122" font-size="12" font-weight="600">Compliance Check</text>
              <text class="node-desc" x="276" y="137" font-size="10" fill="#98A2B3">4 automated checks</text>
            </g>

            <!-- 2: Document Rejected -->
            <g class="node exception-node" data-id="doc-rejected">
              <rect class="node-bg" x="160" y="200" width="160" height="50" rx="6" fill="#FEF2F2" stroke="#EF4444" stroke-width="1"/>
              <rect class="node-accent" x="160" y="200" width="4" height="50" rx="2" fill="#EF4444"/>
              <text class="node-title" x="176" y="222" font-size="12" font-weight="600">Document Rejected</text>
              <text class="node-desc" x="176" y="237" font-size="10" fill="#98A2B3">Correction required</text>
            </g>

            <!-- 3: Document Validated -->
            <g class="node milestone-node" data-id="doc-validated">
              <rect class="node-bg" x="460" y="170" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1"/>
              <rect class="node-accent" x="460" y="170" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="476" y="192" font-size="12" font-weight="600">Document Validated</text>
              <text class="node-desc" x="476" y="207" font-size="10" fill="#98A2B3">All checks passed</text>
            </g>

            <!-- 4: Document Approved -->
            <g class="node process-node" data-id="doc-approved">
              <rect class="node-bg" x="460" y="280" width="180" height="50" rx="6" fill="#EEF2FF" stroke="#4338CA" stroke-width="1"/>
              <rect class="node-accent" x="460" y="280" width="4" height="50" rx="2" fill="#4338CA"/>
              <text class="node-title" x="476" y="302" font-size="12" font-weight="600">Document Approved</text>
              <text class="node-desc" x="476" y="317" font-size="10" fill="#98A2B3">Management sign-off</text>
            </g>

            <!-- 5: Document Archived -->
            <g class="node completion-node" data-id="doc-archived">
              <rect class="node-bg" x="460" y="340" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5"/>
              <rect class="node-accent" x="460" y="340" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="476" y="362" font-size="12" font-weight="700" fill="#065F46">Document Archived</text>
              <text class="node-desc" x="476" y="377" font-size="10" fill="#98A2B3">In ERP document store</text>
            </g>
          </g>

          <!-- Labels -->
          <g class="layer-labels">
            <text x="350" y="180" text-anchor="middle" font-size="9" fill="#10B981" font-weight="600">PASS</text>
            <text x="280" y="200" text-anchor="middle" font-size="9" fill="#EF4444" font-weight="600">FAIL</text>
          </g>

        </svg>`,
  "auto-06": `<svg id="svg-auto-06" viewBox="0 0 1000 580" class="diagram-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="arrow-auto06" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,1 L10,5 L0,9 L2,5 z" fill="#667085"/></marker>
          </defs>

          <!-- Department Lanes -->
          <g class="layer-departments">
            <rect class="dept-lane" x="0" y="0" width="1000" height="300" opacity="0.3" fill="#6366F1"/>
            <rect class="dept-lane" x="0" y="300" width="1000" height="180" opacity="0.3" fill="#4338CA"/>
            <text x="16" y="154" font-size="11" fill="#6366F1" font-weight="600">ERP SYSTEM</text>
            <text x="16" y="394" font-size="11" fill="#4338CA" font-weight="600">MANAGEMENT</text>
          </g>

          <!-- Connectors -->
          <g class="layer-connectors">
            <path class="connector automation-path" d="m 150 70 l 0 60" marker-end="url(#arrow-auto06)" stroke="#6366F1" stroke-dasharray="4 4" fill="none"/>
            <path class="connector automation-path" d="m 350 130 l 0 40" marker-end="url(#arrow-auto06)" stroke="#6366F1" stroke-dasharray="4 4" fill="none"/>
            <path class="connector automation-path" d="m 550 170 l 0 40" marker-end="url(#arrow-auto06)" stroke="#6366F1" stroke-dasharray="4 4" fill="none"/>
            <path class="connector handoff" d="m 550 210 l 0 60" marker-end="url(#arrow-auto06)"/>
            <path class="connector" d="m 550 270 l 0 60" marker-end="url(#arrow-auto06)"/>
            <path class="connector" d="m 550 330 l 0 40" marker-end="url(#arrow-auto06)"/>
          </g>

          <!-- Process Nodes -->
          <g class="layer-process">
            <!-- 0: Data Collected -->
            <g class="node automation-node" data-id="data-collected">
              <rect class="node-bg" x="60" y="40" width="180" height="50" rx="6" fill="#EEF2FF" stroke="#A5B4FC" stroke-width="1" stroke-dasharray="4 4"/>
              <rect class="node-accent" x="60" y="40" width="3" height="50" rx="1.5" fill="#6366F1"/>
              <text class="node-title" x="75" y="62" font-size="12" font-weight="600" fill="#4338CA">⚡ Data Collected</text>
              <text class="node-desc" x="75" y="77" font-size="10" fill="#98A2B3">5 modules, real-time</text>
            </g>

            <!-- 1: Analysis Complete -->
            <g class="node automation-node" data-id="analysis-complete">
              <rect class="node-bg" x="260" y="100" width="180" height="50" rx="6" fill="#EEF2FF" stroke="#A5B4FC" stroke-width="1" stroke-dasharray="4 4"/>
              <rect class="node-accent" x="260" y="100" width="3" height="50" rx="1.5" fill="#6366F1"/>
              <text class="node-title" x="275" y="122" font-size="12" font-weight="600" fill="#4338CA">⚡ Analysis Complete</text>
              <text class="node-desc" x="275" y="137" font-size="10" fill="#98A2B3">2 alerts triggered</text>
            </g>

            <!-- 2: Alert Generated -->
            <g class="node automation-node" data-id="alert-generated">
              <rect class="node-bg" x="460" y="140" width="180" height="50" rx="6" fill="#EEF2FF" stroke="#A5B4FC" stroke-width="1" stroke-dasharray="4 4"/>
              <rect class="node-accent" x="460" y="140" width="3" height="50" rx="1.5" fill="#6366F1"/>
              <text class="node-title" x="475" y="162" font-size="12" font-weight="600" fill="#4338CA">⚡ Alert Generated</text>
              <text class="node-desc" x="475" y="177" font-size="10" fill="#98A2B3">SLA compliance warning</text>
            </g>

            <!-- 3: Management Notified -->
            <g class="node handoff-node" data-id="management-notified">
              <rect class="node-bg" x="460" y="240" width="180" height="50" rx="6" fill="#EEF2FF" stroke="#4338CA" stroke-width="1"/>
              <rect class="node-accent" x="460" y="240" width="4" height="50" rx="2" fill="#4338CA"/>
              <text class="node-title" x="476" y="262" font-size="12" font-weight="600">Management Notified</text>
              <text class="node-desc" x="476" y="277" font-size="10" fill="#98A2B3">Dashboard + email</text>
            </g>

            <!-- 4: Dashboard Updated -->
            <g class="node milestone-node" data-id="dashboard-updated">
              <rect class="node-bg" x="460" y="300" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1"/>
              <rect class="node-accent" x="460" y="300" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="476" y="322" font-size="12" font-weight="600">Dashboard Updated</text>
              <text class="node-desc" x="476" y="337" font-size="10" fill="#98A2B3">Latest data + alerts</text>
            </g>

            <!-- 5: Alert Resolved -->
            <g class="node completion-node" data-id="alert-resolved">
              <rect class="node-bg" x="460" y="360" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5"/>
              <rect class="node-accent" x="460" y="360" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="476" y="382" font-size="12" font-weight="700" fill="#065F46">Alert Resolved</text>
              <text class="node-desc" x="476" y="397" font-size="10" fill="#98A2B3">Monitoring continues</text>
            </g>
          </g>

        </svg>`,
  "strat-01": `<svg id="svg-strat-01" viewBox="0 0 1000 580" class="diagram-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="arrow-strat01" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,1 L10,5 L0,9 L2,5 z" fill="#667085"/></marker>
          </defs>

          <!-- Before/After Labels -->
          <g class="layer-departments">
            <rect x="0" y="0" width="1000" height="240" opacity="0.15" fill="#EF4444" rx="8"/>
            <rect x="0" y="280" width="1000" height="280" opacity="0.15" fill="#10B981" rx="8"/>
            <text x="500" y="30" text-anchor="middle" font-size="16" font-weight="700" fill="#991B1B">BEFORE: Fragmented Process</text>
            <text x="500" y="310" text-anchor="middle" font-size="16" font-weight="700" fill="#065F46">AFTER: ERP-Connected Process</text>
          </g>

          <!-- Connectors -->
          <g class="layer-connectors">
            <path class="connector exception-path" d="m 150 100 l 0 40" marker-end="url(#arrow-strat01)" stroke="#EF4444" stroke-dasharray="6 4" fill="none"/>
            <path class="connector exception-path" d="m 350 140 l 0 40" marker-end="url(#arrow-strat01)" stroke="#EF4444" stroke-dasharray="6 4" fill="none"/>
            <path class="connector exception-path" d="m 550 180 l 0 40" marker-end="url(#arrow-strat01)" stroke="#EF4444" stroke-dasharray="6 4" fill="none"/>
            <path class="connector" d="m 150 400 l 0 40" marker-end="url(#arrow-strat01)" stroke="#10B981"/>
            <path class="connector automation-path" d="m 350 440 l 0 40" marker-end="url(#arrow-strat01)" stroke="#6366F1" stroke-dasharray="4 4" fill="none"/>
            <path class="connector" d="m 550 480 l 0 40" marker-end="url(#arrow-strat01)" stroke="#10B981"/>
          </g>

          <!-- Process Nodes -->
          <g class="layer-process">
            <!-- BEFORE -->
            <g class="node exception-node" data-id="current-start">
              <rect class="node-bg" x="60" y="70" width="180" height="50" rx="6" fill="#FEF2F2" stroke="#EF4444" stroke-width="1"/>
              <rect class="node-accent" x="60" y="70" width="4" height="50" rx="2" fill="#EF4444"/>
              <text class="node-title" x="76" y="92" font-size="12" font-weight="600" fill="#991B1B">Customer Inquiry</text>
              <text class="node-desc" x="76" y="107" font-size="10" fill="#98A2B3">Email/phone — no tracking</text>
            </g>

            <g class="node exception-node" data-id="current-silo-1">
              <rect class="node-bg" x="260" y="110" width="180" height="50" rx="6" fill="#FEF2F2" stroke="#EF4444" stroke-width="1"/>
              <rect class="node-accent" x="260" y="110" width="4" height="50" rx="2" fill="#EF4444"/>
              <text class="node-title" x="276" y="132" font-size="12" font-weight="600" fill="#991B1B">Sales Silo</text>
              <text class="node-desc" x="276" y="147" font-size="10" fill="#98A2B3">No visibility for others</text>
            </g>

            <g class="node exception-node" data-id="current-silo-2">
              <rect class="node-bg" x="460" y="150" width="180" height="50" rx="6" fill="#FEF2F2" stroke="#EF4444" stroke-width="1"/>
              <rect class="node-accent" x="460" y="150" width="4" height="50" rx="2" fill="#EF4444"/>
              <text class="node-title" x="476" y="172" font-size="12" font-weight="600" fill="#991B1B">Purchase Silo</text>
              <text class="node-desc" x="476" y="187" font-size="10" fill="#98A2B3">Email from Sales</text>
            </g>

            <g class="node exception-node" data-id="current-end">
              <rect class="node-bg" x="660" y="190" width="180" height="50" rx="6" fill="#FEF2F2" stroke="#EF4444" stroke-width="1"/>
              <rect class="node-accent" x="660" y="190" width="4" height="50" rx="2" fill="#EF4444"/>
              <text class="node-title" x="676" y="212" font-size="12" font-weight="600" fill="#991B1B">Manual Delivery</text>
              <text class="node-desc" x="676" y="227" font-size="10" fill="#98A2B3">Customer calls for updates</text>
            </g>

            <!-- AFTER -->
            <g class="node process-node" data-id="future-start">
              <rect class="node-bg" x="60" y="370" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1"/>
              <rect class="node-accent" x="60" y="370" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="76" y="392" font-size="12" font-weight="600" fill="#065F46">ERP: Inquiry Logged</text>
              <text class="node-desc" x="76" y="407" font-size="10" fill="#98A2B3">Central tracking</text>
            </g>

            <g class="node automation-node" data-id="future-connected-1">
              <rect class="node-bg" x="260" y="410" width="180" height="50" rx="6" fill="#EEF2FF" stroke="#A5B4FC" stroke-width="1" stroke-dasharray="4 4"/>
              <rect class="node-accent" x="260" y="410" width="3" height="50" rx="1.5" fill="#6366F1"/>
              <text class="node-title" x="275" y="432" font-size="12" font-weight="600" fill="#4338CA">⚡ Auto: Tasks Created</text>
              <text class="node-desc" x="275" y="447" font-size="10" fill="#98A2B3">All depts notified</text>
            </g>

            <g class="node process-node" data-id="future-connected-2">
              <rect class="node-bg" x="460" y="450" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1"/>
              <rect class="node-accent" x="460" y="450" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="476" y="472" font-size="12" font-weight="600" fill="#065F46">Connected Flow</text>
              <text class="node-desc" x="476" y="487" font-size="10" fill="#98A2B3">Real-time visibility</text>
            </g>

            <g class="node completion-node" data-id="future-end">
              <rect class="node-bg" x="660" y="490" width="180" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5"/>
              <rect class="node-accent" x="660" y="490" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="676" y="512" font-size="12" font-weight="700" fill="#065F46">End-to-End Visibility</text>
              <text class="node-desc" x="676" y="527" font-size="10" fill="#98A2B3">100% connected</text>
            </g>
          </g>

          <!-- Labels -->
          <g class="layer-labels">
            <text x="850" y="120" font-size="11" fill="#EF4444" font-weight="600">Siloed</text>
            <text x="850" y="420" font-size="11" fill="#10B981" font-weight="600">Connected</text>
          </g>

        </svg>`,
  "strat-02": `<svg id="svg-strat-02" viewBox="0 0 1000 580" class="diagram-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="arrow-strat02" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,1 L10,5 L0,9 L2,5 z" fill="#667085"/></marker>
          </defs>

          <!-- Labels -->
          <g class="layer-departments">
            <rect x="0" y="0" width="1000" height="300" opacity="0.1" fill="#EF4444" rx="8"/>
            <rect x="0" y="340" width="1000" height="200" opacity="0.1" fill="#10B981" rx="8"/>
            <text x="500" y="30" text-anchor="middle" font-size="14" font-weight="700" fill="#991B1B">CURRENT: Bottlenecks</text>
            <text x="500" y="370" text-anchor="middle" font-size="14" font-weight="700" fill="#065F46">ERP: Solutions</text>
          </g>

          <!-- Connectors -->
          <g class="layer-connectors">
            <path class="connector exception-path" d="m 150 80 l 0 40" marker-end="url(#arrow-strat02)" stroke="#EF4444" stroke-dasharray="6 4" fill="none"/>
            <path class="connector exception-path" d="m 350 120 l 0 40" marker-end="url(#arrow-strat02)" stroke="#EF4444" stroke-dasharray="6 4" fill="none"/>
            <path class="connector exception-path" d="m 550 160 l 0 40" marker-end="url(#arrow-strat02)" stroke="#EF4444" stroke-dasharray="6 4" fill="none"/>
            <path class="connector exception-path" d="m 750 200 l 0 40" marker-end="url(#arrow-strat02)" stroke="#EF4444" stroke-dasharray="6 4" fill="none"/>
            <path class="connector" d="m 150 420 l 0 40" marker-end="url(#arrow-strat02)" stroke="#10B981"/>
            <path class="connector" d="m 350 460 l 0 40" marker-end="url(#arrow-strat02)" stroke="#10B981"/>
            <path class="connector" d="m 550 500 l 0 40" marker-end="url(#arrow-strat02)" stroke="#10B981"/>
          </g>

          <!-- Process Nodes -->
          <g class="layer-process">
            <!-- Bottlenecks -->
            <g class="node exception-node" data-id="bottleneck-1">
              <rect class="node-bg" x="60" y="50" width="180" height="50" rx="6" fill="#FEF2F2" stroke="#EF4444" stroke-width="1"/>
              <rect class="node-accent" x="60" y="50" width="4" height="50" rx="2" fill="#EF4444"/>
              <text class="node-title" x="76" y="72" font-size="11" font-weight="600" fill="#991B1B">Inquiry: 2 days</text>
              <text class="node-desc" x="76" y="87" font-size="10" fill="#98A2B3">Manual processing</text>
            </g>

            <g class="node exception-node" data-id="bottleneck-2">
              <rect class="node-bg" x="260" y="90" width="180" height="50" rx="6" fill="#FEF2F2" stroke="#EF4444" stroke-width="1"/>
              <rect class="node-accent" x="260" y="90" width="4" height="50" rx="2" fill="#EF4444"/>
              <text class="node-title" x="276" y="112" font-size="11" font-weight="600" fill="#991B1B">Vendor: 3 days</text>
              <text class="node-desc" x="276" y="127" font-size="10" fill="#98A2B3">No vendor database</text>
            </g>

            <g class="node exception-node" data-id="bottleneck-3">
              <rect class="node-bg" x="460" y="130" width="180" height="50" rx="6" fill="#FEF2F2" stroke="#EF4444" stroke-width="1"/>
              <rect class="node-accent" x="460" y="130" width="4" height="50" rx="2" fill="#EF4444"/>
              <text class="node-title" x="476" y="152" font-size="11" font-weight="600" fill="#991B1B">QC: 1 day</text>
              <text class="node-desc" x="476" y="167" font-size="10" fill="#98A2B3">No checklist</text>
            </g>

            <g class="node exception-node" data-id="bottleneck-4">
              <rect class="node-bg" x="660" y="170" width="180" height="50" rx="6" fill="#FEF2F2" stroke="#EF4444" stroke-width="1"/>
              <rect class="node-accent" x="660" y="170" width="4" height="50" rx="2" fill="#EF4444"/>
              <text class="node-title" x="676" y="192" font-size="11" font-weight="600" fill="#991B1B">Invoice: 2 days</text>
              <text class="node-desc" x="676" y="207" font-size="10" fill="#98A2B3">Paper-based</text>
            </g>

            <g class="node exception-node" data-id="bottleneck-5">
              <rect class="node-bg" x="660" y="250" width="180" height="50" rx="6" fill="#FEF2F2" stroke="#EF4444" stroke-width="1"/>
              <rect class="node-accent" x="660" y="250" width="4" height="50" rx="2" fill="#EF4444"/>
              <text class="node-title" x="676" y="272" font-size="11" font-weight="600" fill="#991B1B">Visibility: Weekly</text>
              <text class="node-desc" x="676" y="287" font-size="10" fill="#98A2B3">No dashboard</text>
            </g>

            <!-- Solutions -->
            <g class="node automation-node" data-id="solution-1">
              <rect class="node-bg" x="60" y="390" width="180" height="50" rx="6" fill="#EEF2FF" stroke="#A5B4FC" stroke-width="1" stroke-dasharray="4 4"/>
              <rect class="node-accent" x="60" y="390" width="3" height="50" rx="1.5" fill="#6366F1"/>
              <text class="node-title" x="75" y="412" font-size="11" font-weight="600" fill="#4338CA">⚡ Auto-acknowledge</text>
              <text class="node-desc" x="75" y="427" font-size="10" fill="#98A2B3">Minutes, not days</text>
            </g>

            <g class="node automation-node" data-id="solution-complete">
              <rect class="node-bg" x="60" y="500" width="880" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5"/>
              <rect class="node-accent" x="60" y="500" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="500" y="522" text-anchor="middle" font-size="13" font-weight="700" fill="#065F46">ALL BOTTLENECKS RESOLVED — 80% faster</text>
            </g>
          </g>

        </svg>`,
  "strat-03": `<svg id="svg-strat-03" viewBox="0 0 1000 580" class="diagram-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="arrow-strat03" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,1 L10,5 L0,9 L2,5 z" fill="#667085"/></marker>
          </defs>

          <!-- Labels -->
          <g class="layer-departments">
            <rect x="0" y="0" width="400" height="540" opacity="0.1" fill="#EF4444" rx="8"/>
            <rect x="500" y="0" width="500" height="540" opacity="0.1" fill="#10B981" rx="8"/>
            <text x="200" y="30" text-anchor="middle" font-size="14" font-weight="700" fill="#991B1B">MANUAL (Current)</text>
            <text x="750" y="30" text-anchor="middle" font-size="14" font-weight="700" fill="#065F46">AUTOMATED (ERP)</text>
          </g>

          <!-- Connectors -->
          <g class="layer-connectors">
            <path class="connector" d="m 300 80 l 200 0" marker-end="url(#arrow-strat03)" stroke="#10B981"/>
            <path class="connector" d="m 300 160 l 200 0" marker-end="url(#arrow-strat03)" stroke="#10B981"/>
            <path class="connector" d="m 300 240 l 200 0" marker-end="url(#arrow-strat03)" stroke="#10B981"/>
            <path class="connector" d="m 300 320 l 200 0" marker-end="url(#arrow-strat03)" stroke="#10B981"/>
            <path class="connector" d="m 300 400 l 200 0" marker-end="url(#arrow-strat03)" stroke="#10B981"/>
          </g>

          <!-- Process Nodes -->
          <g class="layer-process">
            <!-- Manual -->
            <g class="node exception-node" data-id="manual-1">
              <rect class="node-bg" x="60" y="50" width="240" height="50" rx="6" fill="#FEF2F2" stroke="#EF4444" stroke-width="1"/>
              <rect class="node-accent" x="60" y="50" width="4" height="50" rx="2" fill="#EF4444"/>
              <text class="node-title" x="76" y="72" font-size="12" font-weight="600" fill="#991B1B">Data Entry (3 systems)</text>
              <text class="node-desc" x="76" y="87" font-size="10" fill="#98A2B3">Error rate: 5%</text>
            </g>

            <g class="node exception-node" data-id="manual-2">
              <rect class="node-bg" x="60" y="130" width="240" height="50" rx="6" fill="#FEF2F2" stroke="#EF4444" stroke-width="1"/>
              <rect class="node-accent" x="60" y="130" width="4" height="50" rx="2" fill="#EF4444"/>
              <text class="node-title" x="76" y="152" font-size="12" font-weight="600" fill="#991B1B">Follow-ups (20/day)</text>
              <text class="node-desc" x="76" y="167" font-size="10" fill="#98A2B3">2 hours wasted daily</text>
            </g>

            <g class="node exception-node" data-id="manual-3">
              <rect class="node-bg" x="60" y="210" width="240" height="50" rx="6" fill="#FEF2F2" stroke="#EF4444" stroke-width="1"/>
              <rect class="node-accent" x="60" y="210" width="4" height="50" rx="2" fill="#EF4444"/>
              <text class="node-title" x="76" y="232" font-size="12" font-weight="600" fill="#991B1B">Paper Approvals (3 days)</text>
              <text class="node-desc" x="76" y="247" font-size="10" fill="#98A2B3">10% lost documents</text>
            </g>

            <g class="node exception-node" data-id="manual-4">
              <rect class="node-bg" x="60" y="290" width="240" height="50" rx="6" fill="#FEF2F2" stroke="#EF4444" stroke-width="1"/>
              <rect class="node-accent" x="60" y="290" width="4" height="50" rx="2" fill="#EF4444"/>
              <text class="node-title" x="76" y="312" font-size="12" font-weight="600" fill="#991B1B">Weekly Reports (4 hours)</text>
              <text class="node-desc" x="76" y="327" font-size="10" fill="#98A2B3">Outdated data</text>
            </g>

            <g class="node exception-node" data-id="manual-5">
              <rect class="node-bg" x="60" y="370" width="240" height="50" rx="6" fill="#FEF2F2" stroke="#EF4444" stroke-width="1"/>
              <rect class="node-accent" x="60" y="370" width="4" height="50" rx="2" fill="#EF4444"/>
              <text class="node-title" x="76" y="392" font-size="12" font-weight="600" fill="#991B1B">Late Exceptions (5 days)</text>
              <text class="node-desc" x="76" y="407" font-size="10" fill="#98A2B3">Found in weekly review</text>
            </g>

            <!-- Automated -->
            <g class="node automation-node" data-id="auto-1">
              <rect class="node-bg" x="560" y="50" width="240" height="50" rx="6" fill="#EEF2FF" stroke="#A5B4FC" stroke-width="1" stroke-dasharray="4 4"/>
              <rect class="node-accent" x="560" y="50" width="3" height="50" rx="1.5" fill="#6366F1"/>
              <text class="node-title" x="575" y="72" font-size="12" font-weight="600" fill="#4338CA">⚡ Single Entry</text>
              <text class="node-desc" x="575" y="87" font-size="10" fill="#98A2B3">Error rate: 0.1%</text>
            </g>

            <g class="node automation-node" data-id="auto-2">
              <rect class="node-bg" x="560" y="130" width="240" height="50" rx="6" fill="#EEF2FF" stroke="#A5B4FC" stroke-width="1" stroke-dasharray="4 4"/>
              <rect class="node-accent" x="560" y="130" width="3" height="50" rx="1.5" fill="#6366F1"/>
              <text class="node-title" x="575" y="152" font-size="12" font-weight="600" fill="#4338CA">⚡ Auto-Notifications</text>
              <text class="node-desc" x="575" y="167" font-size="10" fill="#98A2B3">Zero follow-ups</text>
            </g>

            <g class="node automation-node" data-id="auto-3">
              <rect class="node-bg" x="560" y="210" width="240" height="50" rx="6" fill="#EEF2FF" stroke="#A5B4FC" stroke-width="1" stroke-dasharray="4 4"/>
              <rect class="node-accent" x="560" y="210" width="3" height="50" rx="1.5" fill="#6366F1"/>
              <text class="node-title" x="575" y="232" font-size="12" font-weight="600" fill="#4338CA">⚡ Digital Approvals</text>
              <text class="node-desc" x="575" y="247" font-size="10" fill="#98A2B3">4 hours, audit trail</text>
            </g>

            <g class="node automation-node" data-id="auto-4">
              <rect class="node-bg" x="560" y="290" width="240" height="50" rx="6" fill="#EEF2FF" stroke="#A5B4FC" stroke-width="1" stroke-dasharray="4 4"/>
              <rect class="node-accent" x="560" y="290" width="3" height="50" rx="1.5" fill="#6366F1"/>
              <text class="node-title" x="575" y="312" font-size="12" font-weight="600" fill="#4338CA">⚡ Live Dashboards</text>
              <text class="node-desc" x="575" y="327" font-size="10" fill="#98A2B3">Real-time, no compilation</text>
            </g>

            <g class="node automation-node" data-id="auto-5">
              <rect class="node-bg" x="560" y="370" width="240" height="50" rx="6" fill="#EEF2FF" stroke="#A5B4FC" stroke-width="1" stroke-dasharray="4 4"/>
              <rect class="node-accent" x="560" y="370" width="3" height="50" rx="1.5" fill="#6366F1"/>
              <text class="node-title" x="575" y="392" font-size="12" font-weight="600" fill="#4338CA">⚡ Auto Exception Routing</text>
              <text class="node-desc" x="575" y="407" font-size="10" fill="#98A2B3">4 hours resolution</text>
            </g>

            <!-- Completion -->
            <g class="node completion-node" data-id="transformation-complete">
              <rect class="node-bg" x="560" y="460" width="380" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5"/>
              <rect class="node-accent" x="560" y="460" width="4" height="50" rx="2" fill="#10B981"/>
              <text class="node-title" x="750" y="482" text-anchor="middle" font-size="13" font-weight="700" fill="#065F46">TRANSFORMATION: 80% automated</text>
              <text class="node-desc" x="750" y="497" text-anchor="middle" font-size="10" fill="#98A2B3">All manual work eliminated or optimized</text>
            </g>
          </g>

        </svg>`,
  "strat-04": `<svg id="svg-strat-04" viewBox="0 0 1000 580" class="diagram-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="arrow-strat04" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,1 L10,5 L0,9 L2,5 z" fill="#667085"/></marker>
          </defs>

          <!-- Department Lanes -->
          <g class="layer-departments">
            <rect class="dept-lane" x="0" y="0" width="1000" height="80" opacity="0.3" fill="#667085"/>
            <rect class="dept-lane" x="0" y="80" width="1000" height="80" opacity="0.3" fill="#3B82F6"/>
            <rect class="dept-lane" x="0" y="160" width="1000" height="80" opacity="0.3" fill="#8B5CF6"/>
            <rect class="dept-lane" x="0" y="240" width="1000" height="80" opacity="0.3" fill="#14B8A6"/>
            <rect class="dept-lane" x="0" y="320" width="1000" height="80" opacity="0.3" fill="#10B981"/>
            <rect class="dept-lane" x="0" y="400" width="1000" height="80" opacity="0.3" fill="#F59E0B"/>
            <text x="16" y="44" font-size="10" fill="#667085" font-weight="600">CUSTOMER</text>
            <text x="16" y="124" font-size="10" fill="#3B82F6" font-weight="600">SALES</text>
            <text x="16" y="204" font-size="10" fill="#8B5CF6" font-weight="600">PURCHASE</text>
            <text x="16" y="284" font-size="10" fill="#14B8A6" font-weight="600">STORE</text>
            <text x="16" y="364" font-size="10" fill="#10B981" font-weight="600">FINANCE</text>
            <text x="16" y="444" font-size="10" fill="#F59E0B" font-weight="600">LOGISTICS</text>
          </g>

          <!-- Connectors -->
          <g class="layer-connectors">
            <!-- T1(150,70) → T2(300,90) diagonal right-down -->
            <path class="connector" d="m 150 70 l 0 10 l 150 0 l 0 10" marker-end="url(#arrow-strat04)"/>
            <!-- T2(300,130) → T3(450,170) diagonal right-down -->
            <path class="connector" d="m 300 130 l 0 10 l 150 0 l 0 30" marker-end="url(#arrow-strat04)"/>
            <!-- T3(450,210) → T4(600,250) diagonal right-down -->
            <path class="connector" d="m 450 210 l 0 10 l 150 0 l 0 30" marker-end="url(#arrow-strat04)"/>
            <!-- T4(600,290) → T5(750,330) diagonal right-down -->
            <path class="connector" d="m 600 290 l 0 10 l 150 0 l 0 30" marker-end="url(#arrow-strat04)"/>
            <!-- T5(750,370) → T6(600,410) diagonal left-down -->
            <path class="connector" d="m 750 370 l 0 10 l -150 0 l 0 30" marker-end="url(#arrow-strat04)"/>
            <!-- T6(600,450) → T7(450,330) diagonal left-up (return path) -->
            <path class="connector" d="m 600 450 l 0 10 l -150 0 l 0 -130" marker-end="url(#arrow-strat04)"/>
            <!-- T7(450,370) → T8(300,410) diagonal left-down -->
            <path class="connector" d="m 450 370 l 0 10 l -150 0 l 0 30" marker-end="url(#arrow-strat04)"/>
            <!-- T8(300,450) → T9(150,450) horizontal left -->
            <path class="connector" d="m 300 450 l 0 10 l -150 0 l 0 -10" marker-end="url(#arrow-strat04)"/>
            <!-- T9(150,490) → T10(150,510) vertical down -->
            <path class="connector" d="m 150 490 l 0 20" marker-end="url(#arrow-strat04)"/>
          </g>

          <!-- Process Nodes -->
          <g class="layer-process">
            <g class="node process-node" data-id="t-01-inquiry">
              <rect class="node-bg" x="60" y="30" width="180" height="40" rx="4" fill="#F9FAFB" stroke="#667085" stroke-width="1"/>
              <text class="node-title" x="76" y="55" font-size="11" font-weight="600">T1: Customer Inquiry</text>
            </g>

            <g class="node process-node" data-id="t-02-quotation">
              <rect class="node-bg" x="210" y="90" width="180" height="40" rx="4"/>
              <rect class="node-accent" x="210" y="90" width="3" height="40" rx="1.5" fill="#3B82F6"/>
              <text class="node-title" x="226" y="115" font-size="11" font-weight="600">T2: Quotation</text>
            </g>

            <g class="node milestone-node" data-id="t-03-order">
              <rect class="node-bg" x="360" y="170" width="180" height="40" rx="4" fill="#ECFDF5" stroke="#10B981" stroke-width="1"/>
              <text class="node-title" x="376" y="195" font-size="11" font-weight="600">T3: Order Confirmed</text>
            </g>

            <g class="node process-node" data-id="t-04-po">
              <rect class="node-bg" x="510" y="250" width="180" height="40" rx="4"/>
              <rect class="node-accent" x="510" y="250" width="3" height="40" rx="1.5" fill="#8B5CF6"/>
              <text class="node-title" x="526" y="275" font-size="11" font-weight="600">T4: PO Created</text>
            </g>

            <g class="node process-node" data-id="t-05-goods">
              <rect class="node-bg" x="660" y="330" width="180" height="40" rx="4"/>
              <rect class="node-accent" x="660" y="330" width="3" height="40" rx="1.5" fill="#14B8A6"/>
              <text class="node-title" x="676" y="355" font-size="11" font-weight="600">T5: Goods Received</text>
            </g>

            <g class="node process-node" data-id="t-06-finance">
              <rect class="node-bg" x="510" y="410" width="180" height="40" rx="4"/>
              <rect class="node-accent" x="510" y="410" width="3" height="40" rx="1.5" fill="#10B981"/>
              <text class="node-title" x="526" y="435" font-size="11" font-weight="600">T6: Payment</text>
            </g>

            <g class="node process-node" data-id="t-07-shipment">
              <rect class="node-bg" x="360" y="330" width="180" height="40" rx="4"/>
              <rect class="node-accent" x="360" y="330" width="3" height="40" rx="1.5" fill="#F59E0B"/>
              <text class="node-title" x="376" y="355" font-size="11" font-weight="600">T7: Shipment</text>
            </g>

            <g class="node process-node" data-id="t-08-delivery">
              <rect class="node-bg" x="210" y="410" width="180" height="40" rx="4"/>
              <rect class="node-accent" x="210" y="410" width="3" height="40" rx="1.5" fill="#F59E0B"/>
              <text class="node-title" x="226" y="435" font-size="11" font-weight="600">T8: Delivery</text>
            </g>

            <g class="node process-node" data-id="t-09-reconciliation">
              <rect class="node-bg" x="60" y="450" width="180" height="40" rx="4"/>
              <rect class="node-accent" x="60" y="450" width="3" height="40" rx="1.5" fill="#10B981"/>
              <text class="node-title" x="76" y="475" font-size="11" font-weight="600">T9: Reconciliation</text>
            </g>

            <g class="node completion-node" data-id="t-10-complete">
              <rect class="node-bg" x="60" y="510" width="880" height="40" rx="4" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5"/>
              <text class="node-title" x="500" y="535" text-anchor="middle" font-size="12" font-weight="700" fill="#065F46">T10: TRANSACTION COMPLETE — 6 departments, 10 days, 100% visible</text>
            </g>
          </g>

          <!-- Timeline Arrow -->
          <g class="layer-labels">
            <line x1="100" y1="520" x2="900" y2="520" stroke="#10B981" stroke-width="2" stroke-dasharray="8 4"/>
            <text x="500" y="555" text-anchor="middle" font-size="10" fill="#10B981" font-weight="600">ONE TIMELINE — ALL DEPARTMENTS CONNECTED</text>
          </g>

        </svg>`
};
