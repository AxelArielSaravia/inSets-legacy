import { AUDIO_MAP } from "./initGlobalState.js"
import { createAudioStatefromFile, stop } from "./audioEffects.js";

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
 * @param {Map<string, AudioState>} map 
 * @returns {string}
 */
const createId = (map) => {
  let n = Math.floor(Math.random() * 100);
  while (map.has("audio-"+n)) {
    n = Math.floor(Math.random() * 100);
  }
  return "audio-"+n;
}

/**
 * @param {FileList} files 
 * @param {function} setUIState change the UI states
 */
const addFiles = (files, cb)  => {
  console.log(files);
  const isValid = filesHaveValidAudioType(files);
  if (isValid) {
    for (let file of files) {
      let id = createId(AUDIO_MAP);
      createAudioStatefromFile(file, id, () => cb(AUDIO_MAP));
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
  AUDIO_MAP.clear();
  if (typeof cb === "function") cb();
}

export {
  addFiles,
  clearFiles
}