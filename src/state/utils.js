/**
 * Looks if a number exist in a close interval 
 * @param {number} min 
 * @param {number} max 
 * @param {number} val 
 * @returns {boolean}
 */
 const isInsideInterval = (min, max, val) => min <= val && val <= max;


/**
 * @param {ElementsState} elementsState
 * @returns {ElementsState}
 */
const handleInitState = (elementsState) => {
    const keysOfElementsState = Object.keys(elementsState);
    
    if (localStorage.getItem('version')) {
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

export {
    handleInitState,
    isInsideInterval
}