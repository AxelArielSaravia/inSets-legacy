/**
 * @typedef {{
 *  _ID: string,
 *  _MAX_VOLUME: number,
 *  _MIN_VOLUME: number,
 *  color: string,
 *  delayIsDisable: boolean,
 *  duration: number,
 *  endTime: number,
 *  filterIsDisable: boolean,
 *  isPlaying: boolean,
 *  pannerIsDisable: boolean,
 *  playBackRateIsDisable: boolean,
 *  probability: number,
 *  randomStartPointIsDisable: boolean,
 *  startPoint: number,
 *  startTime: number,
 *  title: string,
 *  type: string,
 *  volume: number
 * }} AudioView
 */

/**
 * @param {AudioState} AudioState
 * @returns {AudioView}
 */
const createAudioViewState = (AudioState) => {
    return {
        _ID:  AudioState._ID,
        _MAX_VOLUME: AudioState._MAX_VOLUME,
        _MIN_VOLUME: AudioState._MIN_VOLUME,
        color: AudioState.color,
        delayIsDisable: AudioState.delayIsDisable,
        duration: AudioState.duration,
        endTime: AudioState.endTime,
        filterIsDisable: AudioState.filterIsDisable,
        isPlaying: AudioState.isPlaying,
        pannerIsDisable: AudioState.pannerIsDisable,
        playBackRateIsDisable: AudioState.playBackRateIsDisable,
        probability: AudioState.probability,
        randomStartPointIsDisable: AudioState.randomStartPointIsDisable,
        startPoint: AudioState.startPoint,
        startTime: AudioState.startTime,
        title: AudioState.title,
        type: AudioState.type,
        volume: AudioState.volume, 
    }
}

export default createAudioViewState;