/* ============================================================
   VSN ERP Universal Workflow Presentation Engine — UI
   ============================================================
   Controls · Event Trace · Phase Progress · Keyboard
   ============================================================ */

window.WorkflowUI = (function () {
  'use strict';

  var Engine = window.WorkflowEngine;
  var escapeHtml = window.WorkflowRenderers ? window.WorkflowRenderers.escapeHtml : function (s) { return s; };

  /* ==========================================================
     1. CONTROLS
     ========================================================== */

  var Controls = {
    container: null,
    btnPlay: null,
    btnStep: null,
    btnBack: null,
    btnRestart: null,
    counter: null,
    progFill: null,
    spdBtns: [],

    init: function (container) {
      this.container = container;
      if (!container) return;

      container.innerHTML =
        '<button class="btn play" id="wfPlay">Play</button>' +
        '<button class="btn" id="wfStep">Step ›</button>' +
        '<button class="btn" id="wfBack">‹ Step</button>' +
        '<button class="btn" id="wfRestart">⟳</button>' +
        '<div class="speed-group">' +
          '<button class="spd on" data-speed="1">1×</button>' +
          '<button class="spd" data-speed="2">2×</button>' +
          '<button class="spd" data-speed="4">4×</button>' +
        '</div>' +
        '<div class="progress-info">' +
          '<span id="wfCounter">0 / 0</span>' +
          '<div class="prog-bar"><div class="prog-fill" id="wfProgFill"></div></div>' +
        '</div>';

      this.btnPlay = container.querySelector('#wfPlay');
      this.btnStep = container.querySelector('#wfStep');
      this.btnBack = container.querySelector('#wfBack');
      this.btnRestart = container.querySelector('#wfRestart');
      this.counter = container.querySelector('#wfCounter');
      this.progFill = container.querySelector('#wfProgFill');
      this.spdBtns = container.querySelectorAll('.spd');

      this.btnPlay.addEventListener('click', function () { Engine.togglePlay(); });
      this.btnStep.addEventListener('click', function () { Engine.stepForward(); });
      this.btnBack.addEventListener('click', function () { Engine.stepBack(); });
      this.btnRestart.addEventListener('click', function () { Engine.restart(); });

      this.spdBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          Engine.setSpeed(parseInt(btn.dataset.speed, 10) || 1);
        });
      });

      Engine.on('play', this.updatePlayState.bind(this));
      Engine.on('pause', this.updatePlayState.bind(this));
      Engine.on('stepChanged', this.updateProgress.bind(this));
      Engine.on('restart', this.updateProgress.bind(this));
      Engine.on('speedChanged', this.updateSpeed.bind(this));
      Engine.on('activated', this.onActivated.bind(this));
      Engine.on('deactivated', this.onDeactivated.bind(this));
    },

    onActivated: function () {
      var wf = Engine.getActive();
      if (wf && this.counter) this.counter.textContent = '0 / ' + wf.nodes.length;
      if (this.progFill) this.progFill.style.width = '0%';
      this.updatePlayState();
    },

    onDeactivated: function () {
      if (this.counter) this.counter.textContent = '0 / 0';
      if (this.progFill) this.progFill.style.width = '0%';
      this.updatePlayState();
    },

    updatePlayState: function () {
      if (!this.btnPlay) return;
      var isPlaying = Engine.isPlaying();
      this.btnPlay.textContent = isPlaying ? 'Pause' : 'Play';
      this.btnPlay.classList.toggle('active', isPlaying);
    },

    updateProgress: function () {
      var wf = Engine.getActive();
      if (!wf) return;
      var completed = Engine.getCompletedNodeIds().length;
      var total = wf.nodes.length;
      var pct = total > 0 ? (completed / total) * 100 : 0;

      if (this.counter) this.counter.textContent = completed + ' / ' + total;
      if (this.progFill) this.progFill.style.width = pct + '%';
    },

    updateSpeed: function () {
      var spd = Engine.getSpeed();
      this.spdBtns.forEach(function (btn) {
        btn.classList.toggle('on', parseInt(btn.dataset.speed, 10) === spd);
      });
    }
  };

  /* ==========================================================
     2. EVENT TRACE
     ========================================================== */

  var EventTrace = {
    container: null,
    eventsEl: null,
    countEl: null,
    entries: [],
    maxEntries: 200,

    init: function (container) {
      this.container = container;
      if (!container) return;
      this.eventsEl = container.querySelector('.trace-events');
      this.countEl = container.querySelector('.trace-count');

      Engine.on('stepChanged', this.onStepChanged.bind(this));
      Engine.on('activated', this.clear.bind(this));
      Engine.on('deactivated', this.clear.bind(this));
    },

    onStepChanged: function (data) {
      if (!data || !data.node) return;
      var node = data.node;
      if (!node.events || !node.events.length) return;

      var self = this;
      node.events.forEach(function (evt) {
        self.addEvent(evt, node);
      });
    },

    addEvent: function (event, node) {
      if (!this.eventsEl) return;

      var entry = {
        id: this.entries.length,
        timestamp: new Date(),
        type: event.type || 'info',
        text: event.text || event.message || '',
        nodeId: node ? node.id : null,
        department: node && node.owner ? (node.owner.department || '') : ''
      };

      this.entries.push(entry);
      if (this.entries.length > this.maxEntries) {
        this.entries.shift();
        this.renderAll();
        return;
      }

      this.renderEntry(entry);
      this.updateCount();
    },

    renderEntry: function (entry) {
      var now = entry.timestamp;
      var time = padZero(now.getHours()) + ':' + padZero(now.getMinutes()) + ':' + padZero(now.getSeconds());
      var icon = getEventIcon(entry.type);

      var div = document.createElement('div');
      div.className = 'trace-event te-' + entry.type;
      div.dataset.nodeId = entry.nodeId || '';
      div.dataset.dept = entry.department;
      div.innerHTML =
        '<span class="te-time">' + time + '</span>' +
        '<span class="te-icon">' + icon + '</span>' +
        '<span class="te-text">' + escapeHtml(entry.text) + '</span>';

      this.eventsEl.appendChild(div);
      this.eventsEl.scrollTop = this.eventsEl.scrollHeight;
    },

    renderAll: function () {
      if (!this.eventsEl) return;
      this.eventsEl.innerHTML = '';
      var self = this;
      this.entries.forEach(function (entry) { self.renderEntry(entry); });
      this.updateCount();
    },

    setFilter: function (filter) {
      if (!this.eventsEl) return;
      var filtered = filter ? this.entries.filter(function (e) {
        if (filter.department && e.department !== filter.department) return false;
        if (filter.type && e.type !== filter.type) return false;
        return true;
      }) : this.entries;

      this.eventsEl.innerHTML = '';
      var self = this;
      filtered.forEach(function (entry) { self.renderEntry(entry); });
    },

    updateCount: function () {
      if (this.countEl) this.countEl.textContent = this.entries.length;
    },

    clear: function () {
      this.entries = [];
      if (this.eventsEl) this.eventsEl.innerHTML = '';
      this.updateCount();
    }
  };

  /* ==========================================================
     3. PHASE PROGRESS
     ========================================================== */

  var PhaseProgress = {
    container: null,
    phases: [],

    init: function (container, phases) {
      this.container = container;
      this.phases = phases || [];
      if (!container) return;

      this.render();
      Engine.on('stepChanged', this.update.bind(this));
      Engine.on('activated', this.onActivated.bind(this));
      Engine.on('deactivated', this.onDeactivated.bind(this));
    },

    onActivated: function () {
      var wf = Engine.getActive();
      if (wf) {
        this.phases = wf.phases || [];
        this.render();
      }
    },

    onDeactivated: function () {
      if (this.container) this.container.innerHTML = '';
      this.phases = [];
    },

    render: function () {
      if (!this.container) return;
      var html = '';
      this.phases.forEach(function (phase, i) {
        html += '<div class="jphase">';
        html += '<div class="jdot" data-phase-idx="' + i + '"></div>';
        html += '<div class="jlabel" data-phase-idx="' + i + '">' + escapeHtml(phase.title) + '</div>';
        if (i < this.phases.length - 1) {
          html += '<div class="jconnect" data-phase-idx="' + i + '"></div>';
        }
        html += '</div>';
      }.bind(this));
      this.container.innerHTML = html;
    },

    update: function (data) {
      if (!this.container || !this.phases.length) return;
      var currentNodeId = data && data.node ? data.node.id : null;
      var activePhaseIdx = -1;

      if (currentNodeId) {
        var wf = Engine.getActive();
        if (wf) {
          for (var i = 0; i < this.phases.length; i++) {
            var phase = this.phases[i];
            if (this.isNodeInPhase(currentNodeId, phase, wf)) {
              activePhaseIdx = i;
              break;
            }
          }
        }
      }

      this.container.querySelectorAll('.jdot').forEach(function (el) {
        var idx = parseInt(el.dataset.phaseIdx, 10);
        el.classList.remove('active', 'completed');
        if (idx < activePhaseIdx) el.classList.add('completed');
        else if (idx === activePhaseIdx) el.classList.add('active');
      });

      this.container.querySelectorAll('.jlabel').forEach(function (el) {
        var idx = parseInt(el.dataset.phaseIdx, 10);
        el.classList.remove('active', 'completed');
        if (idx < activePhaseIdx) el.classList.add('completed');
        else if (idx === activePhaseIdx) el.classList.add('active');
      });

      this.container.querySelectorAll('.jconnect').forEach(function (el) {
        var idx = parseInt(el.dataset.phaseIdx, 10);
        el.classList.remove('active', 'completed');
        if (idx < activePhaseIdx) el.classList.add('completed');
        else if (idx === activePhaseIdx) el.classList.add('active');
      });
    },

    isNodeInPhase: function (nodeId, phase, wf) {
      if (!phase.startNode) return false;
      var startIdx = -1;
      var endIdx = -1;
      var nodeIdx = -1;

      for (var i = 0; i < wf.nodes.length; i++) {
        if (wf.nodes[i].id === phase.startNode) startIdx = i;
        if (wf.nodes[i].id === phase.endNode) endIdx = i;
        if (wf.nodes[i].id === nodeId) nodeIdx = i;
      }

      if (startIdx === -1) return false;
      if (endIdx === -1) endIdx = startIdx;
      return nodeIdx >= startIdx && nodeIdx <= endIdx;
    }
  };

  /* ==========================================================
     4. KEYBOARD
     ========================================================== */

  var Keyboard = {
    bound: false,

    init: function () {
      if (this.bound) return;
      this.bound = true;

      document.addEventListener('keydown', function (e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        if (!Engine.getActive()) return;

        switch (e.key) {
          case ' ':
            e.preventDefault();
            Engine.togglePlay();
            break;
          case 'ArrowRight':
            e.preventDefault();
            Engine.stepForward();
            break;
          case 'ArrowLeft':
            e.preventDefault();
            Engine.stepBack();
            break;
          case 'Escape':
            e.preventDefault();
            Engine.pause();
            break;
        }
      });
    }
  };

  /* ==========================================================
     5. INIT
     ========================================================== */

  function init(sectionEl) {
    if (!sectionEl) return;
    Controls.init(sectionEl.querySelector('.walkthrough-controls'));
    EventTrace.init(sectionEl.querySelector('.mini-trace'));
    PhaseProgress.init(sectionEl.querySelector('.journey-bar'), []);
    Keyboard.init();
  }

  Engine.on('activated', function (data) {
    if (data && data.section) init(data.section);
  });

  /* ==========================================================
     UTILITIES
     ========================================================== */

  function padZero(n) { return n < 10 ? '0' + n : '' + n; }

  function getEventIcon(type) {
    switch (type) {
      case 'success': return '✓';
      case 'error': return '✗';
      case 'warning': return '⚠';
      case 'decision': return '◆';
      case 'handoff': return '→';
      case 'parallel': return '∥';
      case 'automation': return '⚡';
      case 'milestone': return '★';
      default: return '•';
    }
  }

  /* ==========================================================
     PUBLIC API
     ========================================================== */

  return {
    Controls: Controls,
    EventTrace: EventTrace,
    PhaseProgress: PhaseProgress,
    Keyboard: Keyboard,
    init: init
  };

})();
