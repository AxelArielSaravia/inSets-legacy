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
    "types/change": true
};
/*-
filterReducer: (GlobalFilter,{
    type: "reset"
        | "frequency/changeMax"
        | "frequency/changeMin"
        | "q/changeMax"
        | "q/changeMin"
        | "types/change",
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

const filterActions = Object.freeze({
    reset() {
        const resetObject = Object.assign({}, globalDefault.filter);
        resetObject.areAllDisable = globalState.filter.areAllDisable;
        globalState.filter = resetObject;
        localStorage.setItem("filter", JSON.stringify(resetObject));
        return {
            type: "reset",
            payload: resetObject
        };
    },
    changeMaxFrequency(number) {
        if(isInsideInterval(globalState.filter.frequencyMin, filterLimits.FREQ_MAX, number)) {
            globalState.filter.frequencyMax = number;
            localStorage.setItem("filter", JSON.stringify(globalState.filter));
            return {
                type: "frequency/changeMax",
                payload: Object.assign({}, globalState.filter)
            };
        }
    },
    changeMinFrequency(number) {
        if (isInsideInterval(filterLimits.FREQ_MIN, globalState.filter.frequencyMax, number)) {
            globalState.filter.frequencyMin = number;
            localStorage.setItem("filter", JSON.stringify(globalState.filter));
            return {
                type: "frequency/changeMin",
                payload:  Object.assign({}, globalState.filter)
            };
        }
    },
    changeMaxQ(number) {
        if (isInsideInterval(globalState.filter.qMin, filterLimits.Q_MAX, number)) {
            globalState.filter.qMax = number;
            localStorage.setItem("filter", JSON.stringify(globalState.filter));
            return {
                type: "q/changeMax",
                payload: Object.assign({}, globalState.filter)
            };
        }
    },
    changeMinQ(number) {
        if (isInsideInterval(filterLimits.Q_MIN, globalState.filter.qMax, number)) {
            globalState.filter.qMin = number;
            localStorage.setItem("filter", JSON.stringify(globalState.filter));
            return {
                type: "q/changeMin",
                payload: Object.assign({}, globalState.filter)
            };
        }
    },
    changeTypes(typeArray) {
        if (Array.isArray(typeArray)) {
            const arr = typeArray.filter(function (el) {
                return (/lowpass|highpass|bandpass|peaking|notch/).test(el);
            });
            if (arr.length !== 0) {
                globalState.filter.types = arr;
                localStorage.setItem("filter", JSON.stringify(globalState.filter));
                return {
                    type: "types/change",
                    payload: Object.assign({}, globalState.filter)
                };
            }
        }
    }
});

export {
    filterActions,
    filterReducer
};