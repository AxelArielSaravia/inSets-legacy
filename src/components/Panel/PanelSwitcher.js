//@ts-check
import React from "react";

import dispatch from "../../state/dispatch.js";
import {panelConfigActions} from "../../slices/panelConfig.js";

import Button from "../Button.js";
import {IconGear} from "../icons.js";

import "./PanelSwitcher.scss";

function switchOnClick() {
    dispatch.panelConfig(panelConfigActions.switchPanel);
}
/**
@type {(props: {isPanelVisible: boolean}) => JSX.Element} */
function PanelSwitcher({isPanelVisible}) {
    return (
        <div className="panel-switcher flex-column align-c justify-c">
            <Button
                className={isPanelVisible ? "flex-row align-c active" : "flex-row align-c"}
                onClick={switchOnClick}
            >
                <IconGear className="icon-text-l"/>
            </Button>
        </div>
    );
}


export default PanelSwitcher;