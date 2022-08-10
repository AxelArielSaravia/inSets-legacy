import { useState, useMemo } from "react";

import AsideButton from "./AsideButton.js";
import TouchButton from "../TouchButton.js";
import ToolButton from "../ToolButton.js";

export default function TimeButton({timeInterval, setDispatcher}) {
    const min = timeInterval.min;
    const max = timeInterval.max
    const [value, setValue] = useState(100);
    const addValue = () => {
        if (value < 1001) { setValue(state =>  state * 10); }
    }
    const subtractValue = () => {
        if (value > 10) { setValue(state =>  state / 10); }
    }
    const operation = useMemo(() => (operation, type) => (data) => {
        if (operation === "add") {
            setDispatcher("timeInterval", type, data + value);
        } else if (operation === "subtract") {
            setDispatcher("timeInterval", type, data - value);
        }
    }, [setDispatcher, value]);
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
                            scroll
                            textClass="effect-container_text-l"
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
                                            textClass="effect-container_text-xl"
                                            orientation="row"
                                            disable="configs"
                                            output={min}
                                            add={add_min}
                                            subtract={subtract_min}
                                            data={min}
                                        />
                                        <span className="fs-text p-2">ms</span>
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
                                            textClass="effect-container_text-xl"
                                            orientation="row"
                                            disable="configs"
                                            output={max}
                                            add={add_max}
                                            subtract={subtract_max}
                                            data={max}
                                        />
                                        <span className="fs-text p-2">ms</span>
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