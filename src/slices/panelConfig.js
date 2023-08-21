//@ts-check
/**
@type {Readonly<{
    changePanelToSets: PanelConfigAction,
    changePanelToTime: PanelConfigAction,
    changePanelToFades: PanelConfigAction,
    changePanelToPanner: PanelConfigAction,
    changePanelToFilter: PanelConfigAction,
    changePanelToDelay: PanelConfigAction,
    changePanelToRate: PanelConfigAction,
    changePanelToRSP: PanelConfigAction,
    changePanelToREP: PanelConfigAction,
    switchPanel: PanelConfigAction,
    closePanel: PanelConfigAction
}>} */
const panelConfigActions = {
    changePanelToSets: {type: "panel/change", payload: "SETS"},
    changePanelToTime: {type: "panel/change", payload: "TIME"},
    changePanelToFades: {type: "panel/change", payload: "FADES"},
    changePanelToPanner: {type: "panel/change", payload: "PANNER"},
    changePanelToFilter: {type: "panel/change", payload: "FILTER"},
    changePanelToDelay: {type: "panel/change", payload: "DELAY"},
    changePanelToRate: {type: "panel/change", payload: "RATE"},
    changePanelToRSP: {type: "panel/change", payload: "RSP"},
    changePanelToREP: {type: "panel/change", payload: "REP"},
    switchPanel: {type: "panel/switch", payload: ""},
    closePanel: {type: "panel/close", payload: ""}
};

/**
@type {(state: PanelConfigState, action: PanelConfigAction) => PanelConfigState} */
function panelConfigReducer(state, action) {
    const type = action.type;
    const payload = action.payload;
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

export {
    panelConfigActions,
    panelConfigReducer
};
