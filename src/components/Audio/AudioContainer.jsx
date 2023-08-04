//@ts-check
import React, {useContext} from "react";

import {AudioListContext} from "../contexts/AudioList.jsx";
import useMatchMedia from "../hooks/useMatchMedia.jsx";

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
@type {(prop: {left: Array<JSX.Element>, right: Array<JSX.Element>}) => JSX.Element}*/
function AudioContainerColumns({left, right}) {
    return (
        <>
            <div className="audio-container_column">
                {left}
            </div>
            <div className="audio-container_column">
                {right}
            </div>
        </>
    );
}

/**@type {Array<JSX.Element>} */
let left = [];
/**@type {Array<JSX.Element>} */
let right = [];
function AudioElementList2() {
    const {loadedAudioList, completedAudioList} = useContext(AudioListContext);
    const list = Object.keys(loadedAudioList);
    const mid = Math.round(list.length / 2);

    left = [];
    right = [];

    for (let i = 0; i < list.length; i += 1) {
        if (i < mid) {
            left.push(listMapFn.call(completedAudioList, list[i]));
        } else {
            right.push(listMapFn.call(completedAudioList, list[i]));
        }
    }
    return <AudioContainerColumns left={left} right={right}/>;
}

/**
@type {() => Array<JSX.Element>} */
function AudioElementList() {
    const {loadedAudioList, completedAudioList} = useContext(AudioListContext);
    return Object.keys(loadedAudioList).map(listMapFn, completedAudioList);
}

const minWidth_1160 = "(min-width: 1160px)";

function Media() {
    const value = useMatchMedia(minWidth_1160);
    return (
        value
        ? <AudioElementList2/>
        : <AudioElementList/>
    );
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
                    <Media/>
                </div>
                <NoAudioFile/>
            </div>
        </main>
    );
}

export default AudioContainer;
