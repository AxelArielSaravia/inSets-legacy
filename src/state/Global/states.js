import { isInsideInterval } from "../../services/interval/service.js";

/* -------------------------------------------------------------------------- */
/*                               LIMITS OBJECTS                               */
/* -------------------------------------------------------------------------- */
/*-
globalPannerLimits: {
    MAX: 50,
    MIN: -50,
    Z_MIN: 0
}
*/
const globalPannerLimits = Object.create(null);
globalPannerLimits.MAX = 50;
globalPannerLimits.MIN = -50;
globalPannerLimits.Z_MIN = 0;
Object.freeze(globalPannerLimits);

/*-
globalFilterLimits: {
    FREQ_MIN: 40,
    FREQ_MAX:18000,
    Q_MIN: 0.05,
    Q_MAX: 5,
    TYPES: ["lowpass", "highpass", "bandpass", "notch"]
}
*/
const globalFilterLimits = Object.create(null);
globalFilterLimits.FREQ_MAX = 18000; //hz
globalFilterLimits.FREQ_MIN = 40;    //hz
globalFilterLimits.Q_MAX = 10.00;
globalFilterLimits.Q_MIN = 0.1;
globalFilterLimits.TYPES = Object.freeze([
    "lowpass", "highpass", "bandpass", "notch"
]);
Object.freeze(globalFilterLimits);

/*-
globalDelayLimits: {
    FBACK_MAX: 0.9,
    FBACK_MIN: 0.05,
    TIME_MAX: 5,
    TIME_MIN: 0.1
}
*/
const globalDelayLimits = Object.create(null);
globalDelayLimits.FBACK_MAX = 0.90; //gain values
globalDelayLimits.FBACK_MIN = 0.05;
globalDelayLimits.TIME_MAX = 5.0;   //seconds
globalDelayLimits.TIME_MIN = 0.1;
Object.freeze(globalDelayLimits);

/*-
globalPlaybackRateLimits: {
    MIN: 0.5,
    MAX: 2
}
*/
const globalPlaybackRateLimits = Object.create(null);
globalPlaybackRateLimits.MAX = 2.0;
globalPlaybackRateLimits.MIN = 0.5;
Object.freeze(globalPlaybackRateLimits);


/*-
globalTimeIntervalLimits: {
    MIN: 4,
    MAX: 18000
}
*/
const globalTimeIntervalLimits = Object.create(null);
globalTimeIntervalLimits.MAX = 18000; //handreads of miliseconds
globalTimeIntervalLimits.MIN = 5;     //handreads of miliseconds
Object.freeze(globalTimeIntervalLimits);


/*-
globalFadeLimits: {
    MIN: 15,
    MAX: 500
}
*/
const globalFadeLimits = Object.create(null);
globalFadeLimits.MAX = 300; //miliseconds
globalFadeLimits.MIN = 10;  //miliseconds
Object.freeze(globalFadeLimits);

/*-
pannerListener: {
    X: 6,
    Y: 6,
    Z: 6
}
*/
const pannerListener = Object.create(null);
pannerListener.X = 6;
pannerListener.Y = 6;
pannerListener.Z = 1;
Object.freeze(pannerListener);

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
      feedbackMax: 0.85,
      feedbackMin: 0.25,
      timeMax: 4,
      timeMin: 0.4
    }),
    fadeIn: 80,
    fadeOut: 200,
    filter: Object.freeze({
      areAllDisable: false,
      frequencyMax: 10000,
      frequencyMin: 80,
      qMax: 10,
      qMin: 0.1,
      types: Object.freeze(["lowpass", "highpass", "bandpass", "notch"])
    }),
    panner: Object.freeze({
      areAllDisable: false,
      xMax: 30,
      xMin: -30,
      yMax: 30,
      yMin: -30,
      zMax: 50,
      zMin: 0
    }),
    playbackRate: Object.freeze({
        areAllDisable: false,
        max: 1.5,
        min: 0.75
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
        o.areAllDisable = (
            spec.areAllDisable !== undefined
            ? !!spec.areAllDisable
            : defaultGlobalState.delay.areAllDisable
        );
        o.timeMax = (
            spec.timeMax !== undefined
            && isInsideInterval(globalDelayLimits.TIME_MIN, globalDelayLimits.TIME_MAX, spec.timeMax)
            ? spec.timeMax
            : defaultGlobalState.delay.timeMax
        );
        o.timeMin = (
            spec.timeMin !== undefined
            && isInsideInterval(globalDelayLimits.TIME_MIN, o.timeMax, spec.timeMin)
            ? spec.timeMin
            : defaultGlobalState.delay.timeMin
        );
        o.feedbackMax = (
            spec.feedbackMax !== undefined
            && isInsideInterval(globalDelayLimits.FBACK_MIN, globalDelayLimits.FBACK_MAX, spec.feedbackMax)
            ? spec.feedbackMax
            : defaultGlobalState.delay.feedbackMax
        );
        o.feedbackMin = (
            spec.feedbackMin !== undefined
            && isInsideInterval(globalDelayLimits.FBACK_MIN, o.feedbackMax, spec.feedbackMin)
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
        o.areAllDisable = (
            spec.areAllDisable !== undefined
            ? !!spec.areAllDisable
            : defaultGlobalState.filter.areAllDisable
        );
        o.frequencyMax = (
            spec.frequencyMax !== undefined
            && isInsideInterval(globalFilterLimits.FREQ_MIN, globalFilterLimits.FREQ_MAX, spec.frequencyMax)
            ? spec.frequencyMax
            : defaultGlobalState.filter.frequencyMax
        );
        o.frequencyMin = (
            spec.frequencyMin !== undefined
            && isInsideInterval(globalFilterLimits.FREQ_MIN, o.frequencyMax, spec.frequencyMin)
            ? spec.frequencyMin
            : defaultGlobalState.filter.frequencyMin
        );
        o.qMax = (
            spec.qMax
            && isInsideInterval(globalFilterLimits.Q_MIN, globalFilterLimits.Q_MAX, spec.qMax)
            ? spec.qMax
            : defaultGlobalState.filter.qMax
        );
        o.qMin = (
            spec.qMin !== undefined
            && isInsideInterval(globalFilterLimits.Q_MIN, o.qMax, spec.qMin)
            ? spec.qMin
            : defaultGlobalState.filter.qMin
        );
        if (spec.types !== undefined && Array.isArray(spec.types)) {
            const arr = spec.types.filter(el => /lowpass|highpass|bandpass|notch/.test(el));
            o.types = arr.length === 0 ? globalFilterLimits.TYPES : arr;
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
        o.areAllDisable = (
            spec.areAllDisable !== undefined
            ? !!spec.areAllDisable
            : defaultGlobalState.panner.areAllDisable
        );
        o.xMax = (
            spec.xMax !== undefined
            && isInsideInterval(globalPannerLimits.MIN, globalPannerLimits.MAX, spec.xMax)
            ? spec.xMax
            : defaultGlobalState.panner.xMax
        );
        o.xMin = (
            spec.xMin !== undefined
            && isInsideInterval(globalPannerLimits.MIN, o.xMax, spec.xMin)
            ? spec.xMin
            : defaultGlobalState.panner.xMin
        );
        o.yMax = (
            spec.yMax !== undefined
            && isInsideInterval(globalPannerLimits.MIN, globalPannerLimits.MAX, spec.yMax)
            ? spec.yMax
            : defaultGlobalState.panner.yMax
        );
        o.yMin = (
            spec.yMin !== undefined
            && isInsideInterval(globalPannerLimits.MIN, o.yMax, spec.yMin)
            ? spec.yMin
            : defaultGlobalState.panner.yMin
        );
        o.zMax = (
            spec.zMax !== undefined
            && isInsideInterval(globalPannerLimits.Z_MIN, globalPannerLimits.MAX, spec.zMax)
            ? spec.zMax
            : defaultGlobalState.panner.zMax
        );
        o.zMin =(
            spec.zMin !== undefined
            && isInsideInterval(globalPannerLimits.Z_MIN, o.zMax, spec.zMin)
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
        o.areAllDisable = (
            spec.areAllDisable !== undefined
            ? !!spec.areAllDisable
            : defaultGlobalState.playbackRate.areAllDisable
        );
        o.max = (
            spec.max !== undefined
            && isInsideInterval(globalPlaybackRateLimits.MIN, globalPlaybackRateLimits.MAX, spec.max)
            ? spec.max
            : defaultGlobalState.playbackRate.max
        );
        o.min = (
            spec.min !== undefined
            && isInsideInterval(globalPlaybackRateLimits.MIN, o.max, spec.min)
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
        o.min = (
            spec.min !== undefined
            && isInsideInterval(globalTimeIntervalLimits.MIN, globalTimeIntervalLimits.MAX,spec.min)
            ? spec.min
            : defaultGlobalState.timeInterval.min
        );
        o.max = (
            spec.max !== undefined
            && isInsideInterval(o.min, globalTimeIntervalLimits.MAX, spec.max)
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
    const fadeTime = (
        Number.isInteger(num)
        && isInsideInterval(globalFadeLimits.MIN, globalFadeLimits.MAX, num)
        ? num
        : 150//default
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
    c._audio_context = undefined;
    c._audio_list = new Map();
    c._started_id = "";
    c._is_started = false; //default
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
        GlobalState.playbackRate = createGlobalPlaybackRate(localStorageState.playbackRate);
    }
    if (localStorageState.randomEndPoint !== undefined) {
        GlobalState.randomEndPoint = createGlobalRandomPoint(localStorageState.randomEndPoint);
    }
    if (localStorageState.randomStartPoint !== undefined) {
        GlobalState.randomStartPoint = createGlobalRandomPoint(localStorageState.randomStartPoint);
    }
    if (localStorageState.timeInterval !== undefined) {
        GlobalState.timeInterval = createGlobalTimeInteval(localStorageState.timeInterval);
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
        loadedAudioListSize: 0,
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
            value: GlobalState.delay.areAllDisable,
            global: true
        },
        allFiltersAreDisabled: {
            value: GlobalState.filter.areAllDisable,
            global: true
        },
        allPannersAreDisabled: {
            value: GlobalState.panner.areAllDisable,
            global: true
        },
        allPlaybackRatesAreDisabled: {
            value: GlobalState.playbackRate.areAllDisable,
            global: true
        },
        allRandomEndPointsAreDisabled: {
            value: GlobalState.randomEndPoint,
            global: true
        },
        allRandomStartPointsAreDisabled: {
            value: GlobalState.randomStartPoint,
            global: true
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
        _is_started: false,
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
    globalDelayLimits,
    globalFadeLimits,
    globalFilterLimits,
    globalPannerLimits,
    globalPlaybackRateLimits,
    globalTimeIntervalLimits,
    pannerListener,
    GlobalState,
    initGlobalState
};