import { createContext } from "react";
import { GLOBAL_STATE } from "./core/initGlobalState.js";

/**
 * @typedef {import("./core/states.js").GlobalState} GlobalState
 */

/**
 * @param {GlobalState} globalState 
 * @returns Object with several React.Contexts
 */
 function createContextsFromGS(globalState) {
    const res = {};
    for (let key in globalState) {
      key = key[0].toUpperCase() + key.slice(1);
      res[key] = createContext(globalState[key]);
    }
    return res;
}
  
const Contexts = createContextsFromGS(GLOBAL_STATE);

export default Contexts;