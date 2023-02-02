import {useState, useEffect, useCallback} from "react";

import {useAddFiles} from "../../hooks/index.js";

import {IconMusicFile} from "../icons/component.js";

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

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
}

function DropFiles({className, isDragActive}) {
    const addFiles = useAddFiles();

    useEffect(function () {
        window.addEventListener("dragover", preventDefault, false);
        window.addEventListener("drop", preventDefault, false);
        return function () {
            window.removeEventListener("dragover", preventDefault, false);
            window.removeEventListener("drop", preventDefault, false);
        };
    });

    const handleFileDrop = useCallback(function(e) {
        e.preventDefault();
        addFiles(e.dataTransfer.files);
    },[addFiles]);

    return (
        <div
            onDragOver={handleDragOver}
            onDrop={handleFileDrop}
            className={className}
        >
            <DropArea />
        </div>
    );
}

function DropComponent({isDragActive}) {
    if (isDragActive) {
        return (
            <DropFiles className="dropFile flex-column align-c justify-c"/>
        );
    }
}

function DragFiles({className, style, children}) {
    const [isDragActive, setIsDragActive] = useState(false);
    let counter = 1;
    function handleDragEnter () {
        counter += 1;
        setIsDragActive(() => true);
    }

    function handleDragLeave () {
        counter -= 1;
        if (counter === 0) {
            setIsDragActive(() => false);
        }
    }

    function handleDrop () {
        counter = 0;
        setIsDragActive(() => false);
    }

    return (
        <div
            className={className}
            style={style}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {children}
            <DropComponent isDragActive={isDragActive}/>
        </div>
    );
}

export {
    DragFiles,
    DropFiles
};