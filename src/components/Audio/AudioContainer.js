import {useContext} from "react";

import {AudioListContext} from "../contexts/AudioList.js";

import {IconMusicFile} from "../icons.js";
import AudioElement from "./AudioElement.js";
import Show from "../Show.js";

import "./AudioContainer.scss";

function AudioLoadingElement() {
    return (
        <div className="audio-loading-element flex-row align-c px-10">
            <h3 className="fs-text">Loading...</h3>
        </div>
    );
}

function SelectAudioElement({bool, id}) {
    return (
        bool
        ? <AudioElement id={id}/>
        : <AudioLoadingElement/>
    );
}

function listMapFn(id) {
    return (
        <div
            key={id}
            className="audio-element--prev p-5 flex-column align-c"
            role="region"
            arial-live="polite"
        >
            <SelectAudioElement
                bool={id in this}
                id={id}
            />
        </div>
    );
}

function filterTopList(_, i) {
    return i <= this-1;
}

function filterBottomList(_, i) {
    return i > this-1 ;
}

function AudioElementList() {
    const [{
        loadedAudioList,
        completedAudioList
    }] = useContext(AudioListContext);

    const list = Object.keys(loadedAudioList);
    const midListLenght = Math.round(list.length / 2);
    const state = list.map(listMapFn, completedAudioList);

    return (
        <>
            <div className="audio-container_column">
                {state.filter(filterTopList, midListLenght)}
            </div>
            <div className="audio-container_column">
                {state.filter(filterBottomList, midListLenght)}
            </div>
        </>
    );
}

function NoAudioFile() {
    const [{loadedAudioListSize}] = useContext(AudioListContext);
    return (
        <Show is={loadedAudioListSize === 0}>
            <div className="audioFiles_icon flex-column align-c justify-c flex-grow-1">
                <IconMusicFile className="icon-drop o-5"/>
                <p className="fs-text p-5">No Audio Files</p>
            </div>
        </Show>
    );
}

function AudioContainer() {
    return (
        <main className="main flex-column p-5">
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