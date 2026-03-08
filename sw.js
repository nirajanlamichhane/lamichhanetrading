const CACHE_NAME = "cache-v2";
const urlsToCache = [
  "/index.html",
  "/css/style.css",
  "/js/app.js",
  // Module pages
  "/modules/parties.html",
  "/modules/orders.html",
  "/modules/take-order.html",
  "/modules/cart.html",
  "/modules/collections.html",
  "/modules/attendance.html",
  "/modules/performance.html",
  "/modules/inventory.html",
  "/modules/salesforce.html",
  "/modules/reports.html",
  "/modules/config.html",
  "/modules/support.html",
  "/modules/expenses.html",
  "/modules/notes.html",
  "/modules/beatplans.html",
  "/modules/visits.html",
  "/modules/leaves.html",
  "/modules/remarks.html",
  "/modules/eod.html",
  "/modules/odometer.html",
  "/modules/activities.html",
  "/modules/collaterals.html",
  "/modules/returns.html",
  "/modules/stock.html",
  "/modules/approvals.html",
  "/modules/tour.html",
  "/modules/outstanding.html",
  "/modules/custom.html",
  "/modules/profile.html",
  "/modules/route.html",
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener("fetch", event => {
  // Network-first for API calls
  if (event.request.url.includes("/api/")) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          var clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Cache-first for static assets
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(fetchRes => {
        // Cache new resources on the fly
        if (fetchRes.status === 200) {
          var clone = fetchRes.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return fetchRes;
      });
    })
  );
});
