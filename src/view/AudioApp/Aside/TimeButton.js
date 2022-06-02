import { useState } from "react";

import { GSTimeInterval } from "../../../core/initGlobalState.js"

import AsideButton from "./AsideButton.js";
import TouchButton from "../TouchButton.js";
import ToolButton from "../ToolButton.js";

export default function TimeButton(props) {
    const [min, setMin] = useState(GSTimeInterval.min);
    const [max, setMax] = useState(GSTimeInterval.max);


    const add = (setTime) => {
        return function(data) {
            GSTimeInterval[data] += 10;
            setTime(() => GSTimeInterval[data]);
        }
    }
    const subtract = (setTime) => {
        return function(data) {
            GSTimeInterval[data] -= 10;
            setTime(() => GSTimeInterval[data]);
        }
    }

    const reset = () => {
    }

    return (
        <AsideButton title="Time">
            <div>
                <p className="fs-text">Change the interval of time execution.</p>
            </div>
            <div className="flex-column align-c justify-c">
                <ToolButton onClick={reset}>Reset</ToolButton>
            </div>
            <div className="flex-row align-c justify-c">
                <h4 className="fs-text" style={{marginRight: "10px"}}>Min:</h4>
                <TouchButton
                    disable="configs"
                    output={min}
                    add={add(setMin)}
                    subtract={subtract(setMin)}
                    data={"min"}
                />
                <span>ms</span>
            </div>
            <div className="flex-row align-c justify-c">
                <h4 className="fs-text" style={{marginRight: "10px"}}>Max:</h4>
                <TouchButton
                    disable="configs"
                    output={max}
                    add={add(setMax)}
                    subtract={subtract(setMax)}
                    data={"max"}
                />
                <span>ms</span>
            </div>
        </AsideButton>
    );
}