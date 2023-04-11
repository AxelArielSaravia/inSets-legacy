import {createContext, useReducer, memo} from "react";

import {audioListReducer} from "../../slices/audioList.js";
import {audioListInitialState} from "../initialState.js";

const AudioListContext = createContext();

const AudioListProvider = memo(function AudioListProvider({children}) {
    const value = useReducer(audioListReducer, audioListInitialState);
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