import React from 'react';
import ReactDOM from 'react-dom/client';

import { defaultGlobalState, initGlobalState } from './state/Global/index.js';

import { handleInitState } from './services/localStorage/service.js';
import { hasAudioContext, initAudioContext } from "./services/AudioContext/service.js"

import App from './features/App.js';
import HasNotAudioContext from './features/App.js';


import './index.scss';

/* INIT STATE */
initGlobalState(handleInitState("v0.3.0", defaultGlobalState));

function startApp() {
    if (hasAudioContext()) initAudioContext();

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <>
            {hasAudioContext()
                ?  <App/>
                : <HasNotAudioContext/>
            }
        </>
    );
}

{
    const startButton = document.getElementById("startButton");
    startButton.addEventListener("click", startApp,{once: true});
}