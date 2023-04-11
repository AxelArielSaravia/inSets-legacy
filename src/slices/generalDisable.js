import globalState from "../state/globalState.js";
import {effects} from "./utils.js";

const generalDisableReducerTypes = {
    "disable/delay": true,
    "disable/filter": true,
    "disable/panner": true,
    "disable/playbackRate": true,
    "disable/randomEndPoint": true,
    "disable/randomStartPoint": true,
    "enable/delay": true,
    "enable/filter": true,
    "enable/panner": true,
    "enable/playbackRate": true,
    "enable/randomEndPoint": true,
    "enable/randomStartPoint": true
};

const typeOfAction = {
    "enable": true,
    "disable": true
};

const scopes = {
    "global": true,
    "local": true
};

const disablePayload = {global: true, value: true};
const enableGlobalyPayload = {global: true, value: false};
const enableLocalyPayload = {global: false, value: false};

const staticActions = {
    disable_delay: {
        type: "disable/delay",
        effect: "Delay",
        payload: disablePayload
    },
    disable_filter: {
        type: "disable/filter",
        effect: "Filter",
        payload: disablePayload
    },
    disable_panner: {
        type: "disable/panner",
        effect: "Panner",
        payload: disablePayload
    },
    disable_playbackRate: {
        type: "disable/playbackRate",
        effect: "PlaybackRate",
        payload: disablePayload
    },
    disable_randomEndPoint: {
        type: "disable/randomEndPoint",
        effect: "RandomEndPoint",
        payload: disablePayload
    },
    disable_randomStartPoint: {
        type: "disable/randomStartPoint",
        effect: "RandomStartPoint",
        payload: disablePayload
    },
    enable_delay_global: {
        type: "enable/delay",
        effect: "Delay",
        payload: enableGlobalyPayload
    },
    enable_delay_local: {
        type: "enable/delay",
        effect: "Delay",
        payload: enableLocalyPayload
    },
    enable_filter_global: {
        type: "enable/filter",
        effect: "Filter",
        payload: enableGlobalyPayload
    },
    enable_filter_local: {
        type: "enable/filter",
        effect: "Filter",
        payload: enableLocalyPayload
    },
    enable_panner_global: {
        type: "enable/panner",
        effect: "Panner",
        payload: enableGlobalyPayload
    },
    enable_panner_local: {
        type: "enable/panner",
        effect: "Panner",
        payload: enableLocalyPayload
    },
    enable_playbackRate_global: {
        type: "enable/playbackRate",
        effect: "PlaybackRate",
        payload: enableGlobalyPayload
    },
    enable_playbackRate_local: {
        type: "enable/playbackRate",
        effect: "PlaybackRate",
        payload: enableLocalyPayload
    },
    enable_randomEndPoint_global: {
        type: "enable/randomEndPoint",
        effect: "RandomEndPoint",
        payload: enableGlobalyPayload
    },
    enable_randomEndPoint_local: {
        type: "enable/randomEndPoint",
        effect: "RandomEndPoint",
        payload: enableLocalyPayload
    },
    enable_randomStartPoint_global: {
        type: "enable/randomStartPoint",
        effect: "RandomStartPoint",
        payload: enableGlobalyPayload
    },
    enable_randomStartPoint_local: {
        type: "enable/randomStartPoint",
        effect: "RandomStartPoint",
        payload: enableLocalyPayload
    }
};

function generalDisableAction(type, effect, scope) {
    if (typeOfAction[type] !== undefined
        && effects[effect] !== undefined
    ) {
        globalState[effect].areAllDisable = type === "disable";
        localStorage.setItem(effect, JSON.stringify(globalState[effect]));
        return (
            type === "enable" && scopes[scope] !== undefined
            ? staticActions[`${type}_${effect}_${scope}`]
            : staticActions[`${type}_${effect}`]
        );
    }
}

/*-
generalDisableReducer :: (GeneralDisableState, {
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
    payload: GeneralDisableState | undefined
}) -> GeneralDisableState */
function generalDisableReducer(state, action) {
    const type = action?.type;
    const effect = action?.effect;
    const payload = action?.payload;
    if (generalDisableReducerTypes[type] !== undefined) {
        const newState = Object.assign({}, state);
        newState[`all${effect}sAreDisabled`] = payload;
        return newState;
    } else {
        return state;
    }
}

export {
    generalDisableAction,
    generalDisableReducer
};