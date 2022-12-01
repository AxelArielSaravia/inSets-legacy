import {
    defaultGlobalState,
    GlobalState
} from "../state/Global/index.js";

import {
    delayLimits,
    fadeLimits,
    filterLimits,
    pannerLimits,
    playbackRateLimits,
    timeIntervalLimits
} from "../services/limits/service.js";

import {changeLocalStorageState} from "../services/localStorage/service.js";
import {isInsideInterval} from "../services/assert/service.js";


/* -------------------------------------------------------------------------- */
/*                                  REDUCERS                                  */
/* -------------------------------------------------------------------------- */

/*-
initPannerState: undefined -> GlobalPanner
*/
function initPannerState() {
    return GlobalState.panner;
}

/*-
PannerReducer: (GlobalPanner, {
    type: "reset"
        | "x/changeMax"
        | "x/changeMin"
        | "y/changeMax"
        | "y/changeMin"
        | "z/changeMax"
        | "z/changeMin",
    payload: undefined | number
}) -> GlobalPanner
*/
function PannerReducer(state, action) {
    const {payload, type} = action;
    const Panner_Limits = pannerLimits();
    if (type === "reset") {
        const defaultObj = Object.assign({}, defaultGlobalState.panner, {
            areAllDisable: state.areAllDisable
        });
        GlobalState.panner = defaultObj;
        changeLocalStorageState("panner", defaultObj);
        return defaultObj;

    }
    if (type === "x/changeMax"
        && typeof payload === "number"
        && isInsideInterval(state.xMin, Panner_Limits.MAX, payload)
    ) {
        GlobalState.panner.xMax = payload;
        changeLocalStorageState("panner", GlobalState.panner);
        return Object.assign({}, state, {xMax: payload});

    }
    if (type === "x/changeMin"
        && typeof payload === "number"
        && isInsideInterval(Panner_Limits.MIN, state.xMax, payload)
    ) {
        GlobalState.panner.xMin = payload;
        changeLocalStorageState("panner", GlobalState.panner);
        return Object.assign({}, state, {xMin: payload});

    }
    if (type === "y/changeMax"
        && typeof payload === "number"
        && isInsideInterval(state.yMin, Panner_Limits.MAX, payload)
    ) {
        GlobalState.panner.yMax = payload;
        changeLocalStorageState("panner", GlobalState.panner);
        return Object.assign({}, state, {yMax: payload});

    }
    if (type === "y/changeMin"
        && typeof payload === "number"
        && isInsideInterval(Panner_Limits.MIN, state.yMax, payload)
    ) {
        GlobalState.panner.yMin = payload;
        changeLocalStorageState("panner", GlobalState.panner);
        return Object.assign({}, state, {yMin: payload});

    }
    if (type === "z/changeMax"
        && typeof payload === "number"
        && isInsideInterval(state.zMin, Panner_Limits.Z_MAX, payload)
    ) {
        GlobalState.panner.zMax = payload;
        changeLocalStorageState("panner", GlobalState.panner);
        return Object.assign({}, state, {zMax: payload});

    }
    if (type === "z/changeMin"
        && typeof payload === "number"
        && isInsideInterval(Panner_Limits.MIN, state.zMax, payload)
    ) {
        GlobalState.panner.zMin = payload;
        changeLocalStorageState("panner", GlobalState.panner);
        return Object.assign({}, state, {zMin: payload});
    }
    return state;
}

/*-
initFilterState: undefined -> GlobalFilter
*/
function initFilterState() {
    return GlobalState.filter;
}

/*-
FilterReducer: (GlobalFilter,{
    type: "reset"
        | "frequency/changeMax"
        | "frequency/changeMin"
        | "q/changeMax"
        | "q/changeMin"
        | "types/change",
    payload: undefined | number | Array<string>
}) -> GlobalFilter
*/
function FilterReducer(state, action) {
    const {payload, type} = action;
    const Filter_Limits = filterLimits();

    if (type === "reset") {
        const defaultObj = Object.assign({}, defaultGlobalState.filter,{
            areAllDisable: state.areAllDisable
        });
        GlobalState.filter = defaultObj;
        changeLocalStorageState("filter", defaultObj);
        return defaultObj;

    }
    if (type === "frequency/changeMax"
        && typeof payload === "number"
        && isInsideInterval(
            state.frequencyMin,
            Filter_Limits.FREQ_MAX,
            payload
        )
    ) {
        GlobalState.filter.frequencyMax = payload;
        changeLocalStorageState("filter", GlobalState.filter);
        return Object.assign({}, state, {frequencyMax: payload});

    }
    if (type === "frequency/changeMin"
        && typeof payload === "number"
        && isInsideInterval(
            Filter_Limits.FREQ_MIN,
            state.frequencyMax,
            payload
        )
    ) {
        GlobalState.filter.frequencyMin = payload;
        changeLocalStorageState("filter", GlobalState.filter);
        return Object.assign({}, state, {frequencyMin: payload});

    }
    if (type === "q/changeMax"
        && typeof payload === "number"
        && isInsideInterval(state.qMin, Filter_Limits.Q_MAX, payload)
    ) {
        GlobalState.filter.qMax = payload;
        changeLocalStorageState("filter", GlobalState.filter);
        return Object.assign({}, state, {qMax: payload});

    }
    if (type === "q/changeMin"
        && typeof payload === "number"
        && isInsideInterval(Filter_Limits.Q_MIN, state.qMax, payload)
    ) {
        GlobalState.filter.qMin = payload;
        changeLocalStorageState("filter", GlobalState.filter);
        return Object.assign({}, state, {qMin: payload});

    }
    if (type === "types/change" && Array.isArray(payload)) {
        const arr = payload.filter(function (el) {
            return (/lowpass|highpass|bandpass|peaking|notch/).test(el);
        });
        if (arr.length !== 0) {
            GlobalState.filter.types = arr;
            changeLocalStorageState("filter", GlobalState.filter);
            return Object.assign({}, state, {types: arr});
        }
    }
    return state;
}

/*-
initPlaybackRateState: undefined -> GlobalPlaybackRate
*/
function initPlaybackRateState() {
    return GlobalState.playbackRate;
}

/*-
PlaybackRateReducer: (GlobalPlaybackRate, {
    type: "reset" | "max/change" | "min/change",
    payload: number | undefined
}) -> GlobalPlaybackRate
*/
function PlaybackRateReducer(state, action) {
    const {payload, type} = action;
    const PlaybackRate_Limits = playbackRateLimits();
    if (type === "reset") {
        const defaultObj = Object.assign({}, defaultGlobalState.playbackRate, {
            areAllDisable: state.areAllDisable
        });
        GlobalState.playbackRate = defaultObj;
        changeLocalStorageState("playbackRate", defaultObj);
        return defaultObj;

    }
    if (type === "max/change"
        && typeof payload === "number"
        && isInsideInterval(state.min, PlaybackRate_Limits.MAX, payload)
    ) {
        GlobalState.playbackRate.max = payload;
        changeLocalStorageState("playbackRate",  GlobalState.playbackRate);
        return Object.assign({}, state, {max: payload});

    }
    if (type === "min/change"
        && typeof payload === "number"
        && isInsideInterval(PlaybackRate_Limits.MIN, state.max, payload)
    ) {
        GlobalState.playbackRate.min = payload;
        changeLocalStorageState("playbackRate",  GlobalState.playbackRate);
        return Object.assign({}, state, {min: payload});
    }
    return state;
}

/*-
initDelayState: undefined -> GlobalDelay
*/
function initDelayState() {
    return GlobalState.delay;
}

/*-
DelayReducer: (GlobalDelay, {
    type: "reset"
        | "time/changeMax"
        | "time/changeMin"
        | "feedback/changeMax"
        | "feedback/changeMin",
    payload?: number
}) -> GlobalDelay
*/
function DelayReducer(state, action) {
    const {payload, type} = action;
    const Dealy_Limits = delayLimits();
    if (type === "reset") {
        const defaultObj = Object.assign({}, defaultGlobalState.delay, {
            areAllDisable: state.areAllDisable
        });
        GlobalState.delay = defaultObj;
        changeLocalStorageState("delay", defaultObj);
        return defaultObj;

    }
    if (type === "time/changeMax"
        && typeof payload === "number"
        && isInsideInterval(state.timeMin, Dealy_Limits.TIME_MAX, payload)
    ) {
        GlobalState.delay.timeMax = payload;
        changeLocalStorageState("delay", GlobalState.delay);
        return Object.assign({}, state, {timeMax: payload});

    }
    if (type === "time/changeMin"
        && typeof payload === "number"
        && isInsideInterval(Dealy_Limits.TIME_MIN, state.timeMax, payload)
    ) {
        GlobalState.delay.timeMin = payload;
        changeLocalStorageState("delay", GlobalState.delay);
        return Object.assign({}, state, {timeMin: payload});

    }
    if (type === "feedback/changeMax"
        && typeof payload === "number"
        && isInsideInterval(
            state.feedbackMin,
            Dealy_Limits.FBACK_MAX, payload
        )
    ) {
        GlobalState.delay.feedbackMax = payload;
        changeLocalStorageState("delay", GlobalState.delay);
        return Object.assign({}, state, {feedbackMax: payload});

    }
    if (type === "feedback/changeMin"
        && typeof payload === "number"
        && isInsideInterval(
            Dealy_Limits.FBACK_MIN,
            state.feedbackMax, payload
        )
    ) {
        GlobalState.delay.feedbackMin = payload;
        changeLocalStorageState("delay", GlobalState.delay);
        return Object.assign({}, state, {feedbackMin: payload});
    }
    return state;
}

/*-
initTimeState: undefined -> GlobalTimeInterval
*/
function initTimeState() {
    return GlobalState.timeInterval;
}

/*-
TimeReducer: (GlobalTimeInterval, {
    type: "reset" | "max/change" | "min/change",
    payload: undefined | number
}) -> GlobalTimeInterval
*/
function TimeReducer(state, action) {
    const {payload, type} = action;
    const Time_Limits = timeIntervalLimits();
    if (type === "reset") {
        const defaultObj = Object.assign({}, defaultGlobalState.timeInterval);
        GlobalState.timeInterval = defaultObj;
        changeLocalStorageState("timeInterval", defaultObj);
        return defaultObj;

    }
    if (type === "min/change"
        && typeof payload === "number"
        && isInsideInterval(Time_Limits.MIN, state.max, payload)
    ) {
        GlobalState.timeInterval.min = payload;
        changeLocalStorageState("timeInterval", GlobalState.timeInterval);
        return Object.assign({}, state, {min: payload});

    }
    if (type === "max/change"
        && typeof payload === "number"
        && isInsideInterval(state.min, Time_Limits.MAX, payload)
    ) {
        GlobalState.timeInterval.max = payload;
        changeLocalStorageState("timeInterval", GlobalState.timeInterval);
        return Object.assign({}, state, {max: payload});
    }
    return state;
}

/*-
@type FadesState: {
    fadeIn: number,
    fadeOut: number
}
*/
/*-
initFadesState: undefined -> FadesState
*/
function initFadesState() {
    return {
        fadeIn: GlobalState.fadeIn,
        fadeOut: GlobalState.fadeOut
    };
}

/*-
FadesReducer: (FadesState, {
    type: "reset" | "fadeIn/change" | "fadeOut/change",
    payload?: number
}) -> FadesState
*/
function FadesReducer(state, action) {
    const {payload, type} = action;
    const Fades_Limits = fadeLimits();
    if (type === "reset") {
        GlobalState.fadeIn = defaultGlobalState.fadeIn;
        GlobalState.fadeOut = defaultGlobalState.fadeOut;
        changeLocalStorageState("fadeIn", defaultGlobalState.fadeIn);
        changeLocalStorageState("fadeOut", defaultGlobalState.fadeOut);
        return {
            fadeIn: defaultGlobalState.fadeIn,
            fadeOut: defaultGlobalState.fadeOut
        };

    }
    if (type === "fadeIn/change"
        && typeof payload === "number"
        && isInsideInterval(Fades_Limits.MIN, Fades_Limits.MAX, payload)
    ) {
        GlobalState.fadeIn = payload;
        changeLocalStorageState("fadeIn", payload);
        return Object.assign({}, state, {fadeIn: payload});

    }
    if (type === "fadeOut/change"
        && typeof payload === "number"
        && isInsideInterval(Fades_Limits.MIN, Fades_Limits.MAX, payload)
    ) {
        GlobalState.fadeOut = payload;
        changeLocalStorageState("fadeOut", payload);
        return Object.assign({}, state, {fadeOut: payload});
    }
    return state;
}

/*-
initSetsState: undefined -> EventsForEachSet
*/
function initSetsState() {
    return GlobalState.eventsForEachSet;
}

/*-
SetsReducer: (EventsForEachSet, {
    type: "reset" | "sets/update" | "sets/addEvent" | "sets/removeEvent"
    payload?: "number"
}) -> EventsForEachSet
*/
function SetsReducer(state, action) {
    const {payload, type} = action;
    if (type === "reset") {
        const newArrOfEvents = (new Array(state.arrOfEvents.length)).fill(1);
        const newState = {
            arrOfEvents: newArrOfEvents,
            sumOfAllEvents: state.arrOfEvents.length
        };
        GlobalState.eventsForEachSet = newState;
        return newState;
    }
    if (type === "update") {
        return GlobalState.eventsForEachSet;

    }
    if (type === "addEvent"
        && typeof payload === "number"
    ) {
        if (state.arrOfEvents[payload] > 0
            && state.sumOfAllEvents === state.arrOfEvents[payload]
        ) {
            return state;
        }
        const newArrOfEvents = [...state.arrOfEvents];
        newArrOfEvents[payload] += 1;

        const newState = {
            arrOfEvents: newArrOfEvents,
            sumOfAllEvents: state.sumOfAllEvents + 1
        };

        GlobalState.eventsForEachSet = newState;
        return newState;

    }
    if (type === "removeEvent"
        && typeof payload === "number"
        && state.sumOfAllEvents > 1
        && state.arrOfEvents[payload] > 0
    ) {
        const newArrOfEvents = [...state.arrOfEvents];

        newArrOfEvents[payload] -= 1;
        const newState = {
            arrOfEvents: newArrOfEvents,
            sumOfAllEvents: state.sumOfAllEvents - 1
        };

        GlobalState.eventsForEachSet = newState;
        return newState;
    }
    return state;
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
};