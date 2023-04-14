import globalState from "../state/globalState.js";
import {globalDefault} from "../state/globalDefault.js";
import {timeIntervalLimits} from "../state/limits.js";
import {isInsideInterval} from "../utils.js";

/*-
timeReducer: (GlobalTimeInterval, {
    type: "reset" | "max/change" | "min/change",
    payload: undefined | GlobalTimeInterval
}) -> GlobalTimeInterval */
function timeReducer(state, action) {
    const type = action?.type;
    const payload = action?.payload;
    return (
        type === "reset"
        || type === "max/change"
        || type === "min/change"
        ? payload
        : state
    );
}

/*-
changeMax :: (number, boolean) -> {type: string, payload: GlobalTimeInterval}*/
function changeMax(number, add) {
    const value = (
        add !== undefined
        ? globalState.timeInterval.max + number
        : globalState.timeInterval.max - number
    );
    if (isInsideInterval(globalState.timeInterval.min, timeIntervalLimits.MAX, value)) {
        globalState.timeInterval.max = value;
        localStorage.setItem(
            "timeInterval",
            JSON.stringify(globalState.timeInterval)
        );
        return {type: "max/change", payload: Object.assign({}, globalState.timeInterval)};
    }
}

/*-
changeMin :: (number, boolean) -> {type: string, payload: GlobalTimeInterval}*/
function changeMin(number, add) {
    const value = (
        add !== undefined
        ? globalState.timeInterval.min + number
        : globalState.timeInterval.min - number
    );
    if (isInsideInterval(timeIntervalLimits.MIN, globalState.timeInterval.max, value)) {
        globalState.timeInterval.min = value;
        localStorage.setItem(
            "timeInterval",
            JSON.stringify(globalState.timeInterval)
        );
        return {type: "min/change", payload: Object.assign({}, globalState.timeInterval)};
    }
}

const timeActions = Object.freeze({
    reset() {
        const defaultObj = Object.assign({}, globalDefault.timeInterval);
        globalState.timeInterval = defaultObj;
        localStorage.setItem("timeInterval", JSON.stringify(defaultObj));
        return {type: "reset", payload: defaultObj};
    },
    addToMax(number) {
        return changeMax(number, true);
    },
    subtractToMax(number) {
        return changeMax(number);
    },
    addToMin(number) {
        return changeMin(number, true);
    },
    subtractToMin(number) {
        return changeMin(number);
    }
});

export {
    timeActions,
    timeReducer
};