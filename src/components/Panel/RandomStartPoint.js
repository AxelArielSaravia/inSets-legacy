import {useContext} from "react";

import {GeneralDisableContext} from "../contexts/GeneralDisable.js";
import {undefinedFunction} from "../utils.js";

import {generalDisableAction} from "../../slices/generalDisable.js";

import PanelConfigContainer from "./PanelConfigContainer.js";

let _generalDisableDispatch = undefinedFunction;

function changeDisable(value) {
    if (value) {
        _generalDisableDispatch(generalDisableAction("enable", "randomStartPoint", "global"));
    } else {
        _generalDisableDispatch(generalDisableAction("disable", "randomStartPoint"));
    }
}

function RandomStartPoint() {
    const [
        {allRandomStartPointsAreDisabled},
        generalDisableDispatch
    ] = useContext(GeneralDisableContext);

    _generalDisableDispatch = generalDisableDispatch;

    return (
        <PanelConfigContainer
            title="Random Start Point"
            description="Enable and disable the random start point effect."
            DisableAllButtonEnabled
            changeDisable={changeDisable}
            disableValue={allRandomStartPointsAreDisabled.value}
        />
    );
}

export default RandomStartPoint;