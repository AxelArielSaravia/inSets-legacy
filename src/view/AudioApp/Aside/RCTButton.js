import { useEffect, memo} from "react";

import { GSRandomCurrentTime } from "../../../core/initGlobalState.js";

import AsideButton from "./AsideButton.js";
import Switch from "../SwitchButton.js";

function changeLocalStorage(value) {
    let localStorageRandomCurrentTime = JSON.parse(localStorage.getItem('randomCurrentTime'));
    localStorageRandomCurrentTime.disableAll = value;
    localStorage.setItem('randomCurrentTime', JSON.stringify(localStorageRandomCurrentTime)); 
}

export default memo(function RCTButton(props) {
    const disableAll = props.disableAll;

    useEffect(() => {
        GSRandomCurrentTime.disableAll = disableAll.value;
        const res = GSRandomCurrentTime.disableAll;
        changeLocalStorage(res);
    }, [disableAll]);

    const handleOnClick = () => {
        props.setDisableAll("randomCurrentTime");
    }
    
    return (
        <AsideButton
            title="RCT"
            description="Enable and disable the random current time effect."
        >
            <div className="flex-row align-c justify-c p-3">
                <Switch
                    onClick={handleOnClick}
                    isDisable={disableAll.value}
                    title="disable all filters effect"
                >
                    <span className="fs-text" style={{width: "110px"}}>
                        {!disableAll.value ? "disable all" : "enable all"}
                    </span>
                </Switch>
            </div>
        </AsideButton>
    );
});