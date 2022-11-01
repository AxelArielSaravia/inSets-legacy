import {GlobalState} from "../state/Global/index.js";

/*-
ViewAudioListReducer: (ViewAudioListState, {
    id: string | undefined,
    type: "addLoading" | "addCompleted" | "clear"  | "delete"  | "loadingError"
}) -> ViewAudioListState
*/
function ViewAudioListReducer(state, action) {
    const {type} = action;

    if (type === "addLoading") {
        return {
            ...state,
            loadedAudioList: {
                ...state.loadedAudioList,
                [action.id]: undefined
            },
            loadedAudioListSize: state.loadedAudioListSize + 1,
        };
    } else if (type === "addCompleted"
        && state.completedAudioListSize < 15
    ) {
        GlobalState.eventsForEachSet.arrOfEvents.push(1);
        GlobalState.eventsForEachSet.sumOfAllEvents += 1;

        return {
            ...state,
            completedAudioList: {
                ...state.completedAudioList,
                [action.id]: undefined
            },
            completedAudioListSize: state.completedAudioListSize + 1,
        };
    } else if (type === "clear") {
        GlobalState.eventsForEachSet = {
            arrOfEvents: [1],
            sumOfAllEvents: 1
        };

        const newLoadedAudioList = {...state.loadedAudioList};
        const completedKeys = Object.keys(state.completedAudioList);

        completedKeys.forEach((key) => delete newLoadedAudioList[key]);

        return {
            ...state,
            completedAudioList: {},
            completedAudioListSize: 0,
            loadedAudioList: newLoadedAudioList,
            loadedAudioListSize: (
                state.loadedAudioListSize - completedKeys.length
            )
        };
    } else if (type === "delete"
        && action.id in state.completedAudioList
    ) {
        GlobalState.audio_list.delete(action.id);

        if (state.completedAudioListSize < 16) {
            const events = GlobalState.eventsForEachSet.arrOfEvents.pop();
            GlobalState.eventsForEachSet.sumOfAllEvents -= events;
        }

        const newCompletedAudioList = {...state.completedAudioList};
        const newLoadedAudioList = {...state.loadedAudioList};
        delete newCompletedAudioList[action.id];
        delete newLoadedAudioList[action.id];

        return {
            ...state,
            completedAudioList: newCompletedAudioList,
            completedAudioListSize: state.completedAudioListSize - 1,
            loadedAudioList: newLoadedAudioList,
            loadedAudioListSize: state.loadedAudioListSize - 1
        };
    } else if (type === "loadingError") {
        const newLoadedAudioList = {...state.loadedAudioList};
        delete newLoadedAudioList[action.id];
        return {
            ...state,
            loadedAudioList: newLoadedAudioList,
            loadedAudioListSize: state.loadedAudioListSize - 1
        };
    }
    return state;
}

export {
    ViewAudioListReducer
};