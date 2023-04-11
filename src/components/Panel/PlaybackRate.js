import {
    useReducer,
    useContext
} from "react";

import {playbackRateReducer, playbackRateActions} from "../../slices/playbackRate.js";
import {generalDisableAction} from "../../slices/generalDisable.js";

import {createPlaybackRateInitialState} from "../initialState.js";
import {playbackRateLimits} from "../../state/limits.js";

import {GeneralDisableContext} from "../contexts/GeneralDisable.js";

import {rToPlaybackRate} from "../../core/maps.js";

import {undefinedFunction} from "../utils.js";

import PanelConfigContainer from "./PanelConfigContainer.js";
import PanelInterval from "./PanelInterval.js";

let _generalDisableDispatch = undefinedFunction;
let _playbackRateDispatch = undefinedFunction;

function changeDisable(value) {
    if (value) {
        _generalDisableDispatch(generalDisableAction("enable", "playbackRate", "global"));
    } else {
        _generalDisableDispatch(generalDisableAction("disable", "playbackRate"));
    }
}

function reset() {
    _playbackRateDispatch(playbackRateActions.reset());
}

function minOnChange(val) {
    _playbackRateDispatch(
        playbackRateActions.changeMin(Number(val))
    );
}

function maxOnChange(val) {
    _playbackRateDispatch(
        playbackRateActions.changeMax(Number(val))
    );
}

function PlaybackRate({MAX}) {
    const [
        {allPlaybackRatesAreDisabled},
        generalDisableDispatch
    ] = useContext(GeneralDisableContext);
    const [
        {min, max},
        playbackRateDispatch
    ] = useReducer(playbackRateReducer, createPlaybackRateInitialState());

    _generalDisableDispatch = generalDisableDispatch;
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