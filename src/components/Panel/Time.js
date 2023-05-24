//@ts-check
import React, {useReducer, useMemo} from "react";

import {emptyDispatch} from "../../state/dispatch.js";

import {timeReducer, timeActions} from "../../slices/time.js";
import {createGlobalTimeInterval} from "../../state/factory.js";

import {isMinorThanTen} from "../utils.js";

import AddAndSubtract from "../AddAndSubtract.js";
import PanelConfigContainer from "./PanelConfigContainer.js";
import PanelConfigChild from "./PanelConfigChild.js";

let _timeDispatch = emptyDispatch;

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
        <PanelConfigChild>
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
        </PanelConfigChild>
    );
}

function addToMax(val) {
    _timeDispatch(timeActions.addToMax(val));
}

function subtractToMax(val) {
    _timeDispatch(timeActions.subtractToMax(val));
}

function MaxTime({max}) {
    const minutes = useMemo(() => isMinorThanTen(Math.floor(max / 600) % 60), [max]);
    const seconds = useMemo(() => isMinorThanTen(Math.floor(max / 10) % 60), [max]);

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
function addToMin(val) {
    _timeDispatch(timeActions.addToMin(val));
}

function subtractToMin(val) {
    _timeDispatch(timeActions.subtractToMin(val));
}

function MinTime({min}) {
    const minutes = useMemo(() => isMinorThanTen(Math.floor(min / 600) % 60), [min]);
    const seconds = useMemo(() => isMinorThanTen(Math.floor(min / 10) % 60), [min]);

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

function resetTime() {
    _timeDispatch(timeActions.reset());
}

function Time() {
    const [{min, max}, timeDispatch] = useReducer(timeReducer, createGlobalTimeInterval());
    _timeDispatch = timeDispatch;
    return (
        <PanelConfigContainer
            title="Time to wait"
            description="This is an interval that represents the time to wait between executions of audios set."
            ResetButtonEnabled
            reset={resetTime}
        >
            <TimeTitle/>
            <MaxTime max={max}/>
            <MinTime min={min}/>
        </PanelConfigContainer>
    );
}

export default Time;