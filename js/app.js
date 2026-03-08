/* Adera Sales — Shared App JS */

/* ── Drawer ── */
function openDrawer() {
  document.getElementById('drawer').classList.add('open');
  document.getElementById('overlay').classList.add('open');
}
function closeDrawer() {
  document.getElementById('drawer').classList.remove('open');
  document.getElementById('overlay').classList.remove('open');
}

/* ── Tap animation ── */
function tap(el) {
  el.style.transform = 'scale(0.93)';
  setTimeout(() => { el.style.transform = ''; }, 160);
}

/* ── Tab switching ── */
function switchTab(groupName, clickedTab) {
  const tabs = document.querySelectorAll(`[data-tabgroup="${groupName}"]`);
  tabs.forEach(t => t.classList.remove('active'));
  clickedTab.classList.add('active');
}

/* ── Chip toggle ── */
function toggleChip(el) {
  el.classList.toggle('active');
}
function selectChip(el) {
  const parent = el.parentElement;
  parent.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
}

/* ── Target Sheet ── */
function openTarget() {
  var overlay = document.getElementById('targetOverlay');
  var sheet = document.getElementById('targetSheet');
  if (overlay) overlay.classList.add('open');
  if (sheet) sheet.classList.add('open');
}
function closeTarget() {
  var overlay = document.getElementById('targetOverlay');
  var sheet = document.getElementById('targetSheet');
  if (sheet) sheet.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
}

/* ── Navigate to module ── */
function goTo(page) {
  window.location.href = page;
}
function goBack() {
  if (window.history.length > 1) window.history.back();
  else window.location.href = '../index.html';
}

/* ── Register Service Worker ── */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

/* ── Real-time clock in status bar ── */
function updateClock() {
  const el = document.querySelector('.status-bar .time');
  if (!el) return;
  const now = new Date();
  const h = now.getHours().toString().padStart(2, '0');
  const m = now.getMinutes().toString().padStart(2, '0');
  el.textContent = `${h}:${m}`;
}
updateClock();
setInterval(updateClock, 1000);

/* ── Form Validation ── */
function validateForm(rules) {
  clearValidation();
  var valid = true;
  var firstInvalid = null;
  for (var i = 0; i < rules.length; i++) {
    var rule = rules[i];
    var el = typeof rule.el === 'string' ? document.querySelector(rule.el) : rule.el;
    if (!el) continue;
    var value = (el.value || '').trim();
    var msg = '';

    if (rule.required && !value) {
      msg = rule.message || 'This field is required';
    } else if (rule.minLength && value.length < rule.minLength) {
      msg = rule.message || 'Must be at least ' + rule.minLength + ' characters';
    } else if (rule.min !== undefined && value && Number(value) < rule.min) {
      msg = rule.message || 'Must be at least ' + rule.min;
    } else if (rule.pattern && value && !rule.pattern.test(value)) {
      msg = rule.message || 'Invalid format';
    } else if (rule.custom && !rule.custom(value, el)) {
      msg = rule.message || 'Invalid value';
    }

    if (msg) {
      valid = false;
      el.classList.add('is-invalid');
      if (el.parentElement && el.parentElement.classList.contains('login-input-wrap')) {
        el.parentElement.classList.add('is-invalid');
      }
      var errSpan = document.createElement('span');
      errSpan.className = 'form-error';
      errSpan.textContent = msg;
      var parent = el.closest('.form-group') || el.parentElement;
      parent.appendChild(errSpan);
      if (!firstInvalid) firstInvalid = el;
    }
  }
  if (!valid && firstInvalid) {
    firstInvalid.focus();
    showToast('Please fix the highlighted errors', 'error');
  }
  return valid;
}

function clearValidation() {
  document.querySelectorAll('.is-invalid').forEach(function(el) { el.classList.remove('is-invalid'); });
  document.querySelectorAll('.form-error').forEach(function(el) { el.remove(); });
}

/* ── Toast Notifications ── */
function showToast(message, type, duration) {
  type = type || 'info';
  duration = duration || 2500;
  var container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  var toast = document.createElement('div');
  toast.className = 'toast toast-' + type;
  var icons = {
    success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
    warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
  };
  toast.innerHTML = '<span class="toast-icon">' + (icons[type] || icons.info) + '</span><span class="toast-msg">' + message + '</span>';
  container.appendChild(toast);
  requestAnimationFrame(function() { toast.classList.add('show'); });
  setTimeout(function() {
    toast.classList.remove('show');
    toast.classList.add('hide');
    setTimeout(function() { toast.remove(); }, 300);
  }, duration);
}

/* ═══ Empty / Error States ═══ */
function showEmptyState(containerId, opts) {
  opts = opts || {};
  var icon = opts.icon || '<svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.5" style="width:48px;height:48px;"><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>';
  var title = opts.title || 'No data yet';
  var sub = opts.sub || 'Items will appear here once added';
  var el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = '<div style="text-align:center;padding:32px 20px;">' +
    '<div style="margin:0 auto 12px;">' + icon + '</div>' +
    '<div style="font-size:15px;font-weight:700;color:#1a2540;margin-bottom:4px;">' + title + '</div>' +
    '<div style="font-size:12px;color:#94a3b8;line-height:1.5;">' + sub + '</div></div>';
}

function showErrorState(containerId, opts) {
  opts = opts || {};
  var title = opts.title || 'Something went wrong';
  var sub = opts.sub || 'Could not load data. Pull down to retry.';
  var el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = '<div style="text-align:center;padding:32px 20px;">' +
    '<div style="margin:0 auto 12px;"><svg viewBox="0 0 24 24" fill="none" stroke="#e05252" stroke-width="1.5" style="width:48px;height:48px;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>' +
    '<div style="font-size:15px;font-weight:700;color:#e05252;margin-bottom:4px;">' + title + '</div>' +
    '<div style="font-size:12px;color:#94a3b8;line-height:1.5;">' + sub + '</div>' +
    (opts.retryFn ? '<button onclick="' + opts.retryFn + '" style="margin-top:12px;padding:8px 20px;border-radius:10px;background:var(--primary);color:#fff;border:none;font-size:13px;font-weight:600;cursor:pointer;">Retry</button>' : '') +
    '</div>';
}

/* ═══ State Persistence (localStorage) ═══ */
var AppState = {
  get: function(key, fallback) {
    try {
      var val = localStorage.getItem('adera_' + key);
      return val !== null ? JSON.parse(val) : (fallback !== undefined ? fallback : null);
    } catch(e) { return fallback !== undefined ? fallback : null; }
  },
  set: function(key, value) {
    try { localStorage.setItem('adera_' + key, JSON.stringify(value)); } catch(e) {}
  },
  remove: function(key) {
    try { localStorage.removeItem('adera_' + key); } catch(e) {}
  }
};

/* ── Check-In / Check-Out State ── */
function getCheckinStatus() {
  var data = AppState.get('checkin', null);
  if (!data) return { checked: false };
  // Auto-reset if checkin was from a previous day
  var today = new Date().toDateString();
  if (data.date !== today) {
    AppState.remove('checkin');
    return { checked: false };
  }
  return data;
}

function performCheckin(callback) {
  var status = getCheckinStatus();
  if (status.checked && !status.checkedOut) {
    // Already checked in, do checkout
    var now = new Date();
    status.checkedOut = true;
    status.checkoutTime = now.toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit' });
    AppState.set('checkin', status);
    showToast('Checked out at ' + status.checkoutTime, 'success');
    if (callback) callback(status);
    return status;
  }

  // Perform check-in
  var now = new Date();
  var data = {
    checked: true,
    checkedOut: false,
    date: now.toDateString(),
    checkinTime: now.toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit' }),
    checkoutTime: null
  };

  // Try to get GPS
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(pos) {
      data.lat = pos.coords.latitude.toFixed(6);
      data.lng = pos.coords.longitude.toFixed(6);
      AppState.set('checkin', data);
      showToast('Checked in at ' + data.checkinTime, 'success');
      if (callback) callback(data);
    }, function() {
      AppState.set('checkin', data);
      showToast('Checked in at ' + data.checkinTime + ' (no GPS)', 'warning');
      if (callback) callback(data);
    }, { timeout: 5000 });
  } else {
    AppState.set('checkin', data);
    showToast('Checked in at ' + data.checkinTime, 'success');
    if (callback) callback(data);
  }
  return data;
}

/* ── Cart Persistence ── */
function getCart() { return AppState.get('cart', []); }
function saveCart(items) { AppState.set('cart', items); }
function addToCart(item) {
  var cart = getCart();
  var existing = cart.find(function(c) { return c.id === item.id; });
  if (existing) {
    existing.qty = (existing.qty || 1) + (item.qty || 1);
  } else {
    item.qty = item.qty || 1;
    cart.push(item);
  }
  saveCart(cart);
  return cart;
}
function removeFromCart(itemId) {
  var cart = getCart().filter(function(c) { return c.id !== itemId; });
  saveCart(cart);
  return cart;
}
function clearCart() { AppState.remove('cart'); }
function getCartCount() { return getCart().length; }

/* ── Draft Persistence (EOD, notes, etc.) ── */
function saveDraft(key, data) { AppState.set('draft_' + key, data); }
function getDraft(key) { return AppState.get('draft_' + key, null); }
function clearDraft(key) { AppState.remove('draft_' + key); }

/* ── Filter/Tab State Persistence ── */
function saveFilterState(page, state) { AppState.set('filter_' + page, state); }
function getFilterState(page) { return AppState.get('filter_' + page, null); }

/* ═══ Skeleton Loading Helper ═══ */
function showSkeleton(containerId, count) {
  count = count || 3;
  var container = document.getElementById(containerId);
  if (!container) return;
  var html = '';
  for (var i = 0; i < count; i++) {
    html += '<div class="skeleton-card"><div class="flex gap-12"><div class="skeleton skeleton-circle" style="width:44px;height:44px;flex-shrink:0;"></div><div style="flex:1;"><div class="skeleton skeleton-text w-60"></div><div class="skeleton skeleton-text w-80"></div><div class="skeleton skeleton-text w-40"></div></div></div></div>';
  }
  container.innerHTML = html;
}

function hideSkeleton(containerId, realContent) {
  var container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = realContent;
  // Add fade-in to children
  var children = container.children;
  for (var i = 0; i < children.length; i++) {
    children[i].classList.add('fade-in');
  }
}

/* ═══ Pull to refresh illusion ═══ */
function simulateRefresh(callback) {
  var ptr = document.querySelector('.ptr-indicator');
  if (ptr) {
    ptr.classList.add('visible');
    ptr.innerHTML = '<div class="ptr-spinner"></div><div style="margin-top:6px;">Refreshing...</div>';
  }
  setTimeout(function() {
    if (ptr) {
      ptr.innerHTML = '<div style="color:var(--success);font-weight:700;">Updated!</div>';
      setTimeout(function() { ptr.classList.remove('visible'); }, 800);
    }
    if (callback) callback();
    showToast('Data refreshed', 'success');
  }, 1500);
}

/* ═══════════════════════════════════════════════════════
   Injected Drawer & Bottom Nav
   ─ Only applies to pages that opt in with data-inject
   ═══════════════════════════════════════════════════════ */

/* ── Inject Drawer ── */
function injectDrawer(activePage) {
  var drawerEl = document.getElementById('drawer');
  if (!drawerEl || !drawerEl.hasAttribute('data-inject')) return;

  var isModule = window.location.pathname.includes('/modules/');
  var prefix = isModule ? '' : 'modules/';
  var homeLink = isModule ? '../index.html' : 'index.html';

  function ac(page) {
    return activePage === page ? ' active' : '';
  }

  // Ensure overlay exists for drawer backdrop
  var overlay = document.getElementById('overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'drawer-overlay';
    overlay.id = 'overlay';
    overlay.setAttribute('onclick', 'closeDrawer()');
    drawerEl.parentNode.insertBefore(overlay, drawerEl);
  }

  drawerEl.className = 'drawer';
  drawerEl.innerHTML =
    /* ── Header ── */
    '<div class="drawer-header">' +
      '<div class="drawer-avatar">\uD83D\uDC64</div>' +
      '<div class="drawer-name">Elon Musk</div>' +
      '<div class="drawer-role">Sales Representative \u00B7 Kathmandu</div>' +
      '<button class="drawer-target-btn" onclick="closeDrawer(); setTimeout(openTarget, 300);">\uD83C\uDFAF Your Target</button>' +
    '</div>' +

    /* ── Navigation ── */
    '<div class="drawer-section-title">Navigation</div>' +

    '<div class="drawer-item' + ac('home') + '" onclick="goTo(\'' + homeLink + '\')">' +
      '<div class="drawer-item-icon ic-blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>' +
      '<span class="drawer-item-label">Home</span>' +
    '</div>' +

    '<div class="drawer-item' + ac('parties') + '" onclick="goTo(\'' + prefix + 'parties.html\')">' +
      '<div class="drawer-item-icon ic-blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg></div>' +
      '<span class="drawer-item-label">Parties</span>' +
    '</div>' +

    '<div class="drawer-item' + ac('orders') + '" onclick="goTo(\'' + prefix + 'orders.html\')">' +
      '<div class="drawer-item-icon ic-orange"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg></div>' +
      '<span class="drawer-item-label">Orders</span>' +
    '</div>' +

    '<div class="drawer-item' + ac('collections') + '" onclick="goTo(\'' + prefix + 'collections.html\')">' +
      '<div class="drawer-item-icon ic-green"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg></div>' +
      '<span class="drawer-item-label">Collection</span>' +
    '</div>' +

    '<div class="drawer-item' + ac('attendance') + '" onclick="goTo(\'' + prefix + 'attendance.html\')">' +
      '<div class="drawer-item-icon ic-indigo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg></div>' +
      '<span class="drawer-item-label">Attendance</span>' +
    '</div>' +

    '<div class="drawer-item' + ac('leaves') + '" onclick="goTo(\'' + prefix + 'leaves.html\')">' +
      '<div class="drawer-item-icon ic-teal"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div>' +
      '<span class="drawer-item-label">Leave</span>' +
    '</div>' +

    '<div class="drawer-item' + ac('notes') + '" onclick="goTo(\'' + prefix + 'notes.html\')">' +
      '<div class="drawer-item-icon ic-teal"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg></div>' +
      '<span class="drawer-item-label">Notes</span>' +
    '</div>' +

    /* ── DMS Modules ── */
    '<div class="drawer-divider"></div>' +
    '<div class="drawer-section-title">DMS Modules</div>' +

    '<div class="drawer-item' + ac('inventory') + '" onclick="goTo(\'' + prefix + 'inventory.html\')">' +
      '<div class="drawer-item-icon ic-teal"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg></div>' +
      '<span class="drawer-item-label">Inventory</span>' +
    '</div>' +

    '<div class="drawer-item' + ac('salesforce') + '" onclick="goTo(\'' + prefix + 'salesforce.html\')">' +
      '<div class="drawer-item-icon ic-indigo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg></div>' +
      '<span class="drawer-item-label">Sales Force</span>' +
    '</div>' +

    '<div class="drawer-item' + ac('reports') + '" onclick="goTo(\'' + prefix + 'reports.html\')">' +
      '<div class="drawer-item-icon ic-purple"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div>' +
      '<span class="drawer-item-label">Reports</span>' +
    '</div>' +

    '<div class="drawer-item' + ac('config') + '" onclick="goTo(\'' + prefix + 'config.html\')">' +
      '<div class="drawer-item-icon ic-orange"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg></div>' +
      '<span class="drawer-item-label">Configuration</span>' +
    '</div>' +

    '<div class="drawer-item' + ac('support') + '" onclick="goTo(\'' + prefix + 'support.html\')">' +
      '<div class="drawer-item-icon ic-red"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>' +
      '<span class="drawer-item-label">Support</span>' +
    '</div>' +

    /* ── Actions ── */
    '<div class="drawer-divider"></div>' +
    '<div class="drawer-section-title">Actions</div>' +

    '<div class="drawer-item">' +
      '<div class="drawer-item-icon ic-red"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>' +
      '<span class="drawer-item-label">Send Crash Report</span>' +
    '</div>' +

    '<div class="drawer-item">' +
      '<div class="drawer-item-icon ic-blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg></div>' +
      '<span class="drawer-item-label">Back Up Data</span>' +
    '</div>' +

    '<div class="drawer-item">' +
      '<div class="drawer-item-icon ic-orange"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg></div>' +
      '<span class="drawer-item-label">Logout</span>' +
    '</div>' +

    '<div class="drawer-item">' +
      '<div class="drawer-item-icon ic-teal"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M12 2v2M12 20v2M4.93 19.07l1.41-1.41M19.07 19.07l-1.41-1.41M2 12h2M20 12h2"/></svg></div>' +
      '<span class="drawer-item-label">Demo Mode</span>' +
    '</div>' +

    /* ── Footer ── */
    '<div class="drawer-footer">' +
      '<div class="drawer-version">ver 1.0.0 \u00B7 Adera Sales</div>' +
    '</div>';
}

/* ── Inject Bottom Nav ── */
function injectBottomNav(activePage) {
  var navEl = document.querySelector('.bottom-nav[data-inject]');
  if (!navEl) return;

  var isModule = window.location.pathname.includes('/modules/');
  var prefix = isModule ? '' : 'modules/';
  var homeLink = isModule ? '../index.html' : 'index.html';

  function ac(page) {
    return activePage === page ? ' active' : '';
  }

  navEl.innerHTML =
    '<div class="nav-item' + ac('home') + '" onclick="goTo(\'' + homeLink + '\')">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>' +
      '<span>Home</span>' +
    '</div>' +
    '<div class="nav-item' + ac('parties') + '" onclick="goTo(\'' + prefix + 'parties.html\')">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>' +
      '<span>Parties</span>' +
    '</div>' +
    '<div class="nav-center-wrap" onclick="goTo(\'' + prefix + 'orders.html\')">' +
      '<div class="nav-center">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' +
      '</div>' +
      '<span>New</span>' +
    '</div>' +
    '<div class="nav-item' + ac('reports') + '" onclick="goTo(\'' + prefix + 'performance.html\')">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>' +
      '<span>Reports</span>' +
    '</div>' +
    '<div class="nav-item' + ac('profile') + '" onclick="goTo(\'' + prefix + 'profile.html\')">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' +
      '<span>Profile</span>' +
    '</div>';
}

/* ── Auto-inject on DOMContentLoaded ── */
document.addEventListener('DOMContentLoaded', function() {
  var drawerEl = document.getElementById('drawer');
  var navEl = document.querySelector('.bottom-nav[data-inject]');

  // Determine active page: use data-inject attribute value, or detect from filename
  var activePage = '';
  if (drawerEl && drawerEl.hasAttribute('data-inject')) {
    activePage = drawerEl.getAttribute('data-inject') || '';
  }
  if (!activePage && navEl && navEl.hasAttribute('data-inject')) {
    activePage = navEl.getAttribute('data-inject') || '';
  }

  // Fallback: detect from filename in URL
  if (!activePage) {
    var path = window.location.pathname;
    var filename = path.substring(path.lastIndexOf('/') + 1).replace('.html', '');
    if (filename === 'index' || filename === '') {
      activePage = 'home';
    } else {
      activePage = filename;
    }
  }

  // Inject only when data-inject is present
  if (drawerEl && drawerEl.hasAttribute('data-inject')) {
    injectDrawer(activePage);
  }
  if (navEl) {
    injectBottomNav(activePage);
  }
});

/* ═══ Error & Empty State Components ═══ */

var _stateIcons = {
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="12" y2="16"/></svg>',
  inbox: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/></svg>',
  cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>',
  error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  offline: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0119 12.55"/><path d="M5 12.55a10.94 10.94 0 015.17-2.39"/><path d="M10.71 5.05A16 16 0 0122.56 9"/><path d="M1.42 9a15.91 15.91 0 014.7-2.88"/><path d="M8.53 16.11a6 6 0 016.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>'
};

function showEmptyState(containerId, opts) {
  opts = opts || {};
  var container = document.getElementById(containerId);
  if (!container) return;

  var iconKey = opts.icon || 'inbox';
  var iconSvg = _stateIcons[iconKey] || _stateIcons.inbox;
  var title = opts.title || 'Nothing here yet';
  var desc = opts.desc || 'There are no items to display right now.';

  var html = '<div class="state-container">' +
    '<div class="state-icon empty">' + iconSvg + '</div>' +
    '<div class="state-title">' + title + '</div>' +
    '<div class="state-desc">' + desc + '</div>';

  if (opts.action) {
    html += '<button class="state-action primary" onclick="' +
      (opts.onAction ? opts.onAction : '') + '">' + opts.action + '</button>';
  }

  html += '</div>';
  container.innerHTML = html;
}

function showErrorState(containerId, opts) {
  opts = opts || {};
  var container = document.getElementById(containerId);
  if (!container) return;

  var title = opts.title || 'Something went wrong';
  var desc = opts.desc || 'We couldn\'t load the data. Please check your connection and try again.';

  var html = '<div class="state-container">' +
    '<div class="state-icon error">' + _stateIcons.error + '</div>' +
    '<div class="state-title">' + title + '</div>' +
    '<div class="state-desc">' + desc + '</div>' +
    '<button class="state-action primary" onclick="' +
      (opts.onRetry ? opts.onRetry : '') + '">Retry</button>' +
    '</div>';

  container.innerHTML = html;
}

function showOfflineState(containerId) {
  var container = document.getElementById(containerId);
  if (!container) return;

  var html = '<div class="state-container">' +
    '<div class="state-icon offline">' + _stateIcons.offline + '</div>' +
    '<div class="state-title">You\'re offline</div>' +
    '<div class="state-desc">No internet connection detected. Please reconnect and try again.</div>' +
    '<button class="state-action outline" onclick="location.reload()">Retry Connection</button>' +
    '</div>';

  container.innerHTML = html;
}

function initOfflineBanner() {
  var banner = document.querySelector('.offline-banner');
  if (!banner) return;

  function update() {
    if (navigator.onLine) {
      banner.classList.remove('show');
    } else {
      banner.classList.add('show');
    }
  }

  update();
  window.addEventListener('online', update);
  window.addEventListener('offline', update);
}
