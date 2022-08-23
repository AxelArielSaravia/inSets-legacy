import createId from "../../../services/Id/index.js"; 

/**
 * @typedef {{
 *  _START_ID: string,
 *  change_START_ID: () => void
 *  audioEngine: AudioBuffer | HTMLAudioElement | null,
 *  outputGain: GainNode | null,
 *  source: MediaElementAudioSourceNode | AudioBufferSourceNode | null,
 * } & AudioView} AudioState
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
        _ID:  id,
        _MAX_VOLUME: 1, /*100%*/
        _MIN_VOLUME: 0.1, /*10%*/
        _START_ID: createId(),
        change_START_ID: function() { this._START_ID = createId(); },
        audioEngine: null,
        color: "",
        delayIsDisable: GlobalState?.delay.areAllDisable.value || false,
        duration: duration || 0,
        endTime: duration || 0, //duration
        filterIsDisable: GlobalState?.filter.areAllDisable.value || false,
        isPlaying: false,
        outputGain: null,
        pannerIsDisable: GlobalState?.panner.areAllDisable.value || false,
        playBackRateIsDisable: GlobalState?.playBackRate.areAllDisable.value || false,
        playBackRate: 1,
        probability: 1,
        randomStartPointIsDisable: GlobalState?.randomStartPoint.value || false,
        startPoint: 0,
        startTime: 0,
        source: null,
        title: title.slice(0, title.lastIndexOf(".")),
        type: type,
        volume: 1, //_MAX_VOLUME_
    }
    Object.seal(obj);
    return obj;
}

export default createAudioState;