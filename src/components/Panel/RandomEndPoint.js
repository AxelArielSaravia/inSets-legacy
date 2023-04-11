import {useContext} from "react";

import {GeneralDisableContext} from "../contexts/GeneralDisable.js";
import {undefinedFunction} from "../utils.js";
import {generalDisableAction} from "../../slices/generalDisable.js";

import PanelConfigContainer from "./PanelConfigContainer.js";

let _generalDisableDispatch = undefinedFunction;

function changeDisable(value) {
    if (value) {
        _generalDisableDispatch(generalDisableAction("enable", "randomEndPoint", "global"));
    } else {
        _generalDisableDispatch(generalDisableAction("disable", "randomEndPoint"));
    }
}

function RandomEndPoint() {
    const [
        {allRandomEndPointsAreDisabled},
        generalDisableDispatch
    ] = useContext(GeneralDisableContext);

    _generalDisableDispatch = generalDisableDispatch;

    return (
        <PanelConfigContainer
            title="Random End Point"
            description="Enable and disable the random end point effect."
            DisableAllButtonEnabled
            changeDisable={changeDisable}
            disableValue={allRandomEndPointsAreDisabled.value}
        />
    );
}

export default RandomEndPoint;