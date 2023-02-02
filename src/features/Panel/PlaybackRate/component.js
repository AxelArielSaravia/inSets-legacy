import {
    useReducer,
    useContext
} from "react";

import {initPlaybackRateState, PlaybackRateReducer} from "../../../reducer/index.js";

import {GeneralDisableContext} from "../../../context/index.js";

import {playbackRateLimits} from "../../../services/limits/service.js";
import {rToPlaybackRate} from "../../../services/convert/service.js";

import {undefinedFunction} from "../../utils.js";

import ConfigPanelContainer from "../ConfigPanelContainer/component.js";
import ConfigPanelInterval from "../ConfigPanelInterval/component.js";


let _generalDisableDispatch = undefinedFunction;
let _playbackRateDispatch = undefinedFunction;

function changeDisable(value) {
    if (value) {
        _generalDisableDispatch({type: "enable/playbackRate", payload: true});
    } else {
        _generalDisableDispatch({type: "disable/playbackRate"});
    }
}

function reset() {
    _playbackRateDispatch({type: "reset"});
}

function minOnChange(val) {
    _playbackRateDispatch({
        type:"min/change",
        payload: Number(val)
    });
}

function maxOnChange(val) {
    _playbackRateDispatch({
        type:"max/change",
        payload: Number(val)
    });
}

function PlaybackRate({MAX}) {
    const [
        {allPlaybackRatesAreDisabled},
        generalDisableDispatch
    ] = useContext(GeneralDisableContext);
    const [
        {min, max},
        playbackRateDispatch
    ] = useReducer(PlaybackRateReducer, initPlaybackRateState());
    _generalDisableDispatch = generalDisableDispatch;
    _playbackRateDispatch = playbackRateDispatch;
    return (
        <ConfigPanelContainer
            title="Playback Rate"
            description="The normal playback rate is multiplied by a random value inside the interval to obtain the current playback rate."
            addDisableAllButton
            addResetButton
            changeDisable={changeDisable}
            disableValue={allPlaybackRatesAreDisabled.value}
            reset={reset}
        >
            <ConfigPanelInterval
                title="interval:"
                rangeMax={MAX}
                valueMax={max}
                valueMin={min}
                viewMax={rToPlaybackRate(max).toFixed(2)}
                viewMin={rToPlaybackRate(min).toFixed(2)}
                onChangeMax={maxOnChange}
                onChangeMin={minOnChange}
            />
        </ConfigPanelContainer>
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
