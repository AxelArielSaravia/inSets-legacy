import {
    createGlobalDelayObj,
    createGlobalFilterObj,
    createGlobalPannerObj,
    createGlobalPlayBackRateObj,
    createGlobalTimeintevalObj,
    createGlobalRandomStartPoint,
    createGlobalFadeTimeValue,
    createProbabilityOfSetSize
} from "../utils.js";

import GlobalState from "../GlobalInside/state.js";

/**
 * @typedef {{
 *  AUDIO_CONTEXT: null | AudioContext | object,
 *  AUDIO_LIST: object<AudioViewState>,
 *  audioListSize: number,
 *  ENGINE_TYPE: "audioBuffer"|"audioNode",
 *  IS_STATERD: boolean,
 *  STARTTED_ID: string,
 *  delay: GlobalDelay,
 *  fadeIn: number,
 *  fadeOut: number,
 *  panner: GlobalPanner,
 *  playBackRate: GlobalPlayBackRate,
 *  probabilityOfSetSizeExecution: ProbabilityOfSetSizeExecution,
 *  randomCurrentTime: boolean,
 *  timeInterval: GlobalTimeInterval
 * }} GlobalView
 */

/**
 * @param {{
 *  delay?: delay,
 *  fadeTime?: number,
 *  filter?: filter,
 *  panner?: panner,
 *  playBackRate?: playBackRate,
 *  randomStartPoint?: boolean,
 *  timeInterval?: timeInterval
 * }} ElementsStateObj
 * @returns {GlobalView}
 */
const createGlobalView = (ElementsStateObj) => {
    /**@type {GlobalView} */
    const GlobalView = {
        audioListSize: 0,
        ENGINE_TYPE: "audioBuffer", //default
        IS_STARTED: false, //default
        delay: createGlobalDelayObj(ElementsStateObj?.delay),
        fadeIn: createGlobalFadeTimeValue(ElementsStateObj?.fadeIn),
        fadeOut: createGlobalFadeTimeValue(ElementsStateObj?.fadeOut),
        filesLoading: 0,
        filter: createGlobalFilterObj(ElementsStateObj?.filter),
        panner: createGlobalPannerObj(ElementsStateObj?.panner),
        playBackRate: createGlobalPlayBackRateObj(ElementsStateObj?.playBackRate),
        probabilityOfSetSize: createProbabilityOfSetSize(),
        totalAudioProbabilityPoints: 0,
        randomStartPoint: createGlobalRandomStartPoint(ElementsStateObj?.randomStartPoint),
        timeInterval: createGlobalTimeintevalObj(ElementsStateObj?.timeInterval)
    };

    GlobalState.delay = GlobalView.delay;
    GlobalState.fadeIn = GlobalView.fadeIn;
    GlobalState.fadeOut = GlobalView.fadeOut;
    GlobalState.filter = GlobalView.filter;
    GlobalState.panner = GlobalView.panner;
    GlobalState.playBackRate = GlobalView.playBackRate;
    GlobalState.randomStartPoint = GlobalView.randomStartPoint;
    GlobalState.timeInterval = GlobalView.timeInterval;

    return GlobalView;
}

export default createGlobalView;