import {useReducer} from "react";

import {initFadesState, FadesReducer} from "../../../reducer/index.js";

import {fadeLimits} from "../../../services/limits/service.js";
import {rToFade} from "../../../services/convert/service.js";

import {undefinedFunction} from "../../utils.js";

import ConfigPanelContainer from "../ConfigPanelContainer/component.js";
import ConfigPanelChild from "../ConfigPanelChild/component.js";
import ConfigPanelRange from "../ConfigPanelRange/component.js";

let _timeDispatch = undefinedFunction;
function reset() {
    _timeDispatch({type: "reset"});
}
function fadeInOnChange(val) {
    _timeDispatch({type:"fadeIn/change", payload: Number(val)});
}
function fadeOutOnChange(val) {
    _timeDispatch({type:"fadeOut/change", payload: Number(val)});
}


function Fades({MAX}) {
    const [{fadeIn, fadeOut}, timeDispatch] = useReducer(FadesReducer, initFadesState());
    _timeDispatch = timeDispatch;

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
                    valueText={rToFade(fadeIn)}
                    valueTextAdd="ms"
                    onChange={fadeInOnChange}
                />
            </ConfigPanelChild>
            <ConfigPanelChild title="fadeOut">
                <ConfigPanelRange
                    max={MAX}
                    value={fadeOut}
                    valueText={rToFade(fadeOut)}
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