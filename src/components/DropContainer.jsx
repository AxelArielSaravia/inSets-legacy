//@ts-check
import React from "react";

import addFiles from "../addFiles.js";

import {IconMusicFile} from "./icons.jsx";

/**
@type {React.DragEventHandler<HTMLDivElement>} */
function preventDefault(e) {
    e.preventDefault();
}

/**
@type {React.DragEventHandler<HTMLDivElement>} */
function handleFileDrop(e) {
    e.preventDefault();
    if (e.dataTransfer === null) {
        console.warn("Warning: The dataTransfer of the Drop Event is null.");
        return;
    }
    e.dataTransfer.dropEffect = "copy";
    addFiles(e.dataTransfer.files);
}

function DropArea() {
    return (
        <>
            <div className="dragfile flex-row align-c justify-c">
                <IconMusicFile className="icon-drop o-5"/>
            </div>
            <div>
                <p className="fs-text p-5">Drop files</p>
            </div>
        </>
    );
}

function DropContainer() {
    return (
        <div
            className="dropFile flex-column align-c justify-c"
            onDragOver={preventDefault}
            onDrop={handleFileDrop}
        >
            <DropArea />
        </div>
    );
}

export default DropContainer;
