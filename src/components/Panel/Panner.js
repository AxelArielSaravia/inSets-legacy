import {
    useReducer,
    useContext
} from "react";

import {GeneralDisableContext} from "../contexts/GeneralDisable.js";

import {pannerReducer, pannerActions} from "../../slices/panner.js";
import {generalDisableAction} from "../../slices/generalDisable.js";
import {createPannerInitialState} from "../initialState.js";
import {pannerLimits} from "../../state/limits.js";

import {rToPanner} from "../../core/maps.js";

import {undefinedFunction} from "../utils.js";

import PanelConfigContainer from "./PanelConfigContainer.js";
import PanelInterval from "./PanelInterval.js";

let _pannerDispatch = undefinedFunction;
let _generalDisableDispatch = undefinedFunction;

function reset() {
    _pannerDispatch(pannerActions.reset());
}

function xMaxOnChange(val) {
    _pannerDispatch(pannerActions.changeXMax(Number(val)));
}

function xMinOnChange(val) {
    _pannerDispatch(pannerActions.changeXMin(Number(val)));
}

function yMaxOnChange(val) {
    _pannerDispatch(pannerActions.changeYMax(Number(val)));
}

function yMinOnChange(val) {
    _pannerDispatch(pannerActions.changeYMin(Number(val)));
}

function zMaxOnChange(val) {
    _pannerDispatch(pannerActions.changeZMax(Number(val)));
}

function zMinOnChange(val) {
    _pannerDispatch(pannerActions.changeZMin(Number(val)));
}

function changeDisable(value) {
    if (value) {
        _generalDisableDispatch(generalDisableAction("enable", "panner", "global"));
    } else {
        _generalDisableDispatch(generalDisableAction("disable", "panner"));
    }
}

function Panner({Z_MAX, MAX}) {
    const [{allPannersAreDisabled}, generalDisableDispatch] = useContext(GeneralDisableContext);
    const [{
        xMax,
        xMin,
        yMax,
        yMin,
        zMax,
        zMin
    }, pannerDispatch] = useReducer(pannerReducer, createPannerInitialState());

    _pannerDispatch = pannerDispatch;
    _generalDisableDispatch = generalDisableDispatch;

    return (
        <PanelConfigContainer
            title="Panner"
            description="Change the intervals that represents a position of the audio in a right-hand Cartesian coordinate system."
            DisableAllButtonEnabled
            ResetButtonEnabled
            changeDisable={changeDisable}
            disableValue={allPannersAreDisabled.value}
            reset={reset}
        >
            <PanelInterval
                title="X interval:"
                valueText="%"
                valueMax={xMax}
                valueMin={xMin}
                viewMax={rToPanner(xMax)}
                viewMin={rToPanner(xMin)}
                rangeMax={MAX}
                onChangeMin={xMinOnChange}
                onChangeMax={xMaxOnChange}
            />
            <PanelInterval
                title="Y interval:"
                valueText="%"
                valueMax={yMax}
                valueMin={yMin}
                viewMax={rToPanner(yMax)}
                viewMin={rToPanner(yMin)}
                rangeMax={MAX}
                onChangeMin={yMinOnChange}
                onChangeMax={yMaxOnChange}
            />
            <PanelInterval
                title="Z interval:"
                valueText="%"
                valueMax={zMax}
                valueMin={zMin}
                viewMax={zMax}
                viewMin={zMin}
                rangeMax={Z_MAX}
                onChangeMin={zMinOnChange}
                onChangeMax={zMaxOnChange}
            />
        </PanelConfigContainer>
    );
}

function ContainPanner() {
    const {Z_MAX, MAX} = pannerLimits;

    return (
        <Panner
            Z_MAX={Z_MAX}
            MAX={MAX}
        />
    );
}

export default ContainPanner;