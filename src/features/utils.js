const isMinorThanTen = (num) => num < 10 ? "0" + num : num;

const calcPercent = (a, b) => {
    if (a <= 0) return 0;
    return  Math.floor((b * 100) / a);
} 

const durationToTime = (val) => {
    const _val = Math.floor(val);
    const sec = _val % 60;
    const min = Number.parseInt(_val / 60) % 60;
    const hr = Number.parseInt(_val / 3600);
    let str = (hr > 0) ? hr + ":" : "";
    str += isMinorThanTen(min) + ":" + isMinorThanTen(sec);
    return str;
}
const durationToShortTime = (val) => {
    const _val = Math.floor(val * 10);
    const miliseconds = _val % 10;
    const sec = Number.parseInt(_val / 10) % 60;
    return "0" + sec + "." + miliseconds;
}


export {
    calcPercent,
    isMinorThanTen,
    durationToTime,
    durationToShortTime
}