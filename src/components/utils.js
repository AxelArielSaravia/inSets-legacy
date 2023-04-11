/*-
isMinorThanTen: number -> string
*/
function isMinorThanTen(num) {
    return num < 10 ? "0" + num : num;
}

/*-
percent: number, number, number - > number;
*/
function  percent(a, b, c) {
    if (a <= 0) {
        return 0;
    }
    return (b * c) / a;
}

/*-
fixPercent: number, number, number - > number;
*/
function fixPercent(a, b, c, fixed) {
    return (percent(a, b, c)).toFixed(fixed);
}

/*-
floorPercent: number, number, number - > number;
*/
function floorPercent(a, b, c, fixed) {
    return Math.floor(percent(a, b, c));
}

/*-
durationToTime: number -> string
*/
function durationToTime(val) {
    const _val = Math.floor(val);
    const sec = _val % 60;
    const min = Number.parseInt(_val / 60) % 60;
    const hr = Number.parseInt(_val / 3600);
    let str = (hr > 0 ? hr + ":" : "");
    str += isMinorThanTen(min) + ":" + isMinorThanTen(sec);
    return str;
}

/*-
durationToShortTime: number -> string
*/
function durationToShortTime(val) {
    const _val = Math.floor(val * 10);
    const miliseconds = _val % 10;
    const sec = Number.parseInt(_val / 10) % 60;
    return "0" + sec + "." + miliseconds;
}

function undefinedFunction() {}

export {
    percent,
    fixPercent,
    floorPercent,
    isMinorThanTen,
    durationToTime,
    durationToShortTime,
    undefinedFunction
};