//@ts-check
import React, {useReducer, useContext} from "react";

import dispatch, {emptyDispatch} from "../../state/dispatch.js";
import {pannerLimits} from "../../state/limits.js";
import {createGlobalPanner} from "../../state/factory.js";

import {pannerReducer, pannerActions} from "../../slices/panner.js";
import {generalDisableAction} from "../../slices/generalDisable.js";

import {rToPanner} from "../../core/maps.js";

import {GeneralDisableContext} from "../contexts/GeneralDisable.js";

import PanelConfigContainer from "./PanelConfigContainer.js";
import PanelInterval from "./PanelInterval.js";

let _pannerDispatch = emptyDispatch;

function reset() {
    _pannerDispatch(pannerActions.reset());
}

/**
@type {(val: string) => void} */
function xMaxOnChange(val) {
    _pannerDispatch(pannerActions.changeXMax(Number(val)));
}

/**
@type {(val: string) => void} */
function xMinOnChange(val) {
    _pannerDispatch(pannerActions.changeXMin(Number(val)));
}

/**
@type {(val: string) => void} */
function yMaxOnChange(val) {
    _pannerDispatch(pannerActions.changeYMax(Number(val)));
}

/**
@type {(val: string) => void} */
function yMinOnChange(val) {
    _pannerDispatch(pannerActions.changeYMin(Number(val)));
}

/**
@type {(val: string) => void} */
function zMaxOnChange(val) {
    _pannerDispatch(pannerActions.changeZMax(Number(val)));
}

/**
@type {(val: string) => void} */
function zMinOnChange(val) {
    _pannerDispatch(pannerActions.changeZMin(Number(val)));
}

/**
@type {(value: boolean) => void} */
function changeDisable(value) {
    if (value) {
        dispatch.generalDisable(generalDisableAction("enable", "panner", "global"));
    } else {
        dispatch.generalDisable(generalDisableAction("disable", "panner", "global"));
    }
}

/**
@type {(prop: {Z_MAX: number, MAX: number}) => JSX.Element} */
function Panner({Z_MAX, MAX}) {
    const {allPannersAreDisabled}= useContext(GeneralDisableContext);
    const [{xMax, xMin, yMax, yMin, zMax, zMin}, pannerDispatch] = useReducer(pannerReducer, createGlobalPanner());
    _pannerDispatch = pannerDispatch;
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