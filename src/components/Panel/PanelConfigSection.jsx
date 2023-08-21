//@ts-check
import React from "react";
import dispatch from "../../state/dispatch.js";

import {panelConfigActions} from "../../slices/panelConfig.js";

import {IconChevronBarLeft} from "../icons.jsx";
import Delay from "./Delay.jsx";
import Fades from "./Fades.jsx";
import Filter from "./Filter.jsx";
import Panner from "./Panner.jsx";
import PlaybackRate from "./PlaybackRate.jsx";
import RandomEndPoint from "./RandomEndPoint.jsx";
import RandomStartPoint from "./RandomStartPoint.jsx";
import Sets from "./Sets.jsx";
import Time from "./Time.jsx";

function closeConfigPanel() {
    dispatch.panelConfig(panelConfigActions.closePanel);
}

/**
@type {(prop: {
    selected: (
        ""
        | "DELAY"
        | "FILTER"
        | "PANNER"
        | "RATE"
        | "REP"
        | "RSP"
        | "SETS"
        | "TIME"
        | "FADES"
    )
}) => JSX.Element | null} */
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
    return null;
}


const MIN_WIDTH_768 = window.matchMedia("(min-width: 768px)");


function documentOnclick(e) {
    if (!MIN_WIDTH_768.matches) {
        document.onclick = null;
    } else {
        if (!e.target?.matches(".content-audio_aside *")) {
            closeConfigPanel();
            document.onclick = null;
        }
    }
}

const PanelConfig_className = "panel panel-config flex-column";
/**
@type {(props: {
    isPanelConfigVisible: boolean,
    panelSelected: (
        ""
        | "DELAY"
        | "FILTER"
        | "PANNER"
        | "RATE"
        | "REP"
        | "RSP"
        | "SETS"
        | "TIME"
        | "FADES"
    )
}) => JSX.Element} */
function PanelConfigSection({isPanelConfigVisible, panelSelected}) {
    const _className = (
        isPanelConfigVisible
        ? PanelConfig_className
        : `${PanelConfig_className} panel-hidden`
    );

    if (isPanelConfigVisible && MIN_WIDTH_768.matches) {
        document.onclick = documentOnclick;
    } else {
        document.onclick = null;
    }

    return (
        <div id="configPanel" className={_className}>
            <div className="flex-row justify-end">
                <button
                    title="close"
                    type="button"
                    className="panel-config-close t-button flex-column align-c"
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
