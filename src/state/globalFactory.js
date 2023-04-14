import {globalDefault} from "./globalDefault.js";
import {isInsideInterval} from "../utils.js";
import {
    delayLimits,
    fadeLimits,
    filterLimits,
    pannerLimits,
    playbackRateLimits,
    timeIntervalLimits
} from "./limits.js";

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
            spec?.areAllDisable !== undefined
            ? spec.areAllDisable
            : globalDefault.delay.areAllDisable
        );
        const timeMax = (
            isInsideInterval(limits.TIME_MIN, limits.TIME_MAX, spec?.timeMax)
            ? spec.timeMax
            : globalDefault.delay.timeMax
        );
        const timeMin = (
            isInsideInterval(limits.TIME_MIN, timeMax, spec?.timeMin)
            ? spec.timeMin
            : globalDefault.delay.timeMin
        );
        const feedbackMax = (
            isInsideInterval(limits.FBACK_MIN, limits.FBACK_MAX, spec?.feedbackMax)
            ? spec.feedbackMax
            : globalDefault.delay.feedbackMax
        );
        const feedbackMin = (
            isInsideInterval(limits.FBACK_MIN, feedbackMax, spec?.feedbackMin)
            ? spec.feedbackMin
            : globalDefault.delay.feedbackMin
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
            areAllDisable: globalDefault.delay.areAllDisable,
            timeMin: globalDefault.delay.timeMin,
            timeMax: globalDefault.delay.timeMax,
            feedbackMin: globalDefault.delay.feedbackMin,
            feedbackMax: globalDefault.delay.feedbackMax
        });
    }
}

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
            : globalDefault.filter.areAllDisable
        );
        const frequencyMax = (
            isInsideInterval(limits.FREQ_MIN, limits.FREQ_MAX, spec?.frequencyMax)
            ? spec.frequencyMax
            : globalDefault.filter.frequencyMax
        );
        const frequencyMin = (
            isInsideInterval(limits.FREQ_MIN, frequencyMax, spec?.frequencyMin)
            ? spec.frequencyMin
            : globalDefault.filter.frequencyMin
        );
        const qMax = (
            isInsideInterval(limits.Q_MIN, limits.Q_MAX, spec?.qMax)
            ? spec.qMax
            : globalDefault.filter.qMax
        );
        const qMin = (
            isInsideInterval(limits.Q_MIN, qMax, spec?.qMin)
            ? spec.qMin
            : globalDefault.filter.qMin
        );
        const types = (
            arr.length === 0
            ? globalDefault.filter.types
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
            areAllDisable: globalDefault.filter.areAllDisable,
            frequencyMin: globalDefault.filter.frequencyMin,
            frequencyMax: globalDefault.filter.frequencyMax,
            qMin: globalDefault.filter.qMin,
            qMax: globalDefault.filter.qMax,
            types: globalDefault.filter.types
        });
    }
}

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
            : globalDefault.panner.areAllDisable
        );
        const xMax = (
            isInsideInterval(limits.MIN, limits.MAX, spec?.xMax)
            ? spec.xMax
            : globalDefault.panner.xMax
        );
        const xMin = (
            isInsideInterval(limits.MIN, xMax, spec?.xMin)
            ? spec.xMin
            : globalDefault.panner.xMin
        );
        const yMax = (
            isInsideInterval(limits.MIN, limits.MAX, spec?.yMax)
            ? spec.yMax
            : globalDefault.panner.yMax
        );
        const yMin = (
            isInsideInterval(limits.MIN, yMax, spec?.yMin)
            ? spec.yMin
            : globalDefault.panner.yMin
        );
        const zMax = (
            isInsideInterval(limits.MIN, limits.Z_MAX, spec?.zMax)
            ? spec.zMax
            : globalDefault.panner.zMax
        );
        const zMin = (
            isInsideInterval(limits.MIN, zMax, spec?.zMin)
            ? spec.zMin
            : globalDefault.panner.zMin
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
            areAllDisable: globalDefault.panner.areAllDisable,
            xMin: globalDefault.panner.xMin,
            xMax: globalDefault.panner.xMax,
            yMin: globalDefault.panner.yMin,
            yMax: globalDefault.panner.yMax,
            zMin: globalDefault.panner.zMin,
            zMax: globalDefault.panner.zMax
        });
    }
}

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
            spec?.areAllDisable !== undefined
            ? spec.areAllDisable
            : globalDefault.playbackRate.areAllDisable
        );
        const max = (
            isInsideInterval(limits.MIN, limits.MAX, spec?.max)
            ? spec.max
            : globalDefault.playbackRate.max
        );
        const min = (
            isInsideInterval(limits.MIN, max, spec?.min)
            ? spec.min
            : globalDefault.playbackRate.min
        );
        return Object.seal({
            areAllDisable,
            max,
            min
        });
    } else {
        return Object.seal({
            areAllDisable: globalDefault.playbackRate.areAllDisable,
            min: globalDefault.playbackRate.min,
            max: globalDefault.playbackRate.max
        });
    }
}


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
            : globalDefault.timeInterval.min
        );
        const max =  (
            isInsideInterval(min, limits.MAX, spec?.max)
            ? spec.max
            : globalDefault.timeInterval.max
        );
        return Object.seal({
            max,
            min
        });
    } else {
        return Object.seal({
            max: globalDefault.timeInterval.max,
            min: globalDefault.timeInterval.min
        });
    }
}

/*-
MaybeGlobalRandomPoint :: Maybe<GlobalRandomPoint>
*/
/*-
createGlobalRandomPoint :: (boolean | undefined) -> boolean
*/
function createGlobalRandomPoint(spec, defaultVal) {
    return (
        typeof spec === "object"
        ? spec
        : defaultVal
    );
}

/*-
createGlobalFadeValue :: (number | undefined) -> number
*/
function createGlobalFadeValue(num, defaultNum) {
    const limits = fadeLimits;
    return (
        isInsideInterval(limits.MIN, limits.MAX, num)
        ? num
        : defaultNum
    );
}

/*-
initializeGlobalState :: (GlobalState, LocalStorageState) -> undefined
*/
function initializeGlobalState(globalState, localStorageState) {
    globalState.delay = createGlobalDelay(localStorageState?.delay);
    globalState.fadeIn = createGlobalFadeValue(
        localStorageState?.fadeIn,
        globalDefault.fadeIn
    );
    globalState.fadeOut = createGlobalFadeValue(
        localStorageState?.fadeOut,
        globalDefault.fadeOut
    );
    globalState.filter = createGlobalFilter(localStorageState?.filter);
    globalState.panner = createGlobalPanner(localStorageState?.panner);
    globalState.playbackRate = (
        createGlobalPlaybackRate(localStorageState?.playbackRate)
    );
    globalState.randomEndPoint = (
        createGlobalRandomPoint(
            localStorageState?.randomEndPoint,
            globalDefault.randomEndPoint
        )
    );
    globalState.randomStartPoint = (
        createGlobalRandomPoint(
            localStorageState?.randomStartPoint,
            globalDefault.randomStartPoint
        )
    );
    globalState.timeInterval = (
        createGlobalTimeInteval(localStorageState?.timeInterval)
    );
}

export default initializeGlobalState;