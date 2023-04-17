import globalState from "../state/globalState.js";
import {globalDefault} from "../state/globalDefault.js";
import {delayLimits} from "../state/limits.js";
import {isInsideInterval} from "../utils.js";

const delayReducerTypes = {
    "reset": true,
    "time/changeMax": true,
    "time/changeMin": true,
    "feedback/changeMax": true,
    "feedback/changeMin": true
};

/*-
delayReducer: (GlobalDelay, {
    type: "reset"
        | "time/changeMax"
        | "time/changeMin"
        | "feedback/changeMax"
        | "feedback/changeMin",
    payload: GlobalDelay | undefined
}) -> GlobalDelay */
function delayReducer(state, action) {
    const type = action?.type;
    const payload = action?.payload;
    return (
        delayReducerTypes[type] !== undefined
        ? payload
        : state
    );
}

const delayActions = Object.freeze({
    reset() {
        const resetObject = Object.assign({}, globalDefault.delay);
        resetObject.areAllDisable = globalState.delay.areAllDisable;
        globalState.delay = resetObject;
        localStorage.setItem("delay.areAllDisable", globalState.delay.areAllDisable);
        localStorage.setItem("delay.timeMax", globalState.delay.timeMax);
        localStorage.setItem("delay.timeMin", globalState.delay.timeMin);
        localStorage.setItem("delay.feedbackMax", globalState.delay.feedbackMax);
        localStorage.setItem("delay.feedbackMin", globalState.delay.feedbackMin);
        return {type: "reset", payload: resetObject};
    },
    changeTimeMax(number) {
        if (isInsideInterval(globalState.delay.timeMin, delayLimits.TIME_MAX, number)) {
            globalState.delay.timeMax = number;
            localStorage.setItem("delay.timeMax", number);
            return {type: "time/changeMax", payload: Object.assign({}, globalState.delay)};
        }
    },
    changeTimeMin(number) {
        if (isInsideInterval(delayLimits.TIME_MIN, globalState.delay.timeMax, number)) {
            globalState.delay.timeMin = number;
            localStorage.setItem("delay.timeMin", number);
            return {type: "time/changeMin", payload: Object.assign({}, globalState.delay)};
        }
    },
    changeFeedbackMax(number) {
        if (isInsideInterval( globalState.delay.feedbackMin, delayLimits.FBACK_MAX, number)) {
            globalState.delay.feedbackMax = number;
            localStorage.setItem("delay.feedbackMax", number);
            return {type: "feedback/changeMax", payload: Object.assign({}, globalState.delay)};
        }
    },
    changeFeedbackMin(number) {
        if (isInsideInterval(delayLimits.FBACK_MIN,  globalState.delay.feedbackMax, number)) {
            globalState.delay.feedbackMin = number;
            localStorage.setItem("delay.feedbackMin", number);
            return {type: "feedback/changeMin", payload: Object.assign({}, globalState.delay)};
        }
    },
});

export {
    delayActions,
    delayReducer
};