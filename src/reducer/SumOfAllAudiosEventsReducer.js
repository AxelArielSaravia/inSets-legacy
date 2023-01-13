import {GlobalState} from "../state/Global/index.js";

/*-
SumOfAllAudiosEventsReducer: (number, {
    type: "add" | "subtract"
    payload: undefined | number
}) -> number
*/
function SumOfAllAudiosEventsReducer(state, action) {
    const {type} = action;
    if (type === "add") {
        GlobalState.sumOfAllAudiosEvents += 1;
        return state + 1;
    }
    if (type === "clear") {
        GlobalState.sumOfAllAudiosEvents = 0;
        return 0;
    }
    if (type === "subtract") {
        GlobalState.sumOfAllAudiosEvents -= action.payload;
        return state - action.payload;
    }
    return state;
}

export {
    SumOfAllAudiosEventsReducer
};