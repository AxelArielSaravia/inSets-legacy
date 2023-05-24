//@ts-check
/**
@type {(n: number) => string} */
function isMinorThanTen(n) {
    return n < 10 ? "0" + n : String(n);
}

/**
@type {(val: number) => string} */
function durationToTime(val) {
    val = Math.floor(val);
    const sec = val % 60;
    const min = Math.floor(val / 60) % 60;
    const hr = Math.floor(val / 3600);
    let str = (hr > 0 ? hr + ":" : "");
    str += isMinorThanTen(min) + ":" + isMinorThanTen(sec);
    return str;
}

/**
 * val is in seconds
@type {(val: number) => string} */
function durationToShortTime(val) {
    const miliseconds = Math.floor(val * 10) % 10;
    const sec = Math.floor(val) % 60;
    return (sec < 10 ? "0" : "") + sec + "." + miliseconds;
}

function undefinedFunction(a) {}

export {
    isMinorThanTen,
    durationToTime,
    durationToShortTime,
    undefinedFunction
};