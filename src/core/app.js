import globalState from "../state/globalState.js";

import {stop} from "./audio.js";
import {_stop} from "./audio.internals.js";

import {randomSetsExecution, randomTimeExecution} from "./generative.js";
import {createId} from "../utils.js";

import {audioListActions} from "../slices/audioList.js";
import {appActions} from "../slices/app.js";

function forEachAudio(audio, id) {
    stop(id);
}
/*-
deleteAll :: audioListDispatcher -> undefined; */
function deleteAll(audioListDispatcher) {
    audioListDispatcher(audioListActions.clear());
    globalState.audioList.forEach(forEachAudio);
    globalState.audioList = new Map();
}

/*-
startApp :: appDispatcher -> undefined */
function startApp(appDispatcher) {
    globalState.startedId = createId();
    //First play
    const set = randomSetsExecution();
    if (set !== undefined) {
        appDispatcher(appActions.newExecution(set));
    }
    //recursive call
    randomTimeExecution(appDispatcher, globalState.startedId);
}

/*-
stopApp :: audioDispatcher -> undefined */
function stopApp(audioDispatcher) {
    globalState.audioList.forEach(function (audioState) {
        if (audioState.isPlaying) {
            _stop(audioState, audioDispatcher);
        }
    });
}

export {
    deleteAll,
    startApp,
    stopApp
};