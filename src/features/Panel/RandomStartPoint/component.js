import {useContext, useCallback} from "react";

import {GeneralDisableContext} from "../../../context/index.js";

import ConfigPanelContainer from "../ConfigPanelContainer/component.js";

function RandomStartPoint() {
    const [
        {allRandomStartPointsAreDisabled},
        generalDisableDispatch
    ] = useContext(GeneralDisableContext);
    const changeDisable = useCallback(function () {
        if (allRandomStartPointsAreDisabled.value) {
            generalDisableDispatch({type: "enable/randomStartPoint", payload: true});
        } else {
            generalDisableDispatch({type: "disable/randomStartPoint"});
        }
    },[allRandomStartPointsAreDisabled, generalDisableDispatch]);

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