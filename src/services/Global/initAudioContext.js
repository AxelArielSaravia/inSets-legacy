import { pannerListener } from "../../state/Global/index.js";

function initAudioContext(GlobalState) {
    if (GlobalState.hasAudioContext) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContextClass();
        audioCtx.resume();

        //listener position 
        if (audioCtx.listener.positionX) {
            audioCtx.listener.positionX.value = pannerListener.X;
            audioCtx.listener.positionY.value = pannerListener.Y;
            audioCtx.listener.positionZ.value = pannerListener.Z;
        } else {
            audioCtx.listener.setPosition(pannerListener.X, pannerListener.Y, pannerListener.Z);
        }
        GlobalState.AUDIO_CONTEXT = audioCtx;
    }
}

export default initAudioContext;