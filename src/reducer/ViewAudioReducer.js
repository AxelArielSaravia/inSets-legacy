import {GlobalState} from "../state/Global/index.js";
import {audioVolumeLimits} from "../state/Audio/index.js";

/*-
@type ViewAudioState: {
    ...AudioGeneralState,
    color: string,
    configurationIsOpen: boolean
}
*/

/*-
createViewAudioState: string -> ViewAudioState
*/
function createViewAudioState(id) {
    const audio_state = GlobalState.audio_list.get(id);
    if (audio_state === false) {
        throw new Error(
            "Error: can not create ViewGeneralAudioState, the audio is not in the regiter."
        );
    }
    return {
        audioEvents: audio_state.audioEvents,
        color: "",
        configurationIsOpen: false,
        currentTime: audio_state.startPoint,
        delayIsDisable: audio_state.delayIsDisable,
        duration: audio_state.duration,
        endPoint: audio_state.endPoint,
        endTime: audio_state.endTime,
        filterIsDisable: audio_state.filterIsDisable,
        id: audio_state.id,
        isPlaying: audio_state.isPlaying,
        pannerIsDisable: audio_state.pannerIsDisable,
        playbackRateIsDisable: audio_state.playbackRateIsDisable,
        randomEndPointIsDisable: audio_state.randomEndPointIsDisable,
        randomStartPointIsDisable: audio_state.randomStartPointIsDisable,
        startPoint: audio_state.startPoint,
        startTime: audio_state.startTime,
        title: audio_state.title,
        volume: audio_state.volume
    };
}

/* -------------------------------------------------------------------------- */
/*                                  REDUCERS                                  */
/* -------------------------------------------------------------------------- */
/*-
@type ViewAudioDisableReducerTypes: (
    "delay/disable"
    | "delay/enable"
    | "filter/disable"
    | "filter/enable"
    | "panner/disable"
    | "playbackRate/disable"
    | "playbackRate/enable"
    | "randomEndPoint/disable"
    | "randomStartPoint/disable"
    | "randomStartPoint/enable"
)
*/

/*-
ViewAudioDisableReducer: (
    ViewAudioState,
    ViewAudioDisableReducerTypes
) -> ViewAudioState
*/
function ViewAudioDisableReducer(state, type) {
    const audio_state = GlobalState.audio_list.get(state.id);

    if (type === "delay/disable") {
        audio_state.delayIsDisable = true;
        return Object.assign({}, state, {delayIsDisable: true});
    }
    if (type === "delay/enable") {
        audio_state.delayIsDisable = false;
        return Object.assign({}, state, {delayIsDisable: false});
    }
    if (type === "filter/disable") {
        audio_state.filterIsDisable = true;
        return Object.assign({}, state, {filterIsDisable: true});
    }
    if (type === "filter/enable") {
        audio_state.filterIsDisable = false;
        return Object.assign({}, state, {filterIsDisable: false});
    }
    if (type === "panner/disable") {
        audio_state.pannerIsDisable = true;
        return Object.assign({}, state, {pannerIsDisable: true});
    }
    if (type === "panner/enable") {
        audio_state.pannerIsDisable = false;
        return Object.assign({}, state, {pannerIsDisable: false});
    }
    if (type === "playbackRate/disable") {
        audio_state.playbackRateIsDisable = true;
        return Object.assign({}, state, {playbackRateIsDisable: true});
    }
    if (type === "playbackRate/enable") {
        audio_state.playbackRateIsDisable = false;
        return Object.assign({}, state, {playbackRateIsDisable: false});
    }
    if (type === "randomEndPoint/disable") {
        audio_state.randomEndPointIsDisable = true;
        return Object.assign({}, state, {randomEndPointIsDisable: true});
    }
    if (type === "randomEndPoint/enable") {
        audio_state.randomEndPointIsDisable = false;
        return Object.assign({}, state, {randomEndPointIsDisable: false});
    }
    if (type === "randomStartPoint/disable") {
        audio_state.randomStartPointIsDisable = true;
        return Object.assign({}, state, {randomStartPointIsDisable: true});
    }
    if (type === "randomStartPoint/enable") {
        audio_state.randomStartPointIsDisable = false;
        return Object.assign({}, state, {randomStartPointIsDisable: false});
    }
    return state;
}

/*-
ViewAudioReducer: (ViewAudioState, {
    type: "audioEvents/add"
        | "audioEvents/subtract"
        | "color/change"
        | "color/default"
        | "configuration/toggle"
        | "effect"
        | "endTime/change"
        | "play"
        | "points/change"
        | "startTime/change"
        | "stop"
        | "volume/change"
        | "currentTime/update",
    payload: undefined | string | ViewAudioDisableReducerTypes | number
}) -> ViewAudioState
*/
function ViewAudioReducer(state, action) {
    const {payload, type} = action;
    if (type === "audioEvents/add"
        && state.audioEvents < 50
    ) {
        const audio_state = GlobalState.audio_list.get(state.id);
        audio_state.audioEvents += 1;
        return Object.assign({}, state, {
            audioEvents: state.audioEvents + 1
        });
    }
    if (type === "audioEvents/subtract"
        && state.audioEvents > 1
    ) {
        const audio_state = GlobalState.audio_list.get(state.id);
        audio_state.audioEvents -= 1;
        return Object.assign({}, state, {
            audioEvents: state.audioEvents - 1
        });
    }
    if (type === "color/change") {
        return Object.assign({}, state, {color: payload});
    }
    if (type === "color/default") {
        return Object.assign({}, state, {color: ""});
    }
    if (type === "configuration/toggle") {
        return Object.assign({}, state, {
            configurationIsOpen: !state.configurationIsOpen
        });
    }
    if (type === "effect") {
        return ViewAudioDisableReducer(state, payload);
    }
    if (type === "endTime/change"
        && typeof payload === "number"
        && state.duration > 0.5
    ) {
        const audio_state = GlobalState.audio_list.get(state.id);
        const endTime = (
            payload < state.startTime + 0.5
            ? state.startTime + 0.5
            : state.duration < payload
            ? state.duration
            : payload
        );
        audio_state.endTime = endTime;
        return Object.assign({}, state, {endTime});
    }
    if (type === "play") {
        return Object.assign({}, state, {isPlaying: true});
    }
    if (type === "points/change") {
        return Object.assign({}, state, {
            endPoint: payload[1],
            startPoint: payload[0]
        });
    }
    if (type === "startTime/change"
        && typeof payload === "number"
        && state.duration > 0.5
    ) {
        const audio_state = GlobalState.audio_list.get(state.id);
        const startTime = (
            payload > state.endTime - 0.5
            ? state.endTime - 0.5
            : payload < 0
            ? 0
            : payload
        );
        audio_state.startTime = startTime;
        return Object.assign({}, state, {startTime});
    }
    if (type === "stop") {
        return Object.assign({}, state, {
            currentTime: 0,
            endPoint: state.endTime,
            isPlaying: false,
            startPoint: state.startTime
        });
    }
    if (type === "volume/change"
        && typeof payload === "number"
    ) {
        const audio_state = GlobalState.audio_list.get(state.id);
        const volume = (
            payload < audioVolumeLimits.min
            ? audioVolumeLimits.min
            : payload > audioVolumeLimits.max
            ? audioVolumeLimits.max
            : payload
        );
        audio_state.volume = volume;
        return Object.assign({}, state, {volume});
    }
    if (type === "currentTime/update"
        && state.isPlaying
    ) {
        return Object.assign({}, state, {
            currentTime: payload
        });
    }
    console.log(state);
    return state;
}

export {
    ViewAudioReducer,
    createViewAudioState,
};