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
    }
    if (itemName === "FADES") {
        return <Fades/>;
    }
    if (itemName === "FILTER") {
        return <Filter/>;
    }
    if (itemName === "PANNER") {
        return <Panner/>;
    }
    if (itemName === "RATE") {
        return <PlaybackRate/>;
    }
    if (itemName === "REP") {
        return <RandomEndPoint/>;
    }
    if (itemName === "RSP") {
        return <RandomStartPoint/>;
    }
    if (itemName === "SETS") {
        return <Sets/>;
    }
    if (itemName === "TIME") {
        return <Time/>;
    }
    return;
}

const ConfigPanel_className = "panel config-panel flex-column";

function ConfigPanel({isActive, itemName, closeConfigPanel}) {
    const _className = (
        isActive
        ? ConfigPanel_className
        : ConfigPanel_className + " panel-hidden"
    );

    useOnClickClose(isActive, ".content-audio_aside *", closeConfigPanel);

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

export default ConfigPanel;