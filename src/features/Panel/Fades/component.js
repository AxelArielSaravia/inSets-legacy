import { memo, useReducer, useCallback } from "react";

import { initFadesState, FadesReducer } from "../../../reducer/index.js";

import ConfigPanelContainer from "../ConfigPanelContainer/component.js";
import ConfigPanelChild from "../ConfigPanelChild/component.js";
import ConfigPanelRange from "../ConfigPanelRange/component.js";

function Fades() {
    const [ {fadeIn, fadeOut}, timeDispatch ] = useReducer(FadesReducer, initFadesState());
 
    const reset = useCallback(() => {timeDispatch({type: "reset"})}, [timeDispatch]);
    
    const fadeInOnChange = useCallback((val) => {
        timeDispatch({type:"fadeIn/change", payload: +val + 15});
    }, [timeDispatch]);

    const fadeOutOnChange = useCallback((val) => {
        timeDispatch({type:"fadeOut/change", payload: +val + 15});
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
                    max={485}
                    value={fadeIn - 15}
                    valueText={fadeIn}
                    valueTextAdd="ms"
                    onChange={fadeInOnChange}
                />
            </ConfigPanelChild>
            <ConfigPanelChild title="fadeOut">
                <ConfigPanelRange
                    max={485}
                    value={fadeOut - 15}
                    valueText={fadeOut}
                    valueTextAdd="ms"
                    onChange={fadeOutOnChange}
                />
            </ConfigPanelChild>
        </ConfigPanelContainer>
    );
}

export default memo(Fades);