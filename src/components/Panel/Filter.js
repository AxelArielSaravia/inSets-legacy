import {
    useReducer,
    useContext,
    useState,
    useEffect
} from "react";

import {filterReducer, filterActions} from "../../slices/filter.js";
import {generalDisableAction} from "../../slices/generalDisable.js";

import {filterLimits} from "../../state/limits.js";
import {createFilterInitialState} from "../initialState.js";

import {GeneralDisableContext} from "../contexts/GeneralDisable.js";

import {rToFrequency, rToQ} from "../../core/maps.js";

import {undefinedFunction} from "../utils.js";

import Button from "../Button.js";
import PanelConfigContainer from "./PanelConfigContainer.js";
import PanelConfigChild from "./PanelConfigChild.js";
import PanelInterval from "./PanelInterval.js";

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

function TypesListMapFn(el) {
    return (
        <div key={"filter_type-" + el} className="p-2">
            <FilterTypeButton
                value={el}
                types={this.types}
                setTypes={this.typesChange}
            />
        </div>
    );
}

function TypesList(props) {
    const list = props?.list;
    return list.map(TypesListMapFn, props);
}

let _generalDisableDispatch = undefinedFunction;
let _filterDispatch = undefinedFunction;

function changeDisable(value) {
    if (value) {
        _generalDisableDispatch(generalDisableAction("enable", "filter", "global"));
    } else {
        _generalDisableDispatch(generalDisableAction("disable", "filter"));
    }
}

function reset() {
    _filterDispatch(filterActions.reset());
}
function frequencyMaxOnChange(val) {
    _filterDispatch(
        filterActions.changeMaxFrequency(Number(val))
    );
}
function frequencyMinOnChange(val) {
    _filterDispatch(
        filterActions.changeMinFrequency(Number(val))
    );
}
function qMaxOnChange(val) {
    _filterDispatch(
        filterActions.changeMaxQ(Number(val))
    );
}
function qMinOnChange(val) {
    _filterDispatch(
        filterActions.changeMinQ(Number(val))
    );
}
function typesChange(arr) {
    _filterDispatch(filterActions.changeTypes(arr));
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
    },filterDispatch] = useReducer(filterReducer, createFilterInitialState());

    _filterDispatch = filterDispatch;
    _generalDisableDispatch = generalDisableDispatch;

    return (
        <PanelConfigContainer
            title="Filter"
            description="Change the general parameters of different filters."
            DisableAllButtonEnabled
            ResetButtonEnabled
            changeDisable={changeDisable}
            disableValue={allFiltersAreDisabled.value}
            reset={reset}
        >
            <PanelInterval
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
            <PanelInterval
                title="q factor interval:"
                rangeMax={Q_MAX}
                valueMax={qMax}
                valueMin={qMin}
                viewMax={rToQ(qMax).toFixed(2)}
                viewMin={rToQ(qMin).toFixed(2)}
                onChangeMin={qMinOnChange}
                onChangeMax={qMaxOnChange}
            />
            <PanelConfigChild title="filter types selected:">
                <div className="flex-row flex-wrap justify- align-c">
                    <TypesList
                        types={types}
                        typesChange={typesChange}
                        list={TYPES}
                    />
                </div>
            </PanelConfigChild>
        </PanelConfigContainer>
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