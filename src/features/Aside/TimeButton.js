import { useState } from "react";

import AsideButton from "./AsideButton.js";
import TouchButton from "../TouchButton.js";
import ToolButton from "../ToolButton.js";

export default function TimeButton(props) {
    const timeInterval = props.timeInterval;
    const min = timeInterval.min;
    const max = timeInterval.max;
    const TouchButton_TextStyle = {width: "70px"};
    const [value, setValue] = useState(100);
    const addValue = () => {
        if (value < 1001) { setValue(state =>  state * 10); }
    }
    const subtractValue = () => {
        if (value > 10) { setValue(state =>  state / 10); }
    }

    const minAdd = (data) => { props.setDispatcher("timeInterval", "min", data + value); }
    const minSubtract = (data) => { props.setDispatcher("timeInterval", "min", data - value); }
    const maxAdd = (data) => { props.setDispatcher("timeInterval", "max", data + value); }
    const maxSubtract = (data) => { props.setDispatcher("timeInterval", "max", data - value); }

    const reset = () => { props.setDispatcher("timeInterval", "reset", null); }

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
                        <TouchButton
                            scroll
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
                <div className="effect-container">
                    <div className="p-2">
                        <div className="p-2 border rounded">
                            <div className="flex-column align-c justify-sb">
                                <div style={{width:"200px"}}> 
                                    <div className="flex-row align-c justify-sb p-3">
                                        <h4 className="fs-text">Min:</h4>
                                        <TouchButton
                                            scroll
                                            touch
                                            textStyle={TouchButton_TextStyle}
                                            orientation="row"
                                            disable="configs"
                                            output={min}
                                            add={minAdd}
                                            subtract={minSubtract}
                                            data={min}
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
                                            scroll
                                            touch
                                            textStyle={TouchButton_TextStyle}
                                            orientation="row"
                                            disable="configs"
                                            output={max}
                                            add={maxAdd}
                                            subtract={maxSubtract}
                                            data={max}
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