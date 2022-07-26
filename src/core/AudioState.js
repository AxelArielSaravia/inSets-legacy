import { globalDelayStatic, pannerListener } from "./GlobalStatics.js";
import { createId, random} from "./Globals.js";
import { GlobalState } from "./GlobalState.js";

/**
 * @typedef {{
 *  channelCountMode: "max" | "clamped-max" | "explicit",
 *  channelInterpretation: "speakers" | "discrete",
 *  maxDelayTime: number,
 *  delayTime: number,
 *  feedback: number
 * }} AudioDelay
 */

/**
 * 
 * @param {GlobalDelay} GlobalDelay 
 * @returns {AudioDelay}
 */
const createAudioDelayConfiguration = (GlobalDelay) => ({
    channelCountMode: "max",
    channelInterpretation: "speakers",
    maxDelayTime: globalDelayStatic.TIME_MAX,
    delayTime: random(GlobalDelay.timeMin * 10, GlobalDelay.timeMax * 10) / 10,
    feedback: random(GlobalDelay.feedbackMin * 100, GlobalDelay.feedbackMax * 100) / 100
});

/**
 * @typedef {{
 *  channelCountMode: "max" | "clamped-max" | "explicit",
 *  channelInterpretation: "speakers" | "discrete",
 *  detune: number,
 *  gain: number,
 *  frequency: number,
 *  q: number,
 *  type: "lowpass" | "highpass" | "bandpass" | "notch" | "allpass"
 * }} AudioFilter
 */

/**
 * @param {GlobalFilter} GlobalFilter 
 * @returns {AudioFilter}
 */
const createAudioFilterConfiguration = (GlobalFilter) => {
    return {
        channelCountMode: "max",
        channelInterpretation: "speakers",
        detune: 0,
        gain: 1,
        frequency: random(GlobalFilter.frequencyMin, GlobalFilter.frequencyMax),
        q: random(GlobalFilter.qMin * 10, GlobalFilter.qMax * 10) / 10,
        type: (GlobalFilter.types.length > 0) 
            ? GlobalFilter.types[random(0, GlobalFilter.types.length - 1)]
            : "allpass"
    }
};

/**
 * @typedef {{
 *  coneInnerAngle: number, //0 to 360 deg
 *  coneOuterAngle: number, //0 to 360 deg
 *  coneOuterGain: number, //0 to 1
 *  distanceModel: "linear" | "inverse" | "exponential",
 *  maxDistance: number,
 *  orientationX: number,
 *  orientationY: number,
 *  orientationZ: number,
 *  panningModel: "equalpower" | "HRTF",
 *  positionX: number,
 *  positionY: number,
 *  positionZ: number,
 *  refDistance: number,
 *  rolloffFactor: number
 * }} AudioPanner
 */

/**
 * @param {GlobalPanner} GlobalPanner
 * @return {AudioPanner} 
 */
const createAudioPannerConfiguration = (GlobalPanner) => ({
    coneInnerAngle: 360,
    coneOuterAngle: 0,
    coneOuterGain: 0,
    distanceModel: "inverse",
    maxDistance: 10000,
    orientationX: 1,
    orientationY: 0,
    orientationZ: 0,
    panningModel: "HRTF",
    positionX: random(GlobalPanner.xMin / 10, GlobalPanner.xMax /10) + pannerListener.X,
    positionY: random(GlobalPanner.yMin / 10, GlobalPanner.yMax /10) + pannerListener.Y,
    positionZ: random(GlobalPanner.zMin / 10, GlobalPanner.zMax /10) + pannerListener.Z,
    refDistance: 1,
    rolloffFactor: 1 
});

/**
 * @param {GlobalPlayBackRate} GlobalPlayBackRate 
 * @returns {number}
 */
const createAudioPlayBackRateConfiguration = (GlobalPlayBackRate) => random(GlobalPlayBackRate.min * 10, GlobalPlayBackRate.max * 10) / 10;

/**
 * @param {boolean} state 
 * @param {{type: "disable" | "enable"}} action
 * @returns {boolean}
 */
const colorRecuder = (state, action, AUDIO_STATE) => {
    switch (action.type) {
        case "change": {
            AUDIO_STATE.color = action.value;
            return action.value;
        }
        case "default": {
            AUDIO_STATE.color = "";
            return "";
        }
        default: return state;
    }
}

/**
 * @param {boolean} state 
 * @param {{type: "disable" | "enable"}} action
 * @param {AudioCoreState} AUDIO_STATE
 * @returns {boolean}
 */
const delayReducer = (state, action, AUDIO_STATE) => {
    switch (action.type) {
        case "disable": {
            AUDIO_STATE.delayIsDisable = true;
            return true;
        }
        case "enable": {
            AUDIO_STATE.delayIsDisable = false;
            return  false;
        }
        default: return state;
    }
} 

/**
 * @param {boolean} state 
 * @param {{type: "disable" | "enable"}} action
 * @param {AudioCoreState} AUDIO_STATE
 * @returns {boolean}
 */
const filterReducer = (state, action, AUDIO_STATE) => {
    switch (action.type) {
        case "disable": {
            AUDIO_STATE.filterIsDisable = true;
            return true;
        }
        case "enable": {
            AUDIO_STATE.filterIsDisable = false;
            return  false;
        }
        default: return state;
    }
}

/**
 * @param {boolean} state 
 * @param {{type: "disable" | "enable"}} action
 * @param {AudioCoreState} AUDIO_STATE
 * @returns {boolean}
 */
const pannerReducer = (state, action, AUDIO_STATE) => {
    switch (action.type) {
        case "disable": {
            AUDIO_STATE.pannerIsDisable = true;
            return true;
        }
        case "enable": {
            AUDIO_STATE.pannerIsDisable = false;
            return  false;
        }
        default: return state;
    }
} 

/**
 * @param {boolean} state 
 * @param {{type: "disable" | "enable"}} action
 * @param {AudioCoreState} AUDIO_STATE
 * @returns {boolean}
 */
const playBackRateReducer = (state, action, AUDIO_STATE) => {
    switch (action.type) {
        case "disable": {
            AUDIO_STATE.playBackRateIsDisable = true;
            return true;
        }
        case "enable": {
            AUDIO_STATE.playBackRateIsDisable = false;
            return  false;
        }
        default: return state;
    }
} 

/**
 * @param {boolean} state 
 * @param {{type: "disableRandom" | "enableRandom" | "random" | "startTimePoint"}} action
 * @param {AudioCoreState} AUDIO_STATE
 * @returns {boolean}
 */
 const randomStartPointReducer = (state, action, AUDIO_STATE) => {
    switch (action.type) {
        case "random": {
            return { ...state, startPoint: action.value };
        }
        case "setToStartTime": {
            AUDIO_STATE.startPoint = state.startTime;
            return { ...state, startPoint: state.startTime };
        }
        case "disable": {
            AUDIO_STATE.randomStartPointIsDisable = true;
            return {...state, randomStartPointIsDisable: true};
        }
        case "enable": {
            AUDIO_STATE.randomStartPointIsDisable = false;
            return {...state, randomStartPointIsDisable: false};
        }
        default: return state;
    }
}

/**
 * @param {AudioViewState} state 
 * @param {{
 *  audioVariable:"delay" | "filter" | "panner" | "playBackRate" | "startPoint" | ...
 *  type: string, 
 *  value: any,
 *  variable: "audio", 
 * }} action 
 * @param {AudioCoreState} AUDIO_STATE
 * @returns {AudioViewState}
 */
const _audioViewReducer = (state, action, AUDIO_STATE) => {
    if ("variable" in action) {
        switch (action.variable) {
            case "delay": return {
                ...state, 
                delayIsDisable: delayReducer(state.delayIsDisable, action, AUDIO_STATE) 
            }
            case "color": return {
                ...state,
                color: colorRecuder(state.color, action, AUDIO_STATE)
            }
            case "filter": return { 
                ...state, 
                filterIsDisable: filterReducer(state.filterIsDisable, action, AUDIO_STATE) 
            };
            case "panner": return { 
                ...state, 
                pannerIsDisable: pannerReducer(state.pannerIsDisable, action, AUDIO_STATE)
            };
            case "playBackRate": return { 
                ...state, 
                playBackRateIsDisable: playBackRateReducer(state.playBackRateIsDisable, action, AUDIO_STATE) 
            };
            case "randomStartPoint": return randomStartPointReducer(state, action, AUDIO_STATE);
            default: return state;
        }
    } else {
        switch (action.type) {
            case "changeEndTime": {
                if (typeof action.value === "number"
                && state.duration > 0.5
                ) {
                    const endTime = action.value < state.startTime + 0.5
                    ? state.startTime + 0.5
                    : state.duration < action.value
                    ? state.duration
                    : action.value;
                    AUDIO_STATE.endTime = endTime;
                    return { ...state, endTime };
                }
                return state;
            }
            case "changeProbability": {
                if (typeof action.value === "number"
                    && action.value > 0 && action.value <= 50
                    ) {
                    AUDIO_STATE.probability = action.value;
                    return { ...state, probability: action.value };
                }
                return state;
            }
            case "changeStartTime": {
                if (typeof action.value === "number"
                    && state.duration > 0.5
                    ) {
                    const startTime = action.value > state.endTime - 0.5
                        ? state.endTime - 0.5
                        : action.value < 0
                        ? 0
                        : action.value;
                        AUDIO_STATE.startTime = startTime;
                    return { ...state, startTime }
                }
                return state;
            }
            case "changeVolume": {
                if (typeof action.value === "number"
                    && state.duration > 0.5
                    ) {
                    const volume = action.value < state._MIN_VOLUME
                        ? state._MIN_VOLUME
                        : action.value > state._MAX_VOLUME
                        ? state._MAX_VOLUME
                        : action.value;
                        AUDIO_STATE.volume = volume;
                    return { ...state, volume };
                }
                return state;
            }
            case "play": {
                AUDIO_STATE.isPlaying = true;
                return { ...state, isPlaying: true };
            }
            case "stop": {
                AUDIO_STATE.isPlaying = false;
                return { ...state, isPlaying: false };
            }
            default: return state;
        }
    }
}

const audioViewReducer = (state = {}, action) => {
    if (action.type === "update") {
        const newAudioView = {};
        GlobalState.AUDIO_LIST.forEach((audioState, key) => {
            newAudioView[key] = createAudioViewState(audioState);
        });
        return newAudioView;
    }
    const _ID = action.id;
    const AUDIO_STATE = GlobalState.AUDIO_LIST.get(_ID);
    if (AUDIO_STATE) {
        return {
            ...state,
            [_ID]: _audioViewReducer(state[_ID], action, AUDIO_STATE)
        }
    }
    return state;
}

/**
 * @typedef {{
 *  _ID: string,
 *  _MAX_VOLUME: number,
 *  _MIN_VOLUME: number,
 *  color: string,
 *  delayIsDisable: boolean,
 *  duration: number,
 *  endTime: number,
 *  filterIsDisable: boolean,
 *  isPlaying: boolean,
 *  pannerIsDisable: boolean,
 *  playBackRateIsDisable: boolean,
 *  probability: number,
 *  randomStartPointIsDisable: boolean,
 *  startPoint: number,
 *  startTime: number,
 *  title: string,
 *  type: string,
 *  volume: number
 * }} AudioView
 */

/**
 * @param {AudioState} AudioState
 * @returns {AudioView}
 */
const createAudioViewState = (AudioState) => {
    return {
        _ID:  AudioState._ID,
        _MAX_VOLUME: AudioState._MAX_VOLUME,
        _MIN_VOLUME: AudioState._MIN_VOLUME,
        color: AudioState.color,
        delayIsDisable: AudioState.delayIsDisable,
        duration: AudioState.duration,
        endTime: AudioState.endTime,
        filterIsDisable: AudioState.filterIsDisable,
        isPlaying: AudioState.isPlaying,
        pannerIsDisable: AudioState.pannerIsDisable,
        playBackRateIsDisable: AudioState.playBackRateIsDisable,
        probability: AudioState.probability,
        randomStartPointIsDisable: AudioState.randomStartPointIsDisable,
        startPoint: AudioState.startPoint,
        startTime: AudioState.startTime,
        title: AudioState.title,
        type: AudioState.type,
        volume: AudioState.volume, 
    }
}

/**
 * @typedef {{
 *  _START_ID: string,
 *  change_START_ID: () => void
 *  audioEngine: AudioBuffer | HTMLAudioElement | null,
 *  outputGain: GainNode | null,
 *  source: MediaElementAudioSourceNode | AudioBufferSourceNode | null,
 * } & AudioView} AudioState
 */

/**
 * @param {string} id 
 * @param {string} title 
 * @param {string} type 
 * @param {number} duration 
 * @param {GlobalState} GlobalState 
 * @returns {AudioState}
 */
const createAudioState = (id, title, type, duration, GlobalState) => {
    const obj = {
        _ID:  id,
        _MAX_VOLUME: 1, /*100%*/
        _MIN_VOLUME: 0.1, /*10%*/
        _START_ID: createId(),
        change_START_ID: function() { this._START_ID = createId(); },
        audioEngine: null,
        color: "",
        delayIsDisable: GlobalState?.delay.areAllDisable.value || false,
        duration: duration || 0,
        endTime: duration || 0, //duration
        filterIsDisable: GlobalState?.filter.areAllDisable.value || false,
        isPlaying: false,
        outputGain: null,
        pannerIsDisable: GlobalState?.panner.areAllDisable.value || false,
        playBackRateIsDisable: GlobalState?.playBackRate.areAllDisable.value || false,
        probability: 1,
        randomStartPointIsDisable: GlobalState?.randomStartPoint.value || false,
        startPoint: 0,
        startTime: 0,
        source: null,
        title: title.slice(0, title.lastIndexOf(".")),
        type: type,
        volume: 1, //_MAX_VOLUME_
    }
    Object.seal(obj);
    return obj;
}

export {
    createAudioDelayConfiguration,
    createAudioFilterConfiguration,
    createAudioPannerConfiguration,
    createAudioPlayBackRateConfiguration,
    createAudioViewState,
    createAudioState,
    audioViewReducer
}