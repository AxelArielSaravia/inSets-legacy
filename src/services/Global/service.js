import { defaultGlobalState, initGlobalState } from "../../state/Global/index.js";
import {
    getFromLocalStorageState,
    initLocalStorage,
    verifyAppVersion
} from "../localStorage/service.js";

/*-
handleInitState: (string, LocalStorageState) -> LocalStorageState
*/
function handleInitState(version) {
    const isNotLocalStorage = verifyAppVersion(version);
    const keys = Object.keys(defaultGlobalState);

    if (isNotLocalStorage) {
        initLocalStorage(keys, defaultGlobalState);
        initGlobalState(defaultGlobalState);
    } else {
        const store_state =  getFromLocalStorageState(keys);
        initGlobalState(store_state);
    }
}

export {
    handleInitState
};