import { pannerListener,globalPannerStatic, globalDelayStatic } from "../../state/Global/index.js"
import { random } from "../utils.js";

/**
 * @typedef {{
 *  channelCountMode: "max" | "clamped-max" | "explicit",
 *  channelInterpretation: "speakers" | "discrete",
 *  maxDelayTime: number,
 *  delayTime: number,
 *  feedback: number
 * }} AudioDelay
 */

/**
 * 
 * @param {GlobalDelay} GlobalDelay 
 * @returns {AudioDelay}
 */
const createAudioDelayConfiguration = (GlobalDelay) => ({
    channelCountMode: "max",
    channelInterpretation: "speakers",
    maxDelayTime: globalDelayStatic.TIME_MAX,
    delayTime: random(GlobalDelay.timeMin * 10, GlobalDelay.timeMax * 10) / 10,
    feedback: random(GlobalDelay.feedbackMin * 100, GlobalDelay.feedbackMax * 100) / 100
});

/**
 * @typedef {{
 *  channelCountMode: "max" | "clamped-max" | "explicit",
 *  channelInterpretation: "speakers" | "discrete",
 *  detune: number,
 *  gain: number,
 *  frequency: number,
 *  q: number,
 *  type: "lowpass" | "highpass" | "bandpass" | "notch" | "allpass"
 * }} AudioFilter
 */

/**
 * @param {GlobalFilter} GlobalFilter 
 * @returns {AudioFilter}
 */
const createAudioFilterConfiguration = (GlobalFilter) => {
    return {
        channelCountMode: "max",
        channelInterpretation: "speakers",
        detune: 0,
        gain: 1,
        frequency: random(GlobalFilter.frequencyMin, GlobalFilter.frequencyMax),
        q: random(GlobalFilter.qMin * 10, GlobalFilter.qMax * 10) / 10,
        type: (GlobalFilter.types.length > 0) 
            ? GlobalFilter.types[random(0, GlobalFilter.types.length - 1)]
            : "allpass"
    }
};

/**
 * @typedef {{
 *  coneInnerAngle: number, //0 to 360 deg
 *  coneOuterAngle: number, //0 to 360 deg
 *  coneOuterGain: number, //0 to 1
 *  distanceModel: "linear" | "inverse" | "exponential",
 *  maxDistance: number,
 *  orientationX: number,
 *  orientationY: number,
 *  orientationZ: number,
 *  panningModel: "equalpower" | "HRTF",
 *  positionX: number,
 *  positionY: number,
 *  positionZ: number,
 *  refDistance: number,
 *  rolloffFactor: number
 * }} AudioPanner
 */

/**
 * @param {GlobalPanner} GlobalPanner
 * @return {AudioPanner} 
 */
const createAudioPannerConfiguration = (GlobalPanner) => {
    const positionZ = random(GlobalPanner.zMin / 10, GlobalPanner.zMax /10) + Math.abs(globalPannerStatic.MIN / 10) + pannerListener.Z;
    const positionX = random(GlobalPanner.xMin / 10, GlobalPanner.xMax /10) + pannerListener.X;
    const positionY = random(GlobalPanner.yMin / 10, GlobalPanner.yMax /10) + pannerListener.Y;
    return {
        coneInnerAngle: 360,
        coneOuterAngle: 0,
        coneOuterGain: 0,
        distanceModel: "inverse",
        maxDistance: 10000,
        orientationX: 1,
        orientationY: 0,
        orientationZ: 0,
        panningModel: "HRTF",
        positionZ: positionZ, 
        positionX: positionX,
        positionY: positionY,
        refDistance: 1,
        asd: this.positionX
    }
};

/**
 * @param {GlobalPlayBackRate} GlobalPlayBackRate 
 * @returns {number}
 */
const createAudioPlayBackRateConfiguration = (GlobalPlayBackRate) => random(GlobalPlayBackRate.min * 10, GlobalPlayBackRate.max * 10) / 10;

export {
    createAudioDelayConfiguration,
    createAudioFilterConfiguration,
    createAudioPannerConfiguration,
    createAudioPlayBackRateConfiguration
}