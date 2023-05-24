//@ts-check
import React, {useReducer} from "react";

import {createPanelConfigState} from "../../state/factory.js";
import dispatch from "../../state/dispatch.js";

import {panelConfigReducer} from "../../slices/panelConfig.js";

import PanelButtonsSection from "./PanelButtonsSection.js";
import PanelConfigSection from "./PanelConfigSection.js";
import PanelSwitcher from "./PanelSwitcher.js";

import "./PanelContainer.scss";

function GeneralPanel() {
    /**
    @type {[PanelConfigState, React.Dispatch<PanelConfigAction>]} */
    const [panelConfig, panelConfigDispatch] = useReducer(panelConfigReducer, createPanelConfigState());
    const {
        isPanelButtonsVisible,
        isPanelConfigVisible,
        isPanelVisible,
        panelSelected
    } = panelConfig;
    dispatch.panelConfig = panelConfigDispatch;
    return (
        <>
            <PanelSwitcher
                isPanelVisible={isPanelVisible}
            />
            <aside className={isPanelVisible ? "panel-container flex-column" : "panel-container flex-column panel-container-hidden"}>
                <div className="panel_title">
                    <h4 className="fs-text text-center p-10">General Configurations:</h4>
                    <div className="h-line"/>
                </div>
                <div className="panel-section flex-row">
                    <PanelButtonsSection
                        isPanelButtonsVisible={isPanelButtonsVisible}
                        isPanelConfigVisible={isPanelConfigVisible}
                        panelSelected={panelSelected}
                    />
                    <PanelConfigSection
                        isPanelConfigVisible={isPanelConfigVisible}
                        panelSelected={panelSelected}
                    />
                </div>
            </aside>
        </>
    );
}
export default GeneralPanel;