(function () {
    const cacheName = "insets-v1";
    const files = [
        "/",
        "/index.html",
        "/style.css",
        "favicon.ico",
        "/static/",
        "/static/js/",
        "/static/js/main.fa5554cb.js",
        "/static/css/",
        "/static/css/main.f787bed4.css",
        "/icons/",
        "/icons/maskable_icon_x48.js",
        "/icons/maskable_icon_x72.js",
        "/icons/maskable_icon_x96.js",
        "/icons/maskable_icon_x128.js",
        "/icons/maskable_icon_x192js",
        "/icons/maskable_icon_x384.js",
        "/icons/maskable_icon_x512.js"
    ];

    self.addEventListener("install", function (e) {
        e.waitUntil((async function () {
            const cache = await caches.open(cacheName);
            console.log("Service worker: caching all");
            await cache.addAll(files);
        }()));
    });
    self.addEventListener("activate", function (e) {
        e.waitUntil(
            caches.keys().then(function (keyList) {
                return Promise.all(keyList.map(function (key) {
                    if (key === cacheName) {
                        return;
                    }
                    return caches.delete(key);
                }));
            })
        );
    });
}());
