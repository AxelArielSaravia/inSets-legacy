import { GlobalState } from "../state/Global/index.js";
import { audioVolumeLimits } from "../state/Audio/index.js";


const createViewAudioState = (_id) => {
    const audio_state = GlobalState._audio_list.get(_id);
    if (!audio_state) throw new Error("Error: can not create ViewGeneralAudioState, the audio is not in the regiter.");
    return {
        _id: audio_state._id,
        audioEvents: audio_state.audioEvents,
        color: "",
        configurationIsOpen: false,
        delayIsDisable: audio_state.delayIsDisable,
        duration: audio_state.duration,
        endPoint: audio_state.endPoint,
        endTime: audio_state.endTime,
        filterIsDisable: audio_state.filterIsDisable,
        isPlaying: audio_state.isPlaying,
        playbackRateIsDisable: audio_state.playbackRateIsDisable,
        pannerIsDisable: audio_state.pannerIsDisable,
        randomEndPointIsDisable: audio_state.randomEndPointIsDisable,
        randomStartPointIsDisable: audio_state.randomStartPointIsDisable,
        startPoint: audio_state.startPoint,
        startTime: audio_state.startTime,
        title: audio_state.title,
        volume: audio_state.volume,
        currentTime: audio_state.startPoint
    }
}

/* -------------------------------------------------------------------------- */
/*                                  REDUCERS                                  */
/* -------------------------------------------------------------------------- */

const ViewAudioDisableReducer = (state, type) => {
    const audio_state = GlobalState._audio_list.get(state._id);
    switch (type) {
        case "delay/disable": {
            audio_state.delayIsDisable = true;
            return { ...state, delayIsDisable: true }
        }
        case "delay/enable": {
            audio_state.delayIsDisable = false;
            return { ...state, delayIsDisable: false }
        }
        case "filter/disable": {
            audio_state.filterIsDisable = true
            return { ...state, filterIsDisable: true }
        }
        case "filter/enable": {
            audio_state.filterIsDisable = false
            return { ...state, filterIsDisable: false }
        }
        case "panner/disable": {
            audio_state.pannerIsDisable = true;
            return { ...state, pannerIsDisable: true }
        }
        case "panner/enable": {
            audio_state.pannerIsDisable = false;
            return { ...state, pannerIsDisable: false }
        }
        case "playbackRate/disable": {
            audio_state.playbackRateIsDisable = true;
            return { ...state, playbackRateIsDisable: true }
        }
        case "playbackRate/enable": {
            audio_state.playbackRateIsDisable = false;
            return { ...state, playbackRateIsDisable: false }
        }
        case "randomEndPoint/disable": {
            audio_state.randomEndPointIsDisable = true;
            return { ...state, randomEndPointIsDisable: true }
        }
        case "randomEndPoint/enable": {
            audio_state.randomEndPointIsDisable = false
            return { ...state, randomEndPointIsDisable: false }
        }
        case "randomStartPoint/disable": {
            audio_state.randomStartPointIsDisable = true;
            return { ...state, randomStartPointIsDisable: true }
        }
        case "randomStartPoint/enable": {
            audio_state.randomStartPointIsDisable = false;
            return { ...state, randomStartPointIsDisable: false }
        }
        default: return state;
    }
}



/**
 * @param {ViewAudioState} state 
 * @param {{}} action 
 * @returns {ViewAudioState}
 */

const ViewAudioReducer = (state, action) => {
    switch (action.type) {
        case "audioEvents/add": {
            if (state.audioEvents < 50) {
                const audio_state = GlobalState._audio_list.get(state._id);
                audio_state.audioEvents += 1;
                return { ...state, audioEvents: state.audioEvents + 1 }
            }
            return state;
        }
        case "audioEvents/subtract": {
            if (state.audioEvents > 1) {
                const audio_state = GlobalState._audio_list.get(state._id);
                audio_state.audioEvents -= 1;
                return { ...state, audioEvents: state.audioEvents - 1 }
            }
            return state;
        }
        case "color/change": return {...state, color: action.payload}
        case "color/default": return {...state, color: ""}
        case "configuration/toggle": return {...state, configurationIsOpen: !state.configurationIsOpen}
        case "effect": return ViewAudioDisableReducer(state, action.payload);
        case "endTime/change": {
            const value = action.payload;
            if (typeof value === "number" && state.duration > 0.5) {
                const audio_state = GlobalState._audio_list.get(state._id);
                const endTime = value < state.startTime + 0.5
                    ? state.startTime + 0.5
                    : state.duration < value
                    ? state.duration
                    : value;
                audio_state.endTime = endTime;
                return { ...state, endTime };
            }
            return state;
        }
        case "play": return { ...state, isPlaying: true };
        case "points/change": return { 
            ...state, 
            endPoint: action.payload[1],
            startPoint: action.payload[0] 
        };
        case "startTime/change": {
            const value = action.payload;
            if (typeof value === "number" && state.duration > 0.5) {
                const audio_state = GlobalState._audio_list.get(state._id);
                const startTime = value > state.endTime - 0.5
                    ? state.endTime - 0.5
                    : value < 0
                    ? 0
                    : value;
                audio_state.startTime = startTime;
                return { ...state, startTime }
            }
            return state;
        }
        case "stop": return { 
            ...state,  
            isPlaying: false, 
            currentTime: 0, 
            endPoint:state.endTime,
            startPoint:state.startTime,
        };
        case "volume/change": {
            const audio_state = GlobalState._audio_list.get(state._id);
            const value = action.payload;
            if (typeof value === "number") {
                const volume = value < audioVolumeLimits.min
                    ? audioVolumeLimits.min
                    : value > audioVolumeLimits.max
                    ? audioVolumeLimits.max
                    : value;
                audio_state.volume = volume;
                return { ...state, volume };
            }
            return state;
        }
        case "currentTime/update": {
            if (state.isPlaying) {
                return {...state, currentTime: action.payload}
            }
            return state;
        }
        default: return state;
    }
}


export { 
    ViewAudioReducer,
    createViewAudioState,
}