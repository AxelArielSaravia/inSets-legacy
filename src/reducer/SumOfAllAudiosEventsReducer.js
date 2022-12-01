/*-
SumOfAllAudiosEventsReducer: (number, {
    type: "add" | "subtract"
    payload: undefined | number
}) -> number
*/
function SumOfAllAudiosEventsReducer(state, action) {
    const {type} = action;
    if (type === "add") {
        return state + 1;
    }
    if (type === "clear") {
        return 0;
    }
    if (type === "subtract") {
        return state - action.payload;
    }
    return state;
}

export {
    SumOfAllAudiosEventsReducer
};