import { useEffect, useState } from "react";
import { play, stop, setAudioConfiguration, deleteAudio } from "../../../core/audioEffects.js";

import Switcher from "./AudioCard.Switch.js";
import TimeText from "./AudioCard.TimeText.js";
import TimeLine from "./AudioCard.TimeLine.js";
import Volume from "./AudioCard.Volume.js";

import "./AudioCard.scss"; 

export default function AudioCard(props) {
    const [states, setStates] = useState(props.states);
    const [startTimePoint, setStartTimePoint] = useState(props.data.startTimePoint.get());
    const [endTimePoint, setEndTimePoint] = useState(props.data.endTimePoint.get());
    const data = props.data;

    useEffect(() => { setStates(() => props.states); }, [props.states]);

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

    const onClickPlay = () => {
        if (!states.isPlaying) {
            setAudioConfiguration(props.id);
            play(props.id, changeState);
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
            <div className="audioCard-name">
                <h4 className="fs-text ellipsis">{data.title}</h4>
            </div>
            <div className="audioCard-tools flex-row">
                <div className="audioCard-tools_left flex-column align-c">
                    <TimeLine 
                        appIsPlaying={props.appIsPlaying}
                        startTimePoint={startTimePoint} 
                        endTimePoint={endTimePoint} 
                        duration={data.duration} 
                        isPlaying={states?.isPlaying}
                        randomCurrentTime={states?.randomCurrentTime}
                        color={states?.color}
                    />
                    <div className="audioCard-play flex-row align-center justify-c"> 
                        <TimeText 
                            data={data.startTimePoint} 
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
                            data={data.endTimePoint} 
                            time={endTimePoint} 
                            add={add(setEndTimePoint)} 
                            subtract={subtract(setEndTimePoint)}
                        />
                    </div>
                </div>
                <div className="audioCard-tools_right flex-column align-end">
                    <div className="audioCard-pluggins">
                        <Volume volume={data.volume} id={props.id}/>
                        <Switcher effect={data.panner} name="panner" title="panner effect"/>
                        <Switcher effect={data.delay} name="delay" title="delay effect"/>
                        <Switcher effect={data.filter} name="filter" title="filter effect"/>
                        <Switcher effect={data.playBackRate} name="rate" title="random playback rate"/>
                        <Switcher effect={data.randomCurrentTime}name="RCT" title="random change current time"/>
                    </div>
                </div>
            </div>
        </div>
    );
}