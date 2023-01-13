/*jslint browser*/
import {GlobalState} from "../../state/Global/index.js";

import {pannerListener} from "../limits/service.js";

/*-
hasAudioContext: undefined -> AudioContex | undefined;
*/
function hasAudioContext() {
    const audioContextClass = (
        window.AudioContext || window.webkitAudioContext || undefined
    );
    return audioContextClass !== undefined;
}

/*-
initAudioContext: undefined -> undefined
*/
function initAudioContext() {
    const AudioContextObject = window.AudioContext || window.webkitAudioContext;
    const {X, Y, Z} = pannerListener;
    GlobalState.audio_context = new AudioContextObject({
        latencyHint: "playback",
        sampleRate: 44100
    });
    let audioCtx = GlobalState.audio_context;
    //listener position
    if (audioCtx.listener.positionX) {
        audioCtx.listener.positionX.value = X;
        audioCtx.listener.positionY.value = Y;
        audioCtx.listener.positionZ.value = Z;
    } else {
        audioCtx.listener.setPosition(X, Y, Z);
    }
    audioCtx = undefined;

    GlobalState.audio_context.resume();
}

export {
    hasAudioContext,
    initAudioContext
};
