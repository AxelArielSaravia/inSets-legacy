import { memo, useMemo, useCallback } from "react";

import AsideButton from "../AsideButton/component.js";
import TouchButton from "../../../components/TouchButton/index.js";
import ToolButton from "../../../components/ToolButton/index.js";
import Switch from "../../../components/SwitchButton/index.js";

export default memo(function DelayButton({delay, setDispatcher}) {
    const {timeMin, timeMax,feedbackMin, feedbackMax} = delay;
    const areAllDisable = delay.areAllDisable.value;
    const resTimeMin = timeMin.toFixed(1);
    const resTimeMax = timeMax.toFixed(1);
    const resFeedbackMin = Number.parseInt(feedbackMin * 100);
    const resFeedbackMax = Number.parseInt(feedbackMax * 100);

    const handleOnClick = () => {
        setDispatcher("delay", "areAllDisable/global", !areAllDisable);
    }
    const reset = () => { setDispatcher("delay", "reset", null); }
    const timeOperation = useCallback((operation, type, v) => (data) => {
        if (operation === "add") {
            const value = Number.parseFloat((data + 0.1).toFixed(1));
            setDispatcher("delay", type, value);
        } else if (operation === "subtract") {
            const value = Number.parseFloat((data - 0.1).toFixed(1));
            setDispatcher("delay", type, value);
        }
    }, [setDispatcher]);
    const feedbackOperation = useCallback((operation, type) => (data) => {
        if (operation === "add") {
            const value = Number.parseFloat((data + 0.05).toFixed(2));
            setDispatcher("delay", type, value);
        } else if (operation === "subtract") {
            const value = Number.parseFloat((data - 0.05).toFixed(2));
            setDispatcher("delay", type, value);
        }
    }, [setDispatcher])
    const add_timeMin = useMemo(() => timeOperation("add", "timeMin"), [timeOperation]);
    const add_timeMax = useMemo(() => timeOperation("add", "timeMax"), [timeOperation]);
    const add_feedbackMin = useMemo(() => feedbackOperation("add", "feedbackMin"), [feedbackOperation]);
    const add_feedbackMax = useMemo(() => feedbackOperation("add", "feedbackMax"), [feedbackOperation]);
    const subtract_timeMin = useMemo(() => timeOperation("subtract", "timeMin"), [timeOperation]);
    const subtract_timeMax = useMemo(() => timeOperation("subtract", "timeMax"), [timeOperation]);
    const subtract_feedbackMin = useMemo(() => feedbackOperation("subtract", "feedbackMin"), [feedbackOperation]);
    const subtract_feedbackMax = useMemo(() => feedbackOperation("subtract", "feedbackMax"), [feedbackOperation]);
    
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
                                <div>
                                    <div className="flex-row align-c justify-sb">
                                        <span className="fs-text p-2">min:</span>
                                        <TouchButton
                                            scroll
                                            touch
                                            textClass="effect-container_text-s"
                                            orientation="row"
                                            disable="configs"
                                            output={resTimeMin}
                                            add={add_timeMin}
                                            subtract={subtract_timeMin}
                                            data={timeMin}
                                        />
                                        <span className="fs-text p-2">sec</span>
                                    </div>
                                    <div className="flex-row align-c justify-sb">
                                        <span className="fs-text p-2">max:</span>
                                        <TouchButton
                                            scroll
                                            touch
                                            textClass="effect-container_text-s"
                                            orientation="row"
                                            disable="configs"
                                            output={resTimeMax}
                                            add={add_timeMax}
                                            subtract={subtract_timeMax}
                                            data={timeMax}
                                        />
                                        <span className="fs-text p-2">sec</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-2">
                        <div className="p-2 border rounded">
                            <h4 className="fs-text">Feedback:</h4>
                            <div className="flex-column align-c justify-sb">
                                <div>
                                    <div className="flex-row align-c justify-sb">
                                        <span className="fs-text p-2">min:</span>
                                        <TouchButton
                                            scroll
                                            touch
                                            textClass="effect-container_text-s"
                                            orientation="row"
                                            disable="configs"
                                            output={resFeedbackMin}
                                            add={add_feedbackMin}
                                            subtract={subtract_feedbackMin}
                                            data={feedbackMin}
                                            
                                        />
                                        <span className="fs-text p-2">%</span>
                                    </div>
                                    <div className="flex-row align-c justify-sb">
                                        <span className="fs-text p-2">max:</span>
                                        <TouchButton
                                            scroll
                                            touch
                                            textClass="effect-container_text-s"
                                            orientation="row"
                                            disable="configs"
                                            output={resFeedbackMax}
                                            add={add_feedbackMax}
                                            subtract={subtract_feedbackMax}
                                            data={feedbackMax}
                                        />
                                        <span className="fs-text p-2">%</span>
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