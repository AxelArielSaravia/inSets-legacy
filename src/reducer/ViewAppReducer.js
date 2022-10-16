import { GlobalState } from "../state/Global/index.js";
import changeColor from "../services/changeColor/service.js";

/*-
ViewAppReducer: (ViewAppState, {
    type: "start" | "stop" | "newAudioSet"
    payload: undefined | string
}) -> ViewAppState
*/
function ViewAppReducer(state, action) {
    const {type} = action;
    if (type === "start") {
        GlobalState._is_started = true;
        return {
            ...state,
            _is_started: true
        };
    } else if (type === "stop") {
        GlobalState._is_started = false;
        return {
            playColor: "",
            playAudiosSet: {},
            _is_started: false
        };
    } else if (type === "newAudiosSet" && state._is_started) {
        return {
            ...state,
            playColor: changeColor(),
            playAudiosSet: action.payload
        }
    }
    return state
}

export {
    ViewAppReducer
};