import { memo, useReducer, useContext, useCallback } from "react";

import { initPannerState, PannerReducer } from "../../../reducer/index.js";

import { GeneralDisableContext } from "../../../context/index.js";

import ConfigPanelContainer from "../ConfigPanelContainer/component.js"
import ConfigPanelInterval from "../ConfigPanelInterval/component.js";

function Panner() {
    const [{allPannersAreDisabled}, generalDisableDispatch] = useContext(GeneralDisableContext);
    const [{
        xMax,
        xMin,
        yMax,
        yMin,
        zMax,
        zMin
    }, pannerDispatch] = useReducer(PannerReducer, initPannerState());


    const changeDisable = useCallback(function () {
        if (allPannersAreDisabled.value) {
            generalDisableDispatch({type: "enable/panner", payload: true})
        } else {
            generalDisableDispatch({type: "disable/panner"})
        }
    },[allPannersAreDisabled, generalDisableDispatch]);

    const reset = useCallback(function () {
        pannerDispatch({type: "reset"});
    }, []);

    const xMinOnChange = useCallback(function (val) {
        pannerDispatch({type:"x/changeMin", payload: +val - 50});
    }, [pannerDispatch]);
    const xMaxOnChange = useCallback(function (val) {
        pannerDispatch({type:"x/changeMax", payload: +val - 50});
    }, [pannerDispatch]);
    const yMinOnChange = useCallback(function (val) {
        pannerDispatch({type:"y/changeMin", payload: +val - 50});
    }, [pannerDispatch]);
    const yMaxOnChange = useCallback(function (val) {
        pannerDispatch({type:"y/changeMax", payload: +val - 50});
    }, [pannerDispatch]);
    const zMinOnChange = useCallback(function (val) {
        pannerDispatch({type:"z/changeMin", payload: +val});
    }, [pannerDispatch]);
    const zMaxOnChange = useCallback(function (val) {
        pannerDispatch({type:"z/changeMax", payload: +val});
    }, [pannerDispatch]);

    return (
        <ConfigPanelContainer
            title="Panner"
            description="Change the intervals that represents a position of the audio in a right-hand Cartesian coordinate system."
            addDisableAllButton
            changeDisable={changeDisable}
            disableValue={allPannersAreDisabled.value}
            addResetButton
            reset={reset}
        >
            <ConfigPanelInterval
                title="X interval:"
                valueText="%"
                viewMin={xMin}
                valueMin={xMin + 50}
                viewMax={xMax}
                valueMax={xMax + 50}
                onChangeMin={xMinOnChange}
                onChangeMax={xMaxOnChange}
            />
            <ConfigPanelInterval
                title="Y interval:"
                valueText="%"
                viewMin={yMin}
                valueMin={yMin + 50}
                viewMax={yMax}
                valueMax={yMax + 50}
                onChangeMin={yMinOnChange}
                onChangeMax={yMaxOnChange}
            />
            <ConfigPanelInterval
                title="Z interval:"
                valueText="%"
                viewMin={zMin}
                valueMin={zMin}
                viewMax={zMax}
                valueMax={zMax}
                rangeMax={50}
                onChangeMin={zMinOnChange}
                onChangeMax={zMaxOnChange}
            />
        </ConfigPanelContainer>
    );
}

export default memo(Panner);