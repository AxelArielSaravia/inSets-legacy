// src/pwasw.js
async function waitCache() {
  const cache = await caches.open(CACHE_NAME);
  return cache.addAll(urlsToCache);
}
var installListener = function(e) {
  e.waitUntil(waitCache());
};
async function fetchCache(req) {
  const netRes = await fetch(req);
  const cache = await caches.open(CACHE_NAME);
  cache.put(req, netRes.clone());
  return netRes;
}
async function waitFetch(e) {
  const res = await caches.match(e.request);
  const fetchPr = fetchCache(e.request);
  return res !== undefined ? res : fetchPr;
}
var fetchListener = function(e) {
  e.waitUntil(waitFetch(e));
};
var CACHE_NAME = "0.4.0";
var urlsToCache = [
  "/",
  "/global.css",
  "/index.css",
  "/main.js",
  "/theme.js",
  "/media/icon192.png"
];
self.addEventListener("install", installListener);
self.addEventListener("fetch", fetchListener);
