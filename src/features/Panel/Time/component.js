import { memo, useReducer, useCallback, useMemo } from "react";

import { initTimeState, TimeReducer } from "../../../reducer/index.js";

import AddAndSubtract from "../../../components/AddAndSubtract/component.js";
import ConfigPanelContainer from "../ConfigPanelContainer/component.js"
import ConfigPanelChild from "../ConfigPanelChild/component.js";

import {isMinorThanTen} from "../../utils.js"

function Time() {
    const [{min, max}, timeDispatch] = useReducer(TimeReducer, initTimeState());
 
    const reset = useCallback(function () {
        timeDispatch({type: "reset"})
}, [timeDispatch]);

    const addToMin = (val) => () => {
        timeDispatch({type:"min/change", payload: +min + val});
    } 
    const subtractToMin = (val) => () => {
        timeDispatch({type:"min/change", payload: +min - val});
    } 
    const addToMax = (val) => () => {
        timeDispatch({type:"max/change", payload: +max + val});
    } 
    const subtractToMax = (val) => () => {
        timeDispatch({type:"max/change", payload: +max - val});
    } 

    const maxMinutes = useMemo(() => isMinorThanTen(Number.parseInt(max / 600) % 60), [max]);
    const maxSeconds = useMemo(() => isMinorThanTen(Number.parseInt(max / 10) % 60), [max]);
    const minMinutes = useMemo(() => isMinorThanTen(Number.parseInt(min / 600) % 60), [min]);
    const minSeconds = useMemo(() => isMinorThanTen(Number.parseInt(min / 10) % 60), [min]);

    return (
        <ConfigPanelContainer
            title="Time to wait"
            description="This is an interval that represents the time to wait between executions of audios set."
            addResetButton
            reset={reset}
        > 
            <div className="flex-column align-c p-10">
                <div className="flex-row align-c">
                    <span className="fs-text p-5">{"value schema: "}</span>
                    <span className="fs-text text-bold p-5">mm:ss.ms</span>
                </div>
                <div className="flex-row align-c p-5">
                    <p className="fs-text-s text-bold">minutes:seconds.milliseconds</p>
                </div>
                <div className="flex-row align-c p-5">
                    <p className="fs-text-s">the millisecond are in hundreds</p>
                </div>
            </div>
            <ConfigPanelChild>
                <div className="flex-row align-c justify-c py-2">
                    <p className="fs-text text-bold p-2">time max</p>
                    <AddAndSubtract 
                        addOnClick={addToMax(600)}
                        subtractOnClick={subtractToMax(600)}
                        viewValue={maxMinutes}
                    />
                    <p className="p-2 fs-text">:</p>
                    <AddAndSubtract 
                        addOnClick={addToMax(10)}
                        subtractOnClick={subtractToMax(10)}
                        viewValue={maxSeconds}
                    />
                    <p className="p-2 fs-text">.</p>
                    <AddAndSubtract 
                        addOnClick={addToMax(1)}
                        subtractOnClick={subtractToMax(1)}
                        viewValue={max % 10}
                    />
                </div>
            </ConfigPanelChild>
            <ConfigPanelChild>
                <div className="flex-row align-c justify-c py-2">
                    <p className="fs-text text-bold p-2">time min</p>
                    <AddAndSubtract 
                        addOnClick={addToMin(600)}
                        subtractOnClick={subtractToMin(600)}
                        viewValue={minMinutes}
                    />
                    <p className="p-2 fs-text">:</p>
                    <AddAndSubtract 
                        addOnClick={addToMin(10)}
                        subtractOnClick={subtractToMin(10)}
                        viewValue={minSeconds}
                    />
                    <p className="p-2 fs-text">.</p>
                    <AddAndSubtract 
                        addOnClick={addToMin(1)}
                        subtractOnClick={subtractToMin(1)}
                        viewValue={min % 10}
                    />
                </div>
            </ConfigPanelChild>
        </ConfigPanelContainer>
    );
}

export default memo(Time);