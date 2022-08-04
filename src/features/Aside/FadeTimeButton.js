import { memo } from "react";

import AsideButton from "./AsideButton.js";
import TouchButton from "../TouchButton.js";
import ToolButton from "../ToolButton.js";


export default memo(function FadeTimeButton(props) {
    const fadeIn = props.fadeIn
    const fadeOut = props.fadeOut
    
    const operation = (operation, variable, type) => (data) => {
        if (operation === "add") {
            props.setDispatcher(variable, type, data + 10);
        } else if (operation === "subtract") {
            props.setDispatcher(variable, type, data - 10);
        }
    }

    const reset = () => { 
        props.setDispatcher("fadeIn", "reset", null); 
        props.setDispatcher("fadeOut", "reset", null); 
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
                                <div style={{width:"200px"}}>
                                    <div className="flex-row align-c justify-sb p-3">
                                        <h4 className="fs-text">Fade In:</h4>
                                        <TouchButton
                                            scroll
                                            touch
                                            textStyle={{width: "35px"}}
                                            orientation="row"
                                            disable="configs"
                                            output={fadeIn}
                                            data={fadeIn}
                                            add={operation("add", "fadeIn", "change")}
                                            subtract={operation("subtract", "fadeIn", "change")}
                                        />
                                        <span className="fs-text">ms</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-column align-c justify-sb">
                                <div style={{width:"200px"}}>
                                    <div className="flex-row align-c justify-sb p-3">
                                        <h4 className="fs-text">Fade Out:</h4>
                                        <TouchButton
                                            scroll
                                            touch
                                            textStyle={{width: "35px"}}
                                            orientation="row"
                                            disable="configs"
                                            output={fadeOut}
                                            data={fadeOut}
                                            add={operation("add", "fadeOut", "change")}
                                            subtract={operation("subtract", "fadeOut", "change")}
                                        />
                                        <span className="fs-text">ms</span>
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