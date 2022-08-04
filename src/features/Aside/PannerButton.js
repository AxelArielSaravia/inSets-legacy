import { memo } from "react";

import AsideButton from "./AsideButton.js";
import TouchButton from "../TouchButton.js";
import ToolButton from "../ToolButton.js";
import Switch from "../SwitchButton.js";

export default memo(function PannerButton(props) {
    const panner = props.panner;
    const xMin = panner.xMin;
    const xMax = panner.xMax;
    const yMin = panner.yMin;
    const yMax = panner.yMax;    
    const zMin = panner.zMin;
    const zMax = panner.zMax;
    const areAllDisable = panner.areAllDisable.value;

    const handleOnClick = () => {
        props.setDispatcher("panner", "areAllDisable/global", !areAllDisable);
    }

    const operation = (operation, type) => (data) => {
        if (operation === "add") {
            props.setDispatcher("panner", type, data + 1);
        } else if (operation === "subtract") {
            props.setDispatcher("panner", type, data - 1);
        }
    }

    const reset = () => { props.setDispatcher("panner", "reset", null); }

    return (
        <AsideButton 
            title="Panner"
            description="Change the intervals of panner configurations."
        >
            <div className="flex-row align-c justify-c p-3">
                <Switch
                    onClick={handleOnClick}
                    isDisable={areAllDisable}
                    title="disable all panner effect"
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
                            <h4 className="fs-text">Position X:</h4>
                            <div className="flex-column align-c justify-sb">
                                <div style={{width:"140px"}}>
                                    <div className="flex-row align-c justify-sb p-2">
                                        <span className="fs-text">min:</span>
                                        <TouchButton
                                            scroll
                                            touch
                                            textStyle={{width:"35px"}}
                                            orientation="row"
                                            disable="configs"
                                            output={xMin}
                                            add={operation('add', 'xMin')}
                                            subtract={operation('subtract', 'xMin')}
                                            data={xMin}
                                        />
                                        <span className="fs-text">%</span>
                                    </div>
                                    <div className="flex-row align-c justify-sb p-2">
                                        <span className="fs-text">max:</span>
                                        <TouchButton
                                            scroll
                                            touch
                                            textStyle={{width:"35px"}}
                                            orientation="row"
                                            disable="configs"
                                            output={xMax}
                                            add={operation('add', 'xMax')}
                                            subtract={operation('subtract', 'xMax')}
                                            data={xMax}
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
                                            scroll
                                            touch
                                            textStyle={{width:"35px"}}
                                            orientation="row"
                                            disable="configs"
                                            output={yMin}
                                            add={operation('add', 'yMin')}
                                            subtract={operation('subtract', 'yMin')}
                                            data={yMin}
                                        />
                                        <span className="fs-text">%</span>
                                    </div>
                                    <div className="flex-row align-c justify-sb p-2">
                                        <span className="fs-text">max:</span>
                                        <TouchButton
                                            scroll
                                            touch
                                            textStyle={{width:"35px"}}
                                            orientation="row"
                                            disable="configs"
                                            output={yMax}
                                            add={operation('add', 'yMax')}
                                            subtract={operation('subtract', 'yMax')}
                                            data={yMax}
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
                                            scroll
                                            touch
                                            textStyle={{width:"35px"}}
                                            orientation="row"
                                            disable="configs"
                                            output={zMin}
                                            add={operation('add', 'zMin')}
                                            subtract={operation('subtract', 'zMin')}
                                            data={zMin}
                                        />
                                        <span className="fs-text">%</span>
                                    </div>
                                    <div className="flex-row align-c justify-sb p-2">
                                        <span className="fs-text">max:</span>
                                        <TouchButton
                                            scroll
                                            touch
                                            textStyle={{width:"35px"}}
                                            orientation="row"
                                            disable="configs"
                                            output={zMax}
                                            add={operation('add', 'zMax')}
                                            subtract={operation('subtract', 'zMax')}
                                            data={zMax}
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
