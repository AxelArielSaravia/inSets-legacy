import { createGlobalState } from "./globalStates.js"
import initState from "./initState.json"

/**
 * @typedef {import("./globalStates.js").GlobalState} GlobalState
 */

/**
 * @param {ElementsState} elementsState
 * @returns {ElementsState}
 */
 const handleInitState = (elementsState) => {
  if (localStorage.getItem("state") == null) 
    localStorage.setItem('state', JSON.stringify(elementsState));
  return JSON.parse(localStorage.getItem("state"));
}


/** @type {GlobalState} */
const GLOBAL_STATE = createGlobalState(handleInitState(initState));


/**
 * @param {boolean} val
 * @return {boolean}
 */
const setGSIsLoading = (val) => {
  if (typeof val === 'boolean') 
    GLOBAL_STATE.isLoading = val;
  else 
    GLOBAL_STATE.isLoading = !GLOBAL_STATE.isLoading;
  return GLOBAL_STATE.isLoading;
}
const getGSIsLoading = () => GLOBAL_STATE.isLoading;

/**
 * @param {boolean} val
 * @return {boolean}
 */
const setGSIsPlaying = (val) => {
  if (typeof val === 'boolean') 
    GLOBAL_STATE.isPlaying = val;
  else 
    GLOBAL_STATE.isPlaying = !GLOBAL_STATE.isPlaying;
  return GLOBAL_STATE.isPlaying;
}
const getGSIsPlaying = () => GLOBAL_STATE.isPlaying;

/**
 * @param {"clear"|number} val
 * @return {[number, boolean]}
 */
const setGSAudioFiles = (val) => {
  if (val === "clear") {
    GLOBAL_STATE.audioFiles = 0;
  } else if (typeof val === 'number') {
    GLOBAL_STATE.audioFiles += val;
  }

  if (GLOBAL_STATE.audioFiles > 0) {
    GLOBAL_STATE.hasAudioFiles = true
  } else {
    GLOBAL_STATE.hasAudioFiles = false
  }

  return [GLOBAL_STATE.audioFiles, GLOBAL_STATE.hasAudioFiles];
}

/**
 * @return {number}
 */
const getGSAudioFiles = () => GLOBAL_STATE.audioFiles;

/**
 * @return {boolean}
 */
const getGSHasAudioFiles = () => GLOBAL_STATE.hasAudioFiles;


export {
  GLOBAL_STATE, //USE ONLY FOR CONTEXTS

  setGSIsLoading,
  getGSIsLoading,

  setGSIsPlaying,
  getGSIsPlaying,

  setGSAudioFiles,
  getGSAudioFiles,
  getGSHasAudioFiles
}
export const panner = GLOBAL_STATE.panner;
export const filter = GLOBAL_STATE.filter;
export const delay = GLOBAL_STATE.delay;
export const playBackRate = GLOBAL_STATE.playBackRate;