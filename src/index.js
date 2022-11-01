import React from "react";
import ReactDOM from "react-dom/client";

import {handleInitState} from "./services/Global/service.js";
import {
    hasAudioContext,
    initAudioContext
} from "./services/AudioContext/service.js";

import App from "./features/App.js";

import "./index.scss";

function startApp() {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    initAudioContext();
    root.render(<App />);
}

window.addEventListener("DOMContentLoaded", function () {
    const buttonContainer = document.getElementById("button-container");

    /* INIT STATE */
    handleInitState("v0.3.2");

    if (hasAudioContext()) {
        const startButton = document.createElement("button");
        startButton.type = "button";
        startButton.className = "startApp-button fs-text-l text-bold";
        startButton.textContent = "START";

        startButton.addEventListener("click", startApp, {once: true});

        buttonContainer.removeChild(buttonContainer.firstElementChild);
        buttonContainer.appendChild(startButton);

    } else {
        /**
         * If the browser does not have the AudioContext send an error
         */
        buttonContainer.innerHTML = `
        <div class="init-content flex-column align-c justify-c">
            <h1 class="fs-text-l text-center py-20">
                ERROR: Sorry we have a problem
            </h1>
            <div class="py-20">
                <p class="fs-text-l text-center" >
                    Your browser does NOT have AudioContext🎵 support❗❗
                </p>
                <p class="fs-text-l text-center" >
                    and because of that, we CAN NOT run the app 😭
                </p>
            </div>
            <p class="fs-text-l text-center py-20">
                Please, use any other actualized browser.
            </p>
        </div>
        `;
    }
});