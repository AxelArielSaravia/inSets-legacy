import {GlobalState} from "../state/Global/index.js";
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
        GlobalState.is_started = true;
        return Object.assign({}, state, {is_started: true});
    }
    if (type === "stop") {
        GlobalState.is_started = false;
        return {
            is_started: false,
            playAudiosSet: {},
            playColor: "",
            state: true
        };
    }
    if (type === "newAudiosSet" && state.is_started) {
        return Object.assign({}, state, {
            playAudiosSet: action.payload.audios,
            playColor: changeColor(),
            state: action.payload.state
        });
    }
    return state;
}

export {
    ViewAppReducer
};