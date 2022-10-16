import { GlobalState } from "../state/Global/index.js";
import { audioVolumeLimits } from "../state/Audio/index.js";

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
function createViewAudioState(_id) {
    const audio_state = GlobalState._audio_list.get(_id);
    if (!audio_state) {
        throw new Error(
            "Error: can not create ViewGeneralAudioState, the audio is not in the regiter."
        );
    }
    return {
        _id: audio_state._id,
        audioEvents: audio_state.audioEvents,
        color: "",
        configurationIsOpen: false,
        currentTime: audio_state.startPoint,
        delayIsDisable: audio_state.delayIsDisable,
        duration: audio_state.duration,
        endPoint: audio_state.endPoint,
        endTime: audio_state.endTime,
        filterIsDisable: audio_state.filterIsDisable,
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
    const audio_state = GlobalState._audio_list.get(state._id);

    if (type === "delay/disable") {
        audio_state.delayIsDisable = true;
        return { ...state, delayIsDisable: true };

    } else if (type === "delay/enable") {
        audio_state.delayIsDisable = false;
        return { ...state, delayIsDisable: false };

    } else if (type === "filter/disable") {
        audio_state.filterIsDisable = true
        return { ...state, filterIsDisable: true };

    } else if (type === "filter/enable") {
        audio_state.filterIsDisable = false
        return { ...state, filterIsDisable: false };

    } else if (type === "panner/disable") {
        audio_state.pannerIsDisable = true;
        return { ...state, pannerIsDisable: true };

    } else if (type === "panner/enable") {
        audio_state.pannerIsDisable = false;
        return { ...state, pannerIsDisable: false };

    } else if (type === "playbackRate/disable") {
        audio_state.playbackRateIsDisable = true;
        return { ...state, playbackRateIsDisable: true };

    } else if (type === "playbackRate/enable") {
        audio_state.playbackRateIsDisable = false;
        return { ...state, playbackRateIsDisable: false };

    } else if (type === "randomEndPoint/disable") {
        audio_state.randomEndPointIsDisable = true;
        return { ...state, randomEndPointIsDisable: true };

    } else if (type === "randomEndPoint/enable") {
        audio_state.randomEndPointIsDisable = false
        return { ...state, randomEndPointIsDisable: false };

    } else if (type === "randomStartPoint/disable") {
        audio_state.randomStartPointIsDisable = true;
        return { ...state, randomStartPointIsDisable: true };

    } else if (type === "randomStartPoint/enable") {
        audio_state.randomStartPointIsDisable = false;
        return { ...state, randomStartPointIsDisable: false };
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
const ViewAudioReducer = (state, action) => {
    const {type, payload} = action;
    if (type === "audioEvents/add"
        && state.audioEvents < 50
    ) {
        const audio_state = GlobalState._audio_list.get(state._id);
        audio_state.audioEvents += 1;
        return {
            ...state,
            audioEvents: state.audioEvents + 1
        };

    } else if (type === "audioEvents/subtract"
        && state.audioEvents > 1
    ) {
        const audio_state = GlobalState._audio_list.get(state._id);
        audio_state.audioEvents -= 1;
        return {
            ...state,
            audioEvents: state.audioEvents - 1
        };

    } else if (type === "color/change") {
        return {...state, color: payload};

    } else if (type === "color/default") {
        return {...state, color: ""};

    } else if (type === "configuration/toggle") {
        return {
            ...state,
            configurationIsOpen: !state.configurationIsOpen
        };

    } else if (type === "effect") {
        return ViewAudioDisableReducer(state, payload);

    } else if (type === "endTime/change"
        && typeof payload === "number"
        && state.duration > 0.5
    ) {
        const audio_state = GlobalState._audio_list.get(state._id);
        const endTime = (
            payload < state.startTime + 0.5
            ? state.startTime + 0.5
            : state.duration < payload
            ? state.duration
            : payload
        );
        audio_state.endTime = endTime;
        return { ...state, endTime };

    } else if (type === "play") {
        return { ...state, isPlaying: true };

    } else if (type === "points/change") {
        return {
            ...state,
            endPoint: payload[1],
            startPoint: payload[0]
        };

    } else if (type === "startTime/change"
        && typeof payload === "number"
        && state.duration > 0.5
    ) {
        const audio_state = GlobalState._audio_list.get(state._id);
        const startTime = (
            payload > state.endTime - 0.5
            ? state.endTime - 0.5
            : payload < 0
            ? 0
            : payload
        );
        audio_state.startTime = startTime;
        return { ...state, startTime };

    } else if (type === "stop") {
        return {
            ...state,
            isPlaying: false,
            currentTime: 0,
            endPoint:state.endTime,
            startPoint:state.startTime,
        }

    } else if (type === "volume/change"
        && typeof payload === "number"
    ) {
        const audio_state = GlobalState._audio_list.get(state._id);
        const volume = (
            payload < audioVolumeLimits.min
            ? audioVolumeLimits.min
            : payload > audioVolumeLimits.max
            ? audioVolumeLimits.max
            : payload
        );
        audio_state.volume = volume;
        return { ...state, volume };

    } else if (type === "currentTime/update"
        && state.isPlaying
    ) {
        return {
            ...state,
            currentTime: payload
        };
    }
    return state;
}


export {
    ViewAudioReducer,
    createViewAudioState,
};