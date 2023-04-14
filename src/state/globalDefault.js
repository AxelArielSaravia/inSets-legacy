const randomPointObject = Object.freeze({
    areAllDisable: false
});

/*-
globalDefault :: LocalStorageState */
const globalDefault = Object.freeze({
    delay: Object.freeze({
        areAllDisable: false,
        feedbackMax: 16,
        feedbackMin: 4,
        timeMax: 39,
        timeMin: 3
    }),
    fadeIn: 2,
    fadeOut: 5,
    filter: Object.freeze({
        areAllDisable: false,
        frequencyMax: 240,
        frequencyMin: 40,
        qMax: 36,
        qMin: 0,
        types: ["lowpass", "highpass", "bandpass", "notch"]
    }),
    panner: Object.freeze({
        areAllDisable: false,
        xMax: 80,
        xMin: 20,
        yMax: 80,
        yMin: 20,
        zMax: 50,
        zMin: 0
    }),
    playbackRate: Object.freeze({
        areAllDisable: false,
        max: 15,
        min: 5
    }),
    randomEndPoint: randomPointObject,
    randomStartPoint: randomPointObject,
    timeInterval: Object.freeze({
        max: 50,  //handreads of miliseconds
        min: 8  //handreads of miliseconds
    })
});

const globalDefaultKeys = [
    "delay",
    "fadeIn",
    "fadeOut",
    "filter",
    "panner",
    "playbackRate",
    "randomEndPoint",
    "randomStartPoint",
    "timeInterval"
];

export {
    globalDefault,
    globalDefaultKeys
};