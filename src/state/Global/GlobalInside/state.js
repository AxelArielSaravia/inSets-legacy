import { createProbabilityOfSetSize } from "../utils.js";

const GlobalState = {
    get hasAudios() { return this.AUDIO_LIST.size !== 0 },
    get hasAudioContext() {
        const audioContextClass = window.AudioContext || window.webkitAudioContext || null
        return audioContextClass != null
    },
    AUDIO_CONTEXT: null,
    AUDIO_LIST: new Map(),
    STARTED_ID : "",
    ENGINE_TYPE: "audioBuffer", //default
    IS_STARTED: false, //default
    delay: null,
    fadeIn: null,
    fadeOut: null,
    filter: null,
    panner: null,
    playBackRate: null,
    probabilityOfSetSize: (createProbabilityOfSetSize()).arrOfValues,
    randomStartPoint: null,
    timeInterval: null,
}

Object.seal(GlobalState);

export default GlobalState;