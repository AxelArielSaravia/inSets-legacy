
const rangeValueToFrequency = (val) => {
    if (typeof val === "number") {
        if (val < 100) return val;
        if (val < 190) return ((val % 100) + 10) * 10;
        if (val < 280) return ((val % 190) + 10) * 100;
        return ((val % 280)+ 10) * 1000;
    }
    throw new Error("The argument is not a number", {cause: val});
}

const frequencyToRangeValue = (val) => {
    if (typeof val === "number") {
        if (val < 100) return val;
        if (val < 1000) return (val / 10) + 90;
        if (val < 10000) return (val / 100) + 180;;
        return ( val/ 1000) + 270;
    }
    throw new Error("The argument is not a number", {cause: val});
}

const rangeValueToQ = (val) => {
    if (typeof val === "number") {
        if (val < 20) return val * 5;
        if (val < 30) return ((val % 10) + 10) * 10;
        return ((val % 10) + 2) * 100;
    }
    throw new Error("The argument is not a number", {cause: val});
}

const qToRangeValue = (val) => {
    if (typeof val === "number") {
        if (val < 100) return val / 5;
        if (val < 200) return (val / 10) + 10
       return (val / 100) + 28;
    }
    throw new Error("The argument is not a number", {cause: val});
}

const rangeValueToPlaybackRateValue = (val) => {
    if (typeof val === "number") {
        if (val < 10) return (val * 5) + 50;
        return val * 10;
    }
    throw new Error("The argument is not a number", {cause: val});
}

const playbackRateValueToRangeValue = (val) => {
    if (typeof val === "number") {
        if (val < 100) return (val -50) / 5;
        return val / 10;
    }
    throw new Error("The argument is not a number", {cause: val});
}



export {
    rangeValueToFrequency,
    frequencyToRangeValue,
    rangeValueToQ,
    qToRangeValue,
    rangeValueToPlaybackRateValue,
    playbackRateValueToRangeValue
}