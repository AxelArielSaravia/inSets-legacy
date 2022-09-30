/**@type {{min:1, max: 0.1}} */
const audioVolumeLimits = {
    max: 1,  //100%
    min: 0.1 //10%
}
Object.freeze(audioVolumeLimits);

/**
 * @typedef {{
 *  _id: string,
 *  audioEvents: number,
 *  delayIsDisable: boolean, 
 *  duration: number,
 *  endPoint: number,
 *  endTime: number,
 *  filterIsDisable: boolean,
 *  isPlaying: boolean,
 *  pannerIsDisable: boolean,
 *  playbackRateIsDisable: boolean,
 *  randomEndPointIsDisable: boolean,
 *  randomStartPointIsDisable: boolean,
 *  startPoint: number,
 *  startTime: number,
 *  title: string,
 *  volume: number
 * }} AudioGeneralState
 */

/* -------------------------------------------------------------------------- */
/*                                   AUDIO STATE                              */
/* -------------------------------------------------------------------------- */
/**
 * @typedef {{
 *  audioEngine: HTMLAudioElement | null,
 *  outputGain: GainNode | null,
 *  source: MediaElementAudioSourceNode | null,
 *  type: string,
 * } & AudioGeneralState} AudioState
 */

/**
 * @param {string} id 
 * @param {string} title 
 * @param {string} type 
 * @param {number} duration 
 * @param {GlobalState} GlobalState 
 * @returns {AudioState}
 */
 const createAudioState = (id, title, type, duration, GlobalState) => {
    const obj = {
        _id:  id,
        audioEngine: null,
        audioEvents: 1,
        delayIsDisable: GlobalState?.delay.areAllDisable || false,
        duration: duration || 0, //seconds
        endPoint: duration || 0, //duration seconds
        endTime: duration || 0,  //duration seconds
        filterIsDisable: GlobalState?.filter.areAllDisable || false,
        isPlaying: false,
        outputGain: null,
        pannerIsDisable: GlobalState?.panner.areAllDisable || false,
        playbackRateIsDisable: GlobalState?.playbackRate.areAllDisable || false,
        playbackRate: 1,
        randomEndPointIsDisable: GlobalState?.randomEndPoint || false,
        randomStartPointIsDisable: GlobalState?.randomStartPoint || false,
        startPoint: 0, //seconds
        startTime: 0,  //seconds
        source: null,
        title: title.slice(0, title.lastIndexOf(".")),
        type: type,
        volume: 1, //_MAX_VOLUME_
    }
    Object.seal(obj);
    return obj;
}


/* -------------------------------------------------------------------------- */
/*                                   EXPORTS                                  */
/* -------------------------------------------------------------------------- */
export  {
    createAudioState,
    audioVolumeLimits
};