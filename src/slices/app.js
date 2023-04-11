import globalState from "../state/globalState.js";
import {getRandomColor} from "../utils.js";

/*-
appReducer: (AppState, {
    type: "start" | "stop" | "newAudioSet"
    payload: undefined | string
}) -> AppState */
function appReducer(state, action) {
    const type = action?.type;
    if (type === "start") {
        const newState = Object.assign({}, state);
        newState.isStarted = true;
        return newState;
    } else if (type === "stop") {
        return {
            isStarted: false,
            playAudiosSet: {},
            playColor: "",
            state: true
        };
    } else if (type === "newExecution" && state.isStarted) {
        const newState = Object.assign({}, state);
        newState.playAudiosSet = action.payload.audios;
        newState.state = action.payload.state;
        newState.playColor = getRandomColor();
        return newState;
    } else {
        return state;
    }
}

const staticActions = {
    start: {type: "start"},
    stop: {type: "stop"},
};

const appActions = Object.freeze({
    start() {
        globalState.isStarted = true;
        return staticActions.start;
    },
    stop() {
        globalState.isStarted = false;
        return staticActions.stop;
    },
    newExecution(sets) {
        return {type: "newExecution", payload: sets};
    }
});

export {
    appActions,
    appReducer
};