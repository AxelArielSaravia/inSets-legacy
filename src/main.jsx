import * as React from "react";
import * as ReactDOM from "react-dom/client";

import {
    handleStateInitializers,
    setInitialAudioContext
} from "./state/stateInitializer.js";
import {EventOnce} from "./utils.js";
import App from "./components/App.jsx";

const DOMInitLoading = document.getElementById("init-loading");
if (DOMInitLoading === null) {
    throw new Error("HTMLElement does not exist, the app can not start");
}

/* INIT STATE */
handleStateInitializers("v0.4.0");

if (window.AudioContext !== undefined
    || window.webkitAudioContext !== undefined
) {
    //PWA
    if (navigator.serviceWorker !== undefined) {
        navigator.serviceWorker.register("pwasw.js");
    }

    const DOMStartButton = document.createElement("button");
    DOMStartButton.type = "button";
    DOMStartButton.className = "startApp-button fs-text-l text-bold";
    DOMStartButton.textContent = "OPEN";
    DOMStartButton.addEventListener(
        "click",
        function startApp() {
            const HTMLRoot = document.getElementById("root");
            if (HTMLRoot === null) {
                throw new Error("HTMLElement does not exist, the app can not start");
            }
            setInitialAudioContext();
            ReactDOM.createRoot(HTMLRoot).render(<App />);
        },
        EventOnce
    );
     DOMInitLoading.replaceChildren();
     DOMInitLoading.appendChild(DOMStartButton);
} else {
    DOMInitLoading.replaceChildren();
    DOMInitLoading.insertAdjacentHTML(
        "afterbegin",
        '<div class="init-content flex-column align-c justify-c"><h1 class="fs-text-l text-center py-20">ERROR: Sorry we have a problem</h1><div class="py-20"><p class="fs-text-l text-center" >Your browser does NOT have AudioContext🎵 support❗❗</p><p class="fs-text-l text-center" >and because of that, we CAN NOT run the app 😭</p></div><p class="fs-text-l text-center py-20">Please, use any other actualized browser.</p></div>'
    );
}
