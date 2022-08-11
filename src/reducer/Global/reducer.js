import initState from "../../state/initState.json";

import {
    globalDelayStatic,
    globalFadeTimeStatic,
    globalFilterStatic,
    globalPannerStatic,
    globalPlayBackRateStatic,
    globalTimeIntervalStatic,
    GlobalState
} from "../../state/Global/index.js";
import { isInsideInterval } from "../../state/utils.js";

function changeLocalStorage(property, key, value) {
    if (key != null) {
        const localStorageProperty = JSON.parse(localStorage.getItem(property));
        localStorageProperty[key] = value;
        localStorage.setItem(property, JSON.stringify(localStorageProperty)); 
    }  else {
        localStorage.setItem(property, JSON.stringify(value)); 
    }
}

/**
 * 
 * @param {GlobalDelay} state 
 * @param {{
 *  type: "areAllDisable" | "timeMin" | "timeMax" | "feedbackMin" | "feedbackMax", 
 *  value: boolean | number
 * }} action 
 * @returns {GlobalDelay}
 */
const globalDelayReducer = (state, action) => {
    switch (action.type) {
        case "areAllDisable/global": {
            if (typeof action.value === "boolean") {
                GlobalState.delay.areAllDisable.value = action.value;
                changeLocalStorage("delay", "areAllDisable", action.value);
                return { ...state, areAllDisable: { value: action.value, global: true } };
            }
            return state;
        }
        case "areAllDisable/local": {
            GlobalState.delay.areAllDisable.value = false;
            changeLocalStorage("delay", "areAllDisable", false);
            return { ...state, areAllDisable: { value: false, global: false } };
        }
        case "reset": {
            const newDelay =  {
                ...state,
                timeMax: initState.delay.timeMax,
                timeMin: initState.delay.timeMin,
                feedbackMin: initState.delay.feedbackMin,
                feedbackMax: initState.delay.feedbackMax,
            }
            {
                const localNewDelay = {...newDelay};
                localNewDelay.areAllDisable = newDelay.areAllDisable.value;
                changeLocalStorage("delay", null, localNewDelay);
            }
            return newDelay
        }
        case "timeMin": {
            if (typeof action.value === "number" 
                && isInsideInterval(globalDelayStatic.TIME_MIN, state.timeMax, action.value)
             ) { 
                 GlobalState.delay.timeMin = action.value;
                 changeLocalStorage("delay", "timeMin", action.value);
                return { ...state, timeMin: action.value };
            }
            return state;
        }
        case "timeMax": {
            if (typeof action.value === "number" 
                && isInsideInterval(state.timeMin, globalDelayStatic.TIME_MAX, action.value)
             ) {
                GlobalState.delay.timeMax = action.value;
                changeLocalStorage("delay", "timeMax", action.value);
                return { ...state, timeMax: action.value }; 
            }
            return state;
        }
        case "feedbackMin": {
            if (typeof action.value === "number" 
                && isInsideInterval(globalDelayStatic.FBACK_MIN, state.feedbackMax, action.value)
                ) {
                    GlobalState.delay.feedbackMin = action.value;
                    changeLocalStorage("delay", "feedbackMin", action.value);
                    return { ...state, feedbackMin: action.value };
                }
            return state;
        }
        case "feedbackMax": {
            if (typeof action.value === "number" 
                && isInsideInterval(state.feedbackMin, globalDelayStatic.FBACK_MAX, action.value)
             ) {
                GlobalState.delay.feedbackMax = action.value;
                changeLocalStorage("delay", "feedbackMax", action.value);
                return { ...state, feedbackMax: action.value }; 
            }
            return state;
        }
        default: return state;
    }
}

/**
 * @param {GlobalFilter} state 
 * @param {{
 *  type: "areAllDisable" | "frequencyMin" | "frequencyMax" | "qMin" | "qMax" | "types", 
 *  value: boolean | number | [lowpass?, highpass?, bandpass?,  notch?]
 * }} action 
 * @returns {GlobalFilter}
 */
const globalFilterReducer = (state, action) => {
    switch (action.type) {
        case "areAllDisable/global": {
            if (typeof action.value === "boolean") {
                GlobalState.filter.areAllDisable.value = action.value;
                changeLocalStorage("filter", "areAllDisable", action.value);
                return { ...state, areAllDisable: {value: action.value, global: true} };
            }
            return state;
        }
        case "areAllDisable/local": {
            GlobalState.filter.areAllDisable.value = false;
            changeLocalStorage("filter", "areAllDisable", false);
            return { ...state, areAllDisable: {value: false, global: false} };
        }
        case "frequencyMin": {
            if (typeof action.value === "number" 
                && isInsideInterval(globalFilterStatic.FREQ_MIN, state.frequencyMax, action.value)
             ) {
                GlobalState.filter.frequencyMin = action.value;
                changeLocalStorage("filter", "frequencyMin", action.value);
                return { ...state, frequencyMin: action.value };
            }
            return state;
        }
        case "frequencyMax": {
            if (typeof action.value === "number" 
                && isInsideInterval(state.frequencyMin, globalFilterStatic.FREQ_MAX, action.value)
             ) {
                GlobalState.filter.frequencyMax = action.value;
                changeLocalStorage("filter", "frequencyMax", action.value);
                return { ...state, frequencyMax: action.value };
            } 
            return state;
        }
        case "qMin": {
            if (typeof action.value === "number" 
                && isInsideInterval(globalFilterStatic.Q_MIN, state.qMax, action.value)
             ) {
                GlobalState.filter.qMin = action.value;
                changeLocalStorage("filter", "qMin", action.value);
                return { ...state, qMin: action.value };
            }
            return state;
        }
        case "qMax": {
            if (typeof action.value === "number" 
                && isInsideInterval(state.qMin, globalFilterStatic.Q_MAX, action.value)
             ) {
                GlobalState.filter.qMax = action.value;
                changeLocalStorage("filter", "qMax", action.value);
                return { ...state, qMax: action.value }; 
            }
            return state;
        }
        case "reset": {
            const newFilter =  {
                ...state,
                frequencyMin: initState.filter.frequencyMin,
                frequencyMax: initState.filter.frequencyMax,
                qMin: initState.filter.qMin,
                qMax: initState.filter.qMax,
                types: initState.filter.types
            }
            {
                const localNewFilter = {...newFilter};
                localNewFilter.areAllDisable = newFilter.areAllDisable.value;
                changeLocalStorage("filter", null, localNewFilter);
            }
            return newFilter
        }
        case "types": {
            if (Array.isArray(action.value)) {
                const arr = action.value.filter(el => /lowpass|highpass|bandpass|peaking|notch/.test(el));
                if (arr.length !== 0) {
                    GlobalState.filter.types = arr;
                    changeLocalStorage("filter", "types", arr);
                    return { ...state, types: arr };
                }
            } 
            return state;
        }
        default: return state;
    }
}

/**
 * @param {GlobalPanner} state 
 * @param {{
 *  type: "areAllDisable" | "xMin" | "xMax" | "yMin" | "yMax" | "zMin" | "zMax", 
 *  value: boolean | number
 * }} action 
 * @returns {GlobalPanner}
 */
const globalPannerReducer = (state, action) => {
    switch (action.type) {
        case "areAllDisable/global": {
            if (typeof action.value === "boolean") {
                GlobalState.panner.areAllDisable.value = action.value;
                changeLocalStorage("panner", "areAllDisable", action.value);
                return { ...state, areAllDisable: {value: action.value, global: true} };
            }
            return state;
        }
        case "areAllDisable/local": {
            GlobalState.panner.areAllDisable.value = false;
            changeLocalStorage("panner", "areAllDisable", false);
            return { ...state, areAllDisable: {value: false, global: false} };
        }
        case "reset": {
            const newPanner =  {
                ...state,
                xMin: initState.panner.xMin,
                xMax: initState.panner.xMax,
                yMin: initState.panner.yMin,
                yMax: initState.panner.yMax,
                zMin: initState.panner.zMin,
                zMax: initState.panner.zMax,
            }
            {
                const localNewPanner = {...newPanner};
                localNewPanner.areAllDisable = newPanner.areAllDisable.value;
                changeLocalStorage("panner", null, localNewPanner);
            }
            return newPanner
        }
        case "xMin": {
            if (typeof action.value === "number" 
                && isInsideInterval(globalPannerStatic.MIN, state.xMax, action.value)
             ) {
                GlobalState.panner.xMin = action.value;
                changeLocalStorage("panner", "xMin", action.value);
                return { ...state, xMin: action.value };
            }
            return state;
        }
        case "xMax": {
            if (typeof action.value === "number" 
                && isInsideInterval(state.xMin, globalPannerStatic.MAX, action.value)
             ) {
                GlobalState.panner.xMax = action.value;
                changeLocalStorage("panner", "xMax", action.value);
                return { ...state, xMax: action.value };
            }
            return state;
        }
        case "yMin": {
            if (typeof action.value === "number" 
                && isInsideInterval(globalPannerStatic.MIN, state.yMax, action.value)
             ) {
                GlobalState.panner.yMin = action.value;
                changeLocalStorage("panner", "yMin", action.value);
                return { ...state, yMin: action.value };
            }
            return state;
        }
        case "yMax": {
            if (typeof action.value === "number" 
                && isInsideInterval(state.yMin, globalPannerStatic.MAX, action.value)
             ) {
                GlobalState.panner.yMax = action.value;
                changeLocalStorage("panner", "yMax", action.value);
                return { ...state, yMax: action.value };
            }
            return state;
        }
        case "zMin": {
            if (typeof action.value === "number" 
                && isInsideInterval(globalPannerStatic.MIN, state.zMax, action.value)
             ) {
                GlobalState.panner.zMin = action.value;
                changeLocalStorage("panner", "zMin", action.value);
                return { ...state, zMin: action.value };
            }
            return state;
        }
        case "zMax": {
            if (typeof action.value === "number" 
                && isInsideInterval(state.zMin, globalPannerStatic.MAX, action.value)
             ) {
                GlobalState.panner.zMax = action.value;
                changeLocalStorage("panner", "zMax", action.value);
                return { ...state, zMax: action.value };
            }
            return state;
        }
        default: return state;
    }
}

/**
 * @param {GlobalPlayBackRate} state 
 * @param {{type: "areAllDisable" | "disableAll" | "min" | "max", value: boolean | number}} action 
 * @returns {GlobalPlayBackRate}
 */
const globalPlayBackRateReducer = (state, action) => {
    switch (action.type) {
        case "areAllDisable/global": {
            if (typeof action.value === "boolean") {
                GlobalState.playBackRate.areAllDisable.value = action.value;
                changeLocalStorage("playBackRate", "areAllDisable", action.value);
                return { ...state, areAllDisable: {value: action.value, global: true } }
            }
            return state;
        }
        case "areAllDisable/local": {
            GlobalState.playBackRate.areAllDisable.value = false
            changeLocalStorage("playBackRate", "areAllDisable", false);
            return { ...state, areAllDisable: {value: false, global: false } };
        }
        case "min": {
            if (typeof action.value === "number" 
                && isInsideInterval(globalPlayBackRateStatic.MIN, state.max, action.value)
             ) {
                GlobalState.playBackRate.min = action.value;
                changeLocalStorage("playBackRate", "min", action.value);
                return { ...state, min: action.value };
            }
            return state;
        }
        case "max": {
            if (typeof action.value === "number" 
                && isInsideInterval(state.min, globalPlayBackRateStatic.MAX, action.value)
             ) {
                GlobalState.playBackRate.max = action.value;
                changeLocalStorage("playBackRate", "max", action.value);
                return { ...state, max: action.value };
            } 
            return state;
        }        
        case "reset": {
            const newPlayBackRate =  {
                ...state,
                min: initState.playBackRate.min,
                max: initState.playBackRate.max,
            }
            {
                const localnewPBR = {...newPlayBackRate};
                localnewPBR.areAllDisable = newPlayBackRate.areAllDisable.value;
                changeLocalStorage("playBackRate", null, localnewPBR);
            }
            return newPlayBackRate
        }
        default: return state;
    }
}

/**
 * @param {GlobalTimeInterval} state 
 * @param {{type: "min" | "max", value: number}} action 
 * @returns {GlobalTimeInterval}
 */
const globalTimeIntervalReducer = (state, action) => {
    switch (action.type) {
        case "min": {
            if (typeof action.value === "number" 
                && isInsideInterval(globalTimeIntervalStatic.MIN, state.max, action.value)
             ) {
                GlobalState.timeInterval.min = action.value;
                changeLocalStorage("timeInterval", "min", action.value);
                return { ...state, min: action.value };
            }
            return state;
        }
        case "max": {
            if (typeof action.value === "number" 
                && isInsideInterval(state.min, globalTimeIntervalStatic.MAX, action.value)
             ) {
                GlobalState.timeInterval.max = action.value;
                changeLocalStorage("timeInterval", "max", action.value);
                return { ...state, max: action.value }; 
            }
            return state;
        }
        case "reset": {
            const newTimeInterval =  {
                min: initState.timeInterval.min,
                max: initState.timeInterval.max,
            }
            changeLocalStorage("timeInterval", null, newTimeInterval);
            return newTimeInterval
        }
        default: return state;
    }
}

/**
 * @param {boolean} state 
 * @param {{type: "areAllDisable/global" | "areAllDisable/local", value: boolean}} action 
 * @returns {boolean}
 */
const globalRandomStartPointReducer = (state, action) => {
    switch (action.type) {
        case "areAllDisable/global": {
            if (typeof action.value === "boolean") {
                GlobalState.randomStartPoint.value = action.value;
                changeLocalStorage("randomStartPoint", null, action.value);
                return { value: action.value, global: true };
            }
            return state;
        }
        case "areAllDisable/local": {
            GlobalState.randomStartPoint.value = false;
            changeLocalStorage("randomStartPoint", null, false);
            return { value: false, global: false };
        }
        default: return state
    }
}

/**
 * @param {number} state 
 * @param {{type: "change", value: number}} action 
 * @returns {number}
 */
const globalFadeTimeReducer = (state, action) => {
    if (action.type === "change"
        && Number.isInteger(action.value)
        && isInsideInterval(globalFadeTimeStatic.MIN, globalFadeTimeStatic.MAX, action.value)
     ) {
        GlobalState[action.variable] = action.value;
        changeLocalStorage(action.variable, null, action.value);
        return action.value;
    } else if (action.type === "reset") {
        const newFadeTime = initState[action.variable];
        changeLocalStorage(action.variable, null, newFadeTime);
        return newFadeTime;
    }
    return state;
}

/**
 * @param {ProbabilityOfSetSizeExecution} state 
 * @param {{
 *  type: "push" | "pop" | "set" | "clear" | "reset", 
 *  value?: number, 
 *  i?: number
 * }} action 
 * @returns {ProbabilityOfSetSizeExecution}
 */
const probabilityOfSetSizeReducer = (state, action) => {
    switch (action.type) {
        case "push": {
            const newArrOfValues = [...state.arrOfValues, 1];
            GlobalState.probabilityOfSetSize = newArrOfValues;
            return { ...state, arrOfValues: newArrOfValues}
        }
        case "pop": {
            const arrOfValues = [...state.arrOfValues];
            if (arrOfValues.length > 1) {
                let zeros = state._zeros;
                arrOfValues.pop();
                if (zeros === arrOfValues.length) {
                    arrOfValues[arrOfValues.length-1] = 1;
                    zeros--;
                }
                GlobalState.probabilityOfSetSize = arrOfValues;
                return { _zeros: zeros, arrOfValues: arrOfValues };
            }
            return state;
        }
        case "set": {
            const value = action.value;
            const i = action.i;
            let zeros = state._zeros;
            if (typeof i === "number"
                && i < state.arrOfValues.length 
                && typeof value === "number"
                && value > -1 && value <= 50
                && (state.arrOfValues[i] !== 1 || value !== 0 || zeros !== state.arrOfValues.length-1)
             ) {
                const arrOfValues = [...state.arrOfValues];
                if (arrOfValues[i] === 0 && value !== 0) zeros--;
                else if (arrOfValues[i] !== 0 && value === 0) zeros++;
                arrOfValues[i] = value;
                GlobalState.probabilityOfSetSize = arrOfValues;
                return { _zeros: zeros, arrOfValues }
            }
            return state;
        }
        case "reset": {
            const newArrOfValues = (new Array(state.arrOfValues.length)).fill(1);

            GlobalState.probabilityOfSetSize = newArrOfValues;

            return { _zeros: 0, arrOfValues: newArrOfValues };
        } 
        case "clear": {
            GlobalState.probabilityOfSetSize = [1];

            return {_zeros: 0, arrOfValues: [1] };
        } 
        default: return state;
    }
}

/**
 * @param {number} state 
 * @param {{type: "add" | "subtract"}} action 
 * @returns {number}
 */
const filesLoadingReducer = (state, action) => {
    if (action.type === "add") {
        return state + 1 
    } else if (action.type === "subtract") {
        if (state > 0) 
            return state - 1;
    }
    return state;
}

/**
 * @param {GlobalView} state 
 * @param {{
 *  audioVariable?: 
 *  type: string | "ADD_Audio" | "CLEAR_Audio" | "DELETE_Audio" | "ENGINE_TYPE", 
 *  variable?:  "delay" | "fadeTime" | "filesLoading" | "filter" | "panner" | "playBackRate" | "probabilityOfSetSizeExecution" | "randomCurrentTime" | "timeInterval", 
 *  value?: any,
 *  id?: string,
 * }} action 
 * @returns {GlobalView}
 */
const globalViewReducer = (state = {}, action) => {
    if ("variable" in action) {
        switch (action.variable) {
            case "delay": return { 
                ...state, 
                delay: globalDelayReducer(state.delay, action)
            };
            case "filesLoading": return {
                ...state,
                filesLoading: filesLoadingReducer(state.filesLoading, action)
            };
            case "filter": return {
                ...state,
                filter: globalFilterReducer(state.filter, action)
            };
            case "panner": return {
                ...state,
                panner: globalPannerReducer(state.panner, action)
            };
            case "playBackRate": return {
                ...state,
                playBackRate: globalPlayBackRateReducer(state.playBackRate, action)
            };
            case "probabilityOfSetSize": return {
                ...state,
                probabilityOfSetSize: probabilityOfSetSizeReducer(state.probabilityOfSetSize, action)
            };
            case "randomStartPoint": return {
                ...state,
                randomStartPoint: globalRandomStartPointReducer(state.randomStartPoint, action)
            }
            case "timeInterval": return {
                ...state,
                timeInterval: globalTimeIntervalReducer(state.timeInterval, action)
            };
            case "fadeIn": return {
                ...state,
                fadeIn: globalFadeTimeReducer(state.fadeIn, action)
            };
            case "fadeOut": return {
                ...state,
                fadeOut: globalFadeTimeReducer(state.fadeOut, action)
            };
            default: return state;
        }
    } else {
        switch (action.type) {
            case "ADD_Audio": {
                GlobalState.AUDIO_LIST.set(action.id, action.value);
                return { 
                    ...state,
                    AUDIO_LIST: {...state.AUDIO_LIST, [action.id]: action.id},
                    audioListSize: state.audioListSize + 1,
                    probabilityOfSetSize: probabilityOfSetSizeReducer(state.probabilityOfSetSize, { type:"push"})
                };
            }
            case "CLEAR_Audio": {
                GlobalState.AUDIO_LIST = new Map();
                return {
                    ...state, 
                    AUDIO_LIST: {},
                    audioListSize: 0,
                    probabilityOfSetSize: probabilityOfSetSizeReducer(state.probabilityOfSetSize, { type:"clear"})
                };
            }
            case "DELETE_Audio": {
                if (action.id in state.AUDIO_LIST) {
                    const audio_list = { ...state.AUDIO_LIST };
                    delete audio_list[action.id];
                    GlobalState.AUDIO_LIST.delete(action.id);
                    return {
                        ...state,
                        AUDIO_LIST: audio_list,
                        audioListSize: state.audioListSize - 1,
                        probabilityOfSetSize: probabilityOfSetSizeReducer(state.probabilityOfSetSize, { type:"pop"})
                    };
                }
                return state;
            }
            case "ENGINE_TYPE": {
                if (action.value === "audioNode") {
                    GlobalState.ENGINE_TYPE = "audioNode";
                    return { ...state, ENGINE_TYPE: "audioNode" };
                } else if (action.value === "audioBuffer") {
                    GlobalState.ENGINE_TYPE = "audioBuffer";
                    return { ...state, ENGINE_TYPE: "audioBuffer" };
                }
                return state;
            }
            case "start": {
                GlobalState.IS_STARTED = true;
                return { ...state, IS_STARTED: true};
            }
            case "stop": { 
                GlobalState.IS_STARTED = false;
                return { ...state, IS_STARTED: false };
            }
            default: return state;
        }
    }
}

export default globalViewReducer;