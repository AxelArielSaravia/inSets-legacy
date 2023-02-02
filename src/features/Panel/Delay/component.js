import {
    useReducer,
    useContext
} from "react";

import {DelayReducer, initDelayState} from "../../../reducer/index.js";

import {GeneralDisableContext} from "../../../context/index.js";

import {delayLimits} from "../../../services/limits/service.js";
import {rToFeedback, rToTime} from "../../../services/convert/service.js";

import {undefinedFunction} from "../../utils.js";

import ConfigPanelContainer from "../ConfigPanelContainer/component.js";
import ConfigPanelInterval from "../ConfigPanelInterval/component.js";


let _delayDispatch = undefinedFunction;
let _generalDisableDispatcher = undefinedFunction;

const changeDisable = function(value) {
    if (value) {
        _generalDisableDispatcher({type: "enable/delay", payload: true});
    } else {
        _generalDisableDispatcher({type: "disable/delay"});
    }
};

function reset() {
    _delayDispatch({type: "reset"});
}
function timeMaxOnChange(val) {
    _delayDispatch({type: "time/changeMax", payload: Number(val)});
}
function timeMinOnChange(val) {
    _delayDispatch({type: "time/changeMin", payload: Number(val)});
}
function feedbackMaxOnChange(val) {
    _delayDispatch({type: "feedback/changeMax", payload: Number(val)});
}
function feedbackMinOnChange(val) {
    _delayDispatch({type: "feedback/changeMin", payload: Number(val)});
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
    }, delayDispatch] = useReducer(DelayReducer, initDelayState());

    _generalDisableDispatcher = generalDisableDispatcher;
    _delayDispatch = delayDispatch;

    return (
        <ConfigPanelContainer
            title="Delay"
            description="Change the delay configurations."
            addDisableAllButton
            addResetButton
            changeDisable={changeDisable}
            disableValue={allDelaysAreDisabled.value}
            reset={reset}
        >
            <ConfigPanelInterval
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
            <ConfigPanelInterval
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
        </ConfigPanelContainer>
    );
}

function ContainDelay() {
    const {FBACK_MAX, TIME_MAX} = delayLimits;

    return (
        <Delay FBACK_MAX={FBACK_MAX} TIME_MAX={TIME_MAX}/>
    );
}

export default ContainDelay;