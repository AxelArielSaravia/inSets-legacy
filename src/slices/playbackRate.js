// @ts-check
import globalState from "../state/globalState.js";
import {playbackRateLimits} from "../state/limits.js";
import {createGlobalPlaybackRate, createDefaultGlobalPlaybackRate} from "../state/factory.js";
/**
@type {{type: any, payload: any}} */
const ReturnPaybackRateAction = {
    type: "",
    payload: undefined
};

/**
@type {Readonly<{
    reset: () => PlaybackRateAction,
    changeMax: (n: number) => Maybe<PlaybackRateAction>,
    changeMin: (n: number) => Maybe<PlaybackRateAction>,
}>} */
const playbackRateActions = {
    /**
    @type {() => PlaybackRateAction} */
    reset() {
        const resetObject = createDefaultGlobalPlaybackRate();
        resetObject.areAllDisable =  globalState.playbackRate.areAllDisable;
        globalState.playbackRate = resetObject;
        localStorage.setItem("playbackRate.areAllDisable", String(resetObject.areAllDisable));
        localStorage.setItem("playbackRate.max", String(resetObject.max));
        localStorage.setItem("playbackRate.min", String(resetObject.min));
        ReturnPaybackRateAction.type = "reset";
        ReturnPaybackRateAction.payload = resetObject;
        return ReturnPaybackRateAction;
    },
    /**
    @type {(n: number) => Maybe<PlaybackRateAction>} */
    changeMax(n) {
        if (globalState.playbackRate.min <= n && n <= playbackRateLimits.MAX) {
            globalState.playbackRate.max = n;
            localStorage.setItem("playbackRate.max", String(n));
            ReturnPaybackRateAction.type = "max/change";
            ReturnPaybackRateAction.payload = createGlobalPlaybackRate();
            return ReturnPaybackRateAction;
        }
    },
    /**
    @type {(n: number) => Maybe<PlaybackRateAction>} */
    changeMin(n) {
        if (playbackRateLimits.MIN <= n && n <= globalState.playbackRate.max) {
            globalState.playbackRate.min = n;
            localStorage.setItem("playbackRate.min", String(n));
            ReturnPaybackRateAction.type = "max/change";
            ReturnPaybackRateAction.payload = createGlobalPlaybackRate();
            return ReturnPaybackRateAction;
        }
    }
};

/**
@type {(state: GlobalPlaybackRate, action: Maybe<PlaybackRateAction>) => GlobalPlaybackRate} */
function playbackRateReducer(state, action) {
    if (action !== undefined) {
        return action.payload;
    }
    return state;
}

export {
    playbackRateActions,
    playbackRateReducer
};