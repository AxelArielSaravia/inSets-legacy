import globalState from "../state/globalState.js";
import {globalDefault} from "../state/globalDefault.js";
import {filterLimits} from "../state/limits.js";
import {isInsideInterval} from "../utils.js";

const filterReducerTypes = {
    "reset": true,
    "frequency/changeMax": true,
    "frequency/changeMin": true,
    "q/changeMax": true,
    "q/changeMin": true,
    "bandpass/switch": true,
    "highpass/switch": true,
    "lowpass/switch": true,
    "notch/switch": true
};
/*-
filterReducer :: (GlobalFilter,{
    type: "reset"
        | "frequency/changeMax"
        | "frequency/changeMin"
        | "q/changeMax"
        | "q/changeMin"
        | "bandpass/switch",
        | "highpass/switch",
        | "lowpass/switch",
        | "notch/switch"
    payload: GlobalFilter
}) -> GlobalFilter */
function filterReducer(state, action) {
    const type = action?.type;
    const payload = action?.payload;
    return (
        filterReducerTypes[type] !== undefined
        ? payload
        : state
    );
}

const types = {
    "bandpass": true,
    "highpass": true,
    "lowpass": true,
    "notch": true
};

const filterActions = Object.freeze({
    reset() {
        const resetObject = Object.assign({}, globalDefault.filter);
        resetObject.areAllDisable = globalState.filter.areAllDisable;
        globalState.filter = resetObject;
        localStorage.setItem("filter.areAllDisable", globalState.filter.areAllDisable);
        localStorage.setItem("filter.frequencyMax", globalState.filter.frequencyMax);
        localStorage.setItem("filter.frequencyMin", globalState.filter.frequencyMin);
        localStorage.setItem("filter.qMax", globalState.filter.qMax);
        localStorage.setItem("filter.qMin", globalState.filter.qMin);
        localStorage.setItem("filter.bandpass", globalState.filter.bandpass);
        localStorage.setItem("filter.highpass", globalState.filter.highpass);
        localStorage.setItem("filter.lowpass", globalState.filter.lowpass);
        localStorage.setItem("filter.notch", globalState.filter.notch);

        return {
            type: "reset",
            payload: resetObject
        };
    },
    changeMaxFrequency(number) {
        if(isInsideInterval(globalState.filter.frequencyMin, filterLimits.FREQ_MAX, number)) {
            globalState.filter.frequencyMax = number;
            localStorage.setItem("filter.frequencyMax", number);
            return {
                type: "frequency/changeMax",
                payload: Object.assign({}, globalState.filter)
            };
        }
    },
    changeMinFrequency(number) {
        if (isInsideInterval(filterLimits.FREQ_MIN, globalState.filter.frequencyMax, number)) {
            globalState.filter.frequencyMin = number;
            localStorage.setItem("filter.frequencyMin", number);
            return {
                type: "frequency/changeMin",
                payload:  Object.assign({}, globalState.filter)
            };
        }
    },
    changeMaxQ(number) {
        if (isInsideInterval(globalState.filter.qMin, filterLimits.Q_MAX, number)) {
            globalState.filter.qMax = number;
            localStorage.setItem("filter.qMax", number);
            return {
                type: "q/changeMax",
                payload: Object.assign({}, globalState.filter)
            };
        }
    },
    changeMinQ(number) {
        if (isInsideInterval(filterLimits.Q_MIN, globalState.filter.qMax, number)) {
            globalState.filter.qMin = number;
            localStorage.setItem("filter.qMin", number);
            return {
                type: "q/changeMin",
                payload: Object.assign({}, globalState.filter)
            };
        }
    },
    changeType(type) {
        if (types[type] === undefined) {
            return;
        }
        if (!globalState.filter[type]) {
            let falses = 0;
            for (let i = 0; i < filterLimits.TYPES.length; i+= 1) {
                if (!globalState.filter[filterLimits.TYPES[i]]) {
                    falses += 1;
                }
            }
            if (falses > 1) {
                globalState.filter[type] = !globalState.filter[type];
                localStorage.setItem(`filter.${type}`, globalState.filter[type]);
                return {
                    type: `${type}/switch`,
                    payload: Object.assign({}, globalState.filter)
                };
            }
        } else {

            globalState.filter[type] = !globalState.filter[type];
            localStorage.setItem(`filter.${type}`, globalState.filter[type]);
            return {
                type: `${type}/switch`,
                payload: Object.assign({}, globalState.filter)
            };
        }
    }
});

export {
    filterActions,
    filterReducer
};