import {useContext} from "react";

import {GeneralDisableContext} from "../../../context/index.js";
import {undefinedFunction} from "../../utils.js";

import ConfigPanelContainer from "../ConfigPanelContainer/component.js";

let _generalDisableDispatch = undefinedFunction;
function changeDisable(value) {
    if (value) {
        _generalDisableDispatch({type: "enable/randomEndPoint", payload: true});
    } else {
        _generalDisableDispatch({type: "disable/randomEndPoint"});
    }
}

function RandomEndPoint() {
    const [
        {allRandomEndPointsAreDisabled},
        generalDisableDispatch
    ] = useContext(GeneralDisableContext);
    _generalDisableDispatch = generalDisableDispatch;

    return (
        <ConfigPanelContainer
            title="Random End Point"
            description="Enable and disable the random end point effect."
            addDisableAllButton
            changeDisable={changeDisable}
            disableValue={allRandomEndPointsAreDisabled.value}
        />
    );
}

export default RandomEndPoint;