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

    return (function ret(o) {
        o.audioEngine = audioEngine;
        o.audioEvents = 1;
        o.delayIsDisable = GlobalState?.delay.areAllDisable || false;
        o.duration = duration || 0; //seconds
        o.endPoint = duration || 0; //duration seconds
        o.endTime = duration || 0;  //duration seconds
        o.filterIsDisable = GlobalState?.filter.areAllDisable || false;
        o.id = id;
        o.isPlaying = false;
        o.outputGain = undefined;
        o.pannerIsDisable = GlobalState?.panner.areAllDisable || false;
        o.playbackRate = 1;
        o.playbackRateIsDisable = GlobalState?.playbackRate.areAllDisable || false;
        o.randomEndPointIsDisable = GlobalState?.randomEndPoint || false;
        o.randomStartPointIsDisable = GlobalState?.randomStartPoint || false;
        o.source = source;
        o.startPoint = 0; //seconds
        o.startTime = 0;  //seconds
        o.title = title.slice(0, title.lastIndexOf("."));
        o.type = type;
        o.volume = 1; //MAX_VOLUME
        return Object.seal(o);
    }(Object.create(null)));
}

/* -------------------------------------------------------------------------- */
/*                                   EXPORTS                                  */
/* -------------------------------------------------------------------------- */
export {
    createAudioState,
    audioVolumeLimits
};