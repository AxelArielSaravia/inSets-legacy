import { GlobalState } from "../state/Global/index.js";

/**
 * @param {ViewAudioListState} state 
 * @param {{  
 *  type: "addLoading" | 
 *        "addCompleted" |
 *        "clear" | 
 *        "delete" | 
 *        "loadingError"
 *  id?: string
 * }} action 
 * @returns {ViewAudioListState}
 */
const ViewAudioListReducer = (state = {}, action) => {
    switch (action.type) {
        case "addLoading": return { 
            ...state,
            loadedAudioList: {...state.loadedAudioList, [action.id]: null},
            loadedAudioListSize: state.loadedAudioListSize + 1,
        };
        case "addCompleted": {
            if (state.completedAudioListSize < 15) {
                GlobalState.eventsForEachSet.arrOfEvents.push(1);
                GlobalState.eventsForEachSet.sumOfAllEvents += 1; 
            }
            return {
                ...state,
                completedAudioList: { ...state.completedAudioList, [action.id]: null },
                completedAudioListSize: state.completedAudioListSize + 1,
            };
        }
        case "clear": {
            GlobalState.eventsForEachSet = {arrOfEvents: [1], sumOfAllEvents: 1}

            const newLoadedAudioList = {...state.loadedAudioList};
            const completedKeys = Object.keys(state.completedAudioList);
            completedKeys.forEach(key => delete newLoadedAudioList[key]);

            return {
                ...state, 
                completedAudioList: {},
                completedAudioListSize: 0,
                loadedAudioList: newLoadedAudioList,
                loadedAudioListSize: state.loadedAudioListSize - completedKeys.length
            };
        }
        case "delete": {
            if (action.id in state.completedAudioList) {

                GlobalState._audio_list.delete(action.id);
                if (state.completedAudioListSize < 16) {
                    const events = GlobalState.eventsForEachSet.arrOfEvents.pop();
                    GlobalState.eventsForEachSet.sumOfAllEvents -= events;
                }

                const newCompletedAudioList = { ...state.completedAudioList };
                const newLoadedAudioList = { ...state.loadedAudioList };
                delete newCompletedAudioList[action.id];
                delete newLoadedAudioList[action.id];

                return {
                    ...state,
                    completedAudioList: newCompletedAudioList,
                    completedAudioListSize: state.completedAudioListSize - 1,
                    loadedAudioList: newLoadedAudioList,
                    loadedAudioListSize: state.loadedAudioListSize - 1
                };
            }
            return state;
        }
        case "loadingError": {
            const newLoadedAudioList = { ...state.loadedAudioList };
            delete newLoadedAudioList[action.id];
            return {
                ...state,
                loadedAudioList: newLoadedAudioList,
                loadedAudioListSize: state.loadedAudioListSize - 1
            }    
        }
        default: return state;
    }
}

export { ViewAudioListReducer };