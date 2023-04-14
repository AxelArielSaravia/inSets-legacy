import globalState from "../state/globalState.js";
import {globalDefault} from "../state/globalDefault.js";
import {playbackRateLimits} from "../state/limits.js";
import {isInsideInterval} from "../utils.js";

/*-
playbackRateReducer: (GlobalPlaybackRate, {
    type: "reset" | "max/change" | "min/change",
    payload: number | undefined
}) -> GlobalPlaybackRate */
function playbackRateReducer(state, action) {
    const type = action?.type;
    const payload = action?.payload;
    return (
        type === "reset"
        || type === "max/change"
        || type === "min/change"
        ? payload
        : state
    );
}

const playbackRateActions = Object.freeze({
    reset() {
        const resetObject = Object.assign({}, globalDefault.playbackRate);
        resetObject.areAllDisable =  globalState.playbackRate.areAllDisable;
        globalState.playbackRate = resetObject;
        localStorage.setItem("playbackRate", JSON.stringify(resetObject));
        return {
            type: "reset",
            payload: resetObject
        };
    },
    changeMax(number) {
        if (isInsideInterval(globalState.playbackRate.min, playbackRateLimits.MAX, number)) {
            globalState.playbackRate.max = number;
            localStorage.setItem("playbackRate", JSON.stringify(globalState.playbackRate));
            return {
                type: "max/change",
                payload: Object.assign({}, globalState.playbackRate)
            };
        }
    },
    changeMin(number) {
        if (isInsideInterval(playbackRateLimits.MIN, globalState.playbackRate.max, number)) {
            globalState.playbackRate.min = number;
            localStorage.setItem("playbackRate", JSON.stringify(globalState.playbackRate));
            return {
                type: "min/change",
                payload: Object.assign({}, globalState.playbackRate)
            };
        }
    }
});

export {
    playbackRateActions,
    playbackRateReducer
};