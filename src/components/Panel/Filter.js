import {
    useReducer,
    useContext,
} from "react";

import {filterReducer, filterActions} from "../../slices/filter.js";
import {generalDisableAction} from "../../slices/generalDisable.js";

import {filterLimits} from "../../state/limits.js";
import {createFilterInitialState} from "../initialState.js";

import {GeneralDisableContext} from "../contexts/GeneralDisable.js";

import {rToFrequency, rToQ} from "../../core/maps.js";

import {undefinedFunction} from "../utils.js";

import Button from "../Button.js";
import PanelConfigContainer from "./PanelConfigContainer.js";
import PanelConfigChild from "./PanelConfigChild.js";
import PanelInterval from "./PanelInterval.js";

const {FREQ_MAX, Q_MAX} = filterLimits;

let _generalDisableDispatch = undefinedFunction;
let _filterDispatch = undefinedFunction;

function changeDisable(value) {
    if (value) {
        _generalDisableDispatch(generalDisableAction("enable", "filter", "global"));
    } else {
        _generalDisableDispatch(generalDisableAction("disable", "filter"));
    }
}

function reset() {
    _filterDispatch(filterActions.reset());
}
function frequencyMaxOnChange(val) {
    _filterDispatch(
        filterActions.changeMaxFrequency(Number(val))
    );
}
function frequencyMinOnChange(val) {
    _filterDispatch(
        filterActions.changeMinFrequency(Number(val))
    );
}
function qMaxOnChange(val) {
    _filterDispatch(
        filterActions.changeMaxQ(Number(val))
    );
}
function qMinOnChange(val) {
    _filterDispatch(
        filterActions.changeMinQ(Number(val))
    );
}
function changeType(val) {
    _filterDispatch(filterActions.changeType(val));
}


function Type({isDisable, type, canBeDisable}) {
    return (
        <div className="p-2">
            <Button
                className={canBeDisable && isDisable ? "inactive" : ""}
                value={type}
                onClick={changeType}
            >
                <p className="fs-text">{type}</p>
            </Button>

        </div>
    );
}

function Filter() {
    const [{
        allFiltersAreDisabled
    }, generalDisableDispatch] = useContext(GeneralDisableContext);
    const [{
        frequencyMax,
        frequencyMin,
        qMax,
        qMin,
        bandpass,
        highpass,
        lowpass,
        notch
    },filterDispatch] = useReducer(filterReducer, createFilterInitialState());
    const canBeDisabled = !(bandpass && highpass && lowpass && notch);
    _filterDispatch = filterDispatch;
    _generalDisableDispatch = generalDisableDispatch;

    return (
        <PanelConfigContainer
            title="Filter"
            description="Change the general parameters of different filters."
            DisableAllButtonEnabled
            ResetButtonEnabled
            changeDisable={changeDisable}
            disableValue={allFiltersAreDisabled.value}
            reset={reset}
        >
            <PanelInterval
                title="frequency interval:"
                valueText="hz"
                rangeMax={FREQ_MAX}
                valueMax={frequencyMax}
                valueMin={frequencyMin}
                viewMax={rToFrequency(frequencyMax)}
                viewMin={rToFrequency(frequencyMin)}
                onChangeMin={frequencyMinOnChange}
                onChangeMax={frequencyMaxOnChange}
            />
            <PanelInterval
                title="q factor interval:"
                rangeMax={Q_MAX}
                valueMax={qMax}
                valueMin={qMin}
                viewMax={rToQ(qMax).toFixed(2)}
                viewMin={rToQ(qMin).toFixed(2)}
                onChangeMin={qMinOnChange}
                onChangeMax={qMaxOnChange}
            />
            <PanelConfigChild title="filter types selected:">
                <div className="flex-row flex-wrap justify- align-c">
                    <Type isDisable={highpass} canBeDisable={canBeDisabled} type="highpass"/>
                    <Type isDisable={lowpass} canBeDisable={canBeDisabled} type="lowpass"/>
                    <Type isDisable={bandpass} canBeDisable={canBeDisabled} type="bandpass"/>
                    <Type isDisable={notch} canBeDisable={canBeDisabled}type="notch"/>
                </div>
            </PanelConfigChild>
        </PanelConfigContainer>
    );
}


export default Filter;