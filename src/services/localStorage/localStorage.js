import initState from "../../state/initState.json";

const verifyAppVersion = () => {
    if (localStorage.getItem('version') !== "v0.2.4") {
        localStorage.clear();
        localStorage.setItem("version", "v0.2.4");
    }
}

/**
 * @param {ElementsState} elementsState
 * @returns {ElementsState}
 */
const handleInitState = () => {
    verifyAppVersion();
    const keysOfElementsState = Object.keys(initState);
    if (localStorage.getItem('version')) {
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