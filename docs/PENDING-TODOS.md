# Adera Sales — Pending TODOs

**Scanned:** March 8, 2026
**Project Version:** 1.2.0

---

## 1. Features Not Yet Implemented (from implementation.md)

| # | Feature | Priority | Affected Files |
|---|---------|----------|----------------|
| 1 | ~~Push notifications~~ | ~~High~~ | ~~app.js, notifications.html~~ ✅ DONE (Notification API permission request, push enable banner in settings, test notification on enable) |
| 2 | Offline data sync | High | sw.js, app.js |
| 3 | ~~Image upload (selfie, receipts, odometer photos)~~ | ~~High~~ | ~~attendance.html, expenses.html, odometer.html~~ ✅ DONE (camera capture with `<input capture>` on attendance selfie + odometer start/end photos) |
| 4 | ~~GPS/location services integration~~ | ~~High~~ | ~~attendance.html, route.html, odometer.html~~ ✅ DONE (parties.html GPS capture, app.js check-in geolocation) |
| 5 | ~~Real-time clock on all pages~~ | ~~Low~~ | ~~All module pages~~ ✅ DONE |
| 6 | ~~Inter-page data flow (e.g., outstanding → collections)~~ | ~~Medium~~ | ~~outstanding.html, collections.html, parties.html~~ ✅ DONE (collectParty() saves to localStorage, collections.html auto-opens Collect sheet) |
| 7 | ~~Form validation~~ | ~~Medium~~ | ~~All pages with forms~~ ✅ DONE (validateForm() in app.js + login, expenses, leaves, notes, odometer) |

---

## 2. ~~Service Worker (sw.js) — Incomplete~~ ✅ DONE

~~- **Current state:** Basic cache-first shell only~~
~~- **Missing:** No caching strategy for module pages (32 pages not listed in `urlsToCache`)~~
~~- **Missing:** No network-first strategy for API calls~~
~~- **Missing:** References non-existent `sidebar.html` in cache list~~
~~- **Comment in code:** `// add all module pages here` (line 8) — never completed~~

**Resolved:** sw.js updated to v2 — all 32 module pages cached, sidebar.html removed, network-first for `/api/` calls, cache-first for static assets, old cache cleanup on activate.

---

## 3. Structural Issues

| # | Issue | Details |
|---|-------|---------|
| 1 | ~~`sidebar.html` missing~~ | ~~Referenced in `project structure.txt` and `sw.js`~~ ✅ Fixed — removed from sw.js |
| 2 | `project structure.txt` outdated | Lists only 25 modules; actual project has 32 module pages + login, profile, notifications |
| 3 | `performance.txt` is a template stub | Contains a generic HTML template placeholder, not actual content |
| 4 | `!-- mock.html` — odd filename | File has unusual name starting with `!--`; likely leftover/test file |

---

## 4. State Persistence TODOs (from implementation.md)

These need localStorage or backend implementation:

- [x] Check-in/out status & timestamps ✅ (AppState + performCheckin in app.js)
- [x] Cart items (between take-order.html → cart.html) ✅ (addToCart/getCart/saveCart in app.js)
- [x] Filter/tab selections per page ✅ (saveFilterState/getFilterState in app.js)
- [x] Draft EOD remarks ✅ (saveDraft/getDraft/clearDraft in app.js)
- [x] Odometer readings ✅ (AppState localStorage with seed data, dynamic rendering, live distance calc)

---

## 5. Production Migration TODOs

### Shared Components to Extract
- [ ] `TopBar` — reusable header with back/menu/title/actions
- [ ] `BottomNav` — global navigation component
- [ ] `Drawer` — side navigation with user profile
- [ ] `BottomSheet` — reusable slide-up sheet
- [ ] `StatCard`, `KPICard`, `InfoCard` — data display components
- [ ] `TabBar`, `ChipGroup` — filter components
- [ ] `Toast` — notification system

### Data to Extract
- [ ] All hardcoded mock data (orders, parties, collections, etc.) → JSON/API
- [ ] Party names, amounts, dates, statuses → dynamic from backend
- [ ] Stats and KPIs → computed from real data

### API Endpoints Needed (23 endpoints)
- [ ] `/auth/login` POST — Login screen
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

## 6. Code-Level TODOs

| # | File | Issue |
|---|------|-------|
| 1 | ~~`sw.js:8`~~ | ~~Comment: `// add all module pages here` — cache list incomplete~~ ✅ DONE |
| 2 | ~~`index.html`~~ | ~~CHECK-IN button is placeholder (no action)~~ ✅ DONE — functional with GPS, localStorage, check-out |
| 3 | ~~All modules~~ | ~~Map placeholders need real map integration (Google Maps / Leaflet)~~ ✅ DONE — Leaflet OSM map in route.html with numbered stop markers, route polyline, and fitBounds |
| 4 | ~~`login.html`~~ | ~~Social login buttons (Google/Microsoft) are visual only~~ ✅ DONE — socialLogin() with loading spinner, session save, and redirect |
| 5 | ~~All forms~~ | ~~No client-side validation implemented~~ ✅ DONE — validateForm() in app.js, all form pages validated |
| 6 | ~~All pages~~ | ~~No error/empty states for failed API loads~~ ✅ DONE — showEmptyState() and showErrorState() utilities in app.js |

---

**Total pending items: 29** (23 resolved)

*Auto-generated by project scan*
