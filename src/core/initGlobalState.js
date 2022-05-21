import { createGlobalState } from "./states.js"
import initState from "./initState.json";

/**
 * @typedef {import("./states.js").GlobalState} GlobalState
 */

/**
 * @param {ElementsState} elementsState
 * @returns {ElementsState}
 */
 const handleInitState = (elementsState) => {
  if (localStorage.getItem("state") == null) {
    localStorage.removeItem('state');
    localStorage.setItem('state', JSON.stringify(elementsState));
  }
  return JSON.parse(localStorage.getItem("state"));
}


/** @type {GlobalState} */
const GLOBAL_STATE = createGlobalState( handleInitState( initState ) );
console.log(GLOBAL_STATE);

export default GLOBAL_STATE;
export const GSPanner = GLOBAL_STATE.panner;
export const GSFilter = GLOBAL_STATE.filter;
export const GSDelay = GLOBAL_STATE.delay;
export const GSPlayBackRate = GLOBAL_STATE.playBackRate;
export const GSTimeInterval = GLOBAL_STATE.timeInterval;
export const AUDIO_MAP = GLOBAL_STATE.AUDIO_MAP;


export const AUDIO_CONTEXT = (val) => {
  if (typeof val !== "undefined") {
    GLOBAL_STATE.AUDIO_CONTEXT = val;
  }
  return GLOBAL_STATE.AUDIO_CONTEXT;
}

/**
 * @param {"audioBuffer"|"audioNode"|undefined} val 
 * @returns {"audioBuffer"|"audioNode"}
 */
export const GSEngine = (val) => {
  if (typeof val !== "undefined") GLOBAL_STATE.engine = val;
  return GLOBAL_STATE.engine;
};

/**
 * @return {boolean}
 */
export const GSHasAudios = () => GLOBAL_STATE.hasAudios;

/**
 * @param {number|undefined} val 
 * @return {number}
 */
export const GSFadeIn = (val) => {
  if (typeof val === "number") GLOBAL_STATE.fadeIn = val;
  return GLOBAL_STATE.fadeIn;
}

/**
 * @param {number|undefined} val 
 * @return {number}
 */
 export const GSFadeOut = (val) => {
  if (typeof val === "number") GLOBAL_STATE.fadeOut = val;
  return GLOBAL_STATE.fadeOut;
}

/**
 * @param {number|undefined} val 
 * @return {number}
 */
 export const GSIsStarted = (val) => {
  if (typeof val === "boolean") GLOBAL_STATE.isStarted = val;
  return GLOBAL_STATE.isStarted;
}


/**
 * @param {boolean} val
 * @returns {boolean}
 */
export const setGSRandomCurrentTime = (val) => {
  if (typeof val === 'boolean') 
    GLOBAL_STATE.randomCurrentTime = val;
  else 
    GLOBAL_STATE.randomCurrentTime = !GLOBAL_STATE.randomCurrentTime;
  return GLOBAL_STATE.randomCurrentTime;
}

/**
 * @returns {boolean} 
 */
export const getGSRandomCurrentTimeDisable = () => GLOBAL_STATE.randomCurrentTimeDisable;

/* 
console.log("GSHasAudioFiles: ", GSHasAudioFiles());
console.log("getGSStarted: ", getGSStarted());
setGSStarted();
console.log("GSAudioFilesNum: ", GSAudioFilesNum(2));
console.log("GSHasAudioFiles: ", GSHasAudioFiles());
setGSStarted();
console.log("getGSStarted: ", getGSStarted());
console.log("GSAudioFilesNum: ", GSAudioFilesNum(0));
console.log("GSHasAudioFiles: ", GSHasAudioFiles());
console.log("getGSStarted: ", getGSStarted());
console.log("GSAudioFilesNum: ", GSAudioFilesNum("clear"));
console.log("GSHasAudioFiles: ", GSHasAudioFiles());
console.log("getGSStarted: ", getGSStarted());
 */

/*
console.log("GSPanner: ", GSPanner);
*/

/* 
console.log("GSFilter: ", GSFilter);
*/
/*
console.log("GSDelay: ", GSDelay);
*/
/*
console.log("GSPlayBackRate: ", GSPlayBackRate); 
*/