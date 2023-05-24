// @ts-check
import globalState from "./globalState.js";
import {
    globalDefault,
    globalDefaultKeys,
    globalDefaultObjectsKeys
} from "./globalDefault.js";
import {
    delayLimits,
    fadeLimits,
    filterLimits,
    pannerLimits,
    playbackRateLimits,
    timeIntervalLimits
} from "./limits.js";


/**
@type {(localStorageState: Maybe<Some<LocalStorageState>>) => undefined}*/
function initializeGlobalState(localStorageState) {
    {   //initializate Global Delay
        // Time values are in seconds
        // Feedback is a gain value
        /**@type {Maybe<Some<GlobalDelay>>}*/
        const spec = localStorageState?.delay;
        if (spec !== undefined) {
            if (spec?.areAllDisable !== undefined) {
                globalState.delay.areAllDisable = spec.areAllDisable;
            }
            if (spec?.timeMax !== undefined
                && delayLimits.TIME_MIN <= spec.timeMax
                && spec.timeMax <= delayLimits.TIME_MAX
            ) {
                globalState.delay.timeMax = spec.timeMax;
            }
            if (spec?.timeMin !== undefined
                && delayLimits.TIME_MIN <= spec.timeMin
                && spec.timeMin <= globalState.delay.timeMax
            ) {
                globalState.delay.timeMin = spec.timeMin;
            }
            if (spec?.feedbackMax !== undefined
                && delayLimits.FBACK_MIN <= spec.feedbackMax
                && spec.feedbackMax <= delayLimits.FBACK_MAX
            ) {
                globalState.delay.feedbackMax = spec.feedbackMax;
            }
            if (spec?.feedbackMin !== undefined
                && delayLimits.FBACK_MIN <= spec.feedbackMin
                && spec.feedbackMin <= globalState.delay.feedbackMax
            ) {
                globalState.delay.feedbackMin = spec.feedbackMin;
            }
        }
    }
    {   //Initializate global FadeIn and Fadeout
        /**@type {Maybe<number>} */
        const fadeIn = localStorageState?.fadeIn;
        /**@type {Maybe<number>}*/
        const fadeOut = localStorageState?.fadeOut;
        if (fadeIn !== undefined
            && fadeLimits.MIN <= fadeIn && fadeIn <= fadeLimits.MAX
        ) {
            globalState.fadeIn = fadeIn;
        }
        if (fadeOut !== undefined
            && fadeLimits.MIN <= fadeOut && fadeOut <= fadeLimits.MAX
        ) {
            globalState.fadeOut = fadeOut;
        }
    }
    {   //Initializate global Filter
        /**@type {Maybe<Some<GlobalFilter>>}*/
        const spec = localStorageState?.filter;
        if (spec !== undefined) {
            if (spec.areAllDisable !== undefined) {
                globalState.filter.areAllDisable = spec.areAllDisable;
            }
            if (spec.bandpass !== undefined) {
                globalState.filter.bandpass = spec.bandpass;
            }
            if (spec.frequencyMax !== undefined
                && filterLimits.FREQ_MIN <= spec.frequencyMax
                && spec.frequencyMax <= filterLimits.FREQ_MAX
            ) {
                globalState.filter.frequencyMax = spec.frequencyMax;
            }
            if (spec.frequencyMin !== undefined
                && filterLimits.FREQ_MIN <= spec.frequencyMin
                && spec.frequencyMin <= globalState.filter.frequencyMax
            ) {
                globalState.filter.frequencyMin = spec.frequencyMin;
            }
            if (spec.highpass !== undefined) {
                globalState.filter.highpass = spec.highpass;
            }
            if (spec.lowpass !== undefined) {
                globalState.filter.lowpass = spec.lowpass;
            }
            if (spec.notch !== undefined) {
                globalState.filter.notch = spec.notch;
            }
            if (spec.qMax !== undefined
                && filterLimits.Q_MIN <= spec.qMax
                && spec.qMax <= filterLimits.Q_MAX
            ) {
                globalState.filter.qMax = spec.qMax;
            }
            if (spec.qMin !== undefined
                && filterLimits.Q_MIN <= spec.qMin
                && spec.qMin <= globalState.filter.qMax
            ) {
                globalState.filter.qMin = spec.qMin;
            }
        }
    }
    {   //Initializate global Panner
        /**@type {Maybe<Some<GlobalPanner>>} */
        const spec = localStorageState?.panner;
        if (spec !== undefined) {
            if (spec.areAllDisable !== undefined) {
                globalState.panner.areAllDisable = spec.areAllDisable;
            }
            if (spec.xMax !== undefined
                && pannerLimits.MIN <= spec.xMax
                && spec.xMax <= pannerLimits.MAX
            ) {
                globalState.panner.xMax = spec.xMax;
            }
            if (spec.xMin !== undefined
                && pannerLimits.MIN <= spec.xMin
                && spec.xMin <= globalState.panner.xMax
            ) {
                globalState.panner.xMin = spec.xMin;
            }
            if (spec.yMax !== undefined
                && pannerLimits.MIN <= spec.yMax
                && spec.yMax <= pannerLimits.MAX
            ) {
                globalState.panner.yMax = spec.yMax;
            }
            if (spec.yMin !== undefined
                && pannerLimits.MIN <= spec.yMin
                && spec.yMin <= globalState.panner.yMax
            ) {
                globalState.panner.yMin = spec.yMin;
            }
            if (spec.zMax !== undefined
                && pannerLimits.MIN <= spec.zMax
                && spec.zMax <= pannerLimits.Z_MAX
            ) {
                globalState.panner.zMax = spec.zMax;
            }
            if (spec.zMin !== undefined
                && pannerLimits.MIN <= spec.zMin
                && spec.zMin <= globalState.panner.zMax
            ) {
                globalState.panner.zMin = spec.zMin;
            }
        }
    }
    {   //Initializate global Playback Rate
        /**@type {Maybe<Some<GlobalPlaybackRate>} */
        const spec = localStorageState?.playbackRate;
        if (spec !== undefined) {
            if (spec.areAllDisable !== undefined) {
                globalState.playbackRate.areAllDisable = spec.areAllDisable;
            }
            if (spec.max !== undefined
                && playbackRateLimits.MIN <= spec.max
                && spec.max <= playbackRateLimits.MAX
            ) {
                globalState.playbackRate.max = spec.max;
            }
            if (spec.min !== undefined
                && playbackRateLimits.MIN <= spec.min
                && spec.min <= globalState.playbackRate.max
            ) {
                globalState.playbackRate.min = spec.min;
            }
        }
    }
    {   //Initializate global Time Interval
        //values are in miliseconds
        /**@type {Maybe<Some<GlobalTimeInterval>>}*/
        const spec = localStorageState?.timeInterval;
        if (spec !== undefined) {
            if (spec.max !== undefined
                && timeIntervalLimits.MIN <= spec.max
                && spec.max <= timeIntervalLimits.MAX
            ) {
                globalState.timeInterval.max = spec.max;
            }
            if (spec.min !== undefined
                && timeIntervalLimits.MIN <= spec.min
                && spec.min <= globalState.timeInterval.max
            ) {
                globalState.timeInterval.min = spec.min;
            }
        }
    }
    //Initializate Random Points
    if (localStorageState?.randomEndPoint !== undefined
        && localStorageState.randomEndPoint.areAllDisable !== undefined
    ) {
        globalState.randomEndPoint.areAllDisable = localStorageState.randomEndPoint.areAllDisable;
    }
    if (localStorageState?.randomStartPoint !== undefined
        && localStorageState.randomStartPoint.areAllDisable !== undefined
    ) {
        globalState.randomStartPoint.areAllDisable = localStorageState.randomStartPoint.areAllDisable;
    }
    return;
}

/**
@type {(v: string) => boolean} */
function verifyAppVersion(v) {
    return (
        localStorage.getItem("version") !== v
        ? (
            localStorage.clear(),
            localStorage.setItem("version", v),
            true
        )
        : false
    );
}

/**
@type {() => undefined} */
function initializeLocalStorage() {
    let key = "";
    let innerKey = "";
    let localStorageKey = "";
    const n_end = globalDefaultKeys.length;
    for (let n = 0; n < n_end; n += 1) {
        key = globalDefaultKeys[n];
        localStorageKey = key;
        if (globalDefaultObjectsKeys[key] !== undefined) {
            const m_end = globalDefaultObjectsKeys[key].length;
            for (let m = 0; m < m_end; m += 1) {
                innerKey = globalDefaultObjectsKeys[key][m];
                localStorageKey =  key + "." + innerKey;
                localStorage.setItem(localStorageKey, globalDefault[key][innerKey]);
            }
        } else {
            localStorage.setItem(localStorageKey, globalDefault[key]);
        }
    }
    return;
}

/**
@type {() => Some<LocalStorageState>}*/
function stateFromLocalStorage() {
    const state = {};
    let key = "";
    let innerKey = "";
    let localStorageKey = "";
    const n_end = globalDefaultKeys.length;
    for (let n = 0; n < n_end; n += 1) {
        key = globalDefaultKeys[n];
        localStorageKey = key;
        if (globalDefaultObjectsKeys[key] !== undefined) {
            state[key] = {};
            const m_end = globalDefaultObjectsKeys[key].length;
            for (let m = 0; m < m_end; m += 1) {
                innerKey = globalDefaultObjectsKeys[key][m];
                localStorageKey =  key + "." + innerKey;
                state[key][innerKey] = JSON.parse(localStorage[localStorageKey]);
            }
        } else {
            state[key] = JSON.parse(localStorage[key]);
        }
    }
    return state;
}


/**
@type {(v: string) => undefined} */
function handleStateInitializers(v) {
    const hasNotLocalStorage = verifyAppVersion(v);
    if (hasNotLocalStorage) {
        initializeLocalStorage();
        initializeGlobalState(undefined);
    } else {
        initializeGlobalState(
            stateFromLocalStorage()
        );
    }
    return;
}

/*-
setInitialAudioContext :: () -> undefined */
/**
@type {() => undefined}*/
function setInitialAudioContext() {
    const AudioContextObject = (
        window?.AudioContext !== undefined
        ? window.AudioContext
        : window.webkitAudioContext
    );

    /**@type {AudioContext} */
    const audioContext = new AudioContextObject({
        latencyHint: "playback",
        sampleRate: 44100
    });
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

    audioContext.resume();
    globalState.audioContext = audioContext;
    return;
}

export {
    handleStateInitializers,
    setInitialAudioContext
};