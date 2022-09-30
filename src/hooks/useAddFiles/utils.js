import { createAudioState } from "../../state/Audio/index.js";
import { GlobalState } from "../../state/Global/index.js";

import createId  from "../../services/createId/service.js";

/**
 * See if the type of the file have a valid audio type
 * @param {string} type 
 * @returns {boolean}
 */
const isValidAudioType = (type) => (/^audio\/\w+$/).test(type);

/**
 * @param {HTMLAudioElement} HTMLAudio 
 * @param {string} mediaType 
 * @returns {"probably" | "maybe" | ""}
 */
const canPlayType = (HTMLAudio, mediaType) => {
    if (!HTMLAudio.canPlayType) throw new Error("HTMLAudioElement.prototype.canPlayType does not find");
    return HTMLAudio.canPlayType(mediaType); 
}

const audioFromFile_AudioNode = async (file, audioListDispatcher, sumOfAllEventsDispatcher) => {
    //ID of AudioState
    const id = createId();
    try {
        //available to use in view
        audioListDispatcher({type: "addLoading", id: id});

        const url = URL.createObjectURL(file);
        const htmlAudio = await new Audio(url);
        if (!canPlayType(htmlAudio, file.type)) {
            throw new Error(`Can not play this audio type ${file.type}`);
        }

        //presersPitch false in playbackrate
        if ('preservesPitch' in htmlAudio) {
            htmlAudio.preservesPitch = false;
        }

        htmlAudio.addEventListener("error", () => {
            console.warn("Delete "+file.name+" from list")
            audioListDispatcher({type: "loadingError", id: id});
            throw new Error(`Error loading: ${file.name}`);
        }, {once: true});

        htmlAudio.addEventListener("canplaythrough", () => {
        /* the audio is now playable; play it if permissions allow */
            try {
                let source = GlobalState._audio_context.createMediaElementSource(htmlAudio); 
                let audioState = createAudioState(id, file.name, file.type, htmlAudio.duration, GlobalState);
                audioState.audioEngine = htmlAudio;
                audioState.source = source;
    
                //Add audioState to GlobalState
                GlobalState._audio_list.set(id, audioState);
                //available to use in view
                audioListDispatcher({type: "addCompleted", id: id});
                sumOfAllEventsDispatcher({type: "add"})
    
                audioState = source = null;
            } catch (err) {
                console.error(err);
                console.warn("The error was catching and delete " +file.name+ " from list")
                audioListDispatcher({type: "loadingError", id: id});
            }
        },{once: true});

    } catch (err) {
        console.error(err);
        console.warn("The error was catching and delete " +file.name+ " from list")
        audioListDispatcher({type: "loadingError", id: id});
    }
}
/* 
const audioStateFromFile_AudioBuffer = (file, dispatcher) => {
    return Promise.resolve()
    .then(() => file.arrayBuffer())
    .then(data => GlobalState.AUDIO_CONTEXT.decodeAudioData(data))
    .then(audioBuffer => {
        const id = createId();
        let audioState = createAudioState(id, file.name, file.type, audioBuffer.duration, GlobalState);
        audioState.audioEngine = audioBuffer;

        dispatcher({ type: "ADD_Audio", id: id, value: audioState });
        dispatcher({ variable: "filesLoading", type: "subtract" });
        
        audioState = null;
    })
    .catch(err => console.error(err));
}
   */
export {
    isValidAudioType,
    audioFromFile_AudioNode
}