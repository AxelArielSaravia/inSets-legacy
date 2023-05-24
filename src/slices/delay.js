// @ts-check
import globalState from "../state/globalState.js";
import {
    createDefaultGlobalDelay,
    createGlobalDelay
} from "../state/factory.js";
import {delayLimits} from "../state/limits.js";

/**@type {{type: any, payload: any}} */
const ReturnDealyAction = {
    type: "reset",
    payload: undefined,
};

/**
@type {Readonly<{
    reset: () => DelayAction,
    changeTimeMax: (n: number) => Maybe<DelayAction>,
    changeTimeMin: (n: number) => Maybe<DelayAction>,
    changeFeedbackMax: (n: number) => Maybe<DelayAction>,
    changeFeedbackMin: (n: number) => Maybe<DelayAction>
}>} */
const delayActions = {
    /**
    @type {() => DelayAction} */
    reset() {
        const resetObject = createDefaultGlobalDelay();
        resetObject.areAllDisable = globalState.delay.areAllDisable;
        globalState.delay = resetObject;
        localStorage.setItem("delay.areAllDisable", String(resetObject.areAllDisable));
        localStorage.setItem("delay.timeMax", String(resetObject.timeMax));
        localStorage.setItem("delay.timeMin", String(resetObject.timeMin));
        localStorage.setItem("delay.feedbackMax", String(resetObject.feedbackMax));
        localStorage.setItem("delay.feedbackMin", String(resetObject.feedbackMin));
        ReturnDealyAction.type = "reset";
        ReturnDealyAction.payload = resetObject;
        return ReturnDealyAction;
    },
    /**
    @type {(n: number) => Maybe<DelayAction>} */
    changeTimeMax(n) {
        const globalDelay = globalState.delay;
        if (globalDelay.timeMin <= n && n <= delayLimits.TIME_MAX) {
            globalDelay.timeMax = n;
            localStorage.setItem("delay.timeMax", String(n));
            ReturnDealyAction.type = "time/changeMax";
            ReturnDealyAction.payload = createGlobalDelay();
            return ReturnDealyAction;
        }
    },
    /**
    @type {(n: number) => Maybe<DelayAction>}*/
    changeTimeMin(n) {
        const globalDelay = globalState.delay;
        if (delayLimits.TIME_MIN <= n && n <= globalDelay.timeMax) {
            globalDelay.timeMin = n;
            localStorage.setItem("delay.timeMin", String(n));
            ReturnDealyAction.type = "time/changeMin";
            ReturnDealyAction.payload = createGlobalDelay();
            return ReturnDealyAction;
        }
    },
    /**
    @type {(n: number) => Maybe<DelayAction>}*/
    changeFeedbackMax(n) {
        if (globalState.delay.feedbackMin <= n && n <= delayLimits.FBACK_MAX) {
            globalState.delay.feedbackMax = n;
            localStorage.setItem("delay.feedbackMax", String(n));
            ReturnDealyAction.type = "feedback/changeMax";
            ReturnDealyAction.payload = createGlobalDelay();
            return ReturnDealyAction;
        }
    },
        /**
    @type {(n: number) => Maybe<DelayAction>}*/
    changeFeedbackMin(n) {
        if (delayLimits.FBACK_MIN <= n && n <= globalState.delay.feedbackMax) {
            globalState.delay.feedbackMin = n;
            localStorage.setItem("delay.feedbackMin", String(n));
            ReturnDealyAction.type = "feedback/changeMin";
            ReturnDealyAction.payload = createGlobalDelay();
            return ReturnDealyAction;
        }
    },
};

/**
@type {(
    state: GlobalDelay,
    action: Maybe<DelayAction>
) => GlobalDelay} */
function delayReducer(state, action) {
    if (action !== undefined) {
        return action.payload;
    }
    return state;
}

export {
    delayActions,
    delayReducer
};
