const verifyAppVersion = (version) => {
    if (typeof version === "string" && localStorage.getItem("version") !== version) {
        localStorage.clear();
        localStorage.setItem("version", version);
        return true;
    }
    return false;
}

const setLocalStorage = (keysOfElementsState, elementsState) => {
    keysOfElementsState.forEach(key => {
        const el = elementsState[key];
        if (typeof el === "object" && el !== null) {
            localStorage.setItem(key, JSON.stringify(elementsState[key]));
        } else {
            localStorage.setItem(key, elementsState[key]);
        }
    });
}

/**
 * @param {ElementsState} elementsState
 * @returns {ElementsState}
 */
 const handleInitState = (version, elementsState) => {
    const isNotLocalStorage = verifyAppVersion(version);
    const keysOfElementsState = Object.keys(elementsState);
    if (isNotLocalStorage) {
        setLocalStorage(keysOfElementsState, elementsState);
        return elementsState;
    } 
    
    const  returnObj = {};
    keysOfElementsState.forEach(key => {
        returnObj[key] = JSON.parse(localStorage.getItem(key));
    });

    return returnObj;
}

export {
    handleInitState
};