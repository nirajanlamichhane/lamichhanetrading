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

    '<div class="drawer-item" onclick="goTo(\'' + prefix + 'login.html\')">' +
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

/* ═══ Push Notification System ═══ */

var _pushIcons = {
  order: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:20px;height:20px;"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>',
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:20px;height:20px;"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:20px;height:20px;"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:20px;height:20px;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
};

var _pushDismissTimer = null;

function showPushNotification(opts) {
  opts = opts || {};
  var type = opts.type || 'info';
  var title = opts.title || 'Notification';
  var desc = opts.desc || '';
  var duration = opts.duration || 5000;
  var actions = opts.actions || [];
  var onClick = opts.onClick || null;

  // Find or create banner inside phone-frame
  var frame = document.querySelector('.phone-frame');
  if (!frame) return;

  var banner = frame.querySelector('.push-banner');
  if (!banner) {
    banner = document.createElement('div');
    banner.className = 'push-banner';
    frame.appendChild(banner);
  }

  // Clear any existing dismiss timer
  if (_pushDismissTimer) {
    clearTimeout(_pushDismissTimer);
    _pushDismissTimer = null;
  }

  // Remove show class for re-trigger animation
  banner.classList.remove('show');

  // Build time string
  var now = new Date();
  var timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

  // Build actions HTML
  var actionsHtml = '';
  if (actions.length > 0) {
    actionsHtml = '<div class="push-actions">';
    for (var i = 0; i < actions.length; i++) {
      var a = actions[i];
      actionsHtml += '<button class="push-action-btn ' + (a.primary ? 'primary' : 'dismiss') + '" data-action-idx="' + i + '">' + a.label + '</button>';
    }
    actionsHtml += '</div>';
  }

  banner.innerHTML =
    '<div class="push-icon ' + type + '">' + (_pushIcons[type] || _pushIcons.info) + '</div>' +
    '<div class="push-body">' +
      '<div class="push-app">Adera Sales</div>' +
      '<div class="push-title">' + title + '</div>' +
      '<div class="push-desc">' + desc + '</div>' +
      '<div class="push-time">' + timeStr + '</div>' +
      actionsHtml +
    '</div>' +
    '<button class="push-close">&times;</button>';

  // Close button handler
  banner.querySelector('.push-close').addEventListener('click', function(e) {
    e.stopPropagation();
    dismissPush(banner);
  });

  // Body click handler
  if (onClick) {
    banner.querySelector('.push-body').style.cursor = 'pointer';
    banner.querySelector('.push-body').addEventListener('click', function(e) {
      if (e.target.classList.contains('push-action-btn')) return;
      onClick();
      dismissPush(banner);
    });
  }

  // Action button handlers
  if (actions.length > 0) {
    var btns = banner.querySelectorAll('.push-action-btn');
    for (var j = 0; j < btns.length; j++) {
      (function(btn, idx) {
        btn.addEventListener('click', function(e) {
          e.stopPropagation();
          if (actions[idx] && actions[idx].onClick) actions[idx].onClick();
          dismissPush(banner);
        });
      })(btns[j], parseInt(btns[j].getAttribute('data-action-idx')));
    }
  }

  // Animate in
  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      banner.classList.add('show');
    });
  });

  // Auto-dismiss
  _pushDismissTimer = setTimeout(function() {
    dismissPush(banner);
  }, duration);
}

function dismissPush(banner) {
  if (_pushDismissTimer) {
    clearTimeout(_pushDismissTimer);
    _pushDismissTimer = null;
  }
  banner.classList.remove('show');
}

/* ── Push Notification Demo Pool ── */
var _pushNotificationPool = [
  { type: 'order', title: 'New Order Received', desc: 'Order #ORD-1847 from Krishna Store \u2014 \u20B912,450' },
  { type: 'alert', title: 'Collection Due', desc: 'Rs 34,500 pending from Metro Mart \u2014 45 days overdue' },
  { type: 'success', title: 'Order Delivered', desc: 'Order #ORD-1832 delivered to Sharma General Store' },
  { type: 'success', title: 'Leave Approved', desc: 'Your casual leave for Mar 12 has been approved' },
  { type: 'info', title: 'Price Alert', desc: 'Competitor Amul reduced butter price by \u20B95/unit' },
  { type: 'info', title: 'Target Update', desc: "You've reached 75% of monthly target \u2014 keep going!" },
  { type: 'alert', title: 'Expense Rejected', desc: 'Travel claim #EXP-234 rejected \u2014 receipt missing' },
  { type: 'order', title: 'New Beat Assigned', desc: 'Beat Plan B-12 Kathmandu East assigned for tomorrow' },
  { type: 'success', title: 'Payment Received', desc: '\u20B918,200 collected from Gupta Traders \u2014 receipt #REC-492' },
  { type: 'info', title: 'Scheme Launched', desc: 'Buy 10 get 1 free on Premium Blend \u2014 valid till Mar 15' }
];

var _pushIntervalId = null;
var _pushLastIndex = -1;

function simulatePushNotifications() {
  if (_pushIntervalId) return; // Already running

  function fireRandom() {
    var idx;
    do {
      idx = Math.floor(Math.random() * _pushNotificationPool.length);
    } while (idx === _pushLastIndex && _pushNotificationPool.length > 1);
    _pushLastIndex = idx;

    showPushNotification(_pushNotificationPool[idx]);

    // Schedule next one in 30-45 seconds
    var delay = 30000 + Math.floor(Math.random() * 15000);
    _pushIntervalId = setTimeout(function() {
      fireRandom();
    }, delay);
  }

  fireRandom();
}

function stopPushNotifications() {
  if (_pushIntervalId) {
    clearTimeout(_pushIntervalId);
    _pushIntervalId = null;
  }
}

// ═══ Offline Sync Queue ═══
var SyncQueue = {
  KEY: 'adera_sync_queue',

  getQueue: function() { return JSON.parse(localStorage.getItem(this.KEY) || '[]'); },

  addToQueue: function(action) {
    var queue = this.getQueue();
    action.id = 'sync_' + Date.now();
    action.status = 'pending';
    action.timestamp = new Date().toISOString();
    queue.push(action);
    localStorage.setItem(this.KEY, JSON.stringify(queue));
    this.updateBadge();
    return action.id;
  },

  getPendingCount: function() { return this.getQueue().filter(function(q) { return q.status === 'pending'; }).length; },

  updateBadge: function() {
    var count = this.getPendingCount();
    document.querySelectorAll('.sync-count').forEach(function(el) {
      el.textContent = count;
      el.style.display = count > 0 ? 'inline-flex' : 'none';
    });
  },

  simulateSync: function(onProgress) {
    var self = this;
    var queue = self.getQueue();
    var pending = queue.filter(function(q) { return q.status === 'pending'; });
    if (!pending.length) return Promise.resolve({ synced: 0 });

    var i = 0;
    function next() {
      if (i >= pending.length) {
        localStorage.setItem(self.KEY, JSON.stringify(queue));
        self.updateBadge();
        return Promise.resolve({ synced: pending.length });
      }
      pending[i].status = 'synced';
      pending[i].syncedAt = new Date().toISOString();
      if (onProgress) onProgress(Math.round(((i + 1) / pending.length) * 100), pending[i]);
      i++;
      return new Promise(function(r) { setTimeout(r, 600 + Math.random() * 400); }).then(next);
    }
    return next();
  },

  clearSynced: function() {
    var queue = this.getQueue().filter(function(q) { return q.status === 'pending'; });
    localStorage.setItem(this.KEY, JSON.stringify(queue));
  }
};

function showSyncBar() {
  var bar = document.querySelector('.sync-bar');
  if (!bar) {
    bar = document.createElement('div');
    bar.className = 'sync-bar';
    bar.innerHTML = '<div class="sync-spinner"></div><span class="sync-text">Syncing...</span><div class="sync-progress"><div class="sync-progress-fill" style="width:0"></div></div>';
    var frame = document.querySelector('.phone-frame .screen-scroll') || document.querySelector('.phone-frame');
    if (frame) frame.insertBefore(bar, frame.firstChild.nextSibling);
  }

  bar.classList.add('show');
  var fill = bar.querySelector('.sync-progress-fill');
  var text = bar.querySelector('.sync-text');

  SyncQueue.simulateSync(function(pct, item) {
    fill.style.width = pct + '%';
    text.textContent = 'Syncing ' + item.type + '...';
  }).then(function(result) {
    if (result.synced > 0) {
      text.textContent = result.synced + ' items synced!';
      fill.style.width = '100%';
      if (typeof showToast === 'function') showToast(result.synced + ' items synced successfully', 'success');
    } else {
      text.textContent = 'Nothing to sync';
    }
    setTimeout(function() { bar.classList.remove('show'); }, 2000);
    if (typeof renderSyncQueue === 'function') renderSyncQueue();
  });
}

function openSyncSheet() {
  var overlay = document.getElementById('syncSheetOverlay');
  var sheet = document.getElementById('syncSheet');
  if (overlay) overlay.classList.add('open');
  if (sheet) sheet.classList.add('open');
  if (typeof renderSyncQueue === 'function') renderSyncQueue();
}

function closeSyncSheet() {
  var overlay = document.getElementById('syncSheetOverlay');
  var sheet = document.getElementById('syncSheet');
  if (sheet) sheet.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
}

function renderSyncQueue() {
  var container = document.getElementById('syncQueueList');
  if (!container) return;
  var queue = SyncQueue.getQueue();
  if (!queue.length) {
    container.innerHTML = '<div style="text-align:center;padding:24px 16px;color:var(--text-muted);font-size:13px;">No items in sync queue</div>';
    return;
  }

  var typeIcons = {
    order: { bg: 'ic-orange', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>' },
    collection: { bg: 'ic-green', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>' },
    checkin: { bg: 'ic-blue', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>' },
    expense: { bg: 'ic-red', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6"/></svg>' }
  };

  var html = '';
  for (var i = queue.length - 1; i >= 0; i--) {
    var item = queue[i];
    var icon = typeIcons[item.type] || typeIcons.order;
    var badgeClass = item.status === 'synced' ? 'synced' : 'pending';
    var badgeLabel = item.status === 'synced' ? 'Synced' : 'Pending';
    var time = new Date(item.timestamp);
    var timeStr = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    html += '<div class="sync-queue-card">' +
      '<div class="sq-icon ' + icon.bg + '">' + icon.svg + '</div>' +
      '<div class="sq-info">' +
        '<div class="sq-title">' + (item.data && item.data.label ? item.data.label : item.type) + '</div>' +
        '<div class="sq-meta">' + timeStr + ' · ' + item.type + '</div>' +
      '</div>' +
      '<span class="sync-badge ' + badgeClass + '">' + badgeLabel + '</span>' +
    '</div>';
  }
  container.innerHTML = html;
}

function seedSyncQueue() {
  if (SyncQueue.getQueue().length > 0) return;
  var now = Date.now();
  var items = [
    { type: 'order', data: { label: 'Order #ORD-1851 \u2014 Krishna Store' } },
    { type: 'collection', data: { label: 'Collection \u20B98,500 \u2014 Metro Mart' } },
    { type: 'checkin', data: { label: 'Check-in at Kathmandu Zone' } },
    { type: 'expense', data: { label: 'Expense Claim #EXP-245' } }
  ];
  for (var i = 0; i < items.length; i++) {
    var action = items[i];
    action.id = 'sync_' + (now + i);
    action.status = 'pending';
    action.timestamp = new Date(now - (items.length - i) * 300000).toISOString();
    var queue = SyncQueue.getQueue();
    queue.push(action);
    localStorage.setItem(SyncQueue.KEY, JSON.stringify(queue));
  }
  SyncQueue.updateBadge();
}

// ═══ Offline Sync — Auto-sync on Reconnect ═══
(function() {
  // Listen for messages from service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', function(event) {
      var msg = event.data;
      if (!msg) return;

      if (msg.type === 'REQUEST_QUEUED') {
        // A request was queued while offline — update badge
        SyncQueue.updateBadge();
        if (typeof showToast === 'function') {
          showToast('Saved offline — will sync when connected', 'info');
        }
      }

      if (msg.type === 'SYNC_COMPLETE') {
        SyncQueue.updateBadge();
        if (typeof renderSyncQueue === 'function') renderSyncQueue();
        if (msg.synced > 0 && typeof showToast === 'function') {
          showToast(msg.synced + ' items synced to server', 'success');
        }
        if (msg.failed > 0 && typeof showToast === 'function') {
          showToast(msg.failed + ' items failed to sync', 'error');
        }
      }
    });
  }

  // Auto-trigger sync when coming back online
  window.addEventListener('online', function() {
    // Short delay to ensure connection is stable
    setTimeout(function() {
      var pending = SyncQueue.getPendingCount();
      if (pending > 0) {
        showToast('Back online — syncing ' + pending + ' items...', 'info');
        showSyncBar();
      } else {
        showToast('Back online', 'success');
      }

      // Also trigger SW background sync if available
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.ready.then(function(reg) {
          if (reg.sync) reg.sync.register('adera-offline-sync');
        });
      }
    }, 1500);
  });

  window.addEventListener('offline', function() {
    if (typeof showToast === 'function') {
      showToast('You\'re offline — changes will be saved locally', 'info');
    }
  });
})();

// ═══ Contextual Tooltip System ═══
var CtxTooltip = {
  activeTooltip: null,
  _timer: null,
  _outsideHandler: null,

  show: function(el, opts) {
    // opts: {title, body, value, trend: {dir: 'up'|'down', text}, arrow: 'top'|'bottom'}
    this.hide(); // close any existing

    var tip = document.createElement('div');
    tip.className = 'ctx-tooltip';

    var html = '<button class="tt-close" onclick="CtxTooltip.hide()">\u00D7</button>';
    if (opts.title) html += '<div class="tt-title">' + opts.title + '</div>';
    if (opts.value) html += '<div class="tt-value">' + opts.value + '</div>';
    if (opts.body) html += '<div class="tt-body">' + opts.body + '</div>';
    if (opts.trend) html += '<div class="tt-trend ' + opts.trend.dir + '"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="' + (opts.trend.dir === 'up' ? 'M12 19V5M5 12l7-7 7 7' : 'M12 5v14M5 12l7 7 7-7') + '"/></svg>' + opts.trend.text + '</div>';

    var arrowPos = opts.arrow || 'top';
    html += '<div class="tt-arrow ' + arrowPos + '"></div>';
    tip.innerHTML = html;

    // Position relative to phone frame
    var frame = el.closest('.phone-frame') || document.querySelector('.phone-frame');
    if (frame) frame.appendChild(tip);
    else document.body.appendChild(tip);

    // Calculate position
    var rect = el.getBoundingClientRect();
    var frameRect = (frame || document.body).getBoundingClientRect();
    var tipRect = tip.getBoundingClientRect();

    var left = rect.left - frameRect.left + (rect.width / 2) - (tipRect.width / 2);
    left = Math.max(8, Math.min(left, frameRect.width - tipRect.width - 8));

    if (arrowPos === 'top') {
      tip.style.top = (rect.bottom - frameRect.top + 10) + 'px';
    } else {
      tip.style.top = (rect.top - frameRect.top - tipRect.height - 10) + 'px';
    }
    tip.style.left = left + 'px';

    var self = this;
    requestAnimationFrame(function() { tip.classList.add('show'); });
    self.activeTooltip = tip;

    // Auto-close after 5s
    self._timer = setTimeout(function() { self.hide(); }, 5000);

    // Close on outside tap
    self._outsideHandler = function(e) {
      if (!tip.contains(e.target) && e.target !== el && !el.contains(e.target)) self.hide();
    };
    setTimeout(function() { document.addEventListener('click', self._outsideHandler); }, 100);
  },

  hide: function() {
    if (this.activeTooltip) {
      this.activeTooltip.classList.remove('show');
      var tip = this.activeTooltip;
      setTimeout(function() { tip.remove(); }, 250);
      this.activeTooltip = null;
    }
    if (this._timer) clearTimeout(this._timer);
    if (this._outsideHandler) document.removeEventListener('click', this._outsideHandler);
  }
};

// ═══ Long-Press Tooltip Binding ═══
function bindTooltip(el, opts) {
  var longPressTimer = null;
  var moved = false;

  el.setAttribute('data-tooltip', 'true');

  el.addEventListener('touchstart', function(e) {
    moved = false;
    longPressTimer = setTimeout(function() {
      if (!moved) {
        e.preventDefault && e.preventDefault();
        CtxTooltip.show(el, opts);
      }
    }, 500);
  }, { passive: false });

  el.addEventListener('touchmove', function() {
    moved = true;
    if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; }
  });

  el.addEventListener('touchend', function() {
    if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; }
  });

  // Click fallback for desktop
  el.addEventListener('click', function(e) {
    e.stopPropagation();
    CtxTooltip.show(el, opts);
  });
}

// ═══ Sync Conflict Resolution ═══
var SyncConflict = {
  _conflicts: [],

  show: function(conflicts) {
    this._conflicts = conflicts || [];
    // Remove existing sheet if any
    var existing = document.getElementById('conflictSheet');
    if (existing) existing.remove();
    var existingOverlay = document.getElementById('conflictSheetOverlay');
    if (existingOverlay) existingOverlay.remove();

    var frame = document.querySelector('.phone-frame');
    if (!frame) return;

    // Create overlay
    var overlay = document.createElement('div');
    overlay.id = 'conflictSheetOverlay';
    overlay.className = 'sync-sheet-overlay open';
    overlay.onclick = function() { SyncConflict.close(); };
    frame.appendChild(overlay);

    // Build conflict cards HTML
    var cardsHtml = '';
    for (var i = 0; i < conflicts.length; i++) {
      var c = conflicts[i];
      cardsHtml +=
        '<div class="conflict-card" id="conflict-card-' + c.id + '">' +
          '<div class="conflict-header">' +
            '<span class="conflict-type">' + (c.type || 'Conflict') + '</span>' +
            '<span class="conflict-field">' + (c.field || '') + '</span>' +
          '</div>' +
          '<div class="conflict-values">' +
            '<div class="conflict-val local">' +
              '<div class="conflict-val-label">Local (Mine)</div>' +
              '<div class="conflict-val-data">' + (c.localValue || '') + '</div>' +
            '</div>' +
            '<div class="conflict-val server">' +
              '<div class="conflict-val-label">Server</div>' +
              '<div class="conflict-val-data">' + (c.serverValue || '') + '</div>' +
            '</div>' +
          '</div>' +
          '<div class="conflict-actions">' +
            '<button class="conflict-btn mine" onclick="SyncConflict.resolve(\'' + c.id + '\', \'local\')">Keep Mine</button>' +
            '<button class="conflict-btn server" onclick="SyncConflict.resolve(\'' + c.id + '\', \'server\')">Keep Server</button>' +
            '<button class="conflict-btn merge" onclick="SyncConflict.resolve(\'' + c.id + '\', \'merge\')">Merge</button>' +
          '</div>' +
        '</div>';
    }

    // Create bottom sheet
    var sheet = document.createElement('div');
    sheet.id = 'conflictSheet';
    sheet.className = 'sync-sheet';
    sheet.innerHTML =
      '<div class="sync-sheet-handle"></div>' +
      '<div class="sync-sheet-header">' +
        '<div class="sync-sheet-title">Sync Conflicts (' + conflicts.length + ')</div>' +
        '<button class="sync-sheet-close" onclick="SyncConflict.close()">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
        '</button>' +
      '</div>' +
      '<div class="sync-sheet-body">' + cardsHtml + '</div>';

    frame.appendChild(sheet);

    // Trigger open animation
    requestAnimationFrame(function() {
      sheet.classList.add('open');
    });
  },

  close: function() {
    var sheet = document.getElementById('conflictSheet');
    var overlay = document.getElementById('conflictSheetOverlay');
    if (sheet) sheet.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    setTimeout(function() {
      if (sheet) sheet.remove();
      if (overlay) overlay.remove();
    }, 300);
  },

  resolve: function(conflictId, resolution) {
    var conflict = null;
    for (var i = 0; i < this._conflicts.length; i++) {
      if (this._conflicts[i].id === conflictId) {
        conflict = this._conflicts[i];
        this._conflicts.splice(i, 1);
        break;
      }
    }
    if (!conflict) return;

    // Update SyncQueue based on resolution
    var queue = SyncQueue.getQueue();
    for (var j = 0; j < queue.length; j++) {
      if (queue[j].id === conflict.syncQueueId) {
        if (resolution === 'local') {
          queue[j].resolvedWith = 'local';
          queue[j].data[conflict.field] = conflict.localValue;
        } else if (resolution === 'server') {
          queue[j].resolvedWith = 'server';
          queue[j].data[conflict.field] = conflict.serverValue;
        } else if (resolution === 'merge') {
          queue[j].resolvedWith = 'merge';
          queue[j].data[conflict.field] = conflict.localValue + ' / ' + conflict.serverValue;
        }
        queue[j].conflictResolved = true;
        break;
      }
    }
    localStorage.setItem(SyncQueue.KEY, JSON.stringify(queue));

    // Remove the conflict card from the UI
    var card = document.getElementById('conflict-card-' + conflictId);
    if (card) {
      card.style.transition = 'opacity .3s ease, transform .3s ease';
      card.style.opacity = '0';
      card.style.transform = 'translateX(60px)';
      setTimeout(function() { card.remove(); }, 300);
    }

    // Update header count
    var title = document.querySelector('#conflictSheet .sync-sheet-title');
    if (title) {
      title.textContent = 'Sync Conflicts (' + this._conflicts.length + ')';
    }

    // Show resolution toast
    var labels = { local: 'Kept local version', server: 'Kept server version', merge: 'Merged values' };
    if (typeof showToast === 'function') {
      showToast(labels[resolution] + ' for ' + conflict.field, 'success');
    }

    // Auto-close sheet if no conflicts remain
    if (this._conflicts.length === 0) {
      setTimeout(function() { SyncConflict.close(); }, 800);
    }
  }
};

// Haptic Micro-Animation Helpers
function hapticTap(el) {
  if (!el) return;
  el.classList.remove('anim-tap');
  void el.offsetWidth; // force reflow
  el.classList.add('anim-tap');
  el.addEventListener('animationend', () => el.classList.remove('anim-tap'), {once:true});
  // Try vibration API
  if (navigator.vibrate) navigator.vibrate(10);
}

function hapticPress(el) {
  if (!el) return;
  el.classList.remove('anim-press');
  void el.offsetWidth;
  el.classList.add('anim-press');
  el.addEventListener('animationend', () => el.classList.remove('anim-press'), {once:true});
  if (navigator.vibrate) navigator.vibrate(20);
}

function hapticError(el) {
  if (!el) return;
  el.classList.remove('anim-shake');
  void el.offsetWidth;
  el.classList.add('anim-shake');
  el.addEventListener('animationend', () => el.classList.remove('anim-shake'), {once:true});
  if (navigator.vibrate) navigator.vibrate([30, 50, 30]);
}

function hapticSuccess(el) {
  if (!el) return;
  el.classList.remove('anim-pop');
  void el.offsetWidth;
  el.classList.add('anim-pop');
  el.addEventListener('animationend', () => el.classList.remove('anim-pop'), {once:true});
  if (navigator.vibrate) navigator.vibrate([10, 30, 10]);
}

function hapticBump(el) {
  if (!el) return;
  el.classList.remove('anim-bump');
  void el.offsetWidth;
  el.classList.add('anim-bump');
  el.addEventListener('animationend', () => el.classList.remove('anim-bump'), {once:true});
}
