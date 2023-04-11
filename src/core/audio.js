import globalState from "../state/globalState.js";
import {wait} from "./utils.js";
import {rToFade} from "./maps.js";
import {_stop, _play} from "./audio.internals.js";

import {audioListActions} from "../slices/audioList.js";

/*-
stop :: (string, audioDispatcher) -> _stop */
function stop(id, audioDispatcher) {
    const audioState = globalState.audioList.get(id);
    return _stop(audioState, audioDispatcher);
}

/*-
play :: (string, audioDispatcher) -> _play */
function play(id, audioDispatcher) {
    return _play(globalState.audioList.get(id), audioDispatcher);
}

/*-
rePlay :: (string, audioDispatcher) -> undefined */
function rePlay(id, audioDispatcher) {
    const audioState = globalState.audioList.get(id);
    if (audioState !== undefined) {
        if (audioState.isPlaying) {
            _stop(audioState, audioDispatcher)
            .then(function (bool) {
                if (bool && globalState.isStarted) {
                    return _play(audioState, audioDispatcher);
                }
            })
            .catch((err) => console.error(err));
        } else {
            wait(rToFade(globalState.fadeOut) + 50)
            .then(function () {
                if (globalState.isStarted) {
                    return _play(audioState, audioDispatcher);
                }
            })
            .catch((err) => console.error(err));
        }
    }
}

/*-
setAudioVolume :: string -> undefined */
function setAudioVolume(id) {
    const audioState = globalState.audioList.get(id);
    if (audioState !== undefined && audioState.isPlaying) {
        audioState.outputGain.gain.exponentialRampToValueAtTime(
            audioState.volume,
            globalState.audioContext.currentTime + 0.3
        );
    }
}

/*-
deleteAudio ::
    (string, audioListDispatch, audioDispatch) -> undefined */
function deleteAudio(id, audioListDispatch, audioDispatch) {
    stop(id, audioDispatch);
    audioListDispatch(audioListActions.delete(id));
}

export {
    deleteAudio,
    play,
    rePlay,
    setAudioVolume,
    stop
};