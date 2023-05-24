//@ts-check
import React, {
    memo,
    useReducer,
    useEffect,
    useContext,
    useCallback,
    useMemo
} from "react";

import globalState from "../../state/globalState.js";
import dispatch from "../../state/dispatch.js";
import {createAudioViewState} from "../../state/factory.js";

import {audioActions, audioReducer} from "../../slices/audio.js";
import {sumOfAllAudiosEventsActions} from "../../slices/sumOfAllAudiosEvents.js";
import {generalDisableAction} from "../../slices/generalDisable.js";

import {
    deleteAudio,
    play,
    rePlay,
    setAudioVolume,
    stop
} from "../../core/audio.js";

import {AppContext} from "../contexts/App.js";
import {GeneralDisableContext} from "../contexts/GeneralDisable.js";
import {SumOfAllAudiosEventsContext} from "../contexts/SumOfAllAudiosEvents.js";

import {
    durationToTime,
    durationToShortTime,
} from "../utils.js";

import Button from "../Button.js";
import AddAndSubtract from "../AddAndSubtract.js";
import Range from "../Range.js";
import {
    IconX,
    IconVolume,
    IconGear,
    IconPlay,
    IconPause
} from "../icons.js";
import AudioPlayback from "./AudioPlayback.js";

import "./AudioElement.scss";

const playbackStyle = {width: "80%"};

function DeleteButton({id, events}) {
    function onClick() {
        deleteAudio(id);
        dispatch.sumOfAllAudiosEvents(
            sumOfAllAudiosEventsActions.subtract(events)
        );
    }

    return (
        <Button
            className="audio-button delete-button flex-column align-c"
            onClick={onClick}
        >
            <IconX className="icon-text-l"/>
        </Button>
    );
}

function ConfigButton({value, change}) {
    const className = "audio-button config-button flex-column align-c";
    return (
        <Button
            className={value ? `${className} active` : className}
            onClick={change}
        >
            <IconGear className="icon-text-l"/>
        </Button>
    );
}

function Volume({changeVolume, volume}) {
    return (
        <div className="volume flex-row align-c">
            <IconVolume className="icon-text-l"/>
            <Range
                max="1"
                step="0.1"
                value={volume}
                onChange={changeVolume}
            />
        </div>
    );
}

function EffectButton({text, onClick, isDisable}) {
    return (
        <div className="effect-button">
            <Button
                className={isDisable ? "inactive" : ""}
                onClick={onClick}
            >
                <p className="fs-text-s">{text}</p>
            </Button>
        </div>
    );
}

function PlayButton({isPlaying, playOnClick}) {
    return (
        <Button
            className="audio-button flex-column align-c"
            onClick={playOnClick}
        >
            {isPlaying
                ? <IconPause className="icon-text-l icon-play"/>
                : <IconPlay className="icon-text-l icon-play"/>
            }
        </Button>
    );
}

function PlayBackTimeText({
    isDurationShort,
    time
}) {
    return (
        <div className="playback_time-text">
            {isDurationShort
            ? <p className="fs-text">{durationToShortTime(time)}</p>
            : <p className="fs-text">{durationToTime(time)}</p>
            }
        </div>
    );
}

function Configuration({
    id,
    configurationIsOpen,
    isDurationShort,
    startPoint,
    startTime,
    duration,
    endPoint,
    endTime,
    currentTime,
    audioDispatch,
    audioEvents,
    subtractEvent,
    addEvent,
    delayIsDisable,
    changeDelay,
    filterIsDisable,
    changeFilter,
    pannerIsDisable,
    changePanner,
    playbackRateIsDisable,
    changePlaybackRate,
    randomEndPointIsDisable,
    changeREP,
    randomStartPointIsDisable,
    changeRSP,
    probabilityPrecent
}) {
    if (!configurationIsOpen) {
        return;
    }
    return (
        <section className="audio-configuration flex-column">
            { duration > 0.5 && (
                <div className="audio-configuration_playback--prev flex-row align-c justify-c">
                    <div
                        className="audio-configuration_playback p-5 flex-row align-c"
                        style={isDurationShort ? playbackStyle : undefined}
                    >
                        <PlayBackTimeText
                            isDurationShort={isDurationShort}
                            time={startTime}
                        />
                        <AudioPlayback
                            id={id}
                            duration={duration}
                            endPoint={endPoint}
                            startPoint={startPoint}
                            startTime={startTime}
                            endTime={endTime}
                            currentTime={currentTime}
                            audioDispatch={audioDispatch}
                        />
                        <PlayBackTimeText
                            isDurationShort={isDurationShort}
                            time={endTime}
                        />
                    </div>
                </div>
            )}
            <div className="flex-row flex-wrap">
                <div className="audio-configuration_probability flex-row align-c">
                    <span className="fs-text">Probability:</span>
                    <span className="percent fs-text text-bold text-center">{probabilityPrecent + "%"}</span>
                    <div className="">
                        <AddAndSubtract
                            viewValue={audioEvents}
                            subtractOnClick={subtractEvent}
                            addOnClick={addEvent}
                            horizontal
                        />
                    </div>
                </div>
                <div className="audio-configuration_effects flex-row p-5">
                    <span className="fs-text py-5">Enabled effects:</span>
                    <div className="flex-row flex-wrap align-c">
                        <EffectButton
                            isDisable={delayIsDisable}
                            text="delay"
                            onClick={changeDelay}
                        />
                        <EffectButton
                            isDisable={filterIsDisable}
                            text="filter"
                            onClick={changeFilter}
                        />
                        <EffectButton
                            isDisable={pannerIsDisable}
                            text="panner"
                            onClick={changePanner}
                        />
                        <EffectButton
                            isDisable={playbackRateIsDisable}
                            text="rate"
                            onClick={changePlaybackRate}
                        />
                        {duration > 0.5 && (
                            <>
                                <EffectButton
                                    isDisable={randomEndPointIsDisable}
                                    text="REP"
                                    onClick={changeREP}
                                />
                                <EffectButton
                                    isDisable={randomStartPointIsDisable}
                                    text="RSP"
                                    onClick={changeRSP}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

/**@type {(props:{id: string}) => JSX.Element} */
function AudioElement({id}) {
    /**@type {[AudioViewState, React.Dispatch<Maybe<AudioViewAction>>]} */
    const [audioState, audioDispatch] = useReducer(audioReducer, createAudioViewState(id));
    const audio = globalState.audioList.get(id);
    if (audio !== undefined) {
        audio.dispatch = audioDispatch;
    }
    const {
        color,
        title,
        duration,
        endPoint,
        startPoint,
        startTime,
        endTime,
        isPlaying,
        currentTime,
        volume,
        configurationIsOpen,
        audioEvents,
        delayIsDisable,
        filterIsDisable,
        pannerIsDisable,
        playbackRateIsDisable,
        randomEndPointIsDisable,
        randomStartPointIsDisable
    } = audioState;
    const {
        isStarted,
        audiosSet,
        playColor,
        playAudiosFromSet
    } = useContext(AppContext);
    const sumOfAllEvents = useContext(SumOfAllAudiosEventsContext);

    const {
        allDelaysAreDisabled,
        allFiltersAreDisabled,
        allPannersAreDisabled,
        allPlaybackRatesAreDisabled,
        allRandomEndPointsAreDisabled,
        allRandomStartPointsAreDisabled,
    } = useContext(GeneralDisableContext);

    const isDurationShort = useMemo(() => duration <= 60, [duration]);

    const probabilityPrecent = useMemo(
        function floorPercent() {
            if (sumOfAllEvents <= 0) {
                return 0;
            }
            return Math.floor((audioEvents * 100) / sumOfAllEvents);
        },
        [audioEvents, sumOfAllEvents]
    );

    useEffect(function () {
        if ((playAudiosFromSet && audiosSet[id] === true)
            || (!playAudiosFromSet && audiosSet[id] !== true)
        ) {
            rePlay(id);
            audioDispatch(audioActions.changeColor(playColor));
        }
    }, [id, audiosSet, playAudiosFromSet]);

    //STOP EFFECT
    //if the the app was stoped stop the audio
    useEffect(function () {
        if (!isStarted) {
            stop(id);
            audioDispatch(audioActions.colorToDefault);
        }
    }, [id, isStarted]);

    useEffect(function () {
        if (allDelaysAreDisabled.value) {
            audioDispatch(audioActions.disable("delay", id));
        } else if (allDelaysAreDisabled.global) {
            audioDispatch(audioActions.enable("delay", id));
        }
    }, [allDelaysAreDisabled, id]);

    useEffect(function () {
        if (allFiltersAreDisabled.value) {
            audioDispatch(audioActions.disable("filter", id));
        } else if (allFiltersAreDisabled.global) {
            audioDispatch(audioActions.enable("filter", id));
        }
    }, [allFiltersAreDisabled, id]);

    useEffect(function () {
        if (allPannersAreDisabled.value) {
            audioDispatch(audioActions.disable("panner", id));
        } else if (allPannersAreDisabled.global) {
            audioDispatch(audioActions.enable("panner", id));
        }
    }, [allPannersAreDisabled, id]);

    useEffect(function () {
        if (allPlaybackRatesAreDisabled.value) {
            audioDispatch(audioActions.disable("playbackRate", id));
        } else if (allPlaybackRatesAreDisabled.global) {
            audioDispatch(audioActions.enable("playbackRate", id));
        }
    }, [allPlaybackRatesAreDisabled, id]);

    useEffect(function () {
        if (allRandomEndPointsAreDisabled.value) {
            audioDispatch(audioActions.disable("randomEndPoint", id));
        } else if (allRandomEndPointsAreDisabled.global) {
            audioDispatch(audioActions.enable("randomEndPoint", id));
        }
    }, [allRandomEndPointsAreDisabled, id]);

    useEffect(function () {
        if (allRandomStartPointsAreDisabled.value) {
            audioDispatch(audioActions.disable("randomStartPoint", id));
        } else if (allRandomStartPointsAreDisabled.global) {
            audioDispatch(audioActions.enable("randomStartPoint", id));
        }
    }, [allRandomStartPointsAreDisabled, id]);

    const changeDelay = useCallback(function () {
        if (delayIsDisable) {
            if (allDelaysAreDisabled.value) {
                dispatch.generalDisable(generalDisableAction("enable", "delay", "local"));
            }
            audioDispatch(audioActions.enable("delay", id));
        } else {
            audioDispatch(audioActions.disable("delay", id));
        }
    },[delayIsDisable, allDelaysAreDisabled, id]);

    const changeFilter = useCallback(function () {
        if (filterIsDisable) {
            if (allFiltersAreDisabled.value) {
                dispatch.generalDisable(generalDisableAction("enable", "filter", "local"));
            }
            audioDispatch(audioActions.enable("filter", id));
        } else {
            audioDispatch(audioActions.disable("filter", id));
        }
    },[filterIsDisable, allFiltersAreDisabled, id]);

    const changePanner = useCallback(function () {
        if (pannerIsDisable) {
            if (allPannersAreDisabled.value) {
                dispatch.generalDisable(generalDisableAction("enable", "panner", "local"));
            }
            audioDispatch(audioActions.enable("panner", id));
        } else {
            audioDispatch(audioActions.disable("panner", id));
        }
    },[pannerIsDisable, allPannersAreDisabled, id]);

    const changePlaybackRate = useCallback(function () {
        if (playbackRateIsDisable) {
            if (allPlaybackRatesAreDisabled.value) {
                dispatch.generalDisable(generalDisableAction("enable", "playbackRate", "local"));
            }
            audioDispatch(audioActions.enable("playbackRate", id));
        } else {
            audioDispatch(audioActions.disable("playbackRate", id));
        }
    },[playbackRateIsDisable, allPlaybackRatesAreDisabled, id]);

    const changeREP = useCallback(function () {
        if (randomEndPointIsDisable) {
            if (allRandomEndPointsAreDisabled.value) {
                dispatch.generalDisable(generalDisableAction("enable", "randomEndPoint", "local"));
            }
            audioDispatch(audioActions.enable("randomEndPoint", id));
        } else {
            audioDispatch(audioActions.disable("randomEndPoint", id));
        }
    },[randomEndPointIsDisable, allRandomEndPointsAreDisabled, id]);

    const changeRSP = useCallback(function () {
        if (randomStartPointIsDisable) {
            if (allRandomStartPointsAreDisabled.value) {
                dispatch.generalDisable(generalDisableAction("enable", "randomStartPoint", "local"));
            }
            audioDispatch(audioActions.enable("randomStartPoint", id));
        } else {
            audioDispatch(audioActions.disable("randomStartPoint", id));
        }
    },[randomStartPointIsDisable, allRandomStartPointsAreDisabled, id]);

    function addEvent() {
        if (audioEvents > 0 && sumOfAllEvents === audioEvents) {
            return;
        }
        if (audioEvents < 50) {
            dispatch.sumOfAllAudiosEvents(sumOfAllAudiosEventsActions.add());
            audioDispatch(audioActions.addAudioEvents(id));
        }
    }
    function subtractEvent() {
        if (audioEvents === 1 && sumOfAllEvents === 1) {
            return;
        }
        if (audioEvents > 1) {
            dispatch.sumOfAllAudiosEvents(sumOfAllAudiosEventsActions.subtractOne());
            audioDispatch(audioActions.subtractAudioEvents(id));
        }
    }

    const changeVolume = useCallback(function (val) {
        audioDispatch(audioActions.changeVolume(id, Number(val)));
        setAudioVolume(id);
    }, [id]);

    const changeConfigurationsState = useCallback(function () {
        audioDispatch(audioActions.configurationToggler);
    }, []);

    const playOnClick = useCallback(function() {
        if (isPlaying) {
            stop(id);
            audioDispatch(audioActions.colorToDefault);
        } else {
            play(id);
        }
    },[id, isPlaying]);

    return (
        <div
            className="audio-element flex-column p-5"
            style={(
                color
                ? {
                    "--audio-color": color,
                    outlineColor: color
                }
                : undefined
            )}
        >
            <section className="audio-element_header flex-row align-c justify-sb p-2">
                <PlayButton isPlaying={isPlaying} playOnClick={playOnClick}/>
                <Button
                    className="audio-element_title flex-row align-c ellipsis"
                    onClick={playOnClick}
                >
                    <h3 className="fs-text ellipsis">{title}</h3>
                </Button>
                <Volume volume={volume} changeVolume={changeVolume}/>
                <div className="px-10">
                    <ConfigButton value={configurationIsOpen} change={changeConfigurationsState}/>
                </div>
                <DeleteButton
                    id={id}
                    events={audioEvents}
                />
            </section>
            <Configuration
                id={id}
                configurationIsOpen={configurationIsOpen}
                isDurationShort={isDurationShort}
                startPoint={startPoint}
                startTime={startTime}
                duration={duration}
                endPoint={endPoint}
                endTime={endTime}
                currentTime={currentTime}
                audioDispatch={audioDispatch}
                audioEvents={audioEvents}
                subtractEvent={subtractEvent}
                addEvent={addEvent}
                delayIsDisable={delayIsDisable}
                changeDelay={changeDelay}
                filterIsDisable={filterIsDisable}
                changeFilter={changeFilter}
                pannerIsDisable={pannerIsDisable}
                changePanner={changePanner}
                playbackRateIsDisable={playbackRateIsDisable}
                changePlaybackRate={changePlaybackRate}
                randomEndPointIsDisable={randomEndPointIsDisable}
                changeREP={changeREP}
                randomStartPointIsDisable={randomStartPointIsDisable}
                changeRSP={changeRSP}
                probabilityPrecent={probabilityPrecent}
            />
        </div>
    );
}

export default memo(AudioElement);