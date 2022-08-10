import { useState, useEffect, memo, useMemo } from "react";
import { globalFilterStatic } from "../../app/Globals.js";

import AsideButton from "./AsideButton.js";
import TouchButton from "../TouchButton.js";
import ToolButton from "../ToolButton.js";
import Switch from "../SwitchButton.js";

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
        <Switch 
            onClick={handleOnClick}
            name={value}
            isDisable={isDisable}
        />
    );
});
export default memo(function FilterButton({filter, setDispatcher}) {
    const { frequencyMin, frequencyMax, qMin, qMax, types } = filter;
    const TYPES = globalFilterStatic.TYPES;
    const areAllDisable = filter.areAllDisable.value;
    const resQMin = qMin.toFixed(2);
    const resQMax = qMax.toFixed(2);

    const handleOnClick = () => {
        setDispatcher("filter", "areAllDisable/global", !areAllDisable);
    }
    const reset = () => { setDispatcher("filter", "reset", null); }
    const setTypes = (newValue) => { setDispatcher("filter", "types", newValue); }

    const operationQ = useMemo(() => (operation, type) => (data) => {
        const v = data >= 2 ? 0.1 : 0.05;
        if (operation === "add") {
            const value = Number.parseFloat((data + v).toFixed(2));
            setDispatcher("filter", type, value);
        } else if (operation === "subtract") {
            const value = Number.parseFloat((data - v).toFixed(2));
            setDispatcher("filter", type, value);
        }
    }, [setDispatcher]);
    
    const operationFrequency = useMemo(() => (operation, type) => (data) => {
        const v = data < 200 ? 10 
            : data < 1000 ? 50 
            : data < 1000 ? 100
            : 1000;
        if (operation === "add") {
            setDispatcher("filter", type, data + v);
        } else if (operation === "subtract") {
            setDispatcher("filter", type, data - v);
        }
    }, [setDispatcher]);

    const add_qMin = useMemo(() => operationQ("add", "qMin"), [operationQ]);
    const add_qMax = useMemo(() => operationQ("add", "qMax"), [operationQ]);
    const subtract_qMin = useMemo(() => operationQ("subtract", "qMin"), [operationQ]);
    const subtract_qMax = useMemo(() => operationQ("subtract", "qMax"), [operationQ]);
    const add_frequencyMin = useMemo(() => operationFrequency("add", "frequencyMin"), [operationFrequency]);
    const add_frequencyMax = useMemo(() => operationFrequency("add", "frequencyMax"), [operationFrequency]);
    const subtract_frequencyMin = useMemo(() => operationFrequency("subtract", "frequencyMin"), [operationFrequency]);
    const subtract_frequencyMax = useMemo(() => operationFrequency("subtract", "frequencyMax"), [operationFrequency]);
    
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
                                <div>
                                    <div className="flex-row align-c justify-sb">
                                        <span className="fs-text p-2">min:</span>
                                        <TouchButton
                                            scroll
                                            touch
                                            textClass="effect-container_text-l"
                                            orientation="row"
                                            disable="configs"
                                            output={frequencyMin}
                                            add={add_frequencyMin}
                                            subtract={subtract_frequencyMin}
                                            data={frequencyMin}
                                        />
                                        <span className="fs-text p-2">Hz</span>
                                    </div>
                                    <div className="flex-row align-c justify-sb">
                                        <span className="fs-text p-2">max:</span>
                                        <TouchButton
                                            scroll
                                            touch
                                            textClass="effect-container_text-l"
                                            orientation="row"
                                            disable="configs"
                                            output={frequencyMax}
                                            add={add_frequencyMax}
                                            subtract={subtract_frequencyMax}
                                            data={frequencyMax}
                                        />
                                        <span className="fs-text p-2">Hz</span>
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
                                    <div className="flex-row align-c justify-sb">
                                        <span className="fs-text p-2">min:</span>
                                        <TouchButton
                                            scroll
                                            orientation="row"
                                            disable="configs"
                                            output={resQMin}
                                            add={add_qMin}
                                            subtract={subtract_qMin}
                                            data={qMin}
                                        />
                                    </div>
                                    <div className="flex-row align-c justify-sb">
                                        <span className="fs-text p-2">max:</span>
                                        <TouchButton
                                            scroll
                                            orientation="row"
                                            disable="configs"
                                            output={resQMax}
                                            add={add_qMax}
                                            subtract={subtract_qMax}
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
                                <div>
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