// @ts-check
import globalState from "../state/globalState.js";
import {createGeneralDisableStateFrom} from "../state/factory.js";

/**
@type {{[i in Effects]: Capitalize<i>}} */
const effects = {
    "delay": "Delay",
    "filter": "Filter",
    "panner": "Panner",
    "playbackRate": "PlaybackRate",
    "randomEndPoint": "RandomEndPoint",
    "randomStartPoint": "RandomStartPoint"
};

const disablePayload = {global: true, value: true};
const payloadOptions = {
    "disable/global": disablePayload,
    "disable/local": disablePayload,
    "enable/global": {global: true, value: false},
    "enable/local": {global: false, value: false},
};

/**@type {{type: any, effect: any, payload: {global: boolean, value: boolean}}} */
const returnAction  = {
    type: "",
    effect: "",
    payload: disablePayload
};

/**
@type {(
    type: "enable" | "disable",
    effect: Effects,
    scope: "global" | "local"
) => GeneralDisableAction } */
function generalDisableAction(type, effect, scope) {
    const isDisable  = (type === "disable");
    globalState[effect].areAllDisable = isDisable;
    localStorage.setItem(`${effect}.areAllDisable`, String(isDisable));
    returnAction.type = type + "/" + effect;
    returnAction.effect = effects[effect];
    returnAction.payload = payloadOptions[type + "/" + scope];
    return returnAction;
}

/**
@type {(state: GeneralDisableState, action: GeneralDisableAction) => GeneralDisableState} */
function generalDisableReducer(state, action) {
    const newState = createGeneralDisableStateFrom(state);
    newState[`all${action.effect}sAreDisabled`] = action.payload;
    return newState;
}

export {
    generalDisableAction,
    generalDisableReducer
};