//@ts-check
import React, {useReducer, useContext} from "react";

import dispatch, {emptyDispatch} from "../../state/dispatch.js";
import {createGlobalPlaybackRate} from "../../state/factory.js";
import {playbackRateLimits} from "../../state/limits.js";

import {playbackRateReducer, playbackRateActions} from "../../slices/playbackRate.js";
import {generalDisableAction} from "../../slices/generalDisable.js";

import {rToPlaybackRate} from "../../core/maps.js";

import {GeneralDisableContext} from "../contexts/GeneralDisable.js";

import PanelConfigContainer from "./PanelConfigContainer.js";
import PanelInterval from "./PanelInterval.js";

let _playbackRateDispatch = emptyDispatch;

/**
@type {(value: boolean) => void} */
function changeDisable(value) {
    if (value) {
        dispatch.generalDisable(generalDisableAction("enable", "playbackRate", "global"));
    } else {
        dispatch.generalDisable(generalDisableAction("disable", "playbackRate", "global"));
    }
}

function reset() {
    _playbackRateDispatch(playbackRateActions.reset());
}

/**
@type {(val: string) => void} */
function minOnChange(val) {
    _playbackRateDispatch(
        playbackRateActions.changeMin(Number(val))
    );
}

/**
@type {(val: string) => void} */
function maxOnChange(val) {
    _playbackRateDispatch(
        playbackRateActions.changeMax(Number(val))
    );
}

/**
@type {(porp: {MAX: number}) => JSX.Element} */
function PlaybackRate({MAX}) {
    const {allPlaybackRatesAreDisabled}= useContext(GeneralDisableContext);
    const [
        {min, max},
        playbackRateDispatch
    ] = useReducer(playbackRateReducer, createGlobalPlaybackRate());

    _playbackRateDispatch = playbackRateDispatch;

    return (
        <PanelConfigContainer
            title="Playback Rate"
            description="The normal playback rate is multiplied by a random value inside the interval to obtain the current playback rate."
            DisableAllButtonEnabled
            ResetButtonEnabled
            changeDisable={changeDisable}
            disableValue={allPlaybackRatesAreDisabled.value}
            reset={reset}
        >
            <PanelInterval
                title="interval:"
                rangeMax={MAX}
                valueMax={max}
                valueMin={min}
                viewMax={rToPlaybackRate(max).toFixed(2)}
                viewMin={rToPlaybackRate(min).toFixed(2)}
                onChangeMax={maxOnChange}
                onChangeMin={minOnChange}
            />
        </PanelConfigContainer>
    );
}

function ContainPlaybackRate() {
    const {MAX} = playbackRateLimits;
    return (
        <PlaybackRate
            MAX={MAX}
        />
    );
}

export default ContainPlaybackRate;