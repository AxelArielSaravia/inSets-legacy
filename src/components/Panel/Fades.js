//@ts-check
import React, {useReducer} from "react";

import {emptyDispatch} from "../../state/dispatch.js";

import {fadesReducer, fadesActions} from "../../slices/fades.js";
import {createFadesState} from "../../state/factory.js";
import {fadeLimits} from "../../state/limits.js";

import {rToFade} from "../../core/maps.js";

import PanelConfigContainer from "./PanelConfigContainer.js";
import PanelConfigChild from "./PanelConfigChild.js";
import PanelRange from "./PanelRange.js";

let _fadesDispatch = emptyDispatch;

function reset() {
    _fadesDispatch(fadesActions.reset());
}

/**
@type {(val: string) => void} */
function fadeInOnChange(val) {
    _fadesDispatch(fadesActions.changeFadeIn(Number(val)));
}

/**
@type {(val: string) => void} */
function fadeOutOnChange(val) {
    _fadesDispatch(fadesActions.changeFadeOut(Number(val)));
}

/**
@type {(props: {MAX: number}) => JSX.Element} */
function Fades({MAX}) {
    const [{fadeIn, fadeOut}, fadesDispatch] = useReducer(fadesReducer, createFadesState());
    _fadesDispatch = fadesDispatch;
    return (
        <PanelConfigContainer
            DisableAllButtonEnabled={false}
            ResetButtonEnabled
            title="Fades"
            description="Change the fadeIn and fadeOut values for all audios."
            reset={reset}
        >
            <PanelConfigChild title="fadeIn">
                <PanelRange
                    max={MAX}
                    value={fadeIn}
                    valueText={String(rToFade(fadeIn))}
                    valueTextAdd="ms"
                    onChange={fadeInOnChange}
                />
            </PanelConfigChild>
            <PanelConfigChild title="fadeOut">
                <PanelRange
                    max={MAX}
                    value={fadeOut}
                    valueText={String(rToFade(fadeOut))}
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