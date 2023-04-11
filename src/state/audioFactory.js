/*-
@type AudioGeneralState: {
    id: string,
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
    return {
        audioEngine,
        audioEvents: 1,
        delayIsDisable: GlobalState?.delay.areAllDisable || false,
        duration: duration || 0, //seconds
        endPoint: duration || 0, //seconds
        endTime: duration || 0,  //seconds
        filterIsDisable: GlobalState?.filter.areAllDisable || false,
        id,
        isPlaying: false,
        outputGain: undefined,
        pannerIsDisable: GlobalState?.panner.areAllDisable || false,
        playbackRate: 1,
        playbackRateIsDisable: GlobalState?.playbackRate.areAllDisable || false,
        randomEndPointIsDisable: GlobalState?.randomEndPoint || false,
        randomStartPointIsDisable: GlobalState?.randomStartPoint || false,
        source: source,
        startPoint: 0, //seconds
        startTime: 0,  //seconds
        title: title.slice(0, title.lastIndexOf(".")),
        type,
        volume: 1,
    };
}

export default createAudioState;