import { memo, useReducer, useCallback } from "react";

import { initReducerState, reducer } from "./reducer.js";

import { IconColumns, IconColumnsGap } from "../../components/icons/component.js";
import ItemsPanel from "./ItemsPanel/component.js";
import ConfigPanel from "./ConfigPanel/component.js";

import "./style.scss";


function PanelSwitcher({switchOnClick, isPanelVisible}) {
    return (
        <div className="panel-switcher flex-column align-c justify-c">
            <button 
                className="flex-row align-c"
                type="button"
                onClick={switchOnClick}
            >
                <div></div>
                { isPanelVisible 
                    ? <IconColumnsGap className="icon-panel icon-text"/>
                    : <IconColumns className="icon-panel icon-text"/>
                }
            </button>
        </div>
    );
}


function GeneralPanel() {
    const [{isItemsPanelVisible, isConfigPanelVisible, isPanelVisible, panelItem}, dispatch] = useReducer(reducer, initReducerState); 

    const closeConfigPanel = useCallback(() => { dispatch({type: "configPanel/close"}); }, [])
    
    const switchOnClick = () => { dispatch({type: "panel/switch"}); }

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
export default memo(GeneralPanel);