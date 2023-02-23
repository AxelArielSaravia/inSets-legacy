import {
    delayLimits,
    fadeLimits,
    filterLimits,
    pannerLimits,
    playbackRateLimits
} from "../limits/service.js";

import {isInsideInterval} from "../assert/service.js";

/*-
rToFrequency: number -> number
*/
function rToFrequency(x) {
    const {FREQ_MAX, FREQ_MIN} = filterLimits;
    if (typeof x !== "number" || !isInsideInterval(FREQ_MIN, FREQ_MAX, x)) {
        throw new Error("The argument is invalid");
    }
    return (
        x < 60
        ? x + 40
        : (
            x < 150
            ? (x - 50) * 10
            : (
                x < 240
                ? (x - 140) * 100
                : (x - 230) * 1000
            )
        )
    );
}

/*-
rToQ: number -> number
*/
function rToQ(x) {
    const {Q_MAX, Q_MIN} = filterLimits;
    if (typeof x !== "number" || !isInsideInterval(Q_MIN, Q_MAX, x)) {
        throw new Error("The argument is invalid");
    }
    return (
        x < 18
        ? (x + 2) / 20
        : (
            x < 28
            ? (x - 8) / 10
            : x - 26
        )
    );
}

/*-
rToPlaybackRate: number -> number
*/
function rToPlaybackRate(x) {
    const {MAX, MIN} = playbackRateLimits;
    if (typeof x !== "number" || !isInsideInterval(MIN, MAX, x)) {
        throw new Error("The argument is invalid");
    }
    return (
        x < 10
        ? (x + 10) / 20
        : x / 10
    );
}

/*-
rToFeedback: number -> number
*/
function rToFeedback(x) {
    const {FBACK_MAX, FBACK_MIN} = delayLimits;
    if (typeof x !== "number" || !isInsideInterval(FBACK_MIN, FBACK_MAX, x)) {
        throw new Error("The argument is invalid");
    }
    return (x + 1) / 20;
}

/*-
rToTime: number -> number
*/
function rToTime(x) {
    const {TIME_MAX, TIME_MIN} = delayLimits;
    if (typeof x !== "number" || !isInsideInterval(TIME_MIN, TIME_MAX, x)) {
        throw new Error("The argument is invalid");
    }
    return (x + 1) / 10;
}

/*-
rToPanner: number -> number
*/
function rToPanner(x) {
    const {MAX, MIN} = pannerLimits;
    if (typeof x !== "number" || !isInsideInterval(MIN, MAX, x)) {
        throw new Error("The argument is invalid");
    }
    return x - 50;
}

/*-
rToPanner: number -> number
*/
function rToFade(x) {
    const {MAX, MIN} = fadeLimits;
    if (typeof x !== "number" || !isInsideInterval(MIN, MAX, x)) {
        throw new Error("The argument is invalid");
    }
    return (x + 1) * 10;
}

export {
    rToFade,
    rToFeedback,
    rToFrequency,
    rToPanner,
    rToPlaybackRate,
    rToQ,
    rToTime
};