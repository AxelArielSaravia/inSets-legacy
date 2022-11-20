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
    } else if (type === "clear") {
        return 0;
    } else if (type === "subtract") {
        return state - action.payload;
    }
    return state;
}

export {
    SumOfAllAudiosEventsReducer
};