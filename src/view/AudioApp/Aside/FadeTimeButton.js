import { useState, memo } from "react";

import { GSFadeTime } from "../../../core/initGlobalState.js";
import initState from "../../../core/initState.json";

import AsideButton from "./AsideButton.js";
import TouchButton from "../TouchButton.js";
import ToolButton from "../ToolButton.js";


export default memo(function FadeTimeButton() {
    let localStorageFadeTime = JSON.parse(localStorage.getItem('fadeTime'));

    const [fadeTime, setFadeTime] = useState(localStorageFadeTime);

    const add = () => {
        GSFadeTime.time += 10;
        const res =  GSFadeTime.time;
        localStorage.setItem('fadeTime', res + ""); 
        setFadeTime(_ => res);
    }
    const subtract = () => {
        GSFadeTime.time -= 10;
        const res =  GSFadeTime.time;
        localStorage.setItem('fadeTime', res + ""); 
        setFadeTime(_ => res);
    }
    const reset = () => {
        let fadeTime = initState.fadeTime;
        GSFadeTime.time = fadeTime;
        localStorage.setItem('fadeTime', fadeTime + "");
        setFadeTime(_ => fadeTime);
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
                <div style={{width:"240px"}}>
                    <div className="p-2">
                        <div className="p-2 border rounded">
                            <div className="flex-column align-c justify-sb">
                                <div style={{width:"165px"}}>
                                    <div className="flex-row align-c justify-sb p-2">
                                        <h4 className="fs-text">Time:</h4>
                                        <TouchButton
                                            textStyle={{width: "35px"}}
                                            orientation="row"
                                            disable="configs"
                                            output={fadeTime}
                                            add={add}
                                            subtract={subtract}
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