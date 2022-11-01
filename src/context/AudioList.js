import {createContext, useReducer, memo} from "react";

import {ViewAudioListReducer} from "../reducer/index.js";
import {createViewAudioListState} from "../state/Global/index.js";

const AudioListContext = createContext();

const AudioListProvider = memo(function AudioListProvider({children}) {
    const value = useReducer(ViewAudioListReducer, createViewAudioListState());

    return (
        <AudioListContext.Provider value={value}>
            {children}
        </AudioListContext.Provider>
    );
});

export {
    AudioListContext,
    AudioListProvider
};