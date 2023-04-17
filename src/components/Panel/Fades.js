import {useReducer} from "react";

import {fadesReducer, fadesActions} from "../../slices/fades.js";
import {createFadesInitialState} from "../initialState.js";
import {fadeLimits} from "../../state/limits.js";

import {rToFade} from "../../core/maps.js";

import {undefinedFunction} from "../utils.js";

import PanelConfigContainer from "./PanelConfigContainer.js";
import PanelConfigChild from "./PanelConfigChild.js";
import PanelRange from "./PanelRange.js";

let _fadesDispatch = undefinedFunction;

function reset() {
    _fadesDispatch(fadesActions.reset());
}
function fadeInOnChange(val) {
    _fadesDispatch(fadesActions.changeFadeIn(Number(val)));
}
function fadeOutOnChange(val) {
    _fadesDispatch(fadesActions.changeFadeOut(Number(val)));
}


function Fades({MAX}) {
    const [
        {fadeIn, fadeOut},
        fadesDispatch
    ] = useReducer(fadesReducer, createFadesInitialState());

    _fadesDispatch = fadesDispatch;

    return (
        <PanelConfigContainer
            title="Fades"
            description="Change the fadeIn and fadeOut values for all audios."
            ResetButtonEnabled
            reset={reset}
        >
            <PanelConfigChild title="fadeIn">
                <PanelRange
                    max={MAX}
                    value={fadeIn}
                    valueText={rToFade(fadeIn)}
                    valueTextAdd="ms"
                    onChange={fadeInOnChange}
                />
            </PanelConfigChild>
            <PanelConfigChild title="fadeOut">
                <PanelRange
                    max={MAX}
                    value={fadeOut}
                    valueText={rToFade(fadeOut)}
                    valueTextAdd="ms"
                    onChange={fadeOutOnChange}
                />
            </PanelConfigChild>
        </PanelConfigContainer>
    );
}

function ContainFades() {
    const {MAX} = fadeLimits;

    return (
        <Fades MAX={MAX}/>
    );
}

export default ContainFades;