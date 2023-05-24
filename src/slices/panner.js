// @ts-check
import globalState from "../state/globalState.js";
import {pannerLimits} from "../state/limits.js";

import {createGlobalPanner, createDefaultGlobalPanner} from "../state/factory.js";

/**
@type {{type: any, payload: any}} */
const ReturnPannerAction = {
    type: "",
    payload: undefined
};

/**
@type {Readonly<{
    reset: () => PannerAction,
    changeXMax: (n: number) => Maybe<PannerAction>,
    changeXMin: (n: number) => Maybe<PannerAction>,
    changeYMax: (n: number) => Maybe<PannerAction>,
    changeYMin: (n: number) => Maybe<PannerAction>,
    changeZMax: (n: number) => Maybe<PannerAction>,
    changeZMin: (n: number) => Maybe<PannerAction>
}>} */
const pannerActions = {
    /**
    @type {() => PannerAction} */
    reset() {
        const resetObject = createDefaultGlobalPanner();
        resetObject.areAllDisable =  globalState.panner.areAllDisable;
        globalState.panner = resetObject;
        localStorage.setItem("panner.areAllDisable", String(resetObject.areAllDisable));
        localStorage.setItem("panner.xMax", String(resetObject.xMax));
        localStorage.setItem("panner.xMin", String(resetObject.xMin));
        localStorage.setItem("panner.yMax", String(resetObject.yMax));
        localStorage.setItem("panner.yMin", String(resetObject.yMin));
        localStorage.setItem("panner.zMax", String(resetObject.zMax));
        localStorage.setItem("panner.zMin", String(resetObject.zMin));
        ReturnPannerAction.type = "reset";
        ReturnPannerAction.payload = resetObject;
        return ReturnPannerAction;
    },
    /**
    @type {(n: number) => Maybe<PannerAction>} */
    changeXMax(n) {
        if (globalState.panner.xMin <= n && n <= pannerLimits.MAX) {
            globalState.panner.xMax = n;
            localStorage.setItem("panner.xMax", String(n));
            ReturnPannerAction.type = "x/changeMax";
            ReturnPannerAction.payload = createGlobalPanner();
            return ReturnPannerAction;
        }
    },
    /**
    @type {(n: number) => Maybe<PannerAction>} */
    changeXMin(n) {
        if (pannerLimits.MIN <= n && n <= globalState.panner.xMax) {
            globalState.panner.xMin = n;
            localStorage.setItem("panner.xMin", String(n));
            ReturnPannerAction.type = "x/changeMin";
            ReturnPannerAction.payload = createGlobalPanner();
            return ReturnPannerAction;
        }
    },
    /**
    @type {(n: number) => Maybe<PannerAction>} */
    changeYMax(n) {
        if (globalState.panner.yMin <= n && n <= pannerLimits.MAX) {
            globalState.panner.yMax = n;
            localStorage.setItem("panner.yMax", String(n));
            ReturnPannerAction.type = "y/changeMax";
            ReturnPannerAction.payload = createGlobalPanner();
            return ReturnPannerAction;
        }
    },
    /**
    @type {(n: number) => Maybe<PannerAction>} */
    changeYMin(n) {
        if (pannerLimits.MIN <= n && n <= globalState.panner.yMax) {
            globalState.panner.yMin = n;
            localStorage.setItem("panner.yMin", String(n));
            ReturnPannerAction.type = "y/changeMin";
            ReturnPannerAction.payload = createGlobalPanner();
            return ReturnPannerAction;
        }
    },
    /**
    @type {(n: number) => Maybe<PannerAction>} */
    changeZMax(n) {
        if (globalState.panner.zMin <= n && n <= pannerLimits.Z_MAX) {
            globalState.panner.zMax = n;
            localStorage.setItem("panner.zMax", String(n));
            ReturnPannerAction.type = "z/changeMax";
            ReturnPannerAction.payload = createGlobalPanner();
            return ReturnPannerAction;
        }
    },
    /**
    @type {(n: number) => Maybe<PannerAction>} */
    changeZMin(n) {
        if (pannerLimits.MIN <= n && n <= globalState.panner.zMax) {
            globalState.panner.zMin = n;
            localStorage.setItem("panner.zMin", String(n));
            ReturnPannerAction.type = "z/changeMin";
            ReturnPannerAction.payload = createGlobalPanner();
            return ReturnPannerAction;
        }
    }
};

/**
@type {(state: GlobalPanner, action: Maybe<PannerAction>) => GlobalPanner} */
function pannerReducer(state, action) {
    if (action !== undefined) {
        return action.payload;
    }
    return state;
}

export {
    pannerActions,
    pannerReducer
};