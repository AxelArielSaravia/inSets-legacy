/*-
audioVolumeLimits: {
    min:1,
    max: 0.1
}
*/
const audioVolumeLimits = Object.create(null);
audioVolumeLimits.max = 1;  //100%
audioVolumeLimits.min = 0.1; //10%
Object.freeze(audioVolumeLimits);

/*-
@type AudioGeneralState: {
    _id: string,
    audioEvents: number,
    delayIsDisable: boolean,
    duration: number,
    endPoint: number,
    endTime: number,
    filterIsDisable: boolean,
    isPlaying: boolean,
    pannerIsDisable: boolean,
    playbackRateIsDisable: boolean,
    randomEndPointIsDisable: boolean,
    randomStartPointIsDisable: boolean,
    startPoint: number,
    startTime: number,
    title: string,
    volume: number
}
*/

/* -------------------------------------------------------------------------- */
/*                                   AUDIO STATE                              */
/* -------------------------------------------------------------------------- */
/*-
@type AudioState: {
    ...AudioGeneralState
    audioEngine: HTMLAudioElement | undefined,
    outputGain: GainNode | undefined,
    source: MediaElementAudioSourceNode | undefined,
    type: string,
}
*/

/*-
createAudioState: {
    id: string,
    title: string.
    type: string,
    duration, string,
    GlobalState: GlobalState
} -> AudioState
*/
function createAudioState(spec) {
    const {
        GlobalState,
        audioEngine,
        duration,
        id,
        source,
        title,
        type
    } = spec;

    return Object.seal({
        type,
        _id:  id,
        audioEngine,
        audioEvents: 1,
        delayIsDisable: GlobalState?.delay.areAllDisable || false,
        duration: duration || 0, //seconds
        endPoint: duration || 0, //duration seconds
        endTime: duration || 0,  //duration seconds
        filterIsDisable: GlobalState?.filter.areAllDisable || false,
        isPlaying: false,
        outputGain: undefined,
        pannerIsDisable: GlobalState?.panner.areAllDisable || false,
        playbackRate: 1,
        playbackRateIsDisable: GlobalState?.playbackRate.areAllDisable || false,
        randomEndPointIsDisable: GlobalState?.randomEndPoint || false,
        randomStartPointIsDisable: GlobalState?.randomStartPoint || false,
        source,
        startPoint: 0, //seconds
        startTime: 0,  //seconds
        title: title.slice(0, title.lastIndexOf(".")),
        volume: 1 //MAX_VOLUME
    });
}

/* -------------------------------------------------------------------------- */
/*                                   EXPORTS                                  */
/* -------------------------------------------------------------------------- */
export  {
    createAudioState,
    audioVolumeLimits
};