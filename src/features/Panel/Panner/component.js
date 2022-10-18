import {
    memo,
    useReducer,
    useContext,
    useCallback,
    useMemo
} from "react";

import {initPannerState, PannerReducer} from "../../../reducer/index.js";

import {GeneralDisableContext} from "../../../context/index.js";

import {pannerLimits} from "../../../services/limits/service.js";
import {rToPanner} from "../../../services/convert/service.js";

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

    const {Z_MAX, MAX} = useMemo(() => pannerLimits(), []);

    const viewXMax = useMemo(() => rToPanner(xMax), [xMax]);
    const viewXMin = useMemo(() => rToPanner(xMin), [xMin]);
    const viewYMax = useMemo(() => rToPanner(yMax), [yMax]);
    const viewYMin = useMemo(() => rToPanner(yMin), [yMin]);

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

    const xMaxOnChange = useCallback(function (val) {
        pannerDispatch({type:"x/changeMax", payload: Number(val)});
    }, [pannerDispatch]);
    const xMinOnChange = useCallback(function (val) {
        pannerDispatch({type:"x/changeMin", payload: Number(val)});
    }, [pannerDispatch]);
    const yMaxOnChange = useCallback(function (val) {
        pannerDispatch({type:"y/changeMax", payload: Number(val)});
    }, [pannerDispatch]);
    const yMinOnChange = useCallback(function (val) {
        pannerDispatch({type:"y/changeMin", payload: Number(val)});
    }, [pannerDispatch]);
    const zMaxOnChange = useCallback(function (val) {
        pannerDispatch({type:"z/changeMax", payload: Number(val)});
    }, [pannerDispatch]);
    const zMinOnChange = useCallback(function (val) {
        pannerDispatch({type:"z/changeMin", payload: Number(val)});
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
                valueMax={xMax}
                valueMin={xMin}
                viewMax={viewXMax}
                viewMin={viewXMin}
                rangeMax={MAX}
                onChangeMin={xMinOnChange}
                onChangeMax={xMaxOnChange}
            />
            <ConfigPanelInterval
                title="Y interval:"
                valueText="%"
                valueMax={yMax}
                valueMin={yMin}
                viewMax={viewYMax}
                viewMin={viewYMin}
                rangeMax={MAX}
                onChangeMin={yMinOnChange}
                onChangeMax={yMaxOnChange}
            />
            <ConfigPanelInterval
                title="Z interval:"
                valueText="%"
                valueMax={zMax}
                valueMin={zMin}
                viewMax={zMax}
                viewMin={zMin}
                rangeMax={Z_MAX}
                onChangeMin={zMinOnChange}
                onChangeMax={zMaxOnChange}
            />
        </ConfigPanelContainer>
    );
}

export default memo(Panner);