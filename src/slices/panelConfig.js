/*-
ConfigPanelState :: {
    panelSelected: "SETS"
            | "TIME"
            | "FADE_TIME"
            | "PANNER"
            | "FILTER"
            | "DELAY"
            | "RATE"
            | "RSP"
            | "REP",
    isPanelVisible: boolean
    isPanelButtonsVisible: boolean,
    isPanelConfigVisible: boolean
}
*/

/*-
panelConfigReducer: (
    ConfigPanelState,
    {
        type: "panel/change"
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
    }
) -> ConfigPanelState */
function panelConfigReducer(state, action) {
    const type = action?.type;
    const payload = action?.payload;

    if (type === "panel/change") {

        return (
            state.panelSelected === payload && state.isPanelConfigVisible
            ? {
                isPanelConfigVisible: false,
                isPanelButtonsVisible: true,
                isPanelVisible: true,
                panelSelected: payload
            }
            : {
                isPanelConfigVisible: true,
                isPanelButtonsVisible: false,
                isPanelVisible: true,
                panelSelected: payload
            }
        );
    } else if (type === "panel/switch") {
        return (
            state.isPanelVisible
            ? {
                isPanelConfigVisible: false,
                isPanelButtonsVisible: false,
                isPanelVisible: false,
                panelSelected: ""
            }
            : {
                isPanelConfigVisible: false,
                isPanelButtonsVisible: true,
                isPanelVisible: true,
                panelSelected: ""
            }
        );
    } else if (type === "panel/close") {
        return {
            isPanelConfigVisible: false,
            isPanelButtonsVisible: true,
            isPanelVisible: true,
            panelSelected: ""
        };
    } else {
        return state;
    }
}

const panelConfigActions = Object.freeze({
    changePanelToSets: {type: "panel/change", payload: "SETS"},
    changePanelToTime: {type: "panel/change", payload: "TIME"},
    changePanelToFades: {type: "panel/change", payload: "FADES"},
    changePanelToPanner: {type: "panel/change", payload: "PANNER"},
    changePanelToFilter: {type: "panel/change", payload: "FILTER"},
    changePanelToDelay: {type: "panel/change", payload: "DELAY"},
    changePanelToRate: {type: "panel/change", payload: "RATE"},
    changePanelToRSP: {type: "panel/change", payload: "RSP"},
    changePanelToREP: {type: "panel/change", payload: "REP"},
    switchPanel: {type: "panel/switch"},
    closePanel: {type: "panel/close"}
});

export {
    panelConfigActions,
    panelConfigReducer
};