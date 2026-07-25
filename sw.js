/*
 * FitFlexr service worker — precaches the whole app for offline use.
 *
 * IMPORTANT: CACHE_VERSION must be bumped whenever ANY app file changes
 * (index.html, styles.css, app.js, exercises.js, manifest.json, icons, or
 * this file). Installed users only receive updates when the version changes.
 */
const CACHE_VERSION = "fitflexr-v24";

const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./exercises.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Cache-first: everything the app needs is precached. Navigations fall
  // back to the shell so the app opens offline from any URL in scope.
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((cached) => {
      if (cached) return cached;
      return fetch(req).catch(() => {
        if (req.mode === "navigate") return caches.match("./index.html");
        return Response.error();
      });
    })
  );
});
