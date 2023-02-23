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
    const Panner_Limits = pannerLimits;
    if (type === "reset") {
        const defaultObj = Object.assign({}, defaultGlobalState.panner, {
            areAllDisable: state.areAllDisable
        });
        GlobalState.panner = defaultObj;
        changeLocalStorageState("panner", defaultObj);
        return defaultObj;
    } else if (type === "x/changeMax") {
        return (
            (typeof payload === "number"
             && isInsideInterval(state.xMin, Panner_Limits.MAX, payload)
            )
            ? (
                GlobalState.panner.xMax = payload,
                changeLocalStorageState("panner", GlobalState.panner),
                Object.assign({}, state, {xMax: payload})
            )
            : state
        );
    } else if (type === "x/changeMin") {
        return (
            (typeof payload === "number"
             && isInsideInterval(Panner_Limits.MIN, state.xMax, payload)
            )
            ? (
                GlobalState.panner.xMin = payload,
                changeLocalStorageState("panner", GlobalState.panner),
                Object.assign({}, state, {xMin: payload})
            )
            : state
        );

    } else if (type === "y/changeMax") {
        return (
            (typeof payload === "number"
             && isInsideInterval(state.yMin, Panner_Limits.MAX, payload)
            )
            ? (
                GlobalState.panner.yMax = payload,
                changeLocalStorageState("panner", GlobalState.panner),
                Object.assign({}, state, {yMax: payload})
            )
            : state
        );
    } else if (type === "y/changeMin") {
        return (
            (typeof payload === "number"
             && isInsideInterval(Panner_Limits.MIN, state.yMax, payload)
            )
            ? (
                GlobalState.panner.yMin = payload,
                changeLocalStorageState("panner", GlobalState.panner),
                Object.assign({}, state, {yMin: payload})
            )
            : state
        );
    } else if (type === "z/changeMax") {
        return (
            (typeof payload === "number"
             && isInsideInterval(state.zMin, Panner_Limits.Z_MAX, payload)
            )
            ? (
                GlobalState.panner.zMax = payload,
                changeLocalStorageState("panner", GlobalState.panner),
                Object.assign({}, state, {zMax: payload})
            )
            : state
        );
    } else if (type === "z/changeMin"
        && typeof payload === "number"
        && isInsideInterval(Panner_Limits.MIN, state.zMax, payload)
    ) {
        GlobalState.panner.zMin = payload;
        changeLocalStorageState("panner", GlobalState.panner);
        return Object.assign({}, state, {zMin: payload});
    } else {
        return state;
    }
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
    const Filter_Limits = filterLimits;

    if (type === "reset") {
        const defaultObj = Object.assign({}, defaultGlobalState.filter,{
            areAllDisable: state.areAllDisable
        });
        GlobalState.filter = defaultObj;
        changeLocalStorageState("filter", defaultObj);
        return defaultObj;

    } else if (type === "frequency/changeMax") {
        return (
            (typeof payload === "number" && isInsideInterval(
                state.frequencyMin,
                Filter_Limits.FREQ_MAX,
                payload
            ))
            ? (
                GlobalState.filter.frequencyMax = payload,
                changeLocalStorageState("filter", GlobalState.filter),
                Object.assign({}, state, {frequencyMax: payload})
            )
            : state
        );

    } else if (type === "frequency/changeMin") {
        return (
            (typeof payload === "number" && isInsideInterval(
                Filter_Limits.FREQ_MIN,
                state.frequencyMax,
                payload
            ))
            ? (
                GlobalState.filter.frequencyMin = payload,
                changeLocalStorageState("filter", GlobalState.filter),
                Object.assign({}, state, {frequencyMin: payload})
            )
            : state
        );
    } else if (type === "q/changeMax") {
        return (
            (typeof payload === "number"
             && isInsideInterval(state.qMin, Filter_Limits.Q_MAX, payload)
            )
            ? (
                GlobalState.filter.qMax = payload,
                changeLocalStorageState("filter", GlobalState.filter),
                Object.assign({}, state, {qMax: payload})
            )
            : state
        );
    } else if (type === "q/changeMin") {
        return (
            (typeof payload === "number"
             && isInsideInterval(Filter_Limits.Q_MIN, state.qMax, payload)
            )
            ? (
                GlobalState.filter.qMin = payload,
                changeLocalStorageState("filter", GlobalState.filter),
                Object.assign({}, state, {qMin: payload})
            )
            : state
        );
    } else if (type === "types/change" && Array.isArray(payload)) {
        const arr = payload.filter(function (el) {
            return (/lowpass|highpass|bandpass|peaking|notch/).test(el);
        });
        return (
            arr.length !== 0
            ? (
                GlobalState.filter.types = arr,
                changeLocalStorageState("filter", GlobalState.filter),
                Object.assign({}, state, {types: arr})
            )
            : state
        );
    } else {
        return state;
    }
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
    const PlaybackRate_Limits = playbackRateLimits;
    if (type === "reset") {
        const defaultObj = Object.assign({}, defaultGlobalState.playbackRate, {
            areAllDisable: state.areAllDisable
        });
        GlobalState.playbackRate = defaultObj;
        changeLocalStorageState("playbackRate", defaultObj);
        return defaultObj;

    } else if (type === "max/change") {
        return (
            (typeof payload === "number"
             && isInsideInterval(state.min, PlaybackRate_Limits.MAX, payload)
            )
            ? (
                GlobalState.playbackRate.max = payload,
                changeLocalStorageState("playbackRate",  GlobalState.playbackRate),
                Object.assign({}, state, {max: payload})
            )
            : state
        );
    } else if (type === "min/change"
        && typeof payload === "number"
        && isInsideInterval(PlaybackRate_Limits.MIN, state.max, payload)
    ) {
        GlobalState.playbackRate.min = payload;
        changeLocalStorageState("playbackRate",  GlobalState.playbackRate);
        return Object.assign({}, state, {min: payload});
    } else {
        return state;
    }
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
    const Dealy_Limits = delayLimits;
    if (type === "reset") {
        const defaultObj = Object.assign({}, defaultGlobalState.delay, {
            areAllDisable: state.areAllDisable
        });
        GlobalState.delay = defaultObj;
        changeLocalStorageState("delay", defaultObj);
        return defaultObj;

    } else if (type === "time/changeMax") {
        return (
            (typeof payload === "number"
             && isInsideInterval(state.timeMin, Dealy_Limits.TIME_MAX, payload)
            )
            ? (
                GlobalState.delay.timeMax = payload,
                changeLocalStorageState("delay", GlobalState.delay),
                Object.assign({}, state, {timeMax: payload})
            )
            : state
        );
    } else if (type === "time/changeMin") {
        return (
            (typeof payload === "number"
             && isInsideInterval(Dealy_Limits.TIME_MIN, state.timeMax, payload)
            )
            ? (
                GlobalState.delay.timeMin = payload,
                changeLocalStorageState("delay", GlobalState.delay),
                Object.assign({}, state, {timeMin: payload})
            )
            : state
        );
    } else if (type === "feedback/changeMax") {
        return (
            (typeof payload === "number" && isInsideInterval(
                state.feedbackMin,
                Dealy_Limits.FBACK_MAX, payload
            ))
            ? (
                GlobalState.delay.feedbackMax = payload,
                changeLocalStorageState("delay", GlobalState.delay),
                Object.assign({}, state, {feedbackMax: payload})
            )
            : state
        );
    } else if (type === "feedback/changeMin"
        && typeof payload === "number"
        && isInsideInterval(
            Dealy_Limits.FBACK_MIN,
            state.feedbackMax, payload
        )
    ) {
        GlobalState.delay.feedbackMin = payload;
        changeLocalStorageState("delay", GlobalState.delay);
        return Object.assign({}, state, {feedbackMin: payload});
    } else {
        return state;
    }
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
    const Time_Limits = timeIntervalLimits;
    if (type === "reset") {
        const defaultObj = Object.assign({}, defaultGlobalState.timeInterval);
        GlobalState.timeInterval = defaultObj;
        changeLocalStorageState("timeInterval", defaultObj);
        return defaultObj;
    } else if (type === "min/change") {
        return (
            (typeof payload === "number"
             && isInsideInterval(Time_Limits.MIN, state.max, payload)
            )
            ? (
                GlobalState.timeInterval.min = payload,
                changeLocalStorageState("timeInterval", GlobalState.timeInterval),
                Object.assign({}, state, {min: payload})
            )
            : state
        );
    } else if (type === "max/change"
        && typeof payload === "number"
        && isInsideInterval(state.min, Time_Limits.MAX, payload)
    ) {
        GlobalState.timeInterval.max = payload;
        changeLocalStorageState("timeInterval", GlobalState.timeInterval);
        return Object.assign({}, state, {max: payload});
    } else {
        return state;
    }
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
    const Fades_Limits = fadeLimits;
    if (type === "reset") {
        GlobalState.fadeIn = defaultGlobalState.fadeIn;
        GlobalState.fadeOut = defaultGlobalState.fadeOut;
        changeLocalStorageState("fadeIn", defaultGlobalState.fadeIn);
        changeLocalStorageState("fadeOut", defaultGlobalState.fadeOut);
        return {
            fadeIn: defaultGlobalState.fadeIn,
            fadeOut: defaultGlobalState.fadeOut
        };

    } else if (type === "fadeIn/change") {
        return (
            (typeof payload === "number"
             && isInsideInterval(Fades_Limits.MIN, Fades_Limits.MAX, payload)
            )
            ? (
                GlobalState.fadeIn = payload,
                changeLocalStorageState("fadeIn", payload),
                Object.assign({}, state, {fadeIn: payload})
            )
            : state
        );
    } else if (type === "fadeOut/change"
        && typeof payload === "number"
        && isInsideInterval(Fades_Limits.MIN, Fades_Limits.MAX, payload)
    ) {
        GlobalState.fadeOut = payload;
        changeLocalStorageState("fadeOut", payload);
        return Object.assign({}, state, {fadeOut: payload});
    } else {
        return state;
    }
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
    } else if (type === "update") {
        return GlobalState.eventsForEachSet;
    } else if (type === "addEvent") {
        if (typeof payload !== "number"
            || (
                state.arrOfEvents[payload] > 0
                && state.sumOfAllEvents === state.arrOfEvents[payload]
            )
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

    } else if (type === "removeEvent"
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
    } else {
        return state;
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
};