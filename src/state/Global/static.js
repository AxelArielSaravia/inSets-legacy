"strict mode";
/** @type {{MAX: 50, MIN: -50}} */
const globalPannerStatic = {
    MAX: 50,
    MIN: -50
}
Object.freeze(globalPannerStatic);

/** @type {{FREQ_MIN: 40, FREQ_MAX:18000, Q_MIN: 0.05, Q_MAX: 5, TYPES: ["lowpass", "highpass", "bandpass", "notch"]}} */
const globalFilterStatic = {
    FREQ_MIN: 40,
    FREQ_MAX: 18000,
    Q_MIN: 0.01,
    Q_MAX: 5.00,
    TYPES: ["lowpass", "highpass", "bandpass", "notch"]
}
Object.freeze(globalFilterStatic);

/** @type {{TIME_MIN: 0.1, TIME_MAX: 5, FBACK_MIN: 0.05, FBACK_MAX: 0.9}}*/
const globalDelayStatic = {
    TIME_MIN: 0.1,
    TIME_MAX: 5.0,
    FBACK_MIN: 0.05,
    FBACK_MAX: 0.90
}
Object.freeze(globalDelayStatic);

/** @type {{MIN: 0.5, MAX: 2}} */
const globalPlayBackRateStatic = {
    MIN: 0.5,
    MAX: 2.0
}
Object.freeze(globalPlayBackRateStatic);

/** Values are in miliseconds
 * @type {{MIN: 400, MAX: 600000}} */
const globalTimeIntervalStatic = {
    MIN: 400,
    MAX: 600000
}
Object.freeze(globalTimeIntervalStatic);

/** Values are in miliseconds
 * @type {{MIN: 15, MAX: 500}} */
const globalFadeTimeStatic = {
    MIN: 15,
    MAX: 500
}
Object.freeze(globalFadeTimeStatic);

/** @type {{X: 6, Y: 6, Z: 6}} */
const pannerListener = {
    X: 6,
    Y: 6,
    Z: 1
}
Object.freeze(pannerListener);

export {
    globalDelayStatic,
    globalFadeTimeStatic,
    globalFilterStatic,
    globalPannerStatic,
    globalPlayBackRateStatic,
    globalTimeIntervalStatic,
    pannerListener
}
