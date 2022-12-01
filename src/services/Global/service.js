import {defaultGlobalState, initGlobalState, GlobalState} from "../../state/Global/index.js";

import {
    initFromLocalStorageState,
    initLocalStorage,
    verifyAppVersion
} from "../localStorage/service.js";

/*-
handleInitState: (string, LocalStorageState) -> LocalStorageState
*/
function handleInitState(version) {
    const hasNotLocalStorage = verifyAppVersion(version);
    const keys = Object.keys(defaultGlobalState);

    if (hasNotLocalStorage) {
        initLocalStorage(keys, defaultGlobalState);
        initGlobalState(defaultGlobalState, GlobalState);
    } else {
        const store_state = initFromLocalStorageState(keys, defaultGlobalState);
        initGlobalState(store_state, GlobalState);
    }
}

export {
    handleInitState
};