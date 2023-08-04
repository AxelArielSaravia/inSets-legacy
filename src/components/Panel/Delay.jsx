//@ts-check
import React, {useReducer, useContext} from "react";

import dispatch, {emptyDispatch} from "../../state/dispatch.js";
import {createGlobalDelay} from "../../state/factory.js";
import {delayLimits} from "../../state/limits.js";

import {delayReducer, delayActions} from "../../slices/delay.js";
import {generalDisableAction} from "../../slices/generalDisable.js";

import {rToFeedback, rToTime} from "../../core/maps.js";

import {GeneralDisableContext} from "../contexts/GeneralDisable.jsx";

import PanelConfigContainer from "./PanelConfigContainer.jsx";
import PanelInterval from "./PanelInterval.jsx";

let _delayDispatch = emptyDispatch;

/**
@type {(value: boolean) => void} */
function changeDisable(value) {
    if (value) {
        dispatch.generalDisable(generalDisableAction("enable", "delay", "global"));
    } else {
        dispatch.generalDisable(generalDisableAction("disable", "delay", "global"));
    }
}

function reset() {
    _delayDispatch(delayActions.reset());
}

/**
@type {(val: string) => void} */
function timeMaxOnChange(val) {
    _delayDispatch(delayActions.changeTimeMax(Number(val)));
}

/**
@type {(val: string) => void} */
function timeMinOnChange(val) {
    _delayDispatch(delayActions.changeTimeMin(Number(val)));
}

/**
@type {(val: string) => void} */
function feedbackMaxOnChange(val) {
    _delayDispatch(delayActions.changeFeedbackMax(Number(val)));
}

/**
@type {(val: string) => void} */
function feedbackMinOnChange(val) {
    _delayDispatch(delayActions.changeFeedbackMin(Number(val)));
}

/**
@type {(prop: {FBACK_MAX: number, TIME_MAX: number}) => JSX.Element} */
function Delay({FBACK_MAX, TIME_MAX}) {
    const {allDelaysAreDisabled} = useContext(GeneralDisableContext);
    const [{
        timeMin,
        timeMax,
        feedbackMin,
        feedbackMax
    }, delayDispatch] = useReducer(delayReducer, createGlobalDelay());
    _delayDispatch = delayDispatch;
    return (
        <PanelConfigContainer
            title="Delay"
            description="Change the delay configurations."
            DisableAllButtonEnabled
            ResetButtonEnabled
            changeDisable={changeDisable}
            disableValue={allDelaysAreDisabled.value}
            reset={reset}
        >
            <PanelInterval
                title="time interval:"
                valueText="sec"
                rangeMax={TIME_MAX}
                valueMax={timeMax}
                valueMin={timeMin}
                viewMax={rToTime(timeMax).toFixed(1)}
                viewMin={rToTime(timeMin).toFixed(1)}
                onChangeMax={timeMaxOnChange}
                onChangeMin={timeMinOnChange}
            />
            <PanelInterval
                title="feedback interval:"
                valueText="%"
                rangeMax={FBACK_MAX}
                valueMax={feedbackMax}
                valueMin={feedbackMin}
                viewMax={rToFeedback(feedbackMax).toFixed(2)}
                viewMin={rToFeedback(feedbackMin).toFixed(2)}
                onChangeMax={feedbackMaxOnChange}
                onChangeMin={feedbackMinOnChange}
            />
        </PanelConfigContainer>
    );
}

function ContainDelay() {
    const {FBACK_MAX, TIME_MAX} = delayLimits;
    return (
        <Delay FBACK_MAX={FBACK_MAX} TIME_MAX={TIME_MAX}/>
    );
}

export default ContainDelay;
