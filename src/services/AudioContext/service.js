/*jslint browser*/
import {GlobalState} from "../../state/Global/index.js";

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
    GlobalState.audio_context = new AudioContextObject({
        latencyHint: "playback",
        sampleRate: 44100
    });
    const audioCtx = GlobalState.audio_context;
    //listener position
    if (audioCtx.listener.positionX) {
        audioCtx.listener.positionX.value = 0;
        audioCtx.listener.positionY.value = 0;
        audioCtx.listener.positionZ.value = 1;
        audioCtx.listener.forwardZ.value = -5;
    } else {
        audioCtx.listener.setPosition(0, 0, 1);
        audioCtx.listener.setOrientation(0, 0, -5, 0 ,1, 0);
    }
    console.log(audioCtx.listener);
    GlobalState.audio_context.resume();
}

export {
    hasAudioContext,
    initAudioContext
};
