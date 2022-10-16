import { memo, useReducer, useCallback, useContext, useEffect } from "react";

import { AudioListContext } from "../../../context/index.js";

import { initSetsState, SetsReducer } from "../../../reducer/index.js";

import AddAndSubtract from "../../../components/AddAndSubtract/component.js";
import ConfigPanelContainer from "../ConfigPanelContainer/component.js"

import { fixPercent } from "../../utils.js"; 

import "./style.scss";

function Sets() {
    const [{completedAudioListSize}] = useContext(AudioListContext);
    const [{
        arrOfEvents,
        sumOfAllEvents
    }, setsDispatcher] = useReducer(SetsReducer, initSetsState());

    useEffect(function () {
        if (completedAudioListSize + 1 !== arrOfEvents.length)
            setsDispatcher({type: "update"});
    }, [completedAudioListSize, arrOfEvents])

    const reset = useCallback(function () {
        setsDispatcher({type: "reset"})
    }, []);
    const addEvent = useCallback((i) => function () {
        setsDispatcher({type: "addEvent", payload: i});
    }, []);
    const removeEvent = useCallback((i) => function () {
        setsDispatcher({type: "removeEvent", payload: i});
    }, []);

    return (
        <ConfigPanelContainer
            title="Audios Sets"
            description="This represent the probability values of audios sets length for the next execution. The maximum length of a set is 15. The default value is 1"
            addResetButton
            reset={reset}
        >
            {arrOfEvents.length < 2 
            ? (
            <div className="p-10">
                <p className="fs-text text-center">No audio files</p>
            </div>
            ) : (
            <div className="sets-container_grid-3 align-c">
                <div className="set-container p-5">
                    <h4 className="fs-text">Size</h4>
                    <h4 className="fs-text">Value</h4>
                    <h4 className="fs-text">Probability</h4>
                </div>
                {arrOfEvents.map((val, i) => (
                    <div key={"set-" + i} className="set-container p-5">
                        <h4 className="fs-text">{i}</h4>
                        <AddAndSubtract
                            addOnClick={addEvent(i)}
                            subtractOnClick={removeEvent(i)}
                            viewValue={val}
                            horizontal
                        />
                        <p className="fs-text">
                            {fixPercent(sumOfAllEvents, val, 100, 1) + '%'}
                        </p>
                    </div>
                ))}
            </div>
            )}
        </ConfigPanelContainer>
    );
}

export default memo(Sets);