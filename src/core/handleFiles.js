import { AUDIO_MAP, CLEAR_Audio } from "./initGlobalState.js"
import { createAudioStateFromFile, stop } from "./audioEffects.js";

/**
 * @typedef {import("./states.js").AudioState} AudioState
 */

/**
 * See if the type of the file have a valid audio type
 * @param {string} type 
 * @returns {boolean}
 */
const isValidAudioType = (type) => (/^audio\/\w+$/).test(type);


/**
 * @param {FileList} files 
 * @param {function} setUIState change the UI states
 */
const addFiles = (onFileType, files, callback)  => {
  console.log(files);
  for (let file of files) {
    if (isValidAudioType(file.type)) {
      if(onFileType) onFileType();
      createAudioStateFromFile(file, () => callback(AUDIO_MAP));
    }
  }
}

/**
 * @param {function} setUIState change the UI states
 */
const clearFiles = (cb) => {
  AUDIO_MAP.forEach(data => {
    if (data.isPlaying) {
      stop(data.id);
    }
  })
  CLEAR_Audio();
  if (typeof cb === "function") cb();
}

export {
  addFiles,
  clearFiles
}