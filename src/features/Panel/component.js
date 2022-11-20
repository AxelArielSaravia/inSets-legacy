import {useReducer, useCallback} from "react";

import {
    createConfigPanelState,
    configPanelReducer
} from "../../reducer/ConfigPanelReducer.js";

import {IconColumns, IconColumnsGap} from "../../components/icons/component.js";
import ItemsPanel from "./ItemsPanel/component.js";
import ConfigPanel from "./ConfigPanel/component.js";

import "./style.scss";

function IsPanelVisible({isPanelVisible}) {
    if (isPanelVisible) {
        return <IconColumnsGap className="icon-panel icon-text"/>;
    }
    return <IconColumns className="icon-panel icon-text"/>;
}

function PanelSwitcher({switchOnClick, isPanelVisible}) {
    return (
        <div className="panel-switcher flex-column align-c justify-c">
            <button
                className="flex-row align-c"
                type="button"
                onClick={switchOnClick}
            >
                <div></div>
                <IsPanelVisible isPanelVisible={isPanelVisible}/>
            </button>
        </div>
    );
}

function GeneralPanel() {
    const [{
        isItemsPanelVisible,
        isConfigPanelVisible,
        isPanelVisible,
        panelItem
    }, dispatch] = useReducer(configPanelReducer, createConfigPanelState());

    const closeConfigPanel = useCallback(function () {
        dispatch({type: "configPanel/close"});
    }, []);

    function switchOnClick() {
        dispatch({type: "panel/switch"});
    }

    return (
        <div className="generalPanel flex-column">
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
        </div>
    );
}
export default GeneralPanel;