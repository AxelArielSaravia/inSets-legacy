import globalState from "./state/globalState.js";
import dispatch from "./state/dispatch.js";

import {audioListActions} from "./slices/audioList.js";
import {sumOfAllAudiosEventsActions} from "./slices/sumOfAllAudiosEvents.js";

import {EventOnce, createId} from "./utils.js";

/**@type {HTMLAudioElement} */
const AudioTemplate = new Audio();

/**
 * See if the type of the file have a valid audio type
@type {(type: string) => boolean} */
function isValidAudioType(type) {
    return type.startsWith("audio/");
}

/**
@type {(HTMLAudio: HTMLAudioElement, mediaType: string) => "probably" | "maybe" | ""} */
function canPlayType(HTMLAudio, mediaType) {
    if (!HTMLAudio.canPlayType) {
        throw new Error("HTMLAudioElement.prototype.canPlayType does not find");
    }
    return HTMLAudio.canPlayType(mediaType);
}

/**
@type {(this: HTMLAudioElement & {name?: string, type?:string}) => void} */
function onerror() {
    console.warn("Warning: An error happen when the audio file was loading");
    console.warn(`Cause of that this audio file "${this.name}" will be deleted from list`);
    dispatch.audioList(audioListActions.loadingError(this.id));
    return;
}

/**
@type {(this: HTMLAudioElement & {name?: string, type?:string}) => void} */
function oncanplaythrough() {
    /* the audio is now playable; play it if permissions allow */
    const type = this.type;
    const name = this.name;
    const id = this.id;
    if (globalState.audioContext === undefined) {
        console.warn(
            "Warning: globalState.audioContext is undefined,",
            "cause of this the app can not proceed with the audio object creation and",
            `this audio file "${name}" will be deleted from the list`,
        );
        dispatch.audioList(audioListActions.loadingError(id));
        return;
    }
    const source = globalState.audioContext.createMediaElementSource(this);
    /**@type {AudioState} */
    const audioState = {
        audioEngine: this,
        audioEvents: 1,
        delayIsDisable: globalState.delay.areAllDisable,
        dispatch(a){},
        duration: this.duration, //seconds
        endPoint: this.duration, //seconds
        endTime: this.duration,  //seconds
        filterIsDisable: globalState.filter.areAllDisable,
        id,
        isPlaying: false,
        outputGain: undefined,
        pannerIsDisable: globalState.panner.areAllDisable,
        playbackRate: 1,
        playbackRateIsDisable: globalState.playbackRate.areAllDisable,
        randomEndPointIsDisable: globalState.randomEndPoint.areAllDisable,
        randomStartPointIsDisable: globalState.randomStartPoint.areAllDisable,
        source,
        startPoint: 0, //seconds
        startTime: 0,  //seconds
        title: name?.slice(0, name.lastIndexOf(".")) ?? "",
        type: type ?? "",
        volume: 1,
    };
    //Add audioState to GlobalState
    globalState.audioList.set(id, audioState);
    //available to use in view
    dispatch.audioList(audioListActions.addCompleted(id));
    dispatch.sumOfAllAudiosEvents(sumOfAllAudiosEventsActions.add());
}

/**
@type {(file: File, id: string) => Promise<undefined>} */
async function audioFromFile(file, id) {
    /**@type {HTMLAudioElement & {name: string, type: string}} */
    const HTMLAudio  = AudioTemplate.cloneNode();
    HTMLAudio.src = URL.createObjectURL(file);
    HTMLAudio.id = id;
    HTMLAudio.name = file.name;
    HTMLAudio.type = file.type;

    if (!canPlayType(HTMLAudio, file.type)) {
        console.warn(`Can not play this audio type ${file.type}`);
        console.warn(`This file "${file.name}" is deleted from list`);
        dispatch.audioList(audioListActions.loadingError(id));
    }

    //presersPitch false in playbackrate
    if (HTMLAudio.preservesPitch !== undefined) {
        HTMLAudio.preservesPitch = false;
    }

    HTMLAudio.addEventListener("error", onerror, EventOnce);
    HTMLAudio.addEventListener("canplaythrough", oncanplaythrough, EventOnce);
    return;
}

/**
@type {(files: FileList) => undefined} */
function addFiles(files) {
    for (let i = 0; i < files.length; i += 1) {
        const file = files[i];
        if (isValidAudioType(file.type)) {
            const id = createId();
            //available to use in view
            dispatch.audioList(audioListActions.addLoading(id));
            audioFromFile(file, id);
        }
    }
    return;
}

export default addFiles;
