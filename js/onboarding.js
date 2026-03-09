/**
 * Onboarding / Help Walkthrough Engine
 *
 * Usage:
 *   Onboarding.init({
 *     key: 'adera_geo_onboarded',   // localStorage key
 *     steps: [
 *       { target: '.geo-map', text: 'Your location on the map.', position: 'below' },
 *       { target: '.settings', text: 'Adjust preferences.', position: 'above' }
 *     ],
 *     beforeStep: function(idx, step) { ... },  // optional hook before each step
 *     autoStart: true                            // default true
 *   });
 */
var Onboarding = (function() {
  var currentStep = 0;
  var isActive = false;
  var config = {};

  // DOM refs (set on init)
  var overlay, spotlight, tooltip, textEl, dotsEl, counterEl, arrowEl, nextBtn, phoneFrame;

  function injectHTML() {
    var frame = document.querySelector('.phone-frame');
    if (!frame) return;

    // Help button
    if (!document.getElementById('onboardHelpBtn')) {
      var btn = document.createElement('button');
      btn.className = 'onboard-help-btn';
      btn.id = 'onboardHelpBtn';
      btn.title = 'Show walkthrough';
      btn.textContent = '?';
      btn.onclick = function() { start(); };
      frame.appendChild(btn);
    }

    // Overlay
    if (!document.getElementById('onboardOverlay')) {
      var ov = document.createElement('div');
      ov.className = 'onboard-overlay';
      ov.id = 'onboardOverlay';
      frame.appendChild(ov);
    }

    // Spotlight
    if (!document.getElementById('onboardSpotlight')) {
      var sp = document.createElement('div');
      sp.className = 'onboard-spotlight';
      sp.id = 'onboardSpotlight';
      sp.style.display = 'none';
      frame.appendChild(sp);
    }

    // Tooltip
    if (!document.getElementById('onboardTooltip')) {
      var tt = document.createElement('div');
      tt.className = 'onboard-tooltip';
      tt.id = 'onboardTooltip';
      tt.style.display = 'none';
      tt.innerHTML =
        '<div class="arrow arrow-up" id="onboardArrow"></div>' +
        '<div class="ob-text" id="onboardText"></div>' +
        '<div class="ob-dots" id="onboardDots"></div>' +
        '<div class="ob-counter" id="onboardCounter"></div>' +
        '<div class="ob-actions">' +
          '<button class="ob-skip" onclick="Onboarding.skip()">Skip</button>' +
          '<button class="ob-next" id="onboardNextBtn" onclick="Onboarding.next()">Next</button>' +
        '</div>';
      frame.appendChild(tt);
    }
  }

  function cacheDom() {
    overlay    = document.getElementById('onboardOverlay');
    spotlight  = document.getElementById('onboardSpotlight');
    tooltip    = document.getElementById('onboardTooltip');
    textEl     = document.getElementById('onboardText');
    dotsEl     = document.getElementById('onboardDots');
    counterEl  = document.getElementById('onboardCounter');
    arrowEl    = document.getElementById('onboardArrow');
    nextBtn    = document.getElementById('onboardNextBtn');
    phoneFrame = document.querySelector('.phone-frame');
  }

  function getRelativeRect(el) {
    var frameRect = phoneFrame.getBoundingClientRect();
    var elRect = el.getBoundingClientRect();
    return {
      top: elRect.top - frameRect.top,
      left: elRect.left - frameRect.left,
      width: elRect.width,
      height: elRect.height,
      frameWidth: frameRect.width
    };
  }

  function showStep(idx) {
    currentStep = idx;
    var steps = config.steps;
    var step = steps[idx];

    // Optional hook (e.g. open/close sheets)
    if (config.beforeStep) {
      config.beforeStep(idx, step);
    }

    var pad = 8;

    var initialDelay = (step.openSheet || step.beforeDelay) ? 350 : 50;

    setTimeout(function() {
      var target = document.querySelector(step.target);
      if (!target) return;

      target.scrollIntoView({ behavior: 'smooth', block: 'center' });

      var settleDelay = (step.openSheet || step.closeSheet || step.beforeDelay) ? 400 : 100;

      setTimeout(function() {
        var rect = getRelativeRect(target);

        // Position spotlight
        spotlight.style.display = 'block';
        spotlight.style.top = (rect.top - pad) + 'px';
        spotlight.style.left = (rect.left - pad) + 'px';
        spotlight.style.width = (rect.width + pad * 2) + 'px';
        spotlight.style.height = (rect.height + pad * 2) + 'px';

        // Update text
        textEl.textContent = step.text;

        // Dots
        dotsEl.innerHTML = '';
        for (var i = 0; i < steps.length; i++) {
          var dot = document.createElement('div');
          dot.className = 'ob-dot' + (i === idx ? ' active' : '');
          dotsEl.appendChild(dot);
        }

        // Counter
        counterEl.textContent = 'Step ' + (idx + 1) + ' of ' + steps.length;

        // Button text
        nextBtn.textContent = (idx === steps.length - 1) ? 'Got it!' : 'Next';

        // Arrow direction & tooltip position
        arrowEl.className = 'arrow';
        var tooltipTop, tooltipLeft;
        var tooltipW = 280;

        if (step.position === 'below') {
          arrowEl.classList.add('arrow-up');
          tooltipTop = rect.top + rect.height + pad + 14;
          tooltipLeft = Math.max(10, Math.min(rect.left + rect.width / 2 - tooltipW / 2, rect.frameWidth - tooltipW - 10));
          var arrowOffset = rect.left + rect.width / 2 - tooltipLeft;
          arrowEl.style.left = arrowOffset + 'px';
          arrowEl.style.top = '-10px';
          arrowEl.style.bottom = '';
          arrowEl.style.transform = '';
        } else {
          arrowEl.classList.add('arrow-down');
          tooltip.style.display = 'block';
          tooltip.style.visibility = 'hidden';
          tooltip.style.left = '10px';
          tooltip.style.top = '0px';
          var ttHeight = tooltip.offsetHeight;
          tooltip.style.visibility = '';
          tooltipTop = rect.top - pad - 14 - ttHeight;
          tooltipLeft = Math.max(10, Math.min(rect.left + rect.width / 2 - tooltipW / 2, rect.frameWidth - tooltipW - 10));
          var arrowOffset2 = rect.left + rect.width / 2 - tooltipLeft;
          arrowEl.style.left = arrowOffset2 + 'px';
          arrowEl.style.bottom = '-10px';
          arrowEl.style.top = '';
          arrowEl.style.transform = '';
        }

        tooltip.style.display = 'block';
        tooltip.style.left = tooltipLeft + 'px';
        tooltip.style.top = tooltipTop + 'px';

        // Animate in
        tooltip.classList.remove('visible');
        requestAnimationFrame(function() {
          requestAnimationFrame(function() {
            tooltip.classList.add('visible');
          });
        });
      }, settleDelay);
    }, initialDelay);
  }

  function start() {
    if (isActive) return;
    isActive = true;

    // Optional cleanup hook
    if (config.onStart) config.onStart();

    overlay.style.display = 'block';
    overlay.classList.remove('hiding');
    overlay.classList.add('active');
    showStep(0);
  }

  function next() {
    if (currentStep < config.steps.length - 1) {
      tooltip.classList.remove('visible');
      setTimeout(function() {
        showStep(currentStep + 1);
      }, 200);
    } else {
      skip();
    }
  }

  function skip() {
    isActive = false;
    if (config.key) {
      localStorage.setItem(config.key, 'true');
    }

    // Optional cleanup hook
    if (config.onEnd) config.onEnd();

    tooltip.classList.remove('visible');
    overlay.classList.add('hiding');
    overlay.classList.remove('active');

    setTimeout(function() {
      overlay.style.display = 'none';
      overlay.classList.remove('hiding');
      spotlight.style.display = 'none';
      tooltip.style.display = 'none';
    }, 350);
  }

  function init(opts) {
    config = opts || {};
    if (!config.steps || !config.steps.length) return;

    injectHTML();
    cacheDom();

    // Expose globally for inline onclick fallback
    window.startOnboarding = start;
    window.nextStep = next;
    window.skipOnboarding = skip;

    // Auto-start on first visit
    var autoStart = config.autoStart !== false;
    if (autoStart && config.key && !localStorage.getItem(config.key)) {
      setTimeout(function() {
        start();
      }, 1000);
    }
  }

  return {
    init: init,
    start: start,
    next: next,
    skip: skip
  };
})();
