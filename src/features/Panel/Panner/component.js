import {
    useReducer,
    useContext
} from "react";

import {initPannerState, PannerReducer} from "../../../reducer/index.js";

import {GeneralDisableContext} from "../../../context/index.js";

import {pannerLimits} from "../../../services/limits/service.js";
import {rToPanner} from "../../../services/convert/service.js";

import ConfigPanelContainer from "../ConfigPanelContainer/component.js";
import ConfigPanelInterval from "../ConfigPanelInterval/component.js";

import {undefinedFunction} from "../../utils.js";

let _pannerDispatch = undefinedFunction;
let _generalDisableDispatch = undefinedFunction;

function reset() {
    _pannerDispatch({type: "reset"});
}
function xMaxOnChange(val) {
    _pannerDispatch({type:"x/changeMax", payload: Number(val)});
}
function xMinOnChange(val) {
    _pannerDispatch({type:"x/changeMin", payload: Number(val)});
}
function yMaxOnChange(val) {
    _pannerDispatch({type:"y/changeMax", payload: Number(val)});
}
function yMinOnChange(val) {
    _pannerDispatch({type:"y/changeMin", payload: Number(val)});
}
function zMaxOnChange(val) {
    _pannerDispatch({type:"z/changeMax", payload: Number(val)});
}
function zMinOnChange(val) {
    _pannerDispatch({type:"z/changeMin", payload: Number(val)});
}

function changeDisable(value) {
    if (value) {
        _generalDisableDispatch({type: "enable/panner", payload: true});
    } else {
        _generalDisableDispatch({type: "disable/panner"});
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
    }, pannerDispatch] = useReducer(PannerReducer, initPannerState());

    _pannerDispatch = pannerDispatch;
    _generalDisableDispatch = generalDisableDispatch;

    return (
        <ConfigPanelContainer
            title="Panner"
            description="Change the intervals that represents a position of the audio in a right-hand Cartesian coordinate system."
            addDisableAllButton
            changeDisable={changeDisable}
            disableValue={allPannersAreDisabled.value}
            addResetButton
            reset={reset}
        >
            <ConfigPanelInterval
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
            <ConfigPanelInterval
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
            <ConfigPanelInterval
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
        </ConfigPanelContainer>
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