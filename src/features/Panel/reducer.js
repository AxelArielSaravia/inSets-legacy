/**
 * @typedef {{
 *  panelItem: "SETS" | "TIME" | "FADE_TIME" | "PANNER" | "FILTER" | "DELAY" | "RATE" | "RSP" | "REP",
 *  isPanelVisible: boolean
 *  isItemsPanelVisible: boolean,
 *  isConfigPanelVisible: boolean
 * }} AudioButtonsSectionState
 */
/**@type {AudioButtonsSectionState} */
const initReducerState = { 
    isConfigPanelVisible: false, 
    isItemsPanelVisible: false,
    isPanelVisible: false,
    panelItem: ""
};


/**
 * @param {AudioButtonsSectionState} state 
 * @param {{
 *  type: "panelItem/change" | "panel/switch" | "configPanel/close",
 *  payload?: "SETS" | "TIME" | "FADE_TIME" | "PANNER" | "FILTER" | "DELAY" | "RATE" | "RSP" | "REP"
 * }} action 
 * @returns 
 */
function reducer(state = initReducerState, action) {
    switch (action.type) {
        case "panelItem/change": { 
            if (state.panelItem === action.payload && state.isConfigPanelVisible) 
                return {
                    ...state, 
                    isConfigPanelVisible: false, 
                    isItemsPanelVisible:true, 
                    panelItem: action.payload
                };
            return { 
                ...state,
                isConfigPanelVisible: true,
                isItemsPanelVisible: false,
                panelItem: action.payload
            };
        }
        case "panel/switch": {
            if (state.isPanelVisible) 
                return {
                    isPanelVisible: false,
                    isItemsPanelVisible: false,
                    isConfigPanelVisible: false,
                    panelItem: ""
                }
            return {
                isPanelVisible: true,
                isItemsPanelVisible: true,
                isConfigPanelVisible: false,
                panelItem: ""
            } 
        }
        case "configPanel/close": return { 
            ...state,
            isItemsPanelVisible: true,
            isConfigPanelVisible: false,
            panelItem: ""
        };
        default: return state;
    }
}

export {
    initReducerState,
    reducer
}