import { memo, useReducer, useCallback } from "react";

import { initFadesState, FadesReducer } from "../../../reducer/index.js";

import ConfigPanelContainer from "../ConfigPanelContainer/component.js";
import ConfigPanelChild from "../ConfigPanelChild/component.js";
import ConfigPanelRange from "../ConfigPanelRange/component.js";

function Fades() {
    const [{fadeIn, fadeOut}, timeDispatch] = useReducer(FadesReducer, initFadesState());
 
    const reset = useCallback(function () {
        timeDispatch({type: "reset"});
    }, [timeDispatch]);
    
    const fadeInOnChange = useCallback(function (val) {
        timeDispatch({type:"fadeIn/change", payload: ((+val) * 10) + 10});
    }, [timeDispatch]);

    const fadeOutOnChange = useCallback(function (val) {
        timeDispatch({type:"fadeOut/change", payload: ((+val) * 10) + 10});
    }, [timeDispatch]);

    return (
        <ConfigPanelContainer
            title="Fades"
            description="Set the fadeIn and fadeOut values for all audios."
            addResetButton
            reset={reset}
        >
            <ConfigPanelChild title="fadeIn">
                <ConfigPanelRange
                    max={29}
                    value={(fadeIn-10)/10}
                    valueText={fadeIn}
                    valueTextAdd="ms"
                    onChange={fadeInOnChange}
                />
            </ConfigPanelChild>
            <ConfigPanelChild title="fadeOut">
                <ConfigPanelRange
                    max={29}
                    value={(fadeOut-10)/10}
                    valueText={fadeOut}
                    valueTextAdd="ms"
                    onChange={fadeOutOnChange}
                />
            </ConfigPanelChild>
        </ConfigPanelContainer>
    );
}

export default memo(Fades);