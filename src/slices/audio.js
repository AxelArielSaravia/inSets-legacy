import globalState from "../state/globalState.js";
import {audioVolumeLimits} from "../state/limits.js";
import {effects} from "./utils.js";
/*-
AudioDisableReducerTypes :: (
    "delay/disable"
    | "delay/enable"
    | "filter/disable"
    | "filter/enable"
    | "panner/disable"
    | "panner/enable"
    | "playbackRate/disable"
    | "playbackRate/enable"
    | "randomEndPoint/disable"
    | "randomEndPoint/enable"
    | "randomStartPoint/disable"
    | "randomStartPoint/enable"
)
*/
const audioDisableReducerTypes = {
    "delay/disable": true,
    "delay/enable": true,
    "filter/disable": true,
    "filter/enable": true,
    "panner/disable": true,
    "panner/enable": true,
    "playbackRate/disable": true,
    "playbackRate/enable": true,
    "randomEndPoint/disable": true,
    "randomEndPoint/enable": true,
    "randomStartPoint/disable": true,
    "randomStartPoint/enable": true
};

const staticActions = {
    addAudioEvents: {type: "audioEvents/add"},
    subtractAudioEvents: {type: "audioEvents/subtract"},
    disable_delay: {
        type: "effect",
        payload: {action: "disable", effect: "delay"}
    },
    disable_filter: {
        type: "effect",
        payload: {action: "disable", effect: "filter"}
    },
    disable_panner: {
        type: "effect",
        payload: {action: "disable", effect: "panner"}
    },
    disable_playbackRate: {
        type: "effect",
        payload: {action: "disable", effect: "playbackRate"}
    },
    disable_randomEndPoint: {
        type: "effect",
        payload: {action: "disable", effect: "randomEndPoint"}
    },
    disable_randomStartPoint: {
        type: "effect",
        payload: {action: "disable", effect: "randomStartPoint"}
    },
    enable_delay: {
        type: "effect",
        payload: {action: "enable", effect: "delay"}
    },
    enable_filter: {
        type: "effect",
        payload: {action: "enable", effect: "filter"}
    },
    enable_panner: {
        type: "effect",
        payload: {action: "enable", effect: "panner"}
    },
    enable_playbackRate: {
        type: "effect",
        payload: {action: "enable", effect: "playbackRate"}
    },
    enable_randomEndPoint: {
        type: "effect",
        payload: {action: "enable", effect: "randomEndPoint"}
    },
    enable_randomStartPoint: {
        type: "effect",
        payload: {action: "enable", effect: "randomStartPoint"}
    }
};

function effectAction(effect, id, action) {
    const audioState = globalState.audioList.get(id);
    if (audioState !== undefined && effects[effect] !== undefined) {
        audioState[`${effect}IsDisable`] = action === "disable";
        return staticActions[`${action}_${effect}`];
    }
}

const audioActions = Object.freeze({
    addAudioEvents(id) {
        const audioState = globalState.audioList.get(id);
        if (audioState.audioEvents < 50) {
            audioState.audioEvents += 1;
            return staticActions.addAudioEvents;
        }
    },
    changeCurrentTime(audioState, number) {
        if (audioState.isPlaying) {
            return {type: "currentTime/change", payload: number};
        }
    },
    changeColor(color) {
        return {type: "color/change", payload: color};
    },
    changeEndTime(id, number) {
        const audioState = globalState.audioList.get(id);
        if (audioState.duration > 0.5) {
            const endTime = (
                number < audioState.startTime + 0.5
                ? audioState.startTime + 0.5
                : audioState.duration < number
                ? audioState.duration
                : number
            );
            audioState.endTime = endTime;
            return {type: "endTime/change", payload: endTime};
        }
    },
    changePoints(audioState, rsp, rep) {
        if (
            audioState.startPoint !== rsp
            || audioState.endPoint !== rep
        ) {
            audioState.startPoint = rsp;
            audioState.endPoint = rep;
            return {type: "points/change", payload: {endPoint: rep, startPoint: rsp}};
        }
    },
    changeStartTime(id, number) {
        const audioState = globalState.audioList.get(id);
        if (audioState.duration > 0.5) {
            const startTime = (
                number > audioState.endTime - 0.5
                ? audioState.endTime - 0.5
                : number < 0
                ? 0
                : number
            );
            audioState.startTime = startTime;
            return {type: "startTime/change", payload: startTime};
        }
    },
    changeVolume(id, number) {
        const audioState = globalState.audioList.get(id);
        const volume = (
            number < audioVolumeLimits.min
            ? audioVolumeLimits.min
            : number > audioVolumeLimits.max
            ? audioVolumeLimits.max
            : number
        );
        audioState.volume = volume;
        return {type: "volume/change", payload: volume};
    },
    colorToDefault: {type: "color/default"},
    configurationToggler: {type: "configuration/toggle"},
    disable(effect, id) {
        return effectAction(effect, id, "disable");
    },
    enable(effect, id) {
        return effectAction(effect, id, "enable");
    },
    subtractAudioEvents(id) {
        const audioState = globalState.audioList.get(id);
        if (audioState.audioEvents > 1) {
            audioState.audioEvents -= 1;
            return staticActions.subtractAudioEvents;
        }
    },
    play: {type: "play"},
    stop: {type: "stop"}
});

/*-
audioDisableReducer :: (
    AudioState,
    {
        action: "disable" | "enable",
        effect: "delay" | "filter" | "panner" | "playbackRate" | "randomEndPoint" | "randomStartPoint"
    }
) -> ViewAudioState */
function audioDisableReducer(state, payload) {
    const action = payload?.action;
    const effect = payload?.effect;
    const type = `${effect}/${action}`;
    if (audioDisableReducerTypes[type] !== undefined) {
        const newState = Object.assign({}, state);
        newState[`${effect}IsDisable`] = action === "disable";
        return newState;
    } else {
        return state;
    }
}

/*-
audioReducer :: (AudioState, {
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
    payload: undefined | string | AudioDisableReducerTypes | number
}) -> AudioState */
function audioReducer(state, action) {
    const type = action?.type;
    const payload = action?.payload;

    if (type === "audioEvents/add") {
        const newState = Object.assign({}, state);
        newState.audioEvents += 1;
        return newState;
    } else if (type === "audioEvents/subtract") {
        const newState = Object.assign({}, state);
        newState.audioEvents -= 1;
        return newState;
    } else if (type === "color/change") {
        const newState = Object.assign({}, state);
        newState.color = payload;
        return newState;
    } else if (type === "color/default") {
        const newState = Object.assign({}, state);
        newState.color = "";
        return newState;
    } else if (type === "configuration/toggle") {
        const newState = Object.assign({}, state);
        newState.configurationIsOpen = !newState.configurationIsOpen;
        return newState;
    } else if (type === "currentTime/change") {
        const newState = Object.assign({}, state);
        newState.currentTime = payload;
        return newState;
    } else if (type === "effect") {
        return audioDisableReducer(state, payload);
    } else if (type === "endTime/change") {
        const newState = Object.assign({}, state);
        newState.endTime = payload;
        return newState;
    } else if (type === "play") {
        const newState = Object.assign({}, state);
        newState.isPlaying = true;
        return newState;
    } else if (type === "points/change") {
        const newState = Object.assign({}, state);
        newState.endPoint = payload.endPoint;
        newState.startPoint = payload.startPoint;
        return newState;
    } else if (type === "startTime/change") {
        const newState = Object.assign({}, state);
        newState.startTime = payload;
        return newState;
    } else if (type === "stop") {
        const newState = Object.assign({}, state);
        newState.currentTime = 0;
        newState.endPoint = state.endTime;
        newState.isPlaying = false;
        newState.startPoint = state.startTime;
        return newState;
    } else if (type === "volume/change") {
        const newState = Object.assign({}, state);
        newState.volume = payload;
        return newState;
    } else {
        return state;
    }
}

export {
    audioActions,
    audioReducer
};