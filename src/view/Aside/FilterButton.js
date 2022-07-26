import { useState, useEffect, memo} from "react";
import { globalFilterStatic } from "../../core/Globals.js";

import AsideButton from "./AsideButton.js";
import TouchButton from "../TouchButton.js";
import ToolButton from "../ToolButton.js";
import Switch from "../SwitchButton.js";

const FilterTypeButton = memo(function (props) {
    const types = props.types
    const value = props.value;
    const index = types.indexOf(props.value);
    const [isDisable, setIsDisable] = useState(index === -1);

    useEffect(() => {
        const index = types.indexOf(value);
        setIsDisable(() => index === -1);
    }, [types, value]);


    const handleOnClick = () => {
        const arr = [...types];
        const index = types.indexOf(value);
        if (isDisable) {
            if (index === -1) arr.push(props.value);
            setIsDisable(() => false);
        } else if (arr.length > 1){
            arr.splice(index, 1);
            setIsDisable(() => true);
        }
        props.setTypes(arr);
    }

    return (
        <Switch 
            onClick={handleOnClick}
            name={value}
            isDisable={isDisable}
        />
    );
});

export default memo(function FilterButton(props) {
    const filter = props.filter;
    const frequencyMin = filter.frequencyMin;
    const frequencyMax = filter.frequencyMax;
    const qMin = filter.qMin;
    const qMax = filter.qMax;
    const types = filter.types
    const areAllDisable = filter.areAllDisable.value;
    const TYPES = globalFilterStatic.TYPES;

    const resQMin = filter.qMin.toFixed(2);
    const resQMax = filter.qMax.toFixed(2);

    const handleOnClick = () => {
        props.setDispatcher("filter", "areAllDisable/global", !areAllDisable);
    }

    const operationQ = (operation, type) => (data) => {
        let v = data >= 2 ? 0.1 : 0.05;
        if (operation === "add") {
            props.setDispatcher("filter", type, data + v);
        } else if (operation === "subtract") {
            props.setDispatcher("filter", type, data - v);
        }
    }

    const operationFrequency = (operation, type) => (data) => {
        let v = data < 200 ? 10 
            : data < 1000 ? 50 
            : data < 1000 ? 100
            :1000;
        if (operation === "add") {
            props.setDispatcher("filter", type, v);
        } else if (operation === "subtract") {
            props.setDispatcher("filter", type, v);
        }
    }

    const reset = () => { props.setDispatcher("filter", "reset", null); }

    const setTypes = (newValue) => {
        props.setDispatcher("filter", "types", newValue);
    }

    return (
        <AsideButton
            title="Filter"
            description="Change the filter configurations."
        >
            <div className="flex-row align-c justify-c p-3">
                <Switch
                    onClick={handleOnClick}
                    isDisable={areAllDisable}
                    title="disable all filters effect"
                >
                    <span className="fs-text disable-all_btn">
                        { areAllDisable ? "enable all" : "disable all" }
                    </span>
                </Switch>
            </div>
            <div className="flex-column align-c justify-c p-3">
                <ToolButton onClick={reset}>Reset</ToolButton>
            </div>
            <div className="flex-column align-c">
                <div className="effect-container">
                    <div className="p-2">
                        <div className="p-2 border rounded">
                            <h4 className="fs-text">Frequency:</h4>
                            <div className="flex-column align-c justify-sb">
                                <div style={{width:"175px"}}>
                                    <div className="flex-row align-c justify-sb p-2">
                                        <span className="fs-text">min:</span>
                                        <TouchButton
                                            scroll
                                            touch
                                            textStyle={{width: "59px"}}
                                            orientation="row"
                                            disable="configs"
                                            output={frequencyMin}
                                            add={operationFrequency('add', 'frequencyMin')}
                                            subtract={operationFrequency('subtract', 'frequencyMin')}
                                            data={frequencyMin}
                                        />
                                        <span className="fs-text">Hz</span>
                                    </div>
                                    <div className="flex-row align-c justify-sb p-2">
                                        <span className="fs-text">max:</span>
                                        <TouchButton
                                            scroll
                                            touch
                                            textStyle={{width: "59px"}}
                                            orientation="row"
                                            disable="configs"
                                            output={frequencyMax}
                                            add={operationFrequency('add', 'frequencyMax')}
                                            subtract={operationFrequency('subtract', 'frequencyMax')}
                                            data={frequencyMax}
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
                                            output={resQMin}
                                            add={operationQ('add', 'qMin')}
                                            subtract={operationQ('subtract', 'qMin')}
                                            data={qMin}
                                        />
                                    </div>
                                    <div className="flex-row align-c justify-sb p-2">
                                        <span className="fs-text">max:</span>
                                        <TouchButton
                                            orientation="row"
                                            disable="configs"
                                            output={resQMax}
                                            add={operationQ('add', 'qMax')}
                                            subtract={operationQ('subtract', 'qMax')}
                                            data={qMax}
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
                                        {TYPES.map((el) => (
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