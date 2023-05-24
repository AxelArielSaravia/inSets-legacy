/**
@type {Freeze<{
    FBACK_MAX: 17,
    FBACK_MIN: 0,
    TIME_MAX: 49,
    TIME_MIN: 0
}>} */
const delayLimits = {
    FBACK_MAX: 17,
    FBACK_MIN: 0,
    TIME_MAX: 49,
    TIME_MIN: 0
};

/**
@type {Freeze<{
    MAX: 8,
    MIN: 0
}>} */
const fadeLimits = {
    MAX: 8,
    MIN: 0
};

/**
@type {Freeze<{
    FREQ_MAX: 248,
    FREQ_MIN: 0,
    Q_MAX: 36,
    Q_MIN: 0,
    TYPES: ["bandpass", "highpass", "lowpass", "notch"]
}>} */
const filterLimits = {
    FREQ_MAX: 248,
    FREQ_MIN: 0,
    Q_MAX: 36,
    Q_MIN: 0,
    TYPES: ["bandpass", "highpass", "lowpass", "notch"]
};

/**
@type {Freeze<{
    MAX: 100,
    MIN: 0,
    Z_MAX: 50
}>} */
const pannerLimits = {
    MAX: 100,
    MIN: 0,
    Z_MAX: 50
};

/**
@type {Freeze<{
    MAX: 20,
    MIN: 0
}>} */
const playbackRateLimits = {
    MAX: 20,
    MIN: 0
};

/**
@type {Freeze<{
    MAX: 20,
    MIN: 0
}>} */
const timeIntervalLimits = {
    MAX: 18000, //handreads of miliseconds
    MIN: 5      //handreads of miliseconds
};

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