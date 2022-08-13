import { pannerListener } from "../../state/Global/index.js";

function initAudioContext(GlobalState) {
    if (GlobalState.hasAudioContext) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        GlobalState.AUDIO_CONTEXT  = new AudioContextClass();
        let audioCtx = GlobalState.AUDIO_CONTEXT;
        //listener position 
        if (audioCtx.listener.positionX) {
            audioCtx.listener.positionX.value = pannerListener.X;
            audioCtx.listener.positionY.value = pannerListener.Y;
            audioCtx.listener.positionZ.value = pannerListener.Z; 
        } else {
            audioCtx.listener.setPosition(pannerListener.X, pannerListener.Y, pannerListener.Z);
        }

        // Create a PannerNode because we set the panning model to HRTF
        let PANNER = audioCtx.createPanner();
        PANNER.distanceModel = "inverse";
        PANNER.maxDistance = 10000;
        PANNER.panningModel = "HRTF";
        PANNER.positionX.value = pannerListener.X;
        PANNER.positionY.value = pannerListener.Y;
        PANNER.positionZ.value = pannerListener.Z;

        GlobalState.AUDIO_CONTEXT.resume();
        audioCtx = PANNER = null;
    }
}

export default initAudioContext;