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
        return (
            (state.panelItem === payload && state.isConfigPanelVisible)
            ? Object.assign({}, state, {
                isConfigPanelVisible: false,
                isItemsPanelVisible: true,
                panelItem: payload
            })
            : Object.assign({}, state,{
                isConfigPanelVisible: true,
                isItemsPanelVisible: false,
                panelItem: payload
            })
        );
    } else if (type === "panel/switch") {
        return (
            state.isPanelVisible
            ? {
                isConfigPanelVisible: false,
                isItemsPanelVisible: false,
                isPanelVisible: false,
                panelItem: ""
            }
            : {
                isConfigPanelVisible: false,
                isItemsPanelVisible: true,
                isPanelVisible: true,
                panelItem: ""
            }
        );
    } else if (type === "configPanel/close") {
        return Object.assign({}, state, {
            isConfigPanelVisible: false,
            isItemsPanelVisible: true,
            panelItem: ""
        });
    } else {
        return state;
    }
}

export {
    createConfigPanelState,
    configPanelReducer
};