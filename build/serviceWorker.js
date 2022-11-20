
self.addEventListener("install", function () {
    console.log("Service worker installed");
});
self.addEventListener("activate", function () {
    console.log("Service worker activated");
});