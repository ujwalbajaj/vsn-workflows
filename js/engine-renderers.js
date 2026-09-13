/* ============================================================
   VSN ERP Universal Workflow Presentation Engine — Renderers
   ============================================================
   SVG Renderer · Detail Renderer · Type Renderers (Registry)
   ============================================================ */

window.WorkflowRenderers = (function () {
  'use strict';

  var Engine = window.WorkflowEngine;

  /* ==========================================================
     1. UTILITIES
     ========================================================== */

  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ==========================================================
     2. SVG RENDERER
     ========================================================== */

  var SvgRenderer = {
    svg: null,
    workflow: null,

    init: function (sectionEl, workflow) {
      this.svg = sectionEl.querySelector('svg');
      this.workflow = workflow;
      if (!this.svg) return;

      // Tag workflow nodes
      workflow.nodes.forEach(function (node) {
        if (!node.visual || !node.visual.svgIds) return;
        node.visual.svgIds.forEach(function (svgId) {
          var el = this.svg.querySelector('[data-id="' + svgId + '"]');
          if (el) {
            el.dataset.workflowNode = node.id;
            el.classList.add('wf-node');
            if (node.type) el.dataset.type = node.type;
          }
        }.bind(this));
      }.bind(this));

      // Tag workflow edges
      if (workflow.edges) {
        workflow.edges.forEach(function (edge) {
          var el = this.svg.querySelector('[data-id="' + edge.id + '"]');
          if (el) {
            el.dataset.workflowFrom = edge.from;
            el.dataset.workflowTo = edge.to;
            el.classList.add('wf-connector');
          }
        }.bind(this));
      }

      this.renderAll({ nodes: {}, edges: {} });
    },

    renderAll: function (states) {
      if (!this.svg) return;
      var nodeMap = states.nodes || {};
      var edgeMap = states.edges || {};

      // Render nodes
      this.svg.querySelectorAll('.wf-node').forEach(function (el) {
        var nodeId = el.dataset.workflowNode;
        var state = nodeMap[nodeId] || 'upcoming';
        el.dataset.state = state;
      });

      // Render connectors
      this.svg.querySelectorAll('.wf-connector').forEach(function (el) {
        var fromId = el.dataset.workflowFrom;
        var toId = el.dataset.workflowTo;
        var fromState = nodeMap[fromId] || 'upcoming';
        var toState = nodeMap[toId] || 'upcoming';
        var connState = 'upcoming';

        if (fromState === 'completed' && (toState === 'active' || toState === 'completed')) {
          connState = 'active';
        }
        if (fromState === 'completed' && toState === 'completed') {
          connState = 'completed';
        }

        el.dataset.state = connState;
      });
    }
  };

  /* ==========================================================
     3. RENDERER REGISTRY
     ========================================================== */

  var typeRenderers = {};

  function registerRenderer(type, fn) {
    typeRenderers[type] = fn;
  }

  function renderTypeContent(node) {
    var fn = typeRenderers[node.type];
    return fn ? fn(node) : '';
  }

  /* ==========================================================
     4. DETAIL RENDERER
     ========================================================== */

  var DetailRenderer = {
    stepInfo: null,

    init: function (sectionEl) {
      this.stepInfo = sectionEl.querySelector('.step-info');
    },

    renderNode: function (node) {
      if (!this.stepInfo) return;
      var html = '';

      // Header
      html += '<div class="step-header">';
      if (node.owner) {
        var dept = node.owner.department || node.owner;
        html += '<span class="dept-badge dept-' + dept + '">' + escapeHtml(dept) + '</span>';
        if (node.owner.role) {
          html += '<span class="rule-badge">' + escapeHtml(node.owner.role) + '</span>';
        }
      }
      if (node.type) {
        html += '<span class="rule-badge">' + node.type.toUpperCase() + '</span>';
      }
      html += '</div>';

      // Title
      html += '<h3 class="step-title">' + escapeHtml(node.title) + '</h3>';

      // Description
      if (node.description) {
        html += '<p class="step-description">' + escapeHtml(node.description) + '</p>';
      }

      // Inputs
      if (node.inputs && node.inputs.length) {
        html += '<div class="step-section">';
        html += '<div class="step-section-label">INPUT</div>';
        html += '<div class="step-section-list">';
        node.inputs.forEach(function (inp) {
          html += '<span class="step-section-item input">' + escapeHtml(inp) + '</span>';
        });
        html += '</div></div>';
      }

      // Outputs
      if (node.outputs && node.outputs.length) {
        html += '<div class="step-section">';
        html += '<div class="step-section-label">OUTPUT</div>';
        html += '<div class="step-section-list">';
        node.outputs.forEach(function (out) {
          html += '<span class="step-section-item output">' + escapeHtml(out) + '</span>';
        });
        html += '</div></div>';
      }

      // Type-specific content (via registry)
      html += renderTypeContent(node);

      // References
      if (node.references && node.references.length) {
        html += '<div class="step-section" style="margin-top:var(--spacing-3)">';
        html += '<div class="step-section-label">BUSINESS RULES</div>';
        node.references.forEach(function (ref) {
          var cls = ref.status === 'tbd' ? 'rule-badge tbd' : 'rule-badge';
          html += '<span class="' + cls + '" style="margin-right:4px">' + escapeHtml(ref.label || ref.source) + '</span>';
          if (ref.status === 'tbd') {
            html += '<span style="font-size:11px;color:#92400E;margin-left:4px">TBD — CLIENT VALIDATION REQUIRED</span>';
          }
        });
        html += '</div>';
      }

      this.stepInfo.innerHTML = html;
    },

    clear: function () {
      if (this.stepInfo) {
        this.stepInfo.innerHTML = '<p class="detail-placeholder">Press Play to begin the walkthrough</p>';
      }
    }
  };

  /* ==========================================================
     5. TYPE-SPECIFIC RENDERERS
     ========================================================== */

  function renderDecision(node) {
    if (!node.options) return '';
    var html = '<div class="decision-box">';
    if (node.question) {
      html += '<div class="decision-question">' + escapeHtml(node.question) + '</div>';
    }
    html += '<div class="decision-options">';
    node.options.forEach(function (opt) {
      var isSel = opt.id === node.selected;
      var cls = 'decision-option' + (isSel ? ' selected' : '');
      html += '<div class="' + cls + '">';
      html += '<div class="option-label">' + escapeHtml(opt.label) + '</div>';
      if (opt.consequence) html += '<div class="option-consequence">' + escapeHtml(opt.consequence) + '</div>';
      if (isSel) html += '<span class="option-badge">TAKEN</span>';
      html += '</div>';
    });
    html += '</div>';
    if (node.reason) {
      html += '<div class="decision-reason"><strong>Reason:</strong> ' + escapeHtml(node.reason) + '</div>';
    }
    html += '</div>';
    return html;
  }

  function renderParallel(node) {
    if (!node.branches) return '';
    var html = '<div class="parallel-box">';
    html += '<div class="fork-label">∥ FORK — Both branches execute simultaneously</div>';
    html += '<div class="branch-grid">';
    node.branches.forEach(function (branch) {
      html += '<div class="branch-card" data-branch="' + branch.id + '">';
      html += '<div class="branch-header">';
      if (branch.owner) {
        var dept = branch.owner.department || branch.owner;
        html += '<span class="dept-badge dept-' + dept + '">' + escapeHtml(dept) + '</span>';
      }
      html += '</div>';
      html += '<div class="branch-title">' + escapeHtml(branch.title || branch.id) + '</div>';
      if (branch.steps) {
        branch.steps.forEach(function (stepId) {
          var stepTitle = stepId;
          html += '<div class="branch-step">' + escapeHtml(stepTitle) + '</div>';
        });
      }
      html += '</div>';
    });
    html += '</div>';
    if (node.join) {
      html += '<div class="join-label">∥ JOIN → ' + escapeHtml(node.join) + '</div>';
    }
    html += '</div>';
    return html;
  }

  function renderException(node) {
    var html = '<div class="exception-box">';
    if (node.severity) {
      html += '<span class="exception-severity severity-' + node.severity + '">' + node.severity.toUpperCase() + '</span>';
    }
    if (node.trigger) {
      html += '<div class="exception-trigger">' + escapeHtml(node.trigger) + '</div>';
    }
    if (node.impact) {
      html += '<div class="exception-impact">Impact: ' + escapeHtml(node.impact) + '</div>';
    }
    if (node.actions && node.actions.length) {
      html += '<div class="exception-actions">';
      html += '<div class="exception-actions-title">RECOVERY ACTIONS</div>';
      node.actions.forEach(function (a) {
        html += '<div class="exception-action">' + escapeHtml(a) + '</div>';
      });
      html += '</div>';
    }
    if (node.resolution) {
      html += '<div class="exception-resume"><strong>Resolution:</strong> ' + escapeHtml(node.resolution) + '</div>';
    }
    if (node.resumeAt) {
      html += '<div class="exception-resume">Recovery resumes at: <strong>' + escapeHtml(node.resumeAt) + '</strong></div>';
    }
    if (node.escalationTo) {
      html += '<div class="exception-escalation">Escalation to: ' + escapeHtml(node.escalationTo) + '</div>';
    }
    html += '</div>';
    return html;
  }

  function renderHandoff(node) {
    var html = '<div class="handoff-box">';
    html += '<div class="handoff-flow">';
    if (node.from) {
      var fromDept = node.from.department || node.from;
      html += '<span class="dept-badge dept-' + fromDept + '">' + escapeHtml(fromDept) + '</span>';
    }
    html += '<span class="handoff-arrow">→</span>';
    if (node.to) {
      var toDept = node.to.department || node.to;
      html += '<span class="dept-badge dept-' + toDept + '">' + escapeHtml(toDept) + '</span>';
    }
    html += '</div>';
    if (node.payload && node.payload.length) {
      html += '<div class="handoff-payload">';
      html += '<div class="handoff-payload-title">TRANSFERS</div>';
      html += '<div class="handoff-payload-items">';
      node.payload.forEach(function (item) {
        html += '<span class="handoff-payload-item">' + escapeHtml(item) + '</span>';
      });
      html += '</div></div>';
    }
    if (node.trigger) {
      html += '<div class="handoff-trigger">' + escapeHtml(node.trigger) + '</div>';
    }
    html += '</div>';
    return html;
  }

  function renderApproval(node) {
    var html = '<div class="approval-box">';
    html += '<div class="approval-flow">';
    if (node.requester) {
      html += '<span class="dept-badge dept-' + node.requester + '">' + node.requester + '</span>';
    }
    html += '<span class="approval-arrow">→</span>';
    if (node.approver) {
      html += '<span class="dept-badge dept-' + node.approver + '">' + node.approver + '</span>';
    }
    html += '</div>';
    if (node.condition) {
      html += '<div class="approval-condition">' + escapeHtml(node.condition) + '</div>';
    }
    if (node.outcomes && node.outcomes.length) {
      html += '<div class="approval-outcomes">';
      node.outcomes.forEach(function (out) {
        var id = typeof out === 'string' ? out : out.id;
        var label = typeof out === 'string' ? out : (out.label || out.id);
        var isSel = id === node.selected;
        var cls = 'approval-outcome' + (isSel ? ' selected' : '');
        html += '<span class="' + cls + '">' + escapeHtml(label) + '</span>';
      });
      html += '</div>';
    }
    html += '</div>';
    return html;
  }

  function renderVerification(node) {
    var html = '<div class="verification-box">';
    if (node.checks && node.checks.length) {
      html += '<div class="verification-checks">';
      html += '<div class="verification-checks-title">CHECKS</div>';
      node.checks.forEach(function (c) {
        html += '<div class="verification-check">' + escapeHtml(c) + '</div>';
      });
      html += '</div>';
    }
    if (node.outcomes && node.outcomes.length) {
      html += '<div class="verification-outcomes">';
      node.outcomes.forEach(function (out) {
        var id = typeof out === 'string' ? out : out.id;
        var label = typeof out === 'string' ? out : (out.label || out.id);
        var cls = 'verification-outcome outcome-' + id;
        html += '<span class="' + cls + '">' + escapeHtml(label) + '</span>';
      });
      html += '</div>';
    }
    html += '</div>';
    return html;
  }

  function renderAutomation(node) {
    var html = '<div class="automation-box">';
    if (node.trigger) html += '<div class="automation-trigger">⚡ ' + escapeHtml(node.trigger) + '</div>';
    if (node.action) html += '<div class="automation-action">' + escapeHtml(node.action) + '</div>';
    if (node.sla) html += '<div class="automation-sla">SLA: ' + escapeHtml(node.sla) + '</div>';
    if (node.event) html += '<div class="automation-event">Event: ' + escapeHtml(node.event) + '</div>';
    html += '</div>';
    return html;
  }

  function renderLoop(node) {
    var html = '<div class="loop-box">';
    if (node.from) html += '<div class="loop-from">Returns to: <strong>' + escapeHtml(node.from) + '</strong></div>';
    if (node.condition) html += '<div class="loop-condition">' + escapeHtml(node.condition) + '</div>';
    if (node.repeatUntil) html += '<div class="loop-until">Repeat until: ' + escapeHtml(node.repeatUntil) + '</div>';
    if (node.maxIterations) html += '<div class="loop-iterations">Max iterations: ' + node.maxIterations + '</div>';
    html += '</div>';
    return html;
  }

  function renderCompletion(node) {
    var html = '<div class="completion-box">';
    if (node.summary) html += '<div class="completion-summary">' + escapeHtml(node.summary) + '</div>';
    if (node.metrics && typeof node.metrics === 'object') {
      html += '<div class="completion-metrics">';
      Object.keys(node.metrics).forEach(function (k) {
        html += '<div class="metric">';
        html += '<span class="metric-label">' + escapeHtml(k) + '</span>';
        html += '<span class="metric-value">' + escapeHtml(String(node.metrics[k])) + '</span>';
        html += '</div>';
      });
      html += '</div>';
    }
    html += '</div>';
    return html;
  }

  /* ==========================================================
     6. REGISTER BUILT-IN RENDERERS
     ========================================================== */

  registerRenderer('decision', renderDecision);
  registerRenderer('parallel', renderParallel);
  registerRenderer('exception', renderException);
  registerRenderer('handoff', renderHandoff);
  registerRenderer('approval', renderApproval);
  registerRenderer('verification', renderVerification);
  registerRenderer('automation', renderAutomation);
  registerRenderer('loop', renderLoop);
  registerRenderer('completion', renderCompletion);

  /* ==========================================================
     7. WIRE TO ENGINE EVENTS
     ========================================================== */

  Engine.on('activated', function (data) {
    if (data && data.section) {
      SvgRenderer.init(data.section, data.workflow);
      DetailRenderer.init(data.section);
    }
  });

  Engine.on('stepChanged', function (data) {
    if (data && data.states) {
      SvgRenderer.renderAll(data.states);
    }
    if (data && data.node) {
      DetailRenderer.renderNode(data.node);
    } else {
      DetailRenderer.clear();
    }
  });

  /* ==========================================================
     8. PUBLIC API
     ========================================================== */

  return {
    SvgRenderer: SvgRenderer,
    DetailRenderer: DetailRenderer,
    registerRenderer: registerRenderer,
    escapeHtml: escapeHtml
  };

})();
