// @ts-check
import globalState from "../state/globalState.js";
import {audioVolumeLimits} from "../state/limits.js";
import {createAudioViewStateFrom} from "../state/factory.js";

/**@type {{type: "audioEvents/add"}} */
const returnAddAudioEvents = {type: "audioEvents/add"};

/**@type {{type: "audioEvents/subtract"}} */
const returnSubtractAudioEvents = {type: "audioEvents/subtract"};

/**
@type {(
    effect: Effects,
    id: string,
    action: "disable" | "enable"
) => Maybe<AudioViewAction>}*/
function effectAction(effect, id, action) {
    const audioState = globalState.audioList.get(id);
    if (audioState !== undefined) {
        const isDisable = (action === "disable");
        audioState[`${effect}IsDisable`] = isDisable;
        return {type: "effect", payload: {disable: isDisable, effect: effect}};
    }
}

const audioActions = Object.freeze({
    /**@type {{type: "color/default"}} */
    colorToDefault: {type: "color/default"},
    /**@type {{type: "configuration/toggle"}} */
    configurationToggler: {type: "configuration/toggle"},
    /**@type {{type: "play"}} */
    play: {type: "play"},
    /**@type {{type: "stop"}} */
    stop: {type: "stop"},
    /**
    @type {(id: string) => Maybe<AudioViewAction>} */
    addAudioEvents(id) {
        const audioState = globalState.audioList.get(id);
        if (audioState !== undefined && audioState.audioEvents < 50) {
            audioState.audioEvents += 1;
            return returnAddAudioEvents;
        }
    },
    /**
    @type {(color: string) => Maybe<{type: "color/change", payload: string}>} */
    changeColor(color) {
        return {type: "color/change", payload: color};
    },
    /**
    @type {<O extends {isPlaying: boolean}>(audioState: O, t: number) => Maybe<AudioViewAction>} */
    changeCurrentTime(audioState, t) {
        if (audioState.isPlaying) {
            return {type: "currentTime/change", payload: t};
        }
    },
    /**
    @type {(id: string, et: number) => Maybe<AudioViewAction>} */
    changeEndTime(id, et) {
        const audioState = globalState.audioList.get(id);
        if (audioState !== undefined && audioState.duration > 0.5) {
            const endTime = (
                et < audioState.startTime + 0.5
                ? audioState.startTime + 0.5
                : audioState.duration < et
                ? audioState.duration
                : et
            );
            audioState.endTime = endTime;
            return {type: "endTime/change", payload: endTime};
        }
    },
    /**
    @type {<O extends {startPoint: number, endPoint: number}>
    (audioState: O,rsp: number, rep: number) => Maybe<AudioViewAction>} */
    changePoints(audioState, rsp, rep) {
        if (
            audioState.startPoint !== rsp
            || audioState.endPoint !== rep
        ) {
            audioState.startPoint = rsp;
            audioState.endPoint = rep;
            return {type: "points/change", payload: {startPoint: rsp, endPoint: rep}};
        }
    },
    /**
    @type {(id: string, d: number) => Maybe<AudioViewAction>}*/
    changeStartTime(id, d) {
        const audioState = globalState.audioList.get(id);
        if (audioState !== undefined && audioState.duration > 0.5) {
            const startTime = (
                d > audioState.endTime - 0.5
                ? audioState.endTime - 0.5
                : d < 0
                ? 0
                : d
            );
            audioState.startTime = startTime;
            return {type: "startTime/change", payload: startTime};
        }
    },
    /**
    @type {(id: string, v: number) => Maybe<AudioViewAction>}*/
    changeVolume(id, v) {
        const audioState = globalState.audioList.get(id);
        if (audioState !== undefined) {
            const volume = (
                v < audioVolumeLimits.min
                ? audioVolumeLimits.min
                : v > audioVolumeLimits.max
                ? audioVolumeLimits.max
                : v
            );
            audioState.volume = volume;
            return {type: "volume/change", payload: volume};
        }
    },
    /**
    @type {(effect: Effects, id: string) => Maybe<AudioViewAction> }*/
    disable(effect, id) {
        return effectAction(effect, id, "disable");
    },
    /**
    @type {(effect: Effects, id: string) => Maybe<AudioViewAction> }*/
    enable(effect, id) {
        return effectAction(effect, id, "enable");
    },
    /**
    @type {(id: string) => Maybe<AudioViewAction>} */
    subtractAudioEvents(id) {
        const audioState = globalState.audioList.get(id);
        if (audioState !== undefined && audioState.audioEvents > 1) {
            audioState.audioEvents -= 1;
            return returnSubtractAudioEvents;
        }
    }
});

/**
@type {(state: AudioViewState, action: Maybe<AudioViewAction>) => AudioViewState} */
function audioReducer(state, action) {
    if (action !== undefined) {
        const newState = createAudioViewStateFrom(state);
        const type = action?.type;
        if (type === "audioEvents/add") {
            newState.audioEvents += 1;
        } else if (type === "audioEvents/subtract") {
            newState.audioEvents -= 1;
        } else if (type === "color/change") {
            newState.color = action.payload;
        } else if (type === "color/default") {
            newState.color = "";
        } else if (type === "configuration/toggle") {
            newState.configurationIsOpen = !newState.configurationIsOpen;
        } else if (type === "currentTime/change") {
            newState.currentTime = action.payload;
        } else if (type === "effect") {
            const effect_kind = action.payload.effect;
            const effect_disable = action.payload.disable;
            newState[`${effect_kind}IsDisable`] = effect_disable;
        } else if (type === "endTime/change") {
            newState.endTime = action.payload;
        } else if (type === "play") {
            newState.isPlaying = true;
        } else if (type === "points/change") {
            const payload = action.payload;
            newState.endPoint = payload.endPoint;
            newState.startPoint = payload.startPoint;
        } else if (type === "startTime/change") {
            newState.startTime = action.payload;
        } else if (type === "stop") {
            newState.currentTime = 0;
            newState.endPoint = state.endTime;
            newState.isPlaying = false;
            newState.startPoint = state.startTime;
        } else { //type === "volume/change"
            newState.volume = action.payload;
        }
        return newState;
    }
    return state;
}

export {
    audioActions,
    audioReducer
};
