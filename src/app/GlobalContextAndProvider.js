import { createContext, useReducer, memo } from "react";

import { createGlobalView, globalViewReducer } from "./GlobalState.js"
import initState from "./initState.json";

const GlobalContext = createContext(null); 

/**
 * @param {ElementsState} elementsState
 * @returns {ElementsState}
 */
const handleInitState = (elementsState) => {
    const keysOfElementsState = Object.keys(elementsState);
    if (localStorage.getItem('version') !== "v0.2.3") {
        localStorage.clear();
        localStorage.setItem("version", "v0.2.3");
        keysOfElementsState.forEach(key => {
            const el = elementsState[key];
            if (typeof el === "object" && el !== null) {
                localStorage.setItem(key, JSON.stringify(elementsState[key]));
            } else {
                localStorage.setItem(key, elementsState[key]);
            }
        });
    } 
    
    const  returnObj = {};
    
    keysOfElementsState.forEach(key => {
        returnObj[key] = JSON.parse(localStorage.getItem(key));
    });
    return returnObj;
}
const initGlobalView =  createGlobalView(handleInitState(initState));

const GlobalProvider = memo(function GlobalStateProvider(props) {
    const [globalView, globalViewDispatcher] = useReducer(globalViewReducer, initGlobalView);
    const value = [globalView, globalViewDispatcher];
    return (
        <GlobalContext.Provider value={value}>
            {props.children}
        </GlobalContext.Provider>
    );
});

export {
    GlobalContext,
    GlobalProvider,
}
