//@ts-check
import React, {useContext} from "react";

import {AudioListContext} from "../contexts/AudioList.jsx";

import AudioElement from "./AudioElement.jsx";
import Show from "../Show.jsx";

function AudioLoadingElement() {
    return (
        <div className="audio-loading-element flex-row align-c px-10">
            <h3 className="fs-text">Loading...</h3>
        </div>
    );
}

/**
@type {(props: {bool: boolean, id: string}) => JSX.Element} */
function SelectAudioElement({bool, id}) {
    return (
        bool
        ? <AudioElement id={id}/>
        : <AudioLoadingElement/>
    );
}

/**
@type {(this: {[k: string]: true}, id: string) => JSX.Element} */
function listMapFn(id) {
    return (
        <div
            key={id}
            className="audio-element--prev p-5 flex-column align-c"
            role="region"
            arial-live="polite"
        >
            <SelectAudioElement
                bool={this[id] === true}
                id={id}
            />
        </div>
    );
}

/**
@type {() => Array<JSX.Element>} */
function AudioElementList() {
    const {loadedAudioList, completedAudioList} = useContext(AudioListContext);
    return Object.keys(loadedAudioList).map(listMapFn, completedAudioList);
}

function NoAudioFile() {
    const {loadedAudioListSize} = useContext(AudioListContext);
    return (
        <Show is={loadedAudioListSize === 0}>
            <div className="audioFiles_icon flex-column align-c justify-c flex-grow-1">
                <p className="fs-text-l p-5">No Audio Files</p>
            </div>
        </Show>
    );
}

function AudioContainer() {
    return (
        <main className="main flex-column align-c p-5">
            <div className="audio-container flex-column">
                <div className="audio-container_sub">
                    <AudioElementList/>
                </div>
                <NoAudioFile/>
            </div>
        </main>
    );
}

export default AudioContainer;
