import { GlobalState, pannerListener } from "../../state/Global/index.js";

export function initAudioContext() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    GlobalState._audio_context  = new AudioContextClass();
    let audioCtx = GlobalState._audio_context;
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

    audioCtx = PANNER = null;
    
    GlobalState._audio_context.resume();
}
