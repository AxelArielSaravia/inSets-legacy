import globalState from "../state/globalState.js";

/*-
sumOfAllAudiosEventsReducer :: (number, {
    type: "add" | "subtract"
    payload: undefined | number
}) -> number */
function sumOfAllAudiosEventsReducer(state, action) {
    const type = action?.type;
    return (
        type === "add"
        || type === "clear"
        || type === "subtract"
        ? globalState.sumOfAllAudiosEvents
        : state
    );
}

const staticActions = {
    add: {type: "add"},
    clear: {type: "clear"},
    subtractOne: {type: "subtract", payload: 1}
};

const sumOfAllAudiosEventsActions = Object.freeze({
    add() {
        globalState.sumOfAllAudiosEvents += 1;
        return staticActions.add;
    },
    clear() {
        globalState.sumOfAllAudiosEvents = 0;
        return staticActions.clear;
    },
    subtract(number) {
        globalState.sumOfAllAudiosEvents -= number;
        return {type: "subtract", payload: number};
    },
    subtractOne() {
        globalState.sumOfAllAudiosEvents -= 1;
        return staticActions.subtractOne;
    }
});

export {
    sumOfAllAudiosEventsActions,
    sumOfAllAudiosEventsReducer
};