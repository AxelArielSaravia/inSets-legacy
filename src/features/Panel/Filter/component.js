import {
    useReducer,
    useContext,
    useState,
    useEffect
} from "react";

import {filterLimits} from "../../../services/limits/service.js";
import {rToFrequency, rToQ} from "../../../services/convert/service.js";

import {initFilterState, FilterReducer} from "../../../reducer/index.js";

import {GeneralDisableContext} from "../../../context/index.js";

import {undefinedFunction} from "../../utils.js";

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

let _generalDisableDispatch = undefinedFunction;
let _filterDispatch = undefinedFunction;

function changeDisable(value) {
    if (value) {
        _generalDisableDispatch({
            type: "enable/filter",
            payload: true
        });
    } else {
        _generalDisableDispatch({type: "disable/filter"});
    }
}

function reset() {
    _filterDispatch({type: "reset"});
}
function frequencyMaxOnChange(val) {
    _filterDispatch({
        type: "frequency/changeMax",
        payload: Number(val)
    });
}
function frequencyMinOnChange(val) {
    _filterDispatch({
        type: "frequency/changeMin",
        payload: Number(val)
    });
}
function qMaxOnChange(val) {
    _filterDispatch({
        type: "q/changeMax",
        payload: Number(val)
    });
}
function qMinOnChange(val) {
    _filterDispatch({
        type: "q/changeMin",
        payload: Number(val)
    });
}
function typesChange(arr) {
    _filterDispatch({
        type: "types/change",
        payload: arr
    });
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

    _filterDispatch = filterDispatch;
    _generalDisableDispatch = generalDisableDispatch;

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
                viewMax={rToFrequency(frequencyMax)}
                viewMin={rToFrequency(frequencyMin)}
                onChangeMin={frequencyMinOnChange}
                onChangeMax={frequencyMaxOnChange}
            />
            <ConfigPanelInterval
                title="q factor interval:"
                rangeMax={Q_MAX}
                valueMax={qMax}
                valueMin={qMin}
                viewMax={rToQ(qMax).toFixed(2)}
                viewMin={rToQ(qMin).toFixed(2)}
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