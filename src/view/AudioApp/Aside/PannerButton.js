import { useState, useEffect, memo } from "react";

import { GSPanner } from "../../../core/initGlobalState.js";
import initState from "../../../core/initState.json";

import AsideButton from "./AsideButton.js";
import TouchButton from "../TouchButton.js";
import ToolButton from "../ToolButton.js";
import Switch from "../SwitchButton.js";

function changeLocalStorage(name, value) {
    let localStoragePanner = JSON.parse(localStorage.getItem('panner'));
    localStoragePanner[name] = value;
    localStorage.setItem('panner', JSON.stringify(localStoragePanner)); 
}

export default memo(function PannerButton(props) {
    let localStoragePanner = JSON.parse(localStorage.getItem('panner'));
    const [xMax, setXMax] = useState(localStoragePanner.xMax);
    const [xMin, setXMin] = useState(localStoragePanner.xMin);
    const [yMax, setYMax] = useState(localStoragePanner.yMax);
    const [yMin, setYMin] = useState(localStoragePanner.yMin);
    const [zMax, setZMax] = useState(localStoragePanner.zMax);
    const [zMin, setZMin] = useState(localStoragePanner.zMin);

    const disableAll = props.disableAll;

    useEffect(() => {
        console.log("panner disableAll", disableAll);
        GSPanner.disableAll = !GSPanner.disableAll;
        const res = GSPanner.disableAll;
        changeLocalStorage("disableAll", res);
        console.log("GSPanner", GSPanner.disableAll);
    }, [disableAll]);

    const handleOnClick = () => {
        props.setDisableAll("panner");
    }

    const operations = (setTime, operation) => (data) => {
        if (operation === 'add') {
            GSPanner[data] += 1;
        } else {
            GSPanner[data] -= 1;
        }
        const val =  GSPanner[data];
        changeLocalStorage(data, val);
        setTime(_ => val);
    }
    const reset = () => {
        let panner = initState.panner;
        GSPanner.xMax = panner.xMax;
        GSPanner.xMin = panner.xMin;
        GSPanner.yMax = panner.yMax;
        GSPanner.yMin = panner.yMin;
        GSPanner.zMax = panner.zMax;
        GSPanner.zMin = panner.zMin;
        GSPanner.disableAll = panner.disableAll;
        localStorage.setItem('panner', JSON.stringify(panner));
        setXMax(() => panner.xMax);
        setXMin(() => panner.xMin);
        setYMax(() => panner.yMax);
        setYMin(() => panner.yMin);
        setZMax(() => panner.zMax);
        setZMin(() => panner.zMin);
    }
    return (
        <AsideButton 
            title="Panner"
            description="Change the intervals of panner configurations."
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
                            <h4 className="fs-text">Position X:</h4>
                            <div className="flex-column align-c justify-sb">
                                <div style={{width:"140px"}}>
                                    <div className="flex-row align-c justify-sb p-2">
                                        <span className="fs-text">min:</span>
                                        <TouchButton
                                            textStyle={{width:"35px"}}
                                            orientation="row"
                                            disable="configs"
                                            output={xMin}
                                            add={operations(setXMin, 'add')}
                                            subtract={operations(setXMin, 'subtract')}
                                            data={"xMin"}
                                        />
                                        <span className="fs-text">%</span>
                                    </div>
                                    <div className="flex-row align-c justify-sb p-2">
                                        <span className="fs-text">max:</span>
                                        <TouchButton
                                            textStyle={{width:"35px"}}
                                            orientation="row"
                                            disable="configs"
                                            output={xMax}
                                            add={operations(setXMax, 'add')}
                                            subtract={operations(setXMax, 'subtract')}
                                            data={"xMax"}
                                        />
                                        <span className="fs-text">%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-2">
                        <div className="p-2 border rounded">
                            <h4 className="fs-text">Position Y:</h4>
                            <div className="flex-column align-c justify-sb">
                                <div style={{width:"140px"}}>

                                    <div className="flex-row align-c justify-sb p-2">
                                        <span className="fs-text">min:</span>
                                        <TouchButton
                                            textStyle={{width:"35px"}}
                                            orientation="row"
                                            disable="configs"
                                            output={yMin}
                                            add={operations(setYMin, 'add')}
                                            subtract={operations(setYMin, 'subtract')}
                                            data={"yMin"}
                                        />
                                        <span className="fs-text">%</span>
                                    </div>
                                    <div className="flex-row align-c justify-sb p-2">
                                        <span className="fs-text">max:</span>
                                        <TouchButton
                                            textStyle={{width:"35px"}}
                                            orientation="row"
                                            disable="configs"
                                            output={yMax}
                                            add={operations(setYMax, 'add')}
                                            subtract={operations(setYMax, 'subtract')}
                                            data={"yMax"}
                                        />
                                        <span className="fs-text">%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-2">
                        <div className="p-2 border rounded">
                            <h4 className="fs-text">Position Z:</h4>
                            <div className="flex-column align-c justify-sb">
                                <div style={{width:"140px"}}>
                                    <div className="flex-row align-c justify-sb p-2">
                                        <span className="fs-text">min:</span>
                                        <TouchButton
                                            textStyle={{width:"35px"}}
                                            orientation="row"
                                            disable="configs"
                                            output={zMin}
                                            add={operations(setZMin, 'add')}
                                            subtract={operations(setZMin, 'subtract')}
                                            data={"zMin"}
                                        />
                                        <span className="fs-text">%</span>
                                    </div>
                                    <div className="flex-row align-c justify-sb p-2">
                                        <span className="fs-text">max:</span>
                                        <TouchButton
                                            textStyle={{width:"35px"}}
                                            orientation="row"
                                            disable="configs"
                                            output={zMax}
                                            add={operations(setZMax, 'add')}
                                            subtract={operations(setZMax, 'subtract')}
                                            data={"zMax"}
                                        />
                                        <span className="fs-text">%</span>
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
