//@ts-check
import globalState from "../state/globalState.js";
import dispatch from "../state/dispatch.js";

import {audioListActions} from "../slices/audioList.js";

import {wait} from "./utils.js";
import {rToFade} from "./maps.js";
import {_stop, _play} from "./audio.internals.js";


/**
@type {(id: string) => Maybe<Promise<boolean>>} */
function stop(id) {
    const audioState = globalState.audioList.get(id);
    if (audioState === undefined) {
        return;
    }
    return _stop(audioState, true);
}

/**
@type {(id: string) => Maybe<Promise<boolean>>} */
function play(id) {
    const audioState = globalState.audioList.get(id);
    if (audioState === undefined) {
        return;
    }
    return _play(audioState);
}

/**
@type {(id: string) => Promise<Maybe<boolean>>}*/
async function rePlay(id) {
    const audioState = globalState.audioList.get(id);
    if (audioState !== undefined) {
        if (audioState.isPlaying) {
            const bool = await _stop(audioState, true);
            if (bool && globalState.isStarted) {
                return _play(audioState);
            }
        } else {
            await wait(rToFade(globalState.fadeOut) + 50);
            if (globalState.isStarted) {
                return _play(audioState);
            }
        }
    }
}

/**
@type {(id: string) => Panic | void} */
function setAudioVolume(id) {
    if (globalState.audioContext === undefined) {
        throw new Error("PANIC!!! The audio context disapears. We can not run the app.");
    }
    const audioState = globalState.audioList.get(id);
    if (audioState !== undefined && audioState.isPlaying) {
        if (audioState.outputGain === undefined) {
            console.warn(
                "Warning: For some reason the Audio", audioState.id,"have a undefined outputGain.",
                "Cause of that, the app can not change the volume."
            );
        } else {
            audioState.outputGain.gain.exponentialRampToValueAtTime(
                audioState.volume,
                globalState.audioContext.currentTime + 0.3
            );
        }
    }
}

/**
@type {(id: string,) => Promise} */
async function deleteAudio(id) {
    const audioState = globalState.audioList.get(id);
    if (audioState !== undefined) {
        _stop(audioState, false);
    }
    dispatch.audioList(audioListActions.delete(id));
}

export {
    deleteAudio,
    play,
    rePlay,
    setAudioVolume,
    stop
};