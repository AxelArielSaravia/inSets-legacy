import globalState from "../state/globalState.js";
import {globalDefault} from "../state/globalDefault.js";
import {pannerLimits} from "../state/limits.js";
import {isInsideInterval} from "../utils.js";

const pannerReducerTypes = {
    "reset": true,
    "x/changeMax": true,
    "x/changeMin": true,
    "y/changeMax": true,
    "y/changeMin": true,
    "z/changeMax": true,
    "z/changeMin": true
};
/*-
pannerReducer: (GlobalPanner, {
    type: "reset"
        | "x/changeMax"
        | "x/changeMin"
        | "y/changeMax"
        | "y/changeMin"
        | "z/changeMax"
        | "z/changeMin",
    payload: undefined | number
}) -> GlobalPanner */
function pannerReducer(state, action) {
    const type = action?.type;
    const payload = action?.payload;
    return (
        pannerReducerTypes[type] !== undefined
        ? payload
        : state
    );
}

const pannerActions = Object.freeze({
    reset() {
        const resetObject = Object.assign({}, globalDefault.panner);
        resetObject.areAllDisable =  globalState.panner.areAllDisable;
        globalState.panner = resetObject;
        localStorage.setItem("panner.areAllDisable", globalState.panner.areAllDisable);
        localStorage.setItem("panner.xMax", globalState.panner.xMax);
        localStorage.setItem("panner.xMin", globalState.panner.xMin);
        localStorage.setItem("panner.yMax", globalState.panner.yMax);
        localStorage.setItem("panner.yMin", globalState.panner.yMin);
        localStorage.setItem("panner.zMax", globalState.panner.zMax);
        localStorage.setItem("panner.zMin", globalState.panner.zMin);
        return {type: "reset", payload: resetObject};
    },
    changeXMax(number) {
        if (isInsideInterval(globalState.panner.xMin, pannerLimits.MAX, number)) {
            globalState.panner.xMax = number;
            localStorage.setItem("panner.xMax", number);
            return {type: "x/changeMax", payload: Object.assign({}, globalState.panner)};
        }
    },
    changeXMin(number) {
        if (isInsideInterval(pannerLimits.MIN, globalState.panner.xMax, number)) {
            globalState.panner.xMin = number;
            localStorage.setItem("panner.xMin", number);
            return {type: "x/changeMin", payload: Object.assign({}, globalState.panner)};
        }
    },
    changeYMax(number) {
        if (isInsideInterval(globalState.panner.yMin, pannerLimits.MAX, number)) {
            globalState.panner.yMax = number;
            localStorage.setItem("panner.yMax", number);
            return {type: "y/changeMax", payload: Object.assign({}, globalState.panner)};
        }
    },
    changeYMin(number) {
        if (isInsideInterval(pannerLimits.MIN, globalState.panner.yMax, number)) {
            globalState.panner.yMin = number;
            localStorage.setItem("panner.yMin", number);
            return {type: "y/changeMin", payload: Object.assign({}, globalState.panner)};
        }
    },
    changeZMax(number) {
        if (isInsideInterval(globalState.panner.zMin, pannerLimits.MAX, number)) {
            globalState.panner.zMax = number;
            localStorage.setItem("panner.zMax", number);
            return {type: "z/changeMax", payload: Object.assign({}, globalState.panner)};
        }
    },
    changeZMin(number) {
        if (isInsideInterval(pannerLimits.MIN, globalState.panner.zMax, number)) {
            globalState.panner.zMin = number;
            localStorage.setItem("panner.zMin", number);
            return {type: "z/changeMin", payload: Object.assign({}, globalState.panner)};
        }
    }
});

export {
    pannerActions,
    pannerReducer
};