import { memo } from "react";

import AsideButton from "./AsideButton.js";
import TouchButton from "../TouchButton.js";
import ToolButton from "../ToolButton.js";
import Switch from "../SwitchButton.js";

export default memo(function PlayBackRateButton({playBackRate, setDispatcher}) {
    const { min, max } = playBackRate;
    const areAllDisable = playBackRate.areAllDisable.value;
    const resMin = min.toFixed(1); 
    const resMax = max.toFixed(1);

    const handleOnClick = () => {
        setDispatcher("playBackRate", "areAllDisable/global", !areAllDisable);
    }

    const operation = (operation, type) => (data) => {
        if (operation === "add") {
            const value = Number.parseFloat((data + 0.1).toFixed(1));
            setDispatcher("playBackRate", type, value);
        } else if (operation === "subtract"){
            const value = Number.parseFloat((data - 0.1).toFixed(1));
            setDispatcher("playBackRate", type, value);
        }
    }

    const reset = () => { setDispatcher("playBackRate", "reset", null); }

    const add_min = operation("add", "min");
    const add_max = operation("add", "max");
    const subtract_min = operation("subtract", "min");
    const subtract_max = operation("subtract", "max");

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
                                            textStyle={{ width: "40px" }}
                                            orientation="row"
                                            disable="configs"
                                            output={resMin}
                                            add={add_min}
                                            subtract={subtract_min}
                                            data={min}
                                        />
                                    </div>
                                    <div className="flex-row align-c justify-sb p-2">
                                        <span className="fs-text">max:</span>
                                        <TouchButton
                                            scroll
                                            touch
                                            textStyle={{ width: "40px" }}
                                            orientation="row"
                                            disable="configs"
                                            output={resMax}
                                            add={add_max}
                                            subtract={subtract_max}
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