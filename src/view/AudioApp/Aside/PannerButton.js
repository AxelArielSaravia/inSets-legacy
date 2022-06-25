import { useState } from "react";

import { GSPanner } from "../../../core/initGlobalState.js"
import initState from "../../../core/initState.json";

import AsideButton from "./AsideButton.js";
import TouchButton from "../TouchButton.js";
import ToolButton from "../ToolButton.js";

function changeLocalStorage(name, value) {
    let localStoragePanner = JSON.parse(localStorage.getItem('panner'));
    localStoragePanner[name] = value;
    localStorage.setItem('panner', JSON.stringify(localStoragePanner)); 
}

export default function PannerButton(props) {
    let localStoragePanner = JSON.parse(localStorage.getItem('panner'));
    //const [disableAll, setDisableAll] = useState(localStoragePanner.disableAll);
    const [xMax, setXMax] = useState(localStoragePanner.xMax);
    const [xMin, setXMin] = useState(localStoragePanner.xMin);
    const [yMax, setYMax] = useState(localStoragePanner.yMax);
    const [yMin, setYMin] = useState(localStoragePanner.yMin);
    const [zMax, setZMax] = useState(localStoragePanner.zMax);
    const [zMin, setZMin] = useState(localStoragePanner.zMin);

    const add = (setTime) => {
        return function(data) {
            GSPanner[data] += 1;
            changeLocalStorage(data, GSPanner[data]);
            setTime(() => GSPanner[data]);
        }
    }
    const subtract = (setTime) => {
        return function(data) {
            GSPanner[data] -= 1;
            changeLocalStorage(data, GSPanner[data]);
            setTime(() => GSPanner[data]);
        }
    }
    const reset = () => {
        let panner = initState.panner;
        GSPanner.xMax = panner.xMax;
        GSPanner.xMin = panner.xMin;
        GSPanner.yMax = panner.yMax;
        GSPanner.yMin = panner.yMin;
        GSPanner.zMax = panner.zMax;
        GSPanner.zMin = panner.zMin;
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
                                            add={add(setXMin)}
                                            subtract={subtract(setXMin)}
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
                                            add={add(setXMax)}
                                            subtract={subtract(setXMax)}
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
                                            add={add(setYMin)}
                                            subtract={subtract(setYMin)}
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
                                            add={add(setYMax)}
                                            subtract={subtract(setYMax)}
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
                                            add={add(setZMin)}
                                            subtract={subtract(setZMin)}
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
                                            add={add(setZMax)}
                                            subtract={subtract(setZMax)}
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
} 
