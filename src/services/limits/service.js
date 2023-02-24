/* -------------------------------------------------------------------------- */
/*                               LIMITS OBJECTS                               */
/* -------------------------------------------------------------------------- */
const delayLimits = Object.freeze({
    FBACK_MAX: 17,
    FBACK_MIN: 0,
    TIME_MAX: 49,
    TIME_MIN: 0
});

const fadeLimits = Object.freeze({
    MAX: 19,
    MIN: 0
});

const filterLimits = Object.freeze({
    FREQ_MAX: 248,
    FREQ_MIN: 0,
    Q_MAX: 36,
    Q_MIN: 0,
    TYPES: Object.freeze([
        "lowpass", "highpass", "bandpass", "notch"
    ])
});

const pannerLimits = Object.freeze({
    MAX: 100,
    MIN: 0,
    Z_MAX: 50
});

const playbackRateLimits = Object.freeze({
    MAX: 20,
    MIN: 0
});

const timeIntervalLimits = Object.freeze({
    MAX: 18000, //handreads of miliseconds
    MIN: 5      //handreads of miliseconds
});

export {
    delayLimits,
    fadeLimits,
    filterLimits,
    pannerLimits,
    playbackRateLimits,
    timeIntervalLimits,
};