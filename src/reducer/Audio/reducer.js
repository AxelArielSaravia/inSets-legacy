import { GlobalState } from "../../state/Global/index.js";
import { createAudioViewState } from "../../state/Audio/index.js";

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

export default audioViewReducer;