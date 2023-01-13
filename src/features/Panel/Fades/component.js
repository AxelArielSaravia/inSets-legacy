import {useReducer, useCallback, useMemo} from "react";

import {initFadesState, FadesReducer} from "../../../reducer/index.js";

import {fadeLimits} from "../../../services/limits/service.js";
import {rToFade} from "../../../services/convert/service.js";

import ConfigPanelContainer from "../ConfigPanelContainer/component.js";
import ConfigPanelChild from "../ConfigPanelChild/component.js";
import ConfigPanelRange from "../ConfigPanelRange/component.js";

function Fades({MAX}) {
    const [{fadeIn, fadeOut}, timeDispatch] = useReducer(FadesReducer, initFadesState());
    const viewFadeIn = useMemo(() => rToFade(fadeIn),[fadeIn]);
    const viewFadeOut = useMemo(() => rToFade(fadeOut),[fadeOut]);

    const reset = useCallback(function () {
        timeDispatch({type: "reset"});
    }, [timeDispatch]);

    const fadeInOnChange = useCallback(function (val) {
        timeDispatch({type:"fadeIn/change", payload: Number(val)});
    }, [timeDispatch]);

    const fadeOutOnChange = useCallback(function (val) {
        timeDispatch({type:"fadeOut/change", payload: Number(val)});
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
                    max={MAX}
                    value={fadeIn}
                    valueText={viewFadeIn}
                    valueTextAdd="ms"
                    onChange={fadeInOnChange}
                />
            </ConfigPanelChild>
            <ConfigPanelChild title="fadeOut">
                <ConfigPanelRange
                    max={MAX}
                    value={fadeOut}
                    valueText={viewFadeOut}
                    valueTextAdd="ms"
                    onChange={fadeOutOnChange}
                />
            </ConfigPanelChild>
        </ConfigPanelContainer>
    );
}

function ContainFades() {
    const {MAX} = fadeLimits;

    return (
        <Fades MAX={MAX}/>
    );
}

export default ContainFades;