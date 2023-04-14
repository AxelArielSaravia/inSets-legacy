import {useReducer} from "react";

import {panelConfigReducer, panelConfigActions} from "../../slices/panelConfig.js";
import {panelConfigInitialState} from "../initialState.js";

import PanelButtonsSection from "./PanelButtonsSection.js";
import PanelConfigSection from "./PanelConfigSection.js";
import PanelSwitcher from "./PanelSwitcher.js";

import "./PanelContainer.scss";


let _dispatch = () => undefined;

function closeConfigPanel() {
    _dispatch(panelConfigActions.closePanel);
}
function switchOnClick() {
    _dispatch(panelConfigActions.switchPanel);
}

function GeneralPanel() {
    const [{
        isPanelButtonsVisible,
        isPanelConfigVisible,
        isPanelVisible,
        panelSelected
    }, dispatch] = useReducer(panelConfigReducer, panelConfigInitialState);
    _dispatch = dispatch;

    return (
        <>
            <PanelSwitcher
                switchOnClick={switchOnClick}
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
                        dispatch={dispatch}
                    />
                    <PanelConfigSection
                        isActive={isPanelConfigVisible}
                        panelSelected={panelSelected}
                        closeConfigPanel={closeConfigPanel}
                    />
                </div>
            </aside>
        </>
    );
}
export default GeneralPanel;