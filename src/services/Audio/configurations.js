import { pannerListener, globalDelayLimits } from "../../state/Global/index.js";
import { random } from "../utils.js";

/*-
@type AudioDelay: {
    channelCountMode: "max" | "clamped-max" | "explicit",
    channelInterpretation: "speakers" | "discrete",
    maxDelayTime: number,
    delayTime: number,
    feedback: number
}
*/

/*-
createAudioDelayConfiguration: GlobalDelay -> AudioDelay
*/
function createAudioDelayConfiguration(GlobalDelay) {
    return {
        channelCountMode: "max",
        channelInterpretation: "speakers",
        delayTime: random(GlobalDelay.timeMin * 10, GlobalDelay.timeMax * 10) / 10,
        feedback: random(GlobalDelay.feedbackMin * 100, GlobalDelay.feedbackMax * 100) / 100,
        maxDelayTime: globalDelayLimits.TIME_MAX
    };
}

/*-
@type AudioFilter: {
    channelCountMode: "max" | "clamped-max" | "explicit",
    channelInterpretation: "speakers" | "discrete",
    detune: number,
    gain: number,
    frequency: number,
    q: number,
    type: "lowpass" | "highpass" | "bandpass" | "notch" | "allpass"
}
*/

/*-
createAudioFilterConfiguration: GlobalFilter -> AudioFilter
*/
function createAudioFilterConfiguration(GlobalFilter) {
    return {
        channelCountMode: "max",
        channelInterpretation: "speakers",
        detune: 0,
        frequency: random(GlobalFilter.frequencyMin, GlobalFilter.frequencyMax),
        gain: 1,
        q: random(GlobalFilter.qMin * 10, GlobalFilter.qMax * 10) / 10,
        type: (
            GlobalFilter.types.length > 0
            ? GlobalFilter.types[random(0, GlobalFilter.types.length - 1)]
            : "allpass"
        )
    }
}

/*-
@type AudioPanner: {
    coneInnerAngle: number, //0 to 360 deg
    coneOuterAngle: number, //0 to 360 deg
    coneOuterGain: number, //0 to 1
    distanceModel: "linear" | "inverse" | "exponential",
    maxDistance: number,
    orientationX: number,
    orientationY: number,
    orientationZ: number,
    panningModel: "equalpower" | "HRTF",
    positionX: number,
    positionY: number,
    positionZ: number,
    refDistance: number,
    rolloffFactor: number
}
*/

/*-
createAudioPannerConfiguration: GlobalPanner -> AudioPanner
*/
function createAudioPannerConfiguration(GlobalPanner) {
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
        positionZ: random(GlobalPanner.zMin / 10, GlobalPanner.zMax /10) + pannerListener.Z,
        positionX: random(GlobalPanner.xMin / 10, GlobalPanner.xMax /10) + pannerListener.X,
        positionY: random(GlobalPanner.yMin / 10, GlobalPanner.yMax /10) + pannerListener.Y,
        refDistance: 1,
    };
}

/*-
createAudioPlayBackRateConfiguration: GlobalPlayBackRate -> number
*/
function createAudioPlayBackRateConfiguration(GlobalPlayBackRate) {
    return random(GlobalPlayBackRate.min * 10, GlobalPlayBackRate.max * 10) / 10;
}

export {
    createAudioDelayConfiguration,
    createAudioFilterConfiguration,
    createAudioPannerConfiguration,
    createAudioPlayBackRateConfiguration
}