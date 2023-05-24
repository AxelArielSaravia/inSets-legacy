//@ts-check
import globalState from "../state/globalState.js";

import {stop} from "./audio.js";
import {_stop} from "./audio.internals.js";

import {randomSetsExecution, randomTimeExecution} from "./generative.js";
import {createId} from "../utils.js";

import {audioListActions} from "../slices/audioList.js";
import {appActions} from "../slices/app.js";
import dispatch from "../state/dispatch.js";


async function forEachAudio(_, id, map) {
    await stop(id);
    map.delete(id);
}

/**
@type {() => void} */
function deleteAll() {
    dispatch.audioList(audioListActions.clear());
    globalState.audioList.forEach(forEachAudio);
}


/**
@type {() => void} */
function startApp() {
    globalState.startedId = createId();
    //First play
    const execute = randomSetsExecution();
    if (execute !== undefined) {
        dispatch.app(appActions.newExecution());
    }
    //recursive call
    randomTimeExecution(globalState.startedId);
}

/**
@type {(audioState: AudioState) => void} */
function stopApp_forEach(audioState) {
    if (audioState.isPlaying) {
        _stop(audioState, true);
    }
}

/**
@type {() => void} */
function stopApp() {
    globalState.audioList.forEach(stopApp_forEach);
}

export {
    deleteAll,
    startApp,
    stopApp
};