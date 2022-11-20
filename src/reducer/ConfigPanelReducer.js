/*-
@type ConfigPanelState: {
    panelItem: "SETS"
            | "TIME"
            | "FADE_TIME"
            | "PANNER"
            | "FILTER"
            | "DELAY"
            | "RATE"
            | "RSP"
            | "REP",
    isPanelVisible: boolean
    isItemsPanelVisible: boolean,
    isConfigPanelVisible: boolean
}
*/

/*-
createConfigPanelState: undefined -> ConfigPanelState
*/
function createConfigPanelState() {
    return {
        isConfigPanelVisible: false,
        isItemsPanelVisible: false,
        isPanelVisible: false,
        panelItem: ""
    };
}

/*-
configPanelReducer: (ConfigPanelState, {
    type: "panelItem/change"
        | "panel/switch"
        | "configPanel/close",
    payload: "SETS"
            | "TIME"
            | "FADE_TIME"
            | "PANNER"
            | "FILTER"
            | "DELAY"
            | "RATE"
            | "RSP"
            | "REP"
}) -> ConfigPanelState
*/
function configPanelReducer(state, action) {
    const {payload, type} = action;
    if (type === "panelItem/change") {
        if (state.panelItem === payload && state.isConfigPanelVisible) {
            return {
                ...state,
                isConfigPanelVisible: false,
                isItemsPanelVisible: true,
                panelItem: payload
            };
        }
        return {
            ...state,
            isConfigPanelVisible: true,
            isItemsPanelVisible: false,
            panelItem: payload
        };
    } else if (type === "panel/switch") {
        if (state.isPanelVisible) {
            return {
                isConfigPanelVisible: false,
                isItemsPanelVisible: false,
                isPanelVisible: false,
                panelItem: ""
            };
        }
        return {
            isConfigPanelVisible: false,
            isItemsPanelVisible: true,
            isPanelVisible: true,
            panelItem: ""
        };
    } else if (type === "configPanel/close") {
        return {
            ...state,
            isConfigPanelVisible: false,
            isItemsPanelVisible: true,
            panelItem: ""
        };
    } else {
        return state;
    }
}

export {
    createConfigPanelState,
    configPanelReducer
};