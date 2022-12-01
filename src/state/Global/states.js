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
const defaultGlobalState = (function (o) {
    o.delay = (function (delay) {
        delay.areAllDisable = false;
        delay.feedbackMax = 16;
        delay.feedbackMin = 4;
        delay.timeMax = 39;
        delay.timeMin = 3;
        return Object.freeze(delay);
    }(Object.create(null)));
    o.fadeIn = 7;
    o.fadeOut = 19;
    o.filter = (function (filter) {
        filter.areAllDisable = false;
        filter.frequencyMax = 240;
        filter.frequencyMin = 40;
        filter.qMax = 36;
        filter.qMin = 0;
        filter.types = Object.freeze(["lowpass", "highpass", "bandpass", "notch"]);
        return Object.freeze(filter);
    }(Object.create(null)));
    Object.freeze({
    });
    o.panner = (function (panner) {
        panner.areAllDisable = false;
        panner.xMax = 80;
        panner.xMin = 20;
        panner.yMax = 80;
        panner.yMin = 20;
        panner.zMax = 50;
        panner.zMin = 0;
        return Object.freeze(panner);
    }(Object.create(null)));
    o.playbackRate = (function (playbackRate) {
        playbackRate.areAllDisable = false;
        playbackRate.max = 15;
        playbackRate.min = 5;
        return Object.freeze(playbackRate);
    }(Object.create(null)));
    o.randomEndPoint = false;
    o.randomStartPoint = false;
    o.timeInterval = (function (timeInterval) {
        timeInterval.max = 50;  //handreads of miliseconds
        timeInterval.min = 8;   //handreads of miliseconds
        return Object.freeze(timeInterval);
    }(Object.create(null)));
    return Object.freeze(o);
}(Object.create(null)));

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
    return (function (o) {
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
        return Object.seal(o);
    }(Object.create(null)));
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
    return (function (o) {
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
        return Object.seal(o);
    }(Object.create(null)));
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
    return (function (o) {
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
        return Object.seal(o);
    }(Object.create(null)));
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
    return (function (o) {
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
        return Object.freeze(o);
    }(Object.create(null)));
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
    return (function (o) {
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
        return Object.seal(o);
    }(Object.create(null)));
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
    return (function (o) {
        o.arrOfEvents = [1];
        o.sumOfAllEvents = 1;
        return Object.seal(o);
    }(Object.create(null)));
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
    return (function (o) {
        o.audio_context = undefined;
        o.audio_list = new Map();
        o.started_id = "";
        o.is_started = false; //default
        o.delay = createGlobalDelay();
        o.eventsForEachSet = createEventOfEachSet();
        o.fadeIn = createGlobalFadeValue();
        o.fadeOut = createGlobalFadeValue();
        o.filter = createGlobalFilter();
        o.panner = createGlobalPanner();
        o.playbackRate = createGlobalPlaybackRate();
        o.randomEndPoint = createGlobalRandomPoint();
        o.randomStartPoint = createGlobalRandomPoint();
        o.timeInterval = createGlobalTimeInteval();
        return Object.seal(o);
    }(Object.create(null)));
}

/*-
initGlobalState: LocalStorageState -> undefined
*/
function initGlobalState(localStorageState, globalState) {
    if (typeof localStorageState !== "object") {
        return;
    }
    if (localStorageState.delay !== undefined) {
        globalState.delay = createGlobalDelay(localStorageState.delay);
    }
    if (localStorageState.fadeIn !== undefined) {
        globalState.fadeIn = createGlobalFadeValue(localStorageState.fadeIn);
    }
    if (localStorageState.fadeOut !== undefined) {
        globalState.fadeOut = createGlobalFadeValue(localStorageState.fadeOut);
    }
    if (localStorageState.filter !== undefined) {
        globalState.filter = createGlobalFilter(localStorageState.filter);
    }
    if (localStorageState.panner !== undefined) {
        globalState.panner = createGlobalPanner(localStorageState.panner);
    }
    if (localStorageState.playbackRate !== undefined) {
        globalState.playbackRate = (
            createGlobalPlaybackRate(localStorageState.playbackRate)
        );
    }
    if (localStorageState.randomEndPoint !== undefined) {
        globalState.randomEndPoint = (
            createGlobalRandomPoint(localStorageState.randomEndPoint)
        );
    }
    if (localStorageState.randomStartPoint !== undefined) {
        globalState.randomStartPoint = (
            createGlobalRandomPoint(localStorageState.randomStartPoint)
        );
    }
    if (localStorageState.timeInterval !== undefined) {
        globalState.timeInterval = (
            createGlobalTimeInteval(localStorageState.timeInterval)
        );
    }
}

/*-
GlobalState: GlobalState
*/
const GlobalState = createGlobalState();

/* -------------------------------------------------------------------------- */
/*                                   EXPORTS                                  */
/* -------------------------------------------------------------------------- */
export {
    defaultGlobalState,
    GlobalState,
    initGlobalState
};