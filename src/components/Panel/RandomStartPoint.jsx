//@ts-check
import React, {useContext} from "react";

import dispatch from "../../state/dispatch.js";

import {generalDisableAction} from "../../slices/generalDisable.js";

import {GeneralDisableContext} from "../contexts/GeneralDisable.jsx";

import PanelConfigContainer from "./PanelConfigContainer.jsx";

/**
@type {(value: boolean) => void} */
function changeDisable(value) {
    if (value) {
        dispatch.generalDisable(generalDisableAction("enable", "randomStartPoint", "global"));
    } else {
        dispatch.generalDisable(generalDisableAction("disable", "randomStartPoint", "global"));
    }
}

function RandomStartPoint() {
    const {allRandomStartPointsAreDisabled}= useContext(GeneralDisableContext);
    return (
        <PanelConfigContainer
            title="Random Start Point"
            description="Enable and disable the random cut effect for the start point."
            DisableAllButtonEnabled
            changeDisable={changeDisable}
            disableValue={allRandomStartPointsAreDisabled.value}
        />
    );
}

export default RandomStartPoint;
