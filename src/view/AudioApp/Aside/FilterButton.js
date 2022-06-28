import { useState, useEffect, memo} from "react";

import { GSFilter } from "../../../core/initGlobalState.js";
import initState from "../../../core/initState.json";

import AsideButton from "./AsideButton.js";
import TouchButton from "../TouchButton.js";
import ToolButton from "../ToolButton.js";
import Switch from "../SwitchButton.js";

function changeLocalStorage(name, value) {
    let localStorageFilter = JSON.parse(localStorage.getItem('filter'));
    localStorageFilter[name] = value;
    localStorage.setItem('filter', JSON.stringify(localStorageFilter)); 
}

const FilterTypeButton = memo(function (props) {
    const types = props.types
    let index = types.indexOf(props.value);
    const [isDisable, setIsDisable] = useState(index === -1);

    useEffect(() => {
        let index = types.indexOf(props.value);
        setIsDisable(() => index === -1);
    }, [types]);


    const handleOnClick = () => {
        let arr = [...props.types];
        let index = props.types.indexOf(props.value);

        if (isDisable) {
            if (index === -1) arr.push(props.value);
            setIsDisable(_ => false);
        } else if (arr.length > 1){
            arr.splice(index, 1);
            setIsDisable(_ => true);
        }
        changeLocalStorage("types", arr);
        props.setTypes(_ => arr)
    }

    return (
        <Switch 
            onClick={handleOnClick}
            name={props.value}
            isDisable={isDisable}
        />
    );
});

export default memo(function FilterButton(props) {
    let localStorageFilter = JSON.parse(localStorage.getItem('filter'));
    const [frequencyMax, setFrequencyMax] = useState(localStorageFilter.frequencyMax);
    const [frequencyMin, setFrequencyMin] = useState(localStorageFilter.frequencyMin);
    const [qMax, setQMax] = useState(Number.parseFloat(localStorageFilter.qMax).toFixed(2));
    const [qMin, setQMin] = useState(Number.parseFloat(localStorageFilter.qMin).toFixed(2));
    const [types, setTypes] = useState(localStorageFilter.types);
    const disableAll = props.disableAll;

    useEffect(() => {
        GSFilter.disableAll = disableAll.value;
        const res = GSFilter.disableAll;
        changeLocalStorage("disableAll", res);
    }, [disableAll]);

    const handleOnClick = () => {
        props.setDisableAll("filter");
    }

    const operationQ = (setTime, operation) => (data) => {
        let v = 0.05;
        if (GSFilter[data] >= 2) v = 0.1; 
        if (operation === "add") {
            GSFilter[data] = Number.parseFloat((GSFilter[data] + v).toFixed(2));
        } else {
            GSFilter[data] = Number.parseFloat((GSFilter[data] - v).toFixed(2))
        } 
        let res = GSFilter[data].toFixed(2);
        changeLocalStorage(data, res);
        setTime(() => res);
     }
    

    const operationFrequency = (setTime, operation) => (data) => {
        let v = 1000;
        if (GSFilter[data] < 200) v = 10;
        else if (GSFilter[data] < 1000) v = 50;
        else if (GSFilter[data] < 10000) v = 100;
        if (operation === "add") {
            GSFilter[data] += v;
        } else {
            GSFilter[data] -= v;
        }
        changeLocalStorage(data, GSFilter[data]);
        setTime(() => GSFilter[data]);
    }

    const reset = () => {
        let filter = initState.filter;
        GSFilter.frequencyMax = filter.frequencyMax;
        GSFilter.frequencyMin = filter.frequencyMin;
        GSFilter.qMax = filter.qMax;
        GSFilter.qMin = filter.qMin;
        GSFilter.types = filter.types;
        GSFilter.disableAll = filter.disableAll;
        localStorage.setItem('filter', JSON.stringify(filter));
        setFrequencyMax(_ => filter.frequencyMax);
        setFrequencyMin(_ => filter.frequencyMin);
        setQMax(_ => Number.parseFloat(filter.qMax).toFixed(2));
        setQMin(_ => Number.parseFloat(filter.qMin).toFixed(2));
        setTypes(_ => filter.types);
    }

    return (
        <AsideButton
            title="Filter"
            description="Change the filter configurations."
        >
            <div className="flex-row align-c justify-c p-3">
                <Switch
                    onClick={handleOnClick}
                    isDisable={disableAll.value}
                    title="disable all filters effect"
                >
                    <span className="fs-text" style={{width: "110px"}}>
                        {!disableAll.value ? "disable all" : "enable all"}
                    </span>
                </Switch>
            </div>
            <div className="flex-column align-c justify-c p-3">
                <ToolButton onClick={reset}>Reset</ToolButton>
            </div>
            <div className="flex-column align-c">
                <div style={{width:"240px"}}>
                    <div className="p-2">
                        <div className="p-2 border rounded">
                            <h4 className="fs-text">Frequency:</h4>
                            <div className="flex-column align-c justify-sb">
                                <div style={{width:"175px"}}>
                                    <div className="flex-row align-c justify-sb p-2">
                                        <span className="fs-text">min:</span>
                                        <TouchButton
                                            textStyle={{width: "59px"}}
                                            orientation="row"
                                            disable="configs"
                                            output={frequencyMin}
                                            add={operationFrequency(setFrequencyMin, 'add')}
                                            subtract={operationFrequency(setFrequencyMin, 'subtract')}
                                            data={"frequencyMin"}
                                        />
                                        <span className="fs-text">Hz</span>
                                    </div>
                                    <div className="flex-row align-c justify-sb p-2">
                                        <span className="fs-text">max:</span>
                                        <TouchButton
                                            textStyle={{width: "59px"}}
                                            orientation="row"
                                            disable="configs"
                                            output={frequencyMax}
                                            add={operationFrequency(setFrequencyMax, 'add')}
                                            subtract={operationFrequency(setFrequencyMax, 'subtract')}
                                            data={"frequencyMax"}
                                        />
                                        <span className="fs-text">Hz</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-2">
                        <div className="p-2 border rounded">
                            <h4 className="fs-text">Q:</h4>
                            <div className="flex-column align-c justify-sb">
                                <div style={{width:"110px"}}>
                                    <div className="flex-row align-c justify-sb p-2">
                                        <span className="fs-text">min:</span>
                                        <TouchButton
                                            orientation="row"
                                            disable="configs"
                                            output={qMin}
                                            add={operationQ(setQMin, 'add')}
                                            subtract={operationQ(setQMin, 'subtract')}
                                            data={"qMin"}
                                        />
                                    </div>
                                    <div className="flex-row align-c justify-sb p-2">
                                        <span className="fs-text">max:</span>
                                        <TouchButton
                                            orientation="row"
                                            disable="configs"
                                            output={qMax}
                                            add={operationQ(setQMax, 'add')}
                                            subtract={operationQ(setQMax, 'subtract')}
                                            data={"qMax"}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-2">
                        <div className="p-2 border rounded">
                            <h4 className="fs-text">Types:</h4>
                            <div className="flex-column align-c justify-sb p-2">
                                <div style={{width:"200px"}}>
                                    <div className="flex-row flex-wrap justify-c">
                                        {GSFilter.ALL_TYPES.map((el) => (
                                            <div key={"filter_type-" + el} className="p-2">
                                                <FilterTypeButton 
                                                    value={el}
                                                    types={types}
                                                    setTypes={setTypes}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AsideButton>
    );
});