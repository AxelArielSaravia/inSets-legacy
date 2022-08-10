import { useState, useMemo } from "react";

import AsideButton from "./AsideButton.js";
import TouchButton from "../TouchButton.js";
import ToolButton from "../ToolButton.js";

const isMinorThanTen = (num) => num < 10 ? "0" + num : num;
const durationToTime = (val) => {
    const _val = Math.floor(val);
    const ms = (_val / 100) % 10;
    const sec = Number.parseInt(_val / 1000) % 60;
    const min = Number.parseInt(_val / 60000) % 60;
    return isMinorThanTen(min) + ":" + isMinorThanTen(sec) + "." + ms ;
}

const _resValue = (v) => {
    if (v >= 60000) return [Number.parseInt(v / 60000) % 60, "m"];
    else if (v >= 1000) return [Number.parseInt(v / 1000) % 60, "s"];
    return [v, "ms"];
}

export default function TimeButton({timeInterval, setDispatcher}) {
    const min = timeInterval.min;
    const max = timeInterval.max;
    const resMin = durationToTime(min);
    const resMax = durationToTime(max);
    const [value, setValue] = useState(100);
    const [v, v_text] = useMemo(() => _resValue(value), [value]);
    const addValue = () => {
        if (value < 60001) { 
            const v = value < 10000 ? value * 10
                : value + 50000;
            setValue(() =>  v); 
        }
    }
    const subtractValue = () => {
        if (value > 100) {
            const v = value < 60000 ? value / 10
                : value - 50000;
            setValue(() => v);
        }
    }
    const operation = (operation, type) => (data) => {
        if (operation === "add") {
            setDispatcher("timeInterval", type, data + value);
        } else if (operation === "subtract") {
            setDispatcher("timeInterval", type, data - value);
        }
    };
    const add_min = operation("add", "min");
    const subtract_min = operation("subtract", "min");
    const add_max = operation("add", "max");
    const subtract_max = operation("subtract", "max");

    const reset = () => { setDispatcher("timeInterval", "reset", null); }

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
                <div>
                    <div className="flex-row align-c justify-sb p-2">
                        <span className="fs-text-s p-2">Value:</span>
                        <TouchButton
                            textClass="effect-container_text-s"
                            orientation="row"
                            disable="configs"
                            add={addValue}
                            subtract={subtractValue}
                            output={v}
                        />
                        <span className="fs-text p-2">{v_text}</span>
                    </div>
                </div>
            </div>
            <div className="flex-column align-c">
                <div className="effect-container">
                    <div className="p-2">
                        <div className="p-2 border rounded">
                            <div className="flex-column align-c justify-sb">
                                <div> 
                                    <div className="flex-row align-c justify-sb p-2">
                                        <h4 className="fs-text p-2">Min:</h4>
                                        <TouchButton
                                            scroll
                                            touch
                                            orientation="row"
                                            disable="configs"
                                            output={resMin}
                                            add={add_min}
                                            subtract={subtract_min}
                                            data={min}
                                        />
                                        <span className="fs-text p-2">mm:ss.ms</span>
                                    </div>
                                </div>
                            </div>                         
                            <div className="flex-column align-c justify-sb">
                                <div> 
                                    <div className="flex-row align-c justify-sb p-2">
                                        <h4 className="fs-text p-2">Max:</h4>
                                        <TouchButton
                                            scroll
                                            touch
                                            orientation="row"
                                            disable="configs"
                                            output={resMax}
                                            add={add_max}
                                            subtract={subtract_max}
                                            data={max}
                                        />
                                        <span className="fs-text p-2">mm:ss.ms</span>
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