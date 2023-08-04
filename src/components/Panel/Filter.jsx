//@ts-check
import React, {useReducer,useContext} from "react";

import dispatch, {emptyDispatch} from "../../state/dispatch.js";
import {createLocalStorageFilter} from "../../state/factory.js";
import {filterLimits} from "../../state/limits.js";

import {filterReducer, filterActions} from "../../slices/filter.js";
import {generalDisableAction} from "../../slices/generalDisable.js";

import {rToFrequency, rToQ} from "../../core/maps.js";

import {GeneralDisableContext} from "../contexts/GeneralDisable.jsx";

import Button from "../Button.jsx";
import PanelConfigContainer from "./PanelConfigContainer.jsx";
import PanelConfigChild from "./PanelConfigChild.jsx";
import PanelInterval from "./PanelInterval.jsx";

const {FREQ_MAX, Q_MAX} = filterLimits;

let _filterDispatch = emptyDispatch;

/**
@type {(value: boolean) => void} */
function changeDisable(value) {
    if (value) {
        dispatch.generalDisable(generalDisableAction("enable", "filter", "global"));
    } else {
        dispatch.generalDisable(generalDisableAction("disable", "filter", "global"));
    }
}

function reset() {
    _filterDispatch(filterActions.reset());
}

/**
@type {(val: string) => void} */
function frequencyMaxOnChange(val) {
    _filterDispatch(
        filterActions.changeMaxFrequency(Number(val))
    );
}

/**
@type {(val: string) => void} */
function frequencyMinOnChange(val) {
    _filterDispatch(
        filterActions.changeMinFrequency(Number(val))
    );
}

/**
@type {(val: string) => void} */
function qMaxOnChange(val) {
    _filterDispatch(
        filterActions.changeMaxQ(Number(val))
    );
}

/**
@type {(val: string) => void} */
function qMinOnChange(val) {
    _filterDispatch(
        filterActions.changeMinQ(Number(val))
    );
}

/**
@type {(val: "bandpass" | "highpass" | "lowpass" | "notch") => void} */
function changeType(val) {
    _filterDispatch(filterActions.changeType(val));
}

/**
@type {(props: {
    isDisable: boolean,
    type: string,
    canBeDisable: boolean
}) => JSX.Element} */
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
    const {allFiltersAreDisabled} = useContext(GeneralDisableContext);
    const [{
        frequencyMax,
        frequencyMin,
        qMax,
        qMin,
        bandpass,
        highpass,
        lowpass,
        notch
    },filterDispatch] = useReducer(filterReducer, createLocalStorageFilter());
    _filterDispatch = filterDispatch;

    const canBeDisabled = !(bandpass && highpass && lowpass && notch);
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
                    <Type isDisable={notch} canBeDisable={canBeDisabled} type="notch"/>
                </div>
            </PanelConfigChild>
        </PanelConfigContainer>
    );
}


export default Filter;
