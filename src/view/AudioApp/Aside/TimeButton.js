import { useState } from "react";

import { GSTimeInterval } from "../../../core/initGlobalState.js";
import initState from "../../../core/initState.json";

import AsideButton from "./AsideButton.js";
import TouchButton from "../TouchButton.js";
import ScrollButton from "../ScrollButton.js";
import ToolButton from "../ToolButton.js";


function changeLocalStorage(time, value) {
    let localStorageTime = JSON.parse(localStorage.getItem('timeInterval'));
    localStorageTime[time] = value;
    localStorage.setItem('timeInterval', JSON.stringify(localStorageTime)); 
}

export default function TimeButton(props) {
    const localStorageTime = JSON.parse(localStorage.getItem('timeInterval'));

    const [min, setMin] = useState(localStorageTime.min);
    const [max, setMax] = useState(localStorageTime.max);
    const [value, setValue] = useState(100);

    const addValue = () => {
        if (value < 1001) { setValue(state =>  state * 10); }
    }
    const subtractValue = () => {
        if (value > 10) { setValue(state =>  state / 10); }
    }
    const add = (setTime, time) => {
        return function(data) {
            GSTimeInterval[data] += value;
            changeLocalStorage(time, GSTimeInterval[data]);
            setTime(() => GSTimeInterval[data]);
        }
    }
    const subtract = (setTime, time) => {
        return function(data) {
            GSTimeInterval[data] -= value;
            changeLocalStorage(time, GSTimeInterval[data]);
            setTime(() => GSTimeInterval[data]);
        }
    }
    const reset = () => {
        let timeInterval = initState.timeInterval;
        GSTimeInterval.min = timeInterval.min;
        GSTimeInterval.max = timeInterval.max;
        localStorage.setItem('timeInterval', JSON.stringify(timeInterval));
        setMin(() => timeInterval.min);
        setMax(() => timeInterval.max);
    }

    return (
        <AsideButton 
            title="Time" 
            description="Change the interval of time execution."
        >
            <div className="flex-column align-c justify-c p-3">
                <ToolButton onClick={reset}>Reset</ToolButton>
            </div>
            <div className="flex-column align-c p-3">
                <p className="fs-text-s text-center">Change the add and subtract value.</p>
                <div style={{width:"160px"}}>
                    <div className="flex-row align-c justify-sb p-2">
                        <span className="fs-text-s">Value:</span>
                        <ScrollButton
                            textStyle={{width: "60px"}}
                            orientation="row"
                            disable="configs"
                            add={addValue}
                            subtract={subtractValue}
                            output={value}
                        />
                    </div>
                </div>
            </div>
            <div className="flex-column align-c">
                <div style={{width:"240px"}}>
                    <div className="p-2">
                        <div className="p-2 border rounded">
                            <div className="flex-column align-c justify-sb">
                                <div style={{width:"200px"}}> 
                                    <div className="flex-row align-c justify-sb p-3">
                                        <h4 className="fs-text">Min:</h4>
                                        <TouchButton
                                            textStyle={{width: "70px"}}
                                            orientation="row"
                                            disable="configs"
                                            output={min}
                                            add={add(setMin, "min")}
                                            subtract={subtract(setMin, "min")}
                                            data={"min"}
                                        />
                                        <span className="fs-text">ms</span>
                                    </div>
                                </div>
                            </div>                         
                            <div className="flex-column align-c justify-sb">
                                <div style={{width:"200px"}}> 
                                    <div className="flex-row align-c justify-sb p-3">
                                        <h4 className="fs-text">Max:</h4>
                                        <TouchButton
                                            textStyle={{width: "70px"}}
                                            orientation="row"
                                            disable="configs"
                                            output={max}
                                            add={add(setMax, "max")}
                                            subtract={subtract(setMax, "max")}
                                            data={"max"}
                                        />
                                        <span className="fs-text">ms</span>
                                    </div>
                                </div>
                            </div>     
                        </div>
                    </div>
                </div>
            </div>
        </AsideButton>
    );
}