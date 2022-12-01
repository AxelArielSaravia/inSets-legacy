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
        return Object.assign({}, state, {
            allDelaysAreDisabled: {global: true, value: true}
        });
    }
    if (type === "disable/filter") {
        GlobalState.filter.areAllDisable = true;
        changeLocalStorageState("filter", GlobalState.filter);
        return Object.assign({}, state, {
            allFiltersAreDisabled: {global: true, value: true}
        });
    }
    if (type === "disable/panner") {
        GlobalState.panner.areAllDisable = true;
        changeLocalStorageState("panner", GlobalState.filter);
        return Object.assign({}, state, {
            allPannersAreDisabled: {global: true, value: true}
        });
    }
    if (type === "disable/playbackRate") {
        GlobalState.playbackRate.areAllDisable = true;
        changeLocalStorageState("playbackRate", GlobalState.filter);
        return Object.assign({}, state, {
            allPlaybackRatesAreDisabled: {global: true, value: true}
        });
    }
    if (type === "disable/randomEndPoint") {
        GlobalState.randomEndPoint = true;
        changeLocalStorageState("randomEndPoint", true);
        return Object.assign({}, state, {
            allRandomEndPointsAreDisabled: {global: true, value: true}
        });
    }
    if (type === "disable/randomStartPoint") {
        GlobalState.randomStartPoint = true;
        changeLocalStorageState("randomStartPoint", true);
        return Object.assign({}, state, {
            allRandomStartPointsAreDisabled: {global: true, value: true}
        });
    }
    if (type === "enable/delay") {
        GlobalState.delay.areAllDisable = false;
        changeLocalStorageState("delay", GlobalState.delay);
        return Object.assign({}, state, {
            allDelaysAreDisabled: {global: payload, value: false}
        });
    }
    if (type === "enable/filter") {
        GlobalState.filter.areAllDisable = false;
        changeLocalStorageState("filter", GlobalState.filter);
        return Object.assign({}, state, {
            allFiltersAreDisabled: {global: payload, value: false}
        });
    }
    if (type === "enable/panner") {
        GlobalState.panner.areAllDisable = false;
        changeLocalStorageState("panner",  GlobalState.panner);
        return Object.assign({}, state, {
            allPannersAreDisabled: {global: payload, value: false}
        });
    }
    if (type === "enable/playbackRate") {
        GlobalState.playbackRate.areAllDisable = false;
        changeLocalStorageState("playbackRate", GlobalState.playbackRate);
        return Object.assign({}, state, {
            allPlaybackRatesAreDisabled: {global: payload, value: false}
        });
    }
    if (type === "enable/randomEndPoint") {
        GlobalState.randomEndPoint = false;
        changeLocalStorageState("randomEndPoint", false);
        return Object.assign({}, state, {
            allRandomEndPointsAreDisabled: {global: payload, value: false}
        });
    }
    if (type === "enable/randomStartPoint") {
        GlobalState.randomStartPoint = false;
        changeLocalStorageState("randomStartPoint", false);
        return Object.assign({}, state, {
            allRandomStartPointsAreDisable: {global: payload, value: false}
        });
    }
    return state;
}

export {
    ViewGeneralDisableReducer
};