/* ============================================================
   VSN ERP Visual Workflow System — App Navigation
   ============================================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    initMobileNav();
    initSidebarSections();
    showSection('overview');
  });

  /* ---- Section Navigation ---- */
  function initNavigation() {
    document.querySelectorAll('.sidebar-link').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var target = this.getAttribute('data-target');
        if (target) {
          showSection(target);
          closeMobileNav();
        }
      });
    });
  }

  function showSection(targetId) {
    // Hide all sections
    document.querySelectorAll('.page-section').forEach(function (s) {
      s.classList.remove('active');
    });

    // Deactivate all sidebar links
    document.querySelectorAll('.sidebar-link').forEach(function (l) {
      l.classList.remove('active');
    });

    // Show target section
    var section = document.getElementById(targetId);
    if (section) {
      section.classList.add('active');
    }

    // Activate matching sidebar link
    var link = document.querySelector('.sidebar-link[data-target="' + targetId + '"]');
    if (link) {
      link.classList.add('active');
    }

    // Initialize diagram interactions for this section
    if (section && typeof initDiagramInteractions === 'function') {
      initDiagramInteractions(section);
    }

    // Initialize workflow engine for applicable sections
    if (section && typeof WorkflowEngine !== 'undefined') {
      var workflowId = section.dataset.workflow;
      if (workflowId) {
        WorkflowEngine.activate(workflowId, section);
      } else if (targetId === 'overview') {
        WorkflowEngine.activate('overview', section);
      }
    }

    // Persist last viewed section
    try {
      localStorage.setItem('vsn-last-section', targetId);
    } catch (e) {
      // localStorage unavailable
    }
  }

  /* ---- Mobile Navigation ---- */
  function initMobileNav() {
    var hamburger = document.querySelector('.hamburger');
    var overlay = document.querySelector('.sidebar-overlay');

    if (hamburger) {
      hamburger.addEventListener('click', function () {
        var sidebar = document.querySelector('.sidebar');
        var isOpen = sidebar.classList.contains('open');
        if (isOpen) {
          closeMobileNav();
        } else {
          openMobileNav();
        }
      });
    }

    if (overlay) {
      overlay.addEventListener('click', function () {
        closeMobileNav();
      });
    }
  }

  function openMobileNav() {
    document.querySelector('.sidebar').classList.add('open');
    document.querySelector('.hamburger').classList.add('open');
    document.querySelector('.sidebar-overlay').classList.add('visible');
  }

  function closeMobileNav() {
    var sidebar = document.querySelector('.sidebar');
    var hamburger = document.querySelector('.hamburger');
    var overlay = document.querySelector('.sidebar-overlay');
    if (sidebar) sidebar.classList.remove('open');
    if (hamburger) hamburger.classList.remove('open');
    if (overlay) overlay.classList.remove('visible');
  }

  /* ---- Sidebar Section Collapse ---- */
  function initSidebarSections() {
    document.querySelectorAll('.sidebar-section-header').forEach(function (header) {
      header.addEventListener('click', function () {
        var section = this.closest('.sidebar-section');
        if (section) {
          section.classList.toggle('collapsed');
          saveSidebarState();
        }
      });
    });

    // Restore collapsed state from localStorage
    restoreSidebarState();
  }

  function saveSidebarState() {
    try {
      var collapsed = [];
      document.querySelectorAll('.sidebar-section').forEach(function (section, i) {
        if (section.classList.contains('collapsed')) {
          collapsed.push(i);
        }
      });
      localStorage.setItem('vsn-sidebar-collapsed', JSON.stringify(collapsed));
    } catch (e) {
      // localStorage unavailable
    }
  }

  function restoreSidebarState() {
    try {
      var data = localStorage.getItem('vsn-sidebar-collapsed');
      if (data) {
        var collapsed = JSON.parse(data);
        document.querySelectorAll('.sidebar-section').forEach(function (section, i) {
          if (collapsed.indexOf(i) !== -1) {
            section.classList.add('collapsed');
          }
        });
      }
    } catch (e) {
      // localStorage unavailable
    }
  }
})();
