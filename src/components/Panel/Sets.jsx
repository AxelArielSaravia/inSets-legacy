//@ts-check
import React, {useReducer, useContext} from "react";

import {createSetsState} from "../../state/factory.js";
import {emptyDispatch} from "../../state/dispatch.js";

import {setsReducer, setsActions} from "../../slices/sets.js";

import {AudioListContext} from "../contexts/AudioList.jsx";

import AddAndSubtract from "../AddAndSubtract.jsx";
import PanelConfigContainer from "./PanelConfigContainer.jsx";


let _setsDispatcher = emptyDispatch;

function reset() {
    _setsDispatcher(setsActions.reset());
}

/**
@type {(i: number) => void} */
function addEvent(i) {
    _setsDispatcher(setsActions.addEvent(i));
}

/**
@type {(i: number) => void} */
function removeEvent(i) {
    _setsDispatcher(setsActions.removeEvent(i));
}

/**
@type {(props: {arrOfEvents: Array<number>, sumOfAllEvents: number}) => Array<JSX.Element>} */
function SetsChildren({arrOfEvents, sumOfAllEvents}) {
    const children = [];
    for (const i in arrOfEvents) {
        const val = arrOfEvents[i];
        children.push(
            <div key={"set-" + i} className="set-container p-5">
                <h4 className="fs-text">{i}</h4>
                <AddAndSubtract
                    addOnClick={addEvent}
                    subtractOnClick={removeEvent}
                    value={i}
                    viewValue={val}
                    horizontal
                />
                <p className="fs-text">
                    {(sumOfAllEvents <= 0
                        ? 0
                        : ((val * 100) / sumOfAllEvents)
                    ).toFixed(1) + "%"}
                </p>
            </div>
        );
    }
    return children;
}

function Sets() {
    const {completedAudioListSize} = useContext(AudioListContext);
    const [{arrOfEvents, sumOfAllEvents}, setsDispatcher] = useReducer(setsReducer, createSetsState());
    _setsDispatcher = setsDispatcher;

    if (
        arrOfEvents.length < 15
        && completedAudioListSize + 1 !== arrOfEvents.length
    ) {
        setsDispatcher(setsActions.update());
    }

    return (
        <PanelConfigContainer
            title="Audios Sets"
            description="Here are the probability values of audios sets sizes for the executions. The maximum size of a set that can be executed is 15."
            ResetButtonEnabled
            reset={reset}
        >
            {arrOfEvents.length < 2
            ? (
                <div className="p-10">
                    <p className="fs-text text-center">No audio files</p>
                </div>
            )
            : (
                <div className="sets-container_grid-3 align-c">
                    <div className="set-container p-5">
                        <h4 className="fs-text">Size</h4>
                        <h4 className="fs-text">Value</h4>
                        <h4 className="fs-text">Probability</h4>
                    </div>
                    <SetsChildren
                        arrOfEvents={arrOfEvents}
                        sumOfAllEvents={sumOfAllEvents}
                    />
                </div>
            )}
        </PanelConfigContainer>
    );
}

export default Sets;
