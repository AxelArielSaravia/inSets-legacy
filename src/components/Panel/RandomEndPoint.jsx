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
        dispatch.generalDisable(generalDisableAction("enable", "randomEndPoint", "global"));
    } else {
        dispatch.generalDisable(generalDisableAction("disable", "randomEndPoint", "global"));
    }
}

function RandomEndPoint() {
    const {allRandomEndPointsAreDisabled} = useContext(GeneralDisableContext);
    return (
        <PanelConfigContainer
            title="Random End Point"
            description="Enable and disable the random cut effect for the end point."
            DisableAllButtonEnabled
            changeDisable={changeDisable}
            disableValue={allRandomEndPointsAreDisabled.value}
        />
    );
}

export default RandomEndPoint;
