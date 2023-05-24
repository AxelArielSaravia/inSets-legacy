// @ts-check
/**@type {Freeze<GlobalRandomPoint>}*/
const randomPointObject = {
    areAllDisable: false
};

/**
@type {Freeze<LocalStorageState>} */
const globalDefault = {
    delay: {
        areAllDisable: false,
        feedbackMax: 16,
        feedbackMin: 4,
        timeMax: 39,
        timeMin: 3
    },
    fadeIn: 2,
    fadeOut: 5,
    filter: {
        areAllDisable: false,
        frequencyMax: 240,
        frequencyMin: 40,
        qMax: 36,
        qMin: 0,
        bandpass: false,
        highpass: false,
        lowpass: false,
        notch: false
    },
    panner: {
        areAllDisable: false,
        xMax: 80,
        xMin: 20,
        yMax: 80,
        yMin: 20,
        zMax: 50,
        zMin: 0,
    },
    playbackRate: {
        areAllDisable: false,
        max: 15,
        min: 5
    },
    randomEndPoint: randomPointObject,
    randomStartPoint: randomPointObject,
    timeInterval: {
        max: 50,  //handreads of miliseconds
        min: 8  //handreads of miliseconds
    }
};

/**
@type {Freeze<Array<GlobalDefaultKeys>>} */
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

/**
@type {Freeze<{
    "delay": [
        "areAllDisable",
        "feedbackMax",
        "feedbackMin",
        "timeMax",
        "timeMin"
    ],
    "filter": [
        "areAllDisable",
        "frequencyMax",
        "frequencyMin",
        "qMax",
        "qMin",
        "bandpass",
        "highpass",
        "lowpass",
        "notch"
    ],
    "panner": [
        "areAllDisable",
        "xMax",
        "xMin",
        "yMax",
        "yMin",
        "zMax",
        "zMin"
    ],
    "playbackRate": [
        "areAllDisable",
        "max",
        "min"
    ],
    "randomEndPoint": ["areAllDisable"],
    "randomStartPoint": ["areAllDisable"],
    "timeInterval": ["max", "min"]
}>} */
const globalDefaultObjectsKeys = {
    "delay": [
        "areAllDisable",
        "feedbackMax",
        "feedbackMin",
        "timeMax",
        "timeMin"
    ],
    "filter": [
        "areAllDisable",
        "frequencyMax",
        "frequencyMin",
        "qMax",
        "qMin",
        "bandpass",
        "highpass",
        "lowpass",
        "notch"
    ],
    "panner": [
        "areAllDisable",
        "xMax",
        "xMin",
        "yMax",
        "yMin",
        "zMax",
        "zMin"
    ],
    "playbackRate": [
        "areAllDisable",
        "max",
        "min"
    ],
    "randomEndPoint": ["areAllDisable"],
    "randomStartPoint": ["areAllDisable"],
    "timeInterval": ["max", "min"]
};


export {
    globalDefault,
    globalDefaultKeys,
    globalDefaultObjectsKeys
};