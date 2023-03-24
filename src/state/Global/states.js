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
LocalStorageState :: {
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
    fadeIn: 2,
    fadeOut: 5,
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
        min: 8  //handreads of miliseconds
    })
});

/* -------------------------------------------------------------------------- */
/*                               ELEMENTS STATES                              */
/* -------------------------------------------------------------------------- */
/*-
GlobalDelay :: {
    areAllDisable: boolean,
    timeMin: number,
    timeMax: number,
    feedbackMin: number,
    feedbackMax: number
}
*/
/*-
MaybeDelay :: Maybe<GlobalDelay>
*/
/*-
-- Time values are in seconds
-- Feedback is a gain value
createGlobalDelay :: (MaybeDelay | undefined) -> GlobalDelay
*/
function createGlobalDelay(spec) {
    if (typeof spec === "object") {
        const limits = delayLimits;
        const areAllDisable = (
            spec.areAllDisable !== undefined
            ? spec.areAllDisable
            : defaultGlobalState.delay.areAllDisable
        );
        const timeMax = (
            isInsideInterval(limits.TIME_MIN, limits.TIME_MAX, spec?.timeMax)
            ? spec.timeMax
            : defaultGlobalState.delay.timeMax
        );
        const timeMin = (
            isInsideInterval(limits.TIME_MIN, timeMax, spec?.timeMin)
            ? spec.timeMin
            : defaultGlobalState.delay.timeMin
        );
        const feedbackMax = (
            isInsideInterval(limits.FBACK_MIN, limits.FBACK_MAX, spec?.feedbackMax)
            ? spec.feedbackMax
            : defaultGlobalState.delay.feedbackMax
        );
        const feedbackMin = (
            isInsideInterval(limits.FBACK_MIN, feedbackMax, spec?.feedbackMin)
            ? spec.feedbackMin
            : defaultGlobalState.delay.feedbackMin
        );
        return Object.seal({
            areAllDisable,
            timeMax,
            timeMin,
            feedbackMax,
            feedbackMin
        });
    } else {
        return Object.seal({
            areAllDisable: defaultGlobalState.delay.areAllDisable,
            timeMin: defaultGlobalState.delay.timeMin,
            timeMax: defaultGlobalState.delay.timeMax,
            feedbackMin: defaultGlobalState.delay.feedbackMin,
            feedbackMax: defaultGlobalState.delay.feedbackMax
        });
    }
}

/*-
GlobalFilter :: {
    areAllDisable: boolean,
    frequencyMax: number,
    frequencyMin: number,
    qMax: number,
    qMin: number,
    types: ["lowpass"?, "highpass"?, "bandpass"?, "notch"?]
}
*/
/*-
MaybeFilter :: Maybe<GlobalFilter>
*/
/*-
createGlobalFilter :: (MaybeFilter | undefined) -> GlobalFilter
*/
function createGlobalFilter(spec) {
    if (typeof spec === "object") {
        const limits = filterLimits;
        let arr = [];
        if (Array.isArray(spec?.types)) {
            arr = spec.types.filter((el) => (/lowpass|highpass|bandpass|notch/).test(el));
        }
        const areAllDisable = (
            spec?.areAllDisable !== undefined
            ? spec.areAllDisable
            : defaultGlobalState.filter.areAllDisable
        );
        const frequencyMax = (
            isInsideInterval(limits.FREQ_MIN, limits.FREQ_MAX, spec?.frequencyMax)
            ? spec.frequencyMax
            : defaultGlobalState.filter.frequencyMax
        );
        const frequencyMin = (
            isInsideInterval(limits.FREQ_MIN, frequencyMax, spec?.frequencyMin)
            ? spec.frequencyMin
            : defaultGlobalState.filter.frequencyMin
        );
        const qMax = (
            isInsideInterval(limits.Q_MIN, limits.Q_MAX, spec?.qMax)
            ? spec.qMax
            : defaultGlobalState.filter.qMax
        );
        const qMin = (
            isInsideInterval(limits.Q_MIN, qMax, spec?.qMin)
            ? spec.qMin
            : defaultGlobalState.filter.qMin
        );
        const types = (
            arr.length === 0
            ? defaultGlobalState.filter.types
            : arr
        );
        return Object.seal({
            areAllDisable,
            frequencyMax,
            frequencyMin,
            qMax,
            qMin,
            types
        });
    } else {
        return Object.seal({
            areAllDisable: defaultGlobalState.filter.areAllDisable,
            frequencyMin: defaultGlobalState.filter.frequencyMin,
            frequencyMax: defaultGlobalState.filter.frequencyMax,
            qMin: defaultGlobalState.filter.qMin,
            qMax: defaultGlobalState.filter.qMax,
            types: defaultGlobalState.filter.types
        });
    }
}

/*-
GlobalPanner :: {
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
MaybePanner :: Maybe<GlobalPanner>
*/
/*-
createGlobalPanner :: (MaybePanner | undefined) -> GlobalPanner
*/
function createGlobalPanner(spec) {
    if (typeof spec === "object") {
        const limits = pannerLimits;
        const areAllDisable = (
            spec?.areAllDisable !== undefined
            ? spec.areAllDisable
            : defaultGlobalState.panner.areAllDisable
        );
        const xMax = (
            isInsideInterval(limits.MIN, limits.MAX, spec?.xMax)
            ? spec.xMax
            : defaultGlobalState.panner.xMax
        );
        const xMin = (
            isInsideInterval(limits.MIN, xMax, spec?.xMin)
            ? spec.xMin
            : defaultGlobalState.panner.xMin
        );
        const yMax = (
            isInsideInterval(limits.MIN, limits.MAX, spec?.yMax)
            ? spec.yMax
            : defaultGlobalState.panner.yMax
        );
        const yMin = (
            isInsideInterval(limits.MIN, yMax, spec?.yMin)
            ? spec.yMin
            : defaultGlobalState.panner.yMin
        );
        const zMax = (
            isInsideInterval(limits.MIN, limits.Z_MAX, spec?.zMax)
            ? spec.zMax
            : defaultGlobalState.panner.zMax
        );
        const zMin = (
            isInsideInterval(limits.MIN, zMax, spec?.zMin)
            ? spec.zMin
            : defaultGlobalState.panner.zMin
        );
        return Object.seal({
            areAllDisable,
            xMax,
            xMin,
            yMax,
            yMin,
            zMax,
            zMin
        });
    } else {
        return Object.seal({
            areAllDisable: defaultGlobalState.panner.areAllDisable,
            xMin: defaultGlobalState.panner.xMin,
            xMax: defaultGlobalState.panner.xMax,
            yMin: defaultGlobalState.panner.yMin,
            yMax: defaultGlobalState.panner.yMax,
            zMin: defaultGlobalState.panner.zMin,
            zMax: defaultGlobalState.panner.zMax
        });
    }
}

/*-
GlobalPlaybackRate :: {
    areAllDisable: boolean,
    max: number,
    min: number
}
*/
/*-
MaybePlaybackRate :: Maybe<GlobalPlaybackRate>
*/
/*-
createGlobalPlaybackRate :: (MaybePlaybackRate | undefined) -> GlobalPlaybackRate
*/
function createGlobalPlaybackRate(spec) {
    if (typeof spec === "object") {
        const limits = playbackRateLimits;
        const areAllDisable = (
            spec.areAllDisable !== undefined
            ? spec.areAllDisable
            : defaultGlobalState.playbackRate.areAllDisable
        );
        const max = (
            isInsideInterval(limits.MIN, limits.MAX, spec?.max)
            ? spec.max
            : defaultGlobalState.playbackRate.max
        );
        const min = (
            isInsideInterval(limits.MIN, max, spec?.min)
            ? spec.min
            : defaultGlobalState.playbackRate.min
        );
        return Object.seal({
            areAllDisable,
            max,
            min
        });
    } else {
        return Object.seal({
            areAllDisable: defaultGlobalState.playbackRate.areAllDisable,
            min: defaultGlobalState.playbackRate.min,
            max: defaultGlobalState.playbackRate.max
        });
    }
}

/*-
GlobalTimeInterval :: {
    min: number,
    max: number
}
*/
/*-
MaybeTimeInterval :: Maybe<GlobalTimeInterval>
*/
/*-
-- Values are in miliseconds
createGlobalTimeInteval :: (MaybeTimeInterval | undefined) -> GlobalTimeInterval
*/
function createGlobalTimeInteval(spec) {
    if (typeof spec === "object") {
        const limits = timeIntervalLimits;
        const min = (
            isInsideInterval(limits.MIN, limits.MAX, spec?.min)
            ? spec.min
            : defaultGlobalState.timeInterval.min
        );
        const max = (
            isInsideInterval(min, limits.MAX, spec?.max)
            ? spec.max
            : defaultGlobalState.timeInterval.max
        );
        return Object.seal({
            min,
            max
        });
    } else {
        return Object.seal({
            min: defaultGlobalState.timeInterval.min,
            max: defaultGlobalState.timeInterval.max
        });
    }
}

/*-
createGlobalRandomPoint :: (boolean | undefined) -> boolean
*/
function createGlobalRandomPoint(bool) {
    return (
        typeof bool === "boolean"
        ? bool
        : defaultGlobalState.randomStartPoint
    );
}

/*-
createGlobalFadeValue :: (number | undefined) -> number
*/
function createGlobalFadeValue(num, default_num) {
    const limits = fadeLimits;
    return (
        isInsideInterval(limits.MIN, limits.MAX, num)
        ? num
        : default_num
    );
}

/*-
EventsForEachSet :: {
    arrOfEvents: Array<number>,
    sumOfAllEvents: number
}
*/
/*-
createEventOfEachSet :: () -> EventsForEachSet
*/
function createEventOfEachSet() {
    return Object.seal({
        arrOfEvents: [1],
        sumOfAllEvents: 1
    });
}

/* -------------------------------------------------------------------------- */
/*                                GLOBAL STATE                                */
/* -------------------------------------------------------------------------- */
/*-
GlobalState :: {
    ...LocalStorageState,
    _audio_context: undefined | AudioContext,
    _audio_list: Map<string, AudioState>,
    _is_started: boolean,
    _started_id: string,
    eventsForEachSet: EventsForEachSet
}
*/


/*-
initGlobalState :: (GlobalState, LocalStorageState) -> undefined
*/
function initGlobalState(localStorageState, globalState) {
    globalState.delay = createGlobalDelay(localStorageState?.delay);
    globalState.filter = createGlobalFilter(localStorageState?.filter);
    globalState.panner = createGlobalPanner(localStorageState?.panner);
    globalState.playbackRate = (
        createGlobalPlaybackRate(localStorageState?.playbackRate)
    );
    globalState.randomEndPoint = (
        createGlobalRandomPoint(localStorageState?.randomEndPoint)
    );
    globalState.randomStartPoint = (
        createGlobalRandomPoint(localStorageState?.randomStartPoint)
    );
    globalState.timeInterval = (
        createGlobalTimeInteval(localStorageState?.timeInterval)
    );
    globalState.fadeIn = createGlobalFadeValue(
        localStorageState?.fadeIn,
        defaultGlobalState.fadeIn
    );
    globalState.fadeOut = createGlobalFadeValue(
        localStorageState?.fadeOut,
        defaultGlobalState.fadeOut
    );
}

/*-
GlobalState: GlobalState
*/
const GlobalState = Object.seal({
    audio_context: undefined,
    audio_list: new Map(),
    started_id: "",
    is_started: false,
    delay: createGlobalDelay(),
    eventsForEachSet: createEventOfEachSet(),
    fadeIn: 0,
    fadeOut: 0,
    filter: createGlobalFilter(),
    panner: createGlobalPanner(),
    playbackRate: createGlobalPlaybackRate(),
    randomEndPoint: true,
    randomStartPoint: true,
    sumOfAllAudiosEvents: 0,
    timeInterval: {}
});

/* -------------------------------------------------------------------------- */
/*                                   EXPORTS                                  */
/* -------------------------------------------------------------------------- */
export {
    defaultGlobalState,
    GlobalState,
    initGlobalState
};