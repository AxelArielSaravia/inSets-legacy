import {
    useReducer,
    useContext,
    useEffect
} from "react";

import {AudioListContext} from "../contexts/AudioList.js";

import {setsReducer, setsActions} from "../../slices/sets.js";

import {createSetsInitialState} from "../initialState.js";

import {fixPercent, undefinedFunction} from "../utils.js";

import AddAndSubtract from "../AddAndSubtract.js";
import PanelConfigContainer from "./PanelConfigContainer.js";


import "./Sets.scss";

let _setsDispatcher = undefinedFunction;

function reset() {
    _setsDispatcher(setsActions.reset());
}
function addEvent(i) {
    _setsDispatcher(setsActions.addEvent(i));
}
function removeEvent(i) {
    _setsDispatcher(setsActions.removeEvent(i));
}

function Sets() {
    const [{completedAudioListSize}] = useContext(AudioListContext);
    const [{
        arrOfEvents,
        sumOfAllEvents
    }, setsDispatcher] = useReducer(setsReducer, createSetsInitialState());

    _setsDispatcher = setsDispatcher;

    useEffect(function () {
        if (arrOfEvents.length < 15
            && completedAudioListSize + 1 !== arrOfEvents.length
        ) {
            setsDispatcher(setsActions.update);
        }
    }, [completedAudioListSize, arrOfEvents]);

    return (
        <PanelConfigContainer
            title="Audios Sets"
            description="This represent the probability values of audios sets length for the next execution. The maximum length of a set is 15. The default value is 1"
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
                    {arrOfEvents.map(function (val, i) {
                        return (
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
                                    {fixPercent(sumOfAllEvents, val, 100, 1) + "%"}
                                </p>
                            </div>

                        );
                    })}
                </div>
            )}
        </PanelConfigContainer>
    );
}

export default Sets;