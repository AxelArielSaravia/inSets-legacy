import {
    memo,
    useReducer,
    useEffect,
    useContext,
    useCallback,
    useMemo
} from "react";

import {
    GeneralDisableContext,
    AppContext,
    AudioListContext,
    SumOfAllAudiosEventsContext
} from "../../context/index.js";

import {ViewAudioReducer, createViewAudioState} from "../../reducer/index.js";

import {
    play,
    stop,
    setAudioVolume,
    deleteAudio,
    rePlay
} from "../../services/Audio/service.js";

import {
    durationToTime,
    durationToShortTime,
    floorPercent
} from "../utils.js";

import Button from "../../components/Button/component.js";
import AddAndSubtract from "../../components/AddAndSubtract/component.js";
import Range from "../../components/Range/component.js";
import {
    IconX,
    IconVolume,
    IconGear,
    IconPlay,
    IconPause
} from "../../components/icons/component.js";

import Playback from "./Playback/component.js";

import "./style.scss";

const style = {width: "80%"};

function DeleteButton({id, events, audioDispatch}) {
    const [, audioListDispatch] = useContext(AudioListContext);
    const [, sumOfAllEventsDispatch] = useContext(SumOfAllAudiosEventsContext);
    async function onClick() {
        await deleteAudio(id, audioListDispatch, audioDispatch);
        sumOfAllEventsDispatch({type: "subtract", payload: events});
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
                <div className="audio-configuration_playback p-5 flex-row align-c"
                    style={isDurationShort ? style : undefined}
                >
                    <PlayBackTimeText
                        isDurationShort={isDurationShort}
                        time={startTime}
                    />
                    <Playback
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
    const [{is_started, playAudiosSet, playColor}] = useContext(AppContext);
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
    }, audioDispatch] = useReducer(ViewAudioReducer, createViewAudioState(id));
    const [sumOfAllEvents, sumOfAllEventsdispatch] = useContext(SumOfAllAudiosEventsContext);
    const [{
        allDelaysAreDisabled,
        allFiltersAreDisabled,
        allPannersAreDisabled,
        allPlaybackRatesAreDisabled,
        allRandomEndPointsAreDisabled,
        allRandomStartPointsAreDisabled,
    }, generalDisableDispatch] = useContext(GeneralDisableContext);

    const isDurationShort = useMemo(() => duration < 2, [duration]);

    const probabilityPrecent = useMemo(
        () => floorPercent(sumOfAllEvents, audioEvents, 100),
        [audioEvents, sumOfAllEvents]
    );

    useEffect(function () {
        if (id in playAudiosSet) {
            rePlay(id, audioDispatch);
            audioDispatch({type: "color/change", payload: playColor});
        }
    }, [id, playAudiosSet]);

    useEffect(function () {
        if (!is_started) {
            stop(id, audioDispatch);
            audioDispatch({type: "color/default"});
        }
    }, [id, is_started]);

    useEffect(function () {
        if (allDelaysAreDisabled.value) {
            audioDispatch({type:"effect", payload:"delay/disable"});
        } else if (allDelaysAreDisabled.global) {
            audioDispatch({type:"effect", payload:"delay/enable"});
        }
    }, [allDelaysAreDisabled]);
    useEffect(function () {
        if (allFiltersAreDisabled.value) {
            audioDispatch({type:"effect", payload:"filter/disable"});
        } else if (allFiltersAreDisabled.global) {
            audioDispatch({type:"effect", payload:"filter/enable"});
        }
    }, [allFiltersAreDisabled]);
    useEffect(function () {
        if (allPannersAreDisabled.value) {
            audioDispatch({type:"effect", payload:"panner/disable"});
        } else if (allPannersAreDisabled.global) {
            audioDispatch({type:"effect", payload:"panner/enable"});
        }
    }, [allPannersAreDisabled]);
    useEffect(function () {
        if (allPlaybackRatesAreDisabled.value) {
            audioDispatch({type:"effect", payload:"playbackRate/disable"});
        } else if (allPlaybackRatesAreDisabled.global) {
            audioDispatch({type:"effect", payload:"playbackRate/enable"});
        }
    }, [allPlaybackRatesAreDisabled]);
    useEffect(function () {
        if (allRandomEndPointsAreDisabled.value) {
            audioDispatch({type:"effect", payload:"randomEndPoint/disable"});
        } else if (allRandomEndPointsAreDisabled.global) {
            audioDispatch({type:"effect", payload:"randomEndPoint/enable"});
        }
    }, [allRandomEndPointsAreDisabled]);
    useEffect(function () {
        if (allRandomStartPointsAreDisabled.value) {
            audioDispatch({type:"effect", payload:"randomStartPoint/disable"});
        } else if (allRandomStartPointsAreDisabled.global) {
            audioDispatch({type:"effect", payload:"randomStartPoint/enable"});
        }
    }, [allRandomStartPointsAreDisabled]);

    const changeDelay = useCallback(function () {
        if (delayIsDisable) {
            if (allDelaysAreDisabled.value) {
                generalDisableDispatch({type: "enable/delay", payload:false});
            }
            audioDispatch({type:"effect", payload:"delay/enable"});
        } else {
            audioDispatch({type:"effect", payload:"delay/disable"});
        }
    },[delayIsDisable, allDelaysAreDisabled, generalDisableDispatch]);

    const changeFilter = useCallback(function () {
        if (filterIsDisable) {
            if (allFiltersAreDisabled.value) {
                generalDisableDispatch({type: "enable/filter", payload:false});
            }
            audioDispatch({type:"effect", payload:"filter/enable"});
        } else {
            audioDispatch({type:"effect", payload:"filter/disable"});
        }
    },[filterIsDisable, allFiltersAreDisabled, generalDisableDispatch]);

    const changePanner = useCallback(function () {
        if (pannerIsDisable) {
            if (allPannersAreDisabled.value) {
                generalDisableDispatch({type: "enable/panner", payload:false});
            }
            audioDispatch({type:"effect", payload:"panner/enable"});
        } else {
            audioDispatch({type:"effect", payload:"panner/disable"});
        }
    },[pannerIsDisable, allPannersAreDisabled, generalDisableDispatch]);

    const changePlaybackRate = useCallback(function () {
        if (playbackRateIsDisable) {
            if (allPlaybackRatesAreDisabled.value) {
                generalDisableDispatch({type: "enable/playbackRate", payload:false});
            }
            audioDispatch({type:"effect", payload:"playbackRate/enable"});
        } else {
            audioDispatch({type:"effect", payload:"playbackRate/disable"});
        }
    },[playbackRateIsDisable, allPlaybackRatesAreDisabled, generalDisableDispatch]);

    const changeREP = useCallback(function () {
        if (randomEndPointIsDisable) {
            if (allRandomEndPointsAreDisabled.value) {
                generalDisableDispatch({type: "enable/randomEndPoint", payload:false});
            }
            audioDispatch({type:"effect", payload:"randomEndPoint/enable"});
        } else {
            audioDispatch({type:"effect", payload:"randomEndPoint/disable"});
        }
    },[randomEndPointIsDisable, allRandomEndPointsAreDisabled, generalDisableDispatch]);

    const changeRSP= useCallback(function () {
        if (randomStartPointIsDisable) {
            if (allRandomStartPointsAreDisabled.value) {
                generalDisableDispatch({type: "enable/randomStartPoint", payload:false});
            }
            audioDispatch({type:"effect", payload:"randomStartPoint/enable"});
        } else {
            audioDispatch({type:"effect", payload:"randomStartPoint/disable"});
        }
    },[randomStartPointIsDisable, allRandomStartPointsAreDisabled, generalDisableDispatch]);

    function addEvent() {
        if (audioEvents > 0 && sumOfAllEvents === audioEvents) {
            return;
        }
        if (audioEvents < 50) {
            sumOfAllEventsdispatch({type: "add"});
            audioDispatch({type: "audioEvents/add"});
        }
    }
    function subtractEvent() {
        if (audioEvents === 1 && sumOfAllEvents === 1) {
            return;
        }
        if (audioEvents > 1) {
            sumOfAllEventsdispatch({type: "subtract", payload: 1});
            audioDispatch({type: "audioEvents/subtract"});
        }
    }

    const changeVolume = useCallback(function (val) {
        audioDispatch({type: "volume/change", payload: Number(val)});
        setAudioVolume(id);
    }, [id]);

    const changeConfigurationsState = useCallback(function () {
        audioDispatch({type: "configuration/toggle"});
    }, []);

    const playOnClick = useCallback(function() {
        if (isPlaying) {
            stop(id, audioDispatch);
            audioDispatch({type: "color/default"});
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