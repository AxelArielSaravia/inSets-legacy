/*-
AudioDelay :: {
    channelCountMode: "max" | "clamped-max" | "explicit",
    channelInterpretation: "speakers" | "discrete",
    maxDelayTime: number,
    delayTime: number,
    feedback: number
}

AudioFilter :: {
    channelCountMode: "max" | "clamped-max" | "explicit",
    channelInterpretation: "speakers" | "discrete",
    detune: number,
    gain: number,
    frequency: number,
    q: number,
    type: "lowpass" | "highpass" | "bandpass" | "notch" | "allpass"
}

AudioPanner :: {
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
import {random} from "../utils.js";
import {delayLimits} from "../state/limits.js";
import {
    rToFeedback,
    rToFrequency,
    rToPanner,
    rToPlaybackRate,
    rToQ,
    rToTime
} from "./maps.js";

/*-
createAudioDelayConfiguration :: (GlobalDelay) -> AudioDelay */
function createAudioDelayConfiguration(globalDelay) {
    const {TIME_MAX} = delayLimits;
    return {
        channelCountMode: "max",
        channelInterpretation: "speakers",
        delayTime: rToTime(
            random(globalDelay.timeMin, globalDelay.timeMax)
        ),
        feedback: rToFeedback(
            random(globalDelay.feedbackMin, globalDelay.feedbackMax)
        ),
        maxDelayTime: rToTime(TIME_MAX)
    };
}

/*-
createAudioFilterConfiguration :: (GlobalFilter) -> AudioFilter */
function createAudioFilterConfiguration(globalFilter) {
    const type = (
        globalFilter.types.length > 0
        ? globalFilter.types[random(0, globalFilter.types.length - 1)]
        : "allpass"
    );
    return {
        channelCountMode: "max",
        channelInterpretation: "speakers",
        detune: 0,
        frequency: rToFrequency(
            random(globalFilter.frequencyMin, globalFilter.frequencyMax)
        ),
        gain: 1,
        q: (
            type !== "lowpass" || type !== "highpass"
            ? rToQ(random(globalFilter.qMin, globalFilter.qMax))
            : 1
        ),
        type
    };
}

/*-
createAudioPannerConfiguration :: (GlobalPanner) -> AudioPanner */
function createAudioPannerConfiguration(globalPanner) {
    return {
        coneInnerAngle: 360,
        coneOuterAngle: 0,
        coneOuterGain: 0,
        distanceModel: "inverse",
        maxDistance: 10000,
        orientationX: 0,
        orientationY: 1,
        orientationZ: 0,
        panningModel: "HRTF",
        positionX: (
            rToPanner(random(globalPanner.xMin, globalPanner.xMax)) / 10
        ),
        positionY: (
            (rToPanner(random(globalPanner.yMin, globalPanner.yMax)) / 10)
        ),
        positionZ: -(random(globalPanner.zMin, globalPanner.zMax) / 10),
        refDistance: 1
    };
}

/*-
createAudioPlayBackRateConfiguration :: (GlobalPlayBackRate) -> number */
function createAudioPlayBackRateConfiguration(globalPlayBackRate) {
    return (
        rToPlaybackRate(random(globalPlayBackRate.min, globalPlayBackRate.max))
    );
}

export {
    createAudioDelayConfiguration,
    createAudioFilterConfiguration,
    createAudioPannerConfiguration,
    createAudioPlayBackRateConfiguration
};