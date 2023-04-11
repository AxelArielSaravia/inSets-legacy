import globalState from "../state/globalState.js";

/*-
setsReducer: (EventsForEachSet, {
    type: "reset" | "sets/update" | "sets/addEvent" | "sets/removeEvent"
    payload?: EventsForEachSet
}) -> EventsForEachSet */
function setsReducer(state, action) {
    const type = action?.type;
    const payload = action?.payload;
    return (
        type === "reset"
        || type === "addEvent"
        || type === "removeEvent"
        ? payload
        : (
            type === "update"
            ? globalState.eventsForEachSet
            : state
        )
    );
}

const setsActions = Object.freeze({
    update: {type: "update"},
    addEvent(index) {
        const arrOfEvents = globalState.eventsForEachSet.arrOfEvents;
        const sumOfAllEvents = globalState.eventsForEachSet.sumOfAllEvents;
        if (arrOfEvents[index] <= 0
            || sumOfAllEvents !== arrOfEvents[index]
        ) {
            arrOfEvents[index] += 1;
            const newState = {
                arrOfEvents,
                sumOfAllEvents: sumOfAllEvents + 1
            };

            globalState.eventsForEachSet = newState;
            return {type: "addEvent", payload: newState};
        }
    },
    removeEvent(index) {
        const arrOfEvents = globalState.eventsForEachSet.arrOfEvents;
        const sumOfAllEvents = globalState.eventsForEachSet.sumOfAllEvents;
        if (sumOfAllEvents > 1 && arrOfEvents[index] > 0) {
            arrOfEvents[index] -= 1;
            const newState = {
                arrOfEvents,
                sumOfAllEvents: sumOfAllEvents - 1
            };
            globalState.eventsForEachSet = newState;
            return {type: "removeEvent", payload: newState};
        }
    },
    reset() {
        const length = globalState.eventsForEachSet.arrOfEvents.length;
        const resetObject = {
            arrOfEvents: (new Array(length)).fill(1),
            sumOfAllEvents: length
        };
        globalState.eventsForEachSet = resetObject;
        return {type: "reset", payload: resetObject};
    }
});

export {
    setsActions,
    setsReducer
};