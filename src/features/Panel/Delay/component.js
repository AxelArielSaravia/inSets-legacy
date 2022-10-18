import {
    memo,
    useReducer,
    useContext,
    useCallback,
    useMemo
} from "react";

import {DelayReducer, initDelayState} from "../../../reducer/index.js";

import {GeneralDisableContext} from "../../../context/index.js";

import {delayLimits} from "../../../services/limits/service.js";
import {rToFeedback, rToTime} from "../../../services/convert/service.js";

import ConfigPanelContainer from "../ConfigPanelContainer/component.js"
import ConfigPanelInterval from "../ConfigPanelInterval/component.js";

function Delay() {
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
    const {FBACK_MAX, TIME_MAX} = useMemo(() => delayLimits(), []);

    const viewTimeMax = useMemo(() => rToTime(timeMax).toFixed(1), [timeMax]);
    const viewTimeMin = useMemo(() => rToTime(timeMin).toFixed(1), [timeMin]);
    const viewFeedbackMax = useMemo(() => rToFeedback(feedbackMax).toFixed(2), [feedbackMax]);
    const viewFeedbackMin = useMemo(() => rToFeedback(feedbackMin).toFixed(2), [feedbackMin]);

    const changeDisable = useCallback(function() {
        if (allDelaysAreDisabled.value) {
            generalDisableDispatcher({type: "enable/delay", payload: true})
        } else {
            generalDisableDispatcher({type: "disable/delay"})
        }
    },[allDelaysAreDisabled, generalDisableDispatcher]);

    const reset = useCallback(function () {
        delayDispatch({type: "reset"});
    }, [delayDispatch]);

    const timeMaxOnChange = useCallback(function (val) {
        delayDispatch({type: "time/changeMax", payload: Number(val)});
    }, [delayDispatch]);
    const timeMinOnChange = useCallback(function (val) {
        delayDispatch({type: "time/changeMin", payload: Number(val)});
    }, [delayDispatch]);
    const feedbackMaxOnChange = useCallback(function (val) {
        delayDispatch({type: "feedback/changeMax", payload: Number(val)});
    }, [delayDispatch]);
    const feedbackMinOnChange = useCallback(function (val) {
        delayDispatch({type: "feedback/changeMin", payload: Number(val)});
    }, [delayDispatch]);

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
                viewMax={viewTimeMax}
                viewMin={viewTimeMin}
                onChangeMax={timeMaxOnChange}
                onChangeMin={timeMinOnChange}
            />
            <ConfigPanelInterval
                title="feedback interval:"
                valueText="%"
                rangeMax={FBACK_MAX}
                valueMax={feedbackMax}
                valueMin={feedbackMin}
                viewMax={viewFeedbackMax}
                viewMin={viewFeedbackMin}
                onChangeMax={feedbackMaxOnChange}
                onChangeMin={feedbackMinOnChange}
            />
        </ConfigPanelContainer>
    );
}

export default memo(Delay);