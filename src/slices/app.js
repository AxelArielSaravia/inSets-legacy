// @ts-check
import globalState from "../state/globalState.js";
import {getRandomColor} from "../utils.js";
import {createAppStateFrom, createAppState} from "../state/factory.js";

/**@type {{type: "newExecution", payload: any}} */
const returnNewExecution = {
    type: "newExecution",
    payload: globalState.generativeState,
};

/**
@type {{type: any}} */
const returnAppAction = {
    type: "start",
};

/**
@type {Readonly<{
    start: () => AppAction,
    stop: () => AppAction,
    newExecution: () => AppAction
}>} */
const appActions = {
    /**
    @type {() => AppAction}*/
    start() {
        globalState.isStarted = true;
        returnAppAction.type = "start";
        return returnAppAction;
    },
    /**
    @type {() => AppAction}*/
    stop() {
        globalState.isStarted = false;
        returnAppAction.type = "stop";
        return returnAppAction;
    },
    /**
    @type {() => AppAction}*/
    newExecution() {
        return returnNewExecution;
    }
};

/**
@type {(state: AppState, action: Maybe<AppAction>) => AppState}*/
function appReducer(state, action) {
    if (action !== undefined) {
        const type = action?.type;
        if (type === "start") {
            const newState = createAppStateFrom(state);
            newState.isStarted = true;
            return newState;
        } else if (type === "stop") {
            return createAppState();
        } else { //type === "nexExecution"
            if (state.isStarted) {
                const newState = createAppStateFrom(state);
                newState.audiosSet = action.payload.audiosSet;
                newState.playColor = getRandomColor();
                newState.playAudiosFromSet = action.payload.playAudiosFromSet;
                return newState;
            }
        }
    }
    return state;
}


export {
    appActions,
    appReducer
};