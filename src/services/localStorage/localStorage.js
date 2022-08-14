import initState from "../../state/initState.json";

const verifyAppVersion = (version) => {
    if (typeof version === "string" && localStorage.getItem("version") !== version) {
        console.log("Call me")
        localStorage.clear();
        localStorage.setItem("version", version);
        return true;
    }
    return false;
}

/**
 * @param {ElementsState} elementsState
 * @returns {ElementsState}
 */
const handleInitState = (version) => {
    const bool = verifyAppVersion(version);
    const keysOfElementsState = Object.keys(initState);
    if (bool) {
        keysOfElementsState.forEach(key => {
            const el = initState[key];
            if (typeof el === "object" && el !== null) {
                localStorage.setItem(key, JSON.stringify(initState[key]));
            } else {
                localStorage.setItem(key, initState[key]);
            }
        });
    } 

    const  returnObj = {};

    keysOfElementsState.forEach(key => {
        returnObj[key] = JSON.parse(localStorage.getItem(key));
    });
    return returnObj;
}

export default handleInitState;