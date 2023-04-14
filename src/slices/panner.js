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
        localStorage.setItem("panner", JSON.stringify(resetObject));
        return {type: "reset", payload: resetObject};
    },
    changeXMax(number) {
        if (isInsideInterval(globalState.panner.xMin, pannerLimits.MAX, number)) {
            globalState.panner.xMax = number;
            localStorage.setItem("panner", JSON.stringify(globalState.panner));
            return {type: "x/changeMax", payload: Object.assign({}, globalState.panner)};
        }
    },
    changeXMin(number) {
        if (isInsideInterval(pannerLimits.MIN, globalState.panner.xMax, number)) {
            globalState.panner.xMin = number;
            localStorage.setItem("panner", JSON.stringify(globalState.panner));
            return {type: "x/changeMin", payload: Object.assign({}, globalState.panner)};
        }
    },
    changeYMax(number) {
        if (isInsideInterval(globalState.panner.yMin, pannerLimits.MAX, number)) {
            globalState.panner.yMax = number;
            localStorage.setItem("panner", JSON.stringify(globalState.panner));
            return {type: "y/changeMax", payload: Object.assign({}, globalState.panner)};
        }
    },
    changeYMin(number) {
        if (isInsideInterval(pannerLimits.MIN, globalState.panner.yMax, number)) {
            globalState.panner.yMin = number;
            localStorage.setItem("panner", JSON.stringify(globalState.panner));
            return {type: "y/changeMin", payload: Object.assign({}, globalState.panner)};
        }
    },
    changeZMax(number) {
        if (isInsideInterval(globalState.panner.zMin, pannerLimits.MAX, number)) {
            globalState.panner.zMax = number;
            localStorage.setItem("panner", JSON.stringify(globalState.panner));
            return {type: "z/changeMax", payload: Object.assign({}, globalState.panner)};
        }
    },
    changeZMin(number) {
        if (isInsideInterval(pannerLimits.MIN, globalState.panner.zMax, number)) {
            globalState.panner.zMin = number;
            localStorage.setItem("panner", JSON.stringify(globalState.panner));
            return {type: "z/changeMin", payload: Object.assign({}, globalState.panner)};
        }
    }
});

export {
    pannerActions,
    pannerReducer
};