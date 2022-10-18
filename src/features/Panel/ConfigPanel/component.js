import {memo} from "react";

import {useOnClickClose} from "../hook.js";

import {IconChevronBarLeft} from "../../../components/icons/component.js";

import Delay from "../Delay/component.js";
import Fades from "../Fades/component.js";
import Filter from "../Filter/component.js";
import Panner from "../Panner/component.js";
import PlaybackRate from "../PlaybackRate/component.js";
import RandomEndPoint from "../RandomEndPoint/component.js";
import RandomStartPoint from "../RandomStartPoint/component.js";
import Sets from "../Sets/component.js";
import Time from "../Time/component.js";

import "./style.scss";


function ConfigPanelContent({itemName}) {
    if (itemName === "DELAY") {
        return <Delay/>;
    } else if (itemName === "FADES") {
        return <Fades/>;
    } else if (itemName === "FILTER") {
        return <Filter/>;
    } else if (itemName === "PANNER") {
        return <Panner/>;
    } else if (itemName === "RATE") {
        return <PlaybackRate/>;
    } else if (itemName === "REP") {
        return <RandomEndPoint/>;
    } else if (itemName === "RSP") {
        return <RandomStartPoint/>;
    } else if (itemName === "SETS") {
        return <Sets/>;
    } else if (itemName === "TIME") {
        return <Time/>;
    } else {
        return;
    }
}

const className = () => "panel config-panel flex-column";

function ConfigPanel({isActive, itemName, closeConfigPanel }) {
    const _className = isActive ? className() : className() + " panel-hidden";

    useOnClickClose(isActive, ".generalPanel *", closeConfigPanel);

    return (
        <div id="configPanel" className={_className}>
            <div className="flex-row justify-end">
                <button
                    title="close"
                    type="button" 
                    className="configPanel-close flex-column align-c"
                    onClick={closeConfigPanel}
                >
                    <IconChevronBarLeft className="icon-text-l"/>
                </button>
            </div>
            <ConfigPanelContent itemName={itemName}/> 
        </div>
    );
}

export default memo(ConfigPanel);