import {useReducer} from "react";

import {
    createConfigPanelState,
    configPanelReducer
} from "../../reducer/ConfigPanelReducer.js";

import ItemsPanel from "./ItemsPanel/component.js";
import ConfigPanel from "./ConfigPanel/component.js";

import "./style.scss";


//COMPONENT: PaneSwitcher
function PanelSwitcher({switchOnClick, isPanelVisible}) {
    return (
        <div className="panel-switcher flex-column align-c justify-c">
            <button
                className="flex-row align-c"
                type="button"
                onClick={switchOnClick}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="IconColumns icon-panel icon-text"
                    viewBox="0 0 16 16"
                >
                    <path d={
                        isPanelVisible
                        ? "M6 1v3H1V1h5zM1 0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H1zm14 12v3h-5v-3h5zm-5-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-5zM6 8v7H1V8h5zM1 7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H1zm14-6v7h-5V1h5zm-5-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1h-5z"
                        : "M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V2zm8.5 0v8H15V2H8.5zm0 9v3H15v-3H8.5zm-1-9H1v3h6.5V2zM1 14h6.5V6H1v8z"
                    }
                    />
                </svg>
            </button>
        </div>
    );
}


//COMPONENT: GeneralPanel

let _dispatch = () => undefined;

function closeConfigPanel() {
    _dispatch({type: "configPanel/close"});
}
function switchOnClick() {
    _dispatch({type: "panel/switch"});
}

function GeneralPanel() {
    const [{
        isItemsPanelVisible,
        isConfigPanelVisible,
        isPanelVisible,
        panelItem
    }, dispatch] = useReducer(configPanelReducer, createConfigPanelState());
    _dispatch = dispatch;

    return (
        <>
            <PanelSwitcher
                switchOnClick={switchOnClick}
                isPanelVisible={isPanelVisible}
            />
            <aside className={isPanelVisible ? "panelContainer flex-column" : "panelContainer flex-column panelContainer-hidden"}>
                <div className="panel_title">
                    <h4 className="fs-text text-center p-10">General Configurations:</h4>
                    <div className="h-line"/>
                </div>
                <div className="panel-section flex-row">
                    <ItemsPanel
                        isItemsPanelVisible={isItemsPanelVisible}
                        isConfigPanelVisible={isConfigPanelVisible}
                        panelItem={panelItem}
                        dispatch={dispatch}
                    />
                    <ConfigPanel
                        isActive={isConfigPanelVisible}
                        itemName={panelItem}
                        closeConfigPanel={closeConfigPanel}
                    />
                </div>
            </aside>
        </>
    );
}
export default GeneralPanel;