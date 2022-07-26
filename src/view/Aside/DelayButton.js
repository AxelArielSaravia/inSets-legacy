import { memo } from "react";

import AsideButton from "./AsideButton.js";
import TouchButton from "../TouchButton.js";
import ToolButton from "../ToolButton.js";
import Switch from "../SwitchButton.js";

export default memo(function DelayButton(props) {
    const delay = props.delay;
    const timeMin = delay.timeMin;
    const timeMax = delay.timeMax;
    const feedbackMin = delay.feedbackMin;
    const feedbackMax = delay.feedbackMax;
    const areAllDisable = delay.areAllDisable.value;
    const handleOnClick = () => {
        props.setDispatcher("delay", "areAllDisable/global", !areAllDisable);
    }

    const operation = (operation, type) => (data) => {
        if (operation === "add") {
            props.setDispatcher("delay", type, data + 1);
        } else if (operation === "subtract"){
            props.setDispatcher("delay", type, data - 1);
        }
    }

    const reset = () => { props.setDispatcher("delay", "reset", null); }

    return (
        <AsideButton
            title="Delay"
            description="Change the delay configurations."
        >
             <div className="flex-row align-c justify-c p-3">
                <Switch
                    onClick={handleOnClick}
                    isDisable={areAllDisable}
                    title="disable all delay effects"
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
                            <h4 className="fs-text">Time:</h4>
                            <div className="flex-column align-c justify-sb">
                                <div style={{width:"165px"}}>
                                    <div className="flex-row align-c justify-sb p-2">
                                        <span className="fs-text">min:</span>
                                        <TouchButton
                                            scroll
                                            touch
                                            textStyle={{width: "45px"}}
                                            orientation="row"
                                            disable="configs"
                                            output={timeMin}
                                            add={operation("add", 'timeMin')}
                                            subtract={operation("subtract", 'timeMin')}
                                            data={timeMin}
                                        />
                                        <span className="fs-text">ms</span>
                                    </div>
                                    <div className="flex-row align-c justify-sb p-2">
                                        <span className="fs-text">max:</span>
                                        <TouchButton
                                            scroll
                                            touch
                                            textStyle={{width: "45px"}}
                                            orientation="row"
                                            disable="configs"
                                            output={timeMax}
                                            add={operation("add", 'timeMax')}
                                            subtract={operation("subtract", 'timeMax')}
                                            data={timeMax}
                                        />
                                        <span className="fs-text">ms</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-2">
                        <div className="p-2 border rounded">
                            <h4 className="fs-text">Feedback:</h4>
                            <div className="flex-column align-c justify-sb">
                                <div style={{width:"134px"}}>
                                    <div className="flex-row align-c justify-sb p-2">
                                        <span className="fs-text">min:</span>
                                        <TouchButton
                                            scroll
                                            touch
                                            textStyle={{width: "25px"}}
                                            orientation="row"
                                            disable="configs"
                                            output={feedbackMin}
                                            add={operation("add", 'feedbackMin')}
                                            subtract={operation("subtract", 'feedbackMin')}
                                            data={feedbackMin}
                                            
                                        />
                                        <span className="fs-text">%</span>
                                    </div>
                                    <div className="flex-row align-c justify-sb p-2">
                                        <span className="fs-text">max:</span>
                                        <TouchButton
                                            scroll
                                            touch
                                            textStyle={{width: "25px"}}
                                            orientation="row"
                                            disable="configs"
                                            output={feedbackMax}
                                            add={operation("add", 'feedbackMax')}
                                            subtract={operation("subtract", 'feedbackMax')}
                                            data={feedbackMax}
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