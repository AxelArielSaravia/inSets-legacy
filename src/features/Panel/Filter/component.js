import { memo, useReducer, useContext, useCallback, useMemo, useState, useEffect } from "react";

import { globalFilterLimits } from "../../../state/Global/index.js";

import { initFilterState, FilterReducer } from "../../../reducer/index.js";

import { GeneralDisableContext } from "../../../context/index.js";

import Button from "../../../components/Button/component.js";
import ConfigPanelContainer from "../ConfigPanelContainer/component.js"
import ConfigPanelChild from "../ConfigPanelChild/component.js";
import ConfigPanelInterval from "../ConfigPanelInterval/component.js";
import { 
    rangeValueToFrequency,
    frequencyToRangeValue,
    rangeValueToQ,
    qToRangeValue
} from "../utils.js";


const FilterTypeButton = memo(function ({types, setTypes, value}) {
    const index = types.indexOf(value);
    const [isDisable, setIsDisable] = useState(index === -1);

    useEffect(() => {
        const index = types.indexOf(value);
        setIsDisable(() => index === -1);
    }, [types, value]);


    const handleOnClick = () => {
        const arr = [...types];
        const index = types.indexOf(value);
        if (isDisable) {
            if (index === -1) arr.push(value);
            setIsDisable(() => false);
        } else if (arr.length > 1){
            arr.splice(index, 1);
            setIsDisable(() => true);
        }
        setTypes(arr);
    }

    return (
        <Button
            className={isDisable ? "inactive" : ""}
            onClick={handleOnClick}
        >
            <p className="fs-text">{value}</p>
        </Button>
    );
});

function Filter() {
    const [{allFiltersAreDisabled}, generalDisableDispatch] = useContext(GeneralDisableContext);
    const [{
        frequencyMin,
        frequencyMax,
        qMin,
        qMax,
        types
    }, filterDispatch] = useReducer(FilterReducer, initFilterState());
    
    const changeDisable = useCallback(function() {
        if (allFiltersAreDisabled.value) {
            generalDisableDispatch({type: "enable/filter", payload: true})
        } else {
            generalDisableDispatch({type: "disable/filter"})
        }
    },[allFiltersAreDisabled, generalDisableDispatch]);

    const reset = useCallback(function() {
        filterDispatch({type: "reset"});
    }, [filterDispatch]) 

    const rangeFreqMin = useMemo(() => frequencyToRangeValue(frequencyMin), [frequencyMin]);
    const rangeFreqMax = useMemo(() => frequencyToRangeValue(frequencyMax), [frequencyMax]);
    const rangeQMin = useMemo(() => qToRangeValue(qMin * 100), [qMin]);
    const rangeQMax = useMemo(() => qToRangeValue(qMax * 100), [qMax]);

    const frequencyMaxOnChange = useCallback(function(val) {
        filterDispatch({type: "frequency/changeMax", payload: rangeValueToFrequency(+val + 40)});
    }, [filterDispatch]);
    const frequencyMinOnChange = useCallback(function(val) {
        filterDispatch({type: "frequency/changeMin", payload: rangeValueToFrequency(+val + 40)});
    }, [filterDispatch]);
    const qMaxOnChange = useCallback(function(val) {
        filterDispatch({type: "q/changeMax", payload: rangeValueToQ(+val + 2)/ 100});
    }, [filterDispatch]);
    const qMinOnChange = useCallback(function(val) {
        filterDispatch({type: "q/changeMin", payload: rangeValueToQ(+val + 2)/100});
    }, [filterDispatch]);

    const typesChange = useCallback(function(arr) {
        filterDispatch({type: "types/change", payload: arr})
    }, [filterDispatch]);

    return (
        <ConfigPanelContainer
            title="Filter"
            description="Change the general parameters of different filters."
            addDisableAllButton
            addResetButton
            changeDisable={changeDisable}
            disableValue={allFiltersAreDisabled.value}
            reset={reset}
        >
            <ConfigPanelInterval
                title="frequency interval:"
                valueText="hz"
                rangeMax={248}
                valueMin={rangeFreqMin - 40}
                valueMax={rangeFreqMax - 40}
                viewMin={frequencyMin}
                viewMax={frequencyMax}
                onChangeMin={frequencyMinOnChange}
                onChangeMax={frequencyMaxOnChange}
            />
            <ConfigPanelInterval
                title="q factor interval:"
                rangeMax={36}
                valueMin={rangeQMin - 2}
                valueMax={rangeQMax - 2}
                viewMin={qMin.toFixed(2)}
                viewMax={qMax.toFixed(2)}
                onChangeMin={qMinOnChange}
                onChangeMax={qMaxOnChange}
            />
            <ConfigPanelChild title="filter types selected:">
                <div className="flex-row flex-wrap justify- align-c">
                    {globalFilterLimits.TYPES.map((el) => (
                    <div key={"filter_type-" + el} className="p-2">
                        <FilterTypeButton 
                            value={el}
                            types={types}
                            setTypes={typesChange}
                        />
                    </div>
                    ))}
                </div>
            </ConfigPanelChild>
        </ConfigPanelContainer>
    );
}

export default memo(Filter);