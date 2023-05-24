//@ts-check
import globalState from "../state/globalState.js";
import {filterLimits} from "../state/limits.js";
import {createDefaultLocalStorageFilter, createLocalStorageFilter} from "../state/factory.js";

/**
@type {{type: any, payload: any}} */
const ReturnFilterAction = {
    type: "",
    payload: undefined
};

/**
@type {Readonly<{
    reset: () => FilterAction,
    changeMaxFrequency: (n: number) => Maybe<FilterAction>,
    changeMinFrequency: (n: number) => Maybe<FilterAction>,
    changeMaxQ: (n: number) => Maybe<FilterAction>,
    changeMinQ: (n: number) => Maybe<FilterAction>,
    changeType: (type:  "bandpass" | "highpass" | "lowpass" | "notch") => Maybe<FilterAction>
}>} */
const filterActions = {
    /**
    @type {() => FilterAction}*/
    reset() {
        const resetObject = createDefaultLocalStorageFilter();
        resetObject.areAllDisable = globalState.filter.areAllDisable;
        globalState.filter.frequencyMax = resetObject.frequencyMax;
        globalState.filter.frequencyMin = resetObject.frequencyMin;
        globalState.filter.qMax = resetObject.qMax;
        globalState.filter.qMin = resetObject.qMin;
        globalState.filter.bandpass = resetObject.bandpass;
        globalState.filter.highpass = resetObject.highpass;
        globalState.filter.lowpass = resetObject.lowpass;
        globalState.filter.notch = resetObject.notch;
        localStorage.setItem("filter.areAllDisable", String(resetObject.areAllDisable));
        localStorage.setItem("filter.frequencyMax", String(resetObject.frequencyMax));
        localStorage.setItem("filter.frequencyMin", String(resetObject.frequencyMin));
        localStorage.setItem("filter.qMax", String(resetObject.qMax));
        localStorage.setItem("filter.qMin", String(resetObject.qMin));
        localStorage.setItem("filter.bandpass", String(resetObject.bandpass));
        localStorage.setItem("filter.highpass", String(resetObject.highpass));
        localStorage.setItem("filter.lowpass", String(resetObject.lowpass));
        localStorage.setItem("filter.notch", String(resetObject.notch));
        ReturnFilterAction.type = "reset";
        ReturnFilterAction.payload = resetObject;
        return ReturnFilterAction;
    },
    /**
    @type {(n: number) => Maybe<FilterAction>} */
    changeMaxFrequency(n) {
        if(globalState.filter.frequencyMin <= n && n <= filterLimits.FREQ_MAX) {
            globalState.filter.frequencyMax = n;
            localStorage.setItem("filter.frequencyMax", String(n));
            ReturnFilterAction.type = "frequency/changeMax";
            ReturnFilterAction.payload = createLocalStorageFilter();
            return ReturnFilterAction;
        }
    },
    /**
    @type {(n: number) => Maybe<FilterAction>} */
    changeMinFrequency(n) {
        if(filterLimits.FREQ_MIN <= n && n <= globalState.filter.frequencyMax) {
            globalState.filter.frequencyMin = n;
            localStorage.setItem("filter.frequencyMin", String(n));
            ReturnFilterAction.type = "frequency/changeMin";
            ReturnFilterAction.payload = createLocalStorageFilter();
            return ReturnFilterAction;
        }
    },
    /**
    @type {(n: number) => Maybe<FilterAction>} */
    changeMaxQ(n) {
        if(globalState.filter.qMin <= n && n <= filterLimits.Q_MAX) {
            globalState.filter.qMax = n;
            localStorage.setItem("filter.qMax", String(n));
            ReturnFilterAction.type = "q/changeMax";
            ReturnFilterAction.payload = createLocalStorageFilter();
            return ReturnFilterAction;
        }
    },
    /**
    @type {(n: number) => Maybe<FilterAction>} */
    changeMinQ(n) {
        if(filterLimits.Q_MIN <= n && n <= globalState.filter.qMax) {
            globalState.filter.qMin = n;
            localStorage.setItem("filter.qMin", String(n));
            ReturnFilterAction.type = "q/changeMin";
            ReturnFilterAction.payload = createLocalStorageFilter();
            return ReturnFilterAction;
        }
    },
    /**
    @type {(type:  "bandpass" | "highpass" | "lowpass" | "notch") => Maybe<FilterAction>} */
    changeType(type) {
        if (!globalState.filter[type]) {
            let falses = 0;
            for (const type of filterLimits.TYPES) {
                if (!globalState.filter[type]) {
                    falses += 1;
                }
            }
            if (falses > 1) {
                globalState.filter[type] = !globalState.filter[type];
                localStorage.setItem(`filter.${type}`, String(globalState.filter[type]));
                ReturnFilterAction.type =`${type}/switch`;
                ReturnFilterAction.payload = createLocalStorageFilter();
                return ReturnFilterAction;
            }
        } else {
            globalState.filter[type] = !globalState.filter[type];
            localStorage.setItem(`filter.${type}`, String(globalState.filter[type]));
            ReturnFilterAction.type =`${type}/switch`;
            ReturnFilterAction.payload = createLocalStorageFilter();
            return ReturnFilterAction;
        }
    }
};

/**
@type {(state: LocalStorageFilter, action: Maybe<FilterAction>) => LocalStorageFilter} */
function filterReducer(state, action) {
    if (action !== undefined) {
        return action.payload;
    }
    return state;
}

export {
    filterActions,
    filterReducer
};