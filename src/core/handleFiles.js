import { setGSAudioFiles } from "./initGlobalState.js"

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
 const addFiles = (files, setUIState)  => {
  console.log(files)
  const isValid = filesHaveValidAudioType(files)
  if (isValid) {
    const [, hasAudioFiles]  = setGSAudioFiles(files.length);
    setUIState(() => hasAudioFiles);
  }
}

/**
 * @param {function} setUIState change the UI states
 */
const clearFiles = (setUIState) => {
  const [, hasAudioFiles]  = setGSAudioFiles("clear");
  setUIState(() => hasAudioFiles);
}



/**
 * @param {HTMLAudioElement} HTMLAudio 
 * @param {string} mediaType 
 * @returns {"probably" | "maybe" | ""}
 */
const canPlayType = (HTMLAudio, mediaType) => {
  if ("canPlayType" in HTMLAudio) throw new Error("canPlayType does not find");
  return HTMLAudio.canPlayType(mediaType); 
}



export {
  addFiles,
  clearFiles
}