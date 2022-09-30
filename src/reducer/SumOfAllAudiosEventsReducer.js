
/**
 * @param {number} state 
 * @param {{
 *  type: "add" | "subract"
 *  payload?: number
 * }} action 
 * @returns {number}
 */
function SumOfAllAudiosEventsReducer(state, action) {
    switch (action.type) {
        case "add": return state + 1;
        case "subtract": return state - action.payload;
        case "clear": return 0;
        default: return state;
    }
}

export { SumOfAllAudiosEventsReducer }