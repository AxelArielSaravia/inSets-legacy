//@ts-check
import React from "react";
import ReactDOM from "react-dom/client";

import {
    handleStateInitializers,
    setInitialAudioContext
} from "./state/stateInitializer.js";
import {EventOnce} from "./utils.js";
import App from "./components/App.js";

import "./index.scss";


{
    const buttonContainer = document.getElementById("button-container");
    if (buttonContainer === null) {
        throw new Error("HTMLElement does not exist, the app can not start");
    }
    /* INIT STATE */
    handleStateInitializers("v0.3.9");

    if (window.AudioContext !== undefined || window.webkitAudioContext !== undefined) {
        const startButton = document.createElement("button");
        startButton.type = "button";
        startButton.className = "startApp-button fs-text-l text-bold";
        startButton.textContent = "OPEN";

        startButton.addEventListener(
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

        if (buttonContainer.firstElementChild !== null) {
            buttonContainer.removeChild(buttonContainer.firstElementChild);
        }
        buttonContainer.appendChild(startButton);
    } else {
        /**
         * If the browser does not have the AudioContext send an error
         */
        buttonContainer.innerHTML = /*html*/`
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
}