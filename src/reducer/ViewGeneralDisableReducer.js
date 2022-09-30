import { GlobalState } from "../state/Global/index.js";
import { changeLocalStorageState } from "../services/localStorage/service.js";

/**
 * @param {ViewGeneralDisableState} state 
 * @param {{  
 *  type: "disable/delay" | 
 *        "disable/filter" | 
 *        "disable/panner" | 
 *        "disable/playbackRate" | 
 *        "disable/RandomEndpoint" | 
 *        "disable/RandomStartpoint" |
 *        "enable/delay" | 
 *        "enable/filter" | 
 *        "enable/panner" | 
 *        "enable/playbackRate" | 
 *        "enable/RandomEndpoint" | 
 *        "enable/RandomStartpoint",
 *  payload?: boolean 
 * }} action 
 * @returns {ViewGeneralDisableState}
 */
const ViewGeneralDisableReducer = (state = {}, action) => {
    switch (action.type) {
        case "disable/delay": {
            GlobalState.delay.areAllDisable = true;
            changeLocalStorageState("delay", true, "areAllDisable");
            return { ...state, allDelaysAreDisabled: { value: true, global: true } }
        }
        case "disable/filter": {
            GlobalState.filter.areAllDisable = true;
            changeLocalStorageState("filter", true, "areAllDisable");
            return { ...state, allFiltersAreDisabled: { value: true, global: true } }
        }
        case "disable/panner": {
            GlobalState.panner.areAllDisable = true;
            changeLocalStorageState("panner", true, "areAllDisable");
            return { ...state, allPannersAreDisabled: { value: true, global: true } }
        }
        case "disable/playbackRate": {
            GlobalState.playbackRate.areAllDisable = true;
            changeLocalStorageState("playbackRate", true, "areAllDisable");
            return { ...state, allPlaybackRatesAreDisabled: { value: true, global: true } }
        }
        case "disable/randomEndPoint": {
            GlobalState.randomEndPoint = true;
            changeLocalStorageState("randomEndPoint", true);
            return { ...state, allRandomEndPointsAreDisabled: { value: true, global: true } }
        }
        case "disable/randomStartPoint": {
            GlobalState.randomStartPoint = true;
            changeLocalStorageState("randomStartPoint", true);
            return { ...state, allRandomStartPointsAreDisabled: { value: true, global: true } }
        }
        case "enable/delay": {
            GlobalState.delay.areAllDisable = false;
            changeLocalStorageState("delay", false, "areAllDisable");
            return { ...state, allDelaysAreDisabled: { value: false, global: action.payload } }
        }
        case "enable/filter": {
            GlobalState.filter.areAllDisable = false;
            changeLocalStorageState("filter", false, "areAllDisable");
            return { ...state, allFiltersAreDisabled: { value: false, global: action.payload } }
        }
        case "enable/panner": {
            GlobalState.panner.areAllDisable = false;
            changeLocalStorageState("panner", false, "areAllDisable");
            return { ...state, allPannersAreDisabled: { value: false, global: action.payload } }
        }
        case "enable/playbackRate": {
            GlobalState.playbackRate.areAllDisable = false;
            changeLocalStorageState("playbackRate", false, "areAllDisable");
            return { ...state, allPlaybackRatesAreDisabled: { value: false, global: action.payload } }
        }
        case "enable/randomEndPoint": {
            GlobalState.randomEndPoint = false;
            changeLocalStorageState("randomEndPoint", false);
            return { ...state, allRandomEndPointsAreDisabled: { value: false, global: action.payload } }
        }
        case "enable/randomStartPoint": {
            GlobalState.randomStartPoint = false;
            changeLocalStorageState("randomStartPoint", false);
            return { ...state, allRandomStartPointsAreDisable: { value: false, global: action.payload } }
        }
        default: return state;
    }
}

export { ViewGeneralDisableReducer };