const delayLimits = Object.freeze({
    FBACK_MAX: 17,
    FBACK_MIN: 0,
    TIME_MAX: 49,
    TIME_MIN: 0
});

const fadeLimits = Object.freeze({
    MAX: 8,
    MIN: 0
});

const filterLimits = Object.freeze({
    FREQ_MAX: 248,
    FREQ_MIN: 0,
    Q_MAX: 36,
    Q_MIN: 0,
    TYPES: ["bandpass", "highpass", "lowpass", "notch"]
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

const audioVolumeLimits =  Object.freeze({
    max: 1,   // 100%
    min: 0.1  // 10%
});

export {
    audioVolumeLimits,
    delayLimits,
    fadeLimits,
    filterLimits,
    pannerLimits,
    playbackRateLimits,
    timeIntervalLimits
};