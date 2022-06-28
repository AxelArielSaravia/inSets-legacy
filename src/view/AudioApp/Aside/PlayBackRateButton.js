import { useState, useEffect, memo} from "react";

import { GSPlayBackRate } from "../../../core/initGlobalState.js";
import initState from "../../../core/initState.json";

import AsideButton from "./AsideButton.js";
import TouchButton from "../TouchButton.js";
import ToolButton from "../ToolButton.js";
import Switch from "../SwitchButton.js";

function changeLocalStorage(name, value) {
    let localStoragePlayBackRate = JSON.parse(localStorage.getItem('playBackRate'));
    localStoragePlayBackRate[name] = value;
    localStorage.setItem('playBackRate', JSON.stringify(localStoragePlayBackRate)); 
}

export default memo(function PlayBackRateButton(props) {
    let localStoragePlayBackRate = JSON.parse(localStorage.getItem('playBackRate'));

    const [min, setMin] = useState(localStoragePlayBackRate.min.toFixed(1));
    const [max, setMax] = useState(localStoragePlayBackRate.max.toFixed(1));

    const disableAll = props.disableAll;

    useEffect(() => {
        GSPlayBackRate.disableAll = !GSPlayBackRate.disableAll;
        const res = GSPlayBackRate.disableAll;
        changeLocalStorage("disableAll", res);
    }, [disableAll]);

    const handleOnClick = () => {
        props.setDisableAll("playBackRate");
    }

    const operations = (set, operation) => (data) => {
        if (operation === "add") {
            GSPlayBackRate[data] = Number.parseFloat((GSPlayBackRate[data] + 0.1).toFixed(1));
        } else {
            GSPlayBackRate[data] = Number.parseFloat((GSPlayBackRate[data] - 0.1).toFixed(1))
        } 
        let res = GSPlayBackRate[data];
        changeLocalStorage(data, res);
        set(() => res.toFixed(1));
     }
    const reset = () => {
        let playBackRate = initState.playBackRate;
        GSPlayBackRate.disableAll = playBackRate.disableAll;
        GSPlayBackRate.min = playBackRate.min;
        GSPlayBackRate.max = playBackRate.max;
        localStorage.setItem('playBackRate', JSON.stringify(playBackRate));
        setMin(_ => playBackRate.min.toFixed(1));
        setMax(_ => playBackRate.max.toFixed(1));
    }

    return (
        <AsideButton
            title="Rate"
            description="Change the Playback rate"
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
            <div className="flex-column align-c justify-c p-3">
                <ToolButton onClick={reset}>Reset</ToolButton>
            </div>
            <div className="flex-column align-c">
                <div style={{width:"240px"}}>
                    <div className="p-2">
                        <div className="p-2 border rounded">
                            <h4 className="fs-text">Rate:</h4>
                            <div className="flex-column align-c justify-sb">
                                <div style={{width:"135px"}}>
                                    <div className="flex-row align-c justify-sb p-2">
                                        <span className="fs-text">min:</span>
                                        <TouchButton
                                            textStyle={{width: "40px"}}
                                            orientation="row"
                                            disable="configs"
                                            output={min}
                                            add={operations(setMin, 'add')}
                                            subtract={operations(setMin, 'subtract')}
                                            data={"min"}
                                        />
                                    </div>
                                    <div className="flex-row align-c justify-sb p-2">
                                        <span className="fs-text">max:</span>
                                        <TouchButton
                                            textStyle={{width: "40px"}}
                                            orientation="row"
                                            disable="configs"
                                            output={max}
                                            add={operations(setMax, 'add')}
                                            subtract={operations(setMax, 'subtract')}
                                            data={"max"}
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