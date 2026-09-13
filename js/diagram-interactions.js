/* ============================================================
   VSN ERP Visual Workflow System — Diagram Interactions
   ============================================================ */

function initDiagramInteractions(sectionEl) {
  'use strict';

  var svg = sectionEl.querySelector('svg');
  var detailEl = sectionEl.querySelector('.page-detail');
  if (!svg) return;

  // Prevent double-binding
  if (svg.dataset.interactionsInit === 'true') return;
  svg.dataset.interactionsInit = 'true';

  // ---- Node Selection ----
  svg.querySelectorAll('.node').forEach(function (node) {
    node.addEventListener('click', function (e) {
      e.stopPropagation();
      handleNodeSelect(node, svg, detailEl);
    });
  });

  // ---- Canvas Background Click Clears Selection ----
  svg.addEventListener('click', function (e) {
    if (e.target === svg || e.target.tagName === 'svg') {
      clearSelection(svg, detailEl);
    }
  });

  // ---- Department Label Highlighting ----
  svg.querySelectorAll('.dept-label').forEach(function (label) {
    label.addEventListener('click', function (e) {
      e.stopPropagation();
      handleDeptHighlight(label, svg);
    });
  });

  // ---- View Toggle Buttons ----
  var btnGroup = sectionEl.querySelector('.btn-group');
  if (btnGroup) {
    btnGroup.querySelectorAll('.btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        handleViewToggle(btn, btnGroup, svg);
      });
    });
  }

  // ---- Escape Key Clears ----
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      clearSelection(svg, detailEl);
      VSN.svg.clearDeptHighlight();
      svg.querySelectorAll('.node').forEach(function (n) {
        n.classList.remove('dimmed-by-dept');
      });
    }
  });
}

/* ---- Node Select Handler ---- */
function handleNodeSelect(node, svg, detailEl) {
  var wasSelected = node.classList.contains('selected');

  // Clear all selections
  VSN.svg.clearSelections(svg);
  clearDetail(detailEl);

  if (!wasSelected) {
    // Select this node
    node.classList.add('selected');

    // Dim sibling nodes
    svg.querySelectorAll('.node').forEach(function (n) {
      if (n !== node) {
        n.classList.add('dimmed');
      }
    });

    // Show detail
    showNodeDetail(node, detailEl);
  }
}

/* ---- Department Highlight Handler ---- */
function handleDeptHighlight(label, svg) {
  var dept = label.getAttribute('data-dept');
  var body = document.body;

  // Toggle off if already highlighting this dept
  if (body.classList.contains('dept-highlight') && body.dataset.activeDept === dept) {
    body.classList.remove('dept-highlight');
    delete body.dataset.activeDept;
    svg.querySelectorAll('.node').forEach(function (n) {
      n.classList.remove('dimmed-by-dept');
    });
    return;
  }

  // Apply department highlight
  body.classList.add('dept-highlight');
  body.dataset.activeDept = dept;

  svg.querySelectorAll('.node').forEach(function (n) {
    if (n.getAttribute('data-dept') !== dept) {
      n.classList.add('dimmed-by-dept');
    } else {
      n.classList.remove('dimmed-by-dept');
    }
  });
}

/* ---- View Toggle Handler ---- */
function handleViewToggle(btn, btnGroup, svg) {
  // Update button states
  btnGroup.querySelectorAll('.btn').forEach(function (b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');

  // Toggle view class on SVG
  var mode = btn.getAttribute('data-view');
  svg.classList.remove('view-business', 'view-handoffs', 'view-automation', 'view-exceptions');
  svg.classList.add('view-' + mode);
}

/* ---- Show Node Detail ---- */
function showNodeDetail(node, detailEl) {
  if (!detailEl) return;

  var titleEl = node.querySelector('.node-title');
  var descEl = node.querySelector('.node-desc');
  var dept = node.getAttribute('data-dept') || '';
  var title = titleEl ? titleEl.textContent : '';
  var desc = descEl ? descEl.textContent : '';

  var html = '<div class="detail-content">';
  html += '<h3>' + escapeHtml(title) + '</h3>';
  if (desc) {
    html += '<p>' + escapeHtml(desc) + '</p>';
  }
  if (dept) {
    html += '<span class="dept-badge dept-' + dept + '">' + escapeHtml(dept) + '</span>';
  }
  html += '</div>';

  detailEl.innerHTML = html;
}

/* ---- Clear Detail ---- */
function clearDetail(detailEl) {
  if (!detailEl) return;
  detailEl.innerHTML = '<p class="detail-placeholder">Select a node to see details</p>';
}

/* ---- Clear Selection ---- */
function clearSelection(svg, detailEl) {
  VSN.svg.clearSelections(svg);
  clearDetail(detailEl);
}

/* ---- Escape HTML ---- */
function escapeHtml(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}
