import {
    useReducer,
    useContext
} from "react";

import {delayReducer, delayActions} from "../../slices/delay.js";
import {generalDisableAction} from "../../slices/generalDisable.js";

import {GeneralDisableContext} from "../contexts/GeneralDisable.js";
import {createDelayInitialState} from "../initialState.js";
import {delayLimits} from "../../state/limits.js";

import {rToFeedback, rToTime} from "../../core/maps.js";

import {undefinedFunction} from "../utils.js";

import PanelConfigContainer from "./PanelConfigContainer.js";
import PanelInterval from "./PanelInterval.js";


let _delayDispatch = undefinedFunction;
let _generalDisableDispatcher = undefinedFunction;

function changeDisable(value) {
    if (value) {
        _generalDisableDispatcher(generalDisableAction("enable", "delay", "global"));
    } else {
        _generalDisableDispatcher(generalDisableAction("disable", "delay"));
    }
}

function reset() {
    _delayDispatch(delayActions.reset());
}
function timeMaxOnChange(val) {
    _delayDispatch(delayActions.changeTimeMax(Number(val)));
}
function timeMinOnChange(val) {
    _delayDispatch(delayActions.changeTimeMin(Number(val)));
}
function feedbackMaxOnChange(val) {
    _delayDispatch(delayActions.changeFeedbackMax(Number(val)));
}
function feedbackMinOnChange(val) {
    _delayDispatch(delayActions.changeFeedbackMin(Number(val)));
}


function Delay({
    FBACK_MAX,
    TIME_MAX
}) {
    const [
        {allDelaysAreDisabled},
        generalDisableDispatcher
    ] = useContext(GeneralDisableContext);
    const [{
        timeMin,
        timeMax,
        feedbackMin,
        feedbackMax
    }, delayDispatch] = useReducer(delayReducer, createDelayInitialState());

    _generalDisableDispatcher = generalDisableDispatcher;
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