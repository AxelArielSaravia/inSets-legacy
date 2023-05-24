//@ts-check
import globalState from "../state/globalState.js";

/**
@type {SumOfAllAudiosEventsAction} */
const ReturnSumOfAllAudiosEventsAction = {type: "add"};

/**
@type {Readonly<{
    add(): SumOfAllAudiosEventsAction,
    clear(): SumOfAllAudiosEventsAction,
    subtract(n: number): SumOfAllAudiosEventsAction,
    subtractOne(): SumOfAllAudiosEventsAction
}>} */
const sumOfAllAudiosEventsActions = {
    /**
    @type {() => SumOfAllAudiosEventsAction} */
    add() {
        globalState.sumOfAllAudiosEvents += 1;
        ReturnSumOfAllAudiosEventsAction.type = "add";
        return ReturnSumOfAllAudiosEventsAction;
    },
    /**
    @type {() => SumOfAllAudiosEventsAction} */
    clear() {
        globalState.sumOfAllAudiosEvents = 0;
        ReturnSumOfAllAudiosEventsAction.type = "clear";
        return ReturnSumOfAllAudiosEventsAction;
    },
    /**
    @type {(n: number) => SumOfAllAudiosEventsAction} */
    subtract(n) {
        globalState.sumOfAllAudiosEvents -= n;
        ReturnSumOfAllAudiosEventsAction.type = "subtract";
        return ReturnSumOfAllAudiosEventsAction;
    },
    /**
    @type {() => SumOfAllAudiosEventsAction} */
    subtractOne() {
        globalState.sumOfAllAudiosEvents -= 1;
        ReturnSumOfAllAudiosEventsAction.type = "subtract";
        return ReturnSumOfAllAudiosEventsAction;
    }
};

/**
@type {(state: number , action: SumOfAllAudiosEventsAction) => number} */
function sumOfAllAudiosEventsReducer(state, action) {
    return globalState.sumOfAllAudiosEvents;
}

export {
    sumOfAllAudiosEventsActions,
    sumOfAllAudiosEventsReducer
};