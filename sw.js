/* Keeps a copy of the page so it opens even without a connection.
   Always tries the network first, so updates arrive straight away.
   A message shared from another app arrives in the address (?text=...).
   Those requests are answered from the saved copy and never go online,
   and no address with a message in it is ever saved. */
var CACHE = "itas-v16";
var FILES = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-180.png",
  "./fonts/atkinson-400-latin.woff2", "./fonts/atkinson-700-latin.woff2", "./fonts/sharetechmono-400-latin.woff2"];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  var url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== self.location.origin) return;

  if (url.search && req.mode === "navigate") {
    // Possibly a shared message: stay offline. The page reads the message from its own address.
    e.respondWith(
      caches.match("./index.html").then(function (hit) {
        return hit || caches.match("./");
      }).then(function (hit) {
        return hit || new Response("Please open the page once with a connection first.", { status: 503, headers: { "Content-Type": "text/plain" } });
      })
    );
    return;
  }

  if (url.search) return;

  // On a weak connection, fall back to the saved copy after 4 seconds instead of hanging.
  // With nothing saved yet, keep waiting for the network.
  var net = fetch(req).then(function (res) {
    if (res.ok) {
      var copy = res.clone();
      caches.open(CACHE).then(function (c) { c.put(req, copy); });
    }
    return res;
  });
  var slow = new Promise(function (resolve, reject) { setTimeout(function () { reject(new Error("slow")); }, 4000); });
  e.respondWith(
    Promise.race([net, slow]).catch(function () {
      return caches.match(req).then(function (hit) {
        if (hit) return hit;
        return (req.mode === "navigate" ? caches.match("./index.html") : Promise.resolve()).then(function (page) { return page || net; });
      });
    })
  );
});
