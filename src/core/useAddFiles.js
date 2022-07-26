import { useContext } from "react";
import { 
  GlobalContext, 
  GlobalState, 
  createId, 
  createAudioState
} from "./Globals.js";

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

export default function useAddFiles() {
  const [globalState, globalDispatcher] = useContext(GlobalContext);
  
  /**
   * @param {FileList} files 
   * @param {function} setUIState change the UI states
   */
  const addFiles = (files)  => {
    for (const file of files) {
      if (isValidAudioType(file.type)) {
        globalDispatcher({variable: "filesLoading", type:"add"});
        if (globalState.ENGINE_TYPE === "audioNode") {
          audioStateFromFile_AudioNode(file, globalDispatcher)
        } else if (globalState.ENGINE_TYPE === "audioBuffer") {
          audioStateFromFile_AudioBuffer(file, globalDispatcher);
        }
      }
    }
  }

  return addFiles;
}


 