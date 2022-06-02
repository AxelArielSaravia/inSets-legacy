import { useState, useEffect } from "react";

import { GSProbabilityOfExecutionSets } from "../../../core/initGlobalState.js"

import AsideButton from "./AsideButton.js";
import TouchButton from "../TouchButton.js";
import ToolButton from "../ToolButton.js";

export default function SetsButton(props) {
    const audioList_size = props.audioList_size;
    const [arr, setArr] = useState(GSProbabilityOfExecutionSets.values)

    useEffect(() => {
        setArr(() => GSProbabilityOfExecutionSets.values);
    }, [audioList_size]);

    const add = (i) => {
        let val = GSProbabilityOfExecutionSets.get(i);
        GSProbabilityOfExecutionSets.set(i, val+1)
        setArr(() => GSProbabilityOfExecutionSets.values);
    }
    const subtract = (i) => {
        let val = GSProbabilityOfExecutionSets.get(i);
        GSProbabilityOfExecutionSets.set(i, val-1)
        setArr(() => GSProbabilityOfExecutionSets.values);
    }

    const reset = () => {
        GSProbabilityOfExecutionSets.reset();
        console.log(GSProbabilityOfExecutionSets.values);
        setArr(() => GSProbabilityOfExecutionSets.values);
    }

    return (
        <AsideButton title="Sets">
            <div>
                <p className="fs-text">Change the probability value of the n size set execution.</p>
            </div>
            {audioList_size === 0 
             ? (<div style={{padding: "20px 0"}}>
                    <p className="fs-text text-center">No audio files</p>
                </div>
            ) : (
                <>
                    <div className="flex-column align-c justify-c">
                        <ToolButton onClick={reset}>Reset</ToolButton>
                    </div>
                    {arr.map((val, i) => (
                        <div key={"set-" + i} className="flex-row align-c justify-c">
                            <h4 className="fs-text" style={{marginRight: "10px"}}>{"Sets of size " + i + ":"}</h4>
                            <TouchButton
                                disable="configs"
                                output={val}
                                add={add}
                                subtract={subtract}
                                data={i}
                            />
                        </div>
                    ))}
                </>
            )} 
        </AsideButton>
    );
}