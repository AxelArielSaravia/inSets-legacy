import {isInsideInterval} from "../../services/assert/service.js";
import {
    delayLimits,
    fadeLimits,
    filterLimits,
    pannerLimits,
    playbackRateLimits,
    timeIntervalLimits
} from "../../services/limits/service.js";

/* -------------------------------------------------------------------------- */
/*                            DEFAULT GLOBAL STATE                            */
/* -------------------------------------------------------------------------- */
/*-
@type LocalStorageState: {
    delay: GlobalDelay,
    fadeIn: number,
    fadeOut: number,
    fadeTime: number,
    filter: GlobalFilter,
    panner: GlobalPanner,
    playbackRate: GlobalPlaybackRate,
    randomEndPoint: boolean,
    randomStartPoint: boolean,
    timeInterval: GlobalTimeInterval
}
*/

/*-
defaultGlobalState: LocalStorageState
*/
const defaultGlobalState = Object.freeze({
    delay: Object.freeze({
        areAllDisable: false,
        feedbackMax: 16,
        feedbackMin: 4,
        timeMax: 39,
        timeMin: 3
    }),
    fadeIn: 7,
    fadeOut:19,
    filter: Object.freeze({
        areAllDisable: false,
        frequencyMax: 240,
        frequencyMin: 40,
        qMax: 36,
        qMin: 0,
        types: Object.freeze(["lowpass", "highpass", "bandpass", "notch"])
    }),
    panner: Object.freeze({
        areAllDisable: false,
        xMax: 80,
        xMin: 20,
        yMax: 80,
        yMin: 20,
        zMax: 50,
        zMin: 0
    }),
    playbackRate: Object.freeze({
        areAllDisable: false,
        max: 15,
        min: 5
    }),
    randomEndPoint: false,
    randomStartPoint: false,
    timeInterval: Object.freeze({
        max: 50,  //handreads of miliseconds
        min: 8    //handreads of miliseconds
    })
});

/* -------------------------------------------------------------------------- */
/*                               ELEMENTS STATES                              */
/* -------------------------------------------------------------------------- */
/*-
@type GlobalDelay: {
    areAllDisable: boolean,
    timeMin: number,
    timeMax: number,
    feedbackMin: number,
    feedbackMax: number
}
*/
/*-
@type MaybeDelay: Maybe<GlobalDelay>
*/

/*-
-- Time values are in seconds
-- Feedback is a gain value
createGlobalDelay: MaybeDelay -> GlobalDelay
*/
function createGlobalDelay(spec) {
    const o = {};
    if (typeof spec === "object") {
        const limits = delayLimits();
        o.areAllDisable = (
            spec.areAllDisable !== undefined
            ? spec.areAllDisable
            : defaultGlobalState.delay.areAllDisable
        );
        o.timeMax = (
            (spec.timeMax !== undefined
                && isInsideInterval(
                    limits.TIME_MIN,
                    limits.TIME_MAX,
                    spec.timeMax
                )
            )
            ? spec.timeMax
            : defaultGlobalState.delay.timeMax
        );
        o.timeMin = (
            (spec.timeMin !== undefined
                && isInsideInterval(limits.TIME_MIN, o.timeMax, spec.timeMin)
            )
            ? spec.timeMin
            : defaultGlobalState.delay.timeMin
        );
        o.feedbackMax = (
            (spec.feedbackMax !== undefined
                && isInsideInterval(
                    limits.FBACK_MIN,
                    limits.FBACK_MAX,
                    spec.feedbackMax
                )
            )
            ? spec.feedbackMax
            : defaultGlobalState.delay.feedbackMax
        );
        o.feedbackMin = (
            (spec.feedbackMin !== undefined
                && isInsideInterval(
                    limits.FBACK_MIN,
                    o.feedbackMax,
                    spec.feedbackMin
                )
            )
            ? spec.feedbackMin
            : defaultGlobalState.delay.feedbackMin
        );
    } else {
        o.areAllDisable = defaultGlobalState.delay.areAllDisable;
        o.timeMin = defaultGlobalState.delay.timeMin;
        o.timeMax = defaultGlobalState.delay.timeMax;
        o.feedbackMin = defaultGlobalState.delay.feedbackMin;
        o.feedbackMax = defaultGlobalState.delay.feedbackMax;
    }
    return o;
}

/*-
@type GlobalFilter: {
    areAllDisable: boolean,
    frequencyMax: number,
    frequencyMin: number,
    qMax: number,
    qMin: number,
    types: ["lowpass"?, "highpass"?, "bandpass"?, "notch"?]
}
*/
/*-
@type MaybeFilter: Maybe<GlobalFilter>
*/

/*-
createGlobalFilter: MaybeFilter -> GlobalFilter
*/
function createGlobalFilter(spec) {
    const o = {};
    if (typeof spec === "object") {
        const limits = filterLimits();
        o.areAllDisable = (
            spec.areAllDisable !== undefined
            ? spec.areAllDisable
            : defaultGlobalState.filter.areAllDisable
        );
        o.frequencyMax = (
            (spec.frequencyMax !== undefined
                && isInsideInterval(
                    limits.FREQ_MIN,
                    limits.FREQ_MAX,
                    spec.frequencyMax
                )
            )
            ? spec.frequencyMax
            : defaultGlobalState.filter.frequencyMax
        );
        o.frequencyMin = (
            (spec.frequencyMin !== undefined
                && isInsideInterval(
                    limits.FREQ_MIN,
                    o.frequencyMax,
                    spec.frequencyMin
                )
            )
            ? spec.frequencyMin
            : defaultGlobalState.filter.frequencyMin
        );
        o.qMax = (
            (spec.qMax
                && isInsideInterval(limits.Q_MIN, limits.Q_MAX, spec.qMax)
            )
            ? spec.qMax
            : defaultGlobalState.filter.qMax
        );
        o.qMin = (
            (spec.qMin !== undefined
                && isInsideInterval(limits.Q_MIN, o.qMax, spec.qMin)
            )
            ? spec.qMin
            : defaultGlobalState.filter.qMin
        );
        if (spec.types !== undefined && Array.isArray(spec.types)) {
            const arr = spec.types.filter((el) => (/lowpass|highpass|bandpass|notch/).test(el));
            o.types = (arr.length === 0 ? limits.TYPES : arr);
        } else {
            o.types = defaultGlobalState.filter.types;
        }
    } else {
        o.areAllDisable = defaultGlobalState.filter.areAllDisable;
        o.frequencyMin = defaultGlobalState.filter.frequencyMin;
        o.frequencyMax = defaultGlobalState.filter.frequencyMax;
        o.qMin = defaultGlobalState.filter.qMin;
        o.qMax = defaultGlobalState.filter.qMax;
        o.types = defaultGlobalState.filter.types;
    }
    return o;
}

/*-
@type GlobalPanner: {
    areAllDisable: boolean,
    xMax: number,
    xMin: number,
    yMax: number,
    yMin: number,
    zMax: number,
    zMin: number
}
*/
/*-
@type MaybePanner: Maybe<GlobalPanner>
*/
/*-
createGlobalPanner: MaybePanner -> GlobalPanner
*/
function createGlobalPanner(spec) {
    const o = {};
    if (typeof spec === "object") {
        const limits = pannerLimits();
        o.areAllDisable = (
            spec.areAllDisable !== undefined
            ? spec.areAllDisable
            : defaultGlobalState.panner.areAllDisable
        );
        o.xMax = (
            (spec.xMax !== undefined
                && isInsideInterval(limits.MIN, limits.MAX, spec.xMax)
            )
            ? spec.xMax
            : defaultGlobalState.panner.xMax
        );
        o.xMin = (
            (spec.xMin !== undefined
                && isInsideInterval(limits.MIN, o.xMax, spec.xMin)
            )
            ? spec.xMin
            : defaultGlobalState.panner.xMin
        );
        o.yMax = (
            (spec.yMax !== undefined
                && isInsideInterval(limits.MIN, limits.MAX, spec.yMax)
            )
            ? spec.yMax
            : defaultGlobalState.panner.yMax
        );
        o.yMin = (
            (spec.yMin !== undefined
                && isInsideInterval(limits.MIN, o.yMax, spec.yMin)
            )
            ? spec.yMin
            : defaultGlobalState.panner.yMin
        );
        o.zMax = (
            (spec.zMax !== undefined
                && isInsideInterval(limits.MIN, limits.Z_MAX, spec.zMax)
            )
            ? spec.zMax
            : defaultGlobalState.panner.zMax
        );
        o.zMin =(
            (spec.zMin !== undefined
                && isInsideInterval(limits.MIN, o.zMax, spec.zMin)
            )
            ? spec.zMin
            : defaultGlobalState.panner.zMin
        );
    } else {
        o.areAllDisable = defaultGlobalState.panner.areAllDisable;
        o.xMin = defaultGlobalState.panner.xMin;
        o.xMax = defaultGlobalState.panner.xMax;
        o.yMin = defaultGlobalState.panner.yMin;
        o.yMax = defaultGlobalState.panner.yMax;
        o.zMin = defaultGlobalState.panner.zMin;
        o.zMax = defaultGlobalState.panner.zMax;
    }
    return o;
}

/*-
@type GlobalPlaybackRate: {
    areAllDisable: boolean,
    max: number,
    min: number
}
*/
/*-
@type MaybePlaybackRate: Maybe<GlobalPlaybackRate>
*/

/*-
createGlobalPlaybackRate: MaybePlaybackRate -> GlobalPlaybackRate
*/
function createGlobalPlaybackRate(spec) {
    const o = {};
    if (typeof spec === "object") {
        const limits = playbackRateLimits();
        o.areAllDisable = (
            spec.areAllDisable !== undefined
            ? spec.areAllDisable
            : defaultGlobalState.playbackRate.areAllDisable
        );
        o.max = (
            (spec.max !== undefined
                && isInsideInterval(limits.MIN, limits.MAX, spec.max)
            )
            ? spec.max
            : defaultGlobalState.playbackRate.max
        );
        o.min = (
            (spec.min !== undefined
                && isInsideInterval(limits.MIN, o.max, spec.min)
            )
            ? spec.min
            : defaultGlobalState.playbackRate.min
        );
    } else {
        o.areAllDisable = defaultGlobalState.playbackRate.areAllDisable;
        o.min = defaultGlobalState.playbackRate.min;
        o.max = defaultGlobalState.playbackRate.max;
    }
    return o;
}

/*-
@type GlobalTimeInterval: {
    min: number,
    max: number
}
*/
/*-
@type MaybeTimeInterval: Maybe<GlobalTimeInterval>
*/

/*-
-- Values are in miliseconds
createGlobalTimeInteval: MaybeTimeInterval -> GlobalTimeInterval
*/
function createGlobalTimeInteval(spec) {
    const o = {};
    if (typeof spec === "object") {
        const limits = timeIntervalLimits();
        o.min = (
            (spec.min !== undefined
                && isInsideInterval(limits.MIN, limits.MAX,spec.min)
            )
            ? spec.min
            : defaultGlobalState.timeInterval.min
        );
        o.max = (
            (spec.max !== undefined
                && isInsideInterval(o.min, limits.MAX, spec.max)
            )
            ? spec.max
            : defaultGlobalState.timeInterval.max
        );
    } else {
        o.min = defaultGlobalState.timeInterval.min;
        o.max = defaultGlobalState.timeInterval.max;
    }
    return o;
}

/*-
createGlobalRandomPoint: boolean -> boolean
*/
function createGlobalRandomPoint(bool) {
    return (
        typeof bool === "boolean"
        ? bool
        : defaultGlobalState.randomStartPoint
    );
}

/*-
createGlobalFadeValue: number -> number
*/
function createGlobalFadeValue(num) {
    const limits = fadeLimits();
    const fadeTime = (
        (Number.isInteger(num)
            && isInsideInterval(limits.MIN, limits.MAX, num)
        )
        ? num
        : 15 //default
    );
    return fadeTime;
}

/*-
@type EventsForEachSet: {
    arrOfEvents: Array<number>,
    sumOfAllEvents: number
}
*/
/*-
createEventOfEachSet: undefined -> EventsForEachSet
*/
function createEventOfEachSet() {
    return {
        arrOfEvents: [1],
        sumOfAllEvents: 1
    };
}

/* -------------------------------------------------------------------------- */
/*                                GLOBAL STATE                                */
/* -------------------------------------------------------------------------- */
/*-
@type GlobalState: {
    ...LocalStorageState,
    _audio_context: undefined | AudioContext,
    _audio_list: Map<string, AudioState>,
    _is_started: boolean,
    _started_id: string,
    eventsForEachSet: EventsForEachSet
}
*/

/*-
createGlobalState: undefind -> GlobalState
*/
function createGlobalState() {
    const c = Object.create(null);
    c.audio_context = undefined;
    c.audio_list = new Map();
    c.started_id = "";
    c.is_started = false; //default
    c.delay = createGlobalDelay();
    c.eventsForEachSet = createEventOfEachSet();
    c.fadeIn = createGlobalFadeValue();
    c.fadeOut = createGlobalFadeValue();
    c.filter = createGlobalFilter();
    c.panner = createGlobalPanner();
    c.playbackRate = createGlobalPlaybackRate();
    c.randomEndPoint = createGlobalRandomPoint();
    c.randomStartPoint = createGlobalRandomPoint();
    c.timeInterval = createGlobalTimeInteval();
    return Object.seal(c);
}
/*-
GlobalState: GlobalState
*/
const GlobalState = createGlobalState();
/*-
initGlobalState: LocalStorageState -> undefined
*/
function initGlobalState(localStorageState) {
    if (typeof localStorageState !== "object") {
        return;
    }
    if (localStorageState.delay !== undefined) {
        GlobalState.delay = createGlobalDelay(localStorageState.delay);
    }
    if (localStorageState.fadeIn !== undefined) {
        GlobalState.fadeIn = createGlobalFadeValue(localStorageState.fadeIn);
    }
    if (localStorageState.fadeOut !== undefined) {
        GlobalState.fadeOut = createGlobalFadeValue(localStorageState.fadeOut);
    }
    if (localStorageState.filter !== undefined) {
        GlobalState.filter = createGlobalFilter(localStorageState.filter);
    }
    if (localStorageState.panner !== undefined) {
        GlobalState.panner = createGlobalPanner(localStorageState.panner);
    }
    if (localStorageState.playbackRate !== undefined) {
        GlobalState.playbackRate = (
            createGlobalPlaybackRate(localStorageState.playbackRate)
        );
    }
    if (localStorageState.randomEndPoint !== undefined) {
        GlobalState.randomEndPoint = (
            createGlobalRandomPoint(localStorageState.randomEndPoint)
        );
    }
    if (localStorageState.randomStartPoint !== undefined) {
        GlobalState.randomStartPoint = (
            createGlobalRandomPoint(localStorageState.randomStartPoint)
        );
    }
    if (localStorageState.timeInterval !== undefined) {
        GlobalState.timeInterval = (
            createGlobalTimeInteval(localStorageState.timeInterval)
        );
    }
}

/* -------------------------------------------------------------------------- */
/*                             VIEW GENERAL STATE                             */
/* -------------------------------------------------------------------------- */
/*-
@type ViewDisableState: {
    value: boolean
    global: boolean
}
*/
/*-
@type ViewAudioListState: {
    completedAudioList: Object<string, undefined>,
    completedAudioListSize: number,
    loadingAudioList: Object<string, undefined>,
    loadingAudioListSize: number,
    sumOfAllEvents: number
}
*/

/*-
createViewAudioListState: undefined -> ViewAudioListState
*/
function createViewAudioListState() {
    return {
        completedAudioList: {},
        completedAudioListSize: 0,
        loadedAudioList: {},
        loadedAudioListSize: 0
    };
}

/*
@type ViewGeneralDisableState: {
    allDelaysAreDisabled: ViewDisableState,
    allFiltersAreDisabled: ViewDisableState,
    allPannersAreDisabled: ViewDisableState,
    allPlaybackRatesAreDisabled: ViewDisableState,
    allRandomEndPointsAreDisabled: ViewDisableState,
    allRandomStartPointsAreDisabled: ViewDisableState,
}
*/

/*-
createViewGeneralDisableState: undefined -> ViewGeneralDisableState
*/
function createViewGeneralDisableState() {
    return {
        allDelaysAreDisabled: {
            global: true,
            value: GlobalState.delay.areAllDisable
        },
        allFiltersAreDisabled: {
            global: true,
            value: GlobalState.filter.areAllDisable
        },
        allPannersAreDisabled: {
            global: true,
            value: GlobalState.panner.areAllDisable
        },
        allPlaybackRatesAreDisabled: {
            global: true,
            value: GlobalState.playbackRate.areAllDisable
        },
        allRandomEndPointsAreDisabled: {
            global: true,
            value: GlobalState.randomEndPoint
        },
        allRandomStartPointsAreDisabled: {
            global: true,
            value: GlobalState.randomStartPoint
        }
    };
}

/*-
@type ViewAppState: {
    _is_started: boolean,
    playAudiosSet: Object<string, undefined>,
    playColor: string
}
*/

/*-
createViewAppState: undefined -> ViewAppState
*/
function createViewAppState() {
    return {
        is_started: false,
        playAudiosSet: {},
        playColor: ""
    };
}

/* -------------------------------------------------------------------------- */
/*                                   EXPORTS                                  */
/* -------------------------------------------------------------------------- */
export {
    createViewAudioListState,
    createViewGeneralDisableState,
    createViewAppState,
    defaultGlobalState,
    GlobalState,
    initGlobalState
};