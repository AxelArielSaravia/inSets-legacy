import { memo, useCallback } from "react";

import { play, stop, setAudioVolume, deleteAudio } from "../../../services/Audio/index.js"

import { IconX, IconPlay, IconPause } from "../../../icons/index.js";

import Switcher from "../AudioCardSwitch/component.js";
import TimeText from "../AudioCardTimeText/component.js";
import TimeLine from "../AudioCardTimeLine/component.js";
import Volume from "../AudioCardVolume/component.js";
import ProbabilityButton from "../AudioCardProbability/component.js"

import "./style.scss";

export default memo(function AudioCard({
    _ID, 
    audioState, 
    audioDispatcher,
    globalDispatcher,
    totalAudioProbabilityPoints,
    delayAreAllDisable,
    filterAreAllDisable,
    pannerAreAllDisable,
    playBackRateAreAllDisable,
    randomStartPointAreAllDisable,
    APP_IS_STARTED
}) {
    const color = audioState.color;
    const delayIsDisable = audioState.delayIsDisable;
    const duration = audioState.duration;
    const endTime =  audioState.endTime;
    const filterIsDisable = audioState.filterIsDisable;
    const isPlaying = audioState.isPlaying;
    const pannerIsDisable = audioState.pannerIsDisable;
    const playBackRateIsDisable = audioState.playBackRateIsDisable;
    const probability = audioState.probability
    const randomStartPointIsDisable = audioState.randomStartPointIsDisable;
    const startPoint = audioState.startPoint;
    const startTime = audioState.startTime;
    const title = audioState.title;
    const volume = Math.floor(audioState.volume * 10);

    const style = APP_IS_STARTED && isPlaying && color ? {boxShadow:"0 0 2px 2px " +  color} : {};

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
        <div className="audioCard" style={style}>
            <div className="audioCard-head grid align-c justify-sb">
                <h4 className="fs-text ellipsis">{title}</h4>
                <ProbabilityButton
                    totalAudioProbabilityPoints={totalAudioProbabilityPoints}
                    probabilityOperation={probabilityOperation}
                    probability={probability}
                />
                <button 
                    type="button" 
                    className="delete-button"
                    onClick={deleteHandleOnClick}
                >
                    <IconX className="icon"/>
                </button>
            </div>
            <div className="audioCard-tools flex-row">
                <div className="audioCard-tools_left flex-column align-c">
                    <TimeLine 
                        APP_IS_STATERD={APP_IS_STARTED}
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
                                className="flex-column align-c"
                                onClick={onClickPlay}
                            >
                                { isPlaying
                                    ? <IconPause className="icon"/>
                                    : <IconPlay className="icon"/>
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
});
