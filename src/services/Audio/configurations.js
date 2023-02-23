import {
    delayLimits
} from "../limits/service.js";
import {
    rToFeedback,
    rToFrequency,
    rToPanner,
    rToPlaybackRate,
    rToQ,
    rToTime
} from "../convert/service.js";

import {random} from "../utils.js";

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
    const {TIME_MAX} = delayLimits;
    return {
        channelCountMode: "max",
        channelInterpretation: "speakers",
        delayTime: rToTime(
            random(GlobalDelay.timeMin, GlobalDelay.timeMax)
        ),
        feedback: rToFeedback(
            random(GlobalDelay.feedbackMin, GlobalDelay.feedbackMax)
        ),
        maxDelayTime: rToTime(TIME_MAX)
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
    const type = (
        GlobalFilter.types.length > 0
        ? GlobalFilter.types[random(0, GlobalFilter.types.length - 1)]
        : "allpass"
    );
    return {
        channelCountMode: "max",
        channelInterpretation: "speakers",
        detune: 0,
        frequency: rToFrequency(
            random(GlobalFilter.frequencyMin, GlobalFilter.frequencyMax)
        ),
        gain: 1,
        q: (
            type !== "lowpass" || type !== "highpass"
            ? rToQ(random(GlobalFilter.qMin, GlobalFilter.qMax))
            : 1
        ),
        type
    };
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
        orientationX: 0,
        orientationY: 1,
        orientationZ: 0,
        panningModel: "equalpower",
        positionX: (
            rToPanner(random(GlobalPanner.xMin, GlobalPanner.xMax)) / 10
        ),
        positionY: (
            (rToPanner(random(GlobalPanner.yMin, GlobalPanner.yMax)) / 10)
        ),
        positionZ: -(random(GlobalPanner.zMin, GlobalPanner.zMax) / 10),
        refDistance: 1
    };
}

/*-
createAudioPlayBackRateConfiguration: GlobalPlayBackRate -> number
*/
function createAudioPlayBackRateConfiguration(GlobalPlayBackRate) {
    return (
        rToPlaybackRate(random(GlobalPlayBackRate.min, GlobalPlayBackRate.max))
    );
}

export {
    createAudioDelayConfiguration,
    createAudioFilterConfiguration,
    createAudioPannerConfiguration,
    createAudioPlayBackRateConfiguration
};