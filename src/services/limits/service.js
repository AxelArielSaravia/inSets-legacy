/* -------------------------------------------------------------------------- */
/*                               LIMITS OBJECTS                               */
/* -------------------------------------------------------------------------- */
/*-
pannerLimits: undefined -> {
    MAX: 100,
    MIN: 0,
    Z_MAX: 0
}
*/
function pannerLimits() {
    const o = Object.create(null);
    o.MAX = 100;
    o.MIN = 0;
    o.Z_MAX = 50;
    return Object.freeze(o);
}

/*-
filterLimits: undefined -> {
    FREQ_MAX: 248,
    FREQ_MIN: 0,
    Q_MAX: 35,
    Q_MIN: 0,
    TYPES: ["lowpass", "highpass", "bandpass", "notch"]
}
*/
function filterLimits() {
    const o = Object.create(null);
    o.FREQ_MAX = 248;
    o.FREQ_MIN = 0;
    o.Q_MAX = 36;
    o.Q_MIN = 0;
    o.TYPES = Object.freeze([
        "lowpass", "highpass", "bandpass", "notch"
    ]);
    return Object.freeze(o);
}

/*-
delayLimits: undefined -> {
    FBACK_MAX: 17,
    FBACK_MIN: 0,
    TIME_MAX: 49,
    TIME_MIN: 0
}
*/
function delayLimits() {
    const o = Object.create(null);
    o.FBACK_MAX = 17;
    o.FBACK_MIN = 0;
    o.TIME_MAX = 49;
    o.TIME_MIN = 0;
    return Object.freeze(o);
}

/*-
playbackRateLimits: undefined -> {
    MAX: 20,
    MIN: 0
}
*/
function playbackRateLimits() {
    const o = Object.create(null);
    o.MAX = 20;
    o.MIN = 0;
    return Object.freeze(o);
}

/*-
timeIntervalLimits: undefined -> {
    MAX: 18000
    MIN: 5,
}
*/
function timeIntervalLimits() {
    const o = Object.create(null);
    o.MAX = 18000; //handreads of miliseconds
    o.MIN = 5;     //handreads of miliseconds
    return Object.freeze(o);
}

/*-
fadeLimits: undefined -> {
    MAX: 29
    MIN: 0,
}
*/
function fadeLimits() {
    const o = Object.create(null);
    o.MAX = 29;
    o.MIN = 0;
    return Object.freeze(o);
}

/*-
pannerListener: unidefined -> {
    X: 6,
    Y: 6,
    Z: 6
}
*/
function pannerListener() {
    const o = Object.create(null);
    o.X = 6;
    o.Y = 6;
    o.Z = 1;
    return Object.freeze(o);
}

export {
    delayLimits,
    fadeLimits,
    filterLimits,
    pannerLimits,
    pannerListener,
    playbackRateLimits,
    timeIntervalLimits
};