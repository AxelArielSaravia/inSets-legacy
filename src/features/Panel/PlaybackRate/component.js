import { memo, useReducer, useContext, useCallback, useMemo } from "react";

import { initPlaybackRateState, PlaybackRateReducer } from "../../../reducer/index.js";

import { GeneralDisableContext } from "../../../context/index.js";

import ConfigPanelContainer from "../ConfigPanelContainer/component.js"
import ConfigPanelInterval from "../ConfigPanelInterval/component.js";

import {
    rangeValueToPlaybackRateValue,
    playbackRateValueToRangeValue
} from "../utils.js";

function PlaybackRate() {
    const [{allPlaybackRatesAreDisabled}, generalDisableDispatch] = useContext(GeneralDisableContext);
    const [ {min, max}, playbackRateDispatch ] = useReducer(PlaybackRateReducer, initPlaybackRateState());
    
    const minVal = useMemo(() => playbackRateValueToRangeValue(min * 100), [min]);
    const maxVal = useMemo(() => playbackRateValueToRangeValue(max * 100), [max]);

    
    const changeDisable = useCallback(() => {
        if (allPlaybackRatesAreDisabled.value) {
            generalDisableDispatch({type: "enable/playbackRate", payload: true})
        } else {
            generalDisableDispatch({type: "disable/playbackRate"})
        }
    },[allPlaybackRatesAreDisabled, generalDisableDispatch]);

    const reset = useCallback(() => {playbackRateDispatch({type: "reset"})}, [playbackRateDispatch]);

    const minOnChange = useCallback((val) => {
        playbackRateDispatch({type:"min/change", payload: rangeValueToPlaybackRateValue(+val)/100});
    }, [playbackRateDispatch]);

    const maxOnChange = useCallback((val) => {
        playbackRateDispatch({type:"max/change", payload: rangeValueToPlaybackRateValue(+val)/100});
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
                rangeMax={20}
                valueMin={minVal}
                valueMax={maxVal}
                viewMin={min.toFixed(2)}
                viewMax={max.toFixed(2)}
                onChangeMin={minOnChange}
                onChangeMax={maxOnChange}
            />
        </ConfigPanelContainer>
    );
}

export default memo(PlaybackRate);
