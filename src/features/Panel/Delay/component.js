import { memo, useReducer, useContext, useCallback } from "react";

import { DelayReducer, initDelayState } from "../../../reducer/index.js";

import { GeneralDisableContext } from "../../../context/index.js";

import ConfigPanelContainer from "../ConfigPanelContainer/component.js"
import ConfigPanelInterval from "../ConfigPanelInterval/component.js";


function Delay() {
    const [{allDelaysAreDisabled}, generalDisableDispatcher] = useContext(GeneralDisableContext);
    const [{timeMin, timeMax, feedbackMin, feedbackMax}, delayDispatch] = useReducer(DelayReducer, initDelayState());
    
    const changeDisable = useCallback(() => {
        if (allDelaysAreDisabled.value) {
            generalDisableDispatcher({type: "enable/delay", payload: true})
        } else {
            generalDisableDispatcher({type: "disable/delay"})
        }
    },[allDelaysAreDisabled, generalDisableDispatcher]);

    const reset = useCallback(() => {delayDispatch({type: "reset"})}, [delayDispatch]) 

    const timeMaxOnChange = useCallback((val) => {
        delayDispatch({type: "time/changeMax", payload: (+val + 1) / 10});
    }, [delayDispatch]);
    const timeMinOnChange = useCallback((val) => {
        delayDispatch({type: "time/changeMin", payload: (+val + 1) / 10});
    }, [delayDispatch]);
    const feedbackMaxOnChange = useCallback((val) => {
        delayDispatch({type: "feedback/changeMax", payload: (+val + 5) / 100});
    }, [delayDispatch]);
    const feedbackMinOnChange = useCallback((val) => {
        delayDispatch({type: "feedback/changeMin", payload: (+val + 5) / 100});
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
                rangeMax={49}
                valueMin={(timeMin * 10) - 1}
                valueMax={(timeMax * 10) - 1}
                viewMin={timeMin.toFixed(1)}
                viewMax={timeMax.toFixed(1)}
                onChangeMin={timeMinOnChange}
                onChangeMax={timeMaxOnChange}
            />
            <ConfigPanelInterval
                title="feedback interval:"
                valueText="%"
                rangeMax={85}
                valueMin={(feedbackMin * 100) - 5}
                valueMax={(feedbackMax * 100) - 5}
                viewMin={Number.parseInt(feedbackMin * 100)}
                viewMax={Number.parseInt(feedbackMax * 100)}
                onChangeMin={feedbackMinOnChange}
                onChangeMax={feedbackMaxOnChange}
            />
        </ConfigPanelContainer>
    );
}

export default memo(Delay);