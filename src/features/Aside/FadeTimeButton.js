import { memo, useMemo } from "react";

import AsideButton from "./AsideButton.js";
import TouchButton from "../TouchButton.js";
import ToolButton from "../ToolButton.js";


export default memo(function FadeTimeButton({fadeIn, fadeOut, setDispatcher}) {

    const operation = useMemo(() => (operation, variable) => (data) => {
        if (operation === "add") {
            setDispatcher(variable, "change", data + 10);
        } else if (operation === "subtract") {
            setDispatcher(variable, "change", data - 10);
        }
    }, [setDispatcher]);
    const add_fadeOut = useMemo(() => operation("add", "fadeOut"), [operation]);
    const add_fadeIn = useMemo(() => operation("add", "fadeIn"), [operation]);
    const subtract_fadeOut = useMemo(() => operation("subtract", "fadeOut"), [operation]);
    const subtract_fadeIn = useMemo(() => operation("subtract", "fadeIn"), [operation]);

    const reset = () => { 
        setDispatcher("fadeIn", "reset", null); 
        setDispatcher("fadeOut", "reset", null); 
    }

    return (
        <AsideButton
            title="Fade Time"
            description="Change the fadeIn and fadeOut values"
        >
            <div className="flex-column align-c justify-c p-3">
                <ToolButton onClick={reset}>Reset</ToolButton>
            </div>
            <div className="flex-column align-c">
                <div className="effect-container">
                    <div className="p-2">
                        <div className="p-2 border rounded">
                            <div className="flex-column align-c justify-sb">
                                <div>
                                    <div className="flex-row align-c justify-sb p-2">
                                        <h4 className="fs-text p-2">Fade In:</h4>
                                        <TouchButton
                                            scroll
                                            touch
                                            textClass="effect-container_text-m"
                                            orientation="row"
                                            disable="configs"
                                            output={fadeIn}
                                            data={fadeIn}
                                            add={add_fadeIn}
                                            subtract={subtract_fadeIn}
                                        />
                                        <span className="fs-text p-2">ms</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-column align-c justify-sb">
                                <div>
                                    <div className="flex-row align-c justify-sb p-2">
                                        <h4 className="fs-text p-2">Fade Out:</h4>
                                        <TouchButton
                                            scroll
                                            touch
                                            textClass="effect-container_text-m"
                                            orientation="row"
                                            disable="configs"
                                            output={fadeOut}
                                            data={fadeOut}
                                            add={add_fadeOut}
                                            subtract={subtract_fadeOut}
                                        />
                                        <span className="fs-text p-2">ms</span>
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