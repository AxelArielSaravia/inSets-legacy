// @ts-check
import {globalDefault} from "./globalDefault.js";
import {EmptyObject} from "../utils.js";

/**
@type {GlobalState} */
const globalState = {
    audioContext: undefined,
    audioList: new Map(),
    delay: {
        areAllDisable: globalDefault.delay.areAllDisable,
        timeMax: globalDefault.delay.timeMax,
        timeMin: globalDefault.delay.timeMin,
        feedbackMax: globalDefault.delay.feedbackMax,
        feedbackMin: globalDefault.delay.feedbackMin,
    },
    eventsForEachSet:{
        arrOfEvents: [1],
        sumOfAllEvents: 1
    },
    fadeIn: globalDefault.fadeIn,
    fadeOut: globalDefault.fadeOut,
    filter: {
        areAllDisable: globalDefault.filter.areAllDisable,
        frequencyMax: globalDefault.filter.frequencyMax,
        frequencyMin: globalDefault.filter.frequencyMin,
        qMax: globalDefault.filter.qMax,
        qMin: globalDefault.filter.qMin,
        bandpass: globalDefault.filter.bandpass,
        highpass: globalDefault.filter.highpass,
        lowpass: globalDefault.filter.lowpass,
        notch: globalDefault.filter.notch,
        types: Array(4),
    },
    isStarted: false,
    panner: {
        areAllDisable: globalDefault.panner.areAllDisable,
        xMax: globalDefault.panner.xMax,
        xMin: globalDefault.panner.xMin,
        yMax: globalDefault.panner.yMax,
        yMin: globalDefault.panner.yMin,
        zMax: globalDefault.panner.zMax,
        zMin: globalDefault.panner.zMin
    },
    playbackRate: {
        areAllDisable: globalDefault.playbackRate.areAllDisable,
        max: globalDefault.playbackRate.max,
        min: globalDefault.playbackRate.min
    },
    randomEndPoint: {
        areAllDisable: globalDefault.randomEndPoint.areAllDisable
    },
    randomStartPoint: {
        areAllDisable: globalDefault.randomStartPoint.areAllDisable
    },
    startedId: "",
    sumOfAllAudiosEvents: 0,
    timeInterval: {
        max: globalDefault.timeInterval.max,
        min: globalDefault.timeInterval.min
    },
    generativeState: {
        audiosSet: EmptyObject,
        playAudiosFromSet: true,
    }
};

export default globalState;