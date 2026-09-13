/* ============================================================
   VSN ERP Visual Workflow System — SVG Utilities
   ============================================================ */

var VSN = window.VSN || {};

VSN.svg = (function () {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';

  /**
   * Create an SVG element with attributes and optional text content.
   */
  function create(tag, attrs, textContent) {
    var el = document.createElementNS(NS, tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        el.setAttribute(key, attrs[key]);
      });
    }
    if (textContent !== undefined && textContent !== null) {
      var text = document.createElementNS(NS, 'text');
      text.textContent = textContent;
      el.appendChild(text);
    }
    return el;
  }

  /**
   * Create a process node group.
   */
  function processNode(id, x, y, title, desc, dept) {
    var g = create('g', {
      'class': 'node process-node',
      'data-id': id,
      'data-dept': dept || '',
      'transform': 'translate(' + x + ',' + y + ')'
    });

    // Background rect
    g.appendChild(create('rect', {
      'class': 'node-bg',
      'width': '180',
      'height': '60',
      'rx': '6',
      'ry': '6'
    }));

    // Left accent bar
    g.appendChild(create('rect', {
      'class': 'node-accent',
      'width': '4',
      'height': '60',
      'rx': '2',
      'ry': '2'
    }));

    // Title text
    var titleEl = create('text', {
      'class': 'node-title',
      'x': '16',
      'y': '26'
    });
    titleEl.textContent = title;
    g.appendChild(titleEl);

    // Description text
    if (desc) {
      var descEl = create('text', {
        'class': 'node-desc',
        'x': '16',
        'y': '42'
      });
      descEl.textContent = desc;
      g.appendChild(descEl);
    }

    return g;
  }

  /**
   * Create a decision node (diamond).
   */
  function decisionNode(id, cx, cy, label) {
    var size = 30;
    var points = [
      cx + ',' + (cy - size),
      (cx + size) + ',' + cy,
      cx + ',' + (cy + size),
      (cx - size) + ',' + cy
    ].join(' ');

    var g = create('g', {
      'class': 'node decision-node',
      'data-id': id,
      'transform': 'translate(0,0)'
    });

    g.appendChild(create('polygon', {
      'points': points,
      'class': 'node-bg'
    }));

    var textEl = create('text', {
      'x': cx,
      'y': cy + 4,
      'text-anchor': 'middle',
      'class': 'node-title'
    });
    textEl.textContent = label;
    g.appendChild(textEl);

    return g;
  }

  /**
   * Create an exception node.
   */
  function exceptionNode(id, x, y, title, desc) {
    var g = create('g', {
      'class': 'node exception-node',
      'data-id': id,
      'transform': 'translate(' + x + ',' + y + ')'
    });

    g.appendChild(create('rect', {
      'class': 'node-bg',
      'width': '160',
      'height': '50',
      'rx': '6',
      'ry': '6'
    }));

    g.appendChild(create('rect', {
      'class': 'node-accent',
      'width': '4',
      'height': '50',
      'rx': '2',
      'ry': '2'
    }));

    var titleEl = create('text', {
      'class': 'node-title',
      'x': '14',
      'y': '22'
    });
    titleEl.textContent = title;
    g.appendChild(titleEl);

    if (desc) {
      var descEl = create('text', {
        'class': 'node-desc',
        'x': '14',
        'y': '36'
      });
      descEl.textContent = desc;
      g.appendChild(descEl);
    }

    return g;
  }

  /**
   * Create an automation node.
   */
  function automationNode(id, x, y, label) {
    var g = create('g', {
      'class': 'node automation-node',
      'data-id': id,
      'transform': 'translate(' + x + ',' + y + ')'
    });

    g.appendChild(create('rect', {
      'class': 'node-bg',
      'width': '170',
      'height': '36',
      'rx': '6',
      'ry': '6'
    }));

    g.appendChild(create('rect', {
      'class': 'node-accent',
      'width': '3',
      'height': '36',
      'rx': '1.5',
      'ry': '1.5'
    }));

    var titleEl = create('text', {
      'class': 'node-title',
      'x': '12',
      'y': '22'
    });
    titleEl.textContent = label;
    g.appendChild(titleEl);

    return g;
  }

  /**
   * Create a state badge.
   */
  function stateBadge(state, x, y, label) {
    var g = create('g', {
      'class': 'state-badge',
      'data-state': state,
      'transform': 'translate(' + x + ',' + y + ')'
    });

    var w = label.length * 7 + 16;
    g.appendChild(create('rect', {
      'width': w,
      'height': '20',
      'rx': '4',
      'ry': '4'
    }));

    var textEl = create('text', {
      'x': w / 2,
      'y': '11',
      'text-anchor': 'middle'
    });
    textEl.textContent = label;
    g.appendChild(textEl);

    return g;
  }

  /**
   * Create a department label (clickable).
   */
  function deptLabel(dept, x, y) {
    var labels = {
      customer: 'Customer',
      sales: 'Sales',
      purchase: 'Purchase',
      finance: 'Finance',
      logistics: 'Logistics',
      store: 'Store',
      management: 'Management'
    };

    var g = create('g', {
      'class': 'dept-label',
      'data-dept': dept,
      'transform': 'translate(' + x + ',' + y + ')'
    });

    var label = labels[dept] || dept;
    var w = label.length * 7 + 16;

    g.appendChild(create('rect', {
      'width': w,
      'height': '22',
      'rx': '4',
      'ry': '4'
    }));

    var textEl = create('text', {
      'x': w / 2,
      'y': '13',
      'text-anchor': 'middle'
    });
    textEl.textContent = label;
    g.appendChild(textEl);

    return g;
  }

  /**
   * Create a connector path.
   */
  function connector(x1, y1, x2, y2, cls) {
    var attrs = {
      'class': 'connector' + (cls ? ' ' + cls : ''),
      'd': 'M ' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y2
    };
    return create('path', attrs);
  }

  /**
   * Create a curved connector (for branching/return paths).
   */
  function curvedConnector(x1, y1, x2, y2, cx1, cy1, cx2, cy2, cls) {
    var d = 'M ' + x1 + ' ' + y1 +
            ' C ' + cx1 + ' ' + cy1 + ' ' + cx2 + ' ' + cy2 + ' ' + x2 + ' ' + y2;
    var attrs = {
      'class': 'connector' + (cls ? ' ' + cls : ''),
      'd': d
    };
    return create('path', attrs);
  }

  /**
   * Create a handoff dot.
   */
  function handoffDot(cx, cy) {
    return create('circle', {
      'class': 'handoff-dot',
      'cx': cx,
      'cy': cy,
      'r': '4'
    });
  }

  /**
   * Create a handoff label.
   */
  function handoffLabel(text, x, y) {
    var el = create('text', {
      'class': 'handoff-label',
      'x': x,
      'y': y,
      'text-anchor': 'middle'
    });
    el.textContent = text;
    return el;
  }

  /**
   * Query nodes within an SVG.
   */
  function findNodes(svg, selector) {
    return Array.from(svg.querySelectorAll(selector));
  }

  /**
   * Clear all node selections in an SVG.
   */
  function clearSelections(svg) {
    findNodes(svg, '.node').forEach(function (n) {
      n.classList.remove('selected', 'dimmed', 'dimmed-by-dept');
    });
  }

  /**
   * Remove department highlight from body.
   */
  function clearDeptHighlight() {
    document.body.classList.remove('dept-highlight');
    delete document.body.dataset.activeDept;
  }

  return {
    create: create,
    processNode: processNode,
    decisionNode: decisionNode,
    exceptionNode: exceptionNode,
    automationNode: automationNode,
    stateBadge: stateBadge,
    deptLabel: deptLabel,
    connector: connector,
    curvedConnector: curvedConnector,
    handoffDot: handoffDot,
    handoffLabel: handoffLabel,
    findNodes: findNodes,
    clearSelections: clearSelections,
    clearDeptHighlight: clearDeptHighlight
  };
})();
