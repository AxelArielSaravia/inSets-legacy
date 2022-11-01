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
initFromLocalStorageState: string, object -> {...}
*/
function initFromLocalStorageState(keys, defaultValues) {
    const  obj = {};
    keys.forEach(function(key) {
        try {
            const item = localStorage.getItem(key);
            if (item === "null") {
                throw new Error("null value is not allowed");
            }
            const val = JSON.parse(item);
            obj[key] = val;
        } catch (err) {
            localStorage.setItem(
                key,
                JSON.stringify(defaultValues[key])
            );
            obj[key] = defaultValues[key];
        }
    });
    return obj;
}

/*-
changeLocalStorageState: string -> string
*/
function changeLocalStorageState(name, value) {
    localStorage.setItem(name, JSON.stringify(value));
}


export {
    changeLocalStorageState,
    initFromLocalStorageState,
    initLocalStorage,
    verifyAppVersion
};