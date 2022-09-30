import { isInsideInterval } from "../../services/interval/service.js";


/* -------------------------------------------------------------------------- */
/*                               LIMITS OBJECTS                               */
/* -------------------------------------------------------------------------- */
/** @type {{MAX: 50, MIN: -50}} */
const globalPannerLimits = {
    MAX: 50,
    MIN: -50,
    Z_MIN: 0,
}
Object.freeze(globalPannerLimits);

/** @type {{FREQ_MIN: 40, FREQ_MAX:18000, Q_MIN: 0.05, Q_MAX: 5, TYPES: ["lowpass", "highpass", "bandpass", "notch"]}} */
const globalFilterLimits = {
    FREQ_MIN: 40,
    FREQ_MAX: 18000,
    Q_MIN: 0.1,
    Q_MAX: 10.00,
    TYPES: ["lowpass", "highpass", "bandpass", "notch"]
}
Object.freeze(globalFilterLimits);

/** @type {{TIME_MIN: 0.1, TIME_MAX: 5, FBACK_MIN: 0.05, FBACK_MAX: 0.9}}*/
const globalDelayLimits = {
    TIME_MIN: 0.1,
    TIME_MAX: 5.0,
    FBACK_MIN: 0.05,
    FBACK_MAX: 0.90
}
Object.freeze(globalDelayLimits);

/** @type {{MIN: 0.5, MAX: 2}} */
const globalPlaybackRateLimits = {
    MIN: 0.5,
    MAX: 2.0
}
Object.freeze(globalPlaybackRateLimits);

/** Values are in handread of miliseconds
 * @type {{MIN: 4, MAX: 18000}} */
const globalTimeIntervalLimits = {
    MIN: 4,
    MAX: 18000
}
Object.freeze(globalTimeIntervalLimits);

/** Values are in miliseconds
 * @type {{MIN: 15, MAX: 500}} */
const globalFadeLimits = {
    MIN: 15,
    MAX: 500
}
Object.freeze(globalFadeLimits);

/** @type {{X: 6, Y: 6, Z: 6}} */
const pannerListener = {
    X: 6,
    Y: 6,
    Z: 1
}
Object.freeze(pannerListener);

/* -------------------------------------------------------------------------- */
/*                            DEFAULT GLOBAL STATE                            */
/* -------------------------------------------------------------------------- */
/**
 * @typedef {{
 *  delay: GlobalDelay,
 *  fadeTime: number,
 *  filter: GlobalFilter,
 *  panner: GlobalPanner,
 *  playbackRate: GlobalPlaybackRate,
 *  randomEndPoint: boolean,
 *  randomStartPoint: boolean,
 *  timeInterval: GlobalTimeInterval
 * }} ElementsState
 */

/**@type {ElementsState} */
const defaultGlobalState = {
    "delay": {
      "areAllDisable": false,
      "timeMin": 0.4,
      "timeMax": 4,
      "feedbackMin": 0.25, 
      "feedbackMax": 0.85
    },
    "fadeIn": 80,
    "fadeOut": 190,
    "filter": {
      "areAllDisable": false,
      "frequencyMin": 80, 
      "frequencyMax": 10000,
      "qMin": 0.1,
      "qMax": 10,
      "types": ["lowpass", "highpass", "bandpass", "notch"] 
    },
    "panner": {
      "areAllDisable": false,
      "xMin": -30, 
      "xMax": 30,
      "yMin": -30, 
      "yMax": 30,
      "zMin": 0, 
      "zMax": 50
    },
    "playbackRate": {
      "areAllDisable": false,
      "min": 0.75, 
      "max": 1.5
    },
    "randomStartPoint": false,
    "randomEndPoint": false,
    "timeInterval":{
      "min": 8, 
      "max": 50
    }
}
Object.freeze(defaultGlobalState);

/* -------------------------------------------------------------------------- */
/*                               ELEMENTS STATES                              */
/* -------------------------------------------------------------------------- */
/**
 * @typedef {{
 *  areAllDisable: boolean,
 *  timeMin: number,
 *  timeMax: number,
 *  feedbackMin: number,
 *  feedbackMax: number
 * }} GlobalDelay
 * 
 * @typedef {{
 *  areAllDisable?: boolean,
 *  timeMin?: number, 
 *  timeMax?: number,
 *  feedbackMin?: number,
 *  feedbackMax?: number
 * }} delay
 */

/**
 * Time values are in seconds
 * Feedback is a gain value
 * @param {delay} obj 
 * @returns {GlobalDelay}
 */
const createGlobalDelayState = (obj) => {
    /** @type {GlobalDelay} */
    const o = {}
    
    if (typeof obj === "object" && obj !== null) {
        o.areAllDisable = obj.hasOwnProperty("areAllDisable")
            ? !!obj.areAllDisable 
            : defaultGlobalState.delay.areAllDisable;

        o.timeMin = obj.hasOwnProperty("timeMin") && isInsideInterval(globalDelayLimits.TIME_MIN, globalDelayLimits.TIME_MAX, obj.timeMin) 
            ? obj.timeMin 
            : defaultGlobalState.delay.timeMin;
        
        o.timeMax = obj.hasOwnProperty("timeMax") && isInsideInterval(o.timeMin, globalDelayLimits.TIME_MAX, obj.timeMax)
            ? obj.timeMax
            : defaultGlobalState.delay.timeMax;
    
        o.feedbackMin = obj.hasOwnProperty("feedbackMin") && isInsideInterval(globalDelayLimits.FBACK_MIN, globalDelayLimits.FBACK_MAX, obj.feedbackMin)
            ? obj.feedbackMin
            : defaultGlobalState.delay.feedbackMin;

        o.feedbackMax = obj.hasOwnProperty("feedbackMax") && isInsideInterval(o.feedbackMin, globalDelayLimits.FBACK_MAX, obj.feedbackMax)
            ? obj.feedbackMax
            : defaultGlobalState.delay.feedbackMax;
    } else {
        o.areAllDisable = defaultGlobalState.delay.areAllDisable;
        o.timeMin = defaultGlobalState.delay.timeMin;
        o.timeMax = defaultGlobalState.delay.timeMax;
        o.feedbackMin = defaultGlobalState.delay.feedbackMin;
        o.feedbackMax = defaultGlobalState.delay.feedbackMax;
    }
    return o;
}

/** 
 * @typedef {{
 *  areAllDisable: boolean,
 *  frequencyMin: number,
 *  frequencyMax: number,
 *  qMin: number,
 *  qMax: number,
 *  types: ["lowpass"?, "highpass"?, "bandpass"?, "notch"?]
 * }} GlobalFilter
 * 
 * @typedef {{
 *  areAllDisable?: boolean,
 *  frequencyMin?: number,
 *  frequencyMax?: number,
 *  qMin?: number,
 *  qMax?: number,
 *  types?: ["lowpass"?, "highpass"?, "bandpass"?, "notch"?]
 * }} filter
 */

/**
 * @param {filter} obj 
 * @returns {GlobalFilter}
 */
const createGlobalFilterState = (obj) => {
    /** @type {GlobalFilter} */
    const o = {};

    if (typeof obj === "object" && obj !== null) {
        o.areAllDisable = obj.hasOwnProperty("areAllDisable")
            ? !!obj.areAllDisable 
            : defaultGlobalState.filter.areAllDisable;

        o.frequencyMin = obj.hasOwnProperty("frequencyMin") && isInsideInterval(globalFilterLimits.FREQ_MIN, globalFilterLimits.FREQ_MAX, obj.frequencyMin)
            ? obj.frequencyMin 
            : defaultGlobalState.filter.frequencyMin;

        o.frequencyMax = obj.hasOwnProperty("frequencyMax") && isInsideInterval(o.frequencyMin, globalFilterLimits.FREQ_MAX, obj.frequencyMax)
            ? obj.frequencyMax 
            : defaultGlobalState.filter.frequencyMax;

        o.qMin = obj.hasOwnProperty("qMin") && isInsideInterval(globalFilterLimits.Q_MIN, globalFilterLimits.Q_MAX, obj.qMin)
            ? obj.qMin 
            : defaultGlobalState.filter.qMin;

        o.qMax = obj.hasOwnProperty("qMax") && isInsideInterval(o.qMin, globalFilterLimits.Q_MAX, obj.qMax)
            ? obj.qMax 
            : defaultGlobalState.filter.qMax;

        if (obj.hasOwnProperty("types") && Array.isArray(obj.types)) {
            const arr = obj.types.filter(el => /lowpass|highpass|bandpass|notch/.test(el));
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

/**
 * @typedef {{
 *  areAllDisable: boolean,
 *  xMin: number,
 *  xMax: number,
 *  yMin: number,
 *  yMax: number,
 *  yMin: number,
 *  zMax: number,
 *  zMin: number
 * }} GlobalPanner
 * 
 * @typedef {{
 *  areAllDisable?: boolean,
 *  xMin?: number,
 *  xMax?: number,
 *  yMin?: number,
 *  yMax?: number,
 *  zMin?: number,
 *  zMax?: number
 * }} panner
 */

/**
 * @param {panner} obj 
 * @returns {GlobalPanner}
 */
const createGlobalPannerState = (obj) => {
    /** @type {GlobalPanner} */
    const o = {};

    if (typeof obj === "object" && obj !== null) {
        o.areAllDisable = obj.hasOwnProperty("areAllDisable")
            ? !!obj.areAllDisable 
            : defaultGlobalState.panner.areAllDisable;

        o.xMin = obj.hasOwnProperty("xMin") && isInsideInterval(globalPannerLimits.MIN, globalPannerLimits.MAX, obj.xMin)
            ? obj.xMin 
            : defaultGlobalState.panner.xMin;
            
        o.xMax = obj.hasOwnProperty("xMax") && isInsideInterval(o.xMin, globalPannerLimits.MAX, obj.xMax)
            ? obj.xMax 
            : defaultGlobalState.panner.xMax;

        o.yMin = obj.hasOwnProperty("yMin") && isInsideInterval(globalPannerLimits.MIN, globalPannerLimits.MAX, obj.yMin)
            ? obj.yMin 
            : defaultGlobalState.panner.yMin;

        o.yMax = obj.hasOwnProperty("yMax") && isInsideInterval(o.yMin, globalPannerLimits.MAX, obj.yMax)
            ? obj.yMax 
            : defaultGlobalState.panner.yMax;

        o.zMin = obj.hasOwnProperty("zMin") && isInsideInterval(globalPannerLimits.Z_MIN, globalPannerLimits.MAX, obj.zMin)
            ? obj.zMin 
            : defaultGlobalState.panner.zMin;

        o.zMax = obj.hasOwnProperty("zMax") && isInsideInterval(o.zMin, globalPannerLimits.MAX, obj.zMax)
            ? obj.zMax 
            : defaultGlobalState.panner.zMax;
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

/**
 * @typedef {{
 *  areAllDisable: boolean,
 *  min: number,
 *  max: number
 * }} GlobalPlaybackRate
 * 
 * @typedef {{
 *  areAllDisable?: boolean,
 *  min?: number,
 *  max?: number
 * }} playbackRate
 */

/**
 * @param {playbackRate} obj 
 * @returns {GlobalPlaybackRate}
 */
const createGlobalPlaybackRateState = (obj) => {
    /** @type {GlobalPlaybackRate} */
    const o = {};

    if (typeof obj === "object" && obj !== null) {
        o.areAllDisable = obj.hasOwnProperty("areAllDisable")
            ? !!obj.areAllDisable 
            : defaultGlobalState.playbackRate.areAllDisable;
        o.min = obj.hasOwnProperty("min") && isInsideInterval(globalPlaybackRateLimits.MIN, globalPlaybackRateLimits.MAX, obj.min) 
            ? obj.min 
            : defaultGlobalState.playbackRate.min;
        o.max = obj.hasOwnProperty("min") && isInsideInterval(o.min, globalPlaybackRateLimits.MAX, obj.max) 
            ? obj.max 
            : defaultGlobalState.playbackRate.max;
    } else {
        o.areAllDisable = defaultGlobalState.playbackRate.areAllDisable;
        o.min = defaultGlobalState.playbackRate.min;
        o.max = defaultGlobalState.playbackRate.max;
    }
    return o;
}

/**
 * @typedef {{
 *  min: number, 
 *  max: number
 * }} GlobalTimeInterval
 * 
 * @typedef {{
 *  min?: number, 
 *  max?: number
 * }} timeInterval
 */

/**
 * Values are in miliseconds
 * @param {timeInterval} obj 
 * @returns {GlobalTimeInterval}
 */
const createGlobalTimeintevalState = (obj) => {
    /** @type {GlobalTimeInterval} */
    const o = {}
    if (typeof obj === "object" && obj !== null) {
        o.min = obj.hasOwnProperty("min") && isInsideInterval(globalTimeIntervalLimits.MIN, globalTimeIntervalLimits.MAX,obj.min)
            ? obj.min
            : defaultGlobalState.timeInterval.min;
        o.max = obj.hasOwnProperty("max") && isInsideInterval(o.min, globalTimeIntervalLimits.MAX, obj.max)
            ? obj.max
            : defaultGlobalState.timeInterval.max;
    } else {
        o.min = defaultGlobalState.timeInterval.min;
        o.max = defaultGlobalState.timeInterval.max;
    }
    return o;
}

/**
 * @param {boolean} bool 
 * @returns {boolean}
 */
const createGlobalRandomPoint = (bool) => {
    return typeof bool === "boolean" ? bool : defaultGlobalState.randomStartPoint;
}

/**
 * @param {number} num
 * @returns {number}
 */
const createGlobalFadeValue = (num) => {
    /**@type {number}*/
    const fadeTime = Number.isInteger(num) && isInsideInterval(globalFadeLimits.MIN, globalFadeLimits.MAX, num) 
        ? num
        : 150;//default
    return fadeTime;
}

/**
 * @typedef {{
 *  arrOfEvents: number[],
 *  sumOfAllEvents: number
 * }} EventsForEachSet
 */
/** @returns {EventsForEachSet} */
const createEventOfEachSet = () => ({
    arrOfEvents: [1],
    sumOfAllEvents: 1
})

/* -------------------------------------------------------------------------- */
/*                                GLOBAL STATE                                */
/* -------------------------------------------------------------------------- */
/**
 * @type {{
 *  readonly hasAudios: boolean,
 *  _audio_context: null | AudioContext,
 *  _audio_list: Map<string, AudioState>,
 *  _is_started: boolean,
 *  _started_id: string,
 *  delay: GlobalDelay,
 *  eventsForEachSet: EventsForEachSet,
 *  fadeIn: number,
 *  fadeOut: number,
 *  filter: GlobalFilter,
 *  panner: GlobalPanner,
 *  playbackRate: GlobalPlaybackRate,
 *  randomEndTime: boolean,
 *  randomStartTime: boolean,
 *  timeInterval: GlobalTimeInterval
 * }}
 */
const GlobalState = {
    get hasAudios() { return this.AUDIO_LIST.size !== 0 },
    _audio_context: null,
    _audio_list: new Map(),
    _started_id : "",
    _is_started: false, //default
    delay: createGlobalDelayState(),
    eventsForEachSet: createEventOfEachSet(),
    fadeIn: createGlobalFadeValue(),
    fadeOut: createGlobalFadeValue(),
    filter: createGlobalFilterState(),
    panner: createGlobalPannerState(),
    playbackRate: createGlobalPlaybackRateState(),
    randomEndPoint: createGlobalRandomPoint(),
    randomStartPoint: createGlobalRandomPoint(),
    timeInterval: createGlobalTimeintevalState(),
}

Object.seal(GlobalState);


/**
 * @param {ElementsState} ElementsState
 */
const initGlobalState = (ElementsState) => {
    if (typeof ElementsState !== "object" || ElementsState === null) return;
    if (ElementsState.hasOwnProperty("delay"))
        GlobalState.delay = createGlobalDelayState(ElementsState.delay);
    if (ElementsState.hasOwnProperty("fadeIn"))
        GlobalState.fadeIn = createGlobalFadeValue(ElementsState.fadeIn);
    if (ElementsState.hasOwnProperty("fadeOut"))
        GlobalState.fadeOut = createGlobalFadeValue(ElementsState.fadeOut);
    if (ElementsState.hasOwnProperty("filter"))
        GlobalState.filter = createGlobalFilterState(ElementsState.filter);
    if (ElementsState.hasOwnProperty("panner"))
        GlobalState.panner = createGlobalPannerState(ElementsState.panner);
    if (ElementsState.hasOwnProperty("playbackRate"))
        GlobalState.playbackRate = createGlobalPlaybackRateState(ElementsState.playbackRate);
    if (ElementsState.hasOwnProperty("randomEndPoint"))
        GlobalState.randomEndPoint = createGlobalRandomPoint(ElementsState.randomEndPoint);
    if (ElementsState.hasOwnProperty("randomStartPoint"))
        GlobalState.randomStartPoint = createGlobalRandomPoint(ElementsState.randomStartPoint);
    if (ElementsState.hasOwnProperty("timeInterval"))
        GlobalState.timeInterval = createGlobalTimeintevalState(ElementsState.timeInterval);
    return; 
}


/* -------------------------------------------------------------------------- */
/*                             VIEW GENERAL STATE                             */
/* -------------------------------------------------------------------------- */
/** 
 * @typedef {{
 *  value: boolean
 *  global: boolean
 * }} ViewDisableState
 */

/**
 * @typedef {{
 *  completedAudioList: Object<string, null>,
 *  completedAudioListSize: number,
 *  loadingAudioList: Object<string, null>,
 *  loadingAudioListSize: number,
 *  sumOfAllEvents: number
 * }} ViewAudioListState
 */

/** @return {ViewAudioListState} */
const createViewAudioListState = () => ({
    completedAudioList: {},
    completedAudioListSize: 0,
    loadedAudioList: {},
    loadedAudioListSize: 0,
})

/** 
 * @typedef {{
 *  value: boolean
 *  global: boolean
 * }} ViewDisableState
 */

/**
 * @typedef {{
 *  allDelaysAreDisabled: ViewDisableState,
 *  allFiltersAreDisabled: ViewDisableState,
 *  allPannersAreDisabled: ViewDisableState,
 *  allPlaybackRatesAreDisabled: ViewDisableState,
 *  allRandomEndPointsAreDisabled: ViewDisableState,
 *  allRandomStartPointsAreDisabled: ViewDisableState,
 * }} ViewGeneralDisableState
 */

/**  @return {ViewGeneralDisableState} */
 const createViewGeneralDisableState = () => ({
    allDelaysAreDisabled: { value: GlobalState.delay.areAllDisable, global: true },
    allFiltersAreDisabled: { value: GlobalState.filter.areAllDisable, global: true },
    allPannersAreDisabled: { value: GlobalState.panner.areAllDisable, global: true },
    allPlaybackRatesAreDisabled: { value: GlobalState.playbackRate.areAllDisable, global: true },
    allRandomEndPointsAreDisabled: { value: GlobalState.randomEndPoint, global: true },
    allRandomStartPointsAreDisabled:{ value: GlobalState.randomStartPoint, global: true },
})

/**
 * @typedef {{
 *  _is_started: boolean,
 *  playAudiosSet: Object<string, null>,
 *  playColor: string
 * }} ViewAppState
 */

/** @return {ViewAppState} */
const createViewAppState = () => ({
    _is_started: false,
    playAudiosSet: {},
    playColor: ""
});

/* -------------------------------------------------------------------------- */
/*                                   EXPORTS                                  */
/* -------------------------------------------------------------------------- */
export {
    globalDelayLimits,
    globalFadeLimits,
    globalFilterLimits,
    globalPannerLimits,
    globalPlaybackRateLimits,
    globalTimeIntervalLimits,
    pannerListener,
    GlobalState,
    initGlobalState,
    defaultGlobalState,
    createViewAudioListState,
    createViewGeneralDisableState,
    createViewAppState
};