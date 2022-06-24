/* CREATE BY AXEL ARIEL SARAVIA */
/** Global States   
 * @typedef {{
 *  min?: number, 
 *  max?: number
 * }} GlobalTimeInterval
 * 
 * @typedef {{
 *  disableAll?: boolean,
 *  xMin?: number,
 *  xMax?: number,
 *  yMin?: number,
 *  yMax?: number,
 *  zMin?: number,
 *  zMax?: number
 * }} GlobalPanner
 * 
 * @typedef {{
 *  disableAll?: boolean,
 *  frequencyMin?: number,
 *  frequencyMax?: number,
 *  qMin?: number,
 *  qMax?: number,
 *  types?: ["lowpass"?, "highpass"?, "bandpass"?, "notch"?]
 * }} GlobalFilter
 * 
 * @typedef {{
 *  disableAll?: boolean,
 *  timeMin?: number, 
 *  timeMax?: number,
 *  feedbackMin?: number,
 *  feedbackMax?: number
 * }} GlobalDelay
 * 
 * @typedef {{
 *  disableAll?: boolean,
 *  min?: number,
 *  max?: number
 * }} GlobalPlayBackRate
 * 
 * @typedef {{
 *  delay?: GlobalDelay,
 *  fadeTime?: number,
 *  filter?: GlobalFilter, 
 *  panner?: GlobalPanner, 
 *  playBackRate?: GlobalPlayBackRate,
 *  randomCurrentTimeDisable?: boolean
 *  timeInterval?: GlobalTimeInterval, 
 * }} ElementsState
 * 
 * @typedef {{
 *  readonly hasAudios: boolean,
 *  AUDIO_CONTEXT: AudioContext | object,
 *  AUDIO_MAP: Map<string, AudioState>
 *  engine: "audioBuffer"|"audioNode",
 *  fadeTime: FadeTime,
 *  isStarted: boolean,
 *  sets: Sets
 *  } & ElementsState} GlobalState
 */

/** Audio States
 * @typedef {{
 *  readonly MAX_VOLUME: number,
 *  readonly duration: number,
 *  audioEngine: AudioBuffer | HTMLAudioElement | null,
 *  delay: AudioDelayState,
 *  endTimePoint: number,
 *  filter: AudioFilterState,
 *  isPlaying: boolean,
 *  id: string,
 *  outputGain: GainNode | null,
 *  panner: AudioPannerState,
 *  playBackRate: AudioPlayBackRateState,
 *  randomCurrentTime: RandomCurrentTime
 *  source: AudioBufferSourceNode | MediaElementAudioSourceNode | null,
 *  startTimePoint: number,
 *  title: string,
 *  type: string,
 *  volume: number,
 * }} AudioState
 */


/* -------------------------------------------------------------------------- */
/*                                Global States                               */
/* -------------------------------------------------------------------------- */

/**
 * The values in GlobalPannerState are in percentage
 * @class GlobalPannerState
 * @param {GlobalPanner} obj
 */
function GlobalPannerState(obj) {
    /**@type {boolean} */
    let disableAll;
    /**@type {number} */
    let xMin;
    /**@type {number} */
    let xMax;
    /**@type {number} */
    let yMin;
    /**@type {number} */
    let yMax;
    /**@type {number} */
    let zMin;
    /**@type {number} */
    let zMax;

    if (typeof obj === "object" && obj !== null) {
        disableAll = obj.hasOwnProperty("disableAll")
            ? !!obj.disableAll 
            : false;

        xMin = obj.hasOwnProperty("xMin") && isInsideInterval(GlobalPannerState.MIN, GlobalPannerState.MAX, obj.xMin)
            ? obj.xMin 
            : GlobalPannerState.MIN;
            
        xMax = obj.hasOwnProperty("xMax") && isInsideInterval(xMin, GlobalPannerState.MAX, obj.xMax)
            ? obj.xMax 
            : GlobalPannerState.MAX;

        yMin = obj.hasOwnProperty("yMin") && isInsideInterval(GlobalPannerState.MIN, GlobalPannerState.MAX, obj.yMin)
            ? obj.yMin 
            : GlobalPannerState.MIN;

        yMax = obj.hasOwnProperty("yMax") && isInsideInterval(yMin, GlobalPannerState.MAX, obj.yMax)
            ? obj.yMax 
            : GlobalPannerState.MAX;

        zMin = obj.hasOwnProperty("zMin") && isInsideInterval(GlobalPannerState.MIN, GlobalPannerState.MAX, obj.zMin)
            ? obj.zMin 
            : GlobalPannerState.MIN;

        zMax = obj.hasOwnProperty("zMax") && isInsideInterval(zMin, GlobalPannerState.MAX, obj.zMax)
            ? obj.zMax 
            : GlobalPannerState.MAX;
    } else {
        disableAll = false;
        xMin = GlobalPannerState.MIN;
        xMax = GlobalPannerState.MAX;
        yMin = GlobalPannerState.MIN;
        yMax = GlobalPannerState.MAX;
        zMin = GlobalPannerState.MIN;
        zMax = GlobalPannerState.MAX;
    }
    Object.defineProperties(this, {
        "disableAll": {
            get: function() { return disableAll },
            set: function(val) { if (typeof val === "boolean") disableAll = val; },
            enumerable: true
        },
        "xMin": {
            get: function() { return xMin },
            set: function(val) { if (typeof val === "number" && isInsideInterval(GlobalPannerState.MIN, this.xMax, val)) xMin = val; },
            enumerable: true
        },
        "xMax": {
            get: function() { return xMax },
            set: function(val) { if (typeof val === "number" && isInsideInterval(this.xMin, GlobalPannerState.MAX, val)) xMax = val; },
            enumerable: true
        },
        "yMin": {
            get: function() { return yMin },
            set: function(val) { if (typeof val === "number" && isInsideInterval(GlobalPannerState.MIN, this.yMax, val)) yMin = val; },
            enumerable: true
        },
        "yMax": {
            get: function() { return yMax },
            set: function(val) { if (typeof val === "number" && isInsideInterval(this.yMin, GlobalPannerState.MAX, val)) yMax = val; },
            enumerable: true
        },
        "zMin": {
            get: function() { return zMin },
            set: function(val) { if (typeof val === "number" && isInsideInterval(GlobalPannerState.MIN, this.zMax, val)) zMin = val; },
            enumerable: true
        },
        "zMax": {
            get: function() { return zMax },
            set: function(val) { if (typeof val === "number" && isInsideInterval(this.xMin, GlobalPannerState.MAX, val)) zMax = val; },
            enumerable: true
        }
    });
}
//STATIC PROPERTIES of GlobalPannerState
Object.defineProperties(GlobalPannerState, {
    MAX: {
        value: 50,
    },
    MIN: {
        value: -50,
    }
});

/**
 * @param {GlobalFilter} obj
 */
 function GlobalFilterState(obj) {
    /**@type {boolean}*/
    let disableAll;
    /**@type {number}*/
    let frequencyMin; 
    /**@type {number}*/
    let frequencyMax; 
    /**@type {number}*/
    let qMin; 
    /**@type {number}*/
    let qMax; 
    /**@type {[lowpass?, highpass?, bandpass?, peaking?, notch?]}*/
    let types;
    if (typeof obj === "object" && obj !== null) {
        disableAll = obj.hasOwnProperty("disableAll")
            ? !!obj.disableAll 
            : false;

        frequencyMin = obj.hasOwnProperty("frequencyMin") && isInsideInterval(GlobalFilterState.FREQ_MIN, GlobalFilterState.FREQ_MAX, obj.frequencyMin)
            ? obj.frequencyMin 
            : GlobalFilterState.FREQ_MIN;

        frequencyMax = obj.hasOwnProperty("frequencyMax") && isInsideInterval(frequencyMin, GlobalFilterState.FREQ_MAX, obj.frequencyMax)
            ? obj.frequencyMax 
            : GlobalFilterState.FREQ_MAX;

        qMin = obj.hasOwnProperty("qMin") && isInsideInterval(GlobalFilterState.Q_MIN, GlobalFilterState.Q_MAX, obj.qMin)
            ? obj.qMin 
            : GlobalFilterState.Q_MIN;

        qMax = obj.hasOwnProperty("qMax") && isInsideInterval(qMin, GlobalFilterState.Q_MAX, obj.qMax)
            ? obj.qMax 
            : GlobalFilterState.Q_MAX;

        if (obj.hasOwnProperty("types") && Array.isArray(obj.types)) {
            let arr = obj.types.filter(el => /lowpass|highpass|bandpass|notch/.test(el));
            types = arr.length === 0 ? GlobalFilterState.TYPES : arr;
        } else {
            types = GlobalFilterState.TYPES;
        }
    } else {
        disableAll = false;
        frequencyMin = GlobalFilterState.FREQ_MIN;
        frequencyMax = GlobalFilterState.FREQ_MAX;
        qMin = GlobalFilterState.Q_MIN;
        qMax = GlobalFilterState.Q_MAX;
        types = GlobalFilterState.TYPES;
    }
    Object.defineProperties(this, {
        "disableAll": {
            get: function() { return disableAll },
            set: function(val) { if (typeof val === "boolean") disableAll = val; },
            enumerable: true
        },
        "frequencyMin": {
            get: function() { return frequencyMin },
            set: function(val) { if (typeof val === "number" && isInsideInterval(GlobalFilterState.FREQ_MIN, this.frequencyMax, val)) frequencyMin = val; },
            enumerable: true
        },
        "frequencyMax": {
            get: function() { return frequencyMax },
            set: function(val) { if (typeof val === "number" && isInsideInterval(this.frequencyMin, GlobalFilterState.FREQ_MAX, val)) frequencyMax = val; },
            enumerable: true
        },
        "qMin": {
            get: function() { return qMin },
            set: function(val) { if (typeof val === "number" && isInsideInterval(GlobalFilterState.Q_MIN, this.qMax, val)) qMin = val; },
            enumerable: true
        },
        "qMax": {
            get: function() { return qMax },
            set: function(val) { if (typeof val === "number" && isInsideInterval(this.qMin, GlobalFilterState.Q_MAX, val)) qMax = val; },
            enumerable: true
        },
        "types": {
            get:function() { return types },
            set:function(val) {
                if (Array.isArray(val)) {
                    let arr = val.filter(el => /lowpass|highpass|bandpass|peaking|notch/.test(el));
                    if (arr.length !== 0) types = arr;
                } 
            },
            enumerable: true
        }
    });
}
//STATIC PROPERTIES of GlobalFilterState
Object.defineProperties(GlobalFilterState, {
    FREQ_MIN: { value: 40 },
    FREQ_MAX: { value: 18000 },
    Q_MIN: { value: 0.05 },
    Q_MAX: { value: 5 },
    TYPES: { value: ["lowpass", "highpass", "bandpass", "notch"] }
});

/**
 * The time representation is in seconds
 * and the feedback repesentation means gain values (this is between 0 and 1) 
 * @class GlobalDelayState
 * @param {GlobalDelay} obj
 */
function GlobalDelayState(obj) {
    /**@type {boolean} */
    let disableAll;
    /**@type {number} */
    let timeMin; 
    /**@type {number} */
    let timeMax; 
    /**@type {number} */
    let feedbackMin; 
    /**@type {number} */
    let feedbackMax;
    
    if (typeof obj === "object" && obj !== null) {
        disableAll = obj.hasOwnProperty("disableAll")
            ? !!obj.disableAll 
            : false;

        timeMin = obj.hasOwnProperty("timeMin") && isInsideInterval(GlobalDelayState.TIME_MIN, GlobalDelayState.TIME_MAX, obj.timeMin) 
            ? obj.timeMin 
            : GlobalDelayState.TIME_MIN;
        
        timeMax = obj.hasOwnProperty("timeMax") && isInsideInterval(timeMin, GlobalDelayState.TIME_MAX, obj.timeMax)
            ? obj.timeMax
            : GlobalDelayState.TIME_MAX;
    
        feedbackMin = obj.hasOwnProperty("feedbackMin") && isInsideInterval(GlobalDelayState.FBACK_MIN, GlobalDelayState.FBACK_MAX, obj.feedbackMin)
            ? obj.feedbackMin
            : GlobalDelayState.FBACK_MIN;

        feedbackMax = obj.hasOwnProperty("feedbackMax") && isInsideInterval(feedbackMin, GlobalDelayState.FBACK_MAX, obj.feedbackMax)
            ? obj.feedbackMax
            : GlobalDelayState.FBACK_MAX;
    } else {
        disableAll = false;
        timeMin = GlobalDelayState.TIME_MIN;
        timeMax = GlobalDelayState.TIME_MAX;
        feedbackMin = GlobalDelayState.FBACK_MIN;
        feedbackMax = GlobalDelayState.FBACK_MAX;
    }

    Object.defineProperties(this, {
        "disableAll": {
            get: function() { return disableAll },
            set: function(val) { if (typeof val === "boolean") disableAll = val; },
            enumerable: true
        },
        "timeMin": {
            get: function() { return timeMin },
            set: function(val) { if (typeof val === "number" && isInsideInterval(GlobalDelayState.TIME_MIN, this.timeMax, val)) timeMin = val; },
            enumerable: true
        },
        "timeMax": {
            get: function() { return timeMax },
            set: function(val) { if (typeof val === "number" && isInsideInterval(this.timeMax, GlobalDelayState.TIME_MAX, val)) timeMax = val; },
            enumerable: true
        },
        "feedbackMin": {
            get: function() { return feedbackMin },
            set: function(val) { if (typeof val === "number" && isInsideInterval(GlobalDelayState.FBACK_MIN, this.feedbackMax, val)) feedbackMin = val; },
            enumerable: true
        },
        "feedbackMax": {
            get: function() { return feedbackMax },
            set: function(val) { if (typeof val === "number" && isInsideInterval(this.feedbackMin, GlobalDelayState.FBACK_MAX, val)) feedbackMax = val; },
            enumerable: true
        }
    });

}
//STATIC PROPERTIES of GlobalDelayState
Object.defineProperties(GlobalDelayState, {
    TIME_MIN: { value: 0.1 },
    TIME_MAX: { value: 5 },
    FBACK_MIN: { value: 0.05 },
    FBACK_MAX: { value: 0.9 },
});

/**
 * The values in GlobalPlayBackRateState are velocity values 
 * in relation with the default value 1
 * @param {GlobalPlayBackRate} obj
 */
function GlobalPlayBackRateState(obj) {
    /** @type {boolean} */
    let disableAll; 
    /** @type {number} */
    let min;
    /** @type {number} */
    let max;

    if (typeof obj === "object" && obj !== null) {
        disableAll = obj.hasOwnProperty("disableAll")
            ? !!obj.disableAll 
            : false;
        min = obj.hasOwnProperty("min") && isInsideInterval(GlobalPlayBackRateState.MIN, GlobalPlayBackRateState.MAX, obj.min) 
            ? obj.min 
            : GlobalPlayBackRateState.MIN;
        max = obj.hasOwnProperty("min") && isInsideInterval(min, GlobalPlayBackRateState.MAX, obj.max) 
            ? obj.max 
            : GlobalPlayBackRateState.MAX;
    } else {
        disableAll = false;
        min = GlobalPlayBackRateState.MIN;
        max = GlobalPlayBackRateState.MAX;
    }
    Object.defineProperties(this,{
        "disableAll": {
            get: function() { return disableAll },
            set: function(val) { if (typeof val === "boolean") disableAll = val; },
            enumerable: true
        },
        "min": {
            get: function() { return min },
            set: function(val) { if (typeof val === "number" && isInsideInterval(GlobalPlayBackRateState.MIN, this.max, val)) min = val; },
            enumerable: true
        },
        "max": {
            get: function() { return max },
            set: function(val) { if (typeof val === "number" && isInsideInterval(this.min, GlobalPlayBackRateState.MIN, val)) max = val; },
            enumerable: true
        },
    });
}
//STATIC PROPERTIES of GlobalPlayBackRateState
Object.defineProperties(GlobalPlayBackRateState, {
    MIN: { value: 0.5 },
    MAX: { value: 2 }
});

/**
 * The time representation is in miliseconds
 * @param {GlobalTimeInterval} obj 
 */
function TimeIntervalState(obj) {
    /** @type {boolean} */
    let min;
    /** @type {boolean} */
    let max;
    if (typeof obj === "object" && obj !== null) {
        min = obj.hasOwnProperty("min") && isInsideInterval(TimeIntervalState.MIN, TimeIntervalState.MAX,obj.min)
            ? obj.min
            : TimeIntervalState.MIN ;
        max = obj.hasOwnProperty("max") && isInsideInterval(min, TimeIntervalState.MAX, obj.max)
            ? obj.max
            : TimeIntervalState.MAX ;
    } else {
        min = TimeIntervalState.MIN;
        max = TimeIntervalState.MAX;
    }
    Object.defineProperties(this, {
        "min": {
            get: function() { return min },
            set: function(val) { if (typeof val === "number" && isInsideInterval(TimeIntervalState.MIN, this.max, val)) min = val; },
            enumerable: true
        },
        "max": {
            get: function() { return max },
            set: function(val) { if (typeof val === "number" && isInsideInterval(this.min, TimeIntervalState.MAX, val)) max = val; },
            enumerable: true
        },
    });
}
//STATIC PROPERTIES of TimeIntervalState
Object.defineProperties(TimeIntervalState, {
    MIN: { value: 400 },
    MAX: { value: 600000 }
});

/**
 * The Time values representation are in miliseconds 
 * @class FadeTime
 * @param {number} n
 */
 function FadeTime(n) {
    /**@type {number}*/
    let fadeTime = typeof n === "number" && isInsideInterval(FadeTime.MIN, FadeTime.MAX, n) 
        ? n
        : 150;//default
    Object.defineProperty(this, "time", {
        get: function() { return fadeTime; },
        set: function(n) {
            if (typeof n === "number" && isInsideInterval(FadeTime.MIN, FadeTime.MAX, n) )
                fadeTime = n;
        }
    });
}
//STATIC PROPERTIES of TimeIntervalState
Object.defineProperties(FadeTime, {
    MIN: { value: 15 },
    MAX: { value: 500 }
});

/**
 * An array that each number is a represent of a set length
 * and the value in each index is a rate of the set posibility9
 * @class ProbabilityOfExecutionSets
 */
function ProbabilityOfExecutionSets() {
    /** @type {number[]} */
    let arrOfValues = [1];

    Object.defineProperties(this, {
        "length": {
            get: function() { return arrOfValues.length },
            enumerable: true
        },
        "values": {
            get: function() { return [...arrOfValues] },
            enumerable: true 
        },
        "get": {
            value: function(i) {
                if (typeof i === "number") return arrOfValues[i];
            },
            enumerable: true
        },
        "push": {
            value: function() { arrOfValues.push(1); },
            enumerable: true
        },
        "pop": {
            value: function() { if (this.length > 1) arrOfValues.pop(); },
            enumerable: true
        },
        "reset": {
            value: function() { 
                arrOfValues = (new Array(this.length)).fill(1);
            },
            enumerable: true
        },
        "set": {
            value: function(i, value) {
                if (typeof i === "number"
                 && i < this.length 
                 && typeof value === "number" 
                 && value > -1
                ) {
                    arrOfValues[i] = value;
                } 
            },
            enumerable: true
        },
        "clear": {
            value: function() { arrOfValues = [1]; },
            enumerable: true
        },
        /**
         * @returns {number}
         */
        "lengthOfExecutionSet": {
            /**
             * @returns {number}
             */
            value: function() {
                let arrOfSetsLength = [];
                arrOfValues.forEach((v,i) => {
                    if (v > 0) {
                        let arr = (new Array(v)).fill(i);
                        arrOfSetsLength = arrOfSetsLength.concat(arr);
                    }
                });
                let n = random(0, arrOfSetsLength.length - 1);
                return arrOfSetsLength[n];
            },
            enumerable: true
        }
    }); 
}

/**
 * @param {ElementsState} obj
 * @return {GlobalState}
 */
const createGlobalState = (elementsState) => {
    const globalState = {}
    /**@type {"audioBuffer"|"audioNode"}*/
    let engine = "audioBuffer";
    /**@type {boolean}*/
    let randomCurrentTimeDisable = elementsState?.randomCurrentTimeDisable ?? true;
    /**@type {boolean}*/
    let isStarted = false;
 

    Object.defineProperties(globalState, {
        "AUDIO_CONTEXT": {
            value: null,
            writable: true,
            enumerable: true
        },
        "AUDIO_MAP": {
            value: new Map(),
            enumerable: true
        },
        "ADD_Audio": {
            value: function (id, value) {
                globalState.AUDIO_MAP.set(id, value);
                globalState.probabilityOfExecutionSets.push();
            },
            enumerable: true
        },
        "DELETE_Audio": {
            value: function (id) {
                globalState.AUDIO_MAP.delete(id);
                globalState.probabilityOfExecutionSets.pop();
            },
            enumerable: true
        },
        "CLEAR_Audio": {
            value: function (id) {
                globalState.AUDIO_MAP.clear();
                globalState.probabilityOfExecutionSets.clear();
            },
            enumerable: true
        },
        "delay": {
            value: new GlobalDelayState(elementsState?.delay),
            enumerable: true
        },
        "engine": {
            get: function() { return engine; },
            set: function(val) { 
                if (val === "audioNode")
                    engine = "audioNode";
                else 
                    engine = "audioBuffer";
            }
        },
        "fadeTime": {
            value: new FadeTime(elementsState?.fadeIn),
            enumerable: true
        },
        "filter": {
            value: new GlobalFilterState(elementsState?.filter),
            enumerable: true
        }, 
        "hasAudios": {
            get: function() { return this.AUDIO_MAP.size !== 0 },
            enumerable: true
        },
        "isStarted": {
            get: function() { return isStarted },
            set: function(val) {
                if (typeof val === "boolean") {
                    isStarted = val;
                }
            },
            enumerable: true
        },
        "panner": {
            value: new GlobalPannerState(elementsState?.panner),
            enumerable: true
        },
        "playBackRate": {
            value: new GlobalPlayBackRateState(elementsState?.playBackRate),
            enumerable: true
        },
        "randomCurrentTimeDisable": {
            get: function () { return randomCurrentTimeDisable },
            set: function(val) { if (typeof val === "boolean") randomCurrentTimeDisable = val },
            enumerable: true
        },
        "probabilityOfExecutionSets": {
            value: new ProbabilityOfExecutionSets(),
            enumerable: true
        },
        "timeInterval": {
            value: new TimeIntervalState(elementsState?.timeInterval),
            enumerable: true
        }
    });
    return globalState;
}

/**
 * @returns {ElementsState}
 */
const getGlobalStatesLimit = () => ({
    delay: {
        timeMin: GlobalDelayState.TIME_MIN, 
        timeMax: GlobalDelayState.TIME_MAX,
        feedbackMin: GlobalDelayState.FBACK_MIN,
        feedbackMax: GlobalDelayState.FBACK_MAX
    },
    filter: {
        frequencyMin: GlobalFilterState.FREQ_MIN,
        frequencyMax: GlobalFilterState.FREQ_MAX,
        qMin: GlobalFilterState.Q_MIN,
        qMax: GlobalFilterState.Q_MAX,
        types: GlobalFilterState.TYPES
    },
    panner: {
        xMin: GlobalPannerState.MIN,
        xMax: GlobalPannerState.MAX,
        yMin: GlobalPannerState.MIN,
        yMax: GlobalPannerState.MAX,
        zMin: GlobalPannerState.MIN,
        zMax: GlobalPannerState.MAX
    },
    playBackRate: {
        min: GlobalPlayBackRateState.MIN,
        max: GlobalPlayBackRateState.MAX
    },
    timeInterval: { 
        min: TimeIntervalState.MIN, 
        max: TimeIntervalState.MAX 
    },
    fadeTime: {
        min: FadeTime.MIN,
        max: FadeTime.MAX
    }
});

/* -------------------------------------------------------------------------- */
/*                                Audio States                                */
/* -------------------------------------------------------------------------- */
/**
 * @class AudioDelayState
 * @param {GlobalDelayState} globalDelayState
 */
function AudioDelayState(globalDelayState) {
    /**@type {string}*/
    const channelCountMode = "max";
    /**@type {string}*/
    const channelInterpretation = "speakers";
    /**@type {number}*/
    const maxDelayTime = GlobalDelayState.TIME_MAX;
    /**@type {boolean}*/
    let isDisable = globalDelayState.disableAll;
    /**@type {number}*/
    let delayTime = random(globalDelayState.timeMin * 10, globalDelayState.timeMax * 10) / 10;
    /**@type {number}*/
    let feedback = random(globalDelayState.feedbackMin * 100, globalDelayState.feedbackMax * 100) / 100;
    
    Object.defineProperties(this, {
        "channelCountMode": {
            get: function() { return channelCountMode }
        },
        "channelInterpretation": {
            get: function() { return channelInterpretation }
        },
        "maxDelayTime": {
            get: function() { return maxDelayTime }
        },
        "isDisable": {
            get: function () { return isDisable },
            set: function(val) { if (typeof val === "boolean") isDisable = val },
            enumerable: true
        },
        "delayTime": {
            get: function () { return delayTime },
            enumerable: true
        },
        "feedback": {
            get: function () { return feedback },
            enumerable: true
        },
        "random": {
            value: function(globalDelayState) {
                delayTime = random(globalDelayState.timeMin * 10, globalDelayState.timeMax * 10) / 10;
                feedback = random(globalDelayState.feedbackMin * 100, globalDelayState.feedbackMax * 100) / 100;
            },
            enumerable: true
        }
    });
}

/**
 * @class AudioDelayState
 * @param {GlobalFilterState} globalFilterState 
 */
function AudioFilterState(globalFilterState) {
    /**@type {string}*/
    const channelCountMode = "max";
    /**@type {string}*/
    const channelInterpretation = "speakers";
    /**@type {number}*/
    const detune = 0;
    /**@type {number}*/
    const gain = 1;
    /**@type {boolean}*/
    let isDisable = globalFilterState.disableAll;
    /**@type {number}*/
    let frequency = random(globalFilterState.frequencyMin, globalFilterState.frequencyMax);
    /**@type {number}*/
    let q = random(globalFilterState.qMin * 10, globalFilterState.qMax * 10) / 10;
    /**@type {string}*/
    let type = (globalFilterState.types.length === 0) 
        ? "allpass"
        : globalFilterState.types[random(0, globalFilterState.types.length)];
    
    Object.defineProperties(this, {
        "channelCountMode": {
            get: function() { return channelCountMode }
        },
        "channelInterpretation": {
            get: function() { return channelInterpretation }
        },
        "detune": {
            get: function() { return detune }
        },
        "gain": {
            get: function() { return gain }
        },
        "type": {
            get: function() { return type }
        },
        "q": {
            get: function () { return q },
            enumerable: true
        },
        "frequency": {
            get: function () { return frequency },
            enumerable: true
        },
        "isDisable": {
            get: function () { return isDisable },
            set: function(val) { if (typeof val === "boolean") isDisable = val },
            enumerable: true
        },
        "random": {
            value: function(globalFilterState) {
                frequency = random(globalFilterState.frequencyMin, globalFilterState.frequencyMax);
                q = random(globalFilterState.qMin * 10, globalFilterState.qMax * 10) / 10;
                type = (globalFilterState.types.length === 0) 
                    ? "allpass"
                    : globalFilterState.types[random(0, globalFilterState.types.length)];
            },
            enumerable: true
        }
    });
}

/**
 * @constructor AudioPannerState
 * @param {GlobalPannerState} globalPannerState 
 */
 function AudioPannerState(globalPannerState) {
     /**@type {string}*/
    const panningModel = "HRTF";
    /**@type {string}*/
    const channelCountMode = "inverse";
    /**@type {number}*/
    const listenerPositionX = 6;
    /**@type {number}*/
    const listenerPositionY = 6;
    /**@type {number}*/
    const listenerPositionZ = 6;
    /**@type {number}*/
    const refDistance = 1;
    /**@type {number}*/
    const maxDistance = 10000;
    /**@type {number}*/
    const rolloffFactor = 1;
    /**@type {number}*/
    const coneInnerAngle = 360;
    /**@type {number}*/
    const coneOuterAngle = 0;
    /**@type {number}*/
    const coneOuterGain = 0;

    /**@type {boolena}*/
    let isDisable = globalPannerState.disableAll;
    /**@type {number}*/
    let x = random(globalPannerState.xMin / 10, globalPannerState.xMax /10) + listenerPositionX;
    /**@type {number}*/
    let y = random(globalPannerState.yMin / 10, globalPannerState.yMax /10) + listenerPositionY;
    /**@type {number}*/
    let z = random(globalPannerState.zMin / 10, globalPannerState.zMax /10) + listenerPositionZ;

    Object.defineProperties(this, {
        "panningModel": {
            get: function() { return panningModel }
        },
        "channelCountMode": {
            get: function() { return channelCountMode }
        },
        "listenerPositionX": {
            get: function() { return listenerPositionX }
        },
        "listenerPositionY": {
            get: function() { return listenerPositionY }
        },
        "listenerPositionZ": {
            get: function() { return listenerPositionZ }
        },
        "refDistance": {
            get: function() { return refDistance }
        },
        "maxDistance": {
            get: function() { return maxDistance }
        },
        "rolloffFactor": {
            get: function() { return rolloffFactor }
        },
        "coneInnerAngle": {
            get: function() { return coneInnerAngle }
        },
        "coneOuterAngle": {
            get: function() { return coneOuterAngle }
        },
        "coneOuterGain": {
            get: function() { return coneOuterGain }
        },
        "x": {
            get: function() { return x },
            enumerable: true
        },
        "y": {
            get: function() { return y },
            enumerable: true
        },
        "z": {
            get: function() { return z },
            enumerable: true
        },
        "isDisable": {
            get: function() { return isDisable },
            set: function(val) { if (typeof val === "boolean") isDisable = val },
            enumerable: true
        },
        "random": {
            value: function(globalPannerState) {
                x = random(globalPannerState.xMin / 10, globalPannerState.xMax /10) + this.listenerPositionX;
                y = random(globalPannerState.yMin / 10, globalPannerState.yMax /10) + this.listenerPositionY;
                z = random(globalPannerState.zMin / 10, globalPannerState.zMax /10) + this.listenerPositionZ;
            },
            enumerable: true
        }
    });
}

/**
 * @class AudioPlayBackRateState
 * @param {GlobalPlayBackRateState} globalPlayBackRateState
 */
function AudioPlayBackRateState(globalPlayBackRateState) {
    /**@type {boolean}*/
    let isDisable = globalPlayBackRateState?.disableAll ?? false;
    /**@type {number}*/
    let rate = random(globalPlayBackRateState.min * 10, globalPlayBackRateState.max * 10) / 10;
    
    Object.defineProperties(this, {
        "value": {
            get: function() { return rate }
        },
        "isDisable": {
            get: function() { return isDisable },
            set: function(val) { if (typeof val === "boolean") isDisable = val },
            enumerable: true
        },
        "random": {
            value: function(globalPlayBackRateState) {
                rate = random(globalPlayBackRateState.min * 10, globalPlayBackRateState.max * 10) / 10;
            },
            enumerable: true
        }
    });
}

/**
 * @class RandomCurrentTime
 * @param {boolean} randomAudioCurrentTime 
 */
function RandomCurrentTime(GSRandomCurrentTimeDisable = true) {
    /**@type {boolean}*/
    let randomCurrentTimeDisable = GSRandomCurrentTimeDisable;
    /**@type {nmumber}*/
    let VALUE = 0;

    Object.defineProperties(this, {
        "isDisable": {
            get: function() { return randomCurrentTimeDisable },
            set: function(val) {
                if (typeof val === "boolean") 
                    randomCurrentTimeDisable = val;
            },
            enumerable: true
        },
        "value": {
            get: function() { return VALUE; },
            set: function(val) { if (typeof val === "number") VALUE = val },
            enumerable: true
        },
        "random": {
            value: function(startTimePoint, endTimePoint) {
                if (typeof endTimePoint === "number"  && endTimePoint - startTimePoint >= 2) {
                    VALUE = random((startTimePoint * 1000), (endTimePoint* 1000) - 400) / 1000;
                } else {
                    VALUE = startTimePoint;
                }
            },
            enumerable: true
        }
    });
}

/**
 * @param {ElementsState} elementsState 
 * @param {string} id 
 * @param {string} title 
 * @param {string} type 
 * @param {number} duration 
 * @return {AudioState}
 */
function createAudioState(id, title, type, duration, elementsState) {
    /**@type {AudioState}*/
    const audioState = {};

    /**@type {number}*/
    const DURATION = duration || 0; //in seconds
    /**@type {number}*/
    const MAX_VOLUME = 1; //100%
    /**@type {number}*/
    const MIN_VOLUME = 0.1; //the min is the 10% of the MAX_VOLUME
    /**@type {number}*/
    let startTimePoint = 0;//in seconds
    /**@type {number}*/
    let endTimePoint = DURATION;//in seconds
    /**@type {number}*/
    let volume = MAX_VOLUME //* 80 / 100;
    /**@type {boolean}*/
    let isPlaying = false;
    /**@type {number}*/
    let startNum = 0;

    Object.defineProperties(audioState, {
        "MAX_VOLUME": { 
            get: function() { return MAX_VOLUME }
        },
        "duration": { 
            get: function() { return DURATION }
        },
        "audioEngine": {
            value: null,
            writable: true,
            enumerable: true
        },
        "delay": {
            value: new AudioDelayState(elementsState?.delay),
            enumerable: true
        },
        "endTimePoint": {
            value: {
                get: function() { return endTimePoint },
                set: function(val) { 
                    if (typeof val !== "number" || DURATION <= 0.5) return;
                    //we keep 0.4 seconds of sound
                    endTimePoint = val < startTimePoint + 0.5 
                    ? startTimePoint + 0.5
                    : DURATION < val
                    ? DURATION
                    : val;
                }
            },
            enumerable: true
        },
        "filter": {
            value: new AudioFilterState(elementsState?.filter),
            enumerable: true
        }, 
        "id": {
            value: id,
            enumerable: true
        },
        "isPlaying": {
            get: function() { return isPlaying },
            set: function(val) { if (typeof val === "boolean") isPlaying = val },
            enumerable: true
        },
        "startNum": { 
            value: {
                get: function() { return startNum },
                set: function() {
                    if (startNum === 50) startNum = 0;
                    else startNum = startNum + 1; 
                    return startNum;
                },
            },
            enumerable: true
        },
        "outputGain": {
            value: null,
            writable: true,
            enumerable: true
        },
        "panner": {
            value: new AudioPannerState(elementsState?.panner),
            enumerable: true
        }, 
        "playBackRate": {
            value: new AudioPlayBackRateState(elementsState?.playBackRate),
            enumerable: true
        },
        "randomCurrentTime": {
            value: new RandomCurrentTime(elementsState?.randomCurrentTimeDisable),
            enumerable: true
        },
        "source": {
            value: null,
            writable: true,
            enumerable: true
        },
        "startTimePoint": {
            value: {
                get: function() { return startTimePoint },
                set: function(val) { 
                    if (typeof val !== "number" || DURATION <= 0.5) return;
                    //we keep 0.4 seconds of sound 
                    startTimePoint = val > endTimePoint - 0.5
                    ? endTimePoint - 0.5
                    : val < 0 
                    ? 0
                    : val;
                },
            },
            enumerable: true
        },
        "title": {
            value: title,
            enumerable: true
        },
        "type": {
            value: type,
            enumerable: true
        },
        "volume": {
            value: {
                get: function() { return volume },
                set: function(val) { 
                    if (typeof val !== "number") return;  
                    volume = val < MIN_VOLUME
                        ? MIN_VOLUME
                        : val > MAX_VOLUME
                        ? MAX_VOLUME
                        : val;
                },
            },
            enumerable: true
        }
    });
    return audioState;
}

/* -------------------------------------------------------------------------- */
/*                                Functions                                   */
/* -------------------------------------------------------------------------- */
/**
 * Looks if a number exist in a close interval 
 * @param {number} min 
 * @param {number} max 
 * @param {number} val 
 * @returns {boolean}
 */
 const isInsideInterval = (min, max, val) => min <= val && val <= max; 

/**
 * create a random arbitrary number
 * @param {number} min the min number (real number) to the random interval
 * @param {number} max the max number (real number) to the random interval
 * @returns {number} a pseudo random integer number
 */
 function random(min, max){
    try{
        if(typeof min !== 'number') throw new Error("min argument in random method must be a number");
        if(typeof max !== 'number') throw new Error("max argument in random method must be a number");
        
        min = Math.ceil(min);
        max = Math.floor(max);

        //if (min > max) [min, max] = [max, min];//swap

        return Math.floor(Math.random() * (max - min + 1) + min);
    } catch(err){
        console.error(err);
        return err;
    }    
}

/**
 * This function return a random True or False
 * we will use to decide the logic structure randomly
 * @returns {boolean}
 */
const randomDecide = () => !!random(0,1);

export { 
    createGlobalState, 
    getGlobalStatesLimit,
    createAudioState,
    randomDecide,
    random
};