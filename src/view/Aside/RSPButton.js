import { memo } from "react";

import AsideButton from "./AsideButton.js";
import Switch from "../SwitchButton.js";


export default memo(function RSPButton(props) {
    const areAllDisable = props.randomStartPoint.value;

    const handleOnClick = () => {
        props.setDispatcher("randomStartPoint", "areAllDisable/global", !areAllDisable);
    }
    
    return (
        <AsideButton
            title="RSP"
            description="Enable and disable the random start point effect."
        >
            <div className="flex-row align-c justify-c p-3">
                <Switch
                    onClick={handleOnClick}
                    isDisable={areAllDisable}
                    title="disable all random start point effects"
                >
                    <span className="fs-text disable-all_btn">
                        {areAllDisable ? "enable all" : "disable all" }
                    </span>
                </Switch>
            </div>
        </AsideButton>
    );
});