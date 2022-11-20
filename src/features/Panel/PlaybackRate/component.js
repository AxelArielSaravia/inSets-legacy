import {
    memo,
    useReducer,
    useContext,
    useCallback,
    useMemo
} from "react";

import {initPlaybackRateState, PlaybackRateReducer} from "../../../reducer/index.js";

import {GeneralDisableContext} from "../../../context/index.js";

import {playbackRateLimits} from "../../../services/limits/service.js";
import {rToPlaybackRate} from "../../../services/convert/service.js";

import ConfigPanelContainer from "../ConfigPanelContainer/component.js";
import ConfigPanelInterval from "../ConfigPanelInterval/component.js";

function PlaybackRate({MAX}) {
    const [
        {allPlaybackRatesAreDisabled},
        generalDisableDispatch
    ] = useContext(GeneralDisableContext);
    const [
        {min, max},
        playbackRateDispatch
    ] = useReducer(PlaybackRateReducer, initPlaybackRateState());

    const viewMax = useMemo(() => rToPlaybackRate(max).toFixed(2), [max]);
    const viewMin = useMemo(() => rToPlaybackRate(min).toFixed(2), [min]);

    const changeDisable = useCallback(function () {
        if (allPlaybackRatesAreDisabled.value) {
            generalDisableDispatch({type: "enable/playbackRate", payload: true});
        } else {
            generalDisableDispatch({type: "disable/playbackRate"});
        }
    },[allPlaybackRatesAreDisabled, generalDisableDispatch]);

    const reset = useCallback(function () {
        playbackRateDispatch({type: "reset"});
    }, [playbackRateDispatch]);

    const minOnChange = useCallback(function (val) {
        playbackRateDispatch({
            type:"min/change",
            payload: Number(val)
        });
    }, [playbackRateDispatch]);

    const maxOnChange = useCallback(function (val) {
        playbackRateDispatch({
            type:"max/change",
            payload: Number(val)
        });
    }, [playbackRateDispatch]);

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
                viewMax={viewMax}
                viewMin={viewMin}
                onChangeMax={maxOnChange}
                onChangeMin={minOnChange}
            />
        </ConfigPanelContainer>
    );
}

function ContainPlaybackRate() {
    const {MAX} = playbackRateLimits();
    return (
        <PlaybackRate
            MAX={MAX}
        />
    );
}

export default ContainPlaybackRate;
