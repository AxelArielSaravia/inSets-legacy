// @ts-check
import globalState from "../state/globalState.js";
import {timeIntervalLimits} from "../state/limits.js";
import {
    createDefaultGlobalTimeInterval,
    createGlobalTimeInterval
} from "../state/factory.js";

/**
@type {{type: any, payload: any}} */
const ReturnTimeAction = {
    type: "",
    payload: undefined
};

/**
@type {(n: number, add: boolean) => Maybe<TimeAction>} */
function changeMax(n, add) {
    const value = (
        add
        ? globalState.timeInterval.max + n
        : globalState.timeInterval.max - n
    );
    if (globalState.timeInterval.min <= value && value <= timeIntervalLimits.MAX) {
        globalState.timeInterval.max = value;
        localStorage.setItem("timeInterval.max", String(value));
        ReturnTimeAction.type = "max/change";
        ReturnTimeAction.payload = createGlobalTimeInterval();
        return ReturnTimeAction;
    }
}

/**
@type {(n: number, add: boolean) => Maybe<TimeAction>} */
function changeMin(n, add) {
    const value = (
        add
        ? globalState.timeInterval.min + n
        : globalState.timeInterval.min - n
    );
    if (timeIntervalLimits.MIN <= value && value <= globalState.timeInterval.max) {
        globalState.timeInterval.min = value;
        localStorage.setItem("timeInterval.min", String(value));
        ReturnTimeAction.type = "min/change";
        ReturnTimeAction.payload = createGlobalTimeInterval();
        return ReturnTimeAction;
    }
}

/**
@type {Readonly<{
    reset: () => TimeAction,
    addToMax: (n: number) => Maybe<TimeAction>,
    subtractToMax: (n: number) => Maybe<TimeAction>,
    addToMin: (n: number) => Maybe<TimeAction>,
    subtractToMin: (n: number) => Maybe<TimeAction>
}>} */
const timeActions = {
    /**
    @type {() => TimeAction} */
    reset() {
        const defaultObj = createDefaultGlobalTimeInterval();
        globalState.timeInterval = defaultObj;
        localStorage.setItem("timeInterval.max", String(defaultObj.max));
        localStorage.setItem("timeInterval.min", String(defaultObj.min));
        ReturnTimeAction.type = "reset";
        ReturnTimeAction.payload = defaultObj;
        return ReturnTimeAction;
    },
    /**
    @type {(n: number) => Maybe<TimeAction>} */
    addToMax(n) {
        return changeMax(n, true);
    },
    /**
    @type {(n: number) => Maybe<TimeAction>} */
    subtractToMax(n) {
        return changeMax(n, false);
    },
    /**
    @type {(n: number) => Maybe<TimeAction>} */
    addToMin(n) {
        return changeMin(n, true);
    },
    /**
    @type {(n: number) => Maybe<TimeAction>} */
    subtractToMin(n) {
        return changeMin(n, false);
    }
};

/**
@type {(state: GlobalTimeInterval, action: Maybe<TimeAction>) => GlobalTimeInterval} */
function timeReducer(state, action) {
    if (action !== undefined) {
        return action.payload;
    }
    return state;
}

export {
    timeActions,
    timeReducer
};