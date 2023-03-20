import {useReducer, useCallback, useMemo} from "react";

import {initTimeState, TimeReducer} from "../../../reducer/index.js";

import AddAndSubtract from "../../../components/AddAndSubtract/component.js";
import ConfigPanelContainer from "../ConfigPanelContainer/component.js";
import ConfigPanelChild from "../ConfigPanelChild/component.js";

import {isMinorThanTen} from "../../utils.js";

function TimeTitle() {
    return (
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
    );
}

function TimeChild({
    name,
    addTo,
    subtractTo,
    minutes,
    seconds,
    miliseconds,
}) {
    return (
        <ConfigPanelChild>
            <div className="flex-row align-c justify-c py-2">
                <p className="fs-text text-bold p-2">time {name}</p>
                <AddAndSubtract
                    addOnClick={addTo}
                    subtractOnClick={subtractTo}
                    viewValue={minutes}
                    value={600}
                />
                <p className="p-2 fs-text">:</p>
                <AddAndSubtract
                    addOnClick={addTo}
                    subtractOnClick={subtractTo}
                    viewValue={seconds}
                    value={10}
                />
                <p className="p-2 fs-text">.</p>
                <AddAndSubtract
                    addOnClick={addTo}
                    subtractOnClick={subtractTo}
                    viewValue={miliseconds}
                    value={1}
                />
            </div>
        </ConfigPanelChild>
    );
}

function MaxTime({
    max,
    dispatch
}) {
    const minutes = useMemo(() => isMinorThanTen(Number.parseInt(max / 600) % 60), [max]);
    const seconds = useMemo(() => isMinorThanTen(Number.parseInt(max / 10) % 60), [max]);

    function addToMax(val) {
        dispatch({type:"max/change", payload: max + val});
    }

    function subtractToMax(val) {
        dispatch({type:"max/change", payload: max - val});
    }

    return (
        <TimeChild
            name="max"
            addTo={addToMax}
            subtractTo={subtractToMax}
            minutes={minutes}
            seconds={seconds}
            miliseconds={max % 10}
        />
    );
}

function MinTime({
    min,
    dispatch
}) {
    const minutes = useMemo(() => isMinorThanTen(Number.parseInt(min / 600) % 60), [min]);
    const seconds = useMemo(() => isMinorThanTen(Number.parseInt(min / 10) % 60), [min]);

    function addToMin(val) {
        dispatch({type:"min/change", payload: min + val});
    }
    function subtractToMin(val) {
        dispatch({type:"min/change", payload: min - val});
    }


    return (
        <TimeChild
            name="min"
            addTo={addToMin}
            subtractTo={subtractToMin}
            minutes={minutes}
            seconds={seconds}
            miliseconds={min % 10}
        />
    );
}

function Time() {
    const [{min, max}, timeDispatch] = useReducer(TimeReducer, initTimeState());

    const reset = useCallback(function () {
        timeDispatch({type: "reset"});
    }, [timeDispatch]);

    return (
        <ConfigPanelContainer
            title="Time to wait"
            description="This is an interval that represents the time to wait between executions of audios set."
            addResetButton
            reset={reset}
        >
            <TimeTitle/>
            <MaxTime max={max} dispatch={timeDispatch}/>
            <MinTime min={min} dispatch={timeDispatch}/>
        </ConfigPanelContainer>
    );
}

export default Time;