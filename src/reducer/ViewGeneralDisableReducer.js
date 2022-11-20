import {GlobalState} from "../state/Global/index.js";
import {changeLocalStorageState} from "../services/localStorage/service.js";

/*-
ViewGeneralDisableReducer: (ViewGeneralDisableState, {
    type: "disable/delay"
        | "disable/filter"
        | "disable/panner"
        | "disable/playbackRate"
        | "disable/RandomEndpoint"
        | "disable/RandomStartpoint
        | "enable/delay"
        | "enable/filter"
        | "enable/panner"
        | "enable/playbackRate"
        | "enable/RandomEndpoint"
        | "enable/RandomStartpoint",
    payload: undefined | boolean
}) -> ViewGeneralDisableState
*/
function ViewGeneralDisableReducer(state, action) {
    const {payload, type} = action;

    if (type === "disable/delay") {
        GlobalState.delay.areAllDisable = true;
        changeLocalStorageState("delay", GlobalState.delay);
        return {
            ...state,
            allDelaysAreDisabled: {value: true, global: true}
        };
    }
    if (type === "disable/filter") {
        GlobalState.filter.areAllDisable = true;
        changeLocalStorageState("filter", GlobalState.filter);
        return {
            ...state,
            allFiltersAreDisabled: {value: true, global: true}
        };
    }
    if (type === "disable/panner") {
        GlobalState.panner.areAllDisable = true;
        changeLocalStorageState("panner", GlobalState.filter);
        return {
            ...state,
            allPannersAreDisabled: {value: true, global: true}
        };
    }
    if (type === "disable/playbackRate") {
        GlobalState.playbackRate.areAllDisable = true;
        changeLocalStorageState("playbackRate", GlobalState.filter);
        return {
            ...state,
            allPlaybackRatesAreDisabled: {value: true, global: true}
        };
    }
    if (type === "disable/randomEndPoint") {
        GlobalState.randomEndPoint = true;
        changeLocalStorageState("randomEndPoint", true);
        return {
            ...state,
            allRandomEndPointsAreDisabled: {value: true, global: true}
        };
    }
    if (type === "disable/randomStartPoint") {
        GlobalState.randomStartPoint = true;
        changeLocalStorageState("randomStartPoint", true);
        return {
            ...state,
            allRandomStartPointsAreDisabled: {value: true, global: true}
        };
    }
    if (type === "enable/delay") {
        GlobalState.delay.areAllDisable = false;
        changeLocalStorageState("delay", GlobalState.delay);
        return {
            ...state,
            allDelaysAreDisabled: {value: false, global: payload}
        };
    }
    if (type === "enable/filter") {
        GlobalState.filter.areAllDisable = false;
        changeLocalStorageState("filter", GlobalState.filter);
        return {
            ...state,
            allFiltersAreDisabled: {value: false, global: payload}
        };
    }
    if (type === "enable/panner") {
        GlobalState.panner.areAllDisable = false;
        changeLocalStorageState("panner",  GlobalState.panner);
        return {
            ...state,
            allPannersAreDisabled: {value: false, global: payload}
        };
    }
    if (type === "enable/playbackRate") {
        GlobalState.playbackRate.areAllDisable = false;
        changeLocalStorageState("playbackRate", GlobalState.playbackRate);
        return {
            ...state,
            allPlaybackRatesAreDisabled: {value: false, global: payload}
        };
    }
    if (type === "enable/randomEndPoint") {
        GlobalState.randomEndPoint = false;
        changeLocalStorageState("randomEndPoint", false);
        return {
            ...state,
            allRandomEndPointsAreDisabled: {value: false, global: payload}
        };
    }
    if (type === "enable/randomStartPoint") {
        GlobalState.randomStartPoint = false;
        changeLocalStorageState("randomStartPoint", false);
        return {
            ...state,
            allRandomStartPointsAreDisable: {value: false, global: payload}
        };
    }
    return state;
}

export {
    ViewGeneralDisableReducer
};