import globalState from "./state/globalState.js";
import {globalDefault, globalDefaultKeys} from "./state/globalDefault.js";
import initializeGlobalState from "./state/globalFactory.js";

/*-
verifyAppVersion :: string -> boolean */
function verifyAppVersion(version) {
    return (
        typeof version === "string"
        && localStorage.getItem("version") !== version
        ? (
            localStorage.clear(),
            localStorage.setItem("version", version),
            true
        )
        : false
    );
}

/*-
initializeLocalStorage :: () -> undefined */
function initializeLocalStorage() {
    globalDefaultKeys.forEach(function(key) {
        const el = globalDefault[key];
        if (typeof el === "object") {
            localStorage.setItem(key, JSON.stringify(el));
        } else {
            localStorage.setItem(key, el);
        }
    });
}

/*-
setStateFromLocalStorage :: () -> LocalStorageState */
function setStateFromLocalStorage() {
    const localStorageState = {};
    globalDefaultKeys.forEach(function (key) {
        const storageItem = localStorage.getItem(key);
        try {
            if (storageItem === null) {
                throw new Error("The item is null");
            }
            localStorageState[key] = JSON.parse(storageItem);
        } catch {
            localStorageState[key] = globalDefault[key];
            localStorage.setItem(key, JSON.stringify(globalDefault[key]));
        }
    });
    return localStorageState;
}

/*-
handleInitState :: (string, GlobalState, LocalStorageState) -> undefined */
function handleStateInitializers(version) {
    const hasNotLocalStorage = verifyAppVersion(version);

    if (hasNotLocalStorage) {
        initializeLocalStorage();
        initializeGlobalState(globalState);
    } else {
        initializeGlobalState(
            globalState,
            setStateFromLocalStorage()
        );
    }
}

/*-
setInitialAudioContext :: () -> undefined */
function setInitialAudioContext() {
    const AudioContextObject = (
        window?.AudioContext !== undefined
        ? window.AudioContext
        : window.webkitAudioContext
    );
    globalState.audioContext = new AudioContextObject({
        latencyHint: "playback",
        sampleRate: 44100
    });

    const audioContext = globalState.audioContext;
    //listener position
    if (audioContext.listener.positionX) {
        audioContext.listener.positionX.value = 0;
        audioContext.listener.positionY.value = 0;
        audioContext.listener.positionZ.value = 1;
        audioContext.listener.forwardZ.value = -5;
    } else {
        audioContext.listener.setPosition(0, 0, 1);
        audioContext.listener.setOrientation(0, 0, -5, 0 ,1, 0);
    }

    //Create the first instance of panningModel "HRTF"
    const PANNER = audioContext.createPanner();
    PANNER.panningModel = "HRTF";

    globalState.audioContext.resume();
}

export {
    handleStateInitializers,
    setInitialAudioContext
};