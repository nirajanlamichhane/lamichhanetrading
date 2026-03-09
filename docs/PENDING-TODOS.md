# Adera Sales — Pending TODOs

**Scanned:** March 8, 2026
**Last Updated:** March 9, 2026
**Project Version:** 1.3.0

---

## 1. Features ✅ ALL DONE

| # | Feature | Priority | Status |
|---|---------|----------|--------|
| 1 | ~~Push notifications~~ | ~~High~~ | ✅ Notification API permission, push banner in settings, test notification |
| 2 | ~~Offline data sync~~ | ~~High~~ | ✅ IndexedDB request queue in sw.js v4, Background Sync API, auto-sync on reconnect, SW client messaging, synthetic 202 offline responses |
| 3 | ~~Image upload~~ | ~~High~~ | ✅ Camera capture with `<input capture>` on attendance selfie + odometer photos |
| 4 | ~~GPS/location services~~ | ~~High~~ | ✅ parties.html GPS capture, app.js check-in geolocation |
| 5 | ~~Real-time clock~~ | ~~Low~~ | ✅ updateClock() in app.js, runs on all pages |
| 6 | ~~Inter-page data flow~~ | ~~Medium~~ | ✅ collectParty() localStorage bus, collections.html auto-opens Collect sheet |
| 7 | ~~Form validation~~ | ~~Medium~~ | ✅ validateForm() in app.js + login, expenses, leaves, notes, odometer |

---

## 2. ~~Service Worker (sw.js)~~ ✅ DONE

**Resolved:** sw.js v6 — all 65 module pages cached, network-first for `/api/` calls, cache-first for static assets, old cache cleanup on activate, IndexedDB offline request queue, Background Sync API, manual sync via postMessage.

---

## 3. ~~Structural Issues~~ ✅ ALL FIXED

| # | Issue | Resolution |
|---|-------|------------|
| 1 | ~~`sidebar.html` missing~~ | ✅ Removed from sw.js |
| 2 | ~~`project structure.txt` outdated~~ | ✅ Updated — lists all 46 module pages, sw.js v4 caches all |
| 3 | ~~`performance.txt` stub~~ | ✅ File removed |
| 4 | ~~`!-- mock.html` odd filename~~ | ✅ File removed |

---

## 4. ~~State Persistence~~ ✅ ALL DONE

- [x] Check-in/out status & timestamps — AppState + performCheckin in app.js
- [x] Cart items (take-order → cart) — addToCart/getCart/saveCart in app.js
- [x] Filter/tab selections per page — saveFilterState/getFilterState in app.js
- [x] Draft EOD remarks — saveDraft/getDraft/clearDraft in app.js
- [x] Odometer readings — AppState localStorage with seed data, dynamic rendering

---

## 5. Production Migration TODOs (Future — Backend Required)

### Shared Components to Extract
- [ ] `TopBar` — reusable header with back/menu/title/actions
- [ ] `BottomNav` — global navigation component (currently `injectBottomNav()` in app.js)
- [ ] `Drawer` — side navigation with user profile (currently `injectDrawer()` in app.js)
- [ ] `BottomSheet` — reusable slide-up sheet pattern
- [ ] `StatCard`, `KPICard`, `InfoCard` — data display components
- [ ] `TabBar`, `ChipGroup` — filter components
- [ ] `Toast` — notification system (currently `showToast()` in app.js)

### Data to Extract
- [ ] All hardcoded mock data (orders, parties, collections, etc.) → JSON/API
- [ ] Party names, amounts, dates, statuses → dynamic from backend
- [ ] Stats and KPIs → computed from real data

### API Endpoints Needed (23 endpoints)
- [ ] `/auth/login` POST — login.html
- [ ] `/auth/checkin` POST — attendance.html
- [ ] `/parties` GET — parties.html
- [ ] `/parties/:id` GET — Party detail
- [ ] `/orders` GET/POST — orders.html, take-order.html
- [ ] `/orders/:id` GET — Order detail
- [ ] `/collections` GET/POST — collections.html
- [ ] `/attendance` GET/POST — attendance.html
- [ ] `/leaves` GET/POST — leaves.html
- [ ] `/expenses` GET/POST — expenses.html
- [ ] `/approvals` GET/PATCH — approvals.html
- [ ] `/performance` GET — performance.html
- [ ] `/beatplans` GET — beatplans.html
- [ ] `/tours` GET — tour.html
- [ ] `/visits` GET — visits.html
- [ ] `/stock` GET/PATCH — stock.html
- [ ] `/returns` GET/POST — returns.html
- [ ] `/outstanding` GET — outstanding.html
- [ ] `/eod` POST — eod.html
- [ ] `/odometer` POST — odometer.html
- [ ] `/remarks` POST — remarks.html
- [ ] `/notes` GET/POST/DELETE — notes.html
- [ ] `/reports/generate` POST — custom.html

---

## 6. ~~Code-Level TODOs~~ ✅ ALL DONE

| # | File | Resolution |
|---|------|------------|
| 1 | ~~sw.js~~ | ✅ Cache list complete (66 pages — index + 65 modules) |
| 2 | ~~index.html~~ | ✅ CHECK-IN functional with GPS, localStorage, check-out |
| 3 | ~~route.html~~ | ✅ Leaflet OSM map with numbered stop markers, route polyline, fitBounds |
| 4 | ~~login.html~~ | ✅ socialLogin() with loading spinner, session save, redirect |
| 5 | ~~All forms~~ | ✅ validateForm() in app.js, all form pages validated |
| 6 | ~~All pages~~ | ✅ showEmptyState() and showErrorState() utilities in app.js |

---

## 7. Additional Systems Built (Beyond Original TODOs)

| System | Details |
|--------|---------|
| SyncQueue | localStorage-based offline queue with simulated sync, progress bar, badge count |
| SyncConflict | Conflict resolution UI — Keep Mine / Keep Server / Merge |
| Push Notifications | In-app push banner system with demo pool (10 notifications, 30-45s interval) |
| Contextual Tooltips | Long-press tooltip system with auto-positioning |
| Haptic Animations | hapticTap, hapticPress, hapticError, hapticSuccess, hapticBump helpers |
| Skeleton Loading | showSkeleton/hideSkeleton for loading states |
| Pull-to-Refresh | simulateRefresh() with PTR indicator animation |
| Offline Banner | initOfflineBanner() with online/offline event listeners |

---

## Summary

| Category | Total | Resolved | Pending |
|----------|-------|----------|---------|
| Features | 7 | 7 | 0 |
| Service Worker | 4 | 4 | 0 |
| Structural Issues | 4 | 4 | 0 |
| State Persistence | 5 | 5 | 0 |
| Code-Level TODOs | 6 | 6 | 0 |
| Production Migration | 33 | 0 | 33 |
| **Total** | **59** | **26** | **33** |

**All frontend mockup work is complete.** Remaining 33 items are production migration tasks requiring a backend (component extraction, data extraction, 23 API endpoints).
