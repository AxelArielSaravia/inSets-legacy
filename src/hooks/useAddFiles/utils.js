import { createAudioState } from "../../state/Audio/index.js";
import { GlobalState } from "../../state/Global/index.js";
import createId  from "../../services/Id/index.js";

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

const audioStateFromFile_AudioNode = (file, dispatcher) => {
    return Promise.resolve()
    .then(() => URL.createObjectURL(file))
    .then(url => new Audio(url))
    .then(htmlAudio => {
        if (!canPlayType(htmlAudio, file.type)) {
            console.warn(`Can not play this audio type ${file.type}`);
            return;
        }
        //presersPitch false in playbackrate
        if ('preservesPitch' in htmlAudio) {
            htmlAudio.preservesPitch = false;
        }
        htmlAudio.addEventListener("canplaythrough", () => {
        /* the audio is now playable; play it if permissions allow */

            const id = createId();
            let source = GlobalState.AUDIO_CONTEXT.createMediaElementSource(htmlAudio); 
            let audioState = createAudioState(id, file.name, file.type, htmlAudio.duration, GlobalState);
            audioState.audioEngine = htmlAudio;
            audioState.source = source;

            dispatcher({type: "ADD_Audio", id: id, value: audioState});
            dispatcher({variable: "filesLoading", type: "subtract"});

            audioState = source = null;

        },{once: true});
    })
    .catch(err => console.error(err));
}

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
  
export {
    isValidAudioType,
    audioStateFromFile_AudioNode,
    audioStateFromFile_AudioBuffer
}