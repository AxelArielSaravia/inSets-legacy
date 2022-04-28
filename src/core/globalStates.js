/**
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
 *  types?: ["lowpass"?, "highpass"?, "bandpass"?, "peaking"?, "notch"?]
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
 *  timeInterval?: timeInterval, 
 *  panner?: panner, 
 *  filter?: filter, 
 *  delay?: delay, 
 *  playBackRate?: playBackRate
 * }} ElementsState
 * 
 * @typedef {{ 
 *  hasAudioFiles: boolean,
 *  isPlaying: boolean,
 *  isLoading: boolean,
 *  audioFiles: number
 *  } & ElementsState} GlobalState
 * 
 */

/**
 * Looks if a number exist in a close interval 
 * @param {number} min 
 * @param {number} max 
 * @param {number} val 
 * @returns {boolean}
 */
const insideInterval = (min, max, val) => min <= val && val <= max; 
 
class DelayState {
    static get TIME_MIN() { return 0.1; }
    static get TIME_MAX() { return 5; }
    static get FBACK_MIN() { return 0.05; }
    static get FBACK_MAX() { return 0.9; }

    #disableAll;#timeMin; #timeMax; #feedbackMin; #feedbackMax;
    /**
     * @param {GlobalDelay} obj
     */
    constructor(obj) {
        if (typeof obj === "object" && obj !== null) {
            this.#disableAll = obj.hasOwnProperty("disableAll")
                ? !!obj.disableAll 
                : false;

            this.#timeMin = obj.hasOwnProperty("timeMin") && insideInterval(DelayState.TIME_MIN, DelayState.TIME_MAX,obj.timeMin) 
                ? obj.timeMin 
                : DelayState.TIME_MIN;
            
            this.#timeMax = obj.hasOwnProperty("timeMax") && insideInterval(DelayState.TIME_MIN, DelayState.TIME_MAX,obj.timeMax)
                ? obj.timeMax
                : DelayState.TIME_MIN;
        
            this.#feedbackMin = obj.hasOwnProperty("feedbackMin") && insideInterval(DelayState.FBACK_MIN, DelayState.FBACK_MAX,obj.feedbackMin)
                ? obj.feedbackMin
                : DelayState.FBACK_MIN;

            this.#feedbackMax = obj.hasOwnProperty("feedbackMax") && insideInterval(DelayState.FBACK_MIN, DelayState.FBACK_MAX,obj.feedbackMax)
                ? obj.feedbackMax
                : DelayState.FBACK_MAX;
        } else {
            this.#disableAll = false;
            this.#timeMin = DelayState.TIME_MIN;
            this.#timeMax = DelayState.TIME_MAX;
            this.#feedbackMin = DelayState.FBACK_MIN;
            this.#feedbackMax = DelayState.FBACK_MAX;
        }
    }
    get disableAll() { return this.#disableAll }
    set disableAll(val) { if (typeof val === "boolean") this.#disableAll = val; }
    get timeMin() { return this.#timeMin }
    set timeMin(val) { if (typeof val === "number" && insideInterval(DelayState.TIME_MIN, DelayState.TIME_MAX, val)) this.#timeMin = val }
    get timeMax() { return this.#timeMax }
    set timeMax(val) { if (typeof val === "number" && insideInterval(DelayState.TIME_MIN, DelayState.TIME_MAX, val)) this.#timeMax = val }
    get feedbackMin() { return this.#feedbackMin }
    set feedbackMin(val) { if (typeof val === "number" && insideInterval(DelayState.FBACK_MIN, DelayState.FBACK_MAX, val)) this.#feedbackMin = val }
    get feedbackMax() { return this.#feedbackMax }
    set feedbackMax(val) { if (typeof val === "number" && insideInterval(DelayState.FBACK_MIN, DelayState.FBACK_MAX, val)) this.#feedbackMax = val }
}

class FilterState {
    static get FREQ_MIN() { return 80; }
    static get FREQ_MAX() { return 18000; }
    static get Q_MIN() { return 0.05; }
    static get Q_MAX() { return 5; }
    static get TYPES() { return new Set(["lowpass", "highpass", "bandpass", "peaking", "notch"]); }

    #disableAll; #frequencyMin; #frequencyMax; #qMin; #qMax; #types;
    /**
     * @param {GlobalFilter} obj
     */
    constructor(obj) {
        if (typeof obj === "object" && obj !== null) {
            this.#disableAll = obj.hasOwnProperty("disableAll")
                ? !!obj.disableAll 
                : false;

            this.#frequencyMin = obj.hasOwnProperty("frequencyMin") && insideInterval(FilterState.FREQ_MIN, FilterState.FREQ_MAX, obj.frequencyMin)
                ? obj.frequencyMin 
                : FilterState.FREQ_MIN;

            this.#frequencyMax = obj.hasOwnProperty("frequencyMax") && insideInterval(FilterState.FREQ_MIN, FilterState.FREQ_MAX, obj.frequencyMax)
                ? obj.frequencyMax 
                : FilterState.FREQ_MAX;

            this.#qMin = obj.hasOwnProperty("qMin") && insideInterval(FilterState.Q_MIN, FilterState.Q_MAX, obj.qMin)
                ? obj.qMin 
                : FilterState.Q_MIN;

            this.#qMax = obj.hasOwnProperty("qMax") && insideInterval(FilterState.Q_MIN, FilterState.Q_MAX, obj.qMax)
                ? obj.qMax 
                : FilterState.Q_MAX;

            if (obj.hasOwnProperty("types") && Array.isArray(obj.types)) {
                let arr = obj.types.filter(el => /lowpass|highpass|bandpass|peaking|notch/.test(el));
                this.#types = arr.length === 0 ? FilterState.TYPES : arr;
            } else {
                this.#types = FilterState.TYPES;
            }
        } else {
            this.#disableAll = false;
            this.#frequencyMin = FilterState.FREQ_MIN;
            this.#frequencyMax = FilterState.FREQ_MAX;
            this.#qMin = FilterState.Q_MIN;
            this.#qMax = FilterState.Q_MAX;
            this.#types = FilterState.TYPES;
        }
    }
    get disableAll() { return this.#disableAll }
    set disableAll(val) { if (typeof val === "boolean") this.#disableAll = val; }
    get frequencyMin() { return this.#frequencyMin }
    set frequencyMin(val) { if (typeof val === "number" && insideInterval(FilterState.FREQ_MIN, FilterState.FREQ_MAX, val)) this.#frequencyMin = val }
    get frequencyMax() { return this.#frequencyMax }
    set frequencyMax(val) { if (typeof val === "number" && insideInterval(FilterState.FREQ_MIN, FilterState.FREQ_MAX, val)) this.#frequencyMax = val }
    get qMin() { return this.#qMin }
    set qMin(val) { if (typeof val === "number" && insideInterval(FilterState.Q_MIN, FilterState.Q_MAX, val)) this.#qMin = val }
    get qMax() { return this.#qMax }
    set qMax(val) { if (typeof val === "number" && insideInterval(FilterState.Q_MIN, FilterState.Q_MAX, val)) this.#qMax = val }
    get types() { return this.#types }
    set types(val) {
        if (Array.isArray(val)) {
            let arr = val.filter(el => /lowpass|highpass|bandpass|peaking|notch/.test(el));
            if (arr.length !== 0) this.#types = arr;
        } 
    }
}

class PannerState {
    static get MAX() { return 50; }
    static get MIN() { return -50; }
    
    #disableAll; #xMin; #xMax; #yMin; #yMax; #zMin; #zMax;
    /**
     * @param {GlobalPanner} obj
     */
    constructor(obj) {
        if (typeof obj === "object" && obj !== null) {
            this.#disableAll = obj.hasOwnProperty("disableAll")
                ? !!obj.disableAll 
                : false;
    
            this.#xMin = obj.hasOwnProperty("xMin") && insideInterval(PannerState.MIN, PannerState.MAX, obj.xMin)
                ? obj.xMin 
                : PannerState.MIN;
                
            this.#xMax = obj.hasOwnProperty("xMax") && insideInterval(PannerState.MIN, PannerState.MAX, obj.xMax)
                ? obj.xMax 
                : PannerState.MAX;
    
            this.#yMin = obj.hasOwnProperty("yMin") && insideInterval(PannerState.MIN, PannerState.MAX, obj.yMin)
                ? obj.yMin 
                : PannerState.MIN;
    
            this.#yMax = obj.hasOwnProperty("yMax") && insideInterval(PannerState.MIN, PannerState.MAX, obj.yMax)
                ? obj.yMax 
                : PannerState.MAX;
    
            this.#zMin = obj.hasOwnProperty("zMin") && insideInterval(PannerState.MIN, PannerState.MAX, obj.zMin)
                ? obj.zMin 
                : PannerState.MIN;
    
            this.#zMax = obj.hasOwnProperty("zMax") && insideInterval(PannerState.MIN, PannerState.MAX, obj.zMax)
                ? obj.zMax 
                : PannerState.MAX;
        } else {
            this.#disableAll = false;
            this.#xMin = PannerState.MIN;
            this.#xMax = PannerState.MAX;
            this.#yMin = PannerState.MIN;
            this.#yMax = PannerState.MAX;
            this.#zMin = PannerState.MIN;
            this.#zMax = PannerState.MAX;
        }
    }
    get disableAll() { return this.#disableAll }
    set disableAll(val) { if (typeof val === "boolean") this.#disableAll = val; }
    get xMin() { return this.#xMin }
    set xMin(val) { if (typeof val === "number" && insideInterval(PannerState.MIN, PannerState.MAX, val)) this.#xMin = val; }
    get xMax() { return this.#xMax }
    set xMax(val) { if (typeof val === "number" && insideInterval(PannerState.MIN, PannerState.MAX, val)) this.#xMax = val; }
    get yMin() { return this.#yMin }
    set yMin(val) { if (typeof val === "number" && insideInterval(PannerState.MIN, PannerState.MAX, val)) this.#yMin = val; }
    get yMax() { return this.#yMax }
    set yMax(val) { if (typeof val === "number" && insideInterval(PannerState.MIN, PannerState.MAX, val)) this.#yMax = val; }
    get zMin() { return this.#zMin }
    set zMin(val) { if (typeof val === "number" && insideInterval(PannerState.MIN, PannerState.MAX, val)) this.#zMin = val; }
    get zMax() { return this.#zMax }
    set zMax(val) { if (typeof val === "number" && insideInterval(PannerState.MIN, PannerState.MAX, val)) this.#zMax = val; }
}

class PlayBackRateState {
    static get MIN() { return 0.8; }
    static get MAX() { return 2; }

    #disableAll; #min; #max;
    /**
     * @param {GlobalPlayBackRate} obj
     */
    constructor(obj) {
        if (typeof obj === "object" && obj !== null) {
            this.#disableAll = obj.hasOwnProperty("disableAll")
                ? !!obj.disableAll 
                : false;
            this.#min = obj.hasOwnProperty("min") && insideInterval(PlayBackRateState.MIN, PlayBackRateState.MAX, obj.min) 
                ? obj.min 
                : PlayBackRateState.MIN;
            this.#max = obj.hasOwnProperty("min") && insideInterval(PlayBackRateState.MIN, PlayBackRateState.MAX, obj.max) 
                ? obj.max 
                : PlayBackRateState.MAX;
        } else {
            this.#disableAll = false;
            this.#min = PlayBackRateState.MIN;
            this.#max = PlayBackRateState.MAX;
        }
    }
    get disableAll() { return this.#disableAll }
    set disableAll(val) { if (typeof val === "boolean") this.#disableAll = val; }
    get min() { return this.#min }
    set min(val) { if (typeof val === "number" && insideInterval(PlayBackRateState.MIN, PlayBackRateState.MAX, val)) this.#min = val; }
    get max() { return this.#max }
    set max(val) { if (typeof val === "number" && insideInterval(PlayBackRateState.MIN, PlayBackRateState.MAX, val)) this.#max = val; }
}

class TimeIntervalState {
    static get MAX() { return 600000; }
    static get MIN() { return 400; }

    #min; #max;
    /**
     * @param {GlobalTimeInterval} obj 
     */
    constructor(obj) {
        if (typeof obj === "object" && obj !== null) {
            this.#min = obj.hasOwnProperty("min") && insideInterval(TimeIntervalState.MIN, TimeIntervalState.MAX,obj.min)
                ? obj.min
                : TimeIntervalState.MIN ;
            this.#max = obj.hasOwnProperty("max") && insideInterval(TimeIntervalState.MIN, TimeIntervalState.MAX, obj.max)
                ? obj.max
                : TimeIntervalState.MAX ;
        } else {
            this.#min = TimeIntervalState.MIN;
            this.#max = TimeIntervalState.MAX;
        }
    }
    get min() { return this.#min }
    set min(val) { if (typeof val === "number" && insideInterval(TimeIntervalState.MIN, TimeIntervalState.MAX, val)) this.#min = val; }
    get max() { return this.#max }
    set max(val) { if (typeof val === "number" && insideInterval(TimeIntervalState.MIN, TimeIntervalState.MAX, val)) this.#max = val; }
}

/**
 * An array that each number is a represent of a set length
 * and the value in each index is a rate of the set posibility
 */
class Sets {
    #sets = [1]; //Default value (i:0 === silence )
    /**
     * @param {number} i 
     * @returns {number|undefined}
     */
    get length() { return this.#sets.length; }
    get(i) {
        if (typeof i !== "number") return;
        return this.#sets[i];
    }
    set(i, value) {
        if (typeof i === "number" && typeof value === "number" && value > -1) {
            this.#sets[i] = value;
        } 
    }
}

/**
 * @param {ElementsState} obj
 * @return {GlobalState}
 */
const createGlobalState = (elementsState) => {
    const globalState = {}

    let hasAudioFiles = false;
    let isPlaying = false;
    let isLoading = false;
    let audioFiles = 0;

    Object.defineProperties(globalState, {
        "hasAudioFiles": {
            get: function() { return hasAudioFiles },
            set: function(bool) { if (typeof bool === "boolean") hasAudioFiles = bool  },
            enumerable: true
        },
        "isPlaying": {
            get: function() { return isPlaying },
            set: function(bool) { if (typeof bool === "boolean") isPlaying = bool  },
            enumerable: true
        },
        "isLoading": {
            get: function() { return isLoading },
            set: function(bool) { if (typeof bool === "boolean") isLoading = bool  },
            enumerable: true
        },
        "audioFiles": {
            get: function() { return audioFiles },
            set: function(val) { 
                if (typeof val === "number") audioFiles = val  
                if (audioFiles < 0) audioFiles = 0;
            },
            enumerable: true
        },
        "sets": {
            value: new Sets(),
            enumerable: true
        },
        "timeInterval": {
            value: new TimeIntervalState(elementsState.timeInterval),
            enumerable: true
        },
        "panner": {
            value: new PannerState(elementsState.panner),
            enumerable: true
        }, 
        "filter": {
            value: new FilterState(elementsState.filter),
            enumerable: true
        }, 
        "delay": {
            value: new DelayState(elementsState.delay),
            enumerable: true
        },
        "playBackRate": {
            value: new PlayBackRateState(elementsState.playBackRate),
            enumerable: true
        }
    });
    return globalState;
}

/**
 * @returns {ElementsState}
 */
const getGlobalStatesLimit = () => ({
    timeInterval: { 
        min: TimeIntervalState.MIN, 
        max: TimeIntervalState.MAX 
    },
    panner: {
        xMin: PannerState.MIN,
        xMax: PannerState.MAX,
        yMin: PannerState.MIN,
        yMax: PannerState.MAX,
        zMin: PannerState.MIN,
        zMax: PannerState.MAX
    },
    filter: {
        frequencyMin: FilterState.FREQ_MIN,
        frequencyMax: FilterState.FREQ_MAX,
        qMin: FilterState.Q_MIN,
        qMax: FilterState.Q_MAX,
        types: FilterState.TYPES
    },
    delay: {
        timeMin: DelayState.TIME_MIN, 
        timeMax: DelayState.TIME_MAX,
        feedbackMin: DelayState.FBACK_MIN,
        feedbackMax: DelayState.FBACK_MAX
    },
    playBackRate: {
        min: PlayBackRateState.MIN,
        max: PlayBackRateState.MAX
    }   
});

export { 
    createGlobalState, 
    getGlobalStatesLimit
};