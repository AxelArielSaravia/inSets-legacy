import useOnClickClosePanel from "../hooks/useOnClickClosePanel.js";

import {IconChevronBarLeft} from "../icons.js";

import Delay from "./Delay.js";
import Fades from "./Fades.js";
import Filter from "./Filter.js";
import Panner from "./Panner.js";
import PlaybackRate from "./PlaybackRate.js";
import RandomEndPoint from "./RandomEndPoint.js";
import RandomStartPoint from "./RandomStartPoint.js";
import Sets from "./Sets.js";
import Time from "./Time.js";

import "./PanelConfigSection.scss";

const PanelConfig_className = "panel panel-config flex-column";

function PanelSelected({selected}) {
    if (selected === "DELAY") {
        return <Delay/>;
    }
    if (selected === "FADES") {
        return <Fades/>;
    }
    if (selected === "FILTER") {
        return <Filter/>;
    }
    if (selected === "PANNER") {
        return <Panner/>;
    }
    if (selected === "RATE") {
        return <PlaybackRate/>;
    }
    if (selected === "REP") {
        return <RandomEndPoint/>;
    }
    if (selected === "RSP") {
        return <RandomStartPoint/>;
    }
    if (selected === "SETS") {
        return <Sets/>;
    }
    if (selected === "TIME") {
        return <Time/>;
    }
    return;
}

function PanelConfigSection({isActive, panelSelected, closeConfigPanel}) {
    const _className = (
        isActive
        ? PanelConfig_className
        : PanelConfig_className + " panel-hidden"
    );

    useOnClickClosePanel(isActive, ".content-audio_aside *", closeConfigPanel);

    return (
        <div id="configPanel" className={_className}>
            <div className="flex-row justify-end">
                <button
                    title="close"
                    type="button"
                    className="panel-config-close flex-column align-c"
                    onClick={closeConfigPanel}
                >
                    <IconChevronBarLeft className="icon-text-l"/>
                </button>
            </div>
            <PanelSelected selected={panelSelected}/>
        </div>
    );
}

export default PanelConfigSection;