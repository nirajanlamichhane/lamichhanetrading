const CACHE_NAME = "cache-v4";
const SYNC_STORE = "adera_offline_requests";
const urlsToCache = [
  "/index.html",
  "/css/style.css",
  "/js/app.js",
  // Module pages (39 total)
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
  "/modules/login.html",
  "/modules/notifications.html",
  "/modules/schemes.html",
  "/modules/competitors.html",
  "/modules/geofence.html",
  "/modules/chat.html",
  "/modules/targets.html",
  "/modules/distributor.html",
  "/modules/gallery.html",
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
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const method = event.request.method;
  const isAPI = event.request.url.includes("/api/");
  const isMutation = method === "POST" || method === "PUT" || method === "PATCH";

  // Queue failed mutation requests for offline sync
  if (isAPI && isMutation) {
    event.respondWith(
      event.request.clone().text().then(body => {
        return fetch(event.request).catch(() => {
          // Network failed — queue the request for later
          return saveOfflineRequest({
            url: event.request.url,
            method: method,
            headers: Object.fromEntries(event.request.headers.entries()),
            body: body,
            timestamp: new Date().toISOString()
          }).then(() => {
            // Register background sync if supported
            if (self.registration.sync) {
              return Promise.all([
                self.registration.sync.register("adera-offline-sync"),
                self.registration.sync.register("sync-queue")
              ]);
            }
            return Promise.resolve();
          }).then(() => {
            // Notify client that request was queued
            notifyClients({ type: "REQUEST_QUEUED", method, url: event.request.url });
            // Return a synthetic 202 Accepted response
            return new Response(JSON.stringify({ queued: true, offline: true }), {
              status: 202,
              headers: { "Content-Type": "application/json" }
            });
          });
        });
      })
    );
    return;
  }

  // Network-first for API GET calls
  if (isAPI) {
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
        if (fetchRes.status === 200) {
          var clone = fetchRes.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return fetchRes;
      });
    })
  );
});

// ═══ Background Sync ═══
self.addEventListener("sync", event => {
  if (event.tag === "adera-offline-sync" || event.tag === "sync-queue") {
    event.waitUntil(replayOfflineRequests());
  }
});

// ═══ Message Listener — Manual Sync from Main Thread ═══
self.addEventListener("message", event => {
  if (event.data && event.data.type === "SYNC_NOW") {
    replayOfflineRequests().then(() => {
      notifyClients({ type: "SYNC_COMPLETE", manual: true });
    });
  }
});

// ═══ Offline Request Storage (IndexedDB) ═══
function openSyncDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("AderaSyncDB", 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(SYNC_STORE)) {
        db.createObjectStore(SYNC_STORE, { keyPath: "id", autoIncrement: true });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function saveOfflineRequest(data) {
  return openSyncDB().then(db => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(SYNC_STORE, "readwrite");
      tx.objectStore(SYNC_STORE).add(data);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  });
}

function getAllOfflineRequests() {
  return openSyncDB().then(db => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(SYNC_STORE, "readonly");
      const req = tx.objectStore(SYNC_STORE).getAll();
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  });
}

function deleteOfflineRequest(id) {
  return openSyncDB().then(db => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(SYNC_STORE, "readwrite");
      tx.objectStore(SYNC_STORE).delete(id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  });
}

function replayOfflineRequests() {
  return getAllOfflineRequests().then(requests => {
    if (!requests.length) return;

    let synced = 0;
    let failed = 0;

    return requests.reduce((chain, req) => {
      return chain.then(() => {
        return fetch(req.url, {
          method: req.method,
          headers: req.headers,
          body: req.body
        }).then(res => {
          if (res.ok) {
            synced++;
            return deleteOfflineRequest(req.id);
          } else {
            failed++;
          }
        }).catch(() => {
          failed++;
        });
      });
    }, Promise.resolve()).then(() => {
      notifyClients({
        type: "SYNC_COMPLETE",
        synced: synced,
        failed: failed,
        remaining: failed
      });
    });
  });
}

// ═══ Client Messaging ═══
function notifyClients(message) {
  self.clients.matchAll({ type: "window" }).then(clients => {
    clients.forEach(client => client.postMessage(message));
  });
}
