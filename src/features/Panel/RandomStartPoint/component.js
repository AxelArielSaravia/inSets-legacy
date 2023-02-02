import {useContext} from "react";

import {GeneralDisableContext} from "../../../context/index.js";

import {undefinedFunction} from "../../utils.js";

import ConfigPanelContainer from "../ConfigPanelContainer/component.js";

let _generalDisableDispatch = undefinedFunction;

function changeDisable(value) {
    if (value) {
        _generalDisableDispatch({type: "enable/randomStartPoint", payload: true});
    } else {
        _generalDisableDispatch({type: "disable/randomStartPoint"});
    }
}

function RandomStartPoint() {
    const [
        {allRandomStartPointsAreDisabled},
        generalDisableDispatch
    ] = useContext(GeneralDisableContext);

    _generalDisableDispatch = generalDisableDispatch;

    return (
        <ConfigPanelContainer
            title="Random Start Point"
            description="Enable and disable the random start point effect."
            addDisableAllButton
            changeDisable={changeDisable}
            disableValue={allRandomStartPointsAreDisabled.value}
        />
    );
}

export default RandomStartPoint;