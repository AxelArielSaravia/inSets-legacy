/*-
verifyAppVersion: string -> boolean
*/
 function verifyAppVersion(version) {
    if (typeof version === "string" &&
        localStorage.getItem("version") !== version
     ) {
        localStorage.clear();
        localStorage.setItem("version", version);
        return true;
    }
    return false;
}

/*-
initLocalStorage: Array<string>, LocalStorageState -> undefined
*/
function initLocalStorage(keys, filter_state) {
    keys.forEach(function(key) {
        const el = filter_state[key];
        if (typeof el === "object") {
            localStorage.setItem(key, JSON.stringify(filter_state[key]));
        } else {
            localStorage.setItem(key, filter_state[key]);
        }
    });
}

/*-
getFromLocalStorageState: string -> {...}
*/
function getFromLocalStorageState(keys) {
    const  obj = {};
    keys.forEach(function(key) {
        obj[key] = JSON.parse(localStorage.getItem(key));
    });
    return obj;
}

/*-
changeLocalStorageState: string, any -> string
*/
 function changeLocalStorageState(name, value, objKey) {
    if (objKey !== undefined) {
        const localStorageElement = JSON.parse(localStorage.getItem(name));
        localStorageElement[objKey] = value;
        localStorage.setItem(name, JSON.stringify(localStorageElement));
    }  else {
        localStorage.setItem(name, JSON.stringify(value));
    }
}


export {
    changeLocalStorageState,
    getFromLocalStorageState,
    initLocalStorage,
    verifyAppVersion
};