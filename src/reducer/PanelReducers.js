import { 
    globalDelayLimits,
    globalFadeLimits,
    globalFilterLimits,
    globalPannerLimits,
    globalPlaybackRateLimits,
    globalTimeIntervalLimits,
    defaultGlobalState,
    GlobalState
} from "../state/Global/index.js";


import { changeLocalStorageState } from "../services/localStorage/service.js";
import { isInsideInterval } from "../services/interval/service.js";


/* -------------------------------------------------------------------------- */
/*                                  REDUCERS                                  */
/* -------------------------------------------------------------------------- */

/** @returns {GlobalPanner} */
const initPannerState = () => GlobalState.panner;

/**
 * @param {GlobalPanner} state 
 * @param {{
 *  type: "reset" | "x/changeMax" | "x/changeMin" | "y/changeMax" | "y/changeMin" | "z/changeMax" | "z/changeMin";
 *  payload?: number
 * }} action 
 * @returns {GlobalPanner}
 */
const PannerReducer = (state, action) => {
    switch (action.type) {
        case "reset": {
            const defaultObj = {
                ...defaultGlobalState.panner,
                areAllDisable: state.areAllDisable
            }
            GlobalState.panner = defaultObj;
            changeLocalStorageState("panner", defaultObj);
            return defaultObj;
        }
        case "x/changeMax": {
            if (typeof action.payload === "number" 
                && isInsideInterval(state.xMin, globalPannerLimits.MAX, action.payload)
             ) {
                GlobalState.panner.xMax = action.payload;
                changeLocalStorageState("panner", action.payload, "xMax");
                return { ...state, xMax: action.payload };
            }
            return state;
        }
        case "x/changeMin": {
            if (typeof action.payload === "number" 
                && isInsideInterval(globalPannerLimits.MIN, state.xMax, action.payload)
             ) {
                GlobalState.panner.xMin = action.payload;
                changeLocalStorageState("panner", action.payload, "xMin");
                return { ...state, xMin: action.payload };
            }
            return state;
        }
        case "y/changeMax": {
            if (typeof action.payload === "number" 
                && isInsideInterval(state.yMin, globalPannerLimits.MAX, action.payload)
             ) {
                GlobalState.panner.yMax = action.payload;
                changeLocalStorageState("panner", action.payload, "yMax");
                return { ...state, yMax: action.payload };
            }
            return state;
        }
        case "y/changeMin": {
            if (typeof action.payload === "number" 
                && isInsideInterval(globalPannerLimits.MIN, state.yMax, action.payload)
             ) {
                GlobalState.panner.yMin = action.payload;
                changeLocalStorageState("panner", action.payload, "yMin");
                return { ...state, yMin: action.payload };
            }
            return state;
        }
        case "z/changeMax": {
            if (typeof action.payload === "number" 
                && isInsideInterval(state.zMin, globalPannerLimits.MAX, action.payload)
             ) {
                GlobalState.panner.zMax = action.payload;
                changeLocalStorageState("panner", action.payload, "zMax");
                return { ...state, zMax: action.payload };
            }
            return state;
        }
        case "z/changeMin": {
            if (typeof action.payload === "number" 
                && isInsideInterval(globalPannerLimits.Z_MIN, state.zMax, action.payload)
             ) {
                GlobalState.panner.zMin = action.payload;
                changeLocalStorageState("panner", action.payload, "zMin");
                return { ...state, zMin: action.payload };
            }
            return state;
        }
        default: return state; 
    }
}

/** @returns {GlobalFilter} */
const initFilterState = () => GlobalState.filter;
/**
 * @param {GlobalFilter} state 
 * @param {{
 *  type: "reset" | "frequency/changeMax" | "frequency/changeMin" | "q/changeMax" | "q/changeMin" | "types/change",
 *  payload?: number | Array<string> 
 * }} action 
 * @returns {GlobalFilter}
 */
const FilterReducer = (state, action) => {
    switch (action.type) {
        case "reset": {
            const defaultObj = {
                ...defaultGlobalState.filter,
                areAllDisable: state.areAllDisable
            }
            GlobalState.filter = defaultObj;
            changeLocalStorageState("filter", defaultObj);
            return defaultObj;
        }
        case "frequency/changeMax": {
            if (typeof action.payload === "number" 
                && isInsideInterval(state.frequencyMin, globalFilterLimits.FREQ_MAX, action.payload)
             ) {
                GlobalState.filter.frequencyMax = action.payload;
                changeLocalStorageState("filter", action.payload, "frequencyMax");
                return { ...state, frequencyMax: action.payload };
            } 
            return state;
        }
        case "frequency/changeMin": {
            if (typeof action.payload === "number" 
                & isInsideInterval(globalFilterLimits.FREQ_MIN, state.frequencyMax, action.payload)
             ) {
                GlobalState.filter.frequencyMin = action.payload;
                changeLocalStorageState("filter", action.payload, "frequencyMin");
                return { ...state, frequencyMin: action.payload };
            }
            return state;
        }
        case "q/changeMax": {
            if (typeof action.payload === "number" 
                && isInsideInterval(state.qMin, globalFilterLimits.Q_MAX, action.payload)
             ) {
                GlobalState.filter.qMax = action.payload;
                changeLocalStorageState("filter", action.payload, "qMax");
                return { ...state, qMax: action.payload }; 
            }
            return state;
        }
        case "q/changeMin": {
            if (typeof action.payload === "number" 
                && isInsideInterval(globalFilterLimits.Q_MIN, state.qMax, action.payload)
             ) {
                GlobalState.filter.qMin = action.payload;
                changeLocalStorageState("filter", action.payload, "qMin");
                return { ...state, qMin: action.payload };
            }
            return state;
        }
        case "types/change": {
            if (Array.isArray(action.payload)) {
                const arr = action.payload.filter(el => /lowpass|highpass|bandpass|peaking|notch/.test(el));
                if (arr.length !== 0) {
                    GlobalState.filter.types = arr;
                    changeLocalStorageState("filter", arr, "types");
                    return { ...state, types: arr };
                }
            } 
            return state;
        }
        default: return state;
    } 
}

/** @returns {GlobalPlaybackRate} */
const initPlaybackRateState = () => GlobalState.playbackRate;

/**
 * @param {GlobalPlaybackRate} state 
 * @param {{
 *  type: "reset" | "max/change" | "min/change"
 *  payload?: number
 * }} action 
 * @returns {GlobalPlaybackRate}
 */
const PlaybackRateReducer = (state, action) => {
    switch (action.type) {
        case "reset": {
            const defaultObj = {
                ...defaultGlobalState.playbackRate,
                areAllDisable: state.areAllDisable
            }
            GlobalState.playbackRate = defaultObj;
            changeLocalStorageState("playbackRate", defaultObj);
            return defaultObj;
        }
        case "max/change": {
            if (typeof action.payload === "number" 
                && isInsideInterval(state.min, globalPlaybackRateLimits.MAX, action.payload)
             ) {
                GlobalState.playbackRate.max = action.payload;
                changeLocalStorageState("playbackRate",  action.payload, "max");
                return { ...state, max: action.payload };
            } 
            return state;
        }
        case "min/change": {
            if (typeof action.payload === "number" 
                && isInsideInterval(globalPlaybackRateLimits.MIN, state.max, action.payload)
             ) {
                GlobalState.playbackRate.min = action.payload;
                changeLocalStorageState("playbackRate",  action.payload, "min");
                return { ...state, min: action.payload };
            }
            return state;
        }
        default: return state;
    }
}

/** @return {GlobalDelay} */
const initDelayState = () => GlobalState.delay;

/**
 * @param {GlobalPlaybackRate} state 
 * @param {{
 *  type: "reset" | "time/changeMax" | "time/changeMin" | "feedback/changeMax" | "feedback/changeMin"
 *  payload?: number
 * }} action 
 * @return {GlobalPlaybackRate}
 */
const DelayReducer = (state, action) => {
    switch (action.type) {
        case "reset": {
            const defaultObj = {
                ...defaultGlobalState.delay,
                areAllDisable: state.areAllDisable
            }
            GlobalState.delay = defaultObj;
            changeLocalStorageState("delay", defaultObj);
            return defaultObj;
        }
        case "time/changeMax": {
            if (typeof action.payload === "number" 
                && isInsideInterval(state.timeMin, globalDelayLimits.TIME_MAX, action.payload)
             ) {
                GlobalState.delay.timeMax = action.payload;
                changeLocalStorageState("delay", action.payload, "timeMax");
                return { ...state, timeMax: action.payload }; 
            }
            return state;
        }
        case "time/changeMin": {
            if (typeof action.payload === "number" 
                && isInsideInterval(globalDelayLimits.TIME_MIN, state.timeMax, action.payload)
             ) { 
                GlobalState.delay.timeMin = action.payload;
                changeLocalStorageState("delay", action.payload, "timeMin");
                return { ...state, timeMin: action.payload };
            }
            return state;
        }
        case "feedback/changeMax": {
            if (typeof action.payload === "number" 
                && isInsideInterval(state.feedbackMin, globalDelayLimits.FBACK_MAX, action.payload)
             ) {
                GlobalState.delay.feedbackMax = action.payload;
                changeLocalStorageState("delay", action.payload, "feedbackMax");
                return { ...state, feedbackMax: action.payload }; 
            }
            return state;
        }
        case "feedback/changeMin": {
            if (typeof action.payload === "number" 
                && isInsideInterval(globalDelayLimits.FBACK_MIN, state.feedbackMax, action.payload)
             ) {
                    GlobalState.delay.feedbackMin = action.payload;
                    changeLocalStorageState("delay", action.payload, "feedbackMin");
                    return { ...state, feedbackMin: action.payload };
                }
            return state;
        }
        default: return state;
    }
}

/** @return {GlobalTimeInterval} */
const initTimeState = () => GlobalState.timeInterval;

/**
 * @param {GlobalTimeInterval} state 
 * @param {{
 *  type: "reset" | "max/change" | "min/change",
 *  payload?: number
 * }} action 
 * @returns {GlobalTimeInterval}
 */
const TimeReducer = (state, action) => {
    switch (action.type) {
        case "reset": {
            const defaultObj = {...defaultGlobalState.timeInterval};
            GlobalState.timeInterval = defaultObj;
            changeLocalStorageState("timeInterval", defaultObj);
            return defaultObj;
        }
        case "min/change": {
            if (typeof action.payload === "number" 
                && isInsideInterval(globalTimeIntervalLimits.MIN, state.max, action.payload)
             ) {
                GlobalState.timeInterval.min = action.payload;
                changeLocalStorageState("timeInterval", action.payload, "min");
                return { ...state, min: action.payload };
            }
            return state;
        }
        case "max/change": {
            if (typeof action.payload === "number" 
                && isInsideInterval(state.min, globalTimeIntervalLimits.MAX, action.payload)
             ) {
                GlobalState.timeInterval.max = action.payload;
                changeLocalStorageState("timeInterval", action.payload, "max");
                return { ...state, max: action.payload };
            }
            return state;
        }
        default: return state;
    }
}

/** @typedef {{fadeIn: number, fadeOut: number}} FadesState */
/** @return {FadesState} */
const initFadesState = () => ({ fadeIn: GlobalState.fadeIn, fadeOut: GlobalState.fadeOut});

/**
 * @param {FadesState} state 
 * @param {{
 *  type: "reset" | "fadeIn/change" | "fadeOut/change",
 *  payload?: number
 * }} action 
 * @returns {FadesState}
 */
const FadesReducer  = (state, action) => {
    switch (action.type) {
        case "reset": {
            GlobalState.fadeIn = defaultGlobalState.fadeIn;
            GlobalState.fadeOut = defaultGlobalState.fadeOut;
            changeLocalStorageState("fadeIn", defaultGlobalState.fadeIn);
            changeLocalStorageState("fadeOut", defaultGlobalState.fadeOut);
            return { fadeIn: defaultGlobalState.fadeIn, fadeOut: defaultGlobalState.fadeOut };
        }
        case "fadeIn/change": {
            if (typeof action.payload === "number" 
                && isInsideInterval(globalFadeLimits.MIN, globalFadeLimits.MAX, action.payload)
             ) {
                GlobalState.fadeIn = action.payload;
                changeLocalStorageState("fadeIn", action.payload);
                return { ...state, fadeIn: action.payload };
            }
            return state;
        }
        case "fadeOut/change": {
            if (typeof action.payload === "number" 
                && isInsideInterval(globalFadeLimits.MIN, globalFadeLimits.MAX, action.payload)
             ) {
                GlobalState.fadeOut = action.payload;
                changeLocalStorageState("fadeOut", action.payload);
                return { ...state, fadeOut: action.payload };
            }
            return state;
        }
        default: return state;
    }
}
/** @return {EventsForEachSet} */
const initSetsState = () =>  GlobalState.eventsForEachSet;

/**
 * @param {EventsForEachSet} state 
 * @param {{
 *  type: "reset" | "sets/update" | "sets/addEvent" | "sets/removeEvent"
 *  payload?: "number"
 * }} action 
 * @returns {EventsForEachSet}
 */
const SetsReducer = (state, action) => {
    switch (action.type) {
        case "reset": {
            const newArrOfEvents = (new Array(state.arrOfEvents.length)).fill(1);
            const newState = { arrOfEvents: newArrOfEvents, sumOfAllEvents: state.arrOfEvents.length };
            GlobalState.eventsForEachSet = newState;
            return newState
        }
        case "update": return GlobalState.eventsForEachSet;
        case "addEvent": {
            if (typeof action.payload === "number") {
                if (state.arrOfEvents[action.payload] > 0 
                    && state.sumOfAllEvents === state.arrOfEvents[action.payload]
                ) return;
                const newArrOfEvents = [...state.arrOfEvents];
                newArrOfEvents[action.payload] += 1;
                const newState = { arrOfEvents: newArrOfEvents, sumOfAllEvents: state.sumOfAllEvents + 1 }
                GlobalState.eventsForEachSet = newState;
                return newState
            }
            return state;
        }
        case "removeEvent": {
            if (typeof action.payload === "number" && state.sumOfAllEvents > 1 && state.arrOfEvents[action.payload] > 0) {
                const newArrOfEvents = [...state.arrOfEvents];
                newArrOfEvents[action.payload] -= 1;
                const newState = { arrOfEvents: newArrOfEvents, sumOfAllEvents: state.sumOfAllEvents - 1 }
                GlobalState.eventsForEachSet = newState;
                return newState
            }
            return state;
        } 
        default: return state;
    }
}

/* -------------------------------------------------------------------------- */
/*                                   EXPORTS                                  */
/* -------------------------------------------------------------------------- */
export { 
    initPannerState,
    PannerReducer,
    initFilterState,
    FilterReducer,
    initPlaybackRateState,
    PlaybackRateReducer,
    initDelayState,
    DelayReducer,
    initTimeState,
    TimeReducer,
    initFadesState,
    FadesReducer,
    initSetsState,
    SetsReducer
}