import globalState from "./globalState.js";
import {
    globalDefault,
    globalDefaultKeys,
    globalDefaultObjectsKeys
} from "./globalDefault.js";

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
SomeDelay :: some<GlobalDelay>
SomeFilter :: some<GlobalFilter>
SomePanner :: some<GlobalPanner>
SomePlaybackRate :: Maybe<GlobalPlaybackRate>
SomeRandomPoint :: some<GlobalRandomPoint>
SomeTimeInterval :: some<GlobalTimeInterval>
*/

// Time values are in seconds
// Feedback is a gain value
/*-
createGlobalDelay :: (maybe<SomeDelay>) -> GlobalDelay */
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
createGlobalFilter :: (maybe<SomeFilter>) -> GlobalFilter */
function createGlobalFilter(spec) {
    if (typeof spec === "object") {
        const limits = filterLimits;
        const areAllDisable = (
            spec?.areAllDisable !== undefined
            ? spec.areAllDisable
            : globalDefault.filter.areAllDisable
        );
        const bandpass = (
            spec?.bandpass !== undefined
            ? spec.bandpass
            : globalDefault.filter.bandpass
        );
        const highpass = (
            spec?.highpass !== undefined
            ? spec.highpass
            : globalDefault.filter.highpass
        );
        const lowpass = (
            spec?.lowpass !== undefined
            ? spec.lowpass
            : globalDefault.filter.lowpass
        );
        const notch = (
            spec?.notch !== undefined
            ? spec.notch
            : globalDefault.filter.notch
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
        return Object.seal({
            areAllDisable,
            bandpass,
            frequencyMax,
            frequencyMin,
            highpass,
            lowpass,
            notch,
            qMax,
            qMin,
            types: Array(4)
        });
    } else {
        return Object.seal({
            areAllDisable: globalDefault.filter.areAllDisable,
            bandpass: globalDefault.filter.bandpass,
            frequencyMin: globalDefault.filter.frequencyMin,
            frequencyMax: globalDefault.filter.frequencyMax,
            highpass: globalDefault.filter.highpass,
            lowpass: globalDefault.filter.lowpass,
            notch: globalDefault.filter.notch,
            qMin: globalDefault.filter.qMin,
            qMax: globalDefault.filter.qMax,
            types: Array(4)
        });
    }
}

/*-
createGlobalPanner :: (maybe<SomePanner>) -> GlobalPanner */
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
createGlobalPlaybackRate :: (maybe<SomePlaybackRate>) -> GlobalPlaybackRate */
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

// Values are in miliseconds
/*-
createGlobalTimeInteval :: (maybe<SomeTimeInterval>) -> GlobalTimeInterval */
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
createGlobalRandomPoint :: ({areAllDisable: boolean}, boolean) -> boolean */
function createGlobalRandomPoint(spec, defaultVal) {
    return {
        areAllDisable: (
            spec?.areAllDisable !== undefined
            ? spec.areAllDisable
            : defaultVal
        )
    };
}

/*-
createGlobalFadeValue :: (maybe<number>) -> number */
function createGlobalFadeValue(num, defaultNum) {
    const limits = fadeLimits;
    return (
        isInsideInterval(limits.MIN, limits.MAX, num)
        ? num
        : defaultNum
    );
}

/*-
initializeGlobalState :: (GlobalState, LocalStorageState) -> undefined */
function initializeGlobalState(localStorageState) {
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
            globalDefault.randomEndPoint.areAllDisable
        )
    );
    globalState.randomStartPoint = (
        createGlobalRandomPoint(
            localStorageState?.randomStartPoint,
            globalDefault.randomStartPoint.areAllDisable
        )
    );
    globalState.timeInterval = (
        createGlobalTimeInteval(localStorageState?.timeInterval)
    );
}


/*-
verifyAppVersion :: string -> boolean */
function verifyAppVersion(version) {
    return (
        typeof version === "string"
        && localStorage.getItem("version") !== version
        ? (
            localStorage.clear(),
            localStorage.setItem("version", version),
            true
        )
        : false
    );
}

/*-
initializeLocalStorage :: () -> undefined */
function initializeLocalStorage() {
    let n = 0;
    let m = 0;
    let key = "";
    let innerKey = "";
    let localStorageKey = "";

    while (n < globalDefaultKeys.length) {
        key = globalDefaultKeys[n];
        localStorageKey = key;
        if (globalDefaultObjectsKeys[key] !== undefined) {
            m = 0;
            while (m < globalDefaultObjectsKeys[key].length) {
                innerKey = globalDefaultObjectsKeys[key][m];
                localStorageKey =  key + "." + innerKey;
                localStorage.setItem(localStorageKey, globalDefault[key][innerKey]);
                m += 1;
            }
        } else {
            localStorage.setItem(localStorageKey, globalDefault[key]);
        }
        n += 1;
    }
}

/*-
stateFromLocalStorage :: () -> some<localStorageState> */
function stateFromLocalStorage() {
    const state = {};
    let n = 0;
    let m = 0;
    let key = "";
    let innerKey = "";
    let localStorageKey = "";

    while (n < globalDefaultKeys.length) {
        key = globalDefaultKeys[n];
        localStorageKey = key;
        if (globalDefaultObjectsKeys[key] !== undefined) {
            state[key] = {};
            m = 0;
            while (m < globalDefaultObjectsKeys[key].length) {
                innerKey = globalDefaultObjectsKeys[key][m];
                localStorageKey =  key + "." + innerKey;
                state[key][innerKey] = JSON.parse(localStorage[localStorageKey]);
                m += 1;
            }
        } else {
            state[key] = JSON.parse(localStorage[key]);
        }
        n += 1;
    }
    return state;
}

/*-
handleStateInitializers :: (string) -> undefined */
function handleStateInitializers(version) {
    const hasNotLocalStorage = verifyAppVersion(version);
    if (hasNotLocalStorage) {
        initializeLocalStorage();
        initializeGlobalState();
    } else {
        initializeGlobalState(
            stateFromLocalStorage()
        );
    }
}

/*-
setInitialAudioContext :: () -> undefined */
function setInitialAudioContext() {
    const AudioContextObject = (
        window?.AudioContext !== undefined
        ? window.AudioContext
        : window.webkitAudioContext
    );
    globalState.audioContext = new AudioContextObject({
        latencyHint: "playback",
        sampleRate: 44100
    });

    const audioContext = globalState.audioContext;
    //listener position
    if (audioContext.listener.positionX) {
        audioContext.listener.positionX.value = 0;
        audioContext.listener.positionY.value = 0;
        audioContext.listener.positionZ.value = 1;
        audioContext.listener.forwardZ.value = -5;
    } else {
        audioContext.listener.setPosition(0, 0, 1);
        audioContext.listener.setOrientation(0, 0, -5, 0 ,1, 0);
    }

    //Create the first instance of panningModel "HRTF"
    const PANNER = audioContext.createPanner();
    PANNER.panningModel = "HRTF";

    globalState.audioContext.resume();
}

export {
    handleStateInitializers,
    setInitialAudioContext
};