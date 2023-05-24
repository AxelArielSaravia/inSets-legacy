//@ts-check
import {
    delayLimits,
    fadeLimits,
    filterLimits,
    pannerLimits,
    playbackRateLimits
} from "../state/limits.js";


/**
@type {(x: number) => number | Panic} */
function rToFrequency(x) {
    const {FREQ_MAX, FREQ_MIN} = filterLimits;
    if (FREQ_MIN <= x && x <= FREQ_MAX) {
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
    throw new Error("The argument is invalid");
}


/**
@type {(x: number) => number | Panic} */
function rToQ(x) {
    const {Q_MAX, Q_MIN} = filterLimits;
    if (Q_MIN <= x && x <= Q_MAX) {
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
    throw new Error("The argument is invalid");
}

/**
@type {(x: number) => number | Panic} */
function rToPlaybackRate(x) {
    const {MAX, MIN} = playbackRateLimits;
    if (MIN <= x && x <= MAX) {
        return (
            x < 10
            ? (x + 10) / 20
            : x / 10
        );
    }
    throw new Error("The argument is invalid");
}

/**
@type {(x: number) => number | Panic} */
function rToFeedback(x) {
    const {FBACK_MAX, FBACK_MIN} = delayLimits;
    if (FBACK_MIN <= x && x <= FBACK_MAX) {
        return (x + 1) / 20;
    }
    throw new Error("The argument is invalid");
}


/**
@type {(x: number) => number | Panic} */
function rToTime(x) {
    const {TIME_MAX, TIME_MIN} = delayLimits;
    if (TIME_MIN <= x && x <= TIME_MAX) {
        return (x + 1) / 10;
    }
    throw new Error("The argument is invalid");
}


/**
@type {(x: number) => number | Panic} */
function rToPanner(x) {
    const {MAX, MIN} = pannerLimits;
    if (MIN <= x && x <= MAX) {
        return x - 50;
    }
    throw new Error("The argument is invalid");
}


/**
@type {(x: number) => number | Panic} */
function rToFade(x) {
    const {MAX, MIN} = fadeLimits;
    if (MIN <= x && x <= MAX) {
        return (
            x === 0
            ? 0
            : (20 * x) + 60
        );
    }
    throw new Error("The argument is invalid");
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