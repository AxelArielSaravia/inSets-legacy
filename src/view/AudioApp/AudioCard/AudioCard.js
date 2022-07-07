import { memo, useEffect, useState, useContext } from "react";
import { play, stop, setAudioConfiguration, deleteAudio } from "../../../core/audioEffects.js";

import Switcher from "./AudioCard.Switch.js";
import TimeText from "./AudioCard.TimeText.js";
import TimeLine from "./AudioCard.TimeLine.js";
import Volume from "./AudioCard.Volume.js";
import TouchButton from "../TouchButton.js"

import { ContextDisableAll } from "../DisableAllProvider.js";

import "./AudioCard.scss"; 

function ProbabilityButton(props) {
    const [value, setValue] = useState(props.probability.value);

    const add = () => {
        props.probability.value += 1;
        setValue(() =>  props.probability.value);
    }
    const subtract = () => {
        if (value > 1) {
            props.probability.value -= 1;
            setValue(() => props.probability.value);
        }
    }

    return (
        <TouchButton
            orientation="row"
            add={add}
            subtract={subtract}
            output={value}
        />
    );
}


export default memo(function AudioCard(props) {
    const propsState = props.states;
    const propData = props.data;
    const [states, setStates] = useState(propsState);
    const [startTimePoint, setStartTimePoint] = useState(propData.startTimePoint.get());
    const [endTimePoint, setEndTimePoint] = useState(propData.endTimePoint.get());

    const [isAllDisable, dispatchDisableAll] = useContext(ContextDisableAll);

    useEffect(() => { setStates(() => propsState); }, [propsState]);

    const setIsAllDisable = (name) => {
        dispatchDisableAll({type: "audioCard", typeEffect: name});
    } 

    const add = (setTime) => {
        return function(timePoint) {
            timePoint.set(timePoint.get() +1);
            setTime(() => timePoint.get());
        }
    }
    const subtract = (setTime) => {
        return function(timePoint) {
            timePoint.set(timePoint.get() - 1);
            setTime(() => timePoint.get());
        }
    }
    const changeState = (isPlaying, randomCurrentTime) => {
        setStates(() => ({
            isPlaying: isPlaying,
            randomCurrentTime: randomCurrentTime,
            color: ""
        }));
    }
    const onClickPlay = async () => {
        if (!states.isPlaying) {
            await setAudioConfiguration(props.id);
            await play(props.id, changeState);
        } else {
            stop(props.id, changeState);
        }
    }

    const handleOnClickDeleteButton = () => {
        deleteAudio(props.id, (map) => props.handleSetAudioList(map))
    }

    return (
        <div className="audioCard" style={props.appIsPlaying && states?.isPlaying && states?.color ? {boxShadow:"0 0 2px 2px " +  states?.color} : {}}>
            <button 
                type="button" 
                className="delete-button"
                onClick={handleOnClickDeleteButton}
            >
                <i className="flex-row align-c fs-text-l bi bi-x"></i>
            </button>
            <div className="audioCard-name flex-row">
                <ProbabilityButton probability={propData.probability}/>
                <h4 className="fs-text ellipsis">{propData.title}</h4>
            </div>
            <div className="audioCard-tools flex-row">
                <div className="audioCard-tools_left flex-column align-c">
                    <TimeLine 
                        appIsPlaying={props.appIsPlaying}
                        startTimePoint={startTimePoint} 
                        endTimePoint={endTimePoint} 
                        duration={propData.duration} 
                        isPlaying={states?.isPlaying}
                        randomCurrentTime={states?.randomCurrentTime}
                        color={states?.color}
                    />
                    <div className="audioCard-play flex-row align-center justify-c"> 
                        <TimeText 
                            data={propData.startTimePoint} 
                            time={startTimePoint} 
                            add={add(setStartTimePoint)} 
                            subtract={subtract(setStartTimePoint)}
                        />
                        <div className="audioCard-play-button flex-column align-c justify-c">
                            <button 
                                type="button"
                                onClick={onClickPlay}
                            >
                                {states?.isPlaying
                                    ? <i className="flex-row align-c fs-text-l bi bi-pause-fill"/>
                                    : <i className="flex-row align-c fs-text-l bi bi-play-fill"/>
                                }
                            </button>
                        </div>
                        <TimeText 
                            data={propData.endTimePoint} 
                            time={endTimePoint} 
                            add={add(setEndTimePoint)} 
                            subtract={subtract(setEndTimePoint)}
                        />
                    </div>
                </div>
                <div className="audioCard-tools_right flex-column align-end">
                    <div className="audioCard-pluggins">
                        <Volume volume={propData.volume} id={props.id}/>
                        <Switcher
                            isAllDisable={isAllDisable.panner}
                            setIsAllDisable={setIsAllDisable}
                            effect={propData.panner}
                            effectName="panner"
                            name="panner"
                            title="panner effect"
                        />
                        <Switcher
                            isAllDisable={isAllDisable.delay}
                            setIsAllDisable={setIsAllDisable}
                            effect={propData.delay} 
                            effectName="delay"
                            name="delay" 
                            title="delay effect"
                        />
                        <Switcher
                            isAllDisable={isAllDisable.filter}
                            setIsAllDisable={setIsAllDisable}
                            effect={propData.filter}
                            effectName="filter"
                            name="filter" 
                            title="filter effect"
                        />
                        <Switcher
                            isAllDisable={isAllDisable.playBackRate}
                            setIsAllDisable={setIsAllDisable}
                            effect={propData.playBackRate} 
                            effectName="playBackRate"
                            name="rate"
                            title="random playback rate"
                        />
                        <Switcher
                            isAllDisable={isAllDisable.randomCurrentTime}
                            setIsAllDisable={setIsAllDisable}
                            effect={propData.randomCurrentTime}
                            effectName="randomCurrentTime"
                            name="RCT" 
                            title="random change current time"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});