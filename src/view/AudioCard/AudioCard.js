import { memo, useCallback } from "react";
import { play, stop, setAudioVolume, deleteAudio } from "../../core/Globals.js"

import Switcher from "./AudioCard.Switch.js";
import TimeText from "./AudioCard.TimeText.js";
import TimeLine from "./AudioCard.TimeLine.js";
import Volume from "./AudioCard.Volume.js";
import ProbabilityButton from "./AudioCard.Probability.js"

import "./AudioCard.scss";

function AudioCard(props) {
    const _ID = props._ID;
    const globalDispatcher = props.globalDispatcher;
    const audioDispatcher = props.audioDispatcher;
    const color = props.color;
    const delayIsDisable = props.delayIsDisable;
    const duration = props.duration;
    const endTime =  props.endTime;
    const filterIsDisable = props.filterIsDisable;
    const isPlaying = props.isPlaying;
    const pannerIsDisable = props.pannerIsDisable;
    const playBackRateIsDisable = props.playBackRateIsDisable;
    const probability = props.probability
    const randomStartPointIsDisable = props.randomStartPointIsDisable;
    const startPoint = props.startPoint;
    const startTime = props.startTime;
    const title = props.title;
    const volume = Math.floor(props.volume * 10);

    const delayAreAllDisable= props.delayAreAllDisable;
    const filterAreAllDisable= props.filterAreAllDisable;
    const pannerAreAllDisable= props.pannerAreAllDisable;
    const playBackRateAreAllDisable= props.playBackRateAreAllDisable;
    const randomStartPointAreAllDisable= props.randomStartPointAreAllDisable;

    const APP_IS_STATERD = props.APP_IS_STARTED;

    const probabilityOperation = (type) => {
        if (type === "add") {
            audioDispatcher({id: _ID, type:"changeProbability", value: probability + 1});
        } else if (type === "subtract") {
            audioDispatcher({id: _ID, type:"changeProbability", value: probability - 1});
        }
    }

    const volumeOnClick = useCallback((e) => {
        const value = e.target.value / 10;
        audioDispatcher({
            id: _ID,
            type: "changeVolume",
            value: value
        });
        setAudioVolume(_ID);
    }, [_ID, audioDispatcher]);
    
    const operation = useCallback((o, type) => (timePoint) => {
        if (o === "add") {
            audioDispatcher({
                type: type,
                value: timePoint + 1,
                id: _ID
            });
        } else if (o === "subtract") {
            audioDispatcher({
                type: type,
                value: timePoint - 1, 
                id: _ID
            });
        }
    }, [audioDispatcher, _ID]);

    const deleteHandleOnClick = useCallback(() => {
        deleteAudio(_ID, globalDispatcher, audioDispatcher);
    }, [_ID, globalDispatcher, audioDispatcher]);

    const switchHandleOnClick = useCallback((AreAllDisable, isDisable, effectName) => {
        if (AreAllDisable) {

            globalDispatcher({variable: effectName, type: "areAllDisable/local"});
        }
        let actionType = isDisable ? "enable" : "disable";
        audioDispatcher({
            variable: effectName,
            id: _ID,
            type: actionType, 
        });
    }, [_ID, globalDispatcher, audioDispatcher])

    const switchHandleOnEffect = useCallback((effectName, value) => {
        let actionType = value ? "disable" : "enable";
        audioDispatcher({
            variable: effectName,
            id: _ID,
            type: actionType, 
        });
    }, [_ID, audioDispatcher])

    const onClickPlay = async () => {
        if (!isPlaying) {
            audioDispatcher({id:_ID, variable: "color", type: "default"});
            await play(_ID, audioDispatcher);
        } else {
            await stop(_ID, audioDispatcher);
        }
    }
  
    return (
        <div className="audioCard" style={APP_IS_STATERD && isPlaying && color ? {boxShadow:"0 0 2px 2px " +  color} : {}}>
            <div className="audioCard-head grid align-c justify-sb">
                <h4 className="fs-text ellipsis">{title}</h4>
                <ProbabilityButton
                    totalAudioProbabilityPoints={props.totalAudioProbabilityPoints}
                    probabilityOperation={probabilityOperation}
                    probability={probability}
                />
                <button 
                    type="button" 
                    className="delete-button"
                    onClick={deleteHandleOnClick}
                >
                    <i className="flex-row align-c fs-text-l bi bi-x"></i>
                </button>
            </div>
            <div className="audioCard-tools flex-row">
                <div className="audioCard-tools_left flex-column align-c">
                    <TimeLine 
                        APP_IS_STATERD={APP_IS_STATERD}
                        startTime={startTime} 
                        endTime={endTime} 
                        duration={duration} 
                        isPlaying={isPlaying}
                        startPoint={startPoint}
                        color={color}
                    />
                    <div className="audioCard-play flex-row align-center justify-c"> 
                        <TimeText 
                            data={startTime} 
                            time={startTime} 
                            add={operation("add", "changeStartTime")} 
                            subtract={operation("subtract", "changeStartTime")}
                        />
                        <div className="audioCard-play-button flex-column align-c justify-c">
                            <button 
                                type="button"
                                onClick={onClickPlay}
                            >
                                {isPlaying
                                    ? <i className="flex-row align-c fs-text-l bi bi-pause-fill"/>
                                    : <i className="flex-row align-c fs-text-l bi bi-play-fill"/>
                                }
                            </button>
                        </div>
                        <TimeText 
                            data={endTime} 
                            time={endTime} 
                            add={operation("add", "changeEndTime")} 
                            subtract={operation("subtract", "changeEndTime")}
                        />
                    </div>
                </div>
                <div className="audioCard-tools_right flex-column align-end">
                    <div className="audioCard-pluggins grid">
                        <Volume 
                            volume={volume} 
                            handleOnClick={volumeOnClick}
                        />
                        <Switcher
                            AreAllDisable={pannerAreAllDisable}
                            effectName="panner"
                            handleOnClick={switchHandleOnClick}
                            handleOnEffect={switchHandleOnEffect}
                            isDisable={pannerIsDisable}
                            name="panner"
                            title="panner effect"
                        />
                        <Switcher
                            AreAllDisable={delayAreAllDisable}
                            effectName="delay"
                            handleOnClick={switchHandleOnClick}
                            handleOnEffect={switchHandleOnEffect}
                            isDisable={delayIsDisable}
                            name="delay" 
                            title="delay effect"
                        />
                        <Switcher
                            AreAllDisable={filterAreAllDisable}
                            effectName="filter"
                            handleOnClick={switchHandleOnClick}
                            handleOnEffect={switchHandleOnEffect}
                            isDisable={filterIsDisable}
                            name="filter" 
                            title="filter effect"
                        />
                        <Switcher
                            AreAllDisable={playBackRateAreAllDisable}
                            effectName="playBackRate"
                            handleOnClick={switchHandleOnClick}
                            handleOnEffect={switchHandleOnEffect}
                            isDisable={playBackRateIsDisable} 
                            name="rate"
                            title="random playback rate"
                        />
                        <Switcher
                            AreAllDisable={randomStartPointAreAllDisable}
                            effectName="randomStartPoint"
                            handleOnClick={switchHandleOnClick}
                            handleOnEffect={switchHandleOnEffect}
                            isDisable={randomStartPointIsDisable}
                            name="RSP" 
                            title="Random Start Point"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
    
};

export default memo(AudioCard);