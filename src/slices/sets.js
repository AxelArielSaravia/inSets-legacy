// @ts-check
import globalState from "../state/globalState.js";
import {createSetsState} from "../state/factory.js";

/**@type {{type: any, payload: any}} */
const return_action = {type: "", payload: undefined};

/**
@type {Readonly<{
    update(): SetsAction,
    addEvent(i: number): Maybe<SetsAction>,
    removeEvent(i: number): Maybe<SetsAction>,
    reset(): SetsAction
}>} */
const setsActions = {
    /**
    @type {() => SetsAction} */
    update() {
        return_action.type = "update";
        return_action.payload = createSetsState();
        return return_action;
    },
    /**
    @type {(i: number) => Maybe<SetsAction>} */
    addEvent(i) {
        const gstate = globalState.eventsForEachSet;
        const value = gstate.arrOfEvents[i];
        if (value <= 0 || gstate.sumOfAllEvents !== value) {
            gstate.arrOfEvents[i] += 1;
            gstate.sumOfAllEvents += 1;
            return_action.type = "addEvent";
            return_action.payload = createSetsState();
            return return_action;
        }
    },
    /**
    @type {(i: number) => Maybe<SetsAction>} */
    removeEvent(i) {
        const gstate = globalState.eventsForEachSet;
        if (gstate.sumOfAllEvents > 1 && gstate.arrOfEvents[i] > 0) {
            gstate.arrOfEvents[i] -= 1;
            gstate.sumOfAllEvents -= 1;
            return_action.type = "removeEvent";
            return_action.payload = createSetsState();
            return return_action;
        }
    },
    /**
    @type {() => SetsAction} */
    reset() {
        const gstate = globalState.eventsForEachSet;
        const length = gstate.arrOfEvents.length;
        gstate.arrOfEvents = (new Array(length)).fill(1);
        gstate.sumOfAllEvents = length;
        return_action.type = "reset";
        return_action.payload = createSetsState();
        return return_action;
    }
};

/**
@type {(state: EventsForEachSet, action: Maybe<SetsAction>) => EventsForEachSet} */
function setsReducer(state, action) {
    if (action !== undefined) {
        return action.payload;
    }
    return state;
}

export {
    setsActions,
    setsReducer
};