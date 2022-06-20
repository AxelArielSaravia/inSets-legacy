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
 * @returns {boolean}
 */
const filesHaveValidAudioType = (files) => {
  let isValid = files.length === 0 ? false : true;
  for (let i = 0; i < files.length && isValid; i++) {
    if (!isValidAudioType(files[i].type)) {
      isValid = false;
    }
  }
  return isValid;
};

/**
 * @param {FileList} files 
 * @param {function} setUIState change the UI states
 */
const addFiles = (files, cb)  => {
  console.log(files);
  const isValid = filesHaveValidAudioType(files);
  if (isValid) {
    for (let file of files) {
      createAudioStateFromFile(file, () => cb(AUDIO_MAP));
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