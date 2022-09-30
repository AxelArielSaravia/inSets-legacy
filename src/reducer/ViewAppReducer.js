import { GlobalState } from "../state/Global/index.js";
import changeColor from "../services/changeColor/service.js";

const ViewAppReducer = (state, action) => {
    switch (action.type) {
        case "start": {
            GlobalState._is_started = true;
            return {...state, _is_started: true};
        }
        case "stop": {
            GlobalState._is_started = false;
            return { playColor: "", playAudiosSet: {}, _is_started: false }
        }
        case "newAudiosSet": {
            if (state._is_started) {
                return { ...state, playColor: changeColor(), playAudiosSet: action.payload }
            }
            return state
        }
        default: return state;
    }
}

export { ViewAppReducer }