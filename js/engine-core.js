/* ============================================================
   VSN ERP Universal Workflow Presentation Engine — Core
   ============================================================
   Validation · State · Timeline · Event Bus · Lifecycle
   ============================================================ */

window.WorkflowEngine = (function () {
  'use strict';

  /* ==========================================================
     1. REGISTRY
     ========================================================== */

  var workflows = {};

  function register(def) {
    if (!def) { console.error('WorkflowEngine.register: no workflow provided'); return false; }
    var errors = validate(def);
    if (errors.length) {
      console.error('WorkflowEngine: Invalid workflow "' + (def.id || 'unknown') + '":');
      errors.forEach(function (e) { console.error('  · ' + e); });
      return false;
    }
    workflows[def.id] = def;
    return true;
  }

  /* ==========================================================
     2. VALIDATION
     ========================================================== */

  function validate(def) {
    var errors = [];

    if (!def.id) errors.push('Missing workflow id');
    if (!def.title) errors.push('Missing workflow title');
    if (!def.nodes || !def.nodes.length) errors.push('No nodes defined');
    if (!def.start) errors.push('Missing start node');
    if (!def.completion || !def.completion.length) errors.push('No completion nodes');

    var nodeIds = {};
    (def.nodes || []).forEach(function (n) {
      if (!n.id) errors.push('Node missing id');
      if (!n.type) errors.push('Node "' + n.id + '" missing type');
      if (!n.title) errors.push('Node "' + n.id + '" missing title');
      if (nodeIds[n.id]) errors.push('Duplicate node id: ' + n.id);
      nodeIds[n.id] = true;
    });

    (def.edges || []).forEach(function (e, i) {
      if (!e.id) errors.push('Edge[' + i + '] missing id');
      if (!e.from) errors.push('Edge[' + (e.id || i) + '] missing from');
      if (!e.to) errors.push('Edge[' + (e.id || i) + '] missing to');
      if (e.from && !nodeIds[e.from]) errors.push('Edge references unknown node: ' + e.from);
      if (e.to && !nodeIds[e.to]) errors.push('Edge references unknown node: ' + e.to);
    });

    if (def.start && !nodeIds[def.start]) errors.push('Start node not found: ' + def.start);
    (def.completion || []).forEach(function (c) {
      if (!nodeIds[c]) errors.push('Completion node not found: ' + c);
    });

    return errors;
  }

  /* ==========================================================
     3. EVENT BUS
     ========================================================== */

  var listeners = {};

  function on(event, fn) {
    if (!listeners[event]) { listeners[event] = []; }
    listeners[event].push(fn);
  }

  function off(event, fn) {
    if (!listeners[event]) { return; }
    listeners[event] = listeners[event].filter(function (f) { return f !== fn; });
  }

  function emit(event, data) {
    if (!listeners[event]) { return; }
    listeners[event].forEach(function (fn) { fn(data); });
  }

  /* ==========================================================
     4. STATE
     ========================================================== */

  var active = null;
  var activeSection = null;
  var nodeStates = {};
  var edgeStates = {};
  var activeNodeIds = [];
  var completedNodeIds = [];

  var NODE_STATES = {
    upcoming: 'upcoming',
    active: 'active',
    completed: 'completed',
    blocked: 'blocked',
    waiting: 'waiting',
    pendingApproval: 'pending-approval',
    overdue: 'overdue',
    escalated: 'escalated',
    exception: 'exception',
    cancelled: 'cancelled'
  };

  function resetStates() {
    nodeStates = {};
    edgeStates = {};
    activeNodeIds = [];
    completedNodeIds = [];
    if (!active) return;
    active.nodes.forEach(function (n) { nodeStates[n.id] = NODE_STATES.upcoming; });
    if (active.edges) {
      active.edges.forEach(function (e) { edgeStates[e.id] = NODE_STATES.upcoming; });
    }
  }

  function getStates() {
    return {
      nodes: Object.assign({}, nodeStates),
      edges: Object.assign({}, edgeStates)
    };
  }

  function getNodeState(nodeId) {
    return nodeStates[nodeId] || NODE_STATES.upcoming;
  }

  /* ==========================================================
     5. GRAPH STATE
     ========================================================== */

  function canActivate(nodeId) {
    if (!active) return false;
    var incoming = (active.edges || []).filter(function (e) { return e.to === nodeId; });
    if (incoming.length === 0) {
      return nodeId === active.start;
    }
    return incoming.every(function (e) {
      return completedNodeIds.indexOf(e.from) !== -1;
    });
  }

  function activateNode(nodeId) {
    if (nodeStates[nodeId] === 'active' || nodeStates[nodeId] === 'completed') return;
    nodeStates[nodeId] = NODE_STATES.active;
    if (activeNodeIds.indexOf(nodeId) === -1) {
      activeNodeIds.push(nodeId);
    }

    // Mark incoming edges as active
    if (active && active.edges) {
      active.edges.forEach(function (e) {
        if (e.to === nodeId && edgeStates[e.id] !== 'completed') {
          edgeStates[e.id] = NODE_STATES.active;
        }
      });
    }
  }

  function completeNode(nodeId) {
    nodeStates[nodeId] = NODE_STATES.completed;
    activeNodeIds = activeNodeIds.filter(function (id) { return id !== nodeId; });
    if (completedNodeIds.indexOf(nodeId) === -1) {
      completedNodeIds.push(nodeId);
    }

    // Mark outgoing edges as completed
    if (active && active.edges) {
      active.edges.forEach(function (e) {
        if (e.from === nodeId) edgeStates[e.id] = NODE_STATES.completed;
      });
    }
  }

  function checkDownstream() {
    if (!active || !active.nodes) return;
    active.nodes.forEach(function (node) {
      if (nodeStates[node.id] === NODE_STATES.upcoming && canActivate(node.id)) {
        activateNode(node.id);
      }
    });
  }

  /* ==========================================================
     6. TIMELINE CONTROLLER
     ========================================================== */

  var playing = false;
  var speed = 1;
  var timer = null;
  var stepDelay = 1800;

  function play() {
    if (!active) return;
    playing = true;
    emit('play', { activeNodeIds: activeNodeIds.slice() });
    scheduleNext();
  }

  function pause() {
    playing = false;
    clearTimeout(timer);
    timer = null;
    emit('pause', { activeNodeIds: activeNodeIds.slice() });
  }

  function togglePlay() {
    if (playing) { pause(); } else { play(); }
  }

  function scheduleNext() {
    clearTimeout(timer);
    if (!playing) return;
    timer = setTimeout(function () {
      if (!playing) return;
      // Find next node to activate
      var nextNode = findNextNode();
      if (!nextNode) {
        pause();
        emit('walkthroughComplete');
        return;
      }

      // Complete all currently active nodes
      activeNodeIds.slice().forEach(function (id) { completeNode(id); });

      // Handle parallel nodes
      if (nextNode.type === 'parallel') {
        handleParallelNode(nextNode);
      } else {
        activateNode(nextNode.id);
      }

      emit('stepChanged', {
        node: nextNode,
        states: getStates(),
        activeNodeIds: activeNodeIds.slice(),
        completedNodeIds: completedNodeIds.slice()
      });

      // Check completion
      if (isComplete()) {
        pause();
        emit('walkthroughComplete');
        return;
      }

      scheduleNext();
    }, stepDelay / speed);
  }

  function findNextNode() {
    if (!active || !active.nodes) return null;

    // Check if we're at start
    if (completedNodeIds.length === 0 && activeNodeIds.length === 0) {
      var startNode = active.nodes.find(function (n) { return n.id === active.start; });
      return startNode || null;
    }

    // Find nodes whose edges are all from completed nodes
    for (var i = 0; i < active.nodes.length; i++) {
      var node = active.nodes[i];
      if (nodeStates[node.id] !== NODE_STATES.upcoming) continue;
      if (canActivate(node.id)) return node;
    }

    // Check if parallel branches have more steps
    if (activeNodeIds.length > 0) {
      var parallelNext = findParallelNext();
      if (parallelNext) return parallelNext;
    }

    return null;
  }

  function findParallelNext() {
    if (!active) return null;
    // Find any parallel node that's active and has unfinished branches
    for (var i = 0; i < active.nodes.length; i++) {
      var node = active.nodes[i];
      if (node.type !== 'parallel') continue;
      if (nodeStates[node.id] !== NODE_STATES.active) continue;

      // Check each branch
      for (var b = 0; b < node.branches.length; b++) {
        var branch = node.branches[b];
        for (var s = 0; s < branch.steps.length; s++) {
          if (nodeStates[branch.steps[s]] === NODE_STATES.upcoming) {
            return active.nodes.find(function (n) { return n.id === branch.steps[s]; });
          }
        }
      }
    }
    return null;
  }

  function handleParallelNode(node) {
    activateNode(node.id);
    node.branches.forEach(function (branch) {
      if (branch.steps && branch.steps.length) {
        activateNode(branch.steps[0]);
      }
    });
  }

  function completeBranchStep(branchId, stepId) {
    completeNode(stepId);

    var parallelNode = null;
    for (var i = 0; i < active.nodes.length; i++) {
      var n = active.nodes[i];
      if (n.type !== 'parallel') continue;
      for (var b = 0; b < n.branches.length; b++) {
        if (n.branches[b].id === branchId) {
          parallelNode = n;
          break;
        }
      }
      if (parallelNode) break;
    }

    if (!parallelNode) return;

    var branch = parallelNode.branches.find(function (br) { return br.id === branchId; });
    var stepIdx = branch.steps.indexOf(stepId);

    if (stepIdx < branch.steps.length - 1) {
      activateNode(branch.steps[stepIdx + 1]);
    } else {
      checkParallelJoin(parallelNode);
    }
  }

  function checkParallelJoin(parallelNode) {
    var allComplete = parallelNode.branches.every(function (branch) {
      return branch.steps.every(function (stepId) {
        return nodeStates[stepId] === NODE_STATES.completed;
      });
    });

    if (allComplete && parallelNode.join) {
      completeNode(parallelNode.id);
      activateNode(parallelNode.join);
    }
  }

  function isComplete() {
    if (!active) return false;
    return active.completion.every(function (id) {
      return nodeStates[id] === NODE_STATES.completed;
    });
  }

  function stepForward() {
    pause();
    if (!active) return;
    var nextNode = findNextNode();
    if (!nextNode) return;

    activeNodeIds.slice().forEach(function (id) { completeNode(id); });

    if (nextNode.type === 'parallel') {
      handleParallelNode(nextNode);
    } else {
      activateNode(nextNode.id);
    }

    emit('stepChanged', {
      node: nextNode,
      states: getStates(),
      activeNodeIds: activeNodeIds.slice(),
      completedNodeIds: completedNodeIds.slice()
    });
  }

  function stepBack() {
    pause();
    if (!active) return;
    if (completedNodeIds.length === 0) { restart(); return; }

    // Remove last completed node and reset to previous state
    var lastCompleted = completedNodeIds.pop();
    nodeStates[lastCompleted] = NODE_STATES.upcoming;
    activeNodeIds = activeNodeIds.filter(function (id) { return id !== lastCompleted; });

    // Rebuild state from remaining completed nodes
    resetStates();
    completedNodeIds.forEach(function (id) {
      nodeStates[id] = NODE_STATES.completed;
    });
    completedNodeIds = completedNodeIds.slice(); // restore

    // Find and activate the last completed node
    if (completedNodeIds.length > 0) {
      var prevNodeId = completedNodeIds[completedNodeIds.length - 1];
      nodeStates[prevNodeId] = NODE_STATES.active;
      activeNodeIds = [prevNodeId];
    }

    checkDownstream();

    emit('stepChanged', {
      node: completedNodeIds.length > 0 ? active.nodes.find(function (n) { return n.id === completedNodeIds[completedNodeIds.length - 1]; }) : null,
      states: getStates(),
      activeNodeIds: activeNodeIds.slice(),
      completedNodeIds: completedNodeIds.slice()
    });
  }

  function restart() {
    pause();
    resetStates();
    activeNodeIds = [];
    completedNodeIds = [];
    emit('restart');
    emit('stepChanged', {
      node: null,
      states: getStates(),
      activeNodeIds: [],
      completedNodeIds: []
    });
  }

  function seek(index) {
    pause();
    if (!active) return;
    if (index < 0) { restart(); return; }
    if (index >= active.nodes.length) index = active.nodes.length - 1;

    // Rebuild to target index
    resetStates();
    for (var i = 0; i <= index; i++) {
      var node = active.nodes[i];
      if (i < index) {
        nodeStates[node.id] = NODE_STATES.completed;
        completedNodeIds.push(node.id);
      } else {
        nodeStates[node.id] = NODE_STATES.active;
        activeNodeIds.push(node.id);
      }
    }

    // Mark edges
    if (active.edges) {
      active.edges.forEach(function (e) {
        if (completedNodeIds.indexOf(e.from) !== -1) {
          edgeStates[e.id] = NODE_STATES.completed;
        }
      });
    }

    emit('stepChanged', {
      node: active.nodes[index],
      states: getStates(),
      activeNodeIds: activeNodeIds.slice(),
      completedNodeIds: completedNodeIds.slice()
    });
  }

  function setSpeed(multiplier) {
    speed = multiplier;
    emit('speedChanged', { speed: speed });
  }

  /* ==========================================================
     7. LIFECYCLE
     ========================================================== */

  function activate(workflowId, sectionEl) {
    var def = workflows[workflowId];
    if (!def) {
      console.error('WorkflowEngine.activate: unknown workflow "' + workflowId + '"');
      return false;
    }

    if (active) { pause(); }
    active = def;
    activeSection = sectionEl;
    resetStates();
    activeNodeIds = [];
    completedNodeIds = [];

    emit('activated', { workflow: active, section: sectionEl });

    emit('stepChanged', {
      node: null,
      states: getStates(),
      activeNodeIds: [],
      completedNodeIds: []
    });

    return true;
  }

  function deactivate() {
    pause();
    active = null;
    activeSection = null;
    resetStates();
    activeNodeIds = [];
    completedNodeIds = [];
    emit('deactivated');
  }

  /* ==========================================================
     8. GETTERS
     ========================================================== */

  function getActive() { return active; }
  function getActiveSection() { return activeSection; }
  function isPlaying() { return playing; }
  function getSpeed() { return speed; }
  function getActiveNodeIds() { return activeNodeIds.slice(); }
  function getCompletedNodeIds() { return completedNodeIds.slice(); }

  /* ==========================================================
     9. PUBLIC API
     ========================================================== */

  return {
    register: register,
    activate: activate,
    deactivate: deactivate,

    play: play,
    pause: pause,
    togglePlay: togglePlay,
    stepForward: stepForward,
    stepBack: stepBack,
    restart: restart,
    seek: seek,
    setSpeed: setSpeed,

    getActive: getActive,
    getActiveSection: getActiveSection,
    getStates: getStates,
    getNodeState: getNodeState,
    getActiveNodeIds: getActiveNodeIds,
    getCompletedNodeIds: getCompletedNodeIds,
    isPlaying: isPlaying,
    getSpeed: getSpeed,
    NODE_STATES: NODE_STATES,

    on: on,
    off: off,
    emit: emit
  };

})();
