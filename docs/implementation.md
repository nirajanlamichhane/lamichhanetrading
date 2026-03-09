# Adera Sales — Complete Implementation & Design Document

**Version:** 1.3.0
**Type:** Mobile Field Sales App — UI Prototype (Static HTML/CSS/JS)
**Last Updated:** March 9, 2026
**Total Screens:** 47 (1 home + 46 modules)
**Status:** All module pages complete with full UI content + interactive features

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [Design System](#3-design-system)
4. [Core Layout Components](#4-core-layout-components)
5. [Shared JavaScript API](#5-shared-javascript-api)
6. [Reusable CSS Component Library](#6-reusable-css-component-library)
7. [Home Screen (index.html)](#7-home-screen)
8. [Module Pages — Complete Catalog](#8-module-pages)
9. [UI Patterns & Conventions](#9-ui-patterns--conventions)
10. [Navigation Architecture](#10-navigation-architecture)
11. [PWA & Offline Support](#11-pwa--offline-support)
12. [Browser Compatibility](#12-browser-compatibility)
13. [Developer Handoff Notes](#13-developer-handoff-notes)
14. [Recent Additions (v1.1)](#14-recent-additions-v11)
15. [Recent Additions (v1.2)](#15-recent-additions-v12)
16. [Recent Additions (v1.3)](#16-recent-additions-v13)

---

## 1. Project Overview

Adera Sales is a mobile-first field sales representative application prototype. Built as a static HTML/CSS/JS project, it renders inside a simulated phone frame (390×760px) to demonstrate the complete UX flow for field sales operations.

**Target Users:** Field sales representatives, distributors, territory managers
**Demo User:** Elon Musk · Sales Representative · Kathmandu Zone
**Currency:** ₹ (Indian Rupee) / Rs (Nepali Rupee)
**Region Context:** Kathmandu, Nepal

### Key Capabilities
- Daily check-in/check-out with GPS & selfie
- Route planning & beat management
- Party/customer management with outstanding tracking
- Order creation, cart, and fulfillment tracking
- Payment collection (Cash, UPI, Cheque, Bank Transfer)
- Attendance, leave, and performance analytics
- Expense tracking & approval workflows
- EOD reporting & tour plan management

---

## 2. Project Structure

```
/
├── index.html                  # Home screen / main dashboard
├── sw.js                       # Service Worker (PWA shell)
├── css/
│   └── style.css               # Global design system (906 lines)
├── js/
│   └── app.js                  # Shared app logic (352 lines)
├── modules/                    # 65 module pages
│   ├── login.html              # Login, OTP, company selection (pre-auth)
│   ├── profile.html            # User profile, settings, edit
│   ├── notifications.html      # Notification center with filters
│   ├── route.html              # Route navigation / Start Route
│   ├── take-order.html         # New order creation form
│   ├── cart.html               # Order cart & checkout
│   ├── orders.html             # Order management + DMS fulfilment
│   ├── parties.html            # Party/customer directory
│   ├── collections.html        # Payment collection tracking
│   ├── attendance.html         # Check-in/out & calendar
│   ├── performance.html        # KPI dashboard & leaderboard
│   ├── notes.html              # Notes management
│   ├── returns.html            # Product returns
│   ├── expenses.html           # Expense claims
│   ├── activities.html         # Activity timeline/log
│   ├── leaves.html             # Leave management
│   ├── collaterals.html        # Marketing materials
│   ├── eod.html                # End-of-day report
│   ├── tour.html               # Tour plan management
│   ├── beatplans.html          # Beat/route scheduling
│   ├── stock.html              # Stock taking / inventory check
│   ├── visits.html             # Visit history & tracking
│   ├── approvals.html          # Approval requests & workflows
│   ├── remarks.html            # Day-end remarks & mood + voice notes
│   ├── odometer.html           # Vehicle odometer logging
│   ├── outstanding.html        # Outstanding payment report
│   ├── custom.html             # Custom reports generator
│   ├── schemes.html            # Schemes & promotional offers (v1.3)
│   ├── competitors.html        # Competitor intelligence tracking (v1.3)
│   ├── geofence.html           # Geofence store check-in (v1.3)
│   ├── chat.html               # In-app messaging & chat (v1.3)
│   ├── targets.html            # Targets & incentives tracker (v1.3)
│   ├── distributor.html        # Distributor profile & management (v1.3)
│   ├── gallery.html            # Photo library & gallery (v1.3)
│   ├── inventory.html          # DMS — Inventory module
│   ├── salesforce.html         # DMS — Sales Force module
│   ├── reports.html            # DMS — Reports module
│   ├── config.html             # DMS — Configuration
│   ├── manage-users.html       # DMS — User management
│   ├── support.html            # Help & support hub
│   ├── support-category.html   # Support — Issue categorization
│   ├── support-deboard.html    # Support — De-board outlet request
│   ├── support-geolocation.html # Support — Geolocation issues
│   ├── support-route-transfer.html # Support — Route transfer request
│   ├── support-new-request.html # Support — New ticket submission
│   ├── support-ticket-detail.html # Support — Ticket detail & timeline
│   ├── report-coverage.html    # Reports — Coverage report
│   ├── report-dse-productivity.html # Reports — DSE productivity
│   ├── report-net-sales.html   # Reports — Net sales report
│   ├── report-order-summary.html # Reports — Order summary
│   ├── report-product-sales.html # Reports — Product sales
│   ├── sf-call-roster.html     # Sales Force — Call roster
│   ├── sf-campaigns.html       # Sales Force — Campaigns
│   ├── sf-distributor-target.html # Sales Force — Distributor targets
│   ├── sf-fundamental-targets.html # Sales Force — Fundamental targets
│   ├── sf-posms.html           # Sales Force — POSMs
│   ├── sf-routes.html          # Sales Force — Routes management
│   ├── sf-sales-targets.html   # Sales Force — Sales targets
│   ├── sf-sbd-target.html      # Sales Force — SBD targets
│   ├── sf-subd-replenishment.html # Sales Force — Sub-D replenishment
│   ├── sf-cluster-tools.html   # Sales Force — Cluster tools
│   ├── report-goods-received.html # Reports — Goods received
│   ├── report-merchandise.html # Reports — Merchandise report
│   ├── report-order-analysis.html # Reports — Order analysis
│   └── report-time-route.html  # Reports — Time & route report
└── docs/
    └── implementation.md       # This document
```

---

## 3. Design System

### 3.1 Color Palette

| Token              | Hex       | Swatch | Usage                      |
|--------------------|-----------|--------|----------------------------|
| `--primary`        | `#3066be` | 🔵     | Brand blue, primary actions |
| `--primary-dark`   | `#2858a4` | 🔵     | Headers, gradients          |
| `--primary-light`  | `#558ce6` | 🔵     | Accents, gradient endpoints |
| `--accent`         | `#829e90` | 🟢     | Accent green-grey           |
| `--bg`             | `#f0f4fb` | ⬜     | Page background             |
| `--surface`        | `#ffffff` | ⬜     | Card backgrounds            |
| `--text-primary`   | `#1a2744` | ⬛     | Main body text              |
| `--text-secondary` | `#5a6a8a` | 🔘     | Secondary/label text        |
| `--text-muted`     | `#9aabcc` | 🔘     | Disabled/hint text          |
| `--danger`         | `#e05252` | 🔴     | Errors, destructive         |
| `--success`        | `#28a745` | 🟢     | Success, positive           |
| `--warning`        | `#f59e0b` | 🟡     | Warnings, pending           |
| `--checkin-color`  | `#e07b39` | 🟠     | Check-in CTA               |

### 3.2 Typography

| Property    | Value                                   |
|-------------|-----------------------------------------|
| Font Family | `'Segoe UI', system-ui, -apple-system`  |
| Headings    | 700–800 weight                          |
| Body        | 500–600 weight                          |
| Labels      | 10–12px, uppercase, 0.4–0.8px tracking  |
| Values      | 16–28px, 700–800 weight                 |

### 3.3 Spacing & Radius

| Token          | Value  | Usage            |
|----------------|--------|------------------|
| `--radius-sm`  | `10px` | Inputs, small    |
| `--radius-md`  | `16px` | Cards, buttons   |
| `--radius-lg`  | `24px` | Sheets, content  |
| `--shadow-sm`  | soft   | Cards            |
| `--shadow-md`  | medium | Elevated cards   |
| `--shadow-lg`  | heavy  | Phone frame      |

### 3.4 Color Utility Classes

**Icon Backgrounds:** `.ic-blue` `.ic-green` `.ic-orange` `.ic-purple` `.ic-red` `.ic-teal` `.ic-yellow` `.ic-indigo` `.ic-pink`

**Card Top Bars:** `.bar-blue` `.bar-green` `.bar-orange` `.bar-purple` `.bar-red` `.bar-teal` `.bar-yellow` `.bar-indigo` `.bar-pink`

**Text Colors:** `.text-success` `.text-warning` `.text-danger` `.text-blue` `.text-muted`

**Badges:** `.badge-success` `.badge-warning` `.badge-danger` `.badge-primary` `.badge-muted` `.badge-purple`

---

## 4. Core Layout Components

### 4.1 Phone Frame (`.phone-frame`)
- **Width:** 390px fixed
- **Border Radius:** 44px (simulates device shell)
- **Frame:** 10px dark border (`#1a1a2e`) + 2px accent ring (`#33336e`)
- **Notch:** CSS `::before` pseudo-element (120×30px)
- **Shadow:** 40px blur for depth

### 4.2 Screen Scroll (`.screen-scroll`)
- **Height:** 760px (viewport simulation)
- **Overflow:** Auto scroll, scrollbar hidden (`scrollbar-width: none`)
- Contains all page content within the phone frame

### 4.3 Status Bar (`.status-bar`)
- **Height:** 44px, dark background
- **Left:** Live clock (HH:MM format, updates every 30s)
- **Right:** Signal bars, WiFi, battery SVG icons
- All white (#fff) on dark background

### 4.4 Top Bar (`.top-bar`)
- Blue gradient background (`--primary-dark` → `--primary`)
- **Left:** Hamburger menu button (`openDrawer()`)
- **Center:** App title + subtitle
- **Right:** Refresh + notification bell (with red dot badge)
- Icon buttons: 38×38px, 12px radius, semi-transparent white bg

### 4.5 Side Drawer (`.drawer`)
- **Width:** 280px, slides from left (`left: -280px` → `left: 0`)
- **Z-index:** 300 (overlay at 200)
- **Animation:** `cubic-bezier(.4,0,.2,1)` over 300ms
- **Sections:**
  - Header: Avatar, name, role, Target button
  - Navigation: Home, Parties, Orders, Collections, Attendance, Leaves, Notes
  - DMS Modules: Inventory, Sales Force, Reports, Configuration, Support
  - Actions: Crash Report, Backup, Logout, Demo Mode
  - Footer: Version number

### 4.6 Bottom Navigation (`.bottom-nav`)
- **Position:** Sticky bottom
- **Items:** 5 (Home, Parties, New, Reports, Profile)
- **Center FAB:** 52×52px, elevated -20px, gradient blue, 18px radius
- Active state: blue icon + text

### 4.7 Bottom Sheet Pattern
Used across many modules for detail views and forms:
- **Overlay:** `position: absolute; inset: 0; background: rgba(26,39,68,.5)`
- **Sheet:** Slides up from bottom via `transform: translateY(100%)` → `translateY(0)`
- **Max Height:** 85% of frame
- **Handle:** 40×4px pill indicator at top
- **Close:** X button or overlay click
- **Animation:** 350ms `cubic-bezier(.4,0,.2,1)`

---

## 5. Shared JavaScript API (`js/app.js`)

| Function | Signature | Description |
|----------|-----------|-------------|
| `openDrawer()` | `()` | Adds `.open` to drawer + overlay |
| `closeDrawer()` | `()` | Removes `.open` from drawer + overlay |
| `tap(el)` | `(HTMLElement)` | Scale-down animation (93% → 100% in 160ms) |
| `switchTab(group, tab)` | `(string, HTMLElement)` | Deactivate siblings by `data-tabgroup`, activate clicked |
| `toggleChip(el)` | `(HTMLElement)` | Toggle `.active` on chip |
| `selectChip(el)` | `(HTMLElement)` | Single-select: deactivate siblings, activate clicked |
| `openTarget()` | `()` | Opens target bottom sheet + overlay |
| `closeTarget()` | `()` | Closes target bottom sheet + overlay |
| `goTo(page)` | `(string)` | Navigate via `window.location.href` |
| `goBack()` | `()` | `history.back()` or fallback to `../index.html` |
| `updateClock()` | `()` | Updates `.status-bar .time` with HH:MM (runs every 30s) |
| `showToast(msg, type, duration)` | `(string, string?, number?)` | Toast notification. Types: `success`, `error`, `warning`, `info`. Default 2500ms |
| `showSkeleton(id, count)` | `(string, number?)` | Injects shimmer skeleton cards into container by ID. Default 3 cards |
| `hideSkeleton(id, html)` | `(string, string)` | Replaces skeleton with real content + applies `.fade-in` to children |
| `simulateRefresh(cb)` | `(function?)` | Pull-to-refresh illusion: spinner, "Updated!", toast. 1.5s delay |
| `injectDrawer(page)` | `(string)` | Injects full drawer HTML into `#drawer[data-inject]`. Highlights active page |
| `injectBottomNav(page)` | `(string)` | Injects 5-item bottom nav into `.bottom-nav[data-inject]`. Highlights active |
| `showPushNotification(opts)` | `(object)` | Slide-down push banner. opts: {type, title, desc, actions, duration, onClick} |
| `simulatePushNotifications()` | `()` | Starts random push notification loop (30-45s interval, 10 notification pool) |
| `stopPushNotifications()` | `()` | Clears the push notification interval |
| `showEmptyState(id, opts)` | `(string, object)` | Renders empty state (icon, title, desc, action button) in container |
| `showErrorState(id, opts)` | `(string, object)` | Renders error state with retry button in container |
| `showOfflineState(id)` | `(string)` | Renders offline warning state in container |
| `initOfflineBanner()` | `()` | Listens for online/offline events, toggles `.offline-banner.show` |
| `hapticTap(el)` | `(HTMLElement)` | Scale-down tap animation + vibration |
| `hapticPress(el)` | `(HTMLElement)` | Deeper press animation + vibration |
| `hapticError(el)` | `(HTMLElement)` | Shake animation + vibration pattern |
| `hapticSuccess(el)` | `(HTMLElement)` | Pop/bounce animation + vibration |
| `hapticBump(el)` | `(HTMLElement)` | Scale bump animation for counters |
| `SyncQueue.addToQueue(action)` | `(object)` | Adds action to offline sync queue (localStorage) |
| `SyncQueue.simulateSync(cb)` | `(function)` | Processes pending queue items with progress callback |
| `showSyncBar()` | `()` | Shows sync progress bar, animates through queue |
| `SyncConflict.show(conflicts)` | `(array)` | Shows conflict resolution bottom sheet |
| `CtxTooltip.show(el, opts)` | `(HTMLElement, object)` | Shows contextual tooltip with value, trend, auto-close |
| `bindTooltip(el, opts)` | `(HTMLElement, object)` | Binds long-press/click tooltip to element |

### 5.2 Auto-Injection System (v1.1)

Pages opt into standardized drawer + bottom nav via `data-inject` attributes:

```html
<div id="drawer" data-inject="profile"></div>
<div class="bottom-nav" data-inject="profile"></div>
```

- Value sets which item gets `.active` class; if empty, auto-detects from filename
- Path-aware: detects `/modules/` in URL for correct relative links
- Only affects elements with `data-inject` — existing hardcoded navs unchanged

---

## 6. Reusable CSS Component Library

### Layout Components

| Component | CSS Classes | Description |
|-----------|-------------|-------------|
| Stats Row | `.stats-row` `.stats-row-2` `.stat-card` `.stat-value` `.stat-label` | 3-col or 2-col stat grid with colored variants |
| List Item | `.list-item` `.list-item-icon` `.list-item-content` `.list-item-title` `.list-item-subtitle` `.list-item-right` `.list-item-amount` `.list-item-meta` | Horizontal card with icon, content, right detail |
| KPI Card | `.kpi-card` `.kpi-header` `.kpi-label` `.kpi-value` `.kpi-sub` | Key metric display with header row + progress |
| Info Card | `.info-card` `.info-card-label` `.info-card-value` `.info-card-sub` `.info-card-row` | Hero card with gradient background |
| Summary Card | `.summary-card` `.summary-card-row` `.summary-card-label` `.summary-card-value` | Key-value pair rows in white card |

### Interactive Components

| Component | CSS Classes | Description |
|-----------|-------------|-------------|
| Tab Bar | `.tab-bar` `.tab` `.tab.active` | Segmented control with pill-style active state |
| Chips | `.chips` `.chip` `.chip.active` | Horizontal scrollable filter pills |
| Buttons | `.btn` `.btn-primary` `.btn-secondary` `.btn-danger` `.btn-success` `.btn-warning` `.btn-block` `.btn-sm` | Gradient buttons with shadow |
| Badge | `.badge` + variant classes | Inline status indicators |
| Progress Bar | `.progress-wrap` `.progress-bar` + `.success` `.warning` `.danger` | Animated fill bars (8px height) |
| FAB | `.fab` | Floating action button (52×52px, bottom-right) |

### Content Components

| Component | CSS Classes | Description |
|-----------|-------------|-------------|
| Timeline | `.timeline` `.timeline-item` `.timeline-dot` `.timeline-time` `.timeline-content` `.timeline-title` `.timeline-desc` | Vertical timeline with colored dots |
| Calendar | `.calendar` `.cal-grid` `.cal-day` `.cal-day.today` `.cal-day.present` `.cal-day.absent` `.cal-day.leave` `.cal-legend` | Monthly calendar grid with day states |
| Search Bar | `.search-wrap` `.search-bar` | Blue-bg search with SVG icon |
| Map Placeholder | `.map-placeholder` | Grey-blue box with map icon |
| Empty State | `.empty-state` | Centered icon + text for empty lists |
| Divider | `.divider` | 1px horizontal separator |

### Form Components

| Component | CSS Classes | Description |
|-----------|-------------|-------------|
| Form Group | `.form-group` `.form-label` `.form-control` | Label + input with focus border |
| Form Row | `.form-row` | 2-column grid for side-by-side inputs |
| Select | `select.form-control` | Styled dropdown (appearance: none) |
| Textarea | `textarea.form-control` | Non-resizable text area |

### Animation & Loading Components (v1.1)

| Component | CSS Classes | Description |
|-----------|-------------|-------------|
| Skeleton Loader | `.skeleton` `.skeleton-circle` `.skeleton-text` `.skeleton-card` | Shimmer placeholder with gradient animation |
| Pull-to-Refresh | `.ptr-indicator` `.ptr-spinner` | Simulated refresh spinner |
| Fade In | `.fade-in` | Opacity 0→1 with staggered delays (nth-child 1-10) |
| Slide In Right | `.slide-in-right` | translateX(30px)→0 entrance |
| Scale In | `.scale-in` | scale(0.8)→1 entrance |
| Bounce | `.bounce` | translateY bounce keyframe |
| Ripple | `.ripple` | Click ripple effect via `::after` pseudo-element |
| Swipe Hint | `.swipe-hint` | Horizontal swipe animation cue |
| Glow Utilities | `.glow-success` `.glow-warning` `.glow-danger` `.glow-primary` | Colored box-shadow pulse effects |

### Utility Classes

| Class | Property |
|-------|----------|
| `.fw-700` | `font-weight: 700` |
| `.fs-12` `.fs-13` | Font sizes |
| `.mt-4` `.mt-8` `.mt-12` `.mt-16` | Margin top |
| `.mb-8` `.mb-12` `.mb-16` | Margin bottom |
| `.flex` | `display: flex; align-items: center` |
| `.flex-between` | Flex + `justify-content: space-between` |
| `.gap-8` `.gap-12` | Gap spacing |
| `.w-full` | `width: 100%` |

---

## 7. Home Screen (`index.html`)

### Layout Structure
```
Status Bar → Top Bar → Greeting Banner → Check-In Section → Content Area → Bottom Nav
```

### Sections
1. **Greeting Banner** — Avatar, name (Elon Musk), role, Target pill button
2. **Check-In Buttons** — Orange CHECK-IN + green START ROUTE
3. **Distributor KPIs** — 3 stats (Target 7,852 KG, Achievement 50%, Active Cover 67%) + MTD progress bar + 3 more stats (Outlets 1,497, Active SO 1, On Leave 0)
4. **Today's Summary** — Visits 7, Orders ₹24k, Pending 3
5. **Module Grid** — 25 cards in 3-column grid (all 25 core modules)
6. **Target Bottom Sheet** — Triggered by Target pill; shows ring chart (50%), KG stats, coverage, category breakdown with progress bars

### Target Sheet Ring Chart Math
- Radius: 42, Circumference: 2πr ≈ 263.9
- `stroke-dasharray="263.9"` (full circle)
- `stroke-dashoffset = 263.9 × (1 - percentage/100)`
- Example: 50% → offset = 132

---

## 8. Module Pages — Complete Catalog

### 8.0 Auth & Global Pages

#### `login.html` — Login & Onboarding
- Blue gradient logo area ("Adera Sales", "Field Sales Made Simple")
- Phone input with +977 country code prefix, password with show/hide toggle
- Remember Me checkbox, Forgot Password link
- LOGIN button, social login buttons (Google/Microsoft) — visual only
- **OTP Bottom Sheet:** 4-digit input boxes with auto-advance between fields, 00:30 countdown timer with Resend
- **Company Selection Sheet:** 3 company cards with radio selection → proceed to home
- No drawer or bottom nav (pre-auth screen)
- **JS:** `togglePassword()`, `showOTP()`, `closeOTP()`, `showCompanySelect()`, `closeCompanySelect()`, `selectCompany()`

#### `profile.html` — User Profile & Settings
- Blue gradient header: 92px avatar with camera icon overlay, name (Elon Musk), role, zone, employee ID badge
- Quick stats overlay: 142 Visits, ₹1.2L This Month, 94% Target
- Personal Information card: Phone, email, location, date of joining
- Work Summary card: Outlets assigned (86), monthly target (₹2,50,000), working days (24/26)
- Settings: Change password, notifications toggle, app settings
- Support: Help & FAQ, report a problem, terms & privacy
- Logout button (red outline)
- **Edit Profile Bottom Sheet:** editable fields for name, email, phone
- **JS:** `openEditProfile()`, `closeEditProfile()`, `toggleSwitch()`

#### `notifications.html` — Notification Center
- Header: back button, title, Mark All Read button, Settings gear icon
- Stats strip: Unread (8), Today (12), This Week (47)
- Filter tabs: All / Orders / Approvals / System — live filtering
- 15 notification cards in 3 date groups (Today 8, Yesterday 4, Earlier 3)
- Each card: colored icon, title, description, relative timestamp, unread dot indicator
- **Detail Bottom Sheet:** dynamic notification content with action buttons
- **Settings Bottom Sheet:** 7 notification type toggles + Quiet Hours config
- **JS:** mark-all-read, tab filtering, detail/settings sheet open/close

### 8.1 Order Flow

#### `route.html` — Route Navigation
- Map placeholder with current location
- Today's route info card (beat name, shops, distance, ETA)
- 6 stop cards with sequence numbers, shop names, addresses
- Color-coded status (Visited/Next/Pending)
- Start Navigation button

#### `take-order.html` — New Order Creation
- Party selector dropdown
- Product search with category filters
- Product cards with +/- quantity controls
- Running total bar at bottom
- Add to Cart button → navigates to cart.html

#### `cart.html` — Order Cart & Checkout
- Cart item list with quantity editors
- Order summary (subtotal, discount, tax, total)
- Delivery date & payment terms selectors
- Special instructions textarea
- Place Order button with confirmation

#### `orders.html` — Order Management
- Search bar with filter button
- Date chips (Today/Yesterday/This Week/This Month/Custom)
- 4-stat strip (Total 12, Pending 4, Delivered 6, Value ₹1.2L)
- **Order Fulfilment DMS Section** — Tabs: Received(7)/Invoiced(40)/Dispatched(0)/Delivered(1)
- Segmented tabs (All/Pending/Active/Done)
- 12 order cards with color-coded left borders
- Order detail bottom sheet with timeline & line items
- Filter bottom sheet with Status/Value/Sort options
- **JS:** `switchTab()`, `showOrderDetail()`, `closeOrderDetail()`, `openFilter()`, `closeFilter()`, `switchFulfilTab()`

### 8.2 Party & Customer Management

#### `parties.html` — Party Directory
- Blue-background search with filter/sort buttons
- 4 stats (Total 86, Active 72, Inactive 14, O/S ₹1.8L)
- Alphabetical grouping headers (B, C, D, G, H, K, L, M, N, P, R, S)
- 12 party cards: avatar initials, name, badge (Active/Inactive/Overdue), address, type, 3 metrics, quick actions (Call/Map/Order)
- Party detail bottom sheet: gradient header, quick actions, 4 stat cards, recent orders, business info
- **JS:** `switchPTab()`, `showPartyDetail()`, `closePartyDetail()`, `partyData` object

#### `outstanding.html` — Outstanding Report
- Red gradient hero card (Total Outstanding Rs 4,87,500)
- 4 aging bucket cards (0-30d, 31-60d, 61-90d, 90+d)
- 10 party-wise cards sorted by amount (highest first)
- Each card: amount, days overdue badge, last payment, progress bar, Collect button

### 8.3 Finance & Collections

#### `collections.html` — Payment Collection
- Green gradient hero (Today's Collection ₹32,450, Total O/S, MTD Collected, Target %)
- Outstanding overview with red progress bar (68% overdue)
- Tabs: Recent / Outstanding / History
- 6 collection cards (Cash/UPI/Cheque/Bank payment modes)
- 5 pending outstanding items with Collect buttons
- Collect Payment bottom sheet: amount input, 4 payment mode selector, reference field
- Receipt bottom sheet: formatted receipt with before/after outstanding
- **JS:** `switchCTab()`, `selectMode()`, `openCollect()`, `closeCollect()`, `showReceipt()`, `closeReceipt()`

#### `expenses.html` — Expense Claims
- Stats grid (Total, Approved, Pending, Rejected amounts)
- Tabs: All / Pending / Approved / Rejected
- 8 expense cards with type icons (Travel, Food, Lodging, Fuel, Communication, Parking, Office, Entertainment)
- Add Expense bottom sheet: type selector, amount, date, description, receipt upload

### 8.4 Attendance & HR

#### `attendance.html` — Attendance & Check-in
- Green gradient hero (checked-in at 09:15 AM, GPS verified)
- Duration/distance/visits stats
- Selfie placeholder
- Red checkout button
- Today's activity timeline (6 steps with colored dots)
- March 2026 calendar with Present/Holiday color-coding
- 4 monthly stat cards with progress bars
- 7-day recent log (in/out times, hours)
- Check-out bottom sheet: selfie capture, GPS coordinates
- **JS:** `openCheckout()`, `closeCheckout()`

#### `leaves.html` — Leave Management
- Leave balance cards (CL/SL/EL with remaining/total)
- Tabs: Upcoming / History / Cancelled
- Leave history cards with date ranges, type badges, status
- Apply Leave bottom sheet: type selector, date range, reason

### 8.5 Performance & Analytics

#### `performance.html` — KPI Dashboard
- Period tabs (Today/Week/Month/Quarter)
- SVG score ring (73% achievement)
- 6 KPI cards in 2-column grid (Orders 76%, Revenue 73%, Visits 84%, Collections 69%, New Parties 40%, Attendance 96%)
- Weekly revenue bar chart
- Daily orders bar chart
- 5-person team leaderboard with rank medals
- 4 AI insight cards
- Month-over-month comparison table
- **JS:** `switchPeriod()`

#### `eod.html` — End of Day Report
- Gradient hero with date, total orders (8), revenue (₹72,450), collection (₹34,200), visits (12)
- Scrollable highlight chips (strike rate, avg order, new parties, returns)
- Orders summary (8 orders with details)
- Collections summary (5 payments by type)
- Visits summary (7 metrics with progress bar)
- Route stats (38.5 km, 8h 30m, 42 min/visit)
- Full-day activity timeline (12 entries)
- Day remarks textarea
- Submit EOD Report button

#### `custom.html` — Custom Reports
- Date range selector with quick-select chips
- 5 report type cards (Sales, Collection, Visit, Party, Product)
- 5 recent generated reports with download buttons

### 8.6 Field Operations

#### `beatplans.html` — Beat Plan Management
- Active beat plan hero card (coverage %, assigned shops, progress bar)
- Tabs: All Beats / Today / Pending
- 5 beat plan cards with day assignments, shop metrics, coverage bars
- Beat detail bottom sheet: stats, map placeholder, 6 shops with status

#### `tour.html` — Tour Plan Management
- Week hero card (Week 10, March 2-8, progress ring 83%)
- Mini calendar with color-coded days
- Day-wise schedule cards (Mon–Sun) with beat/shop/order/revenue details
- Monthly overview card (32% completion, coverage, productivity)
- 4 upcoming tour entries with status badges
- Next week preview

#### `visits.html` — Visit History
- Date filter chips (Today/Yesterday/This Week/This Month)
- 4 stats (Total 10, Productive 7, Non-Productive 3, Avg Duration 28m)
- 10 visit cards: shop name, type badge (Order/Collection/No Order), time, duration, outcome
- Color-coded left borders (green=Order, blue=Collection, red=No Order)
- Visit detail bottom sheet: map, times, type, timeline, photo grid, notes

#### `stock.html` — Stock Taking
- Search bar with filter
- Stats: 48 Total SKUs, 32 In Stock, 12 Low Stock, 4 Out of Stock
- 10 product cards with quantity, status badge (OK/Low/Out), SKU, last updated
- Stock Update bottom sheet: product info, new quantity, reason dropdown, notes

#### `odometer.html` — Odometer Reading
- Today's distance hero (start reading, current, total km)
- Photo capture section (Start/End reading camera boxes)
- Reading inputs with vehicle type and route description
- 7-day daily log with routes and km
- Monthly summary (207 km total, avg/day, fuel estimate)

### 8.7 Communication & Approvals

#### `notes.html` — Notes Management
- Search bar with filter chips (All/Important/Follow-up/Meeting)
- 10 note cards with priority badges (High/Medium/Low)
- Pin and delete actions
- Add Note bottom sheet: title, category, priority, content

#### `remarks.html` — Day Remarks
- Today's remark card with edit capability
- Textarea for day summary
- 4 quick tag buttons (Market Feedback, Competition, Weather, Issue)
- 5-emoji mood selector
- Submit button
- 7 past remark cards with mood, tags, visit/order/revenue stats

#### `approvals.html` — Approval Workflows
- 3 stats (Pending 4, Approved 12, Rejected 3)
- Tabs: Pending (with count badge) / Approved / Rejected
- 4 pending cards: Discount, Credit Limit, Return, Special Price — each with inline Approve/Reject
- Approved/Rejected history entries
- Detail bottom sheet: request details table, comment field, action buttons

#### `activities.html` — Activity Log
- Date selector chips
- 12-entry activity timeline covering full day
- Day summary card with key metrics

#### `collaterals.html` — Marketing Materials
- Category filter chips
- Stats (total items, distributed, pending)
- 8 collateral cards (brochures, posters, samples, displays)
- Distribution Log bottom sheet

#### `returns.html` — Product Returns
- 4-stat grid (Total/Pending/Approved/Value)
- Tab filters (All/Pending/Approved/Rejected)
- 8 return cards with product details, quantity, reason
- Return detail bottom sheet with status timeline

### 8.8 DMS (Distribution Management System)

#### `inventory.html` — Inventory Module
- DMS inventory management interface
- Stock levels, categories, warehouse view

#### `salesforce.html` — Sales Force Module
- Team management and performance tracking
- Sales rep list with metrics

#### `reports.html` — Reports Module
- Report templates and generation
- Sales, collection, and performance reports

#### `config.html` — Configuration
- App settings and preferences
- Sync settings, notification preferences

#### `support.html` — Help & Support Hub
- Uses `data-inject` for drawer + bottom nav
- Info card: "Support Center" with submit/check tickets prompt
- **Search bar:** live keyword search across all items with `data-sp-item` + `data-keywords` attributes, section header auto-hide, no-results empty state
- **Requests section:** 4 request types linking to sub-pages
  - Category (support-category.html) — with "3 Open" badge
  - De-Board Outlet (support-deboard.html) — outlet removal requests
  - Geolocation (support-geolocation.html) — location-related support
  - Route Transfer (support-route-transfer.html) — route reassignment
- **Recent Tickets section:** 3 tickets (Open, Resolved, In Progress) → support-ticket-detail.html
- "Submit New Request" button → support-new-request.html
- **JS:** `searchSupport(val)`, `clearSPSearch()`

#### `support-category.html` — Issue Categories
- Uses `data-inject` for drawer + bottom nav
- Info card: "3 Open" categories summary
- 6 category items: Product Issue, App/Technical, Route/Location, Outlet Management, Scheme/Pricing, Other
- Each with open count badge; clicking a category saves prefill to `localStorage.support_prefill_category` and navigates to support-new-request.html
- **JS:** `selectCategory(el, name)` — visual highlight + localStorage prefill + auto-navigate

#### `support-deboard.html` — De-Board Outlet Request
- Uses `data-inject` for drawer + bottom nav
- Form: outlet selector (with value codes OUT-001 to OUT-005), outlet code (auto-filled on selection), reason dropdown, additional details textarea
- Photo upload area (dashed border, shows info toast on tap)
- Previous requests list with status badges (Done, Pending)
- **JS:** `autoFillCode()` — fills outlet code from select value; `submitDeBoard()` — validates outlet + reason, shows success toast, redirects to support.html

#### `support-geolocation.html` — Geolocation Issues
- Uses `data-inject` for drawer + bottom nav
- 4 selectable issue types with `.geo-issue-item` highlight: GPS Not Working, Wrong Outlet Location, Geofence Error, Route Map Issue
- Report form: affected outlet, description, GPS coordinates (lat/lng)
- "Use My Current Location" button — uses real Geolocation API with Kathmandu fallback (27.717245, 85.323960)
- **JS:** `selectIssue(el, name)`, `useCurrentLocation()` (real GPS API), `submitGeoReport()` — validates issue type + outlet + description

#### `support-route-transfer.html` — Route Transfer Request
- Uses `data-inject` for drawer + bottom nav
- Current routes list: 3 active routes (Balaju 18 outlets, Lazimpat 14, Thamel 22) with schedule
- Transfer form: route selector, transfer-to salesperson, transfer type with conditional date fields
- Temporary transfer shows start/end date pickers (`.rt-temp-dates.show` toggle)
- Transfer history list
- **JS:** `toggleTempDates()` — shows/hides temp date fields; `submitTransfer()` — validates all fields including temp dates, success toast + redirect

#### `support-new-request.html` — New Support Ticket
- Hardcoded drawer (not data-inject)
- Full ticket form: subject, category dropdown (7 options), priority (Low/Medium/High/Urgent), related outlet, description
- File attachment upload zone
- Cancel + Submit Ticket buttons

#### `support-ticket-detail.html` — Ticket Detail View
- Hardcoded drawer (not data-inject)
- Ticket header card: #1024, "GPS not updating", Open badge, submitted 2 days ago, App/Technical
- Detail card: Priority (High), Category (App/Technical), Assigned To (IT Support), full description
- Activity timeline with border-left + colored dots: Created (blue) → Assigned (info) → IT Support replied (warning)
- Reply section: textarea, file attachment, Close Ticket + Send Reply buttons

#### `manage-users.html` — User Management (DMS)
- Search bar with custom `.mu-search` styles
- User list with role management
- Add/edit/remove user capabilities

### 8.9 New Modules (v1.3)

#### `schemes.html` — Schemes & Offers
- 4 stats (Active 12, Expiring 3, Target Linked 5, Value ₹2.4L)
- Filter tabs: All / Product / Value / Quantity / Combo
- 8 scheme cards with colored left borders, progress bars, type badges, "Apply to Order"
- Scheme detail bottom sheet: eligible products, T&C, usage stats
- 3 target-linked incentive cards with SVG donut rings
- **JS:** `filterSchemes()`, `openSchemeDetail()`, `closeSchemeDetail()`, `applyScheme()`

#### `competitors.html` — Competitor Intelligence
- 4 stats, search bar, filter tabs (All/Pricing/Products/Promotions/Shelf)
- 10 competitor intel cards with brand logos, type badges, timestamps
- Add Intel bottom sheet: brand selector, type chips, conditional price comparison
- Detail bottom sheet with photo gallery, action items, "Flag as Urgent"
- **JS:** search + tab filtering, `openIntelDetail()`, `submitIntel()`, `flagUrgent()`

#### `geofence.html` — Geofence Store Check-in
- Map with pulsing GPS dot, 6 store pins, 50m dashed radius circle
- 3 in-range stores (CHECK IN enabled) + 3 out-of-range (disabled)
- Check-in bottom sheet: purpose chips, selfie capture, GPS, notes
- Success animation: green checkmark circle, card state update
- Settings: radius selector, GPS toggle, photo requirement
- **JS:** `checkIn()`, `openCheckinSheet()`, `confirmCheckin()`, `selectPurpose()`

#### `chat.html` — In-App Messaging
- 7 conversations (3 unread), search filtering, online status dots
- Chat detail view: 10 message bubbles (sent/received), image placeholder
- Typing indicator (3-dot bounce), read/delivered double ticks
- Input bar: attachment, text, mic/send toggle, voice recording state
- Quick reply chips, auto-scroll to bottom
- **JS:** `openChat()`, `closeChat()`, `sendMessage()`, `filterConversations()`, `tapQuickReply()`

#### `targets.html` — Targets & Incentives
- Animated SVG donut hero (68%, ₹1,72,000 / ₹2,50,000, trend arrow)
- 6 KPI target cards with incentive amounts and color-coded progress bars
- 4 incentive slabs (Bronze/Silver/Gold/Platinum) — current slab highlighted
- 3 milestone rewards (achieved/locked states with progress)
- Monthly trend SVG bar chart (6 months with target line)
- **JS:** `switchPeriod()`, `openTargetDetail()`, `closeTargetDetail()`

#### `distributor.html` — Distributor Management
- Hero card: company profile, license #, status badge, quick actions (Call/Email/Directions)
- Credit utilization: progress bar (47%), available credit, color-coded
- 5 stock allocation cards with status badges (In Stock/Low/Out)
- 5 recent dispatch cards with status timeline
- Dispatch detail + credit request bottom sheets
- **JS:** `openDispatchDetail()`, `closeDispatchDetail()`, `openCreditRequest()`, `submitCreditRequest()`

#### `gallery.html` — Photo Library
- 4 stats, 7 filter chips, date-grouped photo grid (19 photos)
- Grid/list view toggle
- Photo detail bottom sheet: type badge, location, timestamp, GPS, linked data
- Bulk selection mode: long-press triggers, floating action bar
- **JS:** `filterPhotos()`, `openPhotoDetail()`, `toggleGridView()`, `toggleBulkSelect()`, `selectPhoto()`, `deletePhotos()`

---

## 9. UI Patterns & Conventions

### 9.1 Page Structure (every module follows this)
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <title>Module Name — Adera Sales</title>
  <link rel="stylesheet" href="../css/style.css">
  <style>/* page-specific styles */</style>
</head>
<body>
  <p class="page-title">Adera Sales · Module Name</p>
  <div class="phone-frame">
    <!-- Overlays & bottom sheets (absolute positioned) -->
    <!-- Drawer overlay + drawer -->
    <div class="screen-scroll">
      <!-- Status Bar -->
      <!-- Top Bar (with back button) -->
      <!-- Page Content -->
      <!-- Bottom Nav -->
    </div>
  </div>
  <script src="../js/app.js"></script>
  <script>/* page-specific JS */</script>
</body>
</html>
```

### 9.2 Bottom Sheet Pattern
```
Overlay (click to dismiss)  →  .overlay.show { opacity: 1; pointer-events: all }
Sheet (slides up)           →  .sheet.show { transform: translateY(0) }
Close via:
  - Overlay click
  - X button
  - Action completion (submit/confirm)
```

### 9.3 Status Badge Colors
| Status | Badge Class | Color |
|--------|-------------|-------|
| Active / Delivered / Approved | `.badge-success` | Green |
| Pending / In Transit | `.badge-warning` | Amber |
| Overdue / Rejected / Failed | `.badge-danger` | Red |
| New / Info / Default | `.badge-primary` | Blue |
| Inactive / Cancelled | `.badge-muted` | Grey |
| Special / Premium | `.badge-purple` | Purple |

### 9.4 Card Left Border Convention
Many modules use a 3-4px left border on cards for visual categorization:
- **Green** → Completed / Order placed / Productive visit
- **Blue** → Collection / Active / Info
- **Red** → Overdue / No order / Failed
- **Orange** → Pending / Warning
- **Purple** → Special / Discount / Premium

### 9.5 Icon System
- All icons are **inline SVG** (no icon library dependency)
- Consistent stroke style: `fill="none" stroke="currentColor" stroke-width="1.8-2.5"`
- ViewBox: `0 0 24 24` (Feather icon style)
- Sizes: 14px (status bar), 18-20px (buttons), 22-26px (module icons), 36px (empty states)

### 9.6 Data Display Patterns
- **Numbers:** Right-aligned in list items, bold weight
- **Currency:** ₹ prefix for Indian Rupee, Rs for Nepali Rupee
- **Large numbers:** Abbreviated with L (Lakh) e.g., ₹1.2L = ₹1,20,000
- **Dates:** DD/MM/YYYY or "Mar 8, 2026" format
- **Time:** 12-hour format with AM/PM
- **Percentages:** Displayed in stat cards with matching color (green >70%, amber 40-70%, red <40%)

---

## 10. Navigation Architecture

### 10.1 Primary Navigation
```
index.html (Home)
├── Bottom Nav
│   ├── Home (active)
│   ├── Parties → modules/parties.html
│   ├── New (+) → modules/orders.html
│   ├── Reports → modules/performance.html
│   └── Profile → modules/profile.html
├── Module Grid → 25 module cards → respective pages
├── CHECK-IN → (no action yet, placeholder)
├── START ROUTE → modules/route.html
├── Side Drawer → All modules + DMS + Actions
└── Target Button → Target Bottom Sheet (overlay)
```

### 10.2 Module-Level Navigation
Each module page has:
- **Back button** → `goBack()` (history.back or ../index.html)
- **Simplified drawer** → Links to Home + key modules + Logout
- **Bottom nav** → Same 5 items as home (with current page highlighted)

### 10.3 Order Flow
```
Home → Orders (orders.html)
         → Take Order (take-order.html)
             → Cart (cart.html)
                 → Order Placed → back to Orders
```

### 10.4 Deep Links from Other Modules
- Party card "Order" button → take-order.html
- Outstanding "Collect" button → collections.html
- Performance "View Details" → respective module pages

---

## 11. PWA & Offline Support

- **Service Worker:** Registered in `app.js` via `navigator.serviceWorker.register('/sw.js')`
- **sw.js:** Basic shell at project root
- **Status:** Minimal — no caching strategy implemented yet
- **Future:** Add cache-first strategy for static assets, network-first for API calls

---

## 12. Browser Compatibility

| Feature | Support |
|---------|---------|
| CSS Grid | All modern browsers |
| Custom Properties (CSS vars) | Chrome 49+, Edge 16+, Firefox 31+, Safari 9.1+ |
| `inset` shorthand | Chrome 87+, Edge 87+, Firefox 66+, Safari 14.1+ |
| CSS `gap` in Flexbox | Chrome 84+, Edge 84+, Firefox 63+, Safari 14.1+ |
| SVG inline | All modern browsers |

**Target:** Chrome/Edge (latest), Safari 14+, Firefox (latest)
**Optimized for:** Mobile-first, centered on desktop with phone frame

---

## 13. Developer Handoff Notes

### 13.1 Converting to Production App

1. **Framework Migration** — Each `.html` page maps to a route/screen. Consider:
   - React Native / Flutter for native mobile
   - Next.js / Nuxt.js for web app
   - Each page's `<style>` block → component-scoped styles
   - Each page's `<script>` block → component logic

2. **Shared Components to Extract:**
   - `PhoneFrame` → only needed for demo/preview mode
   - `StatusBar` → replace with native status bar
   - `TopBar` → reusable header component with back/menu/title/actions
   - `BottomNav` → global navigation component
   - `Drawer` → side navigation with user profile
   - `BottomSheet` → reusable slide-up sheet component
   - `StatCard`, `KPICard`, `InfoCard` → reusable data display
   - `TabBar`, `ChipGroup` → reusable filters
   - `Toast` → notification system

3. **Data to Extract:**
   - All hardcoded mock data (orders, parties, collections, etc.) → JSON/API
   - Party names, amounts, dates, statuses → dynamic from backend
   - Stats and KPIs → computed from real data

4. **API Endpoints Needed:**
   | Endpoint | Method | Used By |
   |----------|--------|---------|
   | `/auth/login` | POST | Login screen |
   | `/auth/checkin` | POST | attendance.html |
   | `/parties` | GET | parties.html |
   | `/parties/:id` | GET | Party detail sheet |
   | `/orders` | GET/POST | orders.html, take-order.html |
   | `/orders/:id` | GET | Order detail sheet |
   | `/collections` | GET/POST | collections.html |
   | `/attendance` | GET/POST | attendance.html |
   | `/leaves` | GET/POST | leaves.html |
   | `/expenses` | GET/POST | expenses.html |
   | `/approvals` | GET/PATCH | approvals.html |
   | `/performance` | GET | performance.html |
   | `/beatplans` | GET | beatplans.html |
   | `/tours` | GET | tour.html |
   | `/visits` | GET | visits.html |
   | `/stock` | GET/PATCH | stock.html |
   | `/returns` | GET/POST | returns.html |
   | `/outstanding` | GET | outstanding.html |
   | `/eod` | POST | eod.html |
   | `/odometer` | POST | odometer.html |
   | `/remarks` | POST | remarks.html |
   | `/notes` | GET/POST/DELETE | notes.html |
   | `/reports/generate` | POST | custom.html |

### 13.2 State That Needs Persistence
- Check-in/out status & timestamps
- Cart items (between take-order → cart)
- Filter/tab selections per page
- Draft EOD remarks
- Odometer readings

### 13.3 Features Status
All originally planned features have been implemented:
- ~~Push notifications~~ ✅ (simulated push banners, permission prompt)
- ~~Offline data sync~~ ✅ (SyncQueue, background sync in sw.js, conflict resolution)
- ~~Image upload~~ ✅ (camera capture simulation on attendance, expenses, odometer)
- ~~Inter-page data flow~~ ✅ (outstanding→collections, party→take-order, login→session via localStorage)
- ~~Form validation~~ ✅ (validateForm() in app.js)
- ~~GPS/location~~ ✅ (check-in geolocation, geofence page)
- ~~Real-time clock~~ ✅ (updateClock() on all pages)

---

## 14. Recent Additions (v1.1)

### New Pages
- **Login Page** (`modules/login.html`) — Complete login flow with phone/password, OTP verification (4-digit auto-advance), and company selection
- **Profile Page** (`modules/profile.html`) — Full user profile with settings toggles, work summary, edit sheet
- **Notifications Page** (`modules/notifications.html`) — Notification center with 15 cards, tab filtering, detail/settings sheets

### Search & Filter Functionality
Live search + tab/chip filtering added to 3 key modules:
- **Orders** — Filter by order ID, shop name, amount; combined with status tabs (All/Pending/Active/Done)
- **Parties** — Filter by name, address, type; combined with badge tabs; alphabetical group headers auto-hide
- **Notes** — Filter by title, preview, party name; combined with priority chips (High/Medium/Low) and time filters

### CSS Animation System (style.css 758-906)
- Skeleton/shimmer loading placeholders with circle, text, and card variants
- Fade-in with staggered delays (nth-child 1-10), slide-in-right, scale-in, bounce
- Ripple click effect, swipe hint, glow utilities (success/warning/danger/primary)
- Pull-to-refresh spinner illusion

### Auto-Injection System (app.js)
- `injectDrawer(page)` and `injectBottomNav(page)` functions for standardized nav across pages
- `data-inject` attribute on elements opts into auto-injection on DOMContentLoaded
- Path-aware link generation (detects `/modules/` for correct relative paths)

### Shared JS Additions
- `showSkeleton()` / `hideSkeleton()` — skeleton loading state management
- `simulateRefresh()` — pull-to-refresh animation with toast notification

---

## 15. Recent Additions (v1.2)

### Profile Page (`modules/profile.html`)
- **Profile Header** — Gradient blue header with avatar (initials "EM"), name (Elon Musk), role (Sales Representative), employee ID badge (EMP-2847)
- **Stats Overlay Card** — 3 stats: 142 Visits, ₹1.2L This Month, 94% Target
- **Personal Information** — Phone, email, location (Kathmandu Zone), date of joining
- **Work Summary** — Outlets assigned (86), monthly target (₹2,50,000), working days (24/26)
- **Settings Section** — Change password, notifications toggle, app settings
- **Support Section** — Help & FAQ, report a problem, terms & privacy
- **Logout Button** — Red outline button with logout icon
- **Bottom Nav** — Profile tab active

### Navigation Update
- Bottom nav Profile item in `index.html` now links to `modules/profile.html`

### Project Audit (v1.2)
- All 32 module pages confirmed complete with full UI content (now 46 in v1.3)
- Every page has: hero/info cards, stats, list items, forms, bottom sheets, and/or timelines
- No placeholder or stub pages remain

---

## 16. Recent Additions (v1.3)

### New Module Pages (8 pages)

#### `schemes.html` — Schemes & Offers
- 4 stats (Active 12, Expiring 3, Target Linked 5, Value ₹2.4L)
- Filter tabs: All / Product / Value / Quantity / Combo
- 8 scheme cards with progress bars, type badges, "Apply to Order" buttons
- Scheme detail bottom sheet with eligible products, T&C, usage stats
- 3 target-linked incentive cards with SVG donut progress rings

#### `competitors.html` — Competitor Intelligence
- 4 stats (Reports 24, Brands 8, Price Alerts 5, This Week 7)
- Search + filter tabs: All / Pricing / Products / Promotions / Shelf Space
- 10 competitor intel cards (Amul, Britannia, Parle, Nestlé, ITC, Dabur, HUL, Marico, Godrej, Patanjali)
- Add Intel bottom sheet with conditional price comparison fields
- Intel detail bottom sheet with photo gallery and "Flag as Urgent"

#### `geofence.html` — Geofence Store Check-in
- Map section with pulsing GPS dot, 6 store pins, 50m radius circle
- 3 in-range stores (green, CHECK IN enabled) + 3 out-of-range (grey, disabled)
- Check-in bottom sheet: purpose chips, selfie capture, GPS, notes
- Success animation with green checkmark, card state update
- Geofence settings: radius selector, GPS toggle, photo requirement

#### `chat.html` — In-App Messaging
- 7 conversations (3 unread with badges), search filtering
- Chat detail view with 10 message bubbles (sent/received)
- Typing indicator (animated 3-dot), read/delivered ticks
- Message input: text, attachment, voice recording simulation
- Quick reply chips: "On my way", "Will do", "Noted", "Thanks", "Call me"

#### `targets.html` — Targets & Incentives
- Animated SVG donut hero (68% achievement, ₹1,72,000 / ₹2,50,000)
- 6 KPI target cards with incentive amounts and progress bars
- 4-tier incentive slab system (Bronze→Platinum) with current slab highlight
- 3 milestone reward cards (achieved/locked states)
- Monthly trend SVG bar chart (6 months)

#### `distributor.html` — Distributor Management
- Distributor profile hero card (Nepal Foods Pvt. Ltd)
- Credit utilization section (47% of ₹5L, color-coded progress)
- 5 stock allocation category cards with status badges
- 5 recent dispatch cards with status timeline
- Credit request + dispatch detail bottom sheets

#### `gallery.html` — Photo Library
- 4 stats (Total 47, Today 8, This Week 23, Storage 12.4 MB)
- Filter chips: All / Selfies / Receipts / Odometer / Shelf / Products / Stores
- Date-grouped photo grid (19 photos in 3 groups)
- Grid/list view toggle
- Photo detail bottom sheet + bulk selection mode with floating action bar

### Interactive Features Added

#### Push Notification System
- `showPushNotification()` — slide-down banner with type icons (order/alert/success/info)
- 10-notification demo pool, auto-fires every 30-45 seconds
- Permission prompt bottom sheet on first visit (Allow/Not Now)
- Saved to `localStorage.adera_push_permission`

#### Offline Data Sync
- `SyncQueue` — localStorage-based offline action queue
- `showSyncBar()` — animated progress bar through pending items
- `SyncConflict` — conflict resolution UI (Keep Mine / Keep Server / Merge)
- Background Sync registration in sw.js, postMessage manual trigger
- Sync queue bottom sheet on home page with seeded demo items

#### Inter-Page Data Flow
- Outstanding→Collections: `collectParty()` stores party/amount, auto-opens collect sheet
- Party→Take Order: `orderForParty()` stores party name, auto-selects in dropdown
- Login→Session: stores company/user/timestamp in `localStorage.adera_session`

#### Image Upload Simulation
- Attendance: selfie capture with flash animation + checkmark overlay
- Expenses: receipt upload with progress bar (0→100%), thumbnail preview
- Odometer: start/end photo capture with simulated odometer readout

#### Error & Empty States
- `showEmptyState()`, `showErrorState()`, `showOfflineState()` helpers
- Reusable SVG icons (search, list, inbox, cart, alert, wifi-off)
- `.offline-banner` on home page with auto online/offline detection

#### Pull-to-Refresh
- Touch-based PTR wired on orders, parties, collections, notes
- Uses existing `.ptr-indicator` CSS + `simulateRefresh()` from app.js

#### Swipe-to-Action Cards
- Notes: swipe left = delete (red), swipe right = pin (green)
- Orders: swipe left = archive (orange), swipe right = reorder (blue)
- 80px snap threshold, touch event handling, toast feedback

#### Animated SVG Charts (performance.html)
- Weekly revenue bar chart (7 bars, blue gradient, staggered animation)
- Daily orders bar chart (7 bars, green gradient)
- Score ring count-up animation (0→73%)
- Monthly trend sparkline/area chart (6 data points)
- IntersectionObserver triggers animations on scroll

#### Onboarding Walkthrough (index.html)
- 4-step spotlight tutorial (CHECK-IN, module grid, drawer, bottom nav)
- Dark overlay with spotlight cutout (box-shadow trick)
- Tooltip bubbles with step counter and dots
- Auto-starts on first visit, "?" button to replay
- Saved to `localStorage.adera_onboarded`

#### Contextual Tooltips
- `CtxTooltip.show()` — dark tooltip with title, value, trend arrow
- `bindTooltip()` — long-press (500ms) or click gesture binding
- Wired on home page (6 stats) and performance page (6 KPIs)
- Auto-close after 5s, outside-click dismissal

#### Voice Notes
- Notes page: record/play/delete in Add Note sheet with waveform visualization
- Remarks page: floating mic button, recording panel, compact player bar
- Animated waveform bars (20 bars), timer (M:SS), progress playback

#### Haptic Micro-Animations
- `hapticTap()`, `hapticPress()`, `hapticError()`, `hapticSuccess()`, `hapticBump()`
- CSS keyframes: haptic-tap, error-shake, success-pop, count-bump, slide-bounce
- Vibration API integration
- Wired on home grid, check-in, take-order quantities, collections

#### Bulk Actions
- Multi-select mode on orders, notes, parties
- "Select" button or long-press enters bulk mode
- Floating dark action bar with count + Export/Delete/Assign/Archive/SMS buttons
- Select All toggle, dynamic counter updates

#### Quick Actions Bar (index.html)
- 5 pill buttons: Voice Search, Barcode Scan, Quick Order, Day Summary, SOS
- Voice: listening overlay with pulsing mic, simulated result
- Barcode: scanner overlay with animated red scan line, product result
- Quick Order: compact bottom sheet with party + product quantity controls
- Day Summary: today's metrics with progress bars
- SOS: red emergency sheet with 4 alert types

#### App Update Banner (index.html)
- Gradient "v2.0 Available" banner with dismiss/update
- Changelog bottom sheet: 5 new features, 5 improvements, 4 bug fixes
- Fake download progress bar (0→100% in 3s)
- Saved to `localStorage.adera_update_dismissed`
- **Auto-hide:** Banner auto-hides after 5 seconds if not interacted with
- **Swipe-to-dismiss:** Swipe banner upward (>40px threshold) to dismiss; small drags snap back. Swipe handler skips touches on close/update buttons to avoid conflicts
- **24-hour snooze:** Clicking the X button hides the banner for 24 hours (timestamp stored in `localStorage.adera_update_dismissed_at`); reappears after 24h unless the update is completed
- **Close button:** 32×32px circular button with semi-transparent white background, inline in flex layout (no longer absolute-positioned to avoid `overflow:hidden` clipping)

### CSS Component Additions (style.css)
- Push banner: `.push-banner`, `.push-icon`, `.push-body`, `.push-actions`
- Sync system: `.sync-bar`, `.sync-badge`, `.sync-queue-card`
- Conflict resolution: `.conflict-card`, `.conflict-values`, `.conflict-btn`
- Error/empty states: `.state-container`, `.state-icon`, `.offline-banner`
- Contextual tooltips: `.ctx-tooltip`, `.tt-title`, `.tt-value`, `.tt-trend`
- Bulk actions: `.bulk-bar`, `.bulk-checkbox`, `.bulk-select-all`
- Haptic animations: `@keyframes haptic-tap/press/error-shake/success-pop/count-bump`

---

*Generated for Adera Sales v1.3.0 — March 2026*
