import {
    globalDelayStatic,
    globalFadeTimeStatic,
    globalFilterStatic,
    globalPannerStatic,
    globalPlayBackRateStatic,
    globalTimeIntervalStatic,
} from "./static.js";

import { isInsideInterval } from "../utils.js";

/**
 * @typedef {{
 *  areAllDisable: boolean,
 *  timeMin: number,
 *  timeMax: number,
 *  feedbackMin: number,
 *  feedbackMax: number
 * }} GlobalDelay
 * 
 * @typedef {{
 *  areAllDisable?: boolean,
 *  timeMin?: number, 
 *  timeMax?: number,
 *  feedbackMin?: number,
 *  feedbackMax?: number
 * }} delay
 */

/**
 * Time values are in seconds
 * Feedback is a gain value
 * @param {delay} obj 
 * @returns {GlobalDelay}
 */
const createGlobalDelayObj = (obj) => {
    /** @type {GlobalDelay} */
    const GlobalDelayObj = {}
    
    if (typeof obj === "object" && obj !== null) {
        GlobalDelayObj.areAllDisable = {
            value: obj.hasOwnProperty("areAllDisable")
                ? !!obj.areAllDisable 
                : false,
            global: true,   
        }

        GlobalDelayObj.timeMin = obj.hasOwnProperty("timeMin") && isInsideInterval(globalDelayStatic.TIME_MIN, globalDelayStatic.TIME_MAX, obj.timeMin) 
            ? obj.timeMin 
            : globalDelayStatic.TIME_MIN;
        
        GlobalDelayObj.timeMax = obj.hasOwnProperty("timeMax") && isInsideInterval(GlobalDelayObj.timeMin, globalDelayStatic.TIME_MAX, obj.timeMax)
            ? obj.timeMax
            : globalDelayStatic.TIME_MAX;
    
        GlobalDelayObj.feedbackMin = obj.hasOwnProperty("feedbackMin") && isInsideInterval(globalDelayStatic.FBACK_MIN, globalDelayStatic.FBACK_MAX, obj.feedbackMin)
            ? obj.feedbackMin
            : globalDelayStatic.FBACK_MIN;

        GlobalDelayObj.feedbackMax = obj.hasOwnProperty("feedbackMax") && isInsideInterval(GlobalDelayObj.feedbackMin, globalDelayStatic.FBACK_MAX, obj.feedbackMax)
            ? obj.feedbackMax
            : globalDelayStatic.FBACK_MAX;
    } else {
        GlobalDelayObj.areAllDisable = { value: false, global: true };
        GlobalDelayObj.timeMin = globalDelayStatic.TIME_MIN;
        GlobalDelayObj.timeMax = globalDelayStatic.TIME_MAX;
        GlobalDelayObj.feedbackMin = globalDelayStatic.FBACK_MIN;
        GlobalDelayObj.feedbackMax = globalDelayStatic.FBACK_MAX;
    }
    return GlobalDelayObj;
}

/** 
 * @typedef {{
 *  areAllDisable: boolean,
 *  frequencyMin: number,
 *  frequencyMax: number,
 *  qMin: number,
 *  qMax: number,
 *  types: ["lowpass"?, "highpass"?, "bandpass"?, "notch"?]
 * }} GlobalFilter
 * 
 * @typedef {{
 *  areAllDisable?: boolean,
 *  frequencyMin?: number,
 *  frequencyMax?: number,
 *  qMin?: number,
 *  qMax?: number,
 *  types?: ["lowpass"?, "highpass"?, "bandpass"?, "notch"?]
 * }} filter
 */

/**
 * @param {filter} obj 
 * @returns {GlobalFilter}
 */
const createGlobalFilterObj = (obj) => {
    /** @type {GlobalFilter} */
    const GlobalFilterObj = {};

    if (typeof obj === "object" && obj !== null) {
        GlobalFilterObj.areAllDisable = {
            value: obj.hasOwnProperty("areAllDisable")
                ? !!obj.areAllDisable 
                : false,
            global: true
        }

        GlobalFilterObj.frequencyMin = obj.hasOwnProperty("frequencyMin") && isInsideInterval(globalFilterStatic.FREQ_MIN, globalFilterStatic.FREQ_MAX, obj.frequencyMin)
            ? obj.frequencyMin 
            : globalFilterStatic.FREQ_MIN;

        GlobalFilterObj.frequencyMax = obj.hasOwnProperty("frequencyMax") && isInsideInterval(GlobalFilterObj.frequencyMin, globalFilterStatic.FREQ_MAX, obj.frequencyMax)
            ? obj.frequencyMax 
            : globalFilterStatic.FREQ_MAX;

        GlobalFilterObj.qMin = obj.hasOwnProperty("qMin") && isInsideInterval(globalFilterStatic.Q_MIN, globalFilterStatic.Q_MAX, obj.qMin)
            ? obj.qMin 
            : globalFilterStatic.Q_MIN;

        GlobalFilterObj.qMax = obj.hasOwnProperty("qMax") && isInsideInterval(GlobalFilterObj.qMin, globalFilterStatic.Q_MAX, obj.qMax)
            ? obj.qMax 
            : globalFilterStatic.Q_MAX;

        if (obj.hasOwnProperty("types") && Array.isArray(obj.types)) {
            const arr = obj.types.filter(el => /lowpass|highpass|bandpass|notch/.test(el));
            GlobalFilterObj.types = arr.length === 0 ? globalFilterStatic.TYPES : arr;
        } else {
            GlobalFilterObj.types = globalFilterStatic.TYPES;
        }
    } else {
        GlobalFilterObj.areAllDisable = { value: false, global: true };
        GlobalFilterObj.frequencyMin = globalFilterStatic.FREQ_MIN;
        GlobalFilterObj.frequencyMax = globalFilterStatic.FREQ_MAX;
        GlobalFilterObj.qMin = globalFilterStatic.Q_MIN;
        GlobalFilterObj.qMax = globalFilterStatic.Q_MAX;
        GlobalFilterObj.types = globalFilterStatic.TYPES;
    }
    return GlobalFilterObj;
}

/**
 * @typedef {{
 *  areAllDisable: boolean,
 *  xMin: number,
 *  xMax: number,
 *  yMin: number,
 *  yMax: number,
 *  yMin: number,
 *  zMax: number,
 *  zMin: number
 * }} GlobalPanner
 * 
 * @typedef {{
 *  areAllDisable?: boolean,
 *  xMin?: number,
 *  xMax?: number,
 *  yMin?: number,
 *  yMax?: number,
 *  zMin?: number,
 *  zMax?: number
 * }} panner
 */

/**
 * @param {panner} obj 
 * @returns {GlobalPanner}
 */
const createGlobalPannerObj = (obj) => {
    /** @type {GlobalPanner} */
    const GlobalPannerObj = {};

    if (typeof obj === "object" && obj !== null) {
        GlobalPannerObj.areAllDisable = {
            value: obj.hasOwnProperty("areAllDisable")
                ? !!obj.areAllDisable 
                : false,
            global: true   
        }

        GlobalPannerObj.xMin = obj.hasOwnProperty("xMin") && isInsideInterval(globalPannerStatic.MIN, globalPannerStatic.MAX, obj.xMin)
            ? obj.xMin 
            : globalPannerStatic.MIN;
            
        GlobalPannerObj.xMax = obj.hasOwnProperty("xMax") && isInsideInterval(GlobalPannerObj.xMin, globalPannerStatic.MAX, obj.xMax)
            ? obj.xMax 
            : globalPannerStatic.MAX;

        GlobalPannerObj.yMin = obj.hasOwnProperty("yMin") && isInsideInterval(globalPannerStatic.MIN, globalPannerStatic.MAX, obj.yMin)
            ? obj.yMin 
            : globalPannerStatic.MIN;

        GlobalPannerObj.yMax = obj.hasOwnProperty("yMax") && isInsideInterval(GlobalPannerObj.yMin, globalPannerStatic.MAX, obj.yMax)
            ? obj.yMax 
            : globalPannerStatic.MAX;

        GlobalPannerObj.zMin = obj.hasOwnProperty("zMin") && isInsideInterval(globalPannerStatic.MIN, globalPannerStatic.MAX, obj.zMin)
            ? obj.zMin 
            : globalPannerStatic.MIN;

        GlobalPannerObj.zMax = obj.hasOwnProperty("zMax") && isInsideInterval(GlobalPannerObj.zMin, globalPannerStatic.MAX, obj.zMax)
            ? obj.zMax 
            : globalPannerStatic.MAX;
    } else {
        GlobalPannerObj.areAllDisable = { value: false, global: true };
        GlobalPannerObj.xMin = globalPannerStatic.MIN;
        GlobalPannerObj.xMax = globalPannerStatic.MAX;
        GlobalPannerObj.yMin = globalPannerStatic.MIN;
        GlobalPannerObj.yMax = globalPannerStatic.MAX;
        GlobalPannerObj.zMin = globalPannerStatic.MIN;
        GlobalPannerObj.zMax = globalPannerStatic.MAX;
    }

    return GlobalPannerObj;
}

/**
 * @typedef {{
 *  areAllDisable: boolean,
 *  min: number,
 *  max: number
 * }} GlobalPlayBackRate
 * 
 * @typedef {{
 *  areAllDisable?: boolean,
 *  min?: number,
 *  max?: number
 * }} playBackRate
 */

/**
 * @param {playBackRate} obj 
 * @returns {GlobalPlayBackRate}
 */
const createGlobalPlayBackRateObj = (obj) => {
    /** @type {GlobalPlayBackRate} */
    const GlobalPlayBackRateObj = {};

    if (typeof obj === "object" && obj !== null) {
        GlobalPlayBackRateObj.areAllDisable = {
            value: obj.hasOwnProperty("areAllDisable")
                ? !!obj.areAllDisable 
                : false,
            global: true   
        }
        GlobalPlayBackRateObj.min = obj.hasOwnProperty("min") && isInsideInterval(globalPlayBackRateStatic.MIN, globalPlayBackRateStatic.MAX, obj.min) 
            ? obj.min 
            : globalPlayBackRateStatic.MIN;
        GlobalPlayBackRateObj.max = obj.hasOwnProperty("min") && isInsideInterval(GlobalPlayBackRateObj.min, globalPlayBackRateStatic.MAX, obj.max) 
            ? obj.max 
            : globalPlayBackRateStatic.MAX;
    } else {
        GlobalPlayBackRateObj.areAllDisable = { value: false, global: true };
        GlobalPlayBackRateObj.min = globalPlayBackRateStatic.MIN;
        GlobalPlayBackRateObj.max = globalPlayBackRateStatic.MAX;
    }
    return GlobalPlayBackRateObj;
}

/**
 * @typedef {{
 *  min: number, 
 *  max: number
 * }} GlobalTimeInterval
 * 
 * @typedef {{
 *  min?: number, 
 *  max?: number
 * }} timeInterval
 */

/**
 * Values are in miliseconds
 * @param {timeInterval} obj 
 * @returns {GlobalTimeInterval}
 */
const createGlobalTimeintevalObj = (obj) => {
    /** @type {GlobalTimeInterval} */
    const GlobalTimeintevalObj = {}
    if (typeof obj === "object" && obj !== null) {
        GlobalTimeintevalObj.min = obj.hasOwnProperty("min") && isInsideInterval(globalTimeIntervalStatic.MIN, globalTimeIntervalStatic.MAX,obj.min)
            ? obj.min
            : globalTimeIntervalStatic.MIN ;
        GlobalTimeintevalObj.max = obj.hasOwnProperty("max") && isInsideInterval(GlobalTimeintevalObj.min, globalTimeIntervalStatic.MAX, obj.max)
            ? obj.max
            : globalTimeIntervalStatic.MAX ;
    } else {
        GlobalTimeintevalObj.min = globalTimeIntervalStatic.MIN;
        GlobalTimeintevalObj.max = globalTimeIntervalStatic.MAX;
    }
    return GlobalTimeintevalObj
}

/**
 * @param {boolean} bool 
 * @returns {boolean}
 */
const createGlobalRandomStartPoint= (bool) => {
    const randomCurrentTime = {
        value: typeof bool === "boolean" ? bool : false,
        global: true
    }
    return randomCurrentTime
}

/**
 * @param {number} num
 * @returns {number}
 */
const createGlobalFadeTimeValue = (num) => {
    /**@type {number}*/
    const fadeTime = Number.isInteger(num) && isInsideInterval(globalFadeTimeStatic.MIN, globalFadeTimeStatic.MAX, num) 
        ? num
        : 150;//default
    return fadeTime;
}

/**
 * @typedef {{
 *  _zeros: number,
 *  arrOfValues: number[]
 * }} ProbabilityOfSetSizeExecution
 */

/**
 * @returns {ProbabilityOfSetSizeExecution} 
 */
const createProbabilityOfSetSize = () => {
    return {
        _zeros: 0,
        arrOfValues: [1]
    }
}

export {
    createGlobalDelayObj,
    createGlobalFilterObj,
    createGlobalPannerObj,
    createGlobalPlayBackRateObj,
    createGlobalTimeintevalObj,
    createGlobalRandomStartPoint,
    createGlobalFadeTimeValue,
    createProbabilityOfSetSize
}