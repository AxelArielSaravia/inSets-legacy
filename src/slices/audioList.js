// @ts-check
import globalState from "../state/globalState.js";
import {createAudioListStateFrom} from "../state/factory.js";

/**
@type {Readonly<{
    addLoading: (id: string) => AudioListAction,
    addCompleted: (id: string) => AudioListAction,
    clear: () => AudioListAction,
    delete: (id: string) => AudioListAction,
    loadingError: (id: string) => AudioListAction
}>}*/
const audioListActions = {
    /**
    @type {(id: string) => AudioListAction} */
    addLoading(id) {
        return {type: "addLoading", payload: id};
    },
    /**
    @type {(id: string) => AudioListAction} */
    addCompleted(id) {
        return {type: "addCompleted", payload: id};
    },
    /**
    @type {() => AudioListAction} */
    clear() {
        globalState.eventsForEachSet.sumOfAllEvents = 1;
        globalState.eventsForEachSet.arrOfEvents = [1];
        return {type: "clear", payload: ""};
    },
    /**
    @type {(id: string) => AudioListAction} */
    delete(id) {
        globalState.audioList.delete(id);
        return {type: "delete", payload: id};
    },
    /**
    @type {(id: string) => AudioListAction} */
    loadingError(id) {
        return {type: "loadingError", payload: id};
    }
};

/**
@type {(state: AudioListState, action: AudioListAction) => AudioListState} */
function audioListReducer(state, action) {
    const type = action?.type;
    if (type === "addLoading") {
        if (state.loadedAudioList[action.payload] === undefined) {
            const newState = createAudioListStateFrom(state);
            newState.loadedAudioListSize += 1;
            newState.loadedAudioList[action.payload] = true;
            return newState;
        }
        return state;
    } else if (type === "addCompleted") {
        if (state.completedAudioList[action.payload] === undefined) {
            const newState = createAudioListStateFrom(state);
            if (state.completedAudioListSize < 15) {
                globalState.eventsForEachSet.arrOfEvents.push(1);
                globalState.eventsForEachSet.sumOfAllEvents += 1;
            }
            newState.completedAudioListSize += 1;
            newState.completedAudioList[action.payload] = true;
            return newState;
        }
        return state;
    } else if (type === "clear") {
        if (0 < state.completedAudioListSize) {
            const newState = createAudioListStateFrom(state);
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
        }
        return state;
    } else if (type === "delete") {
        if (state.loadedAudioList[action.payload] !== undefined) {
            const id = action.payload;
            const newState = createAudioListStateFrom(state);
            if (state.completedAudioListSize < 16) {
                const events = globalState.eventsForEachSet.arrOfEvents.pop();
        //events will always be a number, cause the 1st element never be poped
                if (events !== undefined) {
                    globalState.eventsForEachSet.sumOfAllEvents -= events;
                }
            }
            delete newState.completedAudioList[id];
            delete newState.loadedAudioList[id];
            newState.completedAudioListSize -= 1;
            newState.loadedAudioListSize -= 1;
            return newState;
        }
        return state;
    } else { //type === "loadingError"
        if (state.loadedAudioList[action.payload] !== undefined) {
            const newState = createAudioListStateFrom(state);
            delete newState.loadedAudioList[action.payload];
            newState.loadedAudioListSize -= 1;
            return newState;
        }
        return state;
    }
}

export {
    audioListActions,
    audioListReducer
};