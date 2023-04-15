import {
    memo,
    useReducer,
    useEffect,
    useContext,
    useCallback,
    useMemo
} from "react";

import {GeneralDisableContext} from "../contexts/GeneralDisable.js";
import {AppContext} from "../contexts/App.js";
import {AudioListContext} from "../contexts/AudioList.js";
import {SumOfAllAudiosEventsContext} from "../contexts/SumOfAllAudiosEvents.js";
import {audioActions} from "../../slices/audio.js";

import {audioReducer} from "../../slices/audio.js";
import {createAudioInitialState} from "../initialState.js";
import {sumOfAllAudiosEventsActions} from "../../slices/sumOfAllAudiosEvents.js";
import {generalDisableAction} from "../../slices/generalDisable.js";

import {
    deleteAudio,
    play,
    rePlay,
    setAudioVolume,
    stop
} from "../../core/audio.js";

import {
    durationToTime,
    durationToShortTime,
    floorPercent
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

function DeleteButton({id, events, audioDispatch}) {
    const [, audioListDispatch] = useContext(AudioListContext);
    const [, sumOfAllAudiosEventsDispatch] = useContext(SumOfAllAudiosEventsContext);

    function onClick() {
        deleteAudio(id, audioListDispatch, audioDispatch);
        sumOfAllAudiosEventsDispatch(
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
            { isPlaying
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
                    </div>
                </div>
            </div>
        </section>
    );
}

function AudioElement({id}) {
    const [{isStarted, playAudiosSet, playColor, state}] = useContext(AppContext);

    const [{
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
    }, audioDispatch] = useReducer(audioReducer, createAudioInitialState(id));

    const [sumOfAllEvents, sumOfAllEventsdispatch] = useContext(SumOfAllAudiosEventsContext);

    const [{
        allDelaysAreDisabled,
        allFiltersAreDisabled,
        allPannersAreDisabled,
        allPlaybackRatesAreDisabled,
        allRandomEndPointsAreDisabled,
        allRandomStartPointsAreDisabled,
    }, generalDisableDispatch] = useContext(GeneralDisableContext);

    const isDurationShort = useMemo(() => duration <= 60, [duration]);

    const probabilityPrecent = useMemo(
        () => floorPercent(sumOfAllEvents, audioEvents, 100),
        [audioEvents, sumOfAllEvents]
    );

    useEffect(function () {
        if ((state && id in playAudiosSet)
            || (!state && !(id in playAudiosSet))
        ) {
            rePlay(id, audioDispatch);
            audioDispatch(audioActions.changeColor(playColor));
        }
    }, [id, playAudiosSet, state]);

    //STOP EFFECT
    //if the the app was stoped stop the audio
    useEffect(function () {
        if (!isStarted) {
            stop(id, audioDispatch);
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
                generalDisableDispatch(generalDisableAction("enable", "delay", "local"));
            }
            audioDispatch(audioActions.enable("delay", id));
        } else {
            audioDispatch(audioActions.disable("delay", id));
        }
    },[delayIsDisable, allDelaysAreDisabled, generalDisableDispatch, id]);

    const changeFilter = useCallback(function () {
        if (filterIsDisable) {
            if (allFiltersAreDisabled.value) {
                generalDisableDispatch(generalDisableAction("enable", "filter", "local"));
            }
            audioDispatch(audioActions.enable("filter", id));
        } else {
            audioDispatch(audioActions.disable("filter", id));
        }
    },[filterIsDisable, allFiltersAreDisabled, generalDisableDispatch, id]);

    const changePanner = useCallback(function () {
        if (pannerIsDisable) {
            if (allPannersAreDisabled.value) {
                generalDisableDispatch(generalDisableAction("enable", "panner", "local"));
            }
            audioDispatch(audioActions.enable("panner", id));
        } else {
            audioDispatch(audioActions.disable("panner", id));
        }
    },[pannerIsDisable, allPannersAreDisabled, generalDisableDispatch, id]);

    const changePlaybackRate = useCallback(function () {
        if (playbackRateIsDisable) {
            if (allPlaybackRatesAreDisabled.value) {
                generalDisableDispatch(generalDisableAction("enable", "playbackRate", "local"));
            }
            audioDispatch(audioActions.enable("playbackRate", id));
        } else {
            audioDispatch(audioActions.disable("playbackRate", id));
        }
    },[playbackRateIsDisable, allPlaybackRatesAreDisabled, generalDisableDispatch, id]);

    const changeREP = useCallback(function () {
        if (randomEndPointIsDisable) {
            if (allRandomEndPointsAreDisabled.value) {
                generalDisableDispatch(generalDisableAction("enable", "randomEndPoint", "local"));
            }
            audioDispatch(audioActions.enable("randomEndPoint", id));
        } else {
            audioDispatch(audioActions.disable("randomEndPoint", id));
        }
    },[randomEndPointIsDisable, allRandomEndPointsAreDisabled, generalDisableDispatch, id]);

    const changeRSP= useCallback(function () {
        if (randomStartPointIsDisable) {
            if (allRandomStartPointsAreDisabled.value) {
                generalDisableDispatch(generalDisableAction("enable", "randomStartPoint", "local"));
                generalDisableDispatch({type: "enable/randomStartPoint", payload:false});
            }
            audioDispatch(audioActions.enable("randomStartPoint", id));
        } else {
            audioDispatch(audioActions.disable("randomStartPoint", id));
        }
    },[randomStartPointIsDisable, allRandomStartPointsAreDisabled, generalDisableDispatch, id]);

    function addEvent() {
        if (audioEvents > 0 && sumOfAllEvents === audioEvents) {
            return;
        }
        if (audioEvents < 50) {
            sumOfAllEventsdispatch(sumOfAllAudiosEventsActions.add());
            audioDispatch(audioActions.addAudioEvents(id));
        }
    }
    function subtractEvent() {
        if (audioEvents === 1 && sumOfAllEvents === 1) {
            return;
        }
        if (audioEvents > 1) {
            sumOfAllEventsdispatch(sumOfAllAudiosEventsActions.subtractOne());
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
            stop(id, audioDispatch);
            audioDispatch(audioActions.colorToDefault);
        } else {
            play(id, audioDispatch);
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
                    audioDispatch={audioDispatch}
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
                sumOfAllEvents={sumOfAllEvents}
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