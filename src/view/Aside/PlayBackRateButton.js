import { memo } from "react";

import AsideButton from "./AsideButton.js";
import TouchButton from "../TouchButton.js";
import ToolButton from "../ToolButton.js";
import Switch from "../SwitchButton.js";

export default memo(function PlayBackRateButton(props) {
    const playBackRate = props.playBackRate;
    const min = playBackRate.min;
    const max = playBackRate.max;
    const areAllDisable = playBackRate.areAllDisable.value;
    const resMin = min.toFixed(1); 
    const resMax = max.toFixed(1);

    const TouchButton_TextStyle = { width: "40px" };

    const handleOnClick = () => {
        props.setDispatcher("playBackRate", "areAllDisable/global", !areAllDisable);
    }

    const operation = (operation, type) => (data) => {
        if (operation === "add") {
            props.setDispatcher("playBackRate", type, data + 0.1);
        } else if (operation === "subtract"){
            props.setDispatcher("playBackRate", type, data - 0.1);
        }
    }

    const reset = () => { props.setDispatcher("playBackRate", "reset", null); }

    return (
        <AsideButton
            title="Rate"
            description="Change the Playback rate"
        >
            <div className="flex-row align-c justify-c p-3">
                <Switch
                    onClick={handleOnClick}
                    isDisable={areAllDisable}
                    title="disable all playback rate effects"
                >
                    <span className="fs-text disable-all_btn">
                        {areAllDisable ? "enable all" : "disable all" }
                    </span>
                </Switch>
            </div>
            <div className="flex-column align-c justify-c p-3">
                <ToolButton onClick={reset}>Reset</ToolButton>
            </div>
            <div className="flex-column align-c">
                <div className="effect-container">
                    <div className="p-2">
                        <div className="p-2 border rounded">
                            <h4 className="fs-text">Rate:</h4>
                            <div className="flex-column align-c justify-sb">
                                <div style={{width:"135px"}}>
                                    <div className="flex-row align-c justify-sb p-2">
                                        <span className="fs-text">min:</span>
                                        <TouchButton
                                            scroll
                                            touch
                                            textStyle={TouchButton_TextStyle}
                                            orientation="row"
                                            disable="configs"
                                            output={resMin}
                                            add={operation('add', "min")}
                                            subtract={operation('subtract', "min")}
                                            data={min}
                                        />
                                    </div>
                                    <div className="flex-row align-c justify-sb p-2">
                                        <span className="fs-text">max:</span>
                                        <TouchButton
                                            scroll
                                            touch
                                            textStyle={TouchButton_TextStyle}
                                            orientation="row"
                                            disable="configs"
                                            output={resMax}
                                            add={operation('add', "max")}
                                            subtract={operation('subtract', "max")}
                                            data={max}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AsideButton>
    );
});