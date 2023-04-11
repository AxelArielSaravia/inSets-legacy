import globalState from "../state/globalState.js";

/*-
audioListReducer: (AudioListState, {
    payload: string | undefined,
    type: "addLoading" | "addCompleted" | "clear"  | "delete"  | "loadingError"
}) -> AudioListState */
function audioListReducer(state, action) {
    const type = action?.type;
    if (type === "addLoading") {
        const newState = Object.assign({}, state);
        newState.loadedAudioListSize += 1;
        newState.loadedAudioList[action.payload] = true;
        return newState;
    } else if (type === "addCompleted") {
        const newState = Object.assign({}, state);
        if (state.completedAudioListSize < 15) {
            globalState.eventsForEachSet.arrOfEvents.push(1);
            globalState.eventsForEachSet.sumOfAllEvents += 1;
        }
        newState.completedAudioListSize += 1;
        newState.completedAudioList[action.payload] = true;
        return newState;
    } else if (type === "clear") {
        const newState = Object.assign({}, state);
        const completedAudioList = state.completedAudioList;
        const newLoadedAudioList = {};
        let deletedAudios = 0;
        for (const key in state.loadedAudioList) {
            if (completedAudioList[key] === undefined) {
                newLoadedAudioList[key] = true;
            } else {
                deletedAudios += 1;
            }
        }
        newState.completedAudioList = {};
        newState.completedAudioListSize = 0;
        newState.loadedAudioList = newLoadedAudioList;
        newState.loadedAudioListSize -= deletedAudios;
        return newState;
    } else if (type === "delete") {
        const id = action.payload;
        const newState = Object.assign({}, state);

        if (state.completedAudioListSize < 16) {
            const events = globalState.eventsForEachSet.arrOfEvents.pop();
            globalState.eventsForEachSet.sumOfAllEvents -= events;
        }

        delete newState.completedAudioList[id];
        delete newState.loadedAudioList[id];

        newState.completedAudioListSize -= 1;
        newState.loadedAudioListSize -= 1;

        return newState;
    } else if (type === "loadingError") {
        const newState = Object.assign({}, state);
        delete newState.loadedAudioList[action.payload];
        newState.loadedAudioListSize -= 1;
        return newState;
    } else {
        return state;
    }
}
const staticActions = {
    clear: {type: "clear"}
};

const audioListActions = Object.freeze({
    addLoading(id) {
        return {type: "addLoading", payload: id};
    },
    addCompleted(id) {
        return {type: "addCompleted", payload: id};
    },
    clear() {
        globalState.eventsForEachSet = {
            arrOfEvents: [1],
            sumOfAllEvents: 1
        };
        return staticActions.clear;
    },
    delete(id) {
        globalState.audioList.delete(id);
        return {type: "delete", payload: id};
    },
    loadingError(id) {
        return {type: "loadingError", payload: id};
    }
});

export {
    audioListActions,
    audioListReducer
};