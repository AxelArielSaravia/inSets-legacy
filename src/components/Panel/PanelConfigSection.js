//@ts-check
import React from "react";
import dispatch from "../../state/dispatch.js";

import {panelConfigActions} from "../../slices/panelConfig.js";

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
        : PanelConfig_className + " panel-hidden"
    );

    if (isPanelConfigVisible) {
        document.onclick = function docEventClick(e) {
            if (!e.target?.matches(".content-audio_aside *")) {
                closeConfigPanel();
                document.onclick = null;
            }
        };
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