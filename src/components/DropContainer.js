import {useCallback} from "react";

import useAddFiles from "./hooks/useAddFiles.js";

import {IconMusicFile} from "./icons.js";

function preventDefault(e) {
    e.preventDefault();
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
    const addFiles = useAddFiles();

    const handleFileDrop = useCallback(function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
        addFiles(e.dataTransfer.files);
    },[addFiles]);

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