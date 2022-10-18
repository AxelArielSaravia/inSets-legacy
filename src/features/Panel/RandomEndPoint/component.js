import {memo, useContext, useCallback} from "react";

import {GeneralDisableContext} from "../../../context/index.js";

import ConfigPanelContainer from "../ConfigPanelContainer/component.js"


function RandomEndPoint() {
    const [
        {allRandomEndPointsAreDisabled},
        generalDisableDispatch
    ] = useContext(GeneralDisableContext);
    
    const changeDisable = useCallback(function () {
        if (allRandomEndPointsAreDisabled.value) {
            generalDisableDispatch({type: "enable/randomEndPoint", payload: true});
        } else {
            generalDisableDispatch({type: "disable/randomEndPoint"});
        }
    },[allRandomEndPointsAreDisabled, generalDisableDispatch]);


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

export default memo(RandomEndPoint);