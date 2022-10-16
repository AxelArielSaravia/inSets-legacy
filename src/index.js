import React from "react";
import ReactDOM from "react-dom/client";

import { handleInitState } from "./services/Global/service.js";
import {
    hasAudioContext,
    initAudioContext
} from "./services/AudioContext/service.js"

import App from "./features/App.js";
import HasNotAudioContext from "./features/App.js";


import "./index.scss";

/* INIT STATE */
handleInitState("v0.3.1");

function startApp() {
    if (hasAudioContext()) initAudioContext();

    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(
        <>
            {hasAudioContext()
                ? <App />
                : <HasNotAudioContext />
            }
        </>
    );
}

{
    const startButton = document.getElementById("startButton");
    startButton.addEventListener("click", startApp, { once: true });
}