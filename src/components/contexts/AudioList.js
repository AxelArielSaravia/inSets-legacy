//@ts-check
import React, {createContext, useReducer, memo} from "react";

import {audioListReducer} from "../../slices/audioList.js";
import {createAudioListState} from "../../state/factory.js";
import dispatch from "../../state/dispatch.js";

/**
@type {React.Context<AudioListState>} */
const AudioListContext = createContext(createAudioListState());

const AudioListProvider = memo(
    /**
    @type {(prop: {children: JSX.Element}) => JSX.Element} */
    function AudioListProvider({children}) {
        const value = useReducer(audioListReducer, createAudioListState());
        dispatch.audioList = value[1];
        return (
            <AudioListContext.Provider value={value[0]}>
                {children}
            </AudioListContext.Provider>
        );
    }
);

export {
    AudioListContext,
    AudioListProvider
};