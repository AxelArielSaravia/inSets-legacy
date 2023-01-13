import {
    useReducer,
    useContext,
    useCallback,
    useMemo,
    useState,
    useEffect
} from "react";

import {filterLimits} from "../../../services/limits/service.js";
import {rToFrequency, rToQ} from "../../../services/convert/service.js";

import {initFilterState, FilterReducer} from "../../../reducer/index.js";

import {GeneralDisableContext} from "../../../context/index.js";

import Button from "../../../components/Button/component.js";
import ConfigPanelContainer from "../ConfigPanelContainer/component.js";
import ConfigPanelChild from "../ConfigPanelChild/component.js";
import ConfigPanelInterval from "../ConfigPanelInterval/component.js";

function FilterTypeButton({setTypes, types, value}) {
    const index = types.indexOf(value);
    const [isDisable, setIsDisable] = useState(index === -1);

    useEffect(function () {
        const i = types.indexOf(value);
        setIsDisable(() => i === -1);
    }, [types, value]);


    const handleOnClick = function () {
        const arr = [...types];
        const i = types.indexOf(value);
        if (isDisable) {
            if (i === -1) {
                arr.push(value);
            }
            setIsDisable(() => false);
        } else if (arr.length > 1) {
            arr.splice(i, 1);
            setIsDisable(() => true);
        }
        setTypes(arr);
    };

    return (
        <Button
            className={isDisable ? "inactive" : ""}
            onClick={handleOnClick}
        >
            <p className="fs-text">{value}</p>
        </Button>
    );
}

function TypesList({TYPES, types, typesChange}) {
    return (
        TYPES.map((el) => (
            <div key={"filter_type-" + el} className="p-2">
                <FilterTypeButton
                    value={el}
                    types={types}
                    setTypes={typesChange}
                />
            </div>
        ))
    );
}

function Filter({
    FREQ_MAX,
    Q_MAX,
    TYPES
}) {
    const [{
        allFiltersAreDisabled
    }, generalDisableDispatch] = useContext(GeneralDisableContext);
    const [{
        frequencyMax,
        frequencyMin,
        qMax,
        qMin,
        types
    },filterDispatch] = useReducer(FilterReducer, initFilterState());


    const viewFrequencyMax = useMemo(
        () => rToFrequency(frequencyMax),
        [frequencyMax]
    );
    const viewFrequencyMin = useMemo(
        () => rToFrequency(frequencyMin),
        [frequencyMin]
    );
    const viewQMax = useMemo(() => rToQ(qMax).toFixed(2), [qMax]);
    const viewQMin = useMemo(() => rToQ(qMin).toFixed(2), [qMin]);

    const changeDisable = useCallback(function () {
        if (allFiltersAreDisabled.value) {
            generalDisableDispatch({
                type: "enable/filter",
                payload: true
            });
        } else {
            generalDisableDispatch({type: "disable/filter"});
        }
    },[allFiltersAreDisabled, generalDisableDispatch]);

    const reset = useCallback(function () {
        filterDispatch({type: "reset"});
    }, [filterDispatch]);

    const frequencyMaxOnChange = useCallback(function (val) {
        filterDispatch({
            type: "frequency/changeMax",
            payload: Number(val)
        });
    }, [filterDispatch]);
    const frequencyMinOnChange = useCallback(function (val) {
        filterDispatch({
            type: "frequency/changeMin",
            payload: Number(val)
        });
    }, [filterDispatch]);
    const qMaxOnChange = useCallback(function (val) {
        filterDispatch({
            type: "q/changeMax",
            payload: Number(val)
        });
    }, [filterDispatch]);
    const qMinOnChange = useCallback(function (val) {
        filterDispatch({
            type: "q/changeMin",
            payload: Number(val)
        });
    }, [filterDispatch]);

    const typesChange = useCallback(function (arr) {
        filterDispatch({
            type: "types/change",
            payload: arr
        });
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
                rangeMax={FREQ_MAX}
                valueMax={frequencyMax}
                valueMin={frequencyMin}
                viewMax={viewFrequencyMax}
                viewMin={viewFrequencyMin}
                onChangeMin={frequencyMinOnChange}
                onChangeMax={frequencyMaxOnChange}
            />
            <ConfigPanelInterval
                title="q factor interval:"
                rangeMax={Q_MAX}
                valueMax={qMax}
                valueMin={qMin}
                viewMax={viewQMax}
                viewMin={viewQMin}
                onChangeMin={qMinOnChange}
                onChangeMax={qMaxOnChange}
            />
            <ConfigPanelChild title="filter types selected:">
                <div className="flex-row flex-wrap justify- align-c">
                    <TypesList
                        types={types}
                        typesChange={typesChange}
                        TYPES={TYPES}
                    />
                </div>
            </ConfigPanelChild>
        </ConfigPanelContainer>
    );
}

function ContainFilter() {
    const {TYPES, FREQ_MAX, Q_MAX} = filterLimits;
    return (
        <Filter
            TYPES={TYPES}
            FREQ_MAX={FREQ_MAX}
            Q_MAX={Q_MAX}
        />
    );
}

export default ContainFilter;