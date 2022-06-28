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
  const keysOfElementsState = Object.keys(elementsState);
  if (localStorage.getItem('state') == null) {
    localStorage.clear();
    localStorage.setItem('state', true);
  
    keysOfElementsState.forEach(name => {
      const el = elementsState[name];
      if (typeof el === "object" && el !== null) {
        localStorage.setItem(name, JSON.stringify(elementsState[name]));
      } else {
        localStorage.setItem(name, elementsState[name]);
      }
    });
  } 

  const  returnObj = {};

  keysOfElementsState.forEach(name => {
    returnObj[name] = JSON.parse(localStorage.getItem(name));
  });
  return returnObj;
}

/** @type {GlobalState} */
const GLOBAL_STATE = createGlobalState( handleInitState( initState ) );

//console.log(GLOBAL_STATE); DEBUG

export default GLOBAL_STATE;
export const GSPanner = GLOBAL_STATE.panner;
export const GSFilter = GLOBAL_STATE.filter;
export const GSDelay = GLOBAL_STATE.delay;
export const GSPlayBackRate = GLOBAL_STATE.playBackRate;
export const GSTimeInterval = GLOBAL_STATE.timeInterval;
export const GSFadeTime = GLOBAL_STATE.fadeTime;
export const GSProbabilityOfExecutionSets = GLOBAL_STATE.probabilityOfExecutionSets;
export const GSRandomCurrentTime = GLOBAL_STATE.randomCurrentTime;
export const AUDIO_MAP = GLOBAL_STATE.AUDIO_MAP;
export const ADD_Audio = GLOBAL_STATE.ADD_Audio;
export const DELETE_Audio = GLOBAL_STATE.DELETE_Audio;
export const CLEAR_Audio = GLOBAL_STATE.CLEAR_Audio;

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
 export const GSIsStarted = (val) => {
  if (typeof val === "boolean") GLOBAL_STATE.isStarted = val;
  return GLOBAL_STATE.isStarted;
}